import React from 'react';
import NumberFormat from 'react-number-format';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { TextField, InputAdornment } from '@material-ui/core';

class CurrencyTextInput extends React.Component {

    customInputProps = () => {
        const { label, name, readOnly, disabled, noIcon, handleBlur } = this.props;
        return {
            name: name,
            label: label,
            variant: 'outlined',
            margin: 'normal',
            fullWidth: true,
            InputProps: noIcon ? {} : {
                startAdornment: 
                    <InputAdornment position="start">
                        <AttachMoneyIcon />                            
                    </InputAdornment>
            },
            readOnly: readOnly,
            disabled: disabled,
            onBlur: handleBlur,
        }
    };

    render() {
        const { value, name, onChange, onBlur } = this.props;
        return (
            <NumberFormat
                name={name}
                value={value}
                onFocus={e=>e.target.select()}
                onValueChange={ ({event, floatValue}) => {
                    if (onChange) {
                        onChange(name, floatValue);
                    }
                }}
                onBlur={onBlur}
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={2}
                fixedDecimalScale
                customInput={TextField}
                {...this.customInputProps()}
            />
        );
    }
}

export default CurrencyTextInput;
