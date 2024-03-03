import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEvents1709398476511 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "events",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "event_image",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "event_name",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_model",
            type: "varchar",
            length: "50",
          },
          {
            name: "event_status",
            type: "enum",
            enum: ["finished", "open", "closed"],
            enumName: "statusEnum",
            default: "'closed'",
          },
          {
            name: "start_date",
            type: "varchar",
            length: "50",
          },
          {
            name: "finish_date",
            type: "varchar",
            length: "50",
          },
          {
            name: "event_car_spec",
            type: "enum",
            enum: ["street", "tracktool", "racecar"],
            enumName: "specEnum",
            default: "'tracktool'",
          },
          {
            name: "event_category",
            type: "enum",
            enum: ["racing", "drifting", "timeattack"],
            enumName: "categoryEnum",
            default: "'timeattack'",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("events");
  }
}
