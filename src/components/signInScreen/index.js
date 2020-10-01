import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Paper, Typography, Divider, TextField, InputAdornment, Grid, Container, Button, CircularProgress, IconButton } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import SendIcon from '@material-ui/icons/Send';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Visibility from '@material-ui/icons/Visibility';
import './index.css';
import { signInApiRequest } from '../../actions/signIn';

class SignInScreen extends React.Component {

    state = {email: '', password: '', showPassword: false};

    handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({[name]: value});
    }

    toggleVisibility = () => {
        this.setState({showPassword: !this.state.showPassword});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const email = this.state.email;
        const password = this.state.password;
        this.props.dispatch(signInApiRequest(email, password));
    }

    signInForm = () => {
        const loading = this.props.authState.signingIn;
        return (
            <Grid className="sign-in-form-div" container spacing={1}>
                <form method="POST" onSubmit={this.handleSubmit}>
                    <Grid item xs={12}>
                        <TextField className="sign-in-input" fullWidth required disabled={loading}
                            type="email" name="email" id="email" label="E-mail"
                            margin="normal" variant="outlined" InputProps={{
                                startAdornment: 
                                    <InputAdornment position="start">
                                        <EmailIcon />                            
                                    </InputAdornment>
                            }}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField className="sign-in-input" fullWidth required disabled={loading}
                            type={this.state.showPassword ? 'text' : 'password'} name="password" id="password" label="Senha"
                            margin="normal" variant="outlined" InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />                            
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                      <IconButton
                                        edge="end"
                                        aria-label="toggle password visibility"
                                        onClick={this.toggleVisibility}
                                      >
                                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                      </IconButton>
                                    </InputAdornment>
                                  ),
                            }}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid container item xs={12} justify="flex-end">
                        <Divider />
                        { loading ? <Button><CircularProgress size={32} /></Button> :
                        <Button type="submit" variant="contained" color="primary" size="large">
                            Acessar
                            <SendIcon className="btn-icon"/>
                        </Button> }
                    </Grid>
                </form>
            </Grid>
        )
    };

    render() {
        const { authState } = this.props;

        if (authState.signedIn) {
            return <Redirect to="/dashboard" />
        }

        return (
            <div className="main">
                <Container className="container" maxWidth="sm">
                    <Paper className="sign-in-div">
                        <Typography variant="h6" gutterBottom>
                            Acessar sistema
                        </Typography>
                        <Divider />
                        { this.signInForm() }
                    </Paper>
                </Container>                
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    authState: state.authState
});

export default connect(mapStateToProps)(SignInScreen);
