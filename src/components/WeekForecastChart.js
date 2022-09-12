import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import React, { useMemo, useState } from 'react';
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip as ChartTooltip,
	XAxis,
	YAxis,
} from 'recharts';
import useFetch from '../hooks/useFetch';
import {
	capitalizeFirstLetter,
	changeTempFromKelvinToCelsiusOrFahrenheit,
} from '../utils/commonFunctions';
function WeekForecastChart(props) {
	const { zipCode = '10001' } = props;
	const [currentTmpUnit, setCurrentTmpUnit] = useState('celsius');
	// We can hide appid by using env var becz it is part of  query parameter
	const url = ` https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zipCode},us&appid=20571ab45c74dc2a1897b60c5b8047a1`;
	const { data: rawNextSevenDaysForecast, loading } = useFetch(url);
	const chartData = useMemo(() => {
		if (rawNextSevenDaysForecast !== null) {
			const nextSevenDaysWeatherForecastsData =
				nextSevenDaysWeatherForecasts(
					rawNextSevenDaysForecast?.list,
					currentTmpUnit,
				);
			return getDataForChart(nextSevenDaysWeatherForecastsData);
		}
		return [];
	}, [rawNextSevenDaysForecast, currentTmpUnit]);
	return (
		<>
			<Card sx={{ marginTop: 2, padding: 2 }}>
				<Stack
					direction='row'
					justifyContent={'space-between'}
					alignItems='center'
					sx={{ marginBottom: { xs: 2, sm: 6 } }}
				>
					<Typography variant='h5' gutterBottom>
						7 Days forecast
					</Typography>
					<Stack direction='row' spacing={1} alignItems='center'>
						<Tooltip title='Temperature in celsius'>
							<Typography>C</Typography>
						</Tooltip>
						<Switch
							checked={
								currentTmpUnit === 'celsius' ? false : true
							}
							onChange={() =>
								setCurrentTmpUnit(
									currentTmpUnit === 'celsius'
										? 'fahrenheit'
										: 'celsius',
								)
							}
							inputProps={{
								'aria-label':
									'Temperature unit switch for week forecast',
							}}
							disabled={chartData?.length === 0}
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
					<ResponsiveContainer width={'99%'} height={300}>
						<LineChart
							width={730}
							height={250}
							data={chartData}
							margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='name' />
							<YAxis />
							<ChartTooltip />
							{/* <Legend /> */}
							<Line
								type='monotone'
								dataKey='low'
								stroke='#8884d8'
							/>
							<Line
								type='monotone'
								dataKey='high'
								stroke='#82ca9d'
							/>
							<Line
								type='monotone'
								dataKey='description'
								stroke='#0288d1'
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</Card>
		</>
	);
}

export default WeekForecastChart;

// Util Function
function nextSevenDaysWeatherForecasts(
	weatherData,
	currentTmpUnit = 'celsius',
) {
	const nextSevenDaysWeatherForecastsData = [];
	weatherData.forEach(data => {
		const minTemp = changeTempFromKelvinToCelsiusOrFahrenheit(
			data?.temp?.min ?? 0,
			currentTmpUnit,
			1,
		);
		const maxTemp = changeTempFromKelvinToCelsiusOrFahrenheit(
			data?.temp?.max ?? 0,
			currentTmpUnit,
			1,
		);
		const weatherDesc = capitalizeFirstLetter(
			data?.weather[0]?.description,
		);
		nextSevenDaysWeatherForecastsData.push({
			low: minTemp,
			high: maxTemp,
			description: weatherDesc,
		});
	});
	return nextSevenDaysWeatherForecastsData;
}

function getDataForChart(nextSevenDaysWeatherForecastsData = []) {
	const weekDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const currentDay = new Date().getDay();
	const nextSevenDays = weekDays
		.splice(currentDay)
		.concat(weekDays.splice(0, currentDay));

	const chartData = nextSevenDaysWeatherForecastsData.map(
		(forecast, index) => {
			return {
				...forecast,
				name: nextSevenDays[index],
			};
		},
	);
	return chartData;
}
