import pymongo
import pickle
import os
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report

# MongoDB connection setup
MONGO_URI = "mongodb+srv://shifatahreem313:LWPxqxpiYx0ZffMo@cluster0.nezz1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
DB_NAME = "test"

# Ensure model directory exists
os.makedirs("models", exist_ok=True)

# Connect to MongoDB
client = pymongo.MongoClient(MONGO_URI)
db = client[DB_NAME]

# Load and prepare data
def load_data():
    resumes = list(db["parsed_resumes"].find({}, {"skills": 1}))
    jobs = list(db["parsedjobs"].find({}, {"parsed_skills": 1}))

    resume_texts = [" ".join(doc.get("skills", [])) for doc in resumes]
    job_texts = [" ".join(doc.get("parsed_skills", [])) for doc in jobs]

    X, y = [], []
    for r_text in resume_texts:
        for j_text in job_texts:
            combined_text = f"{r_text} {j_text}"
            overlap = len(set(r_text.split()).intersection(set(j_text.split())))
            label = 1 if overlap > 2 else 0
            X.append(combined_text)
            y.append(label)

    return X, y

# Train and save models
def train_and_save_models():
    X, y = load_data()
    vectorizer = TfidfVectorizer(max_features=5000)
    X_vect = vectorizer.fit_transform(X)

    X_train, X_test, y_train, y_test = train_test_split(X_vect, y, test_size=0.2, random_state=42)

    lr_model = LogisticRegression(max_iter=1000)
    lr_model.fit(X_train, y_train)
    print("Logistic Regression Report:")
    print(classification_report(y_test, lr_model.predict(X_test), zero_division=0))

    nb_model = MultinomialNB()
    nb_model.fit(X_train, y_train)
    print("Naive Bayes Report:")
    print(classification_report(y_test, nb_model.predict(X_test), zero_division=0))

    with open("models/vectorizer.pkl", "wb") as f:
        pickle.dump(vectorizer, f)
    with open("models/logistic_regression.pkl", "wb") as f:
        pickle.dump(lr_model, f)
    with open("models/naive_bayes.pkl", "wb") as f:
        pickle.dump(nb_model, f)

    print("Models and vectorizer saved to 'models/' folder")

if __name__ == "__main__":
    train_and_save_models()