import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Program from './program';

function Workout() {
	const [currentProgram, setCurrenProgram] = useState(null);
	const [currentDay, setCurrentDay] = useState(0);
	const [currentSet, setCurrentSet] = useState(0);
	const [currentWorkout, setCurrentWorkout] = useState(null);

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
				let nextSet = 0;

				if (workouts[workouts.length - 1].type === 'workout') {

				}

				setCurrentDay(nextWorkoutDay);
				setCurrentSet(nextSet);

				console.log(program.days[nextWorkoutDay].sets[nextSet]);

				// New workout
				let newWorkout = {
					date: Date.now(),
					type: 'workout',
					day: nextWorkoutDay,
					currentMax: maxReps,
					sets: program.days[nextWorkoutDay].sets,
					max: program.days[nextWorkoutDay].max
				};

				setCurrentWorkout(newWorkout);
			}
		}
	};

	const handleDecrease = () => {
		currentWorkout.sets[currentSet]--;
	};

	const handleIncrease = () => {
		currentWorkout.sets[currentSet]++;
	};

	const handleConfirm = () => {
		setCurrentSet(currentSet + 1);
	};

	return(
		<div>
			<p>{(!localStorage.getItem('maxReps') ? 'Set your max reps first!' : '')}</p>

			{(currentProgram === null || currentWorkout === null) ? <div></div> :
			<div>
				<h3>{currentProgram.minReps}-{currentProgram.maxReps} reps, day {currentDay + 1}</h3>
				{(currentSet < 4) ? 
					<h3>{currentSet + 1}. set</h3>
					:
					<h3>Max set, min reps {currentProgram.days[currentDay].max}</h3>
				}
				<Stack direction='horizontal' gap={3} className='max-reps-stack'>
					<Button variant="danger" onClick={handleDecrease} size='lg'>-</Button>{' '}
					{(currentSet < 4) ?
						<div className='max-reps'>{currentWorkout.sets[currentSet]}</div>
						:
						<div className='max-reps'>{currentWorkout.max}</div>
					}
					<Button variant="success" onClick={handleIncrease} size='lg'>+</Button>{' '}
				</Stack>
				
				<Button variant="primary" onClick={handleConfirm}>Confirm</Button>{' '}
			</div>
			}
		</div>
	);
}

export default Workout;