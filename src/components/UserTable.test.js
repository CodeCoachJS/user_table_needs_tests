import Form from './UserTable';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserTable from './UserTable';

describe('form', () => {
    it('renders in the DOM', async () => {
        render(<UserTable />);
        expect(screen.getByTestId('userForm')).toBeInTheDocument();
    });

    it('shows a table of users', async () => {
        //TODO
    });

    it('does not allow you to submit if either input is empty', async () => {
        //TODO
    });

    it('adds a user to the table of users on submit', () => {
        //TODO
    });

    it('displays an error to the user', async () => {
        //TODO
    });

    //TODO: add any tests to make sure the coverage threshold is met
});
