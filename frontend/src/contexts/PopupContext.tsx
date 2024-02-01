'use client'
import React, { createContext, useState, FC, useContext } from "react";
import type { PropsWithChildren, ReactNode } from 'react'

interface IPopupContext {
    openPopup: boolean,
    setOpenPopup: any,
    popupValues: { text: string, status: string, description: string, _id: number | string },
    setPopupValues: any,
    statusArray: string[],
    setStatusArray: any,
    openInfoToolTip: { status: boolean, opened: boolean },
    setOpenInfoToolTip: any,
}

export const PopupContext = React.createContext<IPopupContext | null>(null);

interface IPopupContextProvider {
    children: ReactNode
}

const PopupContextProvider: FC<IPopupContextProvider> = ({ children }) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [openInfoToolTip, setOpenInfoToolTip] = useState({ status: false, opened: false });
    const [popupValues, setPopupValues] = useState({ text: '', status: '', description: '', _id: '' });
    const [statusArray, setStatusArray] = useState(['В процессе', 'Ожидает выполнения', 'Выполнено']);
    return (
        <PopupContext.Provider value={{
            openPopup, setOpenPopup, popupValues, setPopupValues, statusArray, setStatusArray, openInfoToolTip, setOpenInfoToolTip
        }}>
            {children}
        </PopupContext.Provider>
    )
}

function usePopupContext() {
    const context = useContext(PopupContext);
    if (!context) {
        throw new Error(
            'usePopupContext должен использоваться вместе с PopupContextProvider'
        )
    }
    return context;
}

export { PopupContextProvider, usePopupContext };