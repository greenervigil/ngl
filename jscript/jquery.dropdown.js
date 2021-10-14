(function ($) {
    $.fn.extend({
        dropdown: function (options) {
            var defaults = {
                wrapper: this,
                button: ".dropdown-toggle",
                dropdown: ".dropdown-menu",
                slideOut: true
            };
            var opts = $.extend(defaults, options);
            return this.each(function () {
                var o = $.meta ? $.extend({}, opts, $this.data()) : opts; //puts all the defaults into the variable o, supports the $.meta plugin for inline default changes if needed
                //Globals

                /*$(o.wrapper).focus(function () {
                $(o.button).focus();
                });*/
                $(o.dropdown).hide();
                $(o.button).click(function (event) {
                    if (!$(this).hasClass("open")) {
                        $(o.wrapper).each(function () {
                            if ($(o.button).hasClass("open")) {
                                $(o.button).removeClass("open");
                                $(o.dropdown).slideUp("fast");
                            }
                        });
                        $(this).parent(o.wrapper).children(o.dropdown).slideDown("fast");
                        $(this).addClass("open");
                    }
                    else {
                        if (!$(this).hasClass("textBox")) {
                            $(this).parent(o.wrapper).children(o.dropdown).slideUp("fast");
                            $(this).removeClass("open");
                        }
                    }
                    $("#suggestions").hide();
                    event.stopPropagation();
                });

                $("html").keydown(function (event) {
                    if (event.keyCode == 27) {
                        $(o.wrapper).each(function () {
                            if ($(o.button).hasClass("open")) {
                                $(o.button).removeClass("open");
                                $(o.dropdown).slideUp("fast");
                            }
                        });
                    }
                });

                $("html").click(function () {
                    $(o.wrapper).each(function () {
                        if ($(o.button).hasClass("open")) {
                            $(o.button).removeClass("open");
                            $(o.dropdown).slideUp("fast");
                        }
                    });
                });

                $(o.dropdown).click(function (event) {
                    event.stopPropagation();
                });
                return false;
            });
        }
    });
})(jQuery);