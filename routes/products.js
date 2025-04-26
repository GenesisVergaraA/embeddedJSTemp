import express, { Router } from "express";
import fs from "fs";


const router = express.Router();
// Funciones compartidas
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        throw error;
    }
};

const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing data:", error);
        throw error;
    }
};

// Lista de productos
router.get('/', (req, res) => {
    const user = { name: "Génesis" };
    const htmlMessage = `
            <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
            <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("products", { user, data, htmlMessage });
});

// Obtener producto por ID
router.get("/:id", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const product = data.products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({ message: "Producte no trobat" });
        }

        res.render("detallesProductos", { product: product });
    } catch (error) {
        next(error);
    }
});

// Crear nuevo producto
router.post("/", (req, res, next) => {
    try {
        const data = readData();
        const newProduct = {
            id: data.products.length + 1,
            ...req.body
        };

        data.products.push(newProduct);
        writeData(data);
        res.status(201).json(newProduct);
    } catch (error) {
        next(error);
    }
});

// Actualizar producto
router.put("/:id", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const index = data.products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Producte no trobat" });
        }

        data.products[index] = { ...data.products[index], ...req.body };
        writeData(data);
        res.redirect("/products");
    } catch (error) {
        next(error);
    }
});

// Mostrar formulario de edición
router.get("/:id/edit", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const product = data.products.find(p => p.id === id);

        if (!product) {
            return res.status(404).json({ message: "Producte no trobat" });
        }

        res.render("editProduct", { product: product });
    } catch (error) {
        next(error);
    }
});


// Eliminar producto
router.delete("/:id", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const index = data.products.findIndex(p => p.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Producte no trobat" });
        }

        data.products.splice(index, 1);
        writeData(data);
        res.json({ message: "Producte eliminat correctament" });
    } catch (error) {
        next(error);
    }
});

export default router