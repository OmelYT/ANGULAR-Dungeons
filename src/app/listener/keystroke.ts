export class GameKey {
  private readonly key: string;
  private pressed: boolean;

  constructor(key: string, pressed: boolean) {
    this.key = key;
    this.pressed = pressed;

  }

  public getKey(): string {
    return this.key;
  }

  public isPressed(): boolean {
    return this.pressed;
  }

  public setPressed(pressed: boolean): void {
    this.pressed = pressed;
  }


}

export const KEYS: GameKey[] = [
  new GameKey('w', false),
  new GameKey('a', false),
  new GameKey('d', false),
];

export function setKeyPressed(key: string, pressed: boolean): void {
  const gameKey = KEYS.find(gameKey => gameKey.getKey() === key);
  gameKey!.setPressed(pressed);
}

export function isKeyPressed(key: string): boolean {
  const gameKey = KEYS.find(gameKey => gameKey.getKey() === key);
  return gameKey!.isPressed();
}

export function registerKeystrokes(): void {
  const handleKeyEvent = (event: KeyboardEvent, pressed: boolean) => {
    const key = event.key;

    if (event.code === 'Space') {
      setKeyPressed('w', pressed);
      return;
    }

    switch (key) {
      case 'w':
      case 'ArrowUp':
        setKeyPressed('w', pressed);
        break;
      case 'a':
      case 'ArrowLeft':
        setKeyPressed('a', pressed);
        break;
      case 'd':
      case 'ArrowRight':
        setKeyPressed('d', pressed);
        break;

      default:
        break;
    }
  }

  window.addEventListener('keydown', (event) => {
    handleKeyEvent(event, true);
  });

  window.addEventListener('keyup', (event) => {
    handleKeyEvent(event, false);
  });

}


