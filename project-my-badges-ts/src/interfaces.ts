import { ReactElement } from "react";

interface BadgeListItem {
    name: string,
    description: string,
    type: string,
    rank: string,   //tier
    howToEarn: string,
    badgeImg: ReactElement,
    button: ReactElement,   //flag
    status: string
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