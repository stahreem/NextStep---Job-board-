from pymongo import MongoClient
import pandas as pd

# MongoDB connection
MONGO_URI = "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["test"]

# print("Databases:", client.list_database_names())
# print("Collections in NextStep-Job-board:", db.list_collection_names())


# 1. Fetch from applications collection
applications = db["applications"].find({})
applied_data = []
for doc in applications:
    try:
        user_id = str(doc["applicant"])
        job_id = str(doc["job"])
        applied_data.append([user_id, job_id, 2])
    except KeyError as e:
        print("KeyError in applications:", e, doc)
        continue

# 2. Fetch from bookmarks collection
bookmarked = db["bookmarks"].find({})
saved_data = []
for doc in bookmarked:
    try:
        user_id = str(doc["user"])
        job_id = str(doc["job"])
        saved_data.append([user_id, job_id, 1])
    except KeyError as e:
        print("KeyError in bookmarks:", e, doc)
        continue

# 3. Combine both
combined_data = applied_data + saved_data

# Debug print: Check data length
# print(f"✅ Applications: {len(applied_data)}, Bookmarks: {len(saved_data)}, Total: {len(combined_data)}")

# 4. Create DataFrame
df = pd.DataFrame(combined_data, columns=["UserID", "JobID", "InteractionValue"])
# print(df.head())  # Debug check

# 5. Save to CSV
df.to_csv("interactions.csv", index=False)
# print("✅ Exported to interactions.csv")
