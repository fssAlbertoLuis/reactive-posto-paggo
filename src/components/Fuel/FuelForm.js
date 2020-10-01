import React from 'react';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import CurrencyFormat from 'react-currency-format';
import {
  Grid, Divider, withStyles, IconButton, TextField, InputAdornment,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import LocalGasStationIcon from '@material-ui/icons/LocalGasStation';
import LoaderIconButton from '../../utils/components/LoaderIconButton';

const styles = (theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  margin: {
    marginTop: theme.spacing(2.5),
    margin: theme.spacing(1),
  },
});

const fuelFormSchema = Yup.object().shape({
  name: Yup.string().required('Campo obrigatório'),
  cost_price: Yup.string().required('Campo obrigatório'),
  shop_price: Yup.string().required('Campo obrigatório'),
  app_price: Yup.string().required('Campo obrigatório'),
});

class FuelForm extends React.Component {
  render() {
    const {classes, fuel, loading, index, handleSubmit, handleDelete} = this.props;
    return (
      <Formik
        initialValues={fuel}
        validationSchema={fuelFormSchema}
        onSubmit={(values) => {
          values.cost_price = String(values.cost_price).replace(',', '.');
          values.shop_price = String(values.shop_price).replace(',', '.');
          values.app_price = String(values.app_price).replace(',', '.');
          handleSubmit(values, index);
        }}
        render={(
          ({
            values, errors, touched, dirty, handleChange,
            isValid, handleBlur, isSubmitting,
          }) => (
            <Form>
              <div className={classes.root}>
                <Grid container spacing={2}>
                  <Grid item xs={6} sm={4}>
                    <TextField
                      error={errors.name && touched.name}
                      helperText={
                        errors.name && touched.name ? errors.name : ''
                      }
                      disabled={loading}
                      name="name"
                      label="Combustível"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <LocalGasStationIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <CurrencyFormat
                      error={errors.cost_price && touched.cost_price}
                      helperText={
                        errors.cost_price && touched.cost_price ? errors.cost_price : ''
                      }
                      label={'Preço de custo'}
                      value={String(values.cost_price).replace('.', ',')}
                      thousandSeparator=""
                      decimalSeparator=","
                      decimalScale={3}
                      allowNegative={false}
                      disabled={loading}
                      name="cost_price"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <CurrencyFormat
                      error={errors.shop_price && touched.shop_price}
                      helperText={
                        errors.shop_price && touched.shop_price ? errors.shop_price : ''
                      }
                      label={'Preço no posto'}
                      value={String(values.shop_price).replace('.', ',')}
                      thousandSeparator=""
                      decimalSeparator=","
                      decimalScale={3}
                      allowNegative={false}
                      disabled={loading}
                      name="shop_price"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    />
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <CurrencyFormat
                      error={errors.app_price && touched.app_price}
                      helperText={
                        errors.app_price && touched.app_price ? errors.app_price : ''
                      }
                      label={'Preço no App'}
                      value={String(values.app_price).replace('.', ',')}
                      thousandSeparator=""
                      decimalSeparator=","
                      decimalScale={3}
                      allowNegative={false}
                      disabled={loading}
                      name="app_price"
                      onChange={handleChange}
                      onBlur={handleBlur}
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
                    />
                  </Grid>
                  <Grid className={classes.iconGrid} item xs={6} sm={2}>
                    <Grid container spacing={2} alignItems="flex-end" justify="center">
                      <Grid item xs={6}>
                        <LoaderIconButton
                          type="submit"
                          disabled={!dirty || !isValid || loading}
                          label="edit"
                          className={classes.margin}
                          Icon={!fuel.id ? AddIcon : EditIcon}
                          loading={dirty && isValid && loading}
                          loaderSize={35}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}
                          onClick={() => handleDelete(fuel.id, index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
              </div>
            </Form>
          )
        )}
      />
    );
  }
}

export default withStyles(styles)(FuelForm);
