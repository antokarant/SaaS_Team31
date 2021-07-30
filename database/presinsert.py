import mysql.connector
import json
import requests

mydb = mysql.connector.connect(
	host = "eu-cdbr-west-01.cleardb.com",
	user = "bc93ab2c695c56",
	password = "d05ee007",
    db = "heroku_3b5201ffcf4498e"
)

cur = mydb.cursor()

## Insert questions
qid = 505
with open("presquestions.json", 'r') as f:
    for line in f:
        q = json.loads(line)
        query = 'INSERT INTO question (id, title, description, createdOn, updatedOn, upvotes, downvotes, answerCount, userID) VALUES ({}, "{}", "{}", curDate(), curDate(), {}, {}, 0, {});'.format(qid, q["title"], q["description"], q["upvotes"], q["downvotes"], q["user"])
        cur.execute(query)
        mydb.commit()
        qid += 10
  
## Insert question keyword relations
qid = 505
with open("presquestions.json", 'r') as f:
    for line in f:
        q = json.loads(line)
        for kw in q["keywords"]:
            query = 'INSERT INTO question_keywords_keyword (questionID, keywordName) VALUES ({}, "{}");'.format(qid, kw)
            cur.execute(query)
            mydb.commit()
        qid += 10

mydb.close()

## Insert answers
url = 'http://localhost:5000/answer'
with open("presanswers.json", 'r') as f:
    for i in f:
        r = requests.post(url, json = json.loads(i), verify = False)
