const { Router } = require('express');
const { version } = require('../../package.json');

const router = new Router({ mergeParams: true });

router.get('/', (req, res) => res.status(200).json({ version: `v${version}` }));

module.exports = router;
