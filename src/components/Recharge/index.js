import React from 'react';
import {connect} from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles, Button} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import AutoRenewIcon from '@material-ui/icons/Autorenew';
import RechargeForm from './RechargeForm';
import SearchCustomerForm from './SearchCustomerForm';
import { searchCustomerApi } from '../../actions/customerAction';
import { rechargeCustomerApi } from '../../actions/rechargeAction';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
});

class Recharge extends React.Component {

  state = {
    customer: null,
    customerError: null,
    rechargeError: null,
    loadingCustomer: false,
    loadingRecharge: false,
  }

  setCustomerError = (customerError) => {
    this.setState({customerError});
  }
  resetCustomer = () => {
    this.setState({
      customer: null,
      customerError: null,
      rechargeError: null,
      loadingCustomer: false,
      loadingRecharge: false,
    });
  }

  resetForm = () => {
    this.setState({
      customerError: null,
      rechargeError: null,
      loadingCustomer: false,
      loadingRecharge: false,
    });
  }

  toggleLoadingCustomer = () => {
    this.setState({loadingCustomer: !this.state.loadingCustomer});
  }
  toggleLoadingRecharge = () => {
    this.setState({loadingRecharge: !this.state.loadingRecharge});
  }

  setCustomer = (customer) => {
    this.setState({customer});
  }  

  searchCustomer = (search) => {
    this.resetCustomer();
    this.props.dispatch(searchCustomerApi(
      search, this.toggleLoadingCustomer, this.setCustomer, this.setCustomerError
    ));
  }

  sendRecharge = (rechargeAmount) => {
    const rechargeInfo = {
      customerId: this.state.customer.id,
      amount: rechargeAmount,
    };
  
    this.props.dispatch(rechargeCustomerApi(
      rechargeInfo,
      this.toggleLoadingRecharge,
      this.resetForm
    ));
  }

  render() {
    const {classes} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <CommonHeaderText
            title="Realizar recarga"
            subtitle="Realizar recarga para um cliente"
            Icon={AutoRenewIcon}
            variant="h6"
          />
          {!this.state.customer ? (
            <SearchCustomerForm 
              searchCustomer={this.searchCustomer}
              loading={this.state.loadingCustomer}
              error={this.state.customerError}
            />
          ) : (
            <div style={{textAlign: 'center', magin: 8}}>
              <Button 
                type="button" 
                variant="contained" 
                color="primary" 
                onClick={this.resetCustomer}
                disabled={this.state.loadingRecharge}
              >
                Buscar outro cliente
              </Button>
            </div>
          )}
          {this.state.customer ? (
            <RechargeForm 
              customer={this.state.customer}
              sendRecharge={this.sendRecharge}
              loading={this.state.loadingRecharge}
              error={this.state.rechargeError}
            />
          ) : ''}
        </Paper>
      </MainContent>
    );
  }
}

export default connect()(withStyles(styles)(Recharge));
