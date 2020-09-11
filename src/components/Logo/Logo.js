import React from 'react'
import styles from './Logo.module.css'
import BurgerLogo from '../../assets/images/burger-logo.png'

const Logo = (props) => (
    <div className={styles.Logo} style={{ height: props.height }}>
        <img alt="logo" src={BurgerLogo} />
    </div >
)

export default Logo