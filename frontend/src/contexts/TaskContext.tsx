'use client'
import React, { createContext, useState, FC, useContext } from "react";
import type { PropsWithChildren, ReactNode } from 'react'

interface ITaskContext {
    taskList: [{task: string, status: string, description: string}] | never[],
    setTaskList: any
}

export const TaskContext = React.createContext<ITaskContext | null>(null);

interface ITaskContextProvider { 
    children: ReactNode
}

const TaskContextProvider: FC<ITaskContextProvider> = ({children}) => {
    const [taskList, setTaskList] = useState([]);

  return (
    <TaskContext.Provider value={{
        taskList, setTaskList
    }}>
        {children}
    </TaskContext.Provider>
)
}

function useTaskContext() {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error(
            'useTaskContext должен использоваться вместе с TaskContextProvider'
        )
    } 
    return context;
}

export {TaskContextProvider, useTaskContext};