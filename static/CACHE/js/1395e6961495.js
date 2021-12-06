!function(a){var b=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],c=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],d=["January","February","March","April","May","June","July","August","September","October","November","December"],e={Jan:"01",Feb:"02",Mar:"03",Apr:"04",May:"05",Jun:"06",Jul:"07",Aug:"08",Sep:"09",Oct:"10",Nov:"11",Dec:"12"},f=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.?\d{0,3}[Z\-+]?(\d{2}:?\d{2})?/;a.format=function(){function a(a){return b[parseInt(a,10)]||a}function g(a){var b=parseInt(a,10)-1;return c[b]||a}function h(a){var b=parseInt(a,10)-1;return d[b]||a}function i(a){return e[a]||a}function j(a){var b,c,d,e,f,g=a,h="";return-1!==g.indexOf(".")&&(e=g.split("."),g=e[0],h=e[1]),f=g.split(":"),3===f.length?(b=f[0],c=f[1],d=f[2].replace(/\s.+/,"").replace(/[a-z]/gi,""),g=g.replace(/\s.+/,"").replace(/[a-z]/gi,""),{time:g,hour:b,minute:c,second:d,millis:h}):{time:"",hour:"",minute:"",second:"",millis:""}}function k(a,b){for(var c=b-String(a).length,d=0;c>d;d++)a="0"+a;return a}return{parseDate:function(a){var b={date:null,year:null,month:null,dayOfMonth:null,dayOfWeek:null,time:null};if("number"==typeof a)return this.parseDate(new Date(a));if("function"==typeof a.getFullYear)b.year=String(a.getFullYear()),b.month=String(a.getMonth()+1),b.dayOfMonth=String(a.getDate()),b.time=j(a.toTimeString());else if(-1!=a.search(f))values=a.split(/[T\+-]/),b.year=values[0],b.month=values[1],b.dayOfMonth=values[2],b.time=j(values[3].split(".")[0]);else switch(values=a.split(" "),values.length){case 6:b.year=values[5],b.month=i(values[1]),b.dayOfMonth=values[2],b.time=j(values[3]);break;case 2:subValues=values[0].split("-"),b.year=subValues[0],b.month=subValues[1],b.dayOfMonth=subValues[2],b.time=j(values[1]);break;case 7:case 9:case 10:b.year=values[3],b.month=i(values[1]),b.dayOfMonth=values[2],b.time=j(values[4]);break;case 1:subValues=values[0].split(""),b.year=subValues[0]+subValues[1]+subValues[2]+subValues[3],b.month=subValues[5]+subValues[6],b.dayOfMonth=subValues[8]+subValues[9],b.time=j(subValues[13]+subValues[14]+subValues[15]+subValues[16]+subValues[17]+subValues[18]+subValues[19]+subValues[20]);break;default:return null}return b.date=new Date(b.year,b.month-1,b.dayOfMonth),b.dayOfWeek=String(b.date.getDay()),b},date:function(b,c){try{var d=this.parseDate(b);if(null===d)return b;for(var e=(d.date,d.year),f=d.month,i=d.dayOfMonth,j=d.dayOfWeek,l=d.time,m="",n="",o="",p=!1,q=0;q<c.length;q++){var r=c.charAt(q),s=c.charAt(q+1);if(p)"'"==r?(n+=""===m?"'":m,m="",p=!1):m+=r;else switch(m+=r,o="",m){case"ddd":n+=a(j),m="";break;case"dd":if("d"===s)break;n+=k(i,2),m="";break;case"d":if("d"===s)break;n+=parseInt(i,10),m="";break;case"D":i=1==i||21==i||31==i?parseInt(i,10)+"st":2==i||22==i?parseInt(i,10)+"nd":3==i||23==i?parseInt(i,10)+"rd":parseInt(i,10)+"th",n+=i,m="";break;case"MMMM":n+=h(f),m="";break;case"MMM":if("M"===s)break;n+=g(f),m="";break;case"MM":if("M"===s)break;n+=k(f,2),m="";break;case"M":if("M"===s)break;n+=parseInt(f,10),m="";break;case"y":case"yyy":if("y"===s)break;n+=m,m="";break;case"yy":if("y"===s)break;n+=String(e).slice(-2),m="";break;case"yyyy":n+=e,m="";break;case"HH":n+=k(l.hour,2),m="";break;case"H":if("H"===s)break;n+=parseInt(l.hour,10),m="";break;case"hh":hour=0===l.hour?12:l.hour<13?l.hour:l.hour-12,n+=k(hour,2),m="";break;case"h":if("h"===s)break;hour=0===l.hour?12:l.hour<13?l.hour:l.hour-12,n+=parseInt(hour,10),m="";break;case"mm":n+=k(l.minute,2),m="";break;case"m":if("m"===s)break;n+=l.minute,m="";break;case"ss":n+=k(l.second.substring(0,2),2),m="";break;case"s":if("s"===s)break;n+=l.second,m="";break;case"S":case"SS":if("S"===s)break;n+=m,m="";break;case"SSS":n+=l.millis.substring(0,3),m="";break;case"a":n+=l.hour>=12?"PM":"AM",m="";break;case"p":n+=l.hour>=12?"p.m.":"a.m.",m="";break;case"'":m="",p=!0;break;default:n+=r,m=""}}return n+=o}catch(t){return console&&console.log&&console.log(t),b}},prettyDate:function(a){var b,c,d;return("string"==typeof a||"number"==typeof a)&&(b=new Date(a)),"object"==typeof a&&(b=new Date(a.toString())),c=((new Date).getTime()-b.getTime())/1e3,d=Math.floor(c/86400),isNaN(d)||0>d?void 0:60>c?"just now":120>c?"1 minute ago":3600>c?Math.floor(c/60)+" minutes ago":7200>c?"1 hour ago":86400>c?Math.floor(c/3600)+" hours ago":1===d?"Yesterday":7>d?d+" days ago":31>d?Math.ceil(d/7)+" weeks ago":d>=31?"more than 5 weeks ago":void 0},toBrowserTimeZone:function(a,b){return this.date(new Date(a),b||"MM/dd/yyyy HH:mm:ss")}}}()}(jQuery);var qq=function(element){"use strict";return{hide:function(){element.style.display='none';return this;},attach:function(type,fn){if(element.addEventListener){element.addEventListener(type,fn,false);}else if(element.attachEvent){element.attachEvent('on'+type,fn);}
return function(){qq(element).detach(type,fn);};},detach:function(type,fn){if(element.removeEventListener){element.removeEventListener(type,fn,false);}else if(element.attachEvent){element.detachEvent('on'+type,fn);}
return this;},contains:function(descendant){if(element===descendant){return true;}
if(element.contains){return element.contains(descendant);}else{return!!(descendant.compareDocumentPosition(element)&8);}},insertBefore:function(elementB){elementB.parentNode.insertBefore(element,elementB);return this;},remove:function(){element.parentNode.removeChild(element);return this;},css:function(styles){if(styles.opacity!==null){if(typeof element.style.opacity!=='string'&&typeof(element.filters)!=='undefined'){styles.filter='alpha(opacity='+Math.round(100*styles.opacity)+')';}}
qq.extend(element.style,styles);return this;},hasClass:function(name){var re=new RegExp('(^| )'+name+'( |$)');return re.test(element.className);},addClass:function(name){if(!qq(element).hasClass(name)){element.className+=' '+name;}
return this;},removeClass:function(name){var re=new RegExp('(^| )'+name+'( |$)');element.className=element.className.replace(re,' ').replace(/^\s+|\s+$/g,"");return this;},getByClass:function(className){var candidates,result=[];if(element.querySelectorAll){return element.querySelectorAll('.'+className);}
candidates=element.getElementsByTagName("*");qq.each(candidates,function(idx,val){if(qq(val).hasClass(className)){result.push(val);}});return result;},children:function(){var children=[],child=element.firstChild;while(child){if(child.nodeType===1){children.push(child);}
child=child.nextSibling;}
return children;},setText:function(text){element.innerText=text;element.textContent=text;return this;},clearText:function(){return qq(element).setText("");}};};qq.log=function(message,level){"use strict";if(window.console){if(!level||level==='info'){window.console.log(message);}
else
{if(window.console[level]){window.console[level](message);}
else{window.console.log('<'+level+'> '+message);}}}};qq.isObject=function(variable){"use strict";return variable!==null&&variable&&typeof(variable)==="object"&&variable.constructor===Object;};qq.isFunction=function(variable){"use strict";return typeof(variable)==="function";};qq.isFileOrInput=function(maybeFileOrInput){"use strict";if(window.File&&maybeFileOrInput instanceof File){return true;}
else if(window.HTMLInputElement){if(maybeFileOrInput instanceof HTMLInputElement){if(maybeFileOrInput.type&&maybeFileOrInput.type.toLowerCase()==='file'){return true;}}}
else if(maybeFileOrInput.tagName){if(maybeFileOrInput.tagName.toLowerCase()==='input'){if(maybeFileOrInput.type&&maybeFileOrInput.type.toLowerCase()==='file'){return true;}}}
return false;};qq.isXhrUploadSupported=function(){"use strict";var input=document.createElement('input');input.type='file';return(input.multiple!==undefined&&typeof File!=="undefined"&&typeof FormData!=="undefined"&&typeof(new XMLHttpRequest()).upload!=="undefined");};qq.isFolderDropSupported=function(dataTransfer){"use strict";return(dataTransfer.items&&dataTransfer.items[0].webkitGetAsEntry);};qq.extend=function(first,second,extendNested){"use strict";qq.each(second,function(prop,val){if(extendNested&&qq.isObject(val)){if(first[prop]===undefined){first[prop]={};}
qq.extend(first[prop],val,true);}
else{first[prop]=val;}});};qq.indexOf=function(arr,elt,from){"use strict";if(arr.indexOf){return arr.indexOf(elt,from);}
from=from||0;var len=arr.length;if(from<0){from+=len;}
for(null;from<len;from+=1){if(arr.hasOwnProperty(from)&&arr[from]===elt){return from;}}
return-1;};qq.getUniqueId=(function(){"use strict";var id=-1;return function(){id+=1;return id;};}());qq.ie=function(){"use strict";return navigator.userAgent.indexOf('MSIE')!==-1;};qq.ie10=function(){"use strict";return navigator.userAgent.indexOf('MSIE 10')!==-1;};qq.safari=function(){"use strict";return navigator.vendor!==undefined&&navigator.vendor.indexOf("Apple")!==-1;};qq.chrome=function(){"use strict";return navigator.vendor!==undefined&&navigator.vendor.indexOf('Google')!==-1;};qq.firefox=function(){"use strict";return(navigator.userAgent.indexOf('Mozilla')!==-1&&navigator.vendor!==undefined&&navigator.vendor==='');};qq.windows=function(){"use strict";return navigator.platform==="Win32";};qq.preventDefault=function(e){"use strict";if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}};qq.toElement=(function(){"use strict";var div=document.createElement('div');return function(html){div.innerHTML=html;var element=div.firstChild;div.removeChild(element);return element;};}());qq.each=function(obj,callback){"use strict";var key,retVal;if(obj){for(key in obj){if(Object.prototype.hasOwnProperty.call(obj,key)){retVal=callback(key,obj[key]);if(retVal===false){break;}}}}};qq.obj2url=function(obj,temp,prefixDone){"use strict";var i,len,uristrings=[],prefix='&',add=function(nextObj,i){var nextTemp=temp?(/\[\]$/.test(temp))?temp:temp+'['+i+']':i;if((nextTemp!=='undefined')&&(i!=='undefined')){uristrings.push((typeof nextObj==='object')?qq.obj2url(nextObj,nextTemp,true):(Object.prototype.toString.call(nextObj)==='[object Function]')?encodeURIComponent(nextTemp)+'='+encodeURIComponent(nextObj()):encodeURIComponent(nextTemp)+'='+encodeURIComponent(nextObj));}};if(!prefixDone&&temp){prefix=(/\?/.test(temp))?(/\?$/.test(temp))?'':'&':'?';uristrings.push(temp);uristrings.push(qq.obj2url(obj));}else if((Object.prototype.toString.call(obj)==='[object Array]')&&(typeof obj!=='undefined')){for(i=-1,len=obj.length;i<len;i+=1){add(obj[i],i);}}else if((typeof obj!=='undefined')&&(obj!==null)&&(typeof obj==="object")){for(i in obj){if(obj.hasOwnProperty(i)){add(obj[i],i);}}}else{uristrings.push(encodeURIComponent(temp)+'='+encodeURIComponent(obj));}
if(temp){return uristrings.join(prefix);}else{return uristrings.join(prefix).replace(/^&/,'').replace(/%20/g,'+');}};qq.obj2FormData=function(obj,formData,arrayKeyName){"use strict";if(!formData){formData=new FormData();}
qq.each(obj,function(key,val){key=arrayKeyName?arrayKeyName+'['+key+']':key;if(qq.isObject(val)){qq.obj2FormData(val,formData,key);}
else if(qq.isFunction(val)){formData.append(encodeURIComponent(key),encodeURIComponent(val()));}
else{formData.append(encodeURIComponent(key),encodeURIComponent(val));}});return formData;};qq.obj2Inputs=function(obj,form){"use strict";var input;if(!form){form=document.createElement('form');}
qq.obj2FormData(obj,{append:function(key,val){input=document.createElement('input');input.setAttribute('name',key);input.setAttribute('value',val);form.appendChild(input);}});return form;};qq.DisposeSupport=function(){"use strict";var disposers=[];return{dispose:function(){var disposer;do{disposer=disposers.shift();if(disposer){disposer();}}
while(disposer);},attach:function(){var args=arguments;this.addDisposer(qq(args[0]).attach.apply(this,Array.prototype.slice.call(arguments,1)));},addDisposer:function(disposeFunction){disposers.push(disposeFunction);}};};qq.UploadButton=function(o){this._options={element:null,multiple:false,acceptFiles:null,name:'file',onChange:function(input){},hoverClass:'qq-upload-button-hover',focusClass:'qq-upload-button-focus'};qq.extend(this._options,o);this._disposeSupport=new qq.DisposeSupport();this._element=this._options.element;qq(this._element).css({position:'relative',overflow:'hidden',direction:'ltr'});this._input=this._createInput();};qq.UploadButton.prototype={getInput:function(){return this._input;},reset:function(){if(this._input.parentNode){qq(this._input).remove();}
qq(this._element).removeClass(this._options.focusClass);this._input=this._createInput();},_createInput:function(){var input=document.createElement("input");if(this._options.multiple){input.setAttribute("multiple","multiple");}
if(this._options.acceptFiles)input.setAttribute("accept",this._options.acceptFiles);input.setAttribute("type","file");input.setAttribute("name",this._options.name);qq(input).css({position:'absolute',right:0,top:0,fontFamily:'Arial',fontSize:'118px',margin:0,padding:0,cursor:'pointer',opacity:0});this._element.appendChild(input);var self=this;this._disposeSupport.attach(input,'change',function(){self._options.onChange(input);});this._disposeSupport.attach(input,'mouseover',function(){qq(self._element).addClass(self._options.hoverClass);});this._disposeSupport.attach(input,'mouseout',function(){qq(self._element).removeClass(self._options.hoverClass);});this._disposeSupport.attach(input,'focus',function(){qq(self._element).addClass(self._options.focusClass);});this._disposeSupport.attach(input,'blur',function(){qq(self._element).removeClass(self._options.focusClass);});if(window.attachEvent){input.setAttribute('tabIndex',"-1");}
return input;}};qq.FineUploaderBasic=function(o){var that=this;this._options={debug:false,button:null,multiple:true,maxConnections:3,disableCancelForFormUploads:false,autoUpload:true,request:{endpoint:'/server/upload',params:{},paramsInBody:false,customHeaders:{},forceMultipart:false,inputName:'qqfile'},validation:{allowedExtensions:[],sizeLimit:0,minSizeLimit:0,stopOnFirstInvalidFile:true},callbacks:{onSubmit:function(id,fileName){},onComplete:function(id,fileName,responseJSON){},onCancel:function(id,fileName){},onUpload:function(id,fileName,xhr){},onProgress:function(id,fileName,loaded,total){},onError:function(id,fileName,reason){},onAutoRetry:function(id,fileName,attemptNumber){},onManualRetry:function(id,fileName){},onValidate:function(fileData){}},messages:{typeError:"{file} has an invalid extension. Valid extension(s): {extensions}.",sizeError:"{file} is too large, maximum file size is {sizeLimit}.",minSizeError:"{file} is too small, minimum file size is {minSizeLimit}.",emptyError:"{file} is empty, please select files again without it.",noFilesError:"No files to upload.",onLeave:"The files are being uploaded, if you leave now the upload will be cancelled."},retry:{enableAuto:false,maxAutoAttempts:3,autoAttemptDelay:5,preventRetryResponseProperty:'preventRetry'},classes:{buttonHover:'qq-upload-button-hover',buttonFocus:'qq-upload-button-focus'}};qq.extend(this._options,o,true);this._wrapCallbacks();this._disposeSupport=new qq.DisposeSupport();this._filesInProgress=0;this._storedFileIds=[];this._autoRetries=[];this._retryTimeouts=[];this._preventRetries=[];this._paramsStore=this._createParamsStore();this._handler=this._createUploadHandler();if(this._options.button){this._button=this._createUploadButton(this._options.button);}
this._preventLeaveInProgress();};qq.FineUploaderBasic.prototype={log:function(str,level){if(this._options.debug&&(!level||level==='info')){qq.log('[FineUploader] '+str);}
else if(level&&level!=='info'){qq.log('[FineUploader] '+str,level);}},setParams:function(params,fileId){if(fileId===undefined){this._options.request.params=params;}
else{this._paramsStore.setParams(params,fileId);}},getInProgress:function(){return this._filesInProgress;},uploadStoredFiles:function(){"use strict";while(this._storedFileIds.length){this._filesInProgress++;this._handler.upload(this._storedFileIds.shift());}},clearStoredFiles:function(){this._storedFileIds=[];},retry:function(id){if(this._onBeforeManualRetry(id)){this._handler.retry(id);return true;}
else{return false;}},cancel:function(fileId){this._handler.cancel(fileId);},reset:function(){this.log("Resetting uploader...");this._handler.reset();this._filesInProgress=0;this._storedFileIds=[];this._autoRetries=[];this._retryTimeouts=[];this._preventRetries=[];this._button.reset();this._paramsStore.reset();},addFiles:function(filesOrInputs){var self=this,verifiedFilesOrInputs=[],index,fileOrInput;if(filesOrInputs){if(!window.FileList||!(filesOrInputs instanceof FileList)){filesOrInputs=[].concat(filesOrInputs);}
for(index=0;index<filesOrInputs.length;index+=1){fileOrInput=filesOrInputs[index];if(qq.isFileOrInput(fileOrInput)){verifiedFilesOrInputs.push(fileOrInput);}
else{self.log(fileOrInput+' is not a File or INPUT element!  Ignoring!','warn');}}
this.log('Processing '+verifiedFilesOrInputs.length+' files or inputs...');this._uploadFileList(verifiedFilesOrInputs);}},_createUploadButton:function(element){var self=this;var button=new qq.UploadButton({element:element,multiple:this._options.multiple&&qq.isXhrUploadSupported(),acceptFiles:this._options.validation.acceptFiles,onChange:function(input){self._onInputChange(input);},hoverClass:this._options.classes.buttonHover,focusClass:this._options.classes.buttonFocus});this._disposeSupport.addDisposer(function(){button.dispose();});return button;},_createUploadHandler:function(){var self=this,handlerClass;if(qq.isXhrUploadSupported()){handlerClass='UploadHandlerXhr';}else{handlerClass='UploadHandlerForm';}
var handler=new qq[handlerClass]({debug:this._options.debug,endpoint:this._options.request.endpoint,forceMultipart:this._options.request.forceMultipart,maxConnections:this._options.maxConnections,customHeaders:this._options.request.customHeaders,inputName:this._options.request.inputName,demoMode:this._options.demoMode,log:this.log,paramsInBody:this._options.request.paramsInBody,paramsStore:this._paramsStore,onProgress:function(id,fileName,loaded,total){self._onProgress(id,fileName,loaded,total);self._options.callbacks.onProgress(id,fileName,loaded,total);},onComplete:function(id,fileName,result,xhr){self._onComplete(id,fileName,result,xhr);self._options.callbacks.onComplete(id,fileName,result);},onCancel:function(id,fileName){self._onCancel(id,fileName);self._options.callbacks.onCancel(id,fileName);},onUpload:function(id,fileName,xhr){self._onUpload(id,fileName,xhr);self._options.callbacks.onUpload(id,fileName,xhr);},onAutoRetry:function(id,fileName,responseJSON,xhr){self._preventRetries[id]=responseJSON[self._options.retry.preventRetryResponseProperty];if(self._shouldAutoRetry(id,fileName,responseJSON)){self._maybeParseAndSendUploadError(id,fileName,responseJSON,xhr);self._options.callbacks.onAutoRetry(id,fileName,self._autoRetries[id]+1);self._onBeforeAutoRetry(id,fileName);self._retryTimeouts[id]=setTimeout(function(){self._onAutoRetry(id,fileName,responseJSON)},self._options.retry.autoAttemptDelay*1000);return true;}
else{return false;}}});return handler;},_preventLeaveInProgress:function(){var self=this;this._disposeSupport.attach(window,'beforeunload',function(e){if(!self._filesInProgress){return;}
var e=e||window.event;e.returnValue=self._options.messages.onLeave;return self._options.messages.onLeave;});},_onSubmit:function(id,fileName){if(this._options.autoUpload){this._filesInProgress++;}},_onProgress:function(id,fileName,loaded,total){},_onComplete:function(id,fileName,result,xhr){this._filesInProgress--;this._maybeParseAndSendUploadError(id,fileName,result,xhr);},_onCancel:function(id,fileName){clearTimeout(this._retryTimeouts[id]);var storedFileIndex=qq.indexOf(this._storedFileIds,id);if(this._options.autoUpload||storedFileIndex<0){this._filesInProgress--;}
else if(!this._options.autoUpload){this._storedFileIds.splice(storedFileIndex,1);}},_onUpload:function(id,fileName,xhr){},_onInputChange:function(input){if(this._handler instanceof qq.UploadHandlerXhr){this.addFiles(input.files);}else{if(this._validateFile(input)){this.addFiles(input);}}
this._button.reset();},_onBeforeAutoRetry:function(id,fileName){this.log("Waiting "+this._options.retry.autoAttemptDelay+" seconds before retrying "+fileName+"...");},_onAutoRetry:function(id,fileName,responseJSON){this.log("Retrying "+fileName+"...");this._autoRetries[id]++;this._handler.retry(id);},_shouldAutoRetry:function(id,fileName,responseJSON){if(!this._preventRetries[id]&&this._options.retry.enableAuto){if(this._autoRetries[id]===undefined){this._autoRetries[id]=0;}
return this._autoRetries[id]<this._options.retry.maxAutoAttempts}
return false;},_onBeforeManualRetry:function(id){if(this._preventRetries[id]){this.log("Retries are forbidden for id "+id,'warn');return false;}
else if(this._handler.isValid(id)){var fileName=this._handler.getName(id);if(this._options.callbacks.onManualRetry(id,fileName)===false){return false;}
this.log("Retrying upload for '"+fileName+"' (id: "+id+")...");this._filesInProgress++;return true;}
else{this.log("'"+id+"' is not a valid file ID",'error');return false;}},_maybeParseAndSendUploadError:function(id,fileName,response,xhr){if(!response.success){if(xhr&&xhr.status!==200&&!response.error){this._options.callbacks.onError(id,fileName,"XHR returned response code "+xhr.status);}
else{var errorReason=response.error?response.error:"Upload failure reason unknown";this._options.callbacks.onError(id,fileName,errorReason);}}},_uploadFileList:function(files){var validationDescriptors,index,batchInvalid;validationDescriptors=this._getValidationDescriptors(files);batchInvalid=this._options.callbacks.onValidate(validationDescriptors)===false;if(!batchInvalid){if(files.length>0){for(index=0;index<files.length;index++){if(this._validateFile(files[index])){this._uploadFile(files[index]);}else{if(this._options.validation.stopOnFirstInvalidFile){return;}}}}
else{this._error('noFilesError',"");}}},_uploadFile:function(fileContainer){var id=this._handler.add(fileContainer);var fileName=this._handler.getName(id);if(this._options.callbacks.onSubmit(id,fileName)!==false){this._onSubmit(id,fileName);if(this._options.autoUpload){this._handler.upload(id);}
else{this._storeFileForLater(id);}}},_storeFileForLater:function(id){this._storedFileIds.push(id);},_validateFile:function(file){var validationDescriptor,name,size;validationDescriptor=this._getValidationDescriptor(file);name=validationDescriptor.name;size=validationDescriptor.size;if(this._options.callbacks.onValidate([validationDescriptor])===false){return false;}
if(!this._isAllowedExtension(name)){this._error('typeError',name);return false;}
else if(size===0){this._error('emptyError',name);return false;}
else if(size&&this._options.validation.sizeLimit&&size>this._options.validation.sizeLimit){this._error('sizeError',name);return false;}
else if(size&&size<this._options.validation.minSizeLimit){this._error('minSizeError',name);return false;}
return true;},_error:function(code,fileName){var message=this._options.messages[code];function r(name,replacement){message=message.replace(name,replacement);}
var extensions=this._options.validation.allowedExtensions.join(', ');r('{file}',this._formatFileName(fileName));r('{extensions}',extensions);r('{sizeLimit}',this._formatSize(this._options.validation.sizeLimit));r('{minSizeLimit}',this._formatSize(this._options.validation.minSizeLimit));this._options.callbacks.onError(null,fileName,message);return message;},_formatFileName:function(name){if(name.length>33){name=name.slice(0,19)+'...'+name.slice(-13);}
return name;},_isAllowedExtension:function(fileName){var ext=(-1!==fileName.indexOf('.'))?fileName.replace(/.*[.]/,'').toLowerCase():'';var allowed=this._options.validation.allowedExtensions;if(!allowed.length){return true;}
for(var i=0;i<allowed.length;i++){if(allowed[i].toLowerCase()==ext){return true;}}
return false;},_formatSize:function(bytes){var i=-1;do{bytes=bytes/1024;i++;}while(bytes>99);return Math.max(bytes,0.1).toFixed(1)+['kB','MB','GB','TB','PB','EB'][i];},_wrapCallbacks:function(){var self,safeCallback;self=this;safeCallback=function(name,callback,args){try{return callback.apply(self,args);}
catch(exception){self.log("Caught exception in '"+name+"' callback - "+exception,'error');}}
for(var prop in this._options.callbacks){(function(){var callbackName,callbackFunc;callbackName=prop;callbackFunc=self._options.callbacks[callbackName];self._options.callbacks[callbackName]=function(){return safeCallback(callbackName,callbackFunc,arguments);}}());}},_parseFileName:function(file){var name;if(file.value){name=file.value.replace(/.*(\/|\\)/,"");}else{name=(file.fileName!==null&&file.fileName!==undefined)?file.fileName:file.name;}
return name;},_parseFileSize:function(file){var size;if(!file.value){size=(file.fileSize!==null&&file.fileSize!==undefined)?file.fileSize:file.size;}
return size;},_getValidationDescriptor:function(file){var name,size,fileDescriptor;fileDescriptor={};name=this._parseFileName(file);size=this._parseFileSize(file);fileDescriptor.name=name;if(size){fileDescriptor.size=size;}
return fileDescriptor;},_getValidationDescriptors:function(files){var index,fileDescriptors;fileDescriptors=[];for(index=0;index<files.length;index++){fileDescriptors.push(files[index]);}
return fileDescriptors;},_createParamsStore:function(){var paramsStore={},self=this;return{setParams:function(params,fileId){var paramsCopy={};qq.extend(paramsCopy,params);paramsStore[fileId]=paramsCopy;},getParams:function(fileId){var paramsCopy={};if(fileId!==undefined&&paramsStore[fileId]){qq.extend(paramsCopy,paramsStore[fileId]);}
else{qq.extend(paramsCopy,self._options.request.params);}
return paramsCopy;},remove:function(fileId){return delete paramsStore[fileId];},reset:function(){paramsStore={};}}}};qq.DragAndDrop=function(o){"use strict";var options,dz,dirPending,droppedFiles=[],droppedEntriesCount=0,droppedEntriesParsedCount=0,disposeSupport=new qq.DisposeSupport();options={dropArea:null,extraDropzones:[],hideDropzones:true,multiple:true,classes:{dropActive:null},callbacks:{dropProcessing:function(isProcessing,files){},error:function(code,filename){},log:function(message,level){}}};qq.extend(options,o);function maybeUploadDroppedFiles(){if(droppedEntriesCount===droppedEntriesParsedCount&&!dirPending){options.callbacks.log('Grabbed '+droppedFiles.length+" files after tree traversal.");dz.dropDisabled(false);options.callbacks.dropProcessing(false,droppedFiles);}}
function addDroppedFile(file){droppedFiles.push(file);droppedEntriesParsedCount+=1;maybeUploadDroppedFiles();}
function traverseFileTree(entry){var dirReader,i;droppedEntriesCount+=1;if(entry.isFile){entry.file(function(file){addDroppedFile(file);});}
else if(entry.isDirectory){dirPending=true;dirReader=entry.createReader();dirReader.readEntries(function(entries){droppedEntriesParsedCount+=1;for(i=0;i<entries.length;i+=1){traverseFileTree(entries[i]);}
dirPending=false;if(!entries.length){maybeUploadDroppedFiles();}});}}
function handleDataTransfer(dataTransfer){var i,items,entry;options.callbacks.dropProcessing(true);dz.dropDisabled(true);if(dataTransfer.files.length>1&&!options.multiple){options.callbacks.error('tooManyFilesError',"");}
else{droppedFiles=[];droppedEntriesCount=0;droppedEntriesParsedCount=0;if(qq.isFolderDropSupported(dataTransfer)){items=dataTransfer.items;for(i=0;i<items.length;i+=1){entry=items[i].webkitGetAsEntry();if(entry){if(entry.isFile){droppedFiles.push(items[i].getAsFile());if(i===items.length-1){maybeUploadDroppedFiles();}}
else{traverseFileTree(entry);}}}}
else{options.callbacks.dropProcessing(false,dataTransfer.files);dz.dropDisabled(false);}}}
function setupDropzone(dropArea){dz=new qq.UploadDropZone({element:dropArea,onEnter:function(e){qq(dropArea).addClass(options.classes.dropActive);e.stopPropagation();},onLeaveNotDescendants:function(e){qq(dropArea).removeClass(options.classes.dropActive);},onDrop:function(e){if(options.hideDropzones){qq(dropArea).hide();}
qq(dropArea).removeClass(options.classes.dropActive);handleDataTransfer(e.dataTransfer);}});disposeSupport.addDisposer(function(){dz.dispose();});if(options.hideDropzones){qq(dropArea).hide();}}
function isFileDrag(dragEvent){var fileDrag;qq.each(dragEvent.dataTransfer.types,function(key,val){if(val==='Files'){fileDrag=true;return false;}});return fileDrag;}
function setupDragDrop(){if(options.dropArea){options.extraDropzones.push(options.dropArea);}
var i,dropzones=options.extraDropzones;for(i=0;i<dropzones.length;i+=1){setupDropzone(dropzones[i]);}
if(options.dropArea&&(!qq.ie()||qq.ie10())){disposeSupport.attach(document,'dragenter',function(e){if(!dz.dropDisabled()&&isFileDrag(e)){if(qq(options.dropArea).hasClass(options.classes.dropDisabled)){return;}
options.dropArea.style.display='block';for(i=0;i<dropzones.length;i+=1){dropzones[i].style.display='block';}}});}
disposeSupport.attach(document,'dragleave',function(e){if(options.hideDropzones&&qq.FineUploader.prototype._leaving_document_out(e)){for(i=0;i<dropzones.length;i+=1){qq(dropzones[i]).hide();}}});disposeSupport.attach(document,'drop',function(e){if(options.hideDropzones){for(i=0;i<dropzones.length;i+=1){qq(dropzones[i]).hide();}}
e.preventDefault();});}
return{setup:function(){setupDragDrop();},setupExtraDropzone:function(element){options.extraDropzones.push(element);setupDropzone(element);},removeExtraDropzone:function(element){var i,dzs=options.extraDropzones;for(i in dzs){if(dzs[i]===element){return dzs.splice(i,1);}}},dispose:function(){disposeSupport.dispose();dz.dispose();}};};qq.UploadDropZone=function(o){"use strict";var options,element,preventDrop,dropOutsideDisabled,disposeSupport=new qq.DisposeSupport();options={element:null,onEnter:function(e){},onLeave:function(e){},onLeaveNotDescendants:function(e){},onDrop:function(e){}};qq.extend(options,o);element=options.element;function dragover_should_be_canceled(){return qq.safari()||(qq.firefox()&&qq.windows());}
function disableDropOutside(e){if(!dropOutsideDisabled){if(dragover_should_be_canceled){disposeSupport.attach(document,'dragover',function(e){e.preventDefault();});}else{disposeSupport.attach(document,'dragover',function(e){if(e.dataTransfer){e.dataTransfer.dropEffect='none';e.preventDefault();}});}
dropOutsideDisabled=true;}}
function isValidFileDrag(e){if(qq.ie()&&!qq.ie10()){return false;}
var effectTest,dt=e.dataTransfer,isSafari=qq.safari();effectTest=qq.ie10()?true:dt.effectAllowed!=='none';return dt&&effectTest&&(dt.files||(!isSafari&&dt.types.contains&&dt.types.contains('Files')));}
function isOrSetDropDisabled(isDisabled){if(isDisabled!==undefined){preventDrop=isDisabled;}
return preventDrop;}
function attachEvents(){disposeSupport.attach(element,'dragover',function(e){if(!isValidFileDrag(e)){return;}
var effect=qq.ie()?null:e.dataTransfer.effectAllowed;if(effect==='move'||effect==='linkMove'){e.dataTransfer.dropEffect='move';}else{e.dataTransfer.dropEffect='copy';}
e.stopPropagation();e.preventDefault();});disposeSupport.attach(element,'dragenter',function(e){if(!isOrSetDropDisabled()){if(!isValidFileDrag(e)){return;}
options.onEnter(e);}});disposeSupport.attach(element,'dragleave',function(e){if(!isValidFileDrag(e)){return;}
options.onLeave(e);var relatedTarget=document.elementFromPoint(e.clientX,e.clientY);if(qq(this).contains(relatedTarget)){return;}
options.onLeaveNotDescendants(e);});disposeSupport.attach(element,'drop',function(e){if(!isOrSetDropDisabled()){if(!isValidFileDrag(e)){return;}
e.preventDefault();options.onDrop(e);}});}
disableDropOutside();attachEvents();return{dropDisabled:function(isDisabled){return isOrSetDropDisabled(isDisabled);},dispose:function(){disposeSupport.dispose();}};};qq.FineUploader=function(o){qq.FineUploaderBasic.apply(this,arguments);qq.extend(this._options,{element:null,listElement:null,dragAndDrop:{extraDropzones:[],hideDropzones:true,disableDefaultDropzone:false},text:{uploadButton:'Upload a file',cancelButton:'Cancel',retryButton:'Retry',failUpload:'Upload failed',dragZone:'Drop files here to upload',dropProcessing:'Processing dropped files...',formatProgress:"{percent}% of {total_size}",waitingForResponse:"Processing..."},template:'<div class="qq-uploader">'+
((!this._options.dragAndDrop||!this._options.dragAndDrop.disableDefaultDropzone)?'<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>':'')+
(!this._options.button?'<div class="qq-upload-button"><div>{uploadButtonText}</div></div>':'')+'<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>'+
(!this._options.listElement?'<ul class="qq-upload-list"></ul>':'')+'</div>',fileTemplate:'<li>'+'<div class="qq-progress-bar"></div>'+'<span class="qq-upload-spinner"></span>'+'<span class="qq-upload-finished"></span>'+'<span class="qq-upload-file"></span>'+'<span class="qq-upload-size"></span>'+'<a class="qq-upload-cancel" href="#">{cancelButtonText}</a>'+'<a class="qq-upload-retry" href="#">{retryButtonText}</a>'+'<span class="qq-upload-status-text">{statusText}</span>'+'</li>',classes:{button:'qq-upload-button',drop:'qq-upload-drop-area',dropActive:'qq-upload-drop-area-active',dropDisabled:'qq-upload-drop-area-disabled',list:'qq-upload-list',progressBar:'qq-progress-bar',file:'qq-upload-file',spinner:'qq-upload-spinner',finished:'qq-upload-finished',retrying:'qq-upload-retrying',retryable:'qq-upload-retryable',size:'qq-upload-size',cancel:'qq-upload-cancel',retry:'qq-upload-retry',statusText:'qq-upload-status-text',success:'qq-upload-success',fail:'qq-upload-fail',successIcon:null,failIcon:null,dropProcessing:'qq-drop-processing',dropProcessingSpinner:'qq-drop-processing-spinner'},failedUploadTextDisplay:{mode:'default',maxChars:50,responseProperty:'error',enableTooltip:true},messages:{tooManyFilesError:"You may only drop one file"},retry:{showAutoRetryNote:true,autoRetryNote:"Retrying {retryNum}/{maxAuto}...",showButton:false},showMessage:function(message){alert(message);}},true);qq.extend(this._options,o,true);this._wrapCallbacks();this._options.template=this._options.template.replace(/\{dragZoneText\}/g,this._options.text.dragZone);this._options.template=this._options.template.replace(/\{uploadButtonText\}/g,this._options.text.uploadButton);this._options.template=this._options.template.replace(/\{dropProcessingText\}/g,this._options.text.dropProcessing);this._options.fileTemplate=this._options.fileTemplate.replace(/\{cancelButtonText\}/g,this._options.text.cancelButton);this._options.fileTemplate=this._options.fileTemplate.replace(/\{retryButtonText\}/g,this._options.text.retryButton);this._options.fileTemplate=this._options.fileTemplate.replace(/\{statusText\}/g,"");this._element=this._options.element;this._element.innerHTML=this._options.template;this._listElement=this._options.listElement||this._find(this._element,'list');this._classes=this._options.classes;if(!this._button){this._button=this._createUploadButton(this._find(this._element,'button'));}
this._bindCancelAndRetryEvents();this._dnd=this._setupDragAndDrop();};qq.extend(qq.FineUploader.prototype,qq.FineUploaderBasic.prototype);qq.extend(qq.FineUploader.prototype,{clearStoredFiles:function(){qq.FineUploaderBasic.prototype.clearStoredFiles.apply(this,arguments);this._listElement.innerHTML="";},addExtraDropzone:function(element){this._dnd.setupExtraDropzone(element);},removeExtraDropzone:function(element){return this._dnd.removeExtraDropzone(element);},getItemByFileId:function(id){var item=this._listElement.firstChild;while(item){if(item.qqFileId==id)return item;item=item.nextSibling;}},cancel:function(fileId){qq.FineUploaderBasic.prototype.cancel.apply(this,arguments);var item=this.getItemByFileId(fileId);qq(item).remove();},reset:function(){qq.FineUploaderBasic.prototype.reset.apply(this,arguments);this._element.innerHTML=this._options.template;this._listElement=this._options.listElement||this._find(this._element,'list');if(!this._options.button){this._button=this._createUploadButton(this._find(this._element,'button'));}
this._bindCancelAndRetryEvents();this._dnd.dispose();this._dnd=this._setupDragAndDrop();},_setupDragAndDrop:function(){var self=this,dropProcessingEl=this._find(this._element,'dropProcessing'),dnd,preventSelectFiles,defaultDropAreaEl;preventSelectFiles=function(event){event.preventDefault();};if(!this._options.dragAndDrop.disableDefaultDropzone){defaultDropAreaEl=this._find(this._options.element,'drop');}
dnd=new qq.DragAndDrop({dropArea:defaultDropAreaEl,extraDropzones:this._options.dragAndDrop.extraDropzones,hideDropzones:this._options.dragAndDrop.hideDropzones,multiple:this._options.multiple,classes:{dropActive:this._options.classes.dropActive},callbacks:{dropProcessing:function(isProcessing,files){var input=self._button.getInput();if(isProcessing){qq(dropProcessingEl).css({display:'block'});qq(input).attach('click',preventSelectFiles);}
else{qq(dropProcessingEl).hide();qq(input).detach('click',preventSelectFiles);}
if(files){self.addFiles(files);}},error:function(code,filename){self._error(code,filename);},log:function(message,level){self.log(message,level);}}});dnd.setup();return dnd;},_leaving_document_out:function(e){return((qq.chrome()||(qq.safari()&&qq.windows()))&&e.clientX==0&&e.clientY==0)||(qq.firefox()&&!e.relatedTarget);},_storeFileForLater:function(id){qq.FineUploaderBasic.prototype._storeFileForLater.apply(this,arguments);var item=this.getItemByFileId(id);qq(this._find(item,'spinner')).hide();},_find:function(parent,type){var element=qq(parent).getByClass(this._options.classes[type])[0];if(!element){throw new Error('element not found '+type);}
return element;},_onSubmit:function(id,fileName){qq.FineUploaderBasic.prototype._onSubmit.apply(this,arguments);this._addToList(id,fileName);},_onProgress:function(id,fileName,loaded,total){qq.FineUploaderBasic.prototype._onProgress.apply(this,arguments);var item,progressBar,text,percent,cancelLink,size;item=this.getItemByFileId(id);progressBar=this._find(item,'progressBar');percent=Math.round(loaded/total*100);if(loaded===total){cancelLink=this._find(item,'cancel');qq(cancelLink).hide();qq(progressBar).hide();qq(this._find(item,'statusText')).setText(this._options.text.waitingForResponse);text=this._formatSize(total);}
else{text=this._formatProgress(loaded,total);qq(progressBar).css({display:'block'});}
qq(progressBar).css({width:percent+'%'});size=this._find(item,'size');qq(size).css({display:'inline'});qq(size).setText(text);},_onComplete:function(id,fileName,result,xhr){qq.FineUploaderBasic.prototype._onComplete.apply(this,arguments);var item=this.getItemByFileId(id);qq(this._find(item,'statusText')).clearText();qq(item).removeClass(this._classes.retrying);qq(this._find(item,'progressBar')).hide();if(!this._options.disableCancelForFormUploads||qq.isXhrUploadSupported()){qq(this._find(item,'cancel')).hide();}
qq(this._find(item,'spinner')).hide();if(result.success){qq(item).addClass(this._classes.success);if(this._classes.successIcon){this._find(item,'finished').style.display="inline-block";qq(item).addClass(this._classes.successIcon);}}else{qq(item).addClass(this._classes.fail);if(this._classes.failIcon){this._find(item,'finished').style.display="inline-block";qq(item).addClass(this._classes.failIcon);}
if(this._options.retry.showButton&&!this._preventRetries[id]){qq(item).addClass(this._classes.retryable);}
this._controlFailureTextDisplay(item,result);}},_onUpload:function(id,fileName,xhr){qq.FineUploaderBasic.prototype._onUpload.apply(this,arguments);var item=this.getItemByFileId(id);this._showSpinner(item);},_onBeforeAutoRetry:function(id){var item,progressBar,cancelLink,failTextEl,retryNumForDisplay,maxAuto,retryNote;qq.FineUploaderBasic.prototype._onBeforeAutoRetry.apply(this,arguments);item=this.getItemByFileId(id);progressBar=this._find(item,'progressBar');this._showCancelLink(item);progressBar.style.width=0;qq(progressBar).hide();if(this._options.retry.showAutoRetryNote){failTextEl=this._find(item,'statusText');retryNumForDisplay=this._autoRetries[id]+1;maxAuto=this._options.retry.maxAutoAttempts;retryNote=this._options.retry.autoRetryNote.replace(/\{retryNum\}/g,retryNumForDisplay);retryNote=retryNote.replace(/\{maxAuto\}/g,maxAuto);qq(failTextEl).setText(retryNote);if(retryNumForDisplay===1){qq(item).addClass(this._classes.retrying);}}},_onBeforeManualRetry:function(id){if(qq.FineUploaderBasic.prototype._onBeforeManualRetry.apply(this,arguments)){var item=this.getItemByFileId(id);this._find(item,'progressBar').style.width=0;qq(item).removeClass(this._classes.fail);this._showSpinner(item);this._showCancelLink(item);return true;}
return false;},_addToList:function(id,fileName){var item=qq.toElement(this._options.fileTemplate);if(this._options.disableCancelForFormUploads&&!qq.isXhrUploadSupported()){var cancelLink=this._find(item,'cancel');qq(cancelLink).remove();}
item.qqFileId=id;var fileElement=this._find(item,'file');qq(fileElement).setText(this._formatFileName(fileName));qq(this._find(item,'size')).hide();if(!this._options.multiple)this._clearList();this._listElement.appendChild(item);},_clearList:function(){this._listElement.innerHTML='';this.clearStoredFiles();},_bindCancelAndRetryEvents:function(){var self=this,list=this._listElement;this._disposeSupport.attach(list,'click',function(e){e=e||window.event;var target=e.target||e.srcElement;if(qq(target).hasClass(self._classes.cancel)||qq(target).hasClass(self._classes.retry)){qq.preventDefault(e);var item=target.parentNode;while(item.qqFileId==undefined){item=target=target.parentNode;}
if(qq(target).hasClass(self._classes.cancel)){self.cancel(item.qqFileId);}
else{qq(item).removeClass(self._classes.retryable);self.retry(item.qqFileId);}}});},_formatProgress:function(uploadedSize,totalSize){var message=this._options.text.formatProgress;function r(name,replacement){message=message.replace(name,replacement);}
r('{percent}',Math.round(uploadedSize/totalSize*100));r('{total_size}',this._formatSize(totalSize));return message;},_controlFailureTextDisplay:function(item,response){var mode,maxChars,responseProperty,failureReason,shortFailureReason;mode=this._options.failedUploadTextDisplay.mode;maxChars=this._options.failedUploadTextDisplay.maxChars;responseProperty=this._options.failedUploadTextDisplay.responseProperty;if(mode==='custom'){failureReason=response[responseProperty];if(failureReason){if(failureReason.length>maxChars){shortFailureReason=failureReason.substring(0,maxChars)+'...';}}
else{failureReason=this._options.text.failUpload;this.log("'"+responseProperty+"' is not a valid property on the server response.",'warn');}
qq(this._find(item,'statusText')).setText(shortFailureReason||failureReason);if(this._options.failedUploadTextDisplay.enableTooltip){this._showTooltip(item,failureReason);}}
else if(mode==='default'){qq(this._find(item,'statusText')).setText(this._options.text.failUpload);}
else if(mode!=='none'){this.log("failedUploadTextDisplay.mode value of '"+mode+"' is not valid",'warn');}},_showTooltip:function(item,text){item.title=text;},_showSpinner:function(item){var spinnerEl=this._find(item,'spinner');spinnerEl.style.display="inline-block";},_showCancelLink:function(item){if(!this._options.disableCancelForFormUploads||qq.isXhrUploadSupported()){var cancelLink=this._find(item,'cancel');cancelLink.style.display='inline';}},_error:function(code,fileName){var message=qq.FineUploaderBasic.prototype._error.apply(this,arguments);this._options.showMessage(message);}});qq.UploadHandlerAbstract=function(o){this._options={debug:false,endpoint:'/upload.php',paramsInBody:false,maxConnections:999,log:function(str,level){},onProgress:function(id,fileName,loaded,total){},onComplete:function(id,fileName,response,xhr){},onCancel:function(id,fileName){},onUpload:function(id,fileName,xhr){},onAutoRetry:function(id,fileName,response,xhr){}};qq.extend(this._options,o);this._queue=[];this.log=this._options.log;};qq.UploadHandlerAbstract.prototype={add:function(file){},upload:function(id){var len=this._queue.push(id);if(len<=this._options.maxConnections){this._upload(id);}},retry:function(id){var i=qq.indexOf(this._queue,id);if(i>=0){this._upload(id);}
else{this.upload(id);}},cancel:function(id){this.log('Cancelling '+id);this._options.paramsStore.remove(id);this._cancel(id);this._dequeue(id);},cancelAll:function(){for(var i=0;i<this._queue.length;i++){this._cancel(this._queue[i]);}
this._queue=[];},getName:function(id){},getSize:function(id){},getQueue:function(){return this._queue;},reset:function(){this.log('Resetting upload handler');this._queue=[];},_upload:function(id){},_cancel:function(id){},_dequeue:function(id){var i=qq.indexOf(this._queue,id);this._queue.splice(i,1);var max=this._options.maxConnections;if(this._queue.length>=max&&i<max){var nextId=this._queue[max-1];this._upload(nextId);}},isValid:function(id){}};qq.UploadHandlerForm=function(o){qq.UploadHandlerAbstract.apply(this,arguments);this._inputs={};this._detach_load_events={};};qq.extend(qq.UploadHandlerForm.prototype,qq.UploadHandlerAbstract.prototype);qq.extend(qq.UploadHandlerForm.prototype,{add:function(fileInput){fileInput.setAttribute('name',this._options.inputName);var id=qq.getUniqueId();this._inputs[id]=fileInput;if(fileInput.parentNode){qq(fileInput).remove();}
return id;},getName:function(id){return this._inputs[id].value.replace(/.*(\/|\\)/,"");},isValid:function(id){return this._inputs[id]!==undefined;},reset:function(){qq.UploadHandlerAbstract.prototype.reset.apply(this,arguments);this._inputs={};this._detach_load_events={};},_cancel:function(id){this._options.onCancel(id,this.getName(id));delete this._inputs[id];delete this._detach_load_events[id];var iframe=document.getElementById(id);if(iframe){iframe.setAttribute('src','javascript:false;');qq(iframe).remove();}},_upload:function(id){this._options.onUpload(id,this.getName(id),false);var input=this._inputs[id];if(!input){throw new Error('file with passed id was not added, or already uploaded or cancelled');}
var fileName=this.getName(id);var iframe=this._createIframe(id);var form=this._createForm(iframe,this._options.paramsStore.getParams(id));form.appendChild(input);var self=this;this._attachLoadEvent(iframe,function(){self.log('iframe loaded');var response=self._getIframeContentJSON(iframe);setTimeout(function(){self._detach_load_events[id]();delete self._detach_load_events[id];qq(iframe).remove();},1);if(!response.success){if(self._options.onAutoRetry(id,fileName,response)){return;}}
self._options.onComplete(id,fileName,response);self._dequeue(id);});this.log('Sending upload request for '+id);form.submit();qq(form).remove();return id;},_attachLoadEvent:function(iframe,callback){var self=this;this._detach_load_events[iframe.id]=qq(iframe).attach('load',function(){self.log('Received response for '+iframe.id);if(!iframe.parentNode){return;}
try{if(iframe.contentDocument&&iframe.contentDocument.body&&iframe.contentDocument.body.innerHTML=="false"){return;}}
catch(error){self.log('Error when attempting to access iframe during handling of upload response ('+error+")",'error');}
callback();});},_getIframeContentJSON:function(iframe){try{var doc=iframe.contentDocument?iframe.contentDocument:iframe.contentWindow.document,response;var innerHTML=doc.body.innerHTML;this.log("converting iframe's innerHTML to JSON");this.log("innerHTML = "+innerHTML);if(innerHTML&&innerHTML.match(/^<pre/i)){innerHTML=doc.body.firstChild.firstChild.nodeValue;}
response=eval("("+innerHTML+")");}catch(error){this.log('Error when attempting to parse form upload response ('+error+")",'error');response={success:false};}
return response;},_createIframe:function(id){var iframe=qq.toElement('<iframe src="javascript:false;" name="'+id+'" />');iframe.setAttribute('id',id);iframe.style.display='none';document.body.appendChild(iframe);return iframe;},_createForm:function(iframe,params){var protocol=this._options.demoMode?"GET":"POST",form=qq.toElement('<form method="'+protocol+'" enctype="multipart/form-data"></form>'),url=this._options.endpoint;if(!this._options.paramsInBody){url=qq.obj2url(params,this._options.endpoint);}
else{qq.obj2Inputs(params,form);}
form.setAttribute('action',url);form.setAttribute('target',iframe.name);form.style.display='none';document.body.appendChild(form);return form;}});qq.UploadHandlerXhr=function(o){qq.UploadHandlerAbstract.apply(this,arguments);this._files=[];this._xhrs=[];this._loaded=[];};qq.extend(qq.UploadHandlerXhr.prototype,qq.UploadHandlerAbstract.prototype)
qq.extend(qq.UploadHandlerXhr.prototype,{add:function(file){if(!(file instanceof File)){throw new Error('Passed obj in not a File (in qq.UploadHandlerXhr)');}
return this._files.push(file)-1;},getName:function(id){var file=this._files[id];return(file.fileName!==null&&file.fileName!==undefined)?file.fileName:file.name;},getSize:function(id){var file=this._files[id];return file.fileSize!=null?file.fileSize:file.size;},getLoaded:function(id){return this._loaded[id]||0;},isValid:function(id){return this._files[id]!==undefined;},reset:function(){qq.UploadHandlerAbstract.prototype.reset.apply(this,arguments);this._files=[];this._xhrs=[];this._loaded=[];},_upload:function(id){var file=this._files[id],name=this.getName(id),size=this.getSize(id),self=this,url=this._options.endpoint,protocol=this._options.demoMode?"GET":"POST",xhr,formData,paramName,key,params;this._options.onUpload(id,this.getName(id),true);this._loaded[id]=0;xhr=this._xhrs[id]=new XMLHttpRequest();xhr.upload.onprogress=function(e){if(e.lengthComputable){self._loaded[id]=e.loaded;self._options.onProgress(id,name,e.loaded,e.total);}};xhr.onreadystatechange=function(){if(xhr.readyState===4){self._onComplete(id,xhr);}};params=this._options.paramsStore.getParams(id);if(!this._options.paramsInBody){params[this._options.inputName]=name;url=qq.obj2url(params,this._options.endpoint);}
xhr.open(protocol,url,true);xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");xhr.setRequestHeader("X-File-Name",encodeURIComponent(name));xhr.setRequestHeader("Cache-Control","no-cache");if(this._options.forceMultipart||this._options.paramsInBody){formData=new FormData();if(this._options.paramsInBody){qq.obj2FormData(params,formData);}
formData.append(this._options.inputName,file);file=formData;}else{xhr.setRequestHeader("Content-Type","application/octet-stream");xhr.setRequestHeader("X-Mime-Type",file.type);}
for(key in this._options.customHeaders){if(this._options.customHeaders.hasOwnProperty(key)){xhr.setRequestHeader(key,this._options.customHeaders[key]);}}
this.log('Sending upload request for '+id);xhr.send(file);},_onComplete:function(id,xhr){"use strict";if(!this._files[id]){return;}
var name=this.getName(id);var size=this.getSize(id);var response;this._options.onProgress(id,name,size,size);this.log("xhr - server response received for "+id);this.log("responseText = "+xhr.responseText);try{if(typeof JSON.parse==="function"){response=JSON.parse(xhr.responseText);}else{response=eval("("+xhr.responseText+")");}}catch(error){this.log('Error when attempting to parse xhr response text ('+error+')','error');response={};}
if(xhr.status!==200||!response.success){if(this._options.onAutoRetry(id,name,response,xhr)){return;}}
this._options.onComplete(id,name,response,xhr);this._xhrs[id]=null;this._dequeue(id);},_cancel:function(id){this._options.onCancel(id,this.getName(id));this._files[id]=null;if(this._xhrs[id]){this._xhrs[id].abort();this._xhrs[id]=null;}}});(function($){"use strict";var uploader,$el,init,dataStore,pluginOption,pluginOptions,addCallbacks,transformVariables,isValidCommand,delegateCommand;pluginOptions=['uploaderType'];init=function(options){if(options){var xformedOpts=transformVariables(options);addCallbacks(xformedOpts);if(pluginOption('uploaderType')==='basic'){uploader(new qq.FineUploaderBasic(xformedOpts));}
else{uploader(new qq.FineUploader(xformedOpts));}}
return $el;};dataStore=function(key,val){var data=$el.data('fineuploader');if(val){if(data===undefined){data={};}
data[key]=val;$el.data('fineuploader',data);}
else{if(data===undefined){return null;}
return data[key];}};uploader=function(instanceToStore){return dataStore('uploader',instanceToStore);};pluginOption=function(option,optionVal){return dataStore(option,optionVal);};addCallbacks=function(transformedOpts){var callbacks=transformedOpts.callbacks={};$.each(new qq.FineUploaderBasic()._options.callbacks,function(prop,func){var name,$callbackEl;name=/^on(\w+)/.exec(prop)[1];name=name.substring(0,1).toLowerCase()+name.substring(1);$callbackEl=$el;callbacks[prop]=function(){var args=Array.prototype.slice.call(arguments);return $callbackEl.triggerHandler(name,args);};});};transformVariables=function(source,dest){var xformed,arrayVals;if(dest===undefined){if(source.uploaderType!=='basic'){xformed={element:$el[0]};}
else{xformed={};}}
else{xformed=dest;}
$.each(source,function(prop,val){if($.inArray(prop,pluginOptions)>=0){pluginOption(prop,val);}
else if(val instanceof $){xformed[prop]=val[0];}
else if($.isPlainObject(val)){xformed[prop]={};transformVariables(val,xformed[prop]);}
else if($.isArray(val)){arrayVals=[];$.each(val,function(idx,arrayVal){if(arrayVal instanceof $){$.merge(arrayVals,arrayVal);}
else{arrayVals.push(arrayVal);}});xformed[prop]=arrayVals;}
else{xformed[prop]=val;}});if(dest===undefined){return xformed;}};isValidCommand=function(command){return $.type(command)==="string"&&!command.match(/^_/)&&uploader()[command]!==undefined;};delegateCommand=function(command){var xformedArgs=[],origArgs=Array.prototype.slice.call(arguments,1);transformVariables(origArgs,xformedArgs);return uploader()[command].apply(uploader(),xformedArgs);};$.fn.fineUploader=function(optionsOrCommand){var self=this,selfArgs=arguments,retVals=[];this.each(function(index,el){$el=$(el);if(uploader()&&isValidCommand(optionsOrCommand)){retVals.push(delegateCommand.apply(self,selfArgs));if(self.length===1){return false;}}
else if(typeof optionsOrCommand==='object'||!optionsOrCommand){init.apply(self,selfArgs);}
else{$.error('Method '+optionsOrCommand+' does not exist on jQuery.fineUploader');}});if(retVals.length===1){return retVals[0];}
else if(retVals.length>1){return retVals;}
return this;};}(jQuery));if(!jQuery){throw new Error("Bootstrap requires jQuery")}
+function($){"use strict";function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={'WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'oTransitionEnd otransitionend','transition':'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}}
$.fn.emulateTransitionEnd=function(duration){var called=false,$el=this
$(this).one($.support.transition.end,function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()})}(window.jQuery);+function($){"use strict";var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.hasClass('alert')?$this:$this.parent()}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one($.support.transition.end,removeElement).emulateTransitionEnd(150):removeElement()}
var old=$.fn.alert
$.fn.alert=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(window.jQuery);+function($){"use strict";var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)}
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(!data.resetText)$el.data('resetText',$el[val]())
$el[val](data[state]||this.options[state])
setTimeout(function(){state=='loadingText'?$el.addClass(d).attr(d,d):$el.removeClass(d).removeAttr(d);},0)}
Button.prototype.toggle=function(){var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input').prop('checked',!this.$element.hasClass('active')).trigger('change')
if($input.prop('type')==='radio')$parent.find('.active').removeClass('active')}
this.$element.toggleClass('active')}
var old=$.fn.button
$.fn.button=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^=button]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
$btn.button('toggle')
e.preventDefault()})}(window.jQuery);+function($){"use strict";var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=this.sliding=this.interval=this.$active=this.$items=null
this.options.pause=='hover'&&this.$element.on('mouseenter',$.proxy(this.pause,this)).on('mouseleave',$.proxy(this.cycle,this))}
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getActiveIndex=function(){this.$active=this.$element.find('.item.active')
this.$items=this.$active.parent().children()
return this.$items.index(this.$active)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getActiveIndex()
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',$(this.$items[pos]))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition.end){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||$active[type]()
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var fallback=type=='next'?'first':'last'
var that=this
if(!$next.length){if(!this.options.wrap)return
$next=this.$element.find('.item')[fallback]()}
this.sliding=true
isCycling&&this.pause()
var e=$.Event('slide.bs.carousel',{relatedTarget:$next[0],direction:direction})
if($next.hasClass('active'))return
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
this.$element.one('slid',function(){var $nextIndicator=$(that.$indicators.children()[that.getActiveIndex()])
$nextIndicator&&$nextIndicator.addClass('active')})}
if($.support.transition&&this.$element.hasClass('slide')){this.$element.trigger(e)
if(e.isDefaultPrevented())return
$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one($.support.transition.end,function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger('slid')},0)}).emulateTransitionEnd(600)}else{this.$element.trigger(e)
if(e.isDefaultPrevented())return
$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger('slid')}
isCycling&&this.cycle()
return this}
var old=$.fn.carousel
$.fn.carousel=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
$(document).on('click.bs.carousel.data-api','[data-slide], [data-slide-to]',function(e){var $this=$(this),href
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
$target.carousel(options)
if(slideIndex=$this.attr('data-slide-to')){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()})
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
$carousel.carousel($carousel.data())})})}(window.jQuery);+function($){"use strict";var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.transitioning=null
if(this.options.parent)this.$parent=$(this.options.parent)
if(this.options.toggle)this.toggle()}
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var actives=this.$parent&&this.$parent.find('> .panel > .in')
if(actives&&actives.length){var hasData=actives.data('bs.collapse')
if(hasData&&hasData.transitioning)return
actives.collapse('hide')
hasData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')
[dimension](0)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('in')
[dimension]('auto')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one($.support.transition.end,$.proxy(complete,this)).emulateTransitionEnd(350)
[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element
[dimension](this.$element[dimension]())
[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse').removeClass('in')
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one($.support.transition.end,$.proxy(complete,this)).emulateTransitionEnd(350)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
var old=$.fn.collapse
$.fn.collapse=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle=collapse]',function(e){var $this=$(this),href
var target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
var $target=$(target)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
var parent=$this.attr('data-parent')
var $parent=parent&&$(parent)
if(!data||!data.transitioning){if($parent)$parent.find('[data-toggle=collapse][data-parent="'+parent+'"]').not($this).addClass('collapsed')
$this[$target.hasClass('in')?'addClass':'removeClass']('collapsed')}
$target.collapse(option)})}(window.jQuery);+function($){"use strict";var backdrop='.dropdown-backdrop'
var toggle='[data-toggle=dropdown]'
var Dropdown=function(element){var $el=$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
$parent.trigger(e=$.Event('show.bs.dropdown'))
if(e.isDefaultPrevented())return
$parent.toggleClass('open').trigger('shown.bs.dropdown')
$this.focus()}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27)/.test(e.keyCode))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27)){if(e.which==27)$parent.find(toggle).focus()
return $this.click()}
var $items=$('[role=menu] li:not(.divider):visible a',$parent)
if(!$items.length)return
var index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).focus()}
function clearMenus(){$(backdrop).remove()
$(toggle).each(function(e){var $parent=getParent($(this))
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown'))
if(e.isDefaultPrevented())return
$parent.removeClass('open').trigger('hidden.bs.dropdown')})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
var old=$.fn.dropdown
$.fn.dropdown=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('dropdown')
if(!data)$this.data('dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle+', [role=menu]',Dropdown.prototype.keydown)}(window.jQuery);+function($){"use strict";var Modal=function(element,options){this.options=options
this.$element=$(element)
this.$backdrop=this.isShown=null
if(this.options.remote)this.$element.load(this.options.remote)}
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this[!this.isShown?'show':'hide'](_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.escape()
this.$element.on('click.dismiss.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(document.body)}
that.$element.show()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$element.find('.modal-dialog').one($.support.transition.end,function(){that.$element.focus().trigger(e)}).emulateTransitionEnd(300):that.$element.focus().trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one($.support.transition.end,$.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.focus()}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keyup.dismiss.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.removeBackdrop()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body)
this.$element.on('click.dismiss.modal',$.proxy(function(e){if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one($.support.transition.end,callback).emulateTransitionEnd(150):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one($.support.transition.end,callback).emulateTransitionEnd(150):callback()}else if(callback){callback()}}
var old=$.fn.modal
$.fn.modal=function(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
e.preventDefault()
$target.modal(option,this).one('hide',function(){$this.is(':visible')&&$this.focus()})})
$(document).on('show.bs.modal','.modal',function(){$(document.body).addClass('modal-open')}).on('hidden.bs.modal','.modal',function(){$(document.body).removeClass('modal-open')})}(window.jQuery);+function($){"use strict";var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('tooltip',element,options)}
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focus'
var eventOut=trigger=='hover'?'mouseleave':'blur'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type)
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type)
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
if(e.isDefaultPrevented())return
var $tip=this.tip()
this.setContent()
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var $parent=this.$element.parent()
var orgPlacement=placement
var docScroll=document.documentElement.scrollTop||document.body.scrollTop
var parentWidth=this.options.container=='body'?window.innerWidth:$parent.outerWidth()
var parentHeight=this.options.container=='body'?window.innerHeight:$parent.outerHeight()
var parentLeft=this.options.container=='body'?0:$parent.offset().left
placement=placement=='bottom'&&pos.top+pos.height+actualHeight-docScroll>parentHeight?'top':placement=='top'&&pos.top-docScroll-actualHeight<0?'bottom':placement=='right'&&pos.right+actualWidth>parentWidth?'left':placement=='left'&&pos.left-actualWidth<parentLeft?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
this.$element.trigger('shown.bs.'+this.type)}}
Tooltip.prototype.applyPlacement=function(offset,placement){var replace
var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$tip.offset(offset).addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){replace=true
offset.top=offset.top+height-actualHeight}
if(/bottom|top/.test(placement)){var delta=0
if(offset.left<0){delta=offset.left*-2
offset.left=0
$tip.offset(offset)
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight}
this.replaceArrow(delta-width+actualWidth,actualWidth,'left')}else{this.replaceArrow(actualHeight-height,actualHeight,'top')}
if(replace)$tip.offset(offset)}
Tooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+"%"):'')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(){var that=this
var $tip=this.tip()
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('fade')?$tip.one($.support.transition.end,complete).emulateTransitionEnd(150):complete()
this.$element.trigger('hidden.bs.'+this.type)
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function(){var el=this.$element[0]
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():{width:el.offsetWidth,height:el.offsetHeight},this.$element.offset())}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)}
Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow')}
Tooltip.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=e?$(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type):this
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){this.hide().$element.off('.'+this.type).removeData('bs.'+this.type)}
var old=$.fn.tooltip
$.fn.tooltip=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(window.jQuery);+function($){"use strict";var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content')[this.options.html?'html':'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find('.arrow')}
Popover.prototype.tip=function(){if(!this.$tip)this.$tip=$(this.options.template)
return this.$tip}
var old=$.fn.popover
$.fn.popover=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(window.jQuery);+function($){"use strict";function ScrollSpy(element,options){var href
var process=$.proxy(this.process,this)
this.$element=$(element).is('body')?$(window):$(element)
this.$body=$('body')
this.$scrollElement=this.$element.on('scroll.bs.scroll-spy.data-api',process)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||((href=$(element).attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))||'')+' .nav li > a'
this.offsets=$([])
this.targets=$([])
this.activeTarget=null
this.refresh()
this.process()}
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.refresh=function(){var offsetMethod=this.$element[0]==window?'offset':'position'
this.offsets=$([])
this.targets=$([])
var self=this
var $targets=this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#\w/.test(href)&&$(href)
return($href&&$href.length&&[[$href[offsetMethod]().top+(!$.isWindow(self.$scrollElement.get(0))&&self.$scrollElement.scrollTop()),href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight
var maxScroll=scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(scrollTop>=maxScroll){return activeTarget!=(i=targets.last()[0])&&this.activate(i)}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
$(this.selector).parents('.active').removeClass('active')
var selector=this.selector
+'[data-target="'+target+'"],'
+this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate')}
var old=$.fn.scrollspy
$.fn.scrollspy=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
$spy.scrollspy($spy.data())})})}(window.jQuery);+function($){"use strict";var Tab=function(element){this.element=$(element)}
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var previous=$ul.find('.active:last a')[0]
var e=$.Event('show.bs.tab',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.parent('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown.bs.tab',relatedTarget:previous})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&$active.hasClass('fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one($.support.transition.end,next).emulateTransitionEnd(150):next()
$active.removeClass('in')}
var old=$.fn.tab
$.fn.tab=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault()
$(this).tab('show')})}(window.jQuery);+function($){"use strict";var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$window=$(window).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=this.unpin=null
this.checkPosition()}
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height()
var scrollTop=this.$window.scrollTop()
var position=this.$element.offset()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top()
if(typeof offsetBottom=='function')offsetBottom=offset.bottom()
var affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&(scrollTop<=offsetTop)?'top':false
if(this.affixed===affix)return
if(this.unpin)this.$element.css('top','')
this.affixed=affix
this.unpin=affix=='bottom'?position.top-scrollTop:null
this.$element.removeClass(Affix.RESET).addClass('affix'+(affix?'-'+affix:''))
if(affix=='bottom'){this.$element.offset({top:document.body.offsetHeight-offsetBottom-this.$element.height()})}}
var old=$.fn.affix
$.fn.affix=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom)data.offset.bottom=data.offsetBottom
if(data.offsetTop)data.offset.top=data.offsetTop
$spy.affix(data)})})}(window.jQuery);var Handlebars={};(function(Handlebars,undefined){;Handlebars.VERSION="1.0.0";Handlebars.COMPILER_REVISION=4;Handlebars.REVISION_CHANGES={1:'<= 1.0.rc.2',2:'== 1.0.0-rc.3',3:'== 1.0.0-rc.4',4:'>= 1.0.0'};Handlebars.helpers={};Handlebars.partials={};var toString=Object.prototype.toString,functionType='[object Function]',objectType='[object Object]';Handlebars.registerHelper=function(name,fn,inverse){if(toString.call(name)===objectType){if(inverse||fn){throw new Handlebars.Exception('Arg not supported with multiple helpers');}
Handlebars.Utils.extend(this.helpers,name);}else{if(inverse){fn.not=inverse;}
this.helpers[name]=fn;}};Handlebars.registerPartial=function(name,str){if(toString.call(name)===objectType){Handlebars.Utils.extend(this.partials,name);}else{this.partials[name]=str;}};Handlebars.registerHelper('helperMissing',function(arg){if(arguments.length===2){return undefined;}else{throw new Error("Missing helper: '"+arg+"'");}});Handlebars.registerHelper('blockHelperMissing',function(context,options){var inverse=options.inverse||function(){},fn=options.fn;var type=toString.call(context);if(type===functionType){context=context.call(this);}
if(context===true){return fn(this);}else if(context===false||context==null){return inverse(this);}else if(type==="[object Array]"){if(context.length>0){return Handlebars.helpers.each(context,options);}else{return inverse(this);}}else{return fn(context);}});Handlebars.K=function(){};Handlebars.createFrame=Object.create||function(object){Handlebars.K.prototype=object;var obj=new Handlebars.K();Handlebars.K.prototype=null;return obj;};Handlebars.logger={DEBUG:0,INFO:1,WARN:2,ERROR:3,level:3,methodMap:{0:'debug',1:'info',2:'warn',3:'error'},log:function(level,obj){if(Handlebars.logger.level<=level){var method=Handlebars.logger.methodMap[level];if(typeof console!=='undefined'&&console[method]){console[method].call(console,obj);}}}};Handlebars.log=function(level,obj){Handlebars.logger.log(level,obj);};Handlebars.registerHelper('each',function(context,options){var fn=options.fn,inverse=options.inverse;var i=0,ret="",data;var type=toString.call(context);if(type===functionType){context=context.call(this);}
if(options.data){data=Handlebars.createFrame(options.data);}
if(context&&typeof context==='object'){if(context instanceof Array){for(var j=context.length;i<j;i++){if(data){data.index=i;}
ret=ret+fn(context[i],{data:data});}}else{for(var key in context){if(context.hasOwnProperty(key)){if(data){data.key=key;}
ret=ret+fn(context[key],{data:data});i++;}}}}
if(i===0){ret=inverse(this);}
return ret;});Handlebars.registerHelper('if',function(conditional,options){var type=toString.call(conditional);if(type===functionType){conditional=conditional.call(this);}
if(!conditional||Handlebars.Utils.isEmpty(conditional)){return options.inverse(this);}else{return options.fn(this);}});Handlebars.registerHelper('unless',function(conditional,options){return Handlebars.helpers['if'].call(this,conditional,{fn:options.inverse,inverse:options.fn});});Handlebars.registerHelper('with',function(context,options){var type=toString.call(context);if(type===functionType){context=context.call(this);}
if(!Handlebars.Utils.isEmpty(context))return options.fn(context);});Handlebars.registerHelper('log',function(context,options){var level=options.data&&options.data.level!=null?parseInt(options.data.level,10):1;Handlebars.log(level,context);});;var handlebars=(function(){var parser={trace:function trace(){},yy:{},symbols_:{"error":2,"root":3,"program":4,"EOF":5,"simpleInverse":6,"statements":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"CLOSE_UNESCAPED":24,"OPEN_PARTIAL":25,"partialName":26,"params":27,"hash":28,"dataName":29,"param":30,"STRING":31,"INTEGER":32,"BOOLEAN":33,"hashSegments":34,"hashSegment":35,"ID":36,"EQUALS":37,"DATA":38,"pathSegments":39,"SEP":40,"$accept":0,"$end":1},terminals_:{2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"CLOSE_UNESCAPED",25:"OPEN_PARTIAL",31:"STRING",32:"INTEGER",33:"BOOLEAN",36:"ID",37:"EQUALS",38:"DATA",40:"SEP"},productions_:[0,[3,2],[4,2],[4,3],[4,2],[4,1],[4,1],[4,0],[7,1],[7,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[6,2],[17,3],[17,2],[17,2],[17,1],[17,1],[27,2],[27,1],[30,1],[30,1],[30,1],[30,1],[30,1],[28,1],[34,2],[34,1],[35,3],[35,3],[35,3],[35,3],[35,3],[26,1],[26,1],[26,1],[29,2],[21,1],[39,3],[39,1]],performAction:function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$){var $0=$$.length-1;switch(yystate){case 1:return $$[$0-1];break;case 2:this.$=new yy.ProgramNode([],$$[$0]);break;case 3:this.$=new yy.ProgramNode($$[$0-2],$$[$0]);break;case 4:this.$=new yy.ProgramNode($$[$0-1],[]);break;case 5:this.$=new yy.ProgramNode($$[$0]);break;case 6:this.$=new yy.ProgramNode([],[]);break;case 7:this.$=new yy.ProgramNode([]);break;case 8:this.$=[$$[$0]];break;case 9:$$[$0-1].push($$[$0]);this.$=$$[$0-1];break;case 10:this.$=new yy.BlockNode($$[$0-2],$$[$0-1].inverse,$$[$0-1],$$[$0]);break;case 11:this.$=new yy.BlockNode($$[$0-2],$$[$0-1],$$[$0-1].inverse,$$[$0]);break;case 12:this.$=$$[$0];break;case 13:this.$=$$[$0];break;case 14:this.$=new yy.ContentNode($$[$0]);break;case 15:this.$=new yy.CommentNode($$[$0]);break;case 16:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1]);break;case 17:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1]);break;case 18:this.$=$$[$0-1];break;case 19:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1],$$[$0-2][2]==='&');break;case 20:this.$=new yy.MustacheNode($$[$0-1][0],$$[$0-1][1],true);break;case 21:this.$=new yy.PartialNode($$[$0-1]);break;case 22:this.$=new yy.PartialNode($$[$0-2],$$[$0-1]);break;case 23:break;case 24:this.$=[[$$[$0-2]].concat($$[$0-1]),$$[$0]];break;case 25:this.$=[[$$[$0-1]].concat($$[$0]),null];break;case 26:this.$=[[$$[$0-1]],$$[$0]];break;case 27:this.$=[[$$[$0]],null];break;case 28:this.$=[[$$[$0]],null];break;case 29:$$[$0-1].push($$[$0]);this.$=$$[$0-1];break;case 30:this.$=[$$[$0]];break;case 31:this.$=$$[$0];break;case 32:this.$=new yy.StringNode($$[$0]);break;case 33:this.$=new yy.IntegerNode($$[$0]);break;case 34:this.$=new yy.BooleanNode($$[$0]);break;case 35:this.$=$$[$0];break;case 36:this.$=new yy.HashNode($$[$0]);break;case 37:$$[$0-1].push($$[$0]);this.$=$$[$0-1];break;case 38:this.$=[$$[$0]];break;case 39:this.$=[$$[$0-2],$$[$0]];break;case 40:this.$=[$$[$0-2],new yy.StringNode($$[$0])];break;case 41:this.$=[$$[$0-2],new yy.IntegerNode($$[$0])];break;case 42:this.$=[$$[$0-2],new yy.BooleanNode($$[$0])];break;case 43:this.$=[$$[$0-2],$$[$0]];break;case 44:this.$=new yy.PartialNameNode($$[$0]);break;case 45:this.$=new yy.PartialNameNode(new yy.StringNode($$[$0]));break;case 46:this.$=new yy.PartialNameNode(new yy.IntegerNode($$[$0]));break;case 47:this.$=new yy.DataNode($$[$0]);break;case 48:this.$=new yy.IdNode($$[$0]);break;case 49:$$[$0-2].push({part:$$[$0],separator:$$[$0-1]});this.$=$$[$0-2];break;case 50:this.$=[{part:$$[$0]}];break;}},table:[{3:1,4:2,5:[2,7],6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],22:[1,14],23:[1,15],25:[1,16]},{1:[3]},{5:[1,17]},{5:[2,6],7:18,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,6],22:[1,14],23:[1,15],25:[1,16]},{5:[2,5],6:20,8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,5],22:[1,14],23:[1,15],25:[1,16]},{17:23,18:[1,22],21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],25:[2,8]},{4:29,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{4:30,6:3,7:4,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,5],20:[2,7],22:[1,14],23:[1,15],25:[1,16]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],25:[2,12]},{5:[2,13],14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],25:[2,13]},{5:[2,14],14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],25:[2,14]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],25:[2,15]},{17:31,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:32,21:24,29:25,36:[1,28],38:[1,27],39:26},{17:33,21:24,29:25,36:[1,28],38:[1,27],39:26},{21:35,26:34,31:[1,36],32:[1,37],36:[1,28],39:26},{1:[2,1]},{5:[2,2],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,2],22:[1,14],23:[1,15],25:[1,16]},{17:23,21:24,29:25,36:[1,28],38:[1,27],39:26},{5:[2,4],7:38,8:6,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,4],22:[1,14],23:[1,15],25:[1,16]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],25:[2,9]},{5:[2,23],14:[2,23],15:[2,23],16:[2,23],19:[2,23],20:[2,23],22:[2,23],23:[2,23],25:[2,23]},{18:[1,39]},{18:[2,27],21:44,24:[2,27],27:40,28:41,29:48,30:42,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,28],24:[2,28]},{18:[2,48],24:[2,48],31:[2,48],32:[2,48],33:[2,48],36:[2,48],38:[2,48],40:[1,51]},{21:52,36:[1,28],39:26},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],38:[2,50],40:[2,50]},{10:53,20:[1,54]},{10:55,20:[1,54]},{18:[1,56]},{18:[1,57]},{24:[1,58]},{18:[1,59],21:60,36:[1,28],39:26},{18:[2,44],36:[2,44]},{18:[2,45],36:[2,45]},{18:[2,46],36:[2,46]},{5:[2,3],8:21,9:7,11:8,12:9,13:10,14:[1,11],15:[1,12],16:[1,13],19:[1,19],20:[2,3],22:[1,14],23:[1,15],25:[1,16]},{14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],25:[2,17]},{18:[2,25],21:44,24:[2,25],28:61,29:48,30:62,31:[1,45],32:[1,46],33:[1,47],34:43,35:49,36:[1,50],38:[1,27],39:26},{18:[2,26],24:[2,26]},{18:[2,30],24:[2,30],31:[2,30],32:[2,30],33:[2,30],36:[2,30],38:[2,30]},{18:[2,36],24:[2,36],35:63,36:[1,64]},{18:[2,31],24:[2,31],31:[2,31],32:[2,31],33:[2,31],36:[2,31],38:[2,31]},{18:[2,32],24:[2,32],31:[2,32],32:[2,32],33:[2,32],36:[2,32],38:[2,32]},{18:[2,33],24:[2,33],31:[2,33],32:[2,33],33:[2,33],36:[2,33],38:[2,33]},{18:[2,34],24:[2,34],31:[2,34],32:[2,34],33:[2,34],36:[2,34],38:[2,34]},{18:[2,35],24:[2,35],31:[2,35],32:[2,35],33:[2,35],36:[2,35],38:[2,35]},{18:[2,38],24:[2,38],36:[2,38]},{18:[2,50],24:[2,50],31:[2,50],32:[2,50],33:[2,50],36:[2,50],37:[1,65],38:[2,50],40:[2,50]},{36:[1,66]},{18:[2,47],24:[2,47],31:[2,47],32:[2,47],33:[2,47],36:[2,47],38:[2,47]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],25:[2,10]},{21:67,36:[1,28],39:26},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],25:[2,11]},{14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],25:[2,16]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],25:[2,19]},{5:[2,20],14:[2,20],15:[2,20],16:[2,20],19:[2,20],20:[2,20],22:[2,20],23:[2,20],25:[2,20]},{5:[2,21],14:[2,21],15:[2,21],16:[2,21],19:[2,21],20:[2,21],22:[2,21],23:[2,21],25:[2,21]},{18:[1,68]},{18:[2,24],24:[2,24]},{18:[2,29],24:[2,29],31:[2,29],32:[2,29],33:[2,29],36:[2,29],38:[2,29]},{18:[2,37],24:[2,37],36:[2,37]},{37:[1,65]},{21:69,29:73,31:[1,70],32:[1,71],33:[1,72],36:[1,28],38:[1,27],39:26},{18:[2,49],24:[2,49],31:[2,49],32:[2,49],33:[2,49],36:[2,49],38:[2,49],40:[2,49]},{18:[1,74]},{5:[2,22],14:[2,22],15:[2,22],16:[2,22],19:[2,22],20:[2,22],22:[2,22],23:[2,22],25:[2,22]},{18:[2,39],24:[2,39],36:[2,39]},{18:[2,40],24:[2,40],36:[2,40]},{18:[2,41],24:[2,41],36:[2,41]},{18:[2,42],24:[2,42],36:[2,42]},{18:[2,43],24:[2,43],36:[2,43]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],25:[2,18]}],defaultActions:{17:[2,1]},parseError:function parseError(str,hash){throw new Error(str);},parse:function parse(input){var self=this,stack=[0],vstack=[null],lstack=[],table=this.table,yytext="",yylineno=0,yyleng=0,recovering=0,TERROR=2,EOF=1;this.lexer.setInput(input);this.lexer.yy=this.yy;this.yy.lexer=this.lexer;this.yy.parser=this;if(typeof this.lexer.yylloc=="undefined")
this.lexer.yylloc={};var yyloc=this.lexer.yylloc;lstack.push(yyloc);var ranges=this.lexer.options&&this.lexer.options.ranges;if(typeof this.yy.parseError==="function")
this.parseError=this.yy.parseError;function popStack(n){stack.length=stack.length-2*n;vstack.length=vstack.length-n;lstack.length=lstack.length-n;}
function lex(){var token;token=self.lexer.lex()||1;if(typeof token!=="number"){token=self.symbols_[token]||token;}
return token;}
var symbol,preErrorSymbol,state,action,a,r,yyval={},p,len,newState,expected;while(true){state=stack[stack.length-1];if(this.defaultActions[state]){action=this.defaultActions[state];}else{if(symbol===null||typeof symbol=="undefined"){symbol=lex();}
action=table[state]&&table[state][symbol];}
if(typeof action==="undefined"||!action.length||!action[0]){var errStr="";if(!recovering){expected=[];for(p in table[state])
if(this.terminals_[p]&&p>2){expected.push("'"+this.terminals_[p]+"'");}
if(this.lexer.showPosition){errStr="Parse error on line "+(yylineno+1)+":\n"+this.lexer.showPosition()+"\nExpecting "+expected.join(", ")+", got '"+(this.terminals_[symbol]||symbol)+"'";}else{errStr="Parse error on line "+(yylineno+1)+": Unexpected "+(symbol==1?"end of input":"'"+(this.terminals_[symbol]||symbol)+"'");}
this.parseError(errStr,{text:this.lexer.match,token:this.terminals_[symbol]||symbol,line:this.lexer.yylineno,loc:yyloc,expected:expected});}}
if(action[0]instanceof Array&&action.length>1){throw new Error("Parse Error: multiple actions possible at state: "+state+", token: "+symbol);}
switch(action[0]){case 1:stack.push(symbol);vstack.push(this.lexer.yytext);lstack.push(this.lexer.yylloc);stack.push(action[1]);symbol=null;if(!preErrorSymbol){yyleng=this.lexer.yyleng;yytext=this.lexer.yytext;yylineno=this.lexer.yylineno;yyloc=this.lexer.yylloc;if(recovering>0)
recovering--;}else{symbol=preErrorSymbol;preErrorSymbol=null;}
break;case 2:len=this.productions_[action[1]][1];yyval.$=vstack[vstack.length-len];yyval._$={first_line:lstack[lstack.length-(len||1)].first_line,last_line:lstack[lstack.length-1].last_line,first_column:lstack[lstack.length-(len||1)].first_column,last_column:lstack[lstack.length-1].last_column};if(ranges){yyval._$.range=[lstack[lstack.length-(len||1)].range[0],lstack[lstack.length-1].range[1]];}
r=this.performAction.call(yyval,yytext,yyleng,yylineno,this.yy,action[1],vstack,lstack);if(typeof r!=="undefined"){return r;}
if(len){stack=stack.slice(0,-1*len*2);vstack=vstack.slice(0,-1*len);lstack=lstack.slice(0,-1*len);}
stack.push(this.productions_[action[1]][0]);vstack.push(yyval.$);lstack.push(yyval._$);newState=table[stack[stack.length-2]][stack[stack.length-1]];stack.push(newState);break;case 3:return true;}}
return true;}};var lexer=(function(){var lexer=({EOF:1,parseError:function parseError(str,hash){if(this.yy.parser){this.yy.parser.parseError(str,hash);}else{throw new Error(str);}},setInput:function(input){this._input=input;this._more=this._less=this.done=false;this.yylineno=this.yyleng=0;this.yytext=this.matched=this.match='';this.conditionStack=['INITIAL'];this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0};if(this.options.ranges)this.yylloc.range=[0,0];this.offset=0;return this;},input:function(){var ch=this._input[0];this.yytext+=ch;this.yyleng++;this.offset++;this.match+=ch;this.matched+=ch;var lines=ch.match(/(?:\r\n?|\n).*/g);if(lines){this.yylineno++;this.yylloc.last_line++;}else{this.yylloc.last_column++;}
if(this.options.ranges)this.yylloc.range[1]++;this._input=this._input.slice(1);return ch;},unput:function(ch){var len=ch.length;var lines=ch.split(/(?:\r\n?|\n)/g);this._input=ch+this._input;this.yytext=this.yytext.substr(0,this.yytext.length-len-1);this.offset-=len;var oldLines=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1);this.matched=this.matched.substr(0,this.matched.length-1);if(lines.length-1)this.yylineno-=lines.length-1;var r=this.yylloc.range;this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:lines?(lines.length===oldLines.length?this.yylloc.first_column:0)+oldLines[oldLines.length-lines.length].length-lines[0].length:this.yylloc.first_column-len};if(this.options.ranges){this.yylloc.range=[r[0],r[0]+this.yyleng-len];}
return this;},more:function(){this._more=true;return this;},less:function(n){this.unput(this.match.slice(n));},pastInput:function(){var past=this.matched.substr(0,this.matched.length-this.match.length);return(past.length>20?'...':'')+past.substr(-20).replace(/\n/g,"");},upcomingInput:function(){var next=this.match;if(next.length<20){next+=this._input.substr(0,20-next.length);}
return(next.substr(0,20)+(next.length>20?'...':'')).replace(/\n/g,"");},showPosition:function(){var pre=this.pastInput();var c=new Array(pre.length+1).join("-");return pre+this.upcomingInput()+"\n"+c+"^";},next:function(){if(this.done){return this.EOF;}
if(!this._input)this.done=true;var token,match,tempMatch,index,col,lines;if(!this._more){this.yytext='';this.match='';}
var rules=this._currentRules();for(var i=0;i<rules.length;i++){tempMatch=this._input.match(this.rules[rules[i]]);if(tempMatch&&(!match||tempMatch[0].length>match[0].length)){match=tempMatch;index=i;if(!this.options.flex)break;}}
if(match){lines=match[0].match(/(?:\r\n?|\n).*/g);if(lines)this.yylineno+=lines.length;this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:lines?lines[lines.length-1].length-lines[lines.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+match[0].length};this.yytext+=match[0];this.match+=match[0];this.matches=match;this.yyleng=this.yytext.length;if(this.options.ranges){this.yylloc.range=[this.offset,this.offset+=this.yyleng];}
this._more=false;this._input=this._input.slice(match[0].length);this.matched+=match[0];token=this.performAction.call(this,this.yy,this,rules[index],this.conditionStack[this.conditionStack.length-1]);if(this.done&&this._input)this.done=false;if(token)return token;else return;}
if(this._input===""){return this.EOF;}else{return this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),{text:"",token:null,line:this.yylineno});}},lex:function lex(){var r=this.next();if(typeof r!=='undefined'){return r;}else{return this.lex();}},begin:function begin(condition){this.conditionStack.push(condition);},popState:function popState(){return this.conditionStack.pop();},_currentRules:function _currentRules(){return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;},topState:function(){return this.conditionStack[this.conditionStack.length-2];},pushState:function begin(condition){this.begin(condition);}});lexer.options={};lexer.performAction=function anonymous(yy,yy_,$avoiding_name_collisions,YY_START){var YYSTATE=YY_START
switch($avoiding_name_collisions){case 0:yy_.yytext="\\";return 14;break;case 1:if(yy_.yytext.slice(-1)!=="\\")this.begin("mu");if(yy_.yytext.slice(-1)==="\\")yy_.yytext=yy_.yytext.substr(0,yy_.yyleng-1),this.begin("emu");if(yy_.yytext)return 14;break;case 2:return 14;break;case 3:if(yy_.yytext.slice(-1)!=="\\")this.popState();if(yy_.yytext.slice(-1)==="\\")yy_.yytext=yy_.yytext.substr(0,yy_.yyleng-1);return 14;break;case 4:yy_.yytext=yy_.yytext.substr(0,yy_.yyleng-4);this.popState();return 15;break;case 5:return 25;break;case 6:return 16;break;case 7:return 20;break;case 8:return 19;break;case 9:return 19;break;case 10:return 23;break;case 11:return 22;break;case 12:this.popState();this.begin('com');break;case 13:yy_.yytext=yy_.yytext.substr(3,yy_.yyleng-5);this.popState();return 15;break;case 14:return 22;break;case 15:return 37;break;case 16:return 36;break;case 17:return 36;break;case 18:return 40;break;case 19:break;case 20:this.popState();return 24;break;case 21:this.popState();return 18;break;case 22:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"');return 31;break;case 23:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\'/g,"'");return 31;break;case 24:return 38;break;case 25:return 33;break;case 26:return 33;break;case 27:return 32;break;case 28:return 36;break;case 29:yy_.yytext=yy_.yytext.substr(1,yy_.yyleng-2);return 36;break;case 30:return'INVALID';break;case 31:return 5;break;}};lexer.rules=[/^(?:\\\\(?=(\{\{)))/,/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|$)))/,/^(?:[\s\S]*?--\}\})/,/^(?:\{\{>)/,/^(?:\{\{#)/,/^(?:\{\{\/)/,/^(?:\{\{\^)/,/^(?:\{\{\s*else\b)/,/^(?:\{\{\{)/,/^(?:\{\{&)/,/^(?:\{\{!--)/,/^(?:\{\{![\s\S]*?\}\})/,/^(?:\{\{)/,/^(?:=)/,/^(?:\.(?=[}\/ ]))/,/^(?:\.\.)/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}\}\})/,/^(?:\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=[}\s]))/,/^(?:false(?=[}\s]))/,/^(?:-?[0-9]+(?=[}\s]))/,/^(?:[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.]))/,/^(?:\[[^\]]*\])/,/^(?:.)/,/^(?:$)/];lexer.conditions={"mu":{"rules":[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],"inclusive":false},"emu":{"rules":[3],"inclusive":false},"com":{"rules":[4],"inclusive":false},"INITIAL":{"rules":[0,1,2,31],"inclusive":true}};return lexer;})()
parser.lexer=lexer;function Parser(){this.yy={};}Parser.prototype=parser;parser.Parser=Parser;return new Parser;})();;Handlebars.Parser=handlebars;Handlebars.parse=function(input){if(input.constructor===Handlebars.AST.ProgramNode){return input;}
Handlebars.Parser.yy=Handlebars.AST;return Handlebars.Parser.parse(input);};;Handlebars.AST={};Handlebars.AST.ProgramNode=function(statements,inverse){this.type="program";this.statements=statements;if(inverse){this.inverse=new Handlebars.AST.ProgramNode(inverse);}};Handlebars.AST.MustacheNode=function(rawParams,hash,unescaped){this.type="mustache";this.escaped=!unescaped;this.hash=hash;var id=this.id=rawParams[0];var params=this.params=rawParams.slice(1);var eligibleHelper=this.eligibleHelper=id.isSimple;this.isHelper=eligibleHelper&&(params.length||hash);};Handlebars.AST.PartialNode=function(partialName,context){this.type="partial";this.partialName=partialName;this.context=context;};Handlebars.AST.BlockNode=function(mustache,program,inverse,close){var verifyMatch=function(open,close){if(open.original!==close.original){throw new Handlebars.Exception(open.original+" doesn't match "+close.original);}};verifyMatch(mustache.id,close);this.type="block";this.mustache=mustache;this.program=program;this.inverse=inverse;if(this.inverse&&!this.program){this.isInverse=true;}};Handlebars.AST.ContentNode=function(string){this.type="content";this.string=string;};Handlebars.AST.HashNode=function(pairs){this.type="hash";this.pairs=pairs;};Handlebars.AST.IdNode=function(parts){this.type="ID";var original="",dig=[],depth=0;for(var i=0,l=parts.length;i<l;i++){var part=parts[i].part;original+=(parts[i].separator||'')+part;if(part===".."||part==="."||part==="this"){if(dig.length>0){throw new Handlebars.Exception("Invalid path: "+original);}
else if(part===".."){depth++;}
else{this.isScoped=true;}}
else{dig.push(part);}}
this.original=original;this.parts=dig;this.string=dig.join('.');this.depth=depth;this.isSimple=parts.length===1&&!this.isScoped&&depth===0;this.stringModeValue=this.string;};Handlebars.AST.PartialNameNode=function(name){this.type="PARTIAL_NAME";this.name=name.original;};Handlebars.AST.DataNode=function(id){this.type="DATA";this.id=id;};Handlebars.AST.StringNode=function(string){this.type="STRING";this.original=this.string=this.stringModeValue=string;};Handlebars.AST.IntegerNode=function(integer){this.type="INTEGER";this.original=this.integer=integer;this.stringModeValue=Number(integer);};Handlebars.AST.BooleanNode=function(bool){this.type="BOOLEAN";this.bool=bool;this.stringModeValue=bool==="true";};Handlebars.AST.CommentNode=function(comment){this.type="comment";this.comment=comment;};;var errorProps=['description','fileName','lineNumber','message','name','number','stack'];Handlebars.Exception=function(message){var tmp=Error.prototype.constructor.apply(this,arguments);for(var idx=0;idx<errorProps.length;idx++){this[errorProps[idx]]=tmp[errorProps[idx]];}};Handlebars.Exception.prototype=new Error();Handlebars.SafeString=function(string){this.string=string;};Handlebars.SafeString.prototype.toString=function(){return this.string.toString();};var escape={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"};var badChars=/[&<>"'`]/g;var possible=/[&<>"'`]/;var escapeChar=function(chr){return escape[chr]||"&amp;";};Handlebars.Utils={extend:function(obj,value){for(var key in value){if(value.hasOwnProperty(key)){obj[key]=value[key];}}},escapeExpression:function(string){if(string instanceof Handlebars.SafeString){return string.toString();}else if(string==null||string===false){return"";}
string=string.toString();if(!possible.test(string)){return string;}
return string.replace(badChars,escapeChar);},isEmpty:function(value){if(!value&&value!==0){return true;}else if(toString.call(value)==="[object Array]"&&value.length===0){return true;}else{return false;}}};;var Compiler=Handlebars.Compiler=function(){};var JavaScriptCompiler=Handlebars.JavaScriptCompiler=function(){};Compiler.prototype={compiler:Compiler,disassemble:function(){var opcodes=this.opcodes,opcode,out=[],params,param;for(var i=0,l=opcodes.length;i<l;i++){opcode=opcodes[i];if(opcode.opcode==='DECLARE'){out.push("DECLARE "+opcode.name+"="+opcode.value);}else{params=[];for(var j=0;j<opcode.args.length;j++){param=opcode.args[j];if(typeof param==="string"){param="\""+param.replace("\n","\\n")+"\"";}
params.push(param);}
out.push(opcode.opcode+" "+params.join(" "));}}
return out.join("\n");},equals:function(other){var len=this.opcodes.length;if(other.opcodes.length!==len){return false;}
for(var i=0;i<len;i++){var opcode=this.opcodes[i],otherOpcode=other.opcodes[i];if(opcode.opcode!==otherOpcode.opcode||opcode.args.length!==otherOpcode.args.length){return false;}
for(var j=0;j<opcode.args.length;j++){if(opcode.args[j]!==otherOpcode.args[j]){return false;}}}
len=this.children.length;if(other.children.length!==len){return false;}
for(i=0;i<len;i++){if(!this.children[i].equals(other.children[i])){return false;}}
return true;},guid:0,compile:function(program,options){this.children=[];this.depths={list:[]};this.options=options;var knownHelpers=this.options.knownHelpers;this.options.knownHelpers={'helperMissing':true,'blockHelperMissing':true,'each':true,'if':true,'unless':true,'with':true,'log':true};if(knownHelpers){for(var name in knownHelpers){this.options.knownHelpers[name]=knownHelpers[name];}}
return this.program(program);},accept:function(node){return this[node.type](node);},program:function(program){var statements=program.statements,statement;this.opcodes=[];for(var i=0,l=statements.length;i<l;i++){statement=statements[i];this[statement.type](statement);}
this.isSimple=l===1;this.depths.list=this.depths.list.sort(function(a,b){return a-b;});return this;},compileProgram:function(program){var result=new this.compiler().compile(program,this.options);var guid=this.guid++,depth;this.usePartial=this.usePartial||result.usePartial;this.children[guid]=result;for(var i=0,l=result.depths.list.length;i<l;i++){depth=result.depths.list[i];if(depth<2){continue;}
else{this.addDepth(depth-1);}}
return guid;},block:function(block){var mustache=block.mustache,program=block.program,inverse=block.inverse;if(program){program=this.compileProgram(program);}
if(inverse){inverse=this.compileProgram(inverse);}
var type=this.classifyMustache(mustache);if(type==="helper"){this.helperMustache(mustache,program,inverse);}else if(type==="simple"){this.simpleMustache(mustache);this.opcode('pushProgram',program);this.opcode('pushProgram',inverse);this.opcode('emptyHash');this.opcode('blockValue');}else{this.ambiguousMustache(mustache,program,inverse);this.opcode('pushProgram',program);this.opcode('pushProgram',inverse);this.opcode('emptyHash');this.opcode('ambiguousBlockValue');}
this.opcode('append');},hash:function(hash){var pairs=hash.pairs,pair,val;this.opcode('pushHash');for(var i=0,l=pairs.length;i<l;i++){pair=pairs[i];val=pair[1];if(this.options.stringParams){if(val.depth){this.addDepth(val.depth);}
this.opcode('getContext',val.depth||0);this.opcode('pushStringParam',val.stringModeValue,val.type);}else{this.accept(val);}
this.opcode('assignToHash',pair[0]);}
this.opcode('popHash');},partial:function(partial){var partialName=partial.partialName;this.usePartial=true;if(partial.context){this.ID(partial.context);}else{this.opcode('push','depth0');}
this.opcode('invokePartial',partialName.name);this.opcode('append');},content:function(content){this.opcode('appendContent',content.string);},mustache:function(mustache){var options=this.options;var type=this.classifyMustache(mustache);if(type==="simple"){this.simpleMustache(mustache);}else if(type==="helper"){this.helperMustache(mustache);}else{this.ambiguousMustache(mustache);}
if(mustache.escaped&&!options.noEscape){this.opcode('appendEscaped');}else{this.opcode('append');}},ambiguousMustache:function(mustache,program,inverse){var id=mustache.id,name=id.parts[0],isBlock=program!=null||inverse!=null;this.opcode('getContext',id.depth);this.opcode('pushProgram',program);this.opcode('pushProgram',inverse);this.opcode('invokeAmbiguous',name,isBlock);},simpleMustache:function(mustache){var id=mustache.id;if(id.type==='DATA'){this.DATA(id);}else if(id.parts.length){this.ID(id);}else{this.addDepth(id.depth);this.opcode('getContext',id.depth);this.opcode('pushContext');}
this.opcode('resolvePossibleLambda');},helperMustache:function(mustache,program,inverse){var params=this.setupFullMustacheParams(mustache,program,inverse),name=mustache.id.parts[0];if(this.options.knownHelpers[name]){this.opcode('invokeKnownHelper',params.length,name);}else if(this.options.knownHelpersOnly){throw new Error("You specified knownHelpersOnly, but used the unknown helper "+name);}else{this.opcode('invokeHelper',params.length,name);}},ID:function(id){this.addDepth(id.depth);this.opcode('getContext',id.depth);var name=id.parts[0];if(!name){this.opcode('pushContext');}else{this.opcode('lookupOnContext',id.parts[0]);}
for(var i=1,l=id.parts.length;i<l;i++){this.opcode('lookup',id.parts[i]);}},DATA:function(data){this.options.data=true;if(data.id.isScoped||data.id.depth){throw new Handlebars.Exception('Scoped data references are not supported: '+data.original);}
this.opcode('lookupData');var parts=data.id.parts;for(var i=0,l=parts.length;i<l;i++){this.opcode('lookup',parts[i]);}},STRING:function(string){this.opcode('pushString',string.string);},INTEGER:function(integer){this.opcode('pushLiteral',integer.integer);},BOOLEAN:function(bool){this.opcode('pushLiteral',bool.bool);},comment:function(){},opcode:function(name){this.opcodes.push({opcode:name,args:[].slice.call(arguments,1)});},declare:function(name,value){this.opcodes.push({opcode:'DECLARE',name:name,value:value});},addDepth:function(depth){if(isNaN(depth)){throw new Error("EWOT");}
if(depth===0){return;}
if(!this.depths[depth]){this.depths[depth]=true;this.depths.list.push(depth);}},classifyMustache:function(mustache){var isHelper=mustache.isHelper;var isEligible=mustache.eligibleHelper;var options=this.options;if(isEligible&&!isHelper){var name=mustache.id.parts[0];if(options.knownHelpers[name]){isHelper=true;}else if(options.knownHelpersOnly){isEligible=false;}}
if(isHelper){return"helper";}
else if(isEligible){return"ambiguous";}
else{return"simple";}},pushParams:function(params){var i=params.length,param;while(i--){param=params[i];if(this.options.stringParams){if(param.depth){this.addDepth(param.depth);}
this.opcode('getContext',param.depth||0);this.opcode('pushStringParam',param.stringModeValue,param.type);}else{this[param.type](param);}}},setupMustacheParams:function(mustache){var params=mustache.params;this.pushParams(params);if(mustache.hash){this.hash(mustache.hash);}else{this.opcode('emptyHash');}
return params;},setupFullMustacheParams:function(mustache,program,inverse){var params=mustache.params;this.pushParams(params);this.opcode('pushProgram',program);this.opcode('pushProgram',inverse);if(mustache.hash){this.hash(mustache.hash);}else{this.opcode('emptyHash');}
return params;}};var Literal=function(value){this.value=value;};JavaScriptCompiler.prototype={nameLookup:function(parent,name){if(/^[0-9]+$/.test(name)){return parent+"["+name+"]";}else if(JavaScriptCompiler.isValidJavaScriptVariableName(name)){return parent+"."+name;}
else{return parent+"['"+name+"']";}},appendToBuffer:function(string){if(this.environment.isSimple){return"return "+string+";";}else{return{appendToBuffer:true,content:string,toString:function(){return"buffer += "+string+";";}};}},initializeBuffer:function(){return this.quotedString("");},namespace:"Handlebars",compile:function(environment,options,context,asObject){this.environment=environment;this.options=options||{};Handlebars.log(Handlebars.logger.DEBUG,this.environment.disassemble()+"\n\n");this.name=this.environment.name;this.isChild=!!context;this.context=context||{programs:[],environments:[],aliases:{}};this.preamble();this.stackSlot=0;this.stackVars=[];this.registers={list:[]};this.compileStack=[];this.inlineStack=[];this.compileChildren(environment,options);var opcodes=environment.opcodes,opcode;this.i=0;for(l=opcodes.length;this.i<l;this.i++){opcode=opcodes[this.i];if(opcode.opcode==='DECLARE'){this[opcode.name]=opcode.value;}else{this[opcode.opcode].apply(this,opcode.args);}}
return this.createFunctionContext(asObject);},nextOpcode:function(){var opcodes=this.environment.opcodes;return opcodes[this.i+1];},eat:function(){this.i=this.i+1;},preamble:function(){var out=[];if(!this.isChild){var namespace=this.namespace;var copies="helpers = this.merge(helpers, "+namespace+".helpers);";if(this.environment.usePartial){copies=copies+" partials = this.merge(partials, "+namespace+".partials);";}
if(this.options.data){copies=copies+" data = data || {};";}
out.push(copies);}else{out.push('');}
if(!this.environment.isSimple){out.push(", buffer = "+this.initializeBuffer());}else{out.push("");}
this.lastContext=0;this.source=out;},createFunctionContext:function(asObject){var locals=this.stackVars.concat(this.registers.list);if(locals.length>0){this.source[1]=this.source[1]+", "+locals.join(", ");}
if(!this.isChild){for(var alias in this.context.aliases){if(this.context.aliases.hasOwnProperty(alias)){this.source[1]=this.source[1]+', '+alias+'='+this.context.aliases[alias];}}}
if(this.source[1]){this.source[1]="var "+this.source[1].substring(2)+";";}
if(!this.isChild){this.source[1]+='\n'+this.context.programs.join('\n')+'\n';}
if(!this.environment.isSimple){this.source.push("return buffer;");}
var params=this.isChild?["depth0","data"]:["Handlebars","depth0","helpers","partials","data"];for(var i=0,l=this.environment.depths.list.length;i<l;i++){params.push("depth"+this.environment.depths.list[i]);}
var source=this.mergeSource();if(!this.isChild){var revision=Handlebars.COMPILER_REVISION,versions=Handlebars.REVISION_CHANGES[revision];source="this.compilerInfo = ["+revision+",'"+versions+"'];\n"+source;}
if(asObject){params.push(source);return Function.apply(this,params);}else{var functionSource='function '+(this.name||'')+'('+params.join(',')+') {\n  '+source+'}';Handlebars.log(Handlebars.logger.DEBUG,functionSource+"\n\n");return functionSource;}},mergeSource:function(){var source='',buffer;for(var i=0,len=this.source.length;i<len;i++){var line=this.source[i];if(line.appendToBuffer){if(buffer){buffer=buffer+'\n    + '+line.content;}else{buffer=line.content;}}else{if(buffer){source+='buffer += '+buffer+';\n  ';buffer=undefined;}
source+=line+'\n  ';}}
return source;},blockValue:function(){this.context.aliases.blockHelperMissing='helpers.blockHelperMissing';var params=["depth0"];this.setupParams(0,params);this.replaceStack(function(current){params.splice(1,0,current);return"blockHelperMissing.call("+params.join(", ")+")";});},ambiguousBlockValue:function(){this.context.aliases.blockHelperMissing='helpers.blockHelperMissing';var params=["depth0"];this.setupParams(0,params);var current=this.topStack();params.splice(1,0,current);params[params.length-1]='options';this.source.push("if (!"+this.lastHelper+") { "+current+" = blockHelperMissing.call("+params.join(", ")+"); }");},appendContent:function(content){this.source.push(this.appendToBuffer(this.quotedString(content)));},append:function(){this.flushInline();var local=this.popStack();this.source.push("if("+local+" || "+local+" === 0) { "+this.appendToBuffer(local)+" }");if(this.environment.isSimple){this.source.push("else { "+this.appendToBuffer("''")+" }");}},appendEscaped:function(){this.context.aliases.escapeExpression='this.escapeExpression';this.source.push(this.appendToBuffer("escapeExpression("+this.popStack()+")"));},getContext:function(depth){if(this.lastContext!==depth){this.lastContext=depth;}},lookupOnContext:function(name){this.push(this.nameLookup('depth'+this.lastContext,name,'context'));},pushContext:function(){this.pushStackLiteral('depth'+this.lastContext);},resolvePossibleLambda:function(){this.context.aliases.functionType='"function"';this.replaceStack(function(current){return"typeof "+current+" === functionType ? "+current+".apply(depth0) : "+current;});},lookup:function(name){this.replaceStack(function(current){return current+" == null || "+current+" === false ? "+current+" : "+this.nameLookup(current,name,'context');});},lookupData:function(id){this.push('data');},pushStringParam:function(string,type){this.pushStackLiteral('depth'+this.lastContext);this.pushString(type);if(typeof string==='string'){this.pushString(string);}else{this.pushStackLiteral(string);}},emptyHash:function(){this.pushStackLiteral('{}');if(this.options.stringParams){this.register('hashTypes','{}');this.register('hashContexts','{}');}},pushHash:function(){this.hash={values:[],types:[],contexts:[]};},popHash:function(){var hash=this.hash;this.hash=undefined;if(this.options.stringParams){this.register('hashContexts','{'+hash.contexts.join(',')+'}');this.register('hashTypes','{'+hash.types.join(',')+'}');}
this.push('{\n    '+hash.values.join(',\n    ')+'\n  }');},pushString:function(string){this.pushStackLiteral(this.quotedString(string));},push:function(expr){this.inlineStack.push(expr);return expr;},pushLiteral:function(value){this.pushStackLiteral(value);},pushProgram:function(guid){if(guid!=null){this.pushStackLiteral(this.programExpression(guid));}else{this.pushStackLiteral(null);}},invokeHelper:function(paramSize,name){this.context.aliases.helperMissing='helpers.helperMissing';var helper=this.lastHelper=this.setupHelper(paramSize,name,true);var nonHelper=this.nameLookup('depth'+this.lastContext,name,'context');this.push(helper.name+' || '+nonHelper);this.replaceStack(function(name){return name+' ? '+name+'.call('+
helper.callParams+") "+": helperMissing.call("+
helper.helperMissingParams+")";});},invokeKnownHelper:function(paramSize,name){var helper=this.setupHelper(paramSize,name);this.push(helper.name+".call("+helper.callParams+")");},invokeAmbiguous:function(name,helperCall){this.context.aliases.functionType='"function"';this.pushStackLiteral('{}');var helper=this.setupHelper(0,name,helperCall);var helperName=this.lastHelper=this.nameLookup('helpers',name,'helper');var nonHelper=this.nameLookup('depth'+this.lastContext,name,'context');var nextStack=this.nextStack();this.source.push('if ('+nextStack+' = '+helperName+') { '+nextStack+' = '+nextStack+'.call('+helper.callParams+'); }');this.source.push('else { '+nextStack+' = '+nonHelper+'; '+nextStack+' = typeof '+nextStack+' === functionType ? '+nextStack+'.apply(depth0) : '+nextStack+'; }');},invokePartial:function(name){var params=[this.nameLookup('partials',name,'partial'),"'"+name+"'",this.popStack(),"helpers","partials"];if(this.options.data){params.push("data");}
this.context.aliases.self="this";this.push("self.invokePartial("+params.join(", ")+")");},assignToHash:function(key){var value=this.popStack(),context,type;if(this.options.stringParams){type=this.popStack();context=this.popStack();}
var hash=this.hash;if(context){hash.contexts.push("'"+key+"': "+context);}
if(type){hash.types.push("'"+key+"': "+type);}
hash.values.push("'"+key+"': ("+value+")");},compiler:JavaScriptCompiler,compileChildren:function(environment,options){var children=environment.children,child,compiler;for(var i=0,l=children.length;i<l;i++){child=children[i];compiler=new this.compiler();var index=this.matchExistingProgram(child);if(index==null){this.context.programs.push('');index=this.context.programs.length;child.index=index;child.name='program'+index;this.context.programs[index]=compiler.compile(child,options,this.context);this.context.environments[index]=child;}else{child.index=index;child.name='program'+index;}}},matchExistingProgram:function(child){for(var i=0,len=this.context.environments.length;i<len;i++){var environment=this.context.environments[i];if(environment&&environment.equals(child)){return i;}}},programExpression:function(guid){this.context.aliases.self="this";if(guid==null){return"self.noop";}
var child=this.environment.children[guid],depths=child.depths.list,depth;var programParams=[child.index,child.name,"data"];for(var i=0,l=depths.length;i<l;i++){depth=depths[i];if(depth===1){programParams.push("depth0");}
else{programParams.push("depth"+(depth-1));}}
return(depths.length===0?"self.program(":"self.programWithDepth(")+programParams.join(", ")+")";},register:function(name,val){this.useRegister(name);this.source.push(name+" = "+val+";");},useRegister:function(name){if(!this.registers[name]){this.registers[name]=true;this.registers.list.push(name);}},pushStackLiteral:function(item){return this.push(new Literal(item));},pushStack:function(item){this.flushInline();var stack=this.incrStack();if(item){this.source.push(stack+" = "+item+";");}
this.compileStack.push(stack);return stack;},replaceStack:function(callback){var prefix='',inline=this.isInline(),stack;if(inline){var top=this.popStack(true);if(top instanceof Literal){stack=top.value;}else{var name=this.stackSlot?this.topStackName():this.incrStack();prefix='('+this.push(name)+' = '+top+'),';stack=this.topStack();}}else{stack=this.topStack();}
var item=callback.call(this,stack);if(inline){if(this.inlineStack.length||this.compileStack.length){this.popStack();}
this.push('('+prefix+item+')');}else{if(!/^stack/.test(stack)){stack=this.nextStack();}
this.source.push(stack+" = ("+prefix+item+");");}
return stack;},nextStack:function(){return this.pushStack();},incrStack:function(){this.stackSlot++;if(this.stackSlot>this.stackVars.length){this.stackVars.push("stack"+this.stackSlot);}
return this.topStackName();},topStackName:function(){return"stack"+this.stackSlot;},flushInline:function(){var inlineStack=this.inlineStack;if(inlineStack.length){this.inlineStack=[];for(var i=0,len=inlineStack.length;i<len;i++){var entry=inlineStack[i];if(entry instanceof Literal){this.compileStack.push(entry);}else{this.pushStack(entry);}}}},isInline:function(){return this.inlineStack.length;},popStack:function(wrapped){var inline=this.isInline(),item=(inline?this.inlineStack:this.compileStack).pop();if(!wrapped&&(item instanceof Literal)){return item.value;}else{if(!inline){this.stackSlot--;}
return item;}},topStack:function(wrapped){var stack=(this.isInline()?this.inlineStack:this.compileStack),item=stack[stack.length-1];if(!wrapped&&(item instanceof Literal)){return item.value;}else{return item;}},quotedString:function(str){return'"'+str.replace(/\\/g,'\\\\').replace(/"/g,'\\"').replace(/\n/g,'\\n').replace(/\r/g,'\\r').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029')+'"';},setupHelper:function(paramSize,name,missingParams){var params=[];this.setupParams(paramSize,params,missingParams);var foundHelper=this.nameLookup('helpers',name,'helper');return{params:params,name:foundHelper,callParams:["depth0"].concat(params).join(", "),helperMissingParams:missingParams&&["depth0",this.quotedString(name)].concat(params).join(", ")};},setupParams:function(paramSize,params,useRegister){var options=[],contexts=[],types=[],param,inverse,program;options.push("hash:"+this.popStack());inverse=this.popStack();program=this.popStack();if(program||inverse){if(!program){this.context.aliases.self="this";program="self.noop";}
if(!inverse){this.context.aliases.self="this";inverse="self.noop";}
options.push("inverse:"+inverse);options.push("fn:"+program);}
for(var i=0;i<paramSize;i++){param=this.popStack();params.push(param);if(this.options.stringParams){types.push(this.popStack());contexts.push(this.popStack());}}
if(this.options.stringParams){options.push("contexts:["+contexts.join(",")+"]");options.push("types:["+types.join(",")+"]");options.push("hashContexts:hashContexts");options.push("hashTypes:hashTypes");}
if(this.options.data){options.push("data:data");}
options="{"+options.join(",")+"}";if(useRegister){this.register('options',options);params.push('options');}else{params.push(options);}
return params.join(", ");}};var reservedWords=("break else new var"+" case finally return void"+" catch for switch while"+" continue function this with"+" default if throw"+" delete in try"+" do instanceof typeof"+" abstract enum int short"+" boolean export interface static"+" byte extends long super"+" char final native synchronized"+" class float package throws"+" const goto private transient"+" debugger implements protected volatile"+" double import public let yield").split(" ");var compilerWords=JavaScriptCompiler.RESERVED_WORDS={};for(var i=0,l=reservedWords.length;i<l;i++){compilerWords[reservedWords[i]]=true;}
JavaScriptCompiler.isValidJavaScriptVariableName=function(name){if(!JavaScriptCompiler.RESERVED_WORDS[name]&&/^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)){return true;}
return false;};Handlebars.precompile=function(input,options){if(input==null||(typeof input!=='string'&&input.constructor!==Handlebars.AST.ProgramNode)){throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.precompile. You passed "+input);}
options=options||{};if(!('data'in options)){options.data=true;}
var ast=Handlebars.parse(input);var environment=new Compiler().compile(ast,options);return new JavaScriptCompiler().compile(environment,options);};Handlebars.compile=function(input,options){if(input==null||(typeof input!=='string'&&input.constructor!==Handlebars.AST.ProgramNode)){throw new Handlebars.Exception("You must pass a string or Handlebars AST to Handlebars.compile. You passed "+input);}
options=options||{};if(!('data'in options)){options.data=true;}
var compiled;function compile(){var ast=Handlebars.parse(input);var environment=new Compiler().compile(ast,options);var templateSpec=new JavaScriptCompiler().compile(environment,options,undefined,true);return Handlebars.template(templateSpec);}
return function(context,options){if(!compiled){compiled=compile();}
return compiled.call(this,context,options);};};;Handlebars.VM={template:function(templateSpec){var container={escapeExpression:Handlebars.Utils.escapeExpression,invokePartial:Handlebars.VM.invokePartial,programs:[],program:function(i,fn,data){var programWrapper=this.programs[i];if(data){programWrapper=Handlebars.VM.program(i,fn,data);}else if(!programWrapper){programWrapper=this.programs[i]=Handlebars.VM.program(i,fn);}
return programWrapper;},merge:function(param,common){var ret=param||common;if(param&&common){ret={};Handlebars.Utils.extend(ret,common);Handlebars.Utils.extend(ret,param);}
return ret;},programWithDepth:Handlebars.VM.programWithDepth,noop:Handlebars.VM.noop,compilerInfo:null};return function(context,options){options=options||{};var result=templateSpec.call(container,Handlebars,context,options.helpers,options.partials,options.data);var compilerInfo=container.compilerInfo||[],compilerRevision=compilerInfo[0]||1,currentRevision=Handlebars.COMPILER_REVISION;if(compilerRevision!==currentRevision){if(compilerRevision<currentRevision){var runtimeVersions=Handlebars.REVISION_CHANGES[currentRevision],compilerVersions=Handlebars.REVISION_CHANGES[compilerRevision];throw"Template was precompiled with an older version of Handlebars than the current runtime. "+"Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").";}else{throw"Template was precompiled with a newer version of Handlebars than the current runtime. "+"Please update your runtime to a newer version ("+compilerInfo[1]+").";}}
return result;};},programWithDepth:function(i,fn,data){var args=Array.prototype.slice.call(arguments,3);var program=function(context,options){options=options||{};return fn.apply(this,[context,options.data||data].concat(args));};program.program=i;program.depth=args.length;return program;},program:function(i,fn,data){var program=function(context,options){options=options||{};return fn(context,options.data||data);};program.program=i;program.depth=0;return program;},noop:function(){return"";},invokePartial:function(partial,name,context,helpers,partials,data){var options={helpers:helpers,partials:partials,data:data};if(partial===undefined){throw new Handlebars.Exception("The partial "+name+" could not be found");}else if(partial instanceof Function){return partial(context,options);}else if(!Handlebars.compile){throw new Handlebars.Exception("The partial "+name+" could not be compiled when running in runtime-only mode");}else{partials[name]=Handlebars.compile(partial,{data:data!==undefined});return partials[name](context,options);}}};Handlebars.template=Handlebars.VM.template;;})(Handlebars);;(function(a){function b(a,b){return function(c){return i(a.call(this,c),b)}}function c(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function d(){}function e(a){u(a),g(this,a)}function f(a){var b=o(a),c=b.year||0,d=b.month||0,e=b.week||0,f=b.day||0,g=b.hour||0,h=b.minute||0,i=b.second||0,j=b.millisecond||0;this._milliseconds=+j+1e3*i+6e4*h+36e5*g,this._days=+f+7*e,this._months=+d+12*c,this._data={},this._bubble()}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function h(a){return 0>a?Math.ceil(a):Math.floor(a)}function i(a,b,c){for(var d=Math.abs(a)+"",e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function j(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&cb.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function k(a){return"[object Array]"===Object.prototype.toString.call(a)}function l(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function m(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&q(a[d])!==q(b[d]))&&g++;return g+f}function n(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Qb[a]||Rb[b]||b}return a}function o(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=n(c),b&&(d[b]=a[c]));return d}function p(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}cb[b]=function(e,f){var g,h,i=cb.fn._lang[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=cb().utc().set(d,a);return i.call(cb.fn._lang,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function q(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function r(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function s(a){return t(a)?366:365}function t(a){return a%4===0&&a%100!==0||a%400===0}function u(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[ib]<0||a._a[ib]>11?ib:a._a[jb]<1||a._a[jb]>r(a._a[hb],a._a[ib])?jb:a._a[kb]<0||a._a[kb]>23?kb:a._a[lb]<0||a._a[lb]>59?lb:a._a[mb]<0||a._a[mb]>59?mb:a._a[nb]<0||a._a[nb]>999?nb:-1,a._pf._overflowDayOfYear&&(hb>b||b>jb)&&(b=jb),a._pf.overflow=b)}function v(a){a._pf={empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function w(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function x(a){return a?a.toLowerCase().replace("_","-"):a}function y(a,b){return b._isUTC?cb(a).zone(b._offset||0):cb(a).local()}function z(a,b){return b.abbr=a,ob[a]||(ob[a]=new d),ob[a].set(b),ob[a]}function A(a){delete ob[a]}function B(a){var b,c,d,e,f=0,g=function(a){if(!ob[a]&&pb)try{require("./lang/"+a)}catch(b){}return ob[a]};if(!a)return cb.fn._lang;if(!k(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=x(a[f]).split("-"),b=e.length,d=x(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&m(e,d,!0)>=b-1)break;b--}f++}return cb.fn._lang}function C(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function D(a){var b,c,d=a.match(tb);for(b=0,c=d.length;c>b;b++)d[b]=Vb[d[b]]?Vb[d[b]]:C(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function E(a,b){return a.isValid()?(b=F(b,a.lang()),Sb[b]||(Sb[b]=D(b)),Sb[b](a)):a.lang().invalidDate()}function F(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(ub.lastIndex=0;d>=0&&ub.test(a);)a=a.replace(ub,c),ub.lastIndex=0,d-=1;return a}function G(a,b){var c,d=b._strict;switch(a){case"DDDD":return Gb;case"YYYY":case"GGGG":case"gggg":return d?Hb:xb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Ib:yb;case"S":if(d)return Eb;case"SS":if(d)return Fb;case"SSS":case"DDD":return d?Gb:wb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ab;case"a":case"A":return B(b._l)._meridiemParse;case"X":return Db;case"Z":case"ZZ":return Bb;case"T":return Cb;case"SSSS":return zb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Fb:vb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return d?Eb:vb;default:return c=new RegExp(O(N(a.replace("\\","")),"i"))}}function H(a){a=a||"";var b=a.match(Bb)||[],c=b[b.length-1]||[],d=(c+"").match(Nb)||["-",0,0],e=+(60*d[1])+q(d[2]);return"+"===d[0]?-e:e}function I(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[ib]=q(b)-1);break;case"MMM":case"MMMM":d=B(c._l).monthsParse(b),null!=d?e[ib]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[jb]=q(b));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=q(b));break;case"YY":e[hb]=q(b)+(q(b)>68?1900:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":e[hb]=q(b);break;case"a":case"A":c._isPm=B(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[kb]=q(b);break;case"m":case"mm":e[lb]=q(b);break;case"s":case"ss":e[mb]=q(b);break;case"S":case"SS":case"SSS":case"SSSS":e[nb]=q(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=H(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function J(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=L(a),a._w&&null==a._a[jb]&&null==a._a[ib]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?1900+c:2e3+c:c:null==a._a[hb]?cb().weekYear():a._a[hb]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=Y(f(g.GG),g.W||1,g.E,4,1):(i=B(a._l),j=null!=g.d?U(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=Y(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[hb]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[hb]?d[hb]:a._a[hb],a._dayOfYear>s(e)&&(a._pf._overflowDayOfYear=!0),c=T(e,0,a._dayOfYear),a._a[ib]=c.getUTCMonth(),a._a[jb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?1:0:a._a[b];l[kb]+=q((a._tzm||0)/60),l[lb]+=q((a._tzm||0)%60),a._d=(a._useUTC?T:S).apply(null,l)}}function K(a){var b;a._d||(b=o(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],J(a))}function L(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function M(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=B(a._l),h=""+a._i,i=h.length,j=0;for(d=F(a._f,g).match(tb)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(G(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),Vb[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),I(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[kb]<12&&(a._a[kb]+=12),a._isPm===!1&&12===a._a[kb]&&(a._a[kb]=0),J(a),u(a)}function N(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function O(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function P(a){var b,c,d,e,f;if(0===a._f.length)return a._pf.invalidFormat=!0,a._d=new Date(0/0),void 0;for(e=0;e<a._f.length;e++)f=0,b=g({},a),v(b),b._f=a._f[e],M(b),w(b)&&(f+=b._pf.charsLeftOver,f+=10*b._pf.unusedTokens.length,b._pf.score=f,(null==d||d>f)&&(d=f,c=b));g(a,c||b)}function Q(a){var b,c=a._i,d=Jb.exec(c);if(d){for(a._pf.iso=!0,b=4;b>0;b--)if(d[b]){a._f=Lb[b-1]+(d[6]||" ");break}for(b=0;4>b;b++)if(Mb[b][1].exec(c)){a._f+=Mb[b][0];break}c.match(Bb)&&(a._f+="Z"),M(a)}else a._d=new Date(c)}function R(b){var c=b._i,d=qb.exec(c);c===a?b._d=new Date:d?b._d=new Date(+d[1]):"string"==typeof c?Q(b):k(c)?(b._a=c.slice(0),J(b)):l(c)?b._d=new Date(+c):"object"==typeof c?K(b):b._d=new Date(c)}function S(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function T(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function U(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function V(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function W(a,b,c){var d=gb(Math.abs(a)/1e3),e=gb(d/60),f=gb(e/60),g=gb(f/24),h=gb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",gb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,V.apply({},i)}function X(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=cb(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function Y(a,b,c,d,e){var f,g,h=new Date(i(a,6,!0)+"-01-01").getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:s(a-1)+g}}function Z(a){var b=a._i,c=a._f;return"undefined"==typeof a._pf&&v(a),null===b?cb.invalid({nullInput:!0}):("string"==typeof b&&(a._i=b=B().preparse(b)),cb.isMoment(b)?(a=g({},b),a._d=new Date(+b._d)):c?k(c)?P(a):M(a):R(a),new e(a))}function $(a,b){cb.fn[a]=cb.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),cb.updateOffset(this),this):this._d["get"+c+b]()}}function _(a){cb.duration.fn[a]=function(){return this._data[a]}}function ab(a,b){cb.duration.fn["as"+a]=function(){return+this/b}}function bb(a){var b=!1,c=cb;"undefined"==typeof ender&&(a?(fb.moment=function(){return!b&&console&&console.warn&&(b=!0,console.warn("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.")),c.apply(null,arguments)},g(fb.moment,c)):fb.moment=cb)}for(var cb,db,eb="2.5.0",fb=this,gb=Math.round,hb=0,ib=1,jb=2,kb=3,lb=4,mb=5,nb=6,ob={},pb="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require,qb=/^\/?Date\((\-?\d+)/i,rb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,sb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,tb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,ub=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,vb=/\d\d?/,wb=/\d{1,3}/,xb=/\d{1,4}/,yb=/[+\-]?\d{1,6}/,zb=/\d+/,Ab=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Bb=/Z|[\+\-]\d\d:?\d\d/gi,Cb=/T/i,Db=/[\+\-]?\d+(\.\d{1,3})?/,Eb=/\d/,Fb=/\d\d/,Gb=/\d{3}/,Hb=/\d{4}/,Ib=/[+\-]?\d{6}/,Jb=/^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Kb="YYYY-MM-DDTHH:mm:ssZ",Lb=["YYYY-MM-DD","GGGG-[W]WW","GGGG-[W]WW-E","YYYY-DDD"],Mb=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Nb=/([\+\-]|\d\d)/gi,Ob="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Pb={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},Qb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Rb={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Sb={},Tb="DDD w W M D d".split(" "),Ub="M D H h m s w W".split(" "),Vb={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return i(this.year()%100,2)},YYYY:function(){return i(this.year(),4)},YYYYY:function(){return i(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+i(Math.abs(a),6)},gg:function(){return i(this.weekYear()%100,2)},gggg:function(){return this.weekYear()},ggggg:function(){return i(this.weekYear(),5)},GG:function(){return i(this.isoWeekYear()%100,2)},GGGG:function(){return this.isoWeekYear()},GGGGG:function(){return i(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return q(this.milliseconds()/100)},SS:function(){return i(q(this.milliseconds()/10),2)},SSS:function(){return i(this.milliseconds(),3)},SSSS:function(){return i(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(q(a/60),2)+":"+i(q(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+i(q(a/60),2)+i(q(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Wb=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];Tb.length;)db=Tb.pop(),Vb[db+"o"]=c(Vb[db],db);for(;Ub.length;)db=Ub.pop(),Vb[db+db]=b(Vb[db],2);for(Vb.DDDD=b(Vb.DDD,3),g(d.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=cb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=cb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return X(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),cb=function(b,c,d,e){return"boolean"==typeof d&&(e=d,d=a),Z({_i:b,_f:c,_l:d,_strict:e,_isUTC:!1})},cb.utc=function(b,c,d,e){var f;return"boolean"==typeof d&&(e=d,d=a),f=Z({_useUTC:!0,_isUTC:!0,_l:d,_i:b,_f:c,_strict:e}).utc()},cb.unix=function(a){return cb(1e3*a)},cb.duration=function(a,b){var c,d,e,g=a,h=null;return cb.isDuration(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=rb.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:q(h[jb])*c,h:q(h[kb])*c,m:q(h[lb])*c,s:q(h[mb])*c,ms:q(h[nb])*c}):(h=sb.exec(a))&&(c="-"===h[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},g={y:e(h[2]),M:e(h[3]),d:e(h[4]),h:e(h[5]),m:e(h[6]),s:e(h[7]),w:e(h[8])}),d=new f(g),cb.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},cb.version=eb,cb.defaultFormat=Kb,cb.updateOffset=function(){},cb.lang=function(a,b){var c;return a?(b?z(x(a),b):null===b?(A(a),a="en"):ob[a]||B(a),c=cb.duration.fn._lang=cb.fn._lang=B(a),c._abbr):cb.fn._lang._abbr},cb.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),B(a)},cb.isMoment=function(a){return a instanceof e},cb.isDuration=function(a){return a instanceof f},db=Wb.length-1;db>=0;--db)p(Wb[db]);for(cb.normalizeUnits=function(a){return n(a)},cb.invalid=function(a){var b=cb.utc(0/0);return null!=a?g(b._pf,a):b._pf.userInvalidated=!0,b},cb.parseZone=function(a){return cb(a).parseZone()},g(cb.fn=e.prototype,{clone:function(){return cb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=cb(this).utc();return 0<a.year()&&a.year()<=9999?E(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):E(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return w(this)},isDSTShifted:function(){return this._a?this.isValid()&&m(this._a,(this._isUTC?cb.utc(this._a):cb(this._a)).toArray())>0:!1},parsingFlags:function(){return g({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=E(this,a||cb.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?cb.duration(+b,a):cb.duration(a,b),j(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?cb.duration(+b,a):cb.duration(a,b),j(this,c,-1),this},diff:function(a,b,c){var d,e,f=y(a,this),g=6e4*(this.zone()-f.zone());return b=n(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-cb(this).startOf("month")-(f-cb(f).startOf("month")))/d,e-=6e4*(this.zone()-cb(this).startOf("month").zone()-(f.zone()-cb(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:h(e)},from:function(a,b){return cb.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(cb(),a)},calendar:function(){var a=y(cb(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return t(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=U(a,this.lang()),this.add({d:a-b})):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),cb.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=n(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=n(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+cb(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+cb(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+y(a,this).startOf(b)},min:function(a){return a=cb.apply(null,arguments),this>a?this:a},max:function(a){return a=cb.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=H(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&j(this,cb.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?cb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return r(this.year(),this.month())},dayOfYear:function(a){var b=gb((cb(this).startOf("day")-cb(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(a){var b=X(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=X(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=X(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=n(a),this[a]()},set:function(a,b){return a=n(a),"function"==typeof this[a]&&this[a](b),this},lang:function(b){return b===a?this._lang:(this._lang=B(b),this)}}),db=0;db<Ob.length;db++)$(Ob[db].toLowerCase().replace(/s$/,""),Ob[db]);$("year","FullYear"),cb.fn.days=cb.fn.day,cb.fn.months=cb.fn.month,cb.fn.weeks=cb.fn.week,cb.fn.isoWeeks=cb.fn.isoWeek,cb.fn.toJSON=cb.fn.toISOString,g(cb.duration.fn=f.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,i=this._data;i.milliseconds=e%1e3,a=h(e/1e3),i.seconds=a%60,b=h(a/60),i.minutes=b%60,c=h(b/60),i.hours=c%24,f+=h(c/24),i.days=f%30,g+=h(f/30),i.months=g%12,d=h(g/12),i.years=d},weeks:function(){return h(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*q(this._months/12)},humanize:function(a){var b=+this,c=W(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=cb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=cb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=n(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=n(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:cb.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(db in Pb)Pb.hasOwnProperty(db)&&(ab(db,Pb[db]),_(db.toLowerCase()));ab("Weeks",6048e5),cb.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},cb.lang("en",{ordinal:function(a){var b=a%10,c=1===q(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),pb?(module.exports=cb,bb(!0)):"function"==typeof define&&define.amd?define("moment",function(b,c,d){return d.config&&d.config()&&d.config().noGlobal!==!0&&bb(d.config().noGlobal===a),cb}):bb()}).call(this);function renderTemplate(templateId,context){var template=Handlebars.compile($(templateId).html());return template(context);}
function cleanTags(tags){if(typeof tags==='string'&&tags.length>0){tags=tags.split(/[\s,]+/);for(var i in tags){tags[i]=tags[i].trim();}}else{return[];}
return tags;}
function getImageData(imageId){var apiUrl='/app/api/v1/image/'+imageId+'/?format=json';return $.get(apiUrl);}
function getPinData(pinId){var apiUrl='/app/api/v1/pin/'+pinId+'/?format=json';return $.get(apiUrl);}
function deletePinData(pinId){var apiUrl='/app/api/v1/pin/'+pinId+'/?format=json';return $.ajax(apiUrl,{type:'DELETE'});}
function postPinData(data){console.log(" postPinData ");return $.ajax({type:"post",url:"/app/api/v1/pin/",contentType:'application/json',data:JSON.stringify(data),});}
function getUrlParameter(name){var decode=decodeURI((RegExp(name+'='+'(.+?)(&|$)').exec(location.search)||[,null])[1]);if(decode=='null')return null;else return decode;}
$(document).ready(function(){window.message=function(text,classes){classes=typeof classes!=='undefined'?classes:'alert';messageHtml=renderTemplate('#messages-template',{text:text,classes:classes});$('#messages').append(messageHtml);$('#messages li').each(function(){$(this).delay(3000).fadeOut(300);var messageDelayed=$(this);setTimeout(function(){messageDelayed.remove();},3300);});}
if(errors){for(var i in errors){message(errors[i].text,errors[i].tags);}}});$(window).load(function(){function freezeScroll(freeze){freeze=typeof freeze!=='undefined'?freeze:true;if(freeze){$('body').data('scroll-level',$(window).scrollTop());$(window).scrollTop(0);$(window).off('scroll');}else{$(window).scrollTop($('body').data('scroll-level'));var theEnd=document.getElementById('the-end');if(!theEnd){$(window).scroll(scrollHandler);}}}
function createBox(context){freezeScroll();$('body').append(renderTemplate('#lightbox-template',context));var box=$('.lightbox-background');var pinbox=$('#pins');box.css('height',$(document).height());$('.lightbox-image-wrapper').css('height',context.image.standard.height);box.fadeIn(200);$('.lightbox-image').load(function(){$(this).fadeIn(200);});$('.lightbox-wrapper').css({'width':context.image.standard.width,'margin-top':80,'margin-bottom':80,'margin-left':-context.image.standard.width/2});if($('.lightbox-wrapper').height()+140>$(window).height())
$('.lightbox-background').height($('.lightbox-wrapper').height()+140);$('body').keyup(function(e){if(e.which===27){box.fadeOut(200);setTimeout(function(){box.remove();},200);freezeScroll(false);$('#pins').css('opacity','1');$('#pins').css('pointer-events','auto');}});$('#lightbox-close').click(function(){box.fadeOut(200);setTimeout(function(){box.remove();},200);freezeScroll(false);$('#pins').css('opacity','1');$('#pins').css('pointer-events','auto');});$('#pins').click(function(){box.fadeOut(200);setTimeout(function(){box.remove();},200);freezeScroll(false);$('#pins').css('opacity','1');$('#pins').css('pointer-events','auto');});$('#lightbox-close1').click(function(){box.fadeOut(200);setTimeout(function(){box.remove();},200);freezeScroll(false);$('#pins').css('opacity','1');$('#tag-list').css('opacity','1');$('#footer-list').css('visibility','visible');$('#pins').css('pointer-events','auto');$('#tag-list').css('pointer-events','auto');});$('#pins').click(function(){box.fadeOut(200);setTimeout(function(){box.remove();},200);freezeScroll(false);$('#pins').css('opacity','1');$('#tag-list').css('opacity','1');$('#footer-list').css('visibility','visible');$('#pins').css('pointer-events','auto');$('#tag-list').css('pointer-events','auto');});}
window.lightbox=function(){var links=$('body').find('.lightbox');if(pinFilter){var promise=getPinData(pinFilter);promise.success(function(pin){createBox(pin);});promise.error(function(){message('Problem problem fetching pin data.','alert alert-error');});}
return links.each(function(){$(this).off('click');$(this).click(function(e){e.preventDefault();var promise=getPinData($(this).data('id'));promise.success(function(pin){createBox(pin);});promise.error(function(){message('Problem problem fetching pin data.','alert alert-error');});});});}
function createPopupBox(context){var popup="";popup+='<div class="feed-inner">'+'<div style="width: '+context.image.standard.image+'px; margin: 0 auto; text-align: center;">'+'<img class="lightbox-image" src="'+context.image.standard.image+'"/>'+'</div>'+'</div>'+'<div class="feed-item-bottom">'+'<div class="description">'+''+context.description+''+'</div>'+'</div>';for(var i=0;i<context.comments.length;i++){var submit_date=moment(context.comments[i].submit_date).fromNow();popup+='<div class="row-fluid">'+'<div style="margin-left:10px;">'+'  <b>'+context.comments[0].user_name+'</b>  <font style="color: rgb(153, 153, 153); font-size: 13px;">'+submit_date+'</font>'+'</div>'+'<div style="margin-left:10px;">'+context.comments[0].comment+'</div>'+'<hr>'+'</div>';}
popup+='<div class="row-fluid">'+'<form action="/pin_cmt_post/" method="post" name="pin_cmt">'+'<table width="98%">'+'<tr>'+'<td><textarea width="10%" name="pin-comment" id="pinCommentId" class="form-control" placeholder="Add a comment..."></textarea>'+'<input type="hidden" name="pin-id" id="pinId" value="'+context.id+'">'+'</td>'+'</tr>'+'<tr>'+'<td align="center">'+'<input type="submit" class="btn btn-primary btn-red" id="pin-form-submit" value="Comment"> &nbsp;'+'<input type="button" class="btn btn-primary btn-gray" data-dismiss="modal" value="Cancel"/>'+'</td>'+'</tr>'+'<table>'+'</form>'+'</div>';document.getElementById("light-box-popup").innerHTML=popup;}});$(window).load(function(){window.tileLayout=function(){var blockContainer=$('#pins'),blocks=blockContainer.children('.pin'),blockMargin=15,blockWidth=240,rowSize=Math.floor(blockContainer.width()/(blockWidth+blockMargin)),colHeights=[],rowMargins=[],marginLeft=0;for(var i=0;i<rowSize;i++)colHeights[i]=0;for(var i=0;i<rowSize;i++){if(i==0)rowMargins[0]=(blockContainer.width()-rowSize*(blockWidth+blockMargin))/2;else rowMargins[i]=rowMargins[i-1]+(blockWidth+blockMargin);}
for(var b=0;b<blocks.length;b++){block=blocks.eq(b);var sCol=0;for(var i=0;i<rowSize;i++){if(colHeights[sCol]>colHeights[i])sCol=i;}
block.css({'margin-left':rowMargins[sCol],'margin-top':2,});block.fadeIn(300);colHeights[sCol]+=275+(blockMargin);}
$('.pencil').each(function(){var thisPin=$(this);$(this).click(function(){pinForm($(this).data('id'));});});$('.glyphicon-share').each(function(){var thisPin=$(this);$(this).off('click');$(this).click(function(){$(this).off('click');pinForm($(this).data('id'));});});$('.trash').each(function(){var thisPin=$(this);$(this).off('click');$(this).click(function(){$(this).off('click');var promise=deletePinData($(this).data('id'));promise.success(function(){thisPin.closest('.pin').remove();tileLayout();});promise.error(function(){message('Problem deleting image.','alert alert-error');});});});$('.pin').each(function(){var thisPin=$(this);thisPin.find('.editable').hide();thisPin.off('hover');thisPin.hover(function(){thisPin.find('.editable').stop(true,true).fadeIn(300);},function(){thisPin.find('.editable').stop(true,false).fadeOut(300);});});pinPagination(pinTotalPageLength);}
window.scrollHandler=function(){}
document.getElementById("next-page-pin").onclick=function(){$pin_table_rows=$('.pins-load div.pin');if(checkSavedList==1)tileLayout();if(pinTotalPageLength>=offset)loadPins();checkSavedList=0;}
document.getElementById("last-page-pin").onclick=function(){$pin_table_rows=$('.pins-load div.pin');if(checkSavedList==1)tileLayout();if(pinTotalPageLength>=offset)loadPins();checkSavedList=0;}
document.getElementById("next-page-pin-list").onclick=function(){$pin_saved_list_rows=$('#savedList div.saved-list');if(savedListTotalPageLength>=offset)loadSavedList();checkSavedList=1;}
document.getElementById("last-page-pin-list").onclick=function(){$pin_saved_list_rows=$('#savedList div.saved-list');if(savedListTotalPageLength>=offset)loadSavedList();checkSavedList=1;}
function loadPins(){$(window).off('scroll');var apiUrl='/app/api/v1/pin/?format=json&order_by=-id&offset='+String(offset);if(tagFilter)apiUrl=apiUrl+'&tag='+tagFilter;if(currentUser.username)apiUrl=apiUrl+'&submitter__username='+currentUser.username;$.get(apiUrl,function(pins){pinTotalPageLength=pins.meta.total_count;for(var i=0;i<pins.objects.length;i++){var publishedDate=pins.objects[i].published;pins.objects[i].editable=(pins.objects[i].submitter.username==currentUser.username);pins.objects[i].published=moment(publishedDate,"YYYY/MM/DD").format('MMM DD, YYYY')}
var template=Handlebars.compile($('#pins-template').html());var html=template({pins:pins.objects});$('#pins').append(html);if(checkSavedList==0){tileLayout();lightbox();}
$('#pins').ajaxStop(function(){$('img').load(function(){$(this).fadeIn(300);});});if(pins.objects.length<apiLimitPerPage){}else{$(window).scroll(scrollHandler);}
pinPagination(pinTotalPageLength);});offset+=apiLimitPerPage;}
function loadSavedList(){var apiUrl='/app/api/v1/savedlist/?format=json&order_by=-id&offset='+String(offsetSavedList);if(currentUser.username)apiUrl=apiUrl+'&user_id='+currentUser.id;$.get(apiUrl,function(savedList){savedListTotalPageLength=savedList.meta.total_count;var savedListContent="";for(var i=0;i<savedList.objects.length;i++){savedListContent+='<div class="saved-list"><a target="_blank" href="/app/saved_list_view/'+savedList.objects[i].id+'">'+savedList.objects[i].list_name;if(savedList.objects[i].list_desc){savedListContent+=' - '+savedList.objects[i].list_desc;}
savedListContent+='</a></div>';}
$('#savedList').append(savedListContent);pinListPagination(savedListTotalPageLength);});offsetSavedList+=apiLimitPerPage;}
var pinTotalPageLength=0;var offset=0;var savedListTotalPageLength=0;var offsetSavedList=0;loadPins();loadSavedList();});var checkSavedList=0;function pinPagination(pinTotalPageLength){$pin_table_rows=$('.pins-load div.pin');var pin_row_limit=4;var pinTotalPage=Math.ceil(pinTotalPageLength/pin_row_limit);if(pinTotalPage==0){pinTotalPage=1;}
$('#pg1').jqPagination('option','max_page',pinTotalPage);}
function pinPaginationGoTo(){var current_page=document.getElementById('pg-pin-goto').value;$pin_table_rows=$('.pins-load div.pin');var pin_row_limit=4;var pinTotalPage=Math.ceil($pin_table_rows.length/pin_row_limit);if(pinTotalPage==0){pinTotalPage=1;}
$('#pg1').jqPagination('option','max_page',pinTotalPage);if(pinTotalPage>=current_page){$('#pg1').jqPagination('option','max_page',pinTotalPage);$('#pg1').jqPagination('option','current_page',current_page);}else{$('#pg1').jqPagination('option','max_page',pinTotalPage);$('#pg1').jqPagination('option','current_page',pinTotalPage);}}
function pinListPagination(pinTotalPageLength){$pin_saved_list_rows=$('#savedList div.saved-list');var pin_saved_list_row_limit=10;var pinSavedListTotalPage=Math.ceil(pinTotalPageLength/pin_saved_list_row_limit);if(pinSavedListTotalPage==0){pinSavedListTotalPage=1;}
$('#pg2').jqPagination('option','max_page',pinSavedListTotalPage);}
function pinListPaginationGoTo(){var current_page=document.getElementById('pg-pin-saved-list-goto').value;$pin_saved_list_table_rows=$('#savedList div.saved-list');var pin_saved_list_row_limit=10;var pinSavedListTotalPage=Math.ceil($pin_saved_list_table_rows.length/pin_saved_list_row_limit);if(pinSavedListTotalPage==0){pinSavedListTotalPage=1;}
$('#pg2').jqPagination('option','max_page',pinSavedListTotalPage);if(pinSavedListTotalPage>=current_page){$('#pg2').jqPagination('option','max_page',pinSavedListTotalPage);$('#pg2').jqPagination('option','current_page',current_page);}else{$('#pg2').jqPagination('option','max_page',pinSavedListTotalPage);$('#pg2').jqPagination('option','current_page',pinSavedListTotalPage);}}
$(document).ready(function(){$pin_table_rows=$('.pins-load div.pin');var pin_row_limit=4;var pinTotalPage=Math.ceil($pin_table_rows.length/pin_row_limit);var pin_page_table=function(page){var offset=(page-1)*pin_row_limit,limit=page*pin_row_limit;$pin_table_rows.hide();$pin_table_rows.slice(offset,limit).show();}
if(pinTotalPage==0){pinTotalPage=1;}
$('.pagination').jqPagination({link_string:'/?page={page_number}',max_page:pinTotalPage,paged:pin_page_table});$pin_saved_list_rows=$('#savedList div.saved-list');var pin_saved_list_row_limit=10;var pinSavedListTotalPage=Math.ceil($pin_saved_list_rows.length/pin_saved_list_row_limit);var pin_saved_list_page_table=function(page){var offset=(page-1)*pin_saved_list_row_limit,limit=page*pin_saved_list_row_limit;$pin_saved_list_rows.hide();$pin_saved_list_rows.slice(offset,limit).show();}
if(pinSavedListTotalPage==0){pinSavedListTotalPage=1;}
$('.pagination-pinsavedlist').jqPagination({link_string:'/?page={page_number}',max_page:pinSavedListTotalPage,paged:pin_saved_list_page_table});});$(window).load(function(){var uploadedImage=false;var editedPin=null;function getFormData(){return{submitter:currentUser,url:$('#pin-form-image-url').val(),description:$('#pin-form-description').val(),tags:cleanTags($('#pin-form-tags').val())}}
function createPinPreviewFromForm(){var context={pins:[{submitter:currentUser,image:{thumbnail:{image:$('#pin-form-image-url').val()}},description:$('#pin-form-description').val(),tags:cleanTags($('#pin-form-tags').val())}]},html=renderTemplate('#pins-template',context),preview=$('#pin-form-image-preview');preview.html(html);preview.find('.pin').width(240);preview.find('.pin').fadeIn(300);if(getFormData().url=="")
preview.find('.image-wrapper').height(255);preview.find('.image-wrapper img').fadeIn(300);setTimeout(function(){if(preview.find('.pin').height()>250){$('#pin-form .pinry-modal-body').animate({'height':preview.find('.pin').height()+25},300);}},300);}
function dismissModal(modal){modal.modal('hide');setTimeout(function(){modal.remove();},200);}
function createPinForm(editPinId){$('body').append(renderTemplate('#pin-form-template',''));var modal=$('#pin-form'),formFields=[$('#pin-form-image-url'),$('#pin-form-description'),$('#pin-form-tags')],pinFromUrl=getUrlParameter('pin-image-url');if(editPinId){var promise=getPinData(editPinId);promise.success(function(data){editedPin=data;$('#pin-form-image-url').val(editedPin.image.thumbnail.image);$('#pin-form-image-url').parent().hide();$('#pin-form-image-upload').parent().hide();$('#pin-form-description').val(editedPin.description);$('#pin-form-tags').val(editedPin.tags);createPinPreviewFromForm();});}
modal.modal('show');var timer;for(var i in formFields){formFields[i].bind('propertychange keyup input paste',function(){clearTimeout(timer);timer=setTimeout(function(){createPinPreviewFromForm()},700);if(!uploadedImage)
$('#pin-form-image-upload').parent().fadeOut(300);});}
$('#pin-form-image-upload').fineUploader({request:{endpoint:'/app/pins/create-image/',paramsInBody:true,multiple:false,validation:{allowedExtensions:['jpeg','jpg','png','gif']},text:{uploadButton:'Click or Drop'}}}).on('complete',function(e,id,name,data){$('#pin-form-image-url').parent().fadeOut(300);$('.qq-upload-button').css('display','none');var promise=getImageData(data.success.id);uploadedImage=data.success.id;promise.success(function(image){$('#pin-form-image-url').val(image.thumbnail.image);createPinPreviewFromForm();});promise.error(function(){message('Problem uploading image.','alert alert-error');});});if(pinFromUrl){$('#pin-form-image-upload').parent().css('display','none');$('#pin-form-image-url').val(pinFromUrl);$('.navbar').css('display','none');modal.css({'margin-top':-35,'margin-left':-281});}
$('#pin-form-submit').click(function(e){e.preventDefault();$(this).off('click');$(this).addClass('disabled');if(editedPin){var apiUrl='/app/api/v1/pin/'+editedPin.id+'/?format=json';console.log(apiUrl);var data={description:$('#pin-form-description').val(),tags:cleanTags($('#pin-form-tags').val())}
var promise=$.ajax({type:"put",url:apiUrl,contentType:'application/json',data:JSON.stringify(data)});promise.success(function(pin){pin.editable=true;var renderedPin=renderTemplate('#pins-template',{pins:[pin]});$('#pins').find('.pin[data-id="'+pin.id+'"]').replaceWith(renderedPin);tileLayout();lightbox();dismissModal(modal);editedPin=null;});promise.error(function(){message('Problem updating image.','alert alert-error');});}else{var data={submitter:'/app/api/v1/user/'+currentUser.id+'/',description:$('#pin-form-description').val(),tags:cleanTags($('#pin-form-tags').val())};if(uploadedImage)data.image='/app/api/v1/image/'+uploadedImage+'/';else data.url=$('#pin-form-image-url').val();var promise=postPinData(data);promise.success(function(pin){if(pinFromUrl)return window.close();pin.editable=true;pin=renderTemplate('#pins-template',{pins:[pin]});$('#pins').prepend(pin);tileLayout();lightbox();dismissModal(modal);uploadedImage=false;});promise.error(function(error){console.log(error);message('This is Invalied URL.','alert alert-error');});}});$('#pin-form-close').click(function(){if(pinFromUrl)return window.close();dismissModal(modal);});createPinPreviewFromForm();}
window.pinForm=function(editPinId){editPinId=typeof editPinId!=='undefined'?editPinId:null;createPinForm(editPinId);}
if(getUrlParameter('pin-image-url')){createPinForm();}});(function($){$.cookie=function(key,value,options){if(arguments.length>1&&(!/Object/.test(Object.prototype.toString.call(value))||value===null||value===undefined)){options=$.extend({},options);if(value===null||value===undefined){options.expires=-1;}
if(typeof options.expires==='number'){var days=options.expires,t=options.expires=new Date();t.setDate(t.getDate()+days);}
value=String(value);return(document.cookie=[encodeURIComponent(key),'=',options.raw?value:encodeURIComponent(value),options.expires?'; expires='+options.expires.toUTCString():'',options.path?'; path='+options.path:'',options.domain?'; domain='+options.domain:'',options.secure?'; secure':''].join(''));}
options=value||{};var decode=options.raw?function(s){return s;}:decodeURIComponent;var pairs=document.cookie.split('; ');for(var i=0,pair;pair=pairs[i]&&pairs[i].split('=');i++){if(decode(pair[0])===key)return decode(pair[1]||'');}
return null;};})(jQuery);