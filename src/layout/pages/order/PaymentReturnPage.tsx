import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Result } from "antd";

const PaymentReturnPage: React.FC = () => {
  const location = useLocation();
  const { status } = useParams(); 

  const isSuccess = status === "success";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-6">
        <Result
          status={isSuccess ? "success" : "error"}
          title={
            isSuccess
              ? "Thanh toán thành công!"
              : "Thanh toán thất bại!"
          }
          subTitle={
            isSuccess
              ? "Cảm ơn bạn đã mua hàng. Đơn hàng đang được xử lý."
              : "Đã xảy ra lỗi trong quá trình thanh toán hoặc giao dịch bị hủy."
          }
          extra={[
            <Button type="primary" href="/" key="home">
              Về trang chủ
            </Button>,
          ]}
        />
      </div>
    </div>
  );
};

export default PaymentReturnPage;
