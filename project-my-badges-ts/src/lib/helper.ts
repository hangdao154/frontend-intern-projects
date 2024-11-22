export const mapBadgeImg = (name?: string): string => {
    switch (name) {
        case ("X beginner"): return "src/assets/badge/user-badge/badge_1.png";
        case ("Discord beginner"): return "src/assets/badge/user-badge/badge_2.png";
        case ("Rookie"): return "src/assets/badge/user-badge/badge_3.png";
        case ("Pathfinder"): return "src/assets/badge/user-badge/badge_4.png";
        default: return "src/assets/badge/badge1.png";
    }
}