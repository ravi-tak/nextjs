'use client'

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string }
}) {
  console.log(error.message)
  return (
    <html>
      <body>
        <div>
          <h2>{error.message}</h2>
          <button onClick={() => window.location.reload()}>Try again</button>
        </div>
      </body>
    </html>
  )
}
