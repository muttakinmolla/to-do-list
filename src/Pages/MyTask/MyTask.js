import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import TaskTable from '../TaskTable/TaskTable';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/task?email=${user?.email}`, {

            })
            const data = await res.json();
            return data;
        }
    });

    const handleDelteUser = (task) => {
        fetch(`http://localhost:5000/task/${task._id}`, {
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

    const handleTaskStatusUpdate = id => {
        fetch(`http://localhost:5000/task/status/${id}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Order submit successfully');
                    refetch();
                }
            })
    }

    return (
        <div>
             <h1>My Task</h1>
            <TaskTable tasks={tasks} handleDelteUser={handleDelteUser} handleTaskStatusUpdate={handleTaskStatusUpdate}></TaskTable>
        </div>
    );
};

export default MyTask;