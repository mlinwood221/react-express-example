require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import expressSanitizer from 'express-sanitizer';

import itemsEndpoint from './src/api/items';

const app = express();


if(process.env.ENV !== 'test') {
    app.use(morgan('combined'));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressSanitizer());

app.use('/items', itemsEndpoint);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send({ error: 'Something failed!' });
});

app.listen(process.env.PORT, function () {
	console.log('Example app listening on port: '+ process.env.PORT)
});

export default app;
