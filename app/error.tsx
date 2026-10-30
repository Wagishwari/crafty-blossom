'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="wrap section prose"><h1>A thread came loose.</h1><p>Something went wrong while opening this page. Please try again.</p><button className="button" onClick={reset}>Try again</button></main>}
