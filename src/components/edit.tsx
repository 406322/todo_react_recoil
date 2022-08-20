import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState } from "../state/recoil/atoms"
import { useState } from "react";
import { Todo } from "../models/todo";
import { useParams, useNavigate } from 'react-router-dom';


export const Edit = () => {
  const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);

  const todos: Todo[] = useRecoilValue(todoListState);

  let { todoId } = useParams();

  let navigate = useNavigate();

  const filtered: Todo[] = todos.filter((todo: Todo) => todo.id === todoId);
  const thisTodo = filtered[0];

  const [formValue, setFormValue] = useState({
    description: "",
    id: "",
  } as Todo);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState: Todo) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setTodoList(
      todoList.map((todo: Todo) => {
        if (todo.id === todoId) {
          const tempTodo = { ...todo };
          tempTodo.description = formValue.description;
          return tempTodo;
        }
        return todo;
      })
    );
    navigate("/", { replace: true });
  };

  const handleCancel = (event: React.SyntheticEvent) => {
    event.preventDefault()
    navigate("/", { replace: true });
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Edit Mode</h1>
      <form onSubmit={handleSubmit} className="m-5 p-5 rounded-md bg-gray-200">

        <input
          name="description"
          type="text"
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
          placeholder={thisTodo.description}
          required
        />

        <input
          className="focus:outline-none w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          type="submit"
          value="Submit Changes"
        />

        <button
          className="focus:outline-none w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
