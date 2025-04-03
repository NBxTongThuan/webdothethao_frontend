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
        <div className="relative w-full mx-auto overflow-hidden rounded-xl shadow-2xl group">
            {/* Slides container */}
            <div 
                className="flex transition-transform duration-700 ease-out" 
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className="w-full flex-shrink-0 relative">
                        <img 
                            src={`/images/banner/${image}`} 
                            className="w-full h-[400px] object-cover" 
                            alt={`Slide ${index + 1}`} 
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                ))}
            </div>
    
            {/* Navigation buttons */}
            <button 
                onClick={prevSlide} 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg backdrop-blur-sm"
                aria-label="Previous slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg backdrop-blur-sm"
                aria-label="Next slide"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {/* Dots navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            currentIndex === index 
                                ? 'bg-white w-8' 
                                : 'bg-white/60 hover:bg-white/80'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
