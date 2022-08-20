import { useRecoilState } from "recoil";
import { todoListState } from "../state/recoil/atoms"
import { Todo } from "../models/todo";
import { useNavigate } from 'react-router-dom';

export const ListItem = ({ props }: { props: Todo }): JSX.Element => {
  let navigate = useNavigate();
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const handleDelete = () => {
    const newState = todoList.filter((todo: Todo) => todo.id !== props.id);
    setTodoList(newState);
  };

  const handleEdit = (): void => {
    navigate(`/${props.id}`, { replace: true });
  };

  const handleToggleComplete = (): void => {
    setTodoList(
      todoList.map((todo: Todo) => {
        if (todo.id === props.id) {
          const tempTodo = { ...todo };
          tempTodo.isComplete = !tempTodo.isComplete;
          return tempTodo;
        }
        return todo;
      })
    );
  };

  return (
    <div className="m-5 p-5 rounded-md bg-gray-200">
      <p className="font-bold text-black mb-3 text-center">
        {props.title} <br />
      </p>
      <p className="font-normal text-black mb-3 text-center">
        {props.description}
      </p>

      <button
        type="button"
        onClick={() => handleDelete()}
        className="focus:outline-none w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Delete
      </button>

      <button
        type="button"
        onClick={() => handleEdit()}
        className="focus:outline-none w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
      >
        Edit
      </button>

      {props.isComplete && (
        <button
          type="button"
          onClick={() => handleToggleComplete()}
          className="focus:outline-none w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
        >
          Toggle Not Complete
        </button>
      )}

      {!props.isComplete && (
        <button
          type="button"
          onClick={() => handleToggleComplete()}
          className="focus:outline-none w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 "
        >
          Toggle Complete
        </button>
      )}
    </div>
  );
};
