# News Feed Backend App

A RESTful API for managing and serving news articles with categorization, search functionality, and authentication.

## 🚀 Features

- **Article Management**: Get paginated articles with filtering
- **Search**: Full-text search across article content
- **Categories**: Predefined article categories (business, entertainment, general, health, science, sports, technology)
- **Authentication**: API key-based authentication
- **Auto-reload**: Development mode with automatic server restart
- **Unique IDs**: Persistent article identifiers

## 📋 API Endpoints

### Authentication
All endpoints require an API key. Provide it via:
- **Header**: `x-api-key: nfba_2024_secure_key_xyz789`
- **Query Parameter**: `?apiKey=nfba_2024_secure_key_xyz789`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Hello World endpoint |
| `GET` | `/api/articles` | Get paginated articles |
| `GET` | `/api/articles/:id` | Get single article by ID |
| `GET` | `/api/articles/search` | Search articles by keyword |
| `GET` | `/api/categories` | Get available categories |
| `GET` | `/api/articles/category/:name` | Get articles by category |
| `POST` | `/api/articles/refresh` | Reload articles from file |

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NewsFeedBackendApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   # Development mode (auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## 📡 API Usage Examples

### Get Articles (Paginated)
```bash
curl "http://localhost:3000/api/articles?apiKey=nfba_2024_secure_key_xyz789&page=1&limit=10"
```

**Response:**
```json
{
  "page": 1,
  "limit": 10,
  "total": 100,
  "totalPages": 10,
  "data": [
    {
      "id": "art_6c4051c1_0",
      "title": "Agents turn simple keyword search into compelling search experiences",
      "image": "https://example.com/image.png",
      "category": "technology"
    }
  ]
}
```

### Get Single Article
```bash
curl "http://localhost:3000/api/articles/art_6c4051c1_0" \
  --header "x-api-key: nfba_2024_secure_key_xyz789"
```

### Search Articles
```bash
curl "http://localhost:3000/api/articles/search?q=artificial intelligence" \
  --header "x-api-key: nfba_2024_secure_key_xyz789"
```

### Get Categories
```bash
curl "http://localhost:3000/api/categories" \
  --header "x-api-key: nfba_2024_secure_key_xyz789"
```

### Get Articles by Category
```bash
curl "http://localhost:3000/api/articles/category/technology" \
  --header "x-api-key: nfba_2024_secure_key_xyz789"
```

## 📊 Article Categories

The API supports 7 predefined categories:

- **business** - Business news, finance, and economic updates
- **entertainment** - Movies, music, TV shows, and celebrity news
- **general** - General news and current events
- **health** - Health news, medical research, and wellness
- **science** - Scientific discoveries, research, and technology
- **sports** - Sports news, scores, and athletic events
- **technology** - Tech news, gadgets, and digital innovations

## 🔧 Development

### Available Scripts

```bash
# Development with auto-reload
npm run dev

# Alternative development command
npm run serve

# Production
npm start

# Run tests
npm test
```

### File Structure

```
NewsFeedBackendApp/
├── index.js              # Main server file
├── response.json          # Article data source
├── categories.json        # Category definitions
├── package.json          # Dependencies and scripts
├── package-lock.json     # Locked dependency versions
└── README.md             # This file
```

## 🔐 Authentication

The API uses a simple API key authentication system:

- **API Key**: `nfba_2024_secure_key_xyz789`
- **Methods**: Header (`x-api-key`) or Query Parameter (`apiKey`)
- **Error Responses**:
  - `401 Unauthorized`: Missing API key
  - `403 Forbidden`: Invalid API key

## 📝 Article Data Structure

Each article contains:

```json
{
  "id": "art_6c4051c1_0",
  "source": {
    "id": "the-verge",
    "name": "The Verge"
  },
  "author": "Emma Roth",
  "title": "Article Title",
  "description": "Article description...",
  "url": "https://example.com/article",
  "urlToImage": "https://example.com/image.jpg",
  "publishedAt": "2025-10-09T20:19:59Z",
  "content": "Full article content...",
  "category": "technology"
}
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `400` - Bad Request (missing parameters, invalid category)
- `401` - Unauthorized (missing API key)
- `403` - Forbidden (invalid API key)
- `404` - Not Found (article not found)
- `500` - Internal Server Error

## 🔄 Auto-Reload Development

The development server automatically restarts when you modify:
- `index.js`
- `response.json`
- `categories.json`
- Any other watched files

## 📦 Dependencies

- **express**: Web framework
- **nodemon**: Development auto-reload (dev dependency)

## 🌐 Deployment

The app is configured for deployment on platforms like Render, Heroku, or similar services. The `package.json` includes the correct entry point and start script.

## 📄 License

ISC

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions, please create an issue in the repository.
