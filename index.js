// Crear una simple API REST con Node y Express
// Importamos express y body-parser

const express = require('express');
const bodyParser = require('body-parser');
const {readFile} = require('fs').promises;

// Creamos la aplicación express
const app = express();

// Configuramos bodyParser para que convierta el body de nuestras peticiones a JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("page"));

// Definimos el puerto por defecto
const port = process.env.PORT || 8080;

// Definimos las rutas de nuestro servidor web
app.get('/', async (req, res) => {
    try {
		res.send( await readFile('./page/index.html', 'utf8') );
	} catch (error) {
		res.status(404).send('404 Not Found');
	}
});

app.get('/usuarios', (req, res) => {
    res.send('Aqui se listaran todos los usuarios');
});

app.get('/usuarios/:id', (req, res) => {
    res.send('Aqui se listaran el usuario con id: ' + req.params.id);
});

app.post('/usuarios', (req, res) => {
    res.send('Aqui se creara un nuevo usuario');
});

app.put('/usuarios/:id', (req, res) => {
    res.send('Aqui se actualizara el usuario con id: ' + req.params.id);
});

app.delete('/usuarios/:id', (req, res) => {
    res.send('Aqui se eliminara el usuario con id: ' + req.params.id);
});

// Iniciamos nuestro servidor web
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});