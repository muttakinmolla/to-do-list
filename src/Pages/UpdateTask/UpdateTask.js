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
    const { _id, note, taskDate, image, comment, status } = task;
    const [selectedDate, setSelectedDate] = useState(new Date());
    const date = format(selectedDate, 'PP');
    const navigate = useNavigate();



    const handleTaskUpdate = (e) => {
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
                        status: status,
                        comment: comment,
                    }

                    fetch(`https://todolist-server-five.vercel.app/task/update/${_id}`, {
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
                        .catch(error => {
                            toast.error(error.message)
                            console.log(error);
                        })
                } else {
                    const task = {
                        note: note,
                        image: image,
                        taskDate: taskDate,
                        email: user?.email,
                        status: status,
                        comment: comment,
                    }

                    fetch(`https://todolist-server-five.vercel.app/task/update/${_id}`, {
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
                        .catch(error => {
                            toast.error(error.message)
                            console.log(error);
                        })
                }
            })

        // console.log(task);

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
                        <Input type="file" name='image' />
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