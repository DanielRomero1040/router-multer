const { query } = require("express");
const express = require("express");
const contenedor = require ('./manejo-archivos');

//------------ require rutas ---------------
const productsRoute = require("./routes/products");

const newContainer = new contenedor.Contenedor;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api/productos", productsRoute);
app.use(express.static('files'));


app.listen(8080, ()=>{
    console.log("server run on port 8080");
});