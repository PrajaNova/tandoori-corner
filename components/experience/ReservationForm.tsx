import { FormField } from "@/components/common/forms/FormField";
import type { ExperienceField } from "@/data/experience";

type ReservationFormProps = {
  title: string;
  description: string;
  fields: ExperienceField[];
  submitText: string;
};

export function ReservationForm({
  title,
  description,
  fields,
  submitText,
}: ReservationFormProps) {
  return (
    <section>
      <h3 className="font-space text-3xl text-ink mb-2">{title}</h3>
      <p className="text-ink/60 text-sm font-light mb-8">{description}</p>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fields.map((field) => {
            if (field.type === "textarea") {
              return (
                <div key={field.id} className="md:col-span-2">
                  <FormField label={field.label} htmlFor={field.id}>
                    <textarea
                      id={field.id}
                      rows={4}
                      className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                      placeholder={field.placeholder}
                    />
                  </FormField>
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.id}>
                  <FormField label={field.label} htmlFor={field.id} required>
                    <select
                      id={field.id}
                      className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                    >
                      {field.options?.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </FormField>
                </div>
              );
            }

            if (field.type === "date" || field.type === "time") {
              return (
                <div key={field.id}>
                  <FormField label={field.label} htmlFor={field.id} required>
                    <input
                      id={field.id}
                      type={field.type}
                      className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                    />
                  </FormField>
                </div>
              );
            }

            return (
              <div key={field.id}>
                <FormField label={field.label} htmlFor={field.id} required>
                  <input
                    id={field.id}
                    type={field.type}
                    className="w-full bg-cream border border-border text-ink p-4 focus:outline-none focus:border-brand-gold"
                    placeholder={field.placeholder}
                  />
                </FormField>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="w-full bg-brand-gold text-brand-dark px-10 py-4 text-xs uppercase tracking-widest font-bold mt-4 hover:bg-brand-gold-muted transition-colors"
        >
          {submitText}
        </button>
      </div>
    </section>
  );
}
