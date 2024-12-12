import { React, useState } from 'react'
import MyBadges from "./MyBadges";
import FriendList from "./FriendList";
import PointHistory from "./PointHistory";

export default function TaskSection(props) {
    const { page } = props;

    /*============== Test data ==============*/
    const transL = [{
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
    const badgeL = [{
        name: "Badge Yet-Claimed Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge X(Twitter)",
        tier: 1,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "yet-claimable"
    }, {
        name: "Badge Claimed Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge X(Twitter)",
        tier: 1,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "claimable"
    }, {
        name: "Badge Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge Linkedin",
        tier: 2,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "owned"
    }, {
        name: "Badge Something Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge X(Twitter)",
        tier: 3,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "yet-claimable"
    }, {
        name: "Badge Claimed Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge X(Twitter)",
        tier: 1,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "claimable"
    }, {
        name: "Badge Something Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge Facebook",
        tier: 2,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "owned"
    }, {
        name: "Badge Something Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge X(Twitter)",
        tier: 1,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "yet-claimable"
    }, {
        name: "Badge Something Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge X(Twitter)",
        tier: 2,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "claimable"
    }, {
        name: "Badge Something Test",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi tempora ipsum nihil recusandae. Id voluptatum iusto sapiente obcaecati debitis voluptas consectetur modi numquam sed, commodi at? Eius eos distinctio magni!",
        type: "Badge Linkedin",
        tier: 3,
        howToEarn: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam est aliquid, eligendi vitae quis reprehenderit consequatur recusandae at officiis porro soluta veritatis excepturi culpa ea dolore tempora nulla cupiditate corrupti.",
        badgeImg: "public/badge/badge1.png",
        flag: "public/badge-flag/saved-icon.png",
        status: "owned"
    }]
    const friendL = [{
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

    const handleSort = (data, sortInfo) => {
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
            default: return data;
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
            return (<MyBadges data={badgeL} handleSort={handleSort}></MyBadges>)
        }
    }
}