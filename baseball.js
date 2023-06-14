const readline = require('readline');

// 컴퓨터가 뽑은 숫자 생성
function generateRandomNumber() {
  const numbers = [];
  while (numbers.length < 3) {
    const randomNumber = Math.floor(Math.random() * 10);
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  // console.log(numbers)
  return numbers;
}

// S와 B를 계산하는 함수
function calculateScore(guess, answer) {
  let strikes = 0;
  let balls = 0;

  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === answer[i]) {
      strikes++;
    } else if (answer.includes(guess[i])) {
      balls++;
    }
  }
  return { strikes, balls };
}

// 게임 시작
function startGame() {
  console.log('컴퓨터가 숫자를 생성하였습니다. 답을 맞춰보세요!');

  const answer = generateRandomNumber();
  let attempts = 0;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function playRound() {
    attempts++;
    rl.question(`${attempts}번째 시도: `, (input) => {

      const guess = input.split('').map(Number);
      const score = calculateScore(guess, answer);

      console.log(`${score.strikes}S${score.balls}B`);

      if (score.strikes === 3) {
        console.log(`축하합니다! ${attempts}번만에 맞히셨습니다.`);
        console.log('게임을 종료합니다.')
        rl.close();
      } else {
        playRound();
      }
    });
  }
  playRound();
}

startGame();
