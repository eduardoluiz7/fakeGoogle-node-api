const express = require('express');
const bodyParser = require('body-parser');
const consts = require('./consts');
const cors = require('cors');
const operations = require('./operations');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
    
app.use('/', (req, res)=>{
    if(!req.body.key || !(req.body.key == consts.key)){
        res.status(500).send({message: 'Invalid key!'});
        }else{
        console.log("Authenticated key!");
        let distance = operations.distance(req.body.origin, req.body.destination);
        let duration = distance/50;

        let data = {
                destination_addresses : [ req.body.destination ],
                origin_addresses : [ req.body.origin ],
                rows : [
                {
                    elements : [
                        {
                            distance : {
                            text : "distancia em texto:",
                            value : distance
                            },
                            duration : {
                            text : "duração em texto",
                            value : duration
                            },
                            status : "OK"
                        }
                    ]
                }
                ],
                status : "OK"
            }

        res.status(200).send(data);
    }
    });

module.exports = app;