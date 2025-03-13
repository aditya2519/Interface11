import unittest
from app import app, db
from models import User

class FlaskTestCase(unittest.TestCase):
    
    def setUp(self):
        """Set up the test client and database"""
        self.app = app.test_client()
        self.app.testing = True
        with app.app_context():
            db.create_all()

    def tearDown(self):
        """Drop all tables after every test"""
        with app.app_context():
            db.drop_all()

    def test_register(self):
        """Test user registration"""
        response = self.app.post('/api/register', json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword"
        })
        self.assertEqual(response.status_code, 201)  
        self.assertIn('User registered successfully', response.get_data(as_text=True))

    def test_login(self):
        """Test user login"""
        self.app.post('/api/register', json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword"
        })
        response = self.app.post('/api/login', json={
            "username": "testuser",
            "password": "testpassword"
        })
        self.assertEqual(response.status_code, 200)  
        self.assertIn('access_token', response.get_json())  

if __name__ == '__main__':
    unittest.main()
