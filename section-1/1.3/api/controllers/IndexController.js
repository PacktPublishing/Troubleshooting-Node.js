let express = require('express');

let router = new express.Router();

router.get('/', (req, res) => {
	res.send('Hello there Troubleshooters from:' + req.body.userLocation.state);
});

module.exports = router;
