'use client'

import { FC, useState } from 'react'

import { useTaskContext } from '@/contexts/TaskContext'
import Task from '../Task/page'
import styles from './styles.module.scss'

interface Ipage { }

const TaskList: FC<Ipage> = ({ }) => {

    const { taskList, setTaskList } = useTaskContext();

    return (
        <section className={styles.taskList}>
            {
                taskList.map((task, taskId) => (
                    <Task text={task.task} id={taskId} description={task.description} status={task.status} key={taskId}></Task>
                ))
            }
        </section>
    )
}

export default TaskList
