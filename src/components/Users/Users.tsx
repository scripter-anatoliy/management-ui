import React, {useEffect} from "react";
import {setUsers, UserType} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import u from './Users.module.css';
import {User} from "./User/User";

let Users = () => {

    const users = useSelector<RootState, Array<UserType>>(state => state.users.users)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setUsers())
    }, [])

    return (
        <div className={u.wrapper}>
            <div>
                {users.map((user, index) => {
                    return (
                        <div className={u.users}>
                            <div className={u.usersCards}>
                                <User user={user}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Users