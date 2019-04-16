import React, { Component } from 'react';
import SignInForm from '../SignIn/SignInForm';
import SignUpForm from '../SignUp/SignUpForm';
import { userSignUpRequest, getAuthors } from '../../../actions/signUpActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../../actions/flashMessages';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      isLogin: false,
      isSignUp: true
    };
  }

  toggle(type) {
    if (type == "signup") {
      this.setState({ isSignUp: true, isLogin: false});
    }
    else {
      this.setState({ isSignUp: false, isLogin: true});
    }
  }

  render() {
    const { userSignUpRequest, getAuthors, addFlashMessage } = this.props
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-md-2">
            <p id="signupButton"
              onClick={() => this.toggle("signup")}
              className={this.state.isSignUp ? "bg-primary":"bg-light"}>Sign Up</p>
          </div>
          <div className="col col-md-2">
            <p id="loginButton"
              onClick={() => this.toggle("login")}
              className={this.state.isLogin ? "bg-primary":"bg-light"}>Login</p>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-md-6">
            { this.state.isLogin ? <SignInForm /> : <SignUpForm getAuthors={getAuthors} userSignUpRequest={userSignUpRequest} addFlashMessage={addFlashMessage}/>}
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundImage: `url('/assets/img/jumbo.jpg')`,
    padding: '10%'
  },
  form: {
    margin: '5% 25% 5% 25%'
  },
  cardHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '24px'
  }
};

Home.propTypes = {
  userSignUpRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired
}

export default connect(null, { userSignUpRequest, addFlashMessage, getAuthors }) (Home);