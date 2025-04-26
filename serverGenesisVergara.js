import express from "express";
import productRoutes from "./routes/products.js";
import recursosRoutes from "./routes/recursos.js";
import methodOverride from 'method-override';

// Crear la aplicación
const app = express();

// Middlewares
app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.use(methodOverride('_method'));

// Configuración del motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');



// Rutas
app.get('/', (req, res) => {
    res.render("index");
});

// Configuración de rutas
app.use('/products', productRoutes);
app.use('/recursos', recursosRoutes);


app.listen(3000, () => {
    console.log("Server listening in port 3000");
});