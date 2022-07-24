import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import Program from './program';

function Workout() {
	const [currentProgram, setCurrentProgram] = useState(null);
	const [currentDay, setCurrentDay] = useState(0);
	const [currentSet, setCurrentSet] = useState(0);
	const [currentWorkout, setCurrentWorkout] = useState(null);
	const [nextWorkoutDate, setNextWorkoutDate] = useState(0);

	useEffect(() => {
		// Has the program changed?
		let maxReps = localStorage.getItem('maxReps');
		if (!currentProgram || currentProgram.minReps > maxReps || currentProgram.maxReps < maxReps) getNewProgram();
	});

	const getNewProgram = () => {
		let maxReps = localStorage.getItem('maxReps');

		for (let i = 0; i < Program.programs.length; i++) {
			const program = Program.programs[i];
			
			if (maxReps <= program.maxReps && maxReps >= program.minReps) {
				setCurrentProgram(program);

				let workouts = JSON.parse(localStorage.getItem("workoutHistory") || "[]");
				let nextWorkoutDay = 0;
				let nextSet = 0;
				let nextDate = Date.now;
				let restDays = 2;

				if (workouts[workouts.length - 1].type === 'workout') {
					let lastWorkout = workouts[workouts.length - 1];

					if (lastWorkoutSuccess(lastWorkout, program.days[lastWorkout.day])) {
						nextWorkoutDay = lastWorkout.day + 1;

						if (lastWorkout.day === 2 || lastWorkout.day === 5) restDays += 1;
					}
					// Last workout failed, so we try it again
					else {
						nextWorkoutDay = lastWorkout.day;
						restDays += 1;
					}
				}
				
				nextDate = addDays(workouts[workouts.length - 1].date, restDays);

				setCurrentDay(nextWorkoutDay);
				setCurrentSet(nextSet);
				setNextWorkoutDate(nextDate);

				// New workout
				let newWorkout = {
					date: Date.now(),
					type: (nextWorkoutDay < 6) ? 'workout' : 'max',
					day: nextWorkoutDay,
					currentMax: maxReps,
					sets: (nextWorkoutDay < 6) ? [...program.days[nextWorkoutDay].sets] : [],
					max: (nextWorkoutDay < 6) ? program.days[nextWorkoutDay].max : []
				};

				setCurrentWorkout(newWorkout);
			}
		}
	};

	const lastWorkoutSuccess = (lastWorkoutByUser, lastWorkoutFromProgram) => {
		console.log('user', lastWorkoutByUser);
		console.log('program', lastWorkoutFromProgram)

		for (let i = 0; i < lastWorkoutByUser.sets.length; i++) {
			if (lastWorkoutByUser.sets[i] < lastWorkoutFromProgram.sets[i]) return false;
		}

		if (lastWorkoutByUser.max < lastWorkoutFromProgram.max) return false;

		return true;
	};

	const handleDecrease = () => {
		if (currentSet < 4) currentWorkout.sets[currentSet]--;
		else currentWorkout.max--;
	};

	const handleIncrease = () => {
		if (currentSet < 4) currentWorkout.sets[currentSet]++;
		else currentWorkout.max++;
	};

	const handleConfirm = () => {
		// Max set done
		if (currentSet > 3) {
			// Save current workout to local storage
			let workouts = JSON.parse(localStorage.getItem("workoutHistory") || "[]");

			workouts.push(currentWorkout);

			localStorage.setItem("workoutHistory", JSON.stringify(workouts));

			getNewProgram();

			return;
		}
		
		setCurrentSet(currentSet + 1);
	};

	const sameDayOrLater = (date1, date2) => {
		let d1 = new Date(date1);
		let d2 = new Date(date2);

		return (d1.getFullYear() === d2.getFullYear() &&
		  	d1.getMonth() === d2.getMonth() &&
		  	d1.getDate() === d2.getDate())
			||
			(d1 > d2);
	};

	const addDays = (date, days) => {
		var result = new Date(date);
  		result.setDate(result.getDate() + days);
		return result.getTime();
	};

	const getDateAndMonth = (date) => {
		let newDate = new Date(date);
		return newDate.getDate() + '/' + (newDate.getMonth() + 1);
	};

	return(
		<div>
			<p>{(currentWorkout !== null && currentWorkout.day > 5) ? 'Time to try new MAX!' : ''}</p>

			<p>{(!localStorage.getItem('maxReps') ? 'Set your max reps first!' : '')}</p>

			{(sameDayOrLater(Date.now(), nextWorkoutDate)) ? <h3>You have rested!</h3> : <h3>Next workout on {getDateAndMonth(nextWorkoutDate)}</h3>}

			{(currentProgram === null || currentWorkout === null || currentWorkout.day > 5) ? <div></div> :
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