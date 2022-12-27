import React from 'react';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faHourglassEnd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

const TaskTable = ({ tasks, handleDelteUser, handleTaskStatusUpdate }) => {
    // const location = window.location.href;
    // const currentLocation = '';
    const location = useLocation();


    return (
        <div>
            <section className='pl-10'>
                <h1>My Task</h1>
                {/* {loct.pathname} */}
                <div className="tbl-header">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <thead>
                            <tr>
                                <th>SL.</th>
                                <th>Note</th>
                                <th>Image</th>
                                <th>Date</th>
                                {
                                    location?.pathname === '/addTask' ? '' : <th>Action</th>
                                }

                            </tr>
                        </thead>
                    </table>
                </div>
                <div className="tbl-content">
                    <table cellPadding="0" cellSpacing="0" border="0">
                        <tbody>
                            {
                                tasks?.map((task, index) => <tr className='text-center' key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {task.note}
                                    </td>
                                    <td>
                                        <img className='object-fit h-20 w-50' src={task.image} alt="" />
                                    </td>
                                    <td>
                                        {
                                            task.taskDate
                                        }

                                    </td>

                                    {
                                        location?.pathname === '/addTask' ? ''
                                            :
                                            <td>

                                                <FontAwesomeIcon onClick={() => handleDelteUser(task)} className='text-red-900 text-xl' icon={faTrash}>

                                                </FontAwesomeIcon>

                                                {
                                                    task.status === 'pending' ? <FontAwesomeIcon onClick={() => handleTaskStatusUpdate(task._id)} icon={faHourglassEnd} className='pl-5 text-xl'></FontAwesomeIcon> : <FontAwesomeIcon icon={faCircleCheck} className='pl-5 text-xl text-yellow-300'></FontAwesomeIcon>
                                                }



                                            </td>
                                    }
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default TaskTable;