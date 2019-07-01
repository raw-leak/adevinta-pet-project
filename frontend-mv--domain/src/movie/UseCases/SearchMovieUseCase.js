export default class SearchMovieUseCase {
  constructor({ repository } = {}) {
    this._repository = repository
  }
  async execute({ keyword, page }) {
    const movieListValueObject = await this._repository.search({ keyword, page })
    return movieListValueObject.toJSON()
  }
}
