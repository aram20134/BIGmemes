const { DataTypes } = require("sequelize");
const sequelize = require("../db");
// import { i } from './static/userNoImage.png';

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  name: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  // about: {type: DataTypes.STRING },
  avatar: { type: DataTypes.STRING, defaultValue: 'userNoImage.png'} ,
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const UserMemes = sequelize.define("user_memes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const TheMemes = sequelize.define("the_memes", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Comments = sequelize.define("comments", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  text: { type: DataTypes.STRING, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(UserMemes);
UserMemes.belongsTo(User);

User.hasMany(Comments);
Comments.belongsTo(User);

TheMemes.hasMany(Rating, { as: "rate" });
Rating.belongsTo(TheMemes);

UserMemes.belongsTo(TheMemes);
TheMemes.hasOne(UserMemes);

Comments.belongsTo(TheMemes);
TheMemes.hasMany(Comments);

Type.hasMany(TheMemes);
TheMemes.belongsTo(Type);

module.exports = {
  User,
  UserMemes,
  Comments,
  TheMemes,
  Rating,
  Type,
};
