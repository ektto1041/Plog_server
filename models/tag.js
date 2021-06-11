/**
 * tags 테이블에 대한 Model 정의 파일
 */

const { DataTypes, Model } = require('sequelize');

module.exports = class Tag extends Model {
  static init(sequelize) {
    return super.init({
      tag_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    }, {
      sequelize,
      modelName: 'Tag',
      tableName: 'tags', // 테이블명
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // 테이블 연관관계 설정 (join)
  static associate(db) {
    db.Tag.belongsTo(db.Post, { foreignKey: 'post_id', targetKey: 'post_id' });
  }
};
