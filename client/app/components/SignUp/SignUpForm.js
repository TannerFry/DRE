import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types';
import validateInput from '../../../../server/shared/validations/SignUp';
import TextFieldGroup from '../common/TextFieldGroup';
import {
  Button,
  CardBody,
  FormGroup
} from "reactstrap";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      errors: {},
      isLoading: false,
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignUpRequest(this.state)
      .then( () => {
          // localStorage.setItem('jwtToken', data.token);
          // this.props.addFlashMessage({
          //   type: 'success',
          //   text: 'Successful sign up! Welcome.'
          // })
          this.props.history.push('/search');
      },
      (err) => {
        console.log(err);
        this.setState({ errors: err.response.data, isLoading: false })
      })
    }
  }
  render() {
    const { errors, additionalEmails, usernames } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <CardBody className="px-lg-5 py-lg-5">
          {/* <h1>Create your Developer Profile below!</h1> */}
          {/* <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            value={this.state.username}
            field="username"
          /> */}
          <TextFieldGroup
            error={errors.email}
            label="Email *"
            focus={true}
            onChange={this.onChange}
            value={this.state.email}
            field="email"
            type="email"
            icon="ni ni-email-83"
            autocomplete="username"
          />
          <TextFieldGroup
            error={errors.password}
            label="Password *"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
            icon="fa fa-unlock-alt"
            autocomplete="new-password"
          />
          <TextFieldGroup
            error={errors.confirmPassword}
            label="Confirm Password *"
            onChange={this.onChange}
            value={this.state.confirmPassword}
            field="confirmPassword"
            type="password"
            icon="fa fa-lock"
            autocomplete="new-password"
          />
          <FormGroup>
            <Button color="primary" disabled={this.state.isLoading}>Sign Up</Button>
          </FormGroup>
        </CardBody>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
}

SignUpForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default withRouter(SignUpForm);