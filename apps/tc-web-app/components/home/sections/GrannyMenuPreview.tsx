import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface Dish {
  name: string;
  desc: string;
  price: string;
}

const columnAlts = [
  "Tandoori Corner starters — Samosa, Seekh Kebab, Fish Tikka and Paneer Tikka",
  "North Indian curries — Butter Chicken, Lamb Rogan Josh and Palak Paneer",
  "Tandoor breads, biryani and Indian desserts at Tandoori Corner",
];

const columns: { image: string; items: Dish[] }[] = [
  {
    image: "/granny/granny_menu_simple-banner_1.jpg",
    items: [
      {
        name: "Samosa (2 pcs)",
        price: "S$8.00",
        desc: "Crispy pastry parcels filled with spiced potato & peas, served with tamarind chutney.",
      },
      {
        name: "Onion Bhaji",
        price: "S$8.00",
        desc: "Golden fritters of sliced onion, green chilli, cumin & fresh coriander.",
      },
      {
        name: "Seekh Kebab",
        price: "S$20.00",
        desc: "Minced lamb with green chilli, ginger & warming spices, grilled in the tandoor.",
      },
      {
        name: "Fish Tikka",
        price: "S$22.00",
        desc: "Chunks of fish marinated in mustard, turmeric & yoghurt, charred over live coals.",
      },
      {
        name: "Paneer Tikka",
        price: "S$16.00",
        desc: "Cottage cheese cubes with capsicum & onion, marinated in spiced yoghurt & grilled.",
      },
      {
        name: "Aloo Tikki",
        price: "S$10.00",
        desc: "Pan-fried potato patties with cumin, peas & coriander, topped with tangy chutneys.",
      },
    ],
  },
  {
    image: "/granny/granny_menu_simple-banner_2.jpg",
    items: [
      {
        name: "Butter Chicken",
        price: "S$18.00",
        desc: "Classic tomato-cream curry with tender chicken tikka, fenugreek & house butter.",
      },
      {
        name: "Lamb Rogan Josh",
        price: "S$22.00",
        desc: "Slow-braised lamb in a deep Kashmiri sauce of whole spices & caramelised onion.",
      },
      {
        name: "Dal Makhani",
        price: "S$14.00",
        desc: "Black lentils slow-cooked overnight with tomato, garlic & a swirl of cream.",
      },
      {
        name: "Palak Paneer",
        price: "S$16.00",
        desc: "Creamy spinach curry with house-made cottage cheese & cumin-tempered ghee.",
      },
      {
        name: "Chicken Tikka Masala",
        price: "S$18.00",
        desc: "Chargrilled chicken tikka in a rich, aromatic masala sauce with fresh cream.",
      },
      {
        name: "Prawn Masala",
        price: "S$24.00",
        desc: "Juicy prawns tossed in a bold, tomato-based masala with mustard seeds & curry leaf.",
      },
    ],
  },
  {
    image: "/granny/granny_menu_simple-banner_3.jpg",
    items: [
      {
        name: "Chicken Biryani",
        price: "S$18.00",
        desc: "Saffron-scented basmati with marinated chicken, caramelised onion & whole spices.",
      },
      {
        name: "Peshawari Naan",
        price: "S$6.00",
        desc: "Tandoor-baked bread stuffed with coconut, almonds & sweet sultanas.",
      },
      {
        name: "Garlic Naan",
        price: "S$5.00",
        desc: "Soft flatbread brushed with garlic butter & fresh coriander, fresh from the tandoor.",
      },
      {
        name: "Mango Lassi",
        price: "S$6.00",
        desc: "Chilled blend of fresh mango, creamy yoghurt & a whisper of cardamom.",
      },
      {
        name: "Gulab Jamun",
        price: "S$7.00",
        desc: "Soft milk-solid dumplings soaked in rose-saffron syrup, served warm.",
      },
      {
        name: "Kulfi",
        price: "S$8.00",
        desc: "Traditional Indian ice cream with pistachio & saffron, set in a cone mould.",
      },
    ],
  },
];

const tabs = ["Tandoori", "Curry", "Sabzi", "Sweets"];

export function GrannyMenuPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionHeading
          cursiveText="Taste the flavours"
          mainText="Discover Our Menu"
        />

        <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed">
          From smoky tandoori starters to fragrant biryanis and indulgent
          desserts, our menu celebrates the full breadth of North Indian cuisine
          — prepared fresh every day by our expert kitchen team.
        </p>

        <div className="flex justify-center flex-wrap gap-x-10 gap-y-2 mb-14">
          {tabs.map((tab, idx) => (
            <button
              type="button"
              key={tab}
              className={`font-script text-2xl transition-colors ${
                idx === 0
                  ? "text-primary border-b border-primary pb-1"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12 mb-16">
          {columns.map((col, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden mb-8">
                <Image
                  src={col.image}
                  alt={columnAlts[idx]}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="space-y-6">
                {col.items.map((item) => (
                  <div key={item.name}>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-raleway font-bold text-base text-foreground">
                        {item.name}
                      </h3>
                      <span className="font-raleway font-bold text-primary">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <ButtonLink
            href="/menu"
            size="lg"
            className="bg-ink text-white hover:bg-primary rounded-none px-10 py-6 text-xs tracking-widest uppercase font-bold"
          >
            Discover Full Menu
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
