export default function ExperienceLoading() {
  return (
    <div className="min-h-screen bg-cream pt-32 pb-32">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="mx-auto mb-6 h-6 w-32 animate-pulse bg-muted" />
        <div className="mx-auto mb-16 h-14 max-w-xl animate-pulse bg-muted" />
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="h-96 animate-pulse border border-border bg-card" />
          <div className="h-96 animate-pulse border border-border bg-card" />
        </div>
      </div>
    </div>
  );
}
