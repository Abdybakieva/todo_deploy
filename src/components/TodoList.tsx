import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { RootState } from "../store";
import { styled } from "styled-components";
import { TodoSliceActions } from "../store/todo/todoSlice";

const TodoItem = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo);

  const [edit, setEdit] = useState(false);
  const [newvalue, setnewValue] = useState("");
  const [Edit, setShowEdit] = useState("");

  const deleteHandler = (id: number) => {
    dispatch(TodoSliceActions.deleteTodo(id));
  };

  const editHandler = (text: string, id: number) => {
    setEdit(true);
    setShowEdit(id.toString());
    setnewValue(text);
  };

  const updatedTodoHandler = (id: number) => {
    dispatch(TodoSliceActions.updatedTodo({ id, description: newvalue }));
    setEdit(false);
  };

  return (
    <ListContainer>
      {todos.map((todo) => (
        <div key={todo.id}>
          {edit && Edit === todo.id.toString() ? (
            <UpdateStyledContainer>
              <InputStyled
                type="text"
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setnewValue(e.target.value)}
                value={newvalue}
              />
              <ButtonStyled onClick={() => updatedTodoHandler(todo.id)}>
                Save
              </ButtonStyled>
            </UpdateStyledContainer>
          ) : (
            <Box>
              <Title className={`${todo.comleted && "todo"}`}>
                {todo.text}
              </Title>
              <Grid container spacing={2}>
                <Grid item>
                  <Button onClick={() => deleteHandler(todo.id)}>Delete</Button>
                </Grid>
                <Grid item>
                  <ButtonStyled
                    onClick={() =>
                      dispatch(
                        TodoSliceActions.completedTodo({
                          comleted: !todo.comleted,
                          id: todo.id,
                        })
                      )
                    }
                  >
                    Toggle
                  </ButtonStyled>
                </Grid>
                <Grid item>
                  <ButtonStyled onClick={() => editHandler(todo.text, todo.id)}>
                    Edit
                  </ButtonStyled>
                </Grid>
              </Grid>
            </Box>
          )}
        </div>
      ))}
    </ListContainer>
  );
};

export default TodoItem;

const Title = styled("span")({
  fontSize: "24px",
  color: "grey",
  "&.todo": {
    textDecoration: "line-through",
    opacity: 0.5,
  },
});

const ListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "3rem",
  margin: "0 auto",
  borderRadius: "3px",
});

const Box = styled("div")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const UpdateStyledContainer = styled("div")({
  display: "flex",
  gap: "30px",
});

const InputStyled = styled(TextField)({
  width: "500px",
  padding: "0",
  backgroundColor: "#fff",
  borderRadius: "10px",
  color: "grey",
  fontSize: "24px",
});

const ButtonStyled = styled(Button)({
  background: "#21d111",
  color: "red",
});
