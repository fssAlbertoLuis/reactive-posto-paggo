import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import PersonIcon from '@material-ui/icons/Person';
import UserCreateForm from './UserCreateForm';
import { userInsertApi } from '../../actions/userAction';
import EmployeeCreateForm from './EmployeeCreateForm';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
});

class UserCreate extends React.Component {
  constructor(props) {
    super(props);
    this.userPermission = this.props.authState.user.info.permission;
    this.user = {
      name: '', email: '', password: '', r_password: ''
    };
    if (this.userPermission === 'admin') {
      this.user['is_admin'] = false;
    } else {
      this.user['permission'] = '';
    }
  }

  send = (user) => {
    this.props.dispatch(userInsertApi(user, this.props.history));
  }

  render() {
    const {classes, userState} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <CommonHeaderText
            title={this.userPermission === 'admin' ? 'Novo usuário' : 'Novo funcionário'}
            Icon={PersonIcon}
            variant="h5"
          />
          {
            this.permission ?
              <UserCreateForm
                user={this.user} 
                handleSubmit={this.send} 
                loading={userState.loading}
              /> :
              <EmployeeCreateForm
                user={this.user} 
                handleSubmit={this.send} 
                loading={userState.loading}
              />
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
  withStyles(styles)(UserCreate)
);
