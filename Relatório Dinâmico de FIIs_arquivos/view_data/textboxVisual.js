"use strict";var __extends=this&&this.__extends||function(){var t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])};return function(e,o){function i(){this.constructor=e}t(e,o),e.prototype=null===o?Object.create(o):(i.prototype=o.prototype,new i)}}(),powerbi;!function(t){var e;!function(t){var e=jsCommon.CssConstants.createClassAndSelector,o=jsCommon.FocusManager,i=jsCommon.FocusManagerEventName,n=jsCommon.FocusNavModeAttribute,r=jsCommon.KeyUtils,l=jsCommon.StringExtensions,s=jsCommon.UrlUtils.UrlScheme,a=jsCommon.UrlUtils,u=e("textboxFocusElement"),c=function(){function e(t){t&&(t.viewModelAdapter&&(this.viewModelAdapter=t.viewModelAdapter),this.disableScrollingInViewMode=t.disableScrollingInViewMode)}return e.prototype.init=function(t){this.element=t.element,this.host=t.host,this.viewport=t.viewport,this.style=t.style,this.readOnly=0===this.host.getViewMode(),this.paragraphs=[],this.refreshView()},e.prototype.onResizing=function(t){var e=this.viewport;this.viewport=t,this.updateSize(),this.viewModelAdapter&&this.viewModelAdapter.onResizing(this.element,this.viewport,e)},e.prototype.onDataChanged=function(t){var e=t.dataViews;if(this.paragraphs=[],e&&e.length>0){var o=e[0].metadata.objects;o&&o.general&&(this.paragraphs=o.general.paragraphs)}this.refreshView()},e.prototype.destroy=function(){},e.prototype.focus=function(){if(this.editor)return this.editor.focus(),!0},e.prototype.onViewModeChanged=function(t){this.readOnly=0===t,this.refreshView()},e.prototype.setSelection=function(t,e){this.editor&&this.editor.setSelection(t,e)},e.prototype.ensureFocusableElement=function(){var t=this,e=this.element;if(!e.find(u.selector).length){var o=$("<div>").width(0).height(0).attr("tabindex",0).addClass(u.class);e.append(o),o.on(i,function(){t.focus()})}},e.prototype.removeFocusableElement=function(){this.element.find(u.selector).remove()},e.prototype.refreshView=function(){var o=this;if(this.readOnly){this.editor&&(this.saveContents(),this.editor.destroy(),this.editor=null),this.element.empty();var i=d.convertParagraphsToHtml(this.paragraphs),r=$("<div>").addClass(e.ClassAndSelector.class).css({"font-family":p.defaultFont,"font-size":p.defaultFontSize,color:t.ColorHelper.getThemeColor(this.style,t.ForegroundColorName)}).append(i);this.viewModelAdapter&&this.viewModelAdapter.onDataChanged(r,this.viewport);var l=void 0;this.disableScrollingInViewMode?(l=r,this.element.append(r)):(l=this.$scrollableDiv=$("<div/>").addClass(e.ScrollWrapperClassAndSelector.class).css({height:this.viewport.height+"px","overflow-y":"auto","overflow-x":"hidden"}).append(r),this.element.append(this.$scrollableDiv)),this.removeFocusableElement(),l.attr("tabindex",0).attr("role","document").attr(n,"Browser").on("keydown",function(t){27===t.keyCode&&o.$scrollableDiv.removeAttr(n).removeAttr("tabindex")}).focusout(function(){o.$scrollableDiv.attr("tabindex",0).attr(n,"Browser")})}else{if(!this.editor){var s={onEscape:function(){return o.focus()}};this.editor=new p.QuillWrapper(this.readOnly,this.host,this.style,s),this.editor.textChanged=function(){return o.saveContents()},this.element.empty(),this.ensureFocusableElement();var a=this.editor.getElement();a.addClass(e.ClassAndSelector.class).css({"font-family":p.defaultFont,"font-size":p.defaultFontSize,color:t.ColorHelper.getThemeColor(this.style,t.ForegroundColorName)}),this.element.append(a)}this.editor.setContents(d.convertParagraphsToOps(this.paragraphs))}this.updateSize()},e.prototype.saveContents=function(){if(this.editor){var t=this.editor.getContents();this.paragraphs=d.convertDeltaToParagraphs(t);var e=[{objectName:"general",properties:{paragraphs:this.paragraphs},selector:null}];this.host.persistProperties(e)}},e.prototype.updateSize=function(){this.editor?this.editor.resize(this.viewport):this.$scrollableDiv&&this.$scrollableDiv.css("height",this.viewport.height+"px")},e.ClassAndSelector=jsCommon.CssConstants.createClassAndSelector("textbox"),e.ScrollWrapperClassAndSelector=jsCommon.CssConstants.createClassAndSelector("scrollWrapper"),e}();t.Textbox=c;var h;!function(t){var e="http://",o=function(){function t(t){this.smallViewportProperties=t}return t.prototype.onResizing=function(t,e,o){var i=this.isSmallViewport(o),n=this.isSmallViewport(e);i!==n&&this.applyScaleOnElement(t,n)},t.prototype.onDataChanged=function(t,e){this.isSmallViewport(e)&&this.applyScaleOnElement(t,!0)},t.prototype.isSmallViewport=function(t){return!!t&&!!this.smallViewportProperties&&(t.height<=this.smallViewportProperties.minHeightToScaleFontSize||t.width<=this.smallViewportProperties.minWidthToScaleFontSize)},t.prototype.applyScaleOnElement=function(e,o){e.find(c.ClassAndSelector.selector).css({"font-size":o?t.scale(p.defaultFontSize):p.defaultFontSize}),e.find(d.TextRunElement.selector).each(function(e,i){var n,r=$(i).css("font-size")||p.defaultFontSize;if(o)n=t.scale(r);else{var l=$(i).data(d.ModelKeyName);n=l.textStyle&&l.textStyle.fontSize?l.textStyle.fontSize:p.defaultFontSize}$(i).css({"font-size":p.getCssFontSize(n)})})},t.scale=function(t){var e,o=parseInt(t.slice(0,-2),10);return e=o>66?32:o>42?28:o>26?24:o>16?20:o>11?14:12,jsCommon.PixelConverter.toString(e)},t}();t.ViewModelAdapter=o;var i=function(t){function e(){return t.call(this,{minHeightToScaleFontSize:1/0,minWidthToScaleFontSize:1/0})||this}return __extends(e,t),e}(o);t.AlwaysUseSmallViewport=i;var n=function(){function t(){}return t.format=function(t){return/^\S+@\S+\.\S+$/.test(t)?"mailto:"+t:/^https?:\/\//i.test(t)?t:e+t},t}();t.LinkPreview=n}(h=t.TextboxHelpers||(t.TextboxHelpers={}));var d;!function(e){function o(t){for(var e=[],o={textRuns:[]},i=0,n=t.ops.length;i<n;i++){var l=t.ops[i];if("string"==typeof l.insert){var s=l.insert,a=l.attributes;a&&a.align&&(o.horizontalTextAlignment=a.align);var u=0,h=0,d=void 0;do{if(h=s.indexOf("\n",u),h<0?(d=!1,h=s.length):d=!0,h-u>0){var p=s.substring(u,h),f={value:p};if(a){void 0!==a.link&&r(a.link)&&(f.url=a.link);var g=c(a);g&&(f.textStyle=g)}o.textRuns.push(f)}d&&(0===o.textRuns.length&&o.textRuns.push({value:""}),e.push(o),o={textRuns:[]}),u=h+1}while(u<s.length)}}return o.textRuns.length>0&&o.textRuns[0].value.length>0&&e.push(o),e}function i(t){for(var o=$(),i=0,n=t.length;i<n;++i){var l=t[i],s=!0,a=$("<p>").data(e.ModelKeyName,l);l.horizontalTextAlignment&&a.css("text-align",l.horizontalTextAlignment);for(var u=0,c=l.textRuns.length;u<c;++u){var h=l.textRuns[u],d=void 0,f=h.value;_.isEmpty(f)||(s=!1),d=void 0!==h.url&&r(h.url)?$("<a>").attr("href",h.url).attr("rel","noopener noreferrer").attr("target","_blank"):$("<span>"),d.text(f).addClass(e.TextRunElement.class).data(e.ModelKeyName,h);var g=h.textStyle;if(g){var v={};g.fontFamily&&(v["font-family"]=p.getCssFontFamily(g.fontFamily)),g.fontSize&&(v["font-size"]=p.getCssFontSize(g.fontSize)),g.fontStyle&&(v["font-style"]=g.fontStyle),g.fontWeight&&(v["font-weight"]=g.fontWeight),g.color&&(v.color=g.color),g.textDecoration&&(v["text-decoration"]=g.textDecoration),d.css(v)}a.append(d)}s&&a.append($("<br>")),o=o.add(a)}return o}function n(e){for(var o=[],i=0,n=e.length;i<n;++i){for(var l=e[i],s=0,a=l.textRuns.length;s<a;++s){var c=l.textRuns[s],d={},f=c.textStyle;f&&(f.fontFamily&&(d.font=t.Font.normalizeFamily(p.getCssFontFamily(h(f.fontFamily)))),f.fontSize&&(d.size=f.fontSize),f.color&&(d.color=f.color),d.italic="italic"===f.fontStyle||void 0,d.bold="bold"===f.fontWeight||void 0,d.underline="underline"===f.textDecoration||void 0);var g=c.value;c.url&&r(c.url)&&(d.link=c.url);var v={insert:g,attributes:d};o.push(v)}var m={insert:"\n"},y=u(l);y&&(m.attributes=y),o.push(m)}return o}function r(t){if(_.isEmpty(t))return!1;switch(a.getUrlScheme(t)){case s.http:case s.https:case s.mailto:return!0;default:return!1}}function u(t){var e={};return t.horizontalTextAlignment&&(e.align=t.horizontalTextAlignment),!_.isEmpty(e)&&e}function c(e){var o={};if(e.bold&&(o.fontWeight="bold"),e.font){var i=t.Font.normalizeFamily(_.unescape(e.font),!1);i=p.getFontFamilyForBuiltInFont(i),o.fontFamily=i}return e.italic&&(o.fontStyle="italic"),e.size&&(o.fontSize=e.size),e.underline&&(o.textDecoration="underline"),e.color&&(o.color=e.color),o}function h(t){return!_.startsWith(t,"'")||l.containsIgnoreCase(t,",")?t:t.slice(1,t.length-1)}e.ModelKeyName="ModelObject",e.TextRunElement=jsCommon.CssConstants.createClassAndSelector("textRun"),e.convertDeltaToParagraphs=o,e.convertParagraphsToHtml=i,e.convertParagraphsToOps=n,e.isValidLinkUrl=r}(d=t.RichTextConversion||(t.RichTextConversion={}));var p;!function(i){function n(t){var e=u[t]||t;return e!==i.defaultFont?e:void 0}function s(t){return _.findKey(u,function(e){return e===t||e.indexOf(t)>0})||t}function a(t){return t!==i.defaultFontSize?t:""}var u={"Segoe (Bold)":t.Font.Family.bold.family,"Segoe UI":t.Font.Family.regular.family,"Segoe UI Light":t.Font.Family.light.family,Heading:t.Font.Family.light.family,Body:t.Font.Family.regular.family},c=["Arial","Arial Black","Arial Unicode MS","Calibri","Cambria","Cambria Math","Candara","Comic Sans MS","Consolas","Constantia","Corbel","Courier New","Georgia","Lucida Sans Unicode","Segoe (Bold)","Segoe UI","Segoe UI Light","Symbol","Tahoma","Times New Roman","Trebuchet MS","Verdana","Wingdings"].map(function(t){return{label:t,value:u[t]||t}});i.defaultFont=n("Segoe UI Light");var d=[8,9,10,10.5,11,12,14,16,18,20,24,28,32,36,40,42,44,54,60,66,72,80,88,96].map(function(t){return{label:""+t,value:t+"px"}});i.defaultFontSize="14px";var p="Left",f=["Left","Center","Right"].map(function(t){var e=t.toLowerCase();return{label:t,value:t===p?"":e,glyph:"align"+e}});i.getCssFontFamily=n,i.getFontFamilyForBuiltInFont=s,i.getCssFontSize=a;var g=function(){function e(e,o,i,n){var r=this;this.readOnly=e,this.host=o,this.style=i,this.toolbarOptions=n,this.textChanged=_.noop,this.$container=$("<div>"),this.localizationProvider={get:function(t){return r.host.getLocalizedString(t)},getOptional:function(t){return r.host.getLocalizedString(t)}},t.TextboxUtil.loadQuillResources?(this.initialized=!1,this.dependenciesLoaded=this.host.loader().require({javascript:"quill",css:["quill.core"]}).then(function(t){return r.initializeQuill(t)})):(this.initializeQuill(window.Quill),this.dependenciesLoaded=this.host.promiseFactory().resolve())}return e.prototype.initializeQuill=function(t){this.quillStatic=t,this.rebuildQuillEditor(),this.initialized=!0,this.quillStatic.debug("error")},e.prototype.getElement=function(){return this.$container},e.prototype.getContents=function(){if(this.initialized)return this.editor.getContents()},e.prototype.setContents=function(t){var e=this;return this.initialized?void this.editor.setContents(t):void this.dependenciesLoaded.then(function(){return e.setContents(t)})},e.prototype.resize=function(t){this.$container.width(t.width),this.$container.height(t.height)},e.prototype.setReadOnly=function(t){var e=t!==this.readOnly;this.readOnly=t,this.initialized&&e&&this.rebuildQuillEditor()},e.prototype.setSelection=function(t,e){this.editor&&this.editor.setSelection(t,e)},e.prototype.getSelection=function(t){if(this.editor)return this.editor.getSelection(t)},e.prototype.focus=function(){this.editor&&0===$(document.activeElement).closest(this.$container).length&&this.editor.focus()},e.prototype.destroy=function(){this.host.setToolbar(null),this.$container.remove(),this.$container=null,this.$toolbarDiv=null,this.$editorDiv=null,this.editor=null},e.prototype.getSelectionAtCursor=function(){var t=this.getTextWithoutTrailingBreak(),e=this.getSelection(!0);if(e&&0===e.length){var o=jsCommon.WordBreaker.find(e.index,t);return{index:o.start,length:o.end-o.start}}return e},e.prototype.getWord=function(){var t=this.getSelectionAtCursor();return this.getTextWithoutTrailingBreak().slice(t.index,t.index+t.length)},e.prototype.getEditorContainer=function(){if(this.editor)return $(this.editor.container)},e.prototype.getTextWithoutTrailingBreak=function(){return this.editor.getText().slice(0,-1)},e.prototype.rebuildQuillEditor=function(){var o=this,i=null;this.editor&&(i=this.editor.getContents()),this.$container.empty(),this.$container.keydown(function(t){var e=t.which;t.ctrlKey&&r.isCtrlShortcutKey(e)&&t.stopPropagation(),(r.isArrowKey(e)||r.isNudgeModifierKey(e))&&t.stopPropagation(),r.isDeleteKey(e)&&t.stopPropagation(),t.altKey&&84===t.keyCode&&(o.focusToolbar(),t.stopPropagation())});var n=this.$editorDiv=$("<div>"),s={readOnly:this.readOnly,formats:["bold","italic","underline","font","size","link","align","color"],modules:{history:{userOnly:!0}}},a=v.buildToolbarLinkInputTemplate(this.localizationProvider),u=v.LinkInput.buildNode(a);if(!this.readOnly){var c=this.$toolbarDiv;c||(this.$toolbarDiv=c=v.buildToolbar(this,this.localizationProvider,u,this.toolbarOptions)),c.addClass("unselectable"),c.toggleClass("high-contrast",this.style.isHighContrast),this.host.setToolbar(c),s.modules.toolbar={container:c.get(0)},n.attr("drag-resize-disabled","true")}if(this.editor=new this.quillStatic(n.get(0),s),!this.readOnly){var h=new v.LinkInput(u,this.editor,this.quillStatic,a),d=function(t){t?(o.editor.setSelection(o.getSelectionAtCursor()),h.open()):h.remove()},c=this.$toolbarDiv,p=new v.ColorPicker({quill:this.editor,hostServices:this.host,$colorSwatch:c.find(v.ColorPicker.colorSwatchGlyphClassAndSelector.selector),$colorPickerButton:c.find(v.ColorPicker.pickerButtonClassAndSelector.selector),$colorPickerButtonWrapper:c.find(v.ColorPicker.pickerButtonWrapperClassAndSelector.selector),defaultColor:t.ColorHelper.getThemeColor(this.style,t.ForegroundColorName),format:"color"}),f=function(){return p.applyFormat(p.getColor())},g=this.quillStatic.import("parchment"),m=this.quillStatic.import("formats/font");m.value=function(o){var i=e.camelize(m.keyName);return _.escape(t.Font.normalizeFamily(o.style[i]))},m.canAdd=function(e,o){return null!=g.query(e,g.Scope.BLOT&(m.scope|g.Scope.TYPE))&&(null==m.whitelist||m.whitelist.indexOf(t.Font.normalizeFamily(_.unescape(o)))>-1)},m.add=function(o,i){if(!m.canAdd(o,i))return!1;var n=e.camelize(m.keyName),r=t.Font.normalizeFamily(_.unescape(i));return o.style[n]=r,!0};var y=this.editor.getModule("toolbar");y.addHandler("link",d),y.addHandler("color",f)}this.$container.append(n),i&&this.setContents(i);var C=_.debounce(function(){return o.onTextChanged()},e.textChangeThrottle);this.editor.on("text-change",function(t,i,n){if("api"!==n){for(var r=0,s=t.ops;r<s.length;r++){var a=s[r];if(e.isInsertOp(a)){var u=a.insert;if(u&&l.containsWhitespace(u))return o.onTextChanged(),void C.cancel()}}C()}}),this.editor.root.addEventListener("blur",function(t){var i=t.relatedTarget||document.activeElement;i&&(e.willBrowserHandleFocus(i)||o.targetIsInToolbar(i))||o.setSelection(null,null)},!1)},e.willBrowserHandleFocus=function(t){return"SELECT"===t.tagName||"INPUT"===t.tagName||!!t.getAttribute("contentEditable")},e.prototype.targetIsInToolbar=function(t){if("A"===t.tagName||"BUTTON"===t.tagName){var e=$(t);return this.$toolbarDiv.visible()&&(e.is(this.$toolbarDiv)||e.closest(this.$toolbarDiv).length>0)}return!1},e.prototype.onTextChanged=function(){this.textChanged()},e.isInsertOp=function(t){return null!=t.insert},e.camelize=function(t){var e=t.split("-"),o=_.map(e.slice(1),function(t){return t[0].toUpperCase()+t.slice(1)}).join("");return e[0]+o},e.prototype.focusToolbar=function(){return!(!this.editor||!this.$toolbarDiv)&&void o.focusChildInGroup(this.$toolbarDiv.get(0))},e.textChangeThrottle=600,e}();i.QuillWrapper=g;var v;!function(o){function n(e,o,n,u){var h="size",g=l(h);s(e.quillStatic,h,null,g,!0);var y="font",C=c.map(function(e){return t.Font.normalizeFamily(e.value)}),x=l(y);s(e.quillStatic,y,C,x,!0);var T="align",$=f.map(function(t){return t.value}),z=l(T);a(e.quillStatic,z,$);var A=_.map(c,function(e){return{label:e.label,glyph:e.glyph,value:_.escape(t.Font.normalizeFamily(e.value))}}),q=_.escape(t.Font.normalizeFamily(i.defaultFont)),P=k.buildFontColorButtons(o.get("Visual_FontColor")),E=m().addClass("toolbar").addClass("themeableElement").attr("aria-label",F("FontControl",o)).attr("focus-nav-mode","Group").append(v().append(b(F("Font",o),A,"font",q,function(t,e){return t.css("font-family",e.value),t})).append(b(F("Size",o),d,"size",i.defaultFontSize)).append(P)).append(v().append(w(F("Bold",o),"bold")).append(w(F("Italic",o),"italic")).append(w(F("Underline",o),"underline"))).append(v().append(S("Text Alignment",f,"align",p,o))).append(v().append(w(F("Link",o),"link")).append(n));return r(E),u&&u.onEscape&&E.on("keydown",function(t){27===t.keyCode&&(t.stopPropagation(),t.preventDefault(),u.onEscape())}),E}function r(t){}function l(t){return"formats/"+t}function s(t,e,o,i,n){void 0===n&&(n=!1),a(t,"attributors/style/"+e,o,i,n)}function a(t,e,o,i,n){void 0===n&&(n=!1);var r=t.import(e);r.whitelist=o,t.register(i||e,r,n)}function u(t,e,o,i){return $('\n                        <a href="#" class="ql-preview" target="_blank"></a>\n                        <input class="input" type="text" aria-label="'+i+'">\n                        <span class="bar">&nbsp;|&nbsp;</span>\n                        <button class="ql-action ql-save">'+e+'</button>\n                        <button class="ql-action ql-edit">'+o+'</button>\n                        <button class="ql-remove">'+t+"</button>\n                    ")}function g(t){var e=m(),o=t.get("RichTextbox_Link_Done"),i=t.get("RichTextbox_Link_Remove"),n=t.get("RichTextbox_Link_Edit"),r=F("Link",t);return e.append(u(i,o,n,r)),e.html()}function v(){return y().addClass("ql-formats")}function m(){return $("<div>")}function y(){return $("<span>")}function C(){return $("<button>")}function S(t,e,o,i,n){return e.map(function(t){var e=null!=t.glyph?t.glyph:o+t.value;return w(F(t.label,n),o,t.value,e)})}function b(t,e,o,i,n){return x(t,e,i,n).addClass("ql-"+o+" ql-picker")}function x(t,e,o,i){for(var n=$("<select>").attr("title",t).attr("aria-label",t),r=0,l=e;r<l.length;r++){var s=l[r],a=$("<option>").text(s.label);s.value===o?a.attr("selected","selected"):a.attr("value",s.value),void 0!==i&&(a=i(a,s)),n.append(a)}return n}function w(t,e,o,i){var n=C();return null!=t&&n.attr("title",t).attr("aria-label",t),null!=e&&n.addClass("ql-"+e),null!=o&&n.attr("value",o),null==i&&(null!=e&&(i=e),null!=o&&(i=(i||"")+o)),null!=i&&n.addClass("powervisuals-glyph "+i),n}function F(t,e){return e.get("RichTextbox_"+t+"_ToolTip")}o.selectors={linkTooltip:e("ql-link-tooltip"),toolbarUrlInput:e("toolbar-url-input")},o.buildToolbar=n,o.buildToolbarLinkInputTemplate=g;var T=function(){function t(e,o,i,n){var r=this;this.$container=e,this.quill=o,this.quillStatic=i,this.$preview=this.$container.find("a.ql-preview"),this.$textbox=this.$container.find("input[type=text]"),this.textbox=this.$textbox[0],this.$action=this.$container.find(".ql-action"),this.hide(),this.$textbox.on("keydown",function(t){13===t.keyCode?r.onSave(t):27===t.keyCode&&r.onHide(t)}),["click","touchstart"].forEach(function(e){r.$action.on(e,function(e){r.$container.hasClass(t.editingClass)?r.onSave(e):r.onEdit(e)}),r.$container.find(".ql-remove").on(e,function(t){return r.onRemove(t)})}),o.on("selection-change",function(t){var e;if(null!=t||!r.isEditing){if(null!=t&&0===t.length){var i=void 0;if(e=o.scroll.descendant(r.quillStatic.import("formats/link"),t.index),r.link=e[0],i=e[1],null!=r.link){var n={index:t.index-i,length:r.link.length()};return void(_.isEqual(r.range,n)||(r.range=n,r.show()))}}r.hide()}})}return t.buildNode=function(t){return m().addClass(o.selectors.toolbarUrlInput.class).append($(t))},t.prototype.onHide=function(t){this.hide(),this.stopEvent(t)},t.prototype.onSave=function(t){this.save(),this.stopEvent(t)},t.prototype.onEdit=function(t){this.edit(),this.stopEvent(t)},t.prototype.onRemove=function(t){this.remove(),this.stopEvent(t)},t.prototype.stopEvent=function(t){t.stopPropagation(),t.preventDefault()},t.prototype.edit=function(){this.isEditing=!0,this.$container.addClass(t.editingClass),this.$textbox.focus(),this.textbox.setSelectionRange(0,this.textbox.value.length)},t.prototype.open=function(){this.range=this.quill.getSelection(),this.show(),this.edit()},t.prototype.hide=function(){this.range=this.link=null,this.$container.hide(),this.isEditing=!1},t.prototype.remove=function(){this.range=this.range||this.quill.getSelection(),this.quill.formatText(this.range,"link",!1,"user"),this.quill.setSelection(this.range,"silent"),this.hide()},t.prototype.save=function(){var t=this.range,e=this.textbox.value;0===t.length&&(this.quill.insertText(this.range.index,e),this.quill.setSelection(this.range.index,e.length),t=this.range=this.quill.getSelection()),this.quill.formatText(t.index,t.length,"link",e,"user"),this.quill.setSelection(t,"silent"),this.link=this.quill.scroll.descendant(this.quillStatic.import("formats/link"),t.index)[0],this.show()},t.prototype.show=function(){this.isEditing=!1,this.$container.removeClass(t.editingClass),this.$container.show();var e,o=this.range=this.range||this.quill.getSelection();null!=this.link?e=this.link.formats().link:(e=this.quill.getText(o.index,o.length),e=h.LinkPreview.format(e)),this.$textbox.val(e),this.$preview.text(e),this.$preview.attr("href",e)},t.editingClass="ql-editing",t}();o.LinkInput=T;var k=function(){function t(t){var e=this;this.quill=t.quill,this.hostServices=t.hostServices,this.$colorSwatch=t.$colorSwatch,this.$colorPickerButtonWrapper=t.$colorPickerButtonWrapper,this.defaultColor=t.defaultColor,this.format=t.format,this.promiseFactory=this.hostServices.promiseFactory(),this.currentColor=t.defaultColor,this.setSwatch(this.currentColor),t.$colorPickerButton.on("click",function(t){t.stopPropagation(),e.toggle()})}return t.buildFontColorButtons=function(e){var o=$("<span/>").addClass("powervisuals-glyph").addClass(t.colorGlyphClassAndSelector.class),i=$("<span/>").addClass("powervisuals-glyph").addClass(t.colorSwatchGlyphClassAndSelector.class),n=$("<button>").addClass("ql-color").addClass(t.colorButtonClassAndSelector.class).attr("title",e).attr("aria-label",e).val("false").append(o).append(i),r=$("<button>").addClass("colorpicker powervisuals-glyph chevrondown").addClass(t.pickerButtonClassAndSelector.class).val("false");return[n,$("<div>").addClass(t.pickerButtonWrapperClassAndSelector.class).append(r)]},t.prototype.onColorChange=function(t){this.setSwatch(t?t:this.defaultColor),this.applyFormat(t?t:null,this.range),this.currentColor=t},t.prototype.onClose=function(){var t=this.ensureRange();this.quill.setSelection(t.index,t.length),this.color?this.quill.format(this.format,this.color,"user"):this.quill.format(this.format,!1,"user")},t.prototype.getColor=function(){return this.currentColor},t.prototype.applyFormat=function(t,e){var o=this.ensureRange(e);this.color=t,t&&t!==this.defaultColor?this.quill.formatText(o.index,o.length,this.format,t,"user"):this.quill.formatText(o.index,o.length,this.format,!1,"user")},t.prototype.toggle=function(){this.range=this.ensureRange(),this.getColorPicker().then(function(t){return t.toggle()})},t.prototype.getColorPicker=function(){var t,e=this;if(!this.colorPicker&&this.existingDeferred)t=this.existingDeferred;else if(t=this.promiseFactory.defer(),this.colorPicker)t.resolve(this.colorPicker);else{this.existingDeferred=t;var o=this.$colorPickerButtonWrapper.get(0);this.hostServices.getUIComponentFactory().createColorPicker(o,{value:this.defaultColor},function(t){return e.onColorChange(t&&t.value)},function(){return e.onClose()}).then(function(o){e.colorPicker=o,t.resolve(o)})}return t.promise},t.prototype.setSwatch=function(t){this.$colorSwatch.get(0).style.setProperty("color",t,"important")},t.prototype.ensureRange=function(t){return t||this.quill.getSelection()||{index:0,length:0}},t.colorGlyphClassAndSelector=e("fontcolor"),t.colorSwatchGlyphClassAndSelector=e("fontcolorswatch"),t.colorButtonClassAndSelector=e("fontcolorbutton"),t.pickerButtonClassAndSelector=e("fontcolorpicker"),t.pickerButtonWrapperClassAndSelector=e("fontcolorbutton-wrapper"),t}();o.ColorPicker=k}(v=i.Toolbar||(i.Toolbar={}))}(p=t.RichText||(t.RichText={}))}(e=t.visuals||(t.visuals={}))}(powerbi||(powerbi={})),define("TextboxVisual/textboxModule",["require","exports"],function(t,e){function o(t){return new powerbi.visuals.Textbox(t)}function i(t){return new powerbi.visuals.TextboxHelpers.ViewModelAdapter(t)}function n(){return new powerbi.visuals.TextboxHelpers.AlwaysUseSmallViewport}Object.defineProperty(e,"__esModule",{value:!0}),e.createTextbox=o,e.createTextboxViewModelAdapter=i,e.createAlwaysUseSmallViewportTextboxViewModelAdapter=n});