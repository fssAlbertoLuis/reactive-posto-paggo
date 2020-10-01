import React from 'react';
import {connect} from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles, Hidden, Chip} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import ListIcon from '@material-ui/icons/List';
import { getRechargeListApi, getRechargePageListApi, updateCurrentPage, resetList } from '../../actions/rechargeAction';
import CommonTable from '../../utils/components/CommonTable';
import CommonList from '../../utils/components/CommonList';
import { ListActions } from '../../actions/listAction';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
});

class RechargeList extends React.Component {
  state = {loading: false, loadingPage: false};

  listSubtitle = [
    ['user.name', (value) => `Vendedor: ${value}`],
    ['customer.name', (value) => `Cliente: ${value}`]
  ];

  listActions = [
    ['pending', (value) => this.pendingInfo(value)]
  ];
  
  toMoney = (value) => 'R$ '+String(parseFloat(value).toFixed(2)).replace('.', ',');

  pendingInfo = (value) => {
    if (value) {
      return <Chip label="pendente" variant="outlined" color="secondary" />;
    } else {
      return <Chip label="Liberado" variant="outlined" color="primary" />;
    }
  }

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  }
  toggleLoadingPage = () => {
    this.setState({loadingPage: !this.state.loadingPage});
  }

  changePage = (page) => {
    const listData = this.props.rechargeState;
    if ((Date.now() - listData.lastUpdate) > process.env.REACT_APP_REFRESH_TIME) {
      this.props.dispatch(resetList());
      this.props.dispatch(getRechargePageListApi(page+1, listData.list.meta.per_page, this.toggleLoading));
    } else {
      this.props.dispatch(ListActions.changePage(
        listData,
        page+1,
        updateCurrentPage,
        getRechargePageListApi,
        this.toggleLoading
      ));
    }
  }

  changeRowsPerPage = (perPage) => {
    this.props.dispatch(resetList());
    this.props.dispatch(getRechargePageListApi(1, perPage, this.toggleLoading));
  }

  componentDidMount() {
    const {dispatch, rechargeState} = this.props;
    if (!rechargeState.list || !rechargeState.list.data || !rechargeState.list.data.length ||
      (Date.now() - rechargeState.lastUpdate) > process.env.REACT_APP_REFRESH_TIME
    ) {
      dispatch(getRechargeListApi(this.toggleLoading));
    }
  }

  loadMoreItems = (startIndex, stopIndex) => {
    const {dispatch, rechargeState} = this.props;
    const list = rechargeState.list.data;
    if (!list[startIndex] && !this.state.loadingPage) {
      if (startIndex >= list.length && startIndex < rechargeState.list.meta.total) {
        const page = 1 + Math.floor(parseInt(startIndex, 10) / parseInt(rechargeState.list.meta.per_page));
        console.log(startIndex, page);
        dispatch(getRechargePageListApi(page, 10, this.toggleLoadingPage));
      }
    }
  }
  render() {
    const {classes, rechargeState} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <CommonHeaderText title="Lista de recargas" Icon={ListIcon} variant="h5" />
          <Hidden smDown>
            <CommonTable
              loading={this.state.loading}
              columns={[
                ['amount', 'Quantidade', (value) => this.toMoney(value)], 
                ['user.name', 'Frentista'],
                ['customer.name', 'Cliente'],
                ['pending', 'Situação', (value) => this.pendingInfo(value)]
              ]}
              rows={rechargeState.list}
              changePage={this.changePage}
              changeRowsPerPage={this.changeRowsPerPage}
            />
          </Hidden>
          <Hidden mdUp>
              <CommonList
                loading={this.state.loading}
                rows={rechargeState.list}
                title={[
                  'amount', (value) => 
                    `Recarga no valor de: ${this.toMoney(value)}`
                ]}
                subtitle={this.listSubtitle}
                actions={this.listActions}
                changePage={this.changePage}
              />
          </Hidden>
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = state => ({
  rechargeState: state.rechargeState,
});

export default connect(mapStateToProps)(withStyles(styles)(RechargeList));
