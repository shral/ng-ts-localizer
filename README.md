# NG-Ts Localizer

Simple nodejs helper script to prepare the strings in a TypeScript files for using the Angular i18n.

(Implemented while working for [j4care.com](https://www.j4care.com/) on [dcm4chee-arc-light](https://github.com/dcm4che/dcm4chee-arc-light) UI2 project).

## Installation
If you don't have nodejs on your Operating System install it first.

Clone this project (or use `npm install ng-ts-localizer`):

`git clone https://github.com/shral/ng-tsLocalizer.git`

Navigate to the project and install the needed packages

`cd  proxy`

`npm install`

Run the ng-ts-localizer:

`node index.js --path=/thepathtotheproject/`

`--path` absolute path to the folder that should be chekced, this parameter is optional if it's not set it will search the folder where the script is located (You have to set this paramtere if you got the script from `npm install`)

By calling the script in the folder where following file `myapp.component.ts` is located:

```
let test= {
  description:"Test description"            //Using double quots (")
  key:"testKey"                             //Text without empty space will be not touched
}

let string2 = 'Single text example';        //Using single quots (')
let string3 = "Hallo I'm the third text"    //Using quot in the text
```
It will convert it to:
```
let test= {
  description:$localize `:@@myapp.test_description:Test description`                //Using double quots (")
  key:"testKey"                                                                    //Text without empty space will be ignored
}

let string2 = $localize `:@@myapp.single_text_example:Single text example`;          //Using single quots (')
let string3 = $localize `:@@myapp.hallo_im_the_third_text:Hallo I'm the third text`  //Using quot in the text

```
## WARNING
This script is ment to be as helper script, you are running this script on your own risc, navigate first to the file what you want to modify and use git diff to check if the modiffication is correct after run!

