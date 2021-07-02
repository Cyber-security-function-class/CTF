import { Table, Column, Model, PrimaryKey, DataType, AutoIncrement } from 'sequelize-typescript'
@Table({
    tableName: 'notice'
})
export class Notice extends Model<Notice> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number

    @Column(DataType.JSON)
    content : string
}