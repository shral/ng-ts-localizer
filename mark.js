var fs = require('fs');
var path = require('path');
var process = require("process");

var workingPath = getPathArgument() || ".";

fs.readdir(workingPath, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  files.forEach(function (file, index) {
    var fromPath = path.join(workingPath, file);

    console.log("file:",file);
    if(file.indexOf(".ts") > -1){
        fs.stat(fromPath, function (error, stat) {
        if (error) {
          console.error("Error stating file.", error);
          return;
        }

        if (stat.isFile())
          console.log("'%s' is a file.", fromPath);
        else if (stat.isDirectory())
          console.log("'%s' is a directory.", fromPath);


        fs.readFile(fromPath, 'utf8', function (err,data) {
          if (err) {
            return console.log(err);
          }
          var maneNameOfFile = "";
          const regex = /([\w-_\d]*)./;
          if ((m = regex.exec(file)) !== null) {
            maneNameOfFile = m[0];
          }

          var result = data.replace(/("|')([\w\s.\\]*)("|')/g, function (match, p1, p2, p3, offset, string) {
            if(p2.indexOf(" ") > -1){
              console.log("Match:",p2);
              return "$localize `:@@"+maneNameOfFile+p2.toLowerCase().replace(/\s/g, "_")+":"+p2+"`";
            }else{
              return match;
            }
          });
          fs.writeFile(fromPath, result, 'utf8', function (err) {
             if (err) return console.log(err);
          });
        })

      });
    }
  });
});


function getPathArgument(){
  var path;
  process.argv.forEach((p)=>{
    console.log("p",p);
    if(p.indexOf("--path") > -1){
      path = p.replace(/--path=/,"");
    }
  })
  return path;
}