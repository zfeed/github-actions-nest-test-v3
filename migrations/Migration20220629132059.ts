import { Migration } from '@mikro-orm/migrations';

export class Migration20220629132059 extends Migration {
    async up(): Promise<void> {
        this.addSql(
            'create table `game` (`id` text not null, `players` json not null, `max_players` integer not null, `session_started_at` datetime null, `session_minutes_to_play` integer null, primary key (`id`));'
        );

        this.addSql(
            'create table `field` (`id` text not null, `game_id` text not null, `size` integer not null, `marked_cell_position` integer not null, `player_ids` text not null, `session_started_at` datetime not null, `session_minutes_to_play` integer not null, primary key (`id`));'
        );
    }
}
