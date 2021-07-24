'use strict'

const Antl = use('Antl');

class GameUpdate {
  get rules () {
    return {
      type: 'unique:games',
      color: 'unique:games',
    }
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = GameUpdate
