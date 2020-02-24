#!/usr/bin/env node

/**
 * @author Shefki Esadi <shralsheki@gmail.com>
 * @since 12.02.2020
 */

var fs = require('fs');
var path = require('path');
var process = require("process");

var workingPath = getPathArgument() || ".";

readFolder(workingPath);

function readFolder(currentPath){
  fs.readdir(currentPath, function (err, files) {
    if (err) {
      console.error("Could not list the directory.", err);
      process.exit(1);
    }

    files.forEach(function (file, index) {
      var fromPath = path.join(currentPath, file);


          fs.stat(fromPath, function (error, stat) {
            if(stat && stat.isFile() && (file.indexOf(".ts") > -1 || file.indexOf(".html") > -1) && file.indexOf(".d.ts") === -1){
                    console.log("file:",file);
              if (error) {
                console.error("Error stating file.", error);
                return;
              }
              fs.readFile(fromPath, 'utf8', function (err,data) {
                if (err) {
                  return console.log(err);
                }
                var maneNameOfFile = "";
                const regex = /([\w-_\d]*)./;
                if ((m = regex.exec(file)) !== null) {
                  maneNameOfFile = m[0];
                }
                var result = data.replace(/(")([\$\{\}\.\!\:\w\s.\\']*)(")/g, function (match, p1, p2, p3, offset, string) {
                  if(p2.indexOf(" ") > -1 && p1 === p3){
                    return "$localize `:@@"+maneNameOfFile+p2
                            .toLowerCase()
                            .replace(/\'/g, "")
                            .replace(/\:/g, "")
                            .replace(/\!/g, "")
                            .replace(/\$\{/g, "")
                            .replace(/\}/g, "")
                            .replace(/\./g, "")
                            .replace(/\s/g, "_")+":"+p2+"`";
                  }else{
                    return match;
                  }
                });
                var result2 = result.replace(/(`)([\$\{\}\.\!\:\w\s.\\']*)(`)/g, function (match, p1, p2, p3, offset, string) {
                  if(p2.indexOf(" ") > -1 && p1 === p3){
                    return "$localize `:@@"+maneNameOfFile+p2
                            .toLowerCase()
                            .replace(/\'/g, "")
                            .replace(/\:/g, "")
                            .replace(/\!/g, "")
                            .replace(/\$\{/g, "")
                            .replace(/\}/g, "")
                            .replace(/\./g, "")
                            .replace(/\s/g, "_")+":"+p2+"`";
                  }else{
                    return match;
                  }
                });
                var endResult = result2.replace(/(')([\$\{\}\.\!\:\w\s.\\']*)(')/g, function (match, p1, p2, p3, offset, string) {
                  if(p2.indexOf(" ") > -1 && p1 === p3){
                    return "$localize `:@@"+maneNameOfFile+p2
                            .toLowerCase()
                            .replace(/\'/g, "")
                            .replace(/\:/g, "")
                            .replace(/\!/g, "")
                            .replace(/\$\{/g, "")
                            .replace(/\}/g, "")
                            .replace(/\./g, "")
                            .replace(/\s/g, "_")+":"+p2+"`";
                  }else{
                    return match;
                  }
                });
                fs.writeFile(fromPath, endResult, 'utf8', function (err) {
                   if (err) return console.log(err);
                });
              })

            }else if(stat && stat.isDirectory() && file != "node_modules"){
                readFolder(fromPath)
              }   
        });
    });
  });

}

function getPathArgument(){
  var path;
  process.argv.forEach((p)=>{
    if(p.indexOf("--path") > -1){
      path = p.replace(/--path=/,"");
    }
  })
  return path;
}