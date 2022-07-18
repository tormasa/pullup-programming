import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Program from './program';

function Workout() {
	const [currentProgram, setCurrenProgram] = useState(null);
	const [currentDay, setCurrentDay] = useState(0);
	const [currentSet, setCurrentSet] = useState(0);

	useEffect(() => {
		// Has the program changed?
		let maxReps = localStorage.getItem('maxReps');
		if (!currentProgram || currentProgram.minReps > maxReps || currentProgram.maxReps < maxReps) getNewProgram();

		console.log('currentProgram', currentProgram);
	});

	const getNewProgram = () => {
		let maxReps = localStorage.getItem('maxReps');

		for (let i = 0; i < Program.programs.length; i++) {
			const program = Program.programs[i];
			
			if (maxReps <= program.maxReps && maxReps >= program.minReps) {
				setCurrenProgram(program);

				console.log('program', program);

				let workouts = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
				let nextWorkoutDay = 0;

				if (workouts[workouts.length - 1].type === 'workout') {

				}

				setCurrentDay(0);
				setCurrentSet(0);
			}
		}
	};

	const handleDecrease = () => {

	};

	const handleIncrease = () => {

	};

	const handleConfirm = () => {

	};

	return(
		<div>
			<p>{(!localStorage.getItem('maxReps') ? 'Set your max reps first!' : '')}</p>

			{(currentProgram === null) ? <div></div> :
			<div>
				<h3>{currentProgram.minReps}-{currentProgram.maxReps} reps, day {currentDay + 1}</h3>
				<h3>{currentSet + 1}. set</h3>
				<Stack direction='horizontal' gap={3} className='max-reps-stack'>
					<Button variant="danger" onClick={handleDecrease} size='lg'>-</Button>{' '}
					<div className='max-reps'>{currentProgram.days[currentDay].sets[currentSet]}</div>
					<Button variant="success" onClick={handleIncrease} size='lg'>+</Button>{' '}
				</Stack>
				
				<Button variant="primary" onClick={handleConfirm}>Confirm</Button>{' '}
			</div>
			}
		</div>
	);
}

export default Workout;