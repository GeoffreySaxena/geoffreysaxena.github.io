jQuery(function () {
    jQuery(":input").on("focus", function () {
        var input = jQuery(this);
        var inputID = input.attr("id") || "(no input ID)";
        var inputName = input.attr("name") || "(no input name)";
        var inputClass = input.attr("class") || "(no input class)";
        var form = jQuery(this.form);
        var formID = form.attr("id") || "(no form ID)";
        var formName = form.attr("name") || "(no form name)";
        var formClass = form.attr("class") || "(no form class)";
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.formElementEnter',
            'inputID': inputID,
            'inputName': inputName,
            'inputClass': inputClass,
            'formID': formID,
            'formName': formName,
            'formClass': formClass
        })
    }).on("blur", function () {
        var input = jQuery(this);
        var inputID = input.attr("id") || "(no input ID)";
        var inputName = input.attr("name") || "(no input name)";
        var inputClass = input.attr("class") || "(no input class)";
        var form = jQuery(this.form);
        var formID = form.attr("id") || "(no form ID)";
        var formName = form.attr("name") || "(no form name)";
        var formClass = form.attr("class") || "(no form class)";
        window[gtm4wp_datalayer_name].push({
            'event': 'gtm4wp.formElementLeave',
            'inputID': inputID,
            'inputName': inputName,
            'inputClass': inputClass,
            'formID': formID,
            'formName': formName,
            'formClass': formClass
        })
    })
});
(function () {
    var container, button, menu, links, i, len;
    container = document.getElementById('site-navigation');
    if (!container) {
        return
    }
    button = container.getElementsByTagName('button')[0];
    if ('undefined' === typeof button) {
        return
    }
    menu = container.getElementsByTagName('ul')[0];
    if ('undefined' === typeof menu) {
        button.style.display = 'none';
        return
    }
    menu.setAttribute('aria-expanded', 'false');
    if (-1 === menu.className.indexOf('nav-menu')) {
        menu.className += ' nav-menu'
    }
    button.onclick = function () {
        if (-1 !== container.className.indexOf('toggled')) {
            container.className = container.className.replace(' toggled', '');
            button.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-expanded', 'false')
        } else {
            container.className += ' toggled';
            button.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-expanded', 'true')
        }
    };
    links = menu.getElementsByTagName('a');
    for (i = 0, len = links.length; i < len; i++) {
        links[i].addEventListener('focus', toggleFocus, !0);
        links[i].addEventListener('blur', toggleFocus, !0)
    }

    function toggleFocus() {
        var self = this;
        while (-1 === self.className.indexOf('nav-menu')) {
            if ('li' === self.tagName.toLowerCase()) {
                if (-1 !== self.className.indexOf('focus')) {
                    self.className = self.className.replace(' focus', '')
                } else {
                    self.className += ' focus'
                }
            }
            self = self.parentElement
        }
    }(function (container) {
        var touchStartFn, i, parentLink = container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');
        if ('ontouchstart' in window) {
            touchStartFn = function (e) {
                var menuItem = this.parentNode,
                    i;
                if (!menuItem.classList.contains('focus')) {
                    e.preventDefault();
                    for (i = 0; i < menuItem.parentNode.children.length; ++i) {
                        if (menuItem === menuItem.parentNode.children[i]) {
                            continue
                        }
                        menuItem.parentNode.children[i].classList.remove('focus')
                    }
                    menuItem.classList.add('focus')
                } else {
                    menuItem.classList.remove('focus')
                }
            };
            for (i = 0; i < parentLink.length; ++i) {
                parentLink[i].addEventListener('touchstart', touchStartFn, !1)
            }
        }
    }(container))
})();
(function () {
    var isIe = /(trident|msie)/i.test(navigator.userAgent);
    if (isIe && document.getElementById && window.addEventListener) {
        window.addEventListener('hashchange', function () {
            var id = location.hash.substring(1),
                element;
            if (!(/^[A-z0-9_-]+$/.test(id))) {
                return
            }
            element = document.getElementById(id);
            if (element) {
                if (!(/^(?:a|select|input|button|textarea)$/i.test(element.tagName))) {
                    element.tabIndex = -1
                }
                element.focus()
            }
        }, !1)
    }
})();
(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'))
    } else {
        factory(jQuery)
    }
}(function ($) {
    'use strict';
    var Slick = window.Slick || {};
    Slick = (function () {
        var instanceUid = 0;

        function Slick(element, settings) {
            var _ = this,
                dataSettings;
            _.defaults = {
                accessibility: !0,
                adaptiveHeight: !1,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: !0,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: !1,
                autoplaySpeed: 3000,
                centerMode: !1,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function (slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
                },
                dots: !1,
                dotsClass: 'slick-dots',
                draggable: !0,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: !1,
                focusOnSelect: !1,
                infinite: !0,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: !1,
                pauseOnHover: !0,
                pauseOnFocus: !0,
                pauseOnDotsHover: !1,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: !1,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: !0,
                swipeToSlide: !1,
                touchMove: !0,
                touchThreshold: 5,
                useCSS: !0,
                useTransform: !0,
                variableWidth: !1,
                vertical: !1,
                verticalSwiping: !1,
                waitForAnimate: !0,
                zIndex: 1000
            };
            _.initials = {
                animating: !1,
                dragging: !1,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: !1,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: !1,
                unslicked: !1
            };
            $.extend(_, _.initials);
            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = !1;
            _.focussed = !1;
            _.interrupted = !1;
            _.hidden = 'hidden';
            _.paused = !0;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = !0;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;
            dataSettings = $(element).data('slick') || {};
            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.currentSlide = _.options.initialSlide;
            _.originalSettings = _.options;
            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange'
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange'
            }
            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.instanceUid = instanceUid++;
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            _.registerBreakpoints();
            _.init(!0)
        }
        return Slick
    }());
    Slick.prototype.activateADA = function () {
        var _ = this;
        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        })
    };
    Slick.prototype.addSlide = Slick.prototype.slickAdd = function (markup, index, addBefore) {
        var _ = this;
        if (typeof (index) === 'boolean') {
            addBefore = index;
            index = null
        } else if (index < 0 || (index >= _.slideCount)) {
            return !1
        }
        _.unload();
        if (typeof (index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack)
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index))
            } else {
                $(markup).insertAfter(_.$slides.eq(index))
            }
        } else {
            if (addBefore === !0) {
                $(markup).prependTo(_.$slideTrack)
            } else {
                $(markup).appendTo(_.$slideTrack)
            }
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index)
        });
        _.$slidesCache = _.$slides;
        _.reinit()
    };
    Slick.prototype.animateHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === !0 && _.options.vertical === !1) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed)
        }
    };
    Slick.prototype.animateSlide = function (targetLeft, callback) {
        var animProps = {},
            _ = this;
        _.animateHeight();
        if (_.options.rtl === !0 && _.options.vertical === !1) {
            targetLeft = -targetLeft
        }
        if (_.transformsEnabled === !1) {
            if (_.options.vertical === !1) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback)
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback)
            }
        } else {
            if (_.cssTransitions === !1) {
                if (_.options.rtl === !0) {
                    _.currentLeft = -(_.currentLeft)
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function (now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === !1) {
                            animProps[_.animType] = 'translate(' + now + 'px, 0px)';
                            _.$slideTrack.css(animProps)
                        } else {
                            animProps[_.animType] = 'translate(0px,' + now + 'px)';
                            _.$slideTrack.css(animProps)
                        }
                    },
                    complete: function () {
                        if (callback) {
                            callback.call()
                        }
                    }
                })
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);
                if (_.options.vertical === !1) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)'
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)'
                }
                _.$slideTrack.css(animProps);
                if (callback) {
                    setTimeout(function () {
                        _.disableTransition();
                        callback.call()
                    }, _.options.speed)
                }
            }
        }
    };
    Slick.prototype.getNavTarget = function () {
        var _ = this,
            asNavFor = _.options.asNavFor;
        if (asNavFor && asNavFor !== null) {
            asNavFor = $(asNavFor).not(_.$slider)
        }
        return asNavFor
    };
    Slick.prototype.asNavFor = function (index) {
        var _ = this,
            asNavFor = _.getNavTarget();
        if (asNavFor !== null && typeof asNavFor === 'object') {
            asNavFor.each(function () {
                var target = $(this).slick('getSlick');
                if (!target.unslicked) {
                    target.slideHandler(index, !0)
                }
            })
        }
    };
    Slick.prototype.applyTransition = function (slide) {
        var _ = this,
            transition = {};
        if (_.options.fade === !1) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase
        }
        if (_.options.fade === !1) {
            _.$slideTrack.css(transition)
        } else {
            _.$slides.eq(slide).css(transition)
        }
    };
    Slick.prototype.autoPlay = function () {
        var _ = this;
        _.autoPlayClear();
        if (_.slideCount > _.options.slidesToShow) {
            _.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed)
        }
    };
    Slick.prototype.autoPlayClear = function () {
        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer)
        }
    };
    Slick.prototype.autoPlayIterator = function () {
        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;
        if (!_.paused && !_.interrupted && !_.focussed) {
            if (_.options.infinite === !1) {
                if (_.direction === 1 && (_.currentSlide + 1) === (_.slideCount - 1)) {
                    _.direction = 0
                } else if (_.direction === 0) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;
                    if (_.currentSlide - 1 === 0) {
                        _.direction = 1
                    }
                }
            }
            _.slideHandler(slideTo)
        }
    };
    Slick.prototype.buildArrows = function () {
        var _ = this;
        if (_.options.arrows === !0) {
            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');
            if (_.slideCount > _.options.slidesToShow) {
                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows)
                }
                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows)
                }
                if (_.options.infinite !== !0) {
                    _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true')
                }
            } else {
                _.$prevArrow.add(_.$nextArrow).addClass('slick-hidden').attr({
                    'aria-disabled': 'true',
                    'tabindex': '-1'
                })
            }
        }
    };
    Slick.prototype.buildDots = function () {
        var _ = this,
            i, dot;
        if (_.options.dots === !0 && _.slideCount > _.options.slidesToShow) {
            _.$slider.addClass('slick-dotted');
            dot = $('<ul />').addClass(_.options.dotsClass);
            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)))
            }
            _.$dots = dot.appendTo(_.options.appendDots);
            _.$dots.find('li').first().addClass('slick-active').attr('aria-hidden', 'false')
        }
    };
    Slick.prototype.buildOut = function () {
        var _ = this;
        _.$slides = _.$slider.children(_.options.slide + ':not(.slick-cloned)').addClass('slick-slide');
        _.slideCount = _.$slides.length;
        _.$slides.each(function (index, element) {
            $(element).attr('data-slick-index', index).data('originalStyling', $(element).attr('style') || '')
        });
        _.$slider.addClass('slick-slider');
        _.$slideTrack = (_.slideCount === 0) ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent();
        _.$list = _.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);
        if (_.options.centerMode === !0 || _.options.swipeToSlide === !0) {
            _.options.slidesToScroll = 1
        }
        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');
        _.setupInfinite();
        _.buildArrows();
        _.buildDots();
        _.updateDots();
        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
        if (_.options.draggable === !0) {
            _.$list.addClass('draggable')
        }
    };
    Slick.prototype.buildRows = function () {
        var _ = this,
            a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection;
        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();
        if (_.options.rows > 1) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(originalSlides.length / slidesPerSection);
            for (a = 0; a < numOfSlides; a++) {
                var slide = document.createElement('div');
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target))
                        }
                    }
                    slide.appendChild(row)
                }
                newSlides.appendChild(slide)
            }
            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children().css({
                'width': (100 / _.options.slidesPerRow) + '%',
                'display': 'inline-block'
            })
        }
    };
    Slick.prototype.checkResponsive = function (initial, forceUpdate) {
        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = !1;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();
        if (_.respondTo === 'window') {
            respondToWidth = windowWidth
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth)
        }
        if (_.options.responsive && _.options.responsive.length && _.options.responsive !== null) {
            targetBreakpoint = null;
            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === !1) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint]
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint]
                        }
                    }
                }
            }
            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint = targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint)
                        } else {
                            _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                            if (initial === !0) {
                                _.currentSlide = _.options.initialSlide
                            }
                            _.refresh(initial)
                        }
                        triggerBreakpoint = targetBreakpoint
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint)
                    } else {
                        _.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]);
                        if (initial === !0) {
                            _.currentSlide = _.options.initialSlide
                        }
                        _.refresh(initial)
                    }
                    triggerBreakpoint = targetBreakpoint
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === !0) {
                        _.currentSlide = _.options.initialSlide
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint
                }
            }
            if (!initial && triggerBreakpoint !== !1) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint])
            }
        }
    };
    Slick.prototype.changeSlide = function (event, dontAnimate) {
        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;
        if ($target.is('a')) {
            event.preventDefault()
        }
        if (!$target.is('li')) {
            $target = $target.closest('li')
        }
        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
        switch (event.data.message) {
            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, !1, dontAnimate)
                }
                break;
            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, !1, dontAnimate)
                }
                break;
            case 'index':
                var index = event.data.index === 0 ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
                _.slideHandler(_.checkNavigable(index), !1, dontAnimate);
                $target.children().trigger('focus');
                break;
            default:
                return
        }
    };
    Slick.prototype.checkNavigable = function (index) {
        var _ = this,
            navigables, prevNavigable;
        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1]
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break
                }
                prevNavigable = navigables[n]
            }
        }
        return index
    };
    Slick.prototype.cleanUpEvents = function () {
        var _ = this;
        if (_.options.dots && _.$dots !== null) {
            $('li', _.$dots).off('click.slick', _.changeSlide).off('mouseenter.slick', $.proxy(_.interrupt, _, !0)).off('mouseleave.slick', $.proxy(_.interrupt, _, !1))
        }
        _.$slider.off('focus.slick blur.slick');
        if (_.options.arrows === !0 && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide)
        }
        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);
        _.$list.off('click.slick', _.clickHandler);
        $(document).off(_.visibilityChange, _.visibility);
        _.cleanUpSlideEvents();
        if (_.options.accessibility === !0) {
            _.$list.off('keydown.slick', _.keyHandler)
        }
        if (_.options.focusOnSelect === !0) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler)
        }
        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);
        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);
        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).off('ready.slick.slick-' + _.instanceUid, _.setPosition)
    };
    Slick.prototype.cleanUpSlideEvents = function () {
        var _ = this;
        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, !0));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, !1))
    };
    Slick.prototype.cleanUpRows = function () {
        var _ = this,
            originalSlides;
        if (_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides)
        }
    };
    Slick.prototype.clickHandler = function (event) {
        var _ = this;
        if (_.shouldClick === !1) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault()
        }
    };
    Slick.prototype.destroy = function (refresh) {
        var _ = this;
        _.autoPlayClear();
        _.touchObject = {};
        _.cleanUpEvents();
        $('.slick-cloned', _.$slider).detach();
        if (_.$dots) {
            _.$dots.remove()
        }
        if (_.$prevArrow && _.$prevArrow.length) {
            _.$prevArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');
            if (_.htmlExpr.test(_.options.prevArrow)) {
                _.$prevArrow.remove()
            }
        }
        if (_.$nextArrow && _.$nextArrow.length) {
            _.$nextArrow.removeClass('slick-disabled slick-arrow slick-hidden').removeAttr('aria-hidden aria-disabled tabindex').css('display', '');
            if (_.htmlExpr.test(_.options.nextArrow)) {
                _.$nextArrow.remove()
            }
        }
        if (_.$slides) {
            _.$slides.removeClass('slick-slide slick-active slick-center slick-visible slick-current').removeAttr('aria-hidden').removeAttr('data-slick-index').each(function () {
                $(this).attr('style', $(this).data('originalStyling'))
            });
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.detach();
            _.$list.detach();
            _.$slider.append(_.$slides)
        }
        _.cleanUpRows();
        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');
        _.unslicked = !0;
        if (!refresh) {
            _.$slider.trigger('destroy', [_])
        }
    };
    Slick.prototype.disableTransition = function (slide) {
        var _ = this,
            transition = {};
        transition[_.transitionType] = '';
        if (_.options.fade === !1) {
            _.$slideTrack.css(transition)
        } else {
            _.$slides.eq(slide).css(transition)
        }
    };
    Slick.prototype.fadeSlide = function (slideIndex, callback) {
        var _ = this;
        if (_.cssTransitions === !1) {
            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });
            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback)
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });
            if (callback) {
                setTimeout(function () {
                    _.disableTransition(slideIndex);
                    callback.call()
                }, _.options.speed)
            }
        }
    };
    Slick.prototype.fadeSlideOut = function (slideIndex) {
        var _ = this;
        if (_.cssTransitions === !1) {
            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing)
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            })
        }
    };
    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function (filter) {
        var _ = this;
        if (filter !== null) {
            _.$slidesCache = _.$slides;
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
            _.reinit()
        }
    };
    Slick.prototype.focusHandler = function () {
        var _ = this;
        _.$slider.off('focus.slick blur.slick').on('focus.slick blur.slick', '*:not(.slick-arrow)', function (event) {
            event.stopImmediatePropagation();
            var $sf = $(this);
            setTimeout(function () {
                if (_.options.pauseOnFocus) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay()
                }
            }, 0)
        })
    };
    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function () {
        var _ = this;
        return _.currentSlide
    };
    Slick.prototype.getDotCount = function () {
        var _ = this;
        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;
        if (_.options.infinite === !0) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
            }
        } else if (_.options.centerMode === !0) {
            pagerQty = _.slideCount
        } else if (!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll)
        } else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
            }
        }
        return pagerQty - 1
    };
    Slick.prototype.getLeft = function (slideIndex) {
        var _ = this,
            targetLeft, verticalHeight, verticalOffset = 0,
            targetSlide;
        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(!0);
        if (_.options.infinite === !0) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight
            }
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0
        }
        if (_.options.centerMode === !0 && _.options.infinite === !0) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth
        } else if (_.options.centerMode === !0) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)
        }
        if (_.options.vertical === !1) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset
        }
        if (_.options.variableWidth === !0) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === !1) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex)
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow)
            }
            if (_.options.rtl === !0) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1
                } else {
                    targetLeft = 0
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0
            }
            if (_.options.centerMode === !0) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === !1) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex)
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1)
                }
                if (_.options.rtl === !0) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1
                    } else {
                        targetLeft = 0
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0
                }
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2
            }
        }
        return targetLeft
    };
    Slick.prototype.getOption = Slick.prototype.slickGetOption = function (option) {
        var _ = this;
        return _.options[option]
    };
    Slick.prototype.getNavigableIndexes = function () {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;
        if (_.options.infinite === !1) {
            max = _.slideCount
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2
        }
        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow
        }
        return indexes
    };
    Slick.prototype.getSlick = function () {
        return this
    };
    Slick.prototype.getSlideCount = function () {
        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;
        centerOffset = _.options.centerMode === !0 ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
        if (_.options.swipeToSlide === !0) {
            _.$slideTrack.find('.slick-slide').each(function (index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return !1
                }
            });
            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;
            return slidesTraversed
        } else {
            return _.options.slidesToScroll
        }
    };
    Slick.prototype.goTo = Slick.prototype.slickGoTo = function (slide, dontAnimate) {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate)
    };
    Slick.prototype.init = function (creation) {
        var _ = this;
        if (!$(_.$slider).hasClass('slick-initialized')) {
            $(_.$slider).addClass('slick-initialized');
            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(!0);
            _.focusHandler()
        }
        if (creation) {
            _.$slider.trigger('init', [_])
        }
        if (_.options.accessibility === !0) {
            _.initADA()
        }
        if (_.options.autoplay) {
            _.paused = !1;
            _.autoPlay()
        }
    };
    Slick.prototype.initADA = function () {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });
        _.$slideTrack.attr('role', 'listbox');
        _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function (i) {
            $(this).attr({
                'role': 'option',
                'aria-describedby': 'slick-slide' + _.instanceUid + i + ''
            })
        });
        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function (i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'slick-slide' + _.instanceUid + i + ''
                })
            }).first().attr('aria-selected', 'true').end().find('button').attr('role', 'button').end().closest('div').attr('role', 'toolbar')
        }
        _.activateADA()
    };
    Slick.prototype.initArrowEvents = function () {
        var _ = this;
        if (_.options.arrows === !0 && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.off('click.slick').on('click.slick', {
                message: 'previous'
            }, _.changeSlide);
            _.$nextArrow.off('click.slick').on('click.slick', {
                message: 'next'
            }, _.changeSlide)
        }
    };
    Slick.prototype.initDotEvents = function () {
        var _ = this;
        if (_.options.dots === !0 && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide)
        }
        if (_.options.dots === !0 && _.options.pauseOnDotsHover === !0) {
            $('li', _.$dots).on('mouseenter.slick', $.proxy(_.interrupt, _, !0)).on('mouseleave.slick', $.proxy(_.interrupt, _, !1))
        }
    };
    Slick.prototype.initSlideEvents = function () {
        var _ = this;
        if (_.options.pauseOnHover) {
            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, !0));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, !1))
        }
    };
    Slick.prototype.initializeEvents = function () {
        var _ = this;
        _.initArrowEvents();
        _.initDotEvents();
        _.initSlideEvents();
        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('click.slick', _.clickHandler);
        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
        if (_.options.accessibility === !0) {
            _.$list.on('keydown.slick', _.keyHandler)
        }
        if (_.options.focusOnSelect === !0) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler)
        }
        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));
        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));
        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(document).on('ready.slick.slick-' + _.instanceUid, _.setPosition)
    };
    Slick.prototype.initUI = function () {
        var _ = this;
        if (_.options.arrows === !0 && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show()
        }
        if (_.options.dots === !0 && _.slideCount > _.options.slidesToShow) {
            _.$dots.show()
        }
    };
    Slick.prototype.keyHandler = function (event) {
        var _ = this;
        if (!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === !0) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === !0 ? 'next' : 'previous'
                    }
                })
            } else if (event.keyCode === 39 && _.options.accessibility === !0) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === !0 ? 'previous' : 'next'
                    }
                })
            }
        }
    };
    Slick.prototype.lazyLoad = function () {
        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function () {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');
                imageToLoad.onload = function () {
                    image.animate({
                        opacity: 0
                    }, 100, function () {
                        image.attr('src', imageSource).animate({
                            opacity: 1
                        }, 200, function () {
                            image.removeAttr('data-lazy').removeClass('slick-loading')
                        });
                        _.$slider.trigger('lazyLoaded', [_, image, imageSource])
                    })
                };
                imageToLoad.onerror = function () {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');
                    _.$slider.trigger('lazyLoadError', [_, image, imageSource])
                };
                imageToLoad.src = imageSource
            })
        }
        if (_.options.centerMode === !0) {
            if (_.options.infinite === !0) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === !0) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++
            }
        }
        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);
        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange)
        } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange)
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange)
        }
    };
    Slick.prototype.loadSlider = function () {
        var _ = this;
        _.setPosition();
        _.$slideTrack.css({
            opacity: 1
        });
        _.$slider.removeClass('slick-loading');
        _.initUI();
        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad()
        }
    };
    Slick.prototype.next = Slick.prototype.slickNext = function () {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'next'
            }
        })
    };
    Slick.prototype.orientationChange = function () {
        var _ = this;
        _.checkResponsive();
        _.setPosition()
    };
    Slick.prototype.pause = Slick.prototype.slickPause = function () {
        var _ = this;
        _.autoPlayClear();
        _.paused = !0
    };
    Slick.prototype.play = Slick.prototype.slickPlay = function () {
        var _ = this;
        _.autoPlay();
        _.options.autoplay = !0;
        _.paused = !1;
        _.focussed = !1;
        _.interrupted = !1
    };
    Slick.prototype.postSlide = function (index) {
        var _ = this;
        if (!_.unslicked) {
            _.$slider.trigger('afterChange', [_, index]);
            _.animating = !1;
            _.setPosition();
            _.swipeLeft = null;
            if (_.options.autoplay) {
                _.autoPlay()
            }
            if (_.options.accessibility === !0) {
                _.initADA()
            }
        }
    };
    Slick.prototype.prev = Slick.prototype.slickPrev = function () {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'previous'
            }
        })
    };
    Slick.prototype.preventDefault = function (event) {
        event.preventDefault()
    };
    Slick.prototype.progressiveLazyLoad = function (tryCount) {
        tryCount = tryCount || 1;
        var _ = this,
            $imgsToLoad = $('img[data-lazy]', _.$slider),
            image, imageSource, imageToLoad;
        if ($imgsToLoad.length) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');
            imageToLoad.onload = function () {
                image.attr('src', imageSource).removeAttr('data-lazy').removeClass('slick-loading');
                if (_.options.adaptiveHeight === !0) {
                    _.setPosition()
                }
                _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                _.progressiveLazyLoad()
            };
            imageToLoad.onerror = function () {
                if (tryCount < 3) {
                    setTimeout(function () {
                        _.progressiveLazyLoad(tryCount + 1)
                    }, 500)
                } else {
                    image.removeAttr('data-lazy').removeClass('slick-loading').addClass('slick-lazyload-error');
                    _.$slider.trigger('lazyLoadError', [_, image, imageSource]);
                    _.progressiveLazyLoad()
                }
            };
            imageToLoad.src = imageSource
        } else {
            _.$slider.trigger('allImagesLoaded', [_])
        }
    };
    Slick.prototype.refresh = function (initializing) {
        var _ = this,
            currentSlide, lastVisibleIndex;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow;
        if (!_.options.infinite && (_.currentSlide > lastVisibleIndex)) {
            _.currentSlide = lastVisibleIndex
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0
        }
        currentSlide = _.currentSlide;
        _.destroy(!0);
        $.extend(_, _.initials, {
            currentSlide: currentSlide
        });
        _.init();
        if (!initializing) {
            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, !1)
        }
    };
    Slick.prototype.registerBreakpoints = function () {
        var _ = this,
            breakpoint, currentBreakpoint, l, responsiveSettings = _.options.responsive || null;
        if ($.type(responsiveSettings) === 'array' && responsiveSettings.length) {
            _.respondTo = _.options.respondTo || 'window';
            for (breakpoint in responsiveSettings) {
                l = _.breakpoints.length - 1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    while (l >= 0) {
                        if (_.breakpoints[l] && _.breakpoints[l] === currentBreakpoint) {
                            _.breakpoints.splice(l, 1)
                        }
                        l--
                    }
                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings
                }
            }
            _.breakpoints.sort(function (a, b) {
                return (_.options.mobileFirst) ? a - b : b - a
            })
        }
    };
    Slick.prototype.reinit = function () {
        var _ = this;
        _.$slides = _.$slideTrack.children(_.options.slide).addClass('slick-slide');
        _.slideCount = _.$slides.length;
        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0
        }
        _.registerBreakpoints();
        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();
        _.checkResponsive(!1, !0);
        if (_.options.focusOnSelect === !0) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler)
        }
        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
        _.setPosition();
        _.focusHandler();
        _.paused = !_.options.autoplay;
        _.autoPlay();
        _.$slider.trigger('reInit', [_])
    };
    Slick.prototype.resize = function () {
        var _ = this;
        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function () {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if (!_.unslicked) {
                    _.setPosition()
                }
            }, 50)
        }
    };
    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function (index, removeBefore, removeAll) {
        var _ = this;
        if (typeof (index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === !0 ? 0 : _.slideCount - 1
        } else {
            index = removeBefore === !0 ? --index : index
        }
        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return !1
        }
        _.unload();
        if (removeAll === !0) {
            _.$slideTrack.children().remove()
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove()
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slidesCache = _.$slides;
        _.reinit()
    };
    Slick.prototype.setCSS = function (position) {
        var _ = this,
            positionProps = {},
            x, y;
        if (_.options.rtl === !0) {
            position = -position
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
        positionProps[_.positionProp] = position;
        if (_.transformsEnabled === !1) {
            _.$slideTrack.css(positionProps)
        } else {
            positionProps = {};
            if (_.cssTransitions === !1) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps)
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps)
            }
        }
    };
    Slick.prototype.setDimensions = function () {
        var _ = this;
        if (_.options.vertical === !1) {
            if (_.options.centerMode === !0) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                })
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(!0) * _.options.slidesToShow);
            if (_.options.centerMode === !0) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                })
            }
        }
        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();
        if (_.options.vertical === !1 && _.options.variableWidth === !1) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)))
        } else if (_.options.variableWidth === !0) {
            _.$slideTrack.width(5000 * _.slideCount)
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(!0) * _.$slideTrack.children('.slick-slide').length)))
        }
        var offset = _.$slides.first().outerWidth(!0) - _.$slides.first().width();
        if (_.options.variableWidth === !1) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset)
    };
    Slick.prototype.setFade = function () {
        var _ = this,
            targetLeft;
        _.$slides.each(function (index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === !0) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                })
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                })
            }
        });
        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        })
    };
    Slick.prototype.setHeight = function () {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === !0 && _.options.vertical === !1) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
            _.$list.css('height', targetHeight)
        }
    };
    Slick.prototype.setOption = Slick.prototype.slickSetOption = function () {
        var _ = this,
            l, item, option, value, refresh = !1,
            type;
        if ($.type(arguments[0]) === 'object') {
            option = arguments[0];
            refresh = arguments[1];
            type = 'multiple'
        } else if ($.type(arguments[0]) === 'string') {
            option = arguments[0];
            value = arguments[1];
            refresh = arguments[2];
            if (arguments[0] === 'responsive' && $.type(arguments[1]) === 'array') {
                type = 'responsive'
            } else if (typeof arguments[1] !== 'undefined') {
                type = 'single'
            }
        }
        if (type === 'single') {
            _.options[option] = value
        } else if (type === 'multiple') {
            $.each(option, function (opt, val) {
                _.options[opt] = val
            })
        } else if (type === 'responsive') {
            for (item in value) {
                if ($.type(_.options.responsive) !== 'array') {
                    _.options.responsive = [value[item]]
                } else {
                    l = _.options.responsive.length - 1;
                    while (l >= 0) {
                        if (_.options.responsive[l].breakpoint === value[item].breakpoint) {
                            _.options.responsive.splice(l, 1)
                        }
                        l--
                    }
                    _.options.responsive.push(value[item])
                }
            }
        }
        if (refresh) {
            _.unload();
            _.reinit()
        }
    };
    Slick.prototype.setPosition = function () {
        var _ = this;
        _.setDimensions();
        _.setHeight();
        if (_.options.fade === !1) {
            _.setCSS(_.getLeft(_.currentSlide))
        } else {
            _.setFade()
        }
        _.$slider.trigger('setPosition', [_])
    };
    Slick.prototype.setProps = function () {
        var _ = this,
            bodyStyle = document.body.style;
        _.positionProp = _.options.vertical === !0 ? 'top' : 'left';
        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical')
        } else {
            _.$slider.removeClass('slick-vertical')
        }
        if (bodyStyle.WebkitTransition !== undefined || bodyStyle.MozTransition !== undefined || bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === !0) {
                _.cssTransitions = !0
            }
        }
        if (_.options.fade) {
            if (typeof _.options.zIndex === 'number') {
                if (_.options.zIndex < 3) {
                    _.options.zIndex = 3
                }
            } else {
                _.options.zIndex = _.defaults.zIndex
            }
        }
        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = !1
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = !1
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = !1
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = !1
        }
        if (bodyStyle.transform !== undefined && _.animType !== !1) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition'
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== !1)
    };
    Slick.prototype.setSlideClasses = function (index) {
        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;
        allSlides = _.$slider.find('.slick-slide').removeClass('slick-active slick-center slick-current').attr('aria-hidden', 'true');
        _.$slides.eq(index).addClass('slick-current');
        if (_.options.centerMode === !0) {
            centerOffset = Math.floor(_.options.slidesToShow / 2);
            if (_.options.infinite === !0) {
                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides.slice(index - centerOffset, index + centerOffset + 1).addClass('slick-active').attr('aria-hidden', 'false')
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides.slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2).addClass('slick-active').attr('aria-hidden', 'false')
                }
                if (index === 0) {
                    allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass('slick-center')
                } else if (index === _.slideCount - 1) {
                    allSlides.eq(_.options.slidesToShow).addClass('slick-center')
                }
            }
            _.$slides.eq(index).addClass('slick-center')
        } else {
            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
                _.$slides.slice(index, index + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false')
            } else if (allSlides.length <= _.options.slidesToShow) {
                allSlides.addClass('slick-active').attr('aria-hidden', 'false')
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === !0 ? _.options.slidesToShow + index : index;
                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass('slick-active').attr('aria-hidden', 'false')
                } else {
                    allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass('slick-active').attr('aria-hidden', 'false')
                }
            }
        }
        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad()
        }
    };
    Slick.prototype.setupInfinite = function () {
        var _ = this,
            i, slideIndex, infiniteCount;
        if (_.options.fade === !0) {
            _.options.centerMode = !1
        }
        if (_.options.infinite === !0 && _.options.fade === !1) {
            slideIndex = null;
            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === !0) {
                    infiniteCount = _.options.slidesToShow + 1
                } else {
                    infiniteCount = _.options.slidesToShow
                }
                for (i = _.slideCount; i > (_.slideCount - infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(!0).attr('id', '').attr('data-slick-index', slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass('slick-cloned')
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(!0).attr('id', '').attr('data-slick-index', slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass('slick-cloned')
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function () {
                    $(this).attr('id', '')
                })
            }
        }
    };
    Slick.prototype.interrupt = function (toggle) {
        var _ = this;
        if (!toggle) {
            _.autoPlay()
        }
        _.interrupted = toggle
    };
    Slick.prototype.selectHandler = function (event) {
        var _ = this;
        var targetElement = $(event.target).is('.slick-slide') ? $(event.target) : $(event.target).parents('.slick-slide');
        var index = parseInt(targetElement.attr('data-slick-index'));
        if (!index) index = 0;
        if (_.slideCount <= _.options.slidesToShow) {
            _.setSlideClasses(index);
            _.asNavFor(index);
            return
        }
        _.slideHandler(index)
    };
    Slick.prototype.slideHandler = function (index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this,
            navTarget;
        sync = sync || !1;
        if (_.animating === !0 && _.options.waitForAnimate === !0) {
            return
        }
        if (_.options.fade === !0 && _.currentSlide === index) {
            return
        }
        if (_.slideCount <= _.options.slidesToShow) {
            return
        }
        if (sync === !1) {
            _.asNavFor(index)
        }
        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);
        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
        if (_.options.infinite === !1 && _.options.centerMode === !1 && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === !1) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== !0) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide)
                    })
                } else {
                    _.postSlide(targetSlide)
                }
            }
            return
        } else if (_.options.infinite === !1 && _.options.centerMode === !0 && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === !1) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== !0) {
                    _.animateSlide(slideLeft, function () {
                        _.postSlide(targetSlide)
                    })
                } else {
                    _.postSlide(targetSlide)
                }
            }
            return
        }
        if (_.options.autoplay) {
            clearInterval(_.autoPlayTimer)
        }
        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll)
            } else {
                animSlide = _.slideCount + targetSlide
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0
            } else {
                animSlide = targetSlide - _.slideCount
            }
        } else {
            animSlide = targetSlide
        }
        _.animating = !0;
        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;
        _.setSlideClasses(_.currentSlide);
        if (_.options.asNavFor) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');
            if (navTarget.slideCount <= navTarget.options.slidesToShow) {
                navTarget.setSlideClasses(_.currentSlide)
            }
        }
        _.updateDots();
        _.updateArrows();
        if (_.options.fade === !0) {
            if (dontAnimate !== !0) {
                _.fadeSlideOut(oldSlide);
                _.fadeSlide(animSlide, function () {
                    _.postSlide(animSlide)
                })
            } else {
                _.postSlide(animSlide)
            }
            _.animateHeight();
            return
        }
        if (dontAnimate !== !0) {
            _.animateSlide(targetLeft, function () {
                _.postSlide(animSlide)
            })
        } else {
            _.postSlide(animSlide)
        }
    };
    Slick.prototype.startLoad = function () {
        var _ = this;
        if (_.options.arrows === !0 && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide()
        }
        if (_.options.dots === !0 && _.slideCount > _.options.slidesToShow) {
            _.$dots.hide()
        }
        _.$slider.addClass('slick-loading')
    };
    Slick.prototype.swipeDirection = function () {
        var xDist, yDist, r, swipeAngle, _ = this;
        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);
        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle)
        }
        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === !1 ? 'left' : 'right')
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === !1 ? 'left' : 'right')
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === !1 ? 'right' : 'left')
        }
        if (_.options.verticalSwiping === !0) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down'
            } else {
                return 'up'
            }
        }
        return 'vertical'
    };
    Slick.prototype.swipeEnd = function (event) {
        var _ = this,
            slideCount, direction;
        _.dragging = !1;
        _.interrupted = !1;
        _.shouldClick = (_.touchObject.swipeLength > 10) ? !1 : !0;
        if (_.touchObject.curX === undefined) {
            return !1
        }
        if (_.touchObject.edgeHit === !0) {
            _.$slider.trigger('edge', [_, _.swipeDirection()])
        }
        if (_.touchObject.swipeLength >= _.touchObject.minSwipe) {
            direction = _.swipeDirection();
            switch (direction) {
                case 'left':
                case 'down':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount();
                    _.currentDirection = 0;
                    break;
                case 'right':
                case 'up':
                    slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount();
                    _.currentDirection = 1;
                    break;
                default:
            }
            if (direction != 'vertical') {
                _.slideHandler(slideCount);
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction])
            }
        } else {
            if (_.touchObject.startX !== _.touchObject.curX) {
                _.slideHandler(_.currentSlide);
                _.touchObject = {}
            }
        }
    };
    Slick.prototype.swipeHandler = function (event) {
        var _ = this;
        if ((_.options.swipe === !1) || ('ontouchend' in document && _.options.swipe === !1)) {
            return
        } else if (_.options.draggable === !1 && event.type.indexOf('mouse') !== -1) {
            return
        }
        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ? event.originalEvent.touches.length : 1;
        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold;
        if (_.options.verticalSwiping === !0) {
            _.touchObject.minSwipe = _.listHeight / _.options.touchThreshold
        }
        switch (event.data.action) {
            case 'start':
                _.swipeStart(event);
                break;
            case 'move':
                _.swipeMove(event);
                break;
            case 'end':
                _.swipeEnd(event);
                break
        }
    };
    Slick.prototype.swipeMove = function (event) {
        var _ = this,
            edgeWasHit = !1,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;
        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
        if (!_.dragging || touches && touches.length !== 1) {
            return !1
        }
        curLeft = _.getLeft(_.currentSlide);
        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
        if (_.options.verticalSwiping === !0) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2)))
        }
        swipeDirection = _.swipeDirection();
        if (swipeDirection === 'vertical') {
            return
        }
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault()
        }
        positionOffset = (_.options.rtl === !1 ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === !0) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1
        }
        swipeLength = _.touchObject.swipeLength;
        _.touchObject.edgeHit = !1;
        if (_.options.infinite === !1) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = !0
            }
        }
        if (_.options.vertical === !1) {
            _.swipeLeft = curLeft + swipeLength * positionOffset
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset
        }
        if (_.options.verticalSwiping === !0) {
            _.swipeLeft = curLeft + swipeLength * positionOffset
        }
        if (_.options.fade === !0 || _.options.touchMove === !1) {
            return !1
        }
        if (_.animating === !0) {
            _.swipeLeft = null;
            return !1
        }
        _.setCSS(_.swipeLeft)
    };
    Slick.prototype.swipeStart = function (event) {
        var _ = this,
            touches;
        _.interrupted = !0;
        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return !1
        }
        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0]
        }
        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
        _.dragging = !0
    };
    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function () {
        var _ = this;
        if (_.$slidesCache !== null) {
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.appendTo(_.$slideTrack);
            _.reinit()
        }
    };
    Slick.prototype.unload = function () {
        var _ = this;
        $('.slick-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove()
        }
        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove()
        }
        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove()
        }
        _.$slides.removeClass('slick-slide slick-active slick-visible slick-current').attr('aria-hidden', 'true').css('width', '')
    };
    Slick.prototype.unslick = function (fromBreakpoint) {
        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy()
    };
    Slick.prototype.updateArrows = function () {
        var _ = this,
            centerOffset;
        centerOffset = Math.floor(_.options.slidesToShow / 2);
        if (_.options.arrows === !0 && _.slideCount > _.options.slidesToShow && !_.options.infinite) {
            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false')
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === !1) {
                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false')
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === !0) {
                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false')
            }
        }
    };
    Slick.prototype.updateDots = function () {
        var _ = this;
        if (_.$dots !== null) {
            _.$dots.find('li').removeClass('slick-active').attr('aria-hidden', 'true');
            _.$dots.find('li').eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass('slick-active').attr('aria-hidden', 'false')
        }
    };
    Slick.prototype.visibility = function () {
        var _ = this;
        if (_.options.autoplay) {
            if (document[_.hidden]) {
                _.interrupted = !0
            } else {
                _.interrupted = !1
            }
        }
    };
    $.fn.slick = function () {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i, ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret
        }
        return _
    }
})); /*! This file is auto-generated */
/*!
 * imagesLoaded PACKAGED v4.1.4
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
! function (e, t) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? module.exports = t() : e.EvEmitter = t()
}("undefined" != typeof window ? window : this, function () {
    function e() {}
    var t = e.prototype;
    return t.on = function (e, t) {
        if (e && t) {
            var i = this._events = this._events || {},
                n = i[e] = i[e] || [];
            return n.indexOf(t) == -1 && n.push(t), this
        }
    }, t.once = function (e, t) {
        if (e && t) {
            this.on(e, t);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[e] = i[e] || {};
            return n[t] = !0, this
        }
    }, t.off = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            var n = i.indexOf(t);
            return n != -1 && i.splice(n, 1), this
        }
    }, t.emitEvent = function (e, t) {
        var i = this._events && this._events[e];
        if (i && i.length) {
            i = i.slice(0), t = t || [];
            for (var n = this._onceEvents && this._onceEvents[e], o = 0; o < i.length; o++) {
                var r = i[o],
                    s = n && n[r];
                s && (this.off(e, r), delete n[r]), r.apply(this, t)
            }
            return this
        }
    }, t.allOff = function () {
        delete this._events, delete this._onceEvents
    }, e
}),
function (e, t) {
    "use strict";
    "function" == typeof define && define.amd ? define(["ev-emitter/ev-emitter"], function (i) {
        return t(e, i)
    }) : "object" == typeof module && module.exports ? module.exports = t(e, require("ev-emitter")) : e.imagesLoaded = t(e, e.EvEmitter)
}("undefined" != typeof window ? window : this, function (e, t) {
    function i(e, t) {
        for (var i in t) e[i] = t[i];
        return e
    }

    function n(e) {
        if (Array.isArray(e)) return e;
        var t = "object" == typeof e && "number" == typeof e.length;
        return t ? d.call(e) : [e]
    }

    function o(e, t, r) {
        if (!(this instanceof o)) return new o(e, t, r);
        var s = e;
        return "string" == typeof e && (s = document.querySelectorAll(e)), s ? (this.elements = n(s), this.options = i({}, this.options), "function" == typeof t ? r = t : i(this.options, t), r && this.on("always", r), this.getImages(), h && (this.jqDeferred = new h.Deferred), void setTimeout(this.check.bind(this))) : void a.error("Bad element for imagesLoaded " + (s || e))
    }

    function r(e) {
        this.img = e
    }

    function s(e, t) {
        this.url = e, this.element = t, this.img = new Image
    }
    var h = e.jQuery,
        a = e.console,
        d = Array.prototype.slice;
    o.prototype = Object.create(t.prototype), o.prototype.options = {}, o.prototype.getImages = function () {
        this.images = [], this.elements.forEach(this.addElementImages, this)
    }, o.prototype.addElementImages = function (e) {
        "IMG" == e.nodeName && this.addImage(e), this.options.background === !0 && this.addElementBackgroundImages(e);
        var t = e.nodeType;
        if (t && u[t]) {
            for (var i = e.querySelectorAll("img"), n = 0; n < i.length; n++) {
                var o = i[n];
                this.addImage(o)
            }
            if ("string" == typeof this.options.background) {
                var r = e.querySelectorAll(this.options.background);
                for (n = 0; n < r.length; n++) {
                    var s = r[n];
                    this.addElementBackgroundImages(s)
                }
            }
        }
    };
    var u = {
        1: !0,
        9: !0,
        11: !0
    };
    return o.prototype.addElementBackgroundImages = function (e) {
        var t = getComputedStyle(e);
        if (t)
            for (var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(t.backgroundImage); null !== n;) {
                var o = n && n[2];
                o && this.addBackground(o, e), n = i.exec(t.backgroundImage)
            }
    }, o.prototype.addImage = function (e) {
        var t = new r(e);
        this.images.push(t)
    }, o.prototype.addBackground = function (e, t) {
        var i = new s(e, t);
        this.images.push(i)
    }, o.prototype.check = function () {
        function e(e, i, n) {
            setTimeout(function () {
                t.progress(e, i, n)
            })
        }
        var t = this;
        return this.progressedCount = 0, this.hasAnyBroken = !1, this.images.length ? void this.images.forEach(function (t) {
            t.once("progress", e), t.check()
        }) : void this.complete()
    }, o.prototype.progress = function (e, t, i) {
        this.progressedCount++, this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded, this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && a && a.log("progress: " + i, e, t)
    }, o.prototype.complete = function () {
        var e = this.hasAnyBroken ? "fail" : "done";
        if (this.isComplete = !0, this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred) {
            var t = this.hasAnyBroken ? "reject" : "resolve";
            this.jqDeferred[t](this)
        }
    }, r.prototype = Object.create(t.prototype), r.prototype.check = function () {
        var e = this.getIsImageComplete();
        return e ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : (this.proxyImage = new Image, this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void(this.proxyImage.src = this.img.src))
    }, r.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth
    }, r.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.img, t])
    }, r.prototype.handleEvent = function (e) {
        var t = "on" + e.type;
        this[t] && this[t](e)
    }, r.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents()
    }, r.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents()
    }, r.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype = Object.create(r.prototype), s.prototype.check = function () {
        this.img.addEventListener("load", this), this.img.addEventListener("error", this), this.img.src = this.url;
        var e = this.getIsImageComplete();
        e && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents())
    }, s.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this), this.img.removeEventListener("error", this)
    }, s.prototype.confirm = function (e, t) {
        this.isLoaded = e, this.emitEvent("progress", [this, this.element, t])
    }, o.makeJQueryPlugin = function (t) {
        t = t || e.jQuery, t && (h = t, h.fn.imagesLoaded = function (e, t) {
            var i = new o(this, e, t);
            return i.jqDeferred.promise(h(this))
        })
    }, o.makeJQueryPlugin(), o
}); /*! This file is auto-generated */
/*!
 * Masonry PACKAGED v4.2.2
 * Cascading grid layout library
 * https://masonry.desandro.com
 * MIT License
 * by David DeSandro
 */
! function (t, e) {
    "function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function (t, e) {
    "use strict";

    function i(i, r, a) {
        function h(t, e, n) {
            var o, r = "$()." + i + '("' + e + '")';
            return t.each(function (t, h) {
                var u = a.data(h, i);
                if (!u) return void s(i + " not initialized. Cannot call methods, i.e. " + r);
                var d = u[e];
                if (!d || "_" == e.charAt(0)) return void s(r + " is not a valid method");
                var l = d.apply(u, n);
                o = void 0 === o ? l : o
            }), void 0 !== o ? o : t
        }

        function u(t, e) {
            t.each(function (t, n) {
                var o = a.data(n, i);
                o ? (o.option(e), o._init()) : (o = new r(n, e), a.data(n, i, o))
            })
        }
        a = a || e || t.jQuery, a && (r.prototype.option || (r.prototype.option = function (t) {
            a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
        }), a.fn[i] = function (t) {
            if ("string" == typeof t) {
                var e = o.call(arguments, 1);
                return h(this, t, e)
            }
            return u(this, t), this
        }, n(a))
    }

    function n(t) {
        !t || t && t.bridget || (t.bridget = i)
    }
    var o = Array.prototype.slice,
        r = t.console,
        s = "undefined" == typeof r ? function () {} : function (t) {
            r.error(t)
        };
    return n(e || t.jQuery), i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return e.on = function (t, e) {
        if (t && e) {
            var i = this._events = this._events || {},
                n = i[t] = i[t] || [];
            return -1 == n.indexOf(e) && n.push(e), this
        }
    }, e.once = function (t, e) {
        if (t && e) {
            this.on(t, e);
            var i = this._onceEvents = this._onceEvents || {},
                n = i[t] = i[t] || {};
            return n[e] = !0, this
        }
    }, e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            var n = i.indexOf(e);
            return -1 != n && i.splice(n, 1), this
        }
    }, e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
            i = i.slice(0), e = e || [];
            for (var n = this._onceEvents && this._onceEvents[t], o = 0; o < i.length; o++) {
                var r = i[o],
                    s = n && n[r];
                s && (this.off(t, r), delete n[r]), r.apply(this, e)
            }
            return this
        }
    }, e.allOff = function () {
        delete this._events, delete this._onceEvents
    }, t
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function () {
    "use strict";

    function t(t) {
        var e = parseFloat(t),
            i = -1 == t.indexOf("%") && !isNaN(e);
        return i && e
    }

    function e() {}

    function i() {
        for (var t = {
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                outerWidth: 0,
                outerHeight: 0
            }, e = 0; u > e; e++) {
            var i = h[e];
            t[i] = 0
        }
        return t
    }

    function n(t) {
        var e = getComputedStyle(t);
        return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
    }

    function o() {
        if (!d) {
            d = !0;
            var e = document.createElement("div");
            e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
            var i = document.body || document.documentElement;
            i.appendChild(e);
            var o = n(e);
            s = 200 == Math.round(t(o.width)), r.isBoxSizeOuter = s, i.removeChild(e)
        }
    }

    function r(e) {
        if (o(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
            var r = n(e);
            if ("none" == r.display) return i();
            var a = {};
            a.width = e.offsetWidth, a.height = e.offsetHeight;
            for (var d = a.isBorderBox = "border-box" == r.boxSizing, l = 0; u > l; l++) {
                var c = h[l],
                    f = r[c],
                    m = parseFloat(f);
                a[c] = isNaN(m) ? 0 : m
            }
            var p = a.paddingLeft + a.paddingRight,
                g = a.paddingTop + a.paddingBottom,
                y = a.marginLeft + a.marginRight,
                v = a.marginTop + a.marginBottom,
                _ = a.borderLeftWidth + a.borderRightWidth,
                z = a.borderTopWidth + a.borderBottomWidth,
                E = d && s,
                b = t(r.width);
            b !== !1 && (a.width = b + (E ? 0 : p + _));
            var x = t(r.height);
            return x !== !1 && (a.height = x + (E ? 0 : g + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (g + z), a.outerWidth = a.width + y, a.outerHeight = a.height + v, a
        }
    }
    var s, a = "undefined" == typeof console ? e : function (t) {
            console.error(t)
        },
        h = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
        u = h.length,
        d = !1;
    return r
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function () {
    "use strict";
    var t = function () {
        var t = window.Element.prototype;
        if (t.matches) return "matches";
        if (t.matchesSelector) return "matchesSelector";
        for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
            var n = e[i],
                o = n + "MatchesSelector";
            if (t[o]) return o
        }
    }();
    return function (e, i) {
        return e[t](i)
    }
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function (i) {
        return e(t, i)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function (t, e) {
    var i = {};
    i.extend = function (t, e) {
        for (var i in e) t[i] = e[i];
        return t
    }, i.modulo = function (t, e) {
        return (t % e + e) % e
    };
    var n = Array.prototype.slice;
    i.makeArray = function (t) {
        if (Array.isArray(t)) return t;
        if (null === t || void 0 === t) return [];
        var e = "object" == typeof t && "number" == typeof t.length;
        return e ? n.call(t) : [t]
    }, i.removeFrom = function (t, e) {
        var i = t.indexOf(e); - 1 != i && t.splice(i, 1)
    }, i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body;)
            if (t = t.parentNode, e(t, i)) return t
    }, i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t
    }, i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return t.forEach(function (t) {
            if (t instanceof HTMLElement) {
                if (!n) return void o.push(t);
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), r = 0; r < i.length; r++) o.push(i[r])
            }
        }), o
    }, i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
            o = e + "Timeout";
        t.prototype[e] = function () {
            var t = this[o];
            clearTimeout(t);
            var e = arguments,
                r = this;
            this[o] = setTimeout(function () {
                n.apply(r, e), delete r[o]
            }, i)
        }
    }, i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
    }, i.toDashed = function (t) {
        return t.replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i
        }).toLowerCase()
    };
    var o = t.console;
    return i.htmlInit = function (e, n) {
        i.docReady(function () {
            var r = i.toDashed(n),
                s = "data-" + r,
                a = document.querySelectorAll("[" + s + "]"),
                h = document.querySelectorAll(".js-" + r),
                u = i.makeArray(a).concat(i.makeArray(h)),
                d = s + "-options",
                l = t.jQuery;
            u.forEach(function (t) {
                var i, r = t.getAttribute(s) || t.getAttribute(d);
                try {
                    i = r && JSON.parse(r)
                } catch (a) {
                    return void(o && o.error("Error parsing " + s + " on " + t.className + ": " + a))
                }
                var h = new e(t, i);
                l && l.data(t, n, h)
            })
        })
    }, i
}),
function (t, e) {
    "function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function (t, e) {
    "use strict";

    function i(t) {
        for (var e in t) return !1;
        return e = null, !0
    }

    function n(t, e) {
        t && (this.element = t, this.layout = e, this.position = {
            x: 0,
            y: 0
        }, this._create())
    }

    function o(t) {
        return t.replace(/([A-Z])/g, function (t) {
            return "-" + t.toLowerCase()
        })
    }
    var r = document.documentElement.style,
        s = "string" == typeof r.transition ? "transition" : "WebkitTransition",
        a = "string" == typeof r.transform ? "transform" : "WebkitTransform",
        h = {
            WebkitTransition: "webkitTransitionEnd",
            transition: "transitionend"
        } [s],
        u = {
            transform: a,
            transition: s,
            transitionDuration: s + "Duration",
            transitionProperty: s + "Property",
            transitionDelay: s + "Delay"
        },
        d = n.prototype = Object.create(t.prototype);
    d.constructor = n, d._create = function () {
        this._transn = {
            ingProperties: {},
            clean: {},
            onEnd: {}
        }, this.css({
            position: "absolute"
        })
    }, d.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t)
    }, d.getSize = function () {
        this.size = e(this.element)
    }, d.css = function (t) {
        var e = this.element.style;
        for (var i in t) {
            var n = u[i] || i;
            e[n] = t[i]
        }
    }, d.getPosition = function () {
        var t = getComputedStyle(this.element),
            e = this.layout._getOption("originLeft"),
            i = this.layout._getOption("originTop"),
            n = t[e ? "left" : "right"],
            o = t[i ? "top" : "bottom"],
            r = parseFloat(n),
            s = parseFloat(o),
            a = this.layout.size; - 1 != n.indexOf("%") && (r = r / 100 * a.width), -1 != o.indexOf("%") && (s = s / 100 * a.height), r = isNaN(r) ? 0 : r, s = isNaN(s) ? 0 : s, r -= e ? a.paddingLeft : a.paddingRight, s -= i ? a.paddingTop : a.paddingBottom, this.position.x = r, this.position.y = s
    }, d.layoutPosition = function () {
        var t = this.layout.size,
            e = {},
            i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop"),
            o = i ? "paddingLeft" : "paddingRight",
            r = i ? "left" : "right",
            s = i ? "right" : "left",
            a = this.position.x + t[o];
        e[r] = this.getXValue(a), e[s] = "";
        var h = n ? "paddingTop" : "paddingBottom",
            u = n ? "top" : "bottom",
            d = n ? "bottom" : "top",
            l = this.position.y + t[h];
        e[u] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
    }, d.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
    }, d.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
    }, d._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
            n = this.position.y,
            o = t == this.position.x && e == this.position.y;
        if (this.setPosition(t, e), o && !this.isTransitioning) return void this.layoutPosition();
        var r = t - i,
            s = e - n,
            a = {};
        a.transform = this.getTranslate(r, s), this.transition({
            to: a,
            onTransitionEnd: {
                transform: this.layoutPosition
            },
            isCleaning: !0
        })
    }, d.getTranslate = function (t, e) {
        var i = this.layout._getOption("originLeft"),
            n = this.layout._getOption("originTop");
        return t = i ? t : -t, e = n ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
    }, d.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition()
    }, d.moveTo = d._transitionTo, d.setPosition = function (t, e) {
        this.position.x = parseFloat(t), this.position.y = parseFloat(e)
    }, d._nonTransition = function (t) {
        this.css(t.to), t.isCleaning && this._removeStyles(t.to);
        for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
    }, d.transition = function (t) {
        if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
        var e = this._transn;
        for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
        for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
        if (t.from) {
            this.css(t.from);
            var n = this.element.offsetHeight;
            n = null
        }
        this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
    };
    var l = "opacity," + o(a);
    d.enableTransition = function () {
        if (!this.isTransitioning) {
            var t = this.layout.options.transitionDuration;
            t = "number" == typeof t ? t + "ms" : t, this.css({
                transitionProperty: l,
                transitionDuration: t,
                transitionDelay: this.staggerDelay || 0
            }), this.element.addEventListener(h, this, !1)
        }
    }, d.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t)
    }, d.onotransitionend = function (t) {
        this.ontransitionend(t)
    };
    var c = {
        "-webkit-transform": "transform"
    };
    d.ontransitionend = function (t) {
        if (t.target === this.element) {
            var e = this._transn,
                n = c[t.propertyName] || t.propertyName;
            if (delete e.ingProperties[n], i(e.ingProperties) && this.disableTransition(), n in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[n]), n in e.onEnd) {
                var o = e.onEnd[n];
                o.call(this), delete e.onEnd[n]
            }
            this.emitEvent("transitionEnd", [this])
        }
    }, d.disableTransition = function () {
        this.removeTransitionStyles(), this.element.removeEventListener(h, this, !1), this.isTransitioning = !1
    }, d._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e)
    };
    var f = {
        transitionProperty: "",
        transitionDuration: "",
        transitionDelay: ""
    };
    return d.removeTransitionStyles = function () {
        this.css(f)
    }, d.stagger = function (t) {
        t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
    }, d.removeElem = function () {
        this.element.parentNode.removeChild(this.element), this.css({
            display: ""
        }), this.emitEvent("remove", [this])
    }, d.remove = function () {
        return s && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function () {
            this.removeElem()
        }), void this.hide()) : void this.removeElem()
    }, d.reveal = function () {
        delete this.isHidden, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("visibleStyle");
        e[i] = this.onRevealTransitionEnd, this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal")
    }, d.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i
    }, d.hide = function () {
        this.isHidden = !0, this.css({
            display: ""
        });
        var t = this.layout.options,
            e = {},
            i = this.getHideRevealTransitionEndProperty("hiddenStyle");
        e[i] = this.onHideTransitionEnd, this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e
        })
    }, d.onHideTransitionEnd = function () {
        this.isHidden && (this.css({
            display: "none"
        }), this.emitEvent("hide"))
    }, d.destroy = function () {
        this.css({
            position: "",
            left: "",
            right: "",
            top: "",
            bottom: "",
            transition: "",
            transform: ""
        })
    }, n
}),
function (t, e) {
    "use strict";
    "function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function (i, n, o, r) {
        return e(t, i, n, o, r)
    }) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function (t, e, i, n, o) {
    "use strict";

    function r(t, e) {
        var i = n.getQueryElement(t);
        if (!i) return void(h && h.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
        this.element = i, u && (this.$element = u(this.element)), this.options = n.extend({}, this.constructor.defaults), this.option(e);
        var o = ++l;
        this.element.outlayerGUID = o, c[o] = this, this._create();
        var r = this._getOption("initLayout");
        r && this.layout()
    }

    function s(t) {
        function e() {
            t.apply(this, arguments)
        }
        return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
    }

    function a(t) {
        if ("number" == typeof t) return t;
        var e = t.match(/(^\d*\.?\d*)(\w*)/),
            i = e && e[1],
            n = e && e[2];
        if (!i.length) return 0;
        i = parseFloat(i);
        var o = m[n] || 1;
        return i * o
    }
    var h = t.console,
        u = t.jQuery,
        d = function () {},
        l = 0,
        c = {};
    r.namespace = "outlayer", r.Item = o, r.defaults = {
        containerStyle: {
            position: "relative"
        },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: {
            opacity: 0,
            transform: "scale(0.001)"
        },
        visibleStyle: {
            opacity: 1,
            transform: "scale(1)"
        }
    };
    var f = r.prototype;
    n.extend(f, e.prototype), f.option = function (t) {
        n.extend(this.options, t)
    }, f._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
    }, r.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer"
    }, f._create = function () {
        this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), n.extend(this.element.style, this.options.containerStyle);
        var t = this._getOption("resize");
        t && this.bindResize()
    }, f.reloadItems = function () {
        this.items = this._itemize(this.element.children)
    }, f._itemize = function (t) {
        for (var e = this._filterFindItemElements(t), i = this.constructor.Item, n = [], o = 0; o < e.length; o++) {
            var r = e[o],
                s = new i(r, this);
            n.push(s)
        }
        return n
    }, f._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector)
    }, f.getItemElements = function () {
        return this.items.map(function (t) {
            return t.element
        })
    }, f.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
            e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), this._isLayoutInited = !0
    }, f._init = f.layout, f._resetLayout = function () {
        this.getSize()
    }, f.getSize = function () {
        this.size = i(this.element)
    }, f._getMeasurement = function (t, e) {
        var n, o = this.options[t];
        o ? ("string" == typeof o ? n = this.element.querySelector(o) : o instanceof HTMLElement && (n = o), this[t] = n ? i(n)[e] : o) : this[t] = 0
    }, f.layoutItems = function (t, e) {
        t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
    }, f._getItemsForLayout = function (t) {
        return t.filter(function (t) {
            return !t.isIgnored
        })
    }, f._layoutItems = function (t, e) {
        if (this._emitCompleteOnItems("layout", t), t && t.length) {
            var i = [];
            t.forEach(function (t) {
                var n = this._getItemLayoutPosition(t);
                n.item = t, n.isInstant = e || t.isLayoutInstant, i.push(n)
            }, this), this._processLayoutQueue(i)
        }
    }, f._getItemLayoutPosition = function () {
        return {
            x: 0,
            y: 0
        }
    }, f._processLayoutQueue = function (t) {
        this.updateStagger(), t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e)
        }, this)
    }, f.updateStagger = function () {
        var t = this.options.stagger;
        return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
    }, f._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i))
    }, f._postLayout = function () {
        this.resizeContainer()
    }, f.resizeContainer = function () {
        var t = this._getOption("resizeContainer");
        if (t) {
            var e = this._getContainerSize();
            e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
        }
    }, f._getContainerSize = d, f._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
            var i = this.size;
            i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
        }
    }, f._emitCompleteOnItems = function (t, e) {
        function i() {
            o.dispatchEvent(t + "Complete", null, [e])
        }

        function n() {
            s++, s == r && i()
        }
        var o = this,
            r = e.length;
        if (!e || !r) return void i();
        var s = 0;
        e.forEach(function (e) {
            e.once(t, n)
        })
    }, f.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if (this.emitEvent(t, n), u)
            if (this.$element = this.$element || u(this.element), e) {
                var o = u.Event(e);
                o.type = t, this.$element.trigger(o, i)
            } else this.$element.trigger(t, i)
    }, f.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0)
    }, f.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored
    }, f.stamp = function (t) {
        t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
    }, f.unstamp = function (t) {
        t = this._find(t), t && t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t)
        }, this)
    }, f._find = function (t) {
        return t ? ("string" == typeof t && (t = this.element.querySelectorAll(t)), t = n.makeArray(t)) : void 0
    }, f._manageStamps = function () {
        this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
    }, f._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
            e = this.size;
        this._boundingRect = {
            left: t.left + e.paddingLeft + e.borderLeftWidth,
            top: t.top + e.paddingTop + e.borderTopWidth,
            right: t.right - (e.paddingRight + e.borderRightWidth),
            bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
        }
    }, f._manageStamp = d, f._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
            n = this._boundingRect,
            o = i(t),
            r = {
                left: e.left - n.left - o.marginLeft,
                top: e.top - n.top - o.marginTop,
                right: n.right - e.right - o.marginRight,
                bottom: n.bottom - e.bottom - o.marginBottom
            };
        return r
    }, f.handleEvent = n.handleEvent, f.bindResize = function () {
        t.addEventListener("resize", this), this.isResizeBound = !0
    }, f.unbindResize = function () {
        t.removeEventListener("resize", this), this.isResizeBound = !1
    }, f.onresize = function () {
        this.resize()
    }, n.debounceMethod(r, "onresize", 100), f.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout()
    }, f.needsResizeLayout = function () {
        var t = i(this.element),
            e = this.size && t;
        return e && t.innerWidth !== this.size.innerWidth
    }, f.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e
    }, f.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e))
    }, f.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
            var i = this.items.slice(0);
            this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
        }
    }, f.reveal = function (t) {
        if (this._emitCompleteOnItems("reveal", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.reveal()
            })
        }
    }, f.hide = function (t) {
        if (this._emitCompleteOnItems("hide", t), t && t.length) {
            var e = this.updateStagger();
            t.forEach(function (t, i) {
                t.stagger(i * e), t.hide()
            })
        }
    }, f.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e)
    }, f.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e)
    }, f.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
            var i = this.items[e];
            if (i.element == t) return i
        }
    }, f.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i)
        }, this), e
    }, f.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function (t) {
            t.remove(), n.removeFrom(this.items, t)
        }, this)
    }, f.destroy = function () {
        var t = this.element.style;
        t.height = "", t.position = "", t.width = "", this.items.forEach(function (t) {
            t.destroy()
        }), this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e], delete this.element.outlayerGUID, u && u.removeData(this.element, this.constructor.namespace)
    }, r.data = function (t) {
        t = n.getQueryElement(t);
        var e = t && t.outlayerGUID;
        return e && c[e]
    }, r.create = function (t, e) {
        var i = s(r);
        return i.defaults = n.extend({}, r.defaults), n.extend(i.defaults, e), i.compatOptions = n.extend({}, r.compatOptions), i.namespace = t, i.data = r.data, i.Item = s(o), n.htmlInit(i, t), u && u.bridget && u.bridget(t, i), i
    };
    var m = {
        ms: 1,
        s: 1e3
    };
    return r.Item = o, r
}),
function (t, e) {
    "function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return n._resetLayout = function () {
        this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        this.maxY = 0, this.horizontalColIndex = 0
    }, n.measureColumns = function () {
        if (this.getContainerWidth(), !this.columnWidth) {
            var t = this.items[0],
                i = t && t.element;
            this.columnWidth = i && e(i).outerWidth || this.containerWidth
        }
        var n = this.columnWidth += this.gutter,
            o = this.containerWidth + this.gutter,
            r = o / n,
            s = n - o % n,
            a = s && 1 > s ? "round" : "floor";
        r = Math[a](r), this.cols = Math.max(r, 1)
    }, n.getContainerWidth = function () {
        var t = this._getOption("fitWidth"),
            i = t ? this.element.parentNode : this.element,
            n = e(i);
        this.containerWidth = n && n.innerWidth
    }, n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
            i = e && 1 > e ? "round" : "ceil",
            n = Math[i](t.size.outerWidth / this.columnWidth);
        n = Math.min(n, this.cols);
        for (var o = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", r = this[o](n, t), s = {
                x: this.columnWidth * r.col,
                y: r.y
            }, a = r.y + t.size.outerHeight, h = n + r.col, u = r.col; h > u; u++) this.colYs[u] = a;
        return s
    }, n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
            i = Math.min.apply(Math, e);
        return {
            col: e.indexOf(i),
            y: i
        }
    }, n._getTopColGroup = function (t) {
        if (2 > t) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; i > n; n++) e[n] = this._getColGroupY(n, t);
        return e
    }, n._getColGroupY = function (t, e) {
        if (2 > e) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i)
    }, n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols,
            n = t > 1 && i + t > this.cols;
        i = n ? 0 : i;
        var o = e.size.outerWidth && e.size.outerHeight;
        return this.horizontalColIndex = o ? i + t : this.horizontalColIndex, {
            col: i,
            y: this._getColGroupY(i, t)
        }
    }, n._manageStamp = function (t) {
        var i = e(t),
            n = this._getElementOffset(t),
            o = this._getOption("originLeft"),
            r = o ? n.left : n.right,
            s = r + i.outerWidth,
            a = Math.floor(r / this.columnWidth);
        a = Math.max(0, a);
        var h = Math.floor(s / this.columnWidth);
        h -= s % this.columnWidth ? 0 : 1, h = Math.min(this.cols - 1, h);
        for (var u = this._getOption("originTop"), d = (u ? n.top : n.bottom) + i.outerHeight, l = a; h >= l; l++) this.colYs[l] = Math.max(d, this.colYs[l])
    }, n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = {
            height: this.maxY
        };
        return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
    }, n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
        return (this.cols - t) * this.columnWidth - this.gutter
    }, n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth
    }, i
});
var thickboxL10n = {
    "next": "Next >",
    "prev": "< Prev",
    "image": "Image",
    "of": "of",
    "close": "Close",
    "noiframes": "This feature requires inline frames. You have iframes disabled or your browser does not support them.",
    "loadingAnimation": "https:\/\/testina.tkdemos.co\/wp-includes\/js\/thickbox\/loadingAnimation.gif"
};
if (typeof tb_pathToImage != 'string') {
    var tb_pathToImage = thickboxL10n.loadingAnimation
}
/*!!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/
jQuery(document).ready(function () {
    tb_init('a.thickbox, area.thickbox, input.thickbox');
    imgLoader = new Image();
    imgLoader.src = tb_pathToImage
});

function tb_init(domChunk) {
    jQuery('body').on('click', domChunk, tb_click).on('thickbox:iframe:loaded', function () {
        jQuery('#TB_window').removeClass('thickbox-loading')
    })
}

function tb_click() {
    var t = this.title || this.name || null;
    var a = this.href || this.alt;
    var g = this.rel || !1;
    tb_show(t, a, g);
    this.blur();
    return !1
}

function tb_show(caption, url, imageGroup) {
    var $closeBtn;
    try {
        if (typeof document.body.style.maxHeight === "undefined") {
            jQuery("body", "html").css({
                height: "100%",
                width: "100%"
            });
            jQuery("html").css("overflow", "hidden");
            if (document.getElementById("TB_HideSelect") === null) {
                jQuery("body").append("<iframe id='TB_HideSelect'>" + thickboxL10n.noiframes + "</iframe><div id='TB_overlay'></div><div id='TB_window' class='thickbox-loading'></div>");
                jQuery("#TB_overlay").click(tb_remove)
            }
        } else {
            if (document.getElementById("TB_overlay") === null) {
                jQuery("body").append("<div id='TB_overlay'></div><div id='TB_window' class='thickbox-loading'></div>");
                jQuery("#TB_overlay").click(tb_remove);
                jQuery('body').addClass('modal-open')
            }
        }
        if (tb_detectMacXFF()) {
            jQuery("#TB_overlay").addClass("TB_overlayMacFFBGHack")
        } else {
            jQuery("#TB_overlay").addClass("TB_overlayBG")
        }
        if (caption === null) {
            caption = ""
        }
        jQuery("body").append("<div id='TB_load'><img src='" + imgLoader.src + "' width='208' /></div>");
        jQuery('#TB_load').show();
        var baseURL;
        if (url.indexOf("?") !== -1) {
            baseURL = url.substr(0, url.indexOf("?"))
        } else {
            baseURL = url
        }
        var urlString = /\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/;
        var urlType = baseURL.toLowerCase().match(urlString);
        if (urlType == '.jpg' || urlType == '.jpeg' || urlType == '.png' || urlType == '.gif' || urlType == '.bmp') {
            TB_PrevCaption = "";
            TB_PrevURL = "";
            TB_PrevHTML = "";
            TB_NextCaption = "";
            TB_NextURL = "";
            TB_NextHTML = "";
            TB_imageCount = "";
            TB_FoundURL = !1;
            if (imageGroup) {
                TB_TempArray = jQuery("a[rel=" + imageGroup + "]").get();
                for (TB_Counter = 0;
                    ((TB_Counter < TB_TempArray.length) && (TB_NextHTML === "")); TB_Counter++) {
                    var urlTypeTemp = TB_TempArray[TB_Counter].href.toLowerCase().match(urlString);
                    if (!(TB_TempArray[TB_Counter].href == url)) {
                        if (TB_FoundURL) {
                            TB_NextCaption = TB_TempArray[TB_Counter].title;
                            TB_NextURL = TB_TempArray[TB_Counter].href;
                            TB_NextHTML = "<span id='TB_next'>&nbsp;&nbsp;<a href='#'>" + thickboxL10n.next + "</a></span>"
                        } else {
                            TB_PrevCaption = TB_TempArray[TB_Counter].title;
                            TB_PrevURL = TB_TempArray[TB_Counter].href;
                            TB_PrevHTML = "<span id='TB_prev'>&nbsp;&nbsp;<a href='#'>" + thickboxL10n.prev + "</a></span>"
                        }
                    } else {
                        TB_FoundURL = !0;
                        TB_imageCount = thickboxL10n.image + ' ' + (TB_Counter + 1) + ' ' + thickboxL10n.of + ' ' + (TB_TempArray.length)
                    }
                }
            }
            imgPreloader = new Image();
            imgPreloader.onload = function () {
                imgPreloader.onload = null;
                var pagesize = tb_getPageSize();
                var x = pagesize[0] - 150;
                var y = pagesize[1] - 150;
                var imageWidth = imgPreloader.width;
                var imageHeight = imgPreloader.height;
                if (imageWidth > x) {
                    imageHeight = imageHeight * (x / imageWidth);
                    imageWidth = x;
                    if (imageHeight > y) {
                        imageWidth = imageWidth * (y / imageHeight);
                        imageHeight = y
                    }
                } else if (imageHeight > y) {
                    imageWidth = imageWidth * (y / imageHeight);
                    imageHeight = y;
                    if (imageWidth > x) {
                        imageHeight = imageHeight * (x / imageWidth);
                        imageWidth = x
                    }
                }
                TB_WIDTH = imageWidth + 30;
                TB_HEIGHT = imageHeight + 60;
                jQuery("#TB_window").append("<a href='' id='TB_ImageOff'><span class='screen-reader-text'>" + thickboxL10n.close + "</span><img id='TB_Image' src='" + url + "' width='" + imageWidth + "' height='" + imageHeight + "' alt='" + caption + "'/></a>" + "<div id='TB_caption'>" + caption + "<div id='TB_secondLine'>" + TB_imageCount + TB_PrevHTML + TB_NextHTML + "</div></div><div id='TB_closeWindow'><button type='button' id='TB_closeWindowButton'><span class='screen-reader-text'>" + thickboxL10n.close + "</span><span class='tb-close-icon'></span></button></div>");
                jQuery("#TB_closeWindowButton").click(tb_remove);
                if (!(TB_PrevHTML === "")) {
                    function goPrev() {
                        if (jQuery(document).unbind("click", goPrev)) {
                            jQuery(document).unbind("click", goPrev)
                        }
                        jQuery("#TB_window").remove();
                        jQuery("body").append("<div id='TB_window'></div>");
                        tb_show(TB_PrevCaption, TB_PrevURL, imageGroup);
                        return !1
                    }
                    jQuery("#TB_prev").click(goPrev)
                }
                if (!(TB_NextHTML === "")) {
                    function goNext() {
                        jQuery("#TB_window").remove();
                        jQuery("body").append("<div id='TB_window'></div>");
                        tb_show(TB_NextCaption, TB_NextURL, imageGroup);
                        return !1
                    }
                    jQuery("#TB_next").click(goNext)
                }
                jQuery(document).bind('keydown.thickbox', function (e) {
                    if (e.which == 27) {
                        tb_remove()
                    } else if (e.which == 190) {
                        if (!(TB_NextHTML == "")) {
                            jQuery(document).unbind('thickbox');
                            goNext()
                        }
                    } else if (e.which == 188) {
                        if (!(TB_PrevHTML == "")) {
                            jQuery(document).unbind('thickbox');
                            goPrev()
                        }
                    }
                    return !1
                });
                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_ImageOff").click(tb_remove);
                jQuery("#TB_window").css({
                    'visibility': 'visible'
                })
            };
            imgPreloader.src = url
        } else {
            var queryString = url.replace(/^[^\?]+\??/, '');
            var params = tb_parseQuery(queryString);
            TB_WIDTH = (params.width * 1) + 30 || 630;
            TB_HEIGHT = (params.height * 1) + 40 || 440;
            ajaxContentW = TB_WIDTH - 30;
            ajaxContentH = TB_HEIGHT - 45;
            if (url.indexOf('TB_iframe') != -1) {
                urlNoQuery = url.split('TB_');
                jQuery("#TB_iframeContent").remove();
                if (params.modal != "true") {
                    jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><button type='button' id='TB_closeWindowButton'><span class='screen-reader-text'>" + thickboxL10n.close + "</span><span class='tb-close-icon'></span></button></div></div><iframe frameborder='0' hspace='0' allowtransparency='true' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;' >" + thickboxL10n.noiframes + "</iframe>")
                } else {
                    jQuery("#TB_overlay").unbind();
                    jQuery("#TB_window").append("<iframe frameborder='0' hspace='0' allowtransparency='true' src='" + urlNoQuery[0] + "' id='TB_iframeContent' name='TB_iframeContent" + Math.round(Math.random() * 1000) + "' onload='tb_showIframe()' style='width:" + (ajaxContentW + 29) + "px;height:" + (ajaxContentH + 17) + "px;'>" + thickboxL10n.noiframes + "</iframe>")
                }
            } else {
                if (jQuery("#TB_window").css("visibility") != "visible") {
                    if (params.modal != "true") {
                        jQuery("#TB_window").append("<div id='TB_title'><div id='TB_ajaxWindowTitle'>" + caption + "</div><div id='TB_closeAjaxWindow'><button type='button' id='TB_closeWindowButton'><span class='screen-reader-text'>" + thickboxL10n.close + "</span><span class='tb-close-icon'></span></button></div></div><div id='TB_ajaxContent' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px'></div>")
                    } else {
                        jQuery("#TB_overlay").unbind();
                        jQuery("#TB_window").append("<div id='TB_ajaxContent' class='TB_modal' style='width:" + ajaxContentW + "px;height:" + ajaxContentH + "px;'></div>")
                    }
                } else {
                    jQuery("#TB_ajaxContent")[0].style.width = ajaxContentW + "px";
                    jQuery("#TB_ajaxContent")[0].style.height = ajaxContentH + "px";
                    jQuery("#TB_ajaxContent")[0].scrollTop = 0;
                    jQuery("#TB_ajaxWindowTitle").html(caption)
                }
            }
            jQuery("#TB_closeWindowButton").click(tb_remove);
            if (url.indexOf('TB_inline') != -1) {
                jQuery("#TB_ajaxContent").append(jQuery('#' + params.inlineId).children());
                jQuery("#TB_window").bind('tb_unload', function () {
                    jQuery('#' + params.inlineId).append(jQuery("#TB_ajaxContent").children())
                });
                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_window").css({
                    'visibility': 'visible'
                })
            } else if (url.indexOf('TB_iframe') != -1) {
                tb_position();
                jQuery("#TB_load").remove();
                jQuery("#TB_window").css({
                    'visibility': 'visible'
                })
            } else {
                var load_url = url;
                load_url += -1 === url.indexOf('?') ? '?' : '&';
                jQuery("#TB_ajaxContent").load(load_url += "random=" + (new Date().getTime()), function () {
                    tb_position();
                    jQuery("#TB_load").remove();
                    tb_init("#TB_ajaxContent a.thickbox");
                    jQuery("#TB_window").css({
                        'visibility': 'visible'
                    })
                })
            }
        }
        if (!params.modal) {
            jQuery(document).bind('keydown.thickbox', function (e) {
                if (e.which == 27) {
                    tb_remove();
                    return !1
                }
            })
        }
        $closeBtn = jQuery('#TB_closeWindowButton');
        if ($closeBtn.find('.tb-close-icon').is(':visible')) {
            $closeBtn.focus()
        }
    } catch (e) {}
}

function tb_showIframe() {
    jQuery("#TB_load").remove();
    jQuery("#TB_window").css({
        'visibility': 'visible'
    }).trigger('thickbox:iframe:loaded')
}

function tb_remove() {
    jQuery("#TB_imageOff").unbind("click");
    jQuery("#TB_closeWindowButton").unbind("click");
    jQuery('#TB_window').fadeOut('fast', function () {
        jQuery('#TB_window, #TB_overlay, #TB_HideSelect').trigger('tb_unload').unbind().remove();
        jQuery('body').trigger('thickbox:removed')
    });
    jQuery('body').removeClass('modal-open');
    jQuery("#TB_load").remove();
    if (typeof document.body.style.maxHeight == "undefined") {
        jQuery("body", "html").css({
            height: "auto",
            width: "auto"
        });
        jQuery("html").css("overflow", "")
    }
    jQuery(document).unbind('.thickbox');
    return !1
}

function tb_position() {
    var isIE6 = typeof document.body.style.maxHeight === "undefined";
    jQuery("#TB_window").css({
        marginLeft: '-' + parseInt((TB_WIDTH / 2), 10) + 'px',
        width: TB_WIDTH + 'px'
    });
    if (!isIE6) {
        jQuery("#TB_window").css({
            marginTop: '-' + parseInt((TB_HEIGHT / 2), 10) + 'px'
        })
    }
}

function tb_parseQuery(query) {
    var Params = {};
    if (!query) {
        return Params
    }
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) {
            continue
        }
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val
    }
    return Params
}

function tb_getPageSize() {
    var de = document.documentElement;
    var w = window.innerWidth || self.innerWidth || (de && de.clientWidth) || document.body.clientWidth;
    var h = window.innerHeight || self.innerHeight || (de && de.clientHeight) || document.body.clientHeight;
    arrayPageSize = [w, h];
    return arrayPageSize
}

function tb_detectMacXFF() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf('mac') != -1 && userAgent.indexOf('firefox') != -1) {
        return !0
    }
};
(function ($) {
    'use strict';

    function viewport() {
        var e = window,
            a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body
        }
        return {
            width: e[a + 'Width'],
            height: e[a + 'Height']
        }
    }
    var centerAlignedImages = function () {
        viewport();
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        var body = $('body');
        if (body.hasClass('single-jetpack-portfolio') && !body.hasClass('page-template-template-portfolio')) {
            var centerAlignImg = $('.content-area .aligncenter');
            if (centerAlignImg.length) {
                $('#primary').imagesLoaded(function () {
                    centerAlignImg.each(function () {
                        var $this = $(this);
                        var centerAlignImgWidth;
                        var entryContentWidth = $('.entry-content').width();
                        if ($this.is('img')) {
                            centerAlignImgWidth = $this.attr('width');
                            if (centerAlignImgWidth > 860) {
                                centerAlignImgWidth = 860
                            }
                        } else {
                            centerAlignImgWidth = $this.find('img').attr('width');
                            if (centerAlignImgWidth > 860) {
                                centerAlignImgWidth = 860
                            }
                            if (x > 1024) {
                                $this.css({
                                    width: centerAlignImgWidth
                                })
                            } else {
                                $this.css({
                                    width: ''
                                })
                            }
                        }
                        if (x > 1024) {
                            if (centerAlignImgWidth > entryContentWidth) {
                                if (centerAlignImgWidth > 860) {
                                    $this.css({
                                        marginLeft: -((860 - entryContentWidth) / 2)
                                    })
                                } else {
                                    $this.css({
                                        marginLeft: -((centerAlignImgWidth - entryContentWidth) / 2)
                                    })
                                }
                                $this.css({
                                    'position': 'relative',
                                    'z-index': '2'
                                })
                            }
                        } else {
                            $this.css({
                                marginLeft: ''
                            })
                        }
                    })
                })
            }
        }
    };
    var pageHasHeroSlider = $('.hero-slider-wrapper').length;
    if (pageHasHeroSlider) {
        var heroSlider = $('.hero-slider-wrapper'),
            heroSliderHeight = heroSlider.outerHeight(),
            blackBg = $('.black-bg'),
            wScrollTop = 0
    }
    var heroSliderHide = function () {
        setTimeout(function () {
            wScrollTop = $(window).scrollTop();
            if (wScrollTop > 0) {
                heroSlider.css({
                    opacity: (heroSliderHeight - wScrollTop) / heroSliderHeight
                });
                if (wScrollTop > heroSliderHeight) {
                    heroSlider.css('visibility', 'hidden');
                    blackBg.css('display', 'none')
                } else {
                    heroSlider.css('visibility', 'visible');
                    blackBg.css('display', 'block')
                }
                $('.home .content-area').css('box-shadow', '0px -30px 20px 0px rgba(0,0,0,.04)')
            } else {
                heroSlider.css('visibility', 'visible');
                blackBg.css('display', 'block');
                heroSlider.css({
                    opacity: .99
                });
                $('.home .content-area').css('box-shadow', 'none')
            }
        }, 200)
    };
    var body = $('body');
    var wScrollTop = 0;
    if (body.hasClass('single-post')) {
        var siteMainHeight = 0,
            mainContentMarginTop = 0,
            entryHeaderHeight = 0,
            featuredContentHeight = 0,
            entryContentMarginTop = 0,
            relatedPostsHeight = 0;
        var singleFixedContent = $('.single .posts-navigation > div, .single .meta-author'),
            singlePostNavigation = 0,
            singleFixedContentHeight = -1
    }
    var singleFixCalculate = function () {
        if (body.hasClass('single-post')) {
            singleFixedContent.each(function () {
                singleFixedContentHeight = Math.max(singleFixedContentHeight, $(this).outerHeight(!0))
            });
            singleFixedContentHeight = parseInt(singleFixedContentHeight, 10);
            $('.entry-content').css('min-height', singleFixedContentHeight);
            singlePostNavigation = $('.single .posts-navigation > div').outerHeight(!0);
            siteMainHeight = parseInt($('.site-main').outerHeight(!0), 10);
            mainContentMarginTop = parseInt($('#content').css('margin-top'), 10);
            if ($('article .entry-header').length) {
                entryHeaderHeight = parseInt($('article .entry-header').outerHeight(!0), 10)
            }
            if ($('article .featured-content').length) {
                featuredContentHeight = parseInt($('article .featured-content').outerHeight(!0), 10)
            }
            if ($('#jp-relatedposts').length) {
                relatedPostsHeight = parseInt($('#jp-relatedposts').outerHeight(!1), 10)
            }
            entryContentMarginTop = parseInt($('.entry-content').css('margin-top'), 10)
        }
    }
    viewport();
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    var singleFixContent = function () {
        if (body.hasClass('single-post')) {
            var scrollSpacer = mainContentMarginTop + entryHeaderHeight + featuredContentHeight;
            wScrollTop = $(window).scrollTop();
            if ((wScrollTop >= scrollSpacer) && (wScrollTop <= mainContentMarginTop + siteMainHeight - singleFixedContentHeight)) {
                singleFixedContent.addClass('fixed').css('top', '0')
            } else if (wScrollTop >= mainContentMarginTop + siteMainHeight - singleFixedContentHeight) {
                singleFixedContent.removeClass('fixed').css('top', siteMainHeight - entryHeaderHeight - featuredContentHeight - singleFixedContentHeight);
                if ($('#jp-relatedposts').length) {
                    relatedPostsHeight = parseInt($('#jp-relatedposts').outerHeight(!1), 10)
                }
                if (relatedPostsHeight !== 0) {
                    if (wScrollTop <= mainContentMarginTop + siteMainHeight + relatedPostsHeight - singlePostNavigation) {
                        $('.single .posts-navigation > div').addClass('fixed').css('top', '0')
                    } else {
                        $('.single .posts-navigation > div').css('top', siteMainHeight + relatedPostsHeight - entryHeaderHeight - featuredContentHeight - singlePostNavigation)
                    }
                }
            } else {
                singleFixedContent.removeClass('fixed').css('top', '0')
            }
        }
    };
    var singleUnfixContent = function () {
        if (singleFixedContent) {
            singleFixedContent.removeClass('fixed').css('top', '0')
        }
    }
    var hamburger = function () {
        viewport();
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        if (x > 1200) {
            var navUl = $('.main-navigation-center .nav-menu, .main-navigation-center .menu');
            var navFirstLevelLi = $('.main-navigation-center .nav-menu > li, .main-navigation-center .menu > li');
            var navUlWidth = 0,
                navLiWidth = 0;
            var siteNavigation = $('#site-navigation');
            navUlWidth = navUl.width() - 40;
            navFirstLevelLi.each(function () {
                navLiWidth += $(this).outerWidth(!0)
            });
            if ((navUlWidth < navLiWidth)) {
                body.addClass("hamburger-menu");
                var secondLevelNavigation = $('.main-navigation .nav-menu > li > ul, .main-navigation .menu > li > ul');
                secondLevelNavigation.each(function () {
                    $(this).css({
                        'padding-top': 0
                    })
                })
            } else {
                body.removeClass("hamburger-menu");
                var primarySide = $('.primary-side');
                var sideWidth = 55,
                    navExpandAmount = 210;
                $('.main-navigation .menu>li.menu-item-has-children, .main-navigation .menu>li.page-item-has-children, .main-navigation .menu>li.menu_item_has_children, .main-navigation .menu>li.page_item_has_children').hover(function () {
                    if (!primarySide.hasClass('first-lvl-open')) {
                        primarySide.addClass('first-lvl-open')
                    }
                }, function () {
                    if (primarySide.hasClass('first-lvl-open')) {
                        primarySide.removeClass('first-lvl-open')
                    }
                });
                var secondLevelNavigation = $('.main-navigation .nav-menu > li > ul, .main-navigation .menu > li > ul');
                secondLevelNavigation.each(function () {
                    var secondLevelNavigationPaddingTop = (navUlWidth - $(this).height()) / 2;
                    $(this).css({
                        'padding-top': secondLevelNavigationPaddingTop
                    })
                })
            }
        } else {
            body.addClass("hamburger-menu")
        }
    };
    $(document).ready(function ($) {
        function viewport() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            }
        }
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        var body = $('body'),
            mainContent = $('#content'),
            toTopArrow = $('a.back-to-top');
        body.on('mousedown', '*', function (e) {
            if (($(this).is(':focus') || $(this).is(e.target)) && $(this).css('outline-style') == 'none') {
                $(this).css('outline', 'none').on('blur', function () {
                    $(this).off('blur').css('outline', '')
                })
            }
        });
        $('.search-submit').prop('disabled', !0);
        $('.search-field').keyup(function () {
            $('.search-submit').prop('disabled', this.value === "" ? !0 : !1)
        });
        if (body.hasClass('single') || body.hasClass('page')) {
            var dropcap = $('span.dropcap');
            if (dropcap.length) {
                dropcap.each(function () {
                    var $this = $(this);
                    $this.attr('data-dropcap', $this.text());
                    $this.parent().css({
                        "position": "relative",
                        "z-index": 0
                    })
                })
            }
        };
        var menuDropdownLink = $('.main-navigation .menu-item-has-children>a, .main-navigation .page_item_has_children>a');
        var dropDownArrow = $('<button class="dropdown-toggle"><span class="screen-reader-text">toggle child menu</span><span class="h-line"></span><span class="v-line"></span></button>');
        menuDropdownLink.after(dropDownArrow);
        var dropDownButton = $('button.dropdown-toggle');
        dropDownButton.on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            $this.parent('li').toggleClass('toggle-on').find('.toggle-on').removeClass('toggle-on');
            $this.parent('li').siblings().removeClass('toggle-on')
        });
        $('.main-navigation .menu').on('mouseleave', function () {
            $(this).find('.toggle-on').removeClass('toggle-on')
        })
        var smallInput = $('.contact-form input[type="text"], .contact-form input[type="email"], .contact-form input[type="url"], .comment-form input[type="text"], .comment-form input[type="email"], .comment-form input[type="url"]');
        smallInput.parent().addClass('small-input');
        var featuredSlider;
        var direction;
        if (body.hasClass('rtl')) {
            direction = !0
        } else {
            direction = !1
        }
        featuredSlider = $('.featured-slider');
        var autoplaySlider = !1;
        if (body.hasClass('autoplay-slider')) {
            autoplaySlider = !0
        }
        featuredSlider.slick({
            slide: 'article',
            infinite: !0,
            fade: !0,
            dots: !0,
            arrows: !1,
            speed: 500,
            centerMode: !1,
            draggable: !0,
            touchThreshold: 20,
            slidesToShow: 1,
            cssEase: 'cubic-bezier(0.28, 0.12, 0.22, 1)',
            rtl: direction,
            autoplay: autoplaySlider,
            autoplaySpeed: 4000,
        });
        setTimeout(function () {
            featuredSlider.css({
                opacity: 1
            })
        }, 1000);
        var slides = $('.last-post article, .featured-slider article');
        slides.each(function () {
            var featuredImg = $(this).find('img');
            if (featuredImg.length) {
                var slideImgSrc = featuredImg.attr('src');
                featuredImg.css('display', 'none').wrap('<div class="image"></div>');
                $(this).find('.image').css({
                    backgroundImage: 'url(' + slideImgSrc + ')'
                })
            }
        });
        var $container = $('.masonry');
        $(document.body).on('post-load', function () {
            var newEl = $container.children().not('article.post-loaded, .lines, span.infinite-loader, div.grid-sizer').addClass('post-loaded');
            newEl.hide();
            newEl.imagesLoaded(function () {
                $container.masonry('appended', newEl, !0).masonry('layout');
                setTimeout(function () {
                    newEl.each(function (i) {
                        var $this = $(this);
                        if ($this.find('iframe').length) {
                            var $iframe = $this.find('iframe');
                            var $iframeSrc = $iframe.attr('src');
                            $iframe.load($iframeSrc, function () {
                                $container.masonry('layout')
                            })
                        }
                        setTimeout(function () {
                            newEl.eq(i).addClass('animate')
                        }, 100 * (i + 1));
                        setTimeout(function () {
                            $('#infinite-handle').addClass('animate')
                        }, 100)
                    })
                }, 150);
                radio_checkbox_animation()
            })
        });

        function radio_checkbox_animation() {
            var checkBtn = $('label').find('input[type="checkbox"]');
            var checkLabel = checkBtn.parent('label');
            var radioBtn = $('label').find('input[type="radio"]');
            checkLabel.addClass('checkbox');
            checkLabel.click(function () {
                var $this = $(this);
                if ($this.find('input').is(':checked')) {
                    $this.addClass('checked')
                } else {
                    $this.removeClass('checked')
                }
            });
            var checkBtnAfter = $('label + input[type="checkbox"]');
            var checkLabelBefore = checkBtnAfter.prev('label');
            checkLabelBefore.click(function () {
                var $this = $(this);
                $this.toggleClass('checked')
            });
            var checkLabelAfter = $('input[type="checkbox"] + label');
            checkLabelAfter.click(function () {
                var $this = $(this);
                $this.toggleClass('checked')
            });
            radioBtn.change(function () {
                var $this = $(this);
                if ($this.is(':checked')) {
                    $this.parent('label').siblings().removeClass('checked');
                    $this.parent('label').addClass('checked')
                } else {
                    $this.parent('label').removeClass('checked')
                }
            })
        }
        radio_checkbox_animation();

        function shareDaddy() {
            var shareTitle = $('.sd-sharing .sd-title');
            if (shareTitle.length) {
                var shareWrap = shareTitle.closest('.sd-sharing-enabled');
                shareWrap.attr({
                    'tabindex': '0'
                });
                shareTitle.on('click touchend', function () {
                    $(this).closest('.sd-sharing-enabled').toggleClass('sd-open')
                });
                $(document).keyup(function (e) {
                    if (shareWrap.find('a').is(':focus') && e.keyCode == 9) {
                        shareWrap.addClass('sd-open')
                    } else if (!(shareWrap.find('a').is(':focus')) && e.keyCode == 9) {
                        shareWrap.removeClass('sd-open')
                    }
                })
            }
        }
        shareDaddy();
        var bigSearchWrap = $('div.search-wrap');
        var bigSearchButtons = $('div.search-button');
        var bigSearchField = bigSearchWrap.find('.search-field');
        var bigSearchTrigger = $('.big-search-trigger');
        var bigSearchCloseBtn = $('.big-search-close');
        var delayBigSearch = !1;
        var toggleBigSearch = function () {
            if (delayBigSearch) return;
            delayBigSearch = !0;
            setTimeout(function () {
                delayBigSearch = !1
            }, 500);
            if (body.hasClass('big-search-open')) {
                body.removeClass('big-search-open');
                setTimeout(function () {
                    $('.search-wrap').find('.search-field').blur()
                }, 50)
            } else {
                body.addClass('big-search-open');
                setTimeout(function () {
                    $('.search-wrap').find('.search-field').focus()
                }, 200)
            }
        }
        bigSearchCloseBtn.on('touchend click', function (e) {
            e.preventDefault();
            toggleBigSearch()
        });
        bigSearchTrigger.on('touchend click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleBigSearch();
            if (x < 1200) {
                $('html, body').delay(100).animate({
                    scrollTop: 0
                }, 200)
            }
        });
        bigSearchField.on('touchend click', function (e) {
            e.stopPropagation()
        });
        $().on('touchend click', function (e) {
            e.stopPropagation()
        });
        var sidebarToggle = $('.sidebar-toggle');
        var delaySidebar = !1;
        var toggleSidebar = function () {
            if (delaySidebar) return;
            delaySidebar = !0;
            setTimeout(function () {
                delaySidebar = !1
            }, 500);
            if (body.hasClass('sidebar-open')) {
                body.removeClass('sidebar-open')
            } else {
                body.addClass('sidebar-open')
            }
        }
        sidebarToggle.on('touchend click', function (e) {
            e.preventDefault();
            toggleSidebar()
        });
        $('.black-overlay').on('touchend click', function () {
            if (body.hasClass('sidebar-open')) {
                toggleSidebar()
            }
        });
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                if (body.hasClass('big-search-open')) {
                    toggleBigSearch()
                }
                if (body.hasClass('sidebar-open')) {
                    toggleSidebar()
                }
                if ($('#site-navigation').hasClass('toggled')) {
                    $('#site-navigation').removeClass('toggled');
                    $('.menu-toggle, #site-navigation ul').setAttribute('aria-expanded', 'false')
                }
            }
        });
        var keys = {
            37: 1,
            38: 1,
            39: 1,
            40: 1,
            32: 1,
            33: 1,
            34: 1,
            35: 1,
            36: 1
        };
        var preventDefault = function (e) {
            e = e || window.event;
            if (e.preventDefault)
                e.preventDefault();
            e.returnValue = !1
        };
        var preventDefaultForScrollKeys = function (e) {
            if (keys[e.keyCode]) {
                preventDefault(e);
                return !1
            }
        };
        if (body.hasClass('single')) {
            var $featuredImage = $('.featured-image');
            if ($featuredImage.length) {
                var imgAspect = $featuredImage.find('img').get(0).naturalWidth / $featuredImage.find('img').get(0).naturalHeight;
                if (imgAspect <= 1) {
                    $featuredImage.addClass('vertical-img')
                }
            }
        };
        hamburger()
    });
    $(window).load(function () {
        function viewport() {
            var e = window,
                a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = document.documentElement || document.body
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            }
        }
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        var body = $('body');
        var $container = $('.masonry');
        $container.imagesLoaded(function () {
            $container.masonry({
                columnWidth: '.grid-sizer',
                itemSelector: '.masonry article',
                transitionDuration: 0
            }).masonry('layout');
            var masonryChild = $container.find('article.hentry , .lines , #infinite-handle');
            masonryChild.each(function (i) {
                setTimeout(function () {
                    masonryChild.eq(i).addClass('post-loaded animate')
                }, 100 * (i + 1))
            });
            var masonryArticles = $container.find('article.hentry'),
                numberOfMasonryArticles = masonryArticles.length;
            if (numberOfMasonryArticles < 5) {
                $('.lines span').filter(function (index) {
                    return index > numberOfMasonryArticles - 1
                }).css("display", "none")
            }
        });
        var preload = function () {
            $('body').addClass('show')
        };
        preload();
        centerAlignedImages();
        if (x > 1200) {
            setTimeout(function () {
                singleFixCalculate();
                singleFixContent()
            }, 50)
        } else {
            singleUnfixContent()
        }
        if (pageHasHeroSlider && x > 1200) {
            heroSliderHide()
        }
        if (body.hasClass('fixed-site-header')) {
            wScrollTop = $(window).scrollTop();
            if (wScrollTop > y) {
                $('.site-header').addClass('compact')
            } else {
                $('.site-header').removeClass('compact')
            }
        }
    });
    $(window).resize(function () {
        x = w.innerWidth || e.clientWidth || g.clientWidth;
        y = w.innerHeight || e.clientHeight || g.clientHeight;
        var body = $('body');
        centerAlignedImages();
        if (x > 1200) {
            singleFixCalculate();
            singleFixContent()
        } else {
            singleUnfixContent()
        }
        hamburger()
    });
    if (body.hasClass('single')) {
        $(window).scroll(function () {
            if (x > 1200) {
                singleFixContent()
            } else {
                singleUnfixContent()
            }
        })
    };
    if (x > 1200) {
        $(window).scroll(function () {
            if (pageHasHeroSlider) {
                heroSliderHide()
            }
        })
    }
    $(window).scroll(function () {
        if (body.hasClass('fixed-site-header')) {
            wScrollTop = $(window).scrollTop();
            if (wScrollTop > y) {
                $('.site-header').addClass('compact')
            } else {
                $('.site-header').removeClass('compact')
            }
        }
    });
    $(window).on('beforeunload', function () {})
})(jQuery)