export default function MenuLoading() {
  return (
    <div className="min-h-screen bg-cream pt-24 pb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto mb-10 h-10 w-72 animate-pulse bg-muted" />
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-28 animate-pulse rounded-full bg-muted"
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="min-h-40 animate-pulse border border-border bg-card p-6"
            >
              <div className="mb-4 h-5 w-2/3 bg-muted" />
              <div className="mb-3 h-4 w-full bg-muted" />
              <div className="h-4 w-1/2 bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
