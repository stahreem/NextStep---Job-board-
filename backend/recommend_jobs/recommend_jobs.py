import sys
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import json

MONGO_URI = "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["test"]
resumes_col = db["parsed_resumes"]
jobs_col = db["parsedjobs"]

def stringify_skills(skill_list):
    """Convert list of skills to a single string for TF-IDF."""
    return " ".join(skill_list).lower() if skill_list else ""

def main():
    if len(sys.argv) != 2:
        print("Usage: python recommend_jobs.py <user_id>")
        sys.exit(1)

    user_id = sys.argv[1]

    # Get the resume
    resume_doc = resumes_col.find_one({"user": user_id})
    if not resume_doc:
        print(json.dumps({"success": False, "error": "Resume not found"}))
        sys.exit(1)

    resume_skills = stringify_skills(resume_doc.get("skills", []))
    if not resume_skills.strip():
        print(json.dumps({"success": False, "error": "Resume has no skills"}))
        sys.exit(1)

    # Get the jobs
    jobs = list(jobs_col.find())
    job_skills_list = [stringify_skills(job.get("parsed_skills", [])) for job in jobs]

    # Filter out jobs with no skills
    filtered_jobs = [(job, skills) for job, skills in zip(jobs, job_skills_list) if skills.strip()]
    if not filtered_jobs:
        print(json.dumps({"success": False, "error": "No valid job skills found"}))
        sys.exit(1)

    jobs, job_skills_list = zip(*filtered_jobs)
    documents = [resume_skills] + list(job_skills_list)

    # TF-IDF & Similarity
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(documents)

    similarity_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()

    top_jobs = sorted(zip(similarity_scores, jobs), key=lambda x: x[0], reverse=True)[:5]

    recommendations = [{"jobId": str(job["jobId"]), "score": round(float(score) * 100, 2)} for score, job in top_jobs]

    print(json.dumps({"success": True, "recommendations": recommendations}, indent=2))

if __name__ == "__main__":
    main()
