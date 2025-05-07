import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

interface ModalProps {
  orderId: string;
  onClose: () => void;
  setFlag: () => void;
}

const OrderCancel: React.FC<ModalProps> = (props) => {

    const [orderCancelNote, setOrderCancelNote] = useState("");

    console.log(props.orderId);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const url = `http://localhost:8080/api/orders/cancelOrder`;
            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  orderId: props.orderId,
                  orderCancelNote: orderCancelNote
                })
            });
            if(response.ok){
                props.onClose();
                toast.success("Hủy đơn hàng thành công");
                props.setFlag();
            }  
            else{
                props.onClose();
                toast.error("Hủy đơn hàng thất bại");
            }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.target === e.currentTarget && props.onClose()}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-xl p-8 w-full max-w-2xl mx-4"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Xác nhận hủy đơn hàng</h2>
            <button
              onClick={props.onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <i className="fas fa-exclamation-triangle text-red-500"></i>
              </div>
              <p className="text-gray-600 text-lg">Bạn có chắc chắn muốn hủy đơn hàng này?</p>
            </div>
            <p className="text-gray-500 pl-13">Hành động này không thể hoàn tác. Vui lòng xác nhận lý do hủy đơn hàng của bạn.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">Lý do hủy đơn hàng</label>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                placeholder="Vui lòng nhập lý do hủy đơn hàng của bạn..."
                value={orderCancelNote}
                onChange={(e) => setOrderCancelNote(e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={props.onClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm"
              >
                Xác nhận hủy
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderCancel;
