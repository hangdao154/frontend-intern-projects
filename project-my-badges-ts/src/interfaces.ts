import { ReactElement } from "react";

interface BadgeListItem {
    id?: number,
    name?: string,
    createdAt?: string,
    isDeleted?: string,
    updatedAt?: string,
    rank?: string,   //tier
    status?: string,
    description: string,
    type: string,
    howToEarn: string,
    badgeImg: string,
    button: string,   //flag
    pinnedStatus: boolean,
}

interface Friend {
    walletAddress: string,
    joinedDate: Date,
    level: number,
    earnedPoints: number,
    refereeCount: number,
    yourRefereeRewards: number
}

interface PointData {
    transactionDate: Date,
    taskName: string,
    earnedPoints: number,
    refereeAdress: string,
    relatedPost: string,
    status: string
}

export type { BadgeListItem, Friend, PointData }