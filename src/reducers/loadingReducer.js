import { USERS } from '../const/Const';

const loadingReducer = (state = [], action) => {
    switch (action.type) {
        case 'LOAD':
            return [
                ...state,
                // Object.assign({}, action.data)
            ];
        case 'SUCCESS':
                return [
                    ...state,
                    Object.assign({}, action.users)
                ];
        case 'FAIL':
            return;
        default:
            return state;
    }
}

export default loadingReducer;