'use strict'

const Mail = use('Mail');

class NewBetMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewBetMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, bets, total }) {
    await Mail.send(
      ['emails.new_bets'],
      { username, bets, total },
      (message) => {
        message
          .to(email)
          .from('tgl_bets@lubysoftware.com', 'TGL | BETS')
          .subject('Novas apostas');
      }
    );  }
}

module.exports = NewBetMail

