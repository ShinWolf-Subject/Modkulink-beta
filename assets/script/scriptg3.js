        document.addEventListener('DOMContentLoaded', () => {
            const canvas = document.getElementById('game-board');
            const ctx = canvas.getContext('2d');
            const scoreDisplay = document.getElementById('score-display');
            const gameOverDisplay = document.getElementById('game-over');
            const finalScoreDisplay = document.getElementById('final-score');
            const restartBtn = document.getElementById('restart-btn');
            
            const upBtn = document.getElementById('up-btn');
            const leftBtn = document.getElementById('left-btn');
            const downBtn = document.getElementById('down-btn');
            const rightBtn = document.getElementById('right-btn');
            
            const boxSize = 15;
            const rows = canvas.height / boxSize;
            const cols = canvas.width / boxSize;
            
            let snake;
            let food;
            let score;
            let direction;
            let nextDirection;
            let gameInterval;
            let speed;
            
            function initGame() {
                snake = [
                    {x: 5 * boxSize, y: 10 * boxSize},
                    {x: 4 * boxSize, y: 10 * boxSize},
                    {x: 3 * boxSize, y: 10 * boxSize}
                ];
                
                generateFood();
                
                score = 0;
                direction = 'right';
                nextDirection = 'right';
                speed = 140;
                
                scoreDisplay.textContent = `Skor: ${score}`;
                gameOverDisplay.style.display = 'none';
                
                if (gameInterval) clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, speed);
            }
            
            function generateFood() {
                const foodX = Math.floor(Math.random() * cols) * boxSize;
                const foodY = Math.floor(Math.random() * rows) * boxSize;
                
                for (let segment of snake) {
                    if (segment.x === foodX && segment.y === foodY) {
                        return generateFood();
                    }
                }
                
                food = {x: foodX, y: foodY};
            }
            
            function gameLoop() {
                moveSnake();
                if (checkCollision()) {
                    gameOver();
                    return;
                }
                
                drawGame();
            }
            
            function moveSnake() {
                direction = nextDirection;
                
                const head = {x: snake[0].x, y: snake[0].y};
                
                switch (direction) {
                    case 'up':
                        head.y -= boxSize;
                        if (head.y < 0) head.y = canvas.height - boxSize; // Teleport ke bawah
                        break;
                    case 'down':
                        head.y += boxSize;
                        if (head.y >= canvas.height) head.y = 0; // Teleport ke atas
                        break;
                    case 'left':
                        head.x -= boxSize;
                        if (head.x < 0) head.x = canvas.width - boxSize; // Teleport ke kanan
                        break;
                    case 'right':
                        head.x += boxSize;
                        if (head.x >= canvas.width) head.x = 0; // Teleport ke kiri
                        break;
                }
                
                snake.unshift(head);
                
                if (head.x === food.x && head.y === food.y) {
                    score += 10;
                    scoreDisplay.textContent = `Skor: ${score}`;
                    
                    if (score % 50 === 0 && speed > 50) {
                        speed -= 10;
                        clearInterval(gameInterval);
                        gameInterval = setInterval(gameLoop, speed);
                    }
                    
                    generateFood();
                } else {
                    snake.pop();
                }
            }
            
            function checkCollision() {
                const head = snake[0];
                
                // Cuma cek tabrak tubuh sendiri, gak cek dinding lagi
                for (let i = 1; i < snake.length; i++) {
                    if (head.x === snake[i].x && head.y === snake[i].y) {
                        return true;
                    }
                }
                
                return false;
            }
            
            function drawGame() {
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                
                snake.forEach((segment, index) => {
                    if (index === 0) {
                        ctx.fillStyle = '#4CAF50';
                    } else {
                        ctx.fillStyle = '#8BC34A';
                    }
                    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
                    
                    ctx.strokeStyle = '#000';
                    ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
                });
                
                ctx.fillStyle = '#FF5722';
                ctx.beginPath();
                const centerX = food.x + boxSize / 2;
                const centerY = food.y + boxSize / 2;
                const radius = boxSize / 2;
                ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                ctx.fill();
            }
            
            function gameOver() {
                clearInterval(gameInterval);
                finalScoreDisplay.textContent = `Skor: ${score}`;
                gameOverDisplay.style.display = 'block';
            }
            
            document.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowUp':
                        if (direction !== 'down') nextDirection = 'up';
                        break;
                    case 'ArrowDown':
                        if (direction !== 'up') nextDirection = 'down';
                        break;
                    case 'ArrowLeft':
                        if (direction !== 'right') nextDirection = 'left';
                        break;
                    case 'ArrowRight':
                        if (direction !== 'left') nextDirection = 'right';
                        break;
                }
            });
            
            upBtn.addEventListener('click', () => {
                if (direction !== 'down') nextDirection = 'up';
            });
            
            leftBtn.addEventListener('click', () => {
                if (direction !== 'right') nextDirection = 'left';
            });
            
            downBtn.addEventListener('click', () => {
                if (direction !== 'up') nextDirection = 'down';
            });
            
            rightBtn.addEventListener('click', () => {
                if (direction !== 'left') nextDirection = 'right';
            });
            
            restartBtn.addEventListener('click', initGame);
            
            initGame();
        });
