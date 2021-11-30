# cypress-e2e
========= My Cypress Project : testing web app : https://angular.realworld.io/ ===
Author: Dima Gurevich 24/11/2021 ,
Backend API/Mock testings ,
E2E UI testings ,
BDD cucumber testings ,
Allure reporting fully integrated ,
package.json scripts ready for CI .

Jenkins example:
npx cypress run --env tags=%tag% allure=true configFile=%configFile% 
npx cypress run --env tags=API allure=true configFile=qa 
