//var fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());
const jsonfile = require('jsonfile');
const uuid = require('uuid');
//const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const axios = require('axios');


const Controllerteam = {
    get: (req, res) => {

        const file = './routes/controllers/data.json'
        jsonfile.readFile(file, function (err, obj) {
            if (err) {
                console.error(err)
            }
            else {
                res.send(obj);
                console.dir(obj)
            }
        })
    },


    post: async (req, res) => {
        const file = './routes/controllers/data.json'


        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                const obj = {...req.body}
                obj.id = uuid()
                await data.push(obj);
                jsonfile.writeFile(file, data, function (err) {
                    if (err) console.error(err)

                })
                //console.log('sad', req.body);
            }
        })
        res.send('new-member successfully added');
    },


    put: async (req, res) => {
        const file = './routes/controllers/data.json'


        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                await data.forEach(sin =>{
                    if(sin.id === req.params.id){
                        Object.keys(req.body).forEach(single=>{
                            sin[single]= req.body[single]
                            }
                        )
                        //     sin.name = req.body.name;
                        //     sin.company =  req.body.company;
                        //     sin.email = req.body.email;
                        //     sin.sinphone = req.body.phone;
                        //     sin.address =req.body.address;
                        //     sin.id = req.body.id;
                    }

                })

                jsonfile.writeFile(file, data, function (err) {
                    if (err) console.error(err)
                })
                //console.log('sad', req.body);
            }
        })
        res.send('new-member updated added');
    },


    delete: async (req, res) => {
        console.log("params", req.params.id)
        const file = './routes/controllers/data.json'


        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                jsonfile.writeFile(file, data.filter(item=>item.id !== req.params.id ), function (err) {
                    if (err) console.error(err)
                })
                //console.log('sad', req.body);
            }
        })
        res.status(200).send('deleted');
    },


    getOne: async (req, res) => {
        let response = {};
        const file = './routes/controllers/data.json'
        let data = await jsonfile.readFile(file, async (err, data) => {
            if (err) {
                console.error(err)
            }
            else {
                response.status = 200;
                response.body = {
                    message: "single",
                    data: data.find(item=>item.id === req.params.id)
                };
                res.status(response.status).send(JSON.stringify(response.body));
            }
        })
    },

    // login: (req, res) => {
    //     const response = {};
    //     try {
    //         data.json.findOne({
    //             where: { email:req.body.email }
    //         }).then((user)=>{
    //             if (!user) {
    //                 //throw new Error('No user with that email')
    //                 response.statusCode = 500;
    //                 response.body = JSON.stringify({
    //                     message: 'Incorrect credentials',
    //                     data: ""
    //                 });
    //                 res.status(response.statusCode).send(response.body);
    //             }
    //             else {
    //                 bcrypt.compare(req.body.password, user.password)
    //                     .then(valid => {
    //                         if (!valid) {
    //                             //throw new Error('No user with that email')
    //                             response.statusCode = 404;
    //                             response.body = JSON.stringify({
    //                                 message: 'Incorrect credentials',
    //                                 data: ""
    //                             });
    //                             res.status(response.statusCode).send(response.body);
    //                         }
    //                         else {
    //                             // signin user and generate a jwt
    //                             const token = jsonwebtoken.sign({
    //                                 id: user.id,
    //                                 email: user.email,
    //                                 firstName: user.firstName
    //                             }, config.jwt.secret, { expiresIn: '1y' })
    //
    //                             // return json web token
    //                             response.statusCode = 200;
    //                             response.body = JSON.stringify({
    //                                 message: 'User LoggedIN',
    //                                 data: "",
    //                                 token: token
    //                             });
    //                             res.status(response.statusCode).send(response.body);
    //                         }
    //                     })
    //             }
    //         })
    //             .catch(err=>{
    //                 response.statusCode = 500;
    //                 response.body = JSON.stringify({err});
    //                 res.status(response.statusCode).send(response.body);
    //             });
    //     } catch (err) {
    //         response.statusCode = 500;
    //         response.body = JSON.stringify({err});
    //         res.status(response.statusCode).send(response.body);
    //     }
    // },

    numberValidation: (req,res) => {
        const telephone1 = req.body.phone;
        const response = {};
        axios.post('https://www.national-debt-help.org.uk/HomeLocRegValidationCheck.php?telephone1='+telephone1)
            .then(ress => {
                if ( ress.data.status === 1) {
                    response.statusCode = 200;
                    response.body = JSON.stringify({
                        message: 'mobile number valid',
                    });
                    res.status(response.statusCode).send(response.body);

                }

                else {
                    response.statusCode = 509;
                    response.body = JSON.stringify({
                        message: 'mobile number invalid',
                    });
                    res.status(response.statusCode).send(response.body);
                }
            })
            .catch(err => {
                response.statusCode = 509;
                response.body = JSON.stringify({
                    message: err,
                });
                res.status(response.statusCode).send(response.body);
            });

    },

    // numbervalidation: (req,res) => {
    //
    //     Numbervalidation:axios.post('/phonevalidation', {
    //         telephone1: ' '
    //     })
    //         .then(function (response) {
    //             if ( response.body.status === 1) {
    //                 response.statusCode = 200;
    //                 response.body = JSON.stringify({
    //                     message: 'mobile number valid',
    //                 });
    //             }
    //             console.log(response);
    //         })
    //         .catch(function (error) {
    //             if ( response.body.status === 1) {
    //                 response.statusCode = 509;
    //                 response.body = JSON.stringify({
    //                     message: 'mobile number invalid',
    //                 });}
    //             console.log(error);
    //         }),
    // }
    //
    // },






};

module.exports = Controllerteam;