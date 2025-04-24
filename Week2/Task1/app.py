from flask import Flask, request, jsonify
from flask_cors import CORS
from models import Product, CartItem
from database import products_db, cart_db

app = Flask(__name__)
CORS(app)

@app.route('/products', methods=['GET'])
def get_products(): 
    result = []
    for p in products_db:
        result.append({
            'id': p.id,
            'name': p.name,
            'price': p.price,
            'description': p.description,
            'image': p.image,
            'stock': p.stock
        })
    return jsonify(result), 200

@app.route('/cart', methods=['POST'])
def add_to_cart():
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity')
    product = next((p for p in products_db if p.id == product_id), None)
    if not product:
        return jsonify({'message': 'Product not found'}), 404
    if product.stock < quantity:
        return jsonify({'message': 'Not enough stock'}), 400
    product.stock -= quantity
    cart_db.append(CartItem(product_id, quantity))
    return jsonify({'message': 'Product added to cart'}), 200

@app.route('/cart', methods=['GET'])
def get_cart():
    result = []
    for item in cart_db:
        product = next((p for p in products_db if p.id == item.product_id), None)
        if product:
            result.append({
                'product_id': item.product_id,
                'name': product.name,
                'price': product.price,
                'quantity': item.quantity
            })
    return jsonify(result), 200

@app.route('/checkout', methods=['POST'])
def checkout():
    if not cart_db:
        return jsonify({'message': 'Cart is empty'}), 400
    cart_db.clear()
    return jsonify({'message': 'Order placed successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)



