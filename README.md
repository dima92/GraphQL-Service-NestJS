# Graphql Service

---

## Installation service

1. Clone repository
2. Move to `dev` branch
3. Enter `npm install` in terminal

## Installation microservices

1. Clone [repository](https://github.com/rolling-scopes-school/node-graphql-service)
2. Use installation instruction in README.md from repository

## Running service

1. Create `.env` file. Use `.env.example` to type parameters
2. Enter `npm run start` in terminal to start service
3. Open playground by url `http://localhost:PORT/graphql`, where `PORT` is a number which you enter in `.env` (by default is `3000`)

## Queries list

<details>
    <summary>Show queries</summary>
    <ul>
        <li>artist</li>
        <li>artists</li>
        <li>genre</li>
        <li>genres</li>
        <li>track</li>
        <li>tracks</li>
        <li>band</li>
        <li>bands</li>
        <li>album</li>
        <li>albums</li>
        <li>jwt</li>
        <li>user</li>
        <li>favourites (available only for logged-in user)</li>
    </ul>
</details>

## Mutations list

<details>
    <summary>Show mutations</summary>
    <ul>
        <li>Artists
            <ul>
                <li>createArtist</li>
                <li>deleteArtist</li>
                <li>updateArtist</li>
            </ul>
        </li>
        <li>Genres
            <ul>
                <li>createGenre</li>
                <li>deleteGenre</li>
                <li>updateGenre</li>
            </ul>
        </li>
        <li>Bands
            <ul>
                <li>createBand</li>
                <li>deleteBand</li>
                <li>updateBand</li>
            </ul>
        </li>
        <li>Tracks
            <ul>
                <li>createTrack</li>
                <li>deleteTrack</li>
                <li>updateTrack</li>
            </ul>
        </li>
        <li>Albums
            <ul>
                <li>createAlbum</li>
                <li>deleteAlbum</li>
                <li>updateAlbum</li>
            </ul>
        </li>
        <li>Users
            <ul>
                <li>register</li>
            </ul>
        </li>
        <li>Favourites
            <ul>
                <li>addTrackToFavourites</li>
                <li>addBandToFavourites</li>
                <li>addArtistToFavourites</li>
                <li>addGenreToFavourites</li>
            </ul>
        </li>
    </ul>
</details>

## Requests example

1. Get all artists

```graphql
query {
  artists(limit: 10, offset: 0) {
    items {
      id
      firstName
      secondName
      country
      bands {
        id
        name
        genres {
          id
          country
          description
          year
        }
      }
    }
  }
}
```

2. Get one album by `id`

```graphql
query {
  album(id: "id") {
    name
    released
    tracks {
      id
      title
      duration
    }
  }
}
```

3. Register new user

```graphql
mutation {
  register(
    firstName: "firstname"
    lastName: "lastname"
    email: "email@mail.com"
    password: "password"
  ) {
    id
    firstName
    lastName
    email
  }
}
```

4. Get JWT

```graphql
query {
  jwt(email: "email@mail.com", password: "password") {
    jwt
  }
}
```

5. Create artist

**Note!** Enter authorization header for all mutations except register

```json
{
  "headers": {
    "authorization": "Bearer JWT"
  }
}
```

```graphql
mutation {
  createArtist(
    newArtist: {
      firstName: "firstName"
      secondName: "secondName"
      country: "country"
      bandsIds: ["id1", "id2"]
    }
  ) {
    id
    firstName
    secondName
    bands {
      id
    }
  }
}
```
