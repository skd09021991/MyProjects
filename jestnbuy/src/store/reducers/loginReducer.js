import * as actionType from '../actions'



const initialState = {
    isLoggedIn : false,
    userData    : { },
}

const reducer = ( state = initialState, action ) =>{  

    switch( action.type ){
        case actionType.TOGGLE_LOGIN_STATUS:
            console.log('isLoggedIn toggled from reducer')
            return {
                ...state,
                isLoggedIn : !state.isLoggedIn,
            }
        case actionType.SET_USER_DATA:
            return {
                ...state,
                userData : action.data
            }
    }
    return state

}



export default reducer;