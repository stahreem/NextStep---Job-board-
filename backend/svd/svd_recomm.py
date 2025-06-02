import pandas as pd
from pymongo import MongoClient
from sklearn.decomposition import TruncatedSVD
import json
import sys

# MongoDB connection
MONGO_URI = "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["test"]

def fetch_interaction_data():
    applications = db["applications"].find({})
    bookmarks = db["bookmarks"].find({})
    data = []

    for doc in applications:
        try:
            user_id = str(doc["applicant"])
            job_id = str(doc["job"])
            data.append([user_id, job_id, 2])
        except KeyError:
            continue

    for doc in bookmarks:
        try:
            user_id = str(doc["user"])
            job_id = str(doc["job"])
            data.append([user_id, job_id, 1])
        except KeyError:
            continue

    return pd.DataFrame(data, columns=["UserID", "JobID", "InteractionValue"])

def fetch_job_titles():
    jobs = db["jobs"].find({}, {"_id": 1, "title": 1})
    return {str(job["_id"]): job.get("title", "Untitled Job") for job in jobs}

def train_svd(df, n_components=5):
    interaction_matrix = df.pivot_table(
        index='UserID',
        columns='JobID',
        values='InteractionValue',
        fill_value=0
    )
    n_components = min(n_components, min(interaction_matrix.shape) - 1)
    svd = TruncatedSVD(n_components=n_components)
    latent_matrix = svd.fit_transform(interaction_matrix)
    approx_matrix = svd.inverse_transform(latent_matrix)
    approx_df = pd.DataFrame(
        approx_matrix,
        index=interaction_matrix.index,
        columns=interaction_matrix.columns
    )
    return interaction_matrix, approx_df

def recommend_jobs_for_user(user_id, interaction_matrix, approx_df, top_n=5):
    if user_id not in approx_df.index:
        return []
    user_scores = approx_df.loc[user_id]
    already_interacted = interaction_matrix.loc[user_id]
    recommendations = user_scores[already_interacted == 0]
    top_recommendations = recommendations.sort_values(ascending=False).head(top_n)
    return top_recommendations.index.tolist()

if __name__ == "__main__":
    try:
        user_id = sys.argv[1]
        df = fetch_interaction_data()
        if df.empty:
            print(json.dumps([]))
            sys.exit()

        interaction_matrix, approx_df = train_svd(df)
        recommendations = recommend_jobs_for_user(user_id, interaction_matrix, approx_df, top_n=5)
        job_titles_map = fetch_job_titles()
        # recommendation_titles = [job_titles_map.get(job_id, f"Unknown Job ID: {job_id}") for job_id in recommendations]

        print(json.dumps(recommendations))  # OUTPUT
    except Exception as e:
        print(json.dumps({"error": str(e)}))