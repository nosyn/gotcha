import Head from 'next/head';
import { Button } from 'ui';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Gotcha</title>
      </Head>

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
