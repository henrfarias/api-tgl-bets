'use strict';

const Hash = use('Hash');
const Kue = use('Kue');
const Job = use('App/Jobs/NewUser');

const UserHook = (exports = module.exports = {});

UserHook.hashPassword = async (userInstance) => {
  if (userInstance.dirty.password) {
    userInstance.password = await Hash.make(userInstance.password);
  }
};

UserHook.sendNewUserMail = async (userInstance) => {
  Kue.dispatch(
    Job.key,
    {
      username: userInstance['$attributes'].username,
      email: userInstance['$attributes'].email,
    },
    { attempt: 3 }
  );
};
