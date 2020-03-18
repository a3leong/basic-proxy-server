const express = require('express');
const app = express();
const port = 4000;
const axios = require('axios');
const config = require('./config.js');
axios.defaults.baseURL = config.BASE_URL;
axios.defaults.headers.common['Authorization'] = config.AUTH_TOKEN;

app.all('/*', (req, res) => {
  const config = {
    url: req.url,
    method: req.method,
  };
  axios(config).then(proxyCallRes => {
    res.send(proxyCallRes.data);
  }).catch(err => {
    console.error(err)
    res.status(500).send({ error: 'Unexpected error', msg: err });
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
