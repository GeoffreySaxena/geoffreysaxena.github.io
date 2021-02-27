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
document.documentElement.classList.add('jetpack-lazy-images-js-enabled');
jQuery(document).ready(function (e) {
        var t, a, i, o, s, r, n, l, c, d, p, u, m, h, f, g, j, v, w, _ = 110,
            x = e("body").css("overflow"),
            b = e("html").css("overflow"),
            y = "";
        window.innerWidth <= 760 && (_ = Math.round(window.innerWidth / 760 * 110)) < 40 && ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) && (_ = 0), void 0 === Date.now && (Date.now = function () {
            return (new Date).getTime()
        });
        var k = function (e) {
                switch (e.which) {
                    case 38:
                        e.preventDefault(), o.scrollTop(o.scrollTop() - 100);
                        break;
                    case 40:
                        e.preventDefault(), o.scrollTop(o.scrollTop() + 100);
                        break;
                    case 39:
                        e.preventDefault(), i.jp_carousel("next");
                        break;
                    case 37:
                    case 8:
                        e.preventDefault(), i.jp_carousel("previous");
                        break;
                    case 27:
                        e.preventDefault(), o.jp_carousel("close")
                }
            },
            S = function () {
                clearTimeout(d), d = setTimeout(function () {
                    i.jp_carousel("slides").jp_carousel("fitSlide", !0), i.jp_carousel("updateSlidePositions", !0), i.jp_carousel("fitMeta", !0)
                }, 200)
            },
            C = function () {
                e("a img[data-attachment-id]").each(function () {
                    var t = e(this).parent();
                    if (!t.parent(".gallery-icon").length && void 0 !== e(t).attr("href")) {
                        var a = !1;
                        e(t).attr("href").split("?")[0] === e(this).attr("data-orig-file").split("?")[0] && 1 === Number(jetpackCarouselStrings.single_image_gallery_media_file) && (a = !0), e(t).attr("href") === e(this).attr("data-permalink") && (a = !0), a && (e(t).addClass("single-image-gallery"), e(t).data("carousel-extra", {
                            blog_id: Number(jetpackCarouselStrings.blog_id)
                        }))
                    }
                })
            },
            I = {
                testForData: function (t) {
                    return !(!(t = e(t)).length || !t.data("carousel-extra"))
                },
                testIfOpened: function () {
                    return !(void 0 === i || void 0 === i.opened || !i.opened)
                },
                openOrSelectSlide: function (t) {
                    e(this).jp_carousel("testIfOpened") ? i.jp_carousel("selectSlideAtIndex", t) : e(this).jp_carousel("open", {
                        start_index: t
                    })
                },
                open: function (d) {
                    var m = {
                            items_selector: ".gallery-item [data-attachment-id], .tiled-gallery-item [data-attachment-id], img[data-attachment-id]",
                            start_index: 0
                        },
                        h = e(this).data("carousel-extra");
                    if (h && (function () {
                            if (!t) {
                                t = e("<div></div>").addClass("jp-carousel-overlay").css({
                                    position: "fixed",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                });
                                var d = 1 == +jetpackCarouselStrings.display_comments,
                                    m = d ? '<a class="jp-carousel-commentlink" href="#">' + jetpackCarouselStrings.comment + "</a>" : "";
                                Number(jetpackCarouselStrings.is_logged_in), m = e('<div class="jp-carousel-buttons">' + m + "</div>"), c = e('<h2 itemprop="caption description"></h2>'), p = e('<div class="jp-carousel-photo-info"></div>').append(c), f = e("<div></div>").addClass("jp-carousel-image-meta").css({
                                    float: "right",
                                    "margin-top": "20px",
                                    width: "250px"
                                }), 0 < m.children().length && f.append(m), f.append("<ul class='jp-carousel-image-exif' style='display:none;'></ul>").append("<a class='jp-carousel-image-download' style='display:none;'></a>").append("<div class='jp-carousel-image-map' style='display:none;'></div>"), g = e("<div></div>").addClass("jp-carousel-titleanddesc").css({
                                    width: "100%",
                                    "margin-top": f.css("margin-top")
                                });
                                var h = e(window).width() - 2 * _ - (f.width() + 40);
                                if (h += "px", v = e("<div></div>").addClass("jp-carousel-left-column-wrapper").css({
                                        width: Math.floor(h)
                                    }).append(g), d) {
                                    var w = '<div id="jp-carousel-comment-form-container">';
                                    jetpackCarouselStrings.local_comments_commenting_as && jetpackCarouselStrings.local_comments_commenting_as.length && (1 !== Number(jetpackCarouselStrings.is_logged_in) && 1 === Number(jetpackCarouselStrings.comment_registration) ? w += '<div id="jp-carousel-comment-form-commenting-as">' + jetpackCarouselStrings.local_comments_commenting_as + "</div>" : (w += '<form id="jp-carousel-comment-form">', w += '<textarea name="comment" class="jp-carousel-comment-form-field jp-carousel-comment-form-textarea" id="jp-carousel-comment-form-comment-field" placeholder="' + jetpackCarouselStrings.write_comment + '"></textarea>', w += '<div id="jp-carousel-comment-form-submit-and-info-wrapper">', w += '<div id="jp-carousel-comment-form-commenting-as">' + jetpackCarouselStrings.local_comments_commenting_as + "</div>", w += '<input type="submit" name="submit" class="jp-carousel-comment-form-button" id="jp-carousel-comment-form-button-submit" value="' + jetpackCarouselStrings.post_comment + '" />', w += '<span id="jp-carousel-comment-form-spinner">&nbsp;</span>', w += '<div id="jp-carousel-comment-post-results"></div>', w += "</div>", w += "</form>")), j = e(w += "</div>").css({
                                        width: "100%",
                                        "margin-top": "20px",
                                        color: "#999"
                                    }), a = e("<div></div>").addClass("jp-carousel-comments").css({
                                        width: "100%",
                                        bottom: "10px",
                                        "margin-top": "20px"
                                    });
                                    var x = e('<div id="jp-carousel-comments-loading"><span>' + jetpackCarouselStrings.loading_comments + "</span></div>").css({
                                        width: "100%",
                                        bottom: "10px",
                                        "margin-top": "20px"
                                    });
                                    v.append(j).append(a).append(x)
                                }
                                var b = e("<div></div>").addClass("jp-carousel-fadeaway");
                                n = e("<div></div>").addClass("jp-carousel-info").css({
                                    top: Math.floor(e(window).height() / 100 * 85),
                                    left: _,
                                    right: _
                                }).append(p).append(f), window.innerWidth <= 760 ? (p.remove().insertAfter(g), n.prepend(v)) : n.append(v);
                                var C = e(window).height() - parseInt(n.css("top"), 10) + "px";
                                s = e("<div><span></span></div>").addClass("jp-carousel-next-button").css({
                                    right: "15px"
                                }).hide(), r = e("<div><span></span></div>").addClass("jp-carousel-previous-button").css({
                                    left: 0
                                }).hide(), s.add(r).css({
                                    position: "fixed",
                                    top: "40px",
                                    bottom: C,
                                    width: _
                                }), i = e("<div></div>").addClass("jp-carousel").css({
                                    position: "absolute",
                                    top: 0,
                                    bottom: C,
                                    left: 0,
                                    right: 0
                                }), u = e('<div class="jp-carousel-close-hint"><span>&times;</span></div>').css({
                                    position: "fixed"
                                }), o = e("<div></div>").addClass("jp-carousel-wrap").addClass("jp-carousel-transitions"), "white" === jetpackCarouselStrings.background_color && o.addClass("jp-carousel-light"), o.attr("itemscope", ""), o.attr("itemtype", "https://schema.org/ImageGallery"), o.css({
                                    position: "fixed",
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                    "z-index": 2147483647,
                                    "overflow-x": "hidden",
                                    "overflow-y": "auto",
                                    direction: "ltr"
                                }).hide().append(t).append(i).append(b).append(n).append(s).append(r).append(u).appendTo(e("body")).click(function (t) {
                                    var a = e(t.target),
                                        s = a.parents("div.jp-carousel-wrap"),
                                        r = s.data("carousel-extra"),
                                        l = s.find("div.selected").data("attachment-id");
                                    if (r = r || [], a.is(i) || a.parents().add(a).is(u)) o.jp_carousel("close");
                                    else if (a.hasClass("jp-carousel-commentlink")) t.preventDefault(), t.stopPropagation(), e(window).unbind("keydown", k), o.animate({
                                        scrollTop: parseInt(n.position().top, 10)
                                    }, "fast"), e("#jp-carousel-comment-form-submit-and-info-wrapper").slideDown("fast"), e("#jp-carousel-comment-form-comment-field").focus();
                                    else if (a.hasClass("jp-carousel-comment-login")) {
                                        var c = jetpackCarouselStrings.login_url + "%23jp-carousel-" + l;
                                        window.location.href = c
                                    } else if (a.parents("#jp-carousel-comment-form-container").length) {
                                        var d = e("#jp-carousel-comment-form-comment-field").blur(function () {
                                                e(window).bind("keydown", k)
                                            }).focus(function () {
                                                e(window).unbind("keydown", k)
                                            }),
                                            p = e("#jp-carousel-comment-form-email-field").blur(function () {
                                                e(window).bind("keydown", k)
                                            }).focus(function () {
                                                e(window).unbind("keydown", k)
                                            }),
                                            m = e("#jp-carousel-comment-form-author-field").blur(function () {
                                                e(window).bind("keydown", k)
                                            }).focus(function () {
                                                e(window).unbind("keydown", k)
                                            }),
                                            h = e("#jp-carousel-comment-form-url-field").blur(function () {
                                                e(window).bind("keydown", k)
                                            }).focus(function () {
                                                e(window).unbind("keydown", k)
                                            });
                                        if (d && d.attr("id") === a.attr("id")) e(window).unbind("keydown", k), e("#jp-carousel-comment-form-submit-and-info-wrapper").slideDown("fast");
                                        else if (a.is('input[type="submit"]')) {
                                            t.preventDefault(), t.stopPropagation(), e("#jp-carousel-comment-form-spinner").show();
                                            var f = {
                                                action: "post_attachment_comment",
                                                nonce: jetpackCarouselStrings.nonce,
                                                blog_id: r.blog_id,
                                                id: l,
                                                comment: d.val()
                                            };
                                            if (!f.comment.length) return void i.jp_carousel("postCommentError", {
                                                field: "jp-carousel-comment-form-comment-field",
                                                error: jetpackCarouselStrings.no_comment_text
                                            });
                                            if (1 !== Number(jetpackCarouselStrings.is_logged_in) && (f.email = p.val(), f.author = m.val(), f.url = h.val(), 1 === Number(jetpackCarouselStrings.require_name_email))) {
                                                if (!f.email.length || !f.email.match("@")) return void i.jp_carousel("postCommentError", {
                                                    field: "jp-carousel-comment-form-email-field",
                                                    error: jetpackCarouselStrings.no_comment_email
                                                });
                                                if (!f.author.length) return void i.jp_carousel("postCommentError", {
                                                    field: "jp-carousel-comment-form-author-field",
                                                    error: jetpackCarouselStrings.no_comment_author
                                                })
                                            }
                                            e.ajax({
                                                type: "POST",
                                                url: jetpackCarouselStrings.ajaxurl,
                                                data: f,
                                                dataType: "json",
                                                success: function (t) {
                                                    "approved" === t.comment_status ? e("#jp-carousel-comment-post-results").slideUp("fast").html('<span class="jp-carousel-comment-post-success">' + jetpackCarouselStrings.comment_approved + "</span>").slideDown("fast") : "unapproved" === t.comment_status ? e("#jp-carousel-comment-post-results").slideUp("fast").html('<span class="jp-carousel-comment-post-success">' + jetpackCarouselStrings.comment_unapproved + "</span>").slideDown("fast") : e("#jp-carousel-comment-post-results").slideUp("fast").html('<span class="jp-carousel-comment-post-error">' + jetpackCarouselStrings.comment_post_error + "</span>").slideDown("fast"), i.jp_carousel("clearCommentTextAreaValue"), i.jp_carousel("getComments", {
                                                        attachment_id: l,
                                                        offset: 0,
                                                        clear: !0
                                                    }), e("#jp-carousel-comment-form-button-submit").val(jetpackCarouselStrings.post_comment), e("#jp-carousel-comment-form-spinner").hide()
                                                },
                                                error: function () {
                                                    i.jp_carousel("postCommentError", {
                                                        field: "jp-carousel-comment-form-comment-field",
                                                        error: jetpackCarouselStrings.comment_post_error
                                                    })
                                                }
                                            })
                                        }
                                    } else a.parents(".jp-carousel-info").length || o.jp_carousel("next")
                                }).bind("jp_carousel.afterOpen", function () {
                                    e(window).bind("keydown", k), e(window).bind("resize", S), i.opened = !0, S()
                                }).bind("jp_carousel.beforeClose", function () {
                                    var t = e(window).scrollTop();
                                    e(window).unbind("keydown", k), e(window).unbind("resize", S), e(window).scrollTop(t), e(".jp-carousel-previous-button").hide(), e(".jp-carousel-next-button").hide(), e("html").css("height", "")
                                }).bind("jp_carousel.afterClose", function () {
                                    window.location.hash && history.back && history.back(), y = "", i.opened = !1
                                }).on("transitionend.jp-carousel ", ".jp-carousel-slide", function (t) {
                                    if ("transform" === t.originalEvent.propertyName) {
                                        var a = (Date.now() - l) / 1e3 / t.originalEvent.elapsedTime;
                                        o.off("transitionend.jp-carousel"), a >= 2 && e(".jp-carousel-transitions").removeClass("jp-carousel-transitions")
                                    }
                                }), e(".jp-carousel-wrap").touchwipe({
                                    wipeLeft: function (e) {
                                        e.preventDefault(), i.jp_carousel("next")
                                    },
                                    wipeRight: function (e) {
                                        e.preventDefault(), i.jp_carousel("previous")
                                    },
                                    preventDefaultEvents: !1
                                }), s.add(r).click(function (e) {
                                    e.preventDefault(), e.stopPropagation(), s.is(this) ? i.jp_carousel("next") : i.jp_carousel("previous")
                                })
                            }
                        }(), !i.jp_carousel("testIfOpened"))) return x = e("body").css("overflow"), e("body").css("overflow", "hidden"), b = e("html").css("overflow"), e("html").css("overflow", "hidden"), w = e(window).scrollTop(), o.data("carousel-extra", h), this.each(function () {
                        var t = e(this);
                        d && e.extend(m, d), -1 === m.start_index && (m.start_index = 0), o.trigger("jp_carousel.beforeOpen").fadeIn("fast", function () {
                            o.trigger("jp_carousel.afterOpen"), i.jp_carousel("initSlides", t.find(m.items_selector), m.start_index).jp_carousel("selectSlideAtIndex", m.start_index)
                        }), i.html("")
                    })
                },
                selectSlideAtIndex: function (e) {
                    var t = this.jp_carousel("slides"),
                        a = t.eq(e);
                    return 0 === a.length && (a = t.eq(0)), i.jp_carousel("selectSlide", a, !1), this
                },
                close: function () {
                    return e("body").css("overflow", x), e("html").css("overflow", b), this.jp_carousel("clearCommentTextAreaValue"), o.trigger("jp_carousel.beforeClose").fadeOut("fast", function () {
                        o.trigger("jp_carousel.afterClose"), e(window).scrollTop(w)
                    })
                },
                next: function () {
                    this.jp_carousel("previousOrNext", "nextSlide")
                },
                previous: function () {
                    this.jp_carousel("previousOrNext", "prevSlide")
                },
                previousOrNext: function (e) {
                    if (!this.jp_carousel("hasMultipleImages")) return !1;
                    var t = i.jp_carousel(e);
                    t && (o.animate({
                        scrollTop: 0
                    }, "fast"), this.jp_carousel("clearCommentTextAreaValue"), this.jp_carousel("selectSlide", t))
                },
                selectedSlide: function () {
                    return this.find(".selected")
                },
                setSlidePosition: function (e) {
                    return l = Date.now(), this.css({
                        "-webkit-transform": "translate3d(" + e + "px,0,0)",
                        "-moz-transform": "translate3d(" + e + "px,0,0)",
                        "-ms-transform": "translate(" + e + "px,0)",
                        "-o-transform": "translate(" + e + "px,0)",
                        transform: "translate3d(" + e + "px,0,0)"
                    })
                },
                updateSlidePositions: function (e) {
                    var t = this.jp_carousel("selectedSlide"),
                        a = i.width(),
                        o = t.width(),
                        s = i.jp_carousel("prevSlide"),
                        r = i.jp_carousel("nextSlide"),
                        n = s.prev(),
                        l = r.next(),
                        c = Math.floor(.5 * (a - o));
                    t.jp_carousel("setSlidePosition", c).show(), i.jp_carousel("fitInfo", e), 1 === (h.is(t.prevAll()) ? 1 : -1) ? (l.is(s) || l.jp_carousel("setSlidePosition", a + r.width()).show(), n.is(r) || n.jp_carousel("setSlidePosition", -n.width() - o).show()) : l.is(s) || l.jp_carousel("setSlidePosition", a + o).show(), s.jp_carousel("setSlidePosition", Math.floor(-s.width() + .75 * _)).show(), r.jp_carousel("setSlidePosition", Math.ceil(a - .75 * _)).show()
                },
                selectSlide: function (t, a) {
                    h = this.find(".selected").removeClass("selected");
                    var s, r, n = i.jp_carousel("slides").css({
                            position: "fixed"
                        }),
                        l = e(t).addClass("selected").css({
                            position: "relative"
                        }),
                        d = l.data("attachment-id"),
                        p = i.jp_carousel("prevSlide"),
                        u = i.jp_carousel("nextSlide"),
                        m = p.prev(),
                        f = u.next();
                    i.jp_carousel("loadFullImage", l), c.hide(), 0 === u.length && n.length <= 2 ? e(".jp-carousel-next-button").hide() : e(".jp-carousel-next-button").show(), 0 === p.length && n.length <= 2 ? e(".jp-carousel-previous-button").hide() : e(".jp-carousel-previous-button").show(), s = l.add(p).add(m).add(u).add(f).jp_carousel("loadSlide"), n.not(s).hide(), i.jp_carousel("updateSlidePositions", a), o.trigger("jp_carousel.selectSlide", [l]), i.jp_carousel("getTitleDesc", {
                        title: l.data("title"),
                        desc: l.data("desc")
                    });
                    var g = l.data("image-meta");
                    i.jp_carousel("updateExif", g), i.jp_carousel("updateFullSizeLink", l), i.jp_carousel("updateMap", g), 1 == +jetpackCarouselStrings.display_comments && (i.jp_carousel("testCommentsOpened", l.data("comments-opened")), i.jp_carousel("getComments", {
                        attachment_id: d,
                        offset: 0,
                        clear: !0
                    }), e("#jp-carousel-comment-post-results").slideUp()), l.data("caption") ? ((r = e("<div />").text(l.data("caption")).html()) === e("<div />").text(l.data("title")).html() && e(".jp-carousel-titleanddesc-title").fadeOut("fast").empty(), r === e("<div />").text(l.data("desc")).html() && e(".jp-carousel-titleanddesc-desc").fadeOut("fast").empty(), c.html(l.data("caption")).fadeIn("slow")) : c.fadeOut("fast").empty(), jetpackCarouselStrings.stats && ((new Image).src = document.location.protocol + "//pixel.wp.com/g.gif?" + jetpackCarouselStrings.stats + "&post=" + encodeURIComponent(d) + "&rand=" + Math.random()), e(u).add(p).each(function () {
                        i.jp_carousel("loadFullImage", e(this))
                    }), window.location.hash = y = "#jp-carousel-" + d
                },
                slides: function () {
                    return this.find(".jp-carousel-slide")
                },
                slideDimensions: function () {
                    return {
                        width: e(window).width() - 2 * _,
                        height: Math.floor(e(window).height() / 100 * 85 - 60)
                    }
                },
                loadSlide: function () {
                    return this.each(function () {
                        var t = e(this);
                        t.find("img").one("load", function () {
                            t.jp_carousel("fitSlide", !1)
                        })
                    })
                },
                bestFit: function () {
                    var e, t, a = i.jp_carousel("slideDimensions"),
                        o = this.jp_carousel("originalDimensions"),
                        s = o.width / o.height,
                        r = 1,
                        n = 1;
                    return o.width > a.width && (r = a.width / o.width), o.height > a.height && (n = a.height / o.height), r < n ? (e = a.width, t = Math.floor(e / s)) : n < r ? (t = a.height, e = Math.floor(t * s)) : (e = o.width, t = o.height), {
                        width: e,
                        height: t
                    }
                },
                fitInfo: function () {
                    var e = this.jp_carousel("selectedSlide").jp_carousel("bestFit");
                    return p.css({
                        left: Math.floor(.5 * (n.width() - e.width)),
                        width: Math.floor(e.width)
                    }), this
                },
                fitMeta: function (t) {
                    var a = {
                            top: Math.floor(e(window).height() / 100 * 85 + 5) + "px"
                        },
                        i = {
                            width: n.width() - (f.width() + 80) + "px"
                        };
                    t ? (n.animate(a), v.animate(i)) : (n.animate(a), v.css(i))
                },
                fitSlide: function () {
                    return this.each(function () {
                        var t = e(this),
                            a = t.jp_carousel("bestFit"),
                            o = i.jp_carousel("slideDimensions");
                        a.left = 0, a.top = Math.floor(.5 * (o.height - a.height)) + 40, t.css(a)
                    })
                },
                texturize: function (t) {
                    return t = (t = (t = (t = "" + t).replace(/'/g, "&#8217;").replace(/&#039;/g, "&#8217;").replace(/[\u2019]/g, "&#8217;")).replace(/"/g, "&#8221;").replace(/&#034;/g, "&#8221;").replace(/&quot;/g, "&#8221;").replace(/[\u201D]/g, "&#8221;")).replace(/([\w]+)=&#[\d]+;(.+?)&#[\d]+;/g, '$1="$2"'), e.trim(t)
                },
                initSlides: function (t, a) {
                    t.length < 2 ? e(".jp-carousel-next-button, .jp-carousel-previous-button").hide() : e(".jp-carousel-next-button, .jp-carousel-previous-button").show(), t.each(function () {
                        var t, a = e(this),
                            o = a.data("orig-size") || "",
                            s = i.jp_carousel("slideDimensions"),
                            r = o.split(","),
                            n = a.data("medium-file") || "",
                            l = a.data("large-file") || "";
                        o = {
                            width: parseInt(r[0], 10),
                            height: parseInt(r[1], 10)
                        }, t = a.data("orig-file"), t = i.jp_carousel("selectBestImageSize", {
                            orig_file: t,
                            orig_width: o.width,
                            orig_height: o.height,
                            max_width: s.width,
                            max_height: s.height,
                            medium_file: n,
                            large_file: l
                        }), e(this).data("gallery-src", t)
                    }), 0 !== a && (e("<img/>")[0].src = e(t[a]).data("gallery-src"));
                    var o = t.first().closest(".tiled-gallery.type-rectangular").length > 0;
                    return t.each(function (t) {
                        var s = e(this),
                            r = s.data("attachment-id") || 0,
                            n = s.data("comments-opened") || 0,
                            l = s.data("image-meta") || {},
                            c = s.data("orig-size") || "",
                            d = {
                                width: s[0].naturalWidth,
                                height: s[0].naturalHeight
                            },
                            p = s.data("image-title") || "",
                            u = s.data("image-description") || "",
                            m = s.parents(".gallery-item").find(".gallery-caption").html() || "",
                            h = s.data("gallery-src") || "",
                            f = s.data("medium-file") || "",
                            g = s.data("large-file") || "",
                            j = s.data("orig-file") || "",
                            v = s.parents("div.tiled-gallery-item").find("div.tiled-gallery-caption").html();
                        if (v && (m = v), r && c.length) {
                            p = i.jp_carousel("texturize", p), u = i.jp_carousel("texturize", u), m = i.jp_carousel("texturize", m);
                            var w = e("<img/>").attr("src", "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7").css("width", "100%").css("height", "100%"),
                                _ = e('<div class="jp-carousel-slide" itemprop="associatedMedia" itemscope itemtype="https://schema.org/ImageObject"></div>').hide().css({
                                    left: t < a ? -1e3 : i.width()
                                }).append(w).appendTo(i).data("src", h).data("title", p).data("desc", u).data("caption", m).data("attachment-id", r).data("permalink", s.parents("a").attr("href")).data("orig-size", c).data("comments-opened", n).data("image-meta", l).data("medium-file", f).data("large-file", g).data("orig-file", j).data("thumb-size", d);
                            o && _.data("preview-image", s.attr("src")).css({
                                "background-image": 'url("' + s.attr("src") + '")',
                                "background-size": "100% 100%",
                                "background-position": "center center"
                            }), _.jp_carousel("fitSlide", !1)
                        }
                    }), this
                },
                selectBestImageSize: function (e) {
                    if ("object" != typeof e && (e = {}), void 0 === e.orig_file) return "";
                    if (void 0 === e.orig_width || void 0 === e.max_width) return e.orig_file;
                    if (void 0 === e.medium_file || void 0 === e.large_file) return e.orig_file;
                    var t = document.createElement("a");
                    t.href = e.large_file;
                    var a = /^i[0-2].wp.com$/i.test(t.hostname),
                        o = i.jp_carousel("getImageSizeParts", e.medium_file, e.orig_width, a),
                        s = i.jp_carousel("getImageSizeParts", e.large_file, e.orig_width, a),
                        r = parseInt(s[0], 10),
                        n = parseInt(s[1], 10),
                        l = parseInt(o[0], 10),
                        c = parseInt(o[1], 10);
                    if (e.orig_max_width = e.max_width, e.orig_max_height = e.max_height, void 0 !== window.devicePixelRatio && window.devicePixelRatio > 1 && (e.max_width = e.max_width * window.devicePixelRatio, e.max_height = e.max_height * window.devicePixelRatio), r >= e.max_width || n >= e.max_height) return e.large_file;
                    if (l >= e.max_width || c >= e.max_height) return e.medium_file;
                    if (a) {
                        var d = e.large_file.lastIndexOf("?"),
                            p = e.large_file;
                        return -1 !== d && (p = e.large_file.substring(0, d), (e.orig_width > e.max_width || e.orig_height > e.max_height) && (p += "?fit=" + e.orig_max_width + "%2C" + e.orig_max_height)), p
                    }
                    return e.orig_file
                },
                getImageSizeParts: function (e, t, a) {
                    var i = a ? e.replace(/.*=([\d]+%2C[\d]+).*$/, "$1") : e.replace(/.*-([\d]+x[\d]+)\..+$/, "$1"),
                        o = i !== e ? a ? i.split("%2C") : i.split("x") : [t, 0];
                    return "9999" === o[0] && (o[0] = "0"), "9999" === o[1] && (o[1] = "0"), o
                },
                originalDimensions: function () {
                    var t = e(this).data("orig-size").split(",");
                    return {
                        width: parseInt(t[0], 10),
                        height: parseInt(t[1], 10)
                    }
                },
                format: function (e) {
                    if ("object" != typeof e && (e = {}), e.text && void 0 !== e.text) return e.replacements && void 0 !== e.replacements ? e.text.replace(/{(\d+)}/g, function (t, a) {
                        return void 0 !== e.replacements[a] ? e.replacements[a] : t
                    }) : e.text
                },
                shutterSpeed: function (e) {
                    return e >= 1 ? Math.round(10 * e) / 10 + "s" : "1/" + Math.round(1 / e) + "s"
                },
                parseTitleDesc: function (e) {
                    return !e.match(" ") && e.match("_") ? "" : e
                },
                getTitleDesc: function (t) {
                    var a, o, s = "",
                        r = "";
                    (o = e("div.jp-carousel-titleanddesc", "div.jp-carousel-wrap")).hide(), s = i.jp_carousel("parseTitleDesc", t.title) || "", a = i.jp_carousel("parseTitleDesc", t.desc) || "", (s.length || a.length) && (e("<div />").html(s).text() === e("<div />").html(a).text() && (s = ""), r = s.length ? '<div class="jp-carousel-titleanddesc-title">' + s + "</div>" : "", r += a.length ? '<div class="jp-carousel-titleanddesc-desc">' + a + "</div>" : "", o.html(r).fadeIn("slow")), e("div#jp-carousel-comment-form-container").css("margin-top", "20px"), e("div#jp-carousel-comments-loading").css("margin-top", "20px")
                },
                updateExif: function (t) {
                    if (!t || 1 !== Number(jetpackCarouselStrings.display_exif)) return !1;
                    var a = e("<ul class='jp-carousel-image-exif'></ul>");
                    e.each(t, function (t, o) {
                        if (0 !== parseFloat(o) && o.length && -1 !== e.inArray(t, e.makeArray(jetpackCarouselStrings.meta_data))) {
                            switch (t) {
                                case "focal_length":
                                    o += "mm";
                                    break;
                                case "shutter_speed":
                                    o = i.jp_carousel("shutterSpeed", o);
                                    break;
                                case "aperture":
                                    o = "f/" + o
                            }
                            a.append("<li><h5>" + jetpackCarouselStrings[t] + "</h5>" + o + "</li>")
                        }
                    }), e("div.jp-carousel-image-meta ul.jp-carousel-image-exif").replaceWith(a)
                },
                updateFullSizeLink: function (t) {
                    if (!t || !t.data) return !1;
                    var a, o = t.data("orig-size").split(","),
                        s = document.createElement("a");
                    s.href = t.data("src").replace(/\?.+$/, ""), a = null !== s.hostname.match(/^i[\d]{1}.wp.com$/i) ? s.href : t.data("orig-file").replace(/\?.+$/, "");
                    var r = e("<a>" + i.jp_carousel("format", {
                        text: jetpackCarouselStrings.download_original,
                        replacements: o
                    }) + "</a>").addClass("jp-carousel-image-download").attr("href", a).attr("target", "_blank");
                    e("div.jp-carousel-image-meta a.jp-carousel-image-download").replaceWith(r)
                },
                updateMap: function (t) {
                    if (t.latitude && t.longitude && 1 === Number(jetpackCarouselStrings.display_geo)) {
                        var a = t.latitude,
                            i = t.longitude,
                            o = e("div.jp-carousel-image-meta", "div.jp-carousel-wrap"),
                            s = "&scale=2&style=feature:all|element:all|invert_lightness:true|hue:0x0077FF|saturation:-50|lightness:-5|gamma:0.91";
                        e("<div></div>").addClass("jp-carousel-image-map").html('<img width="154" height="154" src="https://maps.googleapis.com/maps/api/staticmap?\t\t\t\t\t\t\tcenter=' + a + "," + i + "&\t\t\t\t\t\t\tzoom=8&\t\t\t\t\t\t\tsize=154x154&\t\t\t\t\t\t\tsensor=false&\t\t\t\t\t\t\tmarkers=size:medium%7Ccolor:blue%7C" + a + "," + i + s + '" class="gmap-main" />\t\t\t\t\t\t\t\t\t\t\t\t\t<div class="gmap-topright"><div class="imgclip"><img width="175" height="154" src="https://maps.googleapis.com/maps/api/staticmap?\t\t\t\t\t\t\tcenter=' + a + "," + i + "&\t\t\t\t\t\t\tzoom=3&\t\t\t\t\t\t\tsize=175x154&\t\t\t\t\t\t\tsensor=false&\t\t\t\t\t\t\tmarkers=size:small%7Ccolor:blue%7C" + a + "," + i + s + '"c /></div></div>\t\t\t\t\t\t\t\t\t\t\t\t\t').prependTo(o)
                    }
                },
                testCommentsOpened: function (t) {
                    1 === parseInt(t, 10) ? (e(".jp-carousel-buttons").fadeIn("fast"), j.fadeIn("fast")) : (e(".jp-carousel-buttons").fadeOut("fast"), j.fadeOut("fast"))
                },
                getComments: function (t) {
                    if (clearInterval(m), "object" == typeof t && void 0 !== t.attachment_id && t.attachment_id) {
                        (!t.offset || void 0 === t.offset || t.offset < 1) && (t.offset = 0);
                        var a = e(".jp-carousel-comments"),
                            o = e("#jp-carousel-comments-loading").show();
                        t.clear && a.hide().empty(), e.ajax({
                            type: "GET",
                            url: jetpackCarouselStrings.ajaxurl,
                            dataType: "json",
                            data: {
                                action: "get_attachment_comments",
                                nonce: jetpackCarouselStrings.nonce,
                                id: t.attachment_id,
                                offset: t.offset
                            },
                            success: function (s) {
                                t.clear && a.fadeOut("fast").empty(), e(s).each(function () {
                                    var o = e("<div></div>").addClass("jp-carousel-comment").attr("id", "jp-carousel-comment-" + this.id).html('<div class="comment-gravatar">' + this.gravatar_markup + '</div><div class="comment-author">' + this.author_markup + '</div><div class="comment-date">' + this.date_gmt + '</div><div class="comment-content">' + this.content + "</div>");
                                    a.append(o), clearInterval(m), m = setInterval(function () {
                                        e(".jp-carousel-overlay").height() - 150 < e(".jp-carousel-wrap").scrollTop() + e(window).height() && (i.jp_carousel("getComments", {
                                            attachment_id: t.attachment_id,
                                            offset: t.offset + 10,
                                            clear: !1
                                        }), clearInterval(m))
                                    }, 300)
                                });
                                var r = e(".jp-carousel div.selected");
                                if (r && r.data && r.data("attachment-id") != t.attachment_id) return a.fadeOut("fast"), void a.empty();
                                e(".jp-carousel-overlay").height(e(window).height() + g.height() + j.height() + (a.height() > 0 ? a.height() : f.height()) + 200), a.show(), o.hide()
                            },
                            error: function (e, t, i) {
                                console.log("Comment get fail...", e, t, i), a.fadeIn("fast"), o.fadeOut("fast")
                            }
                        })
                    }
                },
                postCommentError: function (t) {
                    "object" != typeof t && (t = {}), t.field && void 0 !== t.field && t.error && void 0 !== t.error && (e("#jp-carousel-comment-post-results").slideUp("fast").html('<span class="jp-carousel-comment-post-error">' + t.error + "</span>").slideDown("fast"), e("#jp-carousel-comment-form-spinner").hide())
                },
                setCommentIframeSrc: function (t) {
                    var a = e("#jp-carousel-comment-iframe");
                    a && a.length && (a.attr("src", a.attr("src").replace(/(postid=)\d+/, "$1" + t)), a.attr("src", a.attr("src").replace(/(%23.+)?$/, "%23jp-carousel-" + t)))
                },
                clearCommentTextAreaValue: function () {
                    var t = e("#jp-carousel-comment-form-comment-field");
                    t && t.val("")
                },
                nextSlide: function () {
                    var e = this.jp_carousel("slides"),
                        t = this.jp_carousel("selectedSlide");
                    return 0 === t.length || e.length > 2 && t.is(e.last()) ? e.first() : t.next()
                },
                prevSlide: function () {
                    var e = this.jp_carousel("slides"),
                        t = this.jp_carousel("selectedSlide");
                    return 0 === t.length || e.length > 2 && t.is(e.first()) ? e.last() : t.prev()
                },
                loadFullImage: function (t) {
                    var a = t.find("img:first");
                    a.data("loaded") || (a.on("load.jetpack", function () {
                        a.off("load.jetpack"), e(this).closest(".jp-carousel-slide").css("background-image", "")
                    }), !t.data("preview-image") || t.data("thumb-size") && t.width() > t.data("thumb-size").width ? a.attr("src", a.closest(".jp-carousel-slide").data("src")).attr("itemprop", "image") : a.attr("src", t.data("preview-image")).attr("itemprop", "image"), a.data("loaded", 1))
                },
                hasMultipleImages: function () {
                    return i.jp_carousel("slides").length > 1
                }
            };
        e.fn.jp_carousel = function (t) {
            return I[t] ? I[t].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof t && t ? void e.error("Method " + t + " does not exist on jQuery.jp_carousel") : I.open.apply(this, arguments)
        }, e(document.body).on("click.jp-carousel", "div.gallery, div.tiled-gallery, ul.wp-block-gallery, ul.blocks-gallery-grid, div.wp-block-jetpack-tiled-gallery, a.single-image-gallery", function (t) {
            e(this).jp_carousel("testForData", t.currentTarget) && (e(t.target).parent().hasClass("gallery-caption") || e(t.target).parent().is("figcaption") || (e("html").css("height", "auto"), t.preventDefault(), t.stopPropagation(), e(this).jp_carousel("open", {
                start_index: e(this).find(".gallery-item, .tiled-gallery-item, .blocks-gallery-item, .tiled-gallery__item").index(e(t.target).parents(".gallery-item, .tiled-gallery-item, .blocks-gallery-item, .tiled-gallery__item"))
            })))
        }), 1 === Number(jetpackCarouselStrings.single_image_gallery) && (C(), e(document.body).on("post-load", function () {
            C()
        })), e(window).on("hashchange.jp-carousel", function () {
            var t, a, s, r = /jp-carousel-(\d+)/;
            window.location.hash && r.test(window.location.hash) ? window.location.hash === y && i.opened || (window.location.hash && i && !i.opened && history.back ? history.back() : (y = window.location.hash, t = window.location.hash.match(r), a = parseInt(t[1], 10), e("div.gallery, div.tiled-gallery, a.single-image-gallery, ul.wp-block-gallery, div.wp-block-jetpack-tiled-gallery").each(function (t, i) {
                if (e(i).find("img").each(function (t, o) {
                        if (e(o).data("attachment-id") === parseInt(a, 10)) return s = {
                            index: t,
                            gallery: i
                        }, !1
                    }), s) return e(s.gallery).jp_carousel("openOrSelectSlide", s.index), !1
            }))) : i && i.opened && o.jp_carousel("close")
        }), window.location.hash && e(window).trigger("hashchange")
    }),
    function (e) {
        e.fn.touchwipe = function (t) {
            var a = {
                min_move_x: 20,
                min_move_y: 20,
                wipeLeft: function () {},
                wipeRight: function () {},
                wipeUp: function () {},
                wipeDown: function () {},
                preventDefaultEvents: !0
            };
            return t && e.extend(a, t), this.each(function () {
                var e, t, i = !1;

                function o() {
                    this.removeEventListener("touchmove", s), e = null, i = !1
                }

                function s(s) {
                    if (a.preventDefaultEvents && s.preventDefault(), i) {
                        var r = s.touches[0].pageX,
                            n = s.touches[0].pageY,
                            l = e - r,
                            c = t - n;
                        Math.abs(l) >= a.min_move_x ? (o(), l > 0 ? a.wipeLeft(s) : a.wipeRight(s)) : Math.abs(c) >= a.min_move_y && (o(), c > 0 ? a.wipeDown(s) : a.wipeUp(s))
                    }
                }
                "ontouchstart" in document.documentElement && this.addEventListener("touchstart", function (a) {
                    1 === a.touches.length && (e = a.touches[0].pageX, t = a.touches[0].pageY, i = !0, this.addEventListener("touchmove", s, !1))
                }, !1)
            }), this
        }
    }(jQuery);
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
}]); /*! This file is auto-generated */
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