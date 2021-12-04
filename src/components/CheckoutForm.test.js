import React from "react";
import MutationObserver from 'mutationobserver-shim';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("renders without errors", () => {
    render(<CheckoutForm />)
});

test("shows success message on submit with form details", async () => {
    render(<CheckoutForm />);

    const firstName = screen.getByLabelText('First Name:');
    const lastName = screen.getByLabelText('Last Name:');
    const address = screen.getByLabelText('Address:');
    const city = screen.getByLabelText('City:');
    const state = screen.getByLabelText('State:');
    const zip = screen.getByLabelText('Zip:');
    const checkoutButton = screen.getByText('Checkout');
    const nullSuccessMsg = screen.queryByTestId('successMessage');

    expect(nullSuccessMsg).not.toBeInTheDocument();

    userEvent.type(firstName, "John");
    userEvent.type(lastName, "Doe");
    userEvent.type(address, "1234 Street st");
    userEvent.type(city, "New York City");
    userEvent.type(state, "NY");
    userEvent.type(zip, "12345");
    userEvent.click(checkoutButton);
    
    const successMsg = await screen.queryByTestId('successMessage'); 
    expect(successMsg).toBeInTheDocument();
});
