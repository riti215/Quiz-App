const mostRecentScore = localStorage.getItem('mostRecentScore');
const finalScore = document.getElementById('finalScore');

finalScore.innerText = `Your Score: ${(mostRecentScore / 100) * 100}%`;



