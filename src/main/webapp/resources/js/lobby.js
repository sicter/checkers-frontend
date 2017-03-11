/**
 * 
 */

jQuery(document).ready(function($){
	var id = $('#id').html();
	// var id2 = $('#id2').html();
	turnOnInviteButton();
	
	getInvitation(id);
	//getInvitation(id2);
	//getInvitation(id3);
	//getInvitation(id4);
	//setTimeout(function(){sendInvitation(id2,id)},2000);
	//setTimeout(function(){acceptInvitation(id,id2)},4000);
});

function turnOnInviteButton() {
	var btn = $('#inviteButton');
	btn.val('Invite');
	btn.click(function() {
		var receiverId = $('#inviteName').val();
		var senderId = $('#id').html();
		sendInvitation(senderId,receiverId);
	});
	btn.prop('disabled',false);
}

function turnOffInviteButton() {
	$('#inviteButton').val('Invite Sent');
	$('#inviteButton').prop('disabled',true);
}

function getInvitation(id) {
	var postData = {};
	postData['playerId'] = id;
	
	$.ajax({
		type: 'POST',
		url: 'invitationWait.html',
		data: postData,
		dataType: 'json',
		complete: function(data) {
			handleGetInvitationSuccess(data);
		}
	});
}

function handleGetInvitationSuccess(data) {
	var senderId = data['responseJSON']['sender']['id'];	
	
	var accepted = confirm(senderId + '\nhas sent you and invite! Accept?');
	if (accepted) {
		acceptInvitation($('#id').html(), senderId);
	} else {
		
	}
}

function sendInvitation(senderId, receiverId) {
	var postData = {};
	postData['senderId'] = senderId;
	postData['receiverId'] = receiverId;
	
	turnOffInviteButton();

	$.ajax({
		type: 'POST',
		url: 'postInvite.html',
		data: postData,
		dataType: 'json',
		complete: function(data) {	
			handleSendInvitationComplete(data);
		}
	});
}

//Handles data returned by completion of request to send an invite
function handleSendInvitationComplete(data) {
	turnOnInviteButton();
	if (data['statusText'] == 'error') {
		return;
	}
	game = data['responseJSON'];
	localStorage.setItem('game', JSON.stringify(game));
	//window.location.replace("checkersGame?thisPlayer=2");
}

// Sends accept request to controller with the sender and receiver id
function acceptInvitation(receiverId, senderId) {
	var postData = {};
	postData['senderId'] = senderId;
	postData['receiverId'] = receiverId;
	
	$.ajax({
		type: 'POST',
		url: 'postInviteAccept.html',
		data: postData,
		dataType: 'json',
		complete: function(data) {
			handleAcceptInvitationComplete(data);
		}
	});
}

// Handles data returned by completion of request to accept an invite
function handleAcceptInvitationComplete(data) {
	game = data['responseJSON'];
	localStorage.setItem('game', JSON.stringify(game));
	window.location.replace("checkersGame?thisPlayer=1");
}

