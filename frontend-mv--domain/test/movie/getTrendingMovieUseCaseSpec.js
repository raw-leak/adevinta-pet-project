import Domain from '../../src'
import { expect } from 'chai'

let domain

describe('GetTrendingMovieUseCase', () => {
  beforeEach(() => {
    domain = new Domain()
  })

  it('#execute', async () => {
    const movies = await domain.get('get_trending_movies_use_case').execute()

    expect(movies).exist;
    expect(movies.list).to.be.an.instanceof(Array);
    expect(movies.list).to.have.lengthOf(20);

    expect(movies.list[0]).to.be.an.instanceof(Object);
    expect(movies.list[0].id).that.is.a('number');
    expect(movies.list[0].title).that.is.a('string');
  })
})
