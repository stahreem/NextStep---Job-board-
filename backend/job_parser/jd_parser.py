# job_parser/job_parser.py

from pymongo import MongoClient
from bson import ObjectId
import spacy
import re
import json

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["your_db_name"]
jobs_collection = db["jobs"]
companies_collection = db["companies"]

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Predefined skills
SKILLS_DB = ['python', 'java', 'c++', 'react', 'node.js', 'mongodb', 'express', 'sql', 'html', 'css', 'javascript', 'flutter', 'aws']

def extract_company(company_id):
    if isinstance(company_id, ObjectId):
        company_doc = companies_collection.find_one({"_id": company_id})
        return company_doc.get("name", "") if company_doc else "Unknown Company"
    return str(company_id)

def extract_title(text):
    lines = text.splitlines()
    for line in lines:
        if "hiring" in line.lower():
            return line.strip()
    doc = nlp(text)
    for chunk in doc.noun_chunks:
        if chunk.root.pos_ == "NOUN" and chunk.root.is_title:
            return chunk.text
    return "Job Opening"

def extract_skills(text):
    text_lower = text.lower()
    return list({skill for skill in SKILLS_DB if skill in text_lower})

def parse_job_details(job_id_str):
    job = jobs_collection.find_one({"_id": ObjectId(job_id_str)})
    if not job:
        return None

    # Handle list in 'requirements'
    requirements_text = " ".join(job.get("requirements", [])) if isinstance(job.get("requirements"), list) else str(job.get("requirements", ""))
    combined_text = str(job.get("description", "")) + " " + requirements_text

    title = extract_title(combined_text)
    company_name = extract_company(job.get("company"))
    doc = nlp(combined_text)

    # Extract location from NLP if not already present
    location = job.get("location", "")
    for ent in doc.ents:
        if ent.label_ == "GPE":
            location = ent.text
            break

    parsed_data = {
        "title": title,
        "company": company_name,
        "location": location,
        "jobType": job.get("jobType", "N/A"),
        "skills_required": extract_skills(combined_text),
        "description": combined_text.strip(),
        "tags": [title] + extract_skills(combined_text)[:3] + [location]
    }

    # Optionally, store parsed data in DB (e.g., in a `parsedJobs` collection or as a field in the same job doc)
    db["parsedJobs"].insert_one({**parsed_data, "jobId": job["_id"]})

    return parsed_data

