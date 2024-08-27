// // import { MoviePage } from './components/movies';
// import { Main } from './pages/main';
// import React from "react";
import './App.css';

import { connect } from 'react-redux'
import { Main } from './pages/main';

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const setUserAction = { type: 'SET_USER' }

const mapDispatchToProps = dispatch => {
  return {
    setUser: () => { return dispatch(setUserAction) }
  };
};

const connectedComponents = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)


// export default App;
export default connectedComponents;
