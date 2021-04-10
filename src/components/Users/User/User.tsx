import React, {useState} from "react";
import {editUsers, UserType} from "../../../redux/users-reducer";
import {Button} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import u from '../Users.module.css';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Modal from "@material-ui/core/Modal";
import m from '../AddUser/AddUser.module.css';
import TextField from "@material-ui/core/TextField";

type PropsType = {
    user: UserType
}


export let User = (props: PropsType) => {

    const [isModalOpen, setIsModalOpen] = useState(false)

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
