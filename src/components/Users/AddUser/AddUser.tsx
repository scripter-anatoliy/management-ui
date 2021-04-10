import React from "react";
import {useDispatch} from "react-redux";
import {addUsers} from "../../redux/users-reducer";
import {Button, Modal} from "@material-ui/core";
import m from './AddUser.module.css';
import {useFormik,} from "formik";
import TextField from "@material-ui/core/TextField";

function AddUser(props: { open: boolean, setModal: (open: boolean) => void }) {
    const dispatch = useDispatch()

    const onClose = () => {
        props.setModal(false)

    }
    const fields = [
        {field: 'name', placeholder: 'Name'},
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
            name: '',
            username: '',
            email: '',
            street: '',
            suite: '',
            lat: '',
            lng: '',
            phone: '',
            website: '',
            companyName: '',
            catchPhrase: '',
            bs: '',
            city: '',
            zipcode: ''
        },
        onSubmit: ({name, email, bs, catchPhrase, username, street, suite, city, zipcode, phone, website, companyName, lat, lng}) => {
            dispatch(addUsers({
                name, username, email, phone, website,
                company: {name: companyName, catchPhrase, bs},
                address: {
                    street, suite, city, zipcode,
                    geo: {lat, lng}
                }
            }))
            props.setModal(false)
            formik.resetForm()
        },
    })

    return <Modal className={m.modal} open={props.open}>
        <div className={m.modalContainer}>
            <form onSubmit={formik.handleSubmit}>
                {fields.map(field => <TextField className={m.input}
                                            placeholder={field.placeholder} {...formik.getFieldProps(field.field)}/>)}
                <Button variant="contained" color="primary" type="submit">Add</Button>
                <Button style={{float: "right"}} variant="contained"
                        color="secondary" onClick={onClose}>Close</Button>
            </form>
        </div>
    </Modal>;
}

export default AddUser