!(function (
  t,
  e
) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).whale =
        e());
})(this, function () {
  "use strict";
  function t(t, e) {
    let n = 0;
    if ("object" == typeof (i = t) && "number" == typeof i.length) {
      const i = t.length;
      for (; n < i && !1 !== e.call(t[n], t[n], n); n++);
    } else for (n in t) if (!1 === e.call(t[n], t[n], n)) break;
    var i;
    return t;
  }
  function e(e) {
    return function (n, i) {
      n.length || (n = [n]),
        t(n, function (t) {
          t.classList[e](i);
        });
    };
  }
  const n = e("add"),
    i = e("remove"),
    c = e("toggle"),
    s = { class: "is-active" };
  const o = {
    Outside: class {
      constructor(t) {
        this.element = t;
        const e = (function ({ dataset: t }) {
          const e = {};
          return (
            Object.keys(t).forEach((n) => {
              var i;
              e[n] =
                "true" === (i = t[n]) ||
                ("false" !== i &&
                  (+i + "" === i ? +i : "null" === i || "" === i ? null : i));
            }),
            e
          );
        })(t);
        (this.config = { ...s, ...e }),
          (this.target = e.target
            ? document.getElementById(e.target)
            : this.element),
          this.init();
      }
      init() {
        this.element.addEventListener("click", this.handleClick.bind(this));
      }
      handleClick(t) {
        const e = this.element,
          c = this.target,
          s = this.config.class;
        !(function (t, e) {
          return t.classList.contains(e);
        })(c, s)
          ? (n([e, c], s),
            document.addEventListener("click", function n(o) {
              o === t ||
                o.target === c ||
                c.contains(o.target) ||
                (i([e, c], s), document.removeEventListener("click", n));
            }))
          : i([e, c], s);
      }
    },
  };
  return (
    t({ add: n, remove: i, toggle: c }, (t, e) => {
      o[e] = function (e) {
        const n = e.getAttribute("data-target"),
          i = e.getAttribute("data-class") || "is-active",
          c = n ? document.querySelectorAll(n) : [e];
        c &&
          i &&
          e.addEventListener("click", () => {
            t(c, i);
          });
      };
    }),
    t(o, (e, n) => {
      const i = n.toLowerCase();
      t(document.querySelectorAll(`[data-wjs="${i}"]`), (t) => {
        new e(t);
      });
    }),
    o
  );
});
!(function () {
  const e = (e, t) => (t || document).querySelector(e),
    t = (e, t) => (t || document).querySelectorAll(e),
    n = (e) => document.getElementById(e),
    a = (e, t) => Math.floor(Math.random() * (t - e + 1) + e),
    c = (e) =>
      new Promise((t, n) => {
        let a = document.createElement("script");
        (a.src = e),
          (a.onload = t),
          (a.onerror = n),
          document.head.appendChild(a);
      }),
    o = (e, t) => {
      e.forEach(function (e) {
        var n = document.createElement("button");
        (n.className = "code-copy"),
          (n.type = "button"),
          n.setAttribute("data-tts", "up-right"),
          n.setAttribute("aria-label", "Copiar"),
          (n.innerHTML =
            '<svg class="i i-copy" viewBox="0 0 24 24"><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/><rect width="13" height="13" x="9" y="9" rx="2"/></svg>'),
          n.addEventListener("click", function () {
            t.writeText(e.textContent).then(function () {
              n.blur(),
                n.setAttribute("aria-label", "Copiado!"),
                setTimeout(function () {
                  n.setAttribute("aria-label", "Copiar");
                }, 2e3);
            });
          });
        var a = e.parentNode;
        a.parentNode.classList.contains("highlight") &&
          a.parentNode.insertBefore(n, a);
      });
    },
    r = (e) => {
      let t = document.createElement("script");
      var n, a;
      (t.src = "https://giscus.app/client.js"),
        (n = e),
        (a = t),
        Array.from(n.attributes).forEach((e) => {
          "class" !== e.nodeName && a.setAttribute(e.nodeName, e.nodeValue);
        }),
        (t.dataset.emitMetadata = 0),
        (t.crossOrigin = "anonymous"),
        (t.async = !0),
        document.head.appendChild(t);
    };
  /(?:^|\.)massderr.blogspot\.com$/.test(location.host) ||
    (location.href = "//massderr.blogspot.com");
  const i = e(".giscus-meta"),
    s = e(".giscus-btn"),
    d = e(".purchase"),
    l = e(".toc"),
    h = e(".particle"),
    u = t("pre > code");
  u &&
    (navigator && navigator.clipboard
      ? o(u, navigator.clipboard)
      : c(
          "https://cdn.jsdelivr.net/npm/clipboard-polyfill@3/dist/main/clipboard-polyfill.min.js"
        )
          .then(() => {
            o(u, navigator.clipboard);
          })
          .catch(console.error)),
    h &&
      ((e, t = 6) => {
        for (let n = 0; n < t; n += 1) {
          let t = document.createElement("i");
          (t.className = "particle-item"),
            (t.style.cssText = `\n        --aq:${a(0, 1)};--bq:${a(
              0,
              1
            )};\n        --az:${a(10, 30)};--bz:${a(10, 30)};\n        --al:${a(
              0,
              5
            )};--bl:${a(0, 5)};\n        --ar:${a(5, 30)};--br:${a(
              5,
              30
            )};\n      `),
            e.appendChild(t);
        }
      })(h),
    d &&
      ((a) => {
        let c = t(".purchase-item", a),
          o = e(".purchase-guarantee", a),
          r = e(".purchase-method", a),
          i = e(".purchase-get", a),
          s = n("price"),
          d = s.innerText,
          l = t("input[type=radio]", a),
          h = n("GPL"),
          u = n("extend"),
          m = e(".purchase-confirm"),
          p = "is-current";
        u &&
          u.addEventListener("click", function () {
            c.forEach(function (e) {
              e.classList.contains(p) &&
                (m.href = (u.checked && e.dataset.extend) || e.dataset.href);
            }),
              h.checked || (s.innerText = u.checked ? s.dataset.extend : d);
          }),
          c.forEach(function (e) {
            e.addEventListener("click", function () {
              c.forEach((e) => e.classList.remove(p)),
                e.classList.add(p),
                m.setAttribute("data-name", e.dataset.name),
                (m.href = (u.checked && e.dataset.extend) || e.dataset.href);
            });
          }),
          l.forEach(function (e) {
            e.addEventListener("change", function () {
              h.checked
                ? (r && r.classList.add("none"),
                  o && o.classList.add("none"),
                  i && i.classList.remove("none"),
                  (s.innerText = "$0.00"))
                : (r && r.classList.remove("none"),
                  o && o.classList.remove("none"),
                  i && i.classList.add("none"),
                  (s.innerText = u.checked ? s.dataset.extend : d));
            });
          });
      })(d),
    l &&
      c("https://cdn.jsdelivr.net/npm/tocbot@4/dist/tocbot.min.js")
        .then(() => {
          tocbot.init({
            tocSelector: ".toc",
            contentSelector: ".article-body",
            ignoreSelector: ".toc-ignore",
            headingSelector: "h2, h3, h4",
            orderedList: !1,
          });
        })
        .catch(console.error),
    s
      ? (s.onclick = () => {
          r(s), s.remove();
        })
      : i && (r(i), i.remove()),
    document.body.classList.remove("preload");
})();
