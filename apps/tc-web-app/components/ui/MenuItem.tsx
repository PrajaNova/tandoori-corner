import Image from "next/image";
import { cn } from "@/lib/utils";

interface MenuItemProps {
  name: string;
  price: string;
  description: string;
  image?: string;
  className?: string;
}

export function MenuItem({
  name,
  price,
  description,
  image,
  className,
}: MenuItemProps) {
  return (
    <div className={cn("flex items-start space-x-5", className)}>
      {image && (
        <div className="relative w-[88px] h-[88px] shrink-0 overflow-hidden rounded">
          <Image
            src={image}
            alt={`${name} at Tandoori Corner`}
            width={88}
            height={88}
            loading="lazy"
            sizes="88px"
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-raleway font-bold text-base text-foreground truncate md:whitespace-normal">
            {name}
          </h3>
          <span className="font-raleway font-bold text-primary shrink-0">
            {price}
          </span>
        </div>
        <p className="text-muted-foreground text-sm mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
