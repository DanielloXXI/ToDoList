'use client'

import { FC, useEffect, useState } from 'react'

import { useTaskContext } from '@/contexts/TaskContext'
import Task from '../Task/page'
import styles from './styles.module.scss'
import { getCards } from '@/utils/MainApi'

interface Ipage { }

const TaskList: FC<Ipage> = ({ }) => {

    const { taskList, setTaskList } = useTaskContext();

    useEffect(() => {
        getCards().then(res => setTaskList(res.data)).catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <section className={styles.taskList}>
            {
                taskList.map((task, id) => (
                    <Task text={task.text} _id={task._id} description={task.description} status={task.status} key={id}></Task>
                ))
            }
        </section>
    )
}

export default TaskList
