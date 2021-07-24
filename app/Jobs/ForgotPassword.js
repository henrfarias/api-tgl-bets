'use strict';

const Mail = use('Mail');

class ForgotPassword {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1;
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'ForgotPassword-job';
  }

  // This is where the work is done.
  async handle({ email, token }) {
    await Mail.send(
      ['emails.forgot_password'],
      {
        email,
        token: token,
        link: `http://localhost:3000/reset-password/new-password?token=${token}`,
      },
      (message) => {
        message
          .to(email)
          .from('henrique@lubysoftware.com', 'Henrique | Luby')
          .subject('Recuperação de senha');
      }
    );
  }
}

module.exports = ForgotPassword;
