/**
 * Copyright (c) 2019 Guilherme T Maeoka
 * This code is licensed under MIT license.
 * <https://github.com/guimspace/gas-common>
 */

function getDigestAlgorithm(v) {
	switch (v) {
		case "MD5":
			return Utilities.DigestAlgorithm.MD5;
		case "SHA_1":
			return Utilities.DigestAlgorithm.SHA_1;
		case "SHA_256":
			return Utilities.DigestAlgorithm.SHA_256;
		case "SHA_512":
			return Utilities.DigestAlgorithm.SHA_512;

		default:
			return;
	}
}


function getMacAlgorithm(v) {
	switch (v) {
		case "MD5":
			return Utilities.MacAlgorithm.HMAC_MD5;
		case "SHA_1":
			return Utilities.MacAlgorithm.HMAC_SHA_1;
		case "SHA_256":
			return Utilities.MacAlgorithm.HMAC_SHA_256;
		case "SHA_512":
			return Utilities.MacAlgorithm.HMAC_SHA_512;

		default:
			return;
	}
}


function getChartset(v) {
	switch (v) {
		case "US_ASCII":
			return Utilities.Charset.US_ASCII;
		case "UTF_8":
			return Utilities.Charset.UTF_8;

		default:
			return;
	}
}


function base64Decode(base64data, charset, byte) {
	var decoded;

	charset = getChartset(charset);

	decoded = Utilities.base64Decode(base64data, charset);

	if (!byte) {
		decoded = Utilities.newBlob(decoded).getDataAsString();
	}

	return decoded;
}


function base64DecodeWebSafe(base64data, charset, byte) {
	var decoded;

	charset = getChartset(charset);

	decoded = Utilities.base64DecodeWebSafe(base64data, charset);

	if (!byte) {
		decoded = Utilities.newBlob(decoded).getDataAsString();
	}

	return decoded;
}


function computeDigest(algorithm, value, charset, byte) {
	var digest;

	algorithm = getDigestAlgorithm(algorithm);
	charset = getChartset(charset);

	digest = Utilities.computeDigest(algorithm, value, charset);

	if (!byte) {
		digest = bin2String(digest);
	}

	return digest;
}


function computeHmacSignature(algorithm, value, key, charset, byte) {
	var digest;

	algorithm = getMacAlgorithm(algorithm);
	charset = getChartset(charset);

	digest = Utilities.computeHmacSignature(algorithm, value, key, charset);

	if (!byte) {
		digest = bin2String(digest);
	}

	return digest;
}
