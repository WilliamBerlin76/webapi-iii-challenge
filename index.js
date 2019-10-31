require('dotenv').config();

const server = require('./server');

const port = process.env.PORT || 5000;

console.log('port', port);

server.listen(port, () => {
    console.log(`\n === server running on ${port} ===\n`)
})