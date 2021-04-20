import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, AllowNull } from 'sequelize-typescript'
import { User } from './User';

@Table
export class EmailVerified extends Model<EmailVerified> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @ForeignKey(() => User)
    @Column
    userId : number;

    @AllowNull(false)
    @Column
    token : string;

    @BelongsTo(() => User)
    user : User;
}
