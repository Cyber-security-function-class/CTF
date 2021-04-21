import { Table, Column, Model, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey, AllowNull, Default } from 'sequelize-typescript'
import { User } from './User';

@Table
export class EmailVerified extends Model<EmailVerified> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number;

    @ForeignKey(() => User)
    @Column
    userId : string;

    @AllowNull(false)
    @Column
    token : string;

    @BelongsTo(() => User)
    user : User;

    @Default(false)
    @Column
    isVerified : boolean;
}
