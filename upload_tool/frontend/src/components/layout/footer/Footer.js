import React, { Component } from 'react'

import styles from './Footer.module.css'

class Footer extends Component {
    render() {
        return (
            <footer className={styles.container}>
                <span>&#169; Copyright <strong>CSAAT</strong>. All Rights Reserved</span>

                <div>Designed by <span className={styles.name}>sachinAthu</span></div>
            </footer>
        )
    }
}

export default Footer
