let initialState = {
  loggedIn: false,
  username: "",
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { loggedIn: true, username: payload };
    case "LOGOUT":
      return initialState;
    case "LOCATION":
      return {
        ...state,
        latitude: payload.latitude,
        longitude: payload.longitude,
      };
    case "USER":
      return {
        ...state,
        username: payload.username,
      };
    default:
      return state;
  }
};

export const login = (username) => {
  return {
    type: "LOGIN",
    payload: username,
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    payload: "",
  };
};

export const location = (location) => {
  return {
    type: "LOCATION",
    payload: location,
  };
};

export const user = (location) => {
  return {
    type: "USER",
    payload: location,
  };
};
