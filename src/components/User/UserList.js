import React from 'react';
import {connect} from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, Hidden} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import ListIcon from '@material-ui/icons/List';
import CommonTable from '../../utils/components/CommonTable';
import CommonList from '../../utils/components/CommonList';
import { getUserListApi, resetList, getUserPageListApi, updateCurrentPage } from '../../actions/userAction';
import { ListActions } from '../../actions/listAction';

class UserList extends React.Component {

  state = {loading: false}

  columns = [
    ['name', 'Nome'], 
    ['email', 'E-mail'], 
    ['permission', 'Permissao', (value) => this.translatePermission(value)],
  ];

  toggleLoading = () => {
    this.setState({loading: !this.state.loading});
  }

  translatePermission = (value) => {
    const values = {
      user: 'frentista', manager: 'gerente', 'general-manager': 'Gerente geral'
    };
    return values[value];
  }

  changePage = (page) => {
    const listData = this.props.userState;
    if ((Date.now() - listData.lastUpdate) > process.env.REACT_APP_REFRESH_TIME) {
      this.props.dispatch(resetList());
      this.props.dispatch(getUserPageListApi(page+1, listData.list.meta.per_page, this.toggleLoading));
    } else {
      this.props.dispatch(ListActions.changePage(
        listData,
        page+1,
        updateCurrentPage,
        getUserPageListApi,
        this.toggleLoading
      ));
    }
  }

  changeRowsPerPage = (perPage) => {
    this.props.dispatch(resetList());
    this.props.dispatch(getUserPageListApi(1, perPage, this.toggleLoading));
  }

  componentDidMount() {
    const {dispatch, userState} = this.props;
    if (!userState.list || !userState.list.data || !userState.list.data.length ||
      (Date.now() - userState.lastUpdate) > process.env.REACT_APP_REFRESH_TIME
    ) {
      dispatch(getUserListApi());
    }
  }
  handleClickRow = (index) => {
    const user = this.props.userState.list.data[index];
    this.props.history.push(`/user/view/${user.id}`);
  }
  render() {
    const {userState} = this.props;
    return (
      <MainContent>
        <Paper style={{padding: '4px'}}>
          <CommonHeaderText
            title="Lista de usuários"
            Icon={ListIcon}
            variant="h5"
          />
          <div style={{padding: '4px', margin: '4px'}}>
            <Hidden smDown>
              <CommonTable
                loading={userState.loading||this.state.loading}
                columns={this.columns}
                rows={userState.list}
                onClickRow={this.handleClickRow}
                changePage={this.changePage}
                changeRowsPerPage={this.changeRowsPerPage}
              />
            </Hidden>
            <Hidden mdUp>
              <CommonList
                loading={userState.loading||this.state.loading}
                rows={userState.list}
                title="name" 
                subtitle={['email', ['permission', this.translatePermission]]}
                onCLickRow={this.handleClickRow}
                changePage={this.changePage}
              />
            </Hidden>
          </div>
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  userState: state.userState,
});

export default connect(mapStateToProps)(UserList);
