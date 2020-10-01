import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { flashMessageClose } from '../../actions/flashMessage';
import { Snackbar, withStyles, IconButton, SnackbarContent } from '@material-ui/core';
import { green, amber, blue } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: blue[400],
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  margin: {
    margin: theme.spacing(1),
  },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class FlashMessages extends React.Component {

  handleClose = () => {
    const { dispatch } = this.props;
    dispatch(flashMessageClose());
  }

  render() {
    const { 
        flashMessages, 
        classes
    } = this.props;

    const variant = flashMessages.type;
    const Icon = variantIcon[variant];
    const background = classes[variant];
    return (
      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={flashMessages.open}
        autoHideDuration={5000}
        onClose={this.handleClose}
      >
        <SnackbarContent
          className={clsx(background, classes.margin)}
          aria-describedby="informative-snackbar"
          message={
            <span id="informative-snackbar" className={classes.message}>
              <Icon className={clsx(classes.icon, classes.iconVariant)} />
              {flashMessages.message}
            </span>
          }
          action={[
            <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleClose}>
                <CloseIcon className={classes.icon} />
            </IconButton>
          ]}
        />
      </Snackbar>
    )
  }
}

const mapStateToProps = (state) => ({
    flashMessages: state.flashMessagesState
});

export default connect(mapStateToProps)(
    withStyles(styles)(FlashMessages)
);