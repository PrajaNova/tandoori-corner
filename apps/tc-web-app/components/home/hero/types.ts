export interface SlideAction {
  label: string;
  href: string;
  variant?: "solid" | "outline";
}

export interface Slide {
  image: string;
  cursive: string;
  heading: string;
  desc?: string;
  actions: SlideAction[];
}
