'use strict';

const Producer = require('../../Service/kafka/Producer');
const Bet = use('App/Models/Bet');
const Game = use('App/Models/Game');
const Kue = use('Kue');
const Job = use('App/Jobs/NewBetMail');

class BetController {
  async index({ request }) {
    const { page } = request.get();
    const bets = await Bet.query().with('game').paginate(page);

    return bets;
  }

  async store({ request, auth, response }) {
    try {
      const data = request.input('bets');
      const games = await Game.all();
      const gamesToJSON = games.toJSON();
      const dataWithUser = await data.map((bet) => {
        return { user_id: auth.user.id, ...bet };
      });
      const bets = await Bet.createMany(dataWithUser);
      const totalBets = data.reduce((acc, current) => {
        return (acc += current.current_price);
      }, 0);
      const betsByMail = data.map((bet) => {
        bet.current_price = `${bet.current_price.toFixed(2)}`.replace('.', ',');
        return {
          ...bet,
          game: gamesToJSON.find((game) => game.id === bet.game_id),
        };
      });
      Kue.dispatch(
        Job.key,
        {
          email: auth.user.email,
          username: auth.user.username,
          bets: betsByMail,
          total: `${totalBets.toFixed(2)}`.replace('.', ','),
        },
        { attempts: 3 }
      );

      const producer = new Producer();
      producer.produce({
        topic: 'ms_mails',
        messages: [
          {
            value: JSON.stringify({
              emails: [
                'admin@labluby.com',
                'ari@labluby.com',
                'nik@labluby.com',
              ],
              betsByMail,
            }),
          },
        ],
      });

      return bets;
    } catch (err) {
      return response.status(400).send({ error: err });
    }
  }

  async show({ params, auth, response }) {
    if (!auth.check()) return response.unauthorized();

    const bet = await Bet.findOrFail(params.id);
    if (bet.user_id !== auth.user.id)
      return response.unauthorized('Esta aposta não é sua');

    await bet.load('user');
    await bet.load('game');

    return bet;
  }
}

module.exports = BetController;
