const express = require('express');
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
var pg = require("pg");
const controller = require('./controller');

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// var connectionString = "postgres://postgres:123@127.0.0.1:5432/template3";
 
const config = {
    user: 'postgres',
    database: 'template1',
    password: '123',
    port: 5432
};

// pool takes the object above -config- as parameter
const pool = new pg.Pool(config);

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err) {
           console.log("Can not connect to the DB" + err);
       }
       client.query(
           controller.
           getAllAds()
        //    insertAd('Somebody', 3.7, 2.1, 'ESP', 'Valencia', 08005, 'Carrer', 27, 'pic2.jpg', 50, 30, 20, 20)
           , function (err, result) {
            done();
            if (err) {
                console.log(err);
                res.status(400).send(err);
            }
            res.status(200).send(result);
       })
   })
});




// app.get('/', controller.getAll);
// app.post('/createNewTopic', controller.postTopic);
// app.delete('/deleteTopic', controller.deleteTopic);


app.listen(port, ()=>{console.log('Express listening on port: ', port)})