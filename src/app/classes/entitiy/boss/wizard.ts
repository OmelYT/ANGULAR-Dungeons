import {Direction} from "../gizmo/gizmo";
import {Position} from "../position";
import {Enemie} from "./enemie";
import {Hitbox} from "../../level/collision/hitbox";
import {Player} from "../player/player";
import {Healthbar} from "../../gui/bar/healthbar";
import {GameComponent} from "../../../components/game/game.component";

const animationDefaults = {
  frameRate: 8,
  frameBuffer: 8,
  loop: true
}

export class Wizard extends Enemie {

  public maxHealth: number = 100;
  public health: number = this.maxHealth;
  public healthBar: Healthbar;
  public isDead: boolean = false;
  public isReceivingDamage: boolean = false;
  private collisionDone = new Set<Hitbox>;

  constructor(position: Position) {
    super(new Hitbox(position, 50, 50), '../../../assets/sprites/wizard/idleRight.png', position, {
      idleRight: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/idleRight.png'
      },
      idleLeft: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/idleLeft.png'
      },
      attack1Right: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/attack1Right.png',
        onComplete: () => {
          this.attackDone();
        }
      },
      attack1Left: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/attack1Left.png',
        onComplete: () => {
          this.attackDone();
        }
      },

      attack2Right: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/attack2Right.png',
        onComplete: () => {
          this.attackDone();
        }
      },
      attack2Left: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/attack2Left.png',
        onComplete: () => {
          this.attackDone();
        }
      },
      death: {
        ...animationDefaults,
        frameBuffer: 18,
        loop: false,
        frameRate: 7,
        imageSrc: '../../../assets/sprites/wizard/death.png',
        onComplete: () => {
          this.isDead = true;
        }

      },
      runRight: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/runRight.png'
      },
      runLeft: {
        ...animationDefaults,
        imageSrc: '../../../assets/sprites/wizard/runLeft.png'
      },
      jumpRight: {
        ...animationDefaults,
        frameRate: 2,
        imageSrc: '../../../assets/sprites/wizard/jumpRight.png'
      },
      hitRight: {
        ...animationDefaults,
        frameRate: 3,
        frameBuffer: 24,
        imageSrc: '../../../assets/sprites/wizard/hitRight.png',
        onComplete: () => {
          this.isReceivingDamage = false;
        }
      },
      hitLeft: {
        ...animationDefaults,
        frameRate: 3,
        frameBuffer: 24,
        imageSrc: '../../../assets/sprites/wizard/hitLeft.png',
        onComplete: () => {
          this.isReceivingDamage = false;
        }
      },
      fallRight: {
        ...animationDefaults,
        frameRate: 2,
        imageSrc: '../../../assets/sprites/wizard/fallRight.png'
      }

    }, 8);
    this.getHitbox().setWidth(30);
    this.getHitbox().setHeight(50);
    this.healthBar = new Healthbar(position);
  }


  public override updateHitbox(offsetX: number, offsetY: number): void {
    super.updateHitbox(offsetX + 100, offsetY + 115);

    this.healthBar.position.setY(this.getPosition().getY() + 100);
    this.healthBar.position.setX(this.getPosition().getX() + 70);

  }

  public attack(): void {
    this.switchSprite(this.lastDirection === Direction.RIGHT ? 'attack1Right' : 'attack1Left');
  }

  public override moveAi(context: CanvasRenderingContext2D, delta: number): void {


    if (this.health <= 0) {
      this.switchSprite('death');
      return;
    }

    if (this.isReceivingDamage) {
      this.switchSprite(this.lastDirection === Direction.RIGHT ? 'hitRight' : 'hitLeft');
      return;
    }

    if (this.isAttacking) {
      this.attack();
      return;
    }

    if (Math.random() < 0.001 && !this.isAttacking) {
      this.isAttacking = true;
      return;
    }


    super.moveAi(context, delta);

  }

  public override drawSprite(context: CanvasRenderingContext2D, delta: number): void {
    if (this.isDead) return;
    super.drawSprite(context, delta);
    this.healthBar.draw(context, 10, this.health, this.maxHealth)
  }

  override onCollide(context: CanvasRenderingContext2D, delta: number) {
    super.onCollide(context, delta);
    GameComponent.player.health -= 10 * delta;
  }

  attackBoxCollide(player: Player): void {
    if (this.collisionDone.has(player.getHitbox())) return;
    this.collisionDone.add(player.getHitbox());
    player.isReceivingDamage = true;
    player.health -= 20;

  }

  private attackDone() {
    this.isAttacking = false;
    this.collisionDone.clear();
  }


}
