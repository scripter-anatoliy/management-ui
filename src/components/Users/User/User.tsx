import React, {useState} from "react";
import {editUsers, UserType} from "../../redux/users-reducer";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import u from './Users.module.css';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Modal from "@material-ui/core/Modal";
import m from './AddUser.module.css';
import TextField from "@material-ui/core/TextField";

type PropsType = {
    user: UserType
}

export type EditFieldParams = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
};

// function EditField(props: EditFieldParams) {
//
//
//     const [editMode, setEditMode] = useState(false)
//
//     const deactivateEditMode = () => {
//         setEditMode(false)
//     }
//     const activeEditMode = () => {
//         setEditMode(true)
//     }
//     return <span>
//         {editMode
//             ? <input type="text" value={props.value} onChange={props.onChange} onBlur={deactivateEditMode}/>
//             : <span onDoubleClick={activeEditMode}> {props.value} </span>
//         }
//     </span>;
// }
//
// const useInputState = (initialState: string): [string, (e: React.ChangeEvent<HTMLInputElement>) => void] => {
//     const [state, setState] = useState(initialState)
//     const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setState(e.currentTarget.value)
//     }
//     return [state, onChange]
// }


export let User = (props: PropsType) => {

    //
    // const [username, setUserName] = useState(props.user.username)
    // const [name, setName] = useInputState(props.user.name)
    // const [email, setEmail] = useInputState(props.user.email)
    // const [street, setStreet] = useInputState(props.user.address.street)
    // const [suite, setSuite] = useInputState(props.user.address.suite)
    // const [city, setCity] = useInputState(props.user.address.city)
    // const [zipcode, setZipcode] = useInputState(props.user.address.zipcode)
    // const [lat, setLat] = useInputState(props.user.address.geo.lat)
    // const [lng, setLng] = useInputState(props.user.address.geo.lng)
    // const [phone, setPhone] = useInputState(props.user.phone)
    // const [website, setWebsite] = useInputState(props.user.website)
    // const [companyName, setCompanyName] = useInputState(props.user.company.name)
    // const [catchPhrase, setCatchPhrase] = useInputState(props.user.company.catchPhrase)
    // const [bs, setBs] = useInputState(props.user.company.bs)


    const [isModalOpen, setIsModalOpen] = useState(false)


    // const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setUserName(e.currentTarget.value)
    //
    // }


    const dispatch = useDispatch()

    const onClose = () => {
        setIsModalOpen(false)
        formik.resetForm()
    }
    const editFields = [
        {field: 'name', placeholder: 'name'},
        {field: 'username', placeholder: 'UserName'},
        {field: 'email', placeholder: 'Email'},
        {field: 'street', placeholder: 'Street'},
        {field: 'suite', placeholder: 'Suite'},
        {field: 'city', placeholder: 'City'},
        {field: 'zipcode', placeholder: 'Zipcode'},
        {field: 'lat', placeholder: 'lat'},
        {field: 'lng', placeholder: 'lng'},
        {field: 'phone', placeholder: 'Phone'},
        {field: 'website', placeholder: 'Website'},
        {field: 'companyName', placeholder: 'CompanyName'},
        {field: 'catchPhrase', placeholder: 'CatchPhrase'},
        {field: 'bs', placeholder: 'bs'},
    ]
    const formik = useFormik({
        initialValues: {
            name: props.user.name,
            username: props.user.username,
            email: props.user.email,
            street: props.user.address.street,
            suite: props.user.address.suite,
            city: props.user.address.city,
            zipcode: props.user.address.zipcode,
            lat: props.user.address.geo.lat,
            lng: props.user.address.geo.lng,
            phone: props.user.phone,
            website: props.user.website,
            companyName: props.user.company.name,
            catchPhrase: props.user.company.catchPhrase,
            bs: props.user.company.bs,
        },
        onSubmit: ({name, email, bs, catchPhrase, username, street, suite, city, zipcode, phone, website, companyName, lat, lng}) => {

            let newUser = {
                name, username, email, phone, website,
                company: {name: companyName, catchPhrase, bs},
                address: {
                    street, suite, city, zipcode,
                    geo: {lat, lng}
                }
            }
            dispatch(editUsers(newUser, props.user.id))
            setIsModalOpen(false)
            formik.resetForm()
        },
    })


    return (
        <div>
            <EditSharpIcon className={m.editIcon} color='primary' onClick={() => {
                setIsModalOpen(true)
            }}/>
            <div className={m.name}>
                <div>Name: {props.user.name}</div>
                <div>User Name: {props.user.username}</div>
                <div>Email: {props.user.email}</div>
            </div>
            <p><h2>Address:</h2></p>
            <div>Street: {props.user.address.street}</div>
            <div>Suite: {props.user.address.suite}</div>
            <div>City: {props.user.address.city}</div>
            <div>Zipcode: {props.user.address.zipcode}</div>
            <div className={m.addressGeo}>
                <p><h3>geo: </h3></p>
                <div>lat: {props.user.address.geo.lat}</div>
                <div>lng: {props.user.address.geo.lng}</div>
            </div>
            <div>Phone: {props.user.phone}</div>
            <div>Website: {props.user.website}</div>
            <p><h2>Company:</h2></p>
            <div>Name: {props.user.company.name}</div>
            <div>CatchPhrase: {props.user.company.catchPhrase}</div>
            <div>bs: {props.user.company.bs}</div>
            <NavLink to={`/posts/${props.user.id}`} activeClassName={u.activeLink}>Подробнее...</NavLink>

            {isModalOpen &&
            <Modal className={m.modal} open={isModalOpen}>
                <div className={m.modalContainer}>
                    <form onSubmit={formik.handleSubmit}>
                        {editFields.map(editField => {
                            return <TextField className={m.input}
                                              placeholder={editField.placeholder}
                                              {...formik.getFieldProps(editField.field)}/>
                        })}
                        <Button variant="outlined" color="primary" type="submit">Edit</Button>
                        <Button style={{float: "right"}} variant="outlined"
                                color="secondary" onClick={onClose}>Close</Button>
                    </form>
                </div>
            </Modal>
            }
        </div>
    )

}
