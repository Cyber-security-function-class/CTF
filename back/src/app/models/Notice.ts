import { Table, Column, Model, PrimaryKey, DataType } from 'sequelize-typescript'

@Table
export class Notice extends Model<Notice> {
    @PrimaryKey
    @Column
    id : number

    @Column(DataType.JSON)
    content : string
}