import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
    AppBar, Toolbar, withStyles, IconButton, Drawer,
    Divider, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core';
import { signOutApi } from '../../actions/signIn';
import CollapsableLink from './CollapsableLink';
import MenuIcon from '@material-ui/icons/Menu';
import NavBarProfileHeader from './NavBarProfileHeader';

const styles = theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none !important',
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    list: {
        width: 250,
    },
});

class MobileNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, collapse: false };
    }

    handleClose = () => {
        this.setState({open: !this.state.open});
    }

    drawerContent = () => {
        const { classes, dispatch, user } = this.props;
        return (
            <div className={classes.list} role="presentation">
                <NavBarProfileHeader user={user} handleClose={this.handleClose}/>
                <Divider />
                <List>
                    {
                        this.props.links.map((link, index) => (
                            link.sublinks ? <CollapsableLink key={index} link={link} handleClose={this.handleClose} /> :
                            <Link key={index} to={link.path} className={classes.link}>
                                <ListItem button key={index} onClick={this.handleClose}>
                                    { link.icon ? 
                                        <ListItemIcon><link.icon /></ListItemIcon> :
                                        ''
                                    }
                                    <ListItemText primary={link.title} />
                                </ListItem>                                
                            </Link>
                        ))
                    }
                    <ListItem button onClick={() => dispatch(signOutApi())}>
                        <ListItemText primary="Sair" />
                    </ListItem>
                </List>
            </div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                    <IconButton 
                        edge="start" className={classes.menuButton} 
                        color="inherit" aria-label="menu" onClick={this.handleClose}>
                        <MenuIcon />
                    </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onClose={this.handleClose}>
                    {this.drawerContent()}
                </Drawer>
            </div>
        );
    }
}

export default connect()(withStyles(styles)(MobileNav));
