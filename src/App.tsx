import { RecoilRoot } from "recoil";
import { Header } from "../src/components/header"
import { Form } from "../src/components/form"
import { TodoListStats } from "../src/components/TodoListStats"
import { TodoListFilters } from "../src/components/TodoListFilters";
import { List } from "../src/components/list";
import { Suspense, useEffect } from "react";
// import { todoListState } from "../state/recoil/atoms"
// import { useRecoilState } from "recoil";


export default function App() {

  // const [state, setState] = useRecoilState(todoListState);

  return (
    <>
      <RecoilRoot>
        <Header />
        {/* <Suspense fallback={<h1>Loading...</h1>}> */}
        <TodoListStats />
        <TodoListFilters />
        <Form />
        <List />
        {/* </Suspense> */}
      </RecoilRoot>
    </>
  )
}
