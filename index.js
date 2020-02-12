/*
 * *** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is part of dcm4che, an implementation of DICOM(TM) in
 * Java(TM), hosted at https://github.com/dcm4che.
 *
 * The Initial Developer of the Original Code is
 * J4Care.
 * Portions created by the Initial Developer are Copyright (C) 2013
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 * See @authors listed below
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * *** END LICENSE BLOCK *****
 */

/**
 * @author Shefki Esadi <shralsheki@gmail.com>
 * @since 12.02.2020
 */

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