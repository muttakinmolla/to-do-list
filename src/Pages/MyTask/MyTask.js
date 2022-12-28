import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Loader from '../../Shared/Loader/Loader';
import TaskTable from '../TaskTable/TaskTable';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://todolist-server-five.vercel.app/task?email=${user?.email}`, {

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

    const handleTaskStatusUpdate = task => {
        const updateComment = document.getElementById(task._id).value;
        console.log(updateComment)
        const updateTask = {
            comment: updateComment,
        }

        fetch(`https://todolist-server-five.vercel.app/task/status/${task._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTask)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('status update successfully');
                    refetch();
                }
            })
    }
    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div>
            <h1>My Task</h1>
            <TaskTable tasks={tasks} handleDeleteUser={handleDeleteUser} handleTaskStatusUpdate={handleTaskStatusUpdate}></TaskTable>
        </div>
    );
};

export default MyTask;