# SearchFlow - Distributed Search Typeahead Engine

## Live Demo

### Frontend
https://hld-assignment.vercel.app/

### Backend
https://hld-assignment.onrender.com/

---

## Overview

SearchFlow is a distributed search typeahead system that provides real-time search suggestions similar to search engines and e-commerce platforms.

The system supports:

- Prefix-based search suggestions
- Search submission tracking
- Trending searches
- Redis caching
- Consistent hashing
- Batch writes
- Large-scale dataset support
- Low-latency responses

---

## Features

### Typeahead Suggestions

As the user types a prefix, the system returns up to 10 matching suggestions sorted by popularity.

Example:

Input:

```
iph
```

Output:

```
iphone
iphone 15
iphone charger
```

---

### Search Submission

Users can submit searches through the search API.

Example Response:

```json
{
  "message": "Searched"
}
```

The submitted query is asynchronously processed and stored.

---

### Trending Searches

Trending searches are ranked using:

- Historical popularity (`count`)
- Recent popularity (`recentCount`)

This allows recently searched queries to appear higher in rankings.

---

### Distributed Cache

Redis Cloud is used to cache suggestion results.

Example Cache Key:

```
suggest:iph
```

Benefits:

- Faster responses
- Reduced database reads
- Lower latency

---

### Consistent Hashing

Logical cache nodes are distributed using consistent hashing.

Example:

```
iphone   -> Node A
java     -> Node B
chatgpt  -> Node C
```

Benefits:

- Better load balancing
- Reduced cache movement
- Easy scalability

---

### Batch Writes

Instead of updating MongoDB for every search:

```
Search
  ↓
Buffer
  ↓
Aggregation
  ↓
Batch Write
```

Benefits:

- Reduced write pressure
- Improved throughput
- Better scalability

---

## Architecture

```text
                User
                  |
                  v
           React Frontend
                  |
                  v
            Express API
                  |
      -----------------------
      |                     |
      v                     v
    Redis               MongoDB
   (Cache)          (Primary Store)

      |
      v

Consistent Hashing

      |
      v

 Batch Writer
```

---

## Dataset

Dataset Size:

```
500,000 Search Queries
```

Dataset Structure:

```json
{
  "query": "iphone charger",
  "count": 500,
  "recentCount": 0
}
```

The dataset exceeds the assignment requirement of 100,000 records.

---

## Tech Stack

### Frontend

- React
- Vite
- CSS

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas

### Cache

- Redis Cloud

### Deployment

- Vercel
- Render

---

## API Documentation

### Get Suggestions

```http
GET /suggest?q=<prefix>
```

Example:

```http
GET /suggest?q=iph
```

Response:

```json
[
  {
    "query": "iphone",
    "count": 10000
  }
]
```

---

### Submit Search

```http
POST /search
```

Request:

```json
{
  "query": "iphone charger"
}
```

Response:

```json
{
  "message": "Searched"
}
```

---

### Trending Searches

```http
GET /trending
```

Response:

```json
[
  {
    "query": "iphone",
    "count": 10000
  }
]
```

---

### Cache Debug

```http
GET /cache/debug?prefix=iphone
```

Response:

```json
{
  "prefix": "iphone",
  "cacheNode": "Node A"
}
```

---

## Performance

### Dataset

- 500,000 records

### Cache

- Redis Cloud

### Benefits

- Faster repeated searches
- Reduced MongoDB reads
- Lower latency

### Batch Write Optimization

Multiple search requests are aggregated before writing to MongoDB, significantly reducing write operations.

---

## Running Locally

### Clone Repository

```bash
git clone https://github.com/manthan1709/HLD-Assignment
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```



---

## Author

**Mathan Kalra**

Scaler School of Technology