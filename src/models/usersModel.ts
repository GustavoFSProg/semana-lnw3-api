import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm'

@Entity('users')
export default class usersModel {
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
