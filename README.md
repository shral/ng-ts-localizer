# NG-Ts Localizer

Simple nodejs helper script to preapre the stings in a TypeScript files for using the Angular i18n.



## Installation
If you don't have nodejs on your Operating System install it first.

Clone this project:

`git clone https://github.com/shral/cors-proxy.git`

Navigate to the project and install the needed packages

`cd  proxy`

`npm install`

Run the ng-ts-localizer:

`node index.js --path=/thepathtotheproject/`

`--path` parameter is optional if is not set it will search the folder where the script is located

By calling the script in the folder where following script is located:

```
    let test= {
      description:"Test description"    //Using double quots (")
      key:"testKey"                     //Text without empty space will be not touched
    }

    let string2 = 'Single text example';  //Using single quots (')
```
It will convert it to:
```
    let test= {
      description:$localize `:@@test.test_description:Test description`         //Using double quots (")
      key:"testKey"                                                             //Text without empty space will be not touched
    }

    let string2 = $localize `:@@test.single_text_example:Single text example`;  //Using single quots (')

```
# WARNING
This script is ment to be as helper scripts, use git diff to check if the modiffication is correct!

