import React from 'react';
import {connect} from 'react-redux';
import MainContent from '../../utils/MainContent';
import {withStyles, Paper, Grid} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FinanceCard from '../../actions/Finances/FinanceCard';
import EarningsGraph from './EarningsGraph';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
});

class Dashboard extends React.Component {
  render() {
    const {classes, dashboardState} = this.props;
    const date = new Date();
    const month = date.toLocaleString('pt-BR', {month: 'long'});
    return (
      <MainContent>
        <Paper className={classes.root}>
          <CommonHeaderText
            title="Painel principal"
            Icon={DashboardIcon}
            variant="h5"
          />
          <Grid container alignItems="center" justify="center">
            <Grid item xs={12} md={6}>
              <FinanceCard
                title={'Recargas de ' + month}
                value={dashboardState.currentMonthEarnings}
                url="/recharge/new"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FinanceCard
                title="Total de recargas"
                value={dashboardState.totalEarnings}
                url="/recharge/new"
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} md={12}>
              <EarningsGraph statistics={dashboardState.yearEarnings} />
            </Grid>
          </Grid>
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  authState: state.authState,
  dashboardState: state.dashboardState,
});

export default connect(mapStateToProps)(
    withStyles(styles)(Dashboard)
);
