import React, { useEffect, useState } from 'react';
import { Button, Table, Tag, ConfigProvider, Descriptions, Input, Select, Form, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageResponse, ProductAttributeResponse, ProductResponse, TypesResponse, BrandResponse, CategoryResponse } from '../../../api/interface/Responses';
import { getAllProductAttributeByProductId } from '../../../api/admin/AdminProductAttributeAPI';
import { toast } from "react-toastify";
import { X, ArrowLeft, Edit, Trash2, CheckCircle, Save, Hash, DollarSign, Folder, List, Image, ShoppingCart, FileText, Building, Plus, Delete } from 'lucide-react';
import { getAllType, getTypeByCategoryName } from '../../../api/admin/AdminTypesAPI';
import { getAllBrand } from '../../../api/admin/AdminBrandAPI';
import { getAllCategory } from '../../../api/admin/CategoryAPI';
import { getAllImage } from '../../../api/admin/AdminImagesAPI';
import ReactQuill from 'react-quill';
const { Column } = Table;
const { Item } = Descriptions;

interface ModalProps {
    onClose: () => void;
    setFlag: () => void;
}

interface ProductAttributeRequest {
    color: string;
    size: string;
    quantity: number;
}

const AdminAddProduct: React.FC<ModalProps> = (props) => {
    const [form] = Form.useForm();
    const [listType, setListType] = useState<TypesResponse[]>([]);
    const [listBrand, setListBrand] = useState<BrandResponse[]>([]);
    const [file1, setFile1] = useState<File | null>(null);
    const [file2, setFile2] = useState<File | null>(null);
    const [file3, setFile3] = useState<File | null>(null);
    const [listCategory, setListCategory] = useState<CategoryResponse[]>([]);
    const [listSize, setListSize] = useState<string[]>([]);
    const [errorProductName, setErrorProductName] = useState<string>("");

    const [color, setColor] = useState<string>("");
    const [size, setSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(0);

    const listColor = ["RED", "BLUE", "GREEN", "BLACK", "WHITE", "YELLOW", "ORANGE", "PURPLE", "PINK", "GRAY", "BROWN"];

    const [listProductAttribute, setListProductAttribute] = useState<ProductAttributeRequest[]>([]);

    const checkExistsProduct = async () => {
        const url = `http://localhost:8080/api/admin/products/check-exists`;
        if (form.getFieldValue("productName") === undefined || form.getFieldValue("typeName") === undefined || form.getFieldValue("brandName") === undefined) {
            return;
        }

        if (form.getFieldValue("productName") === "" || form.getFieldValue("typeName") === "" || form.getFieldValue("brandName") === "") {
            return;
        }

        const data = {
            productName: form.getFieldValue("productName"),
            typeName: form.getFieldValue("typeName"),
            brandName: form.getFieldValue("brandName"),
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            });

            const result = await response.json();
            if (result === true) {
                setErrorProductName("Tên sản phẩm đã tồn tại trong thể loại và thương hiệu này rồi!");
                return true;
            }
            setErrorProductName("");
            return false;
        } catch (err) {
            alert('Lỗi: ' + err);
            return false;
        }
    }
    const handleAddAttribute = () => {
        if (handleCheckExistAttribute(color, size)) {
            toast.error("Thuộc tính đã tồn tại");
        } else {
            if (quantity <= 0 || quantity > 1000) {
                toast.error("Số lượng không hợp lệ");
            }
            else if (color === "" || size === "") {
                toast.error("Màu và kích cỡ không được để trống");
            }
            else {
                setListProductAttribute([...listProductAttribute, { color: color, size: size, quantity: quantity }]);
            }
        }
    }

    const handleGetTypeId = async () => {
        const type = listType.find(type => type.typeName === form.getFieldValue("typeName"));
        return type?.typeId;
    }

    const handleGetBrandId = async () => {
        const brand = listBrand.find(brand => brand.brandName === form.getFieldValue("brandName"));
        return brand?.brandId;
    }
    const handleDeleteAttribute = (index: number) => {
        setListProductAttribute(listProductAttribute.filter((_, i) => i !== index));
    }

    const handleCheckExistAttribute = (color: string, size: string) => {
        return listProductAttribute.some(attribute => attribute.color === color && attribute.size === size);
    }

    const getIndexAttribute = (color: string, size: string) => {
        return listProductAttribute.findIndex(attribute => attribute.color === color && attribute.size === size);
    }

    const handleNewListImage = async (): Promise<ImageResponse[]> => {
        const files = [file1, file2, file3];
        const updatedList: ImageResponse[] = [];

        for (let i = 0; i < 3; i++) {
            const file = files[i];

            if (file) {
                const base64 = await getBase64(file);

                updatedList.push({
                    imageId: "",
                    name: file.name,
                    data: "",
                    url: "/images/product_image/" + file.name
                });
            }
        }
        return updatedList;
    };

    const handleGetListSize = async (value: string) => {
        if (value === "LETTER_SIZE") {
            setListSize(["S", "M", "L", "XL", "XXL", "XXXL"]);
        } else if (value === "SMALL_NUMBER_SIZE") {
            setListSize(["2", "3", "4", "5", "6", "7", "8", "9", "10"]);
        } else if (value === "BIG_NUMBER_SIZE")
            setListSize(["35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45"]);
    }

    const handleGetVNColor = async (value: string) => {
        switch (value) {
            case "RED":
                return "Đỏ";
            case "BLUE":
                return "Xanh";
            case "GREEN":
                return "Xanh lá";
            case "YELLOW":
                return "Vàng";
            case "WHITE":
                return "Trắng";
            case "BLACK":
                return "Đen";
            case "PINK":
                return "Hồng";
            case "PURPLE":
                return "Tím";
            case "ORANGE":
                return "Cam";
            case "BROWN":
                return "Nâu";
            case "GRAY":
                return "Xám";
        }
    }

    const getBase64 = (file: File): Promise<string | null> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result ? (reader.result as string) : null);
            reader.onerror = (error) => reject(error);
        });
    };

    useEffect(() => {
        getAllCategory().then(response => {
            setListCategory(response.listCategories);
        });
    }, []);

    useEffect(() => {
        getAllBrand().then(response => {
            setListBrand(response);
        });
    }, []);

    const handleGetCategorySize = async (value: string) => {
        const category = listCategory.find(category => category.categoriesName === value);
        handleGetListSize(category?.size || "");
    }

    const handleAddProductAttribute = (color: string, size: string, quantity: number) => {
        setListProductAttribute([...listProductAttribute, { color: color, size: size, quantity: quantity }]);
    }

    const handleGetListType = async (value: string) => {
        getTypeByCategoryName(value).then(response => {
            setListType(response);
            form.setFieldsValue({
                typeName: response[0].typeName
            });
            form.setFieldsValue({
                size: ""
            });
            setSize("");
            handleGetCategorySize(value);
        });
        listProductAttribute.length = 0;
        form.setFieldsValue({
            productName: "",
        });
    }

    const handleSubmit = async () => {

        if (listProductAttribute.length === 0) {
            toast.error("Vui lòng thêm ít nhất 1 thuộc tính");
            return;
        }

        if (errorProductName !== "") {
            toast.error(errorProductName);
            return;
        }

        if (form.getFieldValue("importPrice") === undefined || form.getFieldValue("productPrice") === undefined) {
            toast.error("Vui lòng nhập giá nhập và giá bán sản phẩm");
            return;
        }

        if (form.getFieldValue("importPrice") >= form.getFieldValue("productPrice")) {
            toast.error("Giá nhập sản phẩm không được lớn hơn giá bán sản phẩm");
            return;
        }

        const newListImage = await handleNewListImage();
        const product = {
            productName: form.getFieldValue("productName"),
            typeId: await handleGetTypeId(),
            brandId: await handleGetBrandId(),
            importPrice: form.getFieldValue("importPrice"),
            price: form.getFieldValue("productPrice"),
            productDescription: form.getFieldValue("description"),
            listProductAttribute: listProductAttribute,
            listImage: newListImage
        }

        try {
            const url = `http://localhost:8080/api/admin/products/add`;
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(product),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            toast.success("Thêm sản phẩm thành công");
            props.setFlag();
            props.onClose();
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
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
                        <div className="space-y-8 bg-white rounded-lg p-6">
                            <div className="flex items-center justify-between border-b pb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                                        <Edit className="h-6 w-6 text-blue-600" />
                                        Thêm sản phẩm mới
                                    </h2>
                                    <p className="text-gray-500 mt-1">Điền thông tin chi tiết về sản phẩm</p>
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
                                className="mt-8"
                                onFinish={handleSubmit}
                            >
                                <div className="space-y-6 mb-4">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <Form.Item
                                                label={<span className="font-medium text-gray-700 flex items-center gap-2"><Folder className="h-4 w-4" /> Danh mục</span>}
                                                name="categoryName"
                                                rules={[{ required: true, message: 'Vui lòng chọn danh mục' }]}
                                            >
                                                <Select
                                                    placeholder="Chọn danh mục"
                                                    className="rounded-lg w-full"
                                                    onChange={(value) => handleGetListType(value)}
                                                >
                                                    {listCategory.map((category) => (
                                                        <Select.Option key={category.categoriesId} value={category.categoriesName}>
                                                            {category.categoriesName}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label={<span className="font-medium text-gray-700 flex items-center gap-2"><List className="h-4 w-4" /> Loại sản phẩm</span>}
                                                name="typeName"
                                                rules={[{ required: true, message: 'Vui lòng chọn loại' }]}
                                            >
                                                <Select placeholder="Chọn loại" className="rounded-lg w-full" onChange={() => {
                                                    form.resetFields(["productName"]);
                                                    setErrorProductName("");
                                                }}>
                                                    {listType.map((type) => (
                                                        <Select.Option key={type.typeName} value={type.typeName}>{type.typeName}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>

                                            <Form.Item
                                                label={<span className="font-medium text-gray-700 flex items-center gap-2"><Tag className="h-4 w-4" /> Tên sản phẩm</span>}
                                                name="productName"
                                                rules={[{ required: true, message: 'Vui lòng nhập tên sản phẩm' }]}
                                            >
                                                <Input
                                                    placeholder="Nhập tên sản phẩm"
                                                    className="rounded-lg"
                                                    onChange={(e) => {
                                                        form.setFieldsValue({
                                                            productName: e.target.value,
                                                        });
                                                        checkExistsProduct();
                                                    }}
                                                />
                                                {errorProductName && <p className="text-red-500 text-sm">{errorProductName}</p>}
                                            </Form.Item>
                                        </div>

                                        <div className="space-y-6">

                                            <Form.Item
                                                label={<span className="font-medium text-gray-700 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Giá nhập sản phẩm</span>}
                                                name="importPrice"
                                                rules={[{ required: true, message: 'Vui lòng nhập giá nhập sản phẩm' }]}
                                            >
                                                <Input type='number' placeholder="Nhập giá nhập sản phẩm" className="rounded-lg" />
                                            </Form.Item>

                                            <Form.Item
                                                label={<span className="font-medium text-gray-700 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Giá sản phẩm</span>}
                                                name="productPrice"
                                                rules={[{ required: true, message: 'Vui lòng nhập giá bán sản phẩm' }]}
                                            >
                                                <Input type='number' placeholder="Nhập giá sản phẩm" className="rounded-lg" />
                                            </Form.Item>

                                            <Form.Item
                                                label={<span className="font-medium text-gray-700 flex items-center gap-2"><Building className="h-4 w-4" /> Thương hiệu</span>}
                                                name="brandName"
                                                rules={[{ required: true, message: 'Vui lòng chọn thương hiệu' }]}
                                            >
                                                <Select
                                                    placeholder="Chọn thương hiệu"
                                                    className="rounded-lg w-full"
                                                    onChange={() => {
                                                        form.resetFields(["productName"]);
                                                        setErrorProductName("");
                                                    }}
                                                >
                                                    {listBrand.map((brand) => (
                                                        <Select.Option key={brand.brandName} value={brand.brandName}>{brand.brandName}</Select.Option>
                                                    ))}
                                                </Select>
                                            </Form.Item>



                                        </div>
                                        <Form.Item
                                            label={
                                                <span className="font-medium text-gray-700 flex items-center gap-2">
                                                    <FileText className="h-4 w-4" /> Mô tả
                                                </span>
                                            }
                                            name="description"
                                            valuePropName="value"
                                            getValueFromEvent={(content) => content}
                                            className="col-span-2 mb-4"
                                        >

                                            <ReactQuill
                                                theme="snow"
                                                className="bg-white rounded-lg w-full mb-8"
                                                placeholder="Nhập mô tả sản phẩm"
                                                style={{ height: '100px' }}
                                                modules={{
                                                    toolbar: [
                                                      [{ header: [1, 2, 3, false] }],
                                                      ['bold', 'italic', 'underline', 'strike'],
                                                      [{ color: [] }, { background: [] }],
                                                      [{ font: [] }, { size: [] }],
                                                      [{ align: [] }],
                                                      [{ list: 'ordered' }, { list: 'bullet' }],
                                                      ['blockquote', 'code-block'],
                                                      ['link', 'image'],
                                                      ['clean'],
                                                    ]
                                                  }}
                                            />
                                        </Form.Item>
                                    </div>

                                </div>


                                <div className="mt-4 space-y-6">
                                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <Image className="h-5 w-5 text-blue-600" />
                                        Hình ảnh sản phẩm
                                    </h3>
                                    <div className="grid grid-cols-3 gap-6">
                                        <Form.Item
                                            label={<span className="font-medium text-gray-700">Ảnh chính</span>}
                                            name="image1"
                                        >
                                            <div className="space-y-2">
                                                <Input type="file" onChange={(e) => setFile1(e.target.files?.[0] || null)} className="rounded-lg" />
                                            </div>
                                        </Form.Item>

                                        <Form.Item
                                            label={<span className="font-medium text-gray-700">Ảnh phụ 1</span>}
                                            name="image2"
                                        >
                                            <div className="space-y-2">
                                                <Input type="file" onChange={(e) => setFile2(e.target.files?.[0] || null)} className="rounded-lg" />
                                            </div>
                                        </Form.Item>

                                        <Form.Item
                                            label={<span className="font-medium text-gray-700">Ảnh phụ 2</span>}
                                            name="image3"
                                        >
                                            <div className="space-y-2">
                                                <Input type="file" onChange={(e) => setFile3(e.target.files?.[0] || null)} className="rounded-lg" />
                                            </div>
                                        </Form.Item>
                                    </div>
                                </div>

                                <div className="mt-8 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                <List className="h-5 w-5 text-blue-600" />
                                                Quản lý thuộc tính
                                            </h3>
                                            <p className="text-gray-500 mt-1">Thêm các thuộc tính màu sắc và kích cỡ của sản phẩm</p>
                                        </div>
                                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                                            <Hash className="h-4 w-4" />
                                            Tổng số: {listProductAttribute.length} thuộc tính
                                        </span>
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-700 mb-2">Chọn màu</div>
                                                <Select
                                                    placeholder="Chọn màu"
                                                    className="w-full rounded-lg"
                                                    onChange={(value) => setColor(value)}
                                                >
                                                    {listColor.map((color) => (
                                                        <Select.Option key={color} value={color} style={{ backgroundColor: color }}>
                                                            {handleGetVNColor(color)}
                                                        </Select.Option>
                                                    ))}
                                                </Select>
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-700 mb-2">Chọn kích cỡ</div>
                                                <Form.Item name="size" rules={[{ message: 'Vui lòng chọn kích cỡ' }]} className="mb-0">
                                                    <Select
                                                        placeholder="Chọn kích cỡ"
                                                        className="w-full rounded-lg"
                                                        onChange={(value) => setSize(value)}
                                                    >
                                                        {listSize.map((size_item) => (
                                                            <Select.Option key={size_item} value={size_item}>{size_item}</Select.Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </div>

                                            <div className="flex-1">
                                                <div className="text-sm font-medium text-gray-700 mb-2">Số lượng</div>
                                                <Input
                                                    type="number"
                                                    placeholder="Nhập số lượng"
                                                    className="rounded-lg"
                                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                                />
                                            </div>

                                            <Button
                                                type="primary"
                                                className="flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 mt-6"
                                                onClick={() => handleAddAttribute()}
                                            >
                                                <Plus className="h-4 w-4" />
                                                Thêm thuộc tính
                                            </Button>
                                        </div>
                                    </div>

                                    <Table
                                        dataSource={listProductAttribute}
                                        className="bg-white rounded-xl shadow-sm border border-gray-100"
                                        size="middle"
                                        pagination={{
                                            showSizeChanger: true,
                                            pageSizeOptions: ['5', '10', '15', '20'],
                                            showTotal: (total) => `Tổng ${total} thuộc tính`,
                                            className: 'mt-4'
                                        }}
                                        scroll={{ y: 400, x: 'max-content' }}
                                    >
                                        <Column
                                            title="Màu sắc"
                                            align='center'
                                            dataIndex="color"
                                            key="color"
                                            width={120}
                                            render={(color) => (
                                                <div className="flex justify-center items-center">
                                                    <div
                                                        className="w-6 h-6 rounded-full border border-gray-300 shadow-sm transition-transform duration-200 hover:scale-110"
                                                        style={{ backgroundColor: color }}
                                                    />
                                                </div>
                                            )}
                                        />

                                        <Column
                                            title="Kích cỡ"
                                            align='center'
                                            dataIndex="size"
                                            key="size"
                                            width={120}
                                            render={(size) => (
                                                <Tag className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">{size}</Tag>
                                            )}
                                        />

                                        <Column
                                            title="Số lượng"
                                            align='center'
                                            dataIndex="quantity"
                                            key="quantity"
                                            width={150}
                                            render={(quantity) => (
                                                <span className="font-medium text-blue-600">
                                                    {quantity.toLocaleString("vi-VN")}
                                                </span>
                                            )}
                                        />
                                        <Column
                                            title="Thao tác"
                                            align='center'
                                            key="action"
                                            dataIndex={["color", "size"]}
                                            fixed="right"
                                            width={120}
                                            render={(_: unknown, record: ProductAttributeRequest) => (
                                                <div className="flex justify-center items-center">
                                                    <Button
                                                        type="link"
                                                        icon={<Delete className="h-4 w-4" />}
                                                        size='small'
                                                        className="text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors duration-200"
                                                        onClick={() => handleDeleteAttribute(getIndexAttribute(record.color, record.size))}
                                                    />
                                                </div>
                                            )}
                                        />
                                    </Table>
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
                                        <span>Lưu sản phẩm</span>
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

export default AdminAddProduct;