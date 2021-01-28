import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'

import styles from './App.module.css'
import Header from './components/layout/header/Header'
import Footer from './components/layout/footer/Footer'

class App extends Component {
    render(){
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Header />
                </div>

                <div className={styles.content}>
                    content
                </div>

                <Footer />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))