import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Divider, withStyles} from '@material-ui/core';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  subheader: {
    marginLeft: theme.spacing(1),
  },
});

class CommonHeaderText extends React.Component {
  render() {
    const {classes, title, subtitle, Icon, ...props} = this.props;
    return (
      <div className={classes.root}>
        <Typography className={classes.header} {...props}>
          { Icon ? <Icon /> : '' }
          {title}
        </Typography>
        <Typography className={classes.subheader} variant="subtitle1" gutterBottom>{subtitle}</Typography>
        <Divider />
      </div>
    );
  }
}

CommonHeaderText.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.object,

};
export default withStyles(styles)(CommonHeaderText);
