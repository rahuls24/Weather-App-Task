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
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useMemo } from 'react';
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

function WeatherInfoCard(props) {
	const renderAdditionalInfo = useMemo(() => {
		const windSpeedHumidityAndPressureInfo = [
			{
				name: 'Wind Speed',
				value: `${23}kph`,
			},
			{
				name: 'Humidity',
				value: `${23}%`,
			},
			{
				name: 'Pressure',
				value: `${23}hPa`,
			},
		];
		return (
			<>
				{windSpeedHumidityAndPressureInfo.map(section => {
					return (
						<Grid
							container
							spacing={{ xs: 2, md: 2 }}
							columns={{ xs: 4, md: 12 }}
						>
							<Grid item xs={4} md={5}>
								<Typography fontSize={'1.5rem'}>
									{section.name}
								</Typography>
							</Grid>
							<Grid item xs={4} md={1}>
								<Typography
									fontSize={'1.5rem'}
									sx={{ fontWeight: 'bold' }}
								>
									{section.value}
								</Typography>
							</Grid>
						</Grid>
					);
				})}
				<Stack direction='row' alignItems='center' spacing={2}>
					<Avatar
						alt='Remy Sharp'
						src='http://openweathermap.org/img/wn/10d@2x.png'
						sx={{ width: 56, height: 56 }}
					/>
					<Typography
						variant='body1'
						gutterBottom
						fontSize={'1.5rem'}
					>
						{'06:23 AM'}
					</Typography>
					<Avatar
						alt='Remy Sharp'
						src='http://openweathermap.org/img/wn/10d@2x.png'
						sx={{ width: 56, height: 56 }}
					/>
					<Typography
						variant='body1'
						gutterBottom
						fontSize={'1.5rem'}
					>
						{'06:23 PM'}
					</Typography>
				</Stack>
			</>
		);
	}, []);
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
							fontSize={'3rem'}
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
							fontSize={'1.5rem'}
						>
							{'light rain'}
						</Typography>
					</Box>
				</Grid>
				<Grid item xs={4} sm={4} md={6}>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent={'center'}
						spacing={2}
						sx={{ marginBottom: 3 }}
					>
						<ArrowUpwardIcon sx={{ fontSize: 24 }} />
						<Typography
							fontSize='1.5rem'
							variant='button'
							display='block'
							gutterBottom
						>{`${56}\u00b0`}</Typography>
						<ArrowDownwardIcon sx={{ fontSize: 24 }} />
						<Typography
							fontSize='1.5rem'
							variant='button'
							display='block'
							gutterBottom
						>{`${46}\u00b0`}</Typography>
					</Stack>
					{renderAdditionalInfo}
				</Grid>
			</Grid>
		</Card>
	);
}
