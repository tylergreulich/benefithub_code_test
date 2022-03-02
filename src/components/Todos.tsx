import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Todo } from "../App";
import { Spinner } from "./Spinner";

const TodosContainer = styled.section`
  display: flex;
  flex-direction: column;
`;

const TodoTitle = styled.span`
  cursor: pointer;
  padding: 1rem 15px;
`;

const TodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  position: relative;
  list-style: none;
  margin-bottom: 8px;
  background: #f2f2f2;
  border-radius: 3px;
  overflow: hidden;
  word-wrap: break-word;
  transition: all 0.2s ease-in-out;
`;

interface TodoCompletedContainerProps {
  isTodoCompleted: boolean;
}

const TodoCompletedContainer = styled.div<TodoCompletedContainerProps>`
  cursor: pointer;
  margin-left: 1rem;
  padding: 1rem 15px;
  font-size: 1.25rem;

  color: ${({ isTodoCompleted }) => (isTodoCompleted ? "green" : "red")};
`;

interface TodosProps {
  todos: Todo[];
}

const Todos = ({ todos }: TodosProps) => (
  <TodosContainer>
    {todos.map((todo) => (
      <SingleTodo key={todo.id} {...todo} />
    ))}
  </TodosContainer>
);

const SingleTodo: React.FC<Todo> = ({ title, id, completed }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isTodoCompleted, setIsTodoCompleted] =
    React.useState<boolean>(completed);

  const updateTodoCompletion = async (todoId: number) => {
    setIsLoading(true);
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${todoId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          completed: !isTodoCompleted,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    setIsLoading(false);
    const data = await response.json();
    setIsTodoCompleted(data.completed);
  };

  return (
    <TodoContainer>
      <TodoTitle onClick={() => navigate(`/todo/${id}`)}>{title}</TodoTitle>
      <TodoCompletedContainer
        onClick={() => updateTodoCompletion(id)}
        isTodoCompleted={isTodoCompleted}
      >
        <span>
          {isLoading ? <Spinner size="small" /> : isTodoCompleted ? "🗹" : "✖"}
        </span>
      </TodoCompletedContainer>
    </TodoContainer>
  );
};

export default Todos;
