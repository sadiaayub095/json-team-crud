const bodyParser = require('body-parser');
const cors = require('cors');
const team = require('./controllers/team');
const verifyToken =  require("../util/verifyToken");

exports = module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

     app.get('/api/team', verifyToken, team.get);
     app.get('/api/team/:id', verifyToken,  team.getOne);
     app.post('/api/team', team.post);
     app.put('/api/team/:id', team.put);
     app.delete('/api/team/:id', team.delete);
     app.post('/api/phoneVerification', team.numberValidation);
     app.post('/api/login', team.login);
     app.post('/api/signUp', team.signUp);
};