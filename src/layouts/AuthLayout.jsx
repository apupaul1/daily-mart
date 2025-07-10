import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div
                className="hero min-h-screen"
                style={{
                    backgroundImage:
                        "url(https://i.ibb.co/Df7SCRDg/Auth-Layout.jpg)",
                }}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;