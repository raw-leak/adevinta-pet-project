import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AtomSpinner, { AtomSpinnerTypes } from '@s-ui/react-atom-spinner'
import Badge, { atomBadgeTypes, atomBadgeSizes } from '@schibstedspain/sui-atom-badge'

function MovieDetail({ domain, match, id }) {

  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  const [voteAvarage, setVoteAvarage] = useState(3.3);
  const [releaseDate, setReleaseDate] = useState("2016-02-12");
  const [description, setDescription] = useState("A distressed couple become stranded on an isolated island only to get hunted by an unforeseen force.");

  const [movieGenre, setMovieGenre] = useState([
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 35,
      "name": "Comedy"
    }
  ])

  const Loader = () => {
    <h1>Loading...</h1>
  }

  const handleMoviesDetail = async () => {
    console.log(match)
    setLoading(true)
    const data = await domain
      .get('get_detail_movies_use_case')
      .execute({ id: id })
    console.log(data)
    setMovie(data)
    setLoading(false)
  }

  useEffect(() => {
    handleMoviesDetail()
  }, []);
  console.log(movie)
  const { title, image, release, vote, genres } = movie

  const imageSrc = image && `https://image.tmdb.org/t/p/w300${image}`

  return (
    <>
      {loading ? (
        <AtomSpinner type={AtomSpinnerTypes.FULL} noBackground={true} />
      ) : (
          <div className="mv-MovieDetail">
            <div className="mv-MovieDetail__movie">

              <div className="mv-MovieDetail__movie-poster">
                <img src={imageSrc} />
              </div>

              <div className="mv-MovieDetail__movie-info">
                <h1>{title}</h1>
                <Badge
                  size={atomBadgeSizes.SMALL}
                  type={atomBadgeTypes.SUCCESS}
                  label={`${voteAvarage} / 10`}
                />
                {movieGenre.map(movie => <Badge
                  size={atomBadgeSizes.SMALL}
                  type={atomBadgeTypes.SUCCESS}
                  label={movie.name}
                  onClick={alert('hola')}
                /> )
                }
                <p>{description}</p>
              </div>

            </div>
          </div>
        )}
    </>)
}

MovieDetail.displayName = 'MovieDetail'

export default MovieDetail
