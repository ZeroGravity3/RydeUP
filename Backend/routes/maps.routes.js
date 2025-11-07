const express = require('express');
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware');
const mapControllers = require('../controllers/map.controller');
const {query} = require('express-validator');
const { getCoordinates } = require('../controllers/map.controller');

router.get('/get-coordinates',
query('address').isString().isLength({min: 3}),
authMiddleWare.authUser,
mapControllers.getCoordinates
);

router.get('/get-distance-time',
query('origin').isString().isLength({min: 3}),
query('destination').isString().isLength({min: 3}),
authMiddleWare.authUser,
mapControllers.getDistanceTime
);

router.get('/get-suggestions',
query('input').isString().isLength({min: 1}),
authMiddleWare.authUser,
mapControllers.getAutoCompleteSuggestions
);


module.exports= router;