import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarSpecs1709398434677 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "car_specs",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "car_id",
            type: "int",
            isUnique: true,
          },
          {
            name: "car_engine",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_tires",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_suspension",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_differential",
            type: "varchar",
            length: "50",
          },
          {
            name: "car_aero",
            type: "varchar",
            length: "50",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["car_id"],
            referencedTableName: "cars",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("car_specs");
  }
}
