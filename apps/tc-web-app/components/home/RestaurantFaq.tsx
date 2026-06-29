import { restaurantFaqs } from "@/lib/seo";

export function RestaurantFaq() {
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center">
          <span className="mb-1 block font-script text-3xl text-primary">
            Good to know
          </span>
          <h2 className="font-kaushan text-4xl text-ink">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border border-y border-border">
          {restaurantFaqs.map((faq) => (
            <article key={faq.question} className="py-6">
              <h3 className="text-base font-semibold text-ink">
                {faq.question}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
