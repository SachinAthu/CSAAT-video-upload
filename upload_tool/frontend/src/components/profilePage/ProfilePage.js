import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from "axios";
import { connect } from "react-redux";

import styles from './ProfilePage.module.css'
import AddProfile from '../profiles/addProfile/AddProfile'

export class ProfilePage extends Component {
    static propTypes = {
        profile: PropTypes.object.isRequired
    }

    constructor(props){
        super(props)
        this.state = {
            updating: false,
        }
    }

    render() {
        const {updating} = this.state

        return (
            <div className={styles.container}>
                <div className={styles.details}>
                    <h3>Details</h3>
                </div>

                <div className={styles.sessions}>
                    <h3>Sessions</h3>
                </div>

                {updating ? <AddProfile /> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer.activeProfile
});

export default connect(mapStateToProps)(ProfilePage)
