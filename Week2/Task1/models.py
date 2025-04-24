class Product:
    def __init__(self, id, name, price, description, image, stock):
        self.id = id
        self.name = name
        self.price = price
        self.description = description
        self.image = image
        self.stock = stock

class CartItem:
    def __init__(self, product_id, quantity):
        self.product_id = product_id
        self.quantity = quantity
