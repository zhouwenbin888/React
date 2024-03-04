import { useReducer } from "react";

type Action = { type: 'add' } | { type: 'del' };

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'del':
      return state - 1;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, 0);

  const handleAdd = () => {
    dispatch({ type: 'add' });
  };

  const handleDel = () => {
    dispatch({ type: 'del' });
  };

  return (
    <div className="App">
      <h1>Count: {state}</h1>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleDel}>Del</button>
    </div>
  );
}

export default App;
