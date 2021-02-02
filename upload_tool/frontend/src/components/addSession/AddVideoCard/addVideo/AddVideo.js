import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import styles from "./AddVideo.module.css";
import { addTempVideo } from "../../../../actions/VideoActions";
import { getCameras, getCameraAngles } from "../../../../actions/CameraActions";

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

class AddVideo extends Component {
  static propTypes = {
    profile: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
    cameras: PropTypes.array,
    camera_angles: PropTypes.array,
    addTempVideo: PropTypes.func.isRequired,
    getCameras: PropTypes.func.isRequired,
    getCameraAngles: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      camera: "",
      camera_angle: "",
      description: "",
      video: "",
      name: "",
    };
  }

  componentDidMount() {
    if (this.props.cameras.length == 0) this.fetchCameras();
    if (this.props.camera_angles.length == 0) this.fetchCameraAngles();
  }

  fetchCameras = () => {
    axios
      .get("cameras/")
      .then((res) => {
        // console.log(res.data);
        this.props.getCameras(res.data);
        this.setState({camera: res.data[0].id})
      })
      .catch((err) => console.log(err));
  };

  fetchCameraAngles = () => {
    axios
      .get("camera-angles/")
      .then((res) => {
        // console.log(res.data);
        this.props.getCameraAngles(res.data);
        this.setState({camera_angle: res.data[0].id})
      })
      .catch((err) => console.log(err));
  };

  close = () => {
    const modal = document.getElementById("videoAddWindow");
    const overlay = document.getElementById("videoAddWindowOverlay");

    modal.classList.add(`${styles.fadeout}`);
    overlay.classList.add(`${styles.overlay_fadeout}`);

    setTimeout(() => {
      this.props.close();
    }, 300);
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {name, camera, camera_angle, description, video} = this.state
    const formData = new FormData();
    
    formData.append("profile", this.props.profile.id)
    formData.append("session", this.props.session.id)
    formData.append("camera", camera);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);
    formData.append("thumbnail", '');
    formData.append("extension", '');
    formData.append("camera_angle", camera_angle);
    formData.append("duration", '');

    axios('add-video/', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((res) => {
      console.log(res.data)
      this.props.addTempVideo(res.data)
      setTimeout(() => {
        this.close();
      }, 1000)
    }).catch(err => console.log(err))

  };

  onChange = (e) => {
    if (e.target.name == "video") {
      this.setState({
        [e.target.name]: e.target.files[0],
        name: e.target.files[0].name,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  };

  render() {
    const { camera, camera_angle, description } = this.state;
    const { cameras, camera_angles } = this.props;

    return (
      <Fragment>
        <div className={styles.container} id="videoAddWindow">
          <button onClick={() => this.close()} className={styles.closebtn}>
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <title>Close</title>
              <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
            </svg>
          </button>

          <h4>New Video</h4>

          <form className={styles.form} onSubmit={this.onSubmit}>
            <div className={styles.formgroup}>
              <label htmlFor="video_add_form_camera">CAMERA</label>

              {cameras.length > 0 ? (
                <Fragment>
                  <select
                    name="camera"
                    id="video_add_form_camera"
                    onChange={this.onChange}
                  >
                    {cameras.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Fragment>
              ) : (
                <select></select>
              )}
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="video_add_form_camera_angle">CAMERA ANGLE</label>

              {camera_angles.length > 0 ? (
                <Fragment>
                  <select
                    name="camera_angle"
                    id="video_add_form_camera_angle"
                    onChange={this.onChange}
                  >
                    {camera_angles.map((c, i) => (
                      <option key={i} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Fragment>
              ) : (
                <select></select>
              )}
            </div>

            <div className={styles.formgroup}>
              <label htmlFor="video_add_form_description">DESCRIPTION</label>
              <textarea 
                name="description"
                id="video_add_form_description"
                rows={4}
                onChange={this.onChange}
              ></textarea>
            </div>

            <div className={styles.formgroup}>
              <input
                type="file"
                name="video"
                id="video_add_form_video"
                onChange={this.onChange}
              />
            </div>

            <div className={styles.formgroup3}>
              <button
                type="reset"
                className={`.button_reset ${styles.resetbtn}`}
              >
                Reset
              </button>
              <button
                type="submit"
                className={`.button_primary ${styles.submitbtn}`}
              >
                UPLOAD
              </button>
            </div>
          </form>
        </div>

        <div className={styles.overlay} id="videoAddWindowOverlay"></div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profileReducer.activeProfile,
  session: state.sessionReducer.activeSession,
  cameras: state.cameraReducer.cameras,
  camera_angles: state.cameraReducer.camera_angles,
});

export default connect(mapStateToProps, {
  addTempVideo,
  getCameras,
  getCameraAngles,
})(AddVideo);
