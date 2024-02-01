'use client'

import success from '@/../public/success.svg'
import bad from '@/../public/bad.svg';
import Image from 'next/image';
import styles from './styles.module.scss';
import { FC } from 'react';
import classNames from 'classnames';
import { usePopupContext } from '@/contexts/PopupContext';

const InfoToolTip: FC = () => {

	const { openInfoToolTip, setOpenInfoToolTip } = usePopupContext();

	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			className={classNames(styles.info_tooltip, openInfoToolTip.opened ? styles.info_tooltip_opened : '')}
			onClick={() => setOpenInfoToolTip({status: false, opened: false})}
		>
			<div className={styles.info_tooltip__container}>
				<Image
					className={styles.info_tooltip__icon}
					alt="иконка"
					src={openInfoToolTip.status ? success : bad}
				/>
				<p className={styles.info_tooltip__text}>{openInfoToolTip.status ? 'Успех' : 'Ошибка'}</p>
			</div>
		</div>
	);
}

export default InfoToolTip;
