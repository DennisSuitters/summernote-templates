/* https://github.com/DiemenDesign/summernote-templates */
(function (factory) {
  if (typeof define === 'function'&&define.amd) {
    define(['jquery'], factory)
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('jquery'));
  } else {
    factory(window.jQuery)
  }
}
(function ($) {
  $.extend(true,$.summernote.lang, {
    'en-US': {
      pageTemplates: {
        tooltip:     'Select Page Template',
        dialogTitle: 'Page Templates',
        editBtn:     'Insert'
      },
      blocks: {
        tooltip:     'Blocks',
        dialogTitle: 'Blocks',
        editBtn:     'Insert'
      }
    }
  });
  $.extend($.summernote.options, {
    pageTemplates: {
      icon: '<i class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path d="m 10,10.696915 -6,0 0,-1.071288 6,0 z m -0.00114,-1.9788834 -2.3368368,0 0,-1.0712886 2.3368368,0 z m 0,-1.9759562 -2.3368368,0 0,-1.071288 2.3368368,0 z m -3.3029604,1.9759562 -2.6958966,0 0,-3.0472086 2.6958966,0 z M 7.640148,1.26517 C 7.49432,1.11934 7.20625,1 7,1 L 2.5,1 C 2.29375,1 2.125,1.16875 2.125,1.375 l 0,11.25 C 2.125,12.83125 2.29375,13 2.5,13 l 9,0 c 0.20625,0 0.375,-0.16875 0.375,-0.375 l 0,-6.75 c 0,-0.20625 -0.11932,-0.49432 -0.265148,-0.64015 L 7.640148,1.26517 Z M 11.125,12.25 l -8.25,0 0,-10.5 4.115133,0 c 0.03417,0.006 0.09853,0.0323 0.12668,0.0525 l 3.955734,3.95571 c 0.02018,0.0281 0.04683,0.0925 0.05245,0.12668 l 0,6.36513 z M 11.5,1 9.25,1 C 9.04375,1 8.99432,1.11932 9.140148,1.26515 l 2.46968,2.46968 C 11.75568,3.88068 11.875,3.83125 11.875,3.625 l 0,-2.25 C 11.875,1.16875 11.70625,1 11.5,1 Z"/></svg></i>',
      insertDetails: false,
      dateFormat:    'longDate',
      yourName:      'Your Name',
      yourTitle:     'Your Title',
      yourCompany:   'Your Comapny',
      yourPhone:     'Your Phone',
      yourAddress:   'Your Address',
      yourCity:      'Your City',
      yourState:     'Your State',
      yourCountry:   'Your Country',
      yourPostcode:  'Your Postcode',
      yourEmail:     'your@email.com',
      templates:     '../summernote-templates/page-templates/'
    },
    blocks: {
      icon: '<i class="note-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="14" height="14"><path d="M 1,6.249111 H 6.25031 V 1 H 1 V 6.249111 z M 7.74969,1 V 6.249111 H 13 V 1 H 7.74969 z m 0,12 H 13 V 7.750444 H 7.74969 V 13 z M 1,13 H 6.25031 V 7.750444 H 1 V 13 z"/></svg></i>',
      templates: '../summernote-templates/block-templates/'
    }
  });
  $.extend($.summernote.plugins, {
    'pageTemplates': function (context) {
      var self      = this,
          ui        = $.summernote.ui,
          $note     = context.layoutInfo.note,
          $editor   = context.layoutInfo.editor,
          $editable = context.layoutInfo.editable,
          options   = context.options,
          lang      = options.langInfo;
      if (!$("link[href='../summernote-templates/css/summernote-templates.css']").length){
        $('<link/>', {
          rel: 'stylesheet',
          type: 'text/css',
          href: '../summernote-templates/css/summernote-templates.css'
        }).appendTo('head');
      }
      context.memo('button.pageTemplates', function () {
        var button = ui.button({
          contents: options.pageTemplates.icon,
          container: options.container,
          tooltip:  lang.pageTemplates.tooltip,
          placement: options.placement,
          click:    function (e) {
            context.invoke('pageTemplates.show');
          }
        });
        return button.render();
      });
      this.initialize = function () {
        var $container = options.dialogsInBody ? $(document.body) : $editor;
        var body       = '<div id="note-pageTemplates"></div>';
        this.$dialog   = ui.dialog({
          title:  lang.pageTemplates.dialogTitle,
          body:   body,
          footer: '<button href="#" class="note-btn note-btn-primary note-pageTemplates-btn">' + lang.pageTemplates.editBtn + '</button>'
        }).render().appendTo($container);
      };
      this.destroy = function () {
        ui.hideDialog(this.$dialog);
        this.$dialog.remove();
      };
      this.bindEnterKey = function ($input,$btn) {
        $input.on('keypress',function (event) {
          if (event.keyCode === 13) $btn.trigger('click');
        });
      };
      this.bindLabels = function () {
      	self.$dialog.find('.form-control:first').focus().select();
      	self.$dialog.find('label').on('click',function () {
      		$(this).parent().find('.form-control:first').focus();
      	});
      };
      this.show = function () {
        this.showpageTemplatesDialog();
      };
      this.showpageTemplatesDialog = function () {
        return $.Deferred(function (deferred) {
          var $pTBtn = self.$dialog.find('.note-pageTemplates-btn');
          ui.onDialogShown(self.$dialog, function () {
            context.triggerEvent('dialog.shown');
            var ii = 1;
            var pT = '';
            $('#note-pageTemplates').html('');
            $.get(options.pageTemplates.templates).done(function (data) {
              $(data).find("a").attr("href", function (i, val) {
                if (val.match(/\.(html)$/)) {
                  var filename = val.replace('.html', '.png');
                  var name = val.replace(/.html|%20|_/gi, ' ');
                  pT = '<div class="note-pageTemplates">' +
                    '<input id="note-select-' + ii + '" type="radio" value="' + val + '" name="note-pageTemplates-select" hidden>' +
                    '<label for="note-select-' + ii + '" class="note-pageTemplates-label">' +
                      '<img src="' + options.pageTemplates.templates + filename + '" class="note-thumb-selection">' +
                    '</label>' +
                    '<small>' + name.charAt(0).toUpperCase() + name.substr(1).toLowerCase() + '</small>' +
                  '</div>';
                  $('#note-pageTemplates').append(pT);
                  ii++;
                }
              });
            });
            $pTBtn.click(function (e) {
              var pageTemplatesSelected = $('input[name=note-pageTemplates-select]:checked').val();
              if (pageTemplatesSelected) {
                $.get(options.pageTemplates.templates + pageTemplatesSelected).done(function (data) {
                  if (options.pageTemplates.insertDetails) {
                    let currentDate = new Date();
                    var find = [
                      "[Date]",
                      "[Your_Name]",
                      "[Your_Title]",
                      "[Your_Company]",
                      "[Your_Phone]",
                      "[Your_Address]",
                      "[Your_City]",
                      "[Your_State]",
                      "[Your_Country]",
                      "[Your_Postcode]",
                      "[Your_Email]",
                      "[Your_Phone]"
                    ];
                    var replace = [
                      currentDate.format(options.pageTemplates.dateFormat),
                      options.pageTemplates.yourName,
                      options.pageTemplates.yourTitle,
                      options.pageTemplates.yourCompany,
                      options.pageTemplates.yourPhone,
                      options.pageTemplates.yourAddress,
                      options.pageTemplates.yourCity,
                      options.pageTemplates.yourState,
                      options.pageTemplates.yourCountry,
                      options.pageTemplates.yourPostcode,
                      options.pageTemplates.yourEmail
                    ];
                    data = data.replace(
                      new RegExp("(" + find.map(function (i) {
                        return i.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&")
                      }).join("|") + ")", "g"),function (s) {
                        return replace[find.indexOf(s)]
                      });
                  }
                  $note.summernote('code', data);
                  ui.hideDialog(self.$dialog);
                });
              }
            });
            self.bindEnterKey($pTBtn);
            self.bindLabels();
          });
          this.destroy = function () {
            ui.hideDialog(this.$dialog);
            this.$dialog.remove();
          };
          ui.onDialogHidden(self.$dialog, function () {
            $pTBtn.off('click');
            if (deferred.state() === 'pending') deferred.reject();
          });
          ui.showDialog(self.$dialog);
        });
      };
    }
  });
  $.extend($.summernote.plugins, {
    'blocks': function (context) {
      var self      = this,
          ui        = $.summernote.ui,
          $note     = context.layoutInfo.note,
          $editor   = context.layoutInfo.editor,
          $editable = context.layoutInfo.editable,
          options   = context.options,
          lang      = options.langInfo;
      if (!$("link[href='../summernote-templates/css/summernote-templates.css']").length){
        $('<link/>', {
          rel: 'stylesheet',
          type: 'text/css',
          href: '../summernote-templates/css/summernote-templates.css'
        }).appendTo('head');
      }
      context.memo('button.blocks',function () {
        var button = ui.button({
          contents: options.blocks.icon,
          container: options.container,
          tooltip:  lang.blocks.tooltip,
          placement: options.placement,
          click:    function () {
            context.invoke('blocks.show');
          }
        });
        return button.render();
      });
      this.initialize = function () {
        var $container = options.dialogsInBody ? $(document.body) : $editor;
        var body = '<div id="note-blocks"></div>' +
                  '<div class="note-form-group">' +
                    '<input type="checkbox" class="note-blocks-replaceContent" name="note-blocks-replaceContent">' +
                    '<label for="note-image-attributes-link-class" class="note-form-label">Replace Content</label>' +
                  '</div>';
        this.$dialog = ui.dialog({
          title:  lang.blocks.dialogTitle,
          body:   body,
          footer: '<button href="#" class="note-btn note-btn-primary note-blocks-btn">' + lang.blocks.editBtn + '</button>'
        }).render().appendTo($container);
      };
      this.destroy = function () {
        ui.hideDialog(this.$dialog);
        this.$dialog.remove();
      };
      this.bindEnterKey = function ($input, $btn) {
        $input.on('keypress',function (event) {
          if (event.keyCode === 13) $btn.trigger('click');
        });
      };
      this.bindLabels = function () {
      	self.$dialog.find('.form-control:first').focus().select();
      	self.$dialog.find('label').on('click', function () {
      		$(this).parent().find('.form-control:first').focus();
      	});
      };
      this.show = function () {
        this.showblocksDialog();
      };
      this.showblocksDialog = function () {
        return $.Deferred(function (deferred) {
          var $blocksBtn = self.$dialog.find('.note-blocks-btn');
          ui.onDialogShown(self.$dialog, function () {
            context.triggerEvent('dialog.shown');
            var ii = 1;
            var pT = '';
            $('#note-blocks').html('');
            $.get(options.blocks.templates).done(function (data) {
              $(data).find("a").attr("href", function (i,val) {
                if (val.match(/\.(html)$/)) {
                  var filename = val.replace('.html', '.png');
                  var name = val.replace(/.html|%20|_/gi, ' ');
                  pT = '<div class="note-blocks">' +
                    '<input id="note-select-' + ii + '" type="radio" value="' + val + '" name="note-blocks-select" hidden>' +
                    '<label for="note-select-' + ii + '" class="note-blocks-label">' +
                      '<img src="' + options.blocks.templates + filename + '" class="note-thumb-selection">' +
                    '</label>' +
                  '</div>';
                  $('#note-blocks').append(pT);
                  ii++;
                }
              });
            });
            $blocksBtn.click(function (e) {
              var blocksSelected = $('input[name=note-blocks-select]:checked').val();
              if (blocksSelected) {
                $.get(options.blocks.templates + blocksSelected).done(function (data) {
                  if ($('input[name=note-blocks-replaceContent]:checked').length > 0) {
                    $note.summernote('code', data);
                  } else {
                    $note.summernote('pasteHTML', data);
                  }
                });
                ui.hideDialog(self.$dialog);
              }
            });
            self.bindEnterKey($blocksBtn);
            self.bindLabels();
          });
          this.destroy = function () {
            ui.hideDialog(this.$dialog);
            this.$dialog.remove();
          };
          ui.onDialogHidden(self.$dialog, function () {
            $blocksBtn.off('click');
            if (deferred.state() === 'pending') deferred.reject();
          });
          ui.showDialog(self.$dialog);
        });
      };
    }
  });
}));
/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 * MIT license
 *
 * Includes enhancements by Scott Trenda <scott.trenda.net>
 * and Kris Kowal <cixar.com/~kris.kowal/>
 *
 * Accepts a date, a mask, or a date and a mask.
 * Returns a formatted version of the given date.
 * The date defaults to the current date/time.
 * The mask defaults to dateFormat.masks.default.
  d	    Day of the month as digits; no leading zero for single-digit days.
  dd    Day of the month as digits; leading zero for single-digit days.
  ddd	  Day of the week as a three-letter abbreviation.
  dddd	Day of the week as its full name.
  m	    Month as digits; no leading zero for single-digit months.
  mm    Month as digits; leading zero for single-digit months.
  mmm	  Month as a three-letter abbreviation.
  mmmm	Month as its full name.
  yy	  Year as last two digits; leading zero for years less than 10.
  yyyy	Year represented by four digits.
  h	    Hours; no leading zero for single-digit hours (12-hour clock).
  hh	  Hours; leading zero for single-digit hours (12-hour clock).
  H	    Hours; no leading zero for single-digit hours (24-hour clock).
  HH	  Hours; leading zero for single-digit hours (24-hour clock).
  M	    Minutes; no leading zero for single-digit minutes.
        Uppercase M unlike CF timeFormat's m to avoid conflict with months.
  MM	  Minutes; leading zero for single-digit minutes.
        Uppercase MM unlike CF timeFormat's mm to avoid conflict with months.
  s	    Seconds; no leading zero for single-digit seconds.
  ss	  Seconds; leading zero for single-digit seconds.
  l or L	Milliseconds. l gives 3 digits. L gives 2 digits.
  t	    Lowercase, single-character time marker string: a or p.
        No equivalent in CF.
  tt    Lowercase, two-character time marker string: am or pm.
        No equivalent in CF.
  T     Uppercase, single-character time marker string: A or P.
        Uppercase T unlike CF's t to allow for user-specified casing.
  TT    Uppercase, two-character time marker string: AM or PM.
        Uppercase TT unlike CF's tt to allow for user-specified casing.
  Z	US  timezone abbreviation, e.g. EST or MDT. With non-US timezones or in the Opera browser, the GMT/UTC offset
        is returned, e.g. GMT-0500
        No equivalent in CF.
  o     GMT/UTC timezone offset, e.g. -0500 or +0230.
        No equivalent in CF.
  S     The date's ordinal suffix (st, nd, rd, or th). Works well with d.
        No equivalent in CF.
  '…' or "…"	Literal character sequence. Surrounding quotes are removed.
        No equivalent in CF.
  UTC:	Must be the first four characters of the mask. Converts the date from local time to UTC/GMT/Zulu time before applying the mask. The "UTC:" prefix is removed.
        No equivalent in CF.

  default         ddd mmm dd yyyy HH:MM:ss      Sat Jun 09 2007 17:46:21
  shortDate       m/d/yy                        6/9/07
  mediumDate	    mmm d, yyyy                   Jun 9, 2007
  longDate        mmmm d, yyyy                  June 9, 2007
  fullDate        dddd, mmmm d, yyyy            Saturday, June 9, 2007
  shortTime       h:MM TT                       5:46 PM
  mediumTime	    h:MM:ss TT                    5:46:21 PM
  longTime        h:MM:ss TT Z                  5:46:21 PM EST
  isoDate         yyyy-mm-dd                    2007-06-09
  isoTime         HH:MM:ss                      17:46:21
  isoDateTime     yyyy-mm-dd'T'HH:MM:ss         2007-06-09T17:46:21
  isoUtcDateTime	UTC:yyyy-mm-dd'T'HH:MM:ss'Z'	2007-06-09T22:46:21Z
 */
