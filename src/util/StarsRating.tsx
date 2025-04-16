import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";

type StarRatingProps = {
  max?: number;
  onRate?: (value: number) => void;
  value?: number;
};

const ratingLabels: Record<number, string> = {
  1: "Tệ",
  2: "Không hài lòng",
  3: "Bình thường",
  4: "Hài lòng",
  5: "Tuyệt vời",
};

const StarRating: React.FC<StarRatingProps> = ({ max = 5, onRate, value }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(value ?? 0);

  useEffect(() => {
    setSelected(value ?? 0);
  }, [value]);

  const handleClick = (val: number) => {
    setSelected(val);
    onRate?.(val);
  };

  const current = hovered ?? selected;

  return (
    <div className="flex flex-col items-start space-y-2">
      <div className="flex space-x-1 cursor-pointer">
        {Array.from({ length: max }, (_, i) => i + 1).map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 transition-colors duration-150 ${
              current >= star
                ? "fill-yellow-400 stroke-yellow-400"
                : "fill-none stroke-gray-400"
            }`}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(star)}
          />
        ))}
      </div>
      <div className="text-sm text-gray-700 flex items-center">
        {current > 0 ? (
          <div>{ratingLabels[current] ?? ""}</div>
        ) : (
          <div>Chưa đánh giá</div>
        )}
      </div>
    </div>
  );
};

export default StarRating;
