from pymongo import MongoClient
from bson import ObjectId
import spacy
import json
import sys

# Connect to MongoDB
client = MongoClient("mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]  # Replace with your actual DB name
jobs_collection = db["jobs"]
companies_collection = db["companies"]

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Predefined skills
SKILLS_DB = [
    'python', 'java', 'c++', 'react', 'node.js', 'mongodb', 'express',
    'sql', 'html', 'css', 'javascript', 'flutter', 'aws'
]

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

    requirements = job.get("requirements", [])
    requirements_text = " ".join(requirements) if isinstance(requirements, list) else str(requirements)
    combined_text = str(job.get("description", "")) + " " + requirements_text

    title = extract_title(combined_text)
    company_name = extract_company(job.get("company"))
    doc = nlp(combined_text)

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

    return parsed_data

# Main entry point
if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)

    job_id = sys.argv[1]
    result = parse_job_details(job_id)
    if result:
        print(json.dumps(result))  # ONLY JSON OUTPUT
