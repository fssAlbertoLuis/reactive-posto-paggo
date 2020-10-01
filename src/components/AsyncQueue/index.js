import React from 'react';
import {connect} from 'react-redux';
import {withStyles, CircularProgress, Typography} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    backgroundColor: 'white',
    position: 'fixed',
    width: '100%',
    height: '100%',
    zIndex: 10000,
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    justify: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  infoText: {
    margin: theme.spacing(1),
  },
});

class AsyncQueue extends React.Component {
  render() {
    const {classes, asyncQueueState} = this.props;
    return (
      <div>
        {
          asyncQueueState.length > 0 &&
          <div className={classes.root}>
            <div className={classes.info}>
              <div><CircularProgress size={80} /></div>
              <div className={classes.infoText}>
                <Typography variant="h5" color="primary">
                  {asyncQueueState[0]}
                </Typography>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  asyncQueueState: state.asyncQueue,
});

export default connect(mapStateToProps)(
    withStyles(styles)(AsyncQueue)
);
