import React from 'react';
import {Paper, withStyles} from '@material-ui/core';
import { Line } from 'react-chartjs-2';

const styles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
});
class EarningsGraph extends React.Component {
  date = new Date();

  setLabels = () => {

    const labels = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const showLabels = [];
    this.props.statistics.map(row => showLabels.push(labels[row.month-1]));
    return showLabels;
  }

  setData = () => {
    const data = this.props.statistics;
    const showData = [];
    data.map(row => showData.push(row.total_earnings));
    return showData;
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
        <h2>Movimentação em {this.date.getFullYear()}</h2>
        <Line data={{
          labels: this.setLabels(),
          datasets: [
            {
              label: 'Recargas',
              fill: false,
              lineTension: 0.1,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: this.setData(),
            }
          ]
        }}
        options={{
          tooltips: {
            callbacks: {
              label: (item) => {
                const n = String(item.yLabel.toFixed(2)).replace('.', ',');
                return `R$ ${n}`
              }
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                callback: (val) => `R$ ${val}`
              }
            }]
          }
        }}
      />
      </Paper>
    );
  }
}

export default withStyles(styles)(EarningsGraph);
