const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();

const whitelist = ['http://52.231.156.16']

const corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  }else{
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}


router.get('/', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

router.get('/user', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view/user', 'index.html'));
});

router.get('/adminUser', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view/adminUser', 'index.html'));
});

router.get('/project', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view/project', 'index.html'));
});

router.get('/auth', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view/auth', 'index.html'));
});

router.get('/create', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view/create', 'index.html'));
});

router.get('/project/:id', cors(corsOptionsDelegate), (req, res) => {
res.sendFile(path.join(__dirname, 'view/detail', 'index.html'));
});

router.get('/task/:id', cors(corsOptionsDelegate), (req, res) => {
    res.sendFile(path.join(__dirname, 'view/task', 'index.html'));
});

module.exports = router;
