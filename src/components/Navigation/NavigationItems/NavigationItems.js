import React from 'react'
import styles from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => (
    <ul className={styles.NavigationItems}>
        <NavigationItem link="./" active>Burger Builder</NavigationItem>
        {props.isAuthenticated && <NavigationItem link="./orders">Orders</NavigationItem>}
        {props.isAuthenticated
            ? <NavigationItem link="./logout">Logout</NavigationItem>
            : <NavigationItem link="./auth">Authenticate</NavigationItem>}
    </ul>
)

export default navigationItems