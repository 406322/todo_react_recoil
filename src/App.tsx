import { RecoilRoot } from "recoil";
import { Header } from "../src/components/header"
import { Form } from "../src/components/form"
import { TodoListStats } from "../src/components/TodoListStats"
import { TodoListFilters } from "../src/components/TodoListFilters";
import { List } from "../src/components/list";


export default function App() {

  return (
    <>
      <RecoilRoot>
        <Header />
        <TodoListStats />
        <TodoListFilters />
        <Form />
        <List />
      </RecoilRoot>
    </>
  )
}
