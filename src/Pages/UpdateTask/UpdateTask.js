import { Button, Input } from '@material-tailwind/react';
import { format } from 'date-fns/esm';
import React, { useContext, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';

const UpdateTask = () => {
    const { user } = useContext(AuthContext);
    const task = useLoaderData();
    console.log(task)
    const { _id, note, taskDate, image, status } = task;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const date = format(selectedDate, 'PP');
    const navigate = useNavigate();


    const handleTaskUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const task = {
            note: form.task.value,
            image: form.image.value,
            taskDate: date,
            email: user?.email,
            status: status
        };
        // console.log(task);
        fetch(`http://localhost:5000/task/update/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    e.target.reset();
                    navigate(`/myTask`)
                    toast.success('your task successfully updated');
                }
            })
    }
    return (
        <div className='flex flex-row" place-items-center'>
            <div className='basis-1/2 m-auto drop-shadow-md'>
                <h1>Add Your Task</h1>
                <form onSubmit={handleTaskUpdate}>
                    <div className="">
                        <Input type="text" defaultValue={note} name='task' className='text-white-900' />
                    </div>
                    <div className="mt-3">
                        <Input type="text" defaultValue={image} name='image' />
                    </div>
                    <div className="mt-3">
                        <Input type="text" defaultValue={taskDate} name='date' />
                    </div>
                    <div className="mt-3 ">
                        <DayPicker
                            mode='single'
                            selected={selectedDate}
                            onSelect={setSelectedDate}
                            

                        />
                    </div>
                    <div className='mt-3 text-center'>
                        <Button type='submit' color="amber">Update Task</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateTask;