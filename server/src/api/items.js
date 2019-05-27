import express from 'express';
import ItemService from '../services/item';

const itemsEndpoint = express.Router();
const service = new ItemService();


itemsEndpoint.use(function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'invalid credentials' });
  }
  
  next();
});

itemsEndpoint.get('/', async (req, res, next) => {
	try {
	    let resp = await service.searchItems(req.query.q);
	    let key = req.headers.authorization.split(" ");
	    resp.author = { name:key[0] , lastname:key[1]};
		res.send(resp);
	} catch (error) {
		next(error);
	}
});

itemsEndpoint.get('/:itemId', async (req, res, next) => {
   try {
	    let resp = await service.getItem(req.params.itemId);
	    let key = req.headers.authorization.split(" ");
	    resp.author = { name:key[0] , lastname:key[1]};
		res.send(resp);
	} catch (error) {
		next(error);
	}
});

export default itemsEndpoint;