if(!window.addEventListener){
  window.addEventListener = function(type, listener, options){
    if(type == "DOMContentLoaded"){
      this.window.onload = listener
    }else if(type == "resize"){
      this.window.onresize = listener
    }else if(type == "blur"){
      this.window.onblur = listener
    }else if(type == "focus"){
      this.window.onfocus = listener
    }else if(type == "mousedown"){
      document.onmousedown = function(e){
        e = e || window.event;

        if(e.button & 1){
          listener({
            button: 0
          });
        }

        if(e.button & 2){
          listener({
            button: 2
          });
        }
        
        if(e.button & 4){
          listener({
            button: 1
          });
        }
      }
    }else if(type == "mouseup"){
      document.onmouseup = function(e){
        e = e || window.event;

        if(e.button & 1){
          listener({
            button: 0
          });
        }

        if(e.button & 2){
          listener({
            button: 2
          });
        }
        
        if(e.button & 4){
          listener({
            button: 1
          });
        }
      }
    }else{
      console.log("window.addEventListener " + type + " not implemented");
    }
  };
}

if(!window.removeEventListener){
  window.removeEventListener = function(type, listener, options){
    if(type == "DOMContentLoaded"){
      this.window.onload = null;
    }else if(type == "resize"){
      this.window.onresize = null;
    }else if(type == "blur"){
      this.window.onblur = null
    }else if(type == "focus"){
      this.window.onfocus = null
    }else{
      console.log("window.removeEventListener " + type + " not implemented");
    }
  };
}