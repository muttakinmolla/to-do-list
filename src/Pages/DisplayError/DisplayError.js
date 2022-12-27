import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import ErrorImage from '../../assets/images/404-error-page-templates.png';

const DisplayError = () => {
    const error = useRouteError();
    return (
        <div>

            {/* <p className='text-3xl'>Please Logout <li><button onClick={handleLogOut} className='btn btn-primary'>logOut</button></li> and log back in</p> */}
            <div className='container'>
                <div className='mb-5 pb-5 m-auto'>
                    <div className='text-center'>
                        <p className='text-red-500'>Something went wrong</p>
                        <p className='text-red-400'>{error.statusText || Text.message}</p>
                        <img src={ErrorImage} className='img-fluid w-50' alt="" />
                        <div className='text-center'>
                            <Link to='/' className='btn btn-success'>Go To Home Page</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisplayError;