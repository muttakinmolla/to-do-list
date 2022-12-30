import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import DatePicker from "react-datepicker";

import { DayPicker } from 'react-day-picker';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loader from '../../Shared/Loader/Loader';
import TaskTable from '../TaskTable/TaskTable';
import './AdTask.css';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const date = format(selectedDate, 'PP');
    const imageHostKey = process.env.REACT_APP_imgbb_key;

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://todolist-server-five.vercel.app/task?email=${user?.email}`, {

            })
            const data = await res.json();
            return data;
        }
    });



    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const note = form.task.value;
        const taskDate = date;

        const image = e.target.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=f0aa8da8515bd0f9b23c6d199ced70da`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);

                    const task = {
                        note: note,
                        image: imgData.data.url,
                        taskDate: taskDate,
                        email: user?.email,
                        status: 'pending',
                        comment: '',
                    }
                    fetch('https://todolist-server-five.vercel.app/addTask', {
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
                            refetch();
                        })
                        .catch(error => {
                            console.log(error);
                        })

                }
            })

    }

    return (
        <div className='mt-10'>
            <Button color='amber' className='mb-3 mx-auto'>
                <Link to='/completedTask'>Completed Task</Link>
            </Button>
            <div className='grid lg:grid-cols-3 sm:grid-cols-1'>
                <div className='px-3 drop-shadow-md sm:w-full'>
                    <h1>Add Your Task</h1>
                    <form onSubmit={handleTaskSubmit}>
                        <div className="">
                            <Input type="text" placeholder='write your task' name='task' className='text-white-900' />
                        </div>
                        <div className="mt-3">
                            <Input type="file" placeholder='Place Image Link' name='image' />
                        </div>

                        <div className="mt-3">
                            <DayPicker
                                mode='single'
                                selected={selectedDate}
                                onSelect={setSelectedDate}

                            />
                        </div>
                        <div className='mt-3 text-center'>
                            <Button type='submit' color="amber">Add Task</Button>
                        </div>
                    </form>
                </div>

                <div className='col-span-2 sm:mt-5'>
                    <div className='lg:ms-auto'>
                        <TaskTable tasks={tasks}></TaskTable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;