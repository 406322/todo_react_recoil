import { useRecoilState } from "recoil";
import { todoListFilterState } from "../state/recoil/atoms"

export const TodoListFilters = () => {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({ target: { value } }: any) => {
    setFilter(value);
  };

  return (
    <div className="flex flex-col justify-center text-center mx-5 rounded-md bg-gray-200 h-32">
      <div className="font-bold text-xl">Filter</div>

      <div className="">
        <select className="bg-gray-200 h-16" value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
      </div>

    </div>
  );
};
