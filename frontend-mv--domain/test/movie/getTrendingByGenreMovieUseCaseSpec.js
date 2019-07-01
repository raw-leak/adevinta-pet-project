import Domain from '../../src'
import { expect } from 'chai'

let domain, page, id

describe('GetTrendingByGenreMovieUseCase', () => {
    beforeEach(() => {
        domain = new Domain()
        page = 1
        id = 28
    })

    it('#execute', async () => {
        const trendy = await domain
            .get('get_trending_movies_by_genre_use_case')
            .execute({ id: id, page: page })

        expect(trendy.page).exist;
        expect(trendy.page).to.equal(page).that.is.a('number');

        expect(trendy.total_results).exist;
        expect(trendy.total_results).that.is.a('number');

        expect(trendy.total_pages).exist;
        expect(trendy.total_pages).that.is.a('number');

        expect(trendy.list).exist;
        expect(trendy.list).to.be.an.instanceof(Array);
        expect(trendy.list).to.have.lengthOf(20);

        expect(trendy.list[0]).to.be.an.instanceof(Object);
        expect(trendy.list[0].title).that.is.a('string');
        expect(trendy.list[0].id).that.is.a('number');
        expect(trendy.list[0].image).that.is.a('string');

        expect(trendy.list[19].title).that.is.a('string');
        expect(trendy.list[19].id).that.is.a('number');
        expect(trendy.list[19].image).that.is.a('string');

        expect(trendy.list[20]).not.exist;
    })
})
