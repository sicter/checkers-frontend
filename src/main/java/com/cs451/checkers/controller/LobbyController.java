package com.cs451.checkers.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import org.json.JSONObject;

import com.cs451.checkers.HTTPRequests;

@Controller
public class LobbyController {

	private String urlBase = "https://damp-hollows-21554.herokuapp.com/";

	@RequestMapping("lobby")
	public ModelAndView showId() throws Exception {

		ModelAndView mv = new ModelAndView("lobby");
		mv.addObject("id", getId());


		String id = (String)mv.getModel().get("id");
		System.out.println(id);
		return mv;

	}

	public String getId() throws Exception {
		String url = urlBase + "server/player/create";
		JSONObject data;
		try {
			data = new JSONObject(HTTPRequests.sendPOSTRequest(url, ""));
		} catch (Exception e) {
			return e.getMessage();
		}
		
		String username = data.getString("id");
		return username;
	}

	@RequestMapping(value = "/postInvite", method=RequestMethod.POST)
	@ResponseBody
	public String sendInvitation(
			@RequestParam("senderId") String senderId,
			@RequestParam("receiverId") String receiverId) throws Exception {

		senderId = senderId.replaceAll("[^a-zA-Z0-9]","");
		receiverId = receiverId.replaceAll("[^a-zA-Z0-9]","");
		String url = urlBase + "server/player/sendInvite?receiverID="+receiverId+"&senderID="+senderId;

		String response = HTTPRequests.sendGETRequest(url);

		return response;
	}

	@RequestMapping(value = "/postInviteAccept", method=RequestMethod.POST)
	@ResponseBody
	public String acceptInvitation(
			@RequestParam("senderId") String senderId,
			@RequestParam("receiverId") String receiverId) throws Exception {

		senderId = senderId.replaceAll("[^a-zA-Z0-9]","");
		receiverId = receiverId.replaceAll("[^a-zA-Z0-9]","");
		String url = urlBase + "server/player/acceptInvite";

		JSONObject body = new JSONObject();
		body.put("senderID", senderId);
		body.put("receiverID", receiverId);
		String response = HTTPRequests.sendPOSTRequest(url, body.toString());

		return response;
	}
	
	@RequestMapping(value = "/invitationWait", method=RequestMethod.POST)
	@ResponseBody
	public String openInviteWaiter(
			@RequestParam("playerId") String playerId) throws Exception{

		playerId = playerId.replaceAll("[^a-zA-Z0-9]","");
		String url = urlBase + "server/player/getInvite?playerID="+playerId;

		String response = "503";
		while (response == "503") {
			response = HTTPRequests.sendGETRequest(url);
		}

		return response;
	}
}
