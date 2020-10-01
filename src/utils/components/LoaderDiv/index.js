import React from 'react';
import {connect} from 'react-redux';
import {Typography, CircularProgress} from '@material-ui/core';

class LoaderDiv extends React.Component {
  render() {
    const {text, loaderState} = this.props;
    return (
      loaderState.loading ?
      <div style={{
        padding: '12px',
        textAlign: 'center',
      }}>
        <CircularProgress size={50}></CircularProgress>
        <Typography variant="h5" gutterBottom>{text}</Typography>
      </div> : <div></div>
    );
  }
}

const mapStateToProps = (state) => ({
  loaderState: state.loaderState,
});

export default connect(mapStateToProps)(LoaderDiv);
