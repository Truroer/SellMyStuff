const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();
var pg = require("pg");
const controller = require("./controller");

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const config = {
  user: "postgres",
  database: "template1",
  password: "123",
  port: 5432
};

const pool = new pg.Pool(config);

app.get("/", (req, res, next) => {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      controller.getAllAds(),
      // deleteTable('ads')
      // createTableAds()
      function(err, result) {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result.rows.sort((a, b) => b.date - a.date));
      }
    );
  });
});

app.post("/createad", (req, res, next) => {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      controller
        //  createTableAds()
        // getAllAds()
        // deleteTable('ads')
        // insertAd('Somebody3', 'nice thing blabla', 'pic3.jpg', 4.1, 1.1, 'ESP', 'Madrid', 08005, 'Carrer', 27, 50, 30, 20, 20)
        .insertAd(
          req.body.price,
          req.body.title,
          req.body.date,
          req.body.username,
          req.body.description,
          req.body.pictureName,
          req.body.lat,
          req.body.lon,
          req.body.country,
          req.body.city,
          req.body.postcode,
          req.body.road,
          req.body.house_number,
          req.body.length,
          req.body.width,
          req.body.height,
          req.body.weight
        ),
      function(err, result) {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(result);
      }
    );
  });
});

app.post("/deletead", (req, res, next) => {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(controller.deleteAd(req.body.date), function(err, result) {
      done();
      if (err) {
        console.log(err);
        res.status(400).send(err);
      }
      res.status(200).send(result);
    });
  });
});

app.post("/search", (req, res, next) => {
  pool.connect(function(err, client, done) {
    if (err) {
      console.log("Can not connect to the DB" + err);
    }
    client.query(
      controller.getAllAds(),

      function(err, result) {
        done();
        if (err) {
          console.log(err);
          res.status(400).send(err);
        }
        res.status(200).send(
          result.rows
            .filter(x => {
              if (
                x.city.toLowerCase() === req.body.search.toLowerCase() ||
                x.description
                  .toLowerCase()
                  .split(" ")
                  .includes(req.body.search.toLowerCase())
              ) {
                return x;
              }
            })
            .sort((a, b) => b.date - a.date)
        );
      }
    );
  });
});

// app.get('/', controller.getAll);
// app.post('/createNewTopic', controller.postTopic);
// app.delete('/deleteTopic', controller.deleteTopic);

app.listen(port, () => {
  console.log("Express listening on port: ", port);
});
