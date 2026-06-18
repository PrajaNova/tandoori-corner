// Static data for the Granny "menu classic" page clone.

export interface ClassicDish {
  name: string;
  price: string;
  desc: string;
}

export interface ClassicCategory {
  subtitle: string;
  title: string;
  bg: string;
  items: ClassicDish[];
}

export const menuIntro = {
  subtitle: "Taste the best",
  title: "Fresh Ingredient, Tasty Meals",
  desc: "Everyone has taste, even if they don't realize it. Even if you're not a great chef, there's nothing to stop you understanding the difference between what tastes good and what doesn't.",
};

export const menuCategories: ClassicCategory[] = [
  {
    subtitle: "Starts at 11:00 am",
    title: "Breakfast Menu",
    bg: "/granny/granny_background_6.jpg",
    items: [
      {
        name: "Smoked Meat Sandwich",
        price: "$12.95",
        desc: "Baguette, basil, arugula, olives, cherry-tomatoes.",
      },
      {
        name: "Slices of Mini Pizza",
        price: "$10.95",
        desc: "Slices of mini pizza variety served on wooden board.",
      },
      {
        name: "Traditional pancakes",
        price: "$8.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Salmon Sandwich",
        price: "$15.95",
        desc: "Salmon, butter, lemon juice, onion, garlic & salad.",
      },
      {
        name: "Gourmet Tasty Steak Burgers",
        price: "$19.95",
        desc: "Ham Slices with Potato Wedges and Dipping Sauce.",
      },
      {
        name: "American Brunch",
        price: "$14.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Pan of Fried Eggs",
        price: "$13.95",
        desc: "eggs, bacon and cherry-tomatoes with bread.",
      },
      {
        name: "Healthy Toast",
        price: "$11.95",
        desc: "Cheese, avocado, arugula and sun dried tomatoes.",
      },
      {
        name: "Cannoli with cream cheese",
        price: "$15.95",
        desc: "Cheese, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Breakfast Set",
        price: "$20.95",
        desc: "Croissants with strawberries, mascarpone, honey.",
      },
      {
        name: "Chicken Lasagna",
        price: "$19.95",
        desc: "Chicken, ginger, garlic, honey, pepper & canola oil.",
      },
      {
        name: "Chocolate Cherry Cake",
        price: "$9.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Healthy Breakfast",
        price: "$19.95",
        desc: "Oat granola with fresh blueberries, almond, yogurt.",
      },
      {
        name: "Fried Eggs with Bacon",
        price: "$14.95",
        desc: "Eggs with bacon, fresh tomato, cucumber & bread.",
      },
      {
        name: "Mex Fajita Wraps",
        price: "$9.95",
        desc: "Mex Fajita Wraps Wrapped in Grilled Flour Tortillas.",
      },
      {
        name: "Traditional Homemade Sicilian",
        price: "$17.95",
        desc: "cannoli stuffed with cream cheese.",
      },
      {
        name: "Wedges of Meat",
        price: "$17.95",
        desc: "Meat and veggie filled quesadillas.",
      },
      {
        name: "Oat Granola Crumble",
        price: "$8.95",
        desc: "Oat granola crumble with fresh berries & ice-cream.",
      },
    ],
  },
  {
    subtitle: "Starts at 2:00 pm",
    title: "Lunch Menu",
    bg: "/granny/granny_background_11.jpg",
    items: [
      {
        name: "Chicken Breast",
        price: "$33.95",
        desc: "Paupiette of chicken, blue cheese, rosemary & beans.",
      },
      {
        name: "Alder Grilled Seafood Paella",
        price: "$40.95",
        desc: "Monkfish, onion, paella rice, garlic & smoked paprika,",
      },
      {
        name: "Traditional pancakes",
        price: "$8.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Salmon Steak",
        price: "$41.95",
        desc: "Salmon, butter, lemon juice, onion, garlic & salad.",
      },
      {
        name: "Cordon Bleu",
        price: "$19.95",
        desc: "chicken breasts, ham, pepper & Swiss cheese.",
      },
      {
        name: "American Brunch",
        price: "$14.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Chicken Crispy",
        price: "$33.95",
        desc: "Smoked quail, crispy egg, spelt, girolles, parsley.",
      },
      {
        name: "Smoked Paprika Hummus",
        price: "$11.95",
        desc: "Red peppers, roasted garlic, lemon slices, olives & mint.",
      },
      {
        name: "Cannoli with cream cheese",
        price: "$15.95",
        desc: "Cheese, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Grilled Fillet",
        price: "$20.95",
        desc: "Croissants with strawberries, mascarpone, honey.",
      },
      {
        name: "Beef/Pork Ribs",
        price: "$19.95",
        desc: "Chicken, ginger, garlic, honey, pepper & canola oil.",
      },
      {
        name: "Chocolate Cherry Cake",
        price: "$9.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Sea Trout",
        price: "$19.95",
        desc: "Oat granola with fresh blueberries, almond, yogurt.",
      },
      {
        name: "Roasted Steak Roulade",
        price: "$14.95",
        desc: "Eggs with bacon, fresh tomato, cucumber & bread.",
      },
      {
        name: "Mex Fajita Wraps",
        price: "$9.95",
        desc: "Mex Fajita Wraps Wrapped in Grilled Flour Tortillas.",
      },
      {
        name: "Traditional Homemade Sicilian",
        price: "$17.95",
        desc: "cannoli stuffed with cream cheese.",
      },
      {
        name: "Boerewors",
        price: "$17.95",
        desc: "Meat and veggie filled quesadillas.",
      },
      {
        name: "Tarte Tatin",
        price: "$38.95",
        desc: "Oat granola crumble with fresh berries & ice-cream.",
      },
    ],
  },
  {
    subtitle: "Starts at 7:00 pm",
    title: "Dinner Menu",
    bg: "/granny/granny_background_12.jpg",
    items: [
      {
        name: "Alder Grilled Seafood Paella",
        price: "$12.95",
        desc: "Baguette, basil, arugula, olives, cherry-tomatoes.",
      },
      {
        name: "Slices of Mini Pizza",
        price: "$10.95",
        desc: "Slices of mini pizza variety served on wooden board.",
      },
      {
        name: "Traditional pancakes",
        price: "$8.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Cordon Bleu",
        price: "$15.95",
        desc: "Salmon, butter, lemon juice, onion, garlic & salad.",
      },
      {
        name: "Gourmet Tasty Steak Burgers",
        price: "$19.95",
        desc: "Ham Slices with Potato Wedges and Dipping Sauce.",
      },
      {
        name: "Smoked Paprika Hummus",
        price: "$14.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Pan of Fried Eggs",
        price: "$13.95",
        desc: "eggs, bacon and cherry-tomatoes with bread.",
      },
      {
        name: "Healthy Toast",
        price: "$11.95",
        desc: "Cheese, avocado, arugula and sun dried tomatoes.",
      },
      {
        name: "Cannoli with cream cheese",
        price: "$15.95",
        desc: "Cheese, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Breakfast Set",
        price: "$20.95",
        desc: "Croissants with strawberries, mascarpone, honey.",
      },
      {
        name: "Chicken Lasagna",
        price: "$19.95",
        desc: "Chicken, ginger, garlic, honey, pepper & canola oil.",
      },
      {
        name: "Chocolate Cherry Cake",
        price: "$9.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Healthy Breakfast",
        price: "$19.95",
        desc: "Oat granola with fresh blueberries, almond, yogurt.",
      },
      {
        name: "Fried Eggs with Bacon",
        price: "$14.95",
        desc: "Eggs with bacon, fresh tomato, cucumber & bread.",
      },
      {
        name: "Mex Fajita Wraps",
        price: "$9.95",
        desc: "Mex Fajita Wraps Wrapped in Grilled Flour Tortillas.",
      },
      {
        name: "Traditional Homemade Sicilian",
        price: "$17.95",
        desc: "cannoli stuffed with cream cheese.",
      },
      {
        name: "Wedges of Meat",
        price: "$17.95",
        desc: "Meat and veggie filled quesadillas.",
      },
      {
        name: "Oat Granola Crumble",
        price: "$8.95",
        desc: "Oat granola crumble with fresh berries & ice-cream.",
      },
    ],
  },
  {
    subtitle: "Don't miss",
    title: "Dessert Menu",
    bg: "/granny/granny_background_13.jpg",
    items: [
      {
        name: "Chocolate Cherry Cake",
        price: "$33.95",
        desc: "Paupiette of chicken, blue cheese, rosemary & beans.",
      },
      {
        name: "American Brunch Combo",
        price: "$41.95",
        desc: "Salmon, butter, lemon juice, onion, garlic & salad.",
      },
      {
        name: "Blueberry Sweet Rolls",
        price: "$33.95",
        desc: "Smoked quail, crispy egg, spelt, girolles, parsley.",
      },
      {
        name: "Beautiful homemade croissants",
        price: "$26.95",
        desc: "Baguette, basil, arugula, olives, cherry-tomatoes.",
      },
      {
        name: "Pain au chocolat",
        price: "$29.95",
        desc: "Mint parsley with apple cider vinegar, salt & spices.",
      },
      {
        name: "Strawberry Butter Combo",
        price: "$44.95",
        desc: "Roast trout, English asparagus, watercress & royals.",
      },
      {
        name: "Traditional pancakes",
        price: "$40.95",
        desc: "Monkfish, onion, paella rice, garlic & smoked paprika.",
      },
      {
        name: "Coffee & Strawberry Jam",
        price: "$19.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Beautiful homemade croissants",
        price: "$13.95",
        desc: "Cheese, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Traditional pancakes",
        price: "$35.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Strawberry Butter Combo",
        price: "$44.95",
        desc: "Homemade croissant contain a bar of dark chocolate.",
      },
      {
        name: "Tarte Tatin",
        price: "$29.95",
        desc: "Caramelised apple tart, vanilla ice cream",
      },
      {
        name: "American Brunch Combo",
        price: "$8.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "American Brunch",
        price: "$14.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Cannoli with cream cheese",
        price: "$15.95",
        desc: "Smoked quail, crispy egg, spelt, girolles, parsley.",
      },
      {
        name: "Chocolate Cherry Cake",
        price: "$9.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Homemade croissants",
        price: "$3.95",
        desc: "Homemade croissant contain a bar of dark chocolate.",
      },
      {
        name: "Traditional pancakes",
        price: "$5.95",
        desc: "Caramelised apple tart, vanilla ice cream.",
      },
    ],
  },
  {
    subtitle: "Enjoy",
    title: "Drinks Menu",
    bg: "/granny/granny_background_14.jpg",
    items: [
      {
        name: "Cappuccino Coffee",
        price: "$12.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Caffè Macchiato",
        price: "$10.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Dark Coffee",
        price: "$8.95",
        desc: "Milk, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Dark Coffee",
        price: "$15.95",
        desc: "Salmon, butter, lemon juice, onion, garlic & salad.",
      },
      {
        name: "Coffee & Strawberry Jam",
        price: "$19.95",
        desc: "Ham Slices with Potato Wedges and Dipping Sauce.",
      },
      {
        name: "Coffee Latte",
        price: "$14.95",
        desc: "Applewood smoked bacon, tomatoes & green onions.",
      },
      {
        name: "Coffee Latte",
        price: "$13.95",
        desc: "eggs, bacon and cherry-tomatoes with bread.",
      },
      {
        name: "Espresso Coffee",
        price: "$11.95",
        desc: "Cheese, avocado, arugula and sun dried tomatoes.",
      },
      {
        name: "Caffè Macchiato",
        price: "$15.95",
        desc: "Cheese, eggs, strawberries, butter & maple syrup.",
      },
      {
        name: "Cappuccino",
        price: "$20.95",
        desc: "Croissants with strawberries, mascarpone, honey.",
      },
      {
        name: "Tea",
        price: "$9.95",
        desc: "Chicken, ginger, garlic, honey, pepper & canola oil.",
      },
      {
        name: "Dark Coffee",
        price: "$9.95",
        desc: "Vanilla, milk, dark chocolate, cherries, eggs, butter.",
      },
      {
        name: "Espresso Coffee",
        price: "$9.95",
        desc: "Oat granola with fresh blueberries, almond, yogurt.",
      },
      {
        name: "Cappuccino",
        price: "$14.95",
        desc: "Eggs with bacon, fresh tomato, cucumber & bread.",
      },
      {
        name: "Espresso Coffee",
        price: "$9.95",
        desc: "Mex Fajita Wraps Wrapped in Grilled Flour Tortillas.",
      },
      {
        name: "Green Tea",
        price: "$12.95",
        desc: "cannoli stuffed with cream cheese.",
      },
      {
        name: "Cappuccino",
        price: "$7.95",
        desc: "Meat and veggie filled quesadillas.",
      },
      {
        name: "Dark Coffee",
        price: "$8.95",
        desc: "Oat granola crumble with fresh berries & ice-cream.",
      },
    ],
  },
];
