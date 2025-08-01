
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


