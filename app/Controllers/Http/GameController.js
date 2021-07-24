'use strict';

const Game = use('App/Models/Game');

class GameController {
  async index({ request }) {
    const { page } = request.get();
    const games = await Game
      .query()
      .paginate(page);
    return games;
  }

  async store({ request }) {
    const data = request.input('types');
    const games = await Game.createMany(data);

    return games;
  }

  async show({ params }) {
    const game = Game.findOrFail(params.id);

    return game;
  }

  async update({ params, request }) {
    const game = await Game.findOrFail(params.id);
    const data = request.only([
      'type',
      'description',
      'range',
      'price',
      'max-number',
      'color',
      'min-cart-value',
    ]);

    game.merge(data);

    await game.save();

    return game;
  }

  async destroy({ params }) {
    const game = await Game.findOrFail(params.id)
    
    await game.delete();
  }
}

module.exports = GameController;
