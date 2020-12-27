from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    with open('output.json') as json_file:
        data = json.load(json_file)

    response = jsonify(data)  
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response  

app.run(debug=True)
