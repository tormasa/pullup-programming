import { useState } from 'react';
import { useCookies } from 'react-cookie';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './MaxTest.css';

function MaxTest() {
	const [cookies, setCookie] = useCookies(['maxReps']);
	const [count, setCount] = useState(() => {
		if (!cookies.maxReps) return 0;
		else return cookies.maxReps;
	});

	const handleConfirm = () => {
		setCookie('maxReps', count, { path: '/' });
	};

	const handleDecrease = () => {
		if (count > 0) setCount(count - 1);
	};

	const handleIncrease = () => {
		setCount(count + 1);
	};

	return (
		<Stack gap={2} className='max-reps-container'>
			<Stack direction='horizontal' gap={3} className='max-reps-stack'>
				<Button variant="danger" onClick={handleDecrease} size='lg'>-</Button>{' '}
				<div className='max-reps'>{count}</div>
				<Button variant="success" onClick={handleIncrease} size='lg'>+</Button>{' '}
			</Stack>

			<Button variant="primary" onClick={handleConfirm}>Confirm</Button>{' '}
		</Stack>
	);
}

export default MaxTest;