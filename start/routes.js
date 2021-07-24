const Route = use('Route');

Route.post('register', 'UserController.store').validator('User/Store');
Route.post('login', 'SessionController.store').validator('User/Session');
Route.post('forgot-password', 'ForgotPasswordController.store').validator(
  'Password/Forgot'
);
Route.put('forgot-password', 'ForgotPasswordController.update').validator(
  'Password/Reset'
);
Route.resource('games', 'GameController')
  .apiOnly()
  .validator(
    new Map([
      [['games.store'], ['Game/Store']],
      [['games.update'], ['Game/Update']],
    ])
  );

Route.group(() => {
  Route.get('users', 'UserController.show');
  Route.put('users/:id', 'UserController.update').validator('User/Update');
  Route.resource('bets', 'BetController')
    .apiOnly()
    .except(['update', 'destroy'])
    .validator(new Map([[['bets.store'], ['Bet/Store']]]));
}).middleware(['auth']);
