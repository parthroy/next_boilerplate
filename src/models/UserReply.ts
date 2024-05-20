import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import { timeStamp } from 'console';

interface UserReplyAttributes {
  calldate: Date;
  calluid: string;
  clid: string;
  src: string;
  dst: string;
  answer: string;
  end: string;
  duration: string;
  billsec: string;
  userresponse_1: string;
  userresponse_2: string;
  userresponse_3: string;
  userresponse_4: string;
  userresponse_5: string;
  recording_responce_path: string;
  fullrecording: string;
  days: number;
  lead_type: string;
  sentiment: string;
}

// Optional attributes are removed from the interface since they are defined as allowNull: true in the model definition.
interface UserReplyCreationAttributes extends Optional<UserReplyAttributes, 'calldate'> { }

class UserReply extends Model<UserReplyAttributes, UserReplyCreationAttributes> implements UserReplyAttributes {
  public calldate!: Date;
  public calluid!: string;
  public clid!: string;
  public src!: string;
  public dst!: string;
  public answer!: string;
  public end!: string;
  public duration!: string;
  public billsec!: string;
  public userresponse_1!: string;
  public userresponse_2!: string;
  public userresponse_3!: string;
  public userresponse_4!: string;
  public userresponse_5!: string;
  public recording_responce_path!: string;
  public fullrecording!: string;
  public days!: number;
  public lead_type!: string;
  public sentiment!: string;
}

UserReply.init({
  calldate: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW
  },
  calluid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    primaryKey: true // Specify calldate as the primary key
  },
  clid: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  src: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  dst: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  answer: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  end: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  duration: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  billsec: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  userresponse_1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userresponse_2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userresponse_3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userresponse_4: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userresponse_5: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  recording_responce_path: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fullrecording: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  days: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0
  },
  lead_type: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  sentiment: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
}, {
  sequelize,
  tableName: 'userreply',
  timestamps: false
});

export default UserReply;
