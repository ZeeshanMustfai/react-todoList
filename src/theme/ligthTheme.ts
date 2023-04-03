import { createTheme } from "@mui/material";

export const lighTheme = createTheme({
  palette: {
    primary: {
      main: '#FFF2CC'
    },
    secondary:{
      main: '#FFD966'
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