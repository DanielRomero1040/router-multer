const express = require("express");
const contenedor = require ('../manejo-archivos');


const newContainer = new contenedor.Contenedor;

const {Router} = express;

const router =  new Router();


//----------------------------------------

router.get('/', (req,res)=>{
    const productos = newContainer.getAll();
    productos.then((items)=>{
        let htmlText = ['<h1>Listado de productos</h1>'];

    items.map(element => {
        htmlText = [...htmlText,`<h2>${element.title}</h2>
        <p>Tiene un costo de ${element.price} $</p>
        <img src=${element.thumbnail} />
        <p>El Id de tu producto es ${element.id}</p>
        `]
    })
   
   res.render("products", {arr:items});
})
})

router.get('/:id',(req,res)=>{
    
    const producto = newContainer.getById(parseInt(req.params.id))
    producto.then((item)=>{
        res.send(`
        <h1> Este es el producto ${item.title} </h1>

        <h2>${item.title}</h2>
        <p>Tiene un costo de ${item.price} $</p>
        <img src=${item.thumbnail} />
        <p>El Id de tu producto es ${item.id}</p>
        
        `)
    }).catch((error)=>{
        res.json({error : 'producto no encontrado'})
    })

})


// ----- Agregar un producto por medio de post



router.post('/save', (req,res)=>{
    let {title, price, thumbnail} = req.body

    const producto1 = {                                                                                                                                                    
        title,
        price,
        thumbnail                                                                                                                                           
      }
      
    newContainer.save(producto1).then((data)=>{
        let htmlText = ['<h1>Listado de productos</h1>'];

        
        htmlText = [...htmlText,`<h2>${data.title}</h2>
        <p>Tiene un costo de ${data.price} $</p>
        <img src=${data.thumbnail} />
        <p>El Id de tu producto es ${data.id}</p>
        `]
       
        res.sendFile("index");
     
        })
})

router.put('/:id', (req,res)=>{
    let {title, price, thumbnail} = req.body

    const producto = {                                                                                                                                                    
        title,
        price,
        thumbnail,
        id: req.params.id                                                                                                                                   
      }

    const productoActualizado = newContainer.updateById(producto);
    productoActualizado.then(data=>{
        res.send(`
        <h1> Este es el producto ${data.title} </h1>
    
        <h2>${data.title}</h2>
        <p>Tiene un costo de ${data.price} $</p>
        <img src=${data.thumbnail} />
        <p>El Id de tu producto es ${data.id}</p>
        
        `)

    })
})

router.delete('/:id', (req,res)=>{
    const producto = newContainer.deleteById(parseInt(req.params.id))
    res.send(`elemento con id ${req.params.id} eliminado de la base de datos`)
})


//----------------------------------------
module.exports = router;
