import React from "react";
import {PostsType, UsersType} from "../redux/users-reducer";
import {useSelector} from "react-redux";
import {RootState} from "../redux/store";


let Users = () => {

    const users = useSelector<RootState, Array<UsersType>>(state => state.users.users)
    const posts = useSelector<RootState, Array<PostsType>>(state => state.users.posts)
    debugger
    // const dispatch = useDispatch()
    // useEffect(() => {
    //
    //     // dispatch(setUsers(users))
    // }, [])
    return (
        <div>
            <div>
                {users.map((user) => {
                    return (
                        <div>
                            <h1>Name: {user.name}</h1>
                            <h1>{user.address.city}</h1>
                            {/*<h1>{post.title}</h1>*/}
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Users