import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AtomCard from '@s-ui/react-atom-card';


const MoviesTrendyList = ({ domain, linkFactory: Link, gener  }) => {

  const [leftButtonPosition, setleftButtonPosition] = useState(false);
  const [rightButtonPosition, setRightButtonPosition] = useState(true);
  const [list, setList] = useState([]);
  const [opacity, setOpacity ] = useState('0')

  const handleMoviesByGenre = async () => {
    const { list } = await domain
      .get('get_trending_movies_by_genre_use_case')
      .execute({ id: gener, page: 1 })
      setList(list)
  }

  useEffect(() => {
    handleMoviesByGenre(22)
  }, []);

  const ButtonSlider = ({ text }) => {
    return <p>{text}</p>
  }

  const scrollLeft = () => {
    let step
    const box = document.getElementById('slider1')
    if (window.innerWidth < 600) step = 200
    if (window.innerWidth > 600 && window.innerWidth < 1200) step = 600
    if (window.innerWidth > 1200) step = 800
    box.scrollLeft -= step
    if (box.scrollLeft < 50) setleftButtonPosition(true)
    else return setleftButtonPosition(false)
  }

  const scrollRight = () => {
    let step
    const box = document.getElementById('slider1')
    if (window.innerWidth < 600) step = 200
    if (window.innerWidth > 600 && window.innerWidth < 1200) step = 600
    if (window.innerWidth > 1200) step = 800
    box.scrollLeft += step
    if (box.scrollLeft > 700) setRightButtonPosition(false)
    else setRightButtonPosition(true)
  }

  return (
    <div className='mv-MoviesTrendyList' onMouseOver={() => setOpacity('1')} onMouseOut={() => setOpacity('0')} >

      <div className='mv-MoviesTrendyList__title'>
        <h2>Films - Aqui va el titulo</h2>
        <a>View more</a>
      </div>

      <div className='mv-MoviesTrendyList__box'>

        <div className='mv-MoviesTrendyList__box-button mv-MoviesTrendyList__box-button--left' onClick={scrollLeft} style={{opacity: opacity}}>
          <ButtonSlider text={'<<'} />
        </div>

        <div className='mv-MoviesTrendyList__box-movies' id={'slider1'} >
          {list.map(({ image, title, id }) => {
            const imageSrc = image && `https://image.tmdb.org/t/p/w200${image}`
            const renderMedia = () =>
              imageSrc && (
                <img className="mv-MoviesTrendyList__box-movies-item-image" src={imageSrc} />
              )
            const renderContent = () => <header>{title}</header>
            const detailUrl = `/detail/${id}`

            return (
              <Link href={detailUrl} className="mv-MoviesTrendyList_box-movies-item" key={id} onClick={
                (e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }
              }>
                <AtomCard media={renderMedia} content={'s'} />
              </Link>
            )
          })}
        </div>

        <div className='mv-MoviesTrendyList__box-button mv-MoviesTrendyList__box-button--right' onClick={scrollRight} style={{opacity: opacity}} >
          <ButtonSlider text={'>>'} />
        </div>

      </div>
    </div >
  )
}

MoviesTrendyList.displayName = 'MoviesTrendyList'

MoviesTrendyList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  ),
  linkFactory: PropTypes.func
}

MoviesTrendyList.defaultProps = {
  list: [],
  linkFactory: ({ children, href, className }) => <a href={href} className={className} >{children}</a> // eslint-disable-line
}

export default MoviesTrendyList
