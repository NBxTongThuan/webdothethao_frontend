export interface TopBuyerResponse{
    user: UserResponse;
    totalBuy: number;
}

export interface CountRateOrder{
    orderCancel: number;
    orderDelivered: number;
    // orderProcessing: number;
    // orderReceived: number;
}

export interface ChatMessageResponse {
    sender: string;
    receiver: string;
    content: string;
    createdAt: string;
}


//MyAddressResponse
export interface MyAddressResponse{

    addressId: string;
    toName: string;
    toPhone: string;
    toDistrict: string;
    toProvince: string;
    toWard: string;
    toAddress: string;

}


//NotificationResponse
export interface NotificationResponse {
    notificationId: string;
    title: string;
    content: string;
    createdDate: string;
    orderId: string;
    userId: string;
    read: boolean;
}

//UserInfoResponse
export interface UserInfoResponse {
    userName: string;
    cartId: string;
    role: string;
}
//UserResponse
export interface UserResponse {
    userId: string;
    username: string;
    email: string;
    role: string;
    active: boolean;
    createdDate: string;
    enable: boolean;
}

//RevenueResponse
export interface RevenueResponse {
    date: string;
    total: number;
}

//InterestResponse
export interface InterestResponse {
    date: string;
    total: number;
}

//UserStatsResponse
export interface UserStatsResponse {
    currentMonthTotal: number;
    lastMonthTotal: number;
    percentChange: number;
}

// OrderResponse
export interface OrderResponse {
    orderId: string;
    status: string;
    createdDate: string;
    toName: string;
    toPhone: string;
    toEmail: string;
    toProvince: string;
    toDistrict: string;
    toWard: string;
    toAddress: string;
    orderNote: string;
    orderNoteCanceled: string;
    totalPrice: number;
    shipFee: number;
    totalMoneyOff: number;
    finalPrice: number;
    dateReceive: string;
    dateExpected: string;
    dateCancel: string;
}

// OrderItemResponse
export interface OrderItemResponse {
    orderItemId: string;
    finalPrice: number;
    originalPrice: number;
    quantity: number;
    reviewed: boolean;
    moneyOffPerOneProduct: number;
    orderId: string;
    color: string;
    size: string;
    productName: string;
    productId: string;
    productAttributeId: string;
}

// AdminOrderResponse
export interface AdminOrderResponse {
    orderId: string;
    status: string;
    createdDate: string;
    toName: string;
    toPhone: string;
    toEmail: string;
    totalImportPrice: number;
    toProvince: string;
    toDistrict: string;
    toWard: string;
    toAddress: string;
    orderNote: string;
    orderNoteCanceled: string;
    totalPrice: number;
    shipFee: number;
    totalMoneyOff: number;
    finalPrice: number;
    dateReceive: string;
    dateExpected: string;
    dateCancel: string;
}

// OrderItemResponse
export interface AdminOrderItemResponse {
    orderItemId: string;
    finalPrice: number;
    originalPrice: number;
    quantity: number;
    reviewed: boolean;
    moneyOffPerOneProduct: number;
    importPrice: number;
    orderId: string;
    color: string;
    size: string;
    productName: string;
    productId: string;
    productAttributeId: string;
}

//PaymentResponse
export interface PaymentResponse {
    paymentId: string;
    createdDate: string;
    paymentMethod: string;
    paymentStatus: string;
    orderId: string;
}

//ImageResponse
export interface ImageResponse {
    imageId: string;
    data: string;
    url: string;
    name: string;
}

//AdminProductResponse
export interface AdminProductResponse {
    productId: string;
    productName: string;
    description: string;
    quantitySold: number;
    importPrice: number;
    price: number;
    moneyOff: number;
    typeName: string;
    categoryName: string;
    brandName: string;
    inStock: boolean;
}

//ProductResponse
export interface ProductResponse {
    productId: string;
    productName: string;
    description: string;
    quantitySold: number;
    price: number;
    moneyOff: number;
    typeName: string;
    categoryName: string;
    brandName: string;
    inStock: boolean;
}

//BrandResponse
export interface BrandResponse {
    brandId: number;
    brandName: string;
    country: string;
}

// ReviewResponse
export interface Review {
    reviewId: string;
    rating: number;
    comment: string;
    createdDate: string;
    edited: boolean;
}

//CategoryResponse
export interface CategoryResponse {
    categoriesId: number;
    categoriesName: string;
    imageData: string;
    enable: boolean;
    size: string;
}


//AdminProductAttributeResponse
export interface ProductAttributeResponse {
    productAttributeId: string;
    color: string;
    size: string;
    quantity: number;
    quantitySold: number;
    enable: boolean;
}

//TypeResponse
export interface TypesResponse {
    typeId: number;
    typeName: string;
    enable: boolean;
    categoryName: string;
}

// ProvinceResponse
export interface Province {
    ProvinceCode: string;
    ProvinceName: string;
}

// DistrictResponse
export interface District {
    DistrictCode: string;
    DistrictName: string;
}

// WardResponse
export interface Ward {
    WardCode: string;
    WardName: string;
}


