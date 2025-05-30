import random
import asyncio

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from databases import Database
from faker import Faker
from datetime import datetime, timedelta

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
database = Database("sqlite:///./local.db")

def generate_tweet():
    tweet = {
        "tweet": fake.sentence(nb_words=10),
        "username": fake.user_name(),
        "tag": f"@{fake.user_name()}",
        "likes": random.randint(0, 1000),
        "comments": random.randint(0, 500),
        "reshares": random.randint(0, 200),
        "date": (datetime.now() - timedelta(days=random.randint(0, 365))).strftime("%Y-%m-%d %H:%M:%S"),
    }
    return tweet

tweets = []
for i in range(100):
    fake = Faker()
    if random.randint(0, 1) == 0: 
        fake = Faker("fr_FR")
    tweet = {**generate_tweet()}
    tweets.append(tweet)

# Data model for tweets
class Tweet:
    def __init__(self, tweet_id, username, text):
        self.tweet_id = tweet_id
        self.username = username
        self.text = text

# API route to search for tweets based on text
@app.get("/tweets")
async def search_tweets(content: str):
    query = "SELECT * FROM tweets WHERE tweet LIKE :content"
    results = await database.fetch_all(query=query, values={"content": f"%{content}%"})
    return results

@app.on_event("startup")
async def startup_db_client():
    await database.connect()
    await database.execute("DROP TABLE IF EXISTS tweets;")
    await database.execute(
      """
      CREATE TABLE IF NOT EXISTS tweets (
          tweet_id INTEGER PRIMARY KEY AUTOINCREMENT,
          tweet TEXT,
          username TEXT,
          tag TEXT,
          likes INT,
          comments INT,
          reshares INT,
          date DATE
      )
      """
    )
    
    columns = list(tweets[0].keys())
    query = "INSERT INTO tweets ({}) VALUES ({})".format(
      ", ".join(columns),
      ", ".join([f":{col}" for col in columns])
    )
    for tweet in tweets:
        await database.execute(query, tweet)
        
@app.on_event("shutdown")
async def shutdown_db_client():
    await database.disconnect()

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=5000)
