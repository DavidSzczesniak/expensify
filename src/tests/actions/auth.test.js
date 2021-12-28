import { login, logout } from '../../actions/auth';

test('should setup Login action object', () => {
    const uid = '123abc';
    expect(login(uid)).toEqual({ type: 'LOGIN', uid });
});

test('should setup Logout action object', () => {
    expect(logout()).toEqual({ type: 'LOGOUT' });
});
