module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: DataTypes.STRING

    }, {
        timestamp: false
    }
    );
    return User;
};