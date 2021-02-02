import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import styles from "./AddVideoCard.module.css";
import Player from "../../Player/Player";
import { deleteTempVideo } from "../../../actions/VideoActions";
import AddVideo from "./addVideo/AddVideo";

class AddVideoCard extends Component {
  static propTypes = {
    deleteTempVideo: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      adding: false,
    };
  }

  addHandler = () => {
    this.setState({ adding: true });
  };

  removeHandler = (id) => {
    axios
      .delete(`delete-video/${id}`)
      .then((res) => {
        console.log(res.data);
        this.props.deleteTempVideo(id);
      })
      .catch((err) => console.log(err));
  };

  closeAddWindow = () => {
    this.setState({ adding: false });
  };

  render() {
    const { adding } = this.state;
    const { video } = this.props;

    let cardContent;
    if (video) {
      cardContent = (
        <Fragment>
          <Player src={video.video} height={50} />

          <div className={styles.info}>
            <span>{video.name}</span>
            <button onClick={this.removeHandler.bind(this, video.id)}>
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
          </div>
        </Fragment>
      );
    } else {
      cardContent = (
        <div className={styles.empty}>
          <button onClick={this.addHandler}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>Add Video</title>
              <path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
            </svg>
          </button>
        </div>
      );
    }

    return (
      <div className={styles.container}>
        {cardContent}

        {adding ? <AddVideo close={this.closeAddWindow} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deleteTempVideo })(AddVideoCard);
