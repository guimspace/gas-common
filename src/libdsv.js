function parseDsvTo2DArray_(source, delimiter) {
  var data;

  if(!delimiter  ||  delimiter == "") delimiter = ",";


  switch(typeof source) {
    case "object":
      if(source.getBlob().getContentType() !== "text/csv") return;
      source = source.getBlob().getDataAsString();
      break;
    case "string":
      break;
    default:
      return;
  }

  try {
    data = Utilities.parseCsv(source, delimiter);
  } catch(err) {
    console.error("parseDsvTo2DArray_()", err);
    return;
  }

  return data;
}
