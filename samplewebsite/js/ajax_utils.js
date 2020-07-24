(function(global){
      var ajaxUtils = {};
      
      function getRequestObject() {            
                  return (new XMLHttpRequest());
      }
      
      ajaxUtils.sendGetRequest = function (requestUrl,responseHandler,isJSON) {
            var request = getRequestObject();
            request.onreadystatechange = function (){
                  handleResponse(request,responseHandler,isJSON);
            };
            request.open("GET",requestUrl,true);
            request.send(null);
      };
      
      function handleResponse (request, responseHandler,isJSON) {
            if(request.readyState == 4 && request.status == 200){
                  if(isJSON == undefined) {
                        isJSON = true;
                  }
                  if(isJSON == true){
                        responseHandler(JSON.parse(request.responseText));
                  }
                  else {
                       responseHandler(request.responseText); 
                  }
            }
      }
      global.$ajaxUtils= ajaxUtils;
})(window);
