import { useState } from "react"
import axios from "axios"
import { IBadgeFilter, BadgesMeta } from "../constants/interfaces";
import { BadgeListItem } from "../../../interfaces";

export const STATUS_BTN_BADGES = {
    CLAIMED: "claimed",
    NOT_CLAIM: "not-claim",
    UNAVAILABLE: "unavailable",
}

export default function useBadges(userId: number) {
    const API_URL = import.meta.env.VITE_API_URL;
    const USER_URL = `${API_URL}/users/${userId}/badges`;

    const [fetchedData, setFetchedData] = useState<Partial<BadgeListItem>[]>([])
    const [fetchedMeta, setFetchedMeta] = useState<BadgesMeta>({ totalItems: 0, itemCount: 0, itemsPerPage: 0, totalPages: 1, currentPage: 1 })
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const getBadges = async (params?: IBadgeFilter) => {
        setIsLoading(true)
        const searchParams: URLSearchParams = new URLSearchParams()
        if (params?.rank) searchParams.append('rank', params.rank)
        if (params?.status) searchParams.append('status', params.status)
        const url = `${USER_URL}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`

        try {
            const response = await axios.get(url);
            setFetchedData(response.data.items)
            setFetchedMeta(response.data.meta);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    return { isLoading, fetchedData, fetchedMeta, getBadges}
}