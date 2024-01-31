'use client'

import { FC, useEffect } from 'react'
import { usePopupContext } from '@/contexts/PopupContext';
import classNames from 'classnames';
import styles from './styles.module.scss'
import closePopupImage from '../../../public/popup-close.svg';
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IShippingFields } from '../Header/interface';
import { useTaskContext } from '@/contexts/TaskContext';
import { deleteCard, editCard } from '@/utils/MainApi';

interface IPopup { }

const Popup: FC<IPopup> = ({ }) => {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    setValue
  } = useForm<IShippingFields>({ mode: 'onChange' });

  const { taskList, setTaskList } = useTaskContext();
  const { openPopup, setOpenPopup, setPopupValues, popupValues, statusArray, setStatusArray } = usePopupContext();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpenPopup(false);
        reset();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  useEffect(() => {
    setValue('text', popupValues.text);
    setValue('description', popupValues.description);
    setValue('status', popupValues.status);
  }, [openPopup]);

const onSubmit: SubmitHandler<IShippingFields> = (data) => {
  editCard(popupValues._id, data.text, data.description, data.status)
    .then(res => {
      setTaskList((task: [{ text: string, status: string, description: string, _id: string | number }]) => task.map((c, id) => c._id === popupValues._id ? res.data : c));
      setStatusArray(['В процессе', 'Ожидает выполнения', 'Выполнено']);
      setPopupValues({ text: '', status: '', description: '', _id: '' });
      setOpenPopup(false);
      reset();
    })
    .catch(err => {
      console.log(err);
    })

};

function onDeleteClick() {
  deleteCard(popupValues._id)
    .then(res => {
      setTaskList((task: [{ text: string, status: string, description: string, _id: string | number }]) => task.filter((c, id) => c._id !== popupValues._id));
      setStatusArray(['В процессе', 'Ожидает выполнения', 'Выполнено']);
      setPopupValues({ text: '', status: '', description: '', _id: '' });
      setOpenPopup(false);
      reset();
    })
    .catch(err => {
      console.log(err);
    })
}

return (
  <section
    className={classNames(styles.popup, 'popup', {
      [styles.popup_opened]: openPopup,
    })}
    onMouseDown={(e) => {
      if (!(e.target instanceof HTMLElement)) return;
      if (!e.target.closest('.popup *')) {
        setOpenPopup(false);
        reset();
      }
    }}
  >
    <div
      className={styles.popup__container}
    >
      <button
        type="button"
        className={styles.popup__close}
        onClick={() => { setOpenPopup(false), reset(); }}
      >
        <Image src={closePopupImage} alt="Закрыть" width={24} height={24} />
      </button>
      <h2 className={styles.popup__title}>Изменение задачи</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.popup__form}>
        <fieldset className={styles.popup__form_fieldset}>
          <label htmlFor='text' className={styles.popup__form_text}>Текст задачи</label>
          <input
            {...register('text', { required: true, min: 1, maxLength: 60 })}
            placeholder="Введите вашу задачу"
            id="text"
            name="text"
            type="text"
            className={classNames(styles.popup__form_input, errors.text ? styles.popup__form_input_borders : '')}
          >
          </input>
          {errors.text && <span className={styles.popup__form_error}>В поле должно быть не менее 1 символа и не более 100 символов</span>}
        </fieldset>
        <fieldset className={styles.popup__form_fieldset}>
          <label htmlFor='description' className={styles.popup__form_text}>Описание задачи</label>
          <textarea
            {...register('description', { min: 1, maxLength: 300 })}
            placeholder="Введите описание задачи"
            id="description"
            name="description"
            className={classNames(styles.popup__form_input, styles.popup__form_input_description, errors.description ? styles.popup__form_input_borders : '')}
          >
          </textarea>
          {errors.description && <span className={styles.popup__form_error}>В поле должно быть не более 300 символов</span>}
        </fieldset>
        <fieldset className={styles.popup__form_fieldset}>
          <label htmlFor='status' className={styles.popup__form_text}>Статус задачи</label>
          <select {...register('status', { required: true })} className={classNames(styles.popup__form_input, styles.popup__form_input_select)} id='status' name='status'>
            {statusArray.map((value, id) => (
              <option value={value} key={id}>{value}</option>
            ))}
          </select>
        </fieldset>
        <div className={styles.popup__form_buttons}>
          <button type='submit' className={classNames(styles.popup__form_buttons_button, styles.popup__form_buttons_submit, !isValid ? styles.popup__form_buttons_disabled : '')} disabled={!isValid}>Сохранить</button>
          <button type='button' className={classNames(styles.popup__form_buttons_button, styles.popup__form_buttons_delete)} onClick={onDeleteClick}>Удалить</button>
        </div>
      </form>
    </div>
  </section>
)
}

export default Popup