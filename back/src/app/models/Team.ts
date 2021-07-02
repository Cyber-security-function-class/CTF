import { Table, Column, Model, HasMany, PrimaryKey, DataType, IsUUID, Default } from 'sequelize-typescript'
import { User } from './User'

@Table({
    tableName: 'team'
})
export class Team extends Model<Team> {

    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column
    id: string

    @Column
    teamName: string

    @Column
    leader: string

    @HasMany(() => User)
    users: User[];

    @Column
    score : number

    @Column
    teamPassword : string

}