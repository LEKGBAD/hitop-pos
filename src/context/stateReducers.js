import { reducerCases } from "./constants";

export const initialState={
showAuthModal:true,
userInfo:undefined,
isAdmin:false,
mode:false
}

const reducer = (state,action)=>{

    switch(action.type){
        case reducerCases.SHOW_AUTH_MODAL:
            return {...state,showAuthModal:action.showAuthModal}
        case reducerCases.SET_USER:
            return {...state,userInfo:action.userInfo}
        case reducerCases.VERIFY_ADMIN:
            return {...state,isAdmin:action.isAdmin}
        case reducerCases.SWITCH_MODE:
            return {...state,mode:action.mode}
        default:
        return state; 
    }

}

export default reducer;