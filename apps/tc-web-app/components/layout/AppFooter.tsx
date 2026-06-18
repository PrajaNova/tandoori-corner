import { Facebook, Globe, Instagram, Twitter } from "lucide-react";
import Link from "next/link";

const hours = [
  { day: "Week days", time: "09.00 – 24:00" },
  { day: "Saturday", time: "08:00 – 03.00" },
  { day: "Sunday", time: "Day off" },
];

export function AppFooter() {
  return (
    <footer className="bg-[#1a1a1a] pt-24 pb-8 text-white relative mt-auto">
      {/* Top "Make A Reservation" tab */}
      <div className="absolute left-1/2 -top-[20px] -translate-x-1/2 w-[260px] h-[44px] bg-[#1a1a1a] rounded-t-[60px] flex items-center justify-center">
        <h3 className="font-script text-white text-2xl -mt-2">
          Make A Reservation
        </h3>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-16 text-center">
          {/* Left Column: Our address */}
          <div className="flex flex-col items-center">
            <h3 className="font-script text-primary text-3xl mb-6">
              Our address
            </h3>
            <p className="text-muted-foreground text-sm leading-loose mb-6">
              22 Alnahas Building, 2 AlBahr St, Tanta
              <br />
              Al-Gharbia Governorate, Egypt
            </p>
            <a
              href="#"
              className="text-primary font-bold text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              View On Map
            </a>
          </div>

          {/* Center Column: Hours box */}
          <div className="flex justify-center -mt-8 relative z-10">
            <div className="border border-white/10 w-full max-w-[300px] p-8 pt-10 flex flex-col items-center relative">
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
                href="/checkout"
                className="w-full border border-primary text-primary font-bold text-xs tracking-widest uppercase py-4 text-center hover:bg-primary hover:text-white transition-colors"
              >
                Find A Table
              </Link>
            </div>
          </div>

          {/* Right Column: Contact us */}
          <div className="flex flex-col items-center">
            <h3 className="font-script text-primary text-3xl mb-6">
              Contact us
            </h3>
            <p className="text-muted-foreground text-sm leading-loose mb-6">
              Main Email: 7oroof@7oroof.com
              <br />
              Phone: 02 01065370701
            </p>
            <a
              href="#"
              className="text-primary font-bold text-xs tracking-widest uppercase hover:text-white transition-colors"
            >
              Send A Message
            </a>
          </div>
        </div>

        {/* Socials and Newsletter */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-10">
          <div className="flex space-x-3">
            {[Facebook, Twitter, Instagram, Globe].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex w-full max-w-sm border border-white/15 rounded-full overflow-hidden">
            <input
              type="email"
              placeholder="Subscribe Our Newsletter"
              className="bg-transparent border-none outline-none text-sm px-6 py-3 w-full text-white placeholder:text-white/30"
            />
            <button className="px-6 text-primary hover:text-white transition-colors">
              →
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-white/40 pt-8 border-t border-white/10 font-light">
          © 2017 Granny, With Love by{" "}
          <span className="text-primary">7oroof</span>
        </div>
      </div>
    </footer>
  );
}
