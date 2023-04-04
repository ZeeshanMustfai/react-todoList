import { Box, ThemeProvider, useTheme } from '@mui/material'
import { Todo } from './components'
import { createContext, useState } from 'react'
import { Theme, ThemeContextType } from './types/theme'
import { lighTheme } from './theme/ligthTheme'
import { darkTheme } from './theme/darkTheme'

export const TodoContext = createContext<ThemeContextType | null>(null)

function App() {
	const [mode, setMode] = useState<Theme>('light')
	return (
		<TodoContext.Provider value={{ theme: mode, changeTheme: setMode }}>
			<ThemeProvider theme={mode === 'light' ? lighTheme : darkTheme}>
				<Box
					className='App'
					sx={{ background: mode === 'light' ? '#FFF' : '#454545' }}
				>
					<Todo />
				</Box>
			</ThemeProvider>
		</TodoContext.Provider>
	)
}

export default App
