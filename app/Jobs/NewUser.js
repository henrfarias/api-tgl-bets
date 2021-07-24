'use strict'

const Mail = use('Mail');

class NewUser {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewUser-job'
  }

  // This is where the work is done.
  async handle ({ username, email }) {
    await Mail.send(
      ['emails.greeting'],
      {
        username,
        email,
      },
      (message) => {
        message
          .to(email)
          .from('tgl_bets@labluby.com', 'TGL | Bets')
          .subject('Cadastro | Seja bem vindo!');
      }
    );
  }
}

module.exports = NewUser

