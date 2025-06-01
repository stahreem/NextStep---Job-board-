import argparse
import pickle
import pymongo
import os
from bson import ObjectId
import json

MONGO_URI = "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = pymongo.MongoClient(MONGO_URI)
db = client["test"]



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

    # Custom boosting rules based on total job skills and matches
    if total <= 3:
        if matched == 3:
            return 85.0  # all match out of 3 → strong boost
        elif matched == 2:
            return 72.0  # 2 out of 3 → medium boost
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

def main():
    parser = argparse.ArgumentParser(description="Fit Score Service")
    parser.add_argument("user_id", help="User ID (from parsed_resumes.user)")
    parser.add_argument("job_id", help="Job ID (from parsedjobs.jobId)")

    args = parser.parse_args()

    try:
        resume_skills, job_skills = fetch_skills(args.user_id, args.job_id)

        ml_scores = predict_fit_score(resume_skills, job_skills)
        hybrid_score = hybrid_skill_match_score(resume_skills, job_skills)
        final_score = max(ml_scores["logistic_regression"], ml_scores["naive_bayes"], hybrid_score)

        #print(f"\nUser: {args.user_id} | Job: {args.job_id}")
        #print(f"Logistic Regression: {ml_scores['logistic_regression']:.2f}%")
        #print(f"Naive Bayes:         {ml_scores['naive_bayes']:.2f}%")
        #print(f"Hybrid Skill Match:  {hybrid_score:.2f}%")
        # print(json.dumps({"fit_score": round(final_score, 2)}))

    except ValueError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()