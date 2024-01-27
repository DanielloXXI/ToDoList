import { FC } from 'react'
import styles from './styles.module.scss'
import TaskList from '../TaskList/page'

const Main: FC = () => {

  return (
    <main className={styles.main}>
      <TaskList></TaskList>
    </main>
  )
}

export default Main