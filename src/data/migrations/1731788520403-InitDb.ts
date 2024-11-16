import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1731788520403 implements MigrationInterface {
    name = 'InitDb1731788520403'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todos\` (\`Id\` binary(16) NOT NULL, \`Name\` longtext NOT NULL, \`IsComplete\` tinyint NOT NULL DEFAULT 0, \`CompletedDate\` datetime(6) NOT NULL, \`CreatedDate\` datetime(6) NOT NULL, \`UserId\` binary(16) NOT NULL, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`Id\` binary(16) NOT NULL, \`ExternalId\` char(36) NOT NULL, \`UserName\` longtext NOT NULL, \`FirstName\` longtext NOT NULL, \`FamilyName\` longtext NOT NULL, \`Email\` longtext NOT NULL, \`CreatedDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (\`Id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todos\` ADD CONSTRAINT \`FK_9afb5bfa91ecd15563492ba1c57\` FOREIGN KEY (\`UserId\`) REFERENCES \`users\`(\`Id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todos\` DROP FOREIGN KEY \`FK_9afb5bfa91ecd15563492ba1c57\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`todos\``);
    }

}
