const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const port = process.env.PORT || 80;
const mongoose = require('mongoose');
const swaggerConf = require('./src/config/swagger.conf.js');
const socket = require('./src/ws/room');

const person = require('./src/routes/Person');
const room = require('./src/routes/Room');
const like = require('./src/routes/Like');
const imageUpload = require('./src/routes/ImageUpload');
const youtube = require('./src/routes/Youtube');

// Configurations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors());
app.use(express.static('./tmp'));

expressSwagger(swaggerConf);
const server = app.listen(port, () => {
    mongoose.connect('mongodb://dbtube/tube', {
        useNewUrlParser: true
    }).then(result => {
        // Routes
        app.use('/api/v1/person', person);
        app.use('/api/v1/room', room);
        app.use('/api/v1/like', like);
        app.use('/api/v1/image', imageUpload);
        app.use('/api/v1/youtube', youtube);
    })
    console.log(`Aplicação rodando na porta ${port}`)
});

socket(server);
