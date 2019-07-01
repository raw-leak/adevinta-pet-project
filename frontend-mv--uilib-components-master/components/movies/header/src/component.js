import React, { Component } from 'react'
import AtomInput from '@s-ui/react-atom-input'
// import PropTypes from 'prop-types'
// import { Link } from "react-router-dom";
import { Router, Route  } from 'react-router';

const MoviesHeader = (props) => {

  const handleOnSearchList = async (_, { value }) => {
    // <Redirect to={`/search/${value}`} />
    // console.log(browserHistory)
    alert(value)
  }

  return (
    <header className="mv-MoviesHeader">
      <div className="mv-MoviesHeader__logo">
        <h1>MOVIES</h1>
      </div>
      <div className="mv-MoviesHeader__components">
        <nav className="mv-MoviesHeader__components-nav">
          <a href=''>Home</a>
          <a href=''>Films</a>
        </nav>
        <div className="mv-MoviesHeader__components-input">
            <AtomInput type="text" onEnter={handleOnSearchList} />
        </div>
      </div>
    </header>
  )
}

MoviesHeader.displayName = 'MoviesHeader'

// Remove these comments if you need
// MovieHeader.contextTypes = {i18n: PropTypes.object}
// MovieHeader.propTypes = {}
// MovieHeader.defaultProps = {}

export default MoviesHeader
