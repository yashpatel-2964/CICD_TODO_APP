// src/TodoList.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Import jest-dom for additional matchers
import TodoList from "./TodoList";

describe("TodoList Component", () => {
  beforeEach(() => {
    render(<TodoList />);
  });

  test("renders the to-do list header", () => {
    const headerElement = screen.getByText(/to-do list/i);
    expect(headerElement).toBeInTheDocument();
  });

  test("allows users to add a new task", () => {
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByText(/add/i);

    fireEvent.change(inputElement, { target: { value: "Learn React" } });
    fireEvent.click(buttonElement);

    const taskElement = screen.getByText(/learn react/i);
    expect(taskElement).toBeInTheDocument();
  });

  test("allows users to complete a task", () => {
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByText(/add/i);

    fireEvent.change(inputElement, { target: { value: "Learn React" } });
    fireEvent.click(buttonElement);

    const completeButton = screen.getByText(/complete/i);
    fireEvent.click(completeButton);

    const taskElement = screen.getByText(/learn react/i);
    expect(taskElement).toHaveStyle("text-decoration: line-through");
  });

  test("allows users to delete a task", () => {
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByText(/add/i);

    fireEvent.change(inputElement, { target: { value: "Learn React" } });
    fireEvent.click(buttonElement);

    const deleteButton = screen.getByText(/delete/i);
    fireEvent.click(deleteButton);

    const taskElement = screen.queryByText(/learn react/i);
    expect(taskElement).not.toBeInTheDocument();
  });
});
