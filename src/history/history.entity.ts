import { Subcategories } from 'src/categories/categories.entities'
import { Users } from 'src/users/users.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class History {
  @PrimaryColumn({ name: 'hisid' })
  readonly historyId: number

  @Column({ name: 'subid' })
  readonly subcategoryId: number

  @Column({ name: 'teacherid' })
  readonly teacherId: string

  @Column({ name: 'userid' })
  readonly userId: string

  @Column({ name: 'createdat', type: 'timestamp' })
  readonly createdAt: Date

  @ManyToOne(() => Subcategories, (sub) => sub.subcategoryId, { eager: true })
  @JoinColumn({ name: 'subid' })
  readonly subcategory: Subcategories

  @ManyToOne(() => Users, (user) => user.userId, { eager: true })
  @JoinColumn({ name: 'teacherid' })
  readonly teacher: Users

  @ManyToOne(() => Users, (user) => user.userId, { eager: true })
  @JoinColumn({ name: 'userid' })
  readonly user: Users
}
