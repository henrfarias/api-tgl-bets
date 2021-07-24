'use strict'

class UserUpdate {
  get validateAll() {
    return true;
  }

  get rules () {
    const userId = this.ctx.params.id;
    return {
      username: `unique:users,username,id,${userId}`,
      email: `email|unique:users,email,id,${userId}`,
    }
  }
}

module.exports = UserUpdate
