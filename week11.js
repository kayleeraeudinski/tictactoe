/**
 * Using any of the tools you've worked with so far, create a game of Tic-Tac-Toe.
 * 
 * Create a Tic-Tac-Toe game grid using your HTML element of choice.
 * When a cell in the grid is clicked, an X or O should appear in that spot depending on whose turn it is.
 * A heading should say whether it is X's or O's turn and change with each move made.
 * A button should be available to clear the grid and restart the game.
 * When a player has won, or the board is full and the game results in a draw, 
a Bootstrap alert or similar Bootstrap component should appear across the screen announcing the winner.
 */
// the box on grid
let box0 = $('#box0');
let box1 = $('#box1');
let box2 = $('#box2');
let box3 = $('#box3');
let box4 = $('#box4');
let box5 = $('#box5');
let box6 = $('#box6');
let box7 = $('#box7');
let box8 = $('#box8');

//player variables - if click is x or o
let player1 = "x";
let player2 = "o";

let turn = 0;

let winner = false;

/**hide alerts */
$('#alertStart').hide();
$('#alertWinner').hide();
$('#alertDraw').hide();

//keep track of turns
let currentPlayer = '';

//possible outcomes
const winningOutcomes = [
    [box0, box1, box2], [box3, box4, box5], [box6, box7, box8],
    [box0, box3, box6], [box1, box4, box7], [box2, box5, box8],
    [box0, box4, box8], [box2, box4, box6]
];


const endGame=()=>{
    console.log('GAME OVER');
    $(".box").css("pointer-events", "none");
    $('#p1').removeClass("bg-light border border-info");
    $('#p2').removeClass("bg-light border border-info");

};

//check winner
const checkWinner = (currentPlayer, a, b, c) =>{

    if(a.text() === currentPlayer && b.text() === currentPlayer && c.text() === currentPlayer){
        winner = true;
        console.log(`Found Winner! it is ${currentPlayer}!`);

        a.removeClass('text-info bg-dark');
        b.removeClass('text-info bg-dark');
        c.removeClass('text-info bg-dark');

        a.addClass('text-dark bg-info');
        b.addClass('text-dark bg-info');
        c.addClass('text-dark bg-info');


        if(currentPlayer === 'x'){
        currentPlayer = 'Player 1';
        } else{
            currentPlayer = 'Player 2';
        }

        $('#alertWinner').text(`GAME OVER ${currentPlayer} WINS`)
        $('#alertWinner').show();

        endGame();
    }
}

//feed arrays - check outcomes
const checkOutcomes = () => {
    checkWinner(currentPlayer, ...winningOutcomes[0]);
    checkWinner(currentPlayer, ...winningOutcomes[1]);
    checkWinner(currentPlayer, ...winningOutcomes[2]);
    checkWinner(currentPlayer, ...winningOutcomes[3]);
    checkWinner(currentPlayer, ...winningOutcomes[4]);
    checkWinner(currentPlayer, ...winningOutcomes[5]);
    checkWinner(currentPlayer, ...winningOutcomes[6]);
    checkWinner(currentPlayer, ...winningOutcomes[7]);

if(turn === 9 && winner === false){
    endGame();
    $('#alertDraw').show();
}
};




const startGame = () => {

    console.log("Start Game!");
    console.log(turn++);
    currentPlayer = player1;
    console.log(currentPlayer);

    //show who's turn it is
    $('#p1').addClass("bg-light border border-info");

    //show the start alert
    $('#alertStart').show();

    $('.box').on('click', function(){
        $('#alertStart').hide();

        $(this).text(currentPlayer);

        if(turn > 4){
            //check winners
            console.log('winner??');
            checkOutcomes();
        }
        if(winner === false){

            if(currentPlayer === player1){
                currentPlayer = player2;
                console.log(turn++);
                $('#p2').addClass("bg-light border border-info");
                $('#p1').removeClass("bg-light border border-info");
            } else{
                currentPlayer = player1;
                console.log(turn++);

                $('#p1').addClass("bg-light border border-info");
                $('#p2').removeClass("bg-light border border-info");
            }
        }

    })

}

//startgaem 
document.getElementById('startBtn').addEventListener('click', ()=> startGame());

//reset game
document.getElementById('resetBtn').addEventListener('click', ()=> document.location.reload(true));
