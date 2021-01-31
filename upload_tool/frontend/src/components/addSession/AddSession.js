import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";

class AddSession extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div>
                add session
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer.activeProfile,
    sessions: state.sessionReducer.sessions,
  });

export default connect(mapStateToProps) (connAddSession)
