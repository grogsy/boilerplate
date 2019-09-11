// an example of a user model
const crypto = require('crypto');
const _ = require('lodash');
const Sequelize = require('sequelize');

const db = require('../db');

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
  },

  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  password: {
    type: Sequelize.STRING,
  },

  salt: {
    type: Sequelize.STRING,
  },

  hooks: {
    beforeCreate: setSaltAndPassword,
    beforeUpdate: setSaltAndPassword,
  },
});

User.prototype.correctPassword = function(password) {
  return this.Model.encryptPassword(password, this.salt) === this.password;
};

User.prototype.sanitize = function() {
  return _.omit(this.toJSON(), ['password', 'salt']);
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(plaintext, salt) {
  const hash = crypto.createHash('sha1');
  hash.update(plaintext);
  hash.update(salt);
  return hash.digest('hex');
};

function setSaltAndPassword(user) {
  // salt & hash whenever password is created for the first time/updated
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

module.exports = User;
