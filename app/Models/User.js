'use strict';

const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', 'UserHook.hashPassword');
    this.addHook('afterCreate', 'UserHook.sendNewUserMail');
  }

  static get hidden() {
    return ['password'];
  }

  bets() {
    return this.hasMany('App/Models/Bet').with('game');
  }
}

module.exports = User;
