const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let score = 0;
    let gameOver = false;

    const player = {
      x: canvas.width / 2,
      y: canvas.height - 60,
      width: 50,
      height: 50,
      color: '#0ff',
      speed: 8,
    };

    const keys = {};
    const enemies = [];

    function drawPlayer() {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawEnemies() {
      enemies.forEach(e => {
        ctx.fillStyle = e.color;
        ctx.fillRect(e.x, e.y, e.width, e.height);
      });
    }

    function updateEnemies() {
      for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].y += enemies[i].speed;
        if (enemies[i].y > canvas.height) {
          enemies.splice(i, 1);
          score++;
          document.getElementById('score').textContent = `Score: ${score}`;
        } else if (
          player.x < enemies[i].x + enemies[i].width &&
          player.x + player.width > enemies[i].x &&
          player.y < enemies[i].y + enemies[i].height &&
          player.y + player.height > enemies[i].y
        ) {
          gameOver = true;
        }
      }
    }

    function spawnEnemy() {
      const width = 30 + Math.random() * 30;
      const height = 30 + Math.random() * 30;
      const x = Math.random() * (canvas.width - width);
      const y = -height;
      const speed = 3 + Math.random() * 5;
      const color = 'hsl(' + Math.random() * 360 + ', 100%, 50%)';
      enemies.push({ x, y, width, height, speed, color });
    }

    function updatePlayer() {
      if (keys['ArrowLeft'] && player.x > 0) player.x -= player.speed;
      if (keys['ArrowRight'] && player.x + player.width < canvas.width) player.x += player.speed;
      if (keys['ArrowUp'] && player.y > 0) player.y -= player.speed;
      if (keys['ArrowDown'] && player.y + player.height < canvas.height) player.y += player.speed;
    }

    function gameLoop() {
      if (gameOver) {
        ctx.fillStyle = 'rgba(0,0,0,0.8)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f00';
        ctx.font = '48px sans-serif';
        ctx.fillText('Game Over!', canvas.width / 2 - 120, canvas.height / 2);
        ctx.fillStyle = '#0ff';
        ctx.font = '24px sans-serif';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 80, canvas.height / 2 + 40);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updatePlayer();
      updateEnemies();
      drawPlayer();
      drawEnemies();
      requestAnimationFrame(gameLoop);
    }

    setInterval(spawnEnemy, 500);

    window.addEventListener('keydown', e => keys[e.key] = true);
    window.addEventListener('keyup', e => keys[e.key] = false);

    gameLoop();
