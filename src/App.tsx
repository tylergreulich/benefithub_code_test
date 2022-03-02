import React, { Suspense } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TodoDetails } from "./components/TodoDetails";
import { Spinner } from "./components/Spinner";

const Todos = React.lazy(() => import("./components/Todos") as any);

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 30%;

  @media (max-width: 1920px) {
    width: 40%;
  }

  @media (max-width: 1440px) {
    width: 60%;
  }

  @media (max-width: 760px) {
    width: 80%;
  }

  header {
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;

    @media (max-width: 1440px) {
      flex-direction: column;

      div {
        button {
          &:nth-child(2) {
            margin-left: 10px;
          }
        }
      }

      button {
        margin: 0 0 15px;
      }
    }

    @media (max-width: 1120px) {
      div {
        button {
          width: 100%;

          &:nth-child(2) {
            margin: 0;
            margin-bottom: 20px;
          }
        }
      }
    }
  }
`;

const TodoSearchFilterInput = styled.input`
  height: 100%;
  outline: none;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 17px;
  padding-left: 15px;
  transition: all 0.3s ease;

  &:focus {
    border-color: rgb(117, 0, 255);
  }
`;

const TodoSortButton = styled.button`
  height: 100%;
  border: none;
  color: #fff;
  margin-left: 5px;
  font-size: 21px;
  outline: none;
  background: rgb(117, 0, 255);
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.3s ease;

  &:hover {
    background: #111177;
  }
`;

const compareAsc = (a: Todo, b: Todo) => {
  if (a.title < b.title) {
    return -1;
  }
  if (a.title > b.title) {
    return 1;
  }
  return 0;
};

const compareDesc = (a: Todo, b: Todo) => {
  if (a.title < b.title) {
    return 1;
  }
  if (a.title > b.title) {
    return -1;
  }
  return 0;
};

const Home = () => {
  const [todos, setTodos] = React.useState<Todo[] | null>(null);
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[] | null>(null);
  const [todoSearchValue, setTodoSearchValue] = React.useState<
    string | undefined
  >(undefined);

  React.useEffect(() => {}, [todos]);

  React.useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data: Todo[] = await response.json();
      setTodos(data);
    })();
  }, []);

  const onSortTodosHandler = (sortType: string) => {
    let sortedTodos: Todo[] | undefined =
      filteredTodos && filteredTodos.length >= 1
        ? [...filteredTodos]
        : [...todos!!];

    if (sortType === "asc") {
      sortedTodos = sortedTodos.sort(compareAsc);
    }

    if (sortType === "desc") {
      sortedTodos = sortedTodos.sort(compareDesc);
    }

    if (filteredTodos && filteredTodos.length >= 1) {
      setFilteredTodos(sortedTodos);
      return;
    }

    setTodos(sortedTodos as Todo[]);
  };

  const onFilterTodosHandler = (target: HTMLInputElement) => {
    const searchedWord = target.value;

    setTodoSearchValue(searchedWord);

    const newFilter = todos?.filter(({ title }) => {
      return title.toLowerCase().includes(searchedWord.toLowerCase());
    });

    if (!newFilter!!.length) {
      setFilteredTodos([]);
      return;
    }

    setFilteredTodos(newFilter as Todo[]);
  };

  return (
    <PageWrapper>
      <header>
        <div>
          <TodoSortButton onClick={() => onSortTodosHandler("asc")}>
            Sort Ascending
          </TodoSortButton>
          <TodoSortButton onClick={() => onSortTodosHandler("desc")}>
            Sort Descending
          </TodoSortButton>
        </div>
        <TodoSearchFilterInput
          type="text"
          placeholder={"Search Todos"}
          value={todoSearchValue}
          onChange={({ target }) => onFilterTodosHandler(target)}
        />
      </header>
      <Suspense fallback={<Spinner />}>
        {todos && (
          <Todos
            todos={
              todoSearchValue && todoSearchValue.length >= 1
                ? (filteredTodos as Todo[])
                : todos
            }
          />
        )}
      </Suspense>
    </PageWrapper>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todo/:id" element={<TodoDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
