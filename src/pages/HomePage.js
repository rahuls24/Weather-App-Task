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
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
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
			<WeatherInfoCard />
		</Container>
	);
}

export default HomePage;

function WeatherInfoCard() {
	return (
		<Card sx={{ marginTop: 2, padding: 2 }}>
			<Stack
				direction='row'
				justifyContent={'space-between'}
				alignItems='center'
				sx={{ marginBottom: { xs: 2, sm: 6 } }}
			>
				<Typography variant='h5' gutterBottom>
					Current Weather
				</Typography>
				<Stack direction='row' spacing={1} alignItems='center'>
					<Typography>Off</Typography>
					<Switch
						checked={true}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					<Typography>On</Typography>
				</Stack>
			</Stack>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={4} sm={4} md={6}>
					<Box>
						<Typography
							variant='h6'
							gutterBottom
							textAlign={'center'}
							width='100%'
						>
							{'New York'}
						</Typography>
						<Stack direction='row' alignItems='center' spacing={2}>
							<Avatar
								alt='Remy Sharp'
								src='http://openweathermap.org/img/wn/10d@2x.png'
								sx={{ width: 100, height: 100 }}
							/>
							<Typography fontSize={'7rem'}>
								{'45'}&deg;
							</Typography>
						</Stack>

						<Typography
							variant='body1'
							gutterBottom
							textAlign={'center'}
							width='100%'
						>
							{'light rain'}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={4} sm={4} md={6}>
					<Typography>{'Feels Like'}</Typography>
					<Typography>{'High Low'}</Typography>
					<Typography>{'Wind Speed'}</Typography>
					<Typography>{'Pressure'}</Typography>
					<Typography>{'Sun Rise | Sun Set'}</Typography>
				</Grid>
			</Grid>
		</Card>
	);
}
