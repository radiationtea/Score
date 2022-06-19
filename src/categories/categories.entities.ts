/* eslint-disable no-use-before-define */
import { Users } from 'src/users/users.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Categories {
  @PrimaryGeneratedColumn('increment', { name: 'categoryid' })
  readonly categoryId: number

  @Column()
  readonly label: string

  @Column()
  readonly description: string

  @Column({ name: 'eval_date_start' })
  readonly evalDateStart: string

  @Column({ name: 'eval_date_stop' })
  readonly evalDateStop: string

  @Column({ name: 'max_score' })
  readonly maxScore: number

  @Column()
  readonly manager: string

  @ManyToOne(() => Users, { eager: true })
  @JoinColumn({ referencedColumnName: 'userId', name: 'manager' })
  readonly manageUser: Users

  @OneToMany(() => Subcategories, (sub) => sub.parent)
  readonly children: Subcategories[]
}

@Entity({ name: 'subcate' })
export class Subcategories {
  @PrimaryGeneratedColumn('increment', { name: 'subid' })
  readonly subcategoryId: number

  @Column({ name: 'categoryid' })
  readonly parentId: number

  @Column()
  readonly label: string

  @Column()
  readonly score: number

  @ManyToOne(() => Categories, (cate) => cate.children)
  @JoinColumn({ name: 'categoryid' })
  readonly parent: Categories
}
