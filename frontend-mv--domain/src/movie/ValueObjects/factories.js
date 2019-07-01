import MovieEntitiesFactories from '../Entities/factories'

import MovieListValueObject from './MovieListValueObject'

export default class MovieValueObjectsFactories {
  static movieListValueObject = ({ data }) =>
    new MovieListValueObject({
      page: data.page,
      total_results: data.total_results,
      total_pages: data.total_pages,
      listEntities: data.results.map(movie => MovieEntitiesFactories.movieEntity({ id: movie.id, title: movie.title, image: movie.poster_path }))
    })
}
