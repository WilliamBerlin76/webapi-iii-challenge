const express = require('express');
const helmet = require('helmet');
const server = express();

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next){
  
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} `);

    next();
  
};

server.use(helmet());
server.use(express.json());
server.use(logger)

module.exports = server;
