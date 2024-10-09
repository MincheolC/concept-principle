import { MigrationInterface, QueryRunner } from "typeorm";

export class Time1728466391905 implements MigrationInterface {
    name = 'Time1728466391905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`times\` (\`id\` int NOT NULL AUTO_INCREMENT, \`event_datetime\` datetime NOT NULL, \`event_timestamp\` timestamp NOT NULL, \`created_at\` timestamp NOT NULL, \`updated_at\` timestamp NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`times\``);
    }

}
