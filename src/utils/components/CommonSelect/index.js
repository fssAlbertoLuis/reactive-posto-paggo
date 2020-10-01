import React from 'react';
import {
  FormControl, InputLabel, MenuItem, Select, FormHelperText, CircularProgress,
} from '@material-ui/core';

class CommonSelect extends React.Component {
  render() {
    const {
      label, value, items, handleChange, variant,
      input, name, error, helperText, handleBlur,
      loading, loadingText,
    } = this.props;
    return (
      <FormControl autoComplete="off" variant={variant} fullWidth>
        <InputLabel shrink htmlFor={label}>{label}</InputLabel>
        <Select
          error={error}
          value={value}
          onBlur={(event) => {
            if (handleBlur) {
              event.target.name = name;
              handleChange(event);
              handleBlur(event);
            }
          }}
          onChange={(event) => {
            event.target.name = name;
            handleChange(event);
          }}
          input={input}
          fullWidth
          displayEmpty
        >
          <MenuItem value="" disabled>
            {
              loading ?
                <span style={{display: 'flex'}}>
                  <CircularProgress
                    size={20}
                    style={{marginRight: '12px'}} />
                  {loadingText}
                </span> :
              'Selecione uma opção...'
            }
          </MenuItem>
          {
            items.map((item, i) => (
              typeof item === 'object' ?
                <MenuItem key={i} value={item.value}>{item.name}</MenuItem> :
                <MenuItem key={i} value={item}>{item}</MenuItem>
            ))

          }
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
}

export default CommonSelect;
