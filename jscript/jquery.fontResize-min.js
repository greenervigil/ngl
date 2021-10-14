/*!
 * fontResize JavaScript
 * http://simplersolutions.biz
 *
 * resize the font
 *
 * LICENSE:   Creative Commons – Attribution required
 *
 * author    simpler solutions <info@simplersolutions.biz>
 * license   Creative Commons – Attribution required
 * version   CVS: $Id$
 * link      http://simplersolutions.biz
 */
(function(a){a.fn.fontResize=function(b){var c=a.extend({},a.fn.fontResize.defaults,b);this.each(function(){a(this).append(c.defaultLabels);if(a.cookie(c.defaultCookieName)){a.fn.fontResize.reSize(false,a.cookie(c.defaultCookieName))}a("."+c.defaultIncreaseClass).click(function(){a.fn.fontResize.reSize(true,"1.50em");return false});a("."+c.defaultDecreaseClass).click(function(){a.fn.fontResize.reSize(false,"0.75em");return false});a("."+c.defaultNormalizeClass).click(function(){a.fn.fontResize.reSize(false,"1.25em");return false})})};a.fn.fontResize.reSize=function(h,d){if(d){a(a.fn.fontResize.defaults.defaultTargetNode).css("font-size",d);if(d==a.fn.fontResize.defaults.defaultSize){a.cookie(a.fn.fontResize.defaults.defaultCookieName,null,a.fn.fontResize.defaults.defaultcookieParms)}return}var e=h?1+(a.fn.fontResize.defaults.defaultChangePercent/100):1-(a.fn.fontResize.defaults.defaultChangePercent/100);var g=a(a.fn.fontResize.defaults.defaultTargetNode).css("font-size");var f=parseInt(g);if(isNaN(f)){return}var c=g.replace(f,"");var b=Math.round(parseInt(g)*e)+c;a(a.fn.fontResize.defaults.defaultTargetNode).css("font-size",b);return a.cookie(a.fn.fontResize.defaults.defaultCookieName,b,a.fn.fontResize.defaults.defaultcookieParms)}})(jQuery);$.fn.fontResize.defaults={defaultTargetNode:"html",defaultChangePercent:5,defaultDecreaseClass:"decreaseFont",defaultIncreaseClass:"increaseFont",defaultXXClass:"increaseXXFont",defaultNormalizeClass:"normalizeFont",defaultInsertionNode:"fontResizer",defaultCookieName:"fontResizer",defaultcookieParms:{expires:3,path:"/"}};
