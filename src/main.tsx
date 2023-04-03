import { ThemeProvider } from '@mui/material'
import ReactDOM from 'react-dom/client'
import { darkTheme } from './theme/darkTheme'
import { lighTheme } from './theme/ligthTheme'
import './styles/main.scss'
import App from './App'
import React from 'react'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider theme={lighTheme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
