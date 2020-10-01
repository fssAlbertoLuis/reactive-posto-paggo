import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {TextField, InputAdornment, Grid} from '@material-ui/core';
import CurrencyFormat from 'react-currency-format';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import LoaderButton from '../../utils/components/LoaderButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const formSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  cnpj: Yup.string().length(18, 'Formato inválido'),
  user: Yup.object().shape({
    name: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    password: Yup.string()
        .oneOf([Yup.ref('r_password'), null], 'Senhas são diferentes.')
        .min(8, 'Mínimo de 8 caracteres')
        .max(32, 'Máximo de 32 caracteres'),
    r_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senhas são diferentes.'),
  }),
});

class CreateCompanyForm extends React.Component {
  render() {
    const {companyData, handleSubmit, loading} = this.props;
    return (
      <Formik
        initialValues={companyData}
        validationSchema={formSchema}
        onSubmit={(values, action) => {
          values.cnpj = values.cnpj.replace(/[.,-/]/g, '');
          handleSubmit(values);
        }}
        render={
          ({
            values, errors, touched, handleChange,
            handleBlur, dirty, isValid,
          }) => (
            <Form>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    name="name"
                    label="Nome da empresa"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.name && errors.name ? true : false}
                    helperText={touched.name && errors.name ? errors.name : ''}
                    margin="normal" variant="outlined" InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CurrencyFormat
                    format="##.###.###/####-##"
                    name="cnpj"
                    label="Cnpj da empresa"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.cnpj}
                    error={touched.cnpj && errors.cnpj ? true : false}
                    helperText={touched.cnpj && errors.cnpj ? errors.cnpj : ''}
                    margin="normal" variant="outlined" InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <WorkOutlineIcon />
                        </InputAdornment>
                      ),
                    }}
                    customInput={TextField}
                  />
                </Grid>
              </Grid>
              <CommonHeaderText variant="h6"
                title="Informações de usuário"
                subtitle="Informe as credenciais do dono da empresa"
                Icon={PersonIcon}
              />
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={
                      errors.user &&
                      errors.user.name &&
                      touched.user &&
                      touched.user.name
                    }
                    helperText={
                        errors.user &&
                        errors.user.name &&
                        touched.user &&
                        touched.user.name ?
                        errors.user.name : ''
                    }
                    disabled={loading}
                    name="user.name"
                    label="Nome"
                    value={values.user.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircleIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={
                      errors.user &&
                      errors.user.email &&
                      touched.user &&
                      touched.user.email
                    }
                    helperText={
                        errors.user &&
                        errors.user.email &&
                        touched.user &&
                        touched.user.email ?
                        errors.user.email : ''
                    }
                    disabled={loading}
                    name="user.email"
                    label="Email"
                    value={values.user.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={
                      errors.user &&
                      errors.user.password &&
                      touched.user &&
                      touched.user.password
                    }
                    helperText={
                        errors.user &&
                        errors.user.password &&
                        touched.user &&
                        touched.user.password ?
                        errors.user.password : ''
                    }
                    disabled={loading}
                    type="password"
                    name="user.password"
                    label="Senha"
                    value={values.user.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    error={
                      errors.user &&
                      errors.user.r_password &&
                      touched.user &&
                      touched.user.r_password
                    }
                    helperText={
                        errors.user &&
                        errors.user.r_password &&
                        touched.user &&
                        touched.user.r_password ?
                        errors.user.r_password : ''
                    }
                    disabled={loading}
                    type="password"
                    name="user.r_password"
                    label="Repita a senha"
                    value={values.user.r_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <LoaderButton
                label="Cadastrar"
                loading={loading}
                loadingLabel="Cadastrando..."
                type="submit"
                color="primary"
                variant="contained"
                disabled={!dirty || !isValid}
              />
            </Form>
          )
        }
      />
    );
  }
}

export default CreateCompanyForm;
