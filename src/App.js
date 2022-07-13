import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Stack from 'react-bootstrap/Stack';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [count, setCount] = useState(0);

	const handleTestClick = () => {
		setCount(count + 1);
	};

	return (
		<Tabs defaultActiveKey="test" justify>
			<Tab eventKey="test" title="Test">
				<Stack>
					<p>lol {count}</p>

					<Button variant="primary" onClick={handleTestClick}>Test Result</Button>{' '}
				</Stack>
			</Tab>
			<Tab eventKey="workout" title="Workout">

			</Tab>
		</Tabs>
	);
}

export default App;
