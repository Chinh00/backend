import {configureStore} from "@reduxjs/toolkit";
import RootReducer from "@/redux/root.slice.ts";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const store = configureStore({
    reducer: persistReducer({
        key: "root",
        storage: storage
    }, RootReducer),
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


export const persist = persistStore(store)

export default store