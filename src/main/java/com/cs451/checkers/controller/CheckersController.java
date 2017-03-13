package com.cs451.checkers.controller;

import java.util.Date;
import java.util.Random;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.cs451.checkers.HTTPRequests;

@Controller
public class CheckersController {
	String message = "Welcome to Spring MVC!";
	private String urlBase = "https://damp-hollows-21554.herokuapp.com/";
 
	@RequestMapping("checkersGame")
	public ModelAndView showMessage(
			@RequestParam(value = "name", required = false, defaultValue = "World") String name) {
		System.out.println("in controller");
 
		ModelAndView mv = new ModelAndView("checkersGame");
		mv.addObject("userName", message);
		mv.addObject("name", name);
		return mv;
	}
	
	@RequestMapping(value = "/getUpdate", method=RequestMethod.POST)
	@ResponseBody
	public String getBoard(
			@RequestParam("gameId") String gameId) throws Exception{
		
		String url = urlBase + "server/game/getUpdate?gameID="+gameId;
		
		String response = "503";
		while (response == "503") {
			response = HTTPRequests.sendGETRequest(url);
		}

		return response;
	}
	
	@RequestMapping(value = "/makeMove", method=RequestMethod.POST)
	@ResponseBody
	public String makeMove(
			@RequestParam("startPos") String startPos,
			@RequestParam("endPos") String endPos,
			@RequestParam("player") String player,
			@RequestParam("gameId") String gameId) throws Exception{
			
		String url = urlBase + "server/game/update";
		
		JSONObject body = new JSONObject();
		JSONObject move = new JSONObject();
		move.put("startPos", startPos);
		move.put("endPos", endPos);
		body.put("move", move);
		body.put("player", player);
		body.put("gameID", gameId);
		
		String response = "503";
		while (response == "503") {
			response = HTTPRequests.sendPOSTRequest(url, body.toString());
		}
		
		return response;
	}
	
	@RequestMapping(value = "/removeGame", method=RequestMethod.POST)
	@ResponseBody
	public String removeGame(
			@RequestParam("gameId") String gameId) throws Exception {
		
		String url = urlBase + "server/game/remove";
		
		JSONObject body = new JSONObject();
		body.put("gameID", gameId);
		
		String response = HTTPRequests.sendPOSTRequest(url, body.toString());
		return response;
	}
	
	@RequestMapping(value = "/removePlayer", method=RequestMethod.POST)
	@ResponseBody
	public String removePlayer(
			@RequestParam("playerId") String playerId) throws Exception {
		
		String url = urlBase + "server/player/remove";
		
		JSONObject body = new JSONObject();
		body.put("playerID", playerId);
		
		String response = HTTPRequests.sendPOSTRequest(url, body.toString());
		return response;
	}
}
