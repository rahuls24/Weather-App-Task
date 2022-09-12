import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useMemo, useState } from 'react';
import sunriseIcon from '../assets/sunrise.png';
import sunsetIcon from '../assets/sunset.png';
import useFetch from '../hooks/useFetch';
import {
	capitalizeFirstLetter,
	changeTempFromKelvinToCelsiusOrFahrenheit,
	formatAMPM,
} from '../utils/commonFunctions';
function CurrentWeatherInfoCard(props) {
	const [currentTmpUnit, setCurrentTmpUnit] = useState('celsius');
	const [shouldViewAdditionInfo, setShouldViewAdditionInfo] = useState(false);
	const { zipCode = '10001' } = props;
	// We can hide appid by using env var becz it is part of  query parameter
	const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=20571ab45c74dc2a1897b60c5b8047a1`;
	const { data: rawCurrentDayForecast, loading } = useFetch(url);
	const currentDayForecastData = getCurrentDayForecast(
		rawCurrentDayForecast,
		currentTmpUnit,
	);
	const {
		windSpeed,
		humidity,
		pressure,
		sunsetTime,
		sunriseTime,
		cityName,
		currentTemp,
		weatherDescription,
		tempIconUrl,
		tempMax,
		tempMin,
	} = currentDayForecastData;
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
							spacing={{ xs: 1, md: 2 }}
							columns={{ xs: 4, sm: 12, md: 12 }}
							key={section.name}
						>
							<Grid item xs={4} sm={7} md={5}>
								<Typography
									fontSize={'1.5rem'}
									width='100%'
									sx={{
										textAlign: {
											xs: 'center',
											sm: 'start',
										},
									}}
								>
									{section.name}
								</Typography>
							</Grid>
							<Grid item xs={4} sm={1} md={1}>
								<Typography
									fontSize={'1.5rem'}
									width='100%'
									sx={{
										textAlign: {
											xs: 'center',
											sm: 'start',
										},
										fontWeight: 'bold',
									}}
								>
									{section.value}
								</Typography>
							</Grid>
							<Grid item xs={4} md={0}>
								<Divider
									variant='middle'
									sx={{ display: { xs: 'flex', sm: 'none' } }}
								/>
							</Grid>
						</Grid>
					);
				})}
				<Stack
					direction='row'
					alignItems='center'
					spacing={2}
					sx={{ marginTop: 4, marginBottom: 4 }}
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

	const additionInfoViewSwitch = (
		<Stack
			direction='row'
			spacing={1}
			justifyContent='center'
			alignItems='center'
		>
			<Tooltip title='Hide Additional Info'>
				<Typography>Hide</Typography>
			</Tooltip>

			<Switch
				checked={shouldViewAdditionInfo}
				onChange={() =>
					setShouldViewAdditionInfo(!shouldViewAdditionInfo)
				}
				inputProps={{
					'aria-label':
						'Temperature unit switch for current day forecast',
				}}
			/>
			<Tooltip title='Show Additional Info'>
				<Typography>Show</Typography>
			</Tooltip>
		</Stack>
	);
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
					<Tooltip title='Temperature in celsius'>
						<Typography>C</Typography>
					</Tooltip>
					<Switch
						checked={currentTmpUnit === 'celsius' ? false : true}
						onChange={() =>
							setCurrentTmpUnit(
								currentTmpUnit === 'celsius'
									? 'fahrenheit'
									: 'celsius',
							)
						}
						inputProps={{
							'aria-label':
								'Temperature unit switch for current day forecast',
						}}
					/>
					<Tooltip title='Temperature in Fahrenheit'>
						<Typography>F</Typography>
					</Tooltip>
				</Stack>
			</Stack>
			{loading && (
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
					}}
				>
					<CircularProgress />
				</Box>
			)}
			{!loading && (
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
									// fontSize={'3rem'}
									sx={{
										fontSize: { xs: '1.5rem', lg: '3rem' },
									}}
								>
									{cityName}
								</Typography>
							</Tooltip>

							<Stack
								direction={{ xs: 'column', sm: 'row' }}
								justifyContent='center'
								alignItems='center'
								spacing={2}
							>
								<Avatar
									alt='Weather-icon'
									src={tempIconUrl}
									sx={{ width: 100, height: 100 }}
								/>
								<Tooltip title='Current temperature'>
									<Typography
										sx={{
											fontSize: {
												xs: '3.5rem',
												md: '7rem',
											},
										}}
									>
										{currentTemp}&deg;
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
									{weatherDescription}
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
								>{`${tempMax}\u00b0`}</Typography>
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
								>{`${tempMin}\u00b0`}</Typography>
							</Tooltip>
						</Stack>
						{shouldViewAdditionInfo && renderAdditionalInfo}
						{additionInfoViewSwitch}
					</Grid>
				</Grid>
			)}
		</Card>
	);
}
export default CurrentWeatherInfoCard;
// Util Function
function getCurrentDayForecast(weatherData, currentTmpUnit = 'celsius') {
	const cityName = weatherData?.name ?? 'New York';
	const tempIconUrl = `https://openweathermap.org/img/wn/${
		weatherData?.weather[0]?.icon ?? '10d'
	}@2x.png`;
	const weatherDescription = weatherData?.weather[0]?.description ?? '';
	const {
		humidity = 0,
		pressure = 0,
		temp_min: tempMin = 0,
		temp_max: tempMax = 0,
		temp: currentTemp = 300,
	} = weatherData?.main ?? {};
	const windSpeed = weatherData?.wind?.speed ?? 0;
	const sunsetTime = formatAMPM(new Date(weatherData?.sys?.sunset ?? '1'));
	const sunriseTime = formatAMPM(new Date(weatherData?.sys?.sunrise ?? '1'));
	return {
		cityName: capitalizeFirstLetter(cityName),
		tempIconUrl,
		weatherDescription: capitalizeFirstLetter(weatherDescription),
		windSpeed,
		humidity,
		pressure,
		currentTemp: changeTempFromKelvinToCelsiusOrFahrenheit(
			currentTemp,
			currentTmpUnit,
			0,
		),
		tempMin: changeTempFromKelvinToCelsiusOrFahrenheit(
			tempMin,
			currentTmpUnit,
			0,
		),
		tempMax: changeTempFromKelvinToCelsiusOrFahrenheit(
			tempMax,
			currentTmpUnit,
			0,
		),
		sunsetTime,
		sunriseTime,
	};
}
