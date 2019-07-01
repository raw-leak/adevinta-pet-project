import MovieEntity from './MovieEntity'

export default class MovieEntitiesFactories {
  static movieEntity = ({ id, title, description,image ,release, vote, genres }) =>
    new MovieEntity({ id, title, description,image ,release, vote, genres })
}
