import express from "express";
import fs from "fs";
import bodyParser from "body-parser";

//crear l'aplicació
const app = express();
app.use(express.static("public"));//carpeta publica pel css
app.set('view engine', 'ejs');//Fem servir el motor ejs
app.set('views', './views'); //carpeta on desem els arxius .ejs

app.get('/products', (req, res) => {
    const user = { name: "Génesis" }
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="https://www.example.com">Visita Example</a>`;
    const data = readData();
    res.render("products", { htmlMessage, user, data })
    //res.json(data.products);
});


app.get('/', (req,res) =>{
    res.render("index")
})

const readData = () => {
    try {
        const data = fs.readFileSync("./db.json")
        return JSON.parse(data)

    }
    catch (error) {
        console.log(error)
    }
}


const writeData = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data));
    }
    catch (error) {
        console.log(error)
    }
}

//retorna la llista completa dels productes
/*app.get("/products", (req, res) => {
    const data = readData();
    res.json(data.products);
})

//busca un producte pel seu ID
app.get("/products/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const product = data.products.find((product) => product.id === id);
    if (product !== undefined) {
        res.json(product);
    }
    else res.json({ message: "Aquest producte no existeix" })

})

//afegeix un nou producte al fitxer
app.post("/products", (req, res) => {
    const data = readData();
    const body = req.body;
    const newproduct = {
        id: data.products.length + 1,
        ...body,
    };
    data.products.push(newproduct);
    writeData(data);
    res.json(newproduct);
})


//modifica un producte existent i verficiar si existeix o no
app.put("/products/:id", (req, res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const productIndex = data.products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        data.products[productIndex] = {
            ...data.products[productIndex],
            ...body,
        };
        writeData(data);
        res.json({ message: "product updated successfully" });
    }
    else res.json({ message: "no existeix" })
});

//Elimina un producte pel seu id.
app.delete("/products/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const productIndex = data.products.findIndex((product) => product.id === id);
    data.products.splice(productIndex, 1);
    writeData(data);
    res.json({ message: "Producte eliminat" })
});
*/


app.listen(3000, () => { console.log("Listening on port 3000") });
