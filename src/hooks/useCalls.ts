import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { fetchCalls, clearError, clearMessage, setCurrentPage } from '../store/calls'; // Adjust the path as needed

export const useCallsState = () => {
    return useSelector((state: RootState) => state.callsRecord);
};

export const useCallsDispatch = () => {
    const dispatch = useDispatch();

    const fetchCallsAsync = (params: Record<string, any>) => {
        return dispatch(fetchCalls(params));
    };

    const setCurrentPageAction = (params: number) => {
        return dispatch(setCurrentPage(params));
    };
    
    const clearErrorAction = () => {
        return dispatch(clearError());
    };

    const clearMessageAction = () => {
        return dispatch(clearMessage());
    };

    return {
        fetchCallsAsync,
        clearErrorAction,
        clearMessageAction,
        setCurrentPageAction
    };
};
