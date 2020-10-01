import React from 'react';
import {connect} from 'react-redux';
import {
  Dialog, DialogTitle, DialogContent,
  Typography, DialogActions, Button,
} from '@material-ui/core';
import {closeConfirmDialog} from '../../../actions/confirmDialogAction';

class ConfirmDialog extends React.Component {
  render() {
    const {dispatch} = this.props;
    const {open, title, message, onClose} = this.props.confirmDialogState;
    return (
      <Dialog
        onClose={() => dispatch(closeConfirmDialog())}
        aria-labelledby="customized-dialog-title"
        open={open}>
        <DialogTitle id="customized-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            onClose(true);
            dispatch(closeConfirmDialog(true));
          }} color="primary">
            Sim
          </Button>
          <Button onClick={() => dispatch(closeConfirmDialog())} color="secondary">
            Não
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapStateToProps = (state) => ({
  confirmDialogState: state.confirmDialogState,
});

export default connect(mapStateToProps)(ConfirmDialog);
