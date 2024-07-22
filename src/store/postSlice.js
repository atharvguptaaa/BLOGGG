import { createSlice } from "@reduxjs/toolkit";

const initialState={
    posts:[],
}

const postSlice=createSlice(
    {
    name: "onPost",
    initialState,
    reducers:{
        postUser: (state,action)=>{
               state.posts.push(
                action.payload
               )
            
                    }

            }
    }
)

export const {postUser}=postSlice.actions;
export default postSlice.reducer;