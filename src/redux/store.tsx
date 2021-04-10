import {applyMiddleware, combineReducers, createStore} from "redux";
import usersReducer from "./users-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    users: usersReducer,

})
export type RootState = ReturnType<typeof reducers>

let storeRedux = createStore(reducers, applyMiddleware(thunkMiddleware))


// @ts-ignore
window.store = storeRedux
export default storeRedux