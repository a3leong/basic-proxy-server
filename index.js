const express = require('express');
const app = express();
const port = 4000;
const axios = require('axios');
const AUTH_TOKEN = '<PUT YOUR AUTH TOKEN HERE';
axios.defaults.baseURL = '<PUT YOUR BASE_URL HERE';
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

app.get('/*', (req, res) => {
  console.log(req.url);
  const config = {
    url: req.url,
    method: 'get',
  };
  axios(config).then(proxyCallRes => {
    res.send(proxyCallRes.data);
  }).catch(err => {
    console.error(err)
    res.status(500).send({ error: 'Unexpected error', msg: err });
  });
});

// app.get('/test', (req, res) => {

// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
