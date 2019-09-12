import React from 'react';
import { connect } from 'react-redux';

import { logIn, logOut } from '../reducer/reducer';
import LoginForm from './loginlocal';

const ExampleComponent = props => {
  return (
    <div>
      <h1>This &lt;h1&gt; header brought to you by an example component</h1>
      {/** state.initialState is set to 'foo!' */}
      <h3>We can see an example state in: {props.example}</h3>
      <p>Hello, Boiler!</p>
      <p>
        {props.user.id
          ? `Logged in as: ${props.user.name}`
          : 'No one logged in'}
      </p>
      {props.user.id ? (
        <button
          className="btn bg-red white p1 rounded"
          onClick={props.handleLogout}
        >
          Logout
        </button>
      ) : (
        <LoginForm handleLogin={props.handleLogin} />
      )}
    </div>
  );
};

// An example of using connect to map state and dispatches to components
const mapState = state => {
  return {
    example: state.initialState,
    user: state.user,
  };
};

const mapDispatch = (dispatch, ownProps) => {
  return {
    handleLogin(event) {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      dispatch(logIn({ email, password })).then(() => {
        ownProps.history.push('/');
      });
    },

    handleLogout() {
      dispatch(logOut()).then(() => {
        ownProps.history.push('/');
      });
    },
  };
};

export default connect(
  mapState,
  mapDispatch
)(ExampleComponent);
