export default class SearchMovieUseCase {
  constructor({ repository } = {}) {
    this._repository = repository
  }
  async execute({ id, page }) {
    const movieListValueObject = await this._repository.trendingByGenre({ id, page })
    return movieListValueObject.toJSON()
  }
}
