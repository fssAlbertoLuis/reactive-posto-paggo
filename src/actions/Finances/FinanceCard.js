import React from 'react';
import {Redirect} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import {
  Card,
  CardContent,
  Typography,
  Divider, withStyles, CardActions, Button,
} from '@material-ui/core';
import TodayIcon from '@material-ui/icons/Today';

const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(1),
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: theme.spacing(2),
    color: '#606060',
  },
});

class FinanceCard extends React.Component {
  state = {redirect: false};

  redirect = () => {
    this.setState({redirect: true});
  }

  render() {
    const {classes, title, value, url} = this.props;
    const parts = String(parseFloat(value).toFixed(2)).split('.');
    return (
      <Card className={classes.root}>
        {this.state.redirect ? (
          <Redirect to={{
            pathname: url,
            state: this.props.location,
          }}/>
        ) : ''}
        <CardContent>
          <Typography
            className={classes.title}
            gutterBottom
            variant="h5"
            component="h6"
          >
            <TodayIcon /> {title}
          </Typography>
          <Divider />
          <div className={classes.content}>
            <Typography variant="h4">
              <CurrencyFormat 
                value={parts[0]} 
                displayType={'text'} 
                thousandSeparator="." 
                decimalSeparator="," 
                prefix="R$" 
              />,
            </Typography>
            <Typography variant="h6">{parts[1]}</Typography>
          </div>
        </CardContent>
        <CardActions>
          {url ? (
            <Button
              size="small"
              color="primary"
              onClick={() => this.redirect()}
            >
            Nova recarga
            </Button>
          ): ''}
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(FinanceCard);
