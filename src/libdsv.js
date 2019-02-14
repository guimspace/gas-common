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


function transform2DArrayToDsv_(data, delimiter) {
  var output, i, j;


  if(delimiter) {
    output = data[0][0];

    for(j = 1;  j < data[0].length;  j++) {
      output += delimiter + data[0][j];
    }

    for(i = 1;  i < data.length;  i++) {
      output += "\n";

      output += data[i][0];
      for(j = 1;  j < data[i].length;  j++) {
        output += delimiter + data[i][j];
      }
    }

  } else {
    output = data.join("\n");
  }

  return output;
}
