import React, { useState } from 'react'
import { connect } from 'react-redux'
import styles from './Layout.module.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = props => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsVisible(false)
    }

    const sideDrawerToggleHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible)
    }

    return (
        <React.Fragment>
            <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />
            <SideDrawer isAuth={props.isAuthenticated} closed={sideDrawerCloseHandler} open={sideDrawerIsVisible} />
            <main className={styles.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.idToken != null
    }
}

export default connect(mapStateToProps)(Layout)