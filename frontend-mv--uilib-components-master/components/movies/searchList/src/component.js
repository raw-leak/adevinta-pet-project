import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AtomCard from '@s-ui/react-atom-card'
import MoleculePagination from '@s-ui/react-molecule-pagination'
import AtomSpinner, { AtomSpinnerTypes } from '@s-ui/react-atom-spinner'

const MoviesSearchList = ({ domain, query, linkFactory: Link }) => {

  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [list, setSearchList] = useState([]);
  const [loading, setLoading] = useState(false);


  const handleMoviesSearch = async (xxx) => {
    setKeyword(query)
    setLoading(true)
    const { page, total_pages, list } = await domain
      .get('search_movies_use_case')
      .execute({
        keyword: query,
        page: xxx
      })
    setCurrentPage(page)
    setTotalPages(total_pages)
    setSearchList(list)
    setLoading(false)
  }

  useEffect(() => {
    handleMoviesSearch(1)
  }, []);

  const prevButtonIcon = () => <span>  </span>
  const nextButtonIcon = () => <span> </span>
  const onSelectNext = (e, { page }) => { handleMoviesSearch(page) }
  const onSelectPrev = (e, { page }) => { handleMoviesSearch(page) }
  const onSelectPage = (e, { page }) => { handleMoviesSearch(page) }

  return (<>
    <div className="mv-MoviesSearchList">
      <header className="mv-MoviesSearchList__header">Results: {query}</header>
      {loading ? (
        <AtomSpinner type={AtomSpinnerTypes.FULL} noBackground={true} />
      ) : (
          <>
            <div className="mv-MoviesSearchList__items">

              {list.map(({ image, title, id }) => {
                const imageSrc = image && `https://image.tmdb.org/t/p/w200${image}`
                const renderMedia = () =>
                  imageSrc && (
                    <img className="mv-MoviesSearchList-itemImage" src={imageSrc} />
                  )
                const renderContent = () => <header>{title}</header>
                const detailUrl = `/detail/${id}`
                return (
                  <Link href={detailUrl} className="mv-MoviesSearchList__item" key={id} >
                    <AtomCard media={renderMedia} content={'s'} />
                  </Link>
                )
              })}
            </div>
            <div className='mv-MoviesSearchList__pagination' >
              <MoleculePagination
                totalPages={totalPages}
                page={currentPage}
                prevButtonIcon={prevButtonIcon}
                nextButtonIcon={nextButtonIcon}
                onSelectNext={onSelectNext}
                onSelectPrev={onSelectPrev}
                onSelectPage={onSelectPage}
                showPages={5}
              />
            </div>
          </>
        )}
    </div>
  </>)
}

MoviesSearchList.displayName = 'MoviesSearchList'

MoviesSearchList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  ),
  linkFactory: PropTypes.func
}

MoviesSearchList.defaultProps = {
  list: [],
  linkFactory: ({ children, href, className }) => <a href={href} className={className}>{children}</a> // eslint-disable-line
}

export default MoviesSearchList