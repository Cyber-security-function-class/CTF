import { Table, Column, Model, BelongsToMany, DataType, BelongsTo, ForeignKey, PrimaryKey, AllowNull, AutoIncrement, HasMany, Unique } from 'sequelize-typescript'
import { Category } from "./Category"
import { User } from "./User"
import { Solved } from './Solved'

@Table
export class Challenge extends Model<Challenge> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number

    @AllowNull(false)
    @Column
    title : string

    @AllowNull(false)
    @Column(DataType.TEXT)
    content : string

    @AllowNull(false)
    @Column
    score : number

    @BelongsTo(() => Category)
    category : Category[]

    @ForeignKey(() => Category)
    categoryId : number

    @AllowNull(false)
    @Unique
    @Column
    flag : string

    @HasMany(() => Solved)
    solveds : Solved[]
}