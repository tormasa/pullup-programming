function Workout() {
	return(
		<div>
			{(!localStorage.getItem('maxReps') ? 'Set your max reps first!' : 'This is your routine...')}
		</div>
	);
}

export default Workout;