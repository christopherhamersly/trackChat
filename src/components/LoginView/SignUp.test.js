import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import mockStore from '../../utils/store-mocker';

import SignUp from './SignUp'

it('should show sign up page', async () => {
  const store = mockStore({
    logReducer: {
      username:'jane.doe', 
      loggedIn:false
    }
  });

  const { getByText } = render(
    <Provider store={store}><SignUp /></Provider>
  );

  let signUp = await getByText('Sign Up');
  expect(signUp).toBeTruthy();
});

it('should show sign up page', async () => {
  const store = mockStore({
    logReducer: {
      username:'jane.doe', 
      loggedIn:true
    }
  });

  const { getByText } = render(
    <Provider store={store}><SignUp /></Provider>
  );

  let logout = await getByText('Log Out');
  expect(logout).toBeTruthy();
});