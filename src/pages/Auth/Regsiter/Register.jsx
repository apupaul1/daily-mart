import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {

    const { register, handleSubmit, formState:{errors} } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body p-19 ">
                <h1 className="text-5xl font-bold text-black">Create An Account</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Email</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email"
                            {...register('email',{required: true})} />

                            {
                                errors.email?.type === 'required' && <p className='text-red-500'>Email is Required</p>
                            }


                        <label className="label">Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            {...register('password',{required:true, minLength: 6})} />

                            {
                                errors.password?.type==='required' && <p className='text-red-500'>Password is Required</p>
                            }


                        <div><a className="link link-hover">Forgot password?</a></div>
                        <button className="btn btn-neutral mt-4">Login</button>
                    </fieldset>
                </form>
            </div>
        </div>

    );
};

export default Register;