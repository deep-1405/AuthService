const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        
        const service = new UserService();
        const newToken = service.createToken({email: 'deep@admin.com', id: 1});
        console.log("new token is", newToken);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlZXBAYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTcwNjUzMDI5NSwiZXhwIjoxNzA2NjE2Njk1fQ.NkrNMxBMNifzaiIU-3w3Lc8PHJepesoBALFBg9YEPUU';
        const response = service.verifyToken(token);
        console.log(response);
    });
}   

prepareAndStartServer();