const fs = require('fs');
const server = require('http').createServer();

// response (res) is a writtable stream.
server.on('request', (req, res) => {
    // Solution 1
    /* fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    }); */

    // Solution 2: Streams
    /* const readable = fs.createReadStream('test-file.txt');
    readable.on('data', chunk => {
        res.write(chunk);
    });

    // When is no more data to read we have to end 
    // so the response can be sent to the client.
    readable.on('end', () => res.end());

    readable.on('error', err => {
        console.log(err);
        res.statusCode = 500;
        res.end('File not found');
    }); */

    // Solution 3: Use a readable stream
    const readable = fs.createReadStream('test-file.txt');
    //readableSource.pipe(writableDestination);
    readable.pipe(res);
});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening...');
});