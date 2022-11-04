interface Player {
    readonly id: string;
    readonly score: number;
}

class WinnerService {
    // TODO: handle draw
    static findWinnerAmongPlayers(players: Player[]): Player {
        if (players.length === 0) {
            throw new Error('Players list is empty');
        }

        const winner = players.reduce((winner, player) => {
            if (player.score > winner!.score) {
                return player;
            }

            return winner;
        }, players[0]) as Player;

        return winner;
    }
}

export default WinnerService;
