export type ExerciseToCreate = {
  name: string,
  namePolish: string,
  description?: string,
  isStatic: boolean,
};

export type ExercisesToCreate = ExerciseToCreate[];

export type ExerciseWithId = ExerciseToCreate & { id: string };