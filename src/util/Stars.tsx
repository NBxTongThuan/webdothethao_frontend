import { Star, StarFill, StarHalf } from "react-bootstrap-icons";

const renderRate = (diem: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= diem) {
            stars.push(<StarFill key={i} className="text-yellow-400" />);
        } else if (i - diem > 0.0 && i - diem < 1.0) {
            stars.push(<StarHalf key={i} className="text-yellow-400"/>);
        } else {
            stars.push(<Star key={i} className="text-gray-300" />);
        }
    }
    return stars;
}

export default renderRate;