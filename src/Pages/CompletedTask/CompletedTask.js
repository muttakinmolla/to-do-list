import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import TaskTable from '../TaskTable/TaskTable';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/taskComplete?email=${user?.email}`, {

            })
            const data = await res.json();
            return data;
        }
    });
    return (
        <div>
            <h1>My Complete Task</h1>
            <TaskTable tasks={tasks}></TaskTable>
        </div>
    );
};

export default CompletedTask;