let initialState = {
  loggedIn: false,
  username: ''
}

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'LOGIN':
      console.log('login state')
      return { loggedIn: true, username: payload}
    case 'LOGOUT':
      console.log('logout connected')
      return initialState;
    default:
      return state;
  }
}  


export const login = username => {
  return {
    type: 'LOGIN',
    payload: username,
  }
}

export const logout = () => {
  return {
    type: 'LOGOUT',
    payload: '',
  }
}