import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm'

@Entity('users')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column()
  @Index({ unique: true })
  name: string

  @Column()
  email: string

  @Column()
  password: string
}
