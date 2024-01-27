import { FC } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import editIcon from '../../../public/edit3.png'

interface ITask {
    text: string,
    id: number,
    discription: string,
    status: string,
}

const Task: FC<ITask> = ({ text, id, discription, status }) => {
    return (
        <div className={styles.task}>
            <span className={styles.task__title}>{text}</span>
            <div className={styles.task__buttons}>
                <div className={styles.task__buttons_status}><span className={styles.task__buttons_status_text}>{status}</span></div>
                <button type='button' className={styles.task__buttons_button}><Image src={editIcon} width={16} height={16} alt='Редактировать'></Image></button>
            </div>
        </div>
    )
}

export default Task