import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Program from './program';

function Workout() {
	const [currentDay, setCurrentDay] = useState(0);
	const [currentSet, setCurrentSet] = useState(0);

	useEffect(() => {
		let maxReps = localStorage.getItem('maxReps');

		for (let i = 0; i < Program.programs.length; i++) {
			const program = Program.programs[i];
			
			if (maxReps <= program.maxReps && maxReps >= program.minReps) {
				let workouts = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
				let nextWorkoutDay = 0;

				if (workouts[workouts.length - 1].type === 'workout') {

				}

				console.log(program.days[0]);

				setCurrentDay(program.days[0]);
				setCurrentSet(0);
			}
		}
	}, []);

	const handleDecrease = () => {

	};

	const handleIncrease = () => {

	};

	const handleConfirm = () => {

	};

	return(
		<div>
			<p>{(!localStorage.getItem('maxReps') ? 'Set your max reps first!' : '')}</p>

			{(currentDay === 0) ? <div></div> :
			<div>
				<Stack direction='horizontal' gap={3} className='max-reps-stack'>
					<Button variant="danger" onClick={handleDecrease} size='lg'>-</Button>{' '}
					<div className='max-reps'>{currentDay.sets[currentSet]}</div>
					<Button variant="success" onClick={handleIncrease} size='lg'>+</Button>{' '}
				</Stack>
				
				<Button variant="primary" onClick={handleConfirm}>Confirm</Button>{' '}
			</div>
			}
		</div>
	);
}

export default Workout;