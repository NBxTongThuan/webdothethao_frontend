 import React from "react";

const Carousel: React.FC = () => {
    return (
        <div>
            <div id="carouselExampleDark" className="carousel carousel-dark slide">
                <div className="carousel-inner">
                    {["slide-web-th8.jpg", "Bannerbongtruyen.png", "Bannerbongtruyen.png"].map((image, index) => (
                        <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`} data-bs-interval="10000">
                            <img
                                src={`/images/banner/${image}`}
                                className="d-block w-100"
                                style={{ height: "auto", maxHeight: "400px", objectFit: "contain" }}
                                alt={`Slide ${index + 1}`}
                            />
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Carousel;
