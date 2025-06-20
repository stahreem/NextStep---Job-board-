import sys
import requests
import spacy
import re
import json
from PyPDF2 import PdfReader
from pymongo import MongoClient
from spacy.matcher import PhraseMatcher
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

nlp = spacy.load("en_core_web_sm")
client = MongoClient(MONGO_URI)
db = client["test"]
collection = db["parsed_resumes"]

SKILLS_DB = [
    'python', 'java', 'c++', 'c#', 'javascript', 'typescript', 'go', 'ruby', 'kotlin', 'swift', 'php', 'rust', 'scala',
    'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind', 'react', 'angular', 'vue', 'next.js', 'nuxt.js', 'node.js', 'express',
    'django', 'flask', 'fastapi', 'flutter', 'react native', 'kotlin', 'android', 'ios', 'xamarin',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'ansible', 'jenkins', 'gitlab ci/cd', 'github actions', 'devops',
    'sql', 'postgresql', 'mongodb', 'oracle', 'redis', 'sqlite', 'cassandra', 'firebase', 'neo4j',
    'numpy', 'pandas', 'scikit-learn', 'tensorflow', 'keras', 'pytorch', 'matplotlib', 'seaborn', 'openai', 'transformers', 'huggingface', 
    'cv2', 'opencv', 'statistics', 'deep learning', 'machine learning', 'data analysis', 'data visualization', 'nlp', 'llm',
    'git', 'github', 'jira', 'uml', 'rest api', 'graphql', 'socket.io', 'websockets', 'oauth', 'jwt', 'ci/cd', 'agile', 'scrum', 'tdd',
    'bdd', 'linux', 'bash', 'vscode', 'intellij', 'eclipse', 'mvc', 'mvvm', 'microservices', 'monolith', 'unit testing','excel','powerbi','iam','splunk',
    'integration testing', 'jest', 'mocha', 'chai', 'selenium', 'cypress', 'postman', 'communication', 'teamwork', 'problem solving', 'leadership', 'adaptability', 'critical thinking', 'creativity', 'time management'
]

def extract_text_from_pdf(url):
    response = requests.get(url)
    with open("temp_resume.pdf", "wb") as f:
        f.write(response.content)
    reader = PdfReader("temp_resume.pdf")
    text = ""
    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
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
    doc = nlp(text.lower())
    matcher = PhraseMatcher(nlp.vocab, attr="LOWER")
    patterns = [nlp.make_doc(skill.lower()) for skill in SKILLS_DB]
    matcher.add("SKILLS", patterns)

    matches = matcher(doc)
    found_skills = set()
    for match_id, start, end in matches:
        span = doc[start:end]
        found_skills.add(span.text.lower())
    return list(found_skills)

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

    collection.update_one(
        {"user": user_id},
        {"$set": data},
        upsert=True
    )

    print(json.dumps({"message": "Resume parsed and saved successfully", "user": user_id}))

if __name__ == "__main__":
    main()
