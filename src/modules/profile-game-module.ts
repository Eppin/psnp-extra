export class ProfileGameModule {
  getList (): string[] {
    const elements = document.querySelectorAll('#gamesTable > tbody a.title');

    const games: string[] = [];
    for (const element of elements) {
      const href = element.attributes.getNamedItem('href');

      if (href === null) {
        continue;
      }

      const gameId = /(\d+)/.exec(href.value);
      if (gameId !== null) {
        games.push(gameId[0]);
      }
    }

    return games;
  }
}
