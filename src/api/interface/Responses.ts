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
    dateReceive: string;
    dateExpected: string;
    dateCancel: string
}

// OrderItemResponse
export interface OrderItemResponse {
    orderItemId: string;
    price: number;
    quantity: number;
    orderId: string;
    color: string;
    size: string;
    productName: string;
    productId: string;
    productAttributeId: string;
    reviewed: boolean;
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

//ProductResponse
export interface ProductResponse {
    productId: string;
    productName: string;
    description: string;
    quantitySold: number;
    price: number;
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


