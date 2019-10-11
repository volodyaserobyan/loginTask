import { USERS } from '../const/Const'

const usersReducer = (state = [], action) => {
    if(action.type === 'SUCCESS'){
        return [
            ...state,
            Object.assign({}, action.users)
        ]
    }
    return state;
}

export default usersReducer;