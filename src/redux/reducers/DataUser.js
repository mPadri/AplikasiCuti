import {createStore} from 'redux';

// Action type

const GET_DATA = 'GET_DATA';

// Action
export const getDataAction = (payload) => ({
  type: GET_DATA,
  payload: payload,
});

// Reducer

const initialState = {
  dataUser: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        dataUser: [...state.dataUser, action.payload],
      };

    default:
      return state;
  }
};

export const store = createStore(reducer);
