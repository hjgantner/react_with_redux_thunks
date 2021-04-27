import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TodoListItem from './TodoListItem';
import styled from 'styled-components';
import { 
    getTodosLoading,
    getCompletedTodos,
    getIncompleteTodos
} from './selectors';
import { loadTodos, removeTodoRequest, setTodoCompleted } from './thunks';
import NewTodoForm from './NewTodoForm';

const ListWraper = styled.div`
    max-width: 700px;
    margin: auto;
`;


const TodoList = ({completedTodos, incompleteTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading...</div>
    const content = (
        <ListWraper>
            <NewTodoForm />
            <h3>Incomplete: </h3>
            {incompleteTodos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletePressed={onCompletePressed}/>)}
            <h3>Completed: </h3>
            {completedTodos.map(todo => <TodoListItem 
                todo={todo} 
                onRemovePressed={onRemovePressed} 
                onCompletePressed={onCompletePressed}/>)}
        </ListWraper>
    );
    return isLoading ? loadingMessage : content;
};

const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onCompletePressed: id => dispatch(setTodoCompleted(id)),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);