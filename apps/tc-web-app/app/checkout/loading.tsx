export default function CheckoutLoading() {
  return (
    <div className="min-h-screen bg-cream pt-28 pb-40">
      <div className="container mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <div className="h-10 w-48 animate-pulse bg-muted" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <div className="h-6 w-56 animate-pulse bg-muted" />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="h-12 animate-pulse border-b border-border bg-muted/70" />
                <div className="h-12 animate-pulse border-b border-border bg-muted/70" />
              </div>
            </div>
          ))}
        </div>
        <div className="h-96 animate-pulse border border-border bg-card lg:col-span-5" />
      </div>
    </div>
  );
}
