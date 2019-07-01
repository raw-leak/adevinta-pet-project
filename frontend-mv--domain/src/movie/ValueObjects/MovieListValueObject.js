export default class MovieListValueObject {
  constructor({ page, total_results, total_pages, listEntities }) {
    this._listEntities = listEntities,
      this._page = page,
      this._total_results = total_results,
      this._total_pages = total_pages
  }

  toJSON() {
    return {
      page: this._page,
      total_results: this._total_results,
      total_pages: this._total_pages,
      list: this._listEntities.map(entity => entity.toJSON())
    }
  }
}
