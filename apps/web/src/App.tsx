import { useState } from 'react';
import { Button, Card } from 'ui';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="mx-auto w-auto px-4 pt-16 pb-8 sm:pt-24 lg:px-8">
        <div>
          <img src="http://localhost:8080/file" />
        </div>
        <div className="mt-2">
          <Button>Refetch</Button>
        </div>
      </main>
    </div>
  );
}

export default App;
