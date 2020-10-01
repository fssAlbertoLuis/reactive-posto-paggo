import React from 'react';
import {connect} from 'react-redux';
import MainContent from '../../utils/MainContent';
import {Paper, withStyles, Button} from '@material-ui/core';
import CommonHeaderText from '../../utils/components/CommonHeaderText';
import ListIcon from '@material-ui/icons/List';
import AddIcon from '@material-ui/icons/Add';
import {
  getFuelListApi, editFuelApi, deleteFuelApi, createFuel, deleteFuel, createFuelApi,
} from '../../actions/fuelAction';
import FuelForm from './FuelForm';
import { openConfirmDialog } from '../../actions/confirmDialogAction';
import LoaderDiv from '../../utils/components/LoaderDiv';

const styles = (theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  list: {
    margin: theme.spacing(1),
  },
});

class FuelList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedId: null, selectedIndex: null};
  }
  componentDidMount() {
    this.props.dispatch(getFuelListApi());
  }

  addFuel = () => {
    const payload = {
      name: '', 
      cost_price: '', 
      shop_price: '', 
      app_price: ''
    };
    this.props.dispatch(createFuel(payload))
  }

  editFuel = (fuel, index) => {
    if (fuel.id) {
      this.props.dispatch(editFuelApi(fuel, index));
    } else {
      this.props.dispatch(createFuelApi(fuel, index));
    }
  }

  onCloseDialog = (confirm) => {
    if (confirm) {
      if (this.state.selectedId) {
        this.props.dispatch(
          deleteFuelApi(this.state.selectedId, this.state.selectedIndex)
        );
      } else {
        this.props.dispatch(deleteFuel(this.state.selectedIndex));
      }
    }
  }

  deleteFuel = (id, index) => {
    this.setState({selectedId: id, selectedIndex: index});
    this.props.dispatch(
      openConfirmDialog(
        'Confirmar ação', 
        'Você realmente deseja deletar esse combustível?',
        this.onCloseDialog
      )
    );
  }
  render() {
    const {classes, fuelState} = this.props;
    return (
      <MainContent>
        <Paper className={classes.root}>
          <CommonHeaderText
            variant="h5"
            title="Lista de combustíveis à venda"
            subtitle="Adicione, edite ou visualize"
            Icon={ListIcon}
          />
          {
            fuelState.loading ? <LoaderDiv text="Carregando lista de combustíveis..." loaderState={fuelState}/> :
            <div className={classes.list}>
              {
                fuelState.list.map((fuel, index) => (
                  <FuelForm
                    key={index}
                    index={index}
                    fuel={fuel}
                    loading={fuelState.createLoading}
                    handleSubmit={this.editFuel}
                    handleDelete={this.deleteFuel}
                  />
                ))
              }
              <div style={{textAlign: 'center'}}>
                <Button
                  variant="outlined"
                  onClick={this.addFuel}
                  color="primary"
                >
                  <AddIcon /> Novo combustível
                </Button>
              </div>
            </div>
          }
        </Paper>
      </MainContent>
    );
  }
}

const mapStateToProps = (state) => ({
  fuelState: state.fuelState,
});

export default connect(mapStateToProps)(
    withStyles(styles)(FuelList)
);
