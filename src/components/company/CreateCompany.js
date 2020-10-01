import React from 'react';
import {connect} from 'react-redux';
import {Paper, withStyles} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import MainContent from '../../utils/MainContent';
import BusinessIcon from '@material-ui/icons/Business';
import CreateCompanyForm from './CreateCompanyForm';
import { insertCompanyApi } from '../../actions/adminAction';
import cloneDeep from 'lodash/cloneDeep';

const styles = (theme) => ({
});

class CreateCompany extends React.Component {
  constructor(props) {
    super(props);
    this.company = {
      name: '', cnpj: '', user: {
        name: '', email: '', password: '', r_password: '',
      }
    };
  }

  handleSubmit = (values) => {
    let newValues = cloneDeep(values);
    this.props.dispatch(insertCompanyApi(newValues, this.props.history));
  }

  render() {
    const {adminState} = this.props;
    return (
      <MainContent>
        <Paper className="sys-content">
          <CommonHeaderText
            title="Cadastrar nova empresa"
            Icon={BusinessIcon}
            variant="h5"
          />
          <div className="sys-form-div">
            <CreateCompanyForm
              companyData={this.company}
              handleSubmit={this.handleSubmit}
              loading={adminState.loading}
            />
          </div>
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  adminState: state.adminState,
});

export default connect(mapStateToProps)(
    withStyles(styles)(CreateCompany)
);
