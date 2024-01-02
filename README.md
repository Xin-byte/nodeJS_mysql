# MoviesAPI

Movies API - Brief description of your movies API.

## Description

This project is a movies API that provides information about movies, actors, directors, and more. You can use this API to access details such as movie titles, cast, release date, genre, and more.

## Key Features

- **Movie Query:** Get detailed information about movies.
- **Genre Search:** Filter movies by genre.
- **Actor and Director Information:** Access data about the actors and directors of the movies.
- **Ratings and Reviews:** Discover user ratings and reviews.

## .env configuration

- **Create** `.env`

- after add the next config:

```dotenv
PORT="YOURPORT"
HOST="YOURHOST"
PASSWORD="YOURPASSWORD"
USER="YOURUSER"
DATABASE="YOURDATABASE"
```

## Usage Examples

Here are some examples of how you can use the API:

### Get details of all movies

```http
GET http://localhost:5000/movies
```

### Get details of movies by genre

```http
GET http://localhost:5000/movies?genre=DRAMA
```

### Create a new movie

```http
POST http://localhost:5000/movies

Content-Type: application/json

{
  "title": "The Social Network",
  "year": 2010,
  "director": "David Fincher",
  "duration": 120,
  "poster": "https://i.pinimg.com/originals/7e/37/b9/7e37b994b613e94cba64f307b1983e39.jpg",
  "genre": ["Biography", "Drama"],
  "rate": 7.7
}
```
