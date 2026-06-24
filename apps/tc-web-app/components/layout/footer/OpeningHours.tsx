import Link from "next/link";

interface HourRow {
  day: string;
  time: string;
}

interface OpeningHoursProps {
  hours: HourRow[];
}

export function OpeningHours({ hours }: OpeningHoursProps) {
  return (
    <div className="flex justify-center -mt-8 relative z-10">
      <div className="border border-white/10 w-full max-w-[300px] p-8 pt-10 flex flex-col items-center relative bg-[#1a1a1a]">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] px-2 text-primary/70">
          <span className="text-xl">✧</span>
        </div>

        <div className="w-full space-y-4 text-xs text-muted-foreground mb-8">
          {hours.map((row) => (
            <div
              key={row.day}
              className="flex justify-between border-b border-white/5 pb-2"
            >
              <span>{row.day}</span>
              <span>{row.time}</span>
            </div>
          ))}
        </div>

        <Link
          href="/#reservation"
          className="w-full border border-primary text-primary font-bold text-xs tracking-widest uppercase py-4 text-center hover:bg-primary hover:text-white transition-colors"
        >
          Find A Table
        </Link>
      </div>
    </div>
  );
}
