import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "..";
import store from "../../../app/store";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    return {
      t: (key: any) => key,
    };
  },
}));

const mockedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("News Login", () => {
  test("Renders email input", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailInput = screen.getByLabelText(/login.emailLabel/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("Validates email input on form submit and shows error for empty email", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const submitButton = screen.getByRole("button", {
      name: /login.loginButton/i,
    });
    fireEvent.click(submitButton);
    const emailError = screen.getByText(/login.emailRequired/i);
    expect(emailError).toBeInTheDocument();
  });

  test("Validates password input on form submit and shows error for empty password", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const submitButton = screen.getByRole("button", {
      name: /login.loginButton/i,
    });
    fireEvent.click(submitButton);
    const passwordError = screen.getByText(/login.passwordRequired/i);
    expect(passwordError).toBeInTheDocument();
  });

  test("Shows email format error when an invalid email is entered", () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    const emailInput = screen.getByLabelText(/login.emailLabel/i);
    fireEvent.change(emailInput, { target: { value: "invalidemail" } });
    const submitButton = screen.getByRole("button", {
      name: /login.loginButton/i,
    });
    fireEvent.click(submitButton);
    const emailFormatError = screen.getByText(/login.emailInvalid/i);
    expect(emailFormatError).toBeInTheDocument();
  });
});
