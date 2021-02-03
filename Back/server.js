//////////Server/////////////////////
const express = require("express");
const server = express();
const cors = require("cors");
server.use(cors({
	origin:"http://localhost:3000", 
	credentials:true,
}));
const myPublicFiles = express.static("../public");
const listeningPort = 8888;

//////////MiddlewaresServer//////////////
server.use(myPublicFiles);
const cookieParser = require("cookie-parser"); 
const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ "extended": false }));
server.use(cookieParser());
server.use(bodyParser.json());

//////////Dependencias/////////////
const mysql = require("mysql");
const fetch = require("node-fetch");
const dotenv = require("dotenv").config();


/////////SQL connection////////////////////
function openDB() {
	return mysql.createConnection({

		"host": process.env.HOST_SQL,
		"user": process.env.USER_SQL,
		"password": process.env.PASSWORD_SQL,
		"database": process.env.DATABASE_SQL
	})
}

function connect() {
	connection.connect(function (err) {
		if (err) {
			console.error(`error connecting: ${err.stack}`);
			return;
		}

		console.log(`connected as id ${connection.threadId}`);
	});
	return connection;
}

/////////ENDPOINTS/////////////////
///Products///

server.get("/products", (req, res) => {
    let connection = openDB();
    connection.query(`SELECT * FROM products;`, (err,result) =>{
        if(err){
            res.send(err);
        }
        else{
            const Product = result.map(product => {
                return {
                    "id":product.productId,
                    "name":product.name,
                    "brand":product.brand,
                    "image":product.image,
                    "price":product.price,
                    "relevance":product.relevance
                }
            });
            console.log(Product);
            res.send(Product);
        }
    });
    connection.end();
})

///Details///
server.get("/productDetails", (req, res) => {
    const {id} = req.query;
        let connection = openDB();
        connection.query(`SELECT p.name, p.brand, p.image, p.price, p.description, r.nombre, r.cif, r.direccion FROM products AS p JOIN retailer AS r ON p.retailerId = r.retailerID WHERE p.productId = ?`,[id], (err, result) => {
            if(err){
                res.send(err);
            }
            if(result){
                const ProductDetails = {
                    "name": result[0].name,
                    "brand": result[0].brand,
                    "image": result[0].image,
                    "price": result[0].price,
                    "description": result[0].description,
                    "producer": result[0].nombre, 
                    "address": result[0].direccion,
                    "cif": result[0].cif
            }
            console.log(ProductDetails);
            res.send(ProductDetails);
        }
    })
    connection.end();
})

////////////////LISTEN PORT//////////////////

server.listen(listeningPort, () => {
	console.log(`Server Listening on port ${listeningPort}`);
})