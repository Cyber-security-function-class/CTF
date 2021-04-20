import { Table, Column, Model, HasMany, PrimaryKey, DataType,BelongsToMany,BelongsTo, HasOne, IsUUID, Default } from 'sequelize-typescript'
import { Challenge } from './Challenge'
import { Solved } from './Solved'
import sequelize, { UUID, UUIDV4 } from 'sequelize'
import { User } from './User'

@Table
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