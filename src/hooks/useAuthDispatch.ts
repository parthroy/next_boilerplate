import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { persistLogin, login, logout, sessionExpired, resetPassword, getAuthState } from '../store/auth';

export const useAuthState = () => {
    return useSelector((state: RootState) => getAuthState(state));
};

export const useAuthDispatch = () => {
    const dispatch = useDispatch();

    const loginAsync = (params: any) => {
        return dispatch(login(params));
    };

    const resetPasswordAsync = (email: string, user: any) => {
        return dispatch(resetPassword({ email, user }));
    };

    const persistLoginAction = () => {
        return dispatch(persistLogin());
    };

    const logoutAction = () => {
        return dispatch(logout());
    };

    const sessionExpiredAction = () => {
        return dispatch(sessionExpired());
    };

    return {
        loginAsync,
        resetPasswordAsync,
        persistLoginAction,
        logoutAction,
        sessionExpiredAction,
    };
};
