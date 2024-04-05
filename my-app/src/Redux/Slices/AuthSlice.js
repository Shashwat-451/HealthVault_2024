import {createSlice,nanoid} from '@reduxjs/toolkit'

const initialState={
    registerData:null,
    signupData:null,
    setLoginUser:null,
    loggedIn:false,
    user:null,
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem("token")):null,
};

const authSlice= createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        
        setSignupData(state,action){
            state.signupData=action.payload;
        },
        setToken(state,action){
            state.token=action.payload;
        },
        setLoginUser(state,action){
            state.user=action.payload;
        },
        setLoggedIn(state,action){
            state.loggedIn=action.payload;
        },
    },


});

export const {setSignupData,setToken,setLoginUser,setLoggedIn}=authSlice.actions;
export default authSlice.reducer;