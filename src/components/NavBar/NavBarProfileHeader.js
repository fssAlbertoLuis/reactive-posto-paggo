import React from 'react';
import {connect} from 'react-redux';
import {
  IconButton, withStyles, Card, Typography, CardHeader, Avatar,
} from '@material-ui/core';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';

const styles = (theme) => ({
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
  spacer: {
    flex: 1,
  },
  card: {
    boxShadow: 'none',
  },
  cardTitle: {
    fontSize: '1.1rem',
    width: '230px',
  },
  cardSubheader: {
    width: '230px',
  },
  img: {
    width: 30,
    height: 'auto',
  },
});

class NavBarProfileHeader extends React.Component {
  render() {
    const {classes, user, handleClose} = this.props;
    return (
      <div>
        <div className={classes.drawerHeader}>
          <Avatar
            alt="postopago"
            src="/logo.png"
            classes={{img: classes.img}}
          />
          <Typography variant="h6">Posto paggo</Typography>
          <div className={classes.spacer} />
          <IconButton onClick={handleClose}>
            <KeyboardArrowLeftIcon />
          </IconButton>
        </div>
        <div>
          <Card classes={{root: classes.card}}>
            <CardHeader
              title={user.name}
              subheader={user.company.name}
              classes={{
                title: classes.cardTitle,
                subheader: classes.cardSubheader,
              }}
              titleTypographyProps={{noWrap: true, title: user.name}}
              subheaderTypographyProps={{
                noWrap: true, title: user.company.name,
              }}
            />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState,
});

export default connect(mapStateToProps)(
    withStyles(styles)(NavBarProfileHeader)
);
