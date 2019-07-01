import Domain from '../../src'
import { expect } from 'chai'

let domain, page, keyword

describe('SearchMovieUseCase', () => {
  beforeEach(() => {
    domain = new Domain()
    page = 1
    keyword = 'batman'

  })

  it('#execute', async () => {
    const movies = await domain
      .get('search_movies_use_case')
      .execute({ keyword: keyword, page: page })

    expect(movies.page).exist;
    expect(movies.page).to.equal(page).that.is.a('number');

    expect(movies.total_results).exist;
    expect(movies.total_results).that.is.a('number');

    expect(movies.total_pages).exist;
    expect(movies.total_pages).that.is.a('number');

    expect(movies.list).exist;
    expect(movies.list).to.be.an.instanceof(Array);
    expect(movies.list).to.have.lengthOf(20);

    expect(movies.list[0]).to.be.an.instanceof(Object);
    expect(movies.list[0].title).that.is.a('string');
    expect(movies.list[0].id).that.is.a('number');
    expect(movies.list[0].image).that.is.a('string');

    expect(movies.list[19].title).that.is.a('string');
    expect(movies.list[19].id).that.is.a('number');
    expect(movies.list[19].image).that.is.a('string');

    expect(movies.list[20]).not.exist;
  })
})
