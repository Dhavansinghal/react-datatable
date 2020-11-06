This is a NPM package for Tables, Created By [Dhavan Singhal](https://github.com/Dhavansinghal).

### What It Is

With this NPM Package you can change your normal table with Datatable. Now You may be wonder what is a Datatable? the Datatable is a table with some filters like Search Option, Filter with date.<br/> that's it???<br/> No!! you can hide a row or you can print the table or you can export the table as a pdf file and also you can sort any row in asec and desc orders. 

# `npm install React-Datatable`

this command is all you need to install the npm package in your project.<br/>
Now you must be wonder about the depandancies <br/>
it is where the sad part came, this npm package is only for react project till now <br/>
and you need two preinstall npm packages to use this package this list of those package is given below:<br/>
   <br/>
<br/>
   <br/>
["bootstrap": "^4.5.2"](https://www.npmjs.com/package/bootstrap) : install this package with `NPM install bootstrap` command <br/>
i use this package for make the table responsive 
<br/>
<br/>
["framer-motion": "^2.6.0"](https://www.npmjs.com/package/framer-motion) : install this package with `NPM install framer-motion` command <br/>
i use this package for creating some animation ,if you wan you can skip this but for that you have to modify the package file.
<br/><br/>

### Don't Like The Table UI?

although i tried my best to make the UI Good and simple at the sametime. this table is responsive as well. <br/>
but if you still reading this than i think you don't like it, do you??<br/>
you don't have to answer that question. Yes!! you can modify the design the way you want.<br/>
for make this easy for you i attached a ID with almost every element. you can refer the Below Picture For that.

   <br/>
   <br/>
   <br/>
   '""Will add A Picture here""'


### How to use this

after installing the dependencies and this package, you can use this table like the below code<br/><br/>
 `<br/><br/>Will Add the code Here<br/><br/>` 

## Options
# Filters
  **Search Option**<br/>
    This option will help you to search a value in the particular row<br/>
    You can Use this by Providing the Value `Search` in Filter key on column data Object in respective column value.<br/>
  **Dropdown Option**<br/>
    This option will filter all the unqiuq value and provide you an option to filter the data based on those values. Like in case you have a status column in your data and you use the Dropdown filter for that columne it'll help the user to filter the data based on all the Status available in the data.<br/>
    You can Use this by Providing the Value `Dropdown` in Filter key on column data Object in respective column value.<br/>
  **Daterange Option**<br/>
    This option will helo you to filter the data based on the date. This option can only use for a column which have dates. if you have any other type of value like number or string in that row then it will give you a error<br/>
    You can Use this by Providing the Value `Daterange` in Filter key on column data Object in respective column value.<br/>

**Note: raise and issue for any problem you face!**