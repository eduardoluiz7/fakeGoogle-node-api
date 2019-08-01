const express = require('express');
const bodyParser = require('body-parser');
const consts = require('./consts');
const cors = require('cors');
const operations = require('./operations');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
    
app.use('/get', (req, res)=>{
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
	
app.use('/', (req, res)=>{
	let key = req.query.key;
	let origin = [parseInt(req.query.origin[0]),parseInt(req.query.origin[1])]
	let destination = [parseInt(req.query.destination[0]),parseInt(req.query.destination[1])]
    if(!key || !(key == consts.key)){
        res.status(500).send({message: 'Invalid key!'});
        }else{
        console.log("Authenticated key!");
        let distance = operations.distance(origin, destination);
        let duration = distance/50;

        let data = {
                destination_addresses : [ destination ],
                origin_addresses : [ origin ],
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