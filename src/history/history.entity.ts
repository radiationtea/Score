import {Subcategories} from "src/categories/categories.entities"

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

  @OneToMany(() => Subcategories, (sub) => sub.subcategoryId, { eager: true })
  @JoinColumn({ name: 'subid' })
  readonly subcategory: Subcategories
}
