package com.cs451.checkers;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.Timer;

public class HTTPRequests {

	public static String sendGETRequest(String urlString) throws Exception{
		URL url = new URL(urlString);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		con.setRequestMethod("GET");
		con.setRequestProperty("User-Agent", "Mozilla/5.0");
		con.setRequestProperty("Accept-Language", "en-US;en;q=0.5");
		con.setRequestProperty("Content-Type", "application/json");
		con.setConnectTimeout(0);
		con.setReadTimeout(0);
		
		System.out.println("Sending GET request: " + url);
		int responseCode = con.getResponseCode();
		System.out.println("Response code: " + responseCode);
		if (responseCode == 503) {
			return "503";
		}
		
		StringBuffer response = new StringBuffer();
		String dataString;
		try{
			BufferedReader in = new BufferedReader( new InputStreamReader(con.getInputStream()));
			String output;
			response = new StringBuffer();
			
			while ((output = in.readLine()) != null) {
				response.append(output);
			}
			in.close();
			
			dataString = response.toString();
		} catch (Exception e) {
			System.out.print(e.getMessage());
			dataString = "{ message: \'" + e.getMessage() + "\'}";
		}		
		
		System.out.println(dataString);
		
		return dataString;
	}
	
	public static String sendPOSTRequest(String urlString, String jsonBody) throws Exception {
		URL url = new URL(urlString);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		
		con.setRequestMethod("POST");
		con.setRequestProperty("User-Agent", "Mozilla/5.0");
		con.setRequestProperty("Accept-Language", "en-US;en;q=0.5");
		con.setRequestProperty("Content-Type", "application/json");
		
		con.setDoOutput(true);
		DataOutputStream wr = new DataOutputStream(con.getOutputStream());
		wr.writeBytes(jsonBody);
		wr.flush();
		wr.close();
		
		System.out.println("\nSending 'POST' requeset to URL: " + url);
		System.out.println("Post Data: " + jsonBody);
		int responseCode = con.getResponseCode();
		System.out.println("Response Code: " + responseCode);
		if (responseCode == 503) {
			return "503";
		}
		
		BufferedReader in = new BufferedReader( new InputStreamReader(con.getInputStream()));
		String output;
		StringBuffer response = new StringBuffer();
		
		while ((output = in.readLine()) != null) {
			response.append(output);
		}
		in.close();
		String dataString = response.toString();
		return dataString;
	}
}
