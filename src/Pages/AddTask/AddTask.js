import { Button, Card, CardBody, CardFooter, CardHeader, Input, Textarea, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import ReactDatePicker from 'react-datepicker';

const AddTask = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className=' mt-10 grid grid-cols-3'>
            <div className='px-3'>
                <form action="">
                    <div className="">
                        <Input type="text" placeholder='write your task' name='task' />
                    </div>
                    <div className="mt-3">
                        <Input type="text" placeholder='Place Image Link' name='image' />
                    </div>
                    <div className="mt-3">
                    <ReactDatePicker selected={startDate}  />
                    </div>
                    <div className='mt-3 text-center'>
                        <Button color="amber">Add Task</Button>
                    </div>
                </form>
            </div>

            <div className='col-span-2'>
                <h4 className='text-center'>Task list</h4>
                <table className="">
                    <thead className=''>
                        <tr className=''>
                            <th>Song</th>
                            <th>Artist</th>
                            <th>Year</th>
                        </tr>
                    </thead>
                    <tbody className='mt-5'>
                        <tr>
                            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
                            <td>Malcolm Lockyer</td>
                            <td>1961</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AddTask;