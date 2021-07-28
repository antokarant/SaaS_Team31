import json
import requests

url = ''
file = 'keywords.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json = json.loads(i), verify = False)

url = ''
file = 'users.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json = json.loads(i), verify = False)

url = ''
file = 'questions.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json = json.loads(i), verify = False)

url = ''
file = 'answers.json'
with open(file, 'r') as f:
    for i in f:
        r = requests.post(url, json = json.loads(i), verify = False)
