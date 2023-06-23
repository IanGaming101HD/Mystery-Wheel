const express = require('express');
const fs = require('fs');

let app = express();
let port = 80;

app.enable('trust proxy');
app.set('etag', false);
app.use('/public', express.static(__dirname + '/public'))

app.get('/', async (req, res) => {
  let file = fs.readFileSync(__dirname + '/public/main/index.html', {
    encoding: 'utf-8'
  })
  res.send(file);
});

app.get('/:page', (req, res) => {
  let page = req.params.page;

  let file;

  try {
    file = fs.readFileSync(__dirname + `/public/${page}/index.html`, {
      encoding: 'utf-8'
    })
  } catch (err) {}

  res.send(file);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/`);
  console.log(`App listening on port ${port}`);
});