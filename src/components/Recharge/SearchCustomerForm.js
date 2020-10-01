import React from 'react';
import {Grid, withStyles, TextField, InputAdornment} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import LoaderButton from '../../utils/components/LoaderButton';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
});

class SearchCustomerForm extends React.Component {
  state = {
    search: '',
  };

  handleChange = (e) => {
    this.setState({search: e.target.value});
  }

  render() {
    const {classes, searchCustomer, loading, error} = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();searchCustomer(this.state.search);
      }}>
        <Grid container className={classes.root} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              error={error !== null}
              helperText={error}
              name="search"
              label="Buscar cliente por email ou celular"
              value={this.state.search}
              onChange={this.handleChange}
              margin="normal"
              variant="outlined"
              fullWidth
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item>
            <LoaderButton
              label="Buscar"
              loadingLabel="Buscando..."
              type="submit" 
              variant="contained"
              loading={loading}
              disabled={!this.state.search||loading}
              color="primary"
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default withStyles(styles)(SearchCustomerForm);
