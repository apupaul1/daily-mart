import React from 'react';
import { useForm } from 'react-hook-form';

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-8 md:p-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>Login Now</h2>

                <label className="block text-gray-700 mb-1">Email</label>
                <input
                    {...register('email', {
                        required: "Email Address is required"
                    })}
                    type="email"
                    className="input input-bordered w-full mb-2"
                    placeholder="Email"
                />
                {errors.email && <p className='text-red-500 text-sm mb-2'>{errors.email.message}</p>}

                <label className="block text-gray-700 mb-1">Password</label>
                <input
                    {...register('password', {
                        required: true, minLength: 6
                    })}
                    type="password"
                    className="input input-bordered w-full mb-2"
                    placeholder="Password"
                />
                {errors.password?.type === 'required' && <p className='text-red-500 text-sm mb-2'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-500 text-sm mb-2'>Password must be 6 characters or longer</p>}

                <div className="mb-4 text-right">
                    <a className="text-sm text-blue-600 hover:underline cursor-pointer">Forgot password?</a>
                </div>

                <button type="submit" className="btn btn-neutral w-full">Login</button>
            </form>
        </div>
    );
};

export default Login;
