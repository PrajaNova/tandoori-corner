import Image from "next/image";

const features = [
  {
    icon: "/granny/granny_icons_1.png",
    title: "Authentic Recipes",
    desc: "Our recipes have been passed down through generations and refined by Chef Ramesh across five-star kitchens in India. Every dish carries the full depth of North Indian tradition.",
  },
  {
    icon: "/granny/granny_icons_2.png",
    title: "Fresh Spices Daily",
    desc: "We grind and blend our own spice mixes in-house every morning. No shortcuts, no shortcuts — just the real flavours that make North Indian cuisine legendary.",
  },
  {
    icon: "/granny/granny_icons_3.png",
    title: "Tandoor-Fired Perfection",
    desc: "Our traditional clay tandoor oven operates at extreme heat, sealing in moisture and delivering the authentic char and smokiness that defines great tandoori cooking.",
  },
  {
    icon: "/granny/granny_icons_4.png",
    title: "Expert Kitchen Team",
    desc: "Led by Chef Ramesh, who has been with us since our founding in 2009, our chefs bring decades of experience in premium Indian restaurants across India and the Gulf.",
  },
  {
    icon: "/granny/granny_icons_5.png",
    title: "Alfresco Dining",
    desc: "Enjoy your meal on our beloved balcony-style alfresco terrace overlooking Balestier Road's heritage trail — the original charm that made Tandoori Corner famous.",
  },
  {
    icon: "/granny/granny_icons_6.png",
    title: "TCB Bar & Lounge",
    desc: "Our new TCB indoor dining room and stylish bar offers cocktails, wine pairings and a refined setting for private celebrations and corporate gatherings.",
  },
];

export function StoryFeatures() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16 text-center">
          {features.map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <div className="mb-6 h-16 flex items-center justify-center">
                <Image src={f.icon} alt={f.title} width={64} height={64} />
              </div>
              <h3 className="font-raleway text-lg font-bold uppercase tracking-wide mb-4">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed px-2">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
