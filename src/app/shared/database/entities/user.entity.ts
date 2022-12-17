import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity({ name: "users" })
// export class GrowdeverEntity extends BaseEntity { // active record
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => NoteEntity, (entity) => entity.userEntity)
  notesEntities?: NoteEntity[];
}
