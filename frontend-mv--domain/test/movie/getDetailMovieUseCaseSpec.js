import Domain from '../../src'
import { expect } from 'chai'

let domain

describe('GetDetailMovieUseCase', () => {
  beforeEach(() => {
    domain = new Domain()
  })

  it('#execute', async () => {
    const movie = await domain
      .get('get_detail_movies_use_case')
      .execute({ id: 320288 })

    expect(movie).exist;
    expect(movie).to.be.an.instanceof(Object);
    expect(movie.id).that.is.a('number');
    expect(movie.title).that.is.a('string');
  })
})
