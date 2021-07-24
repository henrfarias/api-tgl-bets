'use strict'

const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = await request.only(['username','email' ,'password']);
    const user = await User.create(data);
    
    return user;  
  }

  async show({ auth }) {
    const user = await User.findOrFail(auth.user.id);
    await user.load('bets');
    return user;
  }

  async update({ auth, request, response, params }) {
    if(Number(params.id) !== auth.user.id) 
      return response.unauthorized('Unauthorized');

    const data = request.only(['username', 'email']);
    const user = await User.findOrFail(params.id);

    user.merge(data);
    await user.save();
    return user;
  }
}

module.exports = UserController
