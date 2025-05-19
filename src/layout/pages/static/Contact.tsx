import React, { useState } from 'react';

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

const Contact: React.FC = () => {
    const [formData, setFormData] = useState<ContactForm>({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Xử lý gửi form ở đây
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-red-500 text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4 text-left">Liên hệ với chúng tôi</h1>
                    <p className="text-lg text-left">Hãy để lại thông tin, chúng tôi sẽ phản hồi sớm nhất có thể</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Contact Information */}
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">Thông tin liên hệ</h2>
                        
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="bg-red-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-map-marker-alt text-red-500"></i>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Địa chỉ</h3>
                                    <p className="text-gray-600">
                                        Số 30, Phùng Khoang, Hà Đông, Hà Nội<br />
                                        Việt Nam
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-red-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-phone text-red-500"></i>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Điện thoại</h3>
                                    <p className="text-gray-600">
                                       0869 325 957
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-red-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-envelope text-red-500"></i>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">
                                        tongthuan15092003@gmail.com<br />
                                        support@yousport.com
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start">
                                <div className="bg-red-100 p-3 rounded-full mr-4">
                                    <i className="fas fa-clock text-red-500"></i>
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 mb-1">Giờ làm việc</h3>
                                    <p className="text-gray-600">
                                        Thứ 2 - Thứ 6: 8:00 - 18:00<br />
                                        Thứ 7: 8:00 - 12:00<br />
                                        Chủ nhật: Nghỉ
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-8">
                            <h3 className="font-semibold text-gray-900 mb-4 text-left">Kết nối với chúng tôi</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/thuan.tong.15092003" className="bg-red-100 p-3 rounded-full text-red-500 hover:bg-red-200 transition-colors">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className="bg-red-100 p-3 rounded-full text-red-500 hover:bg-red-200 transition-colors">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="#" className="bg-red-100 p-3 rounded-full text-red-500 hover:bg-red-200 transition-colors">
                                    <i className="fab fa-twitter"></i>
                                </a>
                                <a href="#" className="bg-red-100 p-3 rounded-full text-red-500 hover:bg-red-200 transition-colors">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">Gửi tin nhắn</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Họ tên
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Chủ đề
                                </label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                >
                                    <option value="">Chọn chủ đề</option>
                                    <option value="general">Thông tin chung</option>
                                    <option value="product">Sản phẩm</option>
                                    <option value="order">Đơn hàng</option>
                                    <option value="support">Hỗ trợ kỹ thuật</option>
                                    <option value="other">Khác</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                                    Nội dung
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                            >
                                Gửi tin nhắn
                            </button>
                        </form>
                    </div>
                </div>

                {/* Map */}
                <div className="mt-12">
                    <div className="bg-white rounded-xl shadow-md p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-left">Bản đồ</h2>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.269311477489!2d106.70042331531915!3d10.779160392316246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752d9a092f0363%3A0xfe352995d5743ff8!2sLandmark%2081!5e0!3m2!1svi!2s!4v1647689123456!5m2!1svi!2s"
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact; 