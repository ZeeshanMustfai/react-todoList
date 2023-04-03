import React, { useState } from 'react'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Grid,
	InputAdornment,
	Radio,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import styles from './todo.module.scss'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CloseIcon from '@mui/icons-material/Close'

type OneToDo = {
	id: string | number
	name: string
	completed: boolean
}
const Todo = () => {
	const theme = useTheme()
	const [todoList, setTodoList] = useState<OneToDo[]>([])
	const [todo, setTodo] = useState<OneToDo>({
		id: '',
		name: '',
		completed: false,
	})

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const item = {
			id: todoList.length + 1,
			name: event.target.value,
			completed: false,
		}
		setTodo(item)
	}

	const handleOnClick = () => {
		setTodoList((prev) => prev.concat(todo))
		setTodo({
			id: '',
			name: '',
			completed: false,
		})
	}

	const handleDelete = (id: number | string) => {
		const upDated = todoList.filter((item) => item.id !== id)
		setTodoList(upDated)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		console.log('event', event.target)
		if (event.key === 'Enter') {
			const item = {
				id: todoList.length + 1,
				name: 'abc',
				completed: false,
			}
			setTodo(item)
		}
	}
	return (
		<div className={styles.mainTodo}>
			<Grid container>
				<Grid item xs={12} className={styles.todoTitle}>
					<Typography
						fontWeight={800}
						fontSize={24}
						color={theme.palette.secondary.main}
					>
						Todo
					</Typography>
					<NightlightRoundIcon color='secondary' />
				</Grid>
				<Grid item xs={12}>
					<TextField
						name='todo'
						onChange={handleChange}
						onKeyDown={handleKeyDown}
						value={todo.name}
						InputProps={{
							endAdornment: (
								<InputAdornment
									position='end'
									onClick={handleOnClick}
									className={styles.addButton}
								>
									<AddCircleOutlineIcon />
								</InputAdornment>
							),
						}}
					/>
				</Grid>
				<Grid item xs={12}>
					<Card elevation={3}>
						<CardContent>
							{todoList.map((item) => (
								<Box className={styles.todoItem}>
									<Box className={styles.todoCompleted}>
										<Checkbox checked={item.completed} />
										<Typography key={item.id} className={styles.item}>
											{item.name}
										</Typography>
									</Box>
									<CloseIcon
										className={styles.icon}
										onClick={() => handleDelete(item.id)}
									/>
								</Box>
							))}
						</CardContent>
						<CardActions>
							<Button color='secondary'>{todoList.length} Item</Button>
							<Button color='secondary'>All</Button>
							<Button color='secondary'>Completed</Button>
							<Button color='secondary'>Clear Completed</Button>
							<Button color='secondary'>Clear All</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</div>
	)
}

export { Todo }
