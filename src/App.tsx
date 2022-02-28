import React from 'react';
import './App.css';
import styled from "styled-components";
import { BrowserRouter, Route, Router, Routes, useNavigate, useParams } from 'react-router-dom';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 50%;
`;

const PostContainer = styled.div`
  margin: 5rem 0;
`;

const Home = () => {
  const [todos, setTodos] = React.useState<Todo[] | null>(null);

  React.useEffect(() => {
    (async () => {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");   
      const data: Todo[] = await response.json();
      setTodos(data.slice(0, 25));
    })();
  });

  return (
    <PageWrapper>
      {todos?.map((todo) => <Todo {...todo} /> )}
    </PageWrapper>
  );
}

const Todo: React.FC<Todo> = ({ title, id, completed }) => {
  const navigate  = useNavigate();

  return (
    <PostContainer key={id} onClick={() => navigate(`/todo/${id}`)}>
          <span>
            {completed ? 'True' : '✖'}
          </span>
          <span>{title}</span>
    </PostContainer>
  )
}

const TodoDetails = () => {
  const [todo, setTodo] = React.useState<Todo | null>(null);

  const { id } = useParams();

  React.useEffect(() => {
    (async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);   
      const data: Todo = await response.json();
      setTodo(data);
    })();
  });

  return (
    <PageWrapper>
      <div>
        <div>{todo?.title}</div>
        <div>Completed: {todo?.completed}</div>
        <div>Todo ID: {todo?.id}</div>
      </div>
    </PageWrapper>
  )
}

const App = () => {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo/:id" element={<TodoDetails />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;
