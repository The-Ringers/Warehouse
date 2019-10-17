const initialState = {
    user_id: null,
    first_name: '',
    last_name: '',
    role: '',
    email: '',
    warehouses: [],
    companies: [],
    warehouse_id: null,
    categories: [],
    company_id: null,
    company_index: null
}

const ADD_USER = 'ADD_USER';
const ADD_WAREHOUSE_ID = 'ADD_WAREHOUSE_ID';
const ADD_COMPANY_ID = 'ADD_COMPANY_ID';
const ADD_COMPANY_INDEX = 'ADD_COMPANY_INDEX';
const WIPE_REDUX = 'WIPE_REDUX';
const ADD_CATEGORIES = 'ADD_CATEGORIES';

export function addUser(user_id, first_name, last_name, role, email, warehouses, companies){
    return{
        type: ADD_USER,
        payload: {user_id, first_name, last_name, role, email, warehouses, companies}
    }
}

export function addWarehouseId(warehouse_id){
    return{
        type: ADD_WAREHOUSE_ID,
        payload: { warehouse_id }
    }
}

export function addCompanyId(company_id){
    return{
        type: ADD_COMPANY_ID,
        payload: { company_id }
    }
}

export function addCompanyIndex(company_index){
    return{
        type: ADD_COMPANY_INDEX,
        payload: { company_index }
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
            const { user_id, first_name, last_name, role, email, warehouses, companies } = action.payload
            return Object.assign({}, state, {user_id, first_name, last_name, role, email, warehouses, companies})
        case ADD_WAREHOUSE_ID:
            return Object.assign({}, state, {warehouse_id: action.payload.warehouse_id})
        case ADD_COMPANY_ID:
            return Object.assign({}, state, {company_id: action.payload.company_id})
        case ADD_COMPANY_INDEX:
            return Object.assign({}, state, {company_index: action.payload.company_index})
        case ADD_CATEGORIES:
            return Object.assign({}, state, {categories: action.payload.categories})
        case WIPE_REDUX:
            return Object.assign({}, state, {user_id: null, first_name: '', last_name: '', role: '', email: ''})
        default:
            return state
    }
}