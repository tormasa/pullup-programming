import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';

function MaxTest() {
	const [count, setCount] = useState(0);

	const handleTestClick = () => {
		setCount(count + 1);
	};

	return (
		<Stack gap={2}>
			<p>lol {count}</p>

			<Button variant="primary" onClick={handleTestClick}>Test Result</Button>{' '}
		</Stack>
	);
}

export default MaxTest;