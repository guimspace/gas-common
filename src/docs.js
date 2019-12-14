/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

function getSign(name, double) {
	switch (sign) {
		case "curly":
			c1 = "{";
			c2 = "}";
			break;
		case "round":
			c1 = "(";
			c2 = ")";
			break;
		case "square":
			c1 = "[";
			c2 = "]";
			break;
		case "at":
			c1 = "@";
			c2 = c1;
			break;
		case "hashtag":
			c1 = "#";
			c2 = c1;
			break;

		case "percent":
		default:
			c1 = "%";
			c2 = c1;
			break;
	}

	if (double) {
		c1 += c1;
		c2 += c2;
	}

	return [c1, c2];
}

function bodyReplaceAllText_(body, list, sign, double) {
	var key, c1, c2;

	[c1, c2] = getSign(sign, double);

	for (key in list) {
		if ( !/\w+/.test(key) ) continue;

		body.replaceText(c1 + key + c2, list[key]);
	}
}


function bodyReplaceFirstText_(body, list, sign, double) {
	var range, texto, index;
	var key, c1, c2;

	[c1, c2] = getSign(sign, double);

	for (key in list) {
		if ( !/\w+/.test(key) ) continue;

		range = body.findText(c1 + key + c2);
		if (!range) continue;

		index = range.getStartOffset();
		texto = range.getElement().asText();
		texto.deleteText(index, range.getEndOffsetInclusive());
		texto.insertText(index, list[key]);
	}
}


function bodyReplaceFirstHyperlink_(body, list, sign, double) {
	var range, texto, index;
	var key, c1, c2;

	[c1, c2] = getSign(sign, double);

	for (key in list) {
		if ( !/\w+/.test(key) ) continue;

		range = body.findText(c1 + key + c2);
		if (!range) continue;

		index = range.getStartOffset();
		texto = range.getElement().asText();
		texto.deleteText(index, range.getEndOffsetInclusive());
		texto.insertText(index, list[key].text).setLinkUrl(index, index + list[key].url.length - 1, list[key].url);
	}
}
