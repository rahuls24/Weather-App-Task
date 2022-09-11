import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
function HomePage() {
	return (
		<Container component='main' maxWidth='md'>
			<CssBaseline />
			<Typography
				variant='h6'
				component='div'
				textAlign={'center'}
				gutterBottom
				sx={{ width: '100%', marginTop: 4 }}
			>
				Enter Zip code
			</Typography>
			<TextField
				id='zip-code'
				label='Zip Code'
				variant='outlined'
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<SearchIcon />
						</InputAdornment>
					),
				}}
			/>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Paper variant='outlined' square elevation={6} sx={{}}></Paper>
			</Box>
		</Container>
	);
}

export default HomePage;

function WeatherInfoCard(){
    
}