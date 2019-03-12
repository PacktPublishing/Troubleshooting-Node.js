let express = require('express');

let router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello there Troubleshooters from:' + req.body.userLocation.state);
});

module.exports = router;
