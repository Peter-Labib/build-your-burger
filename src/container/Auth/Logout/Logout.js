import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as actionCreate from '../../../store/actions/index'


const Logout = props => {
    const { onLogout } = props

    useEffect(() => {
        onLogout()
    }, [onLogout])

    return <Redirect to="/" />
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actionCreate.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)
