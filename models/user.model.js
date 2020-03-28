export function createModel(db, Sequelize) {
    const User = db.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,    
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,            
        allowNull: false
      },
      roleId: {        
        type: Sequelize.INTEGER,
        defaultValue: 1,                   
        allowNull: false
      }
    });
  
    return User;
 
  };