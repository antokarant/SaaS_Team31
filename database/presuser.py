import faker
import random
import json

TOTAL_QUESTIONS = 15
TOTAL_ANSWERS = 5

fake = faker.Faker()

def getFakeQuestionTitle():
    return fake.sentence().rstrip('.') + '?'

def getFakeQuestionDescription():
    return fake.paragraph(nb_sentences = 5, variable_nb_sentences = True)

def getFakeAnswer():
    return fake.paragraph(nb_sentences = 3, variable_nb_sentences = True)

keywordList = ["nodejs", "car", "SaaS", "Euro", "Olympics", "PS5", "fashion", "politics", "world", "food", "ECE", "math", "Formula1", "gaming", "tennis"]

## Generate questions
questionList = []
for _ in range(TOTAL_QUESTIONS):    
    newQ = {}
    newQ.update({"title": getFakeQuestionTitle()})
    newQ.update({"description": getFakeQuestionDescription()})
    newQ.update({"upvotes": random.randint(0, 50)})
    newQ.update({"downvotes": random.randint(0, 5)})
    newQ.update({"user": 305})
    newQ.update({"keywords": random.sample(keywordList, k = random.randint(1, 3))})
    questionList.append(newQ)
with open("presquestions.json", 'w') as f:
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
    newA.update({"user": {"id": 305}})
    newA.update({"question": {"id": random.choice(range(5, 496, 10))}})
    answerList.append(newA)
with open("presanswers.json", 'w') as f:
    for a in answerList:
        json.dump(a, f)
        f.write('\n')