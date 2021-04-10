import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useFormik } from 'formik';
import * as yup from 'yup';
import DialogTitle from '@material-ui/core/DialogTitle';
import { firestore } from '../../firebase';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';
import { phoneRegExp } from '../../utils/helpers';
import { CircularProgress, Grid, TextField } from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const validationSchema = yup.object({
    name: yup.string()
        .required('Enter your name'),
    organization: yup.string()
        .required('Enter your organization'),
    email: yup
        .string().email('Email is not valid')
        .required('Enter your email')
    ,
    phoneNumber: yup
        .string().matches(phoneRegExp, 'Phone number is not valid')
        .required('Enter your phone number'),
});


const CRegisterForm = (props) => {

    const { open, onClose, onRegistration } = props;
    const [loading, setLoading] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const onSubmit = (values) => {

        setLoading(true);
        
        firestore.collection('users').add(values).then(res => {

            setLoading(false);
            onRegistration(values);
            handleClose();

        }).catch(error => {
            console.log(error);
            setLoading(false);
        });


    }

    const formik = useFormik({
        initialValues: { name: '', email: '', phoneNumber: '', organization: '' },
        validationSchema: validationSchema,
        onSubmit: onSubmit
    });


    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">Registration</DialogTitle>

            <DialogContent>


                <form onSubmit={formik.handleSubmit} className="registration-form">

                    <Grid container spacing={2}>

                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Full Name"
                                name="name"
                                disabled={loading}
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Organization"
                                name="organization"
                                disabled={loading}
                                value={formik.values.organization}
                                onChange={formik.handleChange}
                                error={formik.touched.organization && Boolean(formik.errors.organization)}
                                helperText={formik.touched.organization && formik.errors.organization}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Email Address"
                                name="email"
                                disabled={loading}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Phone Number"
                                name="phoneNumber"
                                disabled={loading}
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            />
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={loading}
                        >
                            {loading && <CircularProgress size={20} style={{ marginRight: 10, color: 'white' }} />} Register
                     </Button>

                    </Grid>

                </form>


            </DialogContent>

        </Dialog>

    );
}

// default props values
CRegisterForm.propTypes = {
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onRegistration: PropTypes.func,
}

// default props
CRegisterForm.defaultProps = {
    open: false,
    onClose: null,
    onRegistration: null,
}

export default CRegisterForm;