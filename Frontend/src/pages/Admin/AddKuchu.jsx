import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";

const AddKuchu = () => {
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.title || !product.price || !product.image) {
      setError("Please fill all fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/admin/products/kuchu", {
        title: product.title,
        price: product.price,
        img: product.image,
      });
      setSuccess(true);
      setProduct({ title: "", price: "", image: "" });
    } catch (err) {
      setError("Failed to add kuchu");
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Kuchu
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField
          label="Title"
          name="title"
          value={product.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={product.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Image URL"
          name="image"
          value={product.image}
          onChange={handleChange}
          fullWidth
        />
        <Button variant="contained" type="submit" color="primary">
          Add Kuchu
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert onClose={() => setSuccess(false)} severity="success">
          Kuchu added successfully!
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={3000}
        onClose={() => setError("")}
      >
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default AddKuchu;
