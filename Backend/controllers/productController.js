import Product from '../models/Product.js';
import Kuchu from "../models/Kuchu.js"

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const getKuchu = async (req, res) => {
  const products = await Kuchu.find();
  res.json(products);
};

export const getProductById = async (req, res) => {
  const {id} =req.params;
  const products = await Product.findById(id);
  res.json(products);
};

export const addProduct = async (req, res) => {
  const { title, img, price } = req.body;
  const newProduct = new Product({ title, img, price });
  await newProduct.save();
  res.status(201).json(newProduct);
};

export const addKuchu = async (req, res) => {
  const { title, img, price } = req.body;
  const newProduct = new Kuchu({ title, img, price });
  await newProduct.save();
  res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.json({ message: 'Product deleted' });
};

export const deleteKuchu = async (req, res) => {
  const { id } = req.params;
  await Kuchu.findByIdAndDelete(id);
  res.json({ message: 'Product deleted' });
};
