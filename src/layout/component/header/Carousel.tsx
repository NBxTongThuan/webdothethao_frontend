import { useState } from "react";

const images = ["slide-web-th8.jpg", "Bannerbongtruyen.png", "Bannerbongtruyen.png"];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto overflow-hidden rounded-lg shadow-lg">
            <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                        <img src={`/images/banner/${image}`} className="w-full h-auto max-h-[300px] object-contain" alt={`Slide ${index + 1}`} />
                    </div>
                ))}
            </div>

            {/* Nút điều hướng */}
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full text-white hover:bg-gray-900">
                ❮
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-700 p-2 rounded-full text-white hover:bg-gray-900">
                ❯
            </button>
        </div>
    );
}
