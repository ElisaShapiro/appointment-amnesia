import { Typography } from '@mui/material';

function Footer(){
    return(
        <div style={{marginTop: "1rem", padding: "1em", position: "fixed", bottom: 0, left: 0, alignItems: "center", zIndex: 5000}}>           
            <Typography variant="body3" sx={{alignItems: "end", marginBottom: 0}}>Developed by Elisa Shapiro © 2021</Typography>
            <br /><a href="https://github.com/ElisaShapiro/appointment-amnesia" style={{fontSize: '10px', color: '#222', textDecoration: "none"}}>GitHub</a>
        </div>
    )
}

export default Footer