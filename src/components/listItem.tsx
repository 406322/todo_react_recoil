import { useRecoilState } from "recoil";
import { todoListState } from "../state/recoil/atoms"
import { Todo } from "../models/todo";
import { TiDeleteOutline } from 'react-icons/ti';
import { GrEdit } from 'react-icons/gr';
import { BiSave } from 'react-icons/bi';
import { useState } from "react";


export const ListItem = ({ props }: { props: Todo }) => {
  const [todoList, setTodoList] = useRecoilState(todoListState);

  const [formValue, setFormValue] = useState({
    description: props.description,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleDelete = () => {
    const newState = todoList.filter((todo: Todo) => todo.id !== props.id);
    setTodoList(newState);
  };

  const handleEdit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    toggleEdit();
  };

  const handleSave = () => {
    setTodoList(
      todoList.map((todo: Todo) => {
        if (todo.id === props.id) {
          const tempTodo = { ...todo };
          tempTodo.description = formValue.description;
          tempTodo.isEdit = !tempTodo.isEdit;
          return tempTodo;
        }
        return todo;
      })
    );
  }

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

  const toggleEdit = () => {
    setTodoList(
      todoList.map((todo: Todo) => {
        if (todo.id === props.id) {
          const tempTodo = { ...todo };
          tempTodo.isEdit = !tempTodo.isEdit;
          return tempTodo;
        }
        return todo;
      })
    );
  }

  return (
    <>
      <form
        onSubmit={handleSave}
        className=" flex justify-between m-5 p-5 rounded-md bg-gray-200">

        <div className="flex gap-3">
          <input
            type="checkbox"
            checked={props.isComplete}
            className="w-7 h-7 cursor-pointer"
            onChange={handleToggleComplete}
          />

          {props.isEdit
            ? <input
              name="description"
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              onChange={handleChange}
              value={formValue.description}
            />
            : <p
              className="font-normal text-black mb-3 text-center">
              {props.description}
            </p>
          }

        </div>

        <div className="flex gap-3">
          <TiDeleteOutline
            title="Delete Todo"
            className="w-7 h-7 cursor-pointer"
            onClick={() => handleDelete()}
          />

          {props.isEdit
            ? <BiSave
              title="Save Todo"
              className="w-7 h-7 cursor-pointer"
              onClick={handleSave}
            />

            : <GrEdit
              title="Edit Todo"
              className="w-7 h-7 cursor-pointer"
              onClick={(e) => handleEdit(e)}
            />
          }

        </div>

      </form>
    </>
  );
};


