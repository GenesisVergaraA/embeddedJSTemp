import express from "express";
import fs from "fs";



const router = express.Router();

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

// Lista completa de recursos
router.get('/', (req, res) => {
    try {
        const data = readData();
        res.render("recursos", { data });
    } catch (error) {
        next(error);
    }
});

// Obtener recurso por ID
router.get("/:id", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const recurs = data.recursos.find(r => r.id === id);

        if (!recurs) {
            return res.status(404).json({ message: "Recurso no encontrado" });
        }

        res.render("detallesRecursos", { recurs: recurs });
    } catch (error) {
        next(error);
    }
});

// Crear nuevo recurso
router.post("/", (req, res, next) => {
    try {
        const data = readData();
        const newRecurso = {
            id: data.recursos.length + 1,
            ...req.body
        };

        data.recursos.push(newRecurso);
        writeData(data);
        res.status(201).json(newRecurso);
    } catch (error) {
        next(error);
    }
});

// Actualizar recurso
router.put("/:id", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const index = data.recursos.findIndex(r => r.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Recurso no encontrado" });
        }

        data.recursos[index] = { ...data.recursos[index], ...req.body };
        writeData(data);
    
        res.redirect("/recursos");
    } catch (error) {
        next(error);
    }
});

// Mostrar formulario de edición
router.get("/:id/edit", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const recurs = data.products.find(r => r.id === id);

        if (!recurs) {
            return res.status(404).json({ message: "Producte no trobat" });
        }

        res.render("editRecurs", { recurs: recurs });
    } catch (error) {
        next(error);
    }
});


// Eliminar recurso
router.delete("/:id", (req, res, next) => {
    try {
        const data = readData();
        const id = parseInt(req.params.id);
        const index = data.recursos.findIndex(r => r.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Recurso no encontrado" });
        }

        data.recursos.splice(index, 1);
        writeData(data);
        res.json({ message: "Recurso eliminado correctamente" });
    } catch (error) {
        next(error);
    }
});


export default router 