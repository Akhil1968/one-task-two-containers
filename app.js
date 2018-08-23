/* A simple REST API implementing counter. It stores counter in a redis db.
 *
 * This REST API exposes following endpoints:
 * - GET /        - Returns 200 with JSON body containing the current count.
 * - PUT /inc     - Increment the count. Returns 204.
 * - PUT /dec     - Decrement the count. Returns 204.
 */

// Setup Express for http processing and morgan for logging
var express = require('express');
var morgan = require('morgan');

var PORT = process.env.PORT || 8080;

var app = express();

app.use(morgan('[:date[iso]] :method :url\t:status'));


// Redis Setup
var redis = require('redis'),
    client = redis.createClient(process.env.DB_PORT, process.env.DB_HOST, {});

client.on('connect', function() {
    console.log('Connected to Redis');
});


// Helper Functions
function getCount(callback) {
  return client.get('count', callback);
}


// Routes
app.get('/', function (req, res) {
  getCount(function (err, reply) {
    var value = (reply == null ? 0 : parseInt(reply));
    res.status(200).send({count: value});
  });
});

app.put('/inc', function (req, res) {
  client.incr('count');
  res.status(204).end();
});

app.put('/dec', function (req, res) {
  client.decr('count');
  res.status(204).end();
});


// Start the HTTP Server
app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
