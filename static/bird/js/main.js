webpackJsonp([1], [, function(t, e, n) {
    "use strict";

    function i(t) {
        return t.map(function(t) {
            return Number(t)
        })
    }

    function a(t) {
        return document.querySelector(t)
    }

    function o(t) {
        return t = t.replace(".js-", ""),
            function(e) {
                return ".js-" + t + "__" + e
            }
    }

    function s(t, e, n) {
        var i = null;
        return t.every(function(t) {
            return t[e] != n || (i = t, !1)
        }), i
    }

    function r(t, e, n) {
        var i = s(t, e, n);
        return t.indexOf(i)
    }

    function u(t) {
        return void 0 === t || null === t || !1 === t
    }

    function l(t) {
        var e = /^(?:(\d{1,2})h)?(?:(\d{1,2})m)?(\d{1,2})s$/,
            n = e.exec(t);
        if (!n) return null;
        var i = parseInt(n[1]),
            a = parseInt(n[2]),
            o = parseInt(n[3]),
            s = o;
        return i && (s += 60 * i * 60), a && (s += 60 * a), s
    }

    function d() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
        if (window.history && t) {
            var e = decodeURIComponent(window.location.href);
            t.forEach(function(t) {
                var n = new RegExp("(?:\\?|&){1}(" + t + "=[^&?]+)&?");
                e = e.replace(n, function(t) {
                    var e = t.charAt(0);
                    return "?" === e || "&" === e ? e : ""
                })
            }), "?" === e.charAt(e.length - 1) && (e = e.slice(0, -1)), window.history.replaceState({}, "", e)
        }
    }

    function c(t) {
        t && (d(["s"]), window.location.hash = t)
    }

    function f(t, e, n) {
        var i = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3],
            a = t instanceof y.default ? t : (0, y.default)(t);
        return a.find(".c-icon--" + e).removeClass("c-icon--" + e).addClass("c-icon--" + n).addClass(i ? "c-icon--animated" : ""), t
    }

    function p(t, e) {
        t.on("input", function() {
            (0, y.default)(this).val() ? e.removeAttr("disabled") : e.attr("disabled", !0)
        })
    }

    function h(t) {
        var e = null,
            n = function(n) {
                var i = Math.round((n.duration - n.seconds) * t.percent);
                e = setTimeout(function() {
                    t.cb(t.data)
                }, 1e3 * i)
            },
            i = function() {
                clearTimeout(e)
            };
        t.video.on("play", n), t.video.on("pause", i), t.video.on("ended", i)
    }

    function v(t, e, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 50;
        if (!u(t[e])) return n();
        setTimeout(v, i, t, e, n)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }), e.Storage = void 0, e.convertToNumbers = i, e.find = a, e.findChild = o, e.findInArray = s, e.findIndex = r, e.nullable = u, e.parseTime = l, e.removeParam = d, e.scrollTo = c, e.replaceIcon = f, e.toggleButton = p, e.trackTime = h, e.wait = v;
    var m = n(0),
        y = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(m);
    e.Storage = {
        set: function(t, e) {
            return window.localStorage.setItem("learnux_" + t, window.btoa(JSON.stringify(e)))
        },
        get: function(t) {
            var e = window.localStorage.getItem("learnux_" + t);
            return e ? JSON.parse(window.atob(e)) : null
        },
        remove: function(t) {
            return window.localStorage.removeItem("learnux_" + t)
        }
    }
}, , , , function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function s(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        u = n(0),
        l = i(u),
        d = n(6),
        c = i(d),
        f = n(1),
        p = n(7),
        h = i(p),
        v = function(t) {
            function e(t) {
                a(this, e);
                var n = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return n.DOM = {}, n.currentIndex = null, n.currentSrc = null, n.canPlay = !1, n.limitReachedCount = 0, n.options = Object.assign(t, {
                    findChild: (0, f.findChild)(t.selector)
                }), n.getLessons().then(function() {
                    n.assignEvents(), n.updateDOM()
                }), n
            }
            return s(e, t), r(e, [{
                key: "embed",
                value: function() {
                    var t = this;
                    this.getLesson(this.options.startSlug).then(function(e) {
                        if (t.video = new c.default((0, f.find)(t.options.selector), {
                                id: e.source
                            }), t.currentSrc = e.source, e.limit) return t.limitReached();
                        e.free || t.trackTime(e), t.options.startTime ? t.setTime(t.options.startTime).then(function() {
                            return t.autoPlay()
                        }) : t.autoPlay(), t.assignVideoEvents()
                    })
                }
            }, {
                key: "assignEvents",
                value: function() {
                    var t = this;
                    this.DOM.prevButton = (0, l.default)(this.options.findChild("prev")).on("click", this.loadPreviousVideo.bind(this)), this.DOM.nextButton = (0, l.default)(this.options.findChild("next")).on("click", this.loadNextVideo.bind(this)), this.DOM.complete = (0, l.default)(this.options.findChild("complete")).on("click", function(e) {
                        e.stopPropagation();
                        var n = (0, f.findInArray)(t.lessons, "slug", (0, l.default)(e.currentTarget).closest("[data-slug]").data("slug"));
                        t.markAsCompleted(n, n.completed)
                    }), (0, l.default)(this.options.findChild("lesson")).on("click", this.switchVideo.bind(this)), window.onpopstate = this.loadFromHistory.bind(this)
                }
            }, {
                key: "updateDOM",
                value: function(t) {
                    if (t) {
                        (0, l.default)(this.options.findChild("lesson")).removeClass("is-active").filter('[data-slug="' + t + '"]').addClass("is-active")
                    }
                    this.DOM.prevButton.attr("disabled", 0 === this.currentIndex), this.DOM.nextButton.attr("disabled", this.currentIndex === this.lessons.length - 1)
                }
            }, {
                key: "assignVideoEvents",
                value: function() {
                    var t = this;
                    LUX.Config.isLoggedIn && (this.video.on("play", function() {
                        t.markAsStarted(t.getCurrentLesson())
                    }), this.video.on("ended", function() {
                        t.markAsCompleted(t.getCurrentLesson())
                    })), this.video.on("ended", this.loadNextVideo.bind(this))
                }
            }, {
                key: "resetVideoEvents",
                value: function() {
                    this.video.off("loaded"), this.video.off("play"), this.video.off("pause"), this.video.off("ended")
                }
            }, {
                key: "fireEvents",
                value: function(t) {
                    this.emit("videoSwitch", t)
                }
            }, {
                key: "getLesson",
                value: function(t) {
                    return l.default.getJSON(this.options.apiUrl + "/" + t)
                }
            }, {
                key: "getLessons",
                value: function() {
                    var t = this;
                    return l.default.getJSON(this.options.apiUrl).then(function(e) {
                        t.lessons = e, t.canPlay = !0, t.lessons.every(function(e, n) {
                            return e.slug !== t.options.startSlug || (t.currentIndex = n, !1)
                        })
                    })
                }
            }, {
                key: "getCurrentLesson",
                value: function() {
                    return this.lessons[this.currentIndex]
                }
            }, {
                key: "switchVideo",
                value: function(t) {
                    if (this.canPlay) {
                        var e = (0, f.findInArray)(this.lessons, "slug", (0, l.default)(t.currentTarget).data("slug"));
                        this.loadVideo(e)
                    }
                }
            }, {
                key: "replaceSource",
                value: function(t) {
                    return this.currentSrc === t ? this.video.getVolume() : (this.currentSrc = t, this.limitReachedCount = 0, this.video.loadVideo(t))
                }
            }, {
                key: "loadVideo",
                value: function(t) {
                    var e = this,
                        n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    t && this.getLesson(t.slug).then(function(i) {
                        e.replaceSource(i.source).then(function() {
                            if (i.limit) return e.limitReached();
                            e.resetVideoEvents(), i.free || e.trackTime(i), e.options.isMobile || e.video.play(), e.assignVideoEvents()
                        }), e.currentIndex = (0, f.findIndex)(e.lessons, "slug", t.slug), e.updateDOM(t.slug), e.fireEvents(t), e.updateHistory(t, n)
                    })
                }
            }, {
                key: "loadNextVideo",
                value: function() {
                    var t = this.lessons[++this.currentIndex];
                    t ? this.loadVideo(t) : --this.currentIndex
                }
            }, {
                key: "loadPreviousVideo",
                value: function() {
                    var t = this.lessons[--this.currentIndex];
                    t ? this.loadVideo(t) : ++this.currentIndex
                }
            }, {
                key: "markAsWatched",
                value: function(t) {
                    t.free || l.default.ajax({
                        url: this.options.apiUrl + "/" + t.slug,
                        method: "PATCH"
                    })
                }
            }, {
                key: "markAsCompleted",
                value: function(t) {
                    var e = this,
                        n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                    l.default.ajax({
                        url: this.options.apiUrl + "/" + t.slug + "/complete" + (n ? "?remove=1" : ""),
                        method: "PATCH"
                    }).done(function(n) {
                        n.success && ((0, l.default)(e.options.findChild("lesson")).filter('[data-slug="' + t.slug + '"]').toggleClass("is-completed", n.completed), t.completed = n.completed)
                    })
                }
            }, {
                key: "markAsStarted",
                value: function(t) {
                    l.default.ajax({
                        url: this.options.apiUrl + "/" + t.slug + "/started",
                        method: "PATCH"
                    })
                }
            }, {
                key: "updateHistory",
                value: function(t) {
                    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    window.history && window.history[e ? "pushState" : "replaceState"](t, "", this.options.url + "/" + t.slug)
                }
            }, {
                key: "loadFromHistory",
                value: function(t) {
                    var e = t.state || (0, f.findInArray)(this.lessons, "slug", this.options.startSlug);
                    this.loadVideo(e, !1)
                }
            }, {
                key: "limitReached",
                value: function(t) {
                    this.emit("limitReached", this.video, this.limitReachedCount++)
                }
            }, {
                key: "autoPlay",
                value: function() {
                    if ((this.options.autoPlay || this.options.startTime) && !this.options.isMobile) return this.video.play()
                }
            }, {
                key: "setTime",
                value: function(t) {
                    var e = this,
                        n = (0, f.parseTime)(t);
                    return this.video.getDuration().then(function(t) {
                        if (n <= t) return e.video.setCurrentTime(n).then(function() {
                            return e.video.pause()
                        })
                    })
                }
            }, {
                key: "trackTime",
                value: function(t) {
                    var e = this;
                    (0, f.trackTime)({
                        video: this.video,
                        data: t,
                        percent: .2,
                        cb: function(t) {
                            e.markAsWatched(t)
                        }
                    })
                }
            }]), e
        }(h.default);
    e.default = v
}, , function(t, e, n) {
    "use strict";

    function i() {
        this.events = {}
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    i.prototype.on = function(t, e) {
        "object" !== a(this.events[t]) && (this.events[t] = []), this.events[t].push(e)
    }, i.prototype.removeListener = function(t, e) {
        var n;
        "object" === a(this.events[t]) && (n = indexOf(this.events[t], e)) > -1 && this.events[t].splice(n, 1)
    }, i.prototype.emit = function(t) {
        var e, n, i, o = [].slice.call(arguments, 1);
        if ("object" === a(this.events[t]))
            for (n = this.events[t].slice(), i = n.length, e = 0; e < i; e++) n[e].apply(this, o)
    }, i.prototype.once = function(t, e) {
        this.on(t, function n() {
            this.removeListener(t, n), e.apply(this, arguments)
        })
    }, e.default = i
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function o(t, e) {
        if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !e || "object" != typeof e && "function" != typeof e ? t : e
    }

    function s(t, e) {
        if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
        t.prototype = Object.create(e && e.prototype, {
            constructor: {
                value: t,
                enumerable: !1,
                writable: !0,
                configurable: !0
            }
        }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var r = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        u = n(0),
        l = i(u),
        d = n(7),
        c = i(d),
        f = function(t) {
            function e() {
                a(this, e);
                var t = o(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                return t.ready = !1, t.currentPage = 1, t.id = Math.random().toString(16).slice(2, 8), t.getTemplate(), t
            }
            return s(e, t), r(e, [{
                key: "getTemplate",
                value: function() {
                    var t = this;
                    this.body = (0, l.default)("body"), l.default.get(LUX.Config.apiTemplatesUrl + "/popup?id=" + this.id).done(function(e) {
                        t.append(e), t.assignEvents()
                    })
                }
            }, {
                key: "append",
                value: function(t) {
                    this.body.append(t), this.popupElem = (0, l.default)(".js-popup-" + this.id), this.popupClose = this.popupElem.find(".js-popup__close"), this.popupBack = this.popupElem.find(".js-popup__back"), this.popupPages = this.popupElem.find(".js-popup__page"), this.popupButtons = this.popupElem.find("[data-page]"), this.popupOverlay = (0, l.default)(".js-popup-overlay-" + this.id), this.ready = !0, this.emit("ready", this.popupElem)
                }
            }, {
                key: "assignEvents",
                value: function() {
                    var t = this;
                    this.popupElem.filter("[data-js-rect]").rect(), this.popupOverlay.on("click", this.hide.bind(this)), this.popupClose.on("click", this.hide.bind(this)), this.popupButtons.on("click", function(e) {
                        e.preventDefault(), t.changePage((0, l.default)(e.currentTarget).data("page"))
                    })
                }
            }, {
                key: "show",
                value: function() {
                    this.changePage(1, !1), this.popupOverlay.fadeIn(500), this.popupElem.fadeIn(500), this.body.addClass("h-no-scroll")
                }
            }, {
                key: "hide",
                value: function() {
                    this.popupElem.fadeOut(500), this.popupOverlay.delay(500).fadeOut(500), this.body.removeClass("h-no-scroll")
                }
            }, {
                key: "changePage",
                value: function(t) {
                    var e = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
                    this.popupPages.hide(), this.popupPages.eq(t - 1).fadeIn(e ? 400 : 0), this.popupElem.scrollTop(0), this.currentPage = t, this.popupBack.toggleClass("h-hidden", 1 == t)
                }
            }]), e
        }(c.default);
    e.default = f
}, , function(t, e, n) {
    "use strict";
    n(11), n(12), n(13), n(14), n(15), n(16), n(17), n(23), n(24), n(25), n(26), n(27), n(28), n(29), n(30), n(31), n(5), n(8), n(32), n(33), n(34), n(35), n(36)
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    a.default.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": (0, a.default)("meta[name='csrf-token']").attr("content")
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i),
        o = n(1);
    (0, a.default)(window).on("load", function() {
        return (0, a.default)("body").addClass("is-loaded")
    });
    var s = (0, a.default)("[data-tooltip]");
    !LUX.Config.isMobile && s.length && n.e(0).then(n.bind(null, 39)).then(function(t) {
        s.each(function(e, n) {
            new t.default(n)
        })
    }), LUX.Config.removeParams && (0, o.removeParam)(LUX.Config.removeParams), LUX.Config.scrollTo && (0, o.scrollTo)(LUX.Config.scrollTo)
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i),
        o = n(1);
    (0, a.default)(document).ready(function() {
        (0, a.default)(".js-user-update").each(function() {
            var t = (0, a.default)(this),
                e = t.find("input[type='text'], input[type='password'], input[type='email']"),
                n = t.find("button[type='submit']");
            (0, o.toggleButton)(e, n)
        }), (0, a.default)(".js-user-delete").on("click", function() {
            (0, a.default)(this).remove(), (0, a.default)(".js-user-delete-confirmation").show().find("input[type='password']").focus()
        })
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i),
        o = n(1);
    (0, a.default)(document).ready(function() {
        var t = (0, a.default)("a[href^='#/logout']"),
            e = (0, a.default)(".js-nav-login-form"),
            n = (0, a.default)(".js-register-button");
        t.on("click", function(t) {
            t.preventDefault(), (0, a.default)(".js-logout-form").submit()
        }), (0, a.default)(".js-register-terms").on("change", function() {
            n.prop("disabled", !this.checked)
        }), (0, o.toggleButton)(e.find("input"), e.find("button"))
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        t.slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: !0,
            centerPadding: "12%",
            autoplay: !1,
            autoplaySpeed: 3e3,
            arrows: !1,
            responsive: [{
                breakpoint: 1600,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 540,
                settings: {
                    slidesToShow: 1
                }
            }]
        })
    }

    function a(t) {
        var e = t.link,
            n = t.og_title;
        return '\n        <div class="l-articles__item">\n\n            <article class="c-article-item">\n\n                <div class="c-article-item__thumb">\n                    <a href="' + e + '" target="_blank">\n                        <div class="c-article-item__img" style="background-image: url(' + t.og_image + ');"></div>\n                    </a>\n                </div>\n\n        </article>\n\n        </div>\n    '
    }

    function o(t) {
        var e = "";
        return r.default.each(t, function(t, n) {
            e += a(n)
        }), e
    }
    var s = n(0),
        r = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(s);
    n(3), (0, r.default)(document).ready(function() {
        var t = (0, r.default)(".js-articles");
        if (t.length) {
            var e = r.default.ajaxSettings.headers;
            delete r.default.ajaxSettings.headers, r.default.ajax("./data.json", {
                dataType: "json"
            }).then(function(n) {
                r.default.ajaxSettings.headers = e, t.html(o(n)), i(t)
            })
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i),
        o = n(1);
    (0, a.default)(document).ready(function() {
        if (window.LUX && window.LUX.Braintree) {
            var t = (0, a.default)(LUX.Braintree.form),
                e = (0, a.default)(LUX.Braintree.button),
                n = (0, a.default)(LUX.Braintree.error);
            LUX.Braintree.handlePostMessage = function(t) {
                if (t.event) {
                    var i = t.event.slice(t.event.lastIndexOf(":") + 1),
                        a = "PAYMENT_METHOD_GENERATED" === i,
                        o = "PAYMENT_METHOD_RECEIVED" === i;
                    if ((a || o) && (n.addClass("h-hidden"), a)) {
                        var s = e.find("[data-text]");
                        s.text(s.data("text"))
                    }
                }
            }, LUX.Braintree.showErrorMessage = function(t) {
                "VALIDATION" === t.type && n.removeClass("h-hidden")
            }, LUX.Braintree.finishTransaction = function(n) {
                var i = (0, a.default)("<input>", {
                    type: "hidden",
                    name: "payment_method_nonce",
                    value: n
                });
                t.append(i), e.attr("disabled", !0).addClass("is-disabled"), (0, o.replaceIcon)(e, "paypal", "loader", !1), t.submit()
            }
        }
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var a = n(0),
        o = i(a);
    n(3);
    var s = n(4),
        r = i(s),
        u = n(5),
        l = i(u),
        d = n(21),
        c = i(d),
        f = n(22),
        p = i(f),
        h = n(1),
        v = null;
    (0, o.default)(window).on("load", function() {
        v && v()
    }), (0, o.default)(document).ready(function() {
        function t() {
            if ((0, o.default)(this || window).width() > 1e3) {
                var t = n.outerHeight();
                e.css({
                    height: "calc(100% - " + t + "px)",
                    top: t + "px"
                })
            } else e.removeAttr("style");
            setTimeout(function() {
                return i.refresh()
            }, 0)
        }
        if (window.LUX && window.LUX.Course) {
            var e = (0, o.default)(".js-player__toc"),
                n = (0, o.default)(".js-player__title"),
                i = new r.default(e.get(0), {
                    mouseWheel: !0,
                    click: !0,
                    scrollbars: "custom",
                    interactiveScrollbars: !0
                });
            i.scrollToElement((0, h.find)(".js-player__lesson.is-active"), 0), v = t, t(), setTimeout(t, 500), (0, o.default)(window).on("resize", t);
            var a = new l.default({
                selector: ".js-player",
                startSlug: LUX.Course.startSlug,
                startTime: LUX.Course.startTime,
                autoPlay: LUX.Course.autoPlay,
                url: LUX.Course.url,
                apiUrl: LUX.Course.apiUrl,
                isMobile: LUX.Config.isMobile
            });
            a.on("videoSwitch", function(t) {
                i.scrollToElement((0, h.find)('.js-player__lesson[data-slug="' + t.slug + '"]'), 300), (0, o.default)("html, body").delay(300).animate({
                    scrollTop: 0
                }, 300)
            }), new c.default(a), a.embed(), new p.default({
                selector: ".js-course-like",
                apiUrl: LUX.Course.apiUrl + "/reactions"
            }), (0, o.default)(".js-course-reviews").slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: !0,
                autoplaySpeed: 5e3,
                fade: !0,
                arrows: !1,
                dots: !0,
                customPaging: function(t, e) {
                    return '<span class="slick-dot"></span>'
                }
            })
        }
    })
}, , , , function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }

    function a(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var o = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        s = n(0),
        r = i(s),
        u = n(8),
        l = i(u),
        d = n(1),
        c = function() {
            function t(e) {
                var n = this;
                a(this, t), this.player = e, this.popup = new l.default, this.popup.on("ready", function(t) {
                    n.assignEvents(t)
                })
            }
            return o(t, [{
                key: "assignEvents",
                value: function(t) {
                    var e = t.find(".js-popup__form"),
                        n = e.find("input[type='email']"),
                        i = t.find(".js-popup-register"),
                        a = t.find(".js-form-error"),
                        o = /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
                    this.player.on("limitReached", this.handleLimit.bind(this)), e.on("submit", function(t) {
                        t.preventDefault(), i.trigger("click")
                    }), i.on("click", function(t) {
                        t.preventDefault(), o.test(n.val()) ? (n.removeClass("is-invalid"), r.default.post("/api/signup/email", {
                            email: n.val()
                        }).done(function(t) {
                            t.success ? e.off("submit").submit() : (n.addClass("is-invalid"), a.text(t.error).show())
                        })) : n.addClass("is-invalid")
                    })
                }
            }, {
                key: "showPopup",
                value: function() {
                    var t = this;
                    (0, d.wait)(this.popup, "ready", function() {
                        t.popup.show()
                    })
                }
            }, {
                key: "handleLimit",
                value: function(t, e) {
                    var n = this;
                    return d.Storage.get("promo") ? (this.player.resetVideoEvents(), t.pause(), this.showPopup()) : e > 0 ? t.pause() : ((0, d.trackTime)({
                        video: t,
                        percent: .9,
                        cb: function() {
                            return d.Storage.set("promo", !0)
                        }
                    }), void t.play().then(function() {
                        setTimeout(function() {
                            t.on("pause", function() {
                                return n.showPopup()
                            }), t.on("ended", function() {
                                return n.showPopup()
                            })
                        }, 2e3)
                    }))
                }
            }]), t
        }();
    e.default = c
}, function(t, e, n) {
    "use strict";

    function i(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var a = function() {
            function t(t, e) {
                for (var n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i)
                }
            }
            return function(e, n, i) {
                return n && t(e.prototype, n), i && t(e, i), e
            }
        }(),
        o = n(0),
        s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(o),
        r = function() {
            function t(e) {
                i(this, t), this.options = e, this.buttons = (0, s.default)(e.selector), this.likes = this.buttons.filter("[data-type='1']").find(e.selector + "__count"), this.dislikes = this.buttons.filter("[data-type='0']").find(e.selector + "__count"), this.assignEvents()
            }
            return a(t, [{
                key: "assignEvents",
                value: function() {
                    this.buttons.on("click", this.addReaction.bind(this))
                }
            }, {
                key: "changeValue",
                value: function(t) {
                    var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                        n = parseInt(t.text());
                    n >= 0 && t.text(n + e)
                }
            }, {
                key: "addReaction",
                value: function(t) {
                    var e = this,
                        n = (0, s.default)(t.currentTarget),
                        i = n.data("type");
                    n.data("disabled") || s.default.post(this.options.apiUrl, {
                        type: i
                    }).done(function(t) {
                        0 != t.like && (e.changeValue(1 == t.like ? e.likes : e.dislikes), t.switch && e.changeValue(1 == t.like ? e.dislikes : e.likes, -1))
                    })
                }
            }]), t
        }();
    e.default = r
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(".js-dropdown").on("click", function() {
        (0, a.default)(this).toggleClass("is-active")
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(document).ready(function() {
        (0, a.default)(".js-email").each(function(t, e) {
            var n = (0, a.default)(e),
                i = n.data("name") + "@" + n.data("domain");
            n.attr("href", "mailto:" + i).text(i).removeAttr("data-name data-domain")
        })
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(document).ready(function() {
        var t = (0, a.default)(".js-intro-scroll"),
            e = (0, a.default)(".js-intro-image"),
            n = (0, a.default)(".js-intro-video"),
            i = n.find("video").get(0);
        (0, a.default)(".js-intro-button, .js-intro-image, .js-intro-video").on("click", function(t) {
            t.preventDefault(), e.hide(), n.show(), i.paused ? i.play() : i.pause(), i.onended = function() {
                n.hide(), e.show()
            }
        }), t.on("click", function(t) {
            t.preventDefault(), (0, a.default)("html, body").animate({
                scrollTop: (0, a.default)((0, a.default)(this).attr("href")).offset().top
            }, 500)
        }), (0, a.default)(".c-course-item").hover(function() {
            var t = (0, a.default)(this).find("video")[0];
            if (t) {
                t.currentTime = 0;
                var e = t.play();
                "then" in e && e.catch(function(t) {})
            }
        }, function() {
            var t = (0, a.default)(this).find("video")[0];
            t && t.pause()
        })
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        return t && t.__esModule ? t : {
            default: t
        }
    }
    var a = n(0),
        o = i(a),
        s = n(9),
        r = i(s);
    (0, o.default)(document).ready(function() {
        var t = (0, o.default)(window),
            e = (0, o.default)(".js-container"),
            n = (0, o.default)(".js-nav"),
            i = (0, o.default)(".js-nav-toggle"),
            a = i.children("span"),
            s = (0, o.default)(".js-has-submenu"),
            u = (0, o.default)(".js-message-fixed"),
            l = !1,
            d = !1;
        if (i.on("click", function() {
                var o = t.scrollTop(),
                    s = e.scrollTop();
                a.toggleClass("is-active"), l ? (n.addClass("is-hidden"), d && i.addClass("is-absolute"), setTimeout(function() {
                    n.removeClass("is-active"), l = !1
                }, 100), e.removeClass("h-no-scroll"), t.scrollTop(s + 1 + (u.length && !d ? u.outerHeight() : 0))) : (n.scrollTop(0), n.removeClass("is-hidden"), d && i.delay(500).fadeOut(200, function() {
                    return i.removeClass("is-absolute")
                }).delay(400).fadeIn(200), setTimeout(function() {
                    n.addClass("is-active"), l = !0
                }, 100), e.addClass("h-no-scroll"), e.scrollTop(o - 1 - (u.length ? u.outerHeight() : 0)))
            }), !LUX.Config.isMobile) {
            s.hover(function() {
                (0, o.default)(this).find(".js-submenu").addClass("is-opened")
            }, function() {
                (0, o.default)(this).find(".js-submenu").removeClass("is-opened")
            })
        }
        u.length && (0, r.default)(".js-message-fixed").on("enter", function() {
            l || (d = !0, i.addClass("is-absolute"))
        }).on("exit", function() {
            l || (d = !1, i.removeClass("is-absolute"))
        })
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        var e = (0, s.default)("<div>", {
            class: "c-line" + (t.animate ? "" : " is-visible")
        });
        return e.css({
            left: t.posX + "%",
            height: t.height + "%"
        }), e
    }
    var a = function() {
            function t(t, e) {
                var n = [],
                    i = !0,
                    a = !1,
                    o = void 0;
                try {
                    for (var s, r = t[Symbol.iterator](); !(i = (s = r.next()).done) && (n.push(s.value), !e || n.length !== e); i = !0);
                } catch (t) {
                    a = !0, o = t
                } finally {
                    try {
                        !i && r.return && r.return()
                    } finally {
                        if (a) throw o
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = n(0),
        s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(o),
        r = n(1);
    s.default.fn.lines = function() {
        return this.each(function() {
            var t = (0, s.default)(this),
                e = t.data("js-lines"),
                n = t.data("js-rect-animate");
            if (e) {
                e.split(/, ?/).forEach(function(e) {
                    var o = (0, r.convertToNumbers)(e.split(" ")),
                        s = a(o, 2),
                        u = s[0],
                        l = s[1],
                        d = i({
                            posX: u,
                            height: l,
                            animate: n
                        });
                    "static" == window.getComputedStyle(t[0]).position && t.addClass("h-rel"), t.append(d)
                })
            }
        })
    }, (0, s.default)(".js-lines").lines()
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(document).ready(function() {
        var t = (0, a.default)(".js-message"),
            e = (0, a.default)("form .is-invalid").first();
        if (t.length && setTimeout(function() {
                t.slideUp(300)
            }, 5e3), e.length) {
            var n = e.offset().top;
            n > (0, a.default)(window).height() && (0, a.default)(document).scrollTop(n - 100)
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(document).ready(function() {
        function t(t) {
            t.preventDefault();
            var e = i.val();
            if (!e) return i.addClass(r);
            i.addClass(s), a.default.post(window.atob(n.data("api-url")), {
                email: e
            }).done(function(t) {
                t.success ? (n.remove(), o.text(t.message)) : i.removeClass(s).addClass(r)
            })
        }

        function e(t) {
            t.preventDefault();
            var a = i.val();
            if (!a) return i.addClass(r);
            n.off("submit", e).attr("action", n.attr("action") + "?email=" + a).submit()
        }
        var n = (0, a.default)(".js-newsletter-form"),
            i = n.find("input[name='email']"),
            o = (0, a.default)(".js-newsletter-text"),
            s = "is-animated",
            r = "is-invalid";
        n.on("submit", LUX.Config.isLoggedIn ? t : e)
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        var e = (0, s.default)("<div>", {
            class: "c-orn c-orn--" + t.type
        });
        return e.css({
            top: t.posY + "%",
            left: t.posX + "%"
        }), e
    }
    var a = function() {
            function t(t, e) {
                var n = [],
                    i = !0,
                    a = !1,
                    o = void 0;
                try {
                    for (var s, r = t[Symbol.iterator](); !(i = (s = r.next()).done) && (n.push(s.value), !e || n.length !== e); i = !0);
                } catch (t) {
                    a = !0, o = t
                } finally {
                    try {
                        !i && r.return && r.return()
                    } finally {
                        if (a) throw o
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = n(0),
        s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(o),
        r = n(1);
    s.default.fn.ornaments = function() {
        return this.each(function() {
            var t = (0, s.default)(this),
                e = t.data("js-ornaments"),
                n = t.data("js-ornaments-animate");
            if (e) {
                var o = e.split(/, ?/),
                    u = [];
                o.forEach(function(e) {
                    var n = (0, r.convertToNumbers)(e.split(" ")),
                        o = a(n, 3),
                        s = o[0],
                        l = o[1],
                        d = o[2],
                        c = i({
                            type: s,
                            posX: d,
                            posY: l
                        });
                    u.push(c), "static" == window.getComputedStyle(t[0]).position && t.addClass("h-rel"), t.append(c)
                }), n && s.default.each(u, function(t, e) {
                    setTimeout(function() {
                        return e.addClass("is-animated")
                    }, 500 * t)
                })
            }
        })
    }, (0, s.default)(".js-ornaments").ornaments()
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(document).ready(function() {
        var t = (0, a.default)(".js-user-avatar [data-id]"),
            e = (0, a.default)("input[name='avatar']"),
            n = e.closest("form");
        t.on("click", function() {
            e.val((0, a.default)(this).data("id")), n.submit()
        })
    })
}, function(t, e, n) {
    "use strict";

    function i(t) {
        var e = (0, s.default)("<div>", {
            class: "c-rect" + (t.animate ? "" : " is-visible")
        });
        return e.css({
            width: t.width + "%",
            height: t.height + "%",
            top: t.posY + "%",
            left: t.posX + "%"
        }), e
    }
    var a = function() {
            function t(t, e) {
                var n = [],
                    i = !0,
                    a = !1,
                    o = void 0;
                try {
                    for (var s, r = t[Symbol.iterator](); !(i = (s = r.next()).done) && (n.push(s.value), !e || n.length !== e); i = !0);
                } catch (t) {
                    a = !0, o = t
                } finally {
                    try {
                        !i && r.return && r.return()
                    } finally {
                        if (a) throw o
                    }
                }
                return n
            }
            return function(e, n) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return t(e, n);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        o = n(0),
        s = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(o),
        r = n(1);
    s.default.fn.rect = function() {
        return this.each(function() {
            var t = (0, s.default)(this),
                e = t.data("js-rect"),
                n = t.data("js-rect-animate");
            if (e) {
                e.split(/, ?/).forEach(function(e) {
                    var o = (0, r.convertToNumbers)(e.split(" ")),
                        s = a(o, 4),
                        u = s[0],
                        l = s[1],
                        d = s[2],
                        c = s[3],
                        f = i({
                            width: l - u,
                            height: c - d,
                            posX: u,
                            posY: d,
                            animate: n
                        });
                    "static" == window.getComputedStyle(t[0]).position && t.addClass("h-rel"), t.append(f)
                })
            }
        })
    }, (0, s.default)(".js-rect").rect()
}, function(t, e, n) {
    "use strict";

    function i(t, e) {
        o.default.ajax({
            url: t,
            method: "PATCH",
            data: {
                change_field: "ref_shared",
                ref_shared: e
            }
        })
    }
    var a = n(0),
        o = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(a),
        s = n(1);
    (0, o.default)(document).ready(function() {
        if (window.LUX && window.LUX.Referrals) {
            var t = (0, o.default)(".js-copy"),
                e = LUX.Referrals.apiUrl,
                n = LUX.Referrals.facebook,
                a = LUX.Referrals.twitter;
            if (t.on("click", function(t) {
                    t.preventDefault();
                    var e = (0, o.default)(".js-copy-field"),
                        n = e.val();
                    e.val((0, o.default)(this).attr("href")).select(), document.execCommand("copy", !1) && (e.val(n).blur(), (0, s.replaceIcon)(this, "ref-link", "ref-approved"))
                }), n.shared || o.default.getScript(n.script).done(function() {
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId: n.appId,
                            version: n.version
                        }), (0, o.default)(".js-share-facebook").on("click", function t(a) {
                            var r = this;
                            a.preventDefault(), FB.ui({
                                method: "share",
                                href: n.url
                            }, function(n) {
                                n && !n.error_message && (i(e, "facebook"), (0, o.default)(r).off("click", t), (0, s.replaceIcon)(r, "ref-facebook", "ref-approved"))
                            })
                        })
                    }
                }), !a.shared) {
                window.twttr = window.twttr || {};
                var r = window.twttr;
                r._e = [], r.ready = function(t) {
                    r._e.push(t)
                }, o.default.getScript(a.script).done(function() {
                    r.ready(function(t) {
                        var n = (0, o.default)(".js-share-twitter"),
                            r = n.attr("href");
                        n.attr("href", a.url), t.events.bind("tweet", function(t) {
                            n.attr("href", r), i(e, "twitter"), (0, s.replaceIcon)(n, "ref-twitter", "ref-approved")
                        })
                    })
                })
            }
        }
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    (0, a.default)(document).ready(function() {
        function t() {
            var t = u.val();
            a.default.post(window.atob(u.data("api-url")), {
                code: t
            }).done(function(e) {
                e.success ? (u.removeClass(c), u.addClass(d), l.val(t)) : (u.removeClass(d), u.addClass(c), l.val("")), o.text(e.price), s.text(e.discount)
            })
        }
        var e = (0, a.default)(".js-plan"),
            n = (0, a.default)(".js-plan-field"),
            i = (0, a.default)(".js-plan-total, .js-plan-renewal"),
            o = (0, a.default)(".js-plan-price"),
            s = (0, a.default)(".js-plan-discount"),
            r = (0, a.default)(".js-register-form"),
            u = (0, a.default)(".js-coupon-field"),
            l = (0, a.default)("input[name='coupon_code']"),
            d = "is-valid",
            c = "is-invalid";
        u.val() && t(), u.on("change", function() {
            return t()
        }), e.length < 2 || e.on("click", function() {
            var t = (0, a.default)(this),
                o = t.data("plan");
            if (e.removeClass("is-active"), t.addClass("is-active"), n.val(o), i.hide().filter('[data-plan="' + o + '"]').show(), r.length) {
                var s = r.find("input[name='redirect']");
                s.length || (s = r.append("<input type='hidden' name='redirect'>")), s.val(r.attr("action") + "?plan=" + o)
            }
        })
    })
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i),
        o = n(1);
    a.default.fn.tabs = function() {
        var t = (0, a.default)(window),
            e = (0, a.default)("html, body"),
            n = (0, o.findChild)("tabs");
        return this.each(function() {
            var i = (0, a.default)(this),
                o = i.find(n("nav-item")),
                s = i.find(n("tab"));
            o.on("click", function() {
                var n = (0, a.default)(this),
                    i = s.eq(n.index()),
                    r = s.filter(":visible").offset().top;
                o.removeClass("is-active"), n.addClass("is-active"), s.hide(), i.fadeIn(300), r > t.scrollTop() + t.height() && e.animate({
                    scrollTop: o.offset().top - 45
                }, 300)
            })
        })
    }, (0, a.default)(".js-tabs").tabs()
}, function(t, e, n) {
    "use strict";
    var i = n(0),
        a = function(t) {
            return t && t.__esModule ? t : {
                default: t
            }
        }(i);
    n(37), (0, a.default)(document).ready(function() {
        var t = (0, a.default)("body"),
            e = "a[href]:not([href^='http']):not([href^='#']):not([href^='mailto']):not([data-noanim])";
        if ((0, a.default)(e).on("click", function() {
                (0, a.default)(".animsition-overlay-slide").removeClass("is-hidden")
            }), (0, a.default)(".animsition-overlay").animsition({
                inClass: "overlay-slide-in-right",
                outClass: "overlay-slide-out-left",
                inDuration: 1e3,
                outDuration: 800,
                linkElement: e
            }).on("animsition.inEnd", function() {
                (0, a.default)(".animsition-overlay-slide").addClass("is-hidden")
            }), window.WOW && new WOW({
                mobile: !1,
                live: !1
            }).init(), t.hasClass("h-home") && !((0, a.default)(window).width() < 981)) {
            t.addClass("h-animate");
            var n = (0, a.default)(".js-intro"),
                i = n.find(".c-line"),
                o = n.find(".c-rect"),
                s = n.find(".c-orn"),
                r = n.find(".l-intro__section-1"),
                u = n.find(".c-intro__info"),
                l = n.find(".c-intro__image"),
                d = n.find(".c-intro__play");
            i.each(function(t) {
                var e = this;
                setTimeout(function() {
                    (0, a.default)(e).addClass("is-visible")
                }, 500 * t)
            }), o.each(function(t) {
                var e = this;
                setTimeout(function() {
                    (0, a.default)(e).addClass("is-visible")
                }, 500 * t)
            }), s.each(function(t) {
                var e = this;
                setTimeout(function() {
                    (0, a.default)(e).addClass("is-animated")
                }, 500 * t)
            }), setTimeout(function() {
                r.addClass("is-visible"), l.addClass("is-visible")
            }, 1500), setTimeout(function() {
                u.addClass("is-visible")
            }, 2e3), setTimeout(function() {
                d.addClass("is-visible")
            }, 3e3)
        }
    })
}, function(t, e, n) {
    "use strict";
    var i, a, o, s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
        return typeof t
    } : function(t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
    };
    ! function(s) {
        a = [n(0)], i = s, void 0 !== (o = "function" == typeof i ? i.apply(e, a) : i) && (t.exports = o)
    }(function(t) {
        var e = "animsition",
            n = {
                init: function(i) {
                    i = t.extend({
                        inClass: "fade-in",
                        outClass: "fade-out",
                        inDuration: 1500,
                        outDuration: 800,
                        linkElement: ".animsition-link",
                        loading: !0,
                        loadingParentElement: "body",
                        loadingClass: "animsition-loading",
                        loadingInner: "",
                        timeout: !1,
                        timeoutCountdown: 5e3,
                        onLoadEvent: !0,
                        browser: ["animation-duration", "-webkit-animation-duration"],
                        overlay: !1,
                        overlayClass: "animsition-overlay-slide",
                        overlayParentElement: "body",
                        transition: function(t) {
                            window.location.href = t
                        }
                    }, i), n.settings = {
                        timer: !1,
                        data: {
                            inClass: "animsition-in-class",
                            inDuration: "animsition-in-duration",
                            outClass: "animsition-out-class",
                            outDuration: "animsition-out-duration",
                            overlay: "animsition-overlay"
                        },
                        events: {
                            inStart: "animsition.inStart",
                            inEnd: "animsition.inEnd",
                            outStart: "animsition.outStart",
                            outEnd: "animsition.outEnd"
                        }
                    };
                    var a = n.supportCheck.call(this, i);
                    return a || !(i.browser.length > 0) || a && this.length ? (n.optionCheck.call(this, i) && t("." + i.overlayClass).length <= 0 && n.addOverlay.call(this, i), i.loading && t("." + i.loadingClass).length <= 0 && n.addLoading.call(this, i), this.each(function() {
                        var a = this,
                            o = t(this),
                            s = t(window),
                            r = t(document);
                        o.data(e) || (i = t.extend({}, i), o.data(e, {
                            options: i
                        }), i.timeout && n.addTimer.call(a), i.onLoadEvent && s.on("load.animsition", function() {
                            n.settings.timer && clearTimeout(n.settings.timer), n.in.call(a)
                        }), s.on("pageshow.animsition", function(t) {
                            t.originalEvent.persisted && n.in.call(a)
                        }), s.on("unload.animsition", function() {}), r.on("click.animsition", i.linkElement, function(e) {
                            e.preventDefault();
                            var i = t(this),
                                o = i.attr("href");
                            2 === e.which || e.metaKey || e.shiftKey || -1 !== navigator.platform.toUpperCase().indexOf("WIN") && e.ctrlKey ? window.open(o, "_blank") : n.out.call(a, i, o)
                        }))
                    })) : ("console" in window || (window.console = {}, window.console.log = function(t) {
                        return t
                    }), this.length || console.log("Animsition: Element does not exist on page."), a || console.log("Animsition: Does not support this browser."), n.destroy.call(this))
                },
                addOverlay: function(e) {
                    t(e.overlayParentElement).prepend('<div class="' + e.overlayClass + '"></div>')
                },
                addLoading: function(e) {
                    t(e.loadingParentElement).append('<div class="' + e.loadingClass + '">' + e.loadingInner + "</div>")
                },
                removeLoading: function() {
                    var n = t(this),
                        i = n.data(e).options;
                    t(i.loadingParentElement).children("." + i.loadingClass).fadeOut().remove()
                },
                addTimer: function() {
                    var i = this,
                        a = t(this),
                        o = a.data(e).options;
                    n.settings.timer = setTimeout(function() {
                        n.in.call(i), t(window).off("load.animsition")
                    }, o.timeoutCountdown)
                },
                supportCheck: function(e) {
                    var n = t(this),
                        i = e.browser,
                        a = i.length,
                        o = !1;
                    0 === a && (o = !0);
                    for (var s = 0; s < a; s++)
                        if ("string" == typeof n.css(i[s])) {
                            o = !0;
                            break
                        }
                    return o
                },
                optionCheck: function(e) {
                    var i = t(this);
                    return !(!e.overlay && !i.data(n.settings.data.overlay))
                },
                animationCheck: function(n, i, a) {
                    var o = t(this),
                        r = o.data(e).options,
                        u = void 0 === n ? "undefined" : s(n),
                        l = !i && "number" === u,
                        d = i && "string" === u && n.length > 0;
                    return l || d ? n = n : i && a ? n = r.inClass : !i && a ? n = r.inDuration : i && !a ? n = r.outClass : i || a || (n = r.outDuration), n
                },
                in: function() {
                    var i = this,
                        a = t(this),
                        o = a.data(e).options,
                        s = a.data(n.settings.data.inDuration),
                        r = a.data(n.settings.data.inClass),
                        u = n.animationCheck.call(i, s, !1, !0),
                        l = n.animationCheck.call(i, r, !0, !0),
                        d = n.optionCheck.call(i, o),
                        c = a.data(e).outClass;
                    o.loading && n.removeLoading.call(i), c && a.removeClass(c), d ? n.inOverlay.call(i, l, u) : n.inDefault.call(i, l, u)
                },
                inDefault: function(e, i) {
                    var a = t(this);
                    a.css({
                        "animation-duration": i + "ms"
                    }).addClass(e).trigger(n.settings.events.inStart).animateCallback(function() {
                        a.removeClass(e).css({
                            opacity: 1
                        }).trigger(n.settings.events.inEnd)
                    })
                },
                inOverlay: function(i, a) {
                    var o = t(this),
                        s = o.data(e).options;
                    o.css({
                        opacity: 1
                    }).trigger(n.settings.events.inStart), t(s.overlayParentElement).children("." + s.overlayClass).css({
                        "animation-duration": a + "ms"
                    }).addClass(i).animateCallback(function() {
                        o.trigger(n.settings.events.inEnd)
                    })
                },
                out: function(i, a) {
                    var o = this,
                        s = t(this),
                        r = s.data(e).options,
                        u = i.data(n.settings.data.outClass),
                        l = s.data(n.settings.data.outClass),
                        d = i.data(n.settings.data.outDuration),
                        c = s.data(n.settings.data.outDuration),
                        f = u || l,
                        p = d || c,
                        h = n.animationCheck.call(o, f, !0, !1),
                        v = n.animationCheck.call(o, p, !1, !1),
                        m = n.optionCheck.call(o, r);
                    s.data(e).outClass = h, m ? n.outOverlay.call(o, h, v, a) : n.outDefault.call(o, h, v, a)
                },
                outDefault: function(i, a, o) {
                    var s = t(this),
                        r = s.data(e).options;
                    s.css({
                        "animation-duration": a + 1 + "ms"
                    }).addClass(i).trigger(n.settings.events.outStart).animateCallback(function() {
                        s.trigger(n.settings.events.outEnd), r.transition(o)
                    })
                },
                outOverlay: function(i, a, o) {
                    var s = this,
                        r = t(this),
                        u = r.data(e).options,
                        l = r.data(n.settings.data.inClass),
                        d = n.animationCheck.call(s, l, !0, !0);
                    t(u.overlayParentElement).children("." + u.overlayClass).css({
                        "animation-duration": a + 1 + "ms"
                    }).removeClass(d).addClass(i).trigger(n.settings.events.outStart).animateCallback(function() {
                        r.trigger(n.settings.events.outEnd), u.transition(o)
                    })
                },
                destroy: function() {
                    return this.each(function() {
                        var n = t(this);
                        t(window).off(".animsition"), n.css({
                            opacity: 1
                        }).removeData(e)
                    })
                }
            };
        t.fn.animateCallback = function(e) {
            var n = "animationend webkitAnimationEnd";
            return this.each(function() {
                var i = t(this);
                i.on(n, function() {
                    return i.off(n), e.call(this)
                })
            })
        }, t.fn.animsition = function(i) {
            return n[i] ? n[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== (void 0 === i ? "undefined" : s(i)) && i ? void t.error("Method " + i + " does not exist on jQuery." + e) : n.init.apply(this, arguments)
        }
    })
}], [10]);