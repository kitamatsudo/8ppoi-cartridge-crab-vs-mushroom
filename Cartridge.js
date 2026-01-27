export class Cartridge {
  static onReset({ pads, speakers, screens }) {
    this.pads = pads;
    this.speakers = speakers;
    this.screens = screens;

    // 画面設定
    this.SCREEN_WIDTH = 256;
    this.SCREEN_HEIGHT = 192;
    this.screens[0].setViewBox(0, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

    // 定数
    this.GROUND_Y = 160;
    this.TILE_SIZE = 16;
    this.MOVE_SPEED = 1.5;
    this.KNOCKBACK = 40;
    this.GRAVITY = 0.3;
    this.JUMP_POWER = -5;

    // ステージデータ (0=穴, 1=地面)
    this.stageData = [
      1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1,
      1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1,
    ];
    this.STAGE_LENGTH = this.stageData.length * this.TILE_SIZE;

    // カニ 16x16
    this.crabPattern = [
      [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
      [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
      [1, 0, 0, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 0, 0, 1],
      [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    ];

    // キノコ 16x16
    this.mushroomPattern = [
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 0, 0],
      [0, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 0],
      [0, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 1, 1, 0],
      [1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
      [0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 0],
    ];

    // 爆発 16x16
    this.explosionPattern = [
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
      [0, 0, 1, 0, 2, 2, 1, 2, 2, 1, 2, 2, 0, 1, 0, 0],
      [1, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 1],
      [0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0],
      [0, 0, 0, 2, 2, 2, 1, 1, 1, 1, 2, 2, 2, 0, 0, 0],
      [1, 0, 0, 2, 2, 1, 1, 1, 1, 1, 1, 2, 2, 0, 0, 1],
      [0, 0, 1, 0, 2, 2, 1, 2, 2, 1, 2, 2, 0, 1, 0, 0],
      [0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0],
      [0, 1, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    ];

    // ゴール旗 16x16
    this.goalPattern = [
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    // 地面パターン 16x16
    this.groundPattern = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 1, 1, 1, 1, 2, 1, 1, 2, 1, 1, 1, 1, 2, 1],
      [1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
      [2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 2],
      [1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1],
      [1, 1, 1, 1, 2, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // 地面スプライト生成
    this.groundSprites = [];
    for (let i = 0; i < this.stageData.length; i++) {
      if (this.stageData[i] === 1) {
        const ground = this.screens[0].addSprite(this.groundPattern, {
          colorIds: [null, 6, 8],
          x: i * this.TILE_SIZE,
          y: this.GROUND_Y,
        });
        this.groundSprites.push(ground);
      }
    }

    // ゴール
    this.goalX = this.STAGE_LENGTH - 48;
    this.goal = this.screens[0].addSprite(this.goalPattern, {
      colorIds: [null, 15, 10], // 白、緑
      x: this.goalX,
      y: this.GROUND_Y - 16,
    });

    // プレイヤー
    this.player = this.screens[0].addSprite(this.crabPattern, {
      colorIds: [null, 1, 15], // 赤、白（目）
    });

    // ゲーム状態
    this.isGameover = false;
    this.isCleared = false;
    this.cameraX = 0;
    this.knockbackTimer = 0;
    this.score = 0;

    // 敵リスト
    this.mushrooms = [];

    // 爆発エフェクト
    this.explosions = [];

    this.restart();
  }

  static restart() {
    this.player.x = 32;
    this.player.y = this.GROUND_Y - 16;
    this.player.vy = 0;
    this.player.onGround = true;
    this.cameraX = 0;
    this.isGameover = false;
    this.isCleared = false;
    this.knockbackTimer = 0;
    this.score = 0;

    // キノコをクリア
    this.mushrooms.forEach((m) => m.sprite.remove());
    this.mushrooms = [];

    // 爆発をクリア
    this.explosions.forEach((e) => e.sprite.remove());
    this.explosions = [];

    // キノコを配置
    this.spawnMushroom(150);
    this.spawnMushroom(280);
    this.spawnMushroom(380);

    this.updateCamera();
  }

  static spawnMushroom(x) {
    const sprite = this.screens[0].addSprite(this.mushroomPattern, {
      colorIds: [null, 1, 15, 9], // 赤、白、黄色（軸）
    });
    sprite.x = x;
    sprite.y = this.GROUND_Y - 16;
    this.mushrooms.push({
      sprite,
      x,
      alive: true,
    });
  }

  static isGroundAt(x) {
    const tileIndex = Math.floor(x / this.TILE_SIZE);
    if (tileIndex < 0 || tileIndex >= this.stageData.length) {
      return false;
    }
    return this.stageData[tileIndex] === 1;
  }

  static updateCamera() {
    this.cameraX = Math.max(0, this.player.x - 60);
    this.cameraX = Math.min(this.cameraX, this.STAGE_LENGTH - this.SCREEN_WIDTH);
    this.screens[0].setViewBox(this.cameraX, 0, this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
  }

  static playJumpSound() {
    this.sfx?.stop();
    this.sfx = this.speakers[0].play([
      [
        { noteNumber: 15, duration: 2 },
        { noteNumber: 20, duration: 2 },
      ],
    ]);
  }

  static playExplosionSound() {
    this.sfx?.stop();
    this.sfx = this.speakers[0].play([
      [
        { noteNumber: 5, duration: 2 },
        { noteNumber: 3, duration: 2 },
        { noteNumber: 1, duration: 4 },
      ],
    ]);
  }

  static playFallSound() {
    this.sfx?.stop();
    this.sfx = this.speakers[0].play([
      [
        { noteNumber: 20, duration: 4 },
        { noteNumber: 15, duration: 4 },
        { noteNumber: 10, duration: 4 },
        { noteNumber: 5, duration: 8 },
      ],
    ]);
  }

  static playClearSound() {
    this.sfx?.stop();
    this.sfx = this.speakers[0].play([
      [
        { noteNumber: 12, duration: 4 },
        { noteNumber: 16, duration: 4 },
        { noteNumber: 19, duration: 4 },
        { noteNumber: 24, duration: 8 },
      ],
    ]);
  }

  static onFrame() {
    const pad = this.pads[0].buttons;

    // 爆発エフェクト更新
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const exp = this.explosions[i];
      exp.timer--;
      if (exp.timer <= 0) {
        exp.sprite.remove();
        this.explosions.splice(i, 1);
      }
    }

    if (this.isGameover) {
      // 落下
      this.player.y += 3;
      if (pad.b0.justPressed && this.player.y > this.SCREEN_HEIGHT) {
        this.player.clear();
        this.player.setPattern(this.crabPattern, {
          colorIds: [null, 1, 15],
        });
        this.restart();
      }
      return;
    }

    if (this.isCleared) {
      // クリア後はリスタート待ち
      if (pad.b0.justPressed) {
        this.restart();
      }
      return;
    }

    // ノックバック中
    if (this.knockbackTimer > 0) {
      this.knockbackTimer--;
      this.player.x -= 2;

      // 足元チェック
      const footX = this.player.x + 8;
      if (!this.isGroundAt(footX)) {
        this.isGameover = true;
        this.playFallSound();
        return;
      }

      // 左端制限
      if (this.player.x < 0) {
        this.player.x = 0;
      }

      this.updateCamera();
      return;
    }

    // 左右移動
    if (pad.left.pressed && this.player.x > 0) {
      this.player.x -= this.MOVE_SPEED;
    }
    if (pad.right.pressed && this.player.x < this.STAGE_LENGTH - 16) {
      this.player.x += this.MOVE_SPEED;
    }

    // ジャンプ
    if (pad.b0.justPressed && this.player.onGround) {
      this.player.vy = this.JUMP_POWER;
      this.player.onGround = false;
      this.playJumpSound();
    }

    // 重力
    this.player.vy += this.GRAVITY;
    this.player.y += this.player.vy;

    // 足元チェック
    const footX = this.player.x + 8;
    if (this.player.y >= this.GROUND_Y - 16) {
      if (this.isGroundAt(footX)) {
        this.player.y = this.GROUND_Y - 16;
        this.player.vy = 0;
        this.player.onGround = true;
      } else {
        this.player.onGround = false;
      }
    }

    // 穴に落ちた
    if (this.player.y > this.SCREEN_HEIGHT) {
      this.isGameover = true;
      this.playFallSound();
      return;
    }

    // キノコ更新
    for (let i = this.mushrooms.length - 1; i >= 0; i--) {
      const mushroom = this.mushrooms[i];
      if (!mushroom.alive) continue;

      // プレイヤーに向かって移動
      if (mushroom.x > this.player.x) {
        mushroom.x -= 0.3;
      } else {
        mushroom.x += 0.3;
      }
      mushroom.sprite.x = mushroom.x;

      // 当たり判定
      const dx = Math.abs((this.player.x + 8) - (mushroom.x + 8));
      const dy = Math.abs((this.player.y + 8) - (mushroom.sprite.y + 8));

      if (dx < 14 && dy < 14) {
        // 爆発
        mushroom.alive = false;
        mushroom.sprite.remove();

        // 爆発エフェクト
        const exp = this.screens[0].addSprite(this.explosionPattern, {
          colorIds: [null, 9, 1], // 黄色、赤
        });
        exp.x = mushroom.x;
        exp.y = mushroom.sprite.y;
        this.explosions.push({ sprite: exp, timer: 15 });

        this.playExplosionSound();

        // ノックバック
        this.knockbackTimer = 20;

        // スコア
        this.score++;

        // 新しいキノコをスポーン
        const newX = this.player.x + 200 + Math.random() * 100;
        if (newX < this.STAGE_LENGTH - 32) {
          this.spawnMushroom(newX);
        }

        this.mushrooms.splice(i, 1);
      }
    }

    // ゴール判定
    if (Math.abs(this.player.x - this.goalX) < 16) {
      this.isCleared = true;
      this.playClearSound();
    }

    this.updateCamera();
  }
}
