import MyBadges from "./MyBadges";
import FriendList from "./FriendList";
import PointHistory from "./PointHistory";

import { Friend, PointData } from '../../../interfaces';

interface Props {
    page: number
}

export default function TaskSection(props: Props) {
    const { page } = props;

    /*============== Test data ==============*/
    const transL: Array<PointData> = [{
        transactionDate: new Date(),
        taskName: "Authorise X(Twitter) Account",
        earnedPoints: 100000000,
        refereeAdress: "...",
        relatedPost: "...",
        status: "Successful"
    }, {
        transactionDate: new Date(),
        taskName: "Authorise Linkedin Account",
        earnedPoints: 20000000,
        refereeAdress: "...",
        relatedPost: "...",
        status: "Failed"
    }, {
        transactionDate: new Date(),
        taskName: "Authorise Facebook Account",
        earnedPoints: 900000,
        refereeAdress: "...",
        relatedPost: "...",
        status: "Verifying"
    }, {
        transactionDate: new Date(),
        taskName: "Authorise X(Twitter) Account",
        earnedPoints: 100000000,
        refereeAdress: "...",
        relatedPost: "...",
        status: "Successful"
    }, {
        transactionDate: new Date(),
        taskName: "Authorise Linkedin Account",
        earnedPoints: 20000000,
        refereeAdress: "...",
        relatedPost: "...",
        status: "Failed"
    }, {
        transactionDate: new Date(),
        taskName: "Authorise Facebook Account",
        earnedPoints: 900000,
        refereeAdress: "...",
        relatedPost: "...",
        status: "Verifying"
    }]
    const friendL: Array<Friend> = [{
        walletAddress: "B",
        joinedDate: new Date(),
        level: 90,
        earnedPoints: 20000000,
        refereeCount: 15000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "A",
        joinedDate: new Date(),
        level: 60,
        earnedPoints: 100000,
        refereeCount: 200000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "D",
        joinedDate: new Date(),
        level: 70,
        earnedPoints: 100000,
        refereeCount: 100000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "B",
        joinedDate: new Date(),
        level: 90,
        earnedPoints: 20000000,
        refereeCount: 15000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "A",
        joinedDate: new Date(),
        level: 60,
        earnedPoints: 100000,
        refereeCount: 200000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "D",
        joinedDate: new Date(),
        level: 70,
        earnedPoints: 100000,
        refereeCount: 100000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "B",
        joinedDate: new Date(),
        level: 90,
        earnedPoints: 20000000,
        refereeCount: 15000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "A",
        joinedDate: new Date(),
        level: 60,
        earnedPoints: 100000,
        refereeCount: 200000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "D",
        joinedDate: new Date(),
        level: 70,
        earnedPoints: 100000,
        refereeCount: 100000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "B",
        joinedDate: new Date(),
        level: 90,
        earnedPoints: 20000000,
        refereeCount: 15000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "A",
        joinedDate: new Date(),
        level: 60,
        earnedPoints: 100000,
        refereeCount: 200000,
        yourRefereeRewards: 100000
    }, {
        walletAddress: "D",
        joinedDate: new Date(),
        level: 70,
        earnedPoints: 100000,
        refereeCount: 100000,
        yourRefereeRewards: 100000
    }];
    /*========================================*/

    const handleSort = (data: Array<any>, sortInfo: { keyToSort: string, direction: string }) => {
        const keyToSort = sortInfo.keyToSort;
        const direction = sortInfo.direction;
        console.log(typeof (data[0][keyToSort]));

        // Sort the received data based on its type
        switch (typeof (data[0][keyToSort])) {
            case "string":
                return (direction === "asc"
                    ? data.sort((a, b) => a[keyToSort].localeCompare(b[keyToSort]))
                    : data.sort((a, b) => b[keyToSort].localeCompare(a[keyToSort])))
            case "number":
            case "object":
                return (direction === "asc"
                    ? data.sort((a, b) => a[keyToSort] - b[keyToSort])
                    : data.sort((a, b) => b[keyToSort] - a[keyToSort]))
            default: return data
        }
    }

    // Switch the displaying task page
    switch (page) {
        case 1: {
            return (<FriendList data={friendL} handleSort={handleSort}></FriendList>)
        }

        case 2: {
            return (<PointHistory data={transL} handleSort={handleSort}></PointHistory>)
        }

        default: {
            return (<MyBadges></MyBadges>)
        }
    }
}