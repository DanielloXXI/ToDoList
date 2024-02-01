'use client'

import { FC, useEffect } from 'react'
import styles from './styles.module.scss'
import { IShippingFields } from './interface';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTaskContext } from '@/contexts/TaskContext';
import classNames from 'classnames';
import { addCard, getCards } from '@/utils/MainApi';
import { usePopupContext } from '@/contexts/PopupContext';

const Header: FC = () => {
    const { setTaskList } = useTaskContext();
    const { setOpenInfoToolTip } = usePopupContext();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isValid }
    } = useForm<IShippingFields>({ mode: 'onChange' });

    const onSubmit: SubmitHandler<IShippingFields> = (data) => {
        data.status = 'Ожидает выполнения';
        addCard(data.text, data.description, data.status).then(res => {
            setTaskList((taskList: []) => [...taskList, res.data]);
            reset();
        }).catch((err) => {console.log(err), setOpenInfoToolTip({status: false, opened: true})});
    };

    return (

        <header className={styles.header}>
            <form className={styles.header__form} onSubmit={handleSubmit(onSubmit)}>
                <fieldset className={styles.header__form_fieldset}>
                    <input
                        {...register('text', { required: true, min: 1, maxLength: 60 })}
                        placeholder="Введите вашу задачу"
                        id="text"
                        name="text"
                        type="text"
                        className={classNames(styles.header__form_input, errors.text ? styles.header__form_input_borders : '')}
                    >
                    </input>
                    {errors.text && <span className={styles.header__form_error}>В поле должно быть не менее 1 символа и не более 100 символов</span>}
                </fieldset>
                <button type='submit' className={classNames(styles.header__form_button, isValid ? '' : styles.header__form_button_disabled)} disabled={!isValid}>Создать задачу</button>
            </form>
        </header>
    )
}

export default Header