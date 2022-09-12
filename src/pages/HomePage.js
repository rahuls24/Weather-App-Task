import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CurrentWeatherInfoCard from '../components/CurrentWeatherInfoCard';
import WeekForecastChart from '../components/WeekForecastChart';
import { isValidUsZipCode } from '../utils/commonFunctions';
function HomePage() {
	const [zipCode, setZipCode] = useState('10001');
	const [shouldShowErrorInZipCodeInput, setShouldShowErrorInZipCodeInput] =
		useState(false);
	const handleZipCodeInput = (zipCode = '') => {
		if (!isValidUsZipCode(zipCode)) {
			setShouldShowErrorInZipCodeInput(true);
			return;
		}
		setShouldShowErrorInZipCodeInput(false);
		setZipCode(zipCode);
	};
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
				error={shouldShowErrorInZipCodeInput}
				helperText={
					shouldShowErrorInZipCodeInput === true
						? 'shouldShowErrorInZipCodeInput'
						: ''
				}
				onChange={e => handleZipCodeInput(e.target.value)}
			/>
			<CurrentWeatherInfoCard zipCode={zipCode} />
			<WeekForecastChart zipCode={zipCode} />
		</Container>
	);
}

export default HomePage;
