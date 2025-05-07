import { ConfigProvider, Input, Form, Button, Select } from "antd";
import { MyAddressResponse } from "../../../api/interface/Responses";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getProvinces, getDistricts, getWards } from "../../../api/user/AddressAPI";
import { District, Province, Ward } from "../../../api/interface/Responses";
import { toast } from "react-toastify";
import { User, Phone, Building2, Home, MapPin } from 'lucide-react';

interface ModalProps {
    myAddress: MyAddressResponse | undefined;
    onClose: () => void;
    setFlag: () => void;
}

const EditMyAddress: React.FC<ModalProps> = (props) => {
    const [form] = Form.useForm();
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");

    useEffect(() => {
        // Load provinces
        getProvinces()
            .then(provincesData => {
                setProvinces(provincesData);
            })
            .catch(error => {
                console.error('Error loading provinces:', error);
                toast.error("Không thể tải danh sách tỉnh/thành phố!");
            });
    }, []);

    // Set initial values when myAddress changes
    useEffect(() => {
        if (props.myAddress) {
            form.setFieldsValue({
                toName: props.myAddress.toName,
                toPhone: props.myAddress.toPhone,
                toProvince: props.myAddress.toProvince,
                toDistrict: props.myAddress.toDistrict,
                toWard: props.myAddress.toWard,
                toAddress: props.myAddress.toAddress
            });
            setSelectedProvince(handleProvinceCode(props.myAddress.toProvince));
        }
    }, [props.myAddress, form]);

    const handleProvinceCode = (provinceName: string) => {
        const province = provinces.find(p => p.ProvinceName == provinceName + "");
        return province ? province.ProvinceCode : '';
    }

    const handleDistrictCode = (districtCode: string) => {
        const district = districts.find(d => d.DistrictCode == districtCode);
        return district ? district.DistrictCode : '';
    }

    useEffect(() => {
        if (selectedProvince) {
            form.setFieldValue("toDistrict", null)
            getDistricts(selectedProvince)
                .then(districtsData => {
                    setDistricts(districtsData);
                    if (props.myAddress?.toDistrict) {
                        setSelectedDistrict(handleDistrictCode(props.myAddress.toDistrict));
                    } else {
                        setWards([]);
                        setSelectedDistrict('');
                    }
                })
                .catch(error => {
                    console.error('Error loading districts:', error);
                    toast.error("Không thể tải danh sách quận/huyện!");
                });
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            form.setFieldValue("toWard", null)
            getWards(selectedDistrict)
                .then(wardsData => {
                    setWards(wardsData);
                })
                .catch(error => {
                    console.error('Error loading wards:', error);
                    toast.error("Không thể tải danh sách phường/xã!");
                });
        }
    }, [selectedDistrict]);

    const handleProvinceName = (provinceCode: string) => {
        const province = provinces.find(p => p.ProvinceCode == provinceCode + "");
        return province ? province.ProvinceName : provinceCode;
    }
    const handleDistrictName = (districtCode: string) => {
        const district = districts.find(d => d.DistrictCode == districtCode);
        return district ? district.DistrictName : districtCode;
    }
    const handleWardName = (wardCode: string) => {
        const ward = wards.find(w => w.WardCode == wardCode);
        return ward ? ward.WardName : wardCode;
    }

    const handleSubmit = async (values: any) => {

        if (values.toDistrict == "") {
            toast.error("Vui lòng chọn quận/huyện!");
            return;
        }

        if (values.toWard == "") {
            toast.error("Vui lòng chọn phường/xã!");
            return;
        }



        try {
            const response = await fetch('http://localhost:8080/api/address/updateAddress', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    addressId: props.myAddress?.addressId,
                    toName: values.toName,
                    toPhone: values.toPhone,
                    toProvince: handleProvinceName(values.toProvince),
                    toDistrict: handleDistrictName(values.toDistrict),
                    toWard: handleWardName(values.toWard),
                    toAddress: values.toAddress
                }),
            });

            if (response.ok) {
                toast.success("Cập nhật địa chỉ thành công!");
                props.setFlag();
                props.onClose();
            } else {
                toast.error("Cập nhật địa chỉ thất bại!");
            }
        } catch (error) {
            toast.error("Cập nhật địa chỉ thất bại!");
        }
    };

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
                        className="bg-white rounded-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                    >
                        <h2 className="text-2xl font-bold mb-6">Chỉnh sửa địa chỉ</h2>
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="toName"
                                label={
                                    <span className="flex items-center text-gray-700">
                                        <User className="h-4 w-4 mr-2 text-gray-500" />
                                        Tên người nhận
                                    </span>
                                }
                                rules={[{ required: true, message: 'Vui lòng nhập tên người nhận!' }]}
                            >
                                <Input
                                    placeholder="Nhập tên người nhận"

                                />
                            </Form.Item>

                            <Form.Item
                                name="toPhone"
                                label={
                                    <span className="flex items-center text-gray-700">
                                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                        Số điện thoại
                                    </span>
                                }
                                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
                            >
                                <Input
                                    placeholder="Nhập số điện thoại"

                                />
                            </Form.Item>

                            <Form.Item
                                name="toProvince"
                                label={
                                    <span className="flex items-center text-gray-700">
                                        <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                        Tỉnh/Thành phố
                                    </span>
                                }
                                rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}
                            >
                                <Select
                                    placeholder="Chọn tỉnh/thành phố"
                                    onChange={(value) => {
                                        setSelectedProvince(value);
                                    }}
                                >
                                    {provinces.map(province => (
                                        <Select.Option key={province.ProvinceCode} value={province.ProvinceCode}>
                                            {province.ProvinceName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="toDistrict"
                                label={
                                    <span className="flex items-center text-gray-700">
                                        <Building2 className="h-4 w-4 mr-2 text-gray-500" />
                                        Quận/Huyện
                                    </span>
                                }
                                rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
                            >
                                <Select
                                    placeholder="Chọn quận/huyện"
                                    onChange={(value) => setSelectedDistrict(value)}
                                    disabled={!selectedProvince}
                                >
                                    {districts.map(district => (
                                        <Select.Option key={district.DistrictCode} value={district.DistrictCode}>
                                            {district.DistrictName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="toWard"
                                label={
                                    <span className="flex items-center text-gray-700">
                                        <Home className="h-4 w-4 mr-2 text-gray-500" />
                                        Phường/Xã
                                    </span>
                                }
                                rules={[{ required: true, message: 'Vui lòng chọn phường/xã!' }]}
                            >
                                <Select
                                    placeholder="Chọn phường/xã"
                                    disabled={!selectedDistrict}
                                >
                                    {wards.map(ward => (
                                        <Select.Option key={ward.WardCode} value={ward.WardCode}>
                                            {ward.WardName}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="toAddress"
                                label={
                                    <span className="flex items-center text-gray-700">
                                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                                        Địa chỉ chi tiết
                                    </span>
                                }
                                rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết!' }]}
                            >
                                <Input
                                    placeholder="Nhập địa chỉ chi tiết"
                                />
                            </Form.Item>

                            <div className="flex justify-end space-x-4 mt-6">
                                <Button onClick={props.onClose}>
                                    Hủy
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Lưu thay đổi
                                </Button>
                            </div>
                        </Form>
                    </motion.div>
                </motion.div>
            </AnimatePresence>
        </ConfigProvider>
    );
};

export default EditMyAddress;