import { useState } from 'react';

import './App.css';
import { NavLink } from 'react-router';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Match3 Game</h1>
      <NavLink to={'/level-1'}>Уровень 1</NavLink>
    </>
  );
}

export default App;
