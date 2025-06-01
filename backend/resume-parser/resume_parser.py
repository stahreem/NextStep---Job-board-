import sys
import requests
import spacy
import re
import json
from PyPDF2 import PdfReader
from pymongo import MongoClient

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# MongoDB setup
MONGO_URI = "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["test"]  # use your DB name here
collection = db["parsed_resumes"]

# Predefined skills list
SKILLS_DB = [
    'python', 'java', 'c++', 'react', 'node.js', 'mongodb',
    'express', 'sql', 'html', 'css', 'javascript', 'flutter', 'aws',
]

def extract_text_from_pdf(url):
    response = requests.get(url)
    with open("temp_resume.pdf", "wb") as f:
        f.write(response.content)
    reader = PdfReader("temp_resume.pdf")
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text

def extract_email(text):
    match = re.search(r"[\w\.-]+@[\w\.-]+\.\w+", text)
    return match.group(0) if match else None

def extract_phone(text):
    match = re.search(r"(\+?\d{1,3}[\s-]?)?(\d{10})", text)
    return match.group(0) if match else None

def extract_name(doc):
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text
    return None

def extract_skills(text):
    found_skills = []
    text_lower = text.lower()
    for skill in SKILLS_DB:
        if skill.lower() in text_lower:
            found_skills.append(skill)
    return list(set(found_skills))

def extract_education(text):
    education_keywords = ['bachelor', 'b.tech', 'master', 'university', 'college', 'school']
    lines = text.lower().split('\n')
    education = [line.strip() for line in lines if any(keyword in line for keyword in education_keywords)]
    return education

def extract_experience(text):
    exp_keywords = ['experience', 'intern', 'developer', 'worked', 'company', 'project']
    lines = text.lower().split('\n')
    experience = [line.strip() for line in lines if any(keyword in line for keyword in exp_keywords)]
    return experience

def main():
    if len(sys.argv) < 3:
        print("Usage: python resume_parser.py <resume_url> <user_id>")
        sys.exit(1)

    url = sys.argv[1]
    user_id = sys.argv[2]

    text = extract_text_from_pdf(url)
    doc = nlp(text)

    data = {
        "user": user_id,
        "name": extract_name(doc),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "education": extract_education(text),
        "experience": extract_experience(text),
    }

    # Upsert: update if user resume exists, else insert new
    collection.update_one(
        {"user": user_id},
        {"$set": data},
        upsert=True
    )

    print(json.dumps({"message": "Resume parsed and saved successfully", "user": user_id}))

if __name__ == "__main__":
    main()