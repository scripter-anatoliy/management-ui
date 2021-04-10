import axios from "axios";
import {CreateUserType, PostsType, UserType} from "../redux/users-reducer";

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/',
    withCredentials: true,
})

// api
export const UsersAPI = {
    getUsers() {
        return instance.get<Array<UserType>>('users')
    },
    createUsers(createUser: CreateUserType) {
        return Promise.resolve({data: createUser})
    },
    changeUsers(user: UserType) {
        return Promise.resolve({data: user})
    },
    getPosts() {
        return instance.get<Array<PostsType>>('posts')
    },
}
