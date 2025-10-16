# HNG13_Stage_0: (#Backend)

# Profile Page With Cat API Task

A RESTful API that returns user profile information along with random cat facts fetched from an external API. Built with Node.js and Express.

## Live Demo

- **API Endpoint:** `http://localhost:3000/me`
- **Example Response:**
```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Name",
    "stack": "stack"
  },
  "timestamp": "2025-10-15T22:30:45.123Z",
  "fact": "Cats sleep for around 13 to 16 hours a day."
}
```
- **API Endpoint:** `http://localhost:3000`
- **Example Response:**

```json
{"status":"error","message":"Route not found","path":"/"}
```

## Features

- ✅ RESTful API endpoint (`GET /me`)
- ✅ Dynamic cat facts from external API
- ✅ Graceful error handling with a fallback message
- ✅ CORS support for cross-origin requests
- ✅ Rate limiting (100 requests per 15 minutes)
- ✅ Request logging for debugging
- ✅ Environment variable configuration
- ✅ ISO 8601 timestamp format

## Technology Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **HTTP Client:** Axios
- **External API:** [Cat Facts API](https://catfact.ninja/)
- **Middleware:** CORS, express-rate-limit

## Dependencies
```json
{
    "axios": "^1.12.2",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express-rate-limit": "^8.1.0"
}
```

## Getting Started

### Prerequisites

- Node.js (v20.12.1)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Frank-dev20/hng13_cat_api.git
cd HNG13
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**

Create a `.env` file in the root directory

Add the following variables to `.env`:
PORT=3000
USER_EMAIL=your.email@example.com
CAT_API_TIMEOUT=5000
FALLBACK_CAT_FACT=Cats sleep for around 13 to 16 hours a day

**Start the server**
```bash
node server.js

The server will start on `http://localhost:3000`

### Testing the API

**Using browser:**
Navigate to `http://localhost:3000/me`

**Sample response:**
```json
{
  "status": "success",
  "user": {
    "email": "your.email@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-15T22:30:45.123Z",
  "fact": "A cat's purr vibrates at a frequency of 25 to 150 hertz."
}
```


## API Endpoints

### GET `/me`

Returns user profile information with a random cat fact.

**Response:** `200 OK`
```json
{
  "status": "success",
  "user": {
    "email": "string",
    "name": "string",
    "stack": "string"
  },
  "timestamp": "string (ISO 8601)",
  "fact": "string"
}
```

**Response (with fallback):** `200 OK`
```json
{
  "status": "success",
  "user": { ... },
  "timestamp": "string (ISO 8601)",
  "fact": "string",
  "note": "Using fallback fact due to external API unavailability"
}
```

**Response (unknown route):** `404 Not Found`
```json
{
  "status": "error",
  "message": "Route not found",
  "path": "/unknown-path"
}
```

**Response (rate limit exceeded):**
```json
{
  "status": "error",
  "message": "Too many request from this IP, please try again later."
}
```

## Security Features

- **CORS:** Enabled for all origins
- **Rate Limiting:** 100 requests per 15 minutes per IP
- **Timeout Protection:** 5-second timeout for external API calls
- **Environment Variables:** Sensitive data not exposed in code


