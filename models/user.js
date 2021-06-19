/**
 * users 테이블에 대한 Model 정의 파일
 */

const { DataTypes, Model } = require("sequelize");

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        // Model attributes are defined here
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(100),
          allowNull: true,
        },
        snsId: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        provider: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users", // 테이블명
        charset: "utf8",
        collate: "utf8_general_ci",
        // timestamps: true, // createdAt, updatedAt 컬럼 자동 생성, 기본값은 true
      }
    );
  }

  // 테이블 연관관계 설정 (join)
  static associate(db) {
    db.User.hasMany(db.Post, { foreignKey: "user_id", sourceKey: "id" });
  }
};
