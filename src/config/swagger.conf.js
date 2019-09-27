module.exports = {
    swaggerDefinition: {
        info: {
            description: 'WEBAPI para rede-social do youtube',
            title: 'API Tube Friends',
            version: '1.0.0',
        },
        host: 'localhost:90',
        basePath: '/api/v1',
        produces: [
            "application/json",
            "application/xml"
        ],
        schemes: ['http', 'https']
        // securityDefinitions: {
        //     JWT: {
        //         type: 'apiKey',
        //         in: 'header',
        //         name: 'Authorization',
        //         description: "",
        //     }
        // }
    },
    basedir: __dirname, //app absolute path
    files: ['../routes/**/*.js'] //Path to the API handle folder
}