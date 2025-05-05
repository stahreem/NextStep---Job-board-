import pandas as pd

# Load the interactions
df = pd.read_csv("interactions.csv")
print(df.head())

interaction_matrix = df.pivot_table(
    index='UserID', 
    columns='JobID', 
    values='InteractionValue', 
    fill_value=0
)
print(interaction_matrix.head())

from sklearn.decomposition import TruncatedSVD

# Apply SVD
svd = TruncatedSVD(n_components=20)  # Adjust n_components as needed
latent_matrix = svd.fit_transform(interaction_matrix)

print(latent_matrix.shape)  # (users, components)


approx_matrix = svd.inverse_transform(latent_matrix)
approx_df = pd.DataFrame(approx_matrix, 
                         index=interaction_matrix.index, 
                         columns=interaction_matrix.columns)

print(approx_df.head())

def recommend_jobs_for_user(user_id, top_n=5):
    if user_id not in approx_df.index:
        return []
    user_scores = approx_df.loc[user_id]
    already_interacted = interaction_matrix.loc[user_id]
    recommendations = user_scores[already_interacted == 0]  # Exclude seen jobs
    top_recommendations = recommendations.sort_values(ascending=False).head(top_n)
    return top_recommendations.index.tolist()

# Example usage
#print(recommend_jobs_for_user("userId123"))