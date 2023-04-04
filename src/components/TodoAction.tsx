import { Button, Typography } from '@mui/material'

type TodoActionProps = {
	handleActions: (arg1: string) => void
	handleClearAll: () => void
	counter: number
	currentAction: string
}

const TodoAction = ({
	handleActions,
	handleClearAll,
	counter,
	currentAction,
}: TodoActionProps) => {
	return (
		<>
			<Typography color='secondary'>{counter} Item</Typography>
			<Button
				color='secondary'
				onClick={() => handleActions('all')}
				variant={
					currentAction === 'all' || currentAction === '' ? 'contained' : 'text'
				}
			>
				All
			</Button>
			<Button
				color='secondary'
				onClick={() => handleActions('active')}
				variant={currentAction === 'active' ? 'contained' : 'text'}
			>
				Active
			</Button>
			<Button
				color='secondary'
				onClick={() => handleActions('completed')}
				variant={currentAction === 'completed' ? 'contained' : 'text'}
			>
				Completed
			</Button>
			<Button
				color='secondary'
				onClick={() => handleActions('clear-completed')}
			>
				Clear Completed
			</Button>
			<Button color='secondary' onClick={handleClearAll}>
				Clear All
			</Button>
		</>
	)
}

export default TodoAction
