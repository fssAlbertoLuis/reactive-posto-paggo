import React from 'react';
import { connect } from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import BusinessIcon from '@material-ui/icons/Business';
import LoaderDiv from '../../utils/components/LoaderDiv';
import { getCompanyApi } from '../../actions/adminAction';
import CreateCompanyForm from './CreateCompanyForm';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(1),
  },
});

class ViewCompany extends React.Component {

  componentDidMount() {
    const {dispatch} = this.props;
    this.id = this.props.match.params.id;
    dispatch(getCompanyApi(this.id));
  }

  send = (company) => {
    console.log(company);
  }

  render() {
    const {classes, adminState} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <LoaderDiv text="Carregando usuário" />
          {
            adminState.company &&
            <>
              <CommonHeaderText
                title="Visualizar/Editar empresa"
                Icon={BusinessIcon}
                variant="h5"
              />
              <CreateCompanyForm
                companyData={adminState.company}
                handleSubmit={this.send}
                loading={adminState.loading}
              />
            </>
          }
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  adminState: state.adminState,
});

export default connect(mapStateToProps)(
  withStyles(styles)(ViewCompany)
);
