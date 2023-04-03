import { Button, Typography } from '@mui/material'

type TodoActionProps = {
	handleActions: (arg1: string) => void
	counter: number
}
const TodoAction = ({ handleActions, counter }: TodoActionProps) => {
	return (
		<>
			<Typography color='secondary'>{counter} Item</Typography>
			<Button color='secondary' onClick={() => handleActions('all')}>
				All
			</Button>
			<Button color='secondary' onClick={() => handleActions('active')}>
				Active
			</Button>
			<Button color='secondary' onClick={() => handleActions('completed')}>
				Completed
			</Button>
			<Button
				color='secondary'
				onClick={() => handleActions('clear-completed')}
			>
				Clear Completed
			</Button>
			<Button color='secondary' onClick={() => handleActions('clear-all')}>
				Clear All
			</Button>
		</>
	)
}

export default TodoAction
