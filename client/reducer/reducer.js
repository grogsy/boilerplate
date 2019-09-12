import axios from 'axios';

const GOT_USER = 'GOT_USER';

const gotUser = user => ({
  type: GOT_USER,
  user,
});

export const logIn = formData => {
  return async dispatch => {
    try {
      const { data } = await axios.put('/auth/login', formData);
      dispatch(gotUser(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {
  initialState: 'foo!',
  user: {},
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

export default reducer;
