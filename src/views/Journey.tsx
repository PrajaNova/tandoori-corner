import { ArrowLeft } from "lucide-react";

export function Journey({ navigate }: { navigate: (page: string) => void }) {
  const team = [
    {
      name: "Surendar Singh",
      role: "Owner, Entrepreneur",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80",
      bio: "Restaurateur, Surendar Singh - A Hotel Management Graduate started his career in 1993 with Hyatt International, New Delhi at La Piazza, the hotel's signature Italian Restaurant. During Surendar's tenure the Restaurant was the recipient of the Best Restaurant of the Year 1996 award. Thereafter, he moved to Singapore as a Restaurant Manager in a fine dining Restaurant from 1997 till 2008. His charismatic personality and interpersonal skills scaled the restaurant to greater heights.",
    },
    {
      name: "Satish Kumar Singh",
      role: "Manager",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
      bio: "One of the main pillars of the Tandoori corner restaurant. Having enormous experience in Hotel and restaurant industry in Singapore, India and gulf countries. A true professional in his knowledge about customer service and restaurant industry. His experience has helped Tandoori corner to reach it's heights.",
    },
    {
      name: "Ramesh Kumar",
      role: "Chef",
      img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80",
      bio: "Chef Ramesh is been with Tandoori corner since it's beginning in year 2009. He has worked in 5 star hotels in India and many other countries for many years before joining us. He is one of the main chef in our kitchen who works all day to bring out the taste and aroma to our foods.",
    },
    {
      name: "Benu – Bar Manager ( TCB)",
      role: "Tandoori Corner Bar",
      img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80",
      bio: "Benu has 4 years of customer service experience across India and Singapore. Since 2023, she has been with Tandoori Corner, ensuring smooth daily operations and delivering warm, attentive service to every guest. With a passion for hospitality and an analytical mindset, Benu plays a key role in enhancing both customer experience and operational flow. Do ask her recommendations for Wine Pairing n Cocktails.",
    },
  ];

  const gallery = [
    {
      title: "Indoor Dining",
      img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
    },
    {
      title: "Our Food",
      img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80",
    },
    {
      title: "Catering Event",
      img: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80",
    },
    {
      title: "Media Coverage",
      img: "https://images.unsplash.com/photo-1584697964400-2af6a2f6204c?auto=format&fit=crop&q=80",
    },
    {
      title: "With Bollywood Stars",
      img: "https://images.unsplash.com/photo-1533174000263-149dd772ceb0?auto=format&fit=crop&q=80",
    },
    {
      title: "Our Restaurant",
      img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80",
    },
  ];

  const articles = [
    {
      title: "Dine with Your Furry Friends at Tandoori Corner",
      preview: "Where Great Food Meets Great Company—Including Your Pets!",
      img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80",
    },
    {
      title: "Tandoori Corner is featured in Premium Economy",
      preview:
        "Tandoori Corner is featured in Premium Economy, 8 places in Balestier Road recom...",
      date: "03 - Apr - 2023",
      img: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80",
    },
    {
      title:
        "Tandoori Corner named as One of the Best Indian Restaurants In Singapore",
      preview:
        "We are delighted to share that Tandoori Corner is named One of the Best Indian R...",
      date: "22 - Mar - 2023",
      img: "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80",
    },
  ];

  return (
    <div className="pt-28 pb-40 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2 text-brand-dark/50 hover:text-brand-gold text-xs uppercase tracking-widest font-bold transition-colors mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>

        {/* Intro */}
        <section className="text-center mb-24">
          <h1 className="font-space text-5xl font-bold text-brand-dark mb-6">
            About Tandoori Corner
          </h1>
          <div className="w-16 h-1 bg-[#d48c37] mx-auto mb-8"></div>

          <h3 className="text-xl font-bold text-gray-700 mb-6 max-w-4xl mx-auto leading-relaxed">
            Tandoori Corner an authentic North Indian Cuisine with Pet-Friendly
            Alfresco Dining at Balestier Road, Singapore
          </h3>

          <p className="text-gray-600 font-light max-w-4xl mx-auto leading-relaxed text-lg">
            Established in 2008, Tandoori Corner has earned a stellar reputation
            for serving{" "}
            <strong>authentic, mouth-watering North Indian cuisine</strong> to
            discerning food enthusiasts. We are renowned for our commitment to
            exceptional flavours and a memorable dining experience.
          </p>
        </section>

        {/* Dining Options */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <h2 className="font-space text-3xl font-bold text-brand-dark mb-8">
              Experience our unique dining options:
            </h2>

            <ul className="space-y-6 text-gray-600 font-light leading-relaxed mb-8 list-disc pl-5">
              <li>
                <strong>Alfresco Dining:</strong> Discover our inviting outdoor
                area, offering stunning views of the Balestier heritage trail.
                We're proud to be a{" "}
                <strong>pet-friendly restaurant in Singapore</strong>, welcoming{" "}
                <strong>all pet lovers</strong> and their{" "}
                <strong>furry companions</strong> to enjoy a delightful meal.
                It’s the perfect spot for <strong>outdoor dining lovers</strong>{" "}
                in a casual and charming setting.
              </li>
              <li>
                <strong>Cozy Indoor Dining:</strong> Prefer a more intimate
                atmosphere? We also offer a{" "}
                <strong>comfortable and cozy indoor dining</strong> area, ideal
                for those seeking a tranquil and inviting space to savour our
                delectable dishes.
              </li>
            </ul>

            <p className="text-gray-600 font-light leading-relaxed">
              Whether you're searching for the{" "}
              <strong>best North Indian food in Balestier</strong>, a{" "}
              <strong>pet-friendly restaurant near you</strong>, or a{" "}
              <strong>charming Balestier Road restaurant</strong> with both
              outdoor and indoor seating, Tandoori Corner is your ultimate
              destination. Come and experience great flavours in a truly
              inviting ambiance!
            </p>
          </div>
          <div className="relative p-2 border border-[#d48c37]">
            <img
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80"
              alt="Alfresco Dining"
              className="w-full h-auto object-cover border border-white"
            />
          </div>
        </section>

        {/* Team */}
        <section className="mb-32">
          <div className="w-16 h-1 bg-[#d48c37] mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="mb-6 rounded overflow-hidden aspect-[4/5]">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-space font-bold text-xl text-brand-dark mb-2">
                  {member.name}
                </h4>
                <p className="text-gray-500 font-light text-sm mb-6">
                  {member.role}
                </p>
                <p className="text-gray-600 font-light text-sm leading-relaxed text-left flex-1">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className="mb-32">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {gallery.map((item, idx) => (
              <div
                key={idx}
                className="border border-gray-200 bg-white p-4 text-center"
              >
                <div className="aspect-[4/3] overflow-hidden mb-4 rounded-sm">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-[#d48c37] text-lg">
                  {item.title}
                </h4>
              </div>
            ))}
          </div>
        </section>

        {/* Media / News */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article, idx) => (
              <div
                key={idx}
                className="flex flex-col group cursor-pointer bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6 relative">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="px-4 pb-6 flex-1 flex flex-col">
                  <h4 className="font-space font-bold text-xl text-[#d48c37] mb-4 leading-tight">
                    {article.title}
                  </h4>
                  <p className="text-gray-600 font-light text-sm mb-6 flex-1">
                    {article.preview}
                  </p>
                  {article.date && (
                    <div className="text-brand-dark/70 text-sm font-bold flex items-center gap-2 mt-auto">
                      <span>📅</span> {article.date}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
