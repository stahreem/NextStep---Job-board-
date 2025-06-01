from pymongo import MongoClient
from bson import ObjectId
import spacy
import json
import sys

client = MongoClient("mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["test"]
jobs_collection = db["jobs"]
companies_collection = db["companies"]

nlp = spacy.load("en_core_web_sm")

SKILLS_DB = [
    'python', 'java','c++', 'c#', 'javascript', 'typescript', 'go', 'ruby', 'kotlin', 'swift', 'php', 'rust', 'scala', 
    'html', 'css', 'sass', 'less', 'bootstrap', 'tailwind', 'react', 'angular', 'vue', 'next.js', 'nuxt.js', 'node.js', 'express', 
    'django', 'flask', 'fastapi', 'flutter', 'react native', 'swift', 'kotlin', 'android', 'ios', 'xamarin',
    'docker', 'kubernetes', 'aws', 'azure', 'gcp', 'terraform', 'ansible', 'jenkins', 'gitlab ci/cd', 'github actions', 'devops',
    'sql', 'postgresql', 'mongodb', 'oracle', 'redis', 'sqlite', 'cassandra', 'firebase', 'neo4j',
    'numpy', 'pandas', 'scikit-learn', 'tensorflow', 'keras', 'pytorch', 'matplotlib', 'seaborn', 'openai', 'transformers', 'huggingface', 
    'cv2', 'opencv', 'statistics', 'deep learning', 'machine learning', 'data analysis', 'data visualization', 'nlp', 'llm',
    'git', 'github', 'jira', 'uml', 'rest api', 'graphql', 'socket.io', 'websockets', 'oauth', 'jwt', 'ci/cd', 'agile', 'scrum', 'tdd', 
    'bdd', 'linux', 'bash', 'vscode', 'intellij', 'eclipse','mvc', 'mvvm', 'microservices', 'monolith', 'unit testing', 
    'integration testing', 'jest', 'mocha', 'chai', 'selenium', 'cypress', 'postman','communication', 'teamwork', 'problem solving', 'leadership', 'adaptability', 'critical thinking', 'creativity', 'time management'
]

def extract_company(company_id):
    if isinstance(company_id, ObjectId):
        company_doc = companies_collection.find_one({"_id": company_id})
        return company_doc.get("name", "") if company_doc else "Unknown Company"
    return str(company_id)

def extract_skills(text):
    text_lower = text.lower()
    return list({skill for skill in SKILLS_DB if skill in text_lower})

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

def parse_job_details(job_id_str):
    job = jobs_collection.find_one({"_id": ObjectId(job_id_str)})
    if not job:
        return None

    description = job.get("description", "")
    requirements = job.get("requirements", [])
    requirements_text = " ".join(requirements) if isinstance(requirements, list) else str(requirements)
    combined_text = f"{description} {requirements_text}"

    parsed_skills = extract_skills(combined_text)
    parsed_company = extract_company(job.get("company"))
    parsed_location = job.get("location", "Unknown")
    parsed_jobType = job.get("jobType", "Unknown")
    parsed_title = extract_title(combined_text)

    doc = nlp(combined_text)
    for ent in doc.ents:
        if ent.label_ == "GPE":
            parsed_location = ent.text
            break

    update_data = {
        "parsed_title": parsed_title,
        "parsed_description": description,
        "parsed_skills": parsed_skills,
        "parsed_company": parsed_company,
        "parsed_location": parsed_location,
        "parsed_jobType": parsed_jobType,
        "parsed": True  # Avoid re-parsing
    }

    jobs_collection.update_one({"_id": ObjectId(job_id_str)}, {"$set": update_data})
    return update_data

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python parse_job_details.py <job_id>")
        sys.exit(1)

    job_id = sys.argv[1]
    result = parse_job_details(job_id)
    if result:
        print(json.dumps(result, indent=2))