import pickle
import pymongo
import os
from bson import ObjectId
import sys
import json
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Connect to MongoDB
MONGO_URI = os.getenv("MONGO_URI")
client = pymongo.MongoClient(MONGO_URI)
db = client["test"]

# Load models and vectorizer
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(BASE_DIR, "models")

with open(os.path.join(MODELS_DIR, "vectorizer.pkl"), "rb") as f:
    vectorizer = pickle.load(f)
with open(os.path.join(MODELS_DIR, "logistic_regression.pkl"), "rb") as f:
    lr_model = pickle.load(f)
with open(os.path.join(MODELS_DIR, "naive_bayes.pkl"), "rb") as f:
    nb_model = pickle.load(f)

def fetch_skills(user_id, job_id):
    resume_doc = db["parsed_resumes"].find_one({"user": user_id})
    job_doc = db["parsedjobs"].find_one({"jobId": ObjectId(job_id)})

    if not resume_doc:
        raise ValueError(f"No resume found for user: {user_id}")
    if not job_doc:
        raise ValueError(f"No job found for jobId: {job_id}")

    resume_skills = resume_doc.get("skills", [])
    job_skills = job_doc.get("parsed_skills", [])

    return resume_skills, job_skills

def predict_fit_score(resume_skills, job_skills):
    combined_text = " ".join(resume_skills) + " " + " ".join(job_skills)
    X_vect = vectorizer.transform([combined_text])

    lr_prob = lr_model.predict_proba(X_vect)[0][1]
    nb_prob = nb_model.predict_proba(X_vect)[0][1]

    return {
        "logistic_regression": lr_prob * 100,
        "naive_bayes": nb_prob * 100
    }

def hybrid_skill_match_score(resume_skills, job_skills):
    matched = len(set(resume_skills).intersection(set(job_skills)))
    total = len(job_skills)

    if total == 0:
        return 0.0

    ratio = matched / total
    base_score = ratio * 100

    if total <= 3:
        if matched == 3:
            return 85.0  
        elif matched == 2:
            return 72.0 
        elif matched == 1:
            return max(base_score, 33.0)
        else:
            return base_score
    elif total <= 6:
        if matched >= 5:
            return 90.0
        elif matched == 4:
            return 75.0
        elif matched == 3:
            return 60.0
        elif matched == 2:
            return max(base_score, 40.0)
        elif matched == 1:
            return max(base_score, 28.0)
        else:
            return base_score
    else:
        return base_score

def compute_fit_score(user_id, job_id):
    try:
        resume_skills, job_skills = fetch_skills(user_id, job_id)
        ml_scores = predict_fit_score(resume_skills, job_skills)
        hybrid_score = hybrid_skill_match_score(resume_skills, job_skills)
        final_score = round(max(ml_scores["logistic_regression"], ml_scores["naive_bayes"], hybrid_score), 2)

        return {
            "fit_score": final_score,
            #"logistic_regression": round(ml_scores["logistic_regression"], 2),
            #"naive_bayes": round(ml_scores["naive_bayes"], 2),
            #"hybrid_score": round(hybrid_score, 2)
        }
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print(json.dumps({"error": "Missing user_id or job_id"}))
        sys.exit(1)

    user_id = sys.argv[1]
    job_id = sys.argv[2]

    result = compute_fit_score(user_id, job_id)
    print(json.dumps(result))