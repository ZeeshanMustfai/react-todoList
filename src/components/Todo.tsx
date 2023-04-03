import React, { useEffect, useState } from 'react'
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Checkbox,
	Grid,
	InputAdornment,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import styles from './todo.module.scss'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CloseIcon from '@mui/icons-material/Close'
import { v4 as uuidv4 } from 'uuid'
import classNames from 'classnames'
import TodoAction from './TodoAction'
import TodoItem from './TodoItem'

export type OneToDo = {
	id: string | number
	name: string
	completed: boolean
}

const updatedList = (action: string, list: OneToDo[]) => {
	if (action === 'all') return { [action]: list }
	return {
		[action]: list.filter((item) => {
			if (action === 'completed') {
				return item.completed
			} else {
				return !item.completed
			}
		}),
	}
}
const Todo = () => {
	const theme = useTheme()
	const [input, setInput] = useState('')
	const [todoList, setTodoList] = useState<OneToDo[]>([])
	const [filteredList, setFilteredList] = useState<OneToDo[]>([])

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
	}

	const handleOnClick = () => {
		if (input === '') return
		const item = {
			id: uuidv4(),
			name: input,
			completed: false,
		}
		setTodoList((prev) => prev.concat(item))
		setInput('')
	}

	const handleDelete = (id: number | string) => {
		const upDated = todoList.filter((item) => item.id !== id)
		setTodoList(upDated)
	}

	const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
		if (event.key === 'Enter') {
			if ((event.target as HTMLButtonElement).value === '') return
			const item = {
				id: uuidv4(),
				name: (event.target as HTMLButtonElement).value,
				completed: false,
			}
			setTodoList((prev) => prev.concat(item))
			setInput('')
		}
	}

	const handleCompleted = (id: string | number) => {
		let completed = [...todoList]
		const completedList = completed.map((item) => {
			if (item.id === id) {
				return {
					...item,
					completed: !item.completed,
				}
			}
			return { ...item }
		})
		setTodoList(completedList)
	}

	const handleActive = () => {
		const list = [...todoList]
		const result = list.filter((item) => !item.completed)
		setFilteredList(result)
	}
	const handleAll = () => {
		const list = [...todoList]
		setFilteredList(list)
	}
	const filterCompleted = () => {
		const list = [...todoList]
		const result = list.filter((item) => item.completed)
		setFilteredList(result)
	}
	const handleClearCompleted = () => {
		const list = [...todoList]
		const result = list.filter((item) => item.completed)
		setFilteredList(result)
	}

	const handleClearAll = () => {
		setTodoList([])
		setFilteredList([])
	}

	const handleActions = (item: string) => {
		console.log('list', updatedList(item, todoList))
	}
	console.log('fil', filteredList)
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
						value={input}
						placeholder='Create A New Todo...'
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
						<CardContent className={styles.cardContent}>
							{todoList.length > 0 ? (
								todoList.map((item) => (
									<TodoItem
										key={item.id}
										item={item}
										handleDelete={handleDelete}
										handleCompleted={handleCompleted}
									/>
								))
							) : (
								<Typography textAlign={'center'}>Items Not Found!</Typography>
							)}
						</CardContent>
						<CardActions className={styles.todoActions}>
							<TodoAction
								handleActions={handleActions}
								counter={todoList.length}
							/>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</div>
	)
}

export { Todo }
