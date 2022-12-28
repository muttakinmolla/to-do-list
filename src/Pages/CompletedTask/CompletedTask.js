import { Button } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import TaskTable from '../TaskTable/TaskTable';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://todolist-server-five.vercel.app/taskComplete?email=${user?.email}`, {

            })
            const data = await res.json();
            return data;
        }
    });

    const handleDeleteUser = (task) => {
       
        fetch(`https://todolist-server-five.vercel.app/task/${task._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('user deleted successfully');
                    refetch();
                }
            })
    };
    return (
        <div>
            <h1>My Complete Task</h1>
            <Button color='amber' className='mb-3'><Link to='/myTask'>Incomplete Task</Link></Button>
            <TaskTable tasks={tasks} handleDeleteUser={handleDeleteUser}></TaskTable>
        </div>
    );
};

export default CompletedTask;