from flask import Flask, request, jsonify
import kociemba

app = Flask(__name__)

@app.route('/solve', methods=['POST'])
def solve():
    cube_data = request.json
    
    # Construct the cube string from the received data
    cube_string = construct_cube_string(cube_data)
    
    # Solve the cube using Kociemba's algorithm
    try:
        solution = kociemba.solve(cube_string)
        return jsonify({'solution': solution})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def construct_cube_string(cube_data):
    # Convert the cube's color data to a string that the solver can understand
    # Example: 'UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB'
    cube_string = ''
    for side in ['top', 'right', 'front', 'left', 'back', 'bottom']:
        cube_string += ''.join(cube_data[side])
    return cube_string

if __name__ == '__main__':
    app.run(debug=True)
