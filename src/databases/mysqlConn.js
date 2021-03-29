let mysql = require('mysql2');

const defaultDbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'database',
};
 
module.exports = function () {
  var config = require('../config/dbConfig') || defaultDbConfig; // ./는 현재 디렉토리를 나타냅니다
  var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
  });
 
  return {
    getConnection: function (callback) {    // connection pool을 생성하여 리턴합니다
      pool.getConnection(callback);
    },
    end: function(callback){
      pool.end(callback);
    }
  }
}();