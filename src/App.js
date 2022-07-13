import MaxTest from './MaxTest';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
	return (
		<Tabs defaultActiveKey="test" justify>
			<Tab eventKey="test" title="Test">
				<MaxTest />
			</Tab>
			<Tab eventKey="workout" title="Workout">

			</Tab>
		</Tabs>
	);
}

export default App;
