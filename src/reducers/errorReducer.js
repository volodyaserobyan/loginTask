import { USERS } from '../const/Const';

const errorReducer = (state = null, action) => {
    switch (action.type) {
        case 'FAIL':
            return action.error
        case 'LOAD':
        case 'SUCCESS':
            return null;
        default: 
            return state;
    }
}

export default errorReducer;