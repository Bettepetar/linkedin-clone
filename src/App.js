import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import { getUserAuth } from './actions';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Messages from './components/Messages';
import Profile from './components/Profile';

function App(props) {
  useEffect(()=>{
    props.getUserAuth();
    // console.log(props.user)
  }, [props]);
  // console.log(props.getUserAuth())
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path='/profile' >
            <Header />
            <Profile />
          </Route>
          <Route path='/messages'>
            <Header />
            <Messages />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.userState.user
})
const mapDispatchToProps = (dispatch)=> ({
  getUserAuth: () => dispatch(getUserAuth())
})
export default connect(mapStateToProps, mapDispatchToProps)(App)
