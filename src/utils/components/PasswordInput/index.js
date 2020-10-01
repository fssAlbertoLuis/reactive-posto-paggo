import React from 'react';

class PasswordInput extends React.Component {
  render() {
    return (
      <TextField className="sign-in-input" fullWidth required disabled={loading}
        type="password" name="password" id="password" label="Senha"
        margin="normal" variant="outlined" InputProps={{
          startAdornment:
                                    <InputAdornment position="start">
                                      <LockIcon />
                                    </InputAdornment>,
        }}
        onChange={this.handleChange}
      />
    );
  }
}

export default PasswordInput;
