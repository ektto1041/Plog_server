/**
 * menus 테이블에 대한 Model 정의 파일
 */

const { DataTypes, Model } = require('sequelize');

module.exports = class Menu extends Model {
  static init(sequelize) {
    return super.init({
      menu_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'BOARD',
      },
    }, {
      sequelize,
      modelName: 'Menu',
      tableName: 'menus', // 테이블명
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  // 테이블 연관관계 설정 (join)
  static associate(db) {
    db.Menu.hasMany(db.Post, { foreignKey: 'menu_id', sourceKey: 'menu_id' });
  }
};
