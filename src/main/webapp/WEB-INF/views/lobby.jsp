<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<spring:url value="/resources/js/lobby.js" var="lobbyJs"/>
	<spring:url value="/resources/js/jquery-3.1.1.min.js" var="jqueryJs" />

	<script src="${jqueryJs}"></script>
	<script src="${lobbyJs}"></script>
<title>Insert title here</title>
</head>
<body>
	<center>
		<h2>Welcome! You have been assigned the Id:</h2>
		<h3 id="id">
			${id}
		</h3>
		Type in the id of another user to invite:
		<input type="text" id="inviteName" placeholder="Id"/>
		<input type="button" id="inviteButton" value="Invite"/>
	</center>
</body>
</html>