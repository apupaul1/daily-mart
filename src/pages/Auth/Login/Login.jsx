import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    }

    return (
        <div className='bg-white p-24'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">

                    <h2 className='text-black text-3xl mb-8'>Login Now</h2>

                    <label className="label text-black">Email</label>
                    <input
                        {...register('email', {
                            required: "Email Address is required"
                        })}
                        aria-invalid={errors.email ? "true" : "false"}
                        type="email"
                        className="input text-black"
                        placeholder="Email" />

                    {errors.email && <p className='text-red-500' role='alert'>{errors.email.message}</p>}


                    <label className="label text-black">Password</label>
                    <input
                        {...register('password', {
                            required: true, minLength: 6
                        })}
                        type="password"
                        className="input text-black"
                        placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }

                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password Must be 6 characters or longer</p>
                    }


                    <div><a className="link link-hover text-black">Forgot password?</a></div>


                    
                </fieldset>
                <button className="btn btn-neutral mt-4">Login</button>
            </form>
        </div>
    );
};

export default Login;