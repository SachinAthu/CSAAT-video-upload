import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios'

import styles from "./AddSession.module.css";
import AddVideoCard from "./AddVideoCard/AddVideoCard";
import {updateSession} from '../../actions/SessionActions'

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class AddSession extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    tempVideos: PropTypes.array.isRequired,
    updateSession: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      date: "",
    };
  }

  onDateChange = (e) => {
    this.setState({
      date: e.target.value,
    });
  };

  submitSession = (e) => {
    e.preventDefault();

    if (this.state.date == "") {
      alert("Uploaded date is required!");
      return;
    }
    if(this.props.tempVideos.length < 4){
        alert('You should upload four videos!')
        return
    }

    // update the session
    axios(`update-session/`, {
        method: 'PUT',
        data: {
            id: this.props.session.id,
            datetime: this.state.date,
            profile: this.props.profile,
            user: null
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log(res.data)
        // set active session

        this.props.updateSession(res.data)
        // navigate to profile overview page
        this.props.history.push('/profile_detail')

      }).catch(err => console.log(err))

  };

  render() {
    const {tempVideos} = this.props

    return (
      <div className={styles.container}>
        <h3>New Session</h3>

        <form className={styles.form} onSubmit={this.submitSession}>
          <label>Recorded Date</label>
          <input
            type="date"
            name="recorded_date"
            onChange={this.onDateChange}
          />
          <button type="submit" className={styles.submitbtn}>CONFIRM ALL</button>
        </form>

        <div className={styles.videoCards}>
          <div className={styles.videoCard}>
            <AddVideoCard video={tempVideos[0]} />
          </div>

          <div className={styles.videoCard}>
            <AddVideoCard video={tempVideos[1]} />
          </div>

          <div className={styles.videoCard}>
            <AddVideoCard video={tempVideos[2]} />
          </div>

          <div className={styles.videoCard}>
            <AddVideoCard video={tempVideos[3]} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profileReducer.activeProfile,
  session: state.sessionReducer.activeSession,
  tempVideos: state.videoReducer.tempVideos,
});

export default connect(mapStateToProps, {updateSession})(AddSession);
