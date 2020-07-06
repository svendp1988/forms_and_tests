import React from "react";
import {mount, shallow} from "enzyme";
import renderer from 'react-test-renderer';
import {render, screen, fireEvent, waitFor, act} from "@testing-library/react";
import CustomForm from "../CustomForm";


describe("CustomForm", () => {
    let component;


    const state = {email: "sven.depotter@hotmail.com", username: "sven"}
    const handleSubmit = jest.fn();

    beforeEach(() => {
        component = shallow(<CustomForm {...state} onSubmit={handleSubmit}/>);
    })

    it('should submit form', function () {
        console.log(component.text());
        let input = component.find("input").first();
        input.simulate("focus");
        input.simulate("blur");
        let alert = component.find("span.alert").last();
        // expect(alert).toBeVisible();
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(<CustomForm/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})


const mockSubmit = jest.fn((email, username) => {
    return Promise.resolve({email, username});
});

describe("App", () => {
    beforeEach(() => {
        render(<CustomForm onSubmit={mockSubmit}/>);
    });

    it("should display required error when value is invalid", async () => {
        await act(() => {

            fireEvent.focusIn(screen.getByTestId("email"));

            fireEvent.input(screen.getByTestId("username"), {
                target: {
                    value: ""
                }
            });
            fireEvent.blur(screen.getByTestId("email"));


            console.log("log: ", screen.getByTestId("username").value)

            fireEvent.submit(screen.getByRole("button"));
        });

        expect(await screen.getAllByRole("alert")).toHaveLength(2);
        expect(mockSubmit).not.toBeCalled();
    });

    it("should display matching error when email is invalid", async () => {
        fireEvent.input(screen.getByTestId("email"), {
            target: {
                value: "test"
            }
        });

        fireEvent.input(screen.getByTestId("username"), {
            target: {
                value: "password"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        console.log(await screen.findAllByRole("alert"))

        expect(await screen.findAllByRole("alert")).toHaveLength(1);
        expect(mockSubmit).not.toBeCalled();
        expect(screen.getByTestId("email").value).toBe("test");
        expect(screen.getByTestId("username").value).toBe("password");
    });

    it("should display min length error when password is invalid", async () => {
        fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
            target: {
                value: "test@mail.com"
            }
        });

        fireEvent.input(screen.getByLabelText("password"), {
            target: {
                value: "pass"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        expect(await screen.findAllByRole("alert")).toHaveLength(1);
        expect(mockSubmit).not.toBeCalled();
        expect(screen.getByRole("textbox", {name: /email/i}).value).toBe(
            "test@mail.com"
        );
        expect(screen.getByLabelText("password").value).toBe("pass");
    });

    it("should not display error when value is valid", async () => {
        fireEvent.input(screen.getByRole("textbox", {name: /email/i}), {
            target: {
                value: "test@mail.com"
            }
        });

        fireEvent.input(screen.getByLabelText("password"), {
            target: {
                value: "password"
            }
        });

        fireEvent.submit(screen.getByRole("button"));

        await waitFor(() => expect(screen.queryAllByRole("alert")).toHaveLength(0));
        expect(mockSubmit).toBeCalledWith("test@mail.com", "password");
        expect(screen.getByRole("textbox", {name: /email/i}).value).toBe("");
        expect(screen.getByLabelText("password").value).toBe("");
    });
});


