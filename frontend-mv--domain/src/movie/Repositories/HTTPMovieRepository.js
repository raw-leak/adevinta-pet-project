import MovieRepository from './MovieRepository'

export default class HTTPMovieRepository extends MovieRepository {
  constructor({
    fetcher,
    config,
    movieListValueObjectFactory,
    movieEntityFactory
  }) {
    super()
    this._fetcher = fetcher
    this._config = config
    this._movieListValueObjectFactory = movieListValueObjectFactory
    this._movieEntityFactory = movieEntityFactory
  }

  async search({ keyword, page }) {
    const API_HOST = this._config.get('API_HOST')
    const API_KEY = this._config.get('API_KEY')

    const { data } = await this._fetcher.get(
      `${API_HOST}/search/movie?api_key=${API_KEY}&query=${keyword}&page=${page}`
    )

    const movieListValueObject = this._movieListValueObjectFactory({
      data
    })
    return movieListValueObject
  }

  async trendingByGenre({ id, page }) {
    const API_HOST = this._config.get('API_HOST')
    const API_KEY = this._config.get('API_KEY')

    const { data } = await this._fetcher.get(
      `${API_HOST}/discover/movie?api_key=${API_KEY}&with_genres=${id}&page=${page}`
    )

    const movieListValueObject = this._movieListValueObjectFactory({
      data
    })
    return movieListValueObject
  }

  async trending() {
    const API_HOST = this._config.get('API_HOST')
    const API_KEY = this._config.get('API_KEY')

    const { data } = await this._fetcher.get(
      `${API_HOST}/movie/popular?api_key=${API_KEY}`
    )

    const movieListValueObject = this._movieListValueObjectFactory({
      data
    })
    return movieListValueObject
  }

  async detail({ id }) {
    const API_HOST = this._config.get('API_HOST')
    const API_KEY = this._config.get('API_KEY')

    const { data } = await this._fetcher.get(
      `${API_HOST}/movie/${id}?api_key=${API_KEY}`
    )

    const { id: movieId, title, overview, poster_path, release_date, vote_average, genres } = data // eslint-disable-line
    const movieDetailEntity = this._movieEntityFactory({
      id: movieId,
      title,
      description: overview,
      image: poster_path,
      release: release_date,
      vote: vote_average,
      genres
    })

    return movieDetailEntity
  }
}
