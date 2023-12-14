import React from "react";
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { useDispatch } from 'react-redux'
import * as actions from '../../redux/actions'
import requestApi from "../../helpers/api";
import { toast } from 'react-toastify'

const UserAdd = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm()

    const handleSubmitFormAdd = (data) => {
        console.log('data form=> ', data)
        dispatch(actions.controlLoading(true))

        requestApi('/user', 'POST', data).then(response => {
            console.log("response=> ", response)
            dispatch(actions.controlLoading(false))
            toast.success('User has been created successfully', {position: 'top-center', autoClose: 2000})
            setTimeout(() => navigate('/users'), 3000)
        }).catch(err => {
            console.log(err)
            dispatch(actions.controlLoading(false))
            if (typeof err.response !== "undefined") {
                if (err.response.status !== 201) {
                    toast.error(err.response.data.message, { position: "top-center" })
                }
            } else {
                toast.error("Server is down. Please try again!", { position: "top-center" })
            }
        })

        // try {
        //     const res = requestApi('/user', 'POST', data);
        //     console.log('res=>', res)
        //     dispatch(actions.controlLoading(false))
        // } catch(error) {
        //     console.log('error=>',error)
        //     dispatch(actions.controlLoading(false))
        // }
    }

    return (
        <div id="layoutSidenav_content">
            <main>
                <div className="container-fluid px-4">
                    {/* <h1 className="mt-4">New user</h1>
                    <ol className="breadcrumb mb-4">
                        <li className="breadcrumb-item"><Link to='/'>Dashboard</Link></li>
                        <li className="breadcrumb-item"><Link to='/users'>Users</Link></li>
                        <li className="breadcrumb-item active">Add new</li>
                    </ol> */}
                    <div className='card mt-4 mb-4'>
                        <div className="card-header">
                            <i className="fas fa-plus me-1"></i>
                            Add
                        </div>
                        <div className="card-body">
                            <div className="row mb-3">
                                <form>
                                    <div className="col-md-6">
                                        <div className="mb-3 mt-3">
                                            <label className="form-label">First name:</label>
                                            <input {...register('firstName', {required: 'First name is required.'})} type="text" className="form-control" placeholder="Enter first name"/>
                                            {errors.firstName && <p style={{color: 'red'}}>{errors.firstName.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Last name:</label>
                                            <input {...register('lastName', {required: 'Last name is required.'})} type="text" className="form-control" placeholder="Enter last name"/>
                                            {errors.lastName && <p style={{color: 'red'}}>{errors.lastName.message}</p>}
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label className="form-label">Email:</label>
                                            <input {...register('email', { 
                                                required: 'Email is required.', 
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                    message: 'Invalid email address'
                                                }
                                                })} type="email" className="form-control" placeholder="Enter email"/>
                                                {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password:</label>
                                            <input {...register('password', {
                                                required: 'Password is required.',
                                                minLength: {
                                                    value: 6,
                                                    message: 'Password must be at least 6 characters.',
                                                },
                                                })} type="password" className="form-control" placeholder="Enter password"/>
                                            {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
                                        </div>
                                        <div className="mb-3 mt-3">
                                            <label className="form-label">Phone:</label>
                                            <input {...register('phone', {
                                                required: 'Phone is required.',
                                                pattern: {
                                                    value: /^[0-9]{10}$/, // Định dạng: 10 chữ số
                                                    message: 'Invalid phone number.',
                                                },
                                                })} type="phone" className="form-control" placeholder="Enter phone"/>
                                            {errors.phone && <p style={{color: 'red'}}>{errors.phone.message}</p>}
                                        </div>
                                        <div className="mt-3 mb-3">
                                            <label className="form-label">Status:</label>
                                            <select {...register('status', { valueAsNumber: true })} className="form-select">
                                                <option value={1}>Active</option>
                                                <option value={4}>Inactive</option>
                                        </select>
                                        </div>
                                        <button type="button" onClick={handleSubmit(handleSubmitFormAdd)} className="btn btn-success">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </main>
        </div>
    )
}

export default UserAdd