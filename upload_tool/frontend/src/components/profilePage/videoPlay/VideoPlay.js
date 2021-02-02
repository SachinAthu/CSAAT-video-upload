import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import styles from "./VideoPlay.module.css";
import Player from "../../Player/Player";

class VideoPlay extends Component {
  static propTypes = {
    videos: PropTypes.array.isRequired,
    session: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  loadVideos = () => {
  };

  getTime = (datetime) => {
    const day = datetime.slice(0, 10);
    let h = parseInt(datetime.slice(11, 13));
    let m = parseInt(datetime.slice(14, 16));
    let ap;
    let time;

    if (h < 12) {
      // AM
      ap = "AM";
    } else {
      // PM
      ap = "PM";
      h = h - 12;
    }

    h = h.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    m = m.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    time = `${day}  ${h}:${m} ${ap}`;
    return time;
  };

  deleteSession = (id) => {
    console.log(id);
  };

  render() {
      const session = this.props.session
      const videos = this.props.videos
      console.log(session)

    return (
      <div className={styles.container}>
        {session.datetime ? (
          <span className={styles.date}>{this.getTime(session.datetime)}</span>
        ) : null}

        <button
          className={styles.removebtn}
          onClick={this.deleteSession.bind(this, session.id)}
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <title>Remove</title>
            <path d="M18.984 3.984v2.016h-13.969v-2.016h3.469l1.031-0.984h4.969l1.031 0.984h3.469zM6 18.984v-12h12v12q0 0.797-0.609 1.406t-1.406 0.609h-7.969q-0.797 0-1.406-0.609t-0.609-1.406z"></path>
          </svg>
        </button>

        {videos.length > 0 ? (
          <div className={styles.players}>
            <div className={styles.player1}>
              <Player src={videos[0].video} />
            </div>

            <div className={styles.player2}>
              <Player src={videos[1].video} />
            </div>

            <div className={styles.player3}>
              <Player src={videos[2].video} />
            </div>

            <div className={styles.player4}>
              <Player src={videos[3].video} />
            </div>
          </div>
        ) : (
            <div className={styles.novideo}>
                <h6>No videos to load</h6>
            </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  videos: state.videoReducer.videos,
  session: state.sessionReducer.activeSession,
});

export default connect(mapStateToProps)(VideoPlay);
