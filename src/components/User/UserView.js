import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import PersonIcon from '@material-ui/icons/Person';
import UserCreateForm from './UserCreateForm';
import { editUserApi, getUserApi, getUser, cleanUser } from '../../actions/userAction';
import LoaderDiv from '../../utils/components/LoaderDiv';
import { ObjectHandling } from '../../utils/ObjectHandling';
import EmployeeCreateForm from './EmployeeCreateForm';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
});

class UserView extends React.Component {

  componentDidMount() {
    const {dispatch, userState} = this.props;
    dispatch(cleanUser());
    this.id = this.props.match.params.id;
    if (userState.list) {
      const user = this.props.userState.list.data.filter(user => user.id === +this.id)[0];
      if (!this.props.userState.list.data.length || !user) {
        dispatch(getUserApi(this.id, this.props.history));
        this.user = this.props.userState.user;
      } else {
        dispatch(getUser(user));
      }
    } else {
      dispatch(getUserApi(this.id, this.props.history));
    }
  }

  send = (user) => {
    let newUser = Object.assign({}, user);
    newUser = ObjectHandling.removeEmptyValues(newUser);
    this.props.dispatch(editUserApi(newUser, this.id));
  }

  render() {
    const {classes, userState, authState} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <LoaderDiv text="Carregando usuário" />
          {
            userState.user &&
            <>
              <CommonHeaderText
                title="Visualizar/Editar usuário"
                Icon={PersonIcon}
                variant="h5"
              />
              {
                authState.user.info.permission === 'admin' ?
                  <UserCreateForm
                    mode="edit"
                    user={userState.user}
                    handleSubmit={this.send}
                    loading={userState.loading}
                  /> :
                  <EmployeeCreateForm
                    mode="edit"
                    user={userState.user}
                    handleSubmit={this.send}
                    loading={userState.loading}
                  />
              }
            </>
          }
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
  authState: state.authState,
});

export default connect(mapStateToProps)(
  withStyles(styles)(UserView)
);
