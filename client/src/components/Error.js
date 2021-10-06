import { Box, Container, Grid } from '@mui/material'

function Error(){
    return(
        <Container sx={{paddingTop: '124px'}}>
            <Box container
                variant='home'
                component={Grid}
                justifyContent='center'
                boxShadow={3}
                alignItems='center'
                sx={{
                    width: 510,
                    height: 510,
                    backgroundImage: `url(${"https://i.imgur.com/0qwFVwD.png"}`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto'
                }}
            />
        </Container>
    )
}

export default Error