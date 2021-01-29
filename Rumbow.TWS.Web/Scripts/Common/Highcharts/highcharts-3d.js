﻿/*
 Highcharts JS v4.2.5 (2016-05-06)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function (d) { typeof module === "object" && module.exports ? module.exports = d : d(Highcharts) })(function (d) {
    function o(c, b, a) {
        var e, f, g = b.options.chart.options3d, d = !1, j = b.scale3d || 1; a ? (d = b.inverted, a = b.plotWidth / 2, b = b.plotHeight / 2, e = g.depth / 2, f = s(g.depth, 1) * s(g.viewDistance, 0)) : (a = b.plotLeft + b.plotWidth / 2, b = b.plotTop + b.plotHeight / 2, e = g.depth / 2, f = s(g.depth, 1) * s(g.viewDistance, 0)); var k = [], i = a, m = b, x = e, y = f, a = B * (d ? g.beta : -g.beta), g = B * (d ? -g.alpha : g.alpha), q = r(a), p = l(a), n = r(g), u = l(g), t, z, v, w, C, o; A(c, function (a) {
            t =
            (d ? a.y : a.x) - i; z = (d ? a.x : a.y) - m; v = (a.z || 0) - x; w = p * t - q * v; C = -q * n * t + u * z - p * n * v; o = q * u * t + n * z + p * u * v; y > 0 && y < Number.POSITIVE_INFINITY && (w *= y / (o + x + y), C *= y / (o + x + y)); w = w * j + i; C = C * j + m; o = o * j + x; k.push({ x: d ? C : w, y: d ? w : C, z: o })
        }); return k
    } function D(c) { return c !== void 0 && c !== null } function I(c) { var b = 0, a, e; for (a = 0; a < c.length; a++) e = (a + 1) % c.length, b += c[a].x * c[e].y - c[e].x * c[a].y; return b / 2 } function E(c) { var b = 0, a; for (a = 0; a < c.length; a++) b += c[a].z; return c.length ? b / c.length : 0 } function u(c, b, a, e, f, g, d, j) {
        var k = []; g > f && g - f > n / 2 +
        1.0E-4 ? (k = k.concat(u(c, b, a, e, f, f + n / 2, d, j)), k = k.concat(u(c, b, a, e, f + n / 2, g, d, j))) : g < f && f - g > n / 2 + 1.0E-4 ? (k = k.concat(u(c, b, a, e, f, f - n / 2, d, j)), k = k.concat(u(c, b, a, e, f - n / 2, g, d, j))) : (k = g - f, k = ["C", c + a * l(f) - a * F * k * r(f) + d, b + e * r(f) + e * F * k * l(f) + j, c + a * l(g) + a * F * k * r(g) + d, b + e * r(g) - e * F * k * l(g) + j, c + a * l(g) + d, b + e * r(g) + j]); return k
    } function J(c) {
        if (this.chart.is3d()) {
            var b = this.chart.options.plotOptions.column.grouping; if (b !== void 0 && !b && this.group.zIndex !== void 0 && !this.zIndexSet) this.group.attr({ zIndex: this.group.zIndex * 10 }),
            this.zIndexSet = !0; var a = this.options, e = this.options.states; this.borderWidth = a.borderWidth = D(a.edgeWidth) ? a.edgeWidth : 1; d.each(this.data, function (b) { if (b.y !== null) b = b.pointAttr, this.borderColor = d.pick(a.edgeColor, b[""].fill), b[""].stroke = this.borderColor, b.hover.stroke = d.pick(e.hover.edgeColor, this.borderColor), b.select.stroke = d.pick(e.select.edgeColor, this.borderColor) })
        } c.apply(this, [].slice.call(arguments, 1))
    } var M = d.animObject, A = d.each, N = d.extend, O = d.inArray, G = d.merge, s = d.pick, K = d.wrap, n = Math.PI,
    B = n / 180, r = Math.sin, l = Math.cos, L = Math.round; d.perspective = o; var F = 4 * (Math.sqrt(2) - 1) / 3 / (n / 2); d.SVGRenderer.prototype.toLinePath = function (c, b) { var a = []; d.each(c, function (b) { a.push("L", b.x, b.y) }); c.length && (a[0] = "M", b && a.push("Z")); return a }; d.SVGRenderer.prototype.cuboid = function (c) {
        var b = this.g(), c = this.cuboidPath(c); b.front = this.path(c[0]).attr({ zIndex: c[3], "stroke-linejoin": "round" }).add(b); b.top = this.path(c[1]).attr({ zIndex: c[4], "stroke-linejoin": "round" }).add(b); b.side = this.path(c[2]).attr({
            zIndex: c[5],
            "stroke-linejoin": "round"
        }).add(b); b.fillSetter = function (a) { var b = d.Color(a).brighten(0.1).get(), c = d.Color(a).brighten(-0.1).get(); this.front.attr({ fill: a }); this.top.attr({ fill: b }); this.side.attr({ fill: c }); this.color = a; return this }; b.opacitySetter = function (a) { this.front.attr({ opacity: a }); this.top.attr({ opacity: a }); this.side.attr({ opacity: a }); return this }; b.attr = function (a) {
            if (a.shapeArgs || D(a.x)) a = this.renderer.cuboidPath(a.shapeArgs || a), this.front.attr({ d: a[0], zIndex: a[3] }), this.top.attr({
                d: a[1],
                zIndex: a[4]
            }), this.side.attr({ d: a[2], zIndex: a[5] }); else return d.SVGElement.prototype.attr.call(this, a); return this
        }; b.animate = function (a, b, c) {
            D(a.x) && D(a.y) ? (a = this.renderer.cuboidPath(a), this.front.attr({ zIndex: a[3] }).animate({ d: a[0] }, b, c), this.top.attr({ zIndex: a[4] }).animate({ d: a[1] }, b, c), this.side.attr({ zIndex: a[5] }).animate({ d: a[2] }, b, c), this.attr({ zIndex: -a[6] })) : a.opacity ? (this.front.animate(a, b, c), this.top.animate(a, b, c), this.side.animate(a, b, c)) : d.SVGElement.prototype.animate.call(this, a,
            b, c); return this
        }; b.destroy = function () { this.front.destroy(); this.top.destroy(); this.side.destroy(); return null }; b.attr({ zIndex: -c[6] }); return b
    }; d.SVGRenderer.prototype.cuboidPath = function (c) {
        function b(a) { return i[a] } var a = c.x, e = c.y, f = c.z, g = c.height, h = c.width, j = c.depth, k = d.map, i = [{ x: a, y: e, z: f }, { x: a + h, y: e, z: f }, { x: a + h, y: e + g, z: f }, { x: a, y: e + g, z: f }, { x: a, y: e + g, z: f + j }, { x: a + h, y: e + g, z: f + j }, { x: a + h, y: e, z: f + j }, { x: a, y: e, z: f + j }], i = o(i, d.charts[this.chartIndex], c.insidePlotArea), f = function (a, c) {
            var e = [], a = k(a, b),
            c = k(c, b); I(a) < 0 ? e = a : I(c) < 0 && (e = c); return e
        }, c = f([3, 2, 1, 0], [7, 6, 5, 4]), a = [4, 5, 2, 3], e = f([1, 6, 7, 0], a), f = f([1, 2, 5, 6], [0, 7, 4, 3]); return [this.toLinePath(c, !0), this.toLinePath(e, !0), this.toLinePath(f, !0), E(c), E(e), E(f), E(k(a, b)) * 9E9]
    }; d.SVGRenderer.prototype.arc3d = function (c) {
        function b(a) { var b = !1, c = {}, e; for (e in a) O(e, f) !== -1 && (c[e] = a[e], delete a[e], b = !0); return b ? c : !1 } var a = this.g(), e = a.renderer, f = "x,y,r,innerR,start,end".split(","), c = G(c); c.alpha *= B; c.beta *= B; a.top = e.path(); a.side1 = e.path(); a.side2 = e.path();
        a.inn = e.path(); a.out = e.path(); a.onAdd = function () { var b = a.parentGroup; a.top.add(a); a.out.add(b); a.inn.add(b); a.side1.add(b); a.side2.add(b) }; a.setPaths = function (b) { var c = a.renderer.arc3dPath(b), e = c.zTop * 100; a.attribs = b; a.top.attr({ d: c.top, zIndex: c.zTop }); a.inn.attr({ d: c.inn, zIndex: c.zInn }); a.out.attr({ d: c.out, zIndex: c.zOut }); a.side1.attr({ d: c.side1, zIndex: c.zSide1 }); a.side2.attr({ d: c.side2, zIndex: c.zSide2 }); a.zIndex = e; a.attr({ zIndex: e }); b.center && (a.top.setRadialReference(b.center), delete b.center) };
        a.setPaths(c); a.fillSetter = function (a) { var b = d.Color(a).brighten(-0.1).get(); this.fill = a; this.side1.attr({ fill: b }); this.side2.attr({ fill: b }); this.inn.attr({ fill: b }); this.out.attr({ fill: b }); this.top.attr({ fill: a }); return this }; A(["opacity", "translateX", "translateY", "visibility"], function (b) { a[b + "Setter"] = function (b, c) { a[c] = b; A(["out", "inn", "side1", "side2", "top"], function (e) { a[e].attr(c, b) }) } }); K(a, "attr", function (c, e, d) {
            var f; if (typeof e === "object" && (f = b(e))) N(a.attribs, f), a.setPaths(a.attribs); return c.call(this,
            e, d)
        }); K(a, "animate", function (a, c, e, d) { var f, m = this.attribs, l; delete c.center; delete c.z; delete c.depth; delete c.alpha; delete c.beta; e = M(s(e, this.renderer.globalAnimation)); if (e.duration && (c = G(c), f = b(c))) l = f, e.step = function (a, b) { function c(a) { return m[a] + (s(l[a], m[a]) - m[a]) * b.pos } b.elem.setPaths(G(m, { x: c("x"), y: c("y"), r: c("r"), innerR: c("innerR"), start: c("start"), end: c("end") })) }; return a.call(this, c, e, d) }); a.destroy = function () {
            this.top.destroy(); this.out.destroy(); this.inn.destroy(); this.side1.destroy();
            this.side2.destroy(); d.SVGElement.prototype.destroy.call(this)
        }; a.hide = function () { this.top.hide(); this.out.hide(); this.inn.hide(); this.side1.hide(); this.side2.hide() }; a.show = function () { this.top.show(); this.out.show(); this.inn.show(); this.side1.show(); this.side2.show() }; return a
    }; d.SVGRenderer.prototype.arc3dPath = function (c) {
        function b(a) { a %= 2 * n; a > n && (a = 2 * n - a); return a } var a = c.x, e = c.y, d = c.start, g = c.end - 1.0E-5, h = c.r, j = c.innerR, k = c.depth, i = c.alpha, m = c.beta, x = l(d), y = r(d), c = l(g), q = r(g), p = h * l(m); h *= l(i);
        var o = j * l(m), s = j * l(i), j = k * r(m), t = k * r(i), k = ["M", a + p * x, e + h * y], k = k.concat(u(a, e, p, h, d, g, 0, 0)), k = k.concat(["L", a + o * c, e + s * q]), k = k.concat(u(a, e, o, s, g, d, 0, 0)), k = k.concat(["Z"]), z = m > 0 ? n / 2 : 0, m = i > 0 ? 0 : n / 2, z = d > -z ? d : g > -z ? -z : d, v = g < n - m ? g : d < n - m ? n - m : g, w = 2 * n - m, i = ["M", a + p * l(z), e + h * r(z)], i = i.concat(u(a, e, p, h, z, v, 0, 0)); g > w && d < w ? (i = i.concat(["L", a + p * l(v) + j, e + h * r(v) + t]), i = i.concat(u(a, e, p, h, v, w, j, t)), i = i.concat(["L", a + p * l(w), e + h * r(w)]), i = i.concat(u(a, e, p, h, w, g, 0, 0)), i = i.concat(["L", a + p * l(g) + j, e + h * r(g) + t]), i = i.concat(u(a,
        e, p, h, g, w, j, t)), i = i.concat(["L", a + p * l(w), e + h * r(w)]), i = i.concat(u(a, e, p, h, w, v, 0, 0))) : g > n - m && d < n - m && (i = i.concat(["L", a + p * l(v) + j, e + h * r(v) + t]), i = i.concat(u(a, e, p, h, v, g, j, t)), i = i.concat(["L", a + p * l(g), e + h * r(g)]), i = i.concat(u(a, e, p, h, g, v, 0, 0))); i = i.concat(["L", a + p * l(v) + j, e + h * r(v) + t]); i = i.concat(u(a, e, p, h, v, z, j, t)); i = i.concat(["Z"]); m = ["M", a + o * x, e + s * y]; m = m.concat(u(a, e, o, s, d, g, 0, 0)); m = m.concat(["L", a + o * l(g) + j, e + s * r(g) + t]); m = m.concat(u(a, e, o, s, g, d, j, t)); m = m.concat(["Z"]); x = ["M", a + p * x, e + h * y, "L", a + p * x + j, e + h *
        y + t, "L", a + o * x + j, e + s * y + t, "L", a + o * x, e + s * y, "Z"]; a = ["M", a + p * c, e + h * q, "L", a + p * c + j, e + h * q + t, "L", a + o * c + j, e + s * q + t, "L", a + o * c, e + s * q, "Z"]; q = Math.atan2(t, -j); e = Math.abs(g + q); c = Math.abs(d + q); d = Math.abs((d + g) / 2 + q); e = b(e); c = b(c); d = b(d); d *= 1E5; g = c * 1E5; e *= 1E5; return { top: k, zTop: n * 1E5 + 1, out: i, zOut: Math.max(d, g, e), inn: m, zInn: Math.max(d, g, e), side1: x, zSide1: e * 0.99, side2: a, zSide2: g * 0.99 }
    }; d.Chart.prototype.is3d = function () { return this.options.chart.options3d && this.options.chart.options3d.enabled }; d.wrap(d.Chart.prototype,
    "getMargins", function (c) {
        var b = this.options.chart.options3d, a = Number.MAX_VALUE, e = -Number.MAX_VALUE, d = Number.MAX_VALUE, g = -Number.MAX_VALUE, h = this.plotLeft, j = this.plotWidth + h, k = this.plotTop, i = this.plotHeight + k, m = h + this.plotWidth / 2, l = k + this.plotHeight / 2, n = 1, q = []; c.apply(this, [].slice.call(arguments, 1)); if (this.is3d() && b.fitToPlot === !0) {
            this.scale3d = 1; q = [{ x: h, y: k, z: 0 }, { x: h, y: k, z: b.depth }]; for (b = 0; b < 2; b++) q.push({ x: j, y: q[b].y, z: q[b].z }); for (b = 0; b < 4; b++) q.push({ x: q[b].x, y: i, z: q[b].z }); q = o(q, this, !1); A(q,
            function (b) { a = Math.min(a, b.x); e = Math.max(e, b.x); d = Math.min(d, b.y); g = Math.max(g, b.y) }); h > a && (n = Math.min(n, 1 - Math.abs((h + m) / (a + m)) % 1)); j < e && (n = Math.min(n, (j - m) / (e - m))); k > d && (n = d < 0 ? Math.min(n, (k + l) / (-d + k + l)) : Math.min(n, 1 - (k + l) / (d + l) % 1)); i < g && (n = Math.min(n, Math.abs((i - l) / (g - l)))); this.scale3d = n
        }
    }); d.wrap(d.Chart.prototype, "isInsidePlot", function (c) { return this.is3d() || c.apply(this, [].slice.call(arguments, 1)) }); d.getOptions().chart.options3d = {
        enabled: !1, alpha: 0, beta: 0, depth: 100, fitToPlot: !0, viewDistance: 25,
        frame: { bottom: { size: 1, color: "rgba(255,255,255,0)" }, side: { size: 1, color: "rgba(255,255,255,0)" }, back: { size: 1, color: "rgba(255,255,255,0)" } }
    }; d.wrap(d.Chart.prototype, "init", function (c) { var b = [].slice.call(arguments, 1), a; if (b[0].chart && b[0].chart.options3d && b[0].chart.options3d.enabled) b[0].chart.options3d.alpha = (b[0].chart.options3d.alpha || 0) % 360, b[0].chart.options3d.beta = (b[0].chart.options3d.beta || 0) % 360, a = b[0].plotOptions || {}, a = a.pie || {}, a.borderColor = d.pick(a.borderColor, void 0); c.apply(this, b) });
    d.wrap(d.Chart.prototype, "setChartSize", function (c) { c.apply(this, [].slice.call(arguments, 1)); if (this.is3d()) { var b = this.inverted, a = this.clipBox, e = this.margin; a[b ? "y" : "x"] = -(e[3] || 0); a[b ? "x" : "y"] = -(e[0] || 0); a[b ? "height" : "width"] = this.chartWidth + (e[3] || 0) + (e[1] || 0); a[b ? "width" : "height"] = this.chartHeight + (e[0] || 0) + (e[2] || 0) } }); d.wrap(d.Chart.prototype, "redraw", function (c) { if (this.is3d()) this.isDirtyBox = !0; c.apply(this, [].slice.call(arguments, 1)) }); d.wrap(d.Chart.prototype, "renderSeries", function (c) {
        var b =
        this.series.length; if (this.is3d()) for (; b--;) c = this.series[b], c.translate(), c.render(); else c.call(this)
    }); d.Chart.prototype.retrieveStacks = function (c) { var b = this.series, a = {}, e, f = 1; d.each(this.series, function (d) { e = s(d.options.stack, c ? 0 : b.length - 1 - d.index); a[e] ? a[e].series.push(d) : (a[e] = { series: [d], position: f }, f++) }); a.totalStacks = f + 1; return a }; d.wrap(d.Axis.prototype, "setOptions", function (c, b) {
        var a; c.call(this, b); if (this.chart.is3d()) a = this.options, a.tickWidth = d.pick(a.tickWidth, 0), a.gridLineWidth =
        d.pick(a.gridLineWidth, 1)
    }); d.wrap(d.Axis.prototype, "render", function (c) {
        c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
            var b = this.chart, a = b.renderer, d = b.options.chart.options3d, f = d.frame, g = f.bottom, h = f.back, f = f.side, j = d.depth, k = this.height, i = this.width, m = this.left, l = this.top; if (!this.isZAxis) this.horiz ? (h = { x: m, y: l + (b.xAxis[0].opposite ? -g.size : k), z: 0, width: i, height: g.size, depth: j, insidePlotArea: !1 }, this.bottomFrame ? this.bottomFrame.animate(h) : this.bottomFrame = a.cuboid(h).attr({
                fill: g.color,
                zIndex: b.yAxis[0].reversed && d.alpha > 0 ? 4 : -1
            }).css({ stroke: g.color }).add()) : (d = { x: m + (b.yAxis[0].opposite ? 0 : -f.size), y: l + (b.xAxis[0].opposite ? -g.size : 0), z: j, width: i + f.size, height: k + g.size, depth: h.size, insidePlotArea: !1 }, this.backFrame ? this.backFrame.animate(d) : this.backFrame = a.cuboid(d).attr({ fill: h.color, zIndex: -3 }).css({ stroke: h.color }).add(), b = { x: m + (b.yAxis[0].opposite ? i : -f.size), y: l + (b.xAxis[0].opposite ? -g.size : 0), z: 0, width: f.size, height: k + g.size, depth: j, insidePlotArea: !1 }, this.sideFrame ? this.sideFrame.animate(b) :
            this.sideFrame = a.cuboid(b).attr({ fill: f.color, zIndex: -2 }).css({ stroke: f.color }).add())
        }
    }); d.wrap(d.Axis.prototype, "getPlotLinePath", function (c) {
        var b = c.apply(this, [].slice.call(arguments, 1)); if (!this.chart.is3d()) return b; if (b === null) return b; var a = this.chart, d = a.options.chart.options3d, a = this.isZAxis ? a.plotWidth : d.depth, d = this.opposite; this.horiz && (d = !d); b = [this.swapZ({ x: b[1], y: b[2], z: d ? a : 0 }), this.swapZ({ x: b[1], y: b[2], z: a }), this.swapZ({ x: b[4], y: b[5], z: a }), this.swapZ({ x: b[4], y: b[5], z: d ? 0 : a })]; b = o(b,
        this.chart, !1); return b = this.chart.renderer.toLinePath(b, !1)
    }); d.wrap(d.Axis.prototype, "getLinePath", function (c) { return this.chart.is3d() ? [] : c.apply(this, [].slice.call(arguments, 1)) }); d.wrap(d.Axis.prototype, "getPlotBandPath", function (c) { if (!this.chart.is3d()) return c.apply(this, [].slice.call(arguments, 1)); var b = arguments, a = b[1], b = this.getPlotLinePath(b[2]); (a = this.getPlotLinePath(a)) && b ? a.push("L", b[10], b[11], "L", b[7], b[8], "L", b[4], b[5], "L", b[1], b[2]) : a = null; return a }); d.wrap(d.Tick.prototype, "getMarkPath",
    function (c) { var b = c.apply(this, [].slice.call(arguments, 1)); if (!this.axis.chart.is3d()) return b; b = [this.axis.swapZ({ x: b[1], y: b[2], z: 0 }), this.axis.swapZ({ x: b[4], y: b[5], z: 0 })]; b = o(b, this.axis.chart, !1); return b = ["M", b[0].x, b[0].y, "L", b[1].x, b[1].y] }); d.wrap(d.Tick.prototype, "getLabelPosition", function (c) {
        var b = c.apply(this, [].slice.call(arguments, 1)); if (!this.axis.chart.is3d()) return b; var a = o([this.axis.swapZ({ x: b.x, y: b.y, z: 0 })], this.axis.chart, !1)[0]; a.x -= !this.axis.horiz && this.axis.opposite ? this.axis.transA :
        0; a.old = b; return a
    }); d.wrap(d.Tick.prototype, "handleOverflow", function (c, b) { if (this.axis.chart.is3d()) b = b.old; return c.call(this, b) }); d.wrap(d.Axis.prototype, "getTitlePosition", function (c) { var b = this.chart.is3d(), a, d; if (b) d = this.axisTitleMargin, this.axisTitleMargin = 0; a = c.apply(this, [].slice.call(arguments, 1)); if (b) a = o([this.swapZ({ x: a.x, y: a.y, z: 0 })], this.chart, !1)[0], a[this.horiz ? "y" : "x"] += (this.horiz ? 1 : -1) * (this.opposite ? -1 : 1) * d, this.axisTitleMargin = d; return a }); d.wrap(d.Axis.prototype, "drawCrosshair",
    function (c) { var b = arguments; this.chart.is3d() && b[2] && (b[2] = { plotX: b[2].plotXold || b[2].plotX, plotY: b[2].plotYold || b[2].plotY }); c.apply(this, [].slice.call(b, 1)) }); d.Axis.prototype.swapZ = function (c, b) { if (this.isZAxis) { var a = b ? 0 : this.chart.plotLeft, d = this.chart; return { x: a + (d.yAxis[0].opposite ? c.z : d.xAxis[0].width - c.z), y: c.y, z: c.x - a } } return c }; var H = d.ZAxis = function () { this.isZAxis = !0; this.init.apply(this, arguments) }; d.extend(H.prototype, d.Axis.prototype); d.extend(H.prototype, {
        setOptions: function (c) {
            c =
            d.merge({ offset: 0, lineWidth: 0 }, c); d.Axis.prototype.setOptions.call(this, c); this.coll = "zAxis"
        }, setAxisSize: function () { d.Axis.prototype.setAxisSize.call(this); this.width = this.len = this.chart.options.chart.options3d.depth; this.right = this.chart.chartWidth - this.width - this.left }, getSeriesExtremes: function () {
            var c = this, b = c.chart; c.hasVisibleSeries = !1; c.dataMin = c.dataMax = c.ignoreMinPadding = c.ignoreMaxPadding = null; c.buildStacks && c.buildStacks(); d.each(c.series, function (a) {
                if (a.visible || !b.options.chart.ignoreHiddenSeries) if (c.hasVisibleSeries =
                !0, a = a.zData, a.length) c.dataMin = Math.min(s(c.dataMin, a[0]), Math.min.apply(null, a)), c.dataMax = Math.max(s(c.dataMax, a[0]), Math.max.apply(null, a))
            })
        }
    }); d.wrap(d.Chart.prototype, "getAxes", function (c) { var b = this, a = this.options, a = a.zAxis = d.splat(a.zAxis || {}); c.call(this); if (b.is3d()) this.zAxis = [], d.each(a, function (a, c) { a.index = c; a.isX = !0; (new H(b, a)).setScale() }) }); d.wrap(d.seriesTypes.column.prototype, "translate", function (c) {
        c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
            var b = this.chart,
            a = this.options, e = a.depth || 25, f = (a.stacking ? a.stack || 0 : this._i) * (e + (a.groupZPadding || 1)); a.grouping !== !1 && (f = 0); f += a.groupZPadding || 1; d.each(this.data, function (a) { if (a.y !== null) { var c = a.shapeArgs, d = a.tooltipPos; a.shapeType = "cuboid"; c.z = f; c.depth = e; c.insidePlotArea = !0; d = o([{ x: d[0], y: d[1], z: f }], b, !0)[0]; a.tooltipPos = [d.x, d.y] } }); this.z = f
        }
    }); d.wrap(d.seriesTypes.column.prototype, "animate", function (c) {
        if (this.chart.is3d()) {
            var b = arguments[1], a = this.yAxis, e = this, f = this.yAxis.reversed; if (d.svg) b ? d.each(e.data,
            function (b) { if (b.y !== null && (b.height = b.shapeArgs.height, b.shapey = b.shapeArgs.y, b.shapeArgs.height = 1, !f)) b.shapeArgs.y = b.stackY ? b.plotY + a.translate(b.stackY) : b.plotY + (b.negative ? -b.height : b.height) }) : (d.each(e.data, function (a) { if (a.y !== null) a.shapeArgs.height = a.height, a.shapeArgs.y = a.shapey, a.graphic && a.graphic.animate(a.shapeArgs, e.options.animation) }), this.drawDataLabels(), e.animate = null)
        } else c.apply(this, [].slice.call(arguments, 1))
    }); d.wrap(d.seriesTypes.column.prototype, "init", function (c) {
        c.apply(this,
        [].slice.call(arguments, 1)); if (this.chart.is3d()) { var b = this.options, a = b.grouping, d = b.stacking, f = s(this.yAxis.options.reversedStacks, !0), g = 0; if (a === void 0 || a) { a = this.chart.retrieveStacks(d); g = b.stack || 0; for (d = 0; d < a[g].series.length; d++) if (a[g].series[d] === this) break; g = 10 * (a.totalStacks - a[g].position) + (f ? d : -d); this.xAxis.reversed || (g = a.totalStacks * 10 - g) } b.zIndex = g }
    }); d.wrap(d.Series.prototype, "alignDataLabel", function (c) {
        if (this.chart.is3d() && (this.type === "column" || this.type === "columnrange")) {
            var b =
            arguments[4], a = { x: b.x, y: b.y, z: this.z }, a = o([a], this.chart, !0)[0]; b.x = a.x; b.y = a.y
        } c.apply(this, [].slice.call(arguments, 1))
    }); d.seriesTypes.columnrange && d.wrap(d.seriesTypes.columnrange.prototype, "drawPoints", J); d.wrap(d.seriesTypes.column.prototype, "drawPoints", J); d.wrap(d.seriesTypes.pie.prototype, "translate", function (c) {
        c.apply(this, [].slice.call(arguments, 1)); if (this.chart.is3d()) {
            var b = this, a = b.options, d = a.depth || 0, f = b.chart.options.chart.options3d, g = f.alpha, h = f.beta, j = a.stacking ? (a.stack || 0) * d :
            b._i * d; j += d / 2; a.grouping !== !1 && (j = 0); A(b.data, function (c) { var f = c.shapeArgs; c.shapeType = "arc3d"; f.z = j; f.depth = d * 0.75; f.alpha = g; f.beta = h; f.center = b.center; f = (f.end + f.start) / 2; c.slicedTranslation = { translateX: L(l(f) * a.slicedOffset * l(g * B)), translateY: L(r(f) * a.slicedOffset * l(g * B)) } })
        }
    }); d.wrap(d.seriesTypes.pie.prototype.pointClass.prototype, "haloPath", function (c) { var b = arguments; return this.series.chart.is3d() ? [] : c.call(this, b[1]) }); d.wrap(d.seriesTypes.pie.prototype, "drawPoints", function (c) {
        var b = this.options,
        a = b.states; if (this.chart.is3d()) this.borderWidth = b.borderWidth = b.edgeWidth || 1, this.borderColor = b.edgeColor = d.pick(b.edgeColor, b.borderColor, void 0), a.hover.borderColor = d.pick(a.hover.edgeColor, this.borderColor), a.hover.borderWidth = d.pick(a.hover.edgeWidth, this.borderWidth), a.select.borderColor = d.pick(a.select.edgeColor, this.borderColor), a.select.borderWidth = d.pick(a.select.edgeWidth, this.borderWidth), A(this.data, function (b) {
            var c = b.pointAttr; c[""].stroke = b.series.borderColor || b.color; c[""]["stroke-width"] =
            b.series.borderWidth; c.hover.stroke = a.hover.borderColor; c.hover["stroke-width"] = a.hover.borderWidth; c.select.stroke = a.select.borderColor; c.select["stroke-width"] = a.select.borderWidth
        }); c.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && A(this.points, function (a) { var b = a.graphic; if (b) b[a.y && a.visible ? "show" : "hide"]() })
    }); d.wrap(d.seriesTypes.pie.prototype, "drawDataLabels", function (c) {
        if (this.chart.is3d()) {
            var b = this.chart.options.chart.options3d; A(this.data, function (a) {
                var c = a.shapeArgs, d =
                c.r, g = (c.beta || b.beta) * B, h = (c.start + c.end) / 2, j = a.labelPos, k = -d * (1 - l((c.alpha || b.alpha) * B)) * r(h), i = d * (l(g) - 1) * l(h); A([0, 2, 4], function (a) { j[a] += i; j[a + 1] += k })
            })
        } c.apply(this, [].slice.call(arguments, 1))
    }); d.wrap(d.seriesTypes.pie.prototype, "addPoint", function (c) { c.apply(this, [].slice.call(arguments, 1)); this.chart.is3d() && this.update(this.userOptions, !0) }); d.wrap(d.seriesTypes.pie.prototype, "animate", function (c) {
        if (this.chart.is3d()) {
            var b = arguments[1], a = this.options.animation, e = this.center, f = this.group,
            g = this.markerGroup; if (d.svg) if (a === !0 && (a = {}), b) { if (f.oldtranslateX = f.translateX, f.oldtranslateY = f.translateY, b = { translateX: e[0], translateY: e[1], scaleX: 0.001, scaleY: 0.001 }, f.attr(b), g) g.attrSetters = f.attrSetters, g.attr(b) } else b = { translateX: f.oldtranslateX, translateY: f.oldtranslateY, scaleX: 1, scaleY: 1 }, f.animate(b, a), g && g.animate(b, a), this.animate = null
        } else c.apply(this, [].slice.call(arguments, 1))
    }); d.wrap(d.seriesTypes.scatter.prototype, "translate", function (c) {
        c.apply(this, [].slice.call(arguments,
        1)); if (this.chart.is3d()) { var b = this.chart, a = d.pick(this.zAxis, b.options.zAxis[0]), e = [], f, g, h; for (h = 0; h < this.data.length; h++) f = this.data[h], g = a.isLog && a.val2lin ? a.val2lin(f.z) : f.z, f.plotZ = a.translate(g), f.isInside = f.isInside ? g >= a.min && g <= a.max : !1, e.push({ x: f.plotX, y: f.plotY, z: f.plotZ }); b = o(e, b, !0); for (h = 0; h < this.data.length; h++) f = this.data[h], a = b[h], f.plotXold = f.plotX, f.plotYold = f.plotY, f.plotX = a.x, f.plotY = a.y, f.plotZ = a.z }
    }); d.wrap(d.seriesTypes.scatter.prototype, "init", function (c, b, a) {
        if (b.is3d()) this.axisTypes =
        ["xAxis", "yAxis", "zAxis"], this.pointArrayMap = ["x", "y", "z"], this.parallelArrays = ["x", "y", "z"], this.directTouch = !0; c = c.apply(this, [b, a]); if (this.chart.is3d()) this.tooltipOptions.pointFormat = this.userOptions.tooltip ? this.userOptions.tooltip.pointFormat || "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>" : "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>z: <b>{point.z}</b><br/>"; return c
    }); if (d.VMLRenderer) d.setOptions({ animate: !1 }), d.VMLRenderer.prototype.cuboid = d.SVGRenderer.prototype.cuboid,
    d.VMLRenderer.prototype.cuboidPath = d.SVGRenderer.prototype.cuboidPath, d.VMLRenderer.prototype.toLinePath = d.SVGRenderer.prototype.toLinePath, d.VMLRenderer.prototype.createElement3D = d.SVGRenderer.prototype.createElement3D, d.VMLRenderer.prototype.arc3d = function (c) { c = d.SVGRenderer.prototype.arc3d.call(this, c); c.css({ zIndex: c.zIndex }); return c }, d.VMLRenderer.prototype.arc3dPath = d.SVGRenderer.prototype.arc3dPath, d.wrap(d.Axis.prototype, "render", function (c) {
        c.apply(this, [].slice.call(arguments, 1)); this.sideFrame &&
        (this.sideFrame.css({ zIndex: 0 }), this.sideFrame.front.attr({ fill: this.sideFrame.color })); this.bottomFrame && (this.bottomFrame.css({ zIndex: 1 }), this.bottomFrame.front.attr({ fill: this.bottomFrame.color })); this.backFrame && (this.backFrame.css({ zIndex: 0 }), this.backFrame.front.attr({ fill: this.backFrame.color }))
    })
});