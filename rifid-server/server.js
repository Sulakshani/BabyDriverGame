const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let latestUUID = '';
let passedUUID = '';
let readyToRead = false;

app.post('/task1', (req, res) => {
  const uuid = req.body.uuid;
  console.log('Received UUID:', uuid);
  latestUUID = uuid;
  readyToRead = false; // Reset ready to read flag
  res.status(200).send('UUID received');
});

app.post('/passed-uuid', (req, res) => {
  passedUUID = req.body.uuid;
  console.log('Received random UUID:', passedUUID);
  res.status(200).send('Random UUID received');
});

app.get('/passed-uuid', (req, res) => {
  const currenPasseddUUID = passedUUID;
  passedUUID = ''; // Reset latestUUID after sending
  res.status(200).json({ uuid: currenPasseddUUID });
});

app.get('/latest-uuid', (req, res) => {
  const currentUUID = latestUUID;
  latestUUID = ''; // Reset latestUUID after sending
  res.status(200).json({ uuid: currentUUID });
});

app.get('/ready-to-read', (req, res) => {
  res.status(200).send(readyToRead ? 'read' : 'wait');
});

app.post('/ready-to-read', (req, res) => {
  readyToRead = true;
  res.status(200).send('Ready to read next card');
});

app.post('/sendResult', (req, res) => {
  const result = req.body.result;
  console.log('Received result:', result ? 'Success' : 'Success');
  res.status(200).send('Result received');
});

app.listen(PORT, () => {
  console.log(`Local server is running on port ${PORT}`);
});
