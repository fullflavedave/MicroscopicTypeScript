/// <reference path='../../lib/typescript/handlebars.d.ts'/>

Handlebars.registerHelper('pluralize', function(n, thing){
   // fairly stupid pluralizer
  if (n == 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});