import React from 'react';
import MainContent from '../../utils/MainContent';
import {Paper} from '@material-ui/core';

class NotFound extends React.Component {
  render() {
    return (
      <MainContent>
        <Paper>
          not found
        </Paper>
      </MainContent>
    );
  }
}

export default NotFound;