var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		  timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		  timezoneClip = /[^-+\dA-Z]/g,
		  pad = function (val, len) {
			  val = String(val);
			  len = len || 2;
			  while (val.length < len) val = "0" + val;
			  return val;
		  };
	return function (date, mask, utc) {
		var dF = dateFormat;
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");
		mask = String(dF.masks[mask] || mask || dF.masks["default"]);
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}
		var	_     = utc ? "getUTC" : "get",
			  d     = date[_ + "Date"](),
			  D     = date[_ + "Day"](),
			  m     = date[_ + "Month"](),
			  y     = date[_ + "FullYear"](),
			  H     = date[_ + "Hours"](),
			  M     = date[_ + "Minutes"](),
			  s     = date[_ + "Seconds"](),
			  L     = date[_ + "Milliseconds"](),
			  o     = utc ? 0 : date.getTimezoneOffset(),
			  flags = {
				  d:    d,
				  dd:   pad(d),
				  ddd:  dF.i18n.dayNames[D],
				  dddd: dF.i18n.dayNames[D + 7],
				  m:    m + 1,
				  mm:   pad(m + 1),
				  mmm:  dF.i18n.monthNames[m],
				  mmmm: dF.i18n.monthNames[m + 12],
				  yy:   String(y).slice(2),
				  yyyy: y,
				  h:    H % 12 || 12,
				  hh:   pad(H % 12 || 12),
				  H:    H,
				  HH:   pad(H),
				  M:    M,
				  MM:   pad(M),
				  s:    s,
				  ss:   pad(s),
				  l:    pad(L, 3),
				  L:    pad(L > 99 ? Math.round(L / 10) : L),
				  t:    H < 12 ? "a"  : "p",
				  tt:   H < 12 ? "am" : "pm",
				  T:    H < 12 ? "A"  : "P",
				  TT:   H < 12 ? "AM" : "PM",
				  Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				  o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				  S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			  };
		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};
dateFormat.i18n = {
	dayNames: [
		"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
		"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
	],
	monthNames: [
		"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
		"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
	]
};
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};
