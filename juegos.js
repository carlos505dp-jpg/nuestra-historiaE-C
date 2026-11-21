const questions = [
 {q:"¿Qué día comenzó nuestra historia?",a:["23 de agosto de 2026","23 de noviembre de 2026","14 de febrero de 2026"],correct:0,why:"¡Exacto! El 23 de agosto comenzó lo nuestro. ♥"},
 {q:"¿Cómo se llama nuestra canción?",a:["Nuestra canción","Labios de Cereza 2","Una canción de amor"],correct:1,why:"¡Sí! Labios de Cereza 2, nuestra canción. 🎵"},
 {q:"¿Cómo se llaman los protagonistas de esta historia?",a:["Carlos y Esther","Carlos y María","Esther y Daniel"],correct:0,why:"¡Claro que sí! Esta historia es de Carlos y Esther. ♥"},
 {q:"¿Cuántos meses celebramos el 23 de noviembre de 2026?",a:["Un mes","Dos meses","Tres meses"],correct:2,why:"¡Tres meses llenos de recuerdos! ♥"},
 {q:"¿Qué título tiene nuestra página?",a:["Un cuento bonito","Nuestra historia","Para siempre"],correct:1,why:"¡Lo recuerdas! Nuestra historia. Y todavía quedan muchas páginas."}
];
let current=0, score=0, selected=false;
const questionText=document.getElementById('questionText');
const answers=document.getElementById('answers');
const count=document.getElementById('questionCount');
const feedback=document.getElementById('feedback');
const next=document.getElementById('nextButton');
const progress=document.getElementById('progressBar');

function renderQuestion(){
 const item=questions[current]; selected=false;
 count.textContent=`Pregunta ${current+1} de ${questions.length}`;
 questionText.textContent=item.q; feedback.textContent=''; next.disabled=true;
 next.textContent=current===questions.length-1?'Terminar cuestionario':'Siguiente pregunta';
 progress.style.width=`${current/questions.length*100}%`;
 answers.innerHTML='';
 item.a.forEach((answer,index)=>{
  const button=document.createElement('button'); button.className='answer-button'; button.textContent=answer;
  button.addEventListener('click',()=>chooseAnswer(index)); answers.appendChild(button);
 });
}
function chooseAnswer(index){
 if(selected)return; selected=true;
 const item=questions[current]; const buttons=[...answers.children];
 buttons.forEach((button,i)=>{button.disabled=true;if(i===item.correct)button.classList.add('correct');else if(i===index)button.classList.add('incorrect')});
 if(index===item.correct){score++;feedback.textContent=item.why}
 else{feedback.textContent='¡No pasa nada! Cada recuerdo es especial. La respuesta correcta está marcada. ♥'}
 next.disabled=false;
}
next.addEventListener('click',()=>{
 current++;
 if(current<questions.length){renderQuestion();return}
 progress.style.width='100%';
 document.getElementById('quizPanel').classList.add('hidden');
 document.getElementById('lockedPanel').classList.add('hidden');
 document.getElementById('puzzlePanel').classList.remove('hidden');
 document.getElementById('puzzleFeedback').textContent=`¡Terminaste el cuestionario! Acertaste ${score} de ${questions.length}. El rompecabezas está desbloqueado. ♥`;
 initPuzzle();
});

const board=document.getElementById('puzzleBoard');
const moveCount=document.getElementById('moveCount');
const puzzleFeedback=document.getElementById('puzzleFeedback');
let tiles=[],moves=0;
function solved(){return tiles.every((value,index)=>value===(index===8?0:index+1))}
function neighbors(index){const r=Math.floor(index/3),c=index%3;return [r>0?index-3:-1,r<2?index+3:-1,c>0?index-1:-1,c<2?index+1:-1].filter(n=>n>=0)}
function drawBoard(){
 board.innerHTML='';
 tiles.forEach((value,index)=>{
  const tile=document.createElement('button');tile.className='puzzle-tile'+(value===0?' empty':'');
  tile.setAttribute('aria-label',value===0?'Espacio vacío':`Pieza ${value}`);
  if(value!==0){const original=value-1;const row=Math.floor(original/3),col=original%3;tile.style.backgroundPosition=`${col*50}% ${row*50}%`;}
  tile.addEventListener('click',()=>moveTile(index));board.appendChild(tile);
 });
 moveCount.textContent=moves;
}
function moveTile(index){
 const empty=tiles.indexOf(0);if(!neighbors(empty).includes(index)||solved())return;
 [tiles[index],tiles[empty]]=[tiles[empty],tiles[index]];moves++;drawBoard();
 if(solved()){puzzleFeedback.textContent='¡Lo armaste! ♥';document.getElementById('puzzlePanel').classList.add('hidden');document.getElementById('winPanel').classList.remove('hidden');}
}
function shuffle(){
 tiles=[1,2,3,4,5,6,7,8,0];let empty=8,previous=-1;
 for(let i=0;i<100;i++){const choices=neighbors(empty).filter(n=>n!==previous);const chosen=choices[Math.floor(Math.random()*choices.length)];[tiles[empty],tiles[chosen]]=[tiles[chosen],tiles[empty]];previous=empty;empty=chosen;}
 if(solved())shuffle();
 moves=0;drawBoard();puzzleFeedback.textContent='';
}
function initPuzzle(){shuffle();}
document.getElementById('shuffleButton').addEventListener('click',shuffle);
renderQuestion();
