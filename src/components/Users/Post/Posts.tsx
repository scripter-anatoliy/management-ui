import React, {useEffect} from "react";
import {PostsType, setPosts} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import p from './Posts.module.css';
import {useParams, withRouter} from "react-router-dom";

let Posts = () => {

    const posts = useSelector<RootState, Array<PostsType>>(state => state.users.posts)
    const {userId} = useParams<{ userId: string }>()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(setPosts())
    }, [])

    const filterPosts = posts.filter((post) => {
        return post.userId === +userId
    })


    return (
        <div className={p.wrapper}>

            {filterPosts.map((post) => {
                return (
                    <div className={p.posts}>
                        <div className={p.post} key={post.id}>
                            <div className={p.title}>{post.title}</div>
                            <div>body: {post.body}</div>
                        </div>
                    </div>
                )
            })}
        </div>

    )
}

export default withRouter(Posts)