import { FC } from 'react'
import styles from './styles.module.scss'
import TaskList from '../TaskList/page'
import Popup from '../Popup/page'

const Main: FC = () => {

  return (
    <main className={styles.main}>
      <TaskList></TaskList>
      <Popup></Popup>
    </main>
  )
}

export default Main