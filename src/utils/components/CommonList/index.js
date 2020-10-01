import React from 'react';
import {List, ListItem, ListItemText, CircularProgress, ListItemSecondaryAction, IconButton} from '@material-ui/core';
import _ from 'lodash';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class CommonList extends React.Component {
  waitText = () => {
    return <div style={{display: 'flex'}}>
      <CircularProgress size={20} style={{marginRight: '12px'}} /> Buscando usuários...
    </div>;
  }

  setItemTitle = (title, item) => {
    if (Array.isArray(title) && title[1]) {
      return title[1](item[title[0]]);
    } else {
      return item[title];
    }
  }

  setSecondaryText = (subtitle, item) => {
    return subtitle.map((sub) => {
      if (Array.isArray(sub) && sub[1]) {
        const func = sub[1];
        const value = String(sub[0]).includes('.') ? (
          _.get(item, sub[0])
        ) : (
          item[sub[0]]
        );
        return func(value) + ' / ';
      } else {
        return (String(sub).includes('.') ? _.get(item, sub) : item[sub]) + ' / ';
      }
    });
  }

  setAction = (action, item, index) => {
    if (Array.isArray(action) && action[1]) {
      const value = action[1](item[action[0]]);
      return <span key={index}>{value}</span>;
    } else {
      return item[action];
    }
  }

  isItemLoaded = (index) => {
    const {rows} = this.props;
    return (
      index < rows.data.length
    );
  }

  renderListItem = (item, index) => {
    const {title, subtitle, actions, onCLickRow} = this.props;
    return (
      <ListItem
        key={index}
        alignItems="flex-start"
        onClick={() => onCLickRow ? onCLickRow(index) : null}
        style={onCLickRow ? {cursor: 'pointer'} : {}}
      >
        <ListItemText
          primary={this.setItemTitle(title, item)}
          secondary={this.setSecondaryText(subtitle, item)}
        />
        {actions ? (
          <ListItemSecondaryAction>
              {actions.map((action, index) => this.setAction(action, item, index))}
          </ListItemSecondaryAction>
        ) : (
          ''
        )}
      </ListItem>
    );
  }

  render() {
    const {rows, loading, changePage} = this.props;
    return (
      <List>
        {
          rows && rows.data.length && !loading ? (
            <>
              {rows.data.slice(
                (rows.meta.current_page-1)*parseInt(rows.meta.per_page, 10),
                (rows.meta.current_page-1)*parseInt(rows.meta.per_page, 10) + parseInt(rows.meta.per_page, 10)
              ).map((row, i) => this.renderListItem(row, i))}
              <ListItem alignItems="center" style={{display: 'flex-row'}}>
                <IconButton 
                  onClick={() => changePage(rows.meta.current_page - 2)}
                  disabled={rows.meta.current_page === 1}
                  aria-label="previous page">
                  <ChevronLeftIcon />
                </IconButton>
                <div style={{flex: 1, textAlign: 'center'}}>Pág. {rows.meta.current_page}</div> 
                <IconButton 
                  onClick={() => changePage(rows.meta.current_page)}
                  disabled={rows.meta.current_page === rows.meta.last_page}
                  aria-label="next page">
                  <ChevronRightIcon />
                </IconButton>
              </ListItem>
            </>
          ) : (
            <ListItem alignItems="center">
              <ListItemText primary={
                loading ?
                this.waitText() : 'Nada encontrado'
              } />
            </ListItem>
          )
        }
      </List>
    );
  }
}

export default CommonList;
