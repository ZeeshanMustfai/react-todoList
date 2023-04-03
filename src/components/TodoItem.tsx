import { Box, Checkbox, Typography } from '@mui/material'
import styles from './todo.module.scss'
import CloseIcon from '@mui/icons-material/Close'
import classNames from 'classnames'
import { OneToDo } from './Todo'

type TodoItemProps = {
	item: OneToDo
	handleCompleted: (arg: string | number) => void
	handleDelete: (arg: number | string) => void
}

const TodoItem = ({ item, handleCompleted, handleDelete }: TodoItemProps) => {
	return (
		<Box className={styles.todoItem}>
			<Box className={styles.todoCompleted}>
				<Checkbox
					checked={item.completed}
					onChange={() => handleCompleted(item.id)}
				/>
				<Typography
					key={item.id}
					className={classNames(styles.item, {
						[styles.completedItem]: item.completed,
					})}
				>
					{item.name}
				</Typography>
			</Box>
			<CloseIcon
				className={styles.icon}
				onClick={() => handleDelete(item.id)}
			/>
		</Box>
	)
}

export default TodoItem
