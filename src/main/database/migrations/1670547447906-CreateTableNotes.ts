import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableNotes1670547447906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "notes",
        columns: [
          { name: "id", type: "uuid", isNullable: false, isPrimary: true },
          { name: "content", type: "text", isNullable: false },
          { name: "status", type: "boolean", isNullable: false, default: true },
          { name: "id_user", type: "uuid", isNullable: false },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: false,
            default: "now()",
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: "fk_notes_users",
            columnNames: ["id_user"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("notes", true, true, true);
  }
}
