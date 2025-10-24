const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// API Key for authentication
const API_KEY = 'nfba_2024_secure_key_xyz789';

// Load articles data from response.json
const DATA_FILE_PATH = path.join(__dirname, 'response.json');
let articles = [];

function loadArticlesFromFile() {
    try {
        const raw = fs.readFileSync(DATA_FILE_PATH, 'utf8');
        const parsed = JSON.parse(raw);
        const arr = Array.isArray(parsed.articles) ? parsed.articles : [];
        // Use the IDs that are already in the JSON file
        articles = arr;
    } catch (err) {
        console.error('Failed to load response.json:', err.message);
        articles = [];
    }
}

loadArticlesFromFile();

// Middleware to parse JSON bodies
app.use(express.json());

// API Key middleware
function authenticateApiKey(req, res, next) {
    const apiKey = req.headers['x-api-key'] || req.query.apiKey;
    
    if (!apiKey) {
        return res.status(401).json({ 
            error: 'API key required',
            message: 'Please provide API key in header (x-api-key) or query parameter (apiKey)'
        });
    }
    
    if (apiKey !== API_KEY) {
        return res.status(403).json({ 
            error: 'Invalid API key',
            message: 'The provided API key is not valid'
        });
    }
    
    next();
}

// Hello World endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Hello World',
        timestamp: new Date().toISOString()
    });
});

// GET /api/articles - Get all articles (paginated) - returns title, image, and category
app.get('/api/articles', authenticateApiKey, (req, res) => {
    const page = Math.max(parseInt(req.query.page || '1', 10), 1);
    const limit = Math.max(parseInt(req.query.limit || '20', 10), 1);
    const start = (page - 1) * limit;
    const end = start + limit;
    const total = articles.length;
    const totalPages = Math.max(Math.ceil(total / limit), 1);
    const data = articles.slice(start, end).map(article => ({
        id: article.id,
        title: article.title,
        image: article.urlToImage,
        category: article.category
    }));
    res.json({ page, limit, total, totalPages, data });
});

// GET /api/articles/search?q= - Search articles by keyword
app.get('/api/articles/search', authenticateApiKey, (req, res) => {
    const q = (req.query.q || '').toString().trim();
    if (!q) {
        return res.status(400).json({ error: 'Missing query parameter q' });
    }
    const query = q.toLowerCase();
    const results = articles.filter(a => {
        const haystack = [
            a.title,
            a.description,
            a.content,
            a.author,
            a?.source?.name
        ].filter(Boolean).join(' ').toLowerCase();
        return haystack.includes(query);
    });
    res.json({ query: q, total: results.length, data: results });
});

// GET /api/articles/:id - Get single article
app.get('/api/articles/:id', authenticateApiKey, (req, res) => {
    const { id } = req.params;
    const article = articles.find(a => a.id === id);
    if (!article) {
        return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
});

// GET /api/categories - Get available categories from categories.json
app.get('/api/categories', authenticateApiKey, (req, res) => {
    try {
        const categoriesData = JSON.parse(fs.readFileSync(path.join(__dirname, 'categories.json'), 'utf8'));
        res.json({ 
            total: categoriesData.categories.length, 
            data: categoriesData.categories 
        });
    } catch (err) {
        console.error('Failed to load categories.json:', err.message);
        res.status(500).json({ error: 'Failed to load categories' });
    }
});

// GET /api/articles/category/:name - Get articles by category
app.get('/api/articles/category/:name', authenticateApiKey, (req, res) => {
    const name = req.params.name.toLowerCase();
    const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    
    if (!validCategories.includes(name)) {
        return res.status(400).json({ 
            error: 'Invalid category', 
            validCategories 
        });
    }
    
    const filtered = articles.filter(a => a.category === name);
    res.json({ category: name, total: filtered.length, data: filtered });
});

// POST /api/articles/refresh - Reload from response.json
app.post('/api/articles/refresh', authenticateApiKey, (req, res) => {
    const before = articles.length;
    loadArticlesFromFile();
    const after = articles.length;
    res.json({ message: 'Articles reloaded from file', before, after });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT} to see the Hello World message`);
});

module.exports = app;
