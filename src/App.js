import React, { useEffect, Suspense } from 'react'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreate from './store/actions/index'

import Layout from './components/Layout/Layout'
import './App.css'
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
const Checkout = React.lazy(() => import('./container/Checkout/Checkout'))
const Orders = React.lazy(() => import('./container/Orders/Orders'))
const Auth = React.lazy(() => import('./container/Auth/Auth'))
const Logout = React.lazy(() => import('./container/Auth/Logout/Logout'))

const App = props => {
  const { onTryAutoSignup } = props
  
  useEffect(() => {
    onTryAutoSignup()
  }, [onTryAutoSignup])

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" render={(props) => <Logout {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <div className="App">
      <Layout>
        <Suspense fallback={() => <div>loading...</div>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.idToken != null
  }
}

const mapDispatchToprops = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actionCreate.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToprops)(App));
