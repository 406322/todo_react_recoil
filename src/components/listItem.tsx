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
    id: props.id,
    isComplete: props.isComplete,
    isEdit: props.isEdit
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValue((prevState: Todo) => {
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

  const handleEdit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    toggleEdit();
  };

  const handleSave = () => {
    // console.log(todoList)
    // console.log(formValue.description)
    setTodoList(
      todoList.map((todo: Todo) => {
        if (todo.id === props.id) {
          const tempTodo = { ...todo };
          console.log(tempTodo)
          tempTodo.description = formValue.description;
          tempTodo.isEdit = !tempTodo.isEdit;
          console.log(tempTodo)
          return tempTodo;
        }
        return todo;
      })
    );
    // console.log(todoList)
    // console.log(formValue.description)
    //toggleEdit();
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

  return (
    <>
      <div className=" flex justify-between m-5 p-5 rounded-md bg-gray-200">

        <div className="flex gap-3">
          <input
            type="checkbox"
            checked={props.isComplete}
            className="w-7 h-7 cursor-pointer"
            onChange={handleToggleComplete}
          />

          {props.isEdit
            ? <input type="text" name="description" onChange={handleChange} value={formValue.description}


            />
            : <p className="font-normal text-black mb-3 text-center">
              {props.description}
            </p>
          }

          {/* <p className="font-normal text-black mb-3 text-center">
            {props.description}
          </p> */}





        </div>





        <div className="flex gap-3">
          <TiDeleteOutline
            title="Delete Todo"
            className="w-7 h-7 cursor-pointer"
            onClick={() => handleDelete()}
          />

          {props.isEdit
            ? <BiSave
              className="w-7 h-7 cursor-pointer"
              onClick={handleSave}
            />

            : <GrEdit
              title="Edit Todo"
              className="w-7 h-7 cursor-pointer"
              onClick={(e) => handleEdit(e)}
            />
          }

          {/* <GrEdit
            title="Edit Todo"
            className="w-7 h-7 cursor-pointer"
            onClick={() => handleEdit()}
          /> */}
        </div>

      </div>
    </>
  );
};


