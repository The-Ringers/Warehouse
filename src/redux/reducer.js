const initialState = {
    user_id: null,
    first_name: '',
    last_name: '',
    role: '',
    email: ''
}

const ADD_USER = 'ADD_USER';
const WIPE_REDUX = 'WIPE_REDUX';

export function addUser(user_id, first_name, last_name, role, email){
    return{
        type: ADD_USER,
        payload: {user_id, first_name, last_name, role, email}
    }
}

export function wipeRedux(){
    return{
        type: WIPE_REDUX
    }
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case ADD_USER:
            const { user_id, first_name, last_name, role, email } = action.payload
            return Object.assign({}, state, {user_id, first_name, last_name, role, email})
        case WIPE_REDUX:
            return Object.assign({}, state, {user_id: null, first_name: '', last_name: '', role: '', email: ''})
        default:
            return state
    }
}