import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './MaxTest.css';

function MaxTest() {
	const [count, setCount] = useState(() => {
		let maxReps = localStorage.getItem('maxReps');

		if (!maxReps) return 0;
		else return Number(maxReps);
	});
	
	const [forceRender, setForceRender] = useState(0);

	const handleConfirm = () => {
		let newDate = Date.now();

		localStorage.setItem('maxReps', count);
		localStorage.setItem('maxRepsDate', newDate);

		let workouts = JSON.parse(localStorage.getItem("workoutHistory") || "[]");

		workouts.push({
			date: newDate,
			type: 'max',
			day: -1,
			currentMax: count
		});

		localStorage.setItem("workoutHistory", JSON.stringify(workouts));

		// To fire render
		setForceRender(forceRender + 1);
	};

	const handleDecrease = () => {
		if (count > 0) setCount(count - 1);
	};

	const handleIncrease = () => {
		setCount(count + 1);
	};

	const handleReset = () => {
		setCount(0);
	};

	const getMaxRepsString = () => {
		let maxReps = localStorage.getItem('maxReps');

		if (!maxReps) return 'Maximum reps is not set.';
		return 'Your current maximum reps is ' +maxReps +'.';
	};

	const getDateString = () => {
		let date = Number(localStorage.getItem('maxRepsDate'));

		if (date < 1) return '';
		else {
			let newDate = new Date(date);
			
			return 'Set on '
				+String(newDate.getDate()).padStart(2, '0') + '-'
				+String(newDate.getMonth() + 1).padStart(2, '0') + '-'
				+newDate.getFullYear() + ' '
				+String(newDate.getHours()).padStart(2, '0') + ':'
				+String(newDate.getMinutes()).padStart(2, '0');
		}
	};

	return (
		<Stack gap={2} className='max-reps-container'>
			<p className='max-reps-paragraph'>{getMaxRepsString()}</p>
			<p className='max-reps-paragraph'>{getDateString()}</p>

			<Stack direction='horizontal' gap={3} className='max-reps-stack'>
				<Button variant="danger" onClick={handleDecrease} size='lg'>-</Button>{' '}
				<div className='max-reps'>{count}</div>
				<Button variant="success" onClick={handleIncrease} size='lg'>+</Button>{' '}
			</Stack>

			<Button variant="warning" onClick={handleReset}>Reset</Button>{' '}

			<Button variant="primary" onClick={handleConfirm}>Confirm</Button>{' '}
		</Stack>
	);
}

export default MaxTest;