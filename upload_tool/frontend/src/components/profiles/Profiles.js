import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import styles from "./Profiles.module.css";
import {
  getProfiles,
  setActiveProfile,
  deleteProfile,
} from "../../actions/ProfileActions";
import AddProfile from "./addProfile/AddProfile";
import ProfilePage from "../profilePage/ProfilePage";

export class Profiles extends Component {
  static propTypes = {
    profiles: PropTypes.array.isRequired,
    getProfiles: PropTypes.func.isRequired,
    setActiveProfile: PropTypes.func.isRequired,
    deleteProfile: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      searchVal: "",
      adding: false,
    };
  }

  componentDidMount() {
    this.fetchProfiles();
  }

  fetchProfiles = () => {
    axios
      .get("/api/profiles/")
      .then((res) => {
        // console.log(res.data)
        this.props.getProfiles(res.data);
      })
      .catch((err) => console.log(err));
  };

  onSearchValChange = (e) => {
    this.setState({
      searchVal: e.target.value,
    });
  };

  search = (e) => {
    e.preventDefault();
    console.log(e);
  };

  deleteProfile = (id) => {
    // console.log(id);

    axios
      .delete(`/api/delete-profile/${id}`)
      .then((res) => {
        console.log(res.data);
        this.props.deleteProfile(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toProfileHandler = (profile) => {
    // console.log(profile);
    this.props.setActiveProfile(profile);
    this.props.history.push({
      pathname: "/profile_detail",
    });
  };

  addProfileHandler = () => {
    this.setState({
      adding: true,
    });
  };

  closeAddingWindow = () => {
    this.setState({ adding: false });
  };

  render() {
    const { searchVal, adding } = this.state;
    const profiles = this.props.profiles;

    return (
      <div className={styles.container}>
        <h2>Profiles</h2>

        <div className={styles.search_container}>
          <form onSubmit={this.search} className={styles.form}>
            <input
              id="searchField"
              name="searchField"
              placeholder="Search profiles..."
              type="text"
              onChange={this.onSearchValChange}
              value={searchVal}
            />

            <button type="submit">
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <title>Search</title>
                <path d="M9.516 14.016q1.875 0 3.188-1.313t1.313-3.188-1.313-3.188-3.188-1.313-3.188 1.313-1.313 3.188 1.313 3.188 3.188 1.313zM15.516 14.016l4.969 4.969-1.5 1.5-4.969-4.969v-0.797l-0.281-0.281q-1.781 1.547-4.219 1.547-2.719 0-4.617-1.875t-1.898-4.594 1.898-4.617 4.617-1.898 4.594 1.898 1.875 4.617q0 0.984-0.469 2.227t-1.078 1.992l0.281 0.281h0.797z"></path>
              </svg>
            </button>
          </form>

          <button
            className={`button_primary ${styles.addbtn}`}
            onClick={this.addProfileHandler}
          >
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M5 13h6v6c0 0.552 0.448 1 1 1s1-0.448 1-1v-6h6c0.552 0 1-0.448 1-1s-0.448-1-1-1h-6v-6c0-0.552-0.448-1-1-1s-1 0.448-1 1v6h-6c-0.552 0-1 0.448-1 1s0.448 1 1 1z"></path>
            </svg>
            New
          </button>
        </div>

        <div className={`${styles.table} table-responsive`}>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>CLINIC NO</th>
                <th>CHILD NAME</th>
                <th>DATE OF BIRTH</th>
                <th>GENDER</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {profiles.map((profile, index) => (
                <tr key={index}>
                  <td>{profile.clinic_no}</td>
                  <td>{profile.name}</td>
                  <td>{profile.dob}</td>
                  <td>{profile.sex}</td>
                  <td>
                    <button
                      className={styles.viewbtn}
                      onClick={this.toProfileHandler.bind(this, profile)}
                    >
                      <svg
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                      >
                        <path d="M19.414 27.414l10-10c0.781-0.781 0.781-2.047 0-2.828l-10-10c-0.781-0.781-2.047-0.781-2.828 0s-0.781 2.047 0 2.828l6.586 6.586h-19.172c-1.105 0-2 0.895-2 2s0.895 2 2 2h19.172l-6.586 6.586c-0.39 0.39-0.586 0.902-0.586 1.414s0.195 1.024 0.586 1.414c0.781 0.781 2.047 0.781 2.828 0z"></path>
                      </svg>
                    </button>

                    <button
                      className={styles.removebtn}
                      onClick={this.deleteProfile.bind(this, profile.id)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {adding ? <AddProfile close={this.closeAddingWindow} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  profiles: state.profileReducer.profiles,
});

export default connect(mapStateToProps, {
  getProfiles,
  setActiveProfile,
  deleteProfile,
})(Profiles);
