'use strict'

const Antl = use('Antl');

class UserSession {
  get validateAll() {
    return true;
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = UserSession
