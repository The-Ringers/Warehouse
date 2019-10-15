const initialState = {
    user_id: null,
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    warehouses: [],
    company: {},
    warehouse_id: null,
    categories: []
}

const ADD_USER = 'ADD_USER';
const ADD_WAREHOUSE_ID = 'ADD_WAREHOUSE_ID';
const WIPE_REDUX = 'WIPE_REDUX';
const ADD_CATEGORIES = 'ADD_CATEGORIES';

export function addUser(user_id, first_name, last_name, role, email, warehouses, company){
    return{
        type: ADD_USER,
        payload: {user_id, first_name, last_name, role, email, warehouses, company}
    }
}

export function addWarehouseId(warehouse_id){
    return{
        type: ADD_WAREHOUSE_ID,
        payload: { warehouse_id }
    }
}

export function addCategories(categories){
    return{
        type: ADD_CATEGORIES,
        payload: { categories }
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
        case ADD_WAREHOUSE_ID:
            return Object.assign({}, state, {warehouse_id: action.payload.warehouse_id})
        case ADD_CATEGORIES:
            return Object.assign({}, state, {categories: action.payload.categories})
        case WIPE_REDUX:
            return Object.assign({}, state, {user_id: null, first_name: '', last_name: '', role: '', email: ''})
        default:
            return state
    }
}