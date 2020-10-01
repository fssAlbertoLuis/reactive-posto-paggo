import React from 'react';
import {withStyles} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
    [theme.breakpoints.up('md')]: {
      flexGrow: 1,
      padding: theme.spacing(3),
      width: 'calc(100% - 298px)',
      margin: '0px 250px',
    },
  },
});

class MainContent extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        {this.props.children}
      </div>
    );
  }
}

export default withStyles(styles)(MainContent);
