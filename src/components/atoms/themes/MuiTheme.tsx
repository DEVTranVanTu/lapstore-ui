import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { FC, ReactNode } from "react";

const MuiTheme: FC = ({children}:ReactNode) =>{
    return(
        <ThemeProvider theme={}>
<CssBaseline>
    {children}
</CssBaseline>
        </ThemeProvider>
    )
}

export default MuiTheme