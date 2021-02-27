(function (d) {
    var k = d.scrollTo = function (a, i, e) {
        d(window).scrollTo(a, i, e)
    };
    k.defaults = {
        axis: 'xy',
        duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1
    };
    k.window = function (a) {
        return d(window)._scrollable()
    };
    d.fn._scrollable = function () {
        return this.map(function () {
            var a = this,
                i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
            if (!i) return a;
            var e = (a.contentWindow || a).document || a.ownerDocument || a;
            return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement
        })
    };
    d.fn.scrollTo = function (n, j, b) {
        if (typeof j == 'object') {
            b = j;
            j = 0
        }
        if (typeof b == 'function') b = {
            onAfter: b
        };
        if (n == 'max') n = 9e9;
        b = d.extend({}, k.defaults, b);
        j = j || b.speed || b.duration;
        b.queue = b.queue && b.axis.length > 1;
        if (b.queue) j /= 2;
        b.offset = p(b.offset);
        b.over = p(b.over);
        return this._scrollable().each(function () {
            var q = this,
                r = d(q),
                f = n,
                s, g = {},
                u = r.is('html,body');
            switch (typeof f) {
                case 'number':
                case 'string':
                    if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) {
                        f = p(f);
                        break
                    }
                    f = d(f, this);
                case 'object':
                    if (f.is || f.style) s = (f = d(f)).offset()
            }
            d.each(b.axis.split(''), function (a, i) {
                var e = i == 'x' ? 'Left' : 'Top',
                    h = e.toLowerCase(),
                    c = 'scroll' + e,
                    l = q[c],
                    m = k.max(q, i);
                if (s) {
                    g[c] = s[h] + (u ? 0 : l - r.offset()[h]);
                    if (b.margin) {
                        g[c] -= parseInt(f.css('margin' + e)) || 0;
                        g[c] -= parseInt(f.css('border' + e + 'Width')) || 0
                    }
                    g[c] += b.offset[h] || 0;
                    if (b.over[h]) g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h]
                } else {
                    var o = f[h];
                    g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o
                }
                if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m);
                if (!a && b.queue) {
                    if (l != g[c]) t(b.onAfterFirst);
                    delete g[c]
                }
            });
            t(b.onAfter);

            function t(a) {
                r.animate(g, j, b.easing, a && function () {
                    a.call(this, n, b)
                })
            }
        }).end()
    };
    k.max = function (a, i) {
        var e = i == 'x' ? 'Width' : 'Height',
            h = 'scroll' + e;
        if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()]();
        var c = 'client' + e,
            l = a.ownerDocument.documentElement,
            m = a.ownerDocument.body;
        return Math.max(l[h], m[h]) - Math.min(l[c], m[c])
    };

    function p(a) {
        return typeof a == 'object' ? a : {
            top: a,
            left: a
        }
    }
})(jQuery);
! function (r) {
    "function" == typeof define && define.amd ? define(["jquery"], r) : "object" == typeof module && module.exports ? module.exports = function (e, t) {
        return void 0 === t && (t = "undefined" != typeof window ? require("jquery") : require("jquery")(e)), r(t), t
    } : r(jQuery)
}(function (q) {
    "use strict";
    var p = /\r?\n/g,
        w = {};
    w.fileapi = void 0 !== q('<input type="file">').get(0).files, w.formdata = void 0 !== window.FormData;
    var _ = !!q.fn.prop;

    function i(e) {
        var t = e.data;
        e.isDefaultPrevented() || (e.preventDefault(), q(e.target).closest("form").ajaxSubmit(t))
    }

    function o(e) {
        var t = e.target,
            r = q(t);
        if (!r.is("[type=submit],[type=image]")) {
            var a = r.closest("[type=submit]");
            if (0 === a.length) return;
            t = a[0]
        }
        var n = t.form;
        if ("image" === (n.clk = t).type)
            if (void 0 !== e.offsetX) n.clk_x = e.offsetX, n.clk_y = e.offsetY;
            else if ("function" == typeof q.fn.offset) {
            var i = r.offset();
            n.clk_x = e.pageX - i.left, n.clk_y = e.pageY - i.top
        } else n.clk_x = e.pageX - t.offsetLeft, n.clk_y = e.pageY - t.offsetTop;
        setTimeout(function () {
            n.clk = n.clk_x = n.clk_y = null
        }, 100)
    }

    function N() {
        if (q.fn.ajaxSubmit.debug) {
            var e = "[jquery.form] " + Array.prototype.join.call(arguments, "");
            window.console && window.console.log ? window.console.log(e) : window.opera && window.opera.postError && window.opera.postError(e)
        }
    }
    q.fn.attr2 = function () {
        if (!_) return this.attr.apply(this, arguments);
        var e = this.prop.apply(this, arguments);
        return e && e.jquery || "string" == typeof e ? e : this.attr.apply(this, arguments)
    }, q.fn.ajaxSubmit = function (M, e, t, r) {
        if (!this.length) return N("ajaxSubmit: skipping submit process - no element selected"), this;
        var O, a, n, X = this;
        "function" == typeof M ? M = {
            success: M
        } : "string" == typeof M || !1 === M && 0 < arguments.length ? (M = {
            url: M,
            data: e,
            dataType: t
        }, "function" == typeof r && (M.success = r)) : void 0 === M && (M = {}), O = M.method || M.type || this.attr2("method"), n = (n = (n = "string" == typeof (a = M.url || this.attr2("action")) ? q.trim(a) : "") || window.location.href || "") && (n.match(/^([^#]+)/) || [])[1], M = q.extend(!0, {
            url: n,
            success: q.ajaxSettings.success,
            type: O || q.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
        }, M);
        var i = {};
        if (this.trigger("form-pre-serialize", [this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
        if (M.beforeSerialize && !1 === M.beforeSerialize(this, M)) return N("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
        var o = M.traditional;
        void 0 === o && (o = q.ajaxSettings.traditional);
        var s, C = [],
            u = this.formToArray(M.semantic, C, M.filtering);
        if (M.data) {
            var c = q.isFunction(M.data) ? M.data(u) : M.data;
            M.extraData = c, s = q.param(c, o)
        }
        if (M.beforeSubmit && !1 === M.beforeSubmit(u, this, M)) return N("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
        if (this.trigger("form-submit-validate", [u, this, M, i]), i.veto) return N("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
        var l = q.param(u, o);
        s && (l = l ? l + "&" + s : s), "GET" === M.type.toUpperCase() ? (M.url += (0 <= M.url.indexOf("?") ? "&" : "?") + l, M.data = null) : M.data = l;
        var f = [];
        if (M.resetForm && f.push(function () {
                X.resetForm()
            }), M.clearForm && f.push(function () {
                X.clearForm(M.includeHidden)
            }), !M.dataType && M.target) {
            var d = M.success || function () {};
            f.push(function (e, t, r) {
                var a = arguments,
                    n = M.replaceTarget ? "replaceWith" : "html";
                q(M.target)[n](e).each(function () {
                    d.apply(this, a)
                })
            })
        } else M.success && (q.isArray(M.success) ? q.merge(f, M.success) : f.push(M.success));
        if (M.success = function (e, t, r) {
                for (var a = M.context || this, n = 0, i = f.length; n < i; n++) f[n].apply(a, [e, t, r || X, X])
            }, M.error) {
            var p = M.error;
            M.error = function (e, t, r) {
                var a = M.context || this;
                p.apply(a, [e, t, r, X])
            }
        }
        if (M.complete) {
            var m = M.complete;
            M.complete = function (e, t) {
                var r = M.context || this;
                m.apply(r, [e, t, X])
            }
        }
        var h = 0 < q("input[type=file]:enabled", this).filter(function () {
                return "" !== q(this).val()
            }).length,
            v = "multipart/form-data",
            g = X.attr("enctype") === v || X.attr("encoding") === v,
            x = w.fileapi && w.formdata;
        N("fileAPI :" + x);
        var y, b = (h || g) && !x;
        !1 !== M.iframe && (M.iframe || b) ? M.closeKeepAlive ? q.get(M.closeKeepAlive, function () {
            y = j(u)
        }) : y = j(u) : y = (h || g) && x ? function (e) {
            for (var r = new FormData, t = 0; t < e.length; t++) r.append(e[t].name, e[t].value);
            if (M.extraData) {
                var a = function (e) {
                    var t, r, a = q.param(e, M.traditional).split("&"),
                        n = a.length,
                        i = [];
                    for (t = 0; t < n; t++) a[t] = a[t].replace(/\+/g, " "), r = a[t].split("="), i.push([decodeURIComponent(r[0]), decodeURIComponent(r[1])]);
                    return i
                }(M.extraData);
                for (t = 0; t < a.length; t++) a[t] && r.append(a[t][0], a[t][1])
            }
            M.data = null;
            var n = q.extend(!0, {}, q.ajaxSettings, M, {
                contentType: !1,
                processData: !1,
                cache: !1,
                type: O || "POST"
            });
            M.uploadProgress && (n.xhr = function () {
                var e = q.ajaxSettings.xhr();
                return e.upload && e.upload.addEventListener("progress", function (e) {
                    var t = 0,
                        r = e.loaded || e.position,
                        a = e.total;
                    e.lengthComputable && (t = Math.ceil(r / a * 100)), M.uploadProgress(e, r, a, t)
                }, !1), e
            });
            n.data = null;
            var i = n.beforeSend;
            return n.beforeSend = function (e, t) {
                M.formData ? t.data = M.formData : t.data = r, i && i.call(this, e, t)
            }, q.ajax(n)
        }(u) : q.ajax(M), X.removeData("jqxhr").data("jqxhr", y);
        for (var T = 0; T < C.length; T++) C[T] = null;
        return this.trigger("form-submit-notify", [this, M]), this;

        function j(e) {
            var t, r, l, f, i, d, p, m, a, n, h, v, o = X[0],
                g = q.Deferred();
            if (g.abort = function (e) {
                    m.abort(e)
                }, e)
                for (r = 0; r < C.length; r++) t = q(C[r]), _ ? t.prop("disabled", !1) : t.removeAttr("disabled");
            (l = q.extend(!0, {}, q.ajaxSettings, M)).context = l.context || l, i = "jqFormIO" + (new Date).getTime();
            var s = o.ownerDocument,
                u = X.closest("body");
            if (l.iframeTarget ? (n = (d = q(l.iframeTarget, s)).attr2("name")) ? i = n : d.attr2("name", i) : (d = q('<iframe name="' + i + '" src="' + l.iframeSrc + '" />', s)).css({
                    position: "absolute",
                    top: "-1000px",
                    left: "-1000px"
                }), p = d[0], m = {
                    aborted: 0,
                    responseText: null,
                    responseXML: null,
                    status: 0,
                    statusText: "n/a",
                    getAllResponseHeaders: function () {},
                    getResponseHeader: function () {},
                    setRequestHeader: function () {},
                    abort: function (e) {
                        var t = "timeout" === e ? "timeout" : "aborted";
                        N("aborting upload... " + t), this.aborted = 1;
                        try {
                            p.contentWindow.document.execCommand && p.contentWindow.document.execCommand("Stop")
                        } catch (e) {}
                        d.attr("src", l.iframeSrc), m.error = t, l.error && l.error.call(l.context, m, t, e), f && q.event.trigger("ajaxError", [m, l, t]), l.complete && l.complete.call(l.context, m, t)
                    }
                }, (f = l.global) && 0 == q.active++ && q.event.trigger("ajaxStart"), f && q.event.trigger("ajaxSend", [m, l]), l.beforeSend && !1 === l.beforeSend.call(l.context, m, l)) return l.global && q.active--, g.reject(), g;
            if (m.aborted) return g.reject(), g;
            (a = o.clk) && (n = a.name) && !a.disabled && (l.extraData = l.extraData || {}, l.extraData[n] = a.value, "image" === a.type && (l.extraData[n + ".x"] = o.clk_x, l.extraData[n + ".y"] = o.clk_y));
            var x = 1,
                y = 2;

            function b(t) {
                var r = null;
                try {
                    t.contentWindow && (r = t.contentWindow.document)
                } catch (e) {
                    N("cannot get iframe.contentWindow document: " + e)
                }
                if (r) return r;
                try {
                    r = t.contentDocument ? t.contentDocument : t.document
                } catch (e) {
                    N("cannot get iframe.contentDocument: " + e), r = t.document
                }
                return r
            }
            var c = q("meta[name=csrf-token]").attr("content"),
                T = q("meta[name=csrf-param]").attr("content");

            function j() {
                var e = X.attr2("target"),
                    t = X.attr2("action"),
                    r = X.attr("enctype") || X.attr("encoding") || "multipart/form-data";
                o.setAttribute("target", i), O && !/post/i.test(O) || o.setAttribute("method", "POST"), t !== l.url && o.setAttribute("action", l.url), l.skipEncodingOverride || O && !/post/i.test(O) || X.attr({
                    encoding: "multipart/form-data",
                    enctype: "multipart/form-data"
                }), l.timeout && (v = setTimeout(function () {
                    h = !0, A(x)
                }, l.timeout));
                var a = [];
                try {
                    if (l.extraData)
                        for (var n in l.extraData) l.extraData.hasOwnProperty(n) && (q.isPlainObject(l.extraData[n]) && l.extraData[n].hasOwnProperty("name") && l.extraData[n].hasOwnProperty("value") ? a.push(q('<input type="hidden" name="' + l.extraData[n].name + '">', s).val(l.extraData[n].value).appendTo(o)[0]) : a.push(q('<input type="hidden" name="' + n + '">', s).val(l.extraData[n]).appendTo(o)[0]));
                    l.iframeTarget || d.appendTo(u), p.attachEvent ? p.attachEvent("onload", A) : p.addEventListener("load", A, !1), setTimeout(function e() {
                        try {
                            var t = b(p).readyState;
                            N("state = " + t), t && "uninitialized" === t.toLowerCase() && setTimeout(e, 50)
                        } catch (e) {
                            N("Server abort: ", e, " (", e.name, ")"), A(y), v && clearTimeout(v), v = void 0
                        }
                    }, 15);
                    try {
                        o.submit()
                    } catch (e) {
                        document.createElement("form").submit.apply(o)
                    }
                } finally {
                    o.setAttribute("action", t), o.setAttribute("enctype", r), e ? o.setAttribute("target", e) : X.removeAttr("target"), q(a).remove()
                }
            }
            T && c && (l.extraData = l.extraData || {}, l.extraData[T] = c), l.forceSync ? j() : setTimeout(j, 10);
            var w, S, k, D = 50;

            function A(e) {
                if (!m.aborted && !k) {
                    if ((S = b(p)) || (N("cannot access response document"), e = y), e === x && m) return m.abort("timeout"), void g.reject(m, "timeout");
                    if (e === y && m) return m.abort("server abort"), void g.reject(m, "error", "server abort");
                    if (S && S.location.href !== l.iframeSrc || h) {
                        p.detachEvent ? p.detachEvent("onload", A) : p.removeEventListener("load", A, !1);
                        var t, r = "success";
                        try {
                            if (h) throw "timeout";
                            var a = "xml" === l.dataType || S.XMLDocument || q.isXMLDoc(S);
                            if (N("isXml=" + a), !a && window.opera && (null === S.body || !S.body.innerHTML) && --D) return N("requeing onLoad callback, DOM not available"), void setTimeout(A, 250);
                            var n = S.body ? S.body : S.documentElement;
                            m.responseText = n ? n.innerHTML : null, m.responseXML = S.XMLDocument ? S.XMLDocument : S, a && (l.dataType = "xml"), m.getResponseHeader = function (e) {
                                return {
                                    "content-type": l.dataType
                                } [e.toLowerCase()]
                            }, n && (m.status = Number(n.getAttribute("status")) || m.status, m.statusText = n.getAttribute("statusText") || m.statusText);
                            var i = (l.dataType || "").toLowerCase(),
                                o = /(json|script|text)/.test(i);
                            if (o || l.textarea) {
                                var s = S.getElementsByTagName("textarea")[0];
                                if (s) m.responseText = s.value, m.status = Number(s.getAttribute("status")) || m.status, m.statusText = s.getAttribute("statusText") || m.statusText;
                                else if (o) {
                                    var u = S.getElementsByTagName("pre")[0],
                                        c = S.getElementsByTagName("body")[0];
                                    u ? m.responseText = u.textContent ? u.textContent : u.innerText : c && (m.responseText = c.textContent ? c.textContent : c.innerText)
                                }
                            } else "xml" === i && !m.responseXML && m.responseText && (m.responseXML = L(m.responseText));
                            try {
                                w = E(m, i, l)
                            } catch (e) {
                                r = "parsererror", m.error = t = e || r
                            }
                        } catch (e) {
                            N("error caught: ", e), r = "error", m.error = t = e || r
                        }
                        m.aborted && (N("upload aborted"), r = null), m.status && (r = 200 <= m.status && m.status < 300 || 304 === m.status ? "success" : "error"), "success" === r ? (l.success && l.success.call(l.context, w, "success", m), g.resolve(m.responseText, "success", m), f && q.event.trigger("ajaxSuccess", [m, l])) : r && (void 0 === t && (t = m.statusText), l.error && l.error.call(l.context, m, r, t), g.reject(m, "error", t), f && q.event.trigger("ajaxError", [m, l, t])), f && q.event.trigger("ajaxComplete", [m, l]), f && !--q.active && q.event.trigger("ajaxStop"), l.complete && l.complete.call(l.context, m, r), k = !0, l.timeout && clearTimeout(v), setTimeout(function () {
                            l.iframeTarget ? d.attr("src", l.iframeSrc) : d.remove(), m.responseXML = null
                        }, 100)
                    }
                }
            }
            var L = q.parseXML || function (e, t) {
                    return window.ActiveXObject ? ((t = new ActiveXObject("Microsoft.XMLDOM")).async = "false", t.loadXML(e)) : t = (new DOMParser).parseFromString(e, "text/xml"), t && t.documentElement && "parsererror" !== t.documentElement.nodeName ? t : null
                },
                F = q.parseJSON || function (e) {
                    return window.eval("(" + e + ")")
                },
                E = function (e, t, r) {
                    var a = e.getResponseHeader("content-type") || "",
                        n = ("xml" === t || !t) && 0 <= a.indexOf("xml"),
                        i = n ? e.responseXML : e.responseText;
                    return n && "parsererror" === i.documentElement.nodeName && q.error && q.error("parsererror"), r && r.dataFilter && (i = r.dataFilter(i, t)), "string" == typeof i && (("json" === t || !t) && 0 <= a.indexOf("json") ? i = F(i) : ("script" === t || !t) && 0 <= a.indexOf("javascript") && q.globalEval(i)), i
                };
            return g
        }
    }, q.fn.ajaxForm = function (e, t, r, a) {
        if (("string" == typeof e || !1 === e && 0 < arguments.length) && (e = {
                url: e,
                data: t,
                dataType: r
            }, "function" == typeof a && (e.success = a)), (e = e || {}).delegation = e.delegation && q.isFunction(q.fn.on), e.delegation || 0 !== this.length) return e.delegation ? (q(document).off("submit.form-plugin", this.selector, i).off("click.form-plugin", this.selector, o).on("submit.form-plugin", this.selector, e, i).on("click.form-plugin", this.selector, e, o), this) : this.ajaxFormUnbind().on("submit.form-plugin", e, i).on("click.form-plugin", e, o);
        var n = {
            s: this.selector,
            c: this.context
        };
        return !q.isReady && n.s ? (N("DOM not ready, queuing ajaxForm"), q(function () {
            q(n.s, n.c).ajaxForm(e)
        })) : N("terminating; zero elements found by selector" + (q.isReady ? "" : " (DOM not ready)")), this
    }, q.fn.ajaxFormUnbind = function () {
        return this.off("submit.form-plugin click.form-plugin")
    }, q.fn.formToArray = function (e, t, r) {
        var a = [];
        if (0 === this.length) return a;
        var n, i, o, s, u, c, l, f, d = this[0],
            p = this.attr("id"),
            m = e || void 0 === d.elements ? d.getElementsByTagName("*") : d.elements;
        if (m = m && q.makeArray(m), p && (e || /(Edge|Trident)\//.test(navigator.userAgent)) && (n = q(':input[form="' + p + '"]').get()).length && (m = (m || []).concat(n)), !m || !m.length) return a;
        for (q.isFunction(r) && (m = q.map(m, r)), i = 0, l = m.length; i < l; i++)
            if ((s = (c = m[i]).name) && !c.disabled)
                if (e && d.clk && "image" === c.type) d.clk === c && (a.push({
                    name: s,
                    value: q(c).val(),
                    type: c.type
                }), a.push({
                    name: s + ".x",
                    value: d.clk_x
                }, {
                    name: s + ".y",
                    value: d.clk_y
                }));
                else if ((u = q.fieldValue(c, !0)) && u.constructor === Array)
            for (t && t.push(c), o = 0, f = u.length; o < f; o++) a.push({
                name: s,
                value: u[o]
            });
        else if (w.fileapi && "file" === c.type) {
            t && t.push(c);
            var h = c.files;
            if (h.length)
                for (o = 0; o < h.length; o++) a.push({
                    name: s,
                    value: h[o],
                    type: c.type
                });
            else a.push({
                name: s,
                value: "",
                type: c.type
            })
        } else null != u && (t && t.push(c), a.push({
            name: s,
            value: u,
            type: c.type,
            required: c.required
        }));
        if (!e && d.clk) {
            var v = q(d.clk),
                g = v[0];
            (s = g.name) && !g.disabled && "image" === g.type && (a.push({
                name: s,
                value: v.val()
            }), a.push({
                name: s + ".x",
                value: d.clk_x
            }, {
                name: s + ".y",
                value: d.clk_y
            }))
        }
        return a
    }, q.fn.formSerialize = function (e) {
        return q.param(this.formToArray(e))
    }, q.fn.fieldSerialize = function (n) {
        var i = [];
        return this.each(function () {
            var e = this.name;
            if (e) {
                var t = q.fieldValue(this, n);
                if (t && t.constructor === Array)
                    for (var r = 0, a = t.length; r < a; r++) i.push({
                        name: e,
                        value: t[r]
                    });
                else null != t && i.push({
                    name: this.name,
                    value: t
                })
            }
        }), q.param(i)
    }, q.fn.fieldValue = function (e) {
        for (var t = [], r = 0, a = this.length; r < a; r++) {
            var n = this[r],
                i = q.fieldValue(n, e);
            null == i || i.constructor === Array && !i.length || (i.constructor === Array ? q.merge(t, i) : t.push(i))
        }
        return t
    }, q.fieldValue = function (e, t) {
        var r = e.name,
            a = e.type,
            n = e.tagName.toLowerCase();
        if (void 0 === t && (t = !0), t && (!r || e.disabled || "reset" === a || "button" === a || ("checkbox" === a || "radio" === a) && !e.checked || ("submit" === a || "image" === a) && e.form && e.form.clk !== e || "select" === n && -1 === e.selectedIndex)) return null;
        if ("select" !== n) return q(e).val().replace(p, "\r\n");
        var i = e.selectedIndex;
        if (i < 0) return null;
        for (var o = [], s = e.options, u = "select-one" === a, c = u ? i + 1 : s.length, l = u ? i : 0; l < c; l++) {
            var f = s[l];
            if (f.selected && !f.disabled) {
                var d = f.value;
                if (d = d || (f.attributes && f.attributes.value && !f.attributes.value.specified ? f.text : f.value), u) return d;
                o.push(d)
            }
        }
        return o
    }, q.fn.clearForm = function (e) {
        return this.each(function () {
            q("input,select,textarea", this).clearFields(e)
        })
    }, q.fn.clearFields = q.fn.clearInputs = function (r) {
        var a = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
            var e = this.type,
                t = this.tagName.toLowerCase();
            a.test(e) || "textarea" === t ? this.value = "" : "checkbox" === e || "radio" === e ? this.checked = !1 : "select" === t ? this.selectedIndex = -1 : "file" === e ? /MSIE/.test(navigator.userAgent) ? q(this).replaceWith(q(this).clone(!0)) : q(this).val("") : r && (!0 === r && /hidden/.test(e) || "string" == typeof r && q(this).is(r)) && (this.value = "")
        })
    }, q.fn.resetForm = function () {
        return this.each(function () {
            var t = q(this),
                e = this.tagName.toLowerCase();
            switch (e) {
                case "input":
                    this.checked = this.defaultChecked;
                case "textarea":
                    return this.value = this.defaultValue, !0;
                case "option":
                case "optgroup":
                    var r = t.parents("select");
                    return r.length && r[0].multiple ? "option" === e ? this.selected = this.defaultSelected : t.find("option").resetForm() : r.resetForm(), !0;
                case "select":
                    return t.find("option").each(function (e) {
                        if (this.selected = this.defaultSelected, this.defaultSelected && !t[0].multiple) return t[0].selectedIndex = e, !1
                    }), !0;
                case "label":
                    var a = q(t.attr("for")),
                        n = t.find("input,select,textarea");
                    return a[0] && n.unshift(a[0]), n.resetForm(), !0;
                case "form":
                    return "function" != typeof this.reset && ("object" != typeof this.reset || this.reset.nodeType) || this.reset(), !0;
                default:
                    return t.find("form,input,label,select,textarea").resetForm(), !0
            }
        })
    }, q.fn.enable = function (e) {
        return void 0 === e && (e = !0), this.each(function () {
            this.disabled = !e
        })
    }, q.fn.selected = function (r) {
        return void 0 === r && (r = !0), this.each(function () {
            var e = this.type;
            if ("checkbox" === e || "radio" === e) this.checked = r;
            else if ("option" === this.tagName.toLowerCase()) {
                var t = q(this).parent("select");
                r && t[0] && "select-one" === t[0].type && t.find("option").selected(!1), this.selected = r
            }
        })
    }, q.fn.ajaxSubmit.debug = !1
});
var mailchimpSF = {
    "ajax_url": "https:\/\/ruta.tkdemos.co\/"
};
(function ($) {
    $(function ($) {
        $('#mc_submit_type').val('js');
        $('#mc_signup_form').ajaxForm({
            url: mailchimpSF.ajax_url,
            type: 'POST',
            dataType: 'text',
            beforeSubmit: mc_beforeForm,
            success: mc_success
        })
    });

    function mc_beforeForm() {
        $('#mc_signup_submit').attr("disabled", "disabled")
    }

    function mc_success(data) {
        $('#mc_signup_submit').removeAttr("disabled");
        $('#mc_message').html(data);
        var reg = new RegExp("class='mc_success_msg'", 'i');
        if (reg.test(data)) {
            $('#mc_signup_form').each(function () {
                this.reset()
            });
            $('#mc_submit_type').val('js')
        }
        $.scrollTo('#mc_signup', {
            offset: {
                top: -28
            }
        })
    }
})(jQuery);
/*!
 * jQuery UI Core 1.11.4
 * http://jqueryui.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */
! function (e) {
    "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
}(function (a) {
    var e, t, n, i;

    function r(e, t) {
        var n, i, r, o = e.nodeName.toLowerCase();
        return "area" === o ? (i = (n = e.parentNode).name, !(!e.href || !i || "map" !== n.nodeName.toLowerCase()) && (!!(r = a("img[usemap='#" + i + "']")[0]) && s(r))) : (/^(input|select|textarea|button|object)$/.test(o) ? !e.disabled : "a" === o && e.href || t) && s(e)
    }

    function s(e) {
        return a.expr.filters.visible(e) && !a(e).parents().addBack().filter(function () {
            return "hidden" === a.css(this, "visibility")
        }).length
    }
    a.ui = a.ui || {}, a.extend(a.ui, {
        version: "1.11.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }), a.fn.extend({
        scrollParent: function (e) {
            var t = this.css("position"),
                n = "absolute" === t,
                i = e ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
                r = this.parents().filter(function () {
                    var e = a(this);
                    return (!n || "static" !== e.css("position")) && i.test(e.css("overflow") + e.css("overflow-y") + e.css("overflow-x"))
                }).eq(0);
            return "fixed" !== t && r.length ? r : a(this[0].ownerDocument || document)
        },
        uniqueId: (e = 0, function () {
            return this.each(function () {
                this.id || (this.id = "ui-id-" + ++e)
            })
        }),
        removeUniqueId: function () {
            return this.each(function () {
                /^ui-id-\d+$/.test(this.id) && a(this).removeAttr("id")
            })
        }
    }), a.extend(a.expr[":"], {
        data: a.expr.createPseudo ? a.expr.createPseudo(function (t) {
            return function (e) {
                return !!a.data(e, t)
            }
        }) : function (e, t, n) {
            return !!a.data(e, n[3])
        },
        focusable: function (e) {
            return r(e, !isNaN(a.attr(e, "tabindex")))
        },
        tabbable: function (e) {
            var t = a.attr(e, "tabindex"),
                n = isNaN(t);
            return (n || 0 <= t) && r(e, !n)
        }
    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function (e, n) {
        var r = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
            i = n.toLowerCase(),
            o = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };

        function s(e, t, n, i) {
            return a.each(r, function () {
                t -= parseFloat(a.css(e, "padding" + this)) || 0, n && (t -= parseFloat(a.css(e, "border" + this + "Width")) || 0), i && (t -= parseFloat(a.css(e, "margin" + this)) || 0)
            }), t
        }
        a.fn["inner" + n] = function (e) {
            return void 0 === e ? o["inner" + n].call(this) : this.each(function () {
                a(this).css(i, s(this, e) + "px")
            })
        }, a.fn["outer" + n] = function (e, t) {
            return "number" != typeof e ? o["outer" + n].call(this, e) : this.each(function () {
                a(this).css(i, s(this, e, !0, t) + "px")
            })
        }
    }), a.fn.addBack || (a.fn.addBack = function (e) {
        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = (t = a.fn.removeData, function (e) {
        return arguments.length ? t.call(this, a.camelCase(e)) : t.call(this)
    })), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.fn.extend({
        focus: (i = a.fn.focus, function (t, n) {
            return "number" == typeof t ? this.each(function () {
                var e = this;
                setTimeout(function () {
                    a(e).focus(), n && n.call(e)
                }, t)
            }) : i.apply(this, arguments)
        }),
        disableSelection: (n = "onselectstart" in document.createElement("div") ? "selectstart" : "mousedown", function () {
            return this.bind(n + ".ui-disableSelection", function (e) {
                e.preventDefault()
            })
        }),
        enableSelection: function () {
            return this.unbind(".ui-disableSelection")
        },
        zIndex: function (e) {
            if (void 0 !== e) return this.css("zIndex", e);
            if (this.length)
                for (var t, n, i = a(this[0]); i.length && i[0] !== document;) {
                    if (("absolute" === (t = i.css("position")) || "relative" === t || "fixed" === t) && (n = parseInt(i.css("zIndex"), 10), !isNaN(n) && 0 !== n)) return n;
                    i = i.parent()
                }
            return 0
        }
    }), a.ui.plugin = {
        add: function (e, t, n) {
            var i, r = a.ui[e].prototype;
            for (i in n) r.plugins[i] = r.plugins[i] || [], r.plugins[i].push([t, n[i]])
        },
        call: function (e, t, n, i) {
            var r, o = e.plugins[t];
            if (o && (i || e.element[0].parentNode && 11 !== e.element[0].parentNode.nodeType))
                for (r = 0; r < o.length; r++) e.options[o[r][0]] && o[r][1].apply(e.element, n)
        }
    }
});;
(function ($, undefined) {
    $.extend($.ui, {
        datepicker: {
            version: "1.8.14"
        }
    });
    var PROP_NAME = 'datepicker';
    var dpuuid = new Date().getTime();
    var instActive;

    function Datepicker() {
        this.debug = !1;
        this._curInst = null;
        this._keyEvent = !1;
        this._disabledInputs = [];
        this._datepickerShowing = !1;
        this._inDialog = !1;
        this._mainDivId = 'ui-datepicker-div';
        this._inlineClass = 'ui-datepicker-inline';
        this._appendClass = 'ui-datepicker-append';
        this._triggerClass = 'ui-datepicker-trigger';
        this._dialogClass = 'ui-datepicker-dialog';
        this._disableClass = 'ui-datepicker-disabled';
        this._unselectableClass = 'ui-datepicker-unselectable';
        this._currentClass = 'ui-datepicker-current-day';
        this._dayOverClass = 'ui-datepicker-days-cell-over';
        this.regional = [];
        this.regional[''] = {
            closeText: 'Done',
            prevText: 'Prev',
            nextText: 'Next',
            currentText: 'Today',
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            weekHeader: 'Wk',
            dateFormat: 'mm/dd/yy',
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ''
        };
        this._defaults = {
            showOn: 'focus',
            showAnim: 'fadeIn',
            showOptions: {},
            defaultDate: null,
            appendText: '',
            buttonText: '...',
            buttonImage: '',
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: 'c-10:c+10',
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: '+10',
            minDate: null,
            maxDate: null,
            duration: 'fast',
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: '',
            altFormat: '',
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1
        };
        $.extend(this._defaults, this.regional['']);
        this.dpDiv = bindHover($('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))
    }
    $.extend(Datepicker.prototype, {
        markerClassName: 'hasDatepicker',
        maxRows: 4,
        log: function () {
            if (this.debug)
                console.log.apply('', arguments)
        },
        _widgetDatepicker: function () {
            return this.dpDiv
        },
        setDefaults: function (settings) {
            extendRemove(this._defaults, settings || {});
            return this
        },
        _attachDatepicker: function (target, settings) {
            var inlineSettings = null;
            for (var attrName in this._defaults) {
                var attrValue = target.getAttribute('date:' + attrName);
                if (attrValue) {
                    inlineSettings = inlineSettings || {};
                    try {
                        inlineSettings[attrName] = eval(attrValue)
                    } catch (err) {
                        inlineSettings[attrName] = attrValue
                    }
                }
            }
            var nodeName = target.nodeName.toLowerCase();
            var inline = (nodeName == 'div' || nodeName == 'span');
            if (!target.id) {
                this.uuid += 1;
                target.id = 'dp' + this.uuid
            }
            var inst = this._newInst($(target), inline);
            inst.settings = $.extend({}, settings || {}, inlineSettings || {});
            if (nodeName == 'input') {
                this._connectDatepicker(target, inst)
            } else if (inline) {
                this._inlineDatepicker(target, inst)
            }
        },
        _newInst: function (target, inline) {
            var id = target[0].id.replace(/([^A-Za-z0-9_-])/g, '\\\\$1');
            return {
                id: id,
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: (!inline ? this.dpDiv : bindHover($('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')))
            }
        },
        _connectDatepicker: function (target, inst) {
            var input = $(target);
            inst.append = $([]);
            inst.trigger = $([]);
            if (input.hasClass(this.markerClassName))
                return;
            this._attachments(input, inst);
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            this._autoSize(inst);
            $.data(target, PROP_NAME, inst)
        },
        _attachments: function (input, inst) {
            var appendText = this._get(inst, 'appendText');
            var isRTL = this._get(inst, 'isRTL');
            if (inst.append)
                inst.append.remove();
            if (appendText) {
                inst.append = $('<span class="' + this._appendClass + '">' + appendText + '</span>');
                input[isRTL ? 'before' : 'after'](inst.append)
            }
            input.unbind('focus', this._showDatepicker);
            if (inst.trigger)
                inst.trigger.remove();
            var showOn = this._get(inst, 'showOn');
            if (showOn == 'focus' || showOn == 'both')
                input.focus(this._showDatepicker);
            if (showOn == 'button' || showOn == 'both') {
                var buttonText = this._get(inst, 'buttonText');
                var buttonImage = this._get(inst, 'buttonImage');
                inst.trigger = $(this._get(inst, 'buttonImageOnly') ? $('<img/>').addClass(this._triggerClass).attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                }) : $('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage == '' ? buttonText : $('<img/>').attr({
                    src: buttonImage,
                    alt: buttonText,
                    title: buttonText
                })));
                input[isRTL ? 'before' : 'after'](inst.trigger);
                inst.trigger.click(function () {
                    if ($.datepicker._datepickerShowing && $.datepicker._lastInput == input[0])
                        $.datepicker._hideDatepicker();
                    else $.datepicker._showDatepicker(input[0]);
                    return !1
                })
            }
        },
        _autoSize: function (inst) {
            if (this._get(inst, 'autoSize') && !inst.inline) {
                var date = new Date(2009, 12 - 1, 20);
                var dateFormat = this._get(inst, 'dateFormat');
                if (dateFormat.match(/[DM]/)) {
                    var findMax = function (names) {
                        var max = 0;
                        var maxI = 0;
                        for (var i = 0; i < names.length; i++) {
                            if (names[i].length > max) {
                                max = names[i].length;
                                maxI = i
                            }
                        }
                        return maxI
                    };
                    date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ? 'monthNames' : 'monthNamesShort'))));
                    date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ? 'dayNames' : 'dayNamesShort'))) + 20 - date.getDay())
                }
                inst.input.attr('size', this._formatDate(inst, date).length)
            }
        },
        _inlineDatepicker: function (target, inst) {
            var divSpan = $(target);
            if (divSpan.hasClass(this.markerClassName))
                return;
            divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker", function (event, key, value) {
                inst.settings[key] = value
            }).bind("getData.datepicker", function (event, key) {
                return this._get(inst, key)
            });
            $.data(target, PROP_NAME, inst);
            this._setDate(inst, this._getDefaultDate(inst), !0);
            this._updateDatepicker(inst);
            this._updateAlternate(inst);
            inst.dpDiv.show()
        },
        _dialogDatepicker: function (input, date, onSelect, settings, pos) {
            var inst = this._dialogInst;
            if (!inst) {
                this.uuid += 1;
                var id = 'dp' + this.uuid;
                this._dialogInput = $('<input type="text" id="' + id + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
                this._dialogInput.keydown(this._doKeyDown);
                $('body').append(this._dialogInput);
                inst = this._dialogInst = this._newInst(this._dialogInput, !1);
                inst.settings = {};
                $.data(this._dialogInput[0], PROP_NAME, inst)
            }
            extendRemove(inst.settings, settings || {});
            date = (date && date.constructor == Date ? this._formatDate(inst, date) : date);
            this._dialogInput.val(date);
            this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
            if (!this._pos) {
                var browserWidth = document.documentElement.clientWidth;
                var browserHeight = document.documentElement.clientHeight;
                var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
                this._pos = [(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY]
            }
            this._dialogInput.css('left', (this._pos[0] + 20) + 'px').css('top', this._pos[1] + 'px');
            inst.settings.onSelect = onSelect;
            this._inDialog = !0;
            this.dpDiv.addClass(this._dialogClass);
            this._showDatepicker(this._dialogInput[0]);
            if ($.blockUI)
                $.blockUI(this.dpDiv);
            $.data(this._dialogInput[0], PROP_NAME, inst);
            return this
        },
        _destroyDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            $.removeData(target, PROP_NAME);
            if (nodeName == 'input') {
                inst.append.remove();
                inst.trigger.remove();
                $target.removeClass(this.markerClassName).unbind('focus', this._showDatepicker).unbind('keydown', this._doKeyDown).unbind('keypress', this._doKeyPress).unbind('keyup', this._doKeyUp)
            } else if (nodeName == 'div' || nodeName == 'span')
                $target.removeClass(this.markerClassName).empty()
        },
        _enableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = !1;
                inst.trigger.filter('button').each(function () {
                    this.disabled = !1
                }).end().filter('img').css({
                    opacity: '1.0',
                    cursor: ''
                })
            } else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().removeClass('ui-state-disabled');
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            })
        },
        _disableDatepicker: function (target) {
            var $target = $(target);
            var inst = $.data(target, PROP_NAME);
            if (!$target.hasClass(this.markerClassName)) {
                return
            }
            var nodeName = target.nodeName.toLowerCase();
            if (nodeName == 'input') {
                target.disabled = !0;
                inst.trigger.filter('button').each(function () {
                    this.disabled = !0
                }).end().filter('img').css({
                    opacity: '0.5',
                    cursor: 'default'
                })
            } else if (nodeName == 'div' || nodeName == 'span') {
                var inline = $target.children('.' + this._inlineClass);
                inline.children().addClass('ui-state-disabled');
                inline.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled", "disabled")
            }
            this._disabledInputs = $.map(this._disabledInputs, function (value) {
                return (value == target ? null : value)
            });
            this._disabledInputs[this._disabledInputs.length] = target
        },
        _isDisabledDatepicker: function (target) {
            if (!target) {
                return !1
            }
            for (var i = 0; i < this._disabledInputs.length; i++) {
                if (this._disabledInputs[i] == target)
                    return !0
            }
            return !1
        },
        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw 'Missing instance data for this datepicker'
            }
        },
        _optionDatepicker: function (target, name, value) {
            var inst = this._getInst(target);
            if (arguments.length == 2 && typeof name == 'string') {
                return (name == 'defaults' ? $.extend({}, $.datepicker._defaults) : (inst ? (name == 'all' ? $.extend({}, inst.settings) : this._get(inst, name)) : null))
            }
            var settings = name || {};
            if (typeof name == 'string') {
                settings = {};
                settings[name] = value
            }
            if (inst) {
                if (this._curInst == inst) {
                    this._hideDatepicker()
                }
                var date = this._getDateDatepicker(target, !0);
                var minDate = this._getMinMaxDate(inst, 'min');
                var maxDate = this._getMinMaxDate(inst, 'max');
                extendRemove(inst.settings, settings);
                if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined)
                    inst.settings.minDate = this._formatDate(inst, minDate);
                if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined)
                    inst.settings.maxDate = this._formatDate(inst, maxDate);
                this._attachments($(target), inst);
                this._autoSize(inst);
                this._setDate(inst, date);
                this._updateAlternate(inst);
                this._updateDatepicker(inst)
            }
        },
        _changeDatepicker: function (target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function (target) {
            var inst = this._getInst(target);
            if (inst) {
                this._updateDatepicker(inst)
            }
        },
        _setDateDatepicker: function (target, date) {
            var inst = this._getInst(target);
            if (inst) {
                this._setDate(inst, date);
                this._updateDatepicker(inst);
                this._updateAlternate(inst)
            }
        },
        _getDateDatepicker: function (target, noDefault) {
            var inst = this._getInst(target);
            if (inst && !inst.inline)
                this._setDateFromField(inst, noDefault);
            return (inst ? this._getDate(inst) : null)
        },
        _doKeyDown: function (event) {
            var inst = $.datepicker._getInst(event.target);
            var handled = !0;
            var isRTL = inst.dpDiv.is('.ui-datepicker-rtl');
            inst._keyEvent = !0;
            if ($.datepicker._datepickerShowing)
                switch (event.keyCode) {
                    case 9:
                        $.datepicker._hideDatepicker();
                        handled = !1;
                        break;
                    case 13:
                        var sel = $('td.' + $.datepicker._dayOverClass + ':not(.' + $.datepicker._currentClass + ')', inst.dpDiv);
                        if (sel[0])
                            $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
                        else $.datepicker._hideDatepicker();
                        return !1;
                        break;
                    case 27:
                        $.datepicker._hideDatepicker();
                        break;
                    case 33:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 34:
                        $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 35:
                        if (event.ctrlKey || event.metaKey) $.datepicker._clearDate(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 36:
                        if (event.ctrlKey || event.metaKey) $.datepicker._gotoToday(event.target);
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 37:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ? -$.datepicker._get(inst, 'stepBigMonths') : -$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 38:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, -7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    case 39:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), 'D');
                        handled = event.ctrlKey || event.metaKey;
                        if (event.originalEvent.altKey) $.datepicker._adjustDate(event.target, (event.ctrlKey ? +$.datepicker._get(inst, 'stepBigMonths') : +$.datepicker._get(inst, 'stepMonths')), 'M');
                        break;
                    case 40:
                        if (event.ctrlKey || event.metaKey) $.datepicker._adjustDate(event.target, +7, 'D');
                        handled = event.ctrlKey || event.metaKey;
                        break;
                    default:
                        handled = !1
                } else if (event.keyCode == 36 && event.ctrlKey)
                    $.datepicker._showDatepicker(this);
                else {
                    handled = !1
                }
            if (handled) {
                event.preventDefault();
                event.stopPropagation()
            }
        },
        _doKeyPress: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if ($.datepicker._get(inst, 'constrainInput')) {
                var chars = $.datepicker._possibleChars($.datepicker._get(inst, 'dateFormat'));
                var chr = String.fromCharCode(event.charCode == undefined ? event.keyCode : event.charCode);
                return event.ctrlKey || event.metaKey || (chr < ' ' || !chars || chars.indexOf(chr) > -1)
            }
        },
        _doKeyUp: function (event) {
            var inst = $.datepicker._getInst(event.target);
            if (inst.input.val() != inst.lastVal) {
                try {
                    var date = $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), (inst.input ? inst.input.val() : null), $.datepicker._getFormatConfig(inst));
                    if (date) {
                        $.datepicker._setDateFromField(inst);
                        $.datepicker._updateAlternate(inst);
                        $.datepicker._updateDatepicker(inst)
                    }
                } catch (event) {
                    $.datepicker.log(event)
                }
            }
            return !0
        },
        _showDatepicker: function (input) {
            input = input.target || input;
            if (input.nodeName.toLowerCase() != 'input')
                input = $('input', input.parentNode)[0];
            if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput == input)
                return;
            var inst = $.datepicker._getInst(input);
            if ($.datepicker._curInst && $.datepicker._curInst != inst) {
                if ($.datepicker._datepickerShowing) {
                    $.datepicker._triggerOnClose($.datepicker._curInst)
                }
                $.datepicker._curInst.dpDiv.stop(!0, !0)
            }
            var beforeShow = $.datepicker._get(inst, 'beforeShow');
            extendRemove(inst.settings, (beforeShow ? beforeShow.apply(input, [input, inst]) : {}));
            inst.lastVal = null;
            $.datepicker._lastInput = input;
            $.datepicker._setDateFromField(inst);
            if ($.datepicker._inDialog)
                input.value = '';
            if (!$.datepicker._pos) {
                $.datepicker._pos = $.datepicker._findPos(input);
                $.datepicker._pos[1] += input.offsetHeight
            }
            var isFixed = !1;
            $(input).parents().each(function () {
                isFixed |= $(this).css('position') == 'fixed';
                return !isFixed
            });
            if (isFixed && $.browser.opera) {
                $.datepicker._pos[0] -= document.documentElement.scrollLeft;
                $.datepicker._pos[1] -= document.documentElement.scrollTop
            }
            var offset = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            };
            $.datepicker._pos = null;
            inst.dpDiv.empty();
            inst.dpDiv.css({
                position: 'absolute',
                display: 'block',
                top: '-1000px'
            });
            $.datepicker._updateDatepicker(inst);
            offset = $.datepicker._checkOffset(inst, offset, isFixed);
            inst.dpDiv.css({
                position: ($.datepicker._inDialog && $.blockUI ? 'static' : (isFixed ? 'fixed' : 'absolute')),
                display: 'none',
                left: offset.left + 'px',
                top: offset.top + 'px'
            });
            if (!inst.inline) {
                var showAnim = $.datepicker._get(inst, 'showAnim');
                var duration = $.datepicker._get(inst, 'duration');
                var postProcess = function () {
                    var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
                    if (!!cover.length) {
                        var borders = $.datepicker._getBorders(inst.dpDiv);
                        cover.css({
                            left: -borders[0],
                            top: -borders[1],
                            width: inst.dpDiv.outerWidth(),
                            height: inst.dpDiv.outerHeight()
                        })
                    }
                };
                inst.dpDiv.zIndex($(input).zIndex() + 1);
                $.datepicker._datepickerShowing = !0;
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.show(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else inst.dpDiv[showAnim || 'show']((showAnim ? duration : null), postProcess);
                if (!showAnim || !duration)
                    postProcess();
                if (inst.input.is(':visible') && !inst.input.is(':disabled'))
                    inst.input.focus();
                $.datepicker._curInst = inst
            }
        },
        _updateDatepicker: function (inst) {
            var self = this;
            self.maxRows = 4;
            var borders = $.datepicker._getBorders(inst.dpDiv);
            instActive = inst;
            inst.dpDiv.empty().append(this._generateHTML(inst));
            var cover = inst.dpDiv.find('iframe.ui-datepicker-cover');
            if (!!cover.length) {
                cover.css({
                    left: -borders[0],
                    top: -borders[1],
                    width: inst.dpDiv.outerWidth(),
                    height: inst.dpDiv.outerHeight()
                })
            }
            inst.dpDiv.find('.' + this._dayOverClass + ' a').mouseover();
            var numMonths = this._getNumberOfMonths(inst);
            var cols = numMonths[1];
            var width = 17;
            inst.dpDiv.removeClass('ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4').width('');
            if (cols > 1)
                inst.dpDiv.addClass('ui-datepicker-multi-' + cols).css('width', (width * cols) + 'em');
            inst.dpDiv[(numMonths[0] != 1 || numMonths[1] != 1 ? 'add' : 'remove') + 'Class']('ui-datepicker-multi');
            inst.dpDiv[(this._get(inst, 'isRTL') ? 'add' : 'remove') + 'Class']('ui-datepicker-rtl');
            if (inst == $.datepicker._curInst && $.datepicker._datepickerShowing && inst.input && inst.input.is(':visible') && !inst.input.is(':disabled') && inst.input[0] != document.activeElement)
                inst.input.focus();
            if (inst.yearshtml) {
                var origyearshtml = inst.yearshtml;
                setTimeout(function () {
                    if (origyearshtml === inst.yearshtml && inst.yearshtml) {
                        inst.dpDiv.find('select.ui-datepicker-year:first').replaceWith(inst.yearshtml)
                    }
                    origyearshtml = inst.yearshtml = null
                }, 0)
            }
        },
        _getBorders: function (elem) {
            var convert = function (value) {
                return {
                    thin: 1,
                    medium: 2,
                    thick: 3
                } [value] || value
            };
            return [parseFloat(convert(elem.css('border-left-width'))), parseFloat(convert(elem.css('border-top-width')))]
        },
        _checkOffset: function (inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth();
            var dpHeight = inst.dpDiv.outerHeight();
            var inputWidth = inst.input ? inst.input.outerWidth() : 0;
            var inputHeight = inst.input ? inst.input.outerHeight() : 0;
            var viewWidth = document.documentElement.clientWidth + $(document).scrollLeft();
            var viewHeight = document.documentElement.clientHeight + $(document).scrollTop();
            offset.left -= (this._get(inst, 'isRTL') ? (dpWidth - inputWidth) : 0);
            offset.left -= (isFixed && offset.left == inst.input.offset().left) ? $(document).scrollLeft() : 0;
            offset.top -= (isFixed && offset.top == (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;
            offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ? Math.abs(offset.left + dpWidth - viewWidth) : 0);
            offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ? Math.abs(dpHeight + inputHeight) : 0);
            return offset
        },
        _findPos: function (obj) {
            var inst = this._getInst(obj);
            var isRTL = this._get(inst, 'isRTL');
            while (obj && (obj.type == 'hidden' || obj.nodeType != 1 || $.expr.filters.hidden(obj))) {
                obj = obj[isRTL ? 'previousSibling' : 'nextSibling']
            }
            var position = $(obj).offset();
            return [position.left, position.top]
        },
        _triggerOnClose: function (inst) {
            var onClose = this._get(inst, 'onClose');
            if (onClose)
                onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ''), inst])
        },
        _hideDatepicker: function (input) {
            var inst = this._curInst;
            if (!inst || (input && inst != $.data(input, PROP_NAME)))
                return;
            if (this._datepickerShowing) {
                var showAnim = this._get(inst, 'showAnim');
                var duration = this._get(inst, 'duration');
                var postProcess = function () {
                    $.datepicker._tidyDialog(inst);
                    this._curInst = null
                };
                if ($.effects && $.effects[showAnim])
                    inst.dpDiv.hide(showAnim, $.datepicker._get(inst, 'showOptions'), duration, postProcess);
                else inst.dpDiv[(showAnim == 'slideDown' ? 'slideUp' : (showAnim == 'fadeIn' ? 'fadeOut' : 'hide'))]((showAnim ? duration : null), postProcess);
                if (!showAnim)
                    postProcess();
                $.datepicker._triggerOnClose(inst);
                this._datepickerShowing = !1;
                this._lastInput = null;
                if (this._inDialog) {
                    this._dialogInput.css({
                        position: 'absolute',
                        left: '0',
                        top: '-100px'
                    });
                    if ($.blockUI) {
                        $.unblockUI();
                        $('body').append(this.dpDiv)
                    }
                }
                this._inDialog = !1
            }
        },
        _tidyDialog: function (inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind('.ui-datepicker-calendar')
        },
        _checkExternalClick: function (event) {
            if (!$.datepicker._curInst)
                return;
            var $target = $(event.target);
            if ($target[0].id != $.datepicker._mainDivId && $target.parents('#' + $.datepicker._mainDivId).length == 0 && !$target.hasClass($.datepicker.markerClassName) && !$target.hasClass($.datepicker._triggerClass) && $.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI))
                $.datepicker._hideDatepicker()
        },
        _adjustDate: function (id, offset, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._isDisabledDatepicker(target[0])) {
                return
            }
            this._adjustInstDate(inst, offset + (period == 'M' ? this._get(inst, 'showCurrentAtPos') : 0), period);
            this._updateDatepicker(inst)
        },
        _gotoToday: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (this._get(inst, 'gotoCurrent') && inst.currentDay) {
                inst.selectedDay = inst.currentDay;
                inst.drawMonth = inst.selectedMonth = inst.currentMonth;
                inst.drawYear = inst.selectedYear = inst.currentYear
            } else {
                var date = new Date();
                inst.selectedDay = date.getDate();
                inst.drawMonth = inst.selectedMonth = date.getMonth();
                inst.drawYear = inst.selectedYear = date.getFullYear()
            }
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _selectMonthYear: function (id, select, period) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            inst._selectingMonthYear = !1;
            inst['selected' + (period == 'M' ? 'Month' : 'Year')] = inst['draw' + (period == 'M' ? 'Month' : 'Year')] = parseInt(select.options[select.selectedIndex].value, 10);
            this._notifyChange(inst);
            this._adjustDate(target)
        },
        _clickMonthYear: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            if (inst.input && inst._selectingMonthYear) {
                setTimeout(function () {
                    inst.input.focus()
                }, 0)
            }
            inst._selectingMonthYear = !inst._selectingMonthYear
        },
        _selectDay: function (id, month, year, td) {
            var target = $(id);
            if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
                return
            }
            var inst = this._getInst(target[0]);
            inst.selectedDay = inst.currentDay = $('a', td).html();
            inst.selectedMonth = inst.currentMonth = month;
            inst.selectedYear = inst.currentYear = year;
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear))
        },
        _clearDate: function (id) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            this._selectDate(target, '')
        },
        _selectDate: function (id, dateStr) {
            var target = $(id);
            var inst = this._getInst(target[0]);
            dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
            if (inst.input)
                inst.input.val(dateStr);
            this._updateAlternate(inst);
            var onSelect = this._get(inst, 'onSelect');
            if (onSelect)
                onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
            else if (inst.input)
                inst.input.trigger('change');
            if (inst.inline)
                this._updateDatepicker(inst);
            else {
                this._hideDatepicker();
                this._lastInput = inst.input[0];
                if (typeof (inst.input[0]) != 'object')
                    inst.input.focus();
                this._lastInput = null
            }
        },
        _updateAlternate: function (inst) {
            var altField = this._get(inst, 'altField');
            if (altField) {
                var altFormat = this._get(inst, 'altFormat') || this._get(inst, 'dateFormat');
                var date = this._getDate(inst);
                var dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
                $(altField).each(function () {
                    $(this).val(dateStr)
                })
            }
        },
        noWeekends: function (date) {
            var day = date.getDay();
            return [(day > 0 && day < 6), '']
        },
        iso8601Week: function (date) {
            var checkDate = new Date(date.getTime());
            checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
            var time = checkDate.getTime();
            checkDate.setMonth(0);
            checkDate.setDate(1);
            return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1
        },
        parseDate: function (format, value, settings) {
            if (format == null || value == null)
                throw 'Invalid arguments';
            value = (typeof value == 'object' ? value.toString() : value + '');
            if (value == '')
                return null;
            var shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff;
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var year = -1;
            var month = -1;
            var day = -1;
            var doy = -1;
            var literal = !1;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches
            };
            var getNumber = function (match) {
                var isDoubled = lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' && isDoubled ? 4 : (match == 'o' ? 3 : 2))));
                var digits = new RegExp('^\\d{1,' + size + '}');
                var num = value.substring(iValue).match(digits);
                if (!num)
                    throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10)
            };
            var getName = function (match, shortNames, longNames) {
                var names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
                    return [[k, v]]
                }).sort(function (a, b) {
                    return -(a[1].length - b[1].length)
                });
                var index = -1;
                $.each(names, function (i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() == name.toLowerCase()) {
                        index = pair[0];
                        iValue += name.length;
                        return !1
                    }
                });
                if (index != -1)
                    return index + 1;
                else throw 'Unknown name at position ' + iValue
            };
            var checkLiteral = function () {
                if (value.charAt(iValue) != format.charAt(iFormat))
                    throw 'Unexpected literal at position ' + iValue;
                iValue++
            };
            var iValue = 0;
            for (var iFormat = 0; iFormat < format.length; iFormat++) {
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = !1;
                    else checkLiteral();
                else switch (format.charAt(iFormat)) {
                    case 'd':
                        day = getNumber('d');
                        break;
                    case 'D':
                        getName('D', dayNamesShort, dayNames);
                        break;
                    case 'o':
                        doy = getNumber('o');
                        break;
                    case 'm':
                        month = getNumber('m');
                        break;
                    case 'M':
                        month = getName('M', monthNamesShort, monthNames);
                        break;
                    case 'y':
                        year = getNumber('y');
                        break;
                    case '@':
                        var date = new Date(getNumber('@'));
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case '!':
                        var date = new Date((getNumber('!') - this._ticksTo1970) / 10000);
                        year = date.getFullYear();
                        month = date.getMonth() + 1;
                        day = date.getDate();
                        break;
                    case "'":
                        if (lookAhead("'"))
                            checkLiteral();
                        else literal = !0;
                        break;
                    default:
                        checkLiteral()
                }
            }
            if (iValue < value.length) {
                throw "Extra/unparsed characters found in date: " + value.substring(iValue)
            }
            if (year == -1)
                year = new Date().getFullYear();
            else if (year < 100)
                year += new Date().getFullYear() - new Date().getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100);
            if (doy > -1) {
                month = 1;
                day = doy;
                do {
                    var dim = this._getDaysInMonth(year, month - 1);
                    if (day <= dim)
                        break;
                    month++;
                    day -= dim
                } while (!0);
            }
            var date = this._daylightSavingAdjust(new Date(year, month - 1, day));
            if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day)
                throw 'Invalid date';
            return date
        },
        ATOM: 'yy-mm-dd',
        COOKIE: 'D, dd M yy',
        ISO_8601: 'yy-mm-dd',
        RFC_822: 'D, d M y',
        RFC_850: 'DD, dd-M-y',
        RFC_1036: 'D, d M y',
        RFC_1123: 'D, d M yy',
        RFC_2822: 'D, d M yy',
        RSS: 'D, d M y',
        TICKS: '!',
        TIMESTAMP: '@',
        W3C: 'yy-mm-dd',
        _ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) + Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
        formatDate: function (format, date, settings) {
            if (!date)
                return '';
            var dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort;
            var dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames;
            var monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort;
            var monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches
            };
            var formatNumber = function (match, value, len) {
                var num = '' + value;
                if (lookAhead(match))
                    while (num.length < len)
                        num = '0' + num;
                return num
            };
            var formatName = function (match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames[value] : shortNames[value])
            };
            var output = '';
            var literal = !1;
            if (date)
                for (var iFormat = 0; iFormat < format.length; iFormat++) {
                    if (literal)
                        if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                            literal = !1;
                        else output += format.charAt(iFormat);
                    else switch (format.charAt(iFormat)) {
                        case 'd':
                            output += formatNumber('d', date.getDate(), 2);
                            break;
                        case 'D':
                            output += formatName('D', date.getDay(), dayNamesShort, dayNames);
                            break;
                        case 'o':
                            output += formatNumber('o', Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
                            break;
                        case 'm':
                            output += formatNumber('m', date.getMonth() + 1, 2);
                            break;
                        case 'M':
                            output += formatName('M', date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case 'y':
                            output += (lookAhead('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                            break;
                        case '@':
                            output += date.getTime();
                            break;
                        case '!':
                            output += date.getTime() * 10000 + this._ticksTo1970;
                            break;
                        case "'":
                            if (lookAhead("'"))
                                output += "'";
                            else literal = !0;
                            break;
                        default:
                            output += format.charAt(iFormat)
                    }
                }
            return output
        },
        _possibleChars: function (format) {
            var chars = '';
            var literal = !1;
            var lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches)
                    iFormat++;
                return matches
            };
            for (var iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                    if (format.charAt(iFormat) == "'" && !lookAhead("'"))
                        literal = !1;
                    else chars += format.charAt(iFormat);
            else switch (format.charAt(iFormat)) {
                case 'd':
                case 'm':
                case 'y':
                case '@':
                    chars += '0123456789';
                    break;
                case 'D':
                case 'M':
                    return null;
                case "'":
                    if (lookAhead("'"))
                        chars += "'";
                    else literal = !0;
                    break;
                default:
                    chars += format.charAt(iFormat)
            }
            return chars
        },
        _get: function (inst, name) {
            return inst.settings[name] !== undefined ? inst.settings[name] : this._defaults[name]
        },
        _setDateFromField: function (inst, noDefault) {
            if (inst.input.val() == inst.lastVal) {
                return
            }
            var dateFormat = this._get(inst, 'dateFormat');
            var dates = inst.lastVal = inst.input ? inst.input.val() : null;
            var date, defaultDate;
            date = defaultDate = this._getDefaultDate(inst);
            var settings = this._getFormatConfig(inst);
            try {
                date = this.parseDate(dateFormat, dates, settings) || defaultDate
            } catch (event) {
                this.log(event);
                dates = (noDefault ? '' : dates)
            }
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            inst.currentDay = (dates ? date.getDate() : 0);
            inst.currentMonth = (dates ? date.getMonth() : 0);
            inst.currentYear = (dates ? date.getFullYear() : 0);
            this._adjustInstDate(inst)
        },
        _getDefaultDate: function (inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, 'defaultDate'), new Date()))
        },
        _determineDate: function (inst, date, defaultDate) {
            var offsetNumeric = function (offset) {
                var date = new Date();
                date.setDate(date.getDate() + offset);
                return date
            };
            var offsetString = function (offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, 'dateFormat'), offset, $.datepicker._getFormatConfig(inst))
                } catch (e) {}
                var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date();
                var year = date.getFullYear();
                var month = date.getMonth();
                var day = date.getDate();
                var pattern = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;
                var matches = pattern.exec(offset);
                while (matches) {
                    switch (matches[2] || 'd') {
                        case 'd':
                        case 'D':
                            day += parseInt(matches[1], 10);
                            break;
                        case 'w':
                        case 'W':
                            day += parseInt(matches[1], 10) * 7;
                            break;
                        case 'm':
                        case 'M':
                            month += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break;
                        case 'y':
                        case 'Y':
                            year += parseInt(matches[1], 10);
                            day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                            break
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year, month, day)
            };
            var newDate = (date == null || date === '' ? defaultDate : (typeof date == 'string' ? offsetString(date) : (typeof date == 'number' ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));
            newDate = (newDate && newDate.toString() == 'Invalid Date' ? defaultDate : newDate);
            if (newDate) {
                newDate.setHours(0);
                newDate.setMinutes(0);
                newDate.setSeconds(0);
                newDate.setMilliseconds(0)
            }
            return this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function (date) {
            if (!date) return null;
            date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
            return date
        },
        _setDate: function (inst, date, noChange) {
            var clear = !date;
            var origMonth = inst.selectedMonth;
            var origYear = inst.selectedYear;
            var newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));
            inst.selectedDay = inst.currentDay = newDate.getDate();
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
            if ((origMonth != inst.selectedMonth || origYear != inst.selectedYear) && !noChange)
                this._notifyChange(inst);
            this._adjustInstDate(inst);
            if (inst.input) {
                inst.input.val(clear ? '' : this._formatDate(inst))
            }
        },
        _getDate: function (inst) {
            var startDate = (!inst.currentYear || (inst.input && inst.input.val() == '') ? null : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return startDate
        },
        _generateHTML: function (inst) {
            var today = new Date();
            today = this._daylightSavingAdjust(new Date(today.getFullYear(), today.getMonth(), today.getDate()));
            var isRTL = this._get(inst, 'isRTL');
            var showButtonPanel = this._get(inst, 'showButtonPanel');
            var hideIfNoPrevNext = this._get(inst, 'hideIfNoPrevNext');
            var navigationAsDateFormat = this._get(inst, 'navigationAsDateFormat');
            var numMonths = this._getNumberOfMonths(inst);
            var showCurrentAtPos = this._get(inst, 'showCurrentAtPos');
            var stepMonths = this._get(inst, 'stepMonths');
            var isMultiMonth = (numMonths[0] != 1 || numMonths[1] != 1);
            var currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) : new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var drawMonth = inst.drawMonth - showCurrentAtPos;
            var drawYear = inst.drawYear;
            if (drawMonth < 0) {
                drawMonth += 12;
                drawYear--
            }
            if (maxDate) {
                var maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(), maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
                maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
                while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
                    drawMonth--;
                    if (drawMonth < 0) {
                        drawMonth = 11;
                        drawYear--
                    }
                }
            }
            inst.drawMonth = drawMonth;
            inst.drawYear = drawYear;
            var prevText = this._get(inst, 'prevText');
            prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText, this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)), this._getFormatConfig(inst)));
            var prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._adjustDate(\'#' + inst.id + '\', -' + stepMonths + ', \'M\');"' + ' title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>' : (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + prevText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'e' : 'w') + '">' + prevText + '</span></a>'));
            var nextText = this._get(inst, 'nextText');
            nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText, this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)), this._getFormatConfig(inst)));
            var next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._adjustDate(\'#' + inst.id + '\', +' + stepMonths + ', \'M\');"' + ' title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>' : (hideIfNoPrevNext ? '' : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + nextText + '"><span class="ui-icon ui-icon-circle-triangle-' + (isRTL ? 'w' : 'e') + '">' + nextText + '</span></a>'));
            var currentText = this._get(inst, 'currentText');
            var gotoDate = (this._get(inst, 'gotoCurrent') && inst.currentDay ? currentDate : today);
            currentText = (!navigationAsDateFormat ? currentText : this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));
            var controls = (!inst.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._hideDatepicker();">' + this._get(inst, 'closeText') + '</button>' : '');
            var buttonPanel = (showButtonPanel) ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (isRTL ? controls : '') + (this._isInRange(inst, gotoDate) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + dpuuid + '.datepicker._gotoToday(\'#' + inst.id + '\');"' + '>' + currentText + '</button>' : '') + (isRTL ? '' : controls) + '</div>' : '';
            var firstDay = parseInt(this._get(inst, 'firstDay'), 10);
            firstDay = (isNaN(firstDay) ? 0 : firstDay);
            var showWeek = this._get(inst, 'showWeek');
            var dayNames = this._get(inst, 'dayNames');
            var dayNamesShort = this._get(inst, 'dayNamesShort');
            var dayNamesMin = this._get(inst, 'dayNamesMin');
            var monthNames = this._get(inst, 'monthNames');
            var monthNamesShort = this._get(inst, 'monthNamesShort');
            var beforeShowDay = this._get(inst, 'beforeShowDay');
            var showOtherMonths = this._get(inst, 'showOtherMonths');
            var selectOtherMonths = this._get(inst, 'selectOtherMonths');
            var calculateWeek = this._get(inst, 'calculateWeek') || this.iso8601Week;
            var defaultDate = this._getDefaultDate(inst);
            var html = '';
            for (var row = 0; row < numMonths[0]; row++) {
                var group = '';
                this.maxRows = 4;
                for (var col = 0; col < numMonths[1]; col++) {
                    var selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
                    var cornerClass = ' ui-corner-all';
                    var calender = '';
                    if (isMultiMonth) {
                        calender += '<div class="ui-datepicker-group';
                        if (numMonths[1] > 1)
                            switch (col) {
                                case 0:
                                    calender += ' ui-datepicker-group-first';
                                    cornerClass = ' ui-corner-' + (isRTL ? 'right' : 'left');
                                    break;
                                case numMonths[1] - 1:
                                    calender += ' ui-datepicker-group-last';
                                    cornerClass = ' ui-corner-' + (isRTL ? 'left' : 'right');
                                    break;
                                default:
                                    calender += ' ui-datepicker-group-middle';
                                    cornerClass = '';
                                    break
                            }
                        calender += '">'
                    }
                    calender += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + cornerClass + '">' + (/all|left/.test(cornerClass) && row == 0 ? (isRTL ? next : prev) : '') + (/all|right/.test(cornerClass) && row == 0 ? (isRTL ? prev : next) : '') + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, row > 0 || col > 0, monthNames, monthNamesShort) + '</div><table class="ui-datepicker-calendar"><thead>' + '<tr>';
                    var thead = (showWeek ? '<th class="ui-datepicker-week-col">' + this._get(inst, 'weekHeader') + '</th>' : '');
                    for (var dow = 0; dow < 7; dow++) {
                        var day = (dow + firstDay) % 7;
                        thead += '<th' + ((dow + firstDay + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : '') + '>' + '<span title="' + dayNames[day] + '">' + dayNamesMin[day] + '</span></th>'
                    }
                    calender += thead + '</tr></thead><tbody>';
                    var daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
                    if (drawYear == inst.selectedYear && drawMonth == inst.selectedMonth)
                        inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
                    var leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
                    var curRows = Math.ceil((leadDays + daysInMonth) / 7);
                    var numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows);
                    this.maxRows = numRows;
                    var printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
                    for (var dRow = 0; dRow < numRows; dRow++) {
                        calender += '<tr>';
                        var tbody = (!showWeek ? '' : '<td class="ui-datepicker-week-col">' + this._get(inst, 'calculateWeek')(printDate) + '</td>');
                        for (var dow = 0; dow < 7; dow++) {
                            var daySettings = (beforeShowDay ? beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [!0, '']);
                            var otherMonth = (printDate.getMonth() != drawMonth);
                            var unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] || (minDate && printDate < minDate) || (maxDate && printDate > maxDate);
                            tbody += '<td class="' + ((dow + firstDay + 6) % 7 >= 5 ? ' ui-datepicker-week-end' : '') + (otherMonth ? ' ui-datepicker-other-month' : '') + ((printDate.getTime() == selectedDate.getTime() && drawMonth == inst.selectedMonth && inst._keyEvent) || (defaultDate.getTime() == printDate.getTime() && defaultDate.getTime() == selectedDate.getTime()) ? ' ' + this._dayOverClass : '') + (unselectable ? ' ' + this._unselectableClass + ' ui-state-disabled' : '') + (otherMonth && !showOtherMonths ? '' : ' ' + daySettings[1] + (printDate.getTime() == currentDate.getTime() ? ' ' + this._currentClass : '') + (printDate.getTime() == today.getTime() ? ' ui-datepicker-today' : '')) + '"' + ((!otherMonth || showOtherMonths) && daySettings[2] ? ' title="' + daySettings[2] + '"' : '') + (unselectable ? '' : ' onclick="DP_jQuery_' + dpuuid + '.datepicker._selectDay(\'#' + inst.id + '\',' + printDate.getMonth() + ',' + printDate.getFullYear() + ', this);return false;"') + '>' + (otherMonth && !showOtherMonths ? '&#xa0;' : (unselectable ? '<span class="ui-state-default">' + printDate.getDate() + '</span>' : '<a class="ui-state-default' + (printDate.getTime() == today.getTime() ? ' ui-state-highlight' : '') + (printDate.getTime() == currentDate.getTime() ? ' ui-state-active' : '') + (otherMonth ? ' ui-priority-secondary' : '') + '" href="#">' + printDate.getDate() + '</a>')) + '</td>';
                            printDate.setDate(printDate.getDate() + 1);
                            printDate = this._daylightSavingAdjust(printDate)
                        }
                        calender += tbody + '</tr>'
                    }
                    drawMonth++;
                    if (drawMonth > 11) {
                        drawMonth = 0;
                        drawYear++
                    }
                    calender += '</tbody></table>' + (isMultiMonth ? '</div>' + ((numMonths[0] > 0 && col == numMonths[1] - 1) ? '<div class="ui-datepicker-row-break"></div>' : '') : '');
                    group += calender
                }
                html += group
            }
            html += buttonPanel + ($.browser.msie && parseInt($.browser.version, 10) < 7 && !inst.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : '');
            inst._keyEvent = !1;
            return html
        },
        _generateMonthYearHeader: function (inst, drawMonth, drawYear, minDate, maxDate, secondary, monthNames, monthNamesShort) {
            var changeMonth = this._get(inst, 'changeMonth');
            var changeYear = this._get(inst, 'changeYear');
            var showMonthAfterYear = this._get(inst, 'showMonthAfterYear');
            var html = '<div class="ui-datepicker-title">';
            var monthHtml = '';
            if (secondary || !changeMonth)
                monthHtml += '<span class="ui-datepicker-month">' + monthNames[drawMonth] + '</span>';
            else {
                var inMinYear = (minDate && minDate.getFullYear() == drawYear);
                var inMaxYear = (maxDate && maxDate.getFullYear() == drawYear);
                monthHtml += '<select class="ui-datepicker-month" ' + 'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'M\');" ' + 'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' + '>';
                for (var month = 0; month < 12; month++) {
                    if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()))
                        monthHtml += '<option value="' + month + '"' + (month == drawMonth ? ' selected="selected"' : '') + '>' + monthNamesShort[month] + '</option>'
                }
                monthHtml += '</select>'
            }
            if (!showMonthAfterYear)
                html += monthHtml + (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '');
            if (!inst.yearshtml) {
                inst.yearshtml = '';
                if (secondary || !changeYear)
                    html += '<span class="ui-datepicker-year">' + drawYear + '</span>';
                else {
                    var years = this._get(inst, 'yearRange').split(':');
                    var thisYear = new Date().getFullYear();
                    var determineYear = function (value) {
                        var year = (value.match(/c[+-].*/) ? drawYear + parseInt(value.substring(1), 10) : (value.match(/[+-].*/) ? thisYear + parseInt(value, 10) : parseInt(value, 10)));
                        return (isNaN(year) ? thisYear : year)
                    };
                    var year = determineYear(years[0]);
                    var endYear = Math.max(year, determineYear(years[1] || ''));
                    year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
                    endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
                    inst.yearshtml += '<select class="ui-datepicker-year" ' + 'onchange="DP_jQuery_' + dpuuid + '.datepicker._selectMonthYear(\'#' + inst.id + '\', this, \'Y\');" ' + 'onclick="DP_jQuery_' + dpuuid + '.datepicker._clickMonthYear(\'#' + inst.id + '\');"' + '>';
                    for (; year <= endYear; year++) {
                        inst.yearshtml += '<option value="' + year + '"' + (year == drawYear ? ' selected="selected"' : '') + '>' + year + '</option>'
                    }
                    inst.yearshtml += '</select>';
                    html += inst.yearshtml;
                    inst.yearshtml = null
                }
            }
            html += this._get(inst, 'yearSuffix');
            if (showMonthAfterYear)
                html += (secondary || !(changeMonth && changeYear) ? '&#xa0;' : '') + monthHtml;
            html += '</div>';
            return html
        },
        _adjustInstDate: function (inst, offset, period) {
            var year = inst.drawYear + (period == 'Y' ? offset : 0);
            var month = inst.drawMonth + (period == 'M' ? offset : 0);
            var day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period == 'D' ? offset : 0);
            var date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));
            inst.selectedDay = date.getDate();
            inst.drawMonth = inst.selectedMonth = date.getMonth();
            inst.drawYear = inst.selectedYear = date.getFullYear();
            if (period == 'M' || period == 'Y')
                this._notifyChange(inst)
        },
        _restrictMinMax: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            var newDate = (minDate && date < minDate ? minDate : date);
            newDate = (maxDate && newDate > maxDate ? maxDate : newDate);
            return newDate
        },
        _notifyChange: function (inst) {
            var onChange = this._get(inst, 'onChangeMonthYear');
            if (onChange)
                onChange.apply((inst.input ? inst.input[0] : null), [inst.selectedYear, inst.selectedMonth + 1, inst])
        },
        _getNumberOfMonths: function (inst) {
            var numMonths = this._get(inst, 'numberOfMonths');
            return (numMonths == null ? [1, 1] : (typeof numMonths == 'number' ? [1, numMonths] : numMonths))
        },
        _getMinMaxDate: function (inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + 'Date'), null)
        },
        _getDaysInMonth: function (year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate()
        },
        _getFirstDayOfMonth: function (year, month) {
            return new Date(year, month, 1).getDay()
        },
        _canAdjustMonth: function (inst, offset, curYear, curMonth) {
            var numMonths = this._getNumberOfMonths(inst);
            var date = this._daylightSavingAdjust(new Date(curYear, curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));
            if (offset < 0)
                date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
            return this._isInRange(inst, date)
        },
        _isInRange: function (inst, date) {
            var minDate = this._getMinMaxDate(inst, 'min');
            var maxDate = this._getMinMaxDate(inst, 'max');
            return ((!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()))
        },
        _getFormatConfig: function (inst) {
            var shortYearCutoff = this._get(inst, 'shortYearCutoff');
            shortYearCutoff = (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
            return {
                shortYearCutoff: shortYearCutoff,
                dayNamesShort: this._get(inst, 'dayNamesShort'),
                dayNames: this._get(inst, 'dayNames'),
                monthNamesShort: this._get(inst, 'monthNamesShort'),
                monthNames: this._get(inst, 'monthNames')
            }
        },
        _formatDate: function (inst, day, month, year) {
            if (!day) {
                inst.currentDay = inst.selectedDay;
                inst.currentMonth = inst.selectedMonth;
                inst.currentYear = inst.selectedYear
            }
            var date = (day ? (typeof day == 'object' ? day : this._daylightSavingAdjust(new Date(year, month, day))) : this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
            return this.formatDate(this._get(inst, 'dateFormat'), date, this._getFormatConfig(inst))
        }
    });

    function bindHover(dpDiv) {
        var selector = 'button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a';
        return dpDiv.bind('mouseout', function (event) {
            var elem = $(event.target).closest(selector);
            if (!elem.length) {
                return
            }
            elem.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")
        }).bind('mouseover', function (event) {
            var elem = $(event.target).closest(selector);
            if ($.datepicker._isDisabledDatepicker(instActive.inline ? dpDiv.parent()[0] : instActive.input[0]) || !elem.length) {
                return
            }
            elem.parents('.ui-datepicker-calendar').find('a').removeClass('ui-state-hover');
            elem.addClass('ui-state-hover');
            if (elem.hasClass('ui-datepicker-prev')) elem.addClass('ui-datepicker-prev-hover');
            if (elem.hasClass('ui-datepicker-next')) elem.addClass('ui-datepicker-next-hover')
        })
    }

    function extendRemove(target, props) {
        $.extend(target, props);
        for (var name in props)
            if (props[name] == null || props[name] == undefined)
                target[name] = props[name];
        return target
    };

    function isArray(a) {
        return (a && (($.browser.safari && typeof a == 'object' && a.length) || (a.constructor && a.constructor.toString().match(/\Array\(\)/))))
    };
    $.fn.datepicker = function (options) {
        if (!this.length) {
            return this
        }
        if (!$.datepicker.initialized) {
            $(document).mousedown($.datepicker._checkExternalClick).find('body').append($.datepicker.dpDiv);
            $.datepicker.initialized = !0
        }
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        if (typeof options == 'string' && (options == 'isDisabled' || options == 'getDate' || options == 'widget'))
            return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
        if (options == 'option' && arguments.length == 2 && typeof arguments[1] == 'string')
            return $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this[0]].concat(otherArgs));
        return this.each(function () {
            typeof options == 'string' ? $.datepicker['_' + options + 'Datepicker'].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    };
    $.datepicker = new Datepicker();
    $.datepicker.initialized = !1;
    $.datepicker.uuid = new Date().getTime();
    $.datepicker.version = "1.8.14";
    window['DP_jQuery_' + dpuuid] = $;
    $('.date-pick').datepicker({
        autoFocusNextInput: !0
    })
})(jQuery);
var related_posts_js_options = {
    "post_heading": "h4"
};
! function (t) {
    var e = {
        response: null,
        getEndpointURL: function (e) {
            var s, a = "undefined" != typeof wp && wp.customize && wp.customize.settings && wp.customize.settings.url && wp.customize.settings.url.self;
            a ? (s = document.createElement("a")).href = wp.customize.settings.url.self : s = document.location, "string" == typeof e && e.match(/^https?:\/\//) && ((s = document.createElement("a")).href = e);
            var o = "relatedposts=1";
            t("#jp-relatedposts").data("exclude") && (o += "&relatedposts_exclude=" + t("#jp-relatedposts").data("exclude")), a && (o += "&jetpackrpcustomize=1");
            var p = s.pathname;
            return "/" !== p[0] && (p = "/" + p), "" === s.search ? p + "?" + o : p + s.search + "&" + o
        },
        getAnchor: function (e, s) {
            var a = e.title,
                o = t("<a>");
            o.attr({
                class: s,
                href: e.url,
                title: a,
                "data-origin": e.url_meta.origin,
                "data-position": e.url_meta.position
            }), "" !== e.rel && o.attr({
                rel: e.rel
            });
            var p = t("<div>").append(o).html();
            return [p.substring(0, p.length - 4), "</a>"]
        },
        generateMinimalHtml: function (e, s) {
            var a = this,
                o = "";
            return t.each(e, function (t, e) {
                var p = a.getAnchor(e, "jp-relatedposts-post-a"),
                    r = "jp-relatedposts-post jp-relatedposts-post" + t;
                e.classes.length > 0 && (r += " " + e.classes.join(" ")), o += '<p class="' + r + '" data-post-id="' + e.id + '" data-post-format="' + e.format + '">', o += '<span class="jp-relatedposts-post-title">' + p[0] + e.title + p[1] + "</span>", s.showDate && (o += '<span class="jp-relatedposts-post-date">' + e.date + "</span>"), s.showContext && (o += '<span class="jp-relatedposts-post-context">' + e.context + "</span>"), o += "</p>"
            }), '<div class="jp-relatedposts-items jp-relatedposts-items-minimal jp-relatedposts-' + s.layout + ' ">' + o + "</div>"
        },
        generateVisualHtml: function (e, s) {
            var a = this,
                o = "";
            return t.each(e, function (e, p) {
                var r = a.getAnchor(p, "jp-relatedposts-post-a"),
                    i = "jp-relatedposts-post jp-relatedposts-post" + e;
                if (p.classes.length > 0 && (i += " " + p.classes.join(" ")), p.img.src ? i += " jp-relatedposts-post-thumbs" : i += " jp-relatedposts-post-nothumbs", o += '<div class="' + i + '" data-post-id="' + p.id + '" data-post-format="' + p.format + '">', p.img.src) o += r[0] + '<img class="jp-relatedposts-post-img" src="' + p.img.src + '" width="' + p.img.width + '" alt="' + p.img.alt_text + '" />' + r[1];
                else {
                    var n = a.getAnchor(p, "jp-relatedposts-post-a jp-relatedposts-post-aoverlay");
                    o += n[0] + n[1]
                }
                o += "<" + related_posts_js_options.post_heading + ' class="jp-relatedposts-post-title">' + r[0] + p.title + r[1] + "</" + related_posts_js_options.post_heading + ">", o += '<p class="jp-relatedposts-post-excerpt">' + t("<p>").text(p.excerpt).html() + "</p>", s.showDate && (o += '<p class="jp-relatedposts-post-date">' + p.date + "</p>"), s.showContext && (o += '<p class="jp-relatedposts-post-context">' + p.context + "</p>"), o += "</div>"
            }), '<div class="jp-relatedposts-items jp-relatedposts-items-visual jp-relatedposts-' + s.layout + ' ">' + o + "</div>"
        },
        setVisualExcerptHeights: function () {
            var e = t("#jp-relatedposts .jp-relatedposts-post-nothumbs .jp-relatedposts-post-excerpt");
            if (!(0 >= e.length)) {
                var s = parseInt(e.first().css("font-size"), 10),
                    a = parseInt(e.first().css("line-height"), 10);
                e.css("max-height", 5 * a / s + "em")
            }
        },
        getTrackedUrl: function (e) {
            var s = "relatedposts_hit=1";
            s += "&relatedposts_origin=" + t(e).data("origin"), s += "&relatedposts_position=" + t(e).data("position");
            var a = e.pathname;
            return "/" !== a[0] && (a = "/" + a), "" === e.search ? a + "?" + s : a + e.search + "&" + s
        },
        cleanupTrackedUrl: function () {
            if ("function" == typeof history.replaceState) {
                var t = document.location.search.replace(/\brelatedposts_[a-z]+=[0-9]*&?\b/gi, "");
                "?" === t && (t = ""), document.location.search !== t && history.replaceState({}, document.title, document.location.pathname + t)
            }
        }
    };

    function s() {
        e.setVisualExcerptHeights(), t("#jp-relatedposts a.jp-relatedposts-post-a").click(function () {
            this.href = e.getTrackedUrl(this)
        })
    }

    function a() {
        e.cleanupTrackedUrl();
        var a = e.getEndpointURL(),
            o = t("#jp-relatedposts");
        t("#jp-relatedposts .jp-relatedposts-post").length ? s() : t.getJSON(a, function (t) {
            if (0 !== t.items.length && 0 !== o.length) {
                e.response = t;
                var a, p, r = {};
                "undefined" != typeof wp && wp.customize ? (p = wp.customize.instance("jetpack_relatedposts[show_thumbnails]").get(), r.showDate = wp.customize.instance("jetpack_relatedposts[show_date]").get(), r.showContext = wp.customize.instance("jetpack_relatedposts[show_context]").get(), r.layout = wp.customize.instance("jetpack_relatedposts[layout]").get()) : (p = t.show_thumbnails, r.showDate = t.show_date, r.showContext = t.show_context, r.layout = t.layout), a = p ? e.generateVisualHtml(t.items, r) : e.generateMinimalHtml(t.items, r), o.append(a), r.showDate && o.find(".jp-relatedposts-post-date").show(), o.show(), s()
            }
        })
    }
    t(function () {
        "undefined" != typeof wp && wp.customize ? (wp.customize.selectiveRefresh && wp.customize.selectiveRefresh.bind("partial-content-rendered", function (t) {
            "jetpack_relatedposts" === t.partial.id && a()
        }), wp.customize.bind("preview-ready", a)) : a()
    })
}(jQuery);
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
jQuery(function ($) {
    $('.date-pick').each(function () {
        var format = $(this).data('format') || 'mm/dd/yyyy';
        format = format.replace(/yyyy/i, 'yy');
        $(this).datepicker({
            autoFocusNextInput: !0,
            constrainInput: !1,
            changeMonth: !0,
            changeYear: !0,
            beforeShow: function (input, inst) {
                $('#ui-datepicker-div').addClass('show')
            },
            dateFormat: format.toLowerCase(),
        })
    });
    d = new Date();
    $('.birthdate-pick').each(function () {
        var format = $(this).data('format') || 'mm/dd';
        format = format.replace(/yyyy/i, 'yy');
        $(this).datepicker({
            autoFocusNextInput: !0,
            constrainInput: !1,
            changeMonth: !0,
            changeYear: !1,
            minDate: new Date(d.getFullYear(), 1 - 1, 1),
            maxDate: new Date(d.getFullYear(), 12 - 1, 31),
            beforeShow: function (input, inst) {
                $('#ui-datepicker-div').removeClass('show')
            },
            dateFormat: format.toLowerCase(),
        })
    })
});
document.documentElement.classList.add('jetpack-lazy-images-js-enabled'); /*! This file is auto-generated */
window.addComment = function (f) {
    var v, I, C, h = f.document,
        E = {
            commentReplyClass: "comment-reply-link",
            commentReplyTitleId: "reply-title",
            cancelReplyId: "cancel-comment-reply-link",
            commentFormId: "commentform",
            temporaryFormId: "wp-temp-form-div",
            parentIdFieldId: "comment_parent",
            postIdFieldId: "comment_post_ID"
        },
        e = f.MutationObserver || f.WebKitMutationObserver || f.MozMutationObserver,
        i = "querySelector" in h && "addEventListener" in f,
        n = !!h.documentElement.dataset;

    function t() {
        d(),
            function () {
                if (!e) return;
                new e(o).observe(h.body, {
                    childList: !0,
                    subtree: !0
                })
            }()
    }

    function d(e) {
        if (i && (v = b(E.cancelReplyId), I = b(E.commentFormId), v)) {
            v.addEventListener("touchstart", l), v.addEventListener("click", l);
            var t = function (e) {
                if ((e.metaKey || e.ctrlKey) && 13 === e.keyCode) return I.removeEventListener("keydown", t), e.preventDefault(), I.submit.click(), !1
            };
            I && I.addEventListener("keydown", t);
            for (var n, d = function (e) {
                    var t, n = E.commentReplyClass;
                    e && e.childNodes || (e = h);
                    t = h.getElementsByClassName ? e.getElementsByClassName(n) : e.querySelectorAll("." + n);
                    return t
                }(e), o = 0, r = d.length; o < r; o++)(n = d[o]).addEventListener("touchstart", a), n.addEventListener("click", a)
        }
    }

    function l(e) {
        var t = b(E.temporaryFormId);
        if (t && C) {
            b(E.parentIdFieldId).value = "0";
            var n = t.textContent;
            t.parentNode.replaceChild(C, t), this.style.display = "none";
            var d = b(E.commentReplyTitleId),
                o = d && d.firstChild,
                r = o && o.nextSibling;
            o && o.nodeType === Node.TEXT_NODE && n && (r && "A" === r.nodeName && r.id !== E.cancelReplyId && (r.style.display = ""), o.textContent = n), e.preventDefault()
        }
    }

    function a(e) {
        var t = b(E.commentReplyTitleId),
            n = t && t.firstChild.textContent,
            d = this,
            o = m(d, "belowelement"),
            r = m(d, "commentid"),
            i = m(d, "respondelement"),
            l = m(d, "postid"),
            a = m(d, "replyto") || n;
        o && r && i && l && !1 === f.addComment.moveForm(o, r, i, l, a) && e.preventDefault()
    }

    function o(e) {
        for (var t = e.length; t--;)
            if (e[t].addedNodes.length) return void d()
    }

    function m(e, t) {
        return n ? e.dataset[t] : e.getAttribute("data-" + t)
    }

    function b(e) {
        return h.getElementById(e)
    }
    return i && "loading" !== h.readyState ? t() : i && f.addEventListener("DOMContentLoaded", t, !1), {
        init: d,
        moveForm: function (e, t, n, d, o) {
            var r = b(e);
            C = b(n);
            var i, l, a, m = b(E.parentIdFieldId),
                c = b(E.postIdFieldId),
                s = b(E.commentReplyTitleId),
                y = s && s.firstChild,
                u = y && y.nextSibling;
            if (r && C && m) {
                void 0 === o && (o = y && y.textContent),
                    function (e) {
                        var t = E.temporaryFormId,
                            n = b(t),
                            d = b(E.commentReplyTitleId),
                            o = d ? d.firstChild.textContent : "";
                        if (n) return;
                        (n = h.createElement("div")).id = t, n.style.display = "none", n.textContent = o, e.parentNode.insertBefore(n, e)
                    }(C), d && c && (c.value = d), m.value = t, v.style.display = "", r.parentNode.insertBefore(C, r.nextSibling), y && y.nodeType === Node.TEXT_NODE && (u && "A" === u.nodeName && u.id !== E.cancelReplyId && (u.style.display = "none"), y.textContent = o), v.onclick = function () {
                        return !1
                    };
                try {
                    for (var p = 0; p < I.elements.length; p++)
                        if (i = I.elements[p], l = !1, "getComputedStyle" in f ? a = f.getComputedStyle(i) : h.documentElement.currentStyle && (a = i.currentStyle), (i.offsetWidth <= 0 && i.offsetHeight <= 0 || "hidden" === a.visibility) && (l = !0), "hidden" !== i.type && !i.disabled && !l) {
                            i.focus();
                            break
                        }
                } catch (e) {}
                return !1
            }
        }
    }
}(window); /*! This file is auto-generated */
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
    "loadingAnimation": "https:\/\/ruta.tkdemos.co\/wp-includes\/js\/thickbox\/loadingAnimation.gif"
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
var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight || e.clientHeight || g.clientHeight;
(function () {
    var container, button, menu, links, subMenus, i, len, body;
    body = document.getElementsByTagName('body')[0];
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
            body.className = body.className.replace(' nav-opened', '');
            button.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-expanded', 'false')
        } else {
            body.className += ' nav-opened';
            container.className += ' toggled';
            button.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-expanded', 'true')
        }
    };
    links = menu.getElementsByTagName('a');
    subMenus = menu.getElementsByTagName('ul');
    for (i = 0, len = subMenus.length; i < len; i++) {
        subMenus[i].parentNode.setAttribute('aria-haspopup', 'true')
    }
    if (x > 1024) {
        var toggleFocus = function () {
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
        };
        for (i = 0, len = links.length; i < len; i++) {
            links[i].addEventListener('focus', toggleFocus, !0);
            links[i].addEventListener('blur', toggleFocus, !0)
        }
    }
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
(function ($) {
    'use strict';
    var $window = $(window);
    var body = $('body');
    var primaryContent = $('#primary');
    var mainContent = $('#content');
    var mainHeader = $('#masthead');
    var stickyHeader;
    var bigSearchWrap = $('#bigSearchWrap');
    var bigSocialMenuWrap = $('#bigSocialWrap');
    var bigSearchTrigger = $('#big_search_trigger');
    var featuredContent = $('#featured-content');
    var bigSocialMenuTrigger = $('#social_menu_trigger').find('button');
    var stickyPostFeaturedImg = $('.masonry .sticky figure.featured-image');
    if (featuredContent.length) {
        var featuredSlider = featuredContent.find('.featured-slider');
        var slide = featuredSlider.find('article');
        var prefixSlickDots = function () {
            var slickDots = featuredSlider.find('.slick-dots button');
            slickDots.each(function () {
                var dotText = $(this).text();
                if (parseInt(dotText) < 10) {
                    dotText = '0' + dotText;
                    $(this).text(dotText)
                }
            })
        }
    }

    function featuredAsBackground(el) {
        if (el.length) {
            var elSrc;
            if (el.find('img').attr('data-lazy-src')) {
                elSrc = el.find('img').attr('data-lazy-src')
            } else {
                elSrc = el.find('img').attr('src')
            }
            el.css({
                backgroundImage: 'url(' + elSrc + ')'
            })
        }
    }

    function wideImages() {
        if (body.hasClass('single') || (body.hasClass('page') && !body.hasClass('page-template-template-portfolio'))) {
            x = w.innerWidth || e.clientWidth || g.clientWidth;
            var fullWidthImg = $('img.tk-fullsize-img, .tk-fullsize-img img');
            if (fullWidthImg.length && ((x >= 1200 && body.hasClass('no-sidebar')) || x < 1200)) {
                fullWidthImg.each(function () {
                    var $this = $(this);
                    var fullWidthImgWidth = $this.width();
                    var entryContentWidth = $('.entry-content').width();
                    if ((x > 767 && body.hasClass('no-sidebar')) || (x < 1200 && x > 767)) {
                        if (fullWidthImgWidth > entryContentWidth) {
                            if (fullWidthImgWidth > entryContentWidth) {
                                $this.css({
                                    marginLeft: -((fullWidthImgWidth - entryContentWidth) / 2),
                                    opacity: 1
                                })
                            }
                        } else {
                            $this.css({
                                opacity: 1
                            })
                        }
                    } else {
                        $this.css({
                            marginLeft: ''
                        })
                    }
                })
            }
            var bigImgs = primaryContent.find('img.aligncenter:not(.tk-fullsize-img), figure.aligncenter:not(.tk-fullsize-img), img.alignnone:not(.tk-fullsize-img), figure.alignnone:not(.tk-fullsize-img), figure.wp-block-image:not(.tk-fullsize-img)');
            if (bigImgs.length && body.hasClass('no-sidebar')) {
                primaryContent.imagesLoaded(function () {
                    bigImgs.each(function () {
                        var $this = $(this);
                        if ($this.has('.tk-fullsize-img').length < 1) {
                            var bigImgsWidth;
                            var entryContentWidth = primaryContent.find('div.entry-content').width();
                            if ($this.is('img')) {
                                bigImgsWidth = $this.attr('width')
                            } else {
                                if ($this.find('img').is('[sizes]')) {
                                    bigImgsWidth = parseInt($this.find('img').attr('sizes').split(' ').pop())
                                } else {
                                    bigImgsWidth = $this.find('img').attr('width')
                                }
                                if (x > 1280) {
                                    $this.css({
                                        width: bigImgsWidth
                                    })
                                } else {
                                    $this.css({
                                        width: ''
                                    })
                                }
                            }
                            if (x > 1024) {
                                if (bigImgsWidth > entryContentWidth) {
                                    if (bigImgsWidth > 900) {
                                        $this.css({
                                            marginLeft: -((900 - entryContentWidth) / 2)
                                        })
                                    } else {
                                        $this.css({
                                            marginLeft: -((bigImgsWidth - entryContentWidth) / 2)
                                        })
                                    }
                                    $this.css({
                                        opacity: 1
                                    })
                                } else {
                                    $this.css({
                                        marginLeft: '',
                                        opacity: 1
                                    })
                                }
                            } else {
                                $this.css({
                                    marginLeft: '',
                                    opacity: 1
                                })
                            }
                        }
                    })
                })
            }
            bigImgs.each(function () {
                var $this = $(this);
                if ($this.length && $this.has('.tk-fullsize-img').length) {
                    $this.addClass('tk-fullsize-wrap')
                }
            })
        }
    }
    $(document).ready(function ($) {
        var x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;
        var wScrollTop = $window.scrollTop();
        var htmlOffsetTop = parseInt($('html').css('margin-top'));
        var mainHeaderHeight = mainHeader.outerHeight();
        var mainFooterHeight = $('#colophon').outerHeight();
        $([stickyHeader, bigSearchWrap, bigSocialMenuWrap]).each(function () {
            $(this).css({
                top: htmlOffsetTop
            })
        });
        if (body.hasClass('center-logo')) {
            var headerImgAreaHeight = $('#headerImgArea').height();
            mainContent.css({
                minHeight: y - htmlOffsetTop - mainHeaderHeight - mainFooterHeight - headerImgAreaHeight
            })
        } else {
            mainContent.css({
                minHeight: y - htmlOffsetTop - mainHeaderHeight - mainFooterHeight
            })
        }
        if (body.hasClass('sticky-header') && x > 767) {
            stickyHeader = mainHeader;
            mainHeader.css({
                top: htmlOffsetTop
            });
            setTimeout(function () {
                mainHeaderHeight = mainHeader.outerHeight();
                if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
                    var mainContentPaddinigTop = parseInt($('#content').css('padding-top'), 10);
                    bigSearchWrap.next().css({
                        paddingTop: (mainHeaderHeight + mainContentPaddinigTop)
                    })
                } else {
                    bigSearchWrap.next().css({
                        marginTop: (mainHeaderHeight)
                    })
                }
            }, 400);
            var headerOnScroll = function () {
                if (wScrollTop > 100) {
                    body.addClass('header-scrolled')
                } else {
                    body.removeClass('header-scrolled')
                }
            };
            headerOnScroll();
            $window.scroll(function () {
                setTimeout(function () {
                    wScrollTop = $(window).scrollTop();
                    headerOnScroll()
                }, 200)
            })
        }
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
        var mainNav = $('.site-header ul.nav-menu');
        var menuMarker = $('#menuMarker');
        mainNav.prepend(menuMarker);
        var mainMenuDropdownLink = $('.nav-menu .menu-item-has-children > a, .nav-menu .page_item_has_children > a');
        var dropDownArrow = $('<span class="dropdown-toggle"><span class="screen-reader-text">toggle child menu</span><i class="icon-drop-down"></i></span>');
        mainMenuDropdownLink.after(dropDownArrow);
        var dropDownButton = mainMenuDropdownLink.next('span.dropdown-toggle');
        dropDownButton.on('click', function () {
            var $this = $(this);
            $this.parent('li').toggleClass('toggle-on').find('.toggle-on').removeClass('toggle-on');
            $this.parent('li').siblings().removeClass('toggle-on')
        });
        var socialMenu = $('div.social-wrapper nav');
        if (socialMenu.length) {
            socialMenu.find('span.screen-reader-text').removeClass('screen-reader-text')
        }
        var dropcap = $('span.dropcap');
        if (dropcap.length && !dropcap.parent('p:first-child')) {
            dropcap.parent('p').css({
                marginTop: 40
            })
        }
        var $container = $('#post-load');
        var infiniteHandle = $('#infinite-handle');
        if (infiniteHandle.length) {
            if (x > 767) {
                infiniteHandle.parent().css('margin-bottom', 160)
            } else {
                infiniteHandle.parent().css('margin-bottom', 110)
            }
        }
        $(document.body).on('post-load', function () {
            var newEl = $container.children().not('article.post-loaded, span.infinite-loader, div.grid-sizer').addClass('post-loaded');
            newEl.hide();
            newEl.imagesLoaded(function () {
                radio_checkbox_animation();
                setTimeout(function () {
                    $container.masonry('appended', newEl, !0).masonry('reloadItems').masonry('layout').resize();
                    newEl.show();
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
                        }, 200 * (i + 1))
                    })
                }, 150);
                radio_checkbox_animation();
                shareDaddy();
                videoFormat();
                videoThickbox()
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
            var shareTitle = $('.sd-title');
            if (shareTitle.length) {
                shareTitle.on('click', function () {
                    $(this).closest('.sd-social').toggleClass('sd-open')
                })
            }
        }
        shareDaddy();

        function videoFormat() {
            var entryVideo = $('figure.entry-video');
            if (entryVideo.length) {
                entryVideo.each(function () {
                    var $this = $(this);
                    $this.find('.featured-image').closest('.entry-video').addClass('has-img')
                })
            }
        }
        videoFormat();

        function videoThickbox() {
            var thickboxVideo = $('.format-video a.thickbox');
            if (thickboxVideo.length) {
                thickboxVideo.on('click touchstart', function () {
                    setTimeout(function () {
                        $('#TB_window').addClass('format-video')
                    }, 200)
                })
            }
        }
        videoThickbox();
        var bigSearchField = bigSearchWrap.find('.search-field');
        var bigSearchCloseBtn = $('#big-search-close');
        var bigSearchClose = bigSearchWrap.add(bigSearchCloseBtn);
        $([bigSearchWrap, bigSocialMenuWrap]).each(function () {
            $(this).css({
                height: y - htmlOffsetTop
            })
        });

        function closeSearchFn() {
            if (body.hasClass('big-search')) {
                body.removeClass('big-search');
                setTimeout(function () {
                    bigSearchWrap.find('.search-field').blur()
                }, 100)
            }
        }

        function closeSocialMenuFn() {
            if (body.hasClass('social-menu-opened')) {
                body.removeClass('social-menu-opened');
                bigSocialMenuTrigger.attr('aria-expanded', 'false')
            }
        }
        bigSearchClose.on('click', function () {
            closeSearchFn()
        });
        $(document).keyup(function (e) {
            if (e.keyCode == 27) {
                closeSearchFn();
                closeSocialMenuFn();
                bigSocialMenuEl.each(function (i) {
                    setTimeout(function () {
                        bigSocialMenuEl.eq(i).removeClass('animate')
                    }, 150 * (i + 1))
                })
            }
        });
        bigSearchTrigger.on('click', function (e) {
            e.stopPropagation();
            body.addClass('big-search');
            setTimeout(function () {
                bigSearchWrap.find('.search-field').focus()
            }, 800)
        });
        bigSearchField.on('click', function (e) {
            e.stopPropagation()
        });

        function getIEVersion() {
            var sAgent = window.navigator.userAgent;
            var Idx = sAgent.indexOf("MSIE");
            if (Idx > 0) {
                return parseInt(sAgent.substring(Idx + 5, sAgent.indexOf(".", Idx)))
            } else if (!!navigator.userAgent.match(/Trident\/7\./)) {
                return 11
            } else {
                return 0
            }
        }
        if (getIEVersion() === 9) {
            var allBigSearchFields = $('.search-wrap, .not-found').find('.search-field');
            allBigSearchFields.on('keyup', function () {
                $(this).addClass('ie9-remove-bg')
            })
        }
        if (bigSocialMenuTrigger.length) {
            var closeSocialMenu = $('#closeSocialMenu');
            var bigSocialMenuEl = bigSocialMenuWrap.find('li');
            closeSocialMenu.on('click touchstart', function () {
                closeSocialMenuFn();
                bigSocialMenuEl.each(function (i) {
                    setTimeout(function () {
                        bigSocialMenuEl.eq(i).removeClass('animate')
                    }, 150 * (i + 1))
                })
            });
            bigSocialMenuTrigger.on('click touchstart', function (e) {
                var $this = $(this);
                e.preventDefault();
                e.stopPropagation();
                body.toggleClass('social-menu-opened');
                body.removeClass('big-search');
                $this.blur();
                if ($this.attr('aria-expanded') == 'false') {
                    $this.attr('aria-expanded', 'true')
                } else {
                    $this.attr('aria-expanded', 'false')
                }
                bigSocialMenuEl.each(function (i) {
                    setTimeout(function () {
                        bigSocialMenuEl.eq(i).addClass('animate')
                    }, 150 * (i + 1))
                })
            });
            bigSocialMenuWrap.on('click touchstart', function (e) {
                e.stopPropagation()
            })
        }
        var contactForm = $('form.contact-form');
        if (contactForm.length) {
            contactForm.find('input[type="text"], input[type="email"]').parent().addClass('half-width')
        }
        if (featuredContent.length) {
            slide.each(function () {
                var slideImg = $(this).find('figure.featured-image');
                featuredAsBackground(slideImg)
            })
        }
        var masonryContainer = $('div.masonry');
        masonryContainer.imagesLoaded(function () {
            setTimeout(function () {
                var masonryArticles = masonryContainer.find('article'),
                    numberOfMasonryArticles = masonryArticles.length;
                if (numberOfMasonryArticles < 5) {
                    $('.lines span').filter(function (index) {
                        return index > numberOfMasonryArticles - 1
                    }).css('display', 'none')
                }
                masonryContainer.masonry({
                    columnWidth: '.grid-sizer',
                    itemSelector: '.masonry > article',
                    transitionDuration: 0
                }).masonry('reloadItems').masonry('layout').resize().css({
                    opacity: 1
                });
                var masonryChild = masonryContainer.children('article.hentry');
                masonryChild.css({
                    willChange: 'transform, opacity'
                });
                masonryChild.each(function (i) {
                    setTimeout(function () {
                        masonryChild.eq(i).addClass('post-loaded animate')
                    }, 200 * (i + 1))
                });
                masonryChild.css({
                    willChange: ''
                })
            }, 300)
        });
        var shareDaddyBlock = mainContent.find('div.sharedaddy');
        if (body.hasClass('single') && shareDaddyBlock.length) {
            var entryFooter = shareDaddyBlock.siblings('.entry-footer');
            shareDaddyBlock.before(entryFooter)
        }

        function mainHeaderUnderlayer() {
            if (body.hasClass('sticky-header') && x > 767) {
                mainHeaderHeight = mainHeader.outerHeight();
                body.prepend('<div class="header-under-layer">&nbsp;</div>').children('.header-under-layer').css({
                    height: mainHeaderHeight,
                    top: htmlOffsetTop
                })
            }
        }
        if (body.hasClass('single') && x > 991) {
            var featuredPortrait = $('div.featured-portrait');
            if (featuredPortrait.length) {
                var featuredPortraitHeader = featuredPortrait.children('.entry-header');
                var featuredPortraitImage = featuredPortrait.children('.featured-image');
                featuredPortraitImage.after(featuredPortraitHeader)
            }
        }
        var fullSizeFeatured = mainContent.find('.fullsize-featured figure.featured-image');
        if (featuredContent.length || fullSizeFeatured.length) {
            setTimeout(function () {
                mainHeaderHeight = mainHeader.outerHeight();
                mainHeaderUnderlayer()
            }, 300);
            if (body.hasClass('single')) {
                featuredAsBackground(fullSizeFeatured)
            }
        }
        if (x <= 1366) {
            stickyPostFeaturedImg.each(function () {
                var $this = $(this);
                featuredAsBackground($this)
            })
        }
        var direction;
        if (featuredContent.length) {
            if (body.hasClass('rtl')) {
                direction = !0
            } else {
                direction = !1
            }
            mainHeaderHeight = mainHeader.outerHeight();
            if (body.hasClass('viewport-slider') && x > 991) {
                slide.css({
                    height: y - mainHeaderHeight - htmlOffsetTop
                })
            }
            var autoplaySlider = !1;
            if (body.hasClass('autoplay-slider')) {
                autoplaySlider = !0
            }
            if (body.hasClass('viewport-slider')) {
                featuredSlider.slick({
                    slide: 'article',
                    speed: 700,
                    arrows: !1,
                    fade: !0,
                    useTransform: !0,
                    centerMode: !0,
                    centerPadding: 0,
                    initialSlide: 0,
                    dots: !0,
                    draggable: !0,
                    touchThreshold: 20,
                    autoplay: autoplaySlider,
                    autoplaySpeed: 4000,
                    cssEase: 'cubic-bezier(0.28, 0.12, 0.22, 1)',
                    rtl: direction,
                    responsive: [{
                        breakpoint: 769,
                        settings: {
                            fade: !1,
                            arrows: !1
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            fade: !1,
                            speed: 300,
                            variableWidth: !0,
                            centerMode: !1,
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            dots: !1
                        }
                    }],
                }).on('breakpoint', function () {
                    prefixSlickDots()
                })
            }
            if (body.hasClass('plain-slider') && slide.length > 1) {
                featuredSlider.slick({
                    slide: 'article',
                    speed: 300,
                    useTransform: !0,
                    arrows: !1,
                    dots: !0,
                    draggable: !0,
                    touchThreshold: 20,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    variableWidth: !0,
                    autoplay: autoplaySlider,
                    autoplaySpeed: 4000,
                    cssEase: 'cubic-bezier(0.28, 0.12, 0.22, 1)',
                    rtl: direction,
                    responsive: [{
                        breakpoint: 1025,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2
                        }
                    }, {
                        breakpoint: 769,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: !0,
                            centerPadding: 30
                        }
                    }, {
                        breakpoint: 768,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            centerMode: !0,
                            centerPadding: 30,
                            dots: !1
                        }
                    }],
                }).on('breakpoint', function () {
                    prefixSlickDots()
                })
            }
            prefixSlickDots();
            featuredContent.imagesLoaded(function () {
                body.addClass('show-slider')
            })
        }
        var staffPickSlider = $('.featured-category-wrap .featured-row');
        if (staffPickSlider.length) {
            var staffSlide = staffPickSlider.find('article');
            if (body.hasClass('rtl')) {
                direction = !0
            } else {
                direction = !1
            }
            var staffArrows;
            if (staffSlide.length > 3) {
                staffArrows = !0
            } else {
                staffArrows = !1
            }
            staffPickSlider.slick({
                slide: 'article',
                speed: 300,
                infinite: !1,
                useTransform: !0,
                arrows: staffArrows,
                appendArrows: '.featured-arrows',
                dots: !1,
                draggable: !0,
                touchThreshold: 20,
                slidesToShow: 4,
                slidesToScroll: 1,
                variableWidth: !0,
                cssEase: 'cubic-bezier(0.28, 0.12, 0.22, 1)',
                rtl: direction,
                responsive: [{
                    breakpoint: 1441,
                    settings: {
                        slidesToShow: 3,
                    }
                }, {
                    breakpoint: 1025,
                    settings: {
                        slidesToShow: 2,
                    }
                }, {
                    breakpoint: 768,
                    settings: {
                        centerPadding: 30,
                        slidesToShow: 1,
                        arrows: !1
                    }
                }],
            });
            $('.featured-category-wrap').addClass('show-slider')
        }
        wideImages();
        var instagramFeed = $('#instagram-profile');
        if (instagramFeed.length) {
            instagramFeed.find('li a').on('mouseenter', function () {
                var $this = $(this);
                $this.css({
                    willChange: 'transform, opacity'
                })
            });
            instagramFeed.find('li a').on('mouseleave', function () {
                var $this = $(this);
                $this.css({
                    willChange: 'auto'
                })
            })
        }
        body.addClass('show')
    });
    $(window).on('pageshow', function (event) {
        if (event.originalEvent.persisted) {
            window.location.reload()
        }
    });
    $(window).resize(function () {
        setTimeout(function () {
            var x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight || e.clientHeight || g.clientHeight;
            var htmlOffsetTop = parseInt($('html').css('margin-top'));
            var mainHeaderHeight = mainHeader.outerHeight();
            var mainFooterHeight = $('#colophon').outerHeight();
            var stickyHeader;
            $([stickyHeader, bigSearchWrap, bigSocialMenuWrap]).each(function () {
                $(this).css({
                    top: htmlOffsetTop
                })
            });
            if (body.hasClass('sticky-header')) {
                stickyHeader = mainHeader;
                if (x > 767) {
                    mainHeader.css({
                        top: htmlOffsetTop
                    });
                    mainHeaderHeight = mainHeader.outerHeight();
                    if (navigator.appVersion.indexOf("MSIE 9.") != -1) {
                        var mainContentPaddinigTop = parseInt($('#content').css('padding-top'), 10);
                        bigSearchWrap.next().css({
                            paddingTop: (mainHeaderHeight + mainContentPaddinigTop)
                        })
                    } else {
                        bigSearchWrap.next().css({
                            marginTop: (mainHeaderHeight)
                        })
                    }
                } else {
                    stickyHeader.css({
                        top: ''
                    });
                    bigSearchWrap.next().css({
                        marginTop: ''
                    })
                }
            }
            if (body.hasClass('center-logo')) {
                var headerImgAreaHeight = $('#headerImgArea').height();
                mainContent.css({
                    minHeight: y - htmlOffsetTop - mainHeaderHeight - mainFooterHeight - headerImgAreaHeight
                })
            } else {
                mainContent.css({
                    minHeight: y - htmlOffsetTop - mainHeaderHeight - mainFooterHeight
                })
            }
            $([bigSearchWrap, bigSocialMenuWrap]).each(function () {
                $(this).css({
                    height: y - htmlOffsetTop
                })
            });
            var infiniteHandle = $('#infinite-handle');
            if (infiniteHandle.length) {
                if (x > 767) {
                    infiniteHandle.parent().css('margin-bottom', 160)
                } else {
                    infiniteHandle.parent().css('margin-bottom', 110)
                }
            }
            if (featuredContent.length) {
                featuredContent.imagesLoaded(function () {
                    mainHeaderHeight = mainHeader.outerHeight();
                    var featuredSlider = featuredContent.find('.featured-slider');
                    var slide = featuredSlider.find('article');
                    if (body.hasClass('viewport-slider') && x > 991) {
                        slide.css({
                            height: y - mainHeaderHeight - htmlOffsetTop
                        })
                    }
                })
            }
            wideImages();
            if (body.hasClass('single')) {
                var featuredPortrait = $('div.featured-portrait');
                if (featuredPortrait.length) {
                    var featuredPortraitHeader = featuredPortrait.children('.entry-header');
                    var featuredPortraitImage = featuredPortrait.children('.featured-image');
                    if (x > 991) {
                        featuredPortraitImage.after(featuredPortraitHeader)
                    } else {
                        featuredPortraitImage.before(featuredPortraitHeader)
                    }
                }
            }
            if (x <= 1366) {
                stickyPostFeaturedImg.each(function () {
                    var $this = $(this);
                    featuredAsBackground($this)
                })
            } else {
                stickyPostFeaturedImg.css({
                    backgroundImage: ''
                })
            }
        }, 300)
    });
    $(window).on('beforeunload', function () {
        var body = $('body');
        body.removeClass('show')
    })
})(jQuery);
! function (t) {
    var e = {};

    function n(o) {
        if (e[o]) return e[o].exports;
        var r = e[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return t[o].call(r.exports, r, r.exports, n), r.l = !0, r.exports
    }
    n.m = t, n.c = e, n.d = function (t, e, o) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: o
        })
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) n.d(o, r, function (e) {
                return t[e]
            }.bind(null, r));
        return o
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e) {
    var n = function () {
        var t, e, n, o, r = {
                rootMargin: "200px 0px",
                threshold: .01
            },
            i = 0;
        c();
        var s = document.querySelector("body");

        function c() {
            if (t = document.querySelectorAll("img.jetpack-lazy-image:not(.jetpack-lazy-image--handled)"), i = t.length, e && e.disconnect(), "IntersectionObserver" in window)
                for (e = new IntersectionObserver(a, r), o = 0; o < t.length; o++)(n = t[o]).getAttribute("data-lazy-loaded") || e.observe(n);
            else ! function (t) {
                var e;
                for (e = 0; e < t.length; e++) {
                    h(t[e])
                }
            }(t)
        }

        function a(t) {
            var n;
            for (0 === i && e.disconnect(), n = 0; n < t.length; n++) {
                var o = t[n];
                o.intersectionRatio > 0 && (i--, e.unobserve(o.target), h(o.target))
            }
        }

        function h(t) {
            var e, n, o;
            if (!(!t instanceof HTMLImageElement)) {
                e = t.getAttribute("data-lazy-srcset"), n = t.getAttribute("data-lazy-sizes"), t.removeAttribute("data-lazy-srcset"), t.removeAttribute("data-lazy-sizes"), t.removeAttribute("data-lazy-src"), t.classList.add("jetpack-lazy-image--handled"), t.setAttribute("data-lazy-loaded", 1), n && t.setAttribute("sizes", n), e ? t.setAttribute("srcset", e) : t.removeAttribute("srcset");
                try {
                    o = new Event("jetpack-lazy-loaded-image", {
                        bubbles: !0,
                        cancelable: !0
                    })
                } catch (t) {
                    (o = document.createEvent("Event")).initEvent("jetpack-lazy-loaded-image", !0, !0)
                }
                t.dispatchEvent(o)
            }
        }
        s && (s.addEventListener("is.post-load", c), s.addEventListener("jetpack-lazy-images-load", c))
    };
    ! function (t, e) {
        "use strict";
        if ("IntersectionObserver" in t && "IntersectionObserverEntry" in t && "intersectionRatio" in t.IntersectionObserverEntry.prototype) "isIntersecting" in t.IntersectionObserverEntry.prototype || Object.defineProperty(t.IntersectionObserverEntry.prototype, "isIntersecting", {
            get: function () {
                return this.intersectionRatio > 0
            }
        });
        else {
            var n = [];
            r.prototype.THROTTLE_TIMEOUT = 100, r.prototype.POLL_INTERVAL = null, r.prototype.USE_MUTATION_OBSERVER = !0, r.prototype.observe = function (t) {
                if (!this._observationTargets.some((function (e) {
                        return e.element == t
                    }))) {
                    if (!t || 1 != t.nodeType) throw new Error("target must be an Element");
                    this._registerInstance(), this._observationTargets.push({
                        element: t,
                        entry: null
                    }), this._monitorIntersections(), this._checkForIntersections()
                }
            }, r.prototype.unobserve = function (t) {
                this._observationTargets = this._observationTargets.filter((function (e) {
                    return e.element != t
                })), this._observationTargets.length || (this._unmonitorIntersections(), this._unregisterInstance())
            }, r.prototype.disconnect = function () {
                this._observationTargets = [], this._unmonitorIntersections(), this._unregisterInstance()
            }, r.prototype.takeRecords = function () {
                var t = this._queuedEntries.slice();
                return this._queuedEntries = [], t
            }, r.prototype._initThresholds = function (t) {
                var e = t || [0];
                return Array.isArray(e) || (e = [e]), e.sort().filter((function (t, e, n) {
                    if ("number" != typeof t || isNaN(t) || t < 0 || t > 1) throw new Error("threshold must be a number between 0 and 1 inclusively");
                    return t !== n[e - 1]
                }))
            }, r.prototype._parseRootMargin = function (t) {
                var e = (t || "0px").split(/\s+/).map((function (t) {
                    var e = /^(-?\d*\.?\d+)(px|%)$/.exec(t);
                    if (!e) throw new Error("rootMargin must be specified in pixels or percent");
                    return {
                        value: parseFloat(e[1]),
                        unit: e[2]
                    }
                }));
                return e[1] = e[1] || e[0], e[2] = e[2] || e[0], e[3] = e[3] || e[1], e
            }, r.prototype._monitorIntersections = function () {
                this._monitoringIntersections || (this._monitoringIntersections = !0, this.POLL_INTERVAL ? this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL) : (i(t, "resize", this._checkForIntersections, !0), i(e, "scroll", this._checkForIntersections, !0), this.USE_MUTATION_OBSERVER && "MutationObserver" in t && (this._domObserver = new MutationObserver(this._checkForIntersections), this._domObserver.observe(e, {
                    attributes: !0,
                    childList: !0,
                    characterData: !0,
                    subtree: !0
                }))))
            }, r.prototype._unmonitorIntersections = function () {
                this._monitoringIntersections && (this._monitoringIntersections = !1, clearInterval(this._monitoringInterval), this._monitoringInterval = null, s(t, "resize", this._checkForIntersections, !0), s(e, "scroll", this._checkForIntersections, !0), this._domObserver && (this._domObserver.disconnect(), this._domObserver = null))
            }, r.prototype._checkForIntersections = function () {
                var e = this._rootIsInDom(),
                    n = e ? this._getRootRect() : {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        width: 0,
                        height: 0
                    };
                this._observationTargets.forEach((function (r) {
                    var i = r.element,
                        s = c(i),
                        a = this._rootContainsTarget(i),
                        h = r.entry,
                        u = e && a && this._computeTargetAndRootIntersection(i, n),
                        l = r.entry = new o({
                            time: t.performance && performance.now && performance.now(),
                            target: i,
                            boundingClientRect: s,
                            rootBounds: n,
                            intersectionRect: u
                        });
                    h ? e && a ? this._hasCrossedThreshold(h, l) && this._queuedEntries.push(l) : h && h.isIntersecting && this._queuedEntries.push(l) : this._queuedEntries.push(l)
                }), this), this._queuedEntries.length && this._callback(this.takeRecords(), this)
            }, r.prototype._computeTargetAndRootIntersection = function (n, o) {
                if ("none" != t.getComputedStyle(n).display) {
                    for (var r, i, s, a, u, l, d, p, f = c(n), g = h(n), v = !1; !v;) {
                        var m = null,
                            b = 1 == g.nodeType ? t.getComputedStyle(g) : {};
                        if ("none" == b.display) return;
                        if (g == this.root || g == e ? (v = !0, m = o) : g != e.body && g != e.documentElement && "visible" != b.overflow && (m = c(g)), m && (r = m, i = f, s = void 0, a = void 0, u = void 0, l = void 0, d = void 0, p = void 0, s = Math.max(r.top, i.top), a = Math.min(r.bottom, i.bottom), u = Math.max(r.left, i.left), l = Math.min(r.right, i.right), p = a - s, !(f = (d = l - u) >= 0 && p >= 0 && {
                                top: s,
                                bottom: a,
                                left: u,
                                right: l,
                                width: d,
                                height: p
                            }))) break;
                        g = h(g)
                    }
                    return f
                }
            }, r.prototype._getRootRect = function () {
                var t;
                if (this.root) t = c(this.root);
                else {
                    var n = e.documentElement,
                        o = e.body;
                    t = {
                        top: 0,
                        left: 0,
                        right: n.clientWidth || o.clientWidth,
                        width: n.clientWidth || o.clientWidth,
                        bottom: n.clientHeight || o.clientHeight,
                        height: n.clientHeight || o.clientHeight
                    }
                }
                return this._expandRectByRootMargin(t)
            }, r.prototype._expandRectByRootMargin = function (t) {
                var e = this._rootMarginValues.map((function (e, n) {
                        return "px" == e.unit ? e.value : e.value * (n % 2 ? t.width : t.height) / 100
                    })),
                    n = {
                        top: t.top - e[0],
                        right: t.right + e[1],
                        bottom: t.bottom + e[2],
                        left: t.left - e[3]
                    };
                return n.width = n.right - n.left, n.height = n.bottom - n.top, n
            }, r.prototype._hasCrossedThreshold = function (t, e) {
                var n = t && t.isIntersecting ? t.intersectionRatio || 0 : -1,
                    o = e.isIntersecting ? e.intersectionRatio || 0 : -1;
                if (n !== o)
                    for (var r = 0; r < this.thresholds.length; r++) {
                        var i = this.thresholds[r];
                        if (i == n || i == o || i < n != i < o) return !0
                    }
            }, r.prototype._rootIsInDom = function () {
                return !this.root || a(e, this.root)
            }, r.prototype._rootContainsTarget = function (t) {
                return a(this.root || e, t)
            }, r.prototype._registerInstance = function () {
                n.indexOf(this) < 0 && n.push(this)
            }, r.prototype._unregisterInstance = function () {
                var t = n.indexOf(this); - 1 != t && n.splice(t, 1)
            }, t.IntersectionObserver = r, t.IntersectionObserverEntry = o
        }

        function o(t) {
            this.time = t.time, this.target = t.target, this.rootBounds = t.rootBounds, this.boundingClientRect = t.boundingClientRect, this.intersectionRect = t.intersectionRect || {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }, this.isIntersecting = !!t.intersectionRect;
            var e = this.boundingClientRect,
                n = e.width * e.height,
                o = this.intersectionRect,
                r = o.width * o.height;
            this.intersectionRatio = n ? r / n : this.isIntersecting ? 1 : 0
        }

        function r(t, e) {
            var n, o, r, i = e || {};
            if ("function" != typeof t) throw new Error("callback must be a function");
            if (i.root && 1 != i.root.nodeType) throw new Error("root must be an Element");
            this._checkForIntersections = (n = this._checkForIntersections.bind(this), o = this.THROTTLE_TIMEOUT, r = null, function () {
                r || (r = setTimeout((function () {
                    n(), r = null
                }), o))
            }), this._callback = t, this._observationTargets = [], this._queuedEntries = [], this._rootMarginValues = this._parseRootMargin(i.rootMargin), this.thresholds = this._initThresholds(i.threshold), this.root = i.root || null, this.rootMargin = this._rootMarginValues.map((function (t) {
                return t.value + t.unit
            })).join(" ")
        }

        function i(t, e, n, o) {
            "function" == typeof t.addEventListener ? t.addEventListener(e, n, o || !1) : "function" == typeof t.attachEvent && t.attachEvent("on" + e, n)
        }

        function s(t, e, n, o) {
            "function" == typeof t.removeEventListener ? t.removeEventListener(e, n, o || !1) : "function" == typeof t.detatchEvent && t.detatchEvent("on" + e, n)
        }

        function c(t) {
            var e;
            try {
                e = t.getBoundingClientRect()
            } catch (t) {}
            return e ? (e.width && e.height || (e = {
                top: e.top,
                right: e.right,
                bottom: e.bottom,
                left: e.left,
                width: e.right - e.left,
                height: e.bottom - e.top
            }), e) : {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: 0,
                height: 0
            }
        }

        function a(t, e) {
            for (var n = e; n;) {
                if (n == t) return !0;
                n = h(n)
            }
            return !1
        }

        function h(t) {
            var e = t.parentNode;
            return e && 11 == e.nodeType && e.host ? e.host : e
        }
    }(window, document), "interactive" === document.readyState || "complete" === document.readyState ? n() : document.addEventListener("DOMContentLoaded", n)
}]);
var NO_JQUERY = {};
! function (e, t, a) {
    if (!("console" in e)) {
        var n = e.console = {};
        n.log = n.warn = n.error = n.debug = function () {}
    }
    t === NO_JQUERY && (t = {
        fn: {},
        extend: function () {
            for (var e = arguments[0], t = 1, a = arguments.length; t < a; t++) {
                var n = arguments[t];
                for (var r in n) e[r] = n[r]
            }
            return e
        }
    }), t.fn.pm = function () {
        return console.log("usage: \nto send:    $.pm(options)\nto receive: $.pm.bind(type, fn, [origin])"), this
    }, t.pm = e.pm = function (e) {
        r.send(e)
    }, t.pm.bind = e.pm.bind = function (e, t, a, n, s) {
        r.bind(e, t, a, n, !0 === s)
    }, t.pm.unbind = e.pm.unbind = function (e, t) {
        r.unbind(e, t)
    }, t.pm.origin = e.pm.origin = null, t.pm.poll = e.pm.poll = 200;
    var r = {
        send: function (e) {
            var a = t.extend({}, r.defaults, e),
                n = a.target;
            if (a.target)
                if (a.type) {
                    var s = {
                        data: a.data,
                        type: a.type
                    };
                    a.success && (s.callback = r._callback(a.success)), a.error && (s.errback = r._callback(a.error)), "postMessage" in n && !a.hash ? (r._bind(), n.postMessage(JSON.stringify(s), a.origin || "*")) : (r.hash._bind(), r.hash.send(a, s))
                } else console.warn("postmessage type required");
            else console.warn("postmessage target window required")
        },
        bind: function (e, t, a, n, s) {
            r._replyBind(e, t, a, n, s)
        },
        _replyBind: function (a, n, s, o, i) {
            "postMessage" in e && !o ? r._bind() : r.hash._bind();
            var u = r.data("listeners.postmessage");
            u || (u = {}, r.data("listeners.postmessage", u));
            var c = u[a];
            c || (c = [], u[a] = c), c.push({
                fn: n,
                callback: i,
                origin: s || t.pm.origin
            })
        },
        unbind: function (e, t) {
            var a = r.data("listeners.postmessage");
            if (a)
                if (e)
                    if (t) {
                        var n = a[e];
                        if (n) {
                            for (var s = [], o = 0, i = n.length; o < i; o++) {
                                var u = n[o];
                                u.fn !== t && s.push(u)
                            }
                            a[e] = s
                        }
                    } else delete a[e];
            else
                for (var o in a) delete a[o]
        },
        data: function (e, t) {
            return void 0 === t ? r._data[e] : (r._data[e] = t, t)
        },
        _data: {},
        _CHARS: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        _random: function () {
            for (var e = [], t = 0; t < 32; t++) e[t] = r._CHARS[0 | 32 * Math.random()];
            return e.join("")
        },
        _callback: function (e) {
            var t = r.data("callbacks.postmessage");
            t || (t = {}, r.data("callbacks.postmessage", t));
            var a = r._random();
            return t[a] = e, a
        },
        _bind: function () {
            r.data("listening.postmessage") || (e.addEventListener ? e.addEventListener("message", r._dispatch, !1) : e.attachEvent && e.attachEvent("onmessage", r._dispatch), r.data("listening.postmessage", 1))
        },
        _dispatch: function (e) {
            try {
                var t = JSON.parse(e.data)
            } catch (e) {
                return
            }
            if (t.type) {
                var a = (r.data("callbacks.postmessage") || {})[t.type];
                if (a) a(t.data);
                else
                    for (var n = (r.data("listeners.postmessage") || {})[t.type] || [], s = 0, o = n.length; s < o; s++) {
                        var i = n[s];
                        if (i.origin && "*" !== i.origin && e.origin !== i.origin) {
                            if (console.warn("postmessage message origin mismatch", e.origin, i.origin), t.errback) {
                                var u = {
                                    message: "postmessage origin mismatch",
                                    origin: [e.origin, i.origin]
                                };
                                r.send({
                                    target: e.source,
                                    data: u,
                                    type: t.errback
                                })
                            }
                        } else try {
                            i.callback ? i.fn(t.data, c, e) : c(i.fn(t.data, e))
                        } catch (a) {
                            if (!t.errback) throw a;
                            r.send({
                                target: e.source,
                                data: a,
                                type: t.errback
                            })
                        }

                        function c(a) {
                            t.callback && r.send({
                                target: e.source,
                                data: a,
                                type: t.callback
                            })
                        }
                    }
            }
        }
    };
    r.hash = {
        send: function (t, a) {
            var n = t.target,
                s = t.url;
            if (s) {
                s = r.hash._url(s);
                var o, i = r.hash._url(e.location.href);
                if (e == n.parent) o = "parent";
                else try {
                    for (var u = 0, c = parent.frames.length; u < c; u++) {
                        if (parent.frames[u] == e) {
                            o = u;
                            break
                        }
                    }
                } catch (t) {
                    o = e.name
                }
                if (null != o) {
                    var l = {
                            "x-requested-with": "postmessage",
                            source: {
                                name: o,
                                url: i
                            },
                            postmessage: a
                        },
                        f = "#x-postmessage-id=" + r._random();
                    n.location = s + f + encodeURIComponent(JSON.stringify(l))
                } else console.warn("postmessage windows must be direct parent/child windows and the child must be available through the parent window.frames list")
            } else console.warn("postmessage target window url is required")
        },
        _regex: /^\#x\-postmessage\-id\=(\w{32})/,
        _regex_len: "#x-postmessage-id=".length + 32,
        _bind: function () {
            r.data("polling.postmessage") || (setInterval(function () {
                var t = "" + e.location.hash,
                    a = r.hash._regex.exec(t);
                if (a) {
                    var n = a[1];
                    r.hash._last !== n && (r.hash._last = n, r.hash._dispatch(t.substring(r.hash._regex_len)))
                }
            }, t.pm.poll || 200), r.data("polling.postmessage", 1))
        },
        _dispatch: function (t) {
            if (t) {
                try {
                    if (!("postmessage" === (t = JSON.parse(decodeURIComponent(t)))["x-requested-with"] && t.source && null != t.source.name && t.source.url && t.postmessage)) return
                } catch (e) {
                    return
                }
                var a = t.postmessage,
                    n = (r.data("callbacks.postmessage") || {})[a.type];
                if (n) n(a.data);
                else {
                    var s;
                    s = "parent" === t.source.name ? e.parent : e.frames[t.source.name];
                    for (var o = (r.data("listeners.postmessage") || {})[a.type] || [], i = 0, u = o.length; i < u; i++) {
                        var c = o[i];
                        if (c.origin) {
                            var l = /https?\:\/\/[^\/]*/.exec(t.source.url)[0];
                            if ("*" !== c.origin && l !== c.origin) {
                                if (console.warn("postmessage message origin mismatch", l, c.origin), a.errback) {
                                    var f = {
                                        message: "postmessage origin mismatch",
                                        origin: [l, c.origin]
                                    };
                                    r.send({
                                        target: s,
                                        data: f,
                                        type: a.errback,
                                        hash: !0,
                                        url: t.source.url
                                    })
                                }
                                continue
                            }
                        }

                        function p(e) {
                            a.callback && r.send({
                                target: s,
                                data: e,
                                type: a.callback,
                                hash: !0,
                                url: t.source.url
                            })
                        }
                        try {
                            c.callback ? c.fn(a.data, p) : p(c.fn(a.data))
                        } catch (e) {
                            if (!a.errback) throw e;
                            r.send({
                                target: s,
                                data: e,
                                type: a.errback,
                                hash: !0,
                                url: t.source.url
                            })
                        }
                    }
                }
            }
        },
        _url: function (e) {
            return ("" + e).replace(/#.*$/, "")
        }
    }, t.extend(r, {
        defaults: {
            target: null,
            url: null,
            type: null,
            data: null,
            success: null,
            error: null,
            origin: "*",
            hash: !1
        }
    })
}(this, "undefined" == typeof jQuery ? NO_JQUERY : jQuery), "JSON" in window && window.JSON || (JSON = {}),
    function () {
        function f(e) {
            return e < 10 ? "0" + e : e
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (e) {
            return this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z"
        }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
            return this.valueOf()
        });
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap, indent, meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
            rep;

        function quote(e) {
            return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                var t = meta[e];
                return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + e + '"'
        }

        function str(e, t) {
            var a, n, r, s, o, i = gap,
                u = t[e];
            switch (u && "object" == typeof u && "function" == typeof u.toJSON && (u = u.toJSON(e)), "function" == typeof rep && (u = rep.call(t, e, u)), typeof u) {
                case "string":
                    return quote(u);
                case "number":
                    return isFinite(u) ? String(u) : "null";
                case "boolean":
                case "null":
                    return String(u);
                case "object":
                    if (!u) return "null";
                    if (gap += indent, o = [], "[object Array]" === Object.prototype.toString.apply(u)) {
                        for (s = u.length, a = 0; a < s; a += 1) o[a] = str(a, u) || "null";
                        return r = 0 === o.length ? "[]" : gap ? "[\n" + gap + o.join(",\n" + gap) + "\n" + i + "]" : "[" + o.join(",") + "]", gap = i, r
                    }
                    if (rep && "object" == typeof rep)
                        for (s = rep.length, a = 0; a < s; a += 1) "string" == typeof (n = rep[a]) && (r = str(n, u)) && o.push(quote(n) + (gap ? ": " : ":") + r);
                    else
                        for (n in u) Object.hasOwnProperty.call(u, n) && (r = str(n, u)) && o.push(quote(n) + (gap ? ": " : ":") + r);
                    return r = 0 === o.length ? "{}" : gap ? "{\n" + gap + o.join(",\n" + gap) + "\n" + i + "}" : "{" + o.join(",") + "}", gap = i, r
            }
        }
        "function" != typeof JSON.stringify && (JSON.stringify = function (e, t, a) {
            var n;
            if (gap = "", indent = "", "number" == typeof a)
                for (n = 0; n < a; n += 1) indent += " ";
            else "string" == typeof a && (indent = a);
            if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
            return str("", {
                "": e
            })
        }), "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
            var j;

            function walk(e, t) {
                var a, n, r = e[t];
                if (r && "object" == typeof r)
                    for (a in r) Object.hasOwnProperty.call(r, a) && (void 0 !== (n = walk(r, a)) ? r[a] = n : delete r[a]);
                return reviver.call(e, t, r)
            }
            if (cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
                "": j
            }, "") : j;
            throw new SyntaxError("JSON.parse")
        })
    }();
! function (e) {
    var t, a, i, n, r = !1,
        o = [],
        s = !1;
    void 0 === window.Jetpack && (window.Jetpack = {
        getTarget: function (t) {
            return this instanceof jQuery ? t ? this.filter(t) : this : t ? e(t) : t
        }
    }), void 0 === e.fn.Jetpack && (e.fn.Jetpack = function (t) {
        if ("function" == typeof Jetpack[t]) return Jetpack[t].apply(this, Array.prototype.slice.call(arguments, 1));
        e.error('Namespace "' + t + '" does not exist on jQuery.Jetpack')
    }), "function" == typeof window.postMessage ? (t = function (e) {
        return e.match(/^https?:\/\//) || (e = document.location.href), e.split("/").slice(0, 3).join("/")
    }, a = function () {
        r = !0, e(window).on("message.JetpackResizeableIframe", function (t) {
            var a, i = t.originalEvent;
            if (-1 !== e.inArray(i.origin, o)) {
                if ("object" == typeof i.data) a = i.data.data;
                else try {
                    a = JSON.parse(i.data)
                } catch (e) {
                    a = !1
                }
                a.data && void 0 !== (a = a.data).action && "resize" === a.action && s.filter(function () {
                    return void 0 !== a.name ? this.name === a.name : i.source === this.contentWindow
                }).first().Jetpack("resizeable", "resize", a)
            }
        })
    }, i = function () {
        r = !1, e(window).off("message.JetpackResizeableIframe"), o = [], e(".jetpack-resizeable").removeClass("jetpack-resizeable"), s = !1
    }, n = {
        on: function (i) {
            var n = Jetpack.getTarget.call(this, i);
            return r || a(), n.each(function () {
                o.push(t(e(this).attr("src")))
            }).addClass("jetpack-resizeable"), s = e(".jetpack-resizeable"), n
        },
        off: function (a) {
            var n = Jetpack.getTarget.call(this, a);
            return void 0 === n ? (i(), n) : (n.each(function () {
                var a = t(e(this).attr("src")),
                    i = e.inArray(a, o); - 1 !== i && o.splice(i, 1)
            }).removeClass("jetpack-resizeable"), s = e(".jetpack-resizeable"), n)
        },
        resize: function (t, a) {
            var i = Jetpack.getTarget.call(this, a);
            return e.each(["width", "height"], function (e, a) {
                var n, r = 0;
                void 0 !== t[a] && (r = parseInt(t[a], 10)), 0 !== r && (i[a](r), (n = i.parent()).hasClass("slim-likes-widget") && n[a](r))
            }), i
        }
    }, e.extend(window.Jetpack, {
        resizeable: function (t) {
            return n[t] ? n[t].apply(this, Array.prototype.slice.call(arguments, 1)) : t ? void e.error("Method " + t + " does not exist on Jetpack.resizeable") : n.on.apply(this)
        }
    })) : e.extend(window.Jetpack, {
        resizeable: function () {
            e.error("Browser does not support window.postMessage")
        }
    })
}(jQuery);
var jetpackLikesWidgetBatch = [];
var jetpackLikesMasterReady = !1;
var jetpackLikesLookAhead = 2000;
var jetpackCommentLikesLoadedWidgets = [];

function JetpackLikesPostMessage(message, target) {
    if ('string' === typeof message) {
        try {
            message = JSON.parse(message)
        } catch (e) {
            return
        }
    }
    pm({
        target: target,
        type: 'likesMessage',
        data: message,
        origin: '*',
    })
}

function JetpackLikesBatchHandler() {
    var requests = [];
    jQuery('div.jetpack-likes-widget-unloaded').each(function () {
        if (jetpackLikesWidgetBatch.indexOf(this.id) > -1) {
            return
        }
        if (!jetpackIsScrolledIntoView(this)) {
            return
        }
        jetpackLikesWidgetBatch.push(this.id);
        var regex = /like-(post|comment)-wrapper-(\d+)-(\d+)-(\w+)/,
            match = regex.exec(this.id),
            info;
        if (!match || match.length !== 5) {
            return
        }
        info = {
            blog_id: match[2],
            width: this.width,
        };
        if ('post' === match[1]) {
            info.post_id = match[3]
        } else if ('comment' === match[1]) {
            info.comment_id = match[3]
        }
        info.obj_id = match[4];
        requests.push(info)
    });
    if (requests.length > 0) {
        JetpackLikesPostMessage({
            event: 'initialBatch',
            requests: requests
        }, window.frames['likes-master'])
    }
}

function JetpackLikesMessageListener(event, message) {
    var allowedOrigin, $container, $list, offset, rowLength, height, scrollbarWidth;
    if ('undefined' === typeof event.event) {
        return
    }
    allowedOrigin = 'https://widgets.wp.com';
    if (allowedOrigin !== message.origin) {
        return
    }
    switch (event.event) {
        case 'masterReady':
            jQuery(document).ready(function () {
                jetpackLikesMasterReady = !0;
                var stylesData = {
                        event: 'injectStyles',
                    },
                    $sdTextColor = jQuery('.sd-text-color'),
                    $sdLinkColor = jQuery('.sd-link-color');
                if (jQuery('iframe.admin-bar-likes-widget').length > 0) {
                    JetpackLikesPostMessage({
                        event: 'adminBarEnabled'
                    }, window.frames['likes-master']);
                    stylesData.adminBarStyles = {
                        background: jQuery('#wpadminbar .quicklinks li#wp-admin-bar-wpl-like > a').css('background'),
                        isRtl: 'rtl' === jQuery('#wpadminbar').css('direction'),
                    }
                }
                if (!window.addEventListener) {
                    jQuery('#wp-admin-bar-admin-bar-likes-widget').hide()
                }
                stylesData.textStyles = {
                    color: $sdTextColor.css('color'),
                    fontFamily: $sdTextColor.css('font-family'),
                    fontSize: $sdTextColor.css('font-size'),
                    direction: $sdTextColor.css('direction'),
                    fontWeight: $sdTextColor.css('font-weight'),
                    fontStyle: $sdTextColor.css('font-style'),
                    textDecoration: $sdTextColor.css('text-decoration'),
                };
                stylesData.linkStyles = {
                    color: $sdLinkColor.css('color'),
                    fontFamily: $sdLinkColor.css('font-family'),
                    fontSize: $sdLinkColor.css('font-size'),
                    textDecoration: $sdLinkColor.css('text-decoration'),
                    fontWeight: $sdLinkColor.css('font-weight'),
                    fontStyle: $sdLinkColor.css('font-style'),
                };
                JetpackLikesPostMessage(stylesData, window.frames['likes-master']);
                JetpackLikesBatchHandler()
            });
            break;
        case 'showLikeWidget':
            jQuery('#' + event.id + ' .likes-widget-placeholder').fadeOut('fast');
            break;
        case 'showCommentLikeWidget':
            jQuery('#' + event.id + ' .likes-widget-placeholder').fadeOut('fast');
            break;
        case 'killCommentLikes':
            jQuery('.jetpack-comment-likes-widget-wrapper').remove();
            break;
        case 'clickReblogFlair':
            wpcom_reblog.toggle_reblog_box_flair(event.obj_id);
            break;
        case 'showOtherGravatars':
            $container = jQuery('#likes-other-gravatars');
            $list = $container.find('ul');
            $container.hide();
            $list.html('');
            $container.find('.likes-text span').text(event.total);
            jQuery.each(event.likers, function (i, liker) {
                var element;
                if ('http' !== liker.profile_URL.substr(0, 4)) {
                    return
                }
                element = jQuery('<li><a><img /></a></li>');
                element.addClass(liker.css_class);
                element.find('a').attr({
                    href: liker.profile_URL,
                    rel: 'nofollow',
                    target: '_parent',
                }).addClass('wpl-liker');
                element.find('img').attr({
                    src: liker.avatar_URL,
                    alt: liker.name,
                }).css({
                    width: '30px',
                    height: '30px',
                    paddingRight: '3px',
                });
                $list.append(element)
            });
            offset = jQuery('body').find("[name='" + event.parent + "']").offset();
            $container.css('left', offset.left + event.position.left - 10 + 'px');
            $container.css('top', offset.top + event.position.top - 33 + 'px');
            rowLength = Math.floor(event.width / 37);
            height = Math.ceil(event.likers.length / rowLength) * 37 + 13;
            if (height > 204) {
                height = 204
            }
            $container.css('height', height + 'px');
            $container.css('width', rowLength * 37 - 7 + 'px');
            $list.css('width', rowLength * 37 + 'px');
            $container.fadeIn('slow');
            scrollbarWidth = $list[0].offsetWidth - $list[0].clientWidth;
            if (scrollbarWidth > 0) {
                $container.width($container.width() + scrollbarWidth);
                $list.width($list.width() + scrollbarWidth)
            }
    }
}
pm.bind('likesMessage', JetpackLikesMessageListener);
jQuery(document).click(function (e) {
    var $container = jQuery('#likes-other-gravatars');
    if ($container.has(e.target).length === 0) {
        $container.fadeOut('slow')
    }
});

function JetpackLikesWidgetQueueHandler() {
    var wrapperID;
    if (!jetpackLikesMasterReady) {
        setTimeout(JetpackLikesWidgetQueueHandler, 500);
        return
    }
    jetpackUnloadScrolledOutWidgets();
    var unloadedWidgetsInView = jetpackGetUnloadedWidgetsInView();
    if (unloadedWidgetsInView.length > 0) {
        JetpackLikesBatchHandler()
    }
    for (var i = 0, length = unloadedWidgetsInView.length; i <= length - 1; i++) {
        wrapperID = unloadedWidgetsInView[i].id;
        if (!wrapperID) {
            continue
        }
        jetpackLoadLikeWidgetIframe(wrapperID)
    }
}

function jetpackLoadLikeWidgetIframe(wrapperID) {
    var $wrapper;
    if ('undefined' === typeof wrapperID) {
        return
    }
    $wrapper = jQuery('#' + wrapperID);
    $wrapper.find('iframe').remove();
    var placeholder = $wrapper.find('.likes-widget-placeholder');
    if (placeholder.hasClass('post-likes-widget-placeholder')) {
        var postLikesFrame = document.createElement('iframe');
        postLikesFrame['class'] = 'post-likes-widget jetpack-likes-widget';
        postLikesFrame.name = $wrapper.data('name');
        postLikesFrame.src = $wrapper.data('src');
        postLikesFrame.height = '18px';
        postLikesFrame.width = '200px';
        postLikesFrame.frameBorder = '0';
        postLikesFrame.scrolling = 'no';
        if ($wrapper.hasClass('slim-likes-widget')) {
            postLikesFrame.height = '22px';
            postLikesFrame.width = '68px';
            postLikesFrame.scrolling = 'no'
        } else {
            postLikesFrame.height = '55px';
            postLikesFrame.width = '100%'
        }
        placeholder.after(postLikesFrame)
    }
    if (placeholder.hasClass('comment-likes-widget-placeholder')) {
        var commentLikesFrame = document.createElement('iframe');
        commentLikesFrame['class'] = 'comment-likes-widget-frame jetpack-likes-widget-frame';
        commentLikesFrame.name = $wrapper.data('name');
        commentLikesFrame.src = $wrapper.data('src');
        commentLikesFrame.height = '18px';
        commentLikesFrame.width = '100%';
        commentLikesFrame.frameBorder = '0';
        commentLikesFrame.scrolling = 'no';
        $wrapper.find('.comment-like-feedback').after(commentLikesFrame);
        jetpackCommentLikesLoadedWidgets.push(commentLikesFrame)
    }
    $wrapper.removeClass('jetpack-likes-widget-unloaded').addClass('jetpack-likes-widget-loading');
    $wrapper.find('iframe').load(function (e) {
        var $iframe = jQuery(e.target);
        JetpackLikesPostMessage({
            event: 'loadLikeWidget',
            name: $iframe.attr('name'),
            width: $iframe.width()
        }, window.frames['likes-master']);
        $wrapper.removeClass('jetpack-likes-widget-loading').addClass('jetpack-likes-widget-loaded');
        if ($wrapper.hasClass('slim-likes-widget')) {
            $wrapper.find('iframe').Jetpack('resizeable')
        }
    })
}

function jetpackGetUnloadedWidgetsInView() {
    var $unloadedWidgets = jQuery('div.jetpack-likes-widget-unloaded');
    return $unloadedWidgets.filter(function () {
        return jetpackIsScrolledIntoView(this)
    })
}

function jetpackIsScrolledIntoView(element) {
    var top = element.getBoundingClientRect().top;
    var bottom = element.getBoundingClientRect().bottom;
    return top + jetpackLikesLookAhead >= 0 && bottom <= window.innerHeight + jetpackLikesLookAhead
}

function jetpackUnloadScrolledOutWidgets() {
    for (var i = jetpackCommentLikesLoadedWidgets.length - 1; i >= 0; i--) {
        var currentWidgetIframe = jetpackCommentLikesLoadedWidgets[i];
        if (!jetpackIsScrolledIntoView(currentWidgetIframe)) {
            var $widgetWrapper = jQuery(currentWidgetIframe).parent().parent();
            $widgetWrapper.removeClass('jetpack-likes-widget-loaded jetpack-likes-widget-loading').addClass('jetpack-likes-widget-unloaded');
            $widgetWrapper.children('.comment-likes-widget-placeholder').fadeIn();
            jetpackCommentLikesLoadedWidgets.splice(i, 1);
            jQuery(currentWidgetIframe).remove()
        }
    }
}
var jetpackWidgetsDelayedExec = function (after, fn) {
    var timer;
    return function () {
        timer && clearTimeout(timer);
        timer = setTimeout(fn, after)
    }
};
var jetpackOnScrollStopped = jetpackWidgetsDelayedExec(250, JetpackLikesWidgetQueueHandler);
JetpackLikesWidgetQueueHandler();
window.addEventListener('scroll', jetpackOnScrollStopped, !0); /*! This file is auto-generated */
! function (d, l) {
    "use strict";
    var e = !1,
        o = !1;
    if (l.querySelector)
        if (d.addEventListener) e = !0;
    if (d.wp = d.wp || {}, !d.wp.receiveEmbedMessage)
        if (d.wp.receiveEmbedMessage = function (e) {
                var t = e.data;
                if (t)
                    if (t.secret || t.message || t.value)
                        if (!/[^a-zA-Z0-9]/.test(t.secret)) {
                            var r, a, i, s, n, o = l.querySelectorAll('iframe[data-secret="' + t.secret + '"]'),
                                c = l.querySelectorAll('blockquote[data-secret="' + t.secret + '"]');
                            for (r = 0; r < c.length; r++) c[r].style.display = "none";
                            for (r = 0; r < o.length; r++)
                                if (a = o[r], e.source === a.contentWindow) {
                                    if (a.removeAttribute("style"), "height" === t.message) {
                                        if (1e3 < (i = parseInt(t.value, 10))) i = 1e3;
                                        else if (~~i < 200) i = 200;
                                        a.height = i
                                    }
                                    if ("link" === t.message)
                                        if (s = l.createElement("a"), n = l.createElement("a"), s.href = a.getAttribute("src"), n.href = t.value, n.host === s.host)
                                            if (l.activeElement === a) d.top.location.href = t.value
                                }
                        }
            }, e) d.addEventListener("message", d.wp.receiveEmbedMessage, !1), l.addEventListener("DOMContentLoaded", t, !1), d.addEventListener("load", t, !1);

    function t() {
        if (!o) {
            o = !0;
            var e, t, r, a, i = -1 !== navigator.appVersion.indexOf("MSIE 10"),
                s = !!navigator.userAgent.match(/Trident.*rv:11\./),
                n = l.querySelectorAll("iframe.wp-embedded-content");
            for (t = 0; t < n.length; t++) {
                if (!(r = n[t]).getAttribute("data-secret")) a = Math.random().toString(36).substr(2, 10), r.src += "#?secret=" + a, r.setAttribute("data-secret", a);
                if (i || s)(e = r.cloneNode(!0)).removeAttribute("security"), r.parentNode.replaceChild(e, r)
            }
        }
    }
}(window, document)