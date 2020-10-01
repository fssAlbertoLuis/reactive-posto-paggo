import React from 'react';
import {Button, CircularProgress} from '@material-ui/core';

class LoaderButton extends React.Component {
  render() {
    const {label, loading, loadingLabel, ...props} = this.props;
    return (
      <div style={{textAlign: 'center', padding: '20px'}}>
        { !loading ?
          <Button {...props}>
            {label}
          </Button> :
          <Button disabled variant="contained">
            <CircularProgress size={20}></CircularProgress>
            <span style={{marginLeft: '8px'}}>{loadingLabel}</span>
          </Button>
        }
      </div>
    );
  }
}

export default LoaderButton;
