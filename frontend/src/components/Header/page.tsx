'use client'

import { FC } from 'react'
import styles from './styles.module.scss'
import { IShippingFields } from './interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTaskContext } from '@/contexts/TaskContext';
import classNames from 'classnames';

const Header: FC = () => {
    const { taskList, setTaskList } = useTaskContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IShippingFields>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IShippingFields> = (data) => {
        data.status = 'Ожидает выполнения';
        setTaskList((taskList: []) => [...taskList, data]);
        reset();
    };

    return (
        <header className={styles.header}>
            <form className={styles.header__form} onSubmit={handleSubmit(onSubmit)}>
                <fieldset className={styles.header__form_fieldset}>
                    <input
                        {...register('task', { required: true, min: 1, maxLength: 60 })}
                        placeholder="Введите вашу задачу"
                        id="task"
                        name="task"
                        type="text"
                        className={classNames(styles.header__form_input, errors.task ? styles.header__form_input_borders : '')}
                    >
                    </input>
                    {errors.task && <span className={styles.header__form_error}>В поле должно быть не менее 1 символа и не более 100 символов</span>}
                </fieldset>
                <button type='submit' className={classNames(styles.header__form_button, isValid ? '' : styles.header__form_button_disabled)} disabled={!isValid}>Создать задачу</button>
            </form>
        </header>
    )
}

export default Header