import React, { useCallback, useContext, useState } from 'react'
import {
	Card,
	CardActions,
	CardContent,
	Grid,
	InputAdornment,
	TextField,
	Typography,
	useTheme,
} from '@mui/material'
import styles from './todo.module.scss'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { v4 as uuidv4 } from 'uuid'
import TodoAction from './TodoAction'
import TodoItem from './TodoItem'
import { toDoFilter } from '../helper'
import { TodoContext } from '../App'
import { LightMode } from '@mui/icons-material'
import { Theme, ThemeContextType } from '../types/theme'

export type OneToDo = {
	id: string | number
	name: string
	completed: boolean
}

const Todo = () => {
	const themes = useTheme()
	const [input, setInput] = useState('')
	const [isFilterd, setIsFilter] = useState(false)
	const [todoList, setTodoList] = useState<OneToDo[]>([])
	const [filteredList, setFilteredList] = useState<OneToDo[]>([])
	const [currentAction, setCurrentAction] = useState<string>('')
	const { theme, changeTheme } = useContext<ThemeContextType>(TodoContext)

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
	}

	const handleOnClick = useCallback(() => {
		if (input === '') return
		const item = {
			id: uuidv4(),
			name: input,
			completed: false,
		}
		setTodoList((prev) => prev.concat(item))
		setInput('')
		setIsFilter(false)
	}, [])

	const handleDelete = (id: number | string) => {
		const upDated = todoList.filter((item) => item.id !== id)
		if (isFilterd) setFilteredList(upDated)
		setTodoList(upDated)
	}

	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLDivElement>) => {
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
			setCurrentAction('all')
			setIsFilter(false)
		},
		[]
	)

	const handleCompleted = useCallback(
		(id: string | number) => {
			let completed = [...todoList]
			if (isFilterd) {
				completed = [...filteredList]
			}

			const completedList = completed.map((item) => {
				if (item.id === id) {
					return {
						...item,
						completed: !item.completed,
					}
				}
				return { ...item }
			})
			setFilteredList(completedList)
			setTodoList(completedList)
		},
		[todoList]
	)

	const handleClearAll = () => {
		setTodoList([])
		setFilteredList([])
		setIsFilter(false)
	}

	const handleActions = (item: string) => {
		const filter = toDoFilter(item, todoList)
		setIsFilter(true)
		if (item === 'clear-completed') {
			setTodoList(filter)
			setFilteredList(filter)
			setCurrentAction('all')
		} else {
			setCurrentAction(item)
			setFilteredList(filter)
		}
	}

	const handleTheme = (theme: string) => {
		changeTheme(theme as Theme)
	}

	return (
		<div className={styles.mainTodo}>
			<Grid container spacing={3}>
				<Grid item xs={12} className={styles.todoTitle}>
					<Typography
						fontWeight={800}
						fontSize={24}
						color={themes.palette.secondary.main}
					>
						Todo
					</Typography>

					{theme === 'light' ? (
						<NightlightRoundIcon
							color='secondary'
							onClick={() => handleTheme('dark')}
						/>
					) : (
						<LightMode color='secondary' onClick={() => handleTheme('light')} />
					)}
				</Grid>
				<Grid item xs={12}>
					<TextField
						name='todo'
						color='secondary'
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
					<Card
						elevation={3}
						sx={{ background: themes.palette.background.default }}
					>
						{todoList.length === 0 && (
							<Typography textAlign={'center'} marginTop={6}>
								Items Not Found!
							</Typography>
						)}
						<CardContent className={styles.cardContent}>
							{isFilterd
								? filteredList.map((item) => (
										<TodoItem
											key={item.id}
											item={item}
											handleDelete={handleDelete}
											handleCompleted={handleCompleted}
										/>
								  ))
								: todoList.map((item) => (
										<TodoItem
											key={item.id}
											item={item}
											handleDelete={handleDelete}
											handleCompleted={handleCompleted}
										/>
								  ))}
						</CardContent>
						<CardActions className={styles.todoActions}>
							<TodoAction
								handleActions={handleActions}
								handleClearAll={handleClearAll}
								counter={isFilterd ? filteredList.length : todoList.length}
								currentAction={currentAction}
							/>
						</CardActions>
					</Card>
				</Grid>
			</Grid>
		</div>
	)
}

export { Todo }
