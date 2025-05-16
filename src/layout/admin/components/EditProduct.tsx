import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, ConfigProvider, Input, Select, Form } from 'antd';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageResponse, AdminProductResponse, TypesResponse, BrandResponse } from '../../../api/interface/Responses';
import { toast } from "react-toastify";
import { X, ArrowLeft, Edit, Save, Hash, DollarSign, Folder, List, Image, ShoppingCart, FileText, Building } from 'lucide-react';

import { getTypeByCategoryName } from '../../../api/admin/AdminTypesAPI';
import { getAllBrand } from '../../../api/admin/AdminBrandAPI';
import { getAllImage } from '../../../api/admin/AdminImagesAPI';

interface ModalProps {
    product: AdminProductResponse | undefined;
    onClose: () => void;
    setFlag: () => void;
}

const AdminProductDetail: React.FC<ModalProps> = (props) => {
    const [listImage, setListImage] = useState<ImageResponse[]>([]);
    const [form] = Form.useForm();
    const [listType, setListType] = useState<TypesResponse[]>([]);
    const [listBrand, setListBrand] = useState<BrandResponse[]>([]);
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [file3, setFile3] = useState<File | null>(null);


    // const [newListImage, setNewListImage] = useState<ImageResponse[]>([]);
    const handleNewListImage = async (): Promise<ImageResponse[]> => {
        const files = [file1, file2, file3];
        const updatedList: ImageResponse[] = [];

        for (let i = 0; i < 3; i++) {
            const oldImage = listImage[i];
            const file = files[i];

            if (file) {
                const base64 = await getBase64(file);
                if (oldImage) {
                    updatedList.push({
                        ...oldImage,
                        data: "",
                        name: file.name,
                        url: "/images/product_image/"+file.name
                    });
                } else {
                    updatedList.push({
                        imageId: "",
                        name: file.name,
                        data: "",
                        url: "/images/product_image/"+file.name
                    });
                }
            } else {
                if (oldImage) {
                    updatedList.push(oldImage);
                }
            }
        }
        // Cập nhật state đúng cách (nếu cần dùng ở ngoài)
        // setNewListImage(updatedList);
        return updatedList;
    };


    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        getAllImage(props.product?.productId + "").then(response => {
            setListImage(response);
        });
    }, [props.product]);

    useEffect(() => {
        getTypeByCategoryName(props.product?.categoryName + "").then(response => {
            setListType(response);
        });
    }, [props.product]);

    useEffect(() => {
        getAllBrand().then(response => {
            setListBrand(response);
        });
    }, []);

    const handleGetTypeId = async () => {
        const type = listType.find(type => type.typeName === form.getFieldValue("typeName"));
        return type?.typeId;
    }

    const handleGetBrandId = async () => {
        const brand = listBrand.find(brand => brand.brandName === form.getFieldValue("brandName"));
        return brand?.brandId;
    }

    const handleSubmit = async () => {
        const newListImage = await handleNewListImage();

        const product = {
            productId: props.product?.productId,
            productName: form.getFieldValue("productName"),
            typeId: await handleGetTypeId(),
            brandId: await handleGetBrandId(),
            importPrice: form.getFieldValue("importPrice"),
            price: form.getFieldValue("productPrice"),
            description: form.getFieldValue("description"),
            listUpdateImage: newListImage
        }

        try {
            const url = `http://localhost:8080/api/admin/products/update`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
                credentials: 'include'
            });
            if (response.ok === true) {
                toast.success("Cập nhật sản phẩm thành công");
                props.onClose();
                props.setFlag();
             
            } else {
                toast.error("Cập nhật sản phẩm thất bại");
                props.onClose();
            }
        } catch (error) {
            toast.error("Cập nhật sản phẩm thất bại");
            props.onClose();
        }
    }


    return (
        <ConfigProvider getPopupContainer={() => document.body}>
            <AnimatePresence>
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
                >
                    <motion.div
                        className="bg-white rounded-2xl p-8 w-full max-w-7xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <div className="space-y-6 bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <Edit className="h-6 w-6 text-blue-600" />
                                        Sửa sản phẩm
                                    </h2>
                                    <p className="text-gray-500 mt-1">Cập nhật thông tin sản phẩm</p>
                                </div>
                                <Button
                                    type="text"
                                    icon={<X className="h-5 w-5" />}
                                    onClick={props.onClose}
                                    className="hover:bg-gray-100 rounded-full transition-colors duration-200"
                                />
                            </div>

                            <Form
                                form={form}
                                layout="vertical"
                                initialValues={{
                                    productId: props.product?.productId,
                                    productName: props.product?.productName,
                                    categoryName: props.product?.categoryName,
                                    typeName: props.product?.typeName,
                                    brandName: props.product?.brandName,
                                    quantitySold: props.product?.quantitySold,
                                    importPrice: props.product?.importPrice,
                                    description: props.product?.description,
                                    productPrice: props.product?.price,
                                    image1: listImage[0]?.data,
                                    image2: listImage[1]?.data,
                                    image3: listImage[2]?.data
                                }}
                                onValuesChange={(changedValues, allValues) => {
                                    console.log('Changed values:', changedValues);
                                    console.log('All form values:', allValues);
                                }}
                                onFinish={handleSubmit}
                                className="mt-6"
                            >
                                <div className="grid grid-cols-2 gap-8">
                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><Hash className="h-4 w-4" /> Mã sản phẩm</span>}
                                        name="productId"
                                    >
                                        <Input disabled className="bg-gray-50 text-gray-500 rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><Tag className="h-4 w-4" /> Tên sản phẩm</span>}
                                        name="productName"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                                    >
                                        <Input placeholder="Nhập tên sản phẩm" className="rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Giá sản phẩm</span>}
                                        name="productPrice"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá sản phẩm' }]}
                                    >
                                        <Input type='number' placeholder="Nhập giá sản phẩm" className="rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Giá nhập</span>}
                                        name="importPrice"
                                        rules={[{ required: true, message: 'Vui lòng nhập giá nhập' }]}
                                    >
                                        <Input type='number' placeholder="Nhập giá nhập" className="rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><Folder className="h-4 w-4" /> Danh mục</span>}
                                        name="categoryName"
                                        rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                                    >
                                        <Input disabled className="bg-gray-50 text-gray-500 rounded-lg" />
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><List className="h-4 w-4" /> Loại</span>}
                                        name="typeName"
                                        rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
                                    >
                                        <Select placeholder="Chọn loại" className="rounded-lg">
                                            {listType.map((type) => (
                                                <Select.Option key={type.typeName} value={type.typeName}>{type.typeName}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><Building className="h-4 w-4" /> Hãng</span>}
                                        name="brandName"
                                        rules={[{ required: true, message: 'Vui lòng chọn hãng' }]}
                                    >
                                        <Select placeholder="Chọn hãng" className="rounded-lg">
                                            {listBrand.map((brand) => (
                                                <Select.Option key={brand.brandName} value={brand.brandName}>{brand.brandName}</Select.Option>
                                            ))}
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><ShoppingCart className="h-4 w-4" /> Số lượng bán</span>}
                                        name="quantitySold"
                                    >
                                        <Input disabled className="bg-gray-50 text-gray-500 rounded-lg" />
                                    </Form.Item>

                                    <div className="col-span-2">
                                    <Form.Item
                                        label={<span className="font-medium text-gray-700 flex items-center gap-2"><FileText className="h-4 w-4" /> Mô tả</span>}
                                        name="description"
                                    >
                                        <Input.TextArea placeholder="Nhập mô tả" className="rounded-lg" rows={4} />
                                    </Form.Item>
                                    </div>

                                    <div className="col-span-2 grid grid-cols-3 gap-6">
                                        <Form.Item
                                            label={<span className="font-medium text-gray-700 flex items-center gap-2"><Image className="h-4 w-4" /> Ảnh 1</span>}
                                            name="image1"
                                        >
                                            <div className="space-y-2">
                                                {listImage.length > 0 ?
                                                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                                        {listImage[0] ?
                                                            <img src={listImage[0].url} alt="Ảnh 1" className="w-full h-full object-cover" />
                                                            : <div className="w-full h-full flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                                                        }
                                                    </div>
                                                    : <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                                                }
                                                <Input type="file" onChange={(e) => setFile1(e.target.files?.[0] || null)} className="rounded-lg" />
                                            </div>
                                        </Form.Item>

                                        <Form.Item
                                            label={<span className="font-medium text-gray-700 flex items-center gap-2"><Image className="h-4 w-4" /> Ảnh 2</span>}
                                            name="image2"
                                        >
                                            <div className="space-y-2">
                                                {listImage.length > 0 ?
                                                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                                        {listImage[1] ?
                                                            <img src={listImage[1].url} alt="Ảnh 2" className="w-full h-full object-cover" />
                                                            : <div className="w-full h-full flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                                                        }
                                                    </div>
                                                    : <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                                                }
                                                <Input type="file" onChange={(e) => setFile2(e.target.files?.[0] || null)} className="rounded-lg" />
                                            </div>
                                        </Form.Item>

                                        <Form.Item
                                            label={<span className="font-medium text-gray-700 flex items-center gap-2"><Image className="h-4 w-4" /> Ảnh 3</span>}
                                            name="image3"
                                        >
                                            <div className="space-y-2">
                                                {listImage.length > 0 ?
                                                    <div className="relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                                                        {listImage[2] ?
                                                            <img src={listImage[2].url} alt="Ảnh 3" className="w-full h-full object-cover" />
                                                            : <div className="w-full h-full flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                                                        }
                                                    </div>
                                                    : <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">Chưa có ảnh</div>
                                                }
                                                <Input type="file" onChange={(e) => setFile3(e.target.files?.[0] || null)} className="rounded-lg" />
                                            </div>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
                                    <Button
                                        onClick={props.onClose}
                                        className="flex items-center gap-2 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Hủy</span>
                                    </Button>
                                    <Button
                                        type="primary"
                                        className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                                        onClick={() => form.submit()}
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>Lưu thay đổi</span>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    );
};

export default AdminProductDetail;