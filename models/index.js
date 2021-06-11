const Sequelize = require('sequelize');
const User = require('./user');
const Menu = require('./menu');
const Post  = require('./post');
const Tag  = require('./tag');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// model 등록
db.User = User;
db.Menu = Menu;
db.Post = Post;
db.Tag = Tag;

// model 초기화
User.init(sequelize);
Menu.init(sequelize);
Post.init(sequelize);
Tag.init(sequelize);

User.associate(db);
Post.associate(db);
Tag.associate(db);

module.exports = db;
