'use strict'

const Antl = use('Antl');

class GameStore {
  get validateAll() {
    return true;
  }

  get rules () {
    return {
      'types': 'required|array',
    }
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = GameStore
