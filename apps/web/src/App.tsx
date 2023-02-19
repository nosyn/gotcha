import { useState } from 'react';
import { Button, Card } from 'ui';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-zinc-900">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <Button>Hello</Button>
    </div>
  );
}

export default App;
