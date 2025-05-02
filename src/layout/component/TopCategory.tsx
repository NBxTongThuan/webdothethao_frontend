import { useState, useEffect } from "react";
import { getTopCategory } from "../../api/user/CategoriesAPI";
import { CategoryResponse } from "../../api/interface/Responses";
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';

const { Title } = Typography;

export default function TopCategory() {
    const [listCate, setListCate] = useState<CategoryResponse[]>([]);

    useEffect(() => {
        getTopCategory(0, 4).then(setListCate);
    }, []);

    return (
        <div className="container mx-auto px-4 py-6">
            <Title level={3} className="text-center text-2xl font-semibold text-gray-800 mb-6">
                🌟 Danh Mục Nổi Bật 🌟
            </Title>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center mt-5">
                {listCate.map((cate) => (
                    <Link to={`/shop/${cate.categoriesId}`} key={cate.categoriesId}>
                        <Card
                            hoverable
                            className="w-full max-w-[220px] transition-transform hover:scale-105 shadow-md rounded-xl overflow-hidden border border-gray-200 bg-white mx-auto"
                            cover={
                                <div className="relative pt-[60%] bg-gradient-to-br to-blue-100 mx-auto">
                                    <img
                                        src={cate.imageData}
                                        alt={cate.categoriesName}
                                        className="absolute top-0 left-0 w-full h-full object-contain rounded-t-xl"
                                    />
                                </div>
                            }
                            bodyStyle={{ padding: '12px' }}
                        >
                            <Title level={5} className="text-center text-base font-medium text-gray-700 m-0">
                                {cate.categoriesName}
                            </Title>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
