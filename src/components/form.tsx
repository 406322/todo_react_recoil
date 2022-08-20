import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { todoListState } from "../state/recoil/atoms"
import { Todo } from "../models/todo"

export const Form = () => {
  const [todoList, setTodoList] = useRecoilState<Todo[]>(todoListState);

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    id: "",
    isComplete: false,
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
    <form onSubmit={handleSubmit} className="m-5 p-5 rounded-md bg-gray-200">
      <h1 className="text-xl text-center font-bold mb-3">Add</h1>
      <input
        name="title"
        type="text"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        placeholder="Title"
        required
      />

      <input
        name="description"
        type="text"
        onChange={handleChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
        placeholder="Description"
        required
      />

      <input
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="submit"
        value="Submit"
      />
    </form>
  );
};
