import { createTheme } from "@mui/material";

export const lighTheme = createTheme({
  palette: {
    primary: {
      main: '#000'
    },
    secondary:{
      main: '#000'
    },  
    background: {
      default: '#E8E2E2'
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