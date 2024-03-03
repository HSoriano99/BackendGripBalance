import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1709398282943 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "role_name",
            type: "enum",
            enum: ["admin", "client"],
            enumName: "roleEnum",
            default: "'client'",
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isUnique: true,
          },
          {
            name: "password_hash",
            type: "varchar",
            length: "255",
          },
          {
            name: "username",
            type: "varchar",
            length: "50",
            isUnique: true,
          },
          {
            name: "first_name",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
          {
            name: "phone_number",
            type: "varchar",
            length: "50",
            isNullable: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
