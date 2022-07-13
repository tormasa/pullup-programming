import { useState } from 'react';
import { useCookies } from 'react-cookie';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './MaxTest.css';

function MaxTest() {
	const [cookies, setCookie] = useCookies(['maxReps']);
	const [count, setCount] = useState(() => {
		if (!cookies.maxReps) return 0;
		else return Number(cookies.maxReps);
	});

	const handleConfirm = () => {
		console.log(Date.now);

		setCookie('maxReps', count, { path: '/' });
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

	return (
		<Stack gap={2} className='max-reps-container'>
			<p className='max-reps-paragraph'>Your current maximum reps is {cookies.maxReps}.</p>
			<p className='max-reps-paragraph'>Set on xx/xx/xxxx xx:xx</p>

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