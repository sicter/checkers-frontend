/**
 * 
 */

var game;
var gameId;
var playerId;
var sourceCoords = '0_0';
var destinationCoords = '0_0';
var possibleMoves;
var playerTurn;
var thisPlayer;
var selectedPiece;

jQuery(document).ready(function($){
	game = JSON.parse(localStorage.getItem('game'));
	playerId = localStorage.getItem('playerId');
	thisPlayer = getParameterByName('thisPlayer');
	
	var btn = $('#quitButton');
	btn.val('Quit');
	btn.click(function() {
		quitGame();
	});
	btn.prop('disabled',false);
	
	updateBoard(game);
});

function quitGame() {
	var jsonData = {'gameId': gameId};
	$.ajax({
		method: 'POST',
		url: 'removeGame.html',
		data: jsonData,
		dataType: 'json',
		complete: function(data) {
			
		}
	});
	jsonData = {'playerId': playerId};
	$.ajax({
		method: 'POST',
		url: 'removePlayer.html',
		data: jsonData,
		dataType: 'json',
		complete: function(data) {
			
		}
	});
	localStorage.setItem('game', null);
	window.location.replace("lobby");
}

// Sends GET request to retrieve the current state of the board
function getUpdate() {
	var jsonData = {};
	jsonData['gameId'] = gameId;
	$.ajax({
		method: 'POST',
		url : 'getUpdate.html',
		data: jsonData,
		dataType: 'json',
		complete: function(data) {
			updateBoard(data['responseJSON']);
		}
	});
}

// Sends POST request containing json data for the move being made
function postMove(jsonData) {
	$.ajax({
		method : 'POST',
		url : 'makeMove.html',
		data : jsonData,
		dataType : 'json',
		complete: function(data) {
			updateBoard(data['responseJSON']);
		}
	});
}

// Formats move into a json object, then sends the move
function makeMove(destinationId) {
	hidePossibleMoves(selectedPiece);
	unselectPiece();
	var jsonData = {};
	jsonData['startPos'] = sourceCoords
	jsonData['endPos'] = destinationId;
	jsonData['player'] = playerTurn;
	jsonData['gameId'] = gameId;
	
	postMove(jsonData);
}

// Update the board html to display the current piece positions
function updateBoard(jsonData) {
	var isOver = jsonData['isOver'];
	var gameOverText;
	if (isOver == '1') {
		if (playerTurn == thisPlayer) {
			gameOverText = 'You lost!';
		} else {
			gameOverText = 'You won!';
		}
	} else if (isOver == '2') {
		gameOverText = 'A player left the game!';
	}
	if (gameOverText) {
		alert(gameOverText);
		quitGame();
	}
	
	
	possibleMoves = jsonData['moves'];
	board = jsonData['game']['board'];
	playerTurn = jsonData['playerTurn'];
	gameId = game['game']['id'];
	
	// Update player color & turn
	var playerColor = (thisPlayer == '1' ? 'black' : 'red');
	$('#playerColor').html('You are color ' + playerColor + '.');
	var playerTurnString = (playerTurn == thisPlayer ? 'your' : 'the other player\'s');
	$('#playerTurn').html('It is ' + playerTurnString + ' turn.');
	
	// Update board
	for (i = 0; i < board.length; i++) {
		for (j = 0; j < board[i].length; j++) {
			var spaceId = i + '_' + j;
			if (board[i][j] == '0') {
				$('#' + spaceId).html('');
				continue;
			}
			var htmlString = '<div class=';
			if (board[i][j] == '1') {
				var pieceId = 'blackPiece' + i + '_' + j;
				htmlString += '"blackPiece ';
				if (playerTurn == '1' && thisPlayer == playerTurn) {
					htmlString += 'blackPieceActive" id="' + pieceId + '" onClick="selectPiece(\'' + pieceId + '\')"/>';
				} else {
					htmlString += '"/>';
				}
			} else if (board[i][j] == '2') {
				var pieceId = 'redPiece' + i + '_' + j;
				htmlString += '"redPiece ';
				if (playerTurn == '2' && thisPlayer == playerTurn) {
					htmlString += 'redPieceActive" id="' + pieceId + '" onClick="selectPiece(\'' + pieceId + '\')"/>';
				} else {
					htmlString += '"/>';
				}
			} else if (board[i][j] == '3') {
				var pieceId = 'blackPieceKing' + i + '_' + j;
				htmlString += '"blackPiece blackPieceKing ';
				if (playerTurn == '1' && thisPlayer == playerTurn) {
					htmlString += 'blackPieceActive" id="' + pieceId + '" onClick="selectPiece(\'' + pieceId + '\')">&#9813</div>';
				} else {
					htmlString += '">&#9813</div>';
				}
			} else if (board[i][j] == '4') {
				var pieceId = 'redPieceKing' + i + '_' + j;
				htmlString += '"redPiece redPieceKing ';
				if (playerTurn == '2' && thisPlayer == playerTurn) {
					htmlString += 'redPieceActive" id="' + pieceId + '" onClick="selectPiece(\'' + pieceId + '\')">&#9813</div>';
				} else {
					htmlString += '">&#9813</div>';
				}
			}
			$('#' + spaceId).html(htmlString);
		}
	}
	
	if (playerTurn != thisPlayer) {
		getUpdate();
	}
}

// Update html of board to display possible moves for this piece and allow the piece to be moved
function selectPiece(pieceId) {
	if (selectedPiece) {
		unselectPiece();
	}
	displayPossibleMoves(pieceId);
	var piece = $('#' + pieceId);
	var classes = piece.attr('class');
	piece.attr('class', classes + ' selected');
	selectedPiece = pieceId;
}

function unselectPiece() {
	var piece = $('#' + selectedPiece);
	var classes = piece.attr('class');
	classes = classes.replace(' selected','');
	piece.attr('class', classes);
	hidePossibleMoves(selectedPiece);
	selectedPiece = null;
}

// Displays the possible moves of the currently selected piece
function displayPossibleMoves(pieceId) {
	var sourceId = pieceId.substring(pieceId.length - 3, pieceId.length);
	sourceCoords = sourceId;
	var destinationIds = possibleMoves[sourceId];
	if (!destinationIds) {
		return;
	}
	for (j = 0; j < destinationIds.length; j++) {
		var destination = $('#' + destinationIds[j]);
		var classesString = destination.attr('class');
		if (!classesString.includes('availableMove')) {
			destination.attr('class', classesString + ' availableMove');
		}
		destination.attr('onclick', 'makeMove("' + destinationIds[j] + '")');
	}
}

// Un-highlights the valid spaces to move to for a piece
function hidePossibleMoves(pieceId) {
	var sourceId = pieceId.substring(pieceId.length - 3, pieceId.length);
	var destinationIds = possibleMoves[sourceId];
	if (!destinationIds) {
		return;
	}
	for (j = 0; j < destinationIds.length; j++) {
		var destination = $('#' + destinationIds[j]);
		var classesString = destination.attr('class');
		
		classesString = classesString.replace(' availableMove','');
		destination.attr('class', classesString);
		destination.attr('onclick', '');
	}
}

function displayAllPossibleMoves(allPossibleMoves) {
	for (i = 0; i < allPossibleMoves.length; i++) {
		var sourceId = Object.keys(allPossibleMoves)[0];
		var destinationIds = allPossibleMoves[sourceId];
		for (j = 0; j < destinationIds.length; j++) {
			var classesString = $('#' + destinationIds[j]).attr('class');
			if (!classesString.includes('availableMove')) {
				$('#' + destinationIds[j]).attr('class', classesString + ' availableMove');
			}
		}
	}
}

function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}