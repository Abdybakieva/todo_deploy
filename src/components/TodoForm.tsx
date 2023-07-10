import React from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import TodoList from "./TodoList";
import { styled } from "styled-components";
import { TodoSliceActions } from "../store/todo/todoSlice";
export function TodoForm() {
  const [text, setText] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();

  const todoHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const newTodo = {
      id: Math.random(),
      text: text,
    };
    dispatch(TodoSliceActions.addTodo(newTodo));
    setText("");
  };

  return (
    <Container>
      <Wrapper>
        <StyledInput
          type="text"
          value={text}
          onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
            setText(e.target.value)
          }
        />
        <ButtonStyled onClick={todoHandler}>Add</ButtonStyled>
      </Wrapper>
      <TodoList />
    </Container>
  );
}

const Container = styled("div")({
  margin: "auto",
  paddingTop: "50px",
});
const Wrapper = styled("form")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
});

const ButtonStyled = styled("button")({
  background: "none",
  border: "1px solid grey",
  color: "grey",
  padding: "10px",
  borderRadius: "50px",
});

const StyledInput = styled("input")({
  borderRadius: "50px",
  padding: "10px 40px",
});
