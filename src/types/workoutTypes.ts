export type WorkoutSet = { thoughts: string } & ({
  reps: Number,
  weightKg: Number,
} | {
  timeSec: Number,
});

export type WorkoutExercise = {
  exercise: string,
  comment?: string,
  sets: WorkoutSet[],
};

export type WorkoutToCreate = {
  date: string,
  timeStart?: string,
  timeEnd?: string,
  exercises: WorkoutExercise[],
  user: string,
};