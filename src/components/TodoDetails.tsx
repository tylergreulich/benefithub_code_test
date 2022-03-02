import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Todo } from "../App";

const LinkWrapper = styled.div`
  margin: 0 auto;
  width: 40%;
  padding: 1rem 15px;

  a {
    font-size: 1.5rem;
  }
`;

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f2f2f2;
  border-radius: 3px;
  padding: 1rem 15px;
`;

export const TodoDetails = () => {
  const [todo, setTodo] = React.useState<Todo | null>(null);

  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data: Todo = await response.json();
      setTodo(data);
    })();
  }, []);

  return (
    <>
      <LinkWrapper>
        <Link to="/">Back</Link>
      </LinkWrapper>
      <PageWrapper>
        <div>
          <div>Todo ID: {todo?.id}</div>
          <div>Title: {todo?.title}</div>
          {todo && <div>Completed: {todo.completed ? "🗹" : "✖"}</div>}
        </div>
      </PageWrapper>
    </>
  );
};
