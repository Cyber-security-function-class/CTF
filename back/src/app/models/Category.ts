import { Table, Column, Model, DataType, HasMany, AutoIncrement, PrimaryKey, AllowNull, Unique } from "sequelize-typescript"
import { Challenge } from "./Challenge"

@Table
export class Category extends Model<Category> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number

    @AllowNull
    @Unique
    @Column
    category : string

    @HasMany(() => Challenge)
    challenges: Challenge[]
}