import { useState } from 'react';

import MaxTest from './MaxTest';
import Workout from './Workout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	const [forceRender, setForceRender] = useState(0);

	const updateTabs = () => {
		setForceRender(forceRender + 1);
	};

	return (
		<Tabs defaultActiveKey={(!localStorage.getItem('maxReps')) ? "test" : "workout"} justify>
			<Tab eventKey="test" title="Test" onClick={updateTabs}>
				<MaxTest />
			</Tab>
			<Tab eventKey="workout" title="Workout" onClick={updateTabs}>
				<Workout />
			</Tab>
		</Tabs>
	);
}

export default App;
