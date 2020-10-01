import React from 'react';
import {connect} from 'react-redux';
import {Route, Redirect, Switch} from 'react-router-dom';
import {routes} from './routes';
import NotFound from '../notFound';
import {flashInfoMessage} from '../../actions/flashMessage';
import {getUserDataApi, stopSigningIn} from '../../actions/signIn';
import NavBar from '../NavBar';
import {getStatisticsApi} from '../../actions/dashboardAction';

class Routes extends React.Component {
  componentDidMount() {
    const auth = this.props.authState;
    if (auth.signedIn && auth.user.isEmpty && !auth.user.isLoading) {
      this.props.dispatch(getUserDataApi());
      this.props.dispatch(getStatisticsApi());
    }
  }
  componentDidUpdate() {
    const auth = this.props.authState;
    if (auth.signedIn && auth.user.isEmpty && !auth.user.isLoading) {
      this.props.dispatch(getUserDataApi());
      this.props.dispatch(getStatisticsApi());
    }
  }
  privateRoute({component: Component, permission, ...route}, index) {
    const {authState, dispatch} = this.props;
    return (
      <Route key={index} path={route.path} render={(props) => {
        if (authState.signedIn) {
          if (!authState.user.isEmpty) {
            if (
              !permission ||
              permission.includes(authState.user.info.permission)
            ) {
              return <Component {...props} />;
            } else {
              return <Redirect to={{
                pathname: '/404',
                state: props.location,
              }} />;
            }
          }
        } else {
          if (authState.signedOut) {
            dispatch(stopSigningIn());
          } else {
            dispatch(flashInfoMessage('Faça login primeiro'));
          }
          return (
            <Redirect to={{
              pathname: '/signin',
              state: {from: props.location},
            }} />
          );
        }
      }}/>
    );
  }

  render() {
    const {user} = this.props.authState;
    return (
      <div style={{height: '100%'}}>
        { !user.isEmpty && <NavBar /> }
        <Switch>
          <Redirect from="/" exact to="/signin" />
          {routes.map((route, index) => {
            return route.authRequired ? (
              this.privateRoute(route, index)
             ) : (
              <Route
                key={index} path={route.path} component={route.component}
              />
            );
          })}
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(Routes);
