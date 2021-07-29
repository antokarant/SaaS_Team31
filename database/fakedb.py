import faker
import random
import json

TOTAL_KEYWORDS = 15
TOTAL_USERS = 30
TOTAL_QUESTIONS = 50
TOTAL_ANSWERS = 100

fake = faker.Faker()

def getFakeUsername():
    return fake.first_name() + fake.last_name()[0]
    
def getFakeKeyword():
    return fake.word()
    
'''
The nb_sentences argument controls how many sentences the paragraph will contain, 
and setting variable_nb_sentences to False will generate the exact amount, 
while setting it to True (default) will generate a random amount (+/-40%, minimum of 1) using randomize_nb_elements().
'''
def getFakeQuestionTitle():
    return fake.sentence().rstrip('.') + '?'

def getFakeQuestionDescription():
    return fake.paragraph(nb_sentences = 5, variable_nb_sentences = True)

def getFakeAnswer():
    return fake.paragraph(nb_sentences = 3, variable_nb_sentences = True)

## Generate keywords
keywordList = ["nodejs", "car", "SaaS", "Euro", "Olympics", "PS5", "fashion", "politics", "world", "food", "ECE", "math", "Formula1", "gaming", "tennis"]
## for _ in range(TOTAL_KEYWORDS): keywordList.append(getFakeKeyword())
with open("keywords.json", 'w') as f:
    for k in keywordList:
        json.dump({"name": k}, f)
        f.write('\n')

## Generate users
userList = []
for _ in range(TOTAL_USERS):
    newUser = {}
    newUser.update({"username": getFakeUsername()})
    newUser.update({"password": "123"})
    userList.append(newUser)
with open("users.json", 'w') as f:
    for u in userList:
        json.dump(u, f)
        f.write('\n')
    
## Generate questions
questionList = []
for _ in range(TOTAL_QUESTIONS):    
    newQ = {}
    newQ.update({"title": getFakeQuestionTitle()})
    newQ.update({"description": getFakeQuestionDescription()})
    newQ.update({"upvotes": random.randint(0, 50)})
    newQ.update({"downvotes": random.randint(0, 5)})
    newQ.update({"user": random.choice(range(5, TOTAL_USERS * 10, 10))})
    newQ.update({"keywords": random.sample(keywordList, k = random.randint(1, 3))})
    questionList.append(newQ)
with open("questions.json", 'w') as f:
    for q in questionList:
        json.dump(q, f)
        f.write('\n')
    
## Generate answers
answerList = []
for _ in range(TOTAL_ANSWERS):
    newA = {}
    newA.update({"text": getFakeAnswer()})
    newA.update({"upvotes": random.randint(0, 50)})
    newA.update({"downvotes": random.randint(0, 5)})
    newA.update({"user": {"id": random.choice(range(5, TOTAL_USERS * 10, 10))}})
    newA.update({"question": {"id": random.choice(range(5, TOTAL_QUESTIONS * 10, 10))}})
    answerList.append(newA)
with open("answers.json", 'w') as f:
    for a in answerList:
        json.dump(a, f)
        f.write('\n')
    