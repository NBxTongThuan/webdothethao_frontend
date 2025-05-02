import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Typography, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const OrderSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-5 text-center">
            <CheckCircleOutlined 
                style={{ 
                    fontSize: '80px', 
                    color: '#52c41a',
                    marginBottom: '24px'
                }} 
            />
            <Title level={2} className="mb-4">
                Đặt hàng thành công!
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-8 max-w-[600px]">
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ xử lý đơn hàng của bạn trong thời gian sớm nhất.
                Bạn có thể theo dõi trạng thái đơn hàng trong phần "Đơn hàng của tôi".
            </Paragraph>
            <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/')}
            >
                Quay về trang chủ
            </Button>
        </div>
    );
};

export default OrderSuccess;
