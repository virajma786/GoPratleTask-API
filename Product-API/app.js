const express = require('express');
const path = require('path');
const app = express();
const productRoutes = require('./routes/productRoutes');

app.use(express.json());
app.use('/products', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
