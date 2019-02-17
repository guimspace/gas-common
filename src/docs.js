function bodyReplaceAllText_(body, list, sign) {
  var key, c1, c2;

  switch(sign) {
    case "braces":
      c1 = "{";
      c2 = "}";
      break;
    case "at":
      c1 = "@";
      c2 = c1;
      break;
    case "percent":
    default:
      c1 = "%";
      c2 = c1;
      break;
  }


  for(key in list) {
    body.replaceText(c1 + key + c2, list[key]);
  }
}
