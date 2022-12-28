import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        if (user?.email) {
            const task = {
                note: form.task.value,
                image: '',
                taskDate: '',
                email: user?.email,
                status: 'pending'
            };

            fetch('http://localhost:5000/addTask', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(task)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success('task is added successfully');
                    form.reset();
                    navigate('/myTask')
                })
                .catch(error => {
                    console.log(error);
                })
        }else{
            toast.error('To note something please login first');
        }

    }
    return (
        <div className='mt-5'>
            <div className="flex flex-row">
                <div className="basis-1/2 lg:pr-5 lg:pl-5 bg-red-400 pt-5 pb-5 rounded-lg ">
                    <div className='text-center'>
                        <form onSubmit={handleTaskSubmit}>

                            <label className='text-center' style={{ 'color': 'white' }}>Type your note and press Enter</label>
                            <input className="enabled:hover:border-gray-400 disabled:opacity-75 pt-2 pb-2 mt-3 rounded w-full" name='task' />
                        </form>
                    </div>
                </div>
                <div className="basis-1/2">
                    <div className='lg:pl-5'>
                        <div className="bg-white dark:bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                            <div>
                                <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
                                </span>
                            </div>
                            <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
                            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                                The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;