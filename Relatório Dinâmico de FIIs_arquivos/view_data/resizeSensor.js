
this.parseTimeMarkers = this.parseTimeMarkers || {};
var marker = this.parseTimeMarkers['resizeSensor.min.js'] || {};
marker.startEval = Date.now();
define("ResizeSensor",function(){"use strict";function e(){var e=document.createElement("div"),t="animationName"in e.style;if(t)return!0;for(var i="Webkit Moz O ms".split(" "),n=0,r=i.length;n<r;n++)if(i[n]+"AnimationName"in e.style)return!0;return!1}function t(e){var t=e.tagName.toUpperCase();return s.indexOf(t)>-1}function i(){var e=document.createElement("div"),t="animationName"in e.style,i="animationstart",n="resizeanim";if(t)return{keyframesRule:"@keyframes "+n+" {from { opacity: 0; } to { opacity: 0; }}",styleDeclaration:"animation: 1ms "+n+";",animationStartEvent:i,animationName:n};var r,s="",o="Webkit Moz O ms".split(" "),a="webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "),m=o.length;for(r=0;r<m;r++)if(o[r]+"AnimationName"in e.style){s="-"+o[r].toLowerCase()+"-",i=a[r];break}return{keyframesRule:"@"+s+"keyframes "+n+" {from { opacity: 0; } to { opacity: 0; }}",styleDeclaration:s+"animation: 1ms "+n+";",animationStartEvent:i,animationName:n}}function n(){window.requestAnimationFrame||(window.requestAnimationFrame=function(){return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}()),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(){return window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.oCancelAnimationFrame||window.msCancelAnimationFrame||window.clearTimeout}())}function r(){var e=[m.keyframesRule?m.keyframesRule:"",".ResizeSensor__resizeTriggers { "+(m.styleDeclaration?m.styleDeclaration:"")+" visibility: hidden; opacity: 0; }",".ResizeSensor__resizeTriggers, .ResizeSensor__resizeTriggers > div, .ResizeSensor__contractTrigger:before { content: ' '; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .ResizeSensor__resizeTriggers > div { background: #eee; overflow: auto; } .ResizeSensor__contractTrigger:before { width: 200%; height: 200%; }"];e=e.join(" ");var t=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e)),t.appendChild(i)}var s=["IMG","COL","TR","THEAD","TFOOT"],o="attachEvent"in document,a=e(),m=a?i():{};r(),o||"requestAnimationFrame"in window&&"cancelAnimationFrame"in window||n();var l=function(e,i){return t(e)?void(console&&console.error("Given element isn't suitable to act as a resize sensor. Try wrapping it with one that is. Unsuitable elements are:",s)):(this.targetElement=e,this.callback=i,this.dimensions={width:0,height:0},this.triggerElements={},o?(this.insertResizeTriggerElements(),this.boundOnResizeHandler=this.onElementResize.bind(this),void this.triggerElements.container.attachEvent("onresize",this.boundOnResizeHandler)):(this.resizeRAF=0,void this.setup()))};return l.prototype.setup=function(){this.insertResizeTriggerElements(),this.boundScrollListener=this.handleElementScroll.bind(this),this.targetElement.addEventListener("scroll",this.boundScrollListener,!0),a&&(this.boundAnimationStartListener=this.resetTriggersOnAnimationStart.bind(this),this.triggerElements.container.addEventListener(m.animationStartEvent,this.boundAnimationStartListener)),this.resetTriggers()},l.prototype.getResizeTrigger=function(){var e=document.createElement("div");return e.className="ResizeSensor ResizeSensor__resizeTriggers",e},l.prototype.insertResizeTriggerElements=function(){var e=this.getResizeTrigger(),t=document.createElement("div"),i=document.createElement("div"),n=document.createElement("div");t.className="ResizeSensor__expandTrigger",n.className="ResizeSensor__contractTrigger",t.appendChild(i),e.appendChild(t),e.appendChild(n),this.triggerElements.container=e,this.triggerElements.expand=t,this.triggerElements.expandChild=i,this.triggerElements.contract=n,this.targetElement.appendChild(e)},l.prototype.onElementResize=function(){var e=this.getDimensions();this.isResized(e)&&(this.dimensions.width=e.width,this.dimensions.height=e.height,this.elementResized())},l.prototype.handleElementScroll=function(){var e=this;this.resetTriggers(),this.resizeRAF&&window.cancelAnimationFrame(this.resizeRAF),this.resizeRAF=window.requestAnimationFrame(function(){if(!e.callback)return;var t=e.getDimensions();e.isResized(t)&&(e.dimensions.width=t.width,e.dimensions.height=t.height,e.elementResized())})},l.prototype.isResized=function(e){return e.width!==this.dimensions.width||e.height!==this.dimensions.height},l.prototype.getDimensions=function(){return{width:this.triggerElements.container.offsetWidth,height:this.triggerElements.container.offsetHeight}},l.prototype.resetTriggersOnAnimationStart=function(e){e.animationName===m.animationName&&this.resetTriggers()},l.prototype.resetTriggers=function(){this.triggerElements.contract.scrollLeft=this.triggerElements.contract.scrollWidth,this.triggerElements.contract.scrollTop=this.triggerElements.contract.scrollHeight,this.triggerElements.expandChild.style.width=this.triggerElements.expand.offsetWidth+1+"px",this.triggerElements.expandChild.style.height=this.triggerElements.expand.offsetHeight+1+"px",this.triggerElements.expand.scrollLeft=this.triggerElements.expand.scrollWidth,this.triggerElements.expand.scrollTop=this.triggerElements.expand.scrollHeight},l.prototype.elementResized=function(){this.callback(this.dimensions)},l.prototype.destroy=function(){this.removeEventListeners(),this.resizeRAF&&window.cancelAnimationFrame(this.resizeRAF),this.targetElement.removeChild(this.triggerElements.container),delete this.boundAnimationStartListener,delete this.boundScrollListener,delete this.callback,delete this.targetElement},l.prototype.removeEventListeners=function(){o&&this.targetElement.detachEvent("onresize",this.boundOnResizeHandler),this.triggerElements.container.removeEventListener(m.animationStartEvent,this.boundAnimationStartListener),this.targetElement.removeEventListener("scroll",this.boundScrollListener,!0)},l}),define("resizeSensor",["ResizeSensor"],function(e){"use strict";var t=[],i=function(){};return i.prototype.create=function(i,n,r){if(t[n])return t[n];var s=new e(i,r);return t[n]=s,s},i.prototype.destroy=function(e){var i=t[e];i||console&&console.error("Can't destroy ResizeSensor (404 not found).",e),i.destroy(),delete t[e]},new i});