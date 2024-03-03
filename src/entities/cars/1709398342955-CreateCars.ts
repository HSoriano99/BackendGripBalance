import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1709398342955 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cars",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isUnique: true,
          },
          {
            name: "car_image",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "car_brand",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_model",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_spec",
            type: "enum",
            enum: ["street", "tracktool", "racecar"],
            enumName: "specEnum",
            default: "'tracktool'",
          },
          {
            name: "car_category",
            type: "enum",
            enum: ["racing", "drifting", "timeattack"],
            enumName: "categoryEnum",
            default: "'timeattack'",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cars");
  }
}
