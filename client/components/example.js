import React from 'react';
import { connect } from 'react-redux';

const ExampleComponent = props => {
  return (
    <div>
      <h1>This &lt;h1&gt; header brought to you by an example component</h1>;
      {/** state.initialState is set to 'foo!' */}
      <h3>We can see an example state in: {props.example}</h3>
    </div>
  );
};

// An example of using connect to map state and dispatches to components
const mapState = state => {
  return {
    example: state.initialState,
  };
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(
  mapState,
  mapDispatch
)(ExampleComponent);
