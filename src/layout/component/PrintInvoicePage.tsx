// PrintInvoicePage.tsx
import React, { useRef } from "react";
import Invoice from "./Invoice";
import { useReactToPrint, UseReactToPrintOptions } from "react-to-print";
import { Modal } from "antd";

interface PrintInvoicePageProps {
    orderId: string;
    customerName: string;
    address: string;
    phone: string;
    email: string;

    items: {
        name: string;
        quantity: number;
        price: number;
        color: string;
        size: string;
    }[];
    total: number;
    onClose: () => void;
    visible: boolean;
}

const PrintInvoicePage: React.FC<PrintInvoicePageProps> = ({
    orderId,
    customerName,
    address,
    phone,
    email,
    items,
    total,
    onClose,
    visible
}) => {

    const invoiceRef = useRef<HTMLDivElement>(null);

    const handlePrint = useReactToPrint({
        contentRef: invoiceRef,
        onAfterPrint: onClose,
        documentTitle: `Hóa đơn ${orderId}`,
    });


    return (
        <div>
            <Modal
                title="In hóa đơn"
                open={visible}
                onCancel={onClose}
                className="w-full"
                footer={[
                    <button key="print" onClick={handlePrint} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        In hóa đơn
                    </button>,
                    <button key="close" onClick={onClose} className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 ml-2">
                        Đóng
                    </button>,
                ]}
                width={800}
            >
                <div className="p-6 w-full">
                    <div ref={invoiceRef}>
                        <Invoice
                            orderId={orderId}
                            customerName={customerName}
                            address={address}
                            phone={phone}
                            email={email}
                            items={items}
                            total={total}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default PrintInvoicePage;
