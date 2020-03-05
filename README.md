# Movie Roulette

This is an app where users can discover new movies to watch. It is built with [React](https://github.com/facebook/create-react-app) using components from [Ant Design](https://github.com/ant-design/ant-design).

## Background & Description

The concept of this app is inspired by [random movie roulette lists](https://letterboxd.com/search/lists/random+movie+roulette/) on [Letterboxd](https://letterboxd.com/).

The purpose of these lists is to help film lovers expand their horizons by watching movies that they typically wouldn't watch. Streaming services sometimes offer a lot of content that is difficult to discover organically because of the way that their algorithms push certain titles (and not others), so that's where movie roulettes come into play.

They also provide a convenient way of just choosing a movie to watch when decision fatigue strikes.

These lists typically work in the following way:
1. Use a [random number generator](https://www.random.org) to pick a number.
2. Search for the movie corresponding to that number on the list.
3. You can skip a limited number of times, after which you should watch the movie discovered.

MovieRoulette aims at serving the same purposes in a single place.

## Features

- Randomized movie recommendations based on four categories.
- Possibility to skip recommendations indefinitely.
- Unique recommendations across categories.

### Features in the Works

- Filters to narrow down recommendations by cast, crew, year, language, runtime, similar movie, etc.
- Watchlist to keep track of accepted recommendations.
- List of rejected recommendations.

### Future Features

- Toggling between limited and indefinite recommendations.
- Full-fledged user accounts.
- Richer movie data drawn from additional APIs.

## Install

To run locally, make sure you have [Node.js](https://nodejs.org/) installed.

After cloning the repo, install the necessary packages inside the project directory:

```
$ npm install
```

Compile in development mode with `npm start` and you're good to go.

## Attributions

Film data and images supplied by [TMDb](https://www.themoviedb.org). *This product uses the TMDb API but is not endorsed or certified by TMDb.*

Icons made by [Roundicons](https://www.flaticon.com/authors/roundicons) from [www.flaticon.com](https://www.flaticon.com).
      
## Live Version

See it live [here](https://movieroulette.herokuapp.com/).

## License

MIT © 2020 Giuliana Ferraro

---

![Movie Roulette Demo](/demo/movie-roulette-demo.png)
