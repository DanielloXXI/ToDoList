import { FC } from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import editIcon from '../../../public/edit3.png'
import { usePopupContext } from '@/contexts/PopupContext'
import classNames from 'classnames'

interface ITask {
    text: string,
    id: number,
    description: string,
    status: string,
}

const Task: FC<ITask> = ({ text, id, description, status }) => {

    const { openPopup, setOpenPopup, setPopupValues, popupValues, statusArray, setStatusArray } = usePopupContext();
    const styleStatus = status === 'В процессе' ? 'task__buttons_status_process' : status === 'Ожидает выполнения' ? 'task__buttons_status_waiting' : 'task__buttons_status_ready';


    function onEditButtonClick() {
        setStatusArray(statusArray.sort(function (x, y) {
            return x == status ? -1 : y == status ? 1 : 0;
        }));
        // console.log(`${statusArray} - Задаём порядок массива при открытии попапа`)
        setPopupValues({ text, description, status, id });
        // console.log()
        setOpenPopup(true);
    }

    return (
        <div className={styles.task}>
            <span className={styles.task__title}>{text}</span>
            <div className={styles.task__buttons}>
                <div className={classNames(styles.task__buttons_status, styles[styleStatus])}><span className={styles.task__buttons_status_text}>{status}</span></div>
                <button type='button' className={styles.task__buttons_button} onClick={onEditButtonClick}><Image src={editIcon} width={16} height={16} alt='Редактировать'></Image></button>
            </div>
        </div>
    )
}

export default Task