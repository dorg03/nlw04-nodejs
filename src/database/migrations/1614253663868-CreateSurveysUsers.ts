import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSurveysUsers1614253663868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "surveys_users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "survey_id",
            type: "uuid",
          },
          {
            name: "value",
            type: "number",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKUser",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["user_id"],
            onDelete: "CASCADE", //Ao deletar na tabela pai, users, apaga dessa tabela também
            onUpdate: "CASCADE",
          },
          {
            name: "FKSurvey",
            referencedTableName: "surveys",
            referencedColumnNames: ["id"],
            columnNames: ["survey_id"],
            onDelete: "CASCADE", //Ao deletar na tabela pai, users, apaga dessa tabela também
            onUpdate: "CASCADE",
          },
        ],
      })

      //Caso utiliza a criação da FK fora do CreateTable, seria necessário colocar a deleção das FK's no down
      //Primeiro excluir todas as FK's no down, e depois apagar a tabela
      //await queryRunner.createForeignKey
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("surveys_users");
  }
}
