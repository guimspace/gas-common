function bodyReplaceAllText_(body, list, sign) {
  var key, c;

  switch(sign) {
    case "at":
      c = "@";
      break;
    case "percent":
    default:
      c = "%";
      break;
  }


  for(key in list) {
    body.replaceText(c + key + c, list[key]);
  }
}
