import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { todoListState } from "../state/recoil/atoms"
import { Todo } from "../models/todo"
import { GoDiffAdded } from 'react-icons/go';


export const Form = () => {
  const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);

  const [formValue, setFormValue] = useState({
    description: "",
    id: "",
    isComplete: false,
    isEdit: false
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    formValue.id = uuidv4();
    setTodoList([...todoList, formValue]);
    const resetForm = event.target as HTMLFormElement;
    resetForm.reset();
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="flex gap-3 m-5 p-5 rounded-md bg-gray-200">


      <input
        name="description"
        type="text"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder="Add Todo..."
        required
      />

      <GoDiffAdded
        title="Add Todo"
        className="w-7 h-10 cursor-pointer"
      />
    </form>
  );
};
