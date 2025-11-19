from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

def parse_matrix(data):
    try:
        data = data.strip().split('\n')
        matrix = [list(map(float, row.strip().split())) for row in data if row.strip()]
        return np.array(matrix)
    except Exception:
        return None

@app.route('/api/operate', methods=['POST'])
def operate():
    req = request.json
    op = req.get('operation')
    matA_str = req.get('matrixA', '')
    matB_str = req.get('matrixB', '')

    matA = parse_matrix(matA_str) if matA_str.strip() else None
    matB = parse_matrix(matB_str) if matB_str.strip() else None

    if op in ["add", "subtract", "multiply"]:
        if matA is None or matB is None:
            return jsonify({"error": "Both matrices are required for this operation."}), 400

    try:
        if op == 'add':
            result = (matA + matB).tolist()
            steps = 'Adding matrices elementwise.'
            return jsonify({'result': result, 'steps': steps})

        elif op == 'subtract':
            result = (matA - matB).tolist()
            steps = 'Subtracting matrices elementwise.'
            return jsonify({'result': result, 'steps': steps})

        elif op == 'multiply':
            result = (matA @ matB).tolist()
            steps = 'Multiplying matrices (dot product).'
            return jsonify({'result': result, 'steps': steps})

        elif op == 'transpose':
            results = {}
            steps_list = []
            if matA is not None:
                results['matrixA'] = np.transpose(matA).tolist()
                steps_list.append("Transposed Matrix A.")
            if matB is not None:
                results['matrixB'] = np.transpose(matB).tolist()
                steps_list.append("Transposed Matrix B.")
            if not results:
                return jsonify({"error": "Enter at least one matrix for transpose."}), 400
            return jsonify({'result': results, 'steps': steps_list})

        elif op == 'determinant':
            results = {}
            steps_list = []
            if matA is not None:
                detA = round(np.linalg.det(matA), 4)
                results['matrixA'] = detA
                steps_list.append("Calculated determinant of Matrix A.")
            if matB is not None:
                detB = round(np.linalg.det(matB), 4)
                results['matrixB'] = detB
                steps_list.append("Calculated determinant of Matrix B.")
            if not results:
                return jsonify({"error": "Enter at least one matrix for determinant."}), 400
            return jsonify({'result': results, 'steps': steps_list})

        else:
            return jsonify({'error': 'Invalid operation'}), 400

    except Exception as e:
        return jsonify({'error': str(e)}), 400


if __name__ == '__main__':
    app.run(debug=True)
