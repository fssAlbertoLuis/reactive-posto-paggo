import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import {Grid, TextField, InputAdornment, OutlinedInput} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import LoaderButton from '../../utils/components/LoaderButton';
import CommonSelect from '../../utils/components/CommonSelect';

const createUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string()
      .oneOf([Yup.ref('r_password'), null], 'Senhas são diferentes.')
      .min(8, 'Mínimo de 8 caracteres')
      .max(32, 'Máximo de 32 caracteres')
      .required('Campo obrigatório'),
  r_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas são diferentes.'),
  permission: Yup.string().required('Campo obrigatório'),
});


const editUserSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string()
      .oneOf([Yup.ref('r_password'), null], 'Senhas são diferentes.')
      .min(8, 'Mínimo de 8 caracteres')
      .max(32, 'Máximo de 32 caracteres'),
  r_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Senhas são diferentes.'),
});


class EmployeeCreateForm extends React.Component {
  render() {
    const {user, handleSubmit, loading, mode} = this.props;
    return (
      <div className="sys-form-div">
        <Formik
          initialValues={user}
          validationSchema={mode==='edit' ?
            editUserSchema : createUserSchema
          }
          onSubmit={(values) => {
            handleSubmit(values);
          }}
          render={(
            ({
              values, errors, touched, dirty, handleChange,
              isValid, handleBlur, isSubmitting,
            }) => (
              <Form>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      error={errors.name && touched.name}
                      helperText={
                        errors.name && touched.name ? errors.name : ''
                      }
                      disabled={loading}
                      name="name"
                      label="Nome do funcionário"
                      value={values.name}
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
                      error={errors.email && touched.email}
                      helperText={
                        errors.email && touched.email ? errors.email : ''
                      }
                      disabled={loading}
                      name="email"
                      label="Email do funcionário"
                      value={values.email}
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
                      error={errors.password && touched.password}
                      helperText={
                        errors.password && touched.password ? errors.password : ''
                      }
                      disabled={loading}
                      type="password"
                      name="password"
                      label="Senha do funcionário"
                      value={values.password}
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
                      error={errors.r_password && touched.r_password}
                      helperText={
                        errors.r_password && touched.r_password ?
                          errors.r_password : ''
                      }
                      disabled={loading}
                      type="password"
                      name="r_password"
                      label="Repita a senha"
                      value={values.r_password}
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
                    {
                      <CommonSelect
                        label="Cargo do funcionário"
                        name="permission"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        value={values.permission}
                        variant="outlined"
                        error={errors.permission && touched.permission}
                        helperText={
                          errors.permission && touched.permission ?
                            errors.permission : ''
                        }
                        items={[
                          {name: 'Gerente', value: 'manager'},
                          {name: 'Frentista', value: 'user'},
                        ]}
                        input={
                          <OutlinedInput
                            name="billing.plan_id"
                            labelWidth={'Cargo do funcionário'.length*8}
                            placeholder="Cargo do funcionário"
                          />
                        }
                      />
                    }
                  </Grid>
                </Grid>
                <LoaderButton
                  type="submit"
                  disabled={!dirty || !isValid}
                  variant="contained"
                  color="primary"
                  label={mode === 'edit' ? 'Editar' : 'Cadastrar'}
                  loadingLabel="Enviando..."
                  loading={loading}
                />
              </Form>
            )
          )}
        />
      </div>
    );
  }
}

export default EmployeeCreateForm;
