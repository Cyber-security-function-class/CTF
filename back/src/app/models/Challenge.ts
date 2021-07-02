import { Table, Column, Model, DataType, BelongsTo, ForeignKey, PrimaryKey, AllowNull, AutoIncrement, HasMany, Unique, Default } from 'sequelize-typescript'
import { Category } from "./Category"
import { Solved } from './Solved'

@Table({
    tableName: 'challenge'
})
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

    @Default(0)
    @Column
    solved_count: number
    
    @HasMany(() => Solved)
    solveds : Solved[]


}