import { expect } from 'chai';
import { getCompletedTodos } from '../selectors';

describe('The getCompletedTodos selector', () => {
    it('Returns only completed todos', () => {
        const fakeTodos = [
            {
                text: 'hello',
                isCompleted: true,
            },
            {
                text: 'bye',
                isCompleted: false,
            },
            {
                text: 'medium',
                isCompleted: false,
            }
        ];

        const expected = [
            {
                text: 'hello',
                isCompleted: true,
            }
        ];
        const actual = getCompletedTodos.resultFunc(fakeTodos);

        expect(actual).to.deep.equal(expected);
    })
})