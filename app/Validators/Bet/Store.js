'use strict'

const Antl = use('Antl');

class BetStore {
  get rules () {
    return {
      'bets': 'required|array',
      'bets.*.game_id': 'required',
      'bets.*.numbers': 'required',
      'bets.*.current_price': 'required'
    }
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = BetStore
