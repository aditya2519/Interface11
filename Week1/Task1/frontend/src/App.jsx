import axios from "axios";
import "./App.css"
const API_URL = "http://127.0.0.1:8000/api/products/";

export const getProducts = async () => {
  try {
      const response = await axios.get(API_URL);
      console.log("API Response:", response.data);
      return response;
  } catch (error) {
      console.error("Error fetching products:", error);
  }
};
export const getProduct = (id) => axios.get(`${API_URL}${id}/`);
export const createProduct = (product) => axios.post(API_URL, product);
export const updateProduct = (id, product) => axios.put(`${API_URL}${id}/`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}${id}/`);

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList.jsx";
import ProductForm from "./components/ProductForm.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add" element={<ProductForm />} />
        <Route path="/edit/:id" element={<ProductForm />} />
      </Routes>
    </Router>
  );
}

export default App;
