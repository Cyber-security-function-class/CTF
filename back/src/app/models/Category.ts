import { Table, Column, Model, HasMany, AutoIncrement, PrimaryKey, AllowNull, Unique } from "sequelize-typescript"
import { Challenge } from "./Challenge"

@Table({
    tableName: 'category'
})
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