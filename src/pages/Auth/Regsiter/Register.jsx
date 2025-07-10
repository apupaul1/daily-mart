import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';

const Register = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser } = useAuth();

    const onSubmit = data => {
        console.log(data);

        createUser(data.email,data.password)
        .then(result => {
            console.log(result.user);
        })
        .catch(error => {
            console.log(error);
        })
    };

    return (
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
            <div className="card-body p-8">
                <h1 className="text-3xl font-bold text-black mb-4 text-center">Create an Account</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset space-y-4">

                        {/* Name */}
                        <div>
                            <label className="label text-black">Name</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Full Name"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <p className='text-red-500 text-sm'>Name is Required</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label text-black">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Email"
                                {...register('email', { required: true })}
                            />
                            {errors.email && <p className='text-red-500 text-sm'>Email is Required</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="label text-black">Password</label>
                            <input
                                type="password"
                                className="input input-bordered w-full"
                                placeholder="Password"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            {errors.password?.type === 'required' && <p className='text-red-500 text-sm'>Password is Required</p>}
                            {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm'>Password must be at least 6 characters</p>}
                        </div>

                        <div className="text-right">
                            <a className="link link-hover text-sm text-black">Forgot password?</a>
                        </div>

                        <button type="submit" className="btn btn-neutral w-full">Register</button>
                    </fieldset>
                    <p><small>Already have an account? <Link to={'/login'}>Login</Link></small></p>
                </form>
            </div>
        </div>
    );
};

export default Register;
