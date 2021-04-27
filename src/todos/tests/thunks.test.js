import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { loadTodos } from '../thunks';

describe('The loadTodos thunk', () => {
    it('Dispatches the correct actions in the success scenario', async () => {
        const fakeDispatch = sinon.spy();

        const faketodos = [ { text: '1' }, { text: '2' }];
        fetchMock.get('http://localhost:8080/todos', faketodos);

        const expectedFirstAction = { type: 'LOAD_TODOS_IN_PROGRESS'}
        const expectedSecondAction = { 
            type: 'LOAD_TODOS_SUCCESS', 
            payload: {
                todos: faketodos,
            }
        };

        await loadTodos()(fakeDispatch);

        //test whether thunk dispatches the correct actions at the correct time
        //test whether thunk makes the correct external requests (in this case we made sure of that by supplying value to fakeDispatch)
        expect(fakeDispatch.getCall(0).args[0]).to.deep.equal(expectedFirstAction);
        expect(fakeDispatch.getCall(1).args[0]).to.deep.equal(expectedSecondAction);

        fetchMock.reset();
    })
});