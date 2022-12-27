import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import DatePicker from "react-datepicker";
import { DayPicker } from 'react-day-picker';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loader from '../../Shared/Loader/Loader';
import TaskTable from '../TaskTable/TaskTable';
import './AdTask.css';

const AddTask = () => {
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const date = format(selectedDate, 'PP');

    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/task?email=${user?.email}`, {

            })
            const data = await res.json();
            return data;
        }
    });

    // if (isLoading) {
    //     return <Loader></Loader>
    // }

    const handleTaskSubmit = (e) => {
        e.preventDefault();
        const form = e.target;

        const task = {
            note: form.task.value,
            image: form.image.value,
            taskDate: date,
            email: user?.email,
            status: 'pending'
        };
        console.log(task);

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
                refetch();
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div className=' mt-10 grid grid-cols-3'>
            <div className='px-3 drop-shadow-md '>
                <h1>Add Your Task</h1>
                <form onSubmit={handleTaskSubmit}>
                    <div className="">
                        <Input type="text" placeholder='write your task' name='task' className='text-white-900' />
                    </div>
                    <div className="mt-3">
                        <Input type="text" placeholder='Place Image Link' name='image' />
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

            <div className='col-span-2'>
                <div className='ms-auto'>
                   <TaskTable tasks={tasks}></TaskTable>
                </div>
            </div>
        </div>
    );
};

export default AddTask;