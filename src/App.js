import MaxTest from './MaxTest';
import Workout from './Workout';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Tabs defaultActiveKey={(!localStorage.getItem('maxReps')) ? "test" : "workout"} justify>
			<Tab eventKey="test" title="Test">
				<MaxTest />
			</Tab>
			<Tab eventKey="workout" title="Workout">
				<Workout />
			</Tab>
		</Tabs>
	);
}

export default App;
