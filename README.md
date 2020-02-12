# NG-Ts Localizer

Simple nodejs helper script to preapre the stings in a TypeScript files for using the Angular i18n.



## Installation
If you don't have nodejs on your Operating System install it first.

Clone this project:

`git clone https://github.com/shral/ng-tsLocalizer.git`

Navigate to the project and install the needed packages

`cd  proxy`

`npm install`

Run the ng-ts-localizer:

`node index.js --path=/thepathtotheproject/`

`--path` parameter is optional if is not set it will search the folder where the script is located

By calling the script in the folder where following script is located:

```
/******test.ts*******/
    let test= {
      description:"Test description"            //Using double quots (")
      key:"testKey"                             //Text without empty space will be not touched
    }

    let string2 = 'Single text example';        //Using single quots (')
    let string3 = "Hallo I'm the third text"    //Using quot in the text
```
It will convert it to:
```
/******test.ts*******/
    let test= {
      description:$localize `:@@test.test_description:Test description`                //Using double quots (")
      key:"testKey"                                                                    //Text without empty space will be not touched
    }

    let string2 = $localize `:@@test.single_text_example:Single text example`;          //Using single quots (')
    let string3 = $localize `:@@test.hallo_im_the_third_text:Hallo I'm the third text`  //Using quot in the text

```
# WARNING
This script is ment to be as helper scripts, use git diff to check if the modiffication is correct!

