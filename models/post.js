/**
 * posts 테이블에 대한 Model 정의 파일
 */

const { DataTypes, Model } = require('sequelize');

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Post',
      tableName: 'posts', // 테이블명
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // 테이블 연관관계 설정 (join)
  static associate(db) {
    db.Post.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });
    db.Post.belongsTo(db.Menu, { foreignKey: 'menu_id', targetKey: 'id' });
  }
};
