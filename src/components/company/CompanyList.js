import React from 'react';
import {connect} from 'react-redux';
import {Paper, withStyles, Hidden} from '@material-ui/core';
import MainContent from '../../utils/MainContent';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import ListIcon from '@material-ui/icons/List';
import CommonTable from '../../utils/components/CommonTable';
import CommonList from '../../utils/components/CommonList';
import { getCompanyListApi } from '../../actions/adminAction';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(2),
  },
});

class CompanyList extends React.Component {
  state = {loading: false};

  toggleLoading = () =>{
    this.setState({loading: !this.state.loading});
  }

  componentDidMount() {
    const {dispatch, adminState} = this.props;
    if (!adminState.list || !adminState.list.data.length ||
      (Date.now() - adminState.lastUpdate) > process.env.REACT_APP_REFRESH_TIME) {
      dispatch(getCompanyListApi(this.toggleLoading));
    }
  }

  render() {
    const {classes, adminState} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <CommonHeaderText
            title="Lista de empresas"
            Icon={ListIcon}
            variant="h5"
          />
          <Hidden smDown>
            <CommonTable
              loading={this.state.loading}
              columns={[
                ['name', 'Nome da empresa'],
                ['cnpj', 'Cnpj'],
                ['user.name', 'Proprietário'],
              ]}
              rows={adminState.list}
            />
          </Hidden>
          <Hidden mdUp>
            <CommonList
              loading={this.state.loading}
              rows={adminState.list}
              title={'name'}
              subtitle={['cnpj', 'user.name']}
            />
          </Hidden>
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = state => ({
  adminState: state.adminState,
});

export default connect(mapStateToProps)(withStyles(styles)(CompanyList));
