import Button from './button';
import { LEADERBOARD } from '$toto/bootstrap/paths';
class LeaderboardButton extends Button {
    
    onClick() {
        window.location.href = LEADERBOARD;
        
    }
}

export default LeaderboardButton;


