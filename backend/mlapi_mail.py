from multiprocessing import AuthenticationError
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from fastapi import Depends, FastAPI, File, HTTPException, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm
import numpy as np
import pandas as pd
import io
import pickle
from fastapi import FastAPI
from pydantic import BaseModel
from pymongo import MongoClient
from urllib.parse import quote_plus
from sklearn.impute import SimpleImputer
import hashlib
import secrets


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Atlas connection details
# MongoDB connection URI with properly escaped username and password
# MongoDB connection details
# Assuming MongoDB is running locally on the default port
uri = "mongodb://localhost:27017/"

# Connect to MongoDB
client = MongoClient(uri)
db = client["mydatabase"]
users_collection = db["users"]

# User model
class User(BaseModel):
    username: str
    password: str

# Function to hash the password using SHA-256 and salt
def hash_password(password: str, salt: str) -> str:
    return hashlib.sha256((password + salt).encode()).hexdigest()

# Function to generate a random salt
def generate_salt() -> str:
    return secrets.token_hex(16)

# User registration endpoint
@app.post("/register")
def register(user: User):
    existing_user = users_collection.find_one({"username": user.username})
    if existing_user:
        return {"message": "Username already exists"}
    else:
        salt = generate_salt()
        hashed_password = hash_password(user.password, salt)
        user_data = {
            "username": user.username,
            "password": hashed_password,
            "salt": salt
        }
        users_collection.insert_one(user_data)
        return {"message": "User registered successfully"}

# User login endpoint
@app.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = users_collection.find_one({"username": form_data.username})
    if user:
        salt = user.get("salt")
        hashed_password = hash_password(form_data.password, salt)
        if hashed_password == user.get("password"):
            return {"message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.post("/logout")
def logout():
    AuthenticationError.destroy_session()
    return {"message": "Successfully logged out"}


model =     pickle.load(open('D:/pl/Defenzio/ml_models/RandomForestmodel', 'rb'))
botmodel = pickle.load(open('D:/pl/Defenzio/ml_models/bot_model.pkl', 'rb'))
ddos_model = pickle.load(open('D:/pl/Defenzio/ml_models/ddos_model.pkl', 'rb'))
ddoshulk_model = pickle.load(open('D:/pl/Defenzio/ml_models/ddoshulk_model.pkl', 'rb'))
dos_goldeneye_model = pickle.load(open('D:/pl/Defenzio/ml_models/dos_goldeneye_model.pkl', 'rb'))
dos_slowhttptest_model = pickle.load(
    open('D:/pl/Defenzio/ml_models/dos_slowhttptest_model.pkl', 'rb'))
dos_slowloris_model = pickle.load(
    open('D:/pl/Defenzio/ml_models/dos_slowloris_model.pkl', 'rb'))
ftppatator_model = pickle.load(open('D:/pl/Defenzio/ml_models/FTP- PATATOR_model.pkl', 'rb'))
infiltration_model = pickle.load(open('D:/pl/Defenzio/ml_models/infiltration_model.pkl', 'rb'))
ssh_patator_model = pickle.load(open('D:/pl/Defenzio/ml_models/ssh_patator_model.pkl', 'rb'))
webattack_bruteforce_model = pickle.load(
    open('D:/pl/Defenzio/ml_models/webattack_bruteforce_model.pkl', 'rb'))
webattack_sqlinjection_model = pickle.load(
    open('D:/pl/Defenzio/ml_models/webattack_sqlinjection_model.pkl', 'rb'))

known_attack_ml_models = {botmodel: "bot", ddos_model: "ddos", ddoshulk_model: "ddoshulk", dos_goldeneye_model: "ddosgoldeneye", dos_slowhttptest_model: "dosslowhttptest", dos_slowloris_model: "dosslowloris",
                       ftppatator_model: "ftppatator", infiltration_model: "infiltration", ssh_patator_model: "sshpatator", webattack_bruteforce_model: "webattackbruteforce", webattack_sqlinjection_model: "webattacksqlinjection"}
print(len(known_attack_ml_models))


@app.post("/upload")
async def upload_file(file: UploadFile = File(...), username: str = Form(...)):
    x = await file.read()
    df = pd.read_csv(io.BytesIO(x))
    # Handle missing values using SimpleImputer
    imputer = SimpleImputer(strategy='mean')
    # Replace infinity with NaN
    df.replace([np.inf, -np.inf], np.nan, inplace=True)
    # Fill NaN values with mean
    df_imputed = pd.DataFrame(imputer.fit_transform(df))
    df = df.values
    prediction = model.predict(df)
    prediction = (prediction > 0.5).astype(int)
    prediction = list(prediction)
    result = ''
    count_0, count_1 = prediction.count(0), prediction.count(1)

    if count_0 > count_1:
        result = "Not Malicious"
        return {"Prediction": result, "nonmal": count_0, "mali": count_1, "attack": "NA", "isMalicious": False}
    else:
        type_of_the_attack = ""
        no_of_records = len(df)

        for i in known_attack_ml_models:
            whichpred = i.predict(df)
            inliers = list(whichpred).count(1)
            if inliers > (no_of_records//2):
                type_of_the_attack = known_attack_ml_models[i]
                break
        
        if type_of_the_attack != "":
            send_email(username, type_of_the_attack)
        
        return {"Prediction": "Malicious", "nonmal": count_0, "mali": count_1, "attack": type_of_the_attack, "isMalicious": True}

def send_email(email, attack):
    # Email configuration
    sender_email = "XXXXXXXXXX@XXX.XXX"
    sender_password = "XXXXXXX"

    subject = f"Urgent Security Alert: {attack} Attack Detected"
    message = f"""Dear {email},

We regret to inform you that upon conducting a thorough analysis of your network logs, we have discovered some alarming findings. It appears that your network has been targeted and attacked by a malicious entity utilizing the {attack} method.

This type of attack can have severe consequences, ranging from data breaches to system malfunctions. To safeguard your network and protect your sensitive information, we strongly recommend taking immediate action.

We understand that this situation is concerning, but taking proactive measures is crucial for protecting your network from further harm.

Please do not hesitate to reach out if you require any assistance or guidance during this process. Our team is here to support you in any way we can.

Stay vigilant,

Batch - 13,
Defenzio."""

    try:
        # Connect to SMTP server
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.login(sender_email, sender_password)

        # Prepare email
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = email
        msg['Subject'] = subject
        msg.attach(MIMEText(message, 'plain'))

        # Send email
        server.sendmail(sender_email, email, msg.as_string())
        server.quit()

        print("Email sent successfully!")
    except smtplib.SMTPAuthenticationError:
        print("Failed to authenticate with SMTP server. Check your username and password.")
    except smtplib.SMTPException as e:
        print(f"Failed to send email. SMTP error: {str(e)}")
    except Exception as e:
        print(f"An unexpected error occurred: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
