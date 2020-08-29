      ! function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Data = t()
      }(this, function() {
          "use strict";
          var e, t, n = (e = {}, t = 1, {
              set: function(n, r, o) {
                  void 0 === n.key && (n.key = {
                      key: r,
                      id: t
                  }, t++), e[n.key.id] = o
              },
              get: function(t, n) {
                  if (!t || void 0 === t.key) return null;
                  var r = t.key;
                  return r.key === n ? e[r.id] : null
              },
              delete: function(t, n) {
                  if (void 0 !== t.key) {
                      var r = t.key;
                      r.key === n && (delete e[r.id], delete t.key)
                  }
              }
          });
          return {
              setData: function(e, t, r) {
                  n.set(e, t, r)
              },
              getData: function(e, t) {
                  return n.get(e, t)
              },
              removeData: function(e, t) {
                  n.delete(e, t)
              }
          }
      }),
      function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("./polyfill.js")) : "function" == typeof define && define.amd ? define(["./polyfill.js"], t) : (e = e || self).EventHandler = t(e.Polyfill)
      }(this, function(e) {
          "use strict";
          var t, n = (t = window.jQuery) && !document.body.hasAttribute("data-no-jquery") ? t : null,
              r = /[^.]*(?=\..*)\.|.*/,
              o = /\..*/,
              i = /::\d+$/,
              a = {},
              s = 1,
              l = {
                  mouseenter: "mouseover",
                  mouseleave: "mouseout"
              },
              u = ["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"];

          function c(e, t) {
              return t && t + "::" + s++ || e.uidEvent || s++
          }

          function f(e) {
              var t = c(e);
              return e.uidEvent = t, a[t] = a[t] || {}, a[t]
          }

          function d(e, t, n) {
              void 0 === n && (n = null);
              for (var r = Object.keys(e), o = 0, i = r.length; o < i; o++) {
                  var a = e[r[o]];
                  if (a.originalHandler === t && a.delegationSelector === n) return a
              }
              return null
          }

          function p(e, t, n) {
              var r = "string" == typeof t,
                  i = r ? n : t,
                  a = e.replace(o, ""),
                  s = l[a];
              return s && (a = s), u.indexOf(a) > -1 || (a = e), [r, i, a]
          }

          function h(e, t, n, o, i) {
              if ("string" == typeof t && e) {
                  n || (n = o, o = null);
                  var a = p(t, n, o),
                      s = a[0],
                      l = a[1],
                      u = a[2],
                      h = f(e),
                      g = h[u] || (h[u] = {}),
                      y = d(g, l, s ? n : null);
                  if (y) y.oneOff = y.oneOff && i;
                  else {
                      var v = c(l, t.replace(r, "")),
                          b = s ? function(e, t, n) {
                              return function r(o) {
                                  for (var i = e.querySelectorAll(t), a = o.target; a && a !== this; a = a.parentNode)
                                      for (var s = i.length; s--;)
                                          if (i[s] === a) return r.oneOff && m.off(e, o.type, n), n.apply(a, [o]);
                                  return null
                              }
                          }(e, n, o) : function(e, t) {
                              return function n(r) {
                                  return n.oneOff && m.off(e, r.type, t), t.apply(e, [r])
                              }
                          }(e, n);
                      b.delegationSelector = s ? n : null, b.originalHandler = l, b.oneOff = i, b.uidEvent = v, g[v] = b, e.addEventListener(u, b, s)
                  }
              }
          }

          function g(e, t, n, r, o) {
              var i = d(t[n], r, o);
              i && (e.removeEventListener(n, i, Boolean(o)), delete t[n][i.uidEvent])
          }
          var m = {
              on: function(e, t, n, r) {
                  h(e, t, n, r, !1)
              },
              one: function(e, t, n, r) {
                  h(e, t, n, r, !0)
              },
              off: function(e, t, n, r) {
                  if ("string" == typeof t && e) {
                      var o = p(t, n, r),
                          a = o[0],
                          s = o[1],
                          l = o[2],
                          u = l !== t,
                          c = f(e),
                          d = "." === t.charAt(0);
                      if (void 0 === s) {
                          d && Object.keys(c).forEach(function(n) {
                              ! function(e, t, n, r) {
                                  var o = t[n] || {};
                                  Object.keys(o).forEach(function(i) {
                                      if (i.indexOf(r) > -1) {
                                          var a = o[i];
                                          g(e, t, n, a.originalHandler, a.delegationSelector)
                                      }
                                  })
                              }(e, c, n, t.slice(1))
                          });
                          var h = c[l] || {};
                          Object.keys(h).forEach(function(n) {
                              var r = n.replace(i, "");
                              if (!u || t.indexOf(r) > -1) {
                                  var o = h[n];
                                  g(e, c, l, o.originalHandler, o.delegationSelector)
                              }
                          })
                      } else {
                          if (!c || !c[l]) return;
                          g(e, c, l, s, a ? n : null)
                      }
                  }
              },
              trigger: function(t, r, i) {
                  if ("string" != typeof r || !t) return null;
                  var a, s = r.replace(o, ""),
                      l = r !== s,
                      c = u.indexOf(s) > -1,
                      f = !0,
                      d = !0,
                      p = !1,
                      h = null;
                  return l && n && (a = n.Event(r, i), n(t).trigger(a), f = !a.isPropagationStopped(), d = !a.isImmediatePropagationStopped(), p = a.isDefaultPrevented()), c ? (h = document.createEvent("HTMLEvents")).initEvent(s, f, !0) : h = new CustomEvent(r, {
                      bubbles: f,
                      cancelable: !0
                  }), void 0 !== i && Object.keys(i).forEach(function(e) {
                      Object.defineProperty(h, e, {
                          get: function() {
                              return i[e]
                          }
                      })
                  }), p && (h.preventDefault(), e.defaultPreventedPreservedOnDispatch || Object.defineProperty(h, "defaultPrevented", {
                      get: function() {
                          return !0
                      }
                  })), d && t.dispatchEvent(h), h.defaultPrevented && void 0 !== a && a.preventDefault(), h
              }
          };
          return m
      }),
      function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Manipulator = t()
      }(this, function() {
          "use strict";

          function e(e, t) {
              var n = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                  var r = Object.getOwnPropertySymbols(e);
                  t && (r = r.filter(function(t) {
                      return Object.getOwnPropertyDescriptor(e, t).enumerable
                  })), n.push.apply(n, r)
              }
              return n
          }

          function t(e, t, n) {
              return t in e ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              }) : e[t] = n, e
          }

          function n(e) {
              return "true" === e || "false" !== e && (e === Number(e).toString() ? Number(e) : "" === e || "null" === e ? null : e)
          }

          function r(e) {
              return e.replace(/[A-Z]/g, function(e) {
                  return "-" + e.toLowerCase()
              })
          }
          return {
              setDataAttribute: function(e, t, n) {
                  e.setAttribute("data-" + r(t), n)
              },
              removeDataAttribute: function(e, t) {
                  e.removeAttribute("data-" + r(t))
              },
              getDataAttributes: function(r) {
                  if (!r) return {};
                  var o = function(n) {
                      for (var r = 1; r < arguments.length; r++) {
                          var o = null != arguments[r] ? arguments[r] : {};
                          r % 2 ? e(Object(o), !0).forEach(function(e) {
                              t(n, e, o[e])
                          }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(o)) : e(Object(o)).forEach(function(e) {
                              Object.defineProperty(n, e, Object.getOwnPropertyDescriptor(o, e))
                          })
                      }
                      return n
                  }({}, r.dataset);
                  return Object.keys(o).forEach(function(e) {
                      o[e] = n(o[e])
                  }), o
              },
              getDataAttribute: function(e, t) {
                  return n(e.getAttribute("data-" + r(t)))
              },
              offset: function(e) {
                  var t = e.getBoundingClientRect();
                  return {
                      top: t.top + document.body.scrollTop,
                      left: t.left + document.body.scrollLeft
                  }
              },
              position: function(e) {
                  return {
                      top: e.offsetTop,
                      left: e.offsetLeft
                  }
              },
              toggleClass: function(e, t) {
                  e && (e.classList.contains(t) ? e.classList.remove(t) : e.classList.add(t))
              }
          }
      }),
      function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Polyfill = {})
      }(this, function(e) {
          "use strict";
          e.find = Element.prototype.querySelectorAll, e.findOne = Element.prototype.querySelector;
          var t, n, r = (t = new CustomEvent("Bootstrap", {
                  cancelable: !0
              }), (n = document.createElement("div")).addEventListener("Bootstrap", function() {
                  return null
              }), t.preventDefault(), n.dispatchEvent(t), t.defaultPrevented),
              o = /:scope\b/;
          (function() {
              var e = document.createElement("div");
              try {
                  e.querySelectorAll(":scope *")
              } catch (e) {
                  return !1
              }
              return !0
          })() || (e.find = function(e) {
              if (!o.test(e)) return this.querySelectorAll(e);
              var t = Boolean(this.id);
              t || (this.id = function(e) {
                  do {
                      e += Math.floor(1e6 * Math.random())
                  } while (document.getElementById(e));
                  return e
              }("scope"));
              var n = null;
              try {
                  e = e.replace(o, "#" + this.id), n = this.querySelectorAll(e)
              } finally {
                  t || this.removeAttribute("id")
              }
              return n
          }, e.findOne = function(t) {
              if (!o.test(t)) return this.querySelector(t);
              var n = e.find.call(this, t);
              return void 0 !== n[0] ? n[0] : null
          }), e.defaultPreventedPreservedOnDispatch = r, Object.defineProperty(e, "__esModule", {
              value: !0
          })
      }),
      function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("./polyfill.js")) : "function" == typeof define && define.amd ? define(["./polyfill.js"], t) : (e = e || self).SelectorEngine = t(e.Polyfill)
      }(this, function(e) {
          "use strict";
          return {
              matches: function(e, t) {
                  return e.matches(t)
              },
              find: function(t, n) {
                  var r;
                  return void 0 === n && (n = document.documentElement), (r = []).concat.apply(r, e.find.call(n, t))
              },
              findOne: function(t, n) {
                  return void 0 === n && (n = document.documentElement), e.findOne.call(n, t)
              },
              children: function(e, t) {
                  var n, r = (n = []).concat.apply(n, e.children);
                  return r.filter(function(e) {
                      return e.matches(t)
                  })
              },
              parents: function(e, t) {
                  for (var n = [], r = e.parentNode; r && r.nodeType === Node.ELEMENT_NODE && 3 !== r.nodeType;) this.matches(r, t) && n.push(r), r = r.parentNode;
                  return n
              },
              prev: function(e, t) {
                  for (var n = e.previousElementSibling; n;) {
                      if (n.matches(t)) return [n];
                      n = n.previousElementSibling
                  }
                  return []
              },
              next: function(e, t) {
                  for (var n = e.nextElementSibling; n;) {
                      if (this.matches(n, t)) return [n];
                      n = n.nextElementSibling
                  }
                  return []
              }
          }
      }),
      function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("./dom/data.js"), require("./dom/event-handler.js"), require("./dom/manipulator.js"), require("./dom/selector-engine.js")) : "function" == typeof define && define.amd ? define(["./dom/data.js", "./dom/event-handler.js", "./dom/manipulator.js", "./dom/selector-engine.js"], t) : (e = e || self).Collapse = t(e.Data, e.EventHandler, e.Manipulator, e.SelectorEngine)
      }(this, function(e, t, n, r) {
          "use strict";
          e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e, t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t, n = n && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n, r = r && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
          var o = "transitionend",
              i = function(e) {
                  var t = e.getAttribute("data-target");
                  if (!t || "#" === t) {
                      var n = e.getAttribute("href");
                      t = n && "#" !== n ? n.trim() : null
                  }
                  return t
              },
              a = function(e) {
                  var t = i(e);
                  return t && document.querySelector(t) ? t : null
              },
              s = function(e) {
                  var t = i(e);
                  return t ? document.querySelector(t) : null
              },
              l = function(e) {
                  if (!e) return 0;
                  var t = window.getComputedStyle(e),
                      n = t.transitionDuration,
                      r = t.transitionDelay,
                      o = parseFloat(n),
                      i = parseFloat(r);
                  return o || i ? (n = n.split(",")[0], r = r.split(",")[0], 1e3 * (parseFloat(n) + parseFloat(r))) : 0
              },
              u = function(e) {
                  return (e[0] || e).nodeType
              },
              c = function(e, t) {
                  var n = !1,
                      r = t + 5;
                  e.addEventListener(o, function t() {
                      n = !0, e.removeEventListener(o, t)
                  }), setTimeout(function() {
                      n || function(e) {
                          e.dispatchEvent(new Event(o))
                      }(e)
                  }, r)
              };

          function f(e, t) {
              var n = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                  var r = Object.getOwnPropertySymbols(e);
                  t && (r = r.filter(function(t) {
                      return Object.getOwnPropertyDescriptor(e, t).enumerable
                  })), n.push.apply(n, r)
              }
              return n
          }

          function d(e) {
              for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {};
                  t % 2 ? f(Object(n), !0).forEach(function(t) {
                      p(e, t, n[t])
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : f(Object(n)).forEach(function(t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                  })
              }
              return e
          }

          function p(e, t, n) {
              return t in e ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              }) : e[t] = n, e
          }

          function h(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          var g = "collapse",
              m = "bs.collapse",
              y = "." + m,
              v = {
                  toggle: !0,
                  parent: ""
              },
              b = {
                  toggle: "boolean",
                  parent: "(string|element)"
              },
              _ = "show" + y,
              w = "shown" + y,
              O = "hide" + y,
              j = "hidden" + y,
              E = "click" + y + ".data-api",
              P = '[data-toggle="collapse"]',
              D = function() {
                  function i(t, n) {
                      this._isTransitioning = !1, this._element = t, this._config = this._getConfig(n), this._triggerArray = r.find(P + '[href="#' + t.id + '"],' + P + '[data-target="#' + t.id + '"]');
                      for (var o = r.find(P), i = 0, s = o.length; i < s; i++) {
                          var l = o[i],
                              u = a(l),
                              c = r.find(u).filter(function(e) {
                                  return e === t
                              });
                          null !== u && c.length && (this._selector = u, this._triggerArray.push(l))
                      }
                      this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle(), e.setData(t, m, this)
                  }
                  var f, p, y, E = i.prototype;
                  return E.toggle = function() {
                      this._element.classList.contains("show") ? this.hide() : this.show()
                  }, E.show = function() {
                      var n = this;
                      if (!this._isTransitioning && !this._element.classList.contains("show")) {
                          var a, s;
                          this._parent && 0 === (a = r.find(".show, .collapsing", this._parent).filter(function(e) {
                              return "string" == typeof n._config.parent ? e.getAttribute("data-parent") === n._config.parent : e.classList.contains("collapse")
                          })).length && (a = null);
                          var u = r.findOne(this._selector);
                          if (a) {
                              var f = a.filter(function(e) {
                                  return u !== e
                              });
                              if ((s = f[0] ? e.getData(f[0], m) : null) && s._isTransitioning) return
                          }
                          if (!t.trigger(this._element, _).defaultPrevented) {
                              a && a.forEach(function(t) {
                                  u !== t && i.collapseInterface(t, "hide"), s || e.setData(t, m, null)
                              });
                              var d = this._getDimension();
                              this._element.classList.remove("collapse"), this._element.classList.add("collapsing"), this._element.style[d] = 0, this._triggerArray.length && this._triggerArray.forEach(function(e) {
                                  e.classList.remove("collapsed"), e.setAttribute("aria-expanded", !0)
                              }), this.setTransitioning(!0);
                              var p = "scroll" + (d[0].toUpperCase() + d.slice(1)),
                                  h = l(this._element);
                              t.one(this._element, o, function() {
                                  n._element.classList.remove("collapsing"), n._element.classList.add("collapse", "show"), n._element.style[d] = "", n.setTransitioning(!1), t.trigger(n._element, w)
                              }), c(this._element, h), this._element.style[d] = this._element[p] + "px"
                          }
                      }
                  }, E.hide = function() {
                      var e = this;
                      if (!this._isTransitioning && this._element.classList.contains("show") && !t.trigger(this._element, O).defaultPrevented) {
                          var n = this._getDimension();
                          this._element.style[n] = this._element.getBoundingClientRect()[n] + "px", this._element.offsetHeight, this._element.classList.add("collapsing"), this._element.classList.remove("collapse", "show");
                          var r = this._triggerArray.length;
                          if (r > 0)
                              for (var i = 0; i < r; i++) {
                                  var a = this._triggerArray[i],
                                      u = s(a);
                                  u && !u.classList.contains("show") && (a.classList.add("collapsed"), a.setAttribute("aria-expanded", !1))
                              }
                          this.setTransitioning(!0);
                          this._element.style[n] = "";
                          var f = l(this._element);
                          t.one(this._element, o, function() {
                              e.setTransitioning(!1), e._element.classList.remove("collapsing"), e._element.classList.add("collapse"), t.trigger(e._element, j)
                          }), c(this._element, f)
                      }
                  }, E.setTransitioning = function(e) {
                      this._isTransitioning = e
                  }, E.dispose = function() {
                      e.removeData(this._element, m), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null
                  }, E._getConfig = function(e) {
                      return (e = d(d({}, v), e)).toggle = Boolean(e.toggle),
                          function(e, t, n) {
                              Object.keys(n).forEach(function(r) {
                                  var o, i = n[r],
                                      a = t[r],
                                      s = a && u(a) ? "element" : null == (o = a) ? "" + o : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
                                  if (!new RegExp(i).test(s)) throw new Error(e.toUpperCase() + ': Option "' + r + '" provided type "' + s + '" but expected type "' + i + '".')
                              })
                          }(g, e, b), e
                  }, E._getDimension = function() {
                      return this._element.classList.contains("width") ? "width" : "height"
                  }, E._getParent = function() {
                      var e = this,
                          t = this._config.parent;
                      u(t) ? void 0 === t.jquery && void 0 === t[0] || (t = t[0]) : t = r.findOne(t);
                      var n = P + '[data-parent="' + t + '"]';
                      return r.find(n, t).forEach(function(t) {
                          var n = s(t);
                          e._addAriaAndCollapsedClass(n, [t])
                      }), t
                  }, E._addAriaAndCollapsedClass = function(e, t) {
                      if (e) {
                          var n = e.classList.contains("show");
                          t.length && t.forEach(function(e) {
                              n ? e.classList.remove("collapsed") : e.classList.add("collapsed"), e.setAttribute("aria-expanded", n)
                          })
                      }
                  }, i.collapseInterface = function(t, r) {
                      var o = e.getData(t, m),
                          a = d(d(d({}, v), n.getDataAttributes(t)), "object" == typeof r && r ? r : {});
                      if (!o && a.toggle && "string" == typeof r && /show|hide/.test(r) && (a.toggle = !1), o || (o = new i(t, a)), "string" == typeof r) {
                          if (void 0 === o[r]) throw new TypeError('No method named "' + r + '"');
                          o[r]()
                      }
                  }, i.jQueryInterface = function(e) {
                      return this.each(function() {
                          i.collapseInterface(this, e)
                      })
                  }, i.getInstance = function(t) {
                      return e.getData(t, m)
                  }, f = i, y = [{
                      key: "VERSION",
                      get: function() {
                          return "5.0.0-alpha1"
                      }
                  }, {
                      key: "Default",
                      get: function() {
                          return v
                      }
                  }], (p = null) && h(f.prototype, p), y && h(f, y), i
              }();
          t.on(document, E, P, function(t) {
              "A" === t.target.tagName && t.preventDefault();
              var o = n.getDataAttributes(this),
                  i = a(this);
              r.find(i).forEach(function(t) {
                  var n, r = e.getData(t, m);
                  r ? (null === r._parent && "string" == typeof o.parent && (r._config.parent = o.parent, r._parent = r._getParent()), n = "toggle") : n = o, D.collapseInterface(t, n)
              })
          });
          var k, A = (k = window.jQuery) && !document.body.hasAttribute("data-no-jquery") ? k : null;
          if (A) {
              var L = A.fn[g];
              A.fn[g] = D.jQueryInterface, A.fn[g].Constructor = D, A.fn[g].noConflict = function() {
                  return A.fn[g] = L, D.jQueryInterface
              }
          }
          return D
      }),
      function(e, t) {
          "object" == typeof exports && "undefined" != typeof module ? module.exports = t(require("./dom/data.js"), require("./dom/event-handler.js"), require("./dom/manipulator.js"), require("popper.js"), require("./dom/selector-engine.js")) : "function" == typeof define && define.amd ? define(["./dom/data.js", "./dom/event-handler.js", "./dom/manipulator.js", "popper.js", "./dom/selector-engine.js"], t) : (e = e || self).Dropdown = t(e.Data, e.EventHandler, e.Manipulator, e.Popper, e.SelectorEngine)
      }(this, function(e, t, n, r, o) {
          "use strict";
          e = e && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e, t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t, n = n && Object.prototype.hasOwnProperty.call(n, "default") ? n.default : n, r = r && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r, o = o && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
          var i = function(e) {
                  return (e[0] || e).nodeType
              },
              a = function(e) {
                  if (!e) return !1;
                  if (e.style && e.parentNode && e.parentNode.style) {
                      var t = getComputedStyle(e),
                          n = getComputedStyle(e.parentNode);
                      return "none" !== t.display && "none" !== n.display && "hidden" !== t.visibility
                  }
                  return !1
              };

          function s(e, t) {
              var n = Object.keys(e);
              if (Object.getOwnPropertySymbols) {
                  var r = Object.getOwnPropertySymbols(e);
                  t && (r = r.filter(function(t) {
                      return Object.getOwnPropertyDescriptor(e, t).enumerable
                  })), n.push.apply(n, r)
              }
              return n
          }

          function l(e) {
              for (var t = 1; t < arguments.length; t++) {
                  var n = null != arguments[t] ? arguments[t] : {};
                  t % 2 ? s(Object(n), !0).forEach(function(t) {
                      u(e, t, n[t])
                  }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach(function(t) {
                      Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
                  })
              }
              return e
          }

          function u(e, t, n) {
              return t in e ? Object.defineProperty(e, t, {
                  value: n,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
              }) : e[t] = n, e
          }

          function c(e, t) {
              for (var n = 0; n < t.length; n++) {
                  var r = t[n];
                  r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
          }
          var f = "dropdown",
              d = "bs.dropdown",
              p = "." + d,
              h = new RegExp("ArrowUp|ArrowDown|Escape"),
              g = "hide" + p,
              m = "hidden" + p,
              y = "show" + p,
              v = "shown" + p,
              b = "click" + p,
              _ = "click" + p + ".data-api",
              w = "keydown" + p + ".data-api",
              O = "keyup" + p + ".data-api",
              j = {
                  offset: 0,
                  flip: !0,
                  boundary: "scrollParent",
                  reference: "toggle",
                  display: "dynamic",
                  popperConfig: null
              },
              E = {
                  offset: "(number|string|function)",
                  flip: "boolean",
                  boundary: "(string|element)",
                  reference: "(string|element)",
                  display: "string",
                  popperConfig: "(null|object)"
              },
              P = function() {
                  function s(t, n) {
                      this._element = t, this._popper = null, this._config = this._getConfig(n), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners(), e.setData(t, d, this)
                  }
                  var u, _, w, O = s.prototype;
                  return O.toggle = function() {
                      if (!this._element.disabled && !this._element.classList.contains("disabled")) {
                          var e = this._element.classList.contains("show");
                          s.clearMenus(), e || this.show()
                      }
                  }, O.show = function() {
                      if (!(this._element.disabled || this._element.classList.contains("disabled") || this._menu.classList.contains("show"))) {
                          var e = s.getParentFromElement(this._element),
                              o = {
                                  relatedTarget: this._element
                              };
                          if (!t.trigger(this._element, y, o).defaultPrevented) {
                              if (!this._inNavbar) {
                                  if (void 0 === r) throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org)");
                                  var a = this._element;
                                  "parent" === this._config.reference ? a = e : i(this._config.reference) && (a = this._config.reference, void 0 !== this._config.reference.jquery && (a = this._config.reference[0])), "scrollParent" !== this._config.boundary && e.classList.add("position-static"), this._popper = new r(a, this._menu, this._getPopperConfig())
                              }
                              var l;
                              if ("ontouchstart" in document.documentElement && !e.closest(".navbar-nav"))(l = []).concat.apply(l, document.body.children).forEach(function(e) {
                                  return t.on(e, "mouseover", null, function() {})
                              });
                              this._element.focus(), this._element.setAttribute("aria-expanded", !0), n.toggleClass(this._menu, "show"), n.toggleClass(this._element, "show"), t.trigger(e, v, o)
                          }
                      }
                  }, O.hide = function() {
                      if (!this._element.disabled && !this._element.classList.contains("disabled") && this._menu.classList.contains("show")) {
                          var e = s.getParentFromElement(this._element),
                              r = {
                                  relatedTarget: this._element
                              };
                          t.trigger(e, g, r).defaultPrevented || (this._popper && this._popper.destroy(), n.toggleClass(this._menu, "show"), n.toggleClass(this._element, "show"), t.trigger(e, m, r))
                      }
                  }, O.dispose = function() {
                      e.removeData(this._element, d), t.off(this._element, p), this._element = null, this._menu = null, this._popper && (this._popper.destroy(), this._popper = null)
                  }, O.update = function() {
                      this._inNavbar = this._detectNavbar(), this._popper && this._popper.scheduleUpdate()
                  }, O._addEventListeners = function() {
                      var e = this;
                      t.on(this._element, b, function(t) {
                          t.preventDefault(), t.stopPropagation(), e.toggle()
                      })
                  }, O._getConfig = function(e) {
                      return e = l(l(l({}, this.constructor.Default), n.getDataAttributes(this._element)), e),
                          function(e, t, n) {
                              Object.keys(n).forEach(function(r) {
                                  var o, a = n[r],
                                      s = t[r],
                                      l = s && i(s) ? "element" : null == (o = s) ? "" + o : {}.toString.call(o).match(/\s([a-z]+)/i)[1].toLowerCase();
                                  if (!new RegExp(a).test(l)) throw new Error(e.toUpperCase() + ': Option "' + r + '" provided type "' + l + '" but expected type "' + a + '".')
                              })
                          }(f, e, this.constructor.DefaultType), e
                  }, O._getMenuElement = function() {
                      return o.next(this._element, ".dropdown-menu")[0]
                  }, O._getPlacement = function() {
                      var e = this._element.parentNode,
                          t = "bottom-start";
                      return e.classList.contains("dropup") ? (t = "top-start", this._menu.classList.contains("dropdown-menu-right") && (t = "top-end")) : e.classList.contains("dropright") ? t = "right-start" : e.classList.contains("dropleft") ? t = "left-start" : this._menu.classList.contains("dropdown-menu-right") && (t = "bottom-end"), t
                  }, O._detectNavbar = function() {
                      return Boolean(this._element.closest(".navbar"))
                  }, O._getOffset = function() {
                      var e = this,
                          t = {};
                      return "function" == typeof this._config.offset ? t.fn = function(t) {
                          return t.offsets = l(l({}, t.offsets), e._config.offset(t.offsets, e._element) || {}), t
                      } : t.offset = this._config.offset, t
                  }, O._getPopperConfig = function() {
                      var e = {
                          placement: this._getPlacement(),
                          modifiers: {
                              offset: this._getOffset(),
                              flip: {
                                  enabled: this._config.flip
                              },
                              preventOverflow: {
                                  boundariesElement: this._config.boundary
                              }
                          }
                      };
                      return "static" === this._config.display && (e.modifiers.applyStyle = {
                          enabled: !1
                      }), l(l({}, e), this._config.popperConfig)
                  }, s.dropdownInterface = function(t, n) {
                      var r = e.getData(t, d);
                      if (r || (r = new s(t, "object" == typeof n ? n : null)), "string" == typeof n) {
                          if (void 0 === r[n]) throw new TypeError('No method named "' + n + '"');
                          r[n]()
                      }
                  }, s.jQueryInterface = function(e) {
                      return this.each(function() {
                          s.dropdownInterface(this, e)
                      })
                  }, s.clearMenus = function(n) {
                      if (!n || 2 !== n.button && ("keyup" !== n.type || "Tab" === n.key))
                          for (var r = o.find('[data-toggle="dropdown"]'), i = 0, a = r.length; i < a; i++) {
                              var l = s.getParentFromElement(r[i]),
                                  u = e.getData(r[i], d),
                                  c = {
                                      relatedTarget: r[i]
                                  };
                              if (n && "click" === n.type && (c.clickEvent = n), u) {
                                  var f = u._menu;
                                  if (r[i].classList.contains("show"))
                                      if (!(n && ("click" === n.type && /input|textarea/i.test(n.target.tagName) || "keyup" === n.type && "Tab" === n.key) && f.contains(n.target)))
                                          if (!t.trigger(l, g, c).defaultPrevented) {
                                              var p;
                                              if ("ontouchstart" in document.documentElement)(p = []).concat.apply(p, document.body.children).forEach(function(e) {
                                                  return t.off(e, "mouseover", null, function() {})
                                              });
                                              r[i].setAttribute("aria-expanded", "false"), u._popper && u._popper.destroy(), f.classList.remove("show"), r[i].classList.remove("show"), t.trigger(l, m, c)
                                          }
                              }
                          }
                  }, s.getParentFromElement = function(e) {
                      return function(e) {
                          var t = function(e) {
                              var t = e.getAttribute("data-target");
                              if (!t || "#" === t) {
                                  var n = e.getAttribute("href");
                                  t = n && "#" !== n ? n.trim() : null
                              }
                              return t
                          }(e);
                          return t ? document.querySelector(t) : null
                      }(e) || e.parentNode
                  }, s.dataApiKeydownHandler = function(e) {
                      if ((/input|textarea/i.test(e.target.tagName) ? !("Space" === e.key || "Escape" !== e.key && ("ArrowDown" !== e.key && "ArrowUp" !== e.key || e.target.closest(".dropdown-menu"))) : h.test(e.key)) && (e.preventDefault(), e.stopPropagation(), !this.disabled && !this.classList.contains("disabled"))) {
                          var t = s.getParentFromElement(this),
                              n = this.classList.contains("show");
                          if ("Escape" === e.key) return (this.matches('[data-toggle="dropdown"]') ? this : o.prev(this, '[data-toggle="dropdown"]')[0]).focus(), void s.clearMenus();
                          if (n && "Space" !== e.key) {
                              var r = o.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", t).filter(a);
                              if (r.length) {
                                  var i = r.indexOf(e.target);
                                  "ArrowUp" === e.key && i > 0 && i--, "ArrowDown" === e.key && i < r.length - 1 && i++, r[i = -1 === i ? 0 : i].focus()
                              }
                          } else s.clearMenus()
                      }
                  }, s.getInstance = function(t) {
                      return e.getData(t, d)
                  }, u = s, w = [{
                      key: "VERSION",
                      get: function() {
                          return "5.0.0-alpha1"
                      }
                  }, {
                      key: "Default",
                      get: function() {
                          return j
                      }
                  }, {
                      key: "DefaultType",
                      get: function() {
                          return E
                      }
                  }], (_ = null) && c(u.prototype, _), w && c(u, w), s
              }();
          t.on(document, w, '[data-toggle="dropdown"]', P.dataApiKeydownHandler), t.on(document, w, ".dropdown-menu", P.dataApiKeydownHandler), t.on(document, _, P.clearMenus), t.on(document, O, P.clearMenus), t.on(document, _, '[data-toggle="dropdown"]', function(e) {
              e.preventDefault(), e.stopPropagation(), P.dropdownInterface(this, "toggle")
          }), t.on(document, _, ".dropdown form", function(e) {
              return e.stopPropagation()
          });
          var D, k = (D = window.jQuery) && !document.body.hasAttribute("data-no-jquery") ? D : null;
          if (k) {
              var A = k.fn[f];
              k.fn[f] = P.jQueryInterface, k.fn[f].Constructor = P, k.fn[f].noConflict = function() {
                  return k.fn[f] = A, P.jQueryInterface
              }
          }
          return P
      });