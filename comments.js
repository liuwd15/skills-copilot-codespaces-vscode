// create web server
// web server listens to port 3000
// web server has a single endpoint: '/comments'
// when a GET request is made to '/comments', the server will respond with a JSON object containing an array of comments

const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  const comments = [
    { id: 1, author: 'John Doe', text: 'Hello, world!' },
    { id: 2, author: 'Jane Doe', text: 'Hi, world!' },
    { id: 3, author: 'Foo Bar', text: 'Bye, world!' },
  ];

  res.end(JSON.stringify(comments));
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});