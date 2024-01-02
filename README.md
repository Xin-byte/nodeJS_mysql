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

**Create `.env`:**

after add the next config:

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

```bash
curl -X GET http:// http://192.168.1.109:5000/movies
```
