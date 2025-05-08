import { useEffect, useState } from "react";
import { MyAddressResponse } from "../../../api/interface/Responses";
import { getAddress } from "../../../api/user/MyAddressAPI";
import { toast } from "react-toastify";
import { Button, Card, ConfigProvider, Modal, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import EditMyAddress from "./EditMyAddress";
import { Pencil, Plus, Trash } from "lucide-react";
import AddMyAddress from "./AddMyAddress";

const MyAddress: React.FC = () => {

    const [listMyAddress, setListMyAddress] = useState<MyAddressResponse[]>([]);
    const [selectAddress, setSelectAddress] = useState<MyAddressResponse>();
    const [showEditMyAddress, setShowEditMyAddress] = useState(false);
    const [flag, setFlag] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showAddMyAddress, setShowAddMyAddress] = useState(false);
    useEffect(() => {
        getAddress()
            .then(response => {
                setListMyAddress(response);
            })
            .catch(
                error => {
                    toast.error("Không lấy được thông tin người dùng!");
                }
            )
    }
        , [flag])

    const deleteAddress = async () => {

        const response = await fetch(`http://localhost:8080/api/my-address/delete-by-id?addressId=${selectAddress?.addressId}`,
            {
                method: "DELETE",
                credentials: 'include'
            }
        )

        if (response.ok) {
            toast.success("Xóa địa chỉ thành công");
            setFlag(!flag)
        }

    }

    return (
        <ConfigProvider getPopupContainer={() => document.body}>

            <Modal
                open={showDeleteConfirm}
                onCancel={() => setShowDeleteConfirm(false)}
                onOk={() => {

                    deleteAddress();
                    setShowDeleteConfirm(false);
                }}
                title={
                    <div className="flex items-center gap-2">
                        <i className="fas fa-exclamation-triangle text-yellow-500 text-xl"></i>
                        <span>Xác nhận xóa địa chỉ nhận hàng</span>
                    </div>
                }
                okText="Xác nhận xóa"
                cancelText="Quay lại"
                centered
                okButtonProps={{ className: "bg-red-600 hover:bg-red-700" }}
                cancelButtonProps={{ className: "hover:bg-gray-100" }}
                className="modal-custom"
            >
                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 font-medium">Hành động này không thể hoàn tác.</p>
                    <p className="text-yellow-700 mt-2">Địa chỉ này sẽ bị xóa khỏi hồ sơ người dùng!</p>
                </div>
            </Modal>
            <div>
                <Card title="Địa chỉ nhận hàng" className="shadow-lg">

                    <div className="flex flex-col gap-4 mb-4">
                        {listMyAddress.length >= 3 && (
                            <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <i className="fas fa-exclamation-circle text-yellow-500"></i>
                                <span className="text-yellow-700 font-medium">Số địa chỉ nhận hàng đã đạt tối đa (3 địa chỉ)</span>
                            </div>
                        )}

                        <div className="flex justify-end">
                            <Button
                                disabled={listMyAddress.length >= 3}
                                type="primary"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={() => setShowAddMyAddress(true)}
                            >
                                <Plus className="h-5 w-5" />
                                Thêm địa chỉ nhận hàng
                            </Button>
                        </div>
                    </div>

                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Table
                            dataSource={listMyAddress}
                            className="shadow-sm"
                            pagination={false}
                        >
                            <Column
                                title="Người nhận"
                                dataIndex="toName"
                                key="toName"
                            />

                            <Column
                                title="Số ĐT"
                                dataIndex="toPhone"
                                key="toPhone"
                            />

                            <Column
                                title="Tỉnh"
                                dataIndex="toProvince"
                                key="toProvince"
                            />

                            <Column
                                title="Huyện"
                                dataIndex="toDistrict"
                                key="toDistrict"
                            />

                            <Column
                                title="Xã"
                                dataIndex="toWard"
                                key="toWard"
                            />

                            <Column
                                title="Địa chỉ nhận"
                                dataIndex="toAddress"
                                key="toAddress"
                            />
                            <Column
                                title="Thao tác"
                                align='center'
                                key="action"
                                render={(_, record: MyAddressResponse) => (
                                    <div>
                                        <Button
                                            type="primary"
                                            onClick={
                                                () => {
                                                    setSelectAddress(record);
                                                    setShowEditMyAddress(true);
                                                }
                                            }
                                            icon={<Pencil className="h-4 w-4 mr-2" />}
                                        >
                                            Sửa
                                        </Button>

                                        <Button
                                            type="primary"
                                            className=" ml-4 bg-red-600 text-white-600 rounded-lg hover:bg-red-200"
                                            onClick={
                                                () => {
                                                    setSelectAddress(record);
                                                    setShowDeleteConfirm(true);
                                                    console.log(showEditMyAddress);
                                                }
                                            }
                                            icon={<Trash className="h-4 w-4 mr-2" />}
                                        >
                                            Xóa
                                        </Button>
                                    </div>
                                )
                                }
                            />


                        </Table>
                    </Space>
                </Card>
                {
                    showEditMyAddress && (<EditMyAddress myAddress={selectAddress} onClose={() => setShowEditMyAddress(false)} setFlag={() => setFlag(!flag)} />)
                }
                {
                    showAddMyAddress && (<AddMyAddress onClose={() => setShowAddMyAddress(false)} setFlag={() => setFlag(!flag)}></AddMyAddress>)
                }
            </div>
        </ConfigProvider>
    );
}
export default MyAddress;