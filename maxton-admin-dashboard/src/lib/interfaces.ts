import { ReactElement } from "react";

export type MenuItem = {
    key: string;
    label: string;
    icon?: ReactElement;
    children?: MenuItem[];
};

export interface Product {
    _id: string,
    title: string,
    description: string,
    isActive: boolean,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    image: string,
    price: number,
    category: string,
    vendor: string,
    tags: string | string,
    rating: number,
    date: string,
}

export interface Customer {
    _id: string,
    name?: string,
    avatar?: string,
    firstName: string,
    lastName: string,
    image: string,
    password: string,
    email: string,
    role: string,
    codeId: string,
    codeIdExpiresAt: string,
    isActive: boolean,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    totalOrder: number,
    totalPaid: number,
    orders: Array<any>
    location?: string,
    lastSeen?: string,
    lastOrder?: string
}

export interface Order {
    userId: any,
    orderId: number,
    price: number,
    customerName: string,
    paymentStatus: string,
    completedPayment: string,
    deliveryType: string,
    date: string,
}

export interface GetProductQueries {
    limit?: number,
    page: number,
    keyword?: string,
    sortKey?: string,
    sortValue?: string,
    category?: string,
    vendor?: string,
    collection?: string,
}

export interface GetCustomerQueries {
    limit?: number,
    page: number,
    keyword?: string,
    sortKey?: string,
    sortValue?: string,
}


export interface GetOrderQueries {
    limit?: number,
    page: number,
    keyword?: string,
    sortKey?: string,
    sortValue?: string,
}

export type NotificationType = 'success' | 'error';