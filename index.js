const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const mongoose = require('mongoose');

const person = require('./src/routes/Person');
const room = require('./src/routes/Room');

// Configurations
app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
    mongoose.connect('mongodb://dbtube/tube', {
        useNewUrlParser: true
    }).then(result => {
        console.log('funcionou')
        // Routes
        app.use('/api/v1/person', person);
        app.use('/api/v1/room', room);
    })
    console.log(`Aplicação rodando na porta ${port}`)
});
