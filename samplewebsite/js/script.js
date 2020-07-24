$(function(){
      $("#navbarToggle").blur(function(event){
         var screenWidth = window.innerWidth;
         if(screenWidth < 768){
               $("#collapsable-nav").collapse('hide');
         }
      });   
});


(function (global){
   var dc = {};
      
   // urls
   var homehtml = "snippets/home-snippet.html";
   var alldata = "js/alldata.json";
   var categoriesTitleHTML = "snippets/categories-title-snippet.html";
   var categoryHTML = "snippets/category-snippet.html";
      
   // function to insert html code at the specified element
      var inserthtml = function (selector,html) {
            document.querySelector(selector).innerHTML = html;
      };
      
  // function to insert loading gif before content is recieved from server
      function loadGif (selector) {
            var html = "<div class='text-center'><img src='images/ajax-loader.gif'></div>";
            inserthtml(selector,html);
      }
      
 // function to replace {{short_name}} and {{name}}
      
       var insertProperty = function (string, propName, propValue) {
            var propNameReplace = "{{" + propName + "}}";
            string= string.replace(new RegExp(propNameReplace, "g"),propValue);
            return string;
      };
      

 //function for intial home page main-content
      document.addEventListener("DOMContentLoaded",function(event){
            loadGif("#main-content");
            $ajaxUtils.sendGetRequest (homehtml,function(responseText){
               document.querySelector("#main-content").innerHTML = responseText;
            },false);
      });
      
      // function to load categories during onclick
      
      dc.loadMenuCategories = function (){
            loadGif("#main-menu");
            $ajaxUtils.sendGetRequest(alldata,buildAndShowCategories);
      };
       
      
// function to recieve the codes from the files and call the view html and insert html
      
      function buildAndShowCategories (categories) {
            $ajaxUtils.sendGetRequest(categoriesTitleHTML, function (categoriesTitleHTML) {
                  $ajaxUtils.sendGetRequest(categoryHTML, function (categoryHTML){
                        var showHtml = viewHTML(categories,categoriesTitleHTML,categoryHTML);
                        inserthtml("#main-menu",showHtml);
                  },false);
            }, false);
      }
      
      
 // function to prepare html code
      
      function viewHTML(categories, categoriesTitleHTML, categoryHTML) {
            var finalhtml = categoriesTitleHTML;
            finalhtml += "<section class='row'>";
            
            for(var i=0; i< categories.length; i++) {
                  var html = categoryHTML;
                  var name = "" + categories[i].name;
                  var short_name = categories[i].short_name;
                  html = insertProperty(html,"name",name);
                  html = insertProperty(html,"short_name",short_name);
                  finalhtml += html;
            }
            finalhtml += "<section>";
            return finalhtml;
      }
      
      global.$dc = dc;
      
})(window);