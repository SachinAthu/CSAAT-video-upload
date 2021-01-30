import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import styles from "./AddProfile.module.css";
import { addProfile, updateProfile } from "../../../actions/ProfileActions";

export class AddProfile extends Component {
  static propTypes = {
      addProfile: PropTypes.func.isRequired,
      updateProfile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
        clinic_no: '',
        name: '',
        dob: '',
        consent_doc: ''
    }
  }

  componentDidMount() {}

  onChange = (e) => {
    if(e.target.name == "consent_doc"){
        this.setState({
            [e.target.name]: e.target.files[0]
        })  
    }else{
        this.setState({
            [e.target.name]: e.target.value
        })
    }
   
  }

  onSubmit = (e) => {
    e.preventDefault()
    const {clinic_no, name, dob, consent_doc} = this.state
    let sex = ''

    const male = document.getElementById('profile_add_form_m')
    const female = document.getElementById('profile_add_form_f')

    if(male.checked) sex = male.value
    else sex = female.value

    const formData = new FormData();
    formData.append('clinic_no', clinic_no);
    formData.append('name', name);
    formData.append('dob', dob);
    formData.append('sex', sex);
    formData.append('consent_doc', consent_doc);

    axios.post('api/add-profile/', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    }).then(res => {
        console.log('res', res.data)
        this.props.addProfile(res.data)
        this.close()
    }).catch(err => {
        console.log('err', err)
    })
  }

  close = () => {
    const modal = document.getElementById("profileAddWindow");
    const overlay = document.getElementById("profileAddWindowOverlay");

    modal.classList.add(`${styles.fadeout}`);
    overlay.classList.add(`${styles.overlay_fadeout}`);

    setTimeout(() => {
      this.props.close();
    }, 300);
  };

  render() {
    const {clinic_no, name, dob, consent_doc} = this.state

    return (
      <Fragment>
        <div className={styles.container} id="profileAddWindow">
          <button onClick={() => this.close()} className={styles.closebtn}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <title>Close</title>
            <path d="M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z"></path>
            </svg>
          </button>

        <h3>New Profile</h3>

        <form className={styles.form} onSubmit={this.onSubmit}>
            <div className={styles.formgroup}>
                <label htmlFor="profile_add_form_clinic_no">CLINIC No</label>
                <input type="text" name="clinic_no" id="profile_add_form_clinic_no" 
                value={clinic_no} onChange={this.onChange} />
            </div>

            <div className={styles.formgroup}>
                <label htmlFor="profile_add_form_name">CHILD NAME</label>
                <input type="text" name="name" id="profile_add_form_name" 
                value={name} onChange={this.onChange} />
            </div>

            <div className={styles.formgroup}>
                <label htmlFor="profile_add_form_dob">DATE OF BIRTH</label>
                <input type="date" name="dob" id="profile_add_form_dob" 
                value={dob} onChange={this.onChange} />
            </div>

            <div className={styles.formgroup2}>
                <label>GENDER</label>

                <input type="radio" id="profile_add_form_m" name="sex" value="Male"
                style={{marginLeft: 50, marginRight: 8}} />
                <label htmlFor="profile_add_form_m">Male</label>

                <input type="radio" id="profile_add_form_f" name="sex" value="Female" 
                style={{marginLeft: 25, marginRight: 8}}/>
                <label htmlFor="profile_add_form_f">Female</label>  
            </div>

            <div className={styles.formgroup}>
                <label htmlFor="profile_add_form_cdoc">CONSENT DOCUMENT</label>
                <input type="file" name="consent_doc" id="profile_add_form_cdoc"
                onChange={this.onChange} />
            </div>

            <div className={styles.formgroup3}>
                <button type="reset" className={`.button_reset ${styles.resetbtn}`}>Reset</button>
                <button type="submit" className={`.button_primary ${styles.submitbtn}`}>ADD</button>
            </div>
        </form>
        </div>

        <div className={styles.overlay} id="profileAddWindowOverlay"></div>
      </Fragment>
    );
  }
}

export default connect(null, {addProfile, updateProfile})(AddProfile);