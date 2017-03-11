<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<spring:url value="/resources/css/checkerboard.css" var="checkerboardCss" />
	<spring:url value="/resources/js/checkers.js" var="checkersJs" />
	<spring:url value="/resources/js/jquery-3.1.1.min.js" var="jqueryJs" />
	
	
	<link href="${checkerboardCss}" rel="stylesheet" />
	<script src="${jqueryJs}"></script>
	<script src="${checkersJs}"></script>	

<title>Spring 4 MVC -HelloWorld</title>
</head>
<body>
	<center>
		<div id="playerColor"></div>
		<div id="playerTurn"></div>
		<table class="checkerboard" id="checkerboard">
			<!-- 0th -->
			<tr id="row_0">
			<td class="black" id="0_0"></td>
			<td class="white" id="0_1"></td>
			<td class="black" id="0_2"></td>
			<td class="white" id="0_3"></td>
			<td class="black" id="0_4"></td>
			<td class="white" id="0_5"></td>
			<td class="black" id="0_6"></td>
			<td class="white" id="0_7"></td>
			</tr>			
			<!-- 1st -->
			<tr id="row_1">
			<td class="white" id="1_0"></td>
			<td class="black" id="1_1"></td>
			<td class="white" id="1_2"></td>
			<td class="black" id="1_3"></td>
			<td class="white" id="1_4"></td>
			<td class="black" id="1_5"></td>
			<td class="white" id="1_6"></td>
			<td class="black" id="1_7"></td>
			</tr>
			<!-- 2nd -->
			<tr id="row_2">
			<td class="black" id="2_0"></td>
			<td class="white" id="2_1"></td>
			<td class="black" id="2_2"></td>
			<td class="white" id="2_3"></td>
			<td class="black" id="2_4"></td>
			<td class="white" id="2_5"></td>
			<td class="black" id="2_6"></td>
			<td class="white" id="2_7"></td>
			</tr>
			<!-- 3rd -->
			<tr id="row_3">
			<td class="white" id="3_0"></td>
			<td class="black" id="3_1"></td>
			<td class="white" id="3_2"></td>
			<td class="black" id="3_3"></td>
			<td class="white" id="3_4"></td>
			<td class="black" id="3_5"></td>
			<td class="white" id="3_6"></td>
			<td class="black" id="3_7"></td>
			</tr>
			<!-- 4th -->
			<tr id="row_4">
			<td class="black" id="4_0"></td>
			<td class="white" id="4_1"></td>
			<td class="black" id="4_2"></td>
			<td class="white" id="4_3"></td>
			<td class="black" id="4_4"></td>
			<td class="white" id="4_5"></td>
			<td class="black" id="4_6"></td>
			<td class="white" id="4_7"></td>
			</tr>
			<!-- 5th -->
			<tr id="row_5">
			<td class="white" id="5_0"></td>
			<td class="black" id="5_1"></td>
			<td class="white" id="5_2"></td>
			<td class="black" id="5_3"></td>
			<td class="white" id="5_4"></td>
			<td class="black" id="5_5"></td>
			<td class="white" id="5_6"></td>
			<td class="black" id="5_7"></td>
			</tr>
			<!-- 6th -->
			<tr id="row_6">
			<td class="black" id="6_0"></td>
			<td class="white" id="6_1"></td>
			<td class="black" id="6_2"></td>
			<td class="white" id="6_3"></td>
			<td class="black" id="6_4"></td>
			<td class="white" id="6_5"></td>
			<td class="black" id="6_6"></td>
			<td class="white" id="6_7"></td>
			</tr>
			<!-- 7th -->
			<tr id="row_7">
			<td class="white" id="7_0"></td>
			<td class="black" id="7_1"></td>
			<td class="white" id="7_2"></td>
			<td class="black" id="7_3"></td>
			<td class="white" id="7_4"></td>
			<td class="black" id="7_5"></td>
			<td class="white" id="7_6"></td>
			<td class="black" id="7_7"></td>
			</tr>
		</table>
		<a href="/checkers">back</a>
	</center>
</body>
</html>