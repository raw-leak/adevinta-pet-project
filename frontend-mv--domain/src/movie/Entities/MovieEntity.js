export default class MovieEntity {
  constructor({ id, title, description, image, release, vote, genres }) {
    this._id = id
    this._title = title
    this._description = description
    this._image = image
    this._release = release
    this._vote = vote
    this._genres = genres
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      image: this._image,
      release: this._release,
      vote: this._vote,
      genres: this._vote
    }
  }
}