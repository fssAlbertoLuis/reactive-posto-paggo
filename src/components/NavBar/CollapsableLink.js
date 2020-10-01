import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem, ListItemText, withStyles, Collapse, List, ListItemIcon } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    link: {
        color: 'inherit',
        textDecoration: 'none !important',
    },
    nested: {
        paddingLeft: theme.spacing(4)
    }
});

class CollapsableLink extends React.Component {
    state = { open: false };

    handleClick  = () => {
        this.setState({open: !this.state.open});
    }

    render() {
        const { link, classes, handleClose } = this.props;
        return (
            <div>
            <ListItem button onClick={this.handleClick}>
                {link.icon ? <ListItemIcon><link.icon /></ListItemIcon> : ''}
                <ListItemText primary={link.title} />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        link.sublinks.map((sublink, i) => (
                            <Link key={i} to={sublink.path} className={classes.link}>
                                <ListItem button className={classes.nested} onClick={handleClose}>
                                    {sublink.icon ? <ListItemIcon><sublink.icon /></ListItemIcon> : ''}
                                    <ListItemText primary={sublink.title} />
                                </ListItem>
                            </Link>
                        ))
                    }
                </List>
            </Collapse>
        </div>  
        );
    }
}

export default withStyles(styles)(CollapsableLink);
