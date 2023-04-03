import { useTheme } from '@mui/material'
import { Todo } from './components'

function App() {
	const theme = useTheme()
	return (
		<div className='App'>
			<Todo />
		</div>
	)
}

export default App
