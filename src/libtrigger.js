/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

/**
 * Creates a trigger and store the id in a key of property store.
 * @param  {String} method The method to get a property store
 * @param  {String} key    The key for the property
 * @param  {String} type   The type of the trigger
 * @param  {String} name   The function to call when the trigger fires
 */
function createScriptAppTriggers_(method, key, type, name, param1, param2, param3) {
	var properties, trigger;
	var timezone;

	const weekday = [ ScriptApp.WeekDay.SUNDAY, ScriptApp.WeekDay.MONDAY, ScriptApp.WeekDay.TUESDAY, ScriptApp.WeekDay.WEDNESDAY, ScriptApp.WeekDay.THURSDAY, ScriptApp.WeekDay.FRIDAY, ScriptApp.WeekDay.SATURDAY ];

	timezone = SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone();
	if (!timezone) timezone = "GMT";

	trigger = ScriptApp.newTrigger(name);

	if (type === "onOpen") {
		trigger.forSpreadsheet( SpreadsheetApp.getActiveSpreadsheet().getId() )
			.onOpen();

	} else if (type === "onEdit") {
		trigger.forSpreadsheet( SpreadsheetApp.getActiveSpreadsheet().getId() )
			.onEdit();

	} else if (type === "onChange") {
		trigger.forSpreadsheet( SpreadsheetApp.getActiveSpreadsheet().getId() )
			.onChange();

	} else if (type === "onFormSubmit") {
		trigger.forSpreadsheet( SpreadsheetApp.getActiveSpreadsheet().getId() )
			.onFormSubmit();

	} else if (type === "afterMilliseconds") {
		trigger.timeBased()
			.after(param1)
			.inTimezone(timezone);

	} else if (type === "atTime") {
		trigger.timeBased()
			.at(param1)
			.inTimezone(timezone);

	} else if (type === "atDate") {
		trigger.timeBased()
			.atDate(param1, param2, param3)
			.inTimezone(timezone);

	} else if (type === "onMonthDay") {
		if (param2 == null) param2 = 0;
		if (param3 == null) param3 = 0;

		trigger.timeBased()
			.onMonthDay(param1)
			.atHour(param2)
			.nearMinute(param3)
			.inTimezone(timezone);

	} else if (type === "onWeekDay") {
		if (param2 == null) param2 = 0;
		if (param3 == null) param3 = 0;

		trigger.timeBased()
			.onWeekDay(weekday[param1])
			.atHour(param2)
			.nearMinute(param3)
			.inTimezone(timezone);

	} else if (type === "everyMinutes") {
		trigger.timeBased()
			.everyMinutes(param1)
			.inTimezone(timezone);

	} else if (type === "everyHours") {
		trigger.timeBased()
			.everyHours(param1)
			.inTimezone(timezone);

	} else if (type === "everyDays") {
		if (param2 == null) param2 = 0;
		if (param3 == null) param3 = 0;

		trigger.timeBased()
			.everyDays(param1)
			.atHour(param2)
			.nearMinute(param3)
			.inTimezone(timezone);

	} else if (type === "everyWeeks") {
		trigger.timeBased()
			.everyWeeks(param1)
			.inTimezone(timezone);

	} else {
		throw new Error("createNewTrigger_(): Invalid trigger type.");
	}

	trigger.create();

	if (key) {
		switch (method) {
			case "document":
				properties = PropertiesService.getDocumentProperties();
				break;
			case "script":
				properties = PropertiesService.getScriptProperties();
				break;

			case "user":
			default:
				properties = PropertiesService.getUserProperties();
				break;
		}

		properties.setProperty(key, trigger.getUniqueId());
	}
}

/**
 * Deletes a trigger of id stored in a given key of property store.
 * @param  {String} method The method to get a property store
 * @param  {String} key    The key for the property
 * @param  {String} name   The name of the function
 */
function deleteScriptAppTriggers_(method, key, name) {
	var properties;
	var triggers, trigger_id;
	var i;

	switch (method) {
		case "document":
			properties = PropertiesService.getDocumentProperties();
			break;
		case "script":
			properties = PropertiesService.getScriptProperties();
			break;
		case "user":
		default:
			properties = PropertiesService.getUserProperties();
			break;
	}

	triggers = ScriptApp.getUserTriggers( SpreadsheetApp.getActiveSpreadsheet() );

	if (key) {
		trigger_id = properties.getProperty(key);
		if (!trigger_id) return;

		for (i = 0; i < triggers.length; i++) {
			if (triggers[i].getUniqueId() === trigger_id) {
				ScriptApp.deleteTrigger(triggers[i]);
				properties.deleteProperty(key);
				break;
			}
		}
	} else {
		for (i = 0; i < triggers.length; i++) {
			if (triggers[i].getHandlerFunction() === name) {
				ScriptApp.deleteTrigger(triggers[i]);
				break;
			}
		}
	}
}

/**
 * Purges all triggers.
 */
function purgeScriptAppTriggers_() {
	var triggers = ScriptApp.getUserTriggers( SpreadsheetApp.getActiveSpreadsheet() );

	for (var i = 0; i < triggers.length; i++) {
		ScriptApp.deleteTrigger(triggers[i]);
	}
}
