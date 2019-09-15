'use strict';
const language = require('@google-cloud/language');
const request = require('request');
const express = require('express');
const FireEye = require('fireeye');
const MLE = require('./MLE.js')

var socket = new FireEye();

console.log("FireEye address " + socket.getAddress() + " port " + socket.getPort());

var app = express();

//////////////////
/// PARAMETERS ///
//////////////////

const PORT = process.env.PORT || 5000

var server = app.listen(PORT, function() { console.log("Webpage on port " + PORT)});
var io = require('socket.io').listen(server);

///////////////////////
/// EXPRESS HEADERS ///
///////////////////////

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

///////////////////////////
/// FRONT-END ENDPOINTS ///
///////////////////////////

app.use('/', express.static(__dirname + '/'));

app.get('/', function(req, res) {
    res.render('./index.html');
});

let myTest = new MLE(io, socket);
myTest.activateGM();

// myTest.beginSearch();
// myTest.startFlow();








