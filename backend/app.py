from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/submit', methods=['POST'])
def process():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    # For example, just return a message
    return jsonify({"message": f"Received data name is: {name} & email is: {email}."})
@app.route('/')
def home():
    return 'Backend is working!'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)