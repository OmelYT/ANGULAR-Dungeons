import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Player} from "../../classes/entitiy/player/player";
import {Sprite} from "../../classes/entitiy/sprite";
import {Position} from "../../classes/entitiy/position";
import {registerKeystrokes} from "../../listener/keystroke";
import {level1} from "../../levels/levels";
import {Level} from "../../classes/level/level";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements AfterViewInit {
  public static canvasWidth = 64 * 16;
  public static canvasHeight = 64 * 9;
  public static productionMode: boolean = false;
  private static currentLevel = level1;
  @ViewChild('canvas', {static: true})
  public canvas: ElementRef<HTMLCanvasElement> | undefined;
  public context: CanvasRenderingContext2D | undefined;
  public prodMode: boolean = GameComponent.productionMode;
  private player: Player;

  constructor() {
    const spr = new Sprite('../../../assets/sprites/player/guard_1.png', new Position(100, 100));
    spr.setIsBackground(true);
    this.player = new Player(new Position(356, 250), spr);
  }

  public static getCurrentLevel(): Level {
    return this.currentLevel;
  }

  public static setCurrentLevel(level: Level): void {
    GameComponent.currentLevel = level;
  }

  public static toggleProductionMode(): void {
    this.productionMode = !this.productionMode;
  }

  ngAfterViewInit(): void {
    this.context = this.canvas?.nativeElement.getContext('2d')!;
    this.iniCanvas();
  }

  private iniCanvas() {
    this.canvas!.nativeElement.width = GameComponent.canvasWidth;
    this.canvas!.nativeElement.height = GameComponent.canvasHeight;

    registerKeystrokes();
    this.animate();
  }

  private changeCanvasSize(width: number, height: number) {
    this.canvas!.nativeElement.width = width;
    this.canvas!.nativeElement.height = height;

  }

  private animate() {
    window.requestAnimationFrame(() => this.animate());
    this.changeCanvasSize(GameComponent.getCurrentLevel().getBackground().getWidth(), GameComponent.getCurrentLevel().getBackground().getHeight());
    GameComponent.getCurrentLevel().draw(this.context!);


    if (!GameComponent.productionMode) {
      GameComponent.getCurrentLevel().drawCollisionBlocks(this.context!);

    }
    GameComponent.getCurrentLevel().getFinalDoor().draw(this.context!);
    this.player.update(this.context!);

    if (GameComponent.getCurrentLevel().getFinalDoor().checkCollision(this.player)) {
      //FIXME weird behavior when giving the reference of the SpawnPoint to the player
      //FIXME Dont give the reference, but the values
      this.player.setPosition(GameComponent.getCurrentLevel().getSpawnPoint());




    }

  }


}
