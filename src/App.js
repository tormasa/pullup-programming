import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [count, setCount] = useState(0);

	const handleTestClick = () => {
		setCount(count + 1);
	};

	return (
		<div className="App">
			<p>lol {count}</p>

			<Button variant="primary" onClick={handleTestClick}>Test Result</Button>{' '}
		</div>
	);
}

export default App;
