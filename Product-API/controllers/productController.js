
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/products.json'); // file path 

function readProducts() {
  if (!fs.existsSync(filePath)) return [];// checks file existes r not 
  const data = fs.readFileSync(filePath);// if so it will reads file continouesly with synch
  return JSON.parse(data);// thnn parses the json into array and returnas
}

function writeProducts(products) {
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
}  // saves give array to my file 

let products = readProducts();  
let nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
// if any prod exists in array  sets the id with highest existing id +1


exports.getAllProducts = (req, res) => { // handiling the the requestes 
  
    const { q, page = 1, limit = 10 } = req.query;
       let filtered = products;

  if (q) {
    filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(q.toLowerCase())

    );
  }

  const start = (page - 1) * limit;
    const end = start + +limit;

  res.json(filtered.slice(start, end)); // sending the respones as json
};

exports.getProductById = (req, res) => {  // search by id 
  const product = products.find(p => p.id === parseInt(req.params.id));
 
  if (!product) return res.status(404).send('Product not found');  // if product not fount through excep

  res.json(product);
};

exports.createProduct = (req, res) => {   // creting new prod 
 
    const { name, price, description } = req.body;

  if (!name || typeof price !== 'number') {   // if name or price is not in type through 400 invalid
    return res.status(400).send('Invalid input');
  }
  const newProduct = { id: nextId++, name, price, description }; // if everything is matches pushes the products 
   
  products.push(newProduct);
    writeProducts(products);
  res.status(201).json(newProduct); //  writes 201 success 
};

exports.updateProduct = (req, res) => {  // updating existing product by id
  const { name, price, description } = req.body;
  
    const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

     if (name) product.name = name;
   if (typeof price === 'number') product.price = price;
    if (description) product.description = description;
writeProducts(products); // everything is good it will update the prod
  res.json(product);// gives json in response 
};

//