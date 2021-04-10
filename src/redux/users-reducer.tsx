import {Dispatch} from "react";
import {UsersAPI} from "../api/users-api";

export type SetUsersACType = ReturnType<typeof setUsersAC>;
export type SetPotsACType = ReturnType<typeof setPostsAC>;
export type AddUserACType = ReturnType<typeof addUserAC>;
export type EditUsersACType = ReturnType<typeof editUsersAC>;
type ActionType = SetUsersACType
    | SetPotsACType
    | EditUsersACType
    | AddUserACType
export type PostsType = {
    userId: number,
    id: number,
    title: string,
    body: string
}
export type CompanyType = {
    name: string,
    catchPhrase: string,
    bs: string
}
export type GeoType = {
    lat: string,
    lng: string
}
export type AddressType = {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: GeoType
}
export type UserType = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: AddressType,
    phone: string,
    website: string,
    company: CompanyType
}
export type InitialStateType = {
    users: Array<UserType>,
    posts: Array<PostsType>
}

let initialState = {
    users: [],
    posts: []
}

const usersReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }
        case 'EDIT_USERS':
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.id) {
                        return {...u, ...action.user}
                    } else {
                        return u
                    }
                })
            }
        case 'SET_POSTS':
            return {
                ...state,
                posts: [...action.posts]
            }
        case "ADD_USER":
            return {
                ...state,
                users: [...state.users, {
                    id: state.users.length + 1,
                    name: action.createUser.name,
                    username: action.createUser.username,
                    email: action.createUser.email,
                    address: action.createUser.address,
                    phone: action.createUser.phone,
                    website: action.createUser.website,
                    company: action.createUser.company
                }]
            }
        default:
            return state
    }
}

export const setUsersAC = (users: Array<UserType>) => ({type: 'SET_USERS', users} as const)
export const addUserAC = (createUser: CreateUserType) => (
    {type: 'ADD_USER', createUser} as const)
export const editUsersAC = (user: UserType, id: number) => ({type: 'EDIT_USERS', user, id} as const)
export const setPostsAC = (posts: Array<PostsType>) => ({type: 'SET_POSTS', posts} as const)

export type CreateUserType = {
    name: string, username: string,
    email: string, address: AddressType,
    phone: string, website: string, company: CompanyType
}

// Thunk
export const setUsers = () => {
    return (dispatch: Dispatch<ActionType>) => {
        UsersAPI.getUsers().then(res => {
            let users = res.data
            dispatch(setUsersAC(users))
        })
    }
}
export const addUsers = (createUser: CreateUserType) => {
    return (dispatch: Dispatch<ActionType>) => {
        UsersAPI.createUsers(createUser).then(res => {
            dispatch(addUserAC(res.data))
        })
    }
}
export const editUsers = (user: any, id: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        UsersAPI.changeUsers(user).then(res => {
            dispatch(editUsersAC(res.data, id))
        })
    }
}
export const setPosts = () => {
    return (dispatch: Dispatch<ActionType>) => {
        UsersAPI.getPosts().then(res => {
            let posts = res.data
            dispatch(setPostsAC(posts))
        })
    }
}


export default usersReducer;