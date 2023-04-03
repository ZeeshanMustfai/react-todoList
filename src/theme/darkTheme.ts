import { createTheme } from "@mui/material"

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#FFF2CC'
    },
    secondary:{
      main: '#FFD966'
    },  
  },
  components:{
    MuiTextField:{
      defaultProps:{
        size:'small',
        variant: 'outlined',
        margin: 'dense',
        fullWidth: true
      }
    }
  }
})

