import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import {Provider} from "react-redux";

import styles from "./App.module.css";
import Header from "./components/layout/header/Header";
import Footer from "./components/layout/footer/Footer";
import Profiles from "./components/profiles/Profiles";
import store from "./store";
import ProfilePage from './components/profilePage/ProfilePage'
import AddSession from './components/addSession/AddSession'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <div className={styles.container}>
              <div className={styles.header}>
                <Header />
              </div>

              <div className={styles.content}>
                <Switch>
                  <Route exact path="/" component={Profiles} />
                  <Route exact path="/profile_detail" component={ProfilePage}/>
                  <Route exact path="/add_session" component={AddSession}/>
                </Switch>
              </div>

              <Footer />
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
