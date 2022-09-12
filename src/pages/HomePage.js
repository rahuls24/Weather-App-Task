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
import sunsetIcon from '../assets/sunset.png';
import sunriseIcon from '../assets/sunrise.png';
import Tooltip from '@mui/material/Tooltip';
import WeekForecastChart from '../components/WeekForecastChart';
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
			<WeekForecastChart />
		</Container>
	);
}

export default HomePage;

function WeatherInfoCard(props) {
	const {
		windSpeed = 0,
		humidity = 0,
		pressure = 0,
		sunsetTime = '',
		sunriseTime = '',
		cityName = '',
		currentTemp = '',
		weatherDescription = '',
	} = props;
	const renderAdditionalInfo = useMemo(() => {
		const windSpeedHumidityAndPressureInfo = [
			{
				name: 'Wind Speed',
				value: `${windSpeed}kph`,
			},
			{
				name: 'Humidity',
				value: `${humidity}%`,
			},
			{
				name: 'Pressure',
				value: `${pressure}hPa`,
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
				<Stack
					direction='row'
					alignItems='center'
					spacing={2}
					sx={{ marginTop: 4 }}
				>
					<Tooltip title='Sunrise Time'>
						<Avatar
							alt='Sunrise Icon'
							src={sunriseIcon}
							sx={{ width: 56, height: 56 }}
						/>
					</Tooltip>
					<Tooltip title='Sunrise Time'>
						<Typography
							variant='body1'
							gutterBottom
							fontSize={'1.5rem'}
						>
							{sunriseTime}
						</Typography>
					</Tooltip>
					<Tooltip title='Sunset Time'>
						<Avatar
							alt='Sunset Icon'
							src={sunsetIcon}
							sx={{ width: 56, height: 56 }}
						/>
					</Tooltip>

					<Tooltip title='Sunset Time'>
						<Typography
							variant='body1'
							gutterBottom
							fontSize={'1.5rem'}
						>
							{sunsetTime}
						</Typography>
					</Tooltip>
				</Stack>
			</>
		);
	}, [windSpeed, pressure, humidity, sunsetTime, sunriseTime]);
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
					<Typography>C</Typography>
					<Switch
						checked={true}
						inputProps={{ 'aria-label': 'controlled' }}
					/>
					<Typography>F</Typography>
				</Stack>
			</Stack>
			<Grid
				container
				spacing={{ xs: 2, md: 3 }}
				columns={{ xs: 4, sm: 8, md: 12 }}
			>
				<Grid item xs={4} sm={4} md={6}>
					<Box>
						<Tooltip title='Location'>
							<Typography
								variant='h6'
								gutterBottom
								textAlign={'center'}
								width='100%'
								fontSize={'3rem'}
							>
								{'New York'}
							</Typography>
						</Tooltip>

						<Stack direction='row' alignItems='center' spacing={2}>
							<Avatar
								alt='Weather-icon'
								src='http://openweathermap.org/img/wn/10d@2x.png'
								sx={{ width: 100, height: 100 }}
							/>
							<Tooltip title='Current temperature'>
								<Typography fontSize={'7rem'}>
									{'45'}&deg;
								</Typography>
							</Tooltip>
						</Stack>
						<Tooltip title=' Current weather description'>
							<Typography
								variant='body1'
								gutterBottom
								textAlign={'center'}
								width='100%'
								fontSize={'1.5rem'}
							>
								{'light rain'}
							</Typography>
						</Tooltip>
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
						<Tooltip title="Today's high temperature">
							<ArrowUpwardIcon sx={{ fontSize: 24 }} />
						</Tooltip>

						<Tooltip title="Today's high temperature">
							<Typography
								fontSize='1.5rem'
								variant='button'
								display='block'
								gutterBottom
							>{`${56}\u00b0`}</Typography>
						</Tooltip>

						<Tooltip title="Today's low temperature">
							<ArrowDownwardIcon sx={{ fontSize: 24 }} />
						</Tooltip>
						<Tooltip title="Today's low temperature">
							<Typography
								fontSize='1.5rem'
								variant='button'
								display='block'
								gutterBottom
							>{`${46}\u00b0`}</Typography>
						</Tooltip>
					</Stack>
					{renderAdditionalInfo}
				</Grid>
			</Grid>
		</Card>
	);
}
