import { Star } from "lucide-react";

const RatingStar = ({ rating, max = 5 }: { rating: number; max?: number }) => {
  const normalizedRating = Math.min(Math.max(rating, 0), max);
  const fullStars = Math.floor(normalizedRating);
  const hasPartialStar = normalizedRating % 1 > 0 && fullStars < max;
  const visibleStars = fullStars + (hasPartialStar ? 1 : 0);

  return (
    <div className="flex text-brand-gold">
      {Array.from({ length: visibleStars }, (_, index) => (
        <Star
          key={`rating-star-${index}`}
          className={`w-3 h-3 fill-current ${
            hasPartialStar && index === visibleStars - 1 ? "opacity-50" : ""
          }`}
        />
      ))}
    </div>
  );
};

export default RatingStar;
