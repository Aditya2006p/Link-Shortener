const express = require('express');
const { handleGenerationNewShortNewShortURL, handleRedirect, handleGetAllUrls, handleGetAnalytics } = require('../controllers/url');
const router = express.Router();

router.post('/', handleGenerationNewShortNewShortURL);
router.get('/:shortId', handleRedirect);
router.get('/', handleGetAllUrls);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;