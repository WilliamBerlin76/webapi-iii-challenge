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

server.use('/api/users', userRouter);
server.use('/api/users/:id/posts', postRouter); 

module.exports = server;
