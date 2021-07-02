import { Table, Column, Model, ForeignKey, PrimaryKey, AllowNull, AutoIncrement, BelongsTo} from 'sequelize-typescript'
import { User } from './User'
import { Challenge } from './Challenge'

@Table({
    tableName: 'solved'
})
export class Solved extends Model<Solved> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id : number

    @AllowNull(false)
    @Column
    score : number
    
    @BelongsTo(() => Challenge)
    challenge : Challenge

    @ForeignKey(() =>Challenge)
    @AllowNull(false)
    @Column
    challengeId : number

    @BelongsTo(() => User)
    user : User
    
    @ForeignKey(() =>User)
    @AllowNull(false)
    @Column
    userId : string // uuid

    @AllowNull(false)
    @Column
    teamId : string // uuid
}