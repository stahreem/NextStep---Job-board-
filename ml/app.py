from flask import Flask, jsonify, request
import pandas as pd
from sklearn.decomposition import TruncatedSVD

app = Flask(__name__)

# Load interactions
df = pd.read_csv("interactions.csv")

# Create interaction matrix
interaction_matrix = df.pivot_table(
    index='UserID', columns='JobID', values='InteractionValue', fill_value=0
)

# SVD
svd = TruncatedSVD(n_components=5)
latent_matrix = svd.fit_transform(interaction_matrix)
approx_matrix = svd.inverse_transform(latent_matrix)

approx_df = pd.DataFrame(approx_matrix, 
                         index=interaction_matrix.index, 
                         columns=interaction_matrix.columns)

def recommend_jobs_for_user(user_id, top_n=5):
    if user_id not in approx_df.index:
        return []
    user_scores = approx_df.loc[user_id]
    already_interacted = interaction_matrix.loc[user_id]
    recommendations = user_scores[already_interacted == 0]
    top_recommendations = recommendations.sort_values(ascending=False).head(top_n)
    return top_recommendations.index.tolist()

@app.route('/recommendations', methods=['GET'])
def get_recommendations():
    user_id = request.headers.get('User-ID')  # ✅ Get from headers
    print("Received user_id:", user_id)

    if not user_id:
        return jsonify({"error": "UserID is required"}), 400

    try:
        top_jobs = recommend_jobs_for_user(user_id)
        if not top_jobs:
            return jsonify({"message": "No recommendations found"}), 404
        return jsonify({"recommended_jobs": top_jobs})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
