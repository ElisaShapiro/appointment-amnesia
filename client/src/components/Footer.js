import { Typography } from '@mui/material';

function Footer(){
    return(
        <div style={{marginTop: '0.5rem', padding: '0.5em', position: 'fixed', bottom: 0, left: 0, alignItems: 'center', zIndex: 5000}}>           
            <Typography variant='body3' sx={{alignItems: 'end', marginBottom: 0}}>Developed by Elisa Shapiro © 2021 </Typography>
            <a href="https://github.com/ElisaShapiro/appointment-amnesia" style={{fontSize: '8px', color: '#222', textDecoration: 'none'}}>GitHub</a>
        </div>
    )
}

export default Footer