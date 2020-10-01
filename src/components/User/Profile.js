import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import PersonIcon from '@material-ui/icons/Person';
import { editUserProfile, } from '../../actions/userAction';
import { ObjectHandling } from '../../utils/ObjectHandling';
import ProfileEditForm from './ProfileEditForm';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
});

class Profile extends React.Component {

  constructor(props) {
    super(props);
    this.user = this.props.authState.user.info;
  }
  send = (user) => {
    let newUser = Object.assign({}, user);
    newUser = ObjectHandling.removeEmptyValues(newUser);
    this.props.dispatch(editUserProfile(newUser));
  }

  render() {
    const {classes, userState} = this.props;
    this.user.password = '';
    this.user.r_password = '';
    return (
      <MainContent>
        <Paper className={classes.root}>
          {
            this.user &&
            <>
              <CommonHeaderText
                title="Perfil de usuário"
                Icon={PersonIcon}
                variant="h5"
              />
              <ProfileEditForm
                user={this.user}
                handleSubmit={this.send}
                loading={userState.loading}
              />
            </>
          }
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState,
  userState: state.userState,
});

export default connect(mapStateToProps)(
  withStyles(styles)(Profile)
);
