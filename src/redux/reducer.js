const initialState = {
    user_id: null,
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    warehouses: [],
    company: {}
}

const ADD_USER = 'ADD_USER';
const WIPE_REDUX = 'WIPE_REDUX';

export function addUser(user_id, first_name, last_name, role, email, warehouses, company){
    return{
        type: ADD_USER,
        payload: {user_id, first_name, last_name, role, email, warehouses, company}
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
            const { user_id, first_name, last_name, role, email, warehouses, company } = action.payload
            return Object.assign({}, state, {user_id, first_name, last_name, role, email, warehouses, company})
        case WIPE_REDUX:
            return Object.assign({}, state, {user_id: null, first_name: '', last_name: '', role: '', email: ''})
        default:
            return state
    }
}