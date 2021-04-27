import { createSelector } from 'reselect';

export const getTodos = state => state.todos.data;
export const getTodosLoading = state => state.todos.isLoading;

//USE:
// getIncompleteTodos in mapStatesToProps: getIncompleteTodos(state) => all todos in state that are not completed
export const getIncompleteTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => !todo.isCompleted),
);

//Further functionality (return an empty array if todos is still loading):
// export const getIncompleteTodos = createSelector(
//     getTodos,
//     getTodosLoading
//     (todos, isLoading) => isLoading
//          ? []
//          : todos.filter(todo => !todo.isCompleted),
// );


export const getCompletedTodos = createSelector(
    getTodos,
    (todos) => todos.filter(todo => todo.isCompleted),
);
