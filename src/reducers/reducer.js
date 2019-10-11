import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import usersReducer from './usersReducer';
import errorReducer from './errorReducer';

const reducer = combineReducers({
    isLoading: loadingReducer,
    users: usersReducer,
    error: errorReducer
})

export default reducer;