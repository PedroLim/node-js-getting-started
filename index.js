const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express();
const request = require('request');

const mlbHost = 'http://lookup-service-prod.mlb.com'

app.use(cors());

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app
  .get('/status', (req, res) => {
    res.send('Status OK');
  });


app.get('/player/:name', (req, res) => {
  const playerName = req.params.name;
  const options = {
    url:  `${mlbHost}/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part='${playerName}%25'`
  };
  request(options).pipe(res);
});
