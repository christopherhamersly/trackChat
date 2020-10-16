import userReducer, { login, logout, location } from './login'
describe('action creators', () => {
    it('should get login action', () => {
        const action = login({
          username: 'jane.doe',
          color: 'green',
        });
        expect(action.type).toBe('LOGIN');
        expect(action.payload.username).toBe('jane.doe');
        expect(action.payload.color).toBe('green');
    });
    
  it('should get logout action', () => {
      const action = logout();
      expect(action.type).toBe('LOGOUT');
      expect(action.payload).toBe('');
  });
  
  it('should get location action', () => {
      const action = location({latitude: 47.2345, longitude: -110.9783});
      expect(action.type).toBe('LOCATION');
      expect(action.payload).toEqual({latitude: 47.2345, longitude: -110.9783});
  });
  
});


describe('reducer', () => {
    it('should login', () => {
        const action = login({
          username: 'jane.doe',
          color: 'green',
        });

        const newState = userReducer(undefined, action);
        expect(newState.loggedIn).toBe(true);
        expect(newState.username).toBe('jane.doe');
        expect(newState.color).toBe('green');
    });
    it('should logout', () => {

      const action = logout();
      const newState = userReducer(undefined, action);
      expect(newState.loggedIn).toBe(false);
      
  });
})