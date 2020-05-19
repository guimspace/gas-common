/**
 * Copyright (c) 2020 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

/**
 * Sends an email requesting re-authorization of the script.
 * The property "authorization_status" ensures the recipient receives the email
 * only once (for every new re-authorization needed), otherwise the function
 * would send an email in every call.
 *
 * @return {Boolean} True if re-authorization is required.
 */
function isReAuthorizationRequired_() {
	try {
		var documentProperties = PropertiesService.getDocumentProperties();
	} catch (err) {
		Logger.log(err.message);
		return true;
	}

	var authInfoLevel = ScriptApp.getAuthorizationInfo(ScriptApp.AuthMode.FULL);
	var htmlTemplate, htmlMessage;

	if (authInfoLevel.getAuthorizationStatus() == ScriptApp.AuthorizationStatus.NOT_REQUIRED) {
		documentProperties.deleteProperty("auth_request_sent");
		return false;
	}

	if (!documentProperties.getProperty("auth_request_sent") && MailApp.getRemainingDailyQuota() > 0) {
		htmlTemplate = HtmlService.createTemplateFromFile("html");

		htmlTemplate.url = authInfoLevel.getAuthorizationUrl();

		htmlMessage = htmlTemplate.evaluate();
		MailApp.sendEmail(
			Session.getEffectiveUser().getEmail(),
			"",
			htmlMessage.getContent(), {
				name: "",
				htmlBody: htmlMessage.getContent(),
				noReply: true
			});

		documentProperties.setProperty("auth_request_sent", "[ ]");
	}

	return true;
}
