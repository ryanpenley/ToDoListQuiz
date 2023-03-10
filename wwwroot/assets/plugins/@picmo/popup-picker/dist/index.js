import { Events as xt, getOptions as vt, createPicker as bt, FocusTrap as Et, animate as Z, createStyleInjector as Ct } from "picmo";
function V(t) {
  return t.split("-")[0];
}
function N(t) {
  return t.split("-")[1];
}
function K(t) {
  return ["top", "bottom"].includes(V(t)) ? "x" : "y";
}
function at(t) {
  return t === "y" ? "height" : "width";
}
function tt(t, e, n) {
  let {
    reference: i,
    floating: o
  } = t;
  const c = i.x + i.width / 2 - o.width / 2, r = i.y + i.height / 2 - o.height / 2, s = K(e), l = at(s), a = i[l] / 2 - o[l] / 2, d = V(e), f = s === "x";
  let u;
  switch (d) {
    case "top":
      u = {
        x: c,
        y: i.y - o.height
      };
      break;
    case "bottom":
      u = {
        x: c,
        y: i.y + i.height
      };
      break;
    case "right":
      u = {
        x: i.x + i.width,
        y: r
      };
      break;
    case "left":
      u = {
        x: i.x - o.width,
        y: r
      };
      break;
    default:
      u = {
        x: i.x,
        y: i.y
      };
  }
  switch (N(e)) {
    case "start":
      u[s] -= a * (n && f ? -1 : 1);
      break;
    case "end":
      u[s] += a * (n && f ? -1 : 1);
      break;
  }
  return u;
}
const Pt = async (t, e, n) => {
  const {
    placement: i = "bottom",
    strategy: o = "absolute",
    middleware: c = [],
    platform: r
  } = n, s = await (r.isRTL == null ? void 0 : r.isRTL(e));
  let l = await r.getElementRects({
    reference: t,
    floating: e,
    strategy: o
  }), {
    x: a,
    y: d
  } = tt(l, i, s), f = i, u = {}, p = 0;
  for (let m = 0; m < c.length; m++) {
    const {
      name: h,
      fn: w
    } = c[m], {
      x: y,
      y: g,
      data: v,
      reset: x
    } = await w({
      x: a,
      y: d,
      initialPlacement: i,
      placement: f,
      strategy: o,
      middlewareData: u,
      rects: l,
      platform: r,
      elements: {
        reference: t,
        floating: e
      }
    });
    if (a = y != null ? y : a, d = g != null ? g : d, u = {
      ...u,
      [h]: {
        ...u[h],
        ...v
      }
    }, x && p <= 50) {
      p++, typeof x == "object" && (x.placement && (f = x.placement), x.rects && (l = x.rects === !0 ? await r.getElementRects({
        reference: t,
        floating: e,
        strategy: o
      }) : x.rects), {
        x: a,
        y: d
      } = tt(l, f, s)), m = -1;
      continue;
    }
  }
  return {
    x: a,
    y: d,
    placement: f,
    strategy: o,
    middlewareData: u
  };
};
function At(t) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...t
  };
}
function Lt(t) {
  return typeof t != "number" ? At(t) : {
    top: t,
    right: t,
    bottom: t,
    left: t
  };
}
function I(t) {
  return {
    ...t,
    top: t.y,
    left: t.x,
    right: t.x + t.width,
    bottom: t.y + t.height
  };
}
async function Q(t, e) {
  var n;
  e === void 0 && (e = {});
  const {
    x: i,
    y: o,
    platform: c,
    rects: r,
    elements: s,
    strategy: l
  } = t, {
    boundary: a = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: f = "floating",
    altBoundary: u = !1,
    padding: p = 0
  } = e, m = Lt(p), w = s[u ? f === "floating" ? "reference" : "floating" : f], y = I(await c.getClippingRect({
    element: (n = await (c.isElement == null ? void 0 : c.isElement(w))) == null || n ? w : w.contextElement || await (c.getDocumentElement == null ? void 0 : c.getDocumentElement(s.floating)),
    boundary: a,
    rootBoundary: d,
    strategy: l
  })), g = I(c.convertOffsetParentRelativeRectToViewportRelativeRect ? await c.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: f === "floating" ? {
      ...r.floating,
      x: i,
      y: o
    } : r.reference,
    offsetParent: await (c.getOffsetParent == null ? void 0 : c.getOffsetParent(s.floating)),
    strategy: l
  }) : r[f]);
  return {
    top: y.top - g.top + m.top,
    bottom: g.bottom - y.bottom + m.bottom,
    left: y.left - g.left + m.left,
    right: g.right - y.right + m.right
  };
}
const Ot = Math.min, Rt = Math.max;
function et(t, e, n) {
  return Rt(t, Ot(e, n));
}
const kt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function z(t) {
  return t.replace(/left|right|bottom|top/g, (e) => kt[e]);
}
function ft(t, e, n) {
  n === void 0 && (n = !1);
  const i = N(t), o = K(t), c = at(o);
  let r = o === "x" ? i === (n ? "end" : "start") ? "right" : "left" : i === "start" ? "bottom" : "top";
  return e.reference[c] > e.floating[c] && (r = z(r)), {
    main: r,
    cross: z(r)
  };
}
const Tt = {
  start: "end",
  end: "start"
};
function G(t) {
  return t.replace(/start|end/g, (e) => Tt[e]);
}
const Bt = ["top", "right", "bottom", "left"], St = /* @__PURE__ */ Bt.reduce((t, e) => t.concat(e, e + "-start", e + "-end"), []);
function Dt(t, e, n) {
  return (t ? [...n.filter((o) => N(o) === t), ...n.filter((o) => N(o) !== t)] : n.filter((o) => V(o) === o)).filter((o) => t ? N(o) === t || (e ? G(o) !== o : !1) : !0);
}
const Vt = function(t) {
  return t === void 0 && (t = {}), {
    name: "autoPlacement",
    options: t,
    async fn(e) {
      var n, i, o, c, r;
      const {
        x: s,
        y: l,
        rects: a,
        middlewareData: d,
        placement: f,
        platform: u,
        elements: p
      } = e, {
        alignment: m = null,
        allowedPlacements: h = St,
        autoAlignment: w = !0,
        ...y
      } = t, g = Dt(m, w, h), v = await Q(e, y), x = (n = (i = d.autoPlacement) == null ? void 0 : i.index) != null ? n : 0, b = g[x];
      if (b == null)
        return {};
      const {
        main: H,
        cross: j
      } = ft(b, a, await (u.isRTL == null ? void 0 : u.isRTL(p.floating)));
      if (f !== b)
        return {
          x: s,
          y: l,
          reset: {
            placement: g[0]
          }
        };
      const _ = [v[V(b)], v[H], v[j]], E = [...(o = (c = d.autoPlacement) == null ? void 0 : c.overflows) != null ? o : [], {
        placement: b,
        overflows: _
      }], B = g[x + 1];
      if (B)
        return {
          data: {
            index: x + 1,
            overflows: E
          },
          reset: {
            placement: B
          }
        };
      const S = E.slice().sort((A, W) => A.overflows[0] - W.overflows[0]), $ = (r = S.find((A) => {
        let {
          overflows: W
        } = A;
        return W.every((yt) => yt <= 0);
      })) == null ? void 0 : r.placement, D = $ != null ? $ : S[0].placement;
      return D !== f ? {
        data: {
          index: x + 1,
          overflows: E
        },
        reset: {
          placement: D
        }
      } : {};
    }
  };
};
function Nt(t) {
  const e = z(t);
  return [G(t), e, G(e)];
}
const Ft = function(t) {
  return t === void 0 && (t = {}), {
    name: "flip",
    options: t,
    async fn(e) {
      var n;
      const {
        placement: i,
        middlewareData: o,
        rects: c,
        initialPlacement: r,
        platform: s,
        elements: l
      } = e, {
        mainAxis: a = !0,
        crossAxis: d = !0,
        fallbackPlacements: f,
        fallbackStrategy: u = "bestFit",
        flipAlignment: p = !0,
        ...m
      } = t, h = V(i), y = f || (h === r || !p ? [z(r)] : Nt(r)), g = [r, ...y], v = await Q(e, m), x = [];
      let b = ((n = o.flip) == null ? void 0 : n.overflows) || [];
      if (a && x.push(v[h]), d) {
        const {
          main: E,
          cross: B
        } = ft(i, c, await (s.isRTL == null ? void 0 : s.isRTL(l.floating)));
        x.push(v[E], v[B]);
      }
      if (b = [...b, {
        placement: i,
        overflows: x
      }], !x.every((E) => E <= 0)) {
        var H, j;
        const E = ((H = (j = o.flip) == null ? void 0 : j.index) != null ? H : 0) + 1, B = g[E];
        if (B)
          return {
            data: {
              index: E,
              overflows: b
            },
            reset: {
              placement: B
            }
          };
        let S = "bottom";
        switch (u) {
          case "bestFit": {
            var _;
            const $ = (_ = b.map((D) => [D, D.overflows.filter((A) => A > 0).reduce((A, W) => A + W, 0)]).sort((D, A) => D[1] - A[1])[0]) == null ? void 0 : _[0].placement;
            $ && (S = $);
            break;
          }
          case "initialPlacement":
            S = r;
            break;
        }
        if (i !== S)
          return {
            reset: {
              placement: S
            }
          };
      }
      return {};
    }
  };
};
async function $t(t, e) {
  const {
    placement: n,
    platform: i,
    elements: o
  } = t, c = await (i.isRTL == null ? void 0 : i.isRTL(o.floating)), r = V(n), s = N(n), l = K(n) === "x", a = ["left", "top"].includes(r) ? -1 : 1, d = c && l ? -1 : 1, f = typeof e == "function" ? e(t) : e;
  let {
    mainAxis: u,
    crossAxis: p,
    alignmentAxis: m
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...f
  };
  return s && typeof m == "number" && (p = s === "end" ? m * -1 : m), l ? {
    x: p * d,
    y: u * a
  } : {
    x: u * a,
    y: p * d
  };
}
const nt = function(t) {
  return t === void 0 && (t = 0), {
    name: "offset",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i
      } = e, o = await $t(e, t);
      return {
        x: n + o.x,
        y: i + o.y,
        data: o
      };
    }
  };
};
function Wt(t) {
  return t === "x" ? "y" : "x";
}
const ot = function(t) {
  return t === void 0 && (t = {}), {
    name: "shift",
    options: t,
    async fn(e) {
      const {
        x: n,
        y: i,
        placement: o
      } = e, {
        mainAxis: c = !0,
        crossAxis: r = !1,
        limiter: s = {
          fn: (w) => {
            let {
              x: y,
              y: g
            } = w;
            return {
              x: y,
              y: g
            };
          }
        },
        ...l
      } = t, a = {
        x: n,
        y: i
      }, d = await Q(e, l), f = K(V(o)), u = Wt(f);
      let p = a[f], m = a[u];
      if (c) {
        const w = f === "y" ? "top" : "left", y = f === "y" ? "bottom" : "right", g = p + d[w], v = p - d[y];
        p = et(g, p, v);
      }
      if (r) {
        const w = u === "y" ? "top" : "left", y = u === "y" ? "bottom" : "right", g = m + d[w], v = m - d[y];
        m = et(g, m, v);
      }
      const h = s.fn({
        ...e,
        [f]: p,
        [u]: m
      });
      return {
        ...h,
        data: {
          x: h.x - n,
          y: h.y - i
        }
      };
    }
  };
};
function ut(t) {
  return t && t.document && t.location && t.alert && t.setInterval;
}
function R(t) {
  if (t == null)
    return window;
  if (!ut(t)) {
    const e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function C(t) {
  return R(t).getComputedStyle(t);
}
function L(t) {
  return ut(t) ? "" : t ? (t.nodeName || "").toLowerCase() : "";
}
function dt() {
  const t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map((e) => e.brand + "/" + e.version).join(" ") : navigator.userAgent;
}
function P(t) {
  return t instanceof R(t).HTMLElement;
}
function k(t) {
  return t instanceof R(t).Element;
}
function Mt(t) {
  return t instanceof R(t).Node;
}
function F(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  const e = R(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function U(t) {
  const {
    overflow: e,
    overflowX: n,
    overflowY: i
  } = C(t);
  return /auto|scroll|overlay|hidden/.test(e + i + n);
}
function Ht(t) {
  return ["table", "td", "th"].includes(L(t));
}
function ht(t) {
  const e = /firefox/i.test(dt()), n = C(t);
  return n.transform !== "none" || n.perspective !== "none" || n.contain === "paint" || ["transform", "perspective"].includes(n.willChange) || e && n.willChange === "filter" || e && (n.filter ? n.filter !== "none" : !1);
}
function pt() {
  return !/^((?!chrome|android).)*safari/i.test(dt());
}
const it = Math.min, M = Math.max, X = Math.round;
function O(t, e, n) {
  var i, o, c, r;
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  const s = t.getBoundingClientRect();
  let l = 1, a = 1;
  e && P(t) && (l = t.offsetWidth > 0 && X(s.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && X(s.height) / t.offsetHeight || 1);
  const d = k(t) ? R(t) : window, f = !pt() && n, u = (s.left + (f && (i = (o = d.visualViewport) == null ? void 0 : o.offsetLeft) != null ? i : 0)) / l, p = (s.top + (f && (c = (r = d.visualViewport) == null ? void 0 : r.offsetTop) != null ? c : 0)) / a, m = s.width / l, h = s.height / a;
  return {
    width: m,
    height: h,
    top: p,
    right: u + m,
    bottom: p + h,
    left: u,
    x: u,
    y: p
  };
}
function T(t) {
  return ((Mt(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function q(t) {
  return k(t) ? {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  } : {
    scrollLeft: t.pageXOffset,
    scrollTop: t.pageYOffset
  };
}
function mt(t) {
  return O(T(t)).left + q(t).scrollLeft;
}
function jt(t) {
  const e = O(t);
  return X(e.width) !== t.offsetWidth || X(e.height) !== t.offsetHeight;
}
function _t(t, e, n) {
  const i = P(e), o = T(e), c = O(
    t,
    i && jt(e),
    n === "fixed"
  );
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if (i || !i && n !== "fixed")
    if ((L(e) !== "body" || U(o)) && (r = q(e)), P(e)) {
      const l = O(e, !0);
      s.x = l.x + e.clientLeft, s.y = l.y + e.clientTop;
    } else
      o && (s.x = mt(o));
  return {
    x: c.left + r.scrollLeft - s.x,
    y: c.top + r.scrollTop - s.y,
    width: c.width,
    height: c.height
  };
}
function gt(t) {
  return L(t) === "html" ? t : t.assignedSlot || t.parentNode || (F(t) ? t.host : null) || T(t);
}
function st(t) {
  return !P(t) || C(t).position === "fixed" ? null : It(t);
}
function It(t) {
  let {
    offsetParent: e
  } = t, n = t, i = !1;
  for (; n && n !== e; ) {
    const {
      assignedSlot: o
    } = n;
    if (o) {
      let c = o.offsetParent;
      if (C(o).display === "contents") {
        const r = o.hasAttribute("style"), s = o.style.display;
        o.style.display = C(n).display, c = o.offsetParent, o.style.display = s, r || o.removeAttribute("style");
      }
      n = o, e !== c && (e = c, i = !0);
    } else if (F(n) && n.host && i)
      break;
    n = F(n) && n.host || n.parentNode;
  }
  return e;
}
function zt(t) {
  let e = gt(t);
  for (F(e) && (e = e.host); P(e) && !["html", "body"].includes(L(e)); ) {
    if (ht(e))
      return e;
    {
      const n = e.parentNode;
      e = F(n) ? n.host : n;
    }
  }
  return null;
}
function J(t) {
  const e = R(t);
  let n = st(t);
  for (; n && Ht(n) && C(n).position === "static"; )
    n = st(n);
  return n && (L(n) === "html" || L(n) === "body" && C(n).position === "static" && !ht(n)) ? e : n || zt(t) || e;
}
function rt(t) {
  if (P(t))
    return {
      width: t.offsetWidth,
      height: t.offsetHeight
    };
  const e = O(t);
  return {
    width: e.width,
    height: e.height
  };
}
function Xt(t) {
  let {
    rect: e,
    offsetParent: n,
    strategy: i
  } = t;
  const o = P(n), c = T(n);
  if (n === c)
    return e;
  let r = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const s = {
    x: 0,
    y: 0
  };
  if ((o || !o && i !== "fixed") && ((L(n) !== "body" || U(c)) && (r = q(n)), P(n))) {
    const l = O(n, !0);
    s.x = l.x + n.clientLeft, s.y = l.y + n.clientTop;
  }
  return {
    ...e,
    x: e.x - r.scrollLeft + s.x,
    y: e.y - r.scrollTop + s.y
  };
}
function Yt(t, e) {
  const n = R(t), i = T(t), o = n.visualViewport;
  let c = i.clientWidth, r = i.clientHeight, s = 0, l = 0;
  if (o) {
    c = o.width, r = o.height;
    const a = pt();
    (a || !a && e === "fixed") && (s = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: c,
    height: r,
    x: s,
    y: l
  };
}
function Kt(t) {
  var e;
  const n = T(t), i = q(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, c = M(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), r = M(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0);
  let s = -i.scrollLeft + mt(t);
  const l = -i.scrollTop;
  return C(o || n).direction === "rtl" && (s += M(n.clientWidth, o ? o.clientWidth : 0) - c), {
    width: c,
    height: r,
    x: s,
    y: l
  };
}
function wt(t) {
  const e = gt(t);
  return ["html", "body", "#document"].includes(L(e)) ? t.ownerDocument.body : P(e) && U(e) ? e : wt(e);
}
function Y(t, e) {
  var n;
  e === void 0 && (e = []);
  const i = wt(t), o = i === ((n = t.ownerDocument) == null ? void 0 : n.body), c = R(i), r = o ? [c].concat(c.visualViewport || [], U(i) ? i : []) : i, s = e.concat(r);
  return o ? s : s.concat(Y(r));
}
function Ut(t, e) {
  const n = e.getRootNode == null ? void 0 : e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && F(n)) {
    let i = e;
    do {
      if (i && t === i)
        return !0;
      i = i.parentNode || i.host;
    } while (i);
  }
  return !1;
}
function qt(t, e) {
  const n = O(t, !1, e === "fixed"), i = n.top + t.clientTop, o = n.left + t.clientLeft;
  return {
    top: i,
    left: o,
    x: o,
    y: i,
    right: o + t.clientWidth,
    bottom: i + t.clientHeight,
    width: t.clientWidth,
    height: t.clientHeight
  };
}
function ct(t, e, n) {
  return e === "viewport" ? I(Yt(t, n)) : k(e) ? qt(e, n) : I(Kt(T(t)));
}
function Gt(t) {
  const e = Y(t), i = ["absolute", "fixed"].includes(C(t).position) && P(t) ? J(t) : t;
  return k(i) ? e.filter((o) => k(o) && Ut(o, i) && L(o) !== "body") : [];
}
function Jt(t) {
  let {
    element: e,
    boundary: n,
    rootBoundary: i,
    strategy: o
  } = t;
  const r = [...n === "clippingAncestors" ? Gt(e) : [].concat(n), i], s = r[0], l = r.reduce((a, d) => {
    const f = ct(e, d, o);
    return a.top = M(f.top, a.top), a.right = it(f.right, a.right), a.bottom = it(f.bottom, a.bottom), a.left = M(f.left, a.left), a;
  }, ct(e, s, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
const Qt = {
  getClippingRect: Jt,
  convertOffsetParentRelativeRectToViewportRelativeRect: Xt,
  isElement: k,
  getDimensions: rt,
  getOffsetParent: J,
  getDocumentElement: T,
  getElementRects: (t) => {
    let {
      reference: e,
      floating: n,
      strategy: i
    } = t;
    return {
      reference: _t(e, J(n), i),
      floating: {
        ...rt(n),
        x: 0,
        y: 0
      }
    };
  },
  getClientRects: (t) => Array.from(t.getClientRects()),
  isRTL: (t) => C(t).direction === "rtl"
};
function Zt(t, e, n, i) {
  i === void 0 && (i = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: c = !0,
    elementResize: r = !0,
    animationFrame: s = !1
  } = i, l = o && !s, a = c && !s, d = l || a ? [...k(t) ? Y(t) : [], ...Y(e)] : [];
  d.forEach((h) => {
    l && h.addEventListener("scroll", n, {
      passive: !0
    }), a && h.addEventListener("resize", n);
  });
  let f = null;
  if (r) {
    let h = !0;
    f = new ResizeObserver(() => {
      h || n(), h = !1;
    }), k(t) && !s && f.observe(t), f.observe(e);
  }
  let u, p = s ? O(t) : null;
  s && m();
  function m() {
    const h = O(t);
    p && (h.x !== p.x || h.y !== p.y || h.width !== p.width || h.height !== p.height) && n(), p = h, u = requestAnimationFrame(m);
  }
  return n(), () => {
    var h;
    d.forEach((w) => {
      l && w.removeEventListener("scroll", n), a && w.removeEventListener("resize", n);
    }), (h = f) == null || h.disconnect(), f = null, s && cancelAnimationFrame(u);
  };
}
const te = (t, e, n) => Pt(t, e, {
  platform: Qt,
  ...n
});
async function ee(t, e, n, i) {
  if (!i)
    throw new Error("Must provide a positioning option");
  return await (typeof i == "string" ? ne(t, e, n, i) : oe(e, i));
}
async function ne(t, e, n, i) {
  if (!n)
    throw new Error("Reference element is required for relative positioning");
  let o;
  return i === "auto" ? o = {
    middleware: [
      Vt(),
      ot(),
      nt({ mainAxis: 5, crossAxis: 12 })
    ]
  } : o = {
    placement: i,
    middleware: [
      Ft(),
      ot(),
      nt(5)
    ]
  }, Zt(n, e, async () => {
    if ((!n.isConnected || !n.offsetParent) && ie(t))
      return;
    const { x: c, y: r } = await te(n, e, o);
    Object.assign(e.style, {
      position: "absolute",
      left: `${c}px`,
      top: `${r}px`
    });
  });
}
function oe(t, e) {
  return t.style.position = "fixed", Object.entries(e).forEach(([n, i]) => {
    t.style[n] = i;
  }), () => {
  };
}
function ie(t) {
  switch (t.options.onPositionLost) {
    case "close":
      return t.close(), !0;
    case "destroy":
      return t.destroy(), !0;
    case "hold":
      return !0;
  }
}
const se = {
  hideOnClickOutside: !0,
  hideOnEmojiSelect: !0,
  hideOnEscape: !0,
  position: "auto",
  showCloseButton: !0,
  onPositionLost: "none"
};
function re(t = {}) {
  return {
    ...se,
    rootElement: document.body,
    ...t
  };
}
const ce = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"/></svg>', lt = {
  popupContainer: "popupContainer",
  closeButton: "closeButton"
};
class le {
  constructor(e, n) {
    this.isOpen = !1, this.externalEvents = new xt(), this.options = { ...re(n), ...vt(e) }, this.popupEl = document.createElement("div"), this.popupEl.classList.add(lt.popupContainer), this.popupEl.classList.add(this.options.theme), n.className && this.popupEl.classList.add(n.className), this.options.showCloseButton && (this.closeButton = document.createElement("button"), this.closeButton.type = "button", this.closeButton.classList.add(lt.closeButton), this.closeButton.innerHTML = ce, this.closeButton.addEventListener("click", () => {
      this.close();
    }), this.popupEl.appendChild(this.closeButton));
    const i = document.createElement("div");
    this.popupEl.appendChild(i), this.picker = bt({ ...this.options, rootElement: i }), this.focusTrap = new Et(), this.picker.addEventListener("data:ready", () => {
      this.focusTrap.activate(this.picker.el), this.picker.setInitialFocus();
    }), this.options.hideOnEmojiSelect && this.picker.addEventListener("emoji:select", () => {
      var o;
      this.close(), (o = this.triggerElement) == null || o.focus();
    }), this.options.hideOnClickOutside && (this.onDocumentClick = this.onDocumentClick.bind(this), document.addEventListener("click", this.onDocumentClick)), this.options.hideOnEscape && (this.handleKeydown = this.handleKeydown.bind(this), this.popupEl.addEventListener("keydown", this.handleKeydown)), this.referenceElement = this.options.referenceElement, this.triggerElement = this.options.triggerElement;
  }
  addEventListener(e, n) {
    this.externalEvents.on(e, n), this.picker.addEventListener(e, n);
  }
  removeEventListener(e, n) {
    this.externalEvents.off(e, n), this.picker.removeEventListener(e, n);
  }
  handleKeydown(e) {
    var n;
    e.key === "Escape" && (this.close(), (n = this.triggerElement) == null || n.focus());
  }
  async destroy() {
    this.isOpen && await this.close(), document.removeEventListener("click", this.onDocumentClick), this.picker.destroy(), this.externalEvents.removeAll();
  }
  toggle(e) {
    return this.isOpen ? this.close() : this.open(e);
  }
  async open({ triggerElement: e, referenceElement: n } = {}) {
    this.isOpen || (e && (this.triggerElement = e), n && (this.referenceElement = n), await this.initiateOpenStateChange(!0), this.popupEl.style.opacity = "0", this.options.rootElement.appendChild(this.popupEl), await this.setPosition(), this.picker.reset(!1), await this.animatePopup(!0), await this.animateCloseButton(!0), this.picker.setInitialFocus(), this.externalEvents.emit("picker:open"));
  }
  async close() {
    var e;
    !this.isOpen || (await this.initiateOpenStateChange(!1), await this.animateCloseButton(!1), await this.animatePopup(!1), this.popupEl.remove(), this.picker.reset(), (e = this.positionCleanup) == null || e.call(this), this.focusTrap.deactivate(), this.externalEvents.emit("picker:close"));
  }
  getRunningAnimations() {
    return this.picker.el.getAnimations().filter((e) => e.playState === "running");
  }
  async setPosition() {
    var e;
    (e = this.positionCleanup) == null || e.call(this), this.positionCleanup = await ee(
      this,
      this.popupEl,
      this.referenceElement,
      this.options.position
    );
  }
  awaitPendingAnimations() {
    return Promise.all(this.getRunningAnimations().map((e) => e.finished));
  }
  onDocumentClick(e) {
    var o;
    const n = e.target, i = (o = this.triggerElement) == null ? void 0 : o.contains(n);
    this.isOpen && !this.picker.isPickerClick(e) && !i && this.close();
  }
  animatePopup(e) {
    return Z(
      this.popupEl,
      {
        opacity: [0, 1],
        transform: ["scale(0.9)", "scale(1)"]
      },
      {
        duration: 150,
        id: e ? "show-picker" : "hide-picker",
        easing: "ease-in-out",
        direction: e ? "normal" : "reverse",
        fill: "both"
      },
      this.options
    );
  }
  animateCloseButton(e) {
    if (this.closeButton)
      return Z(
        this.closeButton,
        {
          opacity: [0, 1]
        },
        {
          duration: 25,
          id: e ? "show-close" : "hide-close",
          easing: "ease-in-out",
          direction: e ? "normal" : "reverse",
          fill: "both"
        },
        this.options
      );
  }
  async initiateOpenStateChange(e) {
    this.isOpen = e, await this.awaitPendingAnimations();
  }
}
const ae = `.popupContainer{display:flex;flex-direction:column;position:absolute}.popupContainer .closeButton{position:absolute;opacity:0;background:transparent;border:none;z-index:1;right:0;top:0;cursor:pointer;padding:4px;align-self:flex-end;transform:translate(50%,-50%);background:#999999;width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;border-radius:50%}.popupContainer .closeButton:hover{background:var(--accent-color)}.popupContainer .closeButton svg{fill:#fff;width:1.25rem;height:1.25rem}
`, fe = Ct();
function de(t, e) {
  return fe(ae), new le({
    autoFocus: "auto",
    ...t
  }, e);
}
export {
  le as PopupPickerController,
  de as createPopup
};
