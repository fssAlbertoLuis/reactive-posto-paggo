import React from 'react';
import {IconButton, CircularProgress} from '@material-ui/core';

class LoaderIconButton extends React.Component {
  render() {
    const {Icon, loading, label, loaderSize, ...props} = this.props;
    return (
      <div>
        { !loading ?
          <IconButton aria-label={label} {...props}>
            <Icon />
          </IconButton> :
          <IconButton disabled aria-label={label}>
            <CircularProgress size={loaderSize}></CircularProgress>
          </IconButton>
        }
      </div>
    );
  }
}

export default LoaderIconButton;
