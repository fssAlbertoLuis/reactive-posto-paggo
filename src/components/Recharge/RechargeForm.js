import React from 'react';
import {withStyles, TextField, InputAdornment, Grid} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import LoaderButton from '../../utils/components/LoaderButton';

const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
});

class RechargeForm extends React.Component {
  state = {
    amount: 0,
    unmaskedAmount: 0,
  }

  resetForm = () => {
    this.setState({amount: 0});
  }

  handleChange = (value, formattedValue) => {
    this.setState({
      amount: formattedValue,
      unmaskedAmount: value
    });
  }

  render() {
    const {classes, sendRecharge, error, customer, loading} = this.props;
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        this.resetForm();
        sendRecharge(this.state.unmaskedAmount);
      }}>
        <div className={classes.root}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                value={customer.name}
                label="Nome do cliente"
                readOnly
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                variant="outlined"
                value={customer.email}
                label="Email do cliente"
                readOnly
                fullWidth
                margin="normal"
              />
            </Grid>
          </Grid>
          <CurrencyFormat
            error={error !== null}
            helperText={error}
            label="Valor da recarga"
            value={this.state.amount}
            thousandSeparator=""
            decimalSeparator=","
            decimalScale={2}
            allowNegative={false}
            disabled={loading}
            name="amount"
            onValueChange={({value, formattedValue}) => this.handleChange(value, formattedValue)}
            onFocus={(e) => e.target.select()}
            margin="normal"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  R$
                </InputAdornment>
              ),
            }}
            customInput={TextField}
            autoFocus
          />
          <LoaderButton
            type="submit"
            label="Enviar"
            loadingLabel="Enviando..."
            variant="contained" 
            loading={loading}
            disabled={!this.state.amount||loading}
            color="primary"
          />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(RechargeForm);
