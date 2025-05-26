export const dbUserToObj = (u: any) => ({
  id: u._id,
  firstName: u.firstName,
  lastName: u.lastName,
  weight: u.weight,
  height: u.height,
  age: u.age,
});

// TODO: update it according to updates in Workout model
export const dbWorkoutToObj = (w: any) => ({
  id: w._id,
  date: w.date,
  userId: w.user,
});

export const dbUserWithWorkoutsToObj = (u: any) => ({
  ...dbUserToObj(u),
  workouts: u.workouts.map(dbWorkoutToObj),
});

export const dbExerciseToObj = (e: any) => ({
  id: e._id,
  name: e.name,
  nameLower: e.nameLower,
  namePolish: e.namePolish,
  namePolishLower: e.namePolishLower,
  description: e.description,
  isStatic: e.isStatic,
});
