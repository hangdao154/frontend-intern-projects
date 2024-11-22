export interface IBadgeFilter {
    rank?: string;
    status?: string;
    page: number;
    limit: number;
}

export interface BadgesMeta {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
}