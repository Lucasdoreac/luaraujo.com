import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Lucas Araujo</title>
        <meta name="description" content="Personal website of Lucas Araujo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to My Website
          </h1>
          <p className="text-xl text-gray-600">
            Website under construction. Coming soon!
          </p>
        </div>
      </main>
    </>
  )
}