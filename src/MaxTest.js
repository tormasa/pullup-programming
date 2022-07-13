import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

import './MaxTest.css';

function MaxTest() {
	const [count, setCount] = useState(0);

	const handleTestClick = () => {
		setCount(count + 1);
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

			<Button variant="primary" onClick={handleTestClick}>Confirm</Button>{' '}
		</Stack>
	);
}

export default MaxTest;