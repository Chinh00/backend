import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Buuta} from "@/core/models/buuta.ts";

export type RootInterface = {
    isLogin: boolean,
    role: number,
    profile?: Buuta | null
}

const initState: RootInterface = {
    isLogin: true,
    role: 0,
    profile: null
}

const RootSlice = createSlice({
    name: "root",
    initialState: initState,
    reducers: {
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload
        },
        setRole: (state, action: PayloadAction<number>) => {
            state.role = action.payload
        },
        setProfile: (state, action: PayloadAction<Buuta | null>) => {
            state.profile = action.payload
        }
    }
})


export const {setIsLogin, setRole, setProfile} = RootSlice.actions

export default RootSlice.reducer