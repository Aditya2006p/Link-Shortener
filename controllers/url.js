const shortid = require('shortid');
const URL = require('../models/url');

const handleGenerationNewShortNewShortURL = async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { redirectedUrl } = req.body;
    
    if (!redirectedUrl) {
        return res.status(400).json({ error: 'URL is required' });
    }

    const shortId = shortid.generate();
    try {
        const newUrl = await URL.create({
            shortId,
            redirectedUrl,
            visitHistory: [],
        });
        console.log('New URL created:', newUrl); // Log the new URL created

        const allUrls = await URL.find({});
        return res.render('home', {
            id: shortId,
            urls: allUrls
        });
    } catch (error) {
        console.error('Error creating URL:', error); // Log any error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleRedirect = async (req, res) => {
    const { shortId } = req.params;
    console.log(`Redirect request for shortId: ${shortId}`); // Log the shortId
    try {
        const urlEntry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } },
            { new: true }
        );
        if (!urlEntry) {
            console.log(`URL not found for shortId: ${shortId}`); // Log if URL is not found
            return res.status(404).json({ error: 'URL not found' });
        }
        console.log(`Redirecting to: ${urlEntry.redirectedUrl}`); // Log the redirected URL
        return res.redirect(urlEntry.redirectedUrl);
    } catch (error) {
        console.error('Error redirecting URL:', error); // Log any error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetAllUrls = async (req, res) => {
    try {
        const urls = await URL.find({});
        return res.status(200).json(urls);
    } catch (error) {
        console.error('Error retrieving URLs:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

const handleGetAnalytics = async (req, res) => {
    const { shortId } = req.params; // Correctly extract shortId from req.params
    console.log(`Analytics request for shortId: ${shortId}`); // Log the shortId
    
    try {
        const urlEntry = await URL.findOne({ shortId });
        if (!urlEntry) {
            console.log(`Short URL not found for shortId: ${shortId}`); // Log if URL is not found
            return res.status(404).json({ error: 'Short URL not found' });
        }

        return res.status(200).json({
            visitCount: urlEntry.visitHistory.length,
            analytics: urlEntry.visitHistory
        });
    } catch (error) {
        console.error('Error retrieving analytics:', error); // Log any error
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { handleGenerationNewShortNewShortURL, handleRedirect, handleGetAllUrls, handleGetAnalytics };