/**/

define("ace/ext/searchbox",["require","exports","module","ace/lib/dom","ace/lib/lang","ace/lib/event","ace/keyboard/hash_handler","ace/lib/keys"],function(e,t,n){"use strict";var r=e("../lib/dom"),i=e("../lib/lang"),s=e("../lib/event"),o=".ace_search {background-color: #ddd;border: 1px solid #cbcbcb;border-top: 0 none;max-width: 325px;overflow: hidden;margin: 0;padding: 4px;padding-right: 6px;padding-bottom: 0;position: absolute;top: 0px;z-index: 99;white-space: normal;}.ace_search.left {border-left: 0 none;border-radius: 0px 0px 5px 0px;left: 0;}.ace_search.right {border-radius: 0px 0px 0px 5px;border-right: 0 none;right: 0;}.ace_search_form, .ace_replace_form {border-radius: 3px;border: 1px solid #cbcbcb;float: left;margin-bottom: 4px;overflow: hidden;}.ace_search_form.ace_nomatch {outline: 1px solid red;}.ace_search_field {background-color: white;border-right: 1px solid #cbcbcb;border: 0 none;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;float: left;height: 22px;outline: 0;padding: 0 7px;width: 214px;margin: 0;}.ace_searchbtn,.ace_replacebtn {background: #fff;border: 0 none;border-left: 1px solid #dcdcdc;cursor: pointer;float: left;height: 22px;margin: 0;padding: 0;position: relative;}.ace_searchbtn:last-child,.ace_replacebtn:last-child {border-top-right-radius: 3px;border-bottom-right-radius: 3px;}.ace_searchbtn:disabled {background: none;cursor: default;}.ace_searchbtn {background-position: 50% 50%;background-repeat: no-repeat;width: 27px;}.ace_searchbtn.prev {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADFJREFUeNpiSU1NZUAC/6E0I0yACYskCpsJiySKIiY0SUZk40FyTEgCjGgKwTRAgAEAQJUIPCE+qfkAAAAASUVORK5CYII=);    }.ace_searchbtn.next {background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAADRJREFUeNpiTE1NZQCC/0DMyIAKwGJMUAYDEo3M/s+EpvM/mkKwCQxYjIeLMaELoLMBAgwAU7UJObTKsvAAAAAASUVORK5CYII=);    }.ace_searchbtn_close {background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;border-radius: 50%;border: 0 none;color: #656565;cursor: pointer;float: right;font: 16px/16px Arial;height: 14px;margin: 5px 1px 9px 5px;padding: 0;text-align: center;width: 14px;}.ace_searchbtn_close:hover {background-color: #656565;background-position: 50% 100%;color: white;}.ace_replacebtn.prev {width: 54px}.ace_replacebtn.next {width: 27px}.ace_button {margin-left: 2px;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;user-select: none;overflow: hidden;opacity: 0.7;border: 1px solid rgba(100,100,100,0.23);padding: 1px;-moz-box-sizing: border-box;box-sizing:    border-box;color: black;}.ace_button:hover {background-color: #eee;opacity:1;}.ace_button:active {background-color: #ddd;}.ace_button.checked {border-color: #3399ff;opacity:1;}.ace_search_options{margin-bottom: 3px;text-align: right;-webkit-user-select: none;-moz-user-select: none;-o-user-select: none;-ms-user-select: none;user-select: none;}",u=e("../keyboard/hash_handler").HashHandler,a=e("../lib/keys");r.importCssString(o,"ace_searchbox");var f='<div class="ace_search right">    <button type="button" action="hide" class="ace_searchbtn_close"></button>    <div class="ace_search_form">        <input class="ace_search_field" placeholder="关键字" spellcheck="false"></input>        <button type="button" action="findNext" class="ace_searchbtn next"></button>        <button type="button" action="findPrev" class="ace_searchbtn prev"></button>        <button type="button" action="findAll" class="ace_searchbtn" title="Alt-Enter">All</button>    </div>    <div class="ace_replace_form">        <input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>        <button type="button" action="replaceAndFindNext" class="ace_replacebtn">Replace</button>        <button type="button" action="replaceAll" class="ace_replacebtn">All</button>    </div>    <div class="ace_search_options">        <span action="toggleRegexpMode" class="ace_button" title="正则匹配">.*</span>        <span action="toggleCaseSensitive" class="ace_button" title="区分大小写">Aa</span>        <span action="toggleWholeWords" class="ace_button" title="整词查找">\\b</span>    </div></div>'.replace(/>\s+/g,">"),l=function(e,t,n){var i=r.createElement("div");i.innerHTML=f,this.element=i.firstChild,this.$init(),this.setEditor(e)};(function(){this.setEditor=function(e){e.searchBox=this,e.container.appendChild(this.element),this.editor=e},this.$initElements=function(e){this.searchBox=e.querySelector(".ace_search_form"),this.replaceBox=e.querySelector(".ace_replace_form"),this.searchOptions=e.querySelector(".ace_search_options"),this.regExpOption=e.querySelector("[action=toggleRegexpMode]"),this.caseSensitiveOption=e.querySelector("[action=toggleCaseSensitive]"),this.wholeWordOption=e.querySelector("[action=toggleWholeWords]"),this.searchInput=this.searchBox.querySelector(".ace_search_field"),this.replaceInput=this.replaceBox.querySelector(".ace_search_field")},this.$init=function(){var e=this.element;this.$initElements(e);var t=this;s.addListener(e,"mousedown",function(e){setTimeout(function(){t.activeInput.focus()},0),s.stopPropagation(e)}),s.addListener(e,"click",function(e){var n=e.target||e.srcElement,r=n.getAttribute("action");r&&t[r]?t[r]():t.$searchBarKb.commands[r]&&t.$searchBarKb.commands[r].exec(t),s.stopPropagation(e)}),s.addCommandKeyListener(e,function(e,n,r){var i=a.keyCodeToString(r),o=t.$searchBarKb.findKeyCommand(n,i);o&&o.exec&&(o.exec(t),s.stopEvent(e))}),this.$onChange=i.delayedCall(function(){t.find(!1,!1)}),s.addListener(this.searchInput,"input",function(){t.$onChange.schedule(20)}),s.addListener(this.searchInput,"focus",function(){t.activeInput=t.searchInput,t.searchInput.value&&t.highlight()}),s.addListener(this.replaceInput,"focus",function(){t.activeInput=t.replaceInput,t.searchInput.value&&t.highlight()})},this.$closeSearchBarKb=new u([{bindKey:"Esc",name:"closeSearchBar",exec:function(e){e.searchBox.hide()}}]),this.$searchBarKb=new u,this.$searchBarKb.bindKeys({"Ctrl-f|Command-f|Ctrl-H|Command-Option-F":function(e){var t=e.isReplace=!e.isReplace;e.replaceBox.style.display=t?"":"none",e[t?"replaceInput":"searchInput"].focus()},"Ctrl-G|Command-G":function(e){e.findNext()},"Ctrl-Shift-G|Command-Shift-G":function(e){e.findPrev()},esc:function(e){setTimeout(function(){e.hide()})},Return:function(e){e.activeInput==e.replaceInput&&e.replace(),e.findNext()},"Shift-Return":function(e){e.activeInput==e.replaceInput&&e.replace(),e.findPrev()},"Alt-Return":function(e){e.activeInput==e.replaceInput&&e.replaceAll(),e.findAll()},Tab:function(e){(e.activeInput==e.replaceInput?e.searchInput:e.replaceInput).focus()}}),this.$searchBarKb.addCommands([{name:"toggleRegexpMode",bindKey:{win:"Alt-R|Alt-/",mac:"Ctrl-Alt-R|Ctrl-Alt-/"},exec:function(e){e.regExpOption.checked=!e.regExpOption.checked,e.$syncOptions()}},{name:"toggleCaseSensitive",bindKey:{win:"Alt-C|Alt-I",mac:"Ctrl-Alt-R|Ctrl-Alt-I"},exec:function(e){e.caseSensitiveOption.checked=!e.caseSensitiveOption.checked,e.$syncOptions()}},{name:"toggleWholeWords",bindKey:{win:"Alt-B|Alt-W",mac:"Ctrl-Alt-B|Ctrl-Alt-W"},exec:function(e){e.wholeWordOption.checked=!e.wholeWordOption.checked,e.$syncOptions()}}]),this.$syncOptions=function(){r.setCssClass(this.regExpOption,"checked",this.regExpOption.checked),r.setCssClass(this.wholeWordOption,"checked",this.wholeWordOption.checked),r.setCssClass(this.caseSensitiveOption,"checked",this.caseSensitiveOption.checked),this.find(!1,!1)},this.highlight=function(e){this.editor.session.highlight(e||this.editor.$search.$options.re),this.editor.renderer.updateBackMarkers()},this.find=function(e,t){var n=this.editor.find(this.searchInput.value,{skipCurrent:e,backwards:t,wrap:!0,regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked}),i=!n&&this.searchInput.value;r.setCssClass(this.searchBox,"ace_nomatch",i),this.editor._emit("findSearchBox",{match:!i}),this.highlight()},this.findNext=function(){this.find(!0,!1)},this.findPrev=function(){this.find(!0,!0)},this.findAll=function(){var e=this.editor.findAll(this.searchInput.value,{regExp:this.regExpOption.checked,caseSensitive:this.caseSensitiveOption.checked,wholeWord:this.wholeWordOption.checked}),t=!e&&this.searchInput.value;r.setCssClass(this.searchBox,"ace_nomatch",t),this.editor._emit("findSearchBox",{match:!t}),this.highlight(),this.hide()},this.replace=function(){this.editor.getReadOnly()||this.editor.replace(this.replaceInput.value)},this.replaceAndFindNext=function(){this.editor.getReadOnly()||(this.editor.replace(this.replaceInput.value),this.findNext())},this.replaceAll=function(){this.editor.getReadOnly()||this.editor.replaceAll(this.replaceInput.value)},this.hide=function(){this.element.style.display="none",this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb),this.editor.focus()},this.show=function(e,t){this.element.style.display="",this.replaceBox.style.display=t?"":"none",this.isReplace=t,e&&(this.searchInput.value=e),this.searchInput.focus(),this.searchInput.select(),this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb)},this.isFocused=function(){var e=document.activeElement;return e==this.searchInput||e==this.replaceInput}}).call(l.prototype),t.SearchBox=l,t.Search=function(e,t){var n=e.searchBox||new l(e);n.show(e.session.getTextRange(),t)}});
                (function() {
                    window.require(["ace/ext/searchbox"], function() {});
                })();
            

updateCodeSize();updateTabbleSize();var accessControl=$("#accessControl").val();$(window).resize(function(){updateCodeSize();updateTabbleSize()});$("body").keydown(function(b){var a=window.event||b;if(a.ctrlKey==true&&a.altKey==true&&a.keyCode==66){if(a.preventDefault){a.preventDefault()}else{a.keyCode=0;a.returnValue=false}build(1)}if(a.ctrlKey==true&&a.altKey==true&&a.keyCode==85){alert(backtestId)}if(a.ctrlKey==true&&a.keyCode==83){if(a.preventDefault){a.preventDefault()}else{a.keyCode=0;a.returnValue=false}save()}});$(window).bind("beforeunload",function(){if(building==1){return"有正在运行的回测，确定离开此页面吗？"}});$(window).bind("unload",function(){if(building==1){cancel()}});function updateCodeSize(){var a=$("header").eq(0);if(a.hasClass("hidden")){var e=0}else{var e=a.height()+$("#subnav").height()}var b=$("body").eq(0).height();var d=b-e-8;$("#ide-box").height(d);var c=$("#toolbar").height();$("#code-area").height(d);$("#code-area-internal").height(d-c)}function updateTabbleSize(){var e=$("#output-pane").height();var b=$("#dailybars-nav").height();if($(".dailybars-output .tabbable").hasClass("tall")){var c=0}else{var c=$("#dailybars-results").height()+10}var a=e-b-c-12;$("#tabbable").height(a);var d=$("#nav-tabs").height();$("#tab-content").height(a-d)}function compileSource(sourceCode){var algId=$("#algorithmId").val();var res=jsObj.compile(sourceCode);var obj=eval("("+res+")");if(obj.code!="00000"){BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"编译失败"});$("#error-log").find("pre").eq(0).html(obj.msg);$("#daily-error-tab-link").click();$(".build-loading").addClass("hidden");$("#buildBtn").removeClass("hidden");toggleNavbar(1);building=0;return false}var filePath=obj.data;var res=jsObj.UploadBinFile(algId,filePath);var obj=eval("("+res+")");if(typeof obj.data.uri=="undefined"){BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"上传文件到服务器失败:"+obj.msg});return false}else{$("#code").val("#binary:"+obj.data.uri)}}function build(a){$("#type").val(a);if(accessControl==1){if(!g_isWinApp||typeof jsObj=="undefined"){$(".build-loading").addClass("hidden");$("#buildBtn").removeClass("hidden");BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"无法编译，请从客户端打开"});building=0;return}var b=editor.getValue();var c=compileSource(b);if(c==false){return}var d=function(e){jsObj.SaveBacktestCode(e,b)}}else{var d=function(e){};$("#code").val(editor.getValue())}Cy.ajaxForm($("form").eq(0),"/algorithm/index/build",false,function(f){$("#algorithmId").val(f.data.algorithmId);$(".build-loading").addClass("hidden");$("#buildBtn").removeClass("hidden");$("#log").find("pre").eq(0).html("");$("#error-log").find("pre").eq(0).html("");$("#daily-error-tab-link").find("i").addClass("hidden");$("#logs-init").removeClass("hidden");$("#daily-logs-link").click();backtestId=f.data.backtestId;var g=$("#startTime").val();var e=$("#endTime").val();g_tradeDays=f.data.tradeDays;initChart(g,e);run();d(f.data.backtestId_);return false},null,null,function(e){$(".build-loading").addClass("hidden");$("#buildBtn").removeClass("hidden");BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"编译失败:"+e.msg});building=0;return});return false}var toggleNavbarFlag=0;function toggleNavbar(a){if(a){toggleNavbarFlag=a}if(toggleNavbarFlag==0){$("#dailybars-progressbar").width("0%");$("#validate-button").attr("disabled","disabled");$("#setting-btn-group").addClass("hidden");$("#dailybars-status").removeClass("hidden");toggleNavbarFlag=1}else{$("#dailybars-progressbar").width("100%");$("#validate-button").removeAttr("disabled");$("#setting-btn-group").removeClass("hidden");$("#dailybars-status").addClass("hidden");$("#daily-new-backtest-button").css({display:"block"});toggleNavbarFlag=0}}$("#cancel-daily-backtest-button").click(function(){BootstrapDialog.confirm({title:"提示",btnCancelLabel:"取消",btnOKLabel:"确认",message:"确实要取消?",callback:function(a){if(a){cancel()}else{}}})});function cancel(){Cy.ajax("/algorithm/index/cancel",{data:"backtestId="+backtestId,async:false,success:function(a){stopCycle=true;toggleNavbar(1);$("#logs-init").addClass("hidden");building=0;return false},fail:function(a){BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"无法取消:"+a.msg})}})}function run(){clearStats();toggleNavbar();var b=$("#startTime").val();var a=$("#endTime").val();initChart(b,a);stopCycle=false;stopResult=false;stopLog=false;stopErrorLog=false;cycleCount=0;cycleCheck()}var building=0;$("#validate-button").click(function(){if(building==1){return}building=1;$(".build-loading").removeClass("hidden");$("#buildBtn").addClass("hidden");$("#daily-new-backtest-button").css({display:"none"});build(1)});function getDefaultSource(a){var b="";Cy.ajax("/algorithm/index/defaultSource",{data:"type="+a,async:false,success:function(c){b=c.data.code;return false},fail:function(c){}});return b}var langTools=ace.require("ace/ext/language_tools");ace.require("ace/mode/pyhon");ace.require("ace/theme/twilight");var readOnly=true;if(accessControl==1){if(g_isWinApp&&typeof jsObj!="undefined"){var isNew=Cy.getUrlParam("isNew");var type=Cy.getUrlParam("type");if(isNew==1&&type){var source=getDefaultSource(type);readOnly=false}else{var algId=$("#algorithmId").attr("algorithmId_");var res=jsObj.ReadAlgCode(algId);var obj=eval("("+res+")");if(obj.code!="00000"){BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"#无法查看源码"+obj.msg});var source=""}else{var source=obj.data;readOnly=false}}}else{var source="#无法查看源码，请从客户端打开"}$("#ide-container").html(source)}else{$("#ide-container").html($("#code").html());readOnly=false}var editor=ace.edit("ide-container");$("#ide-container").removeClass("hidden");editor.session.setMode("ace/mode/python");editor.setTheme("ace/theme/twilight");editor.setOptions({enableBasicAutocompletion:true,enableLiveAutocompletion:true});if(readOnly){editor.setReadOnly(true)}var jqCompleter={getCompletions:function(h,j,k,g,m){if(g.length===0){return m(null,[])}else{if((g.charAt(g.length-1)==".")==true){var e=g.split(".");word=e[e.length-2];word=word.replace(/\(.*\)/,"()");word=word.replace(/\[.*\]/,"[]");var l=[];if(wordList[word]){var d=wordList[word];for(var c=0;c<d.length;c++){key=d[c];if(key[2]){var b=g+key[2]}else{var b=g+key[0]}l.push({stock:b,caption:key[0],value:g+key[0],meta:key[1]})}}return m(null,l)}else{g=g.replace("(","");g=g.replace(")","");g=g.replace("[","");g=g.replace("]","");var a=new RegExp(g);var f=new RegExp(g.toUpperCase());var l=[];for(var c=0;c<funcList.length;c++){if(a.test(funcList[c][0])){if(funcList[c][2]){var b=funcList[c][2]}else{var b=funcList[c][0]}l.push({caption:b,value:funcList[c][0],meta:funcList[c][1],score:999})}}return m(null,l)}}}};langTools.addCompleter(jqCompleter);function unsave(){if(saving){return}$("#save-done-text").css("display","none");$("#save-span").removeClass("hidden");$("#algo-save-button").removeAttr("disabled")}editor.on("change",function(){unsave()});$("#title-box").on("blur",function(c){var b=$(this).val();var a=$("#algorithmId").val();Cy.ajax("/algorithm/index/setName",{data:"algorithmId="+a+"&name="+b,success:function(d){return false},fail:function(d){}})});function getByteLen(e){var b=0;for(var d=0;d<e.length;d++){var c=e.charAt(d);if(c.match(/[^\x00-\xff]/ig)!=null){b+=2}else{b+=1}}return b}$(".algo-title").click(function(b){b.stopPropagation();$(this).addClass("hidden");$(".algo-title-box").removeClass("hidden").focus().val($(".algo-title").html());var a=getByteLen($("#title-box").val());$("#title-box").width(a*8+"px").css({"min-width":390,"max-width":1280})});$("#title-box").keydown(function(){var a=getByteLen($("#title-box").val());$("#title-box").width(a*8+"px").css({"min-width":390,"max-width":1280})});$("#title-box").blur(function(){$(".algo-title-box").addClass("hidden");var a=this;if($(this).val()!=""){$(".algo-title").html($(a).val())}$(".algo-title").removeClass("hidden");$(document).attr("title",$(this).val());unsave()});$("#searchBtn").click(function(){editor.commands.exec("find",editor)});$(document).attr("title",$(".algo-title").text());editor.commands.addCommand({name:"showKeyboardShortcuts",bindKey:{win:"Ctrl-Alt-h",mac:"Command-Alt-h"},exec:function(a){ace.config.loadModule("ace/ext/keybinding_menu",function(b){b.init(a);a.showKeyboardShortcuts()})}});editor.commands.addCommands([{name:"showSettingsMenu",bindKey:{win:"Ctrl-Alt-b",mac:"Command-Alt-b"},exec:function(a){build(1)},readOnly:true}]);$(".dropdown-toggle").dropdown();$(".frequency-selector-ide .dropdown-menu li").click(function(){var a=$(this).find("span").eq(0).text();$(".dropdown-menu li").removeClass("selected");$(this).addClass("selected");$(".filter-option").text(a);$("#frequency").val($(this).attr("rel"))});$("#startTime,#endTime").datepicker({dateFormat:"yy-mm-dd",minDate:"2005-01-05",maxDate:"-1d",changeYear:true,changeMonth:true,beforeShow:function(){setTimeout(function(){$("#ui-datepicker-div").css("z-index",100007)},100)},onSelect:function(b,a){}});$("#btnSave").click(function(){Cy.ajaxForm($("form").eq(0),"/algorithm/code/doEdit",false,function(a){alert("保存成功")});return false});function setFontSize(a){if(!a){a="default"}$("#ide-container").removeClass("font-small font-large font-default");$("#ide-container").addClass("font-"+a);$("#fontsize-pref").find("li").removeClass("checked");$('li[data-fontsize="'+a+'"]').addClass("checked")}$("#fontsize-pref li").bind("click",function(a){return function(b){var c=$(b.currentTarget).data("fontsize");setFontSize(c);$.cookie("fontsize-pref",c)}}(this));setFontSize($.cookie("fontsize-pref"));function setTheme(a){if(!a){a="ambiance"}if(a=="ambiance"){editor.setTheme("ace/theme/twilight")}else{editor.setTheme("ace/theme/tomorrow")}$("#theme-pref").find("li").removeClass("checked");$('li[data-theme="'+a+'"]').addClass("checked")}$("#theme-pref li").bind("click",function(a){return function(b){var c=$(b.currentTarget).data("theme");setTheme(c);$.cookie("theme-pref",c)}}(this));setTheme($.cookie("theme-pref"));function setKeybind(a){if(a=="vim"){editor.setKeyboardHandler("ace/keyboard/vim")}else{if(a=="emacs"){editor.setKeyboardHandler("ace/keyboard/emacs")}else{editor.setKeyboardHandler(null);a=null}}if(a==null){a="default"}$("#keybind-pref").find("li").removeClass("checked");$('li[data-keybind="'+a+'"]').addClass("checked")}$("#keybind-pref li").bind("click",function(a){return function(b){var c=$(b.currentTarget).data("keybind");setKeybind(c);$.cookie("keybind-pref",c)}}(this));setKeybind($.cookie("keybind-pref"));$("#code-area").resizable({autoHide:true,handles:"e",maxWidth:$("body").width()-580,resize:function(g,f){var b=f.element.parent();var d=b.width()-f.element.outerWidth(),a=f.element.next(),c=d-(a.outerWidth()-a.width())-2;a.width(c);a.css("left",f.element.width()+1);$("#splitter-bar").css("left",f.element.width()-$("#splitter-bar").width());editor.resize()},stop:function(c,b){var a=b.element.parent();b.element.css({width:b.element.width()});if(chart){chart.setSize($("#dailybar-chart-outer-container").width()-10)}}});tab_pane_tall=0;$("#daily-toggle-logs-button").click(function(){tab_pane_tall?shrink_log_window():expand_log_window()});expand_log_window=function(){$tab_pane=$(".dailybars-output .tabbable");$tab_pane.addClass("tall");$("#daily-toggle-logs-button")[0].innerHTML="收起 <i class='icon icon-chevron-down'></i>",tab_pane_tall=!0;updateTabbleSize()};shrink_log_window=function(){$tab_pane=$(".dailybars-output .tabbable");$tab_pane.removeClass("tall");$("#daily-toggle-logs-button")[0].innerHTML="更多 <i class='icon icon-chevron-up'></i>";tab_pane_tall=!1;updateTabbleSize()};$("#daily-error-tab-link").click(function(){$(this).find("i").addClass("hidden")});function fullScreen(b){var a=document.documentElement;if(a.requestFullscreen){a.requestFullscreen()}else{if(a.msRequestFullscreen){a.msRequestFullscreen()}else{if(a.mozRequestFullScreen){a.mozRequestFullScreen()}else{if(a.webkitRequestFullScreen){a.webkitRequestFullScreen()}}}}}function exitFullScreen(){if(document.exitFullscreen){document.exitFullscreen()}else{if(document.msExitFullscreen){document.msExitFullscreen()}else{if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else{if(document.webkitCancelFullScreen){document.webkitCancelFullScreen()}}}}}document.addEventListener("fullscreenchange",function(){if(document.fullscreenElement){enter_fullscreen()}else{exit_fullscreen()}},false);document.addEventListener("msfullscreenchange",function(){if(document.msFullscreenElement){enter_fullscreen()}else{exit_fullscreen()}},false);document.addEventListener("mozfullscreenchange",function(){if(document.mozFullScreen){enter_fullscreen()}else{exit_fullscreen()}},false);document.addEventListener("webkitfullscreenchange",function(){if(document.webkitIsFullScreen){enter_fullscreen()}else{exit_fullscreen()}},false);var fullscreen=0;$("#fullscreen-menu-link").click(function(){fullScreen();$("#fullscreen-button").removeClass("hidden");$(".kk_body").removeClass("top_50")});$("#fullscreen-button").click(function(){exitFullScreen()});enter_fullscreen=function(){fullscreen=!0,$("#subnav").addClass("hidden");$("header").eq(0).addClass("hidden");$(window).trigger("resize")};exit_fullscreen=function(){this.fullscreen=!1,$("#subnav").removeClass("hidden");$("header").eq(0).removeClass("hidden");$(window).trigger("resize");$("#fullscreen-button").addClass("hidden");$(".kk_body").addClass("top_50")};var chart;var resultOffset=0;var userRecordOffset=0;var logOffset=0;var errorLogOffset=0;var frequency=$("#frequency").val();var stopCycle=false;var stopResult=false;var stopLog=false;var stopErrorLog=false;var backtestId=null;var dataResult=[];var dataBenchmark=[];var origDataOffset=0;var userRecord=null;var startDate=null;var endDate=null;Highcharts.setOptions({global:{timezoneOffset:-8*60},lang:{months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],shortMonths:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],weekdays:["星期天","星期一","星期二","星期三","星期四","星期五","星期六"],rangeSelectorZoom:"",rangeSelectorFrom:"从",rangeSelectorTo:"到"}});var cycleCount=0;if(frequency=="minute"){var timeoutSpan=2000}else{var timeoutSpan=4000}function cycleCheck(){if(stopResult&&stopErrorLog&&stopLog){stopCycle=true}if(stopCycle){return}if(stopLog==false){fillLog(backtestId)}if(stopErrorLog==false){fillErrorLog(backtestId)}if(stopResult==false){drawResult(backtestId)}cycleCount++;if(cycleCount<=4){setTimeout(cycleCheck,500*cycleCount)}else{setTimeout(cycleCheck,timeoutSpan)}}function clearStats(){$("#total_returns").html("--");$("#alpha").html("--");$("#beta").html("--");$("#sharpe").html("--");$("#max_drawdown").html("--")}function fillStats(){Cy.ajax("/algorithm/backtest/stats?backtestId="+backtestId,{success:function(a){if(!a.data){setTimeout(fillStats,500);return}$("#total_returns").html((a.data.algorithm_return*100).toFixed(2)+"%");$("#benchmark_returns").html((a.data.benchmark_return*100).toFixed(2)+"%");$("#alpha").html(a.data.alpha.toFixed(2));$("#beta").html(a.data.beta.toFixed(2));$("#sharpe").html(a.data.sharpe.toFixed(2));$("#max_drawdown").html((a.data.max_drawdown*100).toFixed(2)+"%")}})}function fillLog(a){Cy.ajax("/algorithm/backtest/log?backtestId="+a+"&offset="+logOffset,{success:function(h){if(h.data.logArr.length==0&&(h.data.state==2||h.data.state==3)){stopLog=true;return}if(h.data.offset<logOffset){return}var g="";for(var f=0;f<h.data.logArr.length;f++){if(!h.data.logArr[f]){continue}var e=h.data.logArr[f].split(" - ");if(e.length>2){var c='<span class="log-date">'+e[0]+"</span> - ";if(e[1]=="ERROR"){var j="log-error"}else{if(e[1]=="WARNING"){var j="log-warning"}else{var j="log-info"}}var b='<span class="'+j+'">'+e[1]+"</span> - ";e.shift();e.shift();var d=c+b+e.join("-")}else{var d=h.data.logArr[f]}g=g+"<p>"+d.replace(/\n/g,"<br/>");+"</p>";logOffset++}if(logOffset==0&&g.length>0){$("#logs-init").addClass("hidden")}$("#log").find("pre").eq(0).append(g)}})}function fillErrorLog(a){Cy.ajax("/algorithm/backtest/error?backtestId="+a+"&offset="+errorLogOffset,{success:function(d){if(d.data.logArr.length==0&&(d.data.state==2||d.data.state==3)){stopErrorLog=true;return}var c="";for(var b=0;b<d.data.logArr.length;b++){c=c+"<p>"+d.data.logArr[b].replace(/\n/g,"<br/>");+"</p>";errorLogOffset++}$("#error-log").find("pre").eq(0).append(c);if(c.length>0&&!$("#daily-errors-tab").hasClass("active")){$("#daily-error-tab-link").find("i").removeClass("hidden")}}})}function clearHighchartLable(){var a=document.domain;$("text[text-anchor=end]").each(function(){if(this.innerHTML=="Highcharts.com"){$(this).html(a)}})}function drawResult(a){stopResult=true;Cy.ajax("/algorithm/backtest/result?backtestId="+a+"&offset="+resultOffset+"&userRecordOffset="+userRecordOffset,{timeout:5000,fail:function(b){stopResult=false;return},error:function(b){stopResult=false},success:function(m){if(m.data.state==0){stopResult=false;return}else{if(m.data.state==3){toggleNavbar(1);building=0;$("#logs-init").addClass("hidden");$("#daily-error-tab-link").click();var g=0;var d=setInterval(function(){$("#error-log").css("display",g++%2?"none":"block");g>4&&(clearInterval(d))},150);return}}var l=m.data.result.benchmark;var e=m.data.result.overallReturn;var j=m.data.result.count;var f=parseInt(m.data.result.offset);if(j<=0&&m.data.state!=2){stopResult=false;return}if(!chart){chart=newChart(m.data.userRecord);clearHighchartLable()}if(m.data.userRecord){if(!userRecord){userRecord={};for(var k in m.data.userRecord){userRecord[k]=getRemainNullData()}}for(var k in m.data.userRecord){if(typeof userRecord[k]=="undefined"){userRecord[k]=getRemainNullData();chart.addSeries({name:k,data:userRecord[k],dataGrouping:grouping_options,yAxis:1},false)}}}for(var g=0;g<j;g++){if(!dataResult[g+f]){continue}dataResult[g+f].x=e.time[g];dataResult[g+f].y=e.value[g];dataBenchmark[g+f].x=l.time[g];dataBenchmark[g+f].y=l.value[g]}if(m.data.userRecord){for(var k in m.data.userRecord){var c=0;for(var g=0;g<m.data.userRecord[k].time.length;g++){if(!m.data.userRecord[k].time[g]){continue}var o=m.data.userRecord[k].time[g];var n=timeBar[o];if(typeof userRecord[k][n]=="undefined"){userRecord[k][n]={}}userRecord[k][n].x=m.data.userRecord[k].time[g];userRecord[k][n].y=m.data.userRecord[k].value[g];c++}}userRecordOffset=userRecordOffset+c}resultOffset=f+j;if(dataResult.length>0&&resultOffset>0&&dataResult.length>=resultOffset){var h=dataResult[resultOffset-1].x;for(var g=resultOffset;g<dataResult.length;g++){if(dataResult[g].x<h){dataResult[g].x=h;dataBenchmark[g].x=h}else{break}}}if(m.data.state==2){building=0;if(m.data.result.count==0){fillStats();if(!$("#logs-init").hasClass("hidden")){$("#logs-init").addClass("hidden")}toggleNavbar(1);return}}var b=(Math.min(100,(resultOffset/dataResult.length)*100)).toFixed(1);if(b>80){timeoutSpan=500}$("#dailybars-progressbar").width(b+"%");draw(dataResult,dataBenchmark,userRecord);stopResult=false}})}var g_tradeDays=null;var timeBar={};function getRemainNullData(){var a=[];for(var b=0;b<g_tradeDays.length;b++){tick=g_tradeDays[b]*1000;a.push({x:tick,y:null});timeBar[tick]=b}return a}function initChart(){window.startDate=startDate;window.endDate=endDate;dataResult=getRemainNullData();dataBenchmark=getRemainNullData();origDataOffset=0;resultOffset=0;userRecordOffset=0;logOffset=0;errorLogOffset=0;if(chart){chart.destroy();userRecord=null;chart=null}}function draw(a,c,b){chart.series[0].setData(a,false);chart.series[1].setData(c,false);if(b){var d=2;for(var e in b){if(chart.series[d]){chart.series[d].setData(b[e],false)}d++}}chart.redraw()}var grouping_options=null;function newChart(a){grouping_options={enabled:!0,approximation:"average",units:[["week",[1]],["month",[1,2,3,4,6]]],groupPixelWidth:1};var b=[{type:"area",name:"策略收益",color:"#4572A7",fillOpacity:0.2,tooltip:{dateTimeLabelFormats:{day:"%Y-%m-%d,%A"},valueDecimals:2,valueSuffix:"%"},data:[]},{name:"基准收益",tooltip:{dateTimeLabelFormats:{day:"%Y-%m-%d,%A"},valueDecimals:2,valueSuffix:"%"},color:"#aa4643",data:[]}];if(a){for(var c in a){b.push({name:c,data:[],dataGrouping:grouping_options,yAxis:1})}var d=[{height:"45%",lineWidth:2,title:{text:""},tickPixelInterval:20,minorGridLineWidth:1,minorTickWidth:0,opposite:!0,lineWidth:1,plotLines:[{value:0,color:"black",width:2}],labels:{align:"right",x:23,formatter:function(){return this.value+"%"}}},{labels:{align:"right",x:15},title:{text:""},tickPixelInterval:20,minorGridLineWidth:1,minorTickWidth:0,opposite:!0,lineWidth:1,plotLines:[{value:0,color:"black",width:2}],top:"55%",height:"45%",offset:0,lineWidth:2}]}else{var d=[{height:"100%",lineWidth:2,title:{text:""},tickPixelInterval:20,minorGridLineWidth:1,minorTickWidth:0,opposite:!0,lineWidth:1,plotLines:[{value:0,color:"black",width:2}],labels:{align:"right",x:23,formatter:function(){return this.value+"%"}}}]}chart=new Highcharts.StockChart({chart:{renderTo:"dailybar-chart-outer-container",events:{tooltipRefresh:function(f){chartHoverPointIndex=chart.hoverPoints[0].index}},animation:Highcharts.svg,marginRight:22},colors:["#89A54E","#80699B","#18a5ca","#DB843D","#A47D7C"],title:{text:""},rangeSelector:{enabled:false},plotOptions:{series:{connectNulls:true,turboThreshold:0,marker:{states:{hover:{enabled:!0,radius:4}},symbol:"circle"},animation:!1}},legend:{align:"center",verticalAlign:"top",borderWidth:0},navigator:{series:{color:"transparent",lineWidth:0},height:20,maskFill:"rgba(180, 198, 220, 0.75)",xAxis:{type:"datetime",dateTimeLabelFormats:{day:"%b %e",week:"%b %e",month:"%b %Y"}}},xAxis:{gridLineWidth:1,gridLineColor:"lightgray",categories:[],type:"datetime",tickPixelInterval:120,labels:{style:{fontSize:"10px"},formatter:function(){return Highcharts.dateFormat("%y-%m-%d",this.value)}}},yAxis:d,series:b});return chart}var chartHoverPointIndex=0;document.onkeydown=function(f){if(typeof chart=="undefined"){return}var d=chart;var c=d.series[0].points.length;switch(f.keyCode){case 37:if(chartHoverPointIndex==0){chartHoverPointIndex=chartHoverPointIndex}else{chartHoverPointIndex=chartHoverPointIndex-1}var b=[];for(var a=0;a<d.series.length;a++){b[a]=d.series[a].points[chartHoverPointIndex]}d.tooltip.refresh(b);break;case 39:if(chartHoverPointIndex==c){chartHoverPointIndex=chartHoverPointIndex}else{chartHoverPointIndex=chartHoverPointIndex+1}var b=[];for(var a=0;a<d.series.length;a++){b[a]=d.series[a].points[chartHoverPointIndex]}d.tooltip.refresh(b);break}};var saving=false;function save(){if($("#save-span").hasClass("hidden")){return}saving=true;$("#algo-save-button").attr("disabled","disabled");$("#save-span").addClass("hidden");$("#save-busy-text").css("display","block");$("#code").val(editor.getValue());var a=$("#algorithmId").attr("algorithmId_");if(accessControl==1){if(g_isWinApp&&jsObj){var b=jsObj.SaveAlgCode(a,$("#code").val())}setTimeout(saveDone,1000)}else{if(accessControl==2){return false}else{Cy.ajaxForm($("form").eq(0),"/algorithm/index/save",false,function(c){$("#algorithmId").val(c.data.algorithmId);setTimeout(saveDone,1000);return false})}}}$("#algo-save-button").click(function(){var a=editor.getValue();if(a.length<=0){Cy.alert("代码不能为空");return false}save()});function saveDone(){saving=false;$("#save-busy-text").css("display","none");$("#save-done-text").css("display","block")}function autoSave(){var a=editor.getValue();if(a.length<=0){return false}save();setTimeout(autoSave,10000)}setTimeout(autoSave,10000);$("#backtest-button").click(function(){window.location.href="/algorithm/backtest/list?algorithmId="+$("#algorithmId").val()});$("#edit-button").click(function(){window.location.href="/algorithm/backtest/buildList?algorithmId="+$("#algorithmId").val()});var disableNewBacktestBtn=false;$("#daily-new-backtest-button").click(function(){if(disableNewBacktestBtn){return}disableNewBacktestBtn=true;$("#type").val(0);if(accessControl==1){if(!g_isWinApp||typeof jsObj=="undefined"){Cy.alert("无法编译，请从客户端打开");return}var a=editor.getValue();compileSource(a);var b=function(c){jsObj.SaveBacktestCode(c,a)}}else{$("#code").val(editor.getValue());var b=function(c){}}Cy.ajaxForm($("form").eq(0),"/algorithm/index/build",false,function(c){b(c.data.backtestId_);window.location.href="/algorithm/backtest/detail?backtestId="+c.data.backtestId;return false},null,null,function(c){$("#daily-new-backtest-button").removeAttr("disabled");BootstrapDialog.show({title:"提示",btnOKLabel:"确认",message:"编译失败:"+c.msg});disableNewBacktestBtn=false;return})});function showIntro(b){var c=function(m,k){var g=[];var h=m.split(";");for(var j=0,f=h.length;j<f;j++){var l=h[j].split("=");if(k==l[0]){return l[1]}}};var d=document.cookie;var a=c(d,"isFirst");var e=new Date();e.setTime(e.getTime()+1000*24*60*60*1000);if((a=="1"||a==undefined)&&b==0){document.cookie="isFirst=0;expires="+e.toGMTString();introJs().setOptions({skipLabel:"退出",nextLabel:"下一步",prevLabel:"上一步",skipLabel:"跳过",doneLabel:"完成"}).start()}else{}}$("#help-submenu").find("a").attr("target","_blank");$(".popover-right").popover({placement:"bottom",trigger:"manual",html:true,content:'风险指标有利于您对策略进行客观的评价，<a target="_blank" style="color:#337ab7;font-weight:normal" href="/api#%E9%A3%8E%E9%99%A9%E6%8C%87%E6%A0%87">查看计算公式</a>'}).on("mouseenter",function(){var a=this;$(this).popover("show");$(this).siblings(".popover").on("mouseleave",function(){$(a).popover("hide")})}).on("mouseleave",function(){var a=this;setTimeout(function(){if(!$(".popover:hover").length){$(a).popover("hide")}},100)});var flag=true;$(".flag").click(function(){if(flag){$("#output-pane").css({display:"none"});$("#code-area").css({width:"100.3%"});$(this).val("<<");$(".ui-resizable-handle").hover(function(){$(this).css({display:"none"})});flag=false}else{$("#output-pane").css({display:"block",width:"54.9%",left:"45%"});$("#code-area").css({width:"45%"});$(this).val(">>");$(".ui-resizable-handle").hover(function(){$(this).css({display:"block"})});flag=true}editor.resize()});$("#wizard-edit-button").click(function(){window.location.href="/algorithm/index/wizard?algorithmId="+$("#algorithmId").val()});