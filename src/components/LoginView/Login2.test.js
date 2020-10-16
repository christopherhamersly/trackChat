import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import mockStore from '../../utils/store-mocker';

import Login from './Login2'


it('should display user name', async () => {
  const store = mockStore({
    logReducer: {
      username:'jane.doe', 
      loggedIn:false
    }
  });

  const { getByText } = render(
    <Provider store={store}><Login /></Provider>
  );

  let password = getByText('Password:');
  expect(password).toBeTruthy();
  let login = getByText('Log In');
  expect(login).toBeTruthy();
});

it('should display user name', async () => {
  const store = mockStore({
    logReducer: {
      username:'jane.doe', 
      loggedIn:true
    }
  });

  const { getByText } = render(
    <Provider store={store}><Login /></Provider>
  );

  let password = getByText('Password:');
  expect(password).toBeTruthy();
  let logout = getByText('Log Out');
  expect(logout).toBeTruthy();
});