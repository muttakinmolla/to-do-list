import { Button, IconButton, MobileNav, Navbar, Typography } from '@material-tailwind/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import './Header.css';

const Header = () => {
    const { user, logOut } = useContext(AuthContext);
    const [openNav, setOpenNav] = useState(false);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .then(error => console.log(error))
    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false)
        );
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink  to="/addTask" className="flex items-center {({isActive})=> isActive? 'active' : undefined}">
                    Add Task
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/myTask" className="flex items-center {({isActive})=> isActive? 'active' : undefined}">
                    My Task
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <NavLink to="/completedTask" className="flex items-center {({isActive})=> isActive? 'active' : undefined}">
                    Completed Task
                </NavLink>
            </Typography>

        </ul>
    );

    return (
        <div>
            <Navbar className="mx-auto  py-2 px-4 ">
                <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                    {/* <Typography
                        as="a"
                       
                        variant="small"
                        className="mr-4 cursor-pointer py-1.5 font-normal"
                    > */}
                        <NavLink className="{({isActive})=> isActive? 'active' : undefined}" to='/'>To-Do-List</NavLink>
                        {/* <span>To-Do List</span> */}
                    {/* </Typography> */}
                    <div className="hidden lg:block">{navList}</div>
                    {
                        user?.uid ?
                            <>
                                <div className="dropdown">
                                    <button color="amber" className='text-yellow-800'>Profile</button>
                                    <div className="dropdown-options">
                                        <a href="#">{
                                            user?.displayName && <p className='m-0 p-0'>{user?.displayName}</p>
                                        }</a>
                                        <button href='' onClick={handleLogOut}>Logout</button>
                                    </div>
                                </div>

                            </>
                            :

                            <Button color="amber" size="sm" className="hidden lg:inline-block">
                                <NavLink className="{({isActive})=> isActive? 'active' : undefined}" to='/login'>login</NavLink>
                            </Button>
                    }

                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <MobileNav open={openNav}>
                    {navList}
                    {
                        user?.uid ?
                            <>
                                <Button variant="gradient" onClick={handleLogOut} size="sm" fullWidth className="mb-2">
                                    <span>Logout</span>
                                </Button>
                            </>
                            :

                            <Button variant="gradient" size="sm" fullWidth className="mb-2">
                                <Link to="/login">Login</Link>
                            </Button>
                    }

                </MobileNav>
            </Navbar>
        </div>
    );
};

export default Header;