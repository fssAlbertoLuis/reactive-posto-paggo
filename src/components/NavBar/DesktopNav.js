import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {
  AppBar, Toolbar, withStyles, Drawer, Divider,
  List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import {signOutApi} from '../../actions/signIn';
import CollapsableLink from './CollapsableLink';
import NavBarProfileHeader from './NavBarProfileHeader';

const drawerWidth = 250;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  link: {
    color: 'inherit',
    textDecoration: 'none !important',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawer: {
    flexShrink: 1,
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    padding: theme.spacing(2),
  },
});

class DesktopNav extends React.Component {
  drawerContent() {
    const {classes, dispatch, user} = this.props;
    return (
      <div className={classes.list} role="presentation">
        <NavBarProfileHeader user={user} />
        <Divider />
        <List>
          {
            this.props.links.map((link, index) => {
              if (link.sublinks) {
                return (
                  <CollapsableLink
                    key={index}
                    link={link}
                    handleClose={this.handleClose}
                  />
                );
              } else {
                return (
                  <Link key={index} to={link.path} className={classes.link}>
                    <ListItem
                      button
                      key={index}
                      onClick={this.handleClose}>
                      {
                        link.icon ?
                          <ListItemIcon>
                            <link.icon />
                          </ListItemIcon> :
                            ''
                      }
                      <ListItemText primary={link.title} />
                    </ListItem>
                  </Link>
                );
              }
            })
          }
          <ListItem button onClick={() => dispatch(signOutApi())}>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </div>
    );
  }

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          <Drawer open variant="permanent" implementation="css" classes={{
            paper: classes.drawerPaper,
          }}>
            {this.drawerContent()}
          </Drawer>
        </nav>
      </div>
    );
  }
}

export default connect()(withStyles(styles)(DesktopNav));
