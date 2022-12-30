import React from 'react';
import { format } from 'date-fns';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faEdit, faEye, faHourglassEnd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';

const TaskTable = ({ tasks, handleDeleteUser, handleTaskStatusUpdate }) => {
    const location = useLocation();



    return (
        <div>
            <section className=''>

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
                                    location?.pathname === '/myTask' ? <th>Comment</th> : <th></th>
                                }

                                {
                                    location?.pathname === '/addTask' ? '': <th>Action</th>
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
                                        <img className='object-fit h-20 w-50' src={task.imageUrl} alt="" />
                                    </td>
                                    <td>
                                        {
                                            task.taskDate
                                        }

                                    </td>

                                    {
                                        location?.pathname === '/myTask' && task.status === 'pending' ? <>
                                            <td >
                                                <input type="text" name='comment' id={task._id} className='lg:p-2 rounded text-black' />

                                                <button type="button" onClick={() => handleTaskStatusUpdate(task)} className="align-items-center justify-center inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">save</button>
                                                
                                            </td>

                                        </>
                                            :
                                            <>
                                                <td>

                                                </td>
                                            </>
                                    }



                                    {
                                        location?.pathname === '/addTask' ? ''
                                            :
                                            <td>

                                                <FontAwesomeIcon onClick={() => handleDeleteUser(task)} className='text-red-900 text-xl' icon={faTrash}>

                                                </FontAwesomeIcon>

                                                {
                                                    task.status === 'pending' ? <FontAwesomeIcon icon={faHourglassEnd} className='pl-5 text-xl'></FontAwesomeIcon> : <FontAwesomeIcon icon={faCircleCheck} className='pl-5 text-xl text-yellow-300'></FontAwesomeIcon>
                                                }

                                                <Link to={`/update/task/${task._id}`}><FontAwesomeIcon icon={faEdit} className='pl-5 text-xl text-yellow-300'></FontAwesomeIcon></Link>

                                            </td>
                                    }
                                </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </section >
        </div >
    );
};

export default TaskTable;