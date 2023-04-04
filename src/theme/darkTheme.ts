import { createTheme } from "@mui/material"
import { blueGrey, pink } from "@mui/material/colors"

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: '#454545'
    },
    secondary:{
      main: '#FFA559'
    },  
    background: {
      default: '#454545'
    }
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

