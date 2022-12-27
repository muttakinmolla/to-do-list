import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { GoogleAuthProvider } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const Login = () => {
    const { googleSignIn, signInEmailPassword } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';


    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then(result => {
                const user = result.user;

                setError('');
                toast.success('successfully login');
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message);
            })
    };

    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        signInEmailPassword(email, password)
            .then(result => {
                const user = result.user;

                setError('');
                form.reset();
                navigate(from, { replace: true });
            })
            .catch(error => {
                setError(error.message)
            })

    };


    return (
        <div className='mt-20 grid place-items-center'>
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="amber"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <form onSubmit={handleSignIn}>

                        <div className='pb-3'>
                            <Input type='text' label="Email" name='email' size="lg" className='mb-5' />
                        </div>
                        <div>
                            <Input type='password' label="Password" name='password' size="lg" className='mt-3' />
                        </div>
                        {
                            setError && <p className='text-red-800 mt-2'>{error}</p>
                        }
                        <Button type='submit' variant="gradient" color='amber' className='text-white mt-5' fullWidth>
                            Sign In
                        </Button>
                    </form>
                </CardBody>
                <CardFooter className="pt-0">

                    <p className='mt-2 text-center mb-2'>OR</p>
                    <hr />
                    <div className='grid  place-items-center'>
                        <Button color='amber' className='mt-2 text-white' onClick={handleGoogleSignIn}>
                            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                        </Button>
                    </div>

                    {
                        setError && <p className="text-danger mt-3">{error}</p>
                    }

                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don't have an account?
                        <Typography
                            as="a"
                            href="/register"
                            variant="small"
                            color="amber"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div >
    );
};

export default Login;