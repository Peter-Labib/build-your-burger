import React, { useState, useEffect } from 'react'
import Modal from '../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponents, axios) => {
    return props => {
        const [error, setError] = useState(null)
        const reqInterceptors = axios.interceptors.request.use(req => {
            setError(false)
            return req
        })

        const resInterceptors = axios.interceptors.response.use(res => res, err => setError(err))

        useEffect(() => {
            return () => {
                axios.interceptors.request.eject(reqInterceptors)
                axios.interceptors.response.eject(resInterceptors)
            }
        }, [reqInterceptors, resInterceptors])

        const errorConfirmedHandler = () => {
            setError(false)
        }


        return (
            <React.Fragment>
                <Modal show={error} modalClosed={errorConfirmedHandler}>{error ? error.message : null}</Modal>
                <WrappedComponents {...props} />
            </React.Fragment>
        )
    }
}

export default withErrorHandler