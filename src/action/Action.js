// import { USERS } from '../const/Const';

export const loadUsers = (data) => ({
    type: 'LOAD',
    data
})

export const setUsers = users => ({
    type: 'SUCCESS',
    users
})

export const setError = error => ({
    type: 'FAIL',
    error
})

export const fetchuser = () => {
    return { type: 'FETCH_USER' }
  };
