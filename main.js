// node_modules/@xterm/xterm/css/xterm.css
var xterm_default = `/**
 * Copyright (c) 2014 The xterm.js authors. All rights reserved.
 * Copyright (c) 2012-2013, Christopher Jeffrey (MIT License)
 * https://github.com/chjj/term.js
 * @license MIT
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Originally forked from (with the author's permission):
 *   Fabrice Bellard's javascript vt100 for jslinux:
 *   http://bellard.org/jslinux/
 *   Copyright (c) 2011 Fabrice Bellard
 *   The original design remains. The terminal itself
 *   has been extended to include xterm CSI codes, among
 *   other features.
 */

/**
 *  Default styles for xterm.js
 */

.xterm {
    cursor: text;
    position: relative;
    user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
}

.xterm.focus,
.xterm:focus {
    outline: none;
}

.xterm .xterm-helpers {
    position: absolute;
    top: 0;
    /**
     * The z-index of the helpers must be higher than the canvases in order for
     * IMEs to appear on top.
     */
    z-index: 5;
}

.xterm .xterm-helper-textarea {
    padding: 0;
    border: 0;
    margin: 0;
    /* Move textarea out of the screen to the far left, so that the cursor is not visible */
    position: absolute;
    opacity: 0;
    left: -9999em;
    top: 0;
    width: 0;
    height: 0;
    z-index: -5;
    /** Prevent wrapping so the IME appears against the textarea at the correct position */
    white-space: nowrap;
    overflow: hidden;
    resize: none;
}

.xterm .composition-view {
    /* TODO: Composition position got messed up somewhere */
    background: #000;
    color: #FFF;
    display: none;
    position: absolute;
    white-space: nowrap;
    z-index: 1;
}

.xterm .composition-view.active {
    display: block;
}

.xterm .xterm-viewport {
    /* On OS X this is required in order for the scroll bar to appear fully opaque */
    background-color: #000;
    overflow-y: scroll;
    cursor: default;
    position: absolute;
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
}

.xterm .xterm-screen {
    position: relative;
}

.xterm .xterm-screen canvas {
    position: absolute;
    left: 0;
    top: 0;
}

.xterm-char-measure-element {
    display: inline-block;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: -9999em;
    line-height: normal;
}

.xterm.enable-mouse-events {
    /* When mouse events are enabled (eg. tmux), revert to the standard pointer cursor */
    cursor: default;
}

.xterm.xterm-cursor-pointer,
.xterm .xterm-cursor-pointer {
    cursor: pointer;
}

.xterm.column-select.focus {
    /* Column selection mode */
    cursor: crosshair;
}

.xterm .xterm-accessibility:not(.debug),
.xterm .xterm-message {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    color: transparent;
    pointer-events: none;
}

.xterm .xterm-accessibility-tree:not(.debug) *::selection {
  color: transparent;
}

.xterm .xterm-accessibility-tree {
  font-family: monospace;
  user-select: text;
  white-space: pre;
}

.xterm .xterm-accessibility-tree > div {
  transform-origin: left;
  width: fit-content;
}

.xterm .live-region {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

.xterm-dim {
    /* Dim should not apply to background, so the opacity of the foreground color is applied
     * explicitly in the generated class and reset to 1 here */
    opacity: 1 !important;
}

.xterm-underline-1 { text-decoration: underline; }
.xterm-underline-2 { text-decoration: double underline; }
.xterm-underline-3 { text-decoration: wavy underline; }
.xterm-underline-4 { text-decoration: dotted underline; }
.xterm-underline-5 { text-decoration: dashed underline; }

.xterm-overline {
    text-decoration: overline;
}

.xterm-overline.xterm-underline-1 { text-decoration: overline underline; }
.xterm-overline.xterm-underline-2 { text-decoration: overline double underline; }
.xterm-overline.xterm-underline-3 { text-decoration: overline wavy underline; }
.xterm-overline.xterm-underline-4 { text-decoration: overline dotted underline; }
.xterm-overline.xterm-underline-5 { text-decoration: overline dashed underline; }

.xterm-strikethrough {
    text-decoration: line-through;
}

.xterm-screen .xterm-decoration-container .xterm-decoration {
	z-index: 6;
	position: absolute;
}

.xterm-screen .xterm-decoration-container .xterm-decoration.xterm-decoration-top-layer {
	z-index: 7;
}

.xterm-decoration-overview-ruler {
    z-index: 8;
    position: absolute;
    top: 0;
    right: 0;
    pointer-events: none;
}

.xterm-decoration-top {
    z-index: 2;
    position: relative;
}



/* Derived from vs/base/browser/ui/scrollbar/media/scrollbar.css */

/* xterm.js customization: Override xterm's cursor style */
.xterm .xterm-scrollable-element > .scrollbar {
    cursor: default;
}

/* Arrows */
.xterm .xterm-scrollable-element > .scrollbar > .scra {
	cursor: pointer;
	font-size: 11px !important;
}

.xterm .xterm-scrollable-element > .visible {
	opacity: 1;

	/* Background rule added for IE9 - to allow clicks on dom node */
	background:rgba(0,0,0,0);

	transition: opacity 100ms linear;
	/* In front of peek view */
	z-index: 11;
}
.xterm .xterm-scrollable-element > .invisible {
	opacity: 0;
	pointer-events: none;
}
.xterm .xterm-scrollable-element > .invisible.fade {
	transition: opacity 800ms linear;
}

/* Scrollable Content Inset Shadow */
.xterm .xterm-scrollable-element > .shadow {
	position: absolute;
	display: none;
}
.xterm .xterm-scrollable-element > .shadow.top {
	display: block;
	top: 0;
	left: 3px;
	height: 3px;
	width: 100%;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 0 6px 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.left {
	display: block;
	top: 3px;
	left: 0;
	height: 100%;
	width: 3px;
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
.xterm .xterm-scrollable-element > .shadow.top-left-corner {
	display: block;
	top: 0;
	left: 0;
	height: 3px;
	width: 3px;
}
.xterm .xterm-scrollable-element > .shadow.top.left {
	box-shadow: var(--vscode-scrollbar-shadow, #000) 6px 0 6px -6px inset;
}
`;

// src/styles.ts
var XTERM_CSS = xterm_default;
var PLUGIN_CSS = `
.sk-term-wrap {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #1e1e1e;
}
.sk-term-xterm {
  flex: 1 1 auto;
  min-height: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.sk-term-xterm .xterm {
  width: 100%;
  height: 100%;
  padding: 0;
}
.sk-term-xterm .xterm .xterm-viewport {
  background-color: #1e1e1e !important;
}
`;
function injectStyles() {
  const STYLE_ID = "sk-terminal-style";
  if (document.getElementById(STYLE_ID)) return;
  const s15 = document.createElement("style");
  s15.id = STYLE_ID;
  s15.textContent = XTERM_CSS + "\n" + PLUGIN_CSS;
  document.head.appendChild(s15);
}

// node_modules/@xterm/xterm/lib/xterm.mjs
var zs = Object.defineProperty;
var Rl = Object.getOwnPropertyDescriptor;
var Ll = (s15, t) => {
  for (var e in t) zs(s15, e, { get: t[e], enumerable: true });
};
var M = (s15, t, e, i8) => {
  for (var r5 = i8 > 1 ? void 0 : i8 ? Rl(t, e) : t, n2 = s15.length - 1, o; n2 >= 0; n2--) (o = s15[n2]) && (r5 = (i8 ? o(t, e, r5) : o(r5)) || r5);
  return i8 && r5 && zs(t, e, r5), r5;
};
var S = (s15, t) => (e, i8) => t(e, i8, s15);
var Gs = "Terminal input";
var mi = { get: () => Gs, set: (s15) => Gs = s15 };
var $s = "Too much output to announce, navigate to rows manually to read";
var _i = { get: () => $s, set: (s15) => $s = s15 };
function Al(s15) {
  return s15.replace(/\r?\n/g, "\r");
}
function kl(s15, t) {
  return t ? "\x1B[200~" + s15 + "\x1B[201~" : s15;
}
function Vs(s15, t) {
  s15.clipboardData && s15.clipboardData.setData("text/plain", t.selectionText), s15.preventDefault();
}
function qs(s15, t, e, i8) {
  if (s15.stopPropagation(), s15.clipboardData) {
    let r5 = s15.clipboardData.getData("text/plain");
    Cn(r5, t, e, i8);
  }
}
function Cn(s15, t, e, i8) {
  s15 = Al(s15), s15 = kl(s15, e.decPrivateModes.bracketedPasteMode && i8.rawOptions.ignoreBracketedPasteMode !== true), e.triggerDataEvent(s15, true), t.value = "";
}
function Mn(s15, t, e) {
  let i8 = e.getBoundingClientRect(), r5 = s15.clientX - i8.left - 10, n2 = s15.clientY - i8.top - 10;
  t.style.width = "20px", t.style.height = "20px", t.style.left = `${r5}px`, t.style.top = `${n2}px`, t.style.zIndex = "1000", t.focus();
}
function Pn(s15, t, e, i8, r5) {
  Mn(s15, t, e), r5 && i8.rightClickSelect(s15), t.value = i8.selectionText, t.select();
}
function Ce(s15) {
  return s15 > 65535 ? (s15 -= 65536, String.fromCharCode((s15 >> 10) + 55296) + String.fromCharCode(s15 % 1024 + 56320)) : String.fromCharCode(s15);
}
function It(s15, t = 0, e = s15.length) {
  let i8 = "";
  for (let r5 = t; r5 < e; ++r5) {
    let n2 = s15[r5];
    n2 > 65535 ? (n2 -= 65536, i8 += String.fromCharCode((n2 >> 10) + 55296) + String.fromCharCode(n2 % 1024 + 56320)) : i8 += String.fromCharCode(n2);
  }
  return i8;
}
var er = class {
  constructor() {
    this._interim = 0;
  }
  clear() {
    this._interim = 0;
  }
  decode(t, e) {
    let i8 = t.length;
    if (!i8) return 0;
    let r5 = 0, n2 = 0;
    if (this._interim) {
      let o = t.charCodeAt(n2++);
      56320 <= o && o <= 57343 ? e[r5++] = (this._interim - 55296) * 1024 + o - 56320 + 65536 : (e[r5++] = this._interim, e[r5++] = o), this._interim = 0;
    }
    for (let o = n2; o < i8; ++o) {
      let l2 = t.charCodeAt(o);
      if (55296 <= l2 && l2 <= 56319) {
        if (++o >= i8) return this._interim = l2, r5;
        let a = t.charCodeAt(o);
        56320 <= a && a <= 57343 ? e[r5++] = (l2 - 55296) * 1024 + a - 56320 + 65536 : (e[r5++] = l2, e[r5++] = a);
        continue;
      }
      l2 !== 65279 && (e[r5++] = l2);
    }
    return r5;
  }
};
var tr = class {
  constructor() {
    this.interim = new Uint8Array(3);
  }
  clear() {
    this.interim.fill(0);
  }
  decode(t, e) {
    let i8 = t.length;
    if (!i8) return 0;
    let r5 = 0, n2, o, l2, a, u2 = 0, h2 = 0;
    if (this.interim[0]) {
      let _4 = false, p2 = this.interim[0];
      p2 &= (p2 & 224) === 192 ? 31 : (p2 & 240) === 224 ? 15 : 7;
      let m2 = 0, f2;
      for (; (f2 = this.interim[++m2] & 63) && m2 < 4; ) p2 <<= 6, p2 |= f2;
      let A3 = (this.interim[0] & 224) === 192 ? 2 : (this.interim[0] & 240) === 224 ? 3 : 4, R4 = A3 - m2;
      for (; h2 < R4; ) {
        if (h2 >= i8) return 0;
        if (f2 = t[h2++], (f2 & 192) !== 128) {
          h2--, _4 = true;
          break;
        } else this.interim[m2++] = f2, p2 <<= 6, p2 |= f2 & 63;
      }
      _4 || (A3 === 2 ? p2 < 128 ? h2-- : e[r5++] = p2 : A3 === 3 ? p2 < 2048 || p2 >= 55296 && p2 <= 57343 || p2 === 65279 || (e[r5++] = p2) : p2 < 65536 || p2 > 1114111 || (e[r5++] = p2)), this.interim.fill(0);
    }
    let c2 = i8 - 4, d2 = h2;
    for (; d2 < i8; ) {
      for (; d2 < c2 && !((n2 = t[d2]) & 128) && !((o = t[d2 + 1]) & 128) && !((l2 = t[d2 + 2]) & 128) && !((a = t[d2 + 3]) & 128); ) e[r5++] = n2, e[r5++] = o, e[r5++] = l2, e[r5++] = a, d2 += 4;
      if (n2 = t[d2++], n2 < 128) e[r5++] = n2;
      else if ((n2 & 224) === 192) {
        if (d2 >= i8) return this.interim[0] = n2, r5;
        if (o = t[d2++], (o & 192) !== 128) {
          d2--;
          continue;
        }
        if (u2 = (n2 & 31) << 6 | o & 63, u2 < 128) {
          d2--;
          continue;
        }
        e[r5++] = u2;
      } else if ((n2 & 240) === 224) {
        if (d2 >= i8) return this.interim[0] = n2, r5;
        if (o = t[d2++], (o & 192) !== 128) {
          d2--;
          continue;
        }
        if (d2 >= i8) return this.interim[0] = n2, this.interim[1] = o, r5;
        if (l2 = t[d2++], (l2 & 192) !== 128) {
          d2--;
          continue;
        }
        if (u2 = (n2 & 15) << 12 | (o & 63) << 6 | l2 & 63, u2 < 2048 || u2 >= 55296 && u2 <= 57343 || u2 === 65279) continue;
        e[r5++] = u2;
      } else if ((n2 & 248) === 240) {
        if (d2 >= i8) return this.interim[0] = n2, r5;
        if (o = t[d2++], (o & 192) !== 128) {
          d2--;
          continue;
        }
        if (d2 >= i8) return this.interim[0] = n2, this.interim[1] = o, r5;
        if (l2 = t[d2++], (l2 & 192) !== 128) {
          d2--;
          continue;
        }
        if (d2 >= i8) return this.interim[0] = n2, this.interim[1] = o, this.interim[2] = l2, r5;
        if (a = t[d2++], (a & 192) !== 128) {
          d2--;
          continue;
        }
        if (u2 = (n2 & 7) << 18 | (o & 63) << 12 | (l2 & 63) << 6 | a & 63, u2 < 65536 || u2 > 1114111) continue;
        e[r5++] = u2;
      }
    }
    return r5;
  }
};
var ir = "";
var we = " ";
var De = class s {
  constructor() {
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
  }
  static toColorRGB(t) {
    return [t >>> 16 & 255, t >>> 8 & 255, t & 255];
  }
  static fromColorRGB(t) {
    return (t[0] & 255) << 16 | (t[1] & 255) << 8 | t[2] & 255;
  }
  clone() {
    let t = new s();
    return t.fg = this.fg, t.bg = this.bg, t.extended = this.extended.clone(), t;
  }
  isInverse() {
    return this.fg & 67108864;
  }
  isBold() {
    return this.fg & 134217728;
  }
  isUnderline() {
    return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
  }
  isBlink() {
    return this.fg & 536870912;
  }
  isInvisible() {
    return this.fg & 1073741824;
  }
  isItalic() {
    return this.bg & 67108864;
  }
  isDim() {
    return this.bg & 134217728;
  }
  isStrikethrough() {
    return this.fg & 2147483648;
  }
  isProtected() {
    return this.bg & 536870912;
  }
  isOverline() {
    return this.bg & 1073741824;
  }
  getFgColorMode() {
    return this.fg & 50331648;
  }
  getBgColorMode() {
    return this.bg & 50331648;
  }
  isFgRGB() {
    return (this.fg & 50331648) === 50331648;
  }
  isBgRGB() {
    return (this.bg & 50331648) === 50331648;
  }
  isFgPalette() {
    return (this.fg & 50331648) === 16777216 || (this.fg & 50331648) === 33554432;
  }
  isBgPalette() {
    return (this.bg & 50331648) === 16777216 || (this.bg & 50331648) === 33554432;
  }
  isFgDefault() {
    return (this.fg & 50331648) === 0;
  }
  isBgDefault() {
    return (this.bg & 50331648) === 0;
  }
  isAttributeDefault() {
    return this.fg === 0 && this.bg === 0;
  }
  getFgColor() {
    switch (this.fg & 50331648) {
      case 16777216:
      case 33554432:
        return this.fg & 255;
      case 50331648:
        return this.fg & 16777215;
      default:
        return -1;
    }
  }
  getBgColor() {
    switch (this.bg & 50331648) {
      case 16777216:
      case 33554432:
        return this.bg & 255;
      case 50331648:
        return this.bg & 16777215;
      default:
        return -1;
    }
  }
  hasExtendedAttrs() {
    return this.bg & 268435456;
  }
  updateExtended() {
    this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
  }
  getUnderlineColor() {
    if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
      case 16777216:
      case 33554432:
        return this.extended.underlineColor & 255;
      case 50331648:
        return this.extended.underlineColor & 16777215;
      default:
        return this.getFgColor();
    }
    return this.getFgColor();
  }
  getUnderlineColorMode() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
  }
  isUnderlineColorRGB() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 50331648 : this.isFgRGB();
  }
  isUnderlineColorPalette() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 16777216 || (this.extended.underlineColor & 50331648) === 33554432 : this.isFgPalette();
  }
  isUnderlineColorDefault() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 0 : this.isFgDefault();
  }
  getUnderlineStyle() {
    return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
  }
  getUnderlineVariantOffset() {
    return this.extended.underlineVariantOffset;
  }
};
var rt = class s2 {
  constructor(t = 0, e = 0) {
    this._ext = 0;
    this._urlId = 0;
    this._ext = t, this._urlId = e;
  }
  get ext() {
    return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
  }
  set ext(t) {
    this._ext = t;
  }
  get underlineStyle() {
    return this._urlId ? 5 : (this._ext & 469762048) >> 26;
  }
  set underlineStyle(t) {
    this._ext &= -469762049, this._ext |= t << 26 & 469762048;
  }
  get underlineColor() {
    return this._ext & 67108863;
  }
  set underlineColor(t) {
    this._ext &= -67108864, this._ext |= t & 67108863;
  }
  get urlId() {
    return this._urlId;
  }
  set urlId(t) {
    this._urlId = t;
  }
  get underlineVariantOffset() {
    let t = (this._ext & 3758096384) >> 29;
    return t < 0 ? t ^ 4294967288 : t;
  }
  set underlineVariantOffset(t) {
    this._ext &= 536870911, this._ext |= t << 29 & 3758096384;
  }
  clone() {
    return new s2(this._ext, this._urlId);
  }
  isEmpty() {
    return this.underlineStyle === 0 && this._urlId === 0;
  }
};
var q = class s3 extends De {
  constructor() {
    super(...arguments);
    this.content = 0;
    this.fg = 0;
    this.bg = 0;
    this.extended = new rt();
    this.combinedData = "";
  }
  static fromCharData(e) {
    let i8 = new s3();
    return i8.setFromCharData(e), i8;
  }
  isCombined() {
    return this.content & 2097152;
  }
  getWidth() {
    return this.content >> 22;
  }
  getChars() {
    return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? Ce(this.content & 2097151) : "";
  }
  getCode() {
    return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
  }
  setFromCharData(e) {
    this.fg = e[0], this.bg = 0;
    let i8 = false;
    if (e[1].length > 2) i8 = true;
    else if (e[1].length === 2) {
      let r5 = e[1].charCodeAt(0);
      if (55296 <= r5 && r5 <= 56319) {
        let n2 = e[1].charCodeAt(1);
        56320 <= n2 && n2 <= 57343 ? this.content = (r5 - 55296) * 1024 + n2 - 56320 + 65536 | e[2] << 22 : i8 = true;
      } else i8 = true;
    } else this.content = e[1].charCodeAt(0) | e[2] << 22;
    i8 && (this.combinedData = e[1], this.content = 2097152 | e[2] << 22);
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var js = "di$target";
var Hn = "di$dependencies";
var Fn = /* @__PURE__ */ new Map();
function Xs(s15) {
  return s15[Hn] || [];
}
function ie(s15) {
  if (Fn.has(s15)) return Fn.get(s15);
  let t = function(e, i8, r5) {
    if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
    Pl(t, e, r5);
  };
  return t._id = s15, Fn.set(s15, t), t;
}
function Pl(s15, t, e) {
  t[js] === t ? t[Hn].push({ id: s15, index: e }) : (t[Hn] = [{ id: s15, index: e }], t[js] = t);
}
var F = ie("BufferService");
var rr = ie("CoreMouseService");
var ge = ie("CoreService");
var Zs = ie("CharsetService");
var xt = ie("InstantiationService");
var nr = ie("LogService");
var H = ie("OptionsService");
var sr = ie("OscLinkService");
var Js = ie("UnicodeService");
var Be = ie("DecorationService");
var wt = class {
  constructor(t, e, i8) {
    this._bufferService = t;
    this._optionsService = e;
    this._oscLinkService = i8;
  }
  provideLinks(t, e) {
    let i8 = this._bufferService.buffer.lines.get(t - 1);
    if (!i8) {
      e(void 0);
      return;
    }
    let r5 = [], n2 = this._optionsService.rawOptions.linkHandler, o = new q(), l2 = i8.getTrimmedLength(), a = -1, u2 = -1, h2 = false;
    for (let c2 = 0; c2 < l2; c2++) if (!(u2 === -1 && !i8.hasContent(c2))) {
      if (i8.loadCell(c2, o), o.hasExtendedAttrs() && o.extended.urlId) if (u2 === -1) {
        u2 = c2, a = o.extended.urlId;
        continue;
      } else h2 = o.extended.urlId !== a;
      else u2 !== -1 && (h2 = true);
      if (h2 || u2 !== -1 && c2 === l2 - 1) {
        let d2 = this._oscLinkService.getLinkData(a)?.uri;
        if (d2) {
          let _4 = { start: { x: u2 + 1, y: t }, end: { x: c2 + (!h2 && c2 === l2 - 1 ? 1 : 0), y: t } }, p2 = false;
          if (!n2?.allowNonHttpProtocols) try {
            let m2 = new URL(d2);
            ["http:", "https:"].includes(m2.protocol) || (p2 = true);
          } catch {
            p2 = true;
          }
          p2 || r5.push({ text: d2, range: _4, activate: (m2, f2) => n2 ? n2.activate(m2, f2, _4) : Ol(m2, f2), hover: (m2, f2) => n2?.hover?.(m2, f2, _4), leave: (m2, f2) => n2?.leave?.(m2, f2, _4) });
        }
        h2 = false, o.hasExtendedAttrs() && o.extended.urlId ? (u2 = c2, a = o.extended.urlId) : (u2 = -1, a = -1);
      }
    }
    e(r5);
  }
};
wt = M([S(0, F), S(1, H), S(2, sr)], wt);
function Ol(s15, t) {
  if (confirm(`Do you want to navigate to ${t}?

WARNING: This link could potentially be dangerous`)) {
    let i8 = window.open();
    if (i8) {
      try {
        i8.opener = null;
      } catch {
      }
      i8.location.href = t;
    } else console.warn("Opening link blocked as opener could not be cleared");
  }
}
var nt = ie("CharSizeService");
var ae = ie("CoreBrowserService");
var Dt = ie("MouseService");
var ce = ie("RenderService");
var Qs = ie("SelectionService");
var or = ie("CharacterJoinerService");
var Re = ie("ThemeService");
var lr = ie("LinkProviderService");
var Wn = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(t) {
      setTimeout(() => {
        throw t.stack ? ar.isErrorNoTelemetry(t) ? new ar(t.message + `

` + t.stack) : new Error(t.message + `

` + t.stack) : t;
      }, 0);
    };
  }
  addListener(t) {
    return this.listeners.push(t), () => {
      this._removeListener(t);
    };
  }
  emit(t) {
    this.listeners.forEach((e) => {
      e(t);
    });
  }
  _removeListener(t) {
    this.listeners.splice(this.listeners.indexOf(t), 1);
  }
  setUnexpectedErrorHandler(t) {
    this.unexpectedErrorHandler = t;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(t) {
    this.unexpectedErrorHandler(t), this.emit(t);
  }
  onUnexpectedExternalError(t) {
    this.unexpectedErrorHandler(t);
  }
};
var Bl = new Wn();
function Lt(s15) {
  Nl(s15) || Bl.onUnexpectedError(s15);
}
var Un = "Canceled";
function Nl(s15) {
  return s15 instanceof bi ? true : s15 instanceof Error && s15.name === Un && s15.message === Un;
}
var bi = class extends Error {
  constructor() {
    super(Un), this.name = this.message;
  }
};
function eo(s15) {
  return s15 ? new Error(`Illegal argument: ${s15}`) : new Error("Illegal argument");
}
var ar = class s4 extends Error {
  constructor(t) {
    super(t), this.name = "CodeExpectedError";
  }
  static fromError(t) {
    if (t instanceof s4) return t;
    let e = new s4();
    return e.message = t.message, e.stack = t.stack, e;
  }
  static isErrorNoTelemetry(t) {
    return t.name === "CodeExpectedError";
  }
};
var Rt = class s5 extends Error {
  constructor(t) {
    super(t || "An unexpected bug occurred."), Object.setPrototypeOf(this, s5.prototype);
  }
};
function Fl(s15, t, e = 0, i8 = s15.length) {
  let r5 = e, n2 = i8;
  for (; r5 < n2; ) {
    let o = Math.floor((r5 + n2) / 2);
    t(s15[o]) ? r5 = o + 1 : n2 = o;
  }
  return r5 - 1;
}
var cr = class cr2 {
  constructor(t) {
    this._array = t;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(t) {
    if (cr2.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let i8 of this._array) if (this._prevFindLastPredicate(i8) && !t(i8)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = t;
    }
    let e = Fl(this._array, t, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = e + 1, e === -1 ? void 0 : this._array[e];
  }
};
cr.assertInvariants = false;
function Se(s15, t = 0) {
  return s15[s15.length - (1 + t)];
}
var ro;
((l2) => {
  function s15(a) {
    return a < 0;
  }
  l2.isLessThan = s15;
  function t(a) {
    return a <= 0;
  }
  l2.isLessThanOrEqual = t;
  function e(a) {
    return a > 0;
  }
  l2.isGreaterThan = e;
  function i8(a) {
    return a === 0;
  }
  l2.isNeitherLessOrGreaterThan = i8, l2.greaterThan = 1, l2.lessThan = -1, l2.neitherLessOrGreaterThan = 0;
})(ro ||= {});
function no(s15, t) {
  return (e, i8) => t(s15(e), s15(i8));
}
var so = (s15, t) => s15 - t;
var At = class At2 {
  constructor(t) {
    this.iterate = t;
  }
  forEach(t) {
    this.iterate((e) => (t(e), true));
  }
  toArray() {
    let t = [];
    return this.iterate((e) => (t.push(e), true)), t;
  }
  filter(t) {
    return new At2((e) => this.iterate((i8) => t(i8) ? e(i8) : true));
  }
  map(t) {
    return new At2((e) => this.iterate((i8) => e(t(i8))));
  }
  some(t) {
    let e = false;
    return this.iterate((i8) => (e = t(i8), !e)), e;
  }
  findFirst(t) {
    let e;
    return this.iterate((i8) => t(i8) ? (e = i8, false) : true), e;
  }
  findLast(t) {
    let e;
    return this.iterate((i8) => (t(i8) && (e = i8), true)), e;
  }
  findLastMaxBy(t) {
    let e, i8 = true;
    return this.iterate((r5) => ((i8 || ro.isGreaterThan(t(r5, e))) && (i8 = false, e = r5), true)), e;
  }
};
At.empty = new At((t) => {
});
function co(s15, t) {
  let e = /* @__PURE__ */ Object.create(null);
  for (let i8 of s15) {
    let r5 = t(i8), n2 = e[r5];
    n2 || (n2 = e[r5] = []), n2.push(i8);
  }
  return e;
}
var lo;
var ao;
var oo = class {
  constructor(t, e) {
    this.toKey = e;
    this._map = /* @__PURE__ */ new Map();
    this[lo] = "SetWithKey";
    for (let i8 of t) this.add(i8);
  }
  get size() {
    return this._map.size;
  }
  add(t) {
    let e = this.toKey(t);
    return this._map.set(e, t), this;
  }
  delete(t) {
    return this._map.delete(this.toKey(t));
  }
  has(t) {
    return this._map.has(this.toKey(t));
  }
  *entries() {
    for (let t of this._map.values()) yield [t, t];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let t of this._map.values()) yield t;
  }
  clear() {
    this._map.clear();
  }
  forEach(t, e) {
    this._map.forEach((i8) => t.call(e, i8, i8, this));
  }
  [(ao = Symbol.iterator, lo = Symbol.toStringTag, ao)]() {
    return this.values();
  }
};
var ur = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(t, e) {
    let i8 = this.map.get(t);
    i8 || (i8 = /* @__PURE__ */ new Set(), this.map.set(t, i8)), i8.add(e);
  }
  delete(t, e) {
    let i8 = this.map.get(t);
    i8 && (i8.delete(e), i8.size === 0 && this.map.delete(t));
  }
  forEach(t, e) {
    let i8 = this.map.get(t);
    i8 && i8.forEach(e);
  }
  get(t) {
    let e = this.map.get(t);
    return e || /* @__PURE__ */ new Set();
  }
};
function Kn(s15, t) {
  let e = this, i8 = false, r5;
  return function() {
    if (i8) return r5;
    if (i8 = true, t) try {
      r5 = s15.apply(e, arguments);
    } finally {
      t();
    }
    else r5 = s15.apply(e, arguments);
    return r5;
  };
}
var zn;
((O4) => {
  function s15(I3) {
    return I3 && typeof I3 == "object" && typeof I3[Symbol.iterator] == "function";
  }
  O4.is = s15;
  let t = Object.freeze([]);
  function e() {
    return t;
  }
  O4.empty = e;
  function* i8(I3) {
    yield I3;
  }
  O4.single = i8;
  function r5(I3) {
    return s15(I3) ? I3 : i8(I3);
  }
  O4.wrap = r5;
  function n2(I3) {
    return I3 || t;
  }
  O4.from = n2;
  function* o(I3) {
    for (let k4 = I3.length - 1; k4 >= 0; k4--) yield I3[k4];
  }
  O4.reverse = o;
  function l2(I3) {
    return !I3 || I3[Symbol.iterator]().next().done === true;
  }
  O4.isEmpty = l2;
  function a(I3) {
    return I3[Symbol.iterator]().next().value;
  }
  O4.first = a;
  function u2(I3, k4) {
    let P4 = 0;
    for (let oe of I3) if (k4(oe, P4++)) return true;
    return false;
  }
  O4.some = u2;
  function h2(I3, k4) {
    for (let P4 of I3) if (k4(P4)) return P4;
  }
  O4.find = h2;
  function* c2(I3, k4) {
    for (let P4 of I3) k4(P4) && (yield P4);
  }
  O4.filter = c2;
  function* d2(I3, k4) {
    let P4 = 0;
    for (let oe of I3) yield k4(oe, P4++);
  }
  O4.map = d2;
  function* _4(I3, k4) {
    let P4 = 0;
    for (let oe of I3) yield* k4(oe, P4++);
  }
  O4.flatMap = _4;
  function* p2(...I3) {
    for (let k4 of I3) yield* k4;
  }
  O4.concat = p2;
  function m2(I3, k4, P4) {
    let oe = P4;
    for (let Me3 of I3) oe = k4(oe, Me3);
    return oe;
  }
  O4.reduce = m2;
  function* f2(I3, k4, P4 = I3.length) {
    for (k4 < 0 && (k4 += I3.length), P4 < 0 ? P4 += I3.length : P4 > I3.length && (P4 = I3.length); k4 < P4; k4++) yield I3[k4];
  }
  O4.slice = f2;
  function A3(I3, k4 = Number.POSITIVE_INFINITY) {
    let P4 = [];
    if (k4 === 0) return [P4, I3];
    let oe = I3[Symbol.iterator]();
    for (let Me3 = 0; Me3 < k4; Me3++) {
      let Pe3 = oe.next();
      if (Pe3.done) return [P4, O4.empty()];
      P4.push(Pe3.value);
    }
    return [P4, { [Symbol.iterator]() {
      return oe;
    } }];
  }
  O4.consume = A3;
  async function R4(I3) {
    let k4 = [];
    for await (let P4 of I3) k4.push(P4);
    return Promise.resolve(k4);
  }
  O4.asyncToArray = R4;
})(zn ||= {});
var Wl = false;
var dt = null;
var hr = class hr2 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(t) {
    let e = this.livingDisposables.get(t);
    return e || (e = { parent: null, source: null, isSingleton: false, value: t, idx: hr2.idx++ }, this.livingDisposables.set(t, e)), e;
  }
  trackDisposable(t) {
    let e = this.getDisposableData(t);
    e.source || (e.source = new Error().stack);
  }
  setParent(t, e) {
    let i8 = this.getDisposableData(t);
    i8.parent = e;
  }
  markAsDisposed(t) {
    this.livingDisposables.delete(t);
  }
  markAsSingleton(t) {
    this.getDisposableData(t).isSingleton = true;
  }
  getRootParent(t, e) {
    let i8 = e.get(t);
    if (i8) return i8;
    let r5 = t.parent ? this.getRootParent(this.getDisposableData(t.parent), e) : t;
    return e.set(t, r5), r5;
  }
  getTrackedDisposables() {
    let t = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, i8]) => i8.source !== null && !this.getRootParent(i8, t).isSingleton).flatMap(([i8]) => i8);
  }
  computeLeakingDisposables(t = 10, e) {
    let i8;
    if (e) i8 = e;
    else {
      let a = /* @__PURE__ */ new Map(), u2 = [...this.livingDisposables.values()].filter((c2) => c2.source !== null && !this.getRootParent(c2, a).isSingleton);
      if (u2.length === 0) return;
      let h2 = new Set(u2.map((c2) => c2.value));
      if (i8 = u2.filter((c2) => !(c2.parent && h2.has(c2.parent))), i8.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!i8) return;
    function r5(a) {
      function u2(c2, d2) {
        for (; c2.length > 0 && d2.some((_4) => typeof _4 == "string" ? _4 === c2[0] : c2[0].match(_4)); ) c2.shift();
      }
      let h2 = a.source.split(`
`).map((c2) => c2.trim().replace("at ", "")).filter((c2) => c2 !== "");
      return u2(h2, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), h2.reverse();
    }
    let n2 = new ur();
    for (let a of i8) {
      let u2 = r5(a);
      for (let h2 = 0; h2 <= u2.length; h2++) n2.add(u2.slice(0, h2).join(`
`), a);
    }
    i8.sort(no((a) => a.idx, so));
    let o = "", l2 = 0;
    for (let a of i8.slice(0, t)) {
      l2++;
      let u2 = r5(a), h2 = [];
      for (let c2 = 0; c2 < u2.length; c2++) {
        let d2 = u2[c2];
        d2 = `(shared with ${n2.get(u2.slice(0, c2 + 1).join(`
`)).size}/${i8.length} leaks) at ${d2}`;
        let p2 = n2.get(u2.slice(0, c2).join(`
`)), m2 = co([...p2].map((f2) => r5(f2)[c2]), (f2) => f2);
        delete m2[u2[c2]];
        for (let [f2, A3] of Object.entries(m2)) h2.unshift(`    - stacktraces of ${A3.length} other leaks continue with ${f2}`);
        h2.unshift(d2);
      }
      o += `


==================== Leaking disposable ${l2}/${i8.length}: ${a.value.constructor.name} ====================
${h2.join(`
`)}
============================================================

`;
    }
    return i8.length > t && (o += `


... and ${i8.length - t} more leaking disposables

`), { leaks: i8, details: o };
  }
};
hr.idx = 0;
function Ul(s15) {
  dt = s15;
}
if (Wl) {
  let s15 = "__is_disposable_tracked__";
  Ul(new class {
    trackDisposable(t) {
      let e = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        t[s15] || console.log(e);
      }, 3e3);
    }
    setParent(t, e) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsDisposed(t) {
      if (t && t !== D.None) try {
        t[s15] = true;
      } catch {
      }
    }
    markAsSingleton(t) {
    }
  }());
}
function fr(s15) {
  return dt?.trackDisposable(s15), s15;
}
function pr(s15) {
  dt?.markAsDisposed(s15);
}
function vi(s15, t) {
  dt?.setParent(s15, t);
}
function Kl(s15, t) {
  if (dt) for (let e of s15) dt.setParent(e, t);
}
function Gn(s15) {
  return dt?.markAsSingleton(s15), s15;
}
function Ne(s15) {
  if (zn.is(s15)) {
    let t = [];
    for (let e of s15) if (e) try {
      e.dispose();
    } catch (i8) {
      t.push(i8);
    }
    if (t.length === 1) throw t[0];
    if (t.length > 1) throw new AggregateError(t, "Encountered errors while disposing of store");
    return Array.isArray(s15) ? [] : s15;
  } else if (s15) return s15.dispose(), s15;
}
function ho(...s15) {
  let t = C(() => Ne(s15));
  return Kl(s15, t), t;
}
function C(s15) {
  let t = fr({ dispose: Kn(() => {
    pr(t), s15();
  }) });
  return t;
}
var dr = class dr2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    fr(this);
  }
  dispose() {
    this._isDisposed || (pr(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Ne(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(t) {
    if (!t) return t;
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return vi(t, this), this._isDisposed ? dr2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(t), t;
  }
  delete(t) {
    if (t) {
      if (t === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(t), t.dispose();
    }
  }
  deleteAndLeak(t) {
    t && this._toDispose.has(t) && (this._toDispose.delete(t), vi(t, null));
  }
};
dr.DISABLE_DISPOSED_WARNING = false;
var Ee = dr;
var D = class {
  constructor() {
    this._store = new Ee();
    fr(this), vi(this._store, this);
  }
  dispose() {
    pr(this), this._store.dispose();
  }
  _register(t) {
    if (t === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(t);
  }
};
D.None = Object.freeze({ dispose() {
} });
var ye = class {
  constructor() {
    this._isDisposed = false;
    fr(this);
  }
  get value() {
    return this._isDisposed ? void 0 : this._value;
  }
  set value(t) {
    this._isDisposed || t === this._value || (this._value?.dispose(), t && vi(t, this), this._value = t);
  }
  clear() {
    this.value = void 0;
  }
  dispose() {
    this._isDisposed = true, pr(this), this._value?.dispose(), this._value = void 0;
  }
  clearAndLeak() {
    let t = this._value;
    return this._value = void 0, t && vi(t, null), t;
  }
};
var fe = typeof window == "object" ? window : globalThis;
var kt = class kt2 {
  constructor(t) {
    this.element = t, this.next = kt2.Undefined, this.prev = kt2.Undefined;
  }
};
kt.Undefined = new kt(void 0);
var G = kt;
var Ct = class {
  constructor() {
    this._first = G.Undefined;
    this._last = G.Undefined;
    this._size = 0;
  }
  get size() {
    return this._size;
  }
  isEmpty() {
    return this._first === G.Undefined;
  }
  clear() {
    let t = this._first;
    for (; t !== G.Undefined; ) {
      let e = t.next;
      t.prev = G.Undefined, t.next = G.Undefined, t = e;
    }
    this._first = G.Undefined, this._last = G.Undefined, this._size = 0;
  }
  unshift(t) {
    return this._insert(t, false);
  }
  push(t) {
    return this._insert(t, true);
  }
  _insert(t, e) {
    let i8 = new G(t);
    if (this._first === G.Undefined) this._first = i8, this._last = i8;
    else if (e) {
      let n2 = this._last;
      this._last = i8, i8.prev = n2, n2.next = i8;
    } else {
      let n2 = this._first;
      this._first = i8, i8.next = n2, n2.prev = i8;
    }
    this._size += 1;
    let r5 = false;
    return () => {
      r5 || (r5 = true, this._remove(i8));
    };
  }
  shift() {
    if (this._first !== G.Undefined) {
      let t = this._first.element;
      return this._remove(this._first), t;
    }
  }
  pop() {
    if (this._last !== G.Undefined) {
      let t = this._last.element;
      return this._remove(this._last), t;
    }
  }
  _remove(t) {
    if (t.prev !== G.Undefined && t.next !== G.Undefined) {
      let e = t.prev;
      e.next = t.next, t.next.prev = e;
    } else t.prev === G.Undefined && t.next === G.Undefined ? (this._first = G.Undefined, this._last = G.Undefined) : t.next === G.Undefined ? (this._last = this._last.prev, this._last.next = G.Undefined) : t.prev === G.Undefined && (this._first = this._first.next, this._first.prev = G.Undefined);
    this._size -= 1;
  }
  *[Symbol.iterator]() {
    let t = this._first;
    for (; t !== G.Undefined; ) yield t.element, t = t.next;
  }
};
var zl = globalThis.performance && typeof globalThis.performance.now == "function";
var mr = class s6 {
  static create(t) {
    return new s6(t);
  }
  constructor(t) {
    this._now = zl && t === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var Gl = false;
var fo = false;
var $l = false;
var $;
((Qe2) => {
  Qe2.None = () => D.None;
  function t(y2) {
    if ($l) {
      let { onDidAddListener: T2 } = y2, g3 = gi.create(), w4 = 0;
      y2.onDidAddListener = () => {
        ++w4 === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), g3.print()), T2?.();
      };
    }
  }
  function e(y2, T2) {
    return d2(y2, () => {
    }, 0, void 0, true, void 0, T2);
  }
  Qe2.defer = e;
  function i8(y2) {
    return (T2, g3 = null, w4) => {
      let E2 = false, x2;
      return x2 = y2((N3) => {
        if (!E2) return x2 ? x2.dispose() : E2 = true, T2.call(g3, N3);
      }, null, w4), E2 && x2.dispose(), x2;
    };
  }
  Qe2.once = i8;
  function r5(y2, T2, g3) {
    return h2((w4, E2 = null, x2) => y2((N3) => w4.call(E2, T2(N3)), null, x2), g3);
  }
  Qe2.map = r5;
  function n2(y2, T2, g3) {
    return h2((w4, E2 = null, x2) => y2((N3) => {
      T2(N3), w4.call(E2, N3);
    }, null, x2), g3);
  }
  Qe2.forEach = n2;
  function o(y2, T2, g3) {
    return h2((w4, E2 = null, x2) => y2((N3) => T2(N3) && w4.call(E2, N3), null, x2), g3);
  }
  Qe2.filter = o;
  function l2(y2) {
    return y2;
  }
  Qe2.signal = l2;
  function a(...y2) {
    return (T2, g3 = null, w4) => {
      let E2 = ho(...y2.map((x2) => x2((N3) => T2.call(g3, N3))));
      return c2(E2, w4);
    };
  }
  Qe2.any = a;
  function u2(y2, T2, g3, w4) {
    let E2 = g3;
    return r5(y2, (x2) => (E2 = T2(E2, x2), E2), w4);
  }
  Qe2.reduce = u2;
  function h2(y2, T2) {
    let g3, w4 = { onWillAddFirstListener() {
      g3 = y2(E2.fire, E2);
    }, onDidRemoveLastListener() {
      g3?.dispose();
    } };
    T2 || t(w4);
    let E2 = new v(w4);
    return T2?.add(E2), E2.event;
  }
  function c2(y2, T2) {
    return T2 instanceof Array ? T2.push(y2) : T2 && T2.add(y2), y2;
  }
  function d2(y2, T2, g3 = 100, w4 = false, E2 = false, x2, N3) {
    let Z4, te4, Oe3, ze2 = 0, le2, et3 = { leakWarningThreshold: x2, onWillAddFirstListener() {
      Z4 = y2((ht2) => {
        ze2++, te4 = T2(te4, ht2), w4 && !Oe3 && (me3.fire(te4), te4 = void 0), le2 = () => {
          let fi2 = te4;
          te4 = void 0, Oe3 = void 0, (!w4 || ze2 > 1) && me3.fire(fi2), ze2 = 0;
        }, typeof g3 == "number" ? (clearTimeout(Oe3), Oe3 = setTimeout(le2, g3)) : Oe3 === void 0 && (Oe3 = 0, queueMicrotask(le2));
      });
    }, onWillRemoveListener() {
      E2 && ze2 > 0 && le2?.();
    }, onDidRemoveLastListener() {
      le2 = void 0, Z4.dispose();
    } };
    N3 || t(et3);
    let me3 = new v(et3);
    return N3?.add(me3), me3.event;
  }
  Qe2.debounce = d2;
  function _4(y2, T2 = 0, g3) {
    return Qe2.debounce(y2, (w4, E2) => w4 ? (w4.push(E2), w4) : [E2], T2, void 0, true, void 0, g3);
  }
  Qe2.accumulate = _4;
  function p2(y2, T2 = (w4, E2) => w4 === E2, g3) {
    let w4 = true, E2;
    return o(y2, (x2) => {
      let N3 = w4 || !T2(x2, E2);
      return w4 = false, E2 = x2, N3;
    }, g3);
  }
  Qe2.latch = p2;
  function m2(y2, T2, g3) {
    return [Qe2.filter(y2, T2, g3), Qe2.filter(y2, (w4) => !T2(w4), g3)];
  }
  Qe2.split = m2;
  function f2(y2, T2 = false, g3 = [], w4) {
    let E2 = g3.slice(), x2 = y2((te4) => {
      E2 ? E2.push(te4) : Z4.fire(te4);
    });
    w4 && w4.add(x2);
    let N3 = () => {
      E2?.forEach((te4) => Z4.fire(te4)), E2 = null;
    }, Z4 = new v({ onWillAddFirstListener() {
      x2 || (x2 = y2((te4) => Z4.fire(te4)), w4 && w4.add(x2));
    }, onDidAddFirstListener() {
      E2 && (T2 ? setTimeout(N3) : N3());
    }, onDidRemoveLastListener() {
      x2 && x2.dispose(), x2 = null;
    } });
    return w4 && w4.add(Z4), Z4.event;
  }
  Qe2.buffer = f2;
  function A3(y2, T2) {
    return (w4, E2, x2) => {
      let N3 = T2(new O4());
      return y2(function(Z4) {
        let te4 = N3.evaluate(Z4);
        te4 !== R4 && w4.call(E2, te4);
      }, void 0, x2);
    };
  }
  Qe2.chain = A3;
  let R4 = Symbol("HaltChainable");
  class O4 {
    constructor() {
      this.steps = [];
    }
    map(T2) {
      return this.steps.push(T2), this;
    }
    forEach(T2) {
      return this.steps.push((g3) => (T2(g3), g3)), this;
    }
    filter(T2) {
      return this.steps.push((g3) => T2(g3) ? g3 : R4), this;
    }
    reduce(T2, g3) {
      let w4 = g3;
      return this.steps.push((E2) => (w4 = T2(w4, E2), w4)), this;
    }
    latch(T2 = (g3, w4) => g3 === w4) {
      let g3 = true, w4;
      return this.steps.push((E2) => {
        let x2 = g3 || !T2(E2, w4);
        return g3 = false, w4 = E2, x2 ? E2 : R4;
      }), this;
    }
    evaluate(T2) {
      for (let g3 of this.steps) if (T2 = g3(T2), T2 === R4) break;
      return T2;
    }
  }
  function I3(y2, T2, g3 = (w4) => w4) {
    let w4 = (...Z4) => N3.fire(g3(...Z4)), E2 = () => y2.on(T2, w4), x2 = () => y2.removeListener(T2, w4), N3 = new v({ onWillAddFirstListener: E2, onDidRemoveLastListener: x2 });
    return N3.event;
  }
  Qe2.fromNodeEventEmitter = I3;
  function k4(y2, T2, g3 = (w4) => w4) {
    let w4 = (...Z4) => N3.fire(g3(...Z4)), E2 = () => y2.addEventListener(T2, w4), x2 = () => y2.removeEventListener(T2, w4), N3 = new v({ onWillAddFirstListener: E2, onDidRemoveLastListener: x2 });
    return N3.event;
  }
  Qe2.fromDOMEventEmitter = k4;
  function P4(y2) {
    return new Promise((T2) => i8(y2)(T2));
  }
  Qe2.toPromise = P4;
  function oe(y2) {
    let T2 = new v();
    return y2.then((g3) => {
      T2.fire(g3);
    }, () => {
      T2.fire(void 0);
    }).finally(() => {
      T2.dispose();
    }), T2.event;
  }
  Qe2.fromPromise = oe;
  function Me3(y2, T2) {
    return y2((g3) => T2.fire(g3));
  }
  Qe2.forward = Me3;
  function Pe3(y2, T2, g3) {
    return T2(g3), y2((w4) => T2(w4));
  }
  Qe2.runAndSubscribe = Pe3;
  class Ke2 {
    constructor(T2, g3) {
      this._observable = T2;
      this._counter = 0;
      this._hasChanged = false;
      let w4 = { onWillAddFirstListener: () => {
        T2.addObserver(this);
      }, onDidRemoveLastListener: () => {
        T2.removeObserver(this);
      } };
      g3 || t(w4), this.emitter = new v(w4), g3 && g3.add(this.emitter);
    }
    beginUpdate(T2) {
      this._counter++;
    }
    handlePossibleChange(T2) {
    }
    handleChange(T2, g3) {
      this._hasChanged = true;
    }
    endUpdate(T2) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function di(y2, T2) {
    return new Ke2(y2, T2).emitter.event;
  }
  Qe2.fromObservable = di;
  function V3(y2) {
    return (T2, g3, w4) => {
      let E2 = 0, x2 = false, N3 = { beginUpdate() {
        E2++;
      }, endUpdate() {
        E2--, E2 === 0 && (y2.reportChanges(), x2 && (x2 = false, T2.call(g3)));
      }, handlePossibleChange() {
      }, handleChange() {
        x2 = true;
      } };
      y2.addObserver(N3), y2.reportChanges();
      let Z4 = { dispose() {
        y2.removeObserver(N3);
      } };
      return w4 instanceof Ee ? w4.add(Z4) : Array.isArray(w4) && w4.push(Z4), Z4;
    };
  }
  Qe2.fromObservableLight = V3;
})($ ||= {});
var Mt = class Mt2 {
  constructor(t) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${t}_${Mt2._idPool++}`, Mt2.all.add(this);
  }
  start(t) {
    this._stopWatch = new mr(), this.listenerCount = t;
  }
  stop() {
    if (this._stopWatch) {
      let t = this._stopWatch.elapsed();
      this.durations.push(t), this.elapsedOverall += t, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
Mt.all = /* @__PURE__ */ new Set(), Mt._idPool = 0;
var $n = Mt;
var po = -1;
var br = class br2 {
  constructor(t, e, i8 = (br2._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = t;
    this.threshold = e;
    this.name = i8;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(t, e) {
    let i8 = this.threshold;
    if (i8 <= 0 || e < i8) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let r5 = this._stacks.get(t.value) || 0;
    if (this._stacks.set(t.value, r5 + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = i8 * 0.5;
      let [n2, o] = this.getMostFrequentStack(), l2 = `[${this.name}] potential listener LEAK detected, having ${e} listeners already. MOST frequent listener (${o}):`;
      console.warn(l2), console.warn(n2);
      let a = new qn(l2, n2);
      this._errorHandler(a);
    }
    return () => {
      let n2 = this._stacks.get(t.value) || 0;
      this._stacks.set(t.value, n2 - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let t, e = 0;
    for (let [i8, r5] of this._stacks) (!t || e < r5) && (t = [i8, r5], e = r5);
    return t;
  }
};
br._idPool = 1;
var Vn = br;
var gi = class s7 {
  constructor(t) {
    this.value = t;
  }
  static create() {
    let t = new Error();
    return new s7(t.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var qn = class extends Error {
  constructor(t, e) {
    super(t), this.name = "ListenerLeakError", this.stack = e;
  }
};
var Yn = class extends Error {
  constructor(t, e) {
    super(t), this.name = "ListenerRefusalError", this.stack = e;
  }
};
var Vl = 0;
var Pt = class {
  constructor(t) {
    this.value = t;
    this.id = Vl++;
  }
};
var ql = 2;
var Yl = (s15, t) => {
  if (s15 instanceof Pt) t(s15);
  else for (let e = 0; e < s15.length; e++) {
    let i8 = s15[e];
    i8 && t(i8);
  }
};
var _r;
if (Gl) {
  let s15 = [];
  setInterval(() => {
    s15.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(s15.join(`
`)), s15.length = 0);
  }, 3e3), _r = new FinalizationRegistry((t) => {
    typeof t == "string" && s15.push(t);
  });
}
var v = class {
  constructor(t) {
    this._size = 0;
    this._options = t, this._leakageMon = po > 0 || this._options?.leakWarningThreshold ? new Vn(t?.onListenerError ?? Lt, this._options?.leakWarningThreshold ?? po) : void 0, this._perfMon = this._options?._profName ? new $n(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (fo) {
          let t = this._listeners;
          queueMicrotask(() => {
            Yl(t, (e) => e.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (t, e, i8) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let a = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(a);
        let u2 = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], h2 = new Yn(`${a}. HINT: Stack shows most frequent listener (${u2[1]}-times)`, u2[0]);
        return (this._options?.onListenerError || Lt)(h2), D.None;
      }
      if (this._disposed) return D.None;
      e && (t = t.bind(e));
      let r5 = new Pt(t), n2, o;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (r5.stack = gi.create(), n2 = this._leakageMon.check(r5.stack, this._size + 1)), fo && (r5.stack = o ?? gi.create()), this._listeners ? this._listeners instanceof Pt ? (this._deliveryQueue ??= new jn(), this._listeners = [this._listeners, r5]) : this._listeners.push(r5) : (this._options?.onWillAddFirstListener?.(this), this._listeners = r5, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let l2 = C(() => {
        _r?.unregister(l2), n2?.(), this._removeListener(r5);
      });
      if (i8 instanceof Ee ? i8.add(l2) : Array.isArray(i8) && i8.push(l2), _r) {
        let a = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), u2 = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(a);
        _r.register(l2, u2?.[2] ?? a, l2);
      }
      return l2;
    }, this._event;
  }
  _removeListener(t) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let e = this._listeners, i8 = e.indexOf(t);
    if (i8 === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, e[i8] = void 0;
    let r5 = this._deliveryQueue.current === this;
    if (this._size * ql <= e.length) {
      let n2 = 0;
      for (let o = 0; o < e.length; o++) e[o] ? e[n2++] = e[o] : r5 && (this._deliveryQueue.end--, n2 < this._deliveryQueue.i && this._deliveryQueue.i--);
      e.length = n2;
    }
  }
  _deliver(t, e) {
    if (!t) return;
    let i8 = this._options?.onListenerError || Lt;
    if (!i8) {
      t.value(e);
      return;
    }
    try {
      t.value(e);
    } catch (r5) {
      i8(r5);
    }
  }
  _deliverQueue(t) {
    let e = t.current._listeners;
    for (; t.i < t.end; ) this._deliver(e[t.i++], t.value);
    t.reset();
  }
  fire(t) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Pt) this._deliver(this._listeners, t);
    else {
      let e = this._deliveryQueue;
      e.enqueue(this, t, this._listeners.length), this._deliverQueue(e);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var jn = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(t, e, i8) {
    this.i = 0, this.end = i8, this.current = t, this.value = e;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var gr = class gr2 {
  constructor() {
    this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map();
    this._onDidChangeZoomLevel = new v();
    this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
    this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map();
    this._onDidChangeFullscreen = new v();
    this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
  }
  getZoomLevel(t) {
    return this.mapWindowIdToZoomLevel.get(this.getWindowId(t)) ?? 0;
  }
  setZoomLevel(t, e) {
    if (this.getZoomLevel(e) === t) return;
    let i8 = this.getWindowId(e);
    this.mapWindowIdToZoomLevel.set(i8, t), this._onDidChangeZoomLevel.fire(i8);
  }
  getZoomFactor(t) {
    return this.mapWindowIdToZoomFactor.get(this.getWindowId(t)) ?? 1;
  }
  setZoomFactor(t, e) {
    this.mapWindowIdToZoomFactor.set(this.getWindowId(e), t);
  }
  setFullscreen(t, e) {
    if (this.isFullscreen(e) === t) return;
    let i8 = this.getWindowId(e);
    this.mapWindowIdToFullScreen.set(i8, t), this._onDidChangeFullscreen.fire(i8);
  }
  isFullscreen(t) {
    return !!this.mapWindowIdToFullScreen.get(this.getWindowId(t));
  }
  getWindowId(t) {
    return t.vscodeWindowId;
  }
};
gr.INSTANCE = new gr();
var Si = gr;
function Xl(s15, t, e) {
  typeof t == "string" && (t = s15.matchMedia(t)), t.addEventListener("change", e);
}
var Eu = Si.INSTANCE.onDidChangeZoomLevel;
function mo(s15) {
  return Si.INSTANCE.getZoomFactor(s15);
}
var Tu = Si.INSTANCE.onDidChangeFullscreen;
var Ot = typeof navigator == "object" ? navigator.userAgent : "";
var Ei = Ot.indexOf("Firefox") >= 0;
var Bt = Ot.indexOf("AppleWebKit") >= 0;
var Ti = Ot.indexOf("Chrome") >= 0;
var Sr = !Ti && Ot.indexOf("Safari") >= 0;
var Iu = Ot.indexOf("Electron/") >= 0;
var yu = Ot.indexOf("Android") >= 0;
var vr = false;
if (typeof fe.matchMedia == "function") {
  let s15 = fe.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), t = fe.matchMedia("(display-mode: fullscreen)");
  vr = s15.matches, Xl(fe, s15, ({ matches: e }) => {
    vr && t.matches || (vr = e);
  });
}
function _o() {
  return vr;
}
var Nt = "en";
var yr = false;
var xr = false;
var Ii = false;
var Zl = false;
var vo = false;
var go = false;
var Jl = false;
var Ql = false;
var ea = false;
var ta = false;
var Tr;
var Ir = Nt;
var bo = Nt;
var ia;
var $e;
var Ve = globalThis;
var xe;
typeof Ve.vscode < "u" && typeof Ve.vscode.process < "u" ? xe = Ve.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (xe = process);
var So = typeof xe?.versions?.electron == "string";
var ra = So && xe?.type === "renderer";
if (typeof xe == "object") {
  yr = xe.platform === "win32", xr = xe.platform === "darwin", Ii = xe.platform === "linux", Zl = Ii && !!xe.env.SNAP && !!xe.env.SNAP_REVISION, Jl = So, ea = !!xe.env.CI || !!xe.env.BUILD_ARTIFACTSTAGINGDIRECTORY, Tr = Nt, Ir = Nt;
  let s15 = xe.env.VSCODE_NLS_CONFIG;
  if (s15) try {
    let t = JSON.parse(s15);
    Tr = t.userLocale, bo = t.osLocale, Ir = t.resolvedLanguage || Nt, ia = t.languagePack?.translationsConfigFile;
  } catch {
  }
  vo = true;
} else typeof navigator == "object" && !ra ? ($e = navigator.userAgent, yr = $e.indexOf("Windows") >= 0, xr = $e.indexOf("Macintosh") >= 0, Ql = ($e.indexOf("Macintosh") >= 0 || $e.indexOf("iPad") >= 0 || $e.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, Ii = $e.indexOf("Linux") >= 0, ta = $e?.indexOf("Mobi") >= 0, go = true, Ir = globalThis._VSCODE_NLS_LANGUAGE || Nt, Tr = navigator.language.toLowerCase(), bo = Tr) : console.error("Unable to resolve platform.");
var Xn = 0;
xr ? Xn = 1 : yr ? Xn = 3 : Ii && (Xn = 2);
var wr = yr;
var Te = xr;
var Zn = Ii;
var Dr = vo;
var na = go && typeof Ve.importScripts == "function";
var xu = na ? Ve.origin : void 0;
var Fe = $e;
var st = Ir;
var sa;
((i8) => {
  function s15() {
    return st;
  }
  i8.value = s15;
  function t() {
    return st.length === 2 ? st === "en" : st.length >= 3 ? st[0] === "e" && st[1] === "n" && st[2] === "-" : false;
  }
  i8.isDefaultVariant = t;
  function e() {
    return st === "en";
  }
  i8.isDefault = e;
})(sa ||= {});
var oa = typeof Ve.postMessage == "function" && !Ve.importScripts;
var Eo = (() => {
  if (oa) {
    let s15 = [];
    Ve.addEventListener("message", (e) => {
      if (e.data && e.data.vscodeScheduleAsyncWork) for (let i8 = 0, r5 = s15.length; i8 < r5; i8++) {
        let n2 = s15[i8];
        if (n2.id === e.data.vscodeScheduleAsyncWork) {
          s15.splice(i8, 1), n2.callback();
          return;
        }
      }
    });
    let t = 0;
    return (e) => {
      let i8 = ++t;
      s15.push({ id: i8, callback: e }), Ve.postMessage({ vscodeScheduleAsyncWork: i8 }, "*");
    };
  }
  return (s15) => setTimeout(s15);
})();
var la = !!(Fe && Fe.indexOf("Chrome") >= 0);
var wu = !!(Fe && Fe.indexOf("Firefox") >= 0);
var Du = !!(!la && Fe && Fe.indexOf("Safari") >= 0);
var Ru = !!(Fe && Fe.indexOf("Edg/") >= 0);
var Lu = !!(Fe && Fe.indexOf("Android") >= 0);
var ot = typeof navigator == "object" ? navigator : {};
var aa = { clipboard: { writeText: Dr || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(ot && ot.clipboard && ot.clipboard.writeText), readText: Dr || !!(ot && ot.clipboard && ot.clipboard.readText) }, keyboard: Dr || _o() ? 0 : ot.keyboard || Sr ? 1 : 2, touch: "ontouchstart" in fe || ot.maxTouchPoints > 0, pointerEvents: fe.PointerEvent && ("ontouchstart" in fe || navigator.maxTouchPoints > 0) };
var yi = class {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(t, e) {
    this._keyCodeToStr[t] = e, this._strToKeyCode[e.toLowerCase()] = t;
  }
  keyCodeToStr(t) {
    return this._keyCodeToStr[t];
  }
  strToKeyCode(t) {
    return this._strToKeyCode[t.toLowerCase()] || 0;
  }
};
var Jn = new yi();
var To = new yi();
var Io = new yi();
var yo = new Array(230);
var Qn;
((o) => {
  function s15(l2) {
    return Jn.keyCodeToStr(l2);
  }
  o.toString = s15;
  function t(l2) {
    return Jn.strToKeyCode(l2);
  }
  o.fromString = t;
  function e(l2) {
    return To.keyCodeToStr(l2);
  }
  o.toUserSettingsUS = e;
  function i8(l2) {
    return Io.keyCodeToStr(l2);
  }
  o.toUserSettingsGeneral = i8;
  function r5(l2) {
    return To.strToKeyCode(l2) || Io.strToKeyCode(l2);
  }
  o.fromUserSettings = r5;
  function n2(l2) {
    if (l2 >= 98 && l2 <= 113) return null;
    switch (l2) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Jn.keyCodeToStr(l2);
  }
  o.toElectronAccelerator = n2;
})(Qn ||= {});
var Rr = class s8 {
  constructor(t, e, i8, r5, n2) {
    this.ctrlKey = t;
    this.shiftKey = e;
    this.altKey = i8;
    this.metaKey = r5;
    this.keyCode = n2;
  }
  equals(t) {
    return t instanceof s8 && this.ctrlKey === t.ctrlKey && this.shiftKey === t.shiftKey && this.altKey === t.altKey && this.metaKey === t.metaKey && this.keyCode === t.keyCode;
  }
  getHashCode() {
    let t = this.ctrlKey ? "1" : "0", e = this.shiftKey ? "1" : "0", i8 = this.altKey ? "1" : "0", r5 = this.metaKey ? "1" : "0";
    return `K${t}${e}${i8}${r5}${this.keyCode}`;
  }
  isModifierKey() {
    return this.keyCode === 0 || this.keyCode === 5 || this.keyCode === 57 || this.keyCode === 6 || this.keyCode === 4;
  }
  toKeybinding() {
    return new es([this]);
  }
  isDuplicateModifierCase() {
    return this.ctrlKey && this.keyCode === 5 || this.shiftKey && this.keyCode === 4 || this.altKey && this.keyCode === 6 || this.metaKey && this.keyCode === 57;
  }
};
var es = class {
  constructor(t) {
    if (t.length === 0) throw eo("chords");
    this.chords = t;
  }
  getHashCode() {
    let t = "";
    for (let e = 0, i8 = this.chords.length; e < i8; e++) e !== 0 && (t += ";"), t += this.chords[e].getHashCode();
    return t;
  }
  equals(t) {
    if (t === null || this.chords.length !== t.chords.length) return false;
    for (let e = 0; e < this.chords.length; e++) if (!this.chords[e].equals(t.chords[e])) return false;
    return true;
  }
};
function ca(s15) {
  if (s15.charCode) {
    let e = String.fromCharCode(s15.charCode).toUpperCase();
    return Qn.fromString(e);
  }
  let t = s15.keyCode;
  if (t === 3) return 7;
  if (Ei) switch (t) {
    case 59:
      return 85;
    case 60:
      if (Zn) return 97;
      break;
    case 61:
      return 86;
    case 107:
      return 109;
    case 109:
      return 111;
    case 173:
      return 88;
    case 224:
      if (Te) return 57;
      break;
  }
  else if (Bt) {
    if (Te && t === 93) return 57;
    if (!Te && t === 92) return 57;
  }
  return yo[t] || 0;
}
var ua = Te ? 256 : 2048;
var ha = 512;
var da = 1024;
var fa = Te ? 2048 : 256;
var ft = class {
  constructor(t) {
    this._standardKeyboardEventBrand = true;
    let e = t;
    this.browserEvent = e, this.target = e.target, this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, this.altGraphKey = e.getModifierState?.("AltGraph"), this.keyCode = ca(e), this.code = e.code, this.ctrlKey = this.ctrlKey || this.keyCode === 5, this.altKey = this.altKey || this.keyCode === 6, this.shiftKey = this.shiftKey || this.keyCode === 4, this.metaKey = this.metaKey || this.keyCode === 57, this._asKeybinding = this._computeKeybinding(), this._asKeyCodeChord = this._computeKeyCodeChord();
  }
  preventDefault() {
    this.browserEvent && this.browserEvent.preventDefault && this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent && this.browserEvent.stopPropagation && this.browserEvent.stopPropagation();
  }
  toKeyCodeChord() {
    return this._asKeyCodeChord;
  }
  equals(t) {
    return this._asKeybinding === t;
  }
  _computeKeybinding() {
    let t = 0;
    this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode);
    let e = 0;
    return this.ctrlKey && (e |= ua), this.altKey && (e |= ha), this.shiftKey && (e |= da), this.metaKey && (e |= fa), e |= t, e;
  }
  _computeKeyCodeChord() {
    let t = 0;
    return this.keyCode !== 5 && this.keyCode !== 4 && this.keyCode !== 6 && this.keyCode !== 57 && (t = this.keyCode), new Rr(this.ctrlKey, this.shiftKey, this.altKey, this.metaKey, t);
  }
};
var wo = /* @__PURE__ */ new WeakMap();
function pa(s15) {
  if (!s15.parent || s15.parent === s15) return null;
  try {
    let t = s15.location, e = s15.parent.location;
    if (t.origin !== "null" && e.origin !== "null" && t.origin !== e.origin) return null;
  } catch {
    return null;
  }
  return s15.parent;
}
var Lr = class {
  static getSameOriginWindowChain(t) {
    let e = wo.get(t);
    if (!e) {
      e = [], wo.set(t, e);
      let i8 = t, r5;
      do
        r5 = pa(i8), r5 ? e.push({ window: new WeakRef(i8), iframeElement: i8.frameElement || null }) : e.push({ window: new WeakRef(i8), iframeElement: null }), i8 = r5;
      while (i8);
    }
    return e.slice(0);
  }
  static getPositionOfChildWindowRelativeToAncestorWindow(t, e) {
    if (!e || t === e) return { top: 0, left: 0 };
    let i8 = 0, r5 = 0, n2 = this.getSameOriginWindowChain(t);
    for (let o of n2) {
      let l2 = o.window.deref();
      if (i8 += l2?.scrollY ?? 0, r5 += l2?.scrollX ?? 0, l2 === e || !o.iframeElement) break;
      let a = o.iframeElement.getBoundingClientRect();
      i8 += a.top, r5 += a.left;
    }
    return { top: i8, left: r5 };
  }
};
var qe = class {
  constructor(t, e) {
    this.timestamp = Date.now(), this.browserEvent = e, this.leftButton = e.button === 0, this.middleButton = e.button === 1, this.rightButton = e.button === 2, this.buttons = e.buttons, this.target = e.target, this.detail = e.detail || 1, e.type === "dblclick" && (this.detail = 2), this.ctrlKey = e.ctrlKey, this.shiftKey = e.shiftKey, this.altKey = e.altKey, this.metaKey = e.metaKey, typeof e.pageX == "number" ? (this.posx = e.pageX, this.posy = e.pageY) : (this.posx = e.clientX + this.target.ownerDocument.body.scrollLeft + this.target.ownerDocument.documentElement.scrollLeft, this.posy = e.clientY + this.target.ownerDocument.body.scrollTop + this.target.ownerDocument.documentElement.scrollTop);
    let i8 = Lr.getPositionOfChildWindowRelativeToAncestorWindow(t, e.view);
    this.posx -= i8.left, this.posy -= i8.top;
  }
  preventDefault() {
    this.browserEvent.preventDefault();
  }
  stopPropagation() {
    this.browserEvent.stopPropagation();
  }
};
var xi = class {
  constructor(t, e = 0, i8 = 0) {
    this.browserEvent = t || null, this.target = t ? t.target || t.targetNode || t.srcElement : null, this.deltaY = i8, this.deltaX = e;
    let r5 = false;
    if (Ti) {
      let n2 = navigator.userAgent.match(/Chrome\/(\d+)/);
      r5 = (n2 ? parseInt(n2[1]) : 123) <= 122;
    }
    if (t) {
      let n2 = t, o = t, l2 = t.view?.devicePixelRatio || 1;
      if (typeof n2.wheelDeltaY < "u") r5 ? this.deltaY = n2.wheelDeltaY / (120 * l2) : this.deltaY = n2.wheelDeltaY / 120;
      else if (typeof o.VERTICAL_AXIS < "u" && o.axis === o.VERTICAL_AXIS) this.deltaY = -o.detail / 3;
      else if (t.type === "wheel") {
        let a = t;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaY = -t.deltaY / 3 : this.deltaY = -t.deltaY : this.deltaY = -t.deltaY / 40;
      }
      if (typeof n2.wheelDeltaX < "u") Sr && wr ? this.deltaX = -(n2.wheelDeltaX / 120) : r5 ? this.deltaX = n2.wheelDeltaX / (120 * l2) : this.deltaX = n2.wheelDeltaX / 120;
      else if (typeof o.HORIZONTAL_AXIS < "u" && o.axis === o.HORIZONTAL_AXIS) this.deltaX = -t.detail / 3;
      else if (t.type === "wheel") {
        let a = t;
        a.deltaMode === a.DOM_DELTA_LINE ? Ei && !Te ? this.deltaX = -t.deltaX / 3 : this.deltaX = -t.deltaX : this.deltaX = -t.deltaX / 40;
      }
      this.deltaY === 0 && this.deltaX === 0 && t.wheelDelta && (r5 ? this.deltaY = t.wheelDelta / (120 * l2) : this.deltaY = t.wheelDelta / 120);
    }
  }
  preventDefault() {
    this.browserEvent?.preventDefault();
  }
  stopPropagation() {
    this.browserEvent?.stopPropagation();
  }
};
var Do = Object.freeze(function(s15, t) {
  let e = setTimeout(s15.bind(t), 0);
  return { dispose() {
    clearTimeout(e);
  } };
});
var ma;
((i8) => {
  function s15(r5) {
    return r5 === i8.None || r5 === i8.Cancelled || r5 instanceof ts ? true : !r5 || typeof r5 != "object" ? false : typeof r5.isCancellationRequested == "boolean" && typeof r5.onCancellationRequested == "function";
  }
  i8.isCancellationToken = s15, i8.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: $.None }), i8.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: Do });
})(ma ||= {});
var ts = class {
  constructor() {
    this._isCancelled = false;
    this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? Do : (this._emitter || (this._emitter = new v()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
};
var _a = Symbol("MicrotaskDelay");
var Ye = class {
  constructor(t, e) {
    this._isDisposed = false;
    this._token = -1, typeof t == "function" && typeof e == "number" && this.setIfNotSet(t, e);
  }
  dispose() {
    this.cancel(), this._isDisposed = true;
  }
  cancel() {
    this._token !== -1 && (clearTimeout(this._token), this._token = -1);
  }
  cancelAndSet(t, e) {
    if (this._isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed TimeoutTimer");
    this.cancel(), this._token = setTimeout(() => {
      this._token = -1, t();
    }, e);
  }
  setIfNotSet(t, e) {
    if (this._isDisposed) throw new Rt("Calling 'setIfNotSet' on a disposed TimeoutTimer");
    this._token === -1 && (this._token = setTimeout(() => {
      this._token = -1, t();
    }, e));
  }
};
var kr = class {
  constructor() {
    this.disposable = void 0;
    this.isDisposed = false;
  }
  cancel() {
    this.disposable?.dispose(), this.disposable = void 0;
  }
  cancelAndSet(t, e, i8 = globalThis) {
    if (this.isDisposed) throw new Rt("Calling 'cancelAndSet' on a disposed IntervalTimer");
    this.cancel();
    let r5 = i8.setInterval(() => {
      t();
    }, e);
    this.disposable = C(() => {
      i8.clearInterval(r5), this.disposable = void 0;
    });
  }
  dispose() {
    this.cancel(), this.isDisposed = true;
  }
};
var ba;
var Ar;
(function() {
  typeof globalThis.requestIdleCallback != "function" || typeof globalThis.cancelIdleCallback != "function" ? Ar = (s15, t) => {
    Eo(() => {
      if (e) return;
      let i8 = Date.now() + 15;
      t(Object.freeze({ didTimeout: true, timeRemaining() {
        return Math.max(0, i8 - Date.now());
      } }));
    });
    let e = false;
    return { dispose() {
      e || (e = true);
    } };
  } : Ar = (s15, t, e) => {
    let i8 = s15.requestIdleCallback(t, typeof e == "number" ? { timeout: e } : void 0), r5 = false;
    return { dispose() {
      r5 || (r5 = true, s15.cancelIdleCallback(i8));
    } };
  }, ba = (s15) => Ar(globalThis, s15);
})();
var va;
((e) => {
  async function s15(i8) {
    let r5, n2 = await Promise.all(i8.map((o) => o.then((l2) => l2, (l2) => {
      r5 || (r5 = l2);
    })));
    if (typeof r5 < "u") throw r5;
    return n2;
  }
  e.settled = s15;
  function t(i8) {
    return new Promise(async (r5, n2) => {
      try {
        await i8(r5, n2);
      } catch (o) {
        n2(o);
      }
    });
  }
  e.withAsyncBody = t;
})(va ||= {});
var _e = class _e2 {
  static fromArray(t) {
    return new _e2((e) => {
      e.emitMany(t);
    });
  }
  static fromPromise(t) {
    return new _e2(async (e) => {
      e.emitMany(await t);
    });
  }
  static fromPromises(t) {
    return new _e2(async (e) => {
      await Promise.all(t.map(async (i8) => e.emitOne(await i8)));
    });
  }
  static merge(t) {
    return new _e2(async (e) => {
      await Promise.all(t.map(async (i8) => {
        for await (let r5 of i8) e.emitOne(r5);
      }));
    });
  }
  constructor(t, e) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = e, this._onStateChanged = new v(), queueMicrotask(async () => {
      let i8 = { emitOne: (r5) => this.emitOne(r5), emitMany: (r5) => this.emitMany(r5), reject: (r5) => this.reject(r5) };
      try {
        await Promise.resolve(t(i8)), this.resolve();
      } catch (r5) {
        this.reject(r5);
      } finally {
        i8.emitOne = void 0, i8.emitMany = void 0, i8.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let t = 0;
    return { next: async () => {
      do {
        if (this._state === 2) throw this._error;
        if (t < this._results.length) return { done: false, value: this._results[t++] };
        if (this._state === 1) return { done: true, value: void 0 };
        await $.toPromise(this._onStateChanged.event);
      } while (true);
    }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
  }
  static map(t, e) {
    return new _e2(async (i8) => {
      for await (let r5 of t) i8.emitOne(e(r5));
    });
  }
  map(t) {
    return _e2.map(this, t);
  }
  static filter(t, e) {
    return new _e2(async (i8) => {
      for await (let r5 of t) e(r5) && i8.emitOne(r5);
    });
  }
  filter(t) {
    return _e2.filter(this, t);
  }
  static coalesce(t) {
    return _e2.filter(t, (e) => !!e);
  }
  coalesce() {
    return _e2.coalesce(this);
  }
  static async toPromise(t) {
    let e = [];
    for await (let i8 of t) e.push(i8);
    return e;
  }
  toPromise() {
    return _e2.toPromise(this);
  }
  emitOne(t) {
    this._state === 0 && (this._results.push(t), this._onStateChanged.fire());
  }
  emitMany(t) {
    this._state === 0 && (this._results = this._results.concat(t), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(t) {
    this._state === 0 && (this._state = 2, this._error = t, this._onStateChanged.fire());
  }
};
_e.EMPTY = _e.fromArray([]);
function Lo(s15) {
  return 55296 <= s15 && s15 <= 56319;
}
function is(s15) {
  return 56320 <= s15 && s15 <= 57343;
}
function Ao(s15, t) {
  return (s15 - 55296 << 10) + (t - 56320) + 65536;
}
function Mo(s15) {
  return ns(s15, 0);
}
function ns(s15, t) {
  switch (typeof s15) {
    case "object":
      return s15 === null ? je(349, t) : Array.isArray(s15) ? Ea(s15, t) : Ta(s15, t);
    case "string":
      return Po(s15, t);
    case "boolean":
      return Sa(s15, t);
    case "number":
      return je(s15, t);
    case "undefined":
      return je(937, t);
    default:
      return je(617, t);
  }
}
function je(s15, t) {
  return (t << 5) - t + s15 | 0;
}
function Sa(s15, t) {
  return je(s15 ? 433 : 863, t);
}
function Po(s15, t) {
  t = je(149417, t);
  for (let e = 0, i8 = s15.length; e < i8; e++) t = je(s15.charCodeAt(e), t);
  return t;
}
function Ea(s15, t) {
  return t = je(104579, t), s15.reduce((e, i8) => ns(i8, e), t);
}
function Ta(s15, t) {
  return t = je(181387, t), Object.keys(s15).sort().reduce((e, i8) => (e = Po(i8, e), ns(s15[i8], e)), t);
}
function rs(s15, t, e = 32) {
  let i8 = e - t, r5 = ~((1 << i8) - 1);
  return (s15 << t | (r5 & s15) >>> i8) >>> 0;
}
function ko(s15, t = 0, e = s15.byteLength, i8 = 0) {
  for (let r5 = 0; r5 < e; r5++) s15[t + r5] = i8;
}
function Ia(s15, t, e = "0") {
  for (; s15.length < t; ) s15 = e + s15;
  return s15;
}
function wi(s15, t = 32) {
  return s15 instanceof ArrayBuffer ? Array.from(new Uint8Array(s15)).map((e) => e.toString(16).padStart(2, "0")).join("") : Ia((s15 >>> 0).toString(16), t / 4);
}
var Cr = class Cr2 {
  constructor() {
    this._h0 = 1732584193;
    this._h1 = 4023233417;
    this._h2 = 2562383102;
    this._h3 = 271733878;
    this._h4 = 3285377520;
    this._buff = new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = false;
  }
  update(t) {
    let e = t.length;
    if (e === 0) return;
    let i8 = this._buff, r5 = this._buffLen, n2 = this._leftoverHighSurrogate, o, l2;
    for (n2 !== 0 ? (o = n2, l2 = -1, n2 = 0) : (o = t.charCodeAt(0), l2 = 0); ; ) {
      let a = o;
      if (Lo(o)) if (l2 + 1 < e) {
        let u2 = t.charCodeAt(l2 + 1);
        is(u2) ? (l2++, a = Ao(o, u2)) : a = 65533;
      } else {
        n2 = o;
        break;
      }
      else is(o) && (a = 65533);
      if (r5 = this._push(i8, r5, a), l2++, l2 < e) o = t.charCodeAt(l2);
      else break;
    }
    this._buffLen = r5, this._leftoverHighSurrogate = n2;
  }
  _push(t, e, i8) {
    return i8 < 128 ? t[e++] = i8 : i8 < 2048 ? (t[e++] = 192 | (i8 & 1984) >>> 6, t[e++] = 128 | (i8 & 63) >>> 0) : i8 < 65536 ? (t[e++] = 224 | (i8 & 61440) >>> 12, t[e++] = 128 | (i8 & 4032) >>> 6, t[e++] = 128 | (i8 & 63) >>> 0) : (t[e++] = 240 | (i8 & 1835008) >>> 18, t[e++] = 128 | (i8 & 258048) >>> 12, t[e++] = 128 | (i8 & 4032) >>> 6, t[e++] = 128 | (i8 & 63) >>> 0), e >= 64 && (this._step(), e -= 64, this._totalLen += 64, t[0] = t[64], t[1] = t[65], t[2] = t[66]), e;
  }
  digest() {
    return this._finished || (this._finished = true, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), wi(this._h0) + wi(this._h1) + wi(this._h2) + wi(this._h3) + wi(this._h4);
  }
  _wrapUp() {
    this._buff[this._buffLen++] = 128, ko(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), ko(this._buff));
    let t = 8 * this._totalLen;
    this._buffDV.setUint32(56, Math.floor(t / 4294967296), false), this._buffDV.setUint32(60, t % 4294967296, false), this._step();
  }
  _step() {
    let t = Cr2._bigBlock32, e = this._buffDV;
    for (let c2 = 0; c2 < 64; c2 += 4) t.setUint32(c2, e.getUint32(c2, false), false);
    for (let c2 = 64; c2 < 320; c2 += 4) t.setUint32(c2, rs(t.getUint32(c2 - 12, false) ^ t.getUint32(c2 - 32, false) ^ t.getUint32(c2 - 56, false) ^ t.getUint32(c2 - 64, false), 1), false);
    let i8 = this._h0, r5 = this._h1, n2 = this._h2, o = this._h3, l2 = this._h4, a, u2, h2;
    for (let c2 = 0; c2 < 80; c2++) c2 < 20 ? (a = r5 & n2 | ~r5 & o, u2 = 1518500249) : c2 < 40 ? (a = r5 ^ n2 ^ o, u2 = 1859775393) : c2 < 60 ? (a = r5 & n2 | r5 & o | n2 & o, u2 = 2400959708) : (a = r5 ^ n2 ^ o, u2 = 3395469782), h2 = rs(i8, 5) + a + l2 + u2 + t.getUint32(c2 * 4, false) & 4294967295, l2 = o, o = n2, n2 = rs(r5, 30), r5 = i8, i8 = h2;
    this._h0 = this._h0 + i8 & 4294967295, this._h1 = this._h1 + r5 & 4294967295, this._h2 = this._h2 + n2 & 4294967295, this._h3 = this._h3 + o & 4294967295, this._h4 = this._h4 + l2 & 4294967295;
  }
};
Cr._bigBlock32 = new DataView(new ArrayBuffer(320));
var { registerWindow: Bh, getWindow: be, getDocument: Nh, getWindows: Fh, getWindowsCount: Hh, getWindowId: Oo, getWindowById: Wh, hasWindow: Uh, onDidRegisterWindow: No, onWillUnregisterWindow: Kh, onDidUnregisterWindow: zh } = function() {
  let s15 = /* @__PURE__ */ new Map();
  fe;
  let t = { window: fe, disposables: new Ee() };
  s15.set(fe.vscodeWindowId, t);
  let e = new v(), i8 = new v(), r5 = new v();
  function n2(o, l2) {
    return (typeof o == "number" ? s15.get(o) : void 0) ?? (l2 ? t : void 0);
  }
  return { onDidRegisterWindow: e.event, onWillUnregisterWindow: r5.event, onDidUnregisterWindow: i8.event, registerWindow(o) {
    if (s15.has(o.vscodeWindowId)) return D.None;
    let l2 = new Ee(), a = { window: o, disposables: l2.add(new Ee()) };
    return s15.set(o.vscodeWindowId, a), l2.add(C(() => {
      s15.delete(o.vscodeWindowId), i8.fire(o);
    })), l2.add(L(o, Y.BEFORE_UNLOAD, () => {
      r5.fire(o);
    })), e.fire(a), l2;
  }, getWindows() {
    return s15.values();
  }, getWindowsCount() {
    return s15.size;
  }, getWindowId(o) {
    return o.vscodeWindowId;
  }, hasWindow(o) {
    return s15.has(o);
  }, getWindowById: n2, getWindow(o) {
    let l2 = o;
    if (l2?.ownerDocument?.defaultView) return l2.ownerDocument.defaultView.window;
    let a = o;
    return a?.view ? a.view.window : fe;
  }, getDocument(o) {
    return be(o).document;
  } };
}();
var ss = class {
  constructor(t, e, i8, r5) {
    this._node = t, this._type = e, this._handler = i8, this._options = r5 || false, this._node.addEventListener(this._type, this._handler, this._options);
  }
  dispose() {
    this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
  }
};
function L(s15, t, e, i8) {
  return new ss(s15, t, e, i8);
}
function ya(s15, t) {
  return function(e) {
    return t(new qe(s15, e));
  };
}
function xa(s15) {
  return function(t) {
    return s15(new ft(t));
  };
}
var os = function(t, e, i8, r5) {
  let n2 = i8;
  return e === "click" || e === "mousedown" || e === "contextmenu" ? n2 = ya(be(t), i8) : (e === "keydown" || e === "keypress" || e === "keyup") && (n2 = xa(i8)), L(t, e, n2, r5);
};
var wa;
var mt;
var Mr = class extends kr {
  constructor(t) {
    super(), this.defaultTarget = t && be(t);
  }
  cancelAndSet(t, e, i8) {
    return super.cancelAndSet(t, e, i8 ?? this.defaultTarget);
  }
};
var Di = class {
  constructor(t, e = 0) {
    this._runner = t, this.priority = e, this._canceled = false;
  }
  dispose() {
    this._canceled = true;
  }
  execute() {
    if (!this._canceled) try {
      this._runner();
    } catch (t) {
      Lt(t);
    }
  }
  static sort(t, e) {
    return e.priority - t.priority;
  }
};
(function() {
  let s15 = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), i8 = /* @__PURE__ */ new Map(), r5 = (n2) => {
    e.set(n2, false);
    let o = s15.get(n2) ?? [];
    for (t.set(n2, o), s15.set(n2, []), i8.set(n2, true); o.length > 0; ) o.sort(Di.sort), o.shift().execute();
    i8.set(n2, false);
  };
  mt = (n2, o, l2 = 0) => {
    let a = Oo(n2), u2 = new Di(o, l2), h2 = s15.get(a);
    return h2 || (h2 = [], s15.set(a, h2)), h2.push(u2), e.get(a) || (e.set(a, true), n2.requestAnimationFrame(() => r5(a))), u2;
  }, wa = (n2, o, l2) => {
    let a = Oo(n2);
    if (i8.get(a)) {
      let u2 = new Di(o, l2), h2 = t.get(a);
      return h2 || (h2 = [], t.set(a, h2)), h2.push(u2), u2;
    } else return mt(n2, o, l2);
  };
})();
var pt = class pt2 {
  constructor(t, e) {
    this.width = t;
    this.height = e;
  }
  with(t = this.width, e = this.height) {
    return t !== this.width || e !== this.height ? new pt2(t, e) : this;
  }
  static is(t) {
    return typeof t == "object" && typeof t.height == "number" && typeof t.width == "number";
  }
  static lift(t) {
    return t instanceof pt2 ? t : new pt2(t.width, t.height);
  }
  static equals(t, e) {
    return t === e ? true : !t || !e ? false : t.width === e.width && t.height === e.height;
  }
};
pt.None = new pt(0, 0);
function Fo(s15) {
  let t = s15.getBoundingClientRect(), e = be(s15);
  return { left: t.left + e.scrollX, top: t.top + e.scrollY, width: t.width, height: t.height };
}
var Gh = new class {
  constructor() {
    this.mutationObservers = /* @__PURE__ */ new Map();
  }
  observe(s15, t, e) {
    let i8 = this.mutationObservers.get(s15);
    i8 || (i8 = /* @__PURE__ */ new Map(), this.mutationObservers.set(s15, i8));
    let r5 = Mo(e), n2 = i8.get(r5);
    if (n2) n2.users += 1;
    else {
      let o = new v(), l2 = new MutationObserver((u2) => o.fire(u2));
      l2.observe(s15, e);
      let a = n2 = { users: 1, observer: l2, onDidMutate: o.event };
      t.add(C(() => {
        a.users -= 1, a.users === 0 && (o.dispose(), l2.disconnect(), i8?.delete(r5), i8?.size === 0 && this.mutationObservers.delete(s15));
      })), i8.set(r5, n2);
    }
    return n2.onDidMutate;
  }
}();
var Y = { CLICK: "click", AUXCLICK: "auxclick", DBLCLICK: "dblclick", MOUSE_UP: "mouseup", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_MOVE: "mousemove", MOUSE_OUT: "mouseout", MOUSE_ENTER: "mouseenter", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", POINTER_LEAVE: "pointerleave", CONTEXT_MENU: "contextmenu", WHEEL: "wheel", KEY_DOWN: "keydown", KEY_PRESS: "keypress", KEY_UP: "keyup", LOAD: "load", BEFORE_UNLOAD: "beforeunload", UNLOAD: "unload", PAGE_SHOW: "pageshow", PAGE_HIDE: "pagehide", PASTE: "paste", ABORT: "abort", ERROR: "error", RESIZE: "resize", SCROLL: "scroll", FULLSCREEN_CHANGE: "fullscreenchange", WK_FULLSCREEN_CHANGE: "webkitfullscreenchange", SELECT: "select", CHANGE: "change", SUBMIT: "submit", RESET: "reset", FOCUS: "focus", FOCUS_IN: "focusin", FOCUS_OUT: "focusout", BLUR: "blur", INPUT: "input", STORAGE: "storage", DRAG_START: "dragstart", DRAG: "drag", DRAG_ENTER: "dragenter", DRAG_LEAVE: "dragleave", DRAG_OVER: "dragover", DROP: "drop", DRAG_END: "dragend", ANIMATION_START: Bt ? "webkitAnimationStart" : "animationstart", ANIMATION_END: Bt ? "webkitAnimationEnd" : "animationend", ANIMATION_ITERATION: Bt ? "webkitAnimationIteration" : "animationiteration" };
var Da = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
function Ho(s15, t, e, ...i8) {
  let r5 = Da.exec(t);
  if (!r5) throw new Error("Bad use of emmet");
  let n2 = r5[1] || "div", o;
  return s15 !== "http://www.w3.org/1999/xhtml" ? o = document.createElementNS(s15, n2) : o = document.createElement(n2), r5[3] && (o.id = r5[3]), r5[4] && (o.className = r5[4].replace(/\./g, " ").trim()), e && Object.entries(e).forEach(([l2, a]) => {
    typeof a > "u" || (/^on\w+$/.test(l2) ? o[l2] = a : l2 === "selected" ? a && o.setAttribute(l2, "true") : o.setAttribute(l2, a));
  }), o.append(...i8), o;
}
function Ra(s15, t, ...e) {
  return Ho("http://www.w3.org/1999/xhtml", s15, t, ...e);
}
Ra.SVG = function(s15, t, ...e) {
  return Ho("http://www.w3.org/2000/svg", s15, t, ...e);
};
var ls = class {
  constructor(t) {
    this.domNode = t;
    this._maxWidth = "";
    this._width = "";
    this._height = "";
    this._top = "";
    this._left = "";
    this._bottom = "";
    this._right = "";
    this._paddingTop = "";
    this._paddingLeft = "";
    this._paddingBottom = "";
    this._paddingRight = "";
    this._fontFamily = "";
    this._fontWeight = "";
    this._fontSize = "";
    this._fontStyle = "";
    this._fontFeatureSettings = "";
    this._fontVariationSettings = "";
    this._textDecoration = "";
    this._lineHeight = "";
    this._letterSpacing = "";
    this._className = "";
    this._display = "";
    this._position = "";
    this._visibility = "";
    this._color = "";
    this._backgroundColor = "";
    this._layerHint = false;
    this._contain = "none";
    this._boxShadow = "";
  }
  setMaxWidth(t) {
    let e = Ie(t);
    this._maxWidth !== e && (this._maxWidth = e, this.domNode.style.maxWidth = this._maxWidth);
  }
  setWidth(t) {
    let e = Ie(t);
    this._width !== e && (this._width = e, this.domNode.style.width = this._width);
  }
  setHeight(t) {
    let e = Ie(t);
    this._height !== e && (this._height = e, this.domNode.style.height = this._height);
  }
  setTop(t) {
    let e = Ie(t);
    this._top !== e && (this._top = e, this.domNode.style.top = this._top);
  }
  setLeft(t) {
    let e = Ie(t);
    this._left !== e && (this._left = e, this.domNode.style.left = this._left);
  }
  setBottom(t) {
    let e = Ie(t);
    this._bottom !== e && (this._bottom = e, this.domNode.style.bottom = this._bottom);
  }
  setRight(t) {
    let e = Ie(t);
    this._right !== e && (this._right = e, this.domNode.style.right = this._right);
  }
  setPaddingTop(t) {
    let e = Ie(t);
    this._paddingTop !== e && (this._paddingTop = e, this.domNode.style.paddingTop = this._paddingTop);
  }
  setPaddingLeft(t) {
    let e = Ie(t);
    this._paddingLeft !== e && (this._paddingLeft = e, this.domNode.style.paddingLeft = this._paddingLeft);
  }
  setPaddingBottom(t) {
    let e = Ie(t);
    this._paddingBottom !== e && (this._paddingBottom = e, this.domNode.style.paddingBottom = this._paddingBottom);
  }
  setPaddingRight(t) {
    let e = Ie(t);
    this._paddingRight !== e && (this._paddingRight = e, this.domNode.style.paddingRight = this._paddingRight);
  }
  setFontFamily(t) {
    this._fontFamily !== t && (this._fontFamily = t, this.domNode.style.fontFamily = this._fontFamily);
  }
  setFontWeight(t) {
    this._fontWeight !== t && (this._fontWeight = t, this.domNode.style.fontWeight = this._fontWeight);
  }
  setFontSize(t) {
    let e = Ie(t);
    this._fontSize !== e && (this._fontSize = e, this.domNode.style.fontSize = this._fontSize);
  }
  setFontStyle(t) {
    this._fontStyle !== t && (this._fontStyle = t, this.domNode.style.fontStyle = this._fontStyle);
  }
  setFontFeatureSettings(t) {
    this._fontFeatureSettings !== t && (this._fontFeatureSettings = t, this.domNode.style.fontFeatureSettings = this._fontFeatureSettings);
  }
  setFontVariationSettings(t) {
    this._fontVariationSettings !== t && (this._fontVariationSettings = t, this.domNode.style.fontVariationSettings = this._fontVariationSettings);
  }
  setTextDecoration(t) {
    this._textDecoration !== t && (this._textDecoration = t, this.domNode.style.textDecoration = this._textDecoration);
  }
  setLineHeight(t) {
    let e = Ie(t);
    this._lineHeight !== e && (this._lineHeight = e, this.domNode.style.lineHeight = this._lineHeight);
  }
  setLetterSpacing(t) {
    let e = Ie(t);
    this._letterSpacing !== e && (this._letterSpacing = e, this.domNode.style.letterSpacing = this._letterSpacing);
  }
  setClassName(t) {
    this._className !== t && (this._className = t, this.domNode.className = this._className);
  }
  toggleClassName(t, e) {
    this.domNode.classList.toggle(t, e), this._className = this.domNode.className;
  }
  setDisplay(t) {
    this._display !== t && (this._display = t, this.domNode.style.display = this._display);
  }
  setPosition(t) {
    this._position !== t && (this._position = t, this.domNode.style.position = this._position);
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this.domNode.style.visibility = this._visibility);
  }
  setColor(t) {
    this._color !== t && (this._color = t, this.domNode.style.color = this._color);
  }
  setBackgroundColor(t) {
    this._backgroundColor !== t && (this._backgroundColor = t, this.domNode.style.backgroundColor = this._backgroundColor);
  }
  setLayerHinting(t) {
    this._layerHint !== t && (this._layerHint = t, this.domNode.style.transform = this._layerHint ? "translate3d(0px, 0px, 0px)" : "");
  }
  setBoxShadow(t) {
    this._boxShadow !== t && (this._boxShadow = t, this.domNode.style.boxShadow = t);
  }
  setContain(t) {
    this._contain !== t && (this._contain = t, this.domNode.style.contain = this._contain);
  }
  setAttribute(t, e) {
    this.domNode.setAttribute(t, e);
  }
  removeAttribute(t) {
    this.domNode.removeAttribute(t);
  }
  appendChild(t) {
    this.domNode.appendChild(t.domNode);
  }
  removeChild(t) {
    this.domNode.removeChild(t.domNode);
  }
};
function Ie(s15) {
  return typeof s15 == "number" ? `${s15}px` : s15;
}
function _t(s15) {
  return new ls(s15);
}
var Wt = class {
  constructor() {
    this._hooks = new Ee();
    this._pointerMoveCallback = null;
    this._onStopCallback = null;
  }
  dispose() {
    this.stopMonitoring(false), this._hooks.dispose();
  }
  stopMonitoring(t, e) {
    if (!this.isMonitoring()) return;
    this._hooks.clear(), this._pointerMoveCallback = null;
    let i8 = this._onStopCallback;
    this._onStopCallback = null, t && i8 && i8(e);
  }
  isMonitoring() {
    return !!this._pointerMoveCallback;
  }
  startMonitoring(t, e, i8, r5, n2) {
    this.isMonitoring() && this.stopMonitoring(false), this._pointerMoveCallback = r5, this._onStopCallback = n2;
    let o = t;
    try {
      t.setPointerCapture(e), this._hooks.add(C(() => {
        try {
          t.releasePointerCapture(e);
        } catch {
        }
      }));
    } catch {
      o = be(t);
    }
    this._hooks.add(L(o, Y.POINTER_MOVE, (l2) => {
      if (l2.buttons !== i8) {
        this.stopMonitoring(true);
        return;
      }
      l2.preventDefault(), this._pointerMoveCallback(l2);
    })), this._hooks.add(L(o, Y.POINTER_UP, (l2) => this.stopMonitoring(true)));
  }
};
function Wo(s15, t, e) {
  let i8 = null, r5 = null;
  if (typeof e.value == "function" ? (i8 = "value", r5 = e.value, r5.length !== 0 && console.warn("Memoize should only be used in functions with zero parameters")) : typeof e.get == "function" && (i8 = "get", r5 = e.get), !r5) throw new Error("not supported");
  let n2 = `$memoize$${t}`;
  e[i8] = function(...o) {
    return this.hasOwnProperty(n2) || Object.defineProperty(this, n2, { configurable: false, enumerable: false, writable: false, value: r5.apply(this, o) }), this[n2];
  };
}
var He;
((n2) => (n2.Tap = "-xterm-gesturetap", n2.Change = "-xterm-gesturechange", n2.Start = "-xterm-gesturestart", n2.End = "-xterm-gesturesend", n2.Contextmenu = "-xterm-gesturecontextmenu"))(He ||= {});
var Q = class Q2 extends D {
  constructor() {
    super();
    this.dispatched = false;
    this.targets = new Ct();
    this.ignoreTargets = new Ct();
    this.activeTouches = {}, this.handle = null, this._lastSetTapCountTime = 0, this._register($.runAndSubscribe(No, ({ window: e, disposables: i8 }) => {
      i8.add(L(e.document, "touchstart", (r5) => this.onTouchStart(r5), { passive: false })), i8.add(L(e.document, "touchend", (r5) => this.onTouchEnd(e, r5))), i8.add(L(e.document, "touchmove", (r5) => this.onTouchMove(r5), { passive: false }));
    }, { window: fe, disposables: this._store }));
  }
  static addTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i8 = Q2.INSTANCE.targets.push(e);
    return C(i8);
  }
  static ignoreTarget(e) {
    if (!Q2.isTouchDevice()) return D.None;
    Q2.INSTANCE || (Q2.INSTANCE = Gn(new Q2()));
    let i8 = Q2.INSTANCE.ignoreTargets.push(e);
    return C(i8);
  }
  static isTouchDevice() {
    return "ontouchstart" in fe || navigator.maxTouchPoints > 0;
  }
  dispose() {
    this.handle && (this.handle.dispose(), this.handle = null), super.dispose();
  }
  onTouchStart(e) {
    let i8 = Date.now();
    this.handle && (this.handle.dispose(), this.handle = null);
    for (let r5 = 0, n2 = e.targetTouches.length; r5 < n2; r5++) {
      let o = e.targetTouches.item(r5);
      this.activeTouches[o.identifier] = { id: o.identifier, initialTarget: o.target, initialTimeStamp: i8, initialPageX: o.pageX, initialPageY: o.pageY, rollingTimestamps: [i8], rollingPageX: [o.pageX], rollingPageY: [o.pageY] };
      let l2 = this.newGestureEvent(He.Start, o.target);
      l2.pageX = o.pageX, l2.pageY = o.pageY, this.dispatchEvent(l2);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
  onTouchEnd(e, i8) {
    let r5 = Date.now(), n2 = Object.keys(this.activeTouches).length;
    for (let o = 0, l2 = i8.changedTouches.length; o < l2; o++) {
      let a = i8.changedTouches.item(o);
      if (!this.activeTouches.hasOwnProperty(String(a.identifier))) {
        console.warn("move of an UNKNOWN touch", a);
        continue;
      }
      let u2 = this.activeTouches[a.identifier], h2 = Date.now() - u2.initialTimeStamp;
      if (h2 < Q2.HOLD_DELAY && Math.abs(u2.initialPageX - Se(u2.rollingPageX)) < 30 && Math.abs(u2.initialPageY - Se(u2.rollingPageY)) < 30) {
        let c2 = this.newGestureEvent(He.Tap, u2.initialTarget);
        c2.pageX = Se(u2.rollingPageX), c2.pageY = Se(u2.rollingPageY), this.dispatchEvent(c2);
      } else if (h2 >= Q2.HOLD_DELAY && Math.abs(u2.initialPageX - Se(u2.rollingPageX)) < 30 && Math.abs(u2.initialPageY - Se(u2.rollingPageY)) < 30) {
        let c2 = this.newGestureEvent(He.Contextmenu, u2.initialTarget);
        c2.pageX = Se(u2.rollingPageX), c2.pageY = Se(u2.rollingPageY), this.dispatchEvent(c2);
      } else if (n2 === 1) {
        let c2 = Se(u2.rollingPageX), d2 = Se(u2.rollingPageY), _4 = Se(u2.rollingTimestamps) - u2.rollingTimestamps[0], p2 = c2 - u2.rollingPageX[0], m2 = d2 - u2.rollingPageY[0], f2 = [...this.targets].filter((A3) => u2.initialTarget instanceof Node && A3.contains(u2.initialTarget));
        this.inertia(e, f2, r5, Math.abs(p2) / _4, p2 > 0 ? 1 : -1, c2, Math.abs(m2) / _4, m2 > 0 ? 1 : -1, d2);
      }
      this.dispatchEvent(this.newGestureEvent(He.End, u2.initialTarget)), delete this.activeTouches[a.identifier];
    }
    this.dispatched && (i8.preventDefault(), i8.stopPropagation(), this.dispatched = false);
  }
  newGestureEvent(e, i8) {
    let r5 = document.createEvent("CustomEvent");
    return r5.initEvent(e, false, true), r5.initialTarget = i8, r5.tapCount = 0, r5;
  }
  dispatchEvent(e) {
    if (e.type === He.Tap) {
      let i8 = (/* @__PURE__ */ new Date()).getTime(), r5 = 0;
      i8 - this._lastSetTapCountTime > Q2.CLEAR_TAP_COUNT_TIME ? r5 = 1 : r5 = 2, this._lastSetTapCountTime = i8, e.tapCount = r5;
    } else (e.type === He.Change || e.type === He.Contextmenu) && (this._lastSetTapCountTime = 0);
    if (e.initialTarget instanceof Node) {
      for (let r5 of this.ignoreTargets) if (r5.contains(e.initialTarget)) return;
      let i8 = [];
      for (let r5 of this.targets) if (r5.contains(e.initialTarget)) {
        let n2 = 0, o = e.initialTarget;
        for (; o && o !== r5; ) n2++, o = o.parentElement;
        i8.push([n2, r5]);
      }
      i8.sort((r5, n2) => r5[0] - n2[0]);
      for (let [r5, n2] of i8) n2.dispatchEvent(e), this.dispatched = true;
    }
  }
  inertia(e, i8, r5, n2, o, l2, a, u2, h2) {
    this.handle = mt(e, () => {
      let c2 = Date.now(), d2 = c2 - r5, _4 = 0, p2 = 0, m2 = true;
      n2 += Q2.SCROLL_FRICTION * d2, a += Q2.SCROLL_FRICTION * d2, n2 > 0 && (m2 = false, _4 = o * n2 * d2), a > 0 && (m2 = false, p2 = u2 * a * d2);
      let f2 = this.newGestureEvent(He.Change);
      f2.translationX = _4, f2.translationY = p2, i8.forEach((A3) => A3.dispatchEvent(f2)), m2 || this.inertia(e, i8, c2, n2, o, l2 + _4, a, u2, h2 + p2);
    });
  }
  onTouchMove(e) {
    let i8 = Date.now();
    for (let r5 = 0, n2 = e.changedTouches.length; r5 < n2; r5++) {
      let o = e.changedTouches.item(r5);
      if (!this.activeTouches.hasOwnProperty(String(o.identifier))) {
        console.warn("end of an UNKNOWN touch", o);
        continue;
      }
      let l2 = this.activeTouches[o.identifier], a = this.newGestureEvent(He.Change, l2.initialTarget);
      a.translationX = o.pageX - Se(l2.rollingPageX), a.translationY = o.pageY - Se(l2.rollingPageY), a.pageX = o.pageX, a.pageY = o.pageY, this.dispatchEvent(a), l2.rollingPageX.length > 3 && (l2.rollingPageX.shift(), l2.rollingPageY.shift(), l2.rollingTimestamps.shift()), l2.rollingPageX.push(o.pageX), l2.rollingPageY.push(o.pageY), l2.rollingTimestamps.push(i8);
    }
    this.dispatched && (e.preventDefault(), e.stopPropagation(), this.dispatched = false);
  }
};
Q.SCROLL_FRICTION = -5e-3, Q.HOLD_DELAY = 700, Q.CLEAR_TAP_COUNT_TIME = 400, M([Wo], Q, "isTouchDevice", 1);
var Pr = Q;
var lt = class extends D {
  onclick(t, e) {
    this._register(L(t, Y.CLICK, (i8) => e(new qe(be(t), i8))));
  }
  onmousedown(t, e) {
    this._register(L(t, Y.MOUSE_DOWN, (i8) => e(new qe(be(t), i8))));
  }
  onmouseover(t, e) {
    this._register(L(t, Y.MOUSE_OVER, (i8) => e(new qe(be(t), i8))));
  }
  onmouseleave(t, e) {
    this._register(L(t, Y.MOUSE_LEAVE, (i8) => e(new qe(be(t), i8))));
  }
  onkeydown(t, e) {
    this._register(L(t, Y.KEY_DOWN, (i8) => e(new ft(i8))));
  }
  onkeyup(t, e) {
    this._register(L(t, Y.KEY_UP, (i8) => e(new ft(i8))));
  }
  oninput(t, e) {
    this._register(L(t, Y.INPUT, e));
  }
  onblur(t, e) {
    this._register(L(t, Y.BLUR, e));
  }
  onfocus(t, e) {
    this._register(L(t, Y.FOCUS, e));
  }
  onchange(t, e) {
    this._register(L(t, Y.CHANGE, e));
  }
  ignoreGesture(t) {
    return Pr.ignoreTarget(t);
  }
};
var Uo = 11;
var Or = class extends lt {
  constructor(t) {
    super(), this._onActivate = t.onActivate, this.bgDomNode = document.createElement("div"), this.bgDomNode.className = "arrow-background", this.bgDomNode.style.position = "absolute", this.bgDomNode.style.width = t.bgWidth + "px", this.bgDomNode.style.height = t.bgHeight + "px", typeof t.top < "u" && (this.bgDomNode.style.top = "0px"), typeof t.left < "u" && (this.bgDomNode.style.left = "0px"), typeof t.bottom < "u" && (this.bgDomNode.style.bottom = "0px"), typeof t.right < "u" && (this.bgDomNode.style.right = "0px"), this.domNode = document.createElement("div"), this.domNode.className = t.className, this.domNode.style.position = "absolute", this.domNode.style.width = Uo + "px", this.domNode.style.height = Uo + "px", typeof t.top < "u" && (this.domNode.style.top = t.top + "px"), typeof t.left < "u" && (this.domNode.style.left = t.left + "px"), typeof t.bottom < "u" && (this.domNode.style.bottom = t.bottom + "px"), typeof t.right < "u" && (this.domNode.style.right = t.right + "px"), this._pointerMoveMonitor = this._register(new Wt()), this._register(os(this.bgDomNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._register(os(this.domNode, Y.POINTER_DOWN, (e) => this._arrowPointerDown(e))), this._pointerdownRepeatTimer = this._register(new Mr()), this._pointerdownScheduleRepeatTimer = this._register(new Ye());
  }
  _arrowPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e = () => {
      this._pointerdownRepeatTimer.cancelAndSet(() => this._onActivate(), 1e3 / 24, be(t));
    };
    this._onActivate(), this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancelAndSet(e, 200), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (i8) => {
    }, () => {
      this._pointerdownRepeatTimer.cancel(), this._pointerdownScheduleRepeatTimer.cancel();
    }), t.preventDefault();
  }
};
var cs = class s9 {
  constructor(t, e, i8, r5, n2, o, l2) {
    this._forceIntegerValues = t;
    this._scrollStateBrand = void 0;
    this._forceIntegerValues && (e = e | 0, i8 = i8 | 0, r5 = r5 | 0, n2 = n2 | 0, o = o | 0, l2 = l2 | 0), this.rawScrollLeft = r5, this.rawScrollTop = l2, e < 0 && (e = 0), r5 + e > i8 && (r5 = i8 - e), r5 < 0 && (r5 = 0), n2 < 0 && (n2 = 0), l2 + n2 > o && (l2 = o - n2), l2 < 0 && (l2 = 0), this.width = e, this.scrollWidth = i8, this.scrollLeft = r5, this.height = n2, this.scrollHeight = o, this.scrollTop = l2;
  }
  equals(t) {
    return this.rawScrollLeft === t.rawScrollLeft && this.rawScrollTop === t.rawScrollTop && this.width === t.width && this.scrollWidth === t.scrollWidth && this.scrollLeft === t.scrollLeft && this.height === t.height && this.scrollHeight === t.scrollHeight && this.scrollTop === t.scrollTop;
  }
  withScrollDimensions(t, e) {
    return new s9(this._forceIntegerValues, typeof t.width < "u" ? t.width : this.width, typeof t.scrollWidth < "u" ? t.scrollWidth : this.scrollWidth, e ? this.rawScrollLeft : this.scrollLeft, typeof t.height < "u" ? t.height : this.height, typeof t.scrollHeight < "u" ? t.scrollHeight : this.scrollHeight, e ? this.rawScrollTop : this.scrollTop);
  }
  withScrollPosition(t) {
    return new s9(this._forceIntegerValues, this.width, this.scrollWidth, typeof t.scrollLeft < "u" ? t.scrollLeft : this.rawScrollLeft, this.height, this.scrollHeight, typeof t.scrollTop < "u" ? t.scrollTop : this.rawScrollTop);
  }
  createScrollEvent(t, e) {
    let i8 = this.width !== t.width, r5 = this.scrollWidth !== t.scrollWidth, n2 = this.scrollLeft !== t.scrollLeft, o = this.height !== t.height, l2 = this.scrollHeight !== t.scrollHeight, a = this.scrollTop !== t.scrollTop;
    return { inSmoothScrolling: e, oldWidth: t.width, oldScrollWidth: t.scrollWidth, oldScrollLeft: t.scrollLeft, width: this.width, scrollWidth: this.scrollWidth, scrollLeft: this.scrollLeft, oldHeight: t.height, oldScrollHeight: t.scrollHeight, oldScrollTop: t.scrollTop, height: this.height, scrollHeight: this.scrollHeight, scrollTop: this.scrollTop, widthChanged: i8, scrollWidthChanged: r5, scrollLeftChanged: n2, heightChanged: o, scrollHeightChanged: l2, scrollTopChanged: a };
  }
};
var Ri = class extends D {
  constructor(e) {
    super();
    this._scrollableBrand = void 0;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._smoothScrollDuration = e.smoothScrollDuration, this._scheduleAtNextAnimationFrame = e.scheduleAtNextAnimationFrame, this._state = new cs(e.forceIntegerValues, 0, 0, 0, 0, 0, 0), this._smoothScrolling = null;
  }
  dispose() {
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), super.dispose();
  }
  setSmoothScrollDuration(e) {
    this._smoothScrollDuration = e;
  }
  validateScrollPosition(e) {
    return this._state.withScrollPosition(e);
  }
  getScrollDimensions() {
    return this._state;
  }
  setScrollDimensions(e, i8) {
    let r5 = this._state.withScrollDimensions(e, i8);
    this._setState(r5, !!this._smoothScrolling), this._smoothScrolling?.acceptScrollDimensions(this._state);
  }
  getFutureScrollPosition() {
    return this._smoothScrolling ? this._smoothScrolling.to : this._state;
  }
  getCurrentScrollPosition() {
    return this._state;
  }
  setScrollPositionNow(e) {
    let i8 = this._state.withScrollPosition(e);
    this._smoothScrolling && (this._smoothScrolling.dispose(), this._smoothScrolling = null), this._setState(i8, false);
  }
  setScrollPositionSmooth(e, i8) {
    if (this._smoothScrollDuration === 0) return this.setScrollPositionNow(e);
    if (this._smoothScrolling) {
      e = { scrollLeft: typeof e.scrollLeft > "u" ? this._smoothScrolling.to.scrollLeft : e.scrollLeft, scrollTop: typeof e.scrollTop > "u" ? this._smoothScrolling.to.scrollTop : e.scrollTop };
      let r5 = this._state.withScrollPosition(e);
      if (this._smoothScrolling.to.scrollLeft === r5.scrollLeft && this._smoothScrolling.to.scrollTop === r5.scrollTop) return;
      let n2;
      i8 ? n2 = new Nr(this._smoothScrolling.from, r5, this._smoothScrolling.startTime, this._smoothScrolling.duration) : n2 = this._smoothScrolling.combine(this._state, r5, this._smoothScrollDuration), this._smoothScrolling.dispose(), this._smoothScrolling = n2;
    } else {
      let r5 = this._state.withScrollPosition(e);
      this._smoothScrolling = Nr.start(this._state, r5, this._smoothScrollDuration);
    }
    this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
      this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
    });
  }
  hasPendingScrollAnimation() {
    return !!this._smoothScrolling;
  }
  _performSmoothScrolling() {
    if (!this._smoothScrolling) return;
    let e = this._smoothScrolling.tick(), i8 = this._state.withScrollPosition(e);
    if (this._setState(i8, true), !!this._smoothScrolling) {
      if (e.isDone) {
        this._smoothScrolling.dispose(), this._smoothScrolling = null;
        return;
      }
      this._smoothScrolling.animationFrameDisposable = this._scheduleAtNextAnimationFrame(() => {
        this._smoothScrolling && (this._smoothScrolling.animationFrameDisposable = null, this._performSmoothScrolling());
      });
    }
  }
  _setState(e, i8) {
    let r5 = this._state;
    r5.equals(e) || (this._state = e, this._onScroll.fire(this._state.createScrollEvent(r5, i8)));
  }
};
var Br = class {
  constructor(t, e, i8) {
    this.scrollLeft = t, this.scrollTop = e, this.isDone = i8;
  }
};
function as(s15, t) {
  let e = t - s15;
  return function(i8) {
    return s15 + e * ka(i8);
  };
}
function La(s15, t, e) {
  return function(i8) {
    return i8 < e ? s15(i8 / e) : t((i8 - e) / (1 - e));
  };
}
var Nr = class s10 {
  constructor(t, e, i8, r5) {
    this.from = t, this.to = e, this.duration = r5, this.startTime = i8, this.animationFrameDisposable = null, this._initAnimations();
  }
  _initAnimations() {
    this.scrollLeft = this._initAnimation(this.from.scrollLeft, this.to.scrollLeft, this.to.width), this.scrollTop = this._initAnimation(this.from.scrollTop, this.to.scrollTop, this.to.height);
  }
  _initAnimation(t, e, i8) {
    if (Math.abs(t - e) > 2.5 * i8) {
      let n2, o;
      return t < e ? (n2 = t + 0.75 * i8, o = e - 0.75 * i8) : (n2 = t - 0.75 * i8, o = e + 0.75 * i8), La(as(t, n2), as(o, e), 0.33);
    }
    return as(t, e);
  }
  dispose() {
    this.animationFrameDisposable !== null && (this.animationFrameDisposable.dispose(), this.animationFrameDisposable = null);
  }
  acceptScrollDimensions(t) {
    this.to = t.withScrollPosition(this.to), this._initAnimations();
  }
  tick() {
    return this._tick(Date.now());
  }
  _tick(t) {
    let e = (t - this.startTime) / this.duration;
    if (e < 1) {
      let i8 = this.scrollLeft(e), r5 = this.scrollTop(e);
      return new Br(i8, r5, false);
    }
    return new Br(this.to.scrollLeft, this.to.scrollTop, true);
  }
  combine(t, e, i8) {
    return s10.start(t, e, i8);
  }
  static start(t, e, i8) {
    i8 = i8 + 10;
    let r5 = Date.now() - 10;
    return new s10(t, e, r5, i8);
  }
};
function Aa(s15) {
  return Math.pow(s15, 3);
}
function ka(s15) {
  return 1 - Aa(1 - s15);
}
var Fr = class extends D {
  constructor(t, e, i8) {
    super(), this._visibility = t, this._visibleClassName = e, this._invisibleClassName = i8, this._domNode = null, this._isVisible = false, this._isNeeded = false, this._rawShouldBeVisible = false, this._shouldBeVisible = false, this._revealTimer = this._register(new Ye());
  }
  setVisibility(t) {
    this._visibility !== t && (this._visibility = t, this._updateShouldBeVisible());
  }
  setShouldBeVisible(t) {
    this._rawShouldBeVisible = t, this._updateShouldBeVisible();
  }
  _applyVisibilitySetting() {
    return this._visibility === 2 ? false : this._visibility === 3 ? true : this._rawShouldBeVisible;
  }
  _updateShouldBeVisible() {
    let t = this._applyVisibilitySetting();
    this._shouldBeVisible !== t && (this._shouldBeVisible = t, this.ensureVisibility());
  }
  setIsNeeded(t) {
    this._isNeeded !== t && (this._isNeeded = t, this.ensureVisibility());
  }
  setDomNode(t) {
    this._domNode = t, this._domNode.setClassName(this._invisibleClassName), this.setShouldBeVisible(false);
  }
  ensureVisibility() {
    if (!this._isNeeded) {
      this._hide(false);
      return;
    }
    this._shouldBeVisible ? this._reveal() : this._hide(true);
  }
  _reveal() {
    this._isVisible || (this._isVisible = true, this._revealTimer.setIfNotSet(() => {
      this._domNode?.setClassName(this._visibleClassName);
    }, 0));
  }
  _hide(t) {
    this._revealTimer.cancel(), this._isVisible && (this._isVisible = false, this._domNode?.setClassName(this._invisibleClassName + (t ? " fade" : "")));
  }
};
var Ca = 140;
var Ut = class extends lt {
  constructor(t) {
    super(), this._lazyRender = t.lazyRender, this._host = t.host, this._scrollable = t.scrollable, this._scrollByPage = t.scrollByPage, this._scrollbarState = t.scrollbarState, this._visibilityController = this._register(new Fr(t.visibility, "visible scrollbar " + t.extraScrollbarClassName, "invisible scrollbar " + t.extraScrollbarClassName)), this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._pointerMoveMonitor = this._register(new Wt()), this._shouldRender = true, this.domNode = _t(document.createElement("div")), this.domNode.setAttribute("role", "presentation"), this.domNode.setAttribute("aria-hidden", "true"), this._visibilityController.setDomNode(this.domNode), this.domNode.setPosition("absolute"), this._register(L(this.domNode.domNode, Y.POINTER_DOWN, (e) => this._domNodePointerDown(e)));
  }
  _createArrow(t) {
    let e = this._register(new Or(t));
    this.domNode.domNode.appendChild(e.bgDomNode), this.domNode.domNode.appendChild(e.domNode);
  }
  _createSlider(t, e, i8, r5) {
    this.slider = _t(document.createElement("div")), this.slider.setClassName("slider"), this.slider.setPosition("absolute"), this.slider.setTop(t), this.slider.setLeft(e), typeof i8 == "number" && this.slider.setWidth(i8), typeof r5 == "number" && this.slider.setHeight(r5), this.slider.setLayerHinting(true), this.slider.setContain("strict"), this.domNode.domNode.appendChild(this.slider.domNode), this._register(L(this.slider.domNode, Y.POINTER_DOWN, (n2) => {
      n2.button === 0 && (n2.preventDefault(), this._sliderPointerDown(n2));
    })), this.onclick(this.slider.domNode, (n2) => {
      n2.leftButton && n2.stopPropagation();
    });
  }
  _onElementSize(t) {
    return this._scrollbarState.setVisibleSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollSize(t) {
    return this._scrollbarState.setScrollSize(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  _onElementScrollPosition(t) {
    return this._scrollbarState.setScrollPosition(t) && (this._visibilityController.setIsNeeded(this._scrollbarState.isNeeded()), this._shouldRender = true, this._lazyRender || this.render()), this._shouldRender;
  }
  beginReveal() {
    this._visibilityController.setShouldBeVisible(true);
  }
  beginHide() {
    this._visibilityController.setShouldBeVisible(false);
  }
  render() {
    this._shouldRender && (this._shouldRender = false, this._renderDomNode(this._scrollbarState.getRectangleLargeSize(), this._scrollbarState.getRectangleSmallSize()), this._updateSlider(this._scrollbarState.getSliderSize(), this._scrollbarState.getArrowSize() + this._scrollbarState.getSliderPosition()));
  }
  _domNodePointerDown(t) {
    t.target === this.domNode.domNode && this._onPointerDown(t);
  }
  delegatePointerDown(t) {
    let e = this.domNode.domNode.getClientRects()[0].top, i8 = e + this._scrollbarState.getSliderPosition(), r5 = e + this._scrollbarState.getSliderPosition() + this._scrollbarState.getSliderSize(), n2 = this._sliderPointerPosition(t);
    i8 <= n2 && n2 <= r5 ? t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t)) : this._onPointerDown(t);
  }
  _onPointerDown(t) {
    let e, i8;
    if (t.target === this.domNode.domNode && typeof t.offsetX == "number" && typeof t.offsetY == "number") e = t.offsetX, i8 = t.offsetY;
    else {
      let n2 = Fo(this.domNode.domNode);
      e = t.pageX - n2.left, i8 = t.pageY - n2.top;
    }
    let r5 = this._pointerDownRelativePosition(e, i8);
    this._setDesiredScrollPositionNow(this._scrollByPage ? this._scrollbarState.getDesiredScrollPositionFromOffsetPaged(r5) : this._scrollbarState.getDesiredScrollPositionFromOffset(r5)), t.button === 0 && (t.preventDefault(), this._sliderPointerDown(t));
  }
  _sliderPointerDown(t) {
    if (!t.target || !(t.target instanceof Element)) return;
    let e = this._sliderPointerPosition(t), i8 = this._sliderOrthogonalPointerPosition(t), r5 = this._scrollbarState.clone();
    this.slider.toggleClassName("active", true), this._pointerMoveMonitor.startMonitoring(t.target, t.pointerId, t.buttons, (n2) => {
      let o = this._sliderOrthogonalPointerPosition(n2), l2 = Math.abs(o - i8);
      if (wr && l2 > Ca) {
        this._setDesiredScrollPositionNow(r5.getScrollPosition());
        return;
      }
      let u2 = this._sliderPointerPosition(n2) - e;
      this._setDesiredScrollPositionNow(r5.getDesiredScrollPositionFromDelta(u2));
    }, () => {
      this.slider.toggleClassName("active", false), this._host.onDragEnd();
    }), this._host.onDragStart();
  }
  _setDesiredScrollPositionNow(t) {
    let e = {};
    this.writeScrollPosition(e, t), this._scrollable.setScrollPositionNow(e);
  }
  updateScrollbarSize(t) {
    this._updateScrollbarSize(t), this._scrollbarState.setScrollbarSize(t), this._shouldRender = true, this._lazyRender || this.render();
  }
  isNeeded() {
    return this._scrollbarState.isNeeded();
  }
};
var Kt = class s11 {
  constructor(t, e, i8, r5, n2, o) {
    this._scrollbarSize = Math.round(e), this._oppositeScrollbarSize = Math.round(i8), this._arrowSize = Math.round(t), this._visibleSize = r5, this._scrollSize = n2, this._scrollPosition = o, this._computedAvailableSize = 0, this._computedIsNeeded = false, this._computedSliderSize = 0, this._computedSliderRatio = 0, this._computedSliderPosition = 0, this._refreshComputedValues();
  }
  clone() {
    return new s11(this._arrowSize, this._scrollbarSize, this._oppositeScrollbarSize, this._visibleSize, this._scrollSize, this._scrollPosition);
  }
  setVisibleSize(t) {
    let e = Math.round(t);
    return this._visibleSize !== e ? (this._visibleSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollSize(t) {
    let e = Math.round(t);
    return this._scrollSize !== e ? (this._scrollSize = e, this._refreshComputedValues(), true) : false;
  }
  setScrollPosition(t) {
    let e = Math.round(t);
    return this._scrollPosition !== e ? (this._scrollPosition = e, this._refreshComputedValues(), true) : false;
  }
  setScrollbarSize(t) {
    this._scrollbarSize = Math.round(t);
  }
  setOppositeScrollbarSize(t) {
    this._oppositeScrollbarSize = Math.round(t);
  }
  static _computeValues(t, e, i8, r5, n2) {
    let o = Math.max(0, i8 - t), l2 = Math.max(0, o - 2 * e), a = r5 > 0 && r5 > i8;
    if (!a) return { computedAvailableSize: Math.round(o), computedIsNeeded: a, computedSliderSize: Math.round(l2), computedSliderRatio: 0, computedSliderPosition: 0 };
    let u2 = Math.round(Math.max(20, Math.floor(i8 * l2 / r5))), h2 = (l2 - u2) / (r5 - i8), c2 = n2 * h2;
    return { computedAvailableSize: Math.round(o), computedIsNeeded: a, computedSliderSize: Math.round(u2), computedSliderRatio: h2, computedSliderPosition: Math.round(c2) };
  }
  _refreshComputedValues() {
    let t = s11._computeValues(this._oppositeScrollbarSize, this._arrowSize, this._visibleSize, this._scrollSize, this._scrollPosition);
    this._computedAvailableSize = t.computedAvailableSize, this._computedIsNeeded = t.computedIsNeeded, this._computedSliderSize = t.computedSliderSize, this._computedSliderRatio = t.computedSliderRatio, this._computedSliderPosition = t.computedSliderPosition;
  }
  getArrowSize() {
    return this._arrowSize;
  }
  getScrollPosition() {
    return this._scrollPosition;
  }
  getRectangleLargeSize() {
    return this._computedAvailableSize;
  }
  getRectangleSmallSize() {
    return this._scrollbarSize;
  }
  isNeeded() {
    return this._computedIsNeeded;
  }
  getSliderSize() {
    return this._computedSliderSize;
  }
  getSliderPosition() {
    return this._computedSliderPosition;
  }
  getDesiredScrollPositionFromOffset(t) {
    if (!this._computedIsNeeded) return 0;
    let e = t - this._arrowSize - this._computedSliderSize / 2;
    return Math.round(e / this._computedSliderRatio);
  }
  getDesiredScrollPositionFromOffsetPaged(t) {
    if (!this._computedIsNeeded) return 0;
    let e = t - this._arrowSize, i8 = this._scrollPosition;
    return e < this._computedSliderPosition ? i8 -= this._visibleSize : i8 += this._visibleSize, i8;
  }
  getDesiredScrollPositionFromDelta(t) {
    if (!this._computedIsNeeded) return 0;
    let e = this._computedSliderPosition + t;
    return Math.round(e / this._computedSliderRatio);
  }
};
var Wr = class extends Ut {
  constructor(t, e, i8) {
    let r5 = t.getScrollDimensions(), n2 = t.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i8, scrollbarState: new Kt(e.horizontalHasArrows ? e.arrowSize : 0, e.horizontal === 2 ? 0 : e.horizontalScrollbarSize, e.vertical === 2 ? 0 : e.verticalScrollbarSize, r5.width, r5.scrollWidth, n2.scrollLeft), visibility: e.horizontal, extraScrollbarClassName: "horizontal", scrollable: t, scrollByPage: e.scrollByPage }), e.horizontalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(Math.floor((e.horizontalScrollbarSize - e.horizontalSliderSize) / 2), 0, void 0, e.horizontalSliderSize);
  }
  _updateSlider(t, e) {
    this.slider.setWidth(t), this.slider.setLeft(e);
  }
  _renderDomNode(t, e) {
    this.domNode.setWidth(t), this.domNode.setHeight(e), this.domNode.setLeft(0), this.domNode.setBottom(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollWidth) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollLeft) || this._shouldRender, this._shouldRender = this._onElementSize(t.width) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e) {
    return t;
  }
  _sliderPointerPosition(t) {
    return t.pageX;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageY;
  }
  _updateScrollbarSize(t) {
    this.slider.setHeight(t);
  }
  writeScrollPosition(t, e) {
    t.scrollLeft = e;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.horizontal === 2 ? 0 : t.horizontalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._visibilityController.setVisibility(t.horizontal), this._scrollByPage = t.scrollByPage;
  }
};
var Ur = class extends Ut {
  constructor(t, e, i8) {
    let r5 = t.getScrollDimensions(), n2 = t.getCurrentScrollPosition();
    if (super({ lazyRender: e.lazyRender, host: i8, scrollbarState: new Kt(e.verticalHasArrows ? e.arrowSize : 0, e.vertical === 2 ? 0 : e.verticalScrollbarSize, 0, r5.height, r5.scrollHeight, n2.scrollTop), visibility: e.vertical, extraScrollbarClassName: "vertical", scrollable: t, scrollByPage: e.scrollByPage }), e.verticalHasArrows) throw new Error("horizontalHasArrows is not supported in xterm.js");
    this._createSlider(0, Math.floor((e.verticalScrollbarSize - e.verticalSliderSize) / 2), e.verticalSliderSize, void 0);
  }
  _updateSlider(t, e) {
    this.slider.setHeight(t), this.slider.setTop(e);
  }
  _renderDomNode(t, e) {
    this.domNode.setWidth(e), this.domNode.setHeight(t), this.domNode.setRight(0), this.domNode.setTop(0);
  }
  onDidScroll(t) {
    return this._shouldRender = this._onElementScrollSize(t.scrollHeight) || this._shouldRender, this._shouldRender = this._onElementScrollPosition(t.scrollTop) || this._shouldRender, this._shouldRender = this._onElementSize(t.height) || this._shouldRender, this._shouldRender;
  }
  _pointerDownRelativePosition(t, e) {
    return e;
  }
  _sliderPointerPosition(t) {
    return t.pageY;
  }
  _sliderOrthogonalPointerPosition(t) {
    return t.pageX;
  }
  _updateScrollbarSize(t) {
    this.slider.setWidth(t);
  }
  writeScrollPosition(t, e) {
    t.scrollTop = e;
  }
  updateOptions(t) {
    this.updateScrollbarSize(t.vertical === 2 ? 0 : t.verticalScrollbarSize), this._scrollbarState.setOppositeScrollbarSize(0), this._visibilityController.setVisibility(t.vertical), this._scrollByPage = t.scrollByPage;
  }
};
var Ma = 500;
var Ko = 50;
var zo = true;
var us = class {
  constructor(t, e, i8) {
    this.timestamp = t, this.deltaX = e, this.deltaY = i8, this.score = 0;
  }
};
var zr = class zr2 {
  constructor() {
    this._capacity = 5, this._memory = [], this._front = -1, this._rear = -1;
  }
  isPhysicalMouseWheel() {
    if (this._front === -1 && this._rear === -1) return false;
    let t = 1, e = 0, i8 = 1, r5 = this._rear;
    do {
      let n2 = r5 === this._front ? t : Math.pow(2, -i8);
      if (t -= n2, e += this._memory[r5].score * n2, r5 === this._front) break;
      r5 = (this._capacity + r5 - 1) % this._capacity, i8++;
    } while (true);
    return e <= 0.5;
  }
  acceptStandardWheelEvent(t) {
    if (Ti) {
      let e = be(t.browserEvent), i8 = mo(e);
      this.accept(Date.now(), t.deltaX * i8, t.deltaY * i8);
    } else this.accept(Date.now(), t.deltaX, t.deltaY);
  }
  accept(t, e, i8) {
    let r5 = null, n2 = new us(t, e, i8);
    this._front === -1 && this._rear === -1 ? (this._memory[0] = n2, this._front = 0, this._rear = 0) : (r5 = this._memory[this._rear], this._rear = (this._rear + 1) % this._capacity, this._rear === this._front && (this._front = (this._front + 1) % this._capacity), this._memory[this._rear] = n2), n2.score = this._computeScore(n2, r5);
  }
  _computeScore(t, e) {
    if (Math.abs(t.deltaX) > 0 && Math.abs(t.deltaY) > 0) return 1;
    let i8 = 0.5;
    if ((!this._isAlmostInt(t.deltaX) || !this._isAlmostInt(t.deltaY)) && (i8 += 0.25), e) {
      let r5 = Math.abs(t.deltaX), n2 = Math.abs(t.deltaY), o = Math.abs(e.deltaX), l2 = Math.abs(e.deltaY), a = Math.max(Math.min(r5, o), 1), u2 = Math.max(Math.min(n2, l2), 1), h2 = Math.max(r5, o), c2 = Math.max(n2, l2);
      h2 % a === 0 && c2 % u2 === 0 && (i8 -= 0.5);
    }
    return Math.min(Math.max(i8, 0), 1);
  }
  _isAlmostInt(t) {
    return Math.abs(Math.round(t) - t) < 0.01;
  }
};
zr.INSTANCE = new zr();
var hs = zr;
var ds = class extends lt {
  constructor(e, i8, r5) {
    super();
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onWillScroll = this._register(new v());
    this.onWillScroll = this._onWillScroll.event;
    this._options = Pa(i8), this._scrollable = r5, this._register(this._scrollable.onScroll((o) => {
      this._onWillScroll.fire(o), this._onDidScroll(o), this._onScroll.fire(o);
    }));
    let n2 = { onMouseWheel: (o) => this._onMouseWheel(o), onDragStart: () => this._onDragStart(), onDragEnd: () => this._onDragEnd() };
    this._verticalScrollbar = this._register(new Ur(this._scrollable, this._options, n2)), this._horizontalScrollbar = this._register(new Wr(this._scrollable, this._options, n2)), this._domNode = document.createElement("div"), this._domNode.className = "xterm-scrollable-element " + this._options.className, this._domNode.setAttribute("role", "presentation"), this._domNode.style.position = "relative", this._domNode.appendChild(e), this._domNode.appendChild(this._horizontalScrollbar.domNode.domNode), this._domNode.appendChild(this._verticalScrollbar.domNode.domNode), this._options.useShadows ? (this._leftShadowDomNode = _t(document.createElement("div")), this._leftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._leftShadowDomNode.domNode), this._topShadowDomNode = _t(document.createElement("div")), this._topShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topShadowDomNode.domNode), this._topLeftShadowDomNode = _t(document.createElement("div")), this._topLeftShadowDomNode.setClassName("shadow"), this._domNode.appendChild(this._topLeftShadowDomNode.domNode)) : (this._leftShadowDomNode = null, this._topShadowDomNode = null, this._topLeftShadowDomNode = null), this._listenOnDomNode = this._options.listenOnDomNode || this._domNode, this._mouseWheelToDispose = [], this._setListeningToMouseWheel(this._options.handleMouseWheel), this.onmouseover(this._listenOnDomNode, (o) => this._onMouseOver(o)), this.onmouseleave(this._listenOnDomNode, (o) => this._onMouseLeave(o)), this._hideTimeout = this._register(new Ye()), this._isDragging = false, this._mouseIsOver = false, this._shouldRender = true, this._revealOnScroll = true;
  }
  get options() {
    return this._options;
  }
  dispose() {
    this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), super.dispose();
  }
  getDomNode() {
    return this._domNode;
  }
  getOverviewRulerLayoutInfo() {
    return { parent: this._domNode, insertBefore: this._verticalScrollbar.domNode.domNode };
  }
  delegateVerticalScrollbarPointerDown(e) {
    this._verticalScrollbar.delegatePointerDown(e);
  }
  getScrollDimensions() {
    return this._scrollable.getScrollDimensions();
  }
  setScrollDimensions(e) {
    this._scrollable.setScrollDimensions(e, false);
  }
  updateClassName(e) {
    this._options.className = e, Te && (this._options.className += " mac"), this._domNode.className = "xterm-scrollable-element " + this._options.className;
  }
  updateOptions(e) {
    typeof e.handleMouseWheel < "u" && (this._options.handleMouseWheel = e.handleMouseWheel, this._setListeningToMouseWheel(this._options.handleMouseWheel)), typeof e.mouseWheelScrollSensitivity < "u" && (this._options.mouseWheelScrollSensitivity = e.mouseWheelScrollSensitivity), typeof e.fastScrollSensitivity < "u" && (this._options.fastScrollSensitivity = e.fastScrollSensitivity), typeof e.scrollPredominantAxis < "u" && (this._options.scrollPredominantAxis = e.scrollPredominantAxis), typeof e.horizontal < "u" && (this._options.horizontal = e.horizontal), typeof e.vertical < "u" && (this._options.vertical = e.vertical), typeof e.horizontalScrollbarSize < "u" && (this._options.horizontalScrollbarSize = e.horizontalScrollbarSize), typeof e.verticalScrollbarSize < "u" && (this._options.verticalScrollbarSize = e.verticalScrollbarSize), typeof e.scrollByPage < "u" && (this._options.scrollByPage = e.scrollByPage), this._horizontalScrollbar.updateOptions(this._options), this._verticalScrollbar.updateOptions(this._options), this._options.lazyRender || this._render();
  }
  setRevealOnScroll(e) {
    this._revealOnScroll = e;
  }
  delegateScrollFromMouseWheelEvent(e) {
    this._onMouseWheel(new xi(e));
  }
  _setListeningToMouseWheel(e) {
    if (this._mouseWheelToDispose.length > 0 !== e && (this._mouseWheelToDispose = Ne(this._mouseWheelToDispose), e)) {
      let r5 = (n2) => {
        this._onMouseWheel(new xi(n2));
      };
      this._mouseWheelToDispose.push(L(this._listenOnDomNode, Y.MOUSE_WHEEL, r5, { passive: false }));
    }
  }
  _onMouseWheel(e) {
    if (e.browserEvent?.defaultPrevented) return;
    let i8 = hs.INSTANCE;
    zo && i8.acceptStandardWheelEvent(e);
    let r5 = false;
    if (e.deltaY || e.deltaX) {
      let o = e.deltaY * this._options.mouseWheelScrollSensitivity, l2 = e.deltaX * this._options.mouseWheelScrollSensitivity;
      this._options.scrollPredominantAxis && (this._options.scrollYToX && l2 + o === 0 ? l2 = o = 0 : Math.abs(o) >= Math.abs(l2) ? l2 = 0 : o = 0), this._options.flipAxes && ([o, l2] = [l2, o]);
      let a = !Te && e.browserEvent && e.browserEvent.shiftKey;
      (this._options.scrollYToX || a) && !l2 && (l2 = o, o = 0), e.browserEvent && e.browserEvent.altKey && (l2 = l2 * this._options.fastScrollSensitivity, o = o * this._options.fastScrollSensitivity);
      let u2 = this._scrollable.getFutureScrollPosition(), h2 = {};
      if (o) {
        let c2 = Ko * o, d2 = u2.scrollTop - (c2 < 0 ? Math.floor(c2) : Math.ceil(c2));
        this._verticalScrollbar.writeScrollPosition(h2, d2);
      }
      if (l2) {
        let c2 = Ko * l2, d2 = u2.scrollLeft - (c2 < 0 ? Math.floor(c2) : Math.ceil(c2));
        this._horizontalScrollbar.writeScrollPosition(h2, d2);
      }
      h2 = this._scrollable.validateScrollPosition(h2), (u2.scrollLeft !== h2.scrollLeft || u2.scrollTop !== h2.scrollTop) && (zo && this._options.mouseWheelSmoothScroll && i8.isPhysicalMouseWheel() ? this._scrollable.setScrollPositionSmooth(h2) : this._scrollable.setScrollPositionNow(h2), r5 = true);
    }
    let n2 = r5;
    !n2 && this._options.alwaysConsumeMouseWheel && (n2 = true), !n2 && this._options.consumeMouseWheelIfScrollbarIsNeeded && (this._verticalScrollbar.isNeeded() || this._horizontalScrollbar.isNeeded()) && (n2 = true), n2 && (e.preventDefault(), e.stopPropagation());
  }
  _onDidScroll(e) {
    this._shouldRender = this._horizontalScrollbar.onDidScroll(e) || this._shouldRender, this._shouldRender = this._verticalScrollbar.onDidScroll(e) || this._shouldRender, this._options.useShadows && (this._shouldRender = true), this._revealOnScroll && this._reveal(), this._options.lazyRender || this._render();
  }
  renderNow() {
    if (!this._options.lazyRender) throw new Error("Please use `lazyRender` together with `renderNow`!");
    this._render();
  }
  _render() {
    if (this._shouldRender && (this._shouldRender = false, this._horizontalScrollbar.render(), this._verticalScrollbar.render(), this._options.useShadows)) {
      let e = this._scrollable.getCurrentScrollPosition(), i8 = e.scrollTop > 0, r5 = e.scrollLeft > 0, n2 = r5 ? " left" : "", o = i8 ? " top" : "", l2 = r5 || i8 ? " top-left-corner" : "";
      this._leftShadowDomNode.setClassName(`shadow${n2}`), this._topShadowDomNode.setClassName(`shadow${o}`), this._topLeftShadowDomNode.setClassName(`shadow${l2}${o}${n2}`);
    }
  }
  _onDragStart() {
    this._isDragging = true, this._reveal();
  }
  _onDragEnd() {
    this._isDragging = false, this._hide();
  }
  _onMouseLeave(e) {
    this._mouseIsOver = false, this._hide();
  }
  _onMouseOver(e) {
    this._mouseIsOver = true, this._reveal();
  }
  _reveal() {
    this._verticalScrollbar.beginReveal(), this._horizontalScrollbar.beginReveal(), this._scheduleHide();
  }
  _hide() {
    !this._mouseIsOver && !this._isDragging && (this._verticalScrollbar.beginHide(), this._horizontalScrollbar.beginHide());
  }
  _scheduleHide() {
    !this._mouseIsOver && !this._isDragging && this._hideTimeout.cancelAndSet(() => this._hide(), Ma);
  }
};
var Kr = class extends ds {
  constructor(t, e, i8) {
    super(t, e, i8);
  }
  setScrollPosition(t) {
    t.reuseAnimation ? this._scrollable.setScrollPositionSmooth(t, t.reuseAnimation) : this._scrollable.setScrollPositionNow(t);
  }
  getScrollPosition() {
    return this._scrollable.getCurrentScrollPosition();
  }
};
function Pa(s15) {
  let t = { lazyRender: typeof s15.lazyRender < "u" ? s15.lazyRender : false, className: typeof s15.className < "u" ? s15.className : "", useShadows: typeof s15.useShadows < "u" ? s15.useShadows : true, handleMouseWheel: typeof s15.handleMouseWheel < "u" ? s15.handleMouseWheel : true, flipAxes: typeof s15.flipAxes < "u" ? s15.flipAxes : false, consumeMouseWheelIfScrollbarIsNeeded: typeof s15.consumeMouseWheelIfScrollbarIsNeeded < "u" ? s15.consumeMouseWheelIfScrollbarIsNeeded : false, alwaysConsumeMouseWheel: typeof s15.alwaysConsumeMouseWheel < "u" ? s15.alwaysConsumeMouseWheel : false, scrollYToX: typeof s15.scrollYToX < "u" ? s15.scrollYToX : false, mouseWheelScrollSensitivity: typeof s15.mouseWheelScrollSensitivity < "u" ? s15.mouseWheelScrollSensitivity : 1, fastScrollSensitivity: typeof s15.fastScrollSensitivity < "u" ? s15.fastScrollSensitivity : 5, scrollPredominantAxis: typeof s15.scrollPredominantAxis < "u" ? s15.scrollPredominantAxis : true, mouseWheelSmoothScroll: typeof s15.mouseWheelSmoothScroll < "u" ? s15.mouseWheelSmoothScroll : true, arrowSize: typeof s15.arrowSize < "u" ? s15.arrowSize : 11, listenOnDomNode: typeof s15.listenOnDomNode < "u" ? s15.listenOnDomNode : null, horizontal: typeof s15.horizontal < "u" ? s15.horizontal : 1, horizontalScrollbarSize: typeof s15.horizontalScrollbarSize < "u" ? s15.horizontalScrollbarSize : 10, horizontalSliderSize: typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : 0, horizontalHasArrows: typeof s15.horizontalHasArrows < "u" ? s15.horizontalHasArrows : false, vertical: typeof s15.vertical < "u" ? s15.vertical : 1, verticalScrollbarSize: typeof s15.verticalScrollbarSize < "u" ? s15.verticalScrollbarSize : 10, verticalHasArrows: typeof s15.verticalHasArrows < "u" ? s15.verticalHasArrows : false, verticalSliderSize: typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : 0, scrollByPage: typeof s15.scrollByPage < "u" ? s15.scrollByPage : false };
  return t.horizontalSliderSize = typeof s15.horizontalSliderSize < "u" ? s15.horizontalSliderSize : t.horizontalScrollbarSize, t.verticalSliderSize = typeof s15.verticalSliderSize < "u" ? s15.verticalSliderSize : t.verticalScrollbarSize, Te && (t.className += " mac"), t;
}
var zt = class extends D {
  constructor(e, i8, r5, n2, o, l2, a, u2) {
    super();
    this._bufferService = r5;
    this._optionsService = a;
    this._renderService = u2;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._isSyncing = false;
    this._isHandlingScroll = false;
    this._suppressOnScrollHandler = false;
    let h2 = this._register(new Ri({ forceIntegerValues: false, smoothScrollDuration: this._optionsService.rawOptions.smoothScrollDuration, scheduleAtNextAnimationFrame: (c2) => mt(n2.window, c2) }));
    this._register(this._optionsService.onSpecificOptionChange("smoothScrollDuration", () => {
      h2.setSmoothScrollDuration(this._optionsService.rawOptions.smoothScrollDuration);
    })), this._scrollableElement = this._register(new Kr(i8, { vertical: 1, horizontal: 2, useShadows: false, mouseWheelSmoothScroll: true, ...this._getChangeOptions() }, h2)), this._register(this._optionsService.onMultipleOptionChange(["scrollSensitivity", "fastScrollSensitivity", "overviewRuler"], () => this._scrollableElement.updateOptions(this._getChangeOptions()))), this._register(o.onProtocolChange((c2) => {
      this._scrollableElement.updateOptions({ handleMouseWheel: !(c2 & 16) });
    })), this._scrollableElement.setScrollDimensions({ height: 0, scrollHeight: 0 }), this._register($.runAndSubscribe(l2.onChangeColors, () => {
      this._scrollableElement.getDomNode().style.backgroundColor = l2.colors.background.css;
    })), e.appendChild(this._scrollableElement.getDomNode()), this._register(C(() => this._scrollableElement.getDomNode().remove())), this._styleElement = n2.mainDocument.createElement("style"), i8.appendChild(this._styleElement), this._register(C(() => this._styleElement.remove())), this._register($.runAndSubscribe(l2.onChangeColors, () => {
      this._styleElement.textContent = [".xterm .xterm-scrollable-element > .scrollbar > .slider {", `  background: ${l2.colors.scrollbarSliderBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider:hover {", `  background: ${l2.colors.scrollbarSliderHoverBackground.css};`, "}", ".xterm .xterm-scrollable-element > .scrollbar > .slider.active {", `  background: ${l2.colors.scrollbarSliderActiveBackground.css};`, "}"].join(`
`);
    })), this._register(this._bufferService.onResize(() => this.queueSync())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._latestYDisp = void 0, this.queueSync();
    })), this._register(this._bufferService.onScroll(() => this._sync())), this._register(this._scrollableElement.onScroll((c2) => this._handleScroll(c2)));
  }
  scrollLines(e) {
    let i8 = this._scrollableElement.getScrollPosition();
    this._scrollableElement.setScrollPosition({ reuseAnimation: true, scrollTop: i8.scrollTop + e * this._renderService.dimensions.css.cell.height });
  }
  scrollToLine(e, i8) {
    i8 && (this._latestYDisp = e), this._scrollableElement.setScrollPosition({ reuseAnimation: !i8, scrollTop: e * this._renderService.dimensions.css.cell.height });
  }
  _getChangeOptions() {
    return { mouseWheelScrollSensitivity: this._optionsService.rawOptions.scrollSensitivity, fastScrollSensitivity: this._optionsService.rawOptions.fastScrollSensitivity, verticalScrollbarSize: this._optionsService.rawOptions.overviewRuler?.width || 14 };
  }
  queueSync(e) {
    e !== void 0 && (this._latestYDisp = e), this._queuedAnimationFrame === void 0 && (this._queuedAnimationFrame = this._renderService.addRefreshCallback(() => {
      this._queuedAnimationFrame = void 0, this._sync(this._latestYDisp);
    }));
  }
  _sync(e = this._bufferService.buffer.ydisp) {
    !this._renderService || this._isSyncing || (this._isSyncing = true, this._suppressOnScrollHandler = true, this._scrollableElement.setScrollDimensions({ height: this._renderService.dimensions.css.canvas.height, scrollHeight: this._renderService.dimensions.css.cell.height * this._bufferService.buffer.lines.length }), this._suppressOnScrollHandler = false, e !== this._latestYDisp && this._scrollableElement.setScrollPosition({ scrollTop: e * this._renderService.dimensions.css.cell.height }), this._isSyncing = false);
  }
  _handleScroll(e) {
    if (!this._renderService || this._isHandlingScroll || this._suppressOnScrollHandler) return;
    this._isHandlingScroll = true;
    let i8 = Math.round(e.scrollTop / this._renderService.dimensions.css.cell.height), r5 = i8 - this._bufferService.buffer.ydisp;
    r5 !== 0 && (this._latestYDisp = i8, this._onRequestScrollLines.fire(r5)), this._isHandlingScroll = false;
  }
};
zt = M([S(2, F), S(3, ae), S(4, rr), S(5, Re), S(6, H), S(7, ce)], zt);
var Gt = class extends D {
  constructor(e, i8, r5, n2, o) {
    super();
    this._screenElement = e;
    this._bufferService = i8;
    this._coreBrowserService = r5;
    this._decorationService = n2;
    this._renderService = o;
    this._decorationElements = /* @__PURE__ */ new Map();
    this._altBufferIsActive = false;
    this._dimensionsChanged = false;
    this._container = document.createElement("div"), this._container.classList.add("xterm-decoration-container"), this._screenElement.appendChild(this._container), this._register(this._renderService.onRenderedViewportChange(() => this._doRefreshDecorations())), this._register(this._renderService.onDimensionsChange(() => {
      this._dimensionsChanged = true, this._queueRefresh();
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._altBufferIsActive = this._bufferService.buffer === this._bufferService.buffers.alt;
    })), this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh())), this._register(this._decorationService.onDecorationRemoved((l2) => this._removeDecoration(l2))), this._register(C(() => {
      this._container.remove(), this._decorationElements.clear();
    }));
  }
  _queueRefresh() {
    this._animationFrame === void 0 && (this._animationFrame = this._renderService.addRefreshCallback(() => {
      this._doRefreshDecorations(), this._animationFrame = void 0;
    }));
  }
  _doRefreshDecorations() {
    for (let e of this._decorationService.decorations) this._renderDecoration(e);
    this._dimensionsChanged = false;
  }
  _renderDecoration(e) {
    this._refreshStyle(e), this._dimensionsChanged && this._refreshXPosition(e);
  }
  _createElement(e) {
    let i8 = this._coreBrowserService.mainDocument.createElement("div");
    i8.classList.add("xterm-decoration"), i8.classList.toggle("xterm-decoration-top-layer", e?.options?.layer === "top"), i8.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, i8.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, i8.style.top = `${(e.marker.line - this._bufferService.buffers.active.ydisp) * this._renderService.dimensions.css.cell.height}px`, i8.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`;
    let r5 = e.options.x ?? 0;
    return r5 && r5 > this._bufferService.cols && (i8.style.display = "none"), this._refreshXPosition(e, i8), i8;
  }
  _refreshStyle(e) {
    let i8 = e.marker.line - this._bufferService.buffers.active.ydisp;
    if (i8 < 0 || i8 >= this._bufferService.rows) e.element && (e.element.style.display = "none", e.onRenderEmitter.fire(e.element));
    else {
      let r5 = this._decorationElements.get(e);
      r5 || (r5 = this._createElement(e), e.element = r5, this._decorationElements.set(e, r5), this._container.appendChild(r5), e.onDispose(() => {
        this._decorationElements.delete(e), r5.remove();
      })), r5.style.display = this._altBufferIsActive ? "none" : "block", this._altBufferIsActive || (r5.style.width = `${Math.round((e.options.width || 1) * this._renderService.dimensions.css.cell.width)}px`, r5.style.height = `${(e.options.height || 1) * this._renderService.dimensions.css.cell.height}px`, r5.style.top = `${i8 * this._renderService.dimensions.css.cell.height}px`, r5.style.lineHeight = `${this._renderService.dimensions.css.cell.height}px`), e.onRenderEmitter.fire(r5);
    }
  }
  _refreshXPosition(e, i8 = e.element) {
    if (!i8) return;
    let r5 = e.options.x ?? 0;
    (e.options.anchor || "left") === "right" ? i8.style.right = r5 ? `${r5 * this._renderService.dimensions.css.cell.width}px` : "" : i8.style.left = r5 ? `${r5 * this._renderService.dimensions.css.cell.width}px` : "";
  }
  _removeDecoration(e) {
    this._decorationElements.get(e)?.remove(), this._decorationElements.delete(e), e.dispose();
  }
};
Gt = M([S(1, F), S(2, ae), S(3, Be), S(4, ce)], Gt);
var Gr = class {
  constructor() {
    this._zones = [];
    this._zonePool = [];
    this._zonePoolIndex = 0;
    this._linePadding = { full: 0, left: 0, center: 0, right: 0 };
  }
  get zones() {
    return this._zonePool.length = Math.min(this._zonePool.length, this._zones.length), this._zones;
  }
  clear() {
    this._zones.length = 0, this._zonePoolIndex = 0;
  }
  addDecoration(t) {
    if (t.options.overviewRulerOptions) {
      for (let e of this._zones) if (e.color === t.options.overviewRulerOptions.color && e.position === t.options.overviewRulerOptions.position) {
        if (this._lineIntersectsZone(e, t.marker.line)) return;
        if (this._lineAdjacentToZone(e, t.marker.line, t.options.overviewRulerOptions.position)) {
          this._addLineToZone(e, t.marker.line);
          return;
        }
      }
      if (this._zonePoolIndex < this._zonePool.length) {
        this._zonePool[this._zonePoolIndex].color = t.options.overviewRulerOptions.color, this._zonePool[this._zonePoolIndex].position = t.options.overviewRulerOptions.position, this._zonePool[this._zonePoolIndex].startBufferLine = t.marker.line, this._zonePool[this._zonePoolIndex].endBufferLine = t.marker.line, this._zones.push(this._zonePool[this._zonePoolIndex++]);
        return;
      }
      this._zones.push({ color: t.options.overviewRulerOptions.color, position: t.options.overviewRulerOptions.position, startBufferLine: t.marker.line, endBufferLine: t.marker.line }), this._zonePool.push(this._zones[this._zones.length - 1]), this._zonePoolIndex++;
    }
  }
  setPadding(t) {
    this._linePadding = t;
  }
  _lineIntersectsZone(t, e) {
    return e >= t.startBufferLine && e <= t.endBufferLine;
  }
  _lineAdjacentToZone(t, e, i8) {
    return e >= t.startBufferLine - this._linePadding[i8 || "full"] && e <= t.endBufferLine + this._linePadding[i8 || "full"];
  }
  _addLineToZone(t, e) {
    t.startBufferLine = Math.min(t.startBufferLine, e), t.endBufferLine = Math.max(t.endBufferLine, e);
  }
};
var We = { full: 0, left: 0, center: 0, right: 0 };
var at = { full: 0, left: 0, center: 0, right: 0 };
var Li = { full: 0, left: 0, center: 0, right: 0 };
var bt = class extends D {
  constructor(e, i8, r5, n2, o, l2, a, u2) {
    super();
    this._viewportElement = e;
    this._screenElement = i8;
    this._bufferService = r5;
    this._decorationService = n2;
    this._renderService = o;
    this._optionsService = l2;
    this._themeService = a;
    this._coreBrowserService = u2;
    this._colorZoneStore = new Gr();
    this._shouldUpdateDimensions = true;
    this._shouldUpdateAnchor = true;
    this._lastKnownBufferLength = 0;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add("xterm-decoration-overview-ruler"), this._refreshCanvasDimensions(), this._viewportElement.parentElement?.insertBefore(this._canvas, this._viewportElement), this._register(C(() => this._canvas?.remove()));
    let h2 = this._canvas.getContext("2d");
    if (h2) this._ctx = h2;
    else throw new Error("Ctx cannot be null");
    this._register(this._decorationService.onDecorationRegistered(() => this._queueRefresh(void 0, true))), this._register(this._decorationService.onDecorationRemoved(() => this._queueRefresh(void 0, true))), this._register(this._renderService.onRenderedViewportChange(() => this._queueRefresh())), this._register(this._bufferService.buffers.onBufferActivate(() => {
      this._canvas.style.display = this._bufferService.buffer === this._bufferService.buffers.alt ? "none" : "block";
    })), this._register(this._bufferService.onScroll(() => {
      this._lastKnownBufferLength !== this._bufferService.buffers.normal.lines.length && (this._refreshDrawHeightConstants(), this._refreshColorZonePadding());
    })), this._register(this._renderService.onRender(() => {
      (!this._containerHeight || this._containerHeight !== this._screenElement.clientHeight) && (this._queueRefresh(true), this._containerHeight = this._screenElement.clientHeight);
    })), this._register(this._coreBrowserService.onDprChange(() => this._queueRefresh(true))), this._register(this._optionsService.onSpecificOptionChange("overviewRuler", () => this._queueRefresh(true))), this._register(this._themeService.onChangeColors(() => this._queueRefresh())), this._queueRefresh(true);
  }
  get _width() {
    return this._optionsService.options.overviewRuler?.width || 0;
  }
  _refreshDrawConstants() {
    let e = Math.floor((this._canvas.width - 1) / 3), i8 = Math.ceil((this._canvas.width - 1) / 3);
    at.full = this._canvas.width, at.left = e, at.center = i8, at.right = e, this._refreshDrawHeightConstants(), Li.full = 1, Li.left = 1, Li.center = 1 + at.left, Li.right = 1 + at.left + at.center;
  }
  _refreshDrawHeightConstants() {
    We.full = Math.round(2 * this._coreBrowserService.dpr);
    let e = this._canvas.height / this._bufferService.buffer.lines.length, i8 = Math.round(Math.max(Math.min(e, 12), 6) * this._coreBrowserService.dpr);
    We.left = i8, We.center = i8, We.right = i8;
  }
  _refreshColorZonePadding() {
    this._colorZoneStore.setPadding({ full: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.full), left: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.left), center: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.center), right: Math.floor(this._bufferService.buffers.active.lines.length / (this._canvas.height - 1) * We.right) }), this._lastKnownBufferLength = this._bufferService.buffers.normal.lines.length;
  }
  _refreshCanvasDimensions() {
    this._canvas.style.width = `${this._width}px`, this._canvas.width = Math.round(this._width * this._coreBrowserService.dpr), this._canvas.style.height = `${this._screenElement.clientHeight}px`, this._canvas.height = Math.round(this._screenElement.clientHeight * this._coreBrowserService.dpr), this._refreshDrawConstants(), this._refreshColorZonePadding();
  }
  _refreshDecorations() {
    this._shouldUpdateDimensions && this._refreshCanvasDimensions(), this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height), this._colorZoneStore.clear();
    for (let i8 of this._decorationService.decorations) this._colorZoneStore.addDecoration(i8);
    this._ctx.lineWidth = 1, this._renderRulerOutline();
    let e = this._colorZoneStore.zones;
    for (let i8 of e) i8.position !== "full" && this._renderColorZone(i8);
    for (let i8 of e) i8.position === "full" && this._renderColorZone(i8);
    this._shouldUpdateDimensions = false, this._shouldUpdateAnchor = false;
  }
  _renderRulerOutline() {
    this._ctx.fillStyle = this._themeService.colors.overviewRulerBorder.css, this._ctx.fillRect(0, 0, 1, this._canvas.height), this._optionsService.rawOptions.overviewRuler.showTopBorder && this._ctx.fillRect(1, 0, this._canvas.width - 1, 1), this._optionsService.rawOptions.overviewRuler.showBottomBorder && this._ctx.fillRect(1, this._canvas.height - 1, this._canvas.width - 1, this._canvas.height);
  }
  _renderColorZone(e) {
    this._ctx.fillStyle = e.color, this._ctx.fillRect(Li[e.position || "full"], Math.round((this._canvas.height - 1) * (e.startBufferLine / this._bufferService.buffers.active.lines.length) - We[e.position || "full"] / 2), at[e.position || "full"], Math.round((this._canvas.height - 1) * ((e.endBufferLine - e.startBufferLine) / this._bufferService.buffers.active.lines.length) + We[e.position || "full"]));
  }
  _queueRefresh(e, i8) {
    this._shouldUpdateDimensions = e || this._shouldUpdateDimensions, this._shouldUpdateAnchor = i8 || this._shouldUpdateAnchor, this._animationFrame === void 0 && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
      this._refreshDecorations(), this._animationFrame = void 0;
    }));
  }
};
bt = M([S(2, F), S(3, Be), S(4, ce), S(5, H), S(6, Re), S(7, ae)], bt);
var b;
((E2) => (E2.NUL = "\0", E2.SOH = "", E2.STX = "", E2.ETX = "", E2.EOT = "", E2.ENQ = "", E2.ACK = "", E2.BEL = "\x07", E2.BS = "\b", E2.HT = "	", E2.LF = `
`, E2.VT = "\v", E2.FF = "\f", E2.CR = "\r", E2.SO = "", E2.SI = "", E2.DLE = "", E2.DC1 = "", E2.DC2 = "", E2.DC3 = "", E2.DC4 = "", E2.NAK = "", E2.SYN = "", E2.ETB = "", E2.CAN = "", E2.EM = "", E2.SUB = "", E2.ESC = "\x1B", E2.FS = "", E2.GS = "", E2.RS = "", E2.US = "", E2.SP = " ", E2.DEL = "\x7F"))(b ||= {});
var Ai;
((g3) => (g3.PAD = "\x80", g3.HOP = "\x81", g3.BPH = "\x82", g3.NBH = "\x83", g3.IND = "\x84", g3.NEL = "\x85", g3.SSA = "\x86", g3.ESA = "\x87", g3.HTS = "\x88", g3.HTJ = "\x89", g3.VTS = "\x8A", g3.PLD = "\x8B", g3.PLU = "\x8C", g3.RI = "\x8D", g3.SS2 = "\x8E", g3.SS3 = "\x8F", g3.DCS = "\x90", g3.PU1 = "\x91", g3.PU2 = "\x92", g3.STS = "\x93", g3.CCH = "\x94", g3.MW = "\x95", g3.SPA = "\x96", g3.EPA = "\x97", g3.SOS = "\x98", g3.SGCI = "\x99", g3.SCI = "\x9A", g3.CSI = "\x9B", g3.ST = "\x9C", g3.OSC = "\x9D", g3.PM = "\x9E", g3.APC = "\x9F"))(Ai ||= {});
var fs;
((t) => t.ST = `${b.ESC}\\`)(fs ||= {});
var $t = class {
  constructor(t, e, i8, r5, n2, o) {
    this._textarea = t;
    this._compositionView = e;
    this._bufferService = i8;
    this._optionsService = r5;
    this._coreService = n2;
    this._renderService = o;
    this._isComposing = false, this._isSendingComposition = false, this._compositionPosition = { start: 0, end: 0 }, this._dataAlreadySent = "";
  }
  get isComposing() {
    return this._isComposing;
  }
  compositionstart() {
    this._isComposing = true, this._compositionPosition.start = this._textarea.value.length, this._compositionView.textContent = "", this._dataAlreadySent = "", this._compositionView.classList.add("active");
  }
  compositionupdate(t) {
    this._compositionView.textContent = t.data, this.updateCompositionElements(), setTimeout(() => {
      this._compositionPosition.end = this._textarea.value.length;
    }, 0);
  }
  compositionend() {
    this._finalizeComposition(true);
  }
  keydown(t) {
    if (this._isComposing || this._isSendingComposition) {
      if (t.keyCode === 20 || t.keyCode === 229 || t.keyCode === 16 || t.keyCode === 17 || t.keyCode === 18) return false;
      this._finalizeComposition(false);
    }
    return t.keyCode === 229 ? (this._handleAnyTextareaChanges(), false) : true;
  }
  _finalizeComposition(t) {
    if (this._compositionView.classList.remove("active"), this._isComposing = false, t) {
      let e = { start: this._compositionPosition.start, end: this._compositionPosition.end };
      this._isSendingComposition = true, setTimeout(() => {
        if (this._isSendingComposition) {
          this._isSendingComposition = false;
          let i8;
          e.start += this._dataAlreadySent.length, this._isComposing ? i8 = this._textarea.value.substring(e.start, this._compositionPosition.start) : i8 = this._textarea.value.substring(e.start), i8.length > 0 && this._coreService.triggerDataEvent(i8, true);
        }
      }, 0);
    } else {
      this._isSendingComposition = false;
      let e = this._textarea.value.substring(this._compositionPosition.start, this._compositionPosition.end);
      this._coreService.triggerDataEvent(e, true);
    }
  }
  _handleAnyTextareaChanges() {
    let t = this._textarea.value;
    setTimeout(() => {
      if (!this._isComposing) {
        let e = this._textarea.value, i8 = e.replace(t, "");
        this._dataAlreadySent = i8, e.length > t.length ? this._coreService.triggerDataEvent(i8, true) : e.length < t.length ? this._coreService.triggerDataEvent(`${b.DEL}`, true) : e.length === t.length && e !== t && this._coreService.triggerDataEvent(e, true);
      }
    }, 0);
  }
  updateCompositionElements(t) {
    if (this._isComposing) {
      if (this._bufferService.buffer.isCursorInViewport) {
        let e = Math.min(this._bufferService.buffer.x, this._bufferService.cols - 1), i8 = this._renderService.dimensions.css.cell.height, r5 = this._bufferService.buffer.y * this._renderService.dimensions.css.cell.height, n2 = e * this._renderService.dimensions.css.cell.width;
        this._compositionView.style.left = n2 + "px", this._compositionView.style.top = r5 + "px", this._compositionView.style.height = i8 + "px", this._compositionView.style.lineHeight = i8 + "px", this._compositionView.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._compositionView.style.fontSize = this._optionsService.rawOptions.fontSize + "px";
        let o = this._compositionView.getBoundingClientRect();
        this._textarea.style.left = n2 + "px", this._textarea.style.top = r5 + "px", this._textarea.style.width = Math.max(o.width, 1) + "px", this._textarea.style.height = Math.max(o.height, 1) + "px", this._textarea.style.lineHeight = o.height + "px";
      }
      t || setTimeout(() => this.updateCompositionElements(true), 0);
    }
  }
};
$t = M([S(2, F), S(3, H), S(4, ge), S(5, ce)], $t);
var ue = 0;
var he = 0;
var de = 0;
var J = 0;
var ps = { css: "#00000000", rgba: 0 };
var j;
((i8) => {
  function s15(r5, n2, o, l2) {
    return l2 !== void 0 ? `#${vt(r5)}${vt(n2)}${vt(o)}${vt(l2)}` : `#${vt(r5)}${vt(n2)}${vt(o)}`;
  }
  i8.toCss = s15;
  function t(r5, n2, o, l2 = 255) {
    return (r5 << 24 | n2 << 16 | o << 8 | l2) >>> 0;
  }
  i8.toRgba = t;
  function e(r5, n2, o, l2) {
    return { css: i8.toCss(r5, n2, o, l2), rgba: i8.toRgba(r5, n2, o, l2) };
  }
  i8.toColor = e;
})(j ||= {});
var U;
((l2) => {
  function s15(a, u2) {
    if (J = (u2.rgba & 255) / 255, J === 1) return { css: u2.css, rgba: u2.rgba };
    let h2 = u2.rgba >> 24 & 255, c2 = u2.rgba >> 16 & 255, d2 = u2.rgba >> 8 & 255, _4 = a.rgba >> 24 & 255, p2 = a.rgba >> 16 & 255, m2 = a.rgba >> 8 & 255;
    ue = _4 + Math.round((h2 - _4) * J), he = p2 + Math.round((c2 - p2) * J), de = m2 + Math.round((d2 - m2) * J);
    let f2 = j.toCss(ue, he, de), A3 = j.toRgba(ue, he, de);
    return { css: f2, rgba: A3 };
  }
  l2.blend = s15;
  function t(a) {
    return (a.rgba & 255) === 255;
  }
  l2.isOpaque = t;
  function e(a, u2, h2) {
    let c2 = $r.ensureContrastRatio(a.rgba, u2.rgba, h2);
    if (c2) return j.toColor(c2 >> 24 & 255, c2 >> 16 & 255, c2 >> 8 & 255);
  }
  l2.ensureContrastRatio = e;
  function i8(a) {
    let u2 = (a.rgba | 255) >>> 0;
    return [ue, he, de] = $r.toChannels(u2), { css: j.toCss(ue, he, de), rgba: u2 };
  }
  l2.opaque = i8;
  function r5(a, u2) {
    return J = Math.round(u2 * 255), [ue, he, de] = $r.toChannels(a.rgba), { css: j.toCss(ue, he, de, J), rgba: j.toRgba(ue, he, de, J) };
  }
  l2.opacity = r5;
  function n2(a, u2) {
    return J = a.rgba & 255, r5(a, J * u2 / 255);
  }
  l2.multiplyOpacity = n2;
  function o(a) {
    return [a.rgba >> 24 & 255, a.rgba >> 16 & 255, a.rgba >> 8 & 255];
  }
  l2.toColorRGB = o;
})(U ||= {});
var z;
((i8) => {
  let s15, t;
  try {
    let r5 = document.createElement("canvas");
    r5.width = 1, r5.height = 1;
    let n2 = r5.getContext("2d", { willReadFrequently: true });
    n2 && (s15 = n2, s15.globalCompositeOperation = "copy", t = s15.createLinearGradient(0, 0, 1, 1));
  } catch {
  }
  function e(r5) {
    if (r5.match(/#[\da-f]{3,8}/i)) switch (r5.length) {
      case 4:
        return ue = parseInt(r5.slice(1, 2).repeat(2), 16), he = parseInt(r5.slice(2, 3).repeat(2), 16), de = parseInt(r5.slice(3, 4).repeat(2), 16), j.toColor(ue, he, de);
      case 5:
        return ue = parseInt(r5.slice(1, 2).repeat(2), 16), he = parseInt(r5.slice(2, 3).repeat(2), 16), de = parseInt(r5.slice(3, 4).repeat(2), 16), J = parseInt(r5.slice(4, 5).repeat(2), 16), j.toColor(ue, he, de, J);
      case 7:
        return { css: r5, rgba: (parseInt(r5.slice(1), 16) << 8 | 255) >>> 0 };
      case 9:
        return { css: r5, rgba: parseInt(r5.slice(1), 16) >>> 0 };
    }
    let n2 = r5.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
    if (n2) return ue = parseInt(n2[1]), he = parseInt(n2[2]), de = parseInt(n2[3]), J = Math.round((n2[5] === void 0 ? 1 : parseFloat(n2[5])) * 255), j.toColor(ue, he, de, J);
    if (!s15 || !t) throw new Error("css.toColor: Unsupported css format");
    if (s15.fillStyle = t, s15.fillStyle = r5, typeof s15.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
    if (s15.fillRect(0, 0, 1, 1), [ue, he, de, J] = s15.getImageData(0, 0, 1, 1).data, J !== 255) throw new Error("css.toColor: Unsupported css format");
    return { rgba: j.toRgba(ue, he, de, J), css: r5 };
  }
  i8.toColor = e;
})(z ||= {});
var ve;
((e) => {
  function s15(i8) {
    return t(i8 >> 16 & 255, i8 >> 8 & 255, i8 & 255);
  }
  e.relativeLuminance = s15;
  function t(i8, r5, n2) {
    let o = i8 / 255, l2 = r5 / 255, a = n2 / 255, u2 = o <= 0.03928 ? o / 12.92 : Math.pow((o + 0.055) / 1.055, 2.4), h2 = l2 <= 0.03928 ? l2 / 12.92 : Math.pow((l2 + 0.055) / 1.055, 2.4), c2 = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
    return u2 * 0.2126 + h2 * 0.7152 + c2 * 0.0722;
  }
  e.relativeLuminance2 = t;
})(ve ||= {});
var $r;
((n2) => {
  function s15(o, l2) {
    if (J = (l2 & 255) / 255, J === 1) return l2;
    let a = l2 >> 24 & 255, u2 = l2 >> 16 & 255, h2 = l2 >> 8 & 255, c2 = o >> 24 & 255, d2 = o >> 16 & 255, _4 = o >> 8 & 255;
    return ue = c2 + Math.round((a - c2) * J), he = d2 + Math.round((u2 - d2) * J), de = _4 + Math.round((h2 - _4) * J), j.toRgba(ue, he, de);
  }
  n2.blend = s15;
  function t(o, l2, a) {
    let u2 = ve.relativeLuminance(o >> 8), h2 = ve.relativeLuminance(l2 >> 8);
    if (Xe(u2, h2) < a) {
      if (h2 < u2) {
        let p2 = e(o, l2, a), m2 = Xe(u2, ve.relativeLuminance(p2 >> 8));
        if (m2 < a) {
          let f2 = i8(o, l2, a), A3 = Xe(u2, ve.relativeLuminance(f2 >> 8));
          return m2 > A3 ? p2 : f2;
        }
        return p2;
      }
      let d2 = i8(o, l2, a), _4 = Xe(u2, ve.relativeLuminance(d2 >> 8));
      if (_4 < a) {
        let p2 = e(o, l2, a), m2 = Xe(u2, ve.relativeLuminance(p2 >> 8));
        return _4 > m2 ? d2 : p2;
      }
      return d2;
    }
  }
  n2.ensureContrastRatio = t;
  function e(o, l2, a) {
    let u2 = o >> 24 & 255, h2 = o >> 16 & 255, c2 = o >> 8 & 255, d2 = l2 >> 24 & 255, _4 = l2 >> 16 & 255, p2 = l2 >> 8 & 255, m2 = Xe(ve.relativeLuminance2(d2, _4, p2), ve.relativeLuminance2(u2, h2, c2));
    for (; m2 < a && (d2 > 0 || _4 > 0 || p2 > 0); ) d2 -= Math.max(0, Math.ceil(d2 * 0.1)), _4 -= Math.max(0, Math.ceil(_4 * 0.1)), p2 -= Math.max(0, Math.ceil(p2 * 0.1)), m2 = Xe(ve.relativeLuminance2(d2, _4, p2), ve.relativeLuminance2(u2, h2, c2));
    return (d2 << 24 | _4 << 16 | p2 << 8 | 255) >>> 0;
  }
  n2.reduceLuminance = e;
  function i8(o, l2, a) {
    let u2 = o >> 24 & 255, h2 = o >> 16 & 255, c2 = o >> 8 & 255, d2 = l2 >> 24 & 255, _4 = l2 >> 16 & 255, p2 = l2 >> 8 & 255, m2 = Xe(ve.relativeLuminance2(d2, _4, p2), ve.relativeLuminance2(u2, h2, c2));
    for (; m2 < a && (d2 < 255 || _4 < 255 || p2 < 255); ) d2 = Math.min(255, d2 + Math.ceil((255 - d2) * 0.1)), _4 = Math.min(255, _4 + Math.ceil((255 - _4) * 0.1)), p2 = Math.min(255, p2 + Math.ceil((255 - p2) * 0.1)), m2 = Xe(ve.relativeLuminance2(d2, _4, p2), ve.relativeLuminance2(u2, h2, c2));
    return (d2 << 24 | _4 << 16 | p2 << 8 | 255) >>> 0;
  }
  n2.increaseLuminance = i8;
  function r5(o) {
    return [o >> 24 & 255, o >> 16 & 255, o >> 8 & 255, o & 255];
  }
  n2.toChannels = r5;
})($r ||= {});
function vt(s15) {
  let t = s15.toString(16);
  return t.length < 2 ? "0" + t : t;
}
function Xe(s15, t) {
  return s15 < t ? (t + 0.05) / (s15 + 0.05) : (s15 + 0.05) / (t + 0.05);
}
var Vr = class extends De {
  constructor(e, i8, r5) {
    super();
    this.content = 0;
    this.combinedData = "";
    this.fg = e.fg, this.bg = e.bg, this.combinedData = i8, this._width = r5;
  }
  isCombined() {
    return 2097152;
  }
  getWidth() {
    return this._width;
  }
  getChars() {
    return this.combinedData;
  }
  getCode() {
    return 2097151;
  }
  setFromCharData(e) {
    throw new Error("not implemented");
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var ct = class {
  constructor(t) {
    this._bufferService = t;
    this._characterJoiners = [];
    this._nextCharacterJoinerId = 0;
    this._workCell = new q();
  }
  register(t) {
    let e = { id: this._nextCharacterJoinerId++, handler: t };
    return this._characterJoiners.push(e), e.id;
  }
  deregister(t) {
    for (let e = 0; e < this._characterJoiners.length; e++) if (this._characterJoiners[e].id === t) return this._characterJoiners.splice(e, 1), true;
    return false;
  }
  getJoinedCharacters(t) {
    if (this._characterJoiners.length === 0) return [];
    let e = this._bufferService.buffer.lines.get(t);
    if (!e || e.length === 0) return [];
    let i8 = [], r5 = e.translateToString(true), n2 = 0, o = 0, l2 = 0, a = e.getFg(0), u2 = e.getBg(0);
    for (let h2 = 0; h2 < e.getTrimmedLength(); h2++) if (e.loadCell(h2, this._workCell), this._workCell.getWidth() !== 0) {
      if (this._workCell.fg !== a || this._workCell.bg !== u2) {
        if (h2 - n2 > 1) {
          let c2 = this._getJoinedRanges(r5, l2, o, e, n2);
          for (let d2 = 0; d2 < c2.length; d2++) i8.push(c2[d2]);
        }
        n2 = h2, l2 = o, a = this._workCell.fg, u2 = this._workCell.bg;
      }
      o += this._workCell.getChars().length || we.length;
    }
    if (this._bufferService.cols - n2 > 1) {
      let h2 = this._getJoinedRanges(r5, l2, o, e, n2);
      for (let c2 = 0; c2 < h2.length; c2++) i8.push(h2[c2]);
    }
    return i8;
  }
  _getJoinedRanges(t, e, i8, r5, n2) {
    let o = t.substring(e, i8), l2 = [];
    try {
      l2 = this._characterJoiners[0].handler(o);
    } catch (a) {
      console.error(a);
    }
    for (let a = 1; a < this._characterJoiners.length; a++) try {
      let u2 = this._characterJoiners[a].handler(o);
      for (let h2 = 0; h2 < u2.length; h2++) ct._mergeRanges(l2, u2[h2]);
    } catch (u2) {
      console.error(u2);
    }
    return this._stringRangesToCellRanges(l2, r5, n2), l2;
  }
  _stringRangesToCellRanges(t, e, i8) {
    let r5 = 0, n2 = false, o = 0, l2 = t[r5];
    if (l2) {
      for (let a = i8; a < this._bufferService.cols; a++) {
        let u2 = e.getWidth(a), h2 = e.getString(a).length || we.length;
        if (u2 !== 0) {
          if (!n2 && l2[0] <= o && (l2[0] = a, n2 = true), l2[1] <= o) {
            if (l2[1] = a, l2 = t[++r5], !l2) break;
            l2[0] <= o ? (l2[0] = a, n2 = true) : n2 = false;
          }
          o += h2;
        }
      }
      l2 && (l2[1] = this._bufferService.cols);
    }
  }
  static _mergeRanges(t, e) {
    let i8 = false;
    for (let r5 = 0; r5 < t.length; r5++) {
      let n2 = t[r5];
      if (i8) {
        if (e[1] <= n2[0]) return t[r5 - 1][1] = e[1], t;
        if (e[1] <= n2[1]) return t[r5 - 1][1] = Math.max(e[1], n2[1]), t.splice(r5, 1), t;
        t.splice(r5, 1), r5--;
      } else {
        if (e[1] <= n2[0]) return t.splice(r5, 0, e), t;
        if (e[1] <= n2[1]) return n2[0] = Math.min(e[0], n2[0]), t;
        e[0] < n2[1] && (n2[0] = Math.min(e[0], n2[0]), i8 = true);
        continue;
      }
    }
    return i8 ? t[t.length - 1][1] = e[1] : t.push(e), t;
  }
};
ct = M([S(0, F)], ct);
function Oa(s15) {
  return 57508 <= s15 && s15 <= 57558;
}
function Ba(s15) {
  return 9472 <= s15 && s15 <= 9631;
}
function $o(s15) {
  return Oa(s15) || Ba(s15);
}
function Vo() {
  return { css: { canvas: qr(), cell: qr() }, device: { canvas: qr(), cell: qr(), char: { width: 0, height: 0, left: 0, top: 0 } } };
}
function qr() {
  return { width: 0, height: 0 };
}
var Vt = class {
  constructor(t, e, i8, r5, n2, o, l2) {
    this._document = t;
    this._characterJoinerService = e;
    this._optionsService = i8;
    this._coreBrowserService = r5;
    this._coreService = n2;
    this._decorationService = o;
    this._themeService = l2;
    this._workCell = new q();
    this._columnSelectMode = false;
    this.defaultSpacing = 0;
  }
  handleSelectionChanged(t, e, i8) {
    this._selectionStart = t, this._selectionEnd = e, this._columnSelectMode = i8;
  }
  createRow(t, e, i8, r5, n2, o, l2, a, u2, h2, c2) {
    let d2 = [], _4 = this._characterJoinerService.getJoinedCharacters(e), p2 = this._themeService.colors, m2 = t.getNoBgTrimmedLength();
    i8 && m2 < o + 1 && (m2 = o + 1);
    let f2, A3 = 0, R4 = "", O4 = 0, I3 = 0, k4 = 0, P4 = 0, oe = false, Me3 = 0, Pe3 = false, Ke2 = 0, di = 0, V3 = [], Qe2 = h2 !== -1 && c2 !== -1;
    for (let y2 = 0; y2 < m2; y2++) {
      t.loadCell(y2, this._workCell);
      let T2 = this._workCell.getWidth();
      if (T2 === 0) continue;
      let g3 = false, w4 = y2 >= di, E2 = y2, x2 = this._workCell;
      if (_4.length > 0 && y2 === _4[0][0] && w4) {
        let W = _4.shift(), An2 = this._isCellInSelection(W[0], e);
        for (O4 = W[0] + 1; O4 < W[1]; O4++) w4 &&= An2 === this._isCellInSelection(O4, e);
        w4 &&= !i8 || o < W[0] || o >= W[1], w4 ? (g3 = true, x2 = new Vr(this._workCell, t.translateToString(true, W[0], W[1]), W[1] - W[0]), E2 = W[1] - 1, T2 = x2.getWidth()) : di = W[1];
      }
      let N3 = this._isCellInSelection(y2, e), Z4 = i8 && y2 === o, te4 = Qe2 && y2 >= h2 && y2 <= c2, Oe3 = false;
      this._decorationService.forEachDecorationAtCell(y2, e, void 0, (W) => {
        Oe3 = true;
      });
      let ze2 = x2.getChars() || we;
      if (ze2 === " " && (x2.isUnderline() || x2.isOverline()) && (ze2 = "\xA0"), Ke2 = T2 * a - u2.get(ze2, x2.isBold(), x2.isItalic()), !f2) f2 = this._document.createElement("span");
      else if (A3 && (N3 && Pe3 || !N3 && !Pe3 && x2.bg === I3) && (N3 && Pe3 && p2.selectionForeground || x2.fg === k4) && x2.extended.ext === P4 && te4 === oe && Ke2 === Me3 && !Z4 && !g3 && !Oe3 && w4) {
        x2.isInvisible() ? R4 += we : R4 += ze2, A3++;
        continue;
      } else A3 && (f2.textContent = R4), f2 = this._document.createElement("span"), A3 = 0, R4 = "";
      if (I3 = x2.bg, k4 = x2.fg, P4 = x2.extended.ext, oe = te4, Me3 = Ke2, Pe3 = N3, g3 && o >= y2 && o <= E2 && (o = y2), !this._coreService.isCursorHidden && Z4 && this._coreService.isCursorInitialized) {
        if (V3.push("xterm-cursor"), this._coreBrowserService.isFocused) l2 && V3.push("xterm-cursor-blink"), V3.push(r5 === "bar" ? "xterm-cursor-bar" : r5 === "underline" ? "xterm-cursor-underline" : "xterm-cursor-block");
        else if (n2) switch (n2) {
          case "outline":
            V3.push("xterm-cursor-outline");
            break;
          case "block":
            V3.push("xterm-cursor-block");
            break;
          case "bar":
            V3.push("xterm-cursor-bar");
            break;
          case "underline":
            V3.push("xterm-cursor-underline");
            break;
          default:
            break;
        }
      }
      if (x2.isBold() && V3.push("xterm-bold"), x2.isItalic() && V3.push("xterm-italic"), x2.isDim() && V3.push("xterm-dim"), x2.isInvisible() ? R4 = we : R4 = x2.getChars() || we, x2.isUnderline() && (V3.push(`xterm-underline-${x2.extended.underlineStyle}`), R4 === " " && (R4 = "\xA0"), !x2.isUnderlineColorDefault())) if (x2.isUnderlineColorRGB()) f2.style.textDecorationColor = `rgb(${De.toColorRGB(x2.getUnderlineColor()).join(",")})`;
      else {
        let W = x2.getUnderlineColor();
        this._optionsService.rawOptions.drawBoldTextInBrightColors && x2.isBold() && W < 8 && (W += 8), f2.style.textDecorationColor = p2.ansi[W].css;
      }
      x2.isOverline() && (V3.push("xterm-overline"), R4 === " " && (R4 = "\xA0")), x2.isStrikethrough() && V3.push("xterm-strikethrough"), te4 && (f2.style.textDecoration = "underline");
      let le2 = x2.getFgColor(), et3 = x2.getFgColorMode(), me3 = x2.getBgColor(), ht2 = x2.getBgColorMode(), fi2 = !!x2.isInverse();
      if (fi2) {
        let W = le2;
        le2 = me3, me3 = W;
        let An2 = et3;
        et3 = ht2, ht2 = An2;
      }
      let tt3, Qi2, pi2 = false;
      this._decorationService.forEachDecorationAtCell(y2, e, void 0, (W) => {
        W.options.layer !== "top" && pi2 || (W.backgroundColorRGB && (ht2 = 50331648, me3 = W.backgroundColorRGB.rgba >> 8 & 16777215, tt3 = W.backgroundColorRGB), W.foregroundColorRGB && (et3 = 50331648, le2 = W.foregroundColorRGB.rgba >> 8 & 16777215, Qi2 = W.foregroundColorRGB), pi2 = W.options.layer === "top");
      }), !pi2 && N3 && (tt3 = this._coreBrowserService.isFocused ? p2.selectionBackgroundOpaque : p2.selectionInactiveBackgroundOpaque, me3 = tt3.rgba >> 8 & 16777215, ht2 = 50331648, pi2 = true, p2.selectionForeground && (et3 = 50331648, le2 = p2.selectionForeground.rgba >> 8 & 16777215, Qi2 = p2.selectionForeground)), pi2 && V3.push("xterm-decoration-top");
      let it3;
      switch (ht2) {
        case 16777216:
        case 33554432:
          it3 = p2.ansi[me3], V3.push(`xterm-bg-${me3}`);
          break;
        case 50331648:
          it3 = j.toColor(me3 >> 16, me3 >> 8 & 255, me3 & 255), this._addStyle(f2, `background-color:#${qo((me3 >>> 0).toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          fi2 ? (it3 = p2.foreground, V3.push(`xterm-bg-${257}`)) : it3 = p2.background;
      }
      switch (tt3 || x2.isDim() && (tt3 = U.multiplyOpacity(it3, 0.5)), et3) {
        case 16777216:
        case 33554432:
          x2.isBold() && le2 < 8 && this._optionsService.rawOptions.drawBoldTextInBrightColors && (le2 += 8), this._applyMinimumContrast(f2, it3, p2.ansi[le2], x2, tt3, void 0) || V3.push(`xterm-fg-${le2}`);
          break;
        case 50331648:
          let W = j.toColor(le2 >> 16 & 255, le2 >> 8 & 255, le2 & 255);
          this._applyMinimumContrast(f2, it3, W, x2, tt3, Qi2) || this._addStyle(f2, `color:#${qo(le2.toString(16), "0", 6)}`);
          break;
        case 0:
        default:
          this._applyMinimumContrast(f2, it3, p2.foreground, x2, tt3, Qi2) || fi2 && V3.push(`xterm-fg-${257}`);
      }
      V3.length && (f2.className = V3.join(" "), V3.length = 0), !Z4 && !g3 && !Oe3 && w4 ? A3++ : f2.textContent = R4, Ke2 !== this.defaultSpacing && (f2.style.letterSpacing = `${Ke2}px`), d2.push(f2), y2 = E2;
    }
    return f2 && A3 && (f2.textContent = R4), d2;
  }
  _applyMinimumContrast(t, e, i8, r5, n2, o) {
    if (this._optionsService.rawOptions.minimumContrastRatio === 1 || $o(r5.getCode())) return false;
    let l2 = this._getContrastCache(r5), a;
    if (!n2 && !o && (a = l2.getColor(e.rgba, i8.rgba)), a === void 0) {
      let u2 = this._optionsService.rawOptions.minimumContrastRatio / (r5.isDim() ? 2 : 1);
      a = U.ensureContrastRatio(n2 || e, o || i8, u2), l2.setColor((n2 || e).rgba, (o || i8).rgba, a ?? null);
    }
    return a ? (this._addStyle(t, `color:${a.css}`), true) : false;
  }
  _getContrastCache(t) {
    return t.isDim() ? this._themeService.colors.halfContrastCache : this._themeService.colors.contrastCache;
  }
  _addStyle(t, e) {
    t.setAttribute("style", `${t.getAttribute("style") || ""}${e};`);
  }
  _isCellInSelection(t, e) {
    let i8 = this._selectionStart, r5 = this._selectionEnd;
    return !i8 || !r5 ? false : this._columnSelectMode ? i8[0] <= r5[0] ? t >= i8[0] && e >= i8[1] && t < r5[0] && e <= r5[1] : t < i8[0] && e >= i8[1] && t >= r5[0] && e <= r5[1] : e > i8[1] && e < r5[1] || i8[1] === r5[1] && e === i8[1] && t >= i8[0] && t < r5[0] || i8[1] < r5[1] && e === r5[1] && t < r5[0] || i8[1] < r5[1] && e === i8[1] && t >= i8[0];
  }
};
Vt = M([S(1, or), S(2, H), S(3, ae), S(4, ge), S(5, Be), S(6, Re)], Vt);
function qo(s15, t, e) {
  for (; s15.length < e; ) s15 = t + s15;
  return s15;
}
var Yr = class {
  constructor(t, e) {
    this._flat = new Float32Array(256);
    this._font = "";
    this._fontSize = 0;
    this._weight = "normal";
    this._weightBold = "bold";
    this._measureElements = [];
    this._container = t.createElement("div"), this._container.classList.add("xterm-width-cache-measure-container"), this._container.setAttribute("aria-hidden", "true"), this._container.style.whiteSpace = "pre", this._container.style.fontKerning = "none";
    let i8 = t.createElement("span");
    i8.classList.add("xterm-char-measure-element");
    let r5 = t.createElement("span");
    r5.classList.add("xterm-char-measure-element"), r5.style.fontWeight = "bold";
    let n2 = t.createElement("span");
    n2.classList.add("xterm-char-measure-element"), n2.style.fontStyle = "italic";
    let o = t.createElement("span");
    o.classList.add("xterm-char-measure-element"), o.style.fontWeight = "bold", o.style.fontStyle = "italic", this._measureElements = [i8, r5, n2, o], this._container.appendChild(i8), this._container.appendChild(r5), this._container.appendChild(n2), this._container.appendChild(o), e.appendChild(this._container), this.clear();
  }
  dispose() {
    this._container.remove(), this._measureElements.length = 0, this._holey = void 0;
  }
  clear() {
    this._flat.fill(-9999), this._holey = /* @__PURE__ */ new Map();
  }
  setFont(t, e, i8, r5) {
    t === this._font && e === this._fontSize && i8 === this._weight && r5 === this._weightBold || (this._font = t, this._fontSize = e, this._weight = i8, this._weightBold = r5, this._container.style.fontFamily = this._font, this._container.style.fontSize = `${this._fontSize}px`, this._measureElements[0].style.fontWeight = `${i8}`, this._measureElements[1].style.fontWeight = `${r5}`, this._measureElements[2].style.fontWeight = `${i8}`, this._measureElements[3].style.fontWeight = `${r5}`, this.clear());
  }
  get(t, e, i8) {
    let r5 = 0;
    if (!e && !i8 && t.length === 1 && (r5 = t.charCodeAt(0)) < 256) {
      if (this._flat[r5] !== -9999) return this._flat[r5];
      let l2 = this._measure(t, 0);
      return l2 > 0 && (this._flat[r5] = l2), l2;
    }
    let n2 = t;
    e && (n2 += "B"), i8 && (n2 += "I");
    let o = this._holey.get(n2);
    if (o === void 0) {
      let l2 = 0;
      e && (l2 |= 1), i8 && (l2 |= 2), o = this._measure(t, l2), o > 0 && this._holey.set(n2, o);
    }
    return o;
  }
  _measure(t, e) {
    let i8 = this._measureElements[e];
    return i8.textContent = t.repeat(32), i8.offsetWidth / 32;
  }
};
var ms = class {
  constructor() {
    this.clear();
  }
  clear() {
    this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
  }
  update(t, e, i8, r5 = false) {
    if (this.selectionStart = e, this.selectionEnd = i8, !e || !i8 || e[0] === i8[0] && e[1] === i8[1]) {
      this.clear();
      return;
    }
    let n2 = t.buffers.active.ydisp, o = e[1] - n2, l2 = i8[1] - n2, a = Math.max(o, 0), u2 = Math.min(l2, t.rows - 1);
    if (a >= t.rows || u2 < 0) {
      this.clear();
      return;
    }
    this.hasSelection = true, this.columnSelectMode = r5, this.viewportStartRow = o, this.viewportEndRow = l2, this.viewportCappedStartRow = a, this.viewportCappedEndRow = u2, this.startCol = e[0], this.endCol = i8[0];
  }
  isCellSelected(t, e, i8) {
    return this.hasSelection ? (i8 -= t.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? e >= this.startCol && i8 >= this.viewportCappedStartRow && e < this.endCol && i8 <= this.viewportCappedEndRow : e < this.startCol && i8 >= this.viewportCappedStartRow && e >= this.endCol && i8 <= this.viewportCappedEndRow : i8 > this.viewportStartRow && i8 < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && i8 === this.viewportStartRow && e >= this.startCol && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i8 === this.viewportEndRow && e < this.endCol || this.viewportStartRow < this.viewportEndRow && i8 === this.viewportStartRow && e >= this.startCol) : false;
  }
};
function Yo() {
  return new ms();
}
var _s = "xterm-dom-renderer-owner-";
var Le = "xterm-rows";
var jr = "xterm-fg-";
var jo = "xterm-bg-";
var ki = "xterm-focus";
var Xr = "xterm-selection";
var Na = 1;
var Yt = class extends D {
  constructor(e, i8, r5, n2, o, l2, a, u2, h2, c2, d2, _4, p2, m2) {
    super();
    this._terminal = e;
    this._document = i8;
    this._element = r5;
    this._screenElement = n2;
    this._viewportElement = o;
    this._helperContainer = l2;
    this._linkifier2 = a;
    this._charSizeService = h2;
    this._optionsService = c2;
    this._bufferService = d2;
    this._coreService = _4;
    this._coreBrowserService = p2;
    this._themeService = m2;
    this._terminalClass = Na++;
    this._rowElements = [];
    this._selectionRenderModel = Yo();
    this.onRequestRedraw = this._register(new v()).event;
    this._rowContainer = this._document.createElement("div"), this._rowContainer.classList.add(Le), this._rowContainer.style.lineHeight = "normal", this._rowContainer.setAttribute("aria-hidden", "true"), this._refreshRowElements(this._bufferService.cols, this._bufferService.rows), this._selectionContainer = this._document.createElement("div"), this._selectionContainer.classList.add(Xr), this._selectionContainer.setAttribute("aria-hidden", "true"), this.dimensions = Vo(), this._updateDimensions(), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._themeService.onChangeColors((f2) => this._injectCss(f2))), this._injectCss(this._themeService.colors), this._rowFactory = u2.createInstance(Vt, document), this._element.classList.add(_s + this._terminalClass), this._screenElement.appendChild(this._rowContainer), this._screenElement.appendChild(this._selectionContainer), this._register(this._linkifier2.onShowLinkUnderline((f2) => this._handleLinkHover(f2))), this._register(this._linkifier2.onHideLinkUnderline((f2) => this._handleLinkLeave(f2))), this._register(C(() => {
      this._element.classList.remove(_s + this._terminalClass), this._rowContainer.remove(), this._selectionContainer.remove(), this._widthCache.dispose(), this._themeStyleElement.remove(), this._dimensionsStyleElement.remove();
    })), this._widthCache = new Yr(this._document, this._helperContainer), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  _updateDimensions() {
    let e = this._coreBrowserService.dpr;
    this.dimensions.device.char.width = this._charSizeService.width * e, this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * e), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.left = 0, this.dimensions.device.char.top = 0, this.dimensions.device.canvas.width = this.dimensions.device.cell.width * this._bufferService.cols, this.dimensions.device.canvas.height = this.dimensions.device.cell.height * this._bufferService.rows, this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / e), this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / e), this.dimensions.css.cell.width = this.dimensions.css.canvas.width / this._bufferService.cols, this.dimensions.css.cell.height = this.dimensions.css.canvas.height / this._bufferService.rows;
    for (let r5 of this._rowElements) r5.style.width = `${this.dimensions.css.canvas.width}px`, r5.style.height = `${this.dimensions.css.cell.height}px`, r5.style.lineHeight = `${this.dimensions.css.cell.height}px`, r5.style.overflow = "hidden";
    this._dimensionsStyleElement || (this._dimensionsStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._dimensionsStyleElement));
    let i8 = `${this._terminalSelector} .${Le} span { display: inline-block; height: 100%; vertical-align: top;}`;
    this._dimensionsStyleElement.textContent = i8, this._selectionContainer.style.height = this._viewportElement.style.height, this._screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._screenElement.style.height = `${this.dimensions.css.canvas.height}px`;
  }
  _injectCss(e) {
    this._themeStyleElement || (this._themeStyleElement = this._document.createElement("style"), this._screenElement.appendChild(this._themeStyleElement));
    let i8 = `${this._terminalSelector} .${Le} { pointer-events: none; color: ${e.foreground.css}; font-family: ${this._optionsService.rawOptions.fontFamily}; font-size: ${this._optionsService.rawOptions.fontSize}px; font-kerning: none; white-space: pre}`;
    i8 += `${this._terminalSelector} .${Le} .xterm-dim { color: ${U.multiplyOpacity(e.foreground, 0.5).css};}`, i8 += `${this._terminalSelector} span:not(.xterm-bold) { font-weight: ${this._optionsService.rawOptions.fontWeight};}${this._terminalSelector} span.xterm-bold { font-weight: ${this._optionsService.rawOptions.fontWeightBold};}${this._terminalSelector} span.xterm-italic { font-style: italic;}`;
    let r5 = `blink_underline_${this._terminalClass}`, n2 = `blink_bar_${this._terminalClass}`, o = `blink_block_${this._terminalClass}`;
    i8 += `@keyframes ${r5} { 50% {  border-bottom-style: hidden; }}`, i8 += `@keyframes ${n2} { 50% {  box-shadow: none; }}`, i8 += `@keyframes ${o} { 0% {  background-color: ${e.cursor.css};  color: ${e.cursorAccent.css}; } 50% {  background-color: inherit;  color: ${e.cursor.css}; }}`, i8 += `${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-underline { animation: ${r5} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-bar { animation: ${n2} 1s step-end infinite;}${this._terminalSelector} .${Le}.${ki} .xterm-cursor.xterm-cursor-blink.xterm-cursor-block { animation: ${o} 1s step-end infinite;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block { background-color: ${e.cursor.css}; color: ${e.cursorAccent.css};}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-block:not(.xterm-cursor-blink) { background-color: ${e.cursor.css} !important; color: ${e.cursorAccent.css} !important;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-outline { outline: 1px solid ${e.cursor.css}; outline-offset: -1px;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-bar { box-shadow: ${this._optionsService.rawOptions.cursorWidth}px 0 0 ${e.cursor.css} inset;}${this._terminalSelector} .${Le} .xterm-cursor.xterm-cursor-underline { border-bottom: 1px ${e.cursor.css}; border-bottom-style: solid; height: calc(100% - 1px);}`, i8 += `${this._terminalSelector} .${Xr} { position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none;}${this._terminalSelector}.focus .${Xr} div { position: absolute; background-color: ${e.selectionBackgroundOpaque.css};}${this._terminalSelector} .${Xr} div { position: absolute; background-color: ${e.selectionInactiveBackgroundOpaque.css};}`;
    for (let [l2, a] of e.ansi.entries()) i8 += `${this._terminalSelector} .${jr}${l2} { color: ${a.css}; }${this._terminalSelector} .${jr}${l2}.xterm-dim { color: ${U.multiplyOpacity(a, 0.5).css}; }${this._terminalSelector} .${jo}${l2} { background-color: ${a.css}; }`;
    i8 += `${this._terminalSelector} .${jr}${257} { color: ${U.opaque(e.background).css}; }${this._terminalSelector} .${jr}${257}.xterm-dim { color: ${U.multiplyOpacity(U.opaque(e.background), 0.5).css}; }${this._terminalSelector} .${jo}${257} { background-color: ${e.foreground.css}; }`, this._themeStyleElement.textContent = i8;
  }
  _setDefaultSpacing() {
    let e = this.dimensions.css.cell.width - this._widthCache.get("W", false, false);
    this._rowContainer.style.letterSpacing = `${e}px`, this._rowFactory.defaultSpacing = e;
  }
  handleDevicePixelRatioChange() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  _refreshRowElements(e, i8) {
    for (let r5 = this._rowElements.length; r5 <= i8; r5++) {
      let n2 = this._document.createElement("div");
      this._rowContainer.appendChild(n2), this._rowElements.push(n2);
    }
    for (; this._rowElements.length > i8; ) this._rowContainer.removeChild(this._rowElements.pop());
  }
  handleResize(e, i8) {
    this._refreshRowElements(e, i8), this._updateDimensions(), this.handleSelectionChanged(this._selectionRenderModel.selectionStart, this._selectionRenderModel.selectionEnd, this._selectionRenderModel.columnSelectMode);
  }
  handleCharSizeChanged() {
    this._updateDimensions(), this._widthCache.clear(), this._setDefaultSpacing();
  }
  handleBlur() {
    this._rowContainer.classList.remove(ki), this.renderRows(0, this._bufferService.rows - 1);
  }
  handleFocus() {
    this._rowContainer.classList.add(ki), this.renderRows(this._bufferService.buffer.y, this._bufferService.buffer.y);
  }
  handleSelectionChanged(e, i8, r5) {
    if (this._selectionContainer.replaceChildren(), this._rowFactory.handleSelectionChanged(e, i8, r5), this.renderRows(0, this._bufferService.rows - 1), !e || !i8 || (this._selectionRenderModel.update(this._terminal, e, i8, r5), !this._selectionRenderModel.hasSelection)) return;
    let n2 = this._selectionRenderModel.viewportStartRow, o = this._selectionRenderModel.viewportEndRow, l2 = this._selectionRenderModel.viewportCappedStartRow, a = this._selectionRenderModel.viewportCappedEndRow, u2 = this._document.createDocumentFragment();
    if (r5) {
      let h2 = e[0] > i8[0];
      u2.appendChild(this._createSelectionElement(l2, h2 ? i8[0] : e[0], h2 ? e[0] : i8[0], a - l2 + 1));
    } else {
      let h2 = n2 === l2 ? e[0] : 0, c2 = l2 === o ? i8[0] : this._bufferService.cols;
      u2.appendChild(this._createSelectionElement(l2, h2, c2));
      let d2 = a - l2 - 1;
      if (u2.appendChild(this._createSelectionElement(l2 + 1, 0, this._bufferService.cols, d2)), l2 !== a) {
        let _4 = o === a ? i8[0] : this._bufferService.cols;
        u2.appendChild(this._createSelectionElement(a, 0, _4));
      }
    }
    this._selectionContainer.appendChild(u2);
  }
  _createSelectionElement(e, i8, r5, n2 = 1) {
    let o = this._document.createElement("div"), l2 = i8 * this.dimensions.css.cell.width, a = this.dimensions.css.cell.width * (r5 - i8);
    return l2 + a > this.dimensions.css.canvas.width && (a = this.dimensions.css.canvas.width - l2), o.style.height = `${n2 * this.dimensions.css.cell.height}px`, o.style.top = `${e * this.dimensions.css.cell.height}px`, o.style.left = `${l2}px`, o.style.width = `${a}px`, o;
  }
  handleCursorMove() {
  }
  _handleOptionsChanged() {
    this._updateDimensions(), this._injectCss(this._themeService.colors), this._widthCache.setFont(this._optionsService.rawOptions.fontFamily, this._optionsService.rawOptions.fontSize, this._optionsService.rawOptions.fontWeight, this._optionsService.rawOptions.fontWeightBold), this._setDefaultSpacing();
  }
  clear() {
    for (let e of this._rowElements) e.replaceChildren();
  }
  renderRows(e, i8) {
    let r5 = this._bufferService.buffer, n2 = r5.ybase + r5.y, o = Math.min(r5.x, this._bufferService.cols - 1), l2 = this._coreService.decPrivateModes.cursorBlink ?? this._optionsService.rawOptions.cursorBlink, a = this._coreService.decPrivateModes.cursorStyle ?? this._optionsService.rawOptions.cursorStyle, u2 = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let h2 = e; h2 <= i8; h2++) {
      let c2 = h2 + r5.ydisp, d2 = this._rowElements[h2], _4 = r5.lines.get(c2);
      if (!d2 || !_4) break;
      d2.replaceChildren(...this._rowFactory.createRow(_4, c2, c2 === n2, a, u2, o, l2, this.dimensions.css.cell.width, this._widthCache, -1, -1));
    }
  }
  get _terminalSelector() {
    return `.${_s}${this._terminalClass}`;
  }
  _handleLinkHover(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, true);
  }
  _handleLinkLeave(e) {
    this._setCellUnderline(e.x1, e.x2, e.y1, e.y2, e.cols, false);
  }
  _setCellUnderline(e, i8, r5, n2, o, l2) {
    r5 < 0 && (e = 0), n2 < 0 && (i8 = 0);
    let a = this._bufferService.rows - 1;
    r5 = Math.max(Math.min(r5, a), 0), n2 = Math.max(Math.min(n2, a), 0), o = Math.min(o, this._bufferService.cols);
    let u2 = this._bufferService.buffer, h2 = u2.ybase + u2.y, c2 = Math.min(u2.x, o - 1), d2 = this._optionsService.rawOptions.cursorBlink, _4 = this._optionsService.rawOptions.cursorStyle, p2 = this._optionsService.rawOptions.cursorInactiveStyle;
    for (let m2 = r5; m2 <= n2; ++m2) {
      let f2 = m2 + u2.ydisp, A3 = this._rowElements[m2], R4 = u2.lines.get(f2);
      if (!A3 || !R4) break;
      A3.replaceChildren(...this._rowFactory.createRow(R4, f2, f2 === h2, _4, p2, c2, d2, this.dimensions.css.cell.width, this._widthCache, l2 ? m2 === r5 ? e : 0 : -1, l2 ? (m2 === n2 ? i8 : o) - 1 : -1));
    }
  }
};
Yt = M([S(7, xt), S(8, nt), S(9, H), S(10, F), S(11, ge), S(12, ae), S(13, Re)], Yt);
var jt = class extends D {
  constructor(e, i8, r5) {
    super();
    this._optionsService = r5;
    this.width = 0;
    this.height = 0;
    this._onCharSizeChange = this._register(new v());
    this.onCharSizeChange = this._onCharSizeChange.event;
    try {
      this._measureStrategy = this._register(new vs(this._optionsService));
    } catch {
      this._measureStrategy = this._register(new bs(e, i8, this._optionsService));
    }
    this._register(this._optionsService.onMultipleOptionChange(["fontFamily", "fontSize"], () => this.measure()));
  }
  get hasValidSize() {
    return this.width > 0 && this.height > 0;
  }
  measure() {
    let e = this._measureStrategy.measure();
    (e.width !== this.width || e.height !== this.height) && (this.width = e.width, this.height = e.height, this._onCharSizeChange.fire());
  }
};
jt = M([S(2, H)], jt);
var Zr = class extends D {
  constructor() {
    super(...arguments);
    this._result = { width: 0, height: 0 };
  }
  _validateAndSet(e, i8) {
    e !== void 0 && e > 0 && i8 !== void 0 && i8 > 0 && (this._result.width = e, this._result.height = i8);
  }
};
var bs = class extends Zr {
  constructor(e, i8, r5) {
    super();
    this._document = e;
    this._parentElement = i8;
    this._optionsService = r5;
    this._measureElement = this._document.createElement("span"), this._measureElement.classList.add("xterm-char-measure-element"), this._measureElement.textContent = "W".repeat(32), this._measureElement.setAttribute("aria-hidden", "true"), this._measureElement.style.whiteSpace = "pre", this._measureElement.style.fontKerning = "none", this._parentElement.appendChild(this._measureElement);
  }
  measure() {
    return this._measureElement.style.fontFamily = this._optionsService.rawOptions.fontFamily, this._measureElement.style.fontSize = `${this._optionsService.rawOptions.fontSize}px`, this._validateAndSet(Number(this._measureElement.offsetWidth) / 32, Number(this._measureElement.offsetHeight)), this._result;
  }
};
var vs = class extends Zr {
  constructor(e) {
    super();
    this._optionsService = e;
    this._canvas = new OffscreenCanvas(100, 100), this._ctx = this._canvas.getContext("2d");
    let i8 = this._ctx.measureText("W");
    if (!("width" in i8 && "fontBoundingBoxAscent" in i8 && "fontBoundingBoxDescent" in i8)) throw new Error("Required font metrics not supported");
  }
  measure() {
    this._ctx.font = `${this._optionsService.rawOptions.fontSize}px ${this._optionsService.rawOptions.fontFamily}`;
    let e = this._ctx.measureText("W");
    return this._validateAndSet(e.width, e.fontBoundingBoxAscent + e.fontBoundingBoxDescent), this._result;
  }
};
var Jr = class extends D {
  constructor(e, i8, r5) {
    super();
    this._textarea = e;
    this._window = i8;
    this.mainDocument = r5;
    this._isFocused = false;
    this._cachedIsFocused = void 0;
    this._screenDprMonitor = this._register(new gs(this._window));
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._onWindowChange = this._register(new v());
    this.onWindowChange = this._onWindowChange.event;
    this._register(this.onWindowChange((n2) => this._screenDprMonitor.setWindow(n2))), this._register($.forward(this._screenDprMonitor.onDprChange, this._onDprChange)), this._register(L(this._textarea, "focus", () => this._isFocused = true)), this._register(L(this._textarea, "blur", () => this._isFocused = false));
  }
  get window() {
    return this._window;
  }
  set window(e) {
    this._window !== e && (this._window = e, this._onWindowChange.fire(this._window));
  }
  get dpr() {
    return this.window.devicePixelRatio;
  }
  get isFocused() {
    return this._cachedIsFocused === void 0 && (this._cachedIsFocused = this._isFocused && this._textarea.ownerDocument.hasFocus(), queueMicrotask(() => this._cachedIsFocused = void 0)), this._cachedIsFocused;
  }
};
var gs = class extends D {
  constructor(e) {
    super();
    this._parentWindow = e;
    this._windowResizeListener = this._register(new ye());
    this._onDprChange = this._register(new v());
    this.onDprChange = this._onDprChange.event;
    this._outerListener = () => this._setDprAndFireIfDiffers(), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._updateDpr(), this._setWindowResizeListener(), this._register(C(() => this.clearListener()));
  }
  setWindow(e) {
    this._parentWindow = e, this._setWindowResizeListener(), this._setDprAndFireIfDiffers();
  }
  _setWindowResizeListener() {
    this._windowResizeListener.value = L(this._parentWindow, "resize", () => this._setDprAndFireIfDiffers());
  }
  _setDprAndFireIfDiffers() {
    this._parentWindow.devicePixelRatio !== this._currentDevicePixelRatio && this._onDprChange.fire(this._parentWindow.devicePixelRatio), this._updateDpr();
  }
  _updateDpr() {
    this._outerListener && (this._resolutionMediaMatchList?.removeListener(this._outerListener), this._currentDevicePixelRatio = this._parentWindow.devicePixelRatio, this._resolutionMediaMatchList = this._parentWindow.matchMedia(`screen and (resolution: ${this._parentWindow.devicePixelRatio}dppx)`), this._resolutionMediaMatchList.addListener(this._outerListener));
  }
  clearListener() {
    !this._resolutionMediaMatchList || !this._outerListener || (this._resolutionMediaMatchList.removeListener(this._outerListener), this._resolutionMediaMatchList = void 0, this._outerListener = void 0);
  }
};
var Qr = class extends D {
  constructor() {
    super();
    this.linkProviders = [];
    this._register(C(() => this.linkProviders.length = 0));
  }
  registerLinkProvider(e) {
    return this.linkProviders.push(e), { dispose: () => {
      let i8 = this.linkProviders.indexOf(e);
      i8 !== -1 && this.linkProviders.splice(i8, 1);
    } };
  }
};
function Ci(s15, t, e) {
  let i8 = e.getBoundingClientRect(), r5 = s15.getComputedStyle(e), n2 = parseInt(r5.getPropertyValue("padding-left")), o = parseInt(r5.getPropertyValue("padding-top"));
  return [t.clientX - i8.left - n2, t.clientY - i8.top - o];
}
function Xo(s15, t, e, i8, r5, n2, o, l2, a) {
  if (!n2) return;
  let u2 = Ci(s15, t, e);
  if (u2) return u2[0] = Math.ceil((u2[0] + (a ? o / 2 : 0)) / o), u2[1] = Math.ceil(u2[1] / l2), u2[0] = Math.min(Math.max(u2[0], 1), i8 + (a ? 1 : 0)), u2[1] = Math.min(Math.max(u2[1], 1), r5), u2;
}
var Xt = class {
  constructor(t, e) {
    this._renderService = t;
    this._charSizeService = e;
  }
  getCoords(t, e, i8, r5, n2) {
    return Xo(window, t, e, i8, r5, this._charSizeService.hasValidSize, this._renderService.dimensions.css.cell.width, this._renderService.dimensions.css.cell.height, n2);
  }
  getMouseReportCoords(t, e) {
    let i8 = Ci(window, t, e);
    if (this._charSizeService.hasValidSize) return i8[0] = Math.min(Math.max(i8[0], 0), this._renderService.dimensions.css.canvas.width - 1), i8[1] = Math.min(Math.max(i8[1], 0), this._renderService.dimensions.css.canvas.height - 1), { col: Math.floor(i8[0] / this._renderService.dimensions.css.cell.width), row: Math.floor(i8[1] / this._renderService.dimensions.css.cell.height), x: Math.floor(i8[0]), y: Math.floor(i8[1]) };
  }
};
Xt = M([S(0, ce), S(1, nt)], Xt);
var en = class {
  constructor(t, e) {
    this._renderCallback = t;
    this._coreBrowserService = e;
    this._refreshCallbacks = [];
  }
  dispose() {
    this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  addRefreshCallback(t) {
    return this._refreshCallbacks.push(t), this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh())), this._animationFrame;
  }
  refresh(t, e, i8) {
    this._rowCount = i8, t = t !== void 0 ? t : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e, !this._animationFrame && (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._innerRefresh()));
  }
  _innerRefresh() {
    if (this._animationFrame = void 0, this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) {
      this._runRefreshCallbacks();
      return;
    }
    let t = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e), this._runRefreshCallbacks();
  }
  _runRefreshCallbacks() {
    for (let t of this._refreshCallbacks) t(0);
    this._refreshCallbacks = [];
  }
};
var tn = {};
Ll(tn, { getSafariVersion: () => Ha, isChromeOS: () => Ts, isFirefox: () => Ss, isIpad: () => Wa, isIphone: () => Ua, isLegacyEdge: () => Fa, isLinux: () => Bi, isMac: () => Zt, isNode: () => Mi, isSafari: () => Zo, isWindows: () => Es });
var Mi = typeof process < "u" && "title" in process;
var Pi = Mi ? "node" : navigator.userAgent;
var Oi = Mi ? "node" : navigator.platform;
var Ss = Pi.includes("Firefox");
var Fa = Pi.includes("Edge");
var Zo = /^((?!chrome|android).)*safari/i.test(Pi);
function Ha() {
  if (!Zo) return 0;
  let s15 = Pi.match(/Version\/(\d+)/);
  return s15 === null || s15.length < 2 ? 0 : parseInt(s15[1]);
}
var Zt = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(Oi);
var Wa = Oi === "iPad";
var Ua = Oi === "iPhone";
var Es = ["Windows", "Win16", "Win32", "WinCE"].includes(Oi);
var Bi = Oi.indexOf("Linux") >= 0;
var Ts = /\bCrOS\b/.test(Pi);
var rn = class {
  constructor() {
    this._tasks = [];
    this._i = 0;
  }
  enqueue(t) {
    this._tasks.push(t), this._start();
  }
  flush() {
    for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
    this.clear();
  }
  clear() {
    this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
  }
  _start() {
    this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
  }
  _process(t) {
    this._idleCallback = void 0;
    let e = 0, i8 = 0, r5 = t.timeRemaining(), n2 = 0;
    for (; this._i < this._tasks.length; ) {
      if (e = performance.now(), this._tasks[this._i]() || this._i++, e = Math.max(1, performance.now() - e), i8 = Math.max(e, i8), n2 = t.timeRemaining(), i8 * 1.5 > n2) {
        r5 - e < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(r5 - e))}ms`), this._start();
        return;
      }
      r5 = n2;
    }
    this.clear();
  }
};
var Is = class extends rn {
  _requestCallback(t) {
    return setTimeout(() => t(this._createDeadline(16)));
  }
  _cancelCallback(t) {
    clearTimeout(t);
  }
  _createDeadline(t) {
    let e = performance.now() + t;
    return { timeRemaining: () => Math.max(0, e - performance.now()) };
  }
};
var ys = class extends rn {
  _requestCallback(t) {
    return requestIdleCallback(t);
  }
  _cancelCallback(t) {
    cancelIdleCallback(t);
  }
};
var Jt = !Mi && "requestIdleCallback" in window ? ys : Is;
var nn = class {
  constructor() {
    this._queue = new Jt();
  }
  set(t) {
    this._queue.clear(), this._queue.enqueue(t);
  }
  flush() {
    this._queue.flush();
  }
};
var Qt = class extends D {
  constructor(e, i8, r5, n2, o, l2, a, u2, h2) {
    super();
    this._rowCount = e;
    this._optionsService = r5;
    this._charSizeService = n2;
    this._coreService = o;
    this._coreBrowserService = u2;
    this._renderer = this._register(new ye());
    this._pausedResizeTask = new nn();
    this._observerDisposable = this._register(new ye());
    this._isPaused = false;
    this._needsFullRefresh = false;
    this._isNextRenderRedrawOnly = true;
    this._needsSelectionRefresh = false;
    this._canvasWidth = 0;
    this._canvasHeight = 0;
    this._selectionState = { start: void 0, end: void 0, columnSelectMode: false };
    this._onDimensionsChange = this._register(new v());
    this.onDimensionsChange = this._onDimensionsChange.event;
    this._onRenderedViewportChange = this._register(new v());
    this.onRenderedViewportChange = this._onRenderedViewportChange.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onRefreshRequest = this._register(new v());
    this.onRefreshRequest = this._onRefreshRequest.event;
    this._renderDebouncer = new en((c2, d2) => this._renderRows(c2, d2), this._coreBrowserService), this._register(this._renderDebouncer), this._syncOutputHandler = new xs(this._coreBrowserService, this._coreService, () => this._fullRefresh()), this._register(C(() => this._syncOutputHandler.dispose())), this._register(this._coreBrowserService.onDprChange(() => this.handleDevicePixelRatioChange())), this._register(a.onResize(() => this._fullRefresh())), this._register(a.buffers.onBufferActivate(() => this._renderer.value?.clear())), this._register(this._optionsService.onOptionChange(() => this._handleOptionsChanged())), this._register(this._charSizeService.onCharSizeChange(() => this.handleCharSizeChanged())), this._register(l2.onDecorationRegistered(() => this._fullRefresh())), this._register(l2.onDecorationRemoved(() => this._fullRefresh())), this._register(this._optionsService.onMultipleOptionChange(["customGlyphs", "drawBoldTextInBrightColors", "letterSpacing", "lineHeight", "fontFamily", "fontSize", "fontWeight", "fontWeightBold", "minimumContrastRatio", "rescaleOverlappingGlyphs"], () => {
      this.clear(), this.handleResize(a.cols, a.rows), this._fullRefresh();
    })), this._register(this._optionsService.onMultipleOptionChange(["cursorBlink", "cursorStyle"], () => this.refreshRows(a.buffer.y, a.buffer.y, true))), this._register(h2.onChangeColors(() => this._fullRefresh())), this._registerIntersectionObserver(this._coreBrowserService.window, i8), this._register(this._coreBrowserService.onWindowChange((c2) => this._registerIntersectionObserver(c2, i8)));
  }
  get dimensions() {
    return this._renderer.value.dimensions;
  }
  _registerIntersectionObserver(e, i8) {
    if ("IntersectionObserver" in e) {
      let r5 = new e.IntersectionObserver((n2) => this._handleIntersectionChange(n2[n2.length - 1]), { threshold: 0 });
      r5.observe(i8), this._observerDisposable.value = C(() => r5.disconnect());
    }
  }
  _handleIntersectionChange(e) {
    this._isPaused = e.isIntersecting === void 0 ? e.intersectionRatio === 0 : !e.isIntersecting, !this._isPaused && !this._charSizeService.hasValidSize && this._charSizeService.measure(), !this._isPaused && this._needsFullRefresh && (this._pausedResizeTask.flush(), this.refreshRows(0, this._rowCount - 1), this._needsFullRefresh = false);
  }
  refreshRows(e, i8, r5 = false) {
    if (this._isPaused) {
      this._needsFullRefresh = true;
      return;
    }
    if (this._coreService.decPrivateModes.synchronizedOutput) {
      this._syncOutputHandler.bufferRows(e, i8);
      return;
    }
    let n2 = this._syncOutputHandler.flush();
    n2 && (e = Math.min(e, n2.start), i8 = Math.max(i8, n2.end)), r5 || (this._isNextRenderRedrawOnly = false), this._renderDebouncer.refresh(e, i8, this._rowCount);
  }
  _renderRows(e, i8) {
    if (this._renderer.value) {
      if (this._coreService.decPrivateModes.synchronizedOutput) {
        this._syncOutputHandler.bufferRows(e, i8);
        return;
      }
      e = Math.min(e, this._rowCount - 1), i8 = Math.min(i8, this._rowCount - 1), this._renderer.value.renderRows(e, i8), this._needsSelectionRefresh && (this._renderer.value.handleSelectionChanged(this._selectionState.start, this._selectionState.end, this._selectionState.columnSelectMode), this._needsSelectionRefresh = false), this._isNextRenderRedrawOnly || this._onRenderedViewportChange.fire({ start: e, end: i8 }), this._onRender.fire({ start: e, end: i8 }), this._isNextRenderRedrawOnly = true;
    }
  }
  resize(e, i8) {
    this._rowCount = i8, this._fireOnCanvasResize();
  }
  _handleOptionsChanged() {
    this._renderer.value && (this.refreshRows(0, this._rowCount - 1), this._fireOnCanvasResize());
  }
  _fireOnCanvasResize() {
    this._renderer.value && (this._renderer.value.dimensions.css.canvas.width === this._canvasWidth && this._renderer.value.dimensions.css.canvas.height === this._canvasHeight || this._onDimensionsChange.fire(this._renderer.value.dimensions));
  }
  hasRenderer() {
    return !!this._renderer.value;
  }
  setRenderer(e) {
    this._renderer.value = e, this._renderer.value && (this._renderer.value.onRequestRedraw((i8) => this.refreshRows(i8.start, i8.end, true)), this._needsSelectionRefresh = true, this._fullRefresh());
  }
  addRefreshCallback(e) {
    return this._renderDebouncer.addRefreshCallback(e);
  }
  _fullRefresh() {
    this._isPaused ? this._needsFullRefresh = true : this.refreshRows(0, this._rowCount - 1);
  }
  clearTextureAtlas() {
    this._renderer.value && (this._renderer.value.clearTextureAtlas?.(), this._fullRefresh());
  }
  handleDevicePixelRatioChange() {
    this._charSizeService.measure(), this._renderer.value && (this._renderer.value.handleDevicePixelRatioChange(), this.refreshRows(0, this._rowCount - 1));
  }
  handleResize(e, i8) {
    this._renderer.value && (this._isPaused ? this._pausedResizeTask.set(() => this._renderer.value?.handleResize(e, i8)) : this._renderer.value.handleResize(e, i8), this._fullRefresh());
  }
  handleCharSizeChanged() {
    this._renderer.value?.handleCharSizeChanged();
  }
  handleBlur() {
    this._renderer.value?.handleBlur();
  }
  handleFocus() {
    this._renderer.value?.handleFocus();
  }
  handleSelectionChanged(e, i8, r5) {
    this._selectionState.start = e, this._selectionState.end = i8, this._selectionState.columnSelectMode = r5, this._renderer.value?.handleSelectionChanged(e, i8, r5);
  }
  handleCursorMove() {
    this._renderer.value?.handleCursorMove();
  }
  clear() {
    this._renderer.value?.clear();
  }
};
Qt = M([S(2, H), S(3, nt), S(4, ge), S(5, Be), S(6, F), S(7, ae), S(8, Re)], Qt);
var xs = class {
  constructor(t, e, i8) {
    this._coreBrowserService = t;
    this._coreService = e;
    this._onTimeout = i8;
    this._start = 0;
    this._end = 0;
    this._isBuffering = false;
  }
  bufferRows(t, e) {
    this._isBuffering ? (this._start = Math.min(this._start, t), this._end = Math.max(this._end, e)) : (this._start = t, this._end = e, this._isBuffering = true), this._timeout === void 0 && (this._timeout = this._coreBrowserService.window.setTimeout(() => {
      this._timeout = void 0, this._coreService.decPrivateModes.synchronizedOutput = false, this._onTimeout();
    }, 1e3));
  }
  flush() {
    if (this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0), !this._isBuffering) return;
    let t = { start: this._start, end: this._end };
    return this._isBuffering = false, t;
  }
  dispose() {
    this._timeout !== void 0 && (this._coreBrowserService.window.clearTimeout(this._timeout), this._timeout = void 0);
  }
};
function Jo(s15, t, e, i8) {
  let r5 = e.buffer.x, n2 = e.buffer.y;
  if (!e.buffer.hasScrollback) return Ga(r5, n2, s15, t, e, i8) + sn(n2, t, e, i8) + $a(r5, n2, s15, t, e, i8);
  let o;
  if (n2 === t) return o = r5 > s15 ? "D" : "C", Fi(Math.abs(r5 - s15), Ni(o, i8));
  o = n2 > t ? "D" : "C";
  let l2 = Math.abs(n2 - t), a = za(n2 > t ? s15 : r5, e) + (l2 - 1) * e.cols + 1 + Ka(n2 > t ? r5 : s15, e);
  return Fi(a, Ni(o, i8));
}
function Ka(s15, t) {
  return s15 - 1;
}
function za(s15, t) {
  return t.cols - s15;
}
function Ga(s15, t, e, i8, r5, n2) {
  return sn(t, i8, r5, n2).length === 0 ? "" : Fi(el(s15, t, s15, t - gt(t, r5), false, r5).length, Ni("D", n2));
}
function sn(s15, t, e, i8) {
  let r5 = s15 - gt(s15, e), n2 = t - gt(t, e), o = Math.abs(r5 - n2) - Va(s15, t, e);
  return Fi(o, Ni(Qo(s15, t), i8));
}
function $a(s15, t, e, i8, r5, n2) {
  let o;
  sn(t, i8, r5, n2).length > 0 ? o = i8 - gt(i8, r5) : o = t;
  let l2 = i8, a = qa(s15, t, e, i8, r5, n2);
  return Fi(el(s15, o, e, l2, a === "C", r5).length, Ni(a, n2));
}
function Va(s15, t, e) {
  let i8 = 0, r5 = s15 - gt(s15, e), n2 = t - gt(t, e);
  for (let o = 0; o < Math.abs(r5 - n2); o++) {
    let l2 = Qo(s15, t) === "A" ? -1 : 1;
    e.buffer.lines.get(r5 + l2 * o)?.isWrapped && i8++;
  }
  return i8;
}
function gt(s15, t) {
  let e = 0, i8 = t.buffer.lines.get(s15), r5 = i8?.isWrapped;
  for (; r5 && s15 >= 0 && s15 < t.rows; ) e++, i8 = t.buffer.lines.get(--s15), r5 = i8?.isWrapped;
  return e;
}
function qa(s15, t, e, i8, r5, n2) {
  let o;
  return sn(e, i8, r5, n2).length > 0 ? o = i8 - gt(i8, r5) : o = t, s15 < e && o <= i8 || s15 >= e && o < i8 ? "C" : "D";
}
function Qo(s15, t) {
  return s15 > t ? "A" : "B";
}
function el(s15, t, e, i8, r5, n2) {
  let o = s15, l2 = t, a = "";
  for (; (o !== e || l2 !== i8) && l2 >= 0 && l2 < n2.buffer.lines.length; ) o += r5 ? 1 : -1, r5 && o > n2.cols - 1 ? (a += n2.buffer.translateBufferLineToString(l2, false, s15, o), o = 0, s15 = 0, l2++) : !r5 && o < 0 && (a += n2.buffer.translateBufferLineToString(l2, false, 0, s15 + 1), o = n2.cols - 1, s15 = o, l2--);
  return a + n2.buffer.translateBufferLineToString(l2, false, s15, o);
}
function Ni(s15, t) {
  let e = t ? "O" : "[";
  return b.ESC + e + s15;
}
function Fi(s15, t) {
  s15 = Math.floor(s15);
  let e = "";
  for (let i8 = 0; i8 < s15; i8++) e += t;
  return e;
}
var on = class {
  constructor(t) {
    this._bufferService = t;
    this.isSelectAllActive = false;
    this.selectionStartLength = 0;
  }
  clearSelection() {
    this.selectionStart = void 0, this.selectionEnd = void 0, this.isSelectAllActive = false, this.selectionStartLength = 0;
  }
  get finalSelectionStart() {
    return this.isSelectAllActive ? [0, 0] : !this.selectionEnd || !this.selectionStart ? this.selectionStart : this.areSelectionValuesReversed() ? this.selectionEnd : this.selectionStart;
  }
  get finalSelectionEnd() {
    if (this.isSelectAllActive) return [this._bufferService.cols, this._bufferService.buffer.ybase + this._bufferService.rows - 1];
    if (this.selectionStart) {
      if (!this.selectionEnd || this.areSelectionValuesReversed()) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? t % this._bufferService.cols === 0 ? [this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols) - 1] : [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [t, this.selectionStart[1]];
      }
      if (this.selectionStartLength && this.selectionEnd[1] === this.selectionStart[1]) {
        let t = this.selectionStart[0] + this.selectionStartLength;
        return t > this._bufferService.cols ? [t % this._bufferService.cols, this.selectionStart[1] + Math.floor(t / this._bufferService.cols)] : [Math.max(t, this.selectionEnd[0]), this.selectionEnd[1]];
      }
      return this.selectionEnd;
    }
  }
  areSelectionValuesReversed() {
    let t = this.selectionStart, e = this.selectionEnd;
    return !t || !e ? false : t[1] > e[1] || t[1] === e[1] && t[0] > e[0];
  }
  handleTrim(t) {
    return this.selectionStart && (this.selectionStart[1] -= t), this.selectionEnd && (this.selectionEnd[1] -= t), this.selectionEnd && this.selectionEnd[1] < 0 ? (this.clearSelection(), true) : (this.selectionStart && this.selectionStart[1] < 0 && (this.selectionStart[1] = 0), false);
  }
};
function ws(s15, t) {
  if (s15.start.y > s15.end.y) throw new Error(`Buffer range end (${s15.end.x}, ${s15.end.y}) cannot be before start (${s15.start.x}, ${s15.start.y})`);
  return t * (s15.end.y - s15.start.y) + (s15.end.x - s15.start.x + 1);
}
var Ds = 50;
var Ya = 15;
var ja = 50;
var Xa = 500;
var Za = "\xA0";
var Ja = new RegExp(Za, "g");
var ei = class extends D {
  constructor(e, i8, r5, n2, o, l2, a, u2, h2) {
    super();
    this._element = e;
    this._screenElement = i8;
    this._linkifier = r5;
    this._bufferService = n2;
    this._coreService = o;
    this._mouseService = l2;
    this._optionsService = a;
    this._renderService = u2;
    this._coreBrowserService = h2;
    this._dragScrollAmount = 0;
    this._enabled = true;
    this._workCell = new q();
    this._mouseDownTimeStamp = 0;
    this._oldHasSelection = false;
    this._oldSelectionStart = void 0;
    this._oldSelectionEnd = void 0;
    this._onLinuxMouseSelection = this._register(new v());
    this.onLinuxMouseSelection = this._onLinuxMouseSelection.event;
    this._onRedrawRequest = this._register(new v());
    this.onRequestRedraw = this._onRedrawRequest.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onRequestScrollLines = this._register(new v());
    this.onRequestScrollLines = this._onRequestScrollLines.event;
    this._mouseMoveListener = (c2) => this._handleMouseMove(c2), this._mouseUpListener = (c2) => this._handleMouseUp(c2), this._coreService.onUserInput(() => {
      this.hasSelection && this.clearSelection();
    }), this._trimListener = this._bufferService.buffer.lines.onTrim((c2) => this._handleTrim(c2)), this._register(this._bufferService.buffers.onBufferActivate((c2) => this._handleBufferActivate(c2))), this.enable(), this._model = new on(this._bufferService), this._activeSelectionMode = 0, this._register(C(() => {
      this._removeMouseDownListeners();
    })), this._register(this._bufferService.onResize((c2) => {
      c2.rowsChanged && this.clearSelection();
    }));
  }
  reset() {
    this.clearSelection();
  }
  disable() {
    this.clearSelection(), this._enabled = false;
  }
  enable() {
    this._enabled = true;
  }
  get selectionStart() {
    return this._model.finalSelectionStart;
  }
  get selectionEnd() {
    return this._model.finalSelectionEnd;
  }
  get hasSelection() {
    let e = this._model.finalSelectionStart, i8 = this._model.finalSelectionEnd;
    return !e || !i8 ? false : e[0] !== i8[0] || e[1] !== i8[1];
  }
  get selectionText() {
    let e = this._model.finalSelectionStart, i8 = this._model.finalSelectionEnd;
    if (!e || !i8) return "";
    let r5 = this._bufferService.buffer, n2 = [];
    if (this._activeSelectionMode === 3) {
      if (e[0] === i8[0]) return "";
      let l2 = e[0] < i8[0] ? e[0] : i8[0], a = e[0] < i8[0] ? i8[0] : e[0];
      for (let u2 = e[1]; u2 <= i8[1]; u2++) {
        let h2 = r5.translateBufferLineToString(u2, true, l2, a);
        n2.push(h2);
      }
    } else {
      let l2 = e[1] === i8[1] ? i8[0] : void 0;
      n2.push(r5.translateBufferLineToString(e[1], true, e[0], l2));
      for (let a = e[1] + 1; a <= i8[1] - 1; a++) {
        let u2 = r5.lines.get(a), h2 = r5.translateBufferLineToString(a, true);
        u2?.isWrapped ? n2[n2.length - 1] += h2 : n2.push(h2);
      }
      if (e[1] !== i8[1]) {
        let a = r5.lines.get(i8[1]), u2 = r5.translateBufferLineToString(i8[1], true, 0, i8[0]);
        a && a.isWrapped ? n2[n2.length - 1] += u2 : n2.push(u2);
      }
    }
    return n2.map((l2) => l2.replace(Ja, " ")).join(Es ? `\r
` : `
`);
  }
  clearSelection() {
    this._model.clearSelection(), this._removeMouseDownListeners(), this.refresh(), this._onSelectionChange.fire();
  }
  refresh(e) {
    this._refreshAnimationFrame || (this._refreshAnimationFrame = this._coreBrowserService.window.requestAnimationFrame(() => this._refresh())), Bi && e && this.selectionText.length && this._onLinuxMouseSelection.fire(this.selectionText);
  }
  _refresh() {
    this._refreshAnimationFrame = void 0, this._onRedrawRequest.fire({ start: this._model.finalSelectionStart, end: this._model.finalSelectionEnd, columnSelectMode: this._activeSelectionMode === 3 });
  }
  _isClickInSelection(e) {
    let i8 = this._getMouseBufferCoords(e), r5 = this._model.finalSelectionStart, n2 = this._model.finalSelectionEnd;
    return !r5 || !n2 || !i8 ? false : this._areCoordsInSelection(i8, r5, n2);
  }
  isCellInSelection(e, i8) {
    let r5 = this._model.finalSelectionStart, n2 = this._model.finalSelectionEnd;
    return !r5 || !n2 ? false : this._areCoordsInSelection([e, i8], r5, n2);
  }
  _areCoordsInSelection(e, i8, r5) {
    return e[1] > i8[1] && e[1] < r5[1] || i8[1] === r5[1] && e[1] === i8[1] && e[0] >= i8[0] && e[0] < r5[0] || i8[1] < r5[1] && e[1] === r5[1] && e[0] < r5[0] || i8[1] < r5[1] && e[1] === i8[1] && e[0] >= i8[0];
  }
  _selectWordAtCursor(e, i8) {
    let r5 = this._linkifier.currentLink?.link?.range;
    if (r5) return this._model.selectionStart = [r5.start.x - 1, r5.start.y - 1], this._model.selectionStartLength = ws(r5, this._bufferService.cols), this._model.selectionEnd = void 0, true;
    let n2 = this._getMouseBufferCoords(e);
    return n2 ? (this._selectWordAt(n2, i8), this._model.selectionEnd = void 0, true) : false;
  }
  selectAll() {
    this._model.isSelectAllActive = true, this.refresh(), this._onSelectionChange.fire();
  }
  selectLines(e, i8) {
    this._model.clearSelection(), e = Math.max(e, 0), i8 = Math.min(i8, this._bufferService.buffer.lines.length - 1), this._model.selectionStart = [0, e], this._model.selectionEnd = [this._bufferService.cols, i8], this.refresh(), this._onSelectionChange.fire();
  }
  _handleTrim(e) {
    this._model.handleTrim(e) && this.refresh();
  }
  _getMouseBufferCoords(e) {
    let i8 = this._mouseService.getCoords(e, this._screenElement, this._bufferService.cols, this._bufferService.rows, true);
    if (i8) return i8[0]--, i8[1]--, i8[1] += this._bufferService.buffer.ydisp, i8;
  }
  _getMouseEventScrollAmount(e) {
    let i8 = Ci(this._coreBrowserService.window, e, this._screenElement)[1], r5 = this._renderService.dimensions.css.canvas.height;
    return i8 >= 0 && i8 <= r5 ? 0 : (i8 > r5 && (i8 -= r5), i8 = Math.min(Math.max(i8, -Ds), Ds), i8 /= Ds, i8 / Math.abs(i8) + Math.round(i8 * (Ya - 1)));
  }
  shouldForceSelection(e) {
    return Zt ? e.altKey && this._optionsService.rawOptions.macOptionClickForcesSelection : e.shiftKey;
  }
  handleMouseDown(e) {
    if (this._mouseDownTimeStamp = e.timeStamp, !(e.button === 2 && this.hasSelection) && e.button === 0) {
      if (!this._enabled) {
        if (!this.shouldForceSelection(e)) return;
        e.stopPropagation();
      }
      e.preventDefault(), this._dragScrollAmount = 0, this._enabled && e.shiftKey ? this._handleIncrementalClick(e) : e.detail === 1 ? this._handleSingleClick(e) : e.detail === 2 ? this._handleDoubleClick(e) : e.detail === 3 && this._handleTripleClick(e), this._addMouseDownListeners(), this.refresh(true);
    }
  }
  _addMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.addEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.addEventListener("mouseup", this._mouseUpListener)), this._dragScrollIntervalTimer = this._coreBrowserService.window.setInterval(() => this._dragScroll(), ja);
  }
  _removeMouseDownListeners() {
    this._screenElement.ownerDocument && (this._screenElement.ownerDocument.removeEventListener("mousemove", this._mouseMoveListener), this._screenElement.ownerDocument.removeEventListener("mouseup", this._mouseUpListener)), this._coreBrowserService.window.clearInterval(this._dragScrollIntervalTimer), this._dragScrollIntervalTimer = void 0;
  }
  _handleIncrementalClick(e) {
    this._model.selectionStart && (this._model.selectionEnd = this._getMouseBufferCoords(e));
  }
  _handleSingleClick(e) {
    if (this._model.selectionStartLength = 0, this._model.isSelectAllActive = false, this._activeSelectionMode = this.shouldColumnSelect(e) ? 3 : 0, this._model.selectionStart = this._getMouseBufferCoords(e), !this._model.selectionStart) return;
    this._model.selectionEnd = void 0;
    let i8 = this._bufferService.buffer.lines.get(this._model.selectionStart[1]);
    i8 && i8.length !== this._model.selectionStart[0] && i8.hasWidth(this._model.selectionStart[0]) === 0 && this._model.selectionStart[0]++;
  }
  _handleDoubleClick(e) {
    this._selectWordAtCursor(e, true) && (this._activeSelectionMode = 1);
  }
  _handleTripleClick(e) {
    let i8 = this._getMouseBufferCoords(e);
    i8 && (this._activeSelectionMode = 2, this._selectLineAt(i8[1]));
  }
  shouldColumnSelect(e) {
    return e.altKey && !(Zt && this._optionsService.rawOptions.macOptionClickForcesSelection);
  }
  _handleMouseMove(e) {
    if (e.stopImmediatePropagation(), !this._model.selectionStart) return;
    let i8 = this._model.selectionEnd ? [this._model.selectionEnd[0], this._model.selectionEnd[1]] : null;
    if (this._model.selectionEnd = this._getMouseBufferCoords(e), !this._model.selectionEnd) {
      this.refresh(true);
      return;
    }
    this._activeSelectionMode === 2 ? this._model.selectionEnd[1] < this._model.selectionStart[1] ? this._model.selectionEnd[0] = 0 : this._model.selectionEnd[0] = this._bufferService.cols : this._activeSelectionMode === 1 && this._selectToWordAt(this._model.selectionEnd), this._dragScrollAmount = this._getMouseEventScrollAmount(e), this._activeSelectionMode !== 3 && (this._dragScrollAmount > 0 ? this._model.selectionEnd[0] = this._bufferService.cols : this._dragScrollAmount < 0 && (this._model.selectionEnd[0] = 0));
    let r5 = this._bufferService.buffer;
    if (this._model.selectionEnd[1] < r5.lines.length) {
      let n2 = r5.lines.get(this._model.selectionEnd[1]);
      n2 && n2.hasWidth(this._model.selectionEnd[0]) === 0 && this._model.selectionEnd[0] < this._bufferService.cols && this._model.selectionEnd[0]++;
    }
    (!i8 || i8[0] !== this._model.selectionEnd[0] || i8[1] !== this._model.selectionEnd[1]) && this.refresh(true);
  }
  _dragScroll() {
    if (!(!this._model.selectionEnd || !this._model.selectionStart) && this._dragScrollAmount) {
      this._onRequestScrollLines.fire({ amount: this._dragScrollAmount, suppressScrollEvent: false });
      let e = this._bufferService.buffer;
      this._dragScrollAmount > 0 ? (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = this._bufferService.cols), this._model.selectionEnd[1] = Math.min(e.ydisp + this._bufferService.rows, e.lines.length - 1)) : (this._activeSelectionMode !== 3 && (this._model.selectionEnd[0] = 0), this._model.selectionEnd[1] = e.ydisp), this.refresh();
    }
  }
  _handleMouseUp(e) {
    let i8 = e.timeStamp - this._mouseDownTimeStamp;
    if (this._removeMouseDownListeners(), this.selectionText.length <= 1 && i8 < Xa && e.altKey && this._optionsService.rawOptions.altClickMovesCursor) {
      if (this._bufferService.buffer.ybase === this._bufferService.buffer.ydisp) {
        let r5 = this._mouseService.getCoords(e, this._element, this._bufferService.cols, this._bufferService.rows, false);
        if (r5 && r5[0] !== void 0 && r5[1] !== void 0) {
          let n2 = Jo(r5[0] - 1, r5[1] - 1, this._bufferService, this._coreService.decPrivateModes.applicationCursorKeys);
          this._coreService.triggerDataEvent(n2, true);
        }
      }
    } else this._fireEventIfSelectionChanged();
  }
  _fireEventIfSelectionChanged() {
    let e = this._model.finalSelectionStart, i8 = this._model.finalSelectionEnd, r5 = !!e && !!i8 && (e[0] !== i8[0] || e[1] !== i8[1]);
    if (!r5) {
      this._oldHasSelection && this._fireOnSelectionChange(e, i8, r5);
      return;
    }
    !e || !i8 || (!this._oldSelectionStart || !this._oldSelectionEnd || e[0] !== this._oldSelectionStart[0] || e[1] !== this._oldSelectionStart[1] || i8[0] !== this._oldSelectionEnd[0] || i8[1] !== this._oldSelectionEnd[1]) && this._fireOnSelectionChange(e, i8, r5);
  }
  _fireOnSelectionChange(e, i8, r5) {
    this._oldSelectionStart = e, this._oldSelectionEnd = i8, this._oldHasSelection = r5, this._onSelectionChange.fire();
  }
  _handleBufferActivate(e) {
    this.clearSelection(), this._trimListener.dispose(), this._trimListener = e.activeBuffer.lines.onTrim((i8) => this._handleTrim(i8));
  }
  _convertViewportColToCharacterIndex(e, i8) {
    let r5 = i8;
    for (let n2 = 0; i8 >= n2; n2++) {
      let o = e.loadCell(n2, this._workCell).getChars().length;
      this._workCell.getWidth() === 0 ? r5-- : o > 1 && i8 !== n2 && (r5 += o - 1);
    }
    return r5;
  }
  setSelection(e, i8, r5) {
    this._model.clearSelection(), this._removeMouseDownListeners(), this._model.selectionStart = [e, i8], this._model.selectionStartLength = r5, this.refresh(), this._fireEventIfSelectionChanged();
  }
  rightClickSelect(e) {
    this._isClickInSelection(e) || (this._selectWordAtCursor(e, false) && this.refresh(true), this._fireEventIfSelectionChanged());
  }
  _getWordAt(e, i8, r5 = true, n2 = true) {
    if (e[0] >= this._bufferService.cols) return;
    let o = this._bufferService.buffer, l2 = o.lines.get(e[1]);
    if (!l2) return;
    let a = o.translateBufferLineToString(e[1], false), u2 = this._convertViewportColToCharacterIndex(l2, e[0]), h2 = u2, c2 = e[0] - u2, d2 = 0, _4 = 0, p2 = 0, m2 = 0;
    if (a.charAt(u2) === " ") {
      for (; u2 > 0 && a.charAt(u2 - 1) === " "; ) u2--;
      for (; h2 < a.length && a.charAt(h2 + 1) === " "; ) h2++;
    } else {
      let R4 = e[0], O4 = e[0];
      l2.getWidth(R4) === 0 && (d2++, R4--), l2.getWidth(O4) === 2 && (_4++, O4++);
      let I3 = l2.getString(O4).length;
      for (I3 > 1 && (m2 += I3 - 1, h2 += I3 - 1); R4 > 0 && u2 > 0 && !this._isCharWordSeparator(l2.loadCell(R4 - 1, this._workCell)); ) {
        l2.loadCell(R4 - 1, this._workCell);
        let k4 = this._workCell.getChars().length;
        this._workCell.getWidth() === 0 ? (d2++, R4--) : k4 > 1 && (p2 += k4 - 1, u2 -= k4 - 1), u2--, R4--;
      }
      for (; O4 < l2.length && h2 + 1 < a.length && !this._isCharWordSeparator(l2.loadCell(O4 + 1, this._workCell)); ) {
        l2.loadCell(O4 + 1, this._workCell);
        let k4 = this._workCell.getChars().length;
        this._workCell.getWidth() === 2 ? (_4++, O4++) : k4 > 1 && (m2 += k4 - 1, h2 += k4 - 1), h2++, O4++;
      }
    }
    h2++;
    let f2 = u2 + c2 - d2 + p2, A3 = Math.min(this._bufferService.cols, h2 - u2 + d2 + _4 - p2 - m2);
    if (!(!i8 && a.slice(u2, h2).trim() === "")) {
      if (r5 && f2 === 0 && l2.getCodePoint(0) !== 32) {
        let R4 = o.lines.get(e[1] - 1);
        if (R4 && l2.isWrapped && R4.getCodePoint(this._bufferService.cols - 1) !== 32) {
          let O4 = this._getWordAt([this._bufferService.cols - 1, e[1] - 1], false, true, false);
          if (O4) {
            let I3 = this._bufferService.cols - O4.start;
            f2 -= I3, A3 += I3;
          }
        }
      }
      if (n2 && f2 + A3 === this._bufferService.cols && l2.getCodePoint(this._bufferService.cols - 1) !== 32) {
        let R4 = o.lines.get(e[1] + 1);
        if (R4?.isWrapped && R4.getCodePoint(0) !== 32) {
          let O4 = this._getWordAt([0, e[1] + 1], false, false, true);
          O4 && (A3 += O4.length);
        }
      }
      return { start: f2, length: A3 };
    }
  }
  _selectWordAt(e, i8) {
    let r5 = this._getWordAt(e, i8);
    if (r5) {
      for (; r5.start < 0; ) r5.start += this._bufferService.cols, e[1]--;
      this._model.selectionStart = [r5.start, e[1]], this._model.selectionStartLength = r5.length;
    }
  }
  _selectToWordAt(e) {
    let i8 = this._getWordAt(e, true);
    if (i8) {
      let r5 = e[1];
      for (; i8.start < 0; ) i8.start += this._bufferService.cols, r5--;
      if (!this._model.areSelectionValuesReversed()) for (; i8.start + i8.length > this._bufferService.cols; ) i8.length -= this._bufferService.cols, r5++;
      this._model.selectionEnd = [this._model.areSelectionValuesReversed() ? i8.start : i8.start + i8.length, r5];
    }
  }
  _isCharWordSeparator(e) {
    return e.getWidth() === 0 ? false : this._optionsService.rawOptions.wordSeparator.indexOf(e.getChars()) >= 0;
  }
  _selectLineAt(e) {
    let i8 = this._bufferService.buffer.getWrappedRangeForLine(e), r5 = { start: { x: 0, y: i8.first }, end: { x: this._bufferService.cols - 1, y: i8.last } };
    this._model.selectionStart = [0, i8.first], this._model.selectionEnd = void 0, this._model.selectionStartLength = ws(r5, this._bufferService.cols);
  }
};
ei = M([S(3, F), S(4, ge), S(5, Dt), S(6, H), S(7, ce), S(8, ae)], ei);
var Hi = class {
  constructor() {
    this._data = {};
  }
  set(t, e, i8) {
    this._data[t] || (this._data[t] = {}), this._data[t][e] = i8;
  }
  get(t, e) {
    return this._data[t] ? this._data[t][e] : void 0;
  }
  clear() {
    this._data = {};
  }
};
var Wi = class {
  constructor() {
    this._color = new Hi();
    this._css = new Hi();
  }
  setCss(t, e, i8) {
    this._css.set(t, e, i8);
  }
  getCss(t, e) {
    return this._css.get(t, e);
  }
  setColor(t, e, i8) {
    this._color.set(t, e, i8);
  }
  getColor(t, e) {
    return this._color.get(t, e);
  }
  clear() {
    this._color.clear(), this._css.clear();
  }
};
var re = Object.freeze((() => {
  let s15 = [z.toColor("#2e3436"), z.toColor("#cc0000"), z.toColor("#4e9a06"), z.toColor("#c4a000"), z.toColor("#3465a4"), z.toColor("#75507b"), z.toColor("#06989a"), z.toColor("#d3d7cf"), z.toColor("#555753"), z.toColor("#ef2929"), z.toColor("#8ae234"), z.toColor("#fce94f"), z.toColor("#729fcf"), z.toColor("#ad7fa8"), z.toColor("#34e2e2"), z.toColor("#eeeeec")], t = [0, 95, 135, 175, 215, 255];
  for (let e = 0; e < 216; e++) {
    let i8 = t[e / 36 % 6 | 0], r5 = t[e / 6 % 6 | 0], n2 = t[e % 6];
    s15.push({ css: j.toCss(i8, r5, n2), rgba: j.toRgba(i8, r5, n2) });
  }
  for (let e = 0; e < 24; e++) {
    let i8 = 8 + e * 10;
    s15.push({ css: j.toCss(i8, i8, i8), rgba: j.toRgba(i8, i8, i8) });
  }
  return s15;
})());
var St = z.toColor("#ffffff");
var Ki = z.toColor("#000000");
var tl = z.toColor("#ffffff");
var il = Ki;
var Ui = { css: "rgba(255, 255, 255, 0.3)", rgba: 4294967117 };
var Qa = St;
var ti = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._contrastCache = new Wi();
    this._halfContrastCache = new Wi();
    this._onChangeColors = this._register(new v());
    this.onChangeColors = this._onChangeColors.event;
    this._colors = { foreground: St, background: Ki, cursor: tl, cursorAccent: il, selectionForeground: void 0, selectionBackgroundTransparent: Ui, selectionBackgroundOpaque: U.blend(Ki, Ui), selectionInactiveBackgroundTransparent: Ui, selectionInactiveBackgroundOpaque: U.blend(Ki, Ui), scrollbarSliderBackground: U.opacity(St, 0.2), scrollbarSliderHoverBackground: U.opacity(St, 0.4), scrollbarSliderActiveBackground: U.opacity(St, 0.5), overviewRulerBorder: St, ansi: re.slice(), contrastCache: this._contrastCache, halfContrastCache: this._halfContrastCache }, this._updateRestoreColors(), this._setTheme(this._optionsService.rawOptions.theme), this._register(this._optionsService.onSpecificOptionChange("minimumContrastRatio", () => this._contrastCache.clear())), this._register(this._optionsService.onSpecificOptionChange("theme", () => this._setTheme(this._optionsService.rawOptions.theme)));
  }
  get colors() {
    return this._colors;
  }
  _setTheme(e = {}) {
    let i8 = this._colors;
    if (i8.foreground = K(e.foreground, St), i8.background = K(e.background, Ki), i8.cursor = U.blend(i8.background, K(e.cursor, tl)), i8.cursorAccent = U.blend(i8.background, K(e.cursorAccent, il)), i8.selectionBackgroundTransparent = K(e.selectionBackground, Ui), i8.selectionBackgroundOpaque = U.blend(i8.background, i8.selectionBackgroundTransparent), i8.selectionInactiveBackgroundTransparent = K(e.selectionInactiveBackground, i8.selectionBackgroundTransparent), i8.selectionInactiveBackgroundOpaque = U.blend(i8.background, i8.selectionInactiveBackgroundTransparent), i8.selectionForeground = e.selectionForeground ? K(e.selectionForeground, ps) : void 0, i8.selectionForeground === ps && (i8.selectionForeground = void 0), U.isOpaque(i8.selectionBackgroundTransparent) && (i8.selectionBackgroundTransparent = U.opacity(i8.selectionBackgroundTransparent, 0.3)), U.isOpaque(i8.selectionInactiveBackgroundTransparent) && (i8.selectionInactiveBackgroundTransparent = U.opacity(i8.selectionInactiveBackgroundTransparent, 0.3)), i8.scrollbarSliderBackground = K(e.scrollbarSliderBackground, U.opacity(i8.foreground, 0.2)), i8.scrollbarSliderHoverBackground = K(e.scrollbarSliderHoverBackground, U.opacity(i8.foreground, 0.4)), i8.scrollbarSliderActiveBackground = K(e.scrollbarSliderActiveBackground, U.opacity(i8.foreground, 0.5)), i8.overviewRulerBorder = K(e.overviewRulerBorder, Qa), i8.ansi = re.slice(), i8.ansi[0] = K(e.black, re[0]), i8.ansi[1] = K(e.red, re[1]), i8.ansi[2] = K(e.green, re[2]), i8.ansi[3] = K(e.yellow, re[3]), i8.ansi[4] = K(e.blue, re[4]), i8.ansi[5] = K(e.magenta, re[5]), i8.ansi[6] = K(e.cyan, re[6]), i8.ansi[7] = K(e.white, re[7]), i8.ansi[8] = K(e.brightBlack, re[8]), i8.ansi[9] = K(e.brightRed, re[9]), i8.ansi[10] = K(e.brightGreen, re[10]), i8.ansi[11] = K(e.brightYellow, re[11]), i8.ansi[12] = K(e.brightBlue, re[12]), i8.ansi[13] = K(e.brightMagenta, re[13]), i8.ansi[14] = K(e.brightCyan, re[14]), i8.ansi[15] = K(e.brightWhite, re[15]), e.extendedAnsi) {
      let r5 = Math.min(i8.ansi.length - 16, e.extendedAnsi.length);
      for (let n2 = 0; n2 < r5; n2++) i8.ansi[n2 + 16] = K(e.extendedAnsi[n2], re[n2 + 16]);
    }
    this._contrastCache.clear(), this._halfContrastCache.clear(), this._updateRestoreColors(), this._onChangeColors.fire(this.colors);
  }
  restoreColor(e) {
    this._restoreColor(e), this._onChangeColors.fire(this.colors);
  }
  _restoreColor(e) {
    if (e === void 0) {
      for (let i8 = 0; i8 < this._restoreColors.ansi.length; ++i8) this._colors.ansi[i8] = this._restoreColors.ansi[i8];
      return;
    }
    switch (e) {
      case 256:
        this._colors.foreground = this._restoreColors.foreground;
        break;
      case 257:
        this._colors.background = this._restoreColors.background;
        break;
      case 258:
        this._colors.cursor = this._restoreColors.cursor;
        break;
      default:
        this._colors.ansi[e] = this._restoreColors.ansi[e];
    }
  }
  modifyColors(e) {
    e(this._colors), this._onChangeColors.fire(this.colors);
  }
  _updateRestoreColors() {
    this._restoreColors = { foreground: this._colors.foreground, background: this._colors.background, cursor: this._colors.cursor, ansi: this._colors.ansi.slice() };
  }
};
ti = M([S(0, H)], ti);
function K(s15, t) {
  if (s15 !== void 0) try {
    return z.toColor(s15);
  } catch {
  }
  return t;
}
var Rs = class {
  constructor(...t) {
    this._entries = /* @__PURE__ */ new Map();
    for (let [e, i8] of t) this.set(e, i8);
  }
  set(t, e) {
    let i8 = this._entries.get(t);
    return this._entries.set(t, e), i8;
  }
  forEach(t) {
    for (let [e, i8] of this._entries.entries()) t(e, i8);
  }
  has(t) {
    return this._entries.has(t);
  }
  get(t) {
    return this._entries.get(t);
  }
};
var ln = class {
  constructor() {
    this._services = new Rs();
    this._services.set(xt, this);
  }
  setService(t, e) {
    this._services.set(t, e);
  }
  getService(t) {
    return this._services.get(t);
  }
  createInstance(t, ...e) {
    let i8 = Xs(t).sort((o, l2) => o.index - l2.index), r5 = [];
    for (let o of i8) {
      let l2 = this._services.get(o.id);
      if (!l2) throw new Error(`[createInstance] ${t.name} depends on UNKNOWN service ${o.id._id}.`);
      r5.push(l2);
    }
    let n2 = i8.length > 0 ? i8[0].index : e.length;
    if (e.length !== n2) throw new Error(`[createInstance] First service dependency of ${t.name} at position ${n2 + 1} conflicts with ${e.length} static arguments`);
    return new t(...e, ...r5);
  }
};
var ec = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 };
var tc = "xterm.js: ";
var ii = class extends D {
  constructor(e) {
    super();
    this._optionsService = e;
    this._logLevel = 5;
    this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), ic = this;
  }
  get logLevel() {
    return this._logLevel;
  }
  _updateLogLevel() {
    this._logLevel = ec[this._optionsService.rawOptions.logLevel];
  }
  _evalLazyOptionalParams(e) {
    for (let i8 = 0; i8 < e.length; i8++) typeof e[i8] == "function" && (e[i8] = e[i8]());
  }
  _log(e, i8, r5) {
    this._evalLazyOptionalParams(r5), e.call(console, (this._optionsService.options.logger ? "" : tc) + i8, ...r5);
  }
  trace(e, ...i8) {
    this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, e, i8);
  }
  debug(e, ...i8) {
    this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, e, i8);
  }
  info(e, ...i8) {
    this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, e, i8);
  }
  warn(e, ...i8) {
    this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, e, i8);
  }
  error(e, ...i8) {
    this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, e, i8);
  }
};
ii = M([S(0, H)], ii);
var ic;
var zi = class extends D {
  constructor(e) {
    super();
    this._maxLength = e;
    this.onDeleteEmitter = this._register(new v());
    this.onDelete = this.onDeleteEmitter.event;
    this.onInsertEmitter = this._register(new v());
    this.onInsert = this.onInsertEmitter.event;
    this.onTrimEmitter = this._register(new v());
    this.onTrim = this.onTrimEmitter.event;
    this._array = new Array(this._maxLength), this._startIndex = 0, this._length = 0;
  }
  get maxLength() {
    return this._maxLength;
  }
  set maxLength(e) {
    if (this._maxLength === e) return;
    let i8 = new Array(e);
    for (let r5 = 0; r5 < Math.min(e, this.length); r5++) i8[r5] = this._array[this._getCyclicIndex(r5)];
    this._array = i8, this._maxLength = e, this._startIndex = 0;
  }
  get length() {
    return this._length;
  }
  set length(e) {
    if (e > this._length) for (let i8 = this._length; i8 < e; i8++) this._array[i8] = void 0;
    this._length = e;
  }
  get(e) {
    return this._array[this._getCyclicIndex(e)];
  }
  set(e, i8) {
    this._array[this._getCyclicIndex(e)] = i8;
  }
  push(e) {
    this._array[this._getCyclicIndex(this._length)] = e, this._length === this._maxLength ? (this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1)) : this._length++;
  }
  recycle() {
    if (this._length !== this._maxLength) throw new Error("Can only recycle when the buffer is full");
    return this._startIndex = ++this._startIndex % this._maxLength, this.onTrimEmitter.fire(1), this._array[this._getCyclicIndex(this._length - 1)];
  }
  get isFull() {
    return this._length === this._maxLength;
  }
  pop() {
    return this._array[this._getCyclicIndex(this._length-- - 1)];
  }
  splice(e, i8, ...r5) {
    if (i8) {
      for (let n2 = e; n2 < this._length - i8; n2++) this._array[this._getCyclicIndex(n2)] = this._array[this._getCyclicIndex(n2 + i8)];
      this._length -= i8, this.onDeleteEmitter.fire({ index: e, amount: i8 });
    }
    for (let n2 = this._length - 1; n2 >= e; n2--) this._array[this._getCyclicIndex(n2 + r5.length)] = this._array[this._getCyclicIndex(n2)];
    for (let n2 = 0; n2 < r5.length; n2++) this._array[this._getCyclicIndex(e + n2)] = r5[n2];
    if (r5.length && this.onInsertEmitter.fire({ index: e, amount: r5.length }), this._length + r5.length > this._maxLength) {
      let n2 = this._length + r5.length - this._maxLength;
      this._startIndex += n2, this._length = this._maxLength, this.onTrimEmitter.fire(n2);
    } else this._length += r5.length;
  }
  trimStart(e) {
    e > this._length && (e = this._length), this._startIndex += e, this._length -= e, this.onTrimEmitter.fire(e);
  }
  shiftElements(e, i8, r5) {
    if (!(i8 <= 0)) {
      if (e < 0 || e >= this._length) throw new Error("start argument out of range");
      if (e + r5 < 0) throw new Error("Cannot shift elements in list beyond index 0");
      if (r5 > 0) {
        for (let o = i8 - 1; o >= 0; o--) this.set(e + o + r5, this.get(e + o));
        let n2 = e + i8 + r5 - this._length;
        if (n2 > 0) for (this._length += n2; this._length > this._maxLength; ) this._length--, this._startIndex++, this.onTrimEmitter.fire(1);
      } else for (let n2 = 0; n2 < i8; n2++) this.set(e + n2 + r5, this.get(e + n2));
    }
  }
  _getCyclicIndex(e) {
    return (this._startIndex + e) % this._maxLength;
  }
};
var B = 3;
var X = Object.freeze(new De());
var an = 0;
var Ls = 2;
var Ze = class s12 {
  constructor(t, e, i8 = false) {
    this.isWrapped = i8;
    this._combined = {};
    this._extendedAttrs = {};
    this._data = new Uint32Array(t * B);
    let r5 = e || q.fromCharData([0, ir, 1, 0]);
    for (let n2 = 0; n2 < t; ++n2) this.setCell(n2, r5);
    this.length = t;
  }
  get(t) {
    let e = this._data[t * B + 0], i8 = e & 2097151;
    return [this._data[t * B + 1], e & 2097152 ? this._combined[t] : i8 ? Ce(i8) : "", e >> 22, e & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : i8];
  }
  set(t, e) {
    this._data[t * B + 1] = e[0], e[1].length > 1 ? (this._combined[t] = e[1], this._data[t * B + 0] = t | 2097152 | e[2] << 22) : this._data[t * B + 0] = e[1].charCodeAt(0) | e[2] << 22;
  }
  getWidth(t) {
    return this._data[t * B + 0] >> 22;
  }
  hasWidth(t) {
    return this._data[t * B + 0] & 12582912;
  }
  getFg(t) {
    return this._data[t * B + 1];
  }
  getBg(t) {
    return this._data[t * B + 2];
  }
  hasContent(t) {
    return this._data[t * B + 0] & 4194303;
  }
  getCodePoint(t) {
    let e = this._data[t * B + 0];
    return e & 2097152 ? this._combined[t].charCodeAt(this._combined[t].length - 1) : e & 2097151;
  }
  isCombined(t) {
    return this._data[t * B + 0] & 2097152;
  }
  getString(t) {
    let e = this._data[t * B + 0];
    return e & 2097152 ? this._combined[t] : e & 2097151 ? Ce(e & 2097151) : "";
  }
  isProtected(t) {
    return this._data[t * B + 2] & 536870912;
  }
  loadCell(t, e) {
    return an = t * B, e.content = this._data[an + 0], e.fg = this._data[an + 1], e.bg = this._data[an + 2], e.content & 2097152 && (e.combinedData = this._combined[t]), e.bg & 268435456 && (e.extended = this._extendedAttrs[t]), e;
  }
  setCell(t, e) {
    e.content & 2097152 && (this._combined[t] = e.combinedData), e.bg & 268435456 && (this._extendedAttrs[t] = e.extended), this._data[t * B + 0] = e.content, this._data[t * B + 1] = e.fg, this._data[t * B + 2] = e.bg;
  }
  setCellFromCodepoint(t, e, i8, r5) {
    r5.bg & 268435456 && (this._extendedAttrs[t] = r5.extended), this._data[t * B + 0] = e | i8 << 22, this._data[t * B + 1] = r5.fg, this._data[t * B + 2] = r5.bg;
  }
  addCodepointToCell(t, e, i8) {
    let r5 = this._data[t * B + 0];
    r5 & 2097152 ? this._combined[t] += Ce(e) : r5 & 2097151 ? (this._combined[t] = Ce(r5 & 2097151) + Ce(e), r5 &= -2097152, r5 |= 2097152) : r5 = e | 1 << 22, i8 && (r5 &= -12582913, r5 |= i8 << 22), this._data[t * B + 0] = r5;
  }
  insertCells(t, e, i8) {
    if (t %= this.length, t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i8), e < this.length - t) {
      let r5 = new q();
      for (let n2 = this.length - t - e - 1; n2 >= 0; --n2) this.setCell(t + e + n2, this.loadCell(t + n2, r5));
      for (let n2 = 0; n2 < e; ++n2) this.setCell(t + n2, i8);
    } else for (let r5 = t; r5 < this.length; ++r5) this.setCell(r5, i8);
    this.getWidth(this.length - 1) === 2 && this.setCellFromCodepoint(this.length - 1, 0, 1, i8);
  }
  deleteCells(t, e, i8) {
    if (t %= this.length, e < this.length - t) {
      let r5 = new q();
      for (let n2 = 0; n2 < this.length - t - e; ++n2) this.setCell(t + n2, this.loadCell(t + e + n2, r5));
      for (let n2 = this.length - e; n2 < this.length; ++n2) this.setCell(n2, i8);
    } else for (let r5 = t; r5 < this.length; ++r5) this.setCell(r5, i8);
    t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i8), this.getWidth(t) === 0 && !this.hasContent(t) && this.setCellFromCodepoint(t, 0, 1, i8);
  }
  replaceCells(t, e, i8, r5 = false) {
    if (r5) {
      for (t && this.getWidth(t - 1) === 2 && !this.isProtected(t - 1) && this.setCellFromCodepoint(t - 1, 0, 1, i8), e < this.length && this.getWidth(e - 1) === 2 && !this.isProtected(e) && this.setCellFromCodepoint(e, 0, 1, i8); t < e && t < this.length; ) this.isProtected(t) || this.setCell(t, i8), t++;
      return;
    }
    for (t && this.getWidth(t - 1) === 2 && this.setCellFromCodepoint(t - 1, 0, 1, i8), e < this.length && this.getWidth(e - 1) === 2 && this.setCellFromCodepoint(e, 0, 1, i8); t < e && t < this.length; ) this.setCell(t++, i8);
  }
  resize(t, e) {
    if (t === this.length) return this._data.length * 4 * Ls < this._data.buffer.byteLength;
    let i8 = t * B;
    if (t > this.length) {
      if (this._data.buffer.byteLength >= i8 * 4) this._data = new Uint32Array(this._data.buffer, 0, i8);
      else {
        let r5 = new Uint32Array(i8);
        r5.set(this._data), this._data = r5;
      }
      for (let r5 = this.length; r5 < t; ++r5) this.setCell(r5, e);
    } else {
      this._data = this._data.subarray(0, i8);
      let r5 = Object.keys(this._combined);
      for (let o = 0; o < r5.length; o++) {
        let l2 = parseInt(r5[o], 10);
        l2 >= t && delete this._combined[l2];
      }
      let n2 = Object.keys(this._extendedAttrs);
      for (let o = 0; o < n2.length; o++) {
        let l2 = parseInt(n2[o], 10);
        l2 >= t && delete this._extendedAttrs[l2];
      }
    }
    return this.length = t, i8 * 4 * Ls < this._data.buffer.byteLength;
  }
  cleanupMemory() {
    if (this._data.length * 4 * Ls < this._data.buffer.byteLength) {
      let t = new Uint32Array(this._data.length);
      return t.set(this._data), this._data = t, 1;
    }
    return 0;
  }
  fill(t, e = false) {
    if (e) {
      for (let i8 = 0; i8 < this.length; ++i8) this.isProtected(i8) || this.setCell(i8, t);
      return;
    }
    this._combined = {}, this._extendedAttrs = {};
    for (let i8 = 0; i8 < this.length; ++i8) this.setCell(i8, t);
  }
  copyFrom(t) {
    this.length !== t.length ? this._data = new Uint32Array(t._data) : this._data.set(t._data), this.length = t.length, this._combined = {};
    for (let e in t._combined) this._combined[e] = t._combined[e];
    this._extendedAttrs = {};
    for (let e in t._extendedAttrs) this._extendedAttrs[e] = t._extendedAttrs[e];
    this.isWrapped = t.isWrapped;
  }
  clone() {
    let t = new s12(0);
    t._data = new Uint32Array(this._data), t.length = this.length;
    for (let e in this._combined) t._combined[e] = this._combined[e];
    for (let e in this._extendedAttrs) t._extendedAttrs[e] = this._extendedAttrs[e];
    return t.isWrapped = this.isWrapped, t;
  }
  getTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  getNoBgTrimmedLength() {
    for (let t = this.length - 1; t >= 0; --t) if (this._data[t * B + 0] & 4194303 || this._data[t * B + 2] & 50331648) return t + (this._data[t * B + 0] >> 22);
    return 0;
  }
  copyCellsFrom(t, e, i8, r5, n2) {
    let o = t._data;
    if (n2) for (let a = r5 - 1; a >= 0; a--) {
      for (let u2 = 0; u2 < B; u2++) this._data[(i8 + a) * B + u2] = o[(e + a) * B + u2];
      o[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i8 + a] = t._extendedAttrs[e + a]);
    }
    else for (let a = 0; a < r5; a++) {
      for (let u2 = 0; u2 < B; u2++) this._data[(i8 + a) * B + u2] = o[(e + a) * B + u2];
      o[(e + a) * B + 2] & 268435456 && (this._extendedAttrs[i8 + a] = t._extendedAttrs[e + a]);
    }
    let l2 = Object.keys(t._combined);
    for (let a = 0; a < l2.length; a++) {
      let u2 = parseInt(l2[a], 10);
      u2 >= e && (this._combined[u2 - e + i8] = t._combined[u2]);
    }
  }
  translateToString(t, e, i8, r5) {
    e = e ?? 0, i8 = i8 ?? this.length, t && (i8 = Math.min(i8, this.getTrimmedLength())), r5 && (r5.length = 0);
    let n2 = "";
    for (; e < i8; ) {
      let o = this._data[e * B + 0], l2 = o & 2097151, a = o & 2097152 ? this._combined[e] : l2 ? Ce(l2) : we;
      if (n2 += a, r5) for (let u2 = 0; u2 < a.length; ++u2) r5.push(e);
      e += o >> 22 || 1;
    }
    return r5 && r5.push(e), n2;
  }
};
function sl(s15, t, e, i8, r5, n2) {
  let o = [];
  for (let l2 = 0; l2 < s15.length - 1; l2++) {
    let a = l2, u2 = s15.get(++a);
    if (!u2.isWrapped) continue;
    let h2 = [s15.get(l2)];
    for (; a < s15.length && u2.isWrapped; ) h2.push(u2), u2 = s15.get(++a);
    if (!n2 && i8 >= l2 && i8 < a) {
      l2 += h2.length - 1;
      continue;
    }
    let c2 = 0, d2 = ri(h2, c2, t), _4 = 1, p2 = 0;
    for (; _4 < h2.length; ) {
      let f2 = ri(h2, _4, t), A3 = f2 - p2, R4 = e - d2, O4 = Math.min(A3, R4);
      h2[c2].copyCellsFrom(h2[_4], p2, d2, O4, false), d2 += O4, d2 === e && (c2++, d2 = 0), p2 += O4, p2 === f2 && (_4++, p2 = 0), d2 === 0 && c2 !== 0 && h2[c2 - 1].getWidth(e - 1) === 2 && (h2[c2].copyCellsFrom(h2[c2 - 1], e - 1, d2++, 1, false), h2[c2 - 1].setCell(e - 1, r5));
    }
    h2[c2].replaceCells(d2, e, r5);
    let m2 = 0;
    for (let f2 = h2.length - 1; f2 > 0 && (f2 > c2 || h2[f2].getTrimmedLength() === 0); f2--) m2++;
    m2 > 0 && (o.push(l2 + h2.length - m2), o.push(m2)), l2 += h2.length - 1;
  }
  return o;
}
function ol(s15, t) {
  let e = [], i8 = 0, r5 = t[i8], n2 = 0;
  for (let o = 0; o < s15.length; o++) if (r5 === o) {
    let l2 = t[++i8];
    s15.onDeleteEmitter.fire({ index: o - n2, amount: l2 }), o += l2 - 1, n2 += l2, r5 = t[++i8];
  } else e.push(o);
  return { layout: e, countRemoved: n2 };
}
function ll(s15, t) {
  let e = [];
  for (let i8 = 0; i8 < t.length; i8++) e.push(s15.get(t[i8]));
  for (let i8 = 0; i8 < e.length; i8++) s15.set(i8, e[i8]);
  s15.length = t.length;
}
function al(s15, t, e) {
  let i8 = [], r5 = s15.map((a, u2) => ri(s15, u2, t)).reduce((a, u2) => a + u2), n2 = 0, o = 0, l2 = 0;
  for (; l2 < r5; ) {
    if (r5 - l2 < e) {
      i8.push(r5 - l2);
      break;
    }
    n2 += e;
    let a = ri(s15, o, t);
    n2 > a && (n2 -= a, o++);
    let u2 = s15[o].getWidth(n2 - 1) === 2;
    u2 && n2--;
    let h2 = u2 ? e - 1 : e;
    i8.push(h2), l2 += h2;
  }
  return i8;
}
function ri(s15, t, e) {
  if (t === s15.length - 1) return s15[t].getTrimmedLength();
  let i8 = !s15[t].hasContent(e - 1) && s15[t].getWidth(e - 1) === 1, r5 = s15[t + 1].getWidth(0) === 2;
  return i8 && r5 ? e - 1 : e;
}
var un = class un2 {
  constructor(t) {
    this.line = t;
    this.isDisposed = false;
    this._disposables = [];
    this._id = un2._nextId++;
    this._onDispose = this.register(new v());
    this.onDispose = this._onDispose.event;
  }
  get id() {
    return this._id;
  }
  dispose() {
    this.isDisposed || (this.isDisposed = true, this.line = -1, this._onDispose.fire(), Ne(this._disposables), this._disposables.length = 0);
  }
  register(t) {
    return this._disposables.push(t), t;
  }
};
un._nextId = 1;
var cn = un;
var ne = {};
var Je = ne.B;
ne[0] = { "`": "\u25C6", a: "\u2592", b: "\u2409", c: "\u240C", d: "\u240D", e: "\u240A", f: "\xB0", g: "\xB1", h: "\u2424", i: "\u240B", j: "\u2518", k: "\u2510", l: "\u250C", m: "\u2514", n: "\u253C", o: "\u23BA", p: "\u23BB", q: "\u2500", r: "\u23BC", s: "\u23BD", t: "\u251C", u: "\u2524", v: "\u2534", w: "\u252C", x: "\u2502", y: "\u2264", z: "\u2265", "{": "\u03C0", "|": "\u2260", "}": "\xA3", "~": "\xB7" };
ne.A = { "#": "\xA3" };
ne.B = void 0;
ne[4] = { "#": "\xA3", "@": "\xBE", "[": "ij", "\\": "\xBD", "]": "|", "{": "\xA8", "|": "f", "}": "\xBC", "~": "\xB4" };
ne.C = ne[5] = { "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne.R = { "#": "\xA3", "@": "\xE0", "[": "\xB0", "\\": "\xE7", "]": "\xA7", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xA8" };
ne.Q = { "@": "\xE0", "[": "\xE2", "\\": "\xE7", "]": "\xEA", "^": "\xEE", "`": "\xF4", "{": "\xE9", "|": "\xF9", "}": "\xE8", "~": "\xFB" };
ne.K = { "@": "\xA7", "[": "\xC4", "\\": "\xD6", "]": "\xDC", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xDF" };
ne.Y = { "#": "\xA3", "@": "\xA7", "[": "\xB0", "\\": "\xE7", "]": "\xE9", "`": "\xF9", "{": "\xE0", "|": "\xF2", "}": "\xE8", "~": "\xEC" };
ne.E = ne[6] = { "@": "\xC4", "[": "\xC6", "\\": "\xD8", "]": "\xC5", "^": "\xDC", "`": "\xE4", "{": "\xE6", "|": "\xF8", "}": "\xE5", "~": "\xFC" };
ne.Z = { "#": "\xA3", "@": "\xA7", "[": "\xA1", "\\": "\xD1", "]": "\xBF", "{": "\xB0", "|": "\xF1", "}": "\xE7" };
ne.H = ne[7] = { "@": "\xC9", "[": "\xC4", "\\": "\xD6", "]": "\xC5", "^": "\xDC", "`": "\xE9", "{": "\xE4", "|": "\xF6", "}": "\xE5", "~": "\xFC" };
ne["="] = { "#": "\xF9", "@": "\xE0", "[": "\xE9", "\\": "\xE7", "]": "\xEA", "^": "\xEE", _: "\xE8", "`": "\xF4", "{": "\xE4", "|": "\xF6", "}": "\xFC", "~": "\xFB" };
var cl = 4294967295;
var $i = class {
  constructor(t, e, i8) {
    this._hasScrollback = t;
    this._optionsService = e;
    this._bufferService = i8;
    this.ydisp = 0;
    this.ybase = 0;
    this.y = 0;
    this.x = 0;
    this.tabs = {};
    this.savedY = 0;
    this.savedX = 0;
    this.savedCurAttrData = X.clone();
    this.savedCharset = Je;
    this.markers = [];
    this._nullCell = q.fromCharData([0, ir, 1, 0]);
    this._whitespaceCell = q.fromCharData([0, we, 1, 32]);
    this._isClearing = false;
    this._memoryCleanupQueue = new Jt();
    this._memoryCleanupPosition = 0;
    this._cols = this._bufferService.cols, this._rows = this._bufferService.rows, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  getNullCell(t) {
    return t ? (this._nullCell.fg = t.fg, this._nullCell.bg = t.bg, this._nullCell.extended = t.extended) : (this._nullCell.fg = 0, this._nullCell.bg = 0, this._nullCell.extended = new rt()), this._nullCell;
  }
  getWhitespaceCell(t) {
    return t ? (this._whitespaceCell.fg = t.fg, this._whitespaceCell.bg = t.bg, this._whitespaceCell.extended = t.extended) : (this._whitespaceCell.fg = 0, this._whitespaceCell.bg = 0, this._whitespaceCell.extended = new rt()), this._whitespaceCell;
  }
  getBlankLine(t, e) {
    return new Ze(this._bufferService.cols, this.getNullCell(t), e);
  }
  get hasScrollback() {
    return this._hasScrollback && this.lines.maxLength > this._rows;
  }
  get isCursorInViewport() {
    let e = this.ybase + this.y - this.ydisp;
    return e >= 0 && e < this._rows;
  }
  _getCorrectBufferLength(t) {
    if (!this._hasScrollback) return t;
    let e = t + this._optionsService.rawOptions.scrollback;
    return e > cl ? cl : e;
  }
  fillViewportRows(t) {
    if (this.lines.length === 0) {
      t === void 0 && (t = X);
      let e = this._rows;
      for (; e--; ) this.lines.push(this.getBlankLine(t));
    }
  }
  clear() {
    this.ydisp = 0, this.ybase = 0, this.y = 0, this.x = 0, this.lines = new zi(this._getCorrectBufferLength(this._rows)), this.scrollTop = 0, this.scrollBottom = this._rows - 1, this.setupTabStops();
  }
  resize(t, e) {
    let i8 = this.getNullCell(X), r5 = 0, n2 = this._getCorrectBufferLength(e);
    if (n2 > this.lines.maxLength && (this.lines.maxLength = n2), this.lines.length > 0) {
      if (this._cols < t) for (let l2 = 0; l2 < this.lines.length; l2++) r5 += +this.lines.get(l2).resize(t, i8);
      let o = 0;
      if (this._rows < e) for (let l2 = this._rows; l2 < e; l2++) this.lines.length < e + this.ybase && (this._optionsService.rawOptions.windowsMode || this._optionsService.rawOptions.windowsPty.backend !== void 0 || this._optionsService.rawOptions.windowsPty.buildNumber !== void 0 ? this.lines.push(new Ze(t, i8)) : this.ybase > 0 && this.lines.length <= this.ybase + this.y + o + 1 ? (this.ybase--, o++, this.ydisp > 0 && this.ydisp--) : this.lines.push(new Ze(t, i8)));
      else for (let l2 = this._rows; l2 > e; l2--) this.lines.length > e + this.ybase && (this.lines.length > this.ybase + this.y + 1 ? this.lines.pop() : (this.ybase++, this.ydisp++));
      if (n2 < this.lines.maxLength) {
        let l2 = this.lines.length - n2;
        l2 > 0 && (this.lines.trimStart(l2), this.ybase = Math.max(this.ybase - l2, 0), this.ydisp = Math.max(this.ydisp - l2, 0), this.savedY = Math.max(this.savedY - l2, 0)), this.lines.maxLength = n2;
      }
      this.x = Math.min(this.x, t - 1), this.y = Math.min(this.y, e - 1), o && (this.y += o), this.savedX = Math.min(this.savedX, t - 1), this.scrollTop = 0;
    }
    if (this.scrollBottom = e - 1, this._isReflowEnabled && (this._reflow(t, e), this._cols > t)) for (let o = 0; o < this.lines.length; o++) r5 += +this.lines.get(o).resize(t, i8);
    this._cols = t, this._rows = e, this._memoryCleanupQueue.clear(), r5 > 0.1 * this.lines.length && (this._memoryCleanupPosition = 0, this._memoryCleanupQueue.enqueue(() => this._batchedMemoryCleanup()));
  }
  _batchedMemoryCleanup() {
    let t = true;
    this._memoryCleanupPosition >= this.lines.length && (this._memoryCleanupPosition = 0, t = false);
    let e = 0;
    for (; this._memoryCleanupPosition < this.lines.length; ) if (e += this.lines.get(this._memoryCleanupPosition++).cleanupMemory(), e > 100) return true;
    return t;
  }
  get _isReflowEnabled() {
    let t = this._optionsService.rawOptions.windowsPty;
    return t && t.buildNumber ? this._hasScrollback && t.backend === "conpty" && t.buildNumber >= 21376 : this._hasScrollback && !this._optionsService.rawOptions.windowsMode;
  }
  _reflow(t, e) {
    this._cols !== t && (t > this._cols ? this._reflowLarger(t, e) : this._reflowSmaller(t, e));
  }
  _reflowLarger(t, e) {
    let i8 = this._optionsService.rawOptions.reflowCursorLine, r5 = sl(this.lines, this._cols, t, this.ybase + this.y, this.getNullCell(X), i8);
    if (r5.length > 0) {
      let n2 = ol(this.lines, r5);
      ll(this.lines, n2.layout), this._reflowLargerAdjustViewport(t, e, n2.countRemoved);
    }
  }
  _reflowLargerAdjustViewport(t, e, i8) {
    let r5 = this.getNullCell(X), n2 = i8;
    for (; n2-- > 0; ) this.ybase === 0 ? (this.y > 0 && this.y--, this.lines.length < e && this.lines.push(new Ze(t, r5))) : (this.ydisp === this.ybase && this.ydisp--, this.ybase--);
    this.savedY = Math.max(this.savedY - i8, 0);
  }
  _reflowSmaller(t, e) {
    let i8 = this._optionsService.rawOptions.reflowCursorLine, r5 = this.getNullCell(X), n2 = [], o = 0;
    for (let l2 = this.lines.length - 1; l2 >= 0; l2--) {
      let a = this.lines.get(l2);
      if (!a || !a.isWrapped && a.getTrimmedLength() <= t) continue;
      let u2 = [a];
      for (; a.isWrapped && l2 > 0; ) a = this.lines.get(--l2), u2.unshift(a);
      if (!i8) {
        let I3 = this.ybase + this.y;
        if (I3 >= l2 && I3 < l2 + u2.length) continue;
      }
      let h2 = u2[u2.length - 1].getTrimmedLength(), c2 = al(u2, this._cols, t), d2 = c2.length - u2.length, _4;
      this.ybase === 0 && this.y !== this.lines.length - 1 ? _4 = Math.max(0, this.y - this.lines.maxLength + d2) : _4 = Math.max(0, this.lines.length - this.lines.maxLength + d2);
      let p2 = [];
      for (let I3 = 0; I3 < d2; I3++) {
        let k4 = this.getBlankLine(X, true);
        p2.push(k4);
      }
      p2.length > 0 && (n2.push({ start: l2 + u2.length + o, newLines: p2 }), o += p2.length), u2.push(...p2);
      let m2 = c2.length - 1, f2 = c2[m2];
      f2 === 0 && (m2--, f2 = c2[m2]);
      let A3 = u2.length - d2 - 1, R4 = h2;
      for (; A3 >= 0; ) {
        let I3 = Math.min(R4, f2);
        if (u2[m2] === void 0) break;
        if (u2[m2].copyCellsFrom(u2[A3], R4 - I3, f2 - I3, I3, true), f2 -= I3, f2 === 0 && (m2--, f2 = c2[m2]), R4 -= I3, R4 === 0) {
          A3--;
          let k4 = Math.max(A3, 0);
          R4 = ri(u2, k4, this._cols);
        }
      }
      for (let I3 = 0; I3 < u2.length; I3++) c2[I3] < t && u2[I3].setCell(c2[I3], r5);
      let O4 = d2 - _4;
      for (; O4-- > 0; ) this.ybase === 0 ? this.y < e - 1 ? (this.y++, this.lines.pop()) : (this.ybase++, this.ydisp++) : this.ybase < Math.min(this.lines.maxLength, this.lines.length + o) - e && (this.ybase === this.ydisp && this.ydisp++, this.ybase++);
      this.savedY = Math.min(this.savedY + d2, this.ybase + e - 1);
    }
    if (n2.length > 0) {
      let l2 = [], a = [];
      for (let f2 = 0; f2 < this.lines.length; f2++) a.push(this.lines.get(f2));
      let u2 = this.lines.length, h2 = u2 - 1, c2 = 0, d2 = n2[c2];
      this.lines.length = Math.min(this.lines.maxLength, this.lines.length + o);
      let _4 = 0;
      for (let f2 = Math.min(this.lines.maxLength - 1, u2 + o - 1); f2 >= 0; f2--) if (d2 && d2.start > h2 + _4) {
        for (let A3 = d2.newLines.length - 1; A3 >= 0; A3--) this.lines.set(f2--, d2.newLines[A3]);
        f2++, l2.push({ index: h2 + 1, amount: d2.newLines.length }), _4 += d2.newLines.length, d2 = n2[++c2];
      } else this.lines.set(f2, a[h2--]);
      let p2 = 0;
      for (let f2 = l2.length - 1; f2 >= 0; f2--) l2[f2].index += p2, this.lines.onInsertEmitter.fire(l2[f2]), p2 += l2[f2].amount;
      let m2 = Math.max(0, u2 + o - this.lines.maxLength);
      m2 > 0 && this.lines.onTrimEmitter.fire(m2);
    }
  }
  translateBufferLineToString(t, e, i8 = 0, r5) {
    let n2 = this.lines.get(t);
    return n2 ? n2.translateToString(e, i8, r5) : "";
  }
  getWrappedRangeForLine(t) {
    let e = t, i8 = t;
    for (; e > 0 && this.lines.get(e).isWrapped; ) e--;
    for (; i8 + 1 < this.lines.length && this.lines.get(i8 + 1).isWrapped; ) i8++;
    return { first: e, last: i8 };
  }
  setupTabStops(t) {
    for (t != null ? this.tabs[t] || (t = this.prevStop(t)) : (this.tabs = {}, t = 0); t < this._cols; t += this._optionsService.rawOptions.tabStopWidth) this.tabs[t] = true;
  }
  prevStop(t) {
    for (t == null && (t = this.x); !this.tabs[--t] && t > 0; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  nextStop(t) {
    for (t == null && (t = this.x); !this.tabs[++t] && t < this._cols; ) ;
    return t >= this._cols ? this._cols - 1 : t < 0 ? 0 : t;
  }
  clearMarkers(t) {
    this._isClearing = true;
    for (let e = 0; e < this.markers.length; e++) this.markers[e].line === t && (this.markers[e].dispose(), this.markers.splice(e--, 1));
    this._isClearing = false;
  }
  clearAllMarkers() {
    this._isClearing = true;
    for (let t = 0; t < this.markers.length; t++) this.markers[t].dispose();
    this.markers.length = 0, this._isClearing = false;
  }
  addMarker(t) {
    let e = new cn(t);
    return this.markers.push(e), e.register(this.lines.onTrim((i8) => {
      e.line -= i8, e.line < 0 && e.dispose();
    })), e.register(this.lines.onInsert((i8) => {
      e.line >= i8.index && (e.line += i8.amount);
    })), e.register(this.lines.onDelete((i8) => {
      e.line >= i8.index && e.line < i8.index + i8.amount && e.dispose(), e.line > i8.index && (e.line -= i8.amount);
    })), e.register(e.onDispose(() => this._removeMarker(e))), e;
  }
  _removeMarker(t) {
    this._isClearing || this.markers.splice(this.markers.indexOf(t), 1);
  }
};
var hn = class extends D {
  constructor(e, i8) {
    super();
    this._optionsService = e;
    this._bufferService = i8;
    this._onBufferActivate = this._register(new v());
    this.onBufferActivate = this._onBufferActivate.event;
    this.reset(), this._register(this._optionsService.onSpecificOptionChange("scrollback", () => this.resize(this._bufferService.cols, this._bufferService.rows))), this._register(this._optionsService.onSpecificOptionChange("tabStopWidth", () => this.setupTabStops()));
  }
  reset() {
    this._normal = new $i(true, this._optionsService, this._bufferService), this._normal.fillViewportRows(), this._alt = new $i(false, this._optionsService, this._bufferService), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }), this.setupTabStops();
  }
  get alt() {
    return this._alt;
  }
  get active() {
    return this._activeBuffer;
  }
  get normal() {
    return this._normal;
  }
  activateNormalBuffer() {
    this._activeBuffer !== this._normal && (this._normal.x = this._alt.x, this._normal.y = this._alt.y, this._alt.clearAllMarkers(), this._alt.clear(), this._activeBuffer = this._normal, this._onBufferActivate.fire({ activeBuffer: this._normal, inactiveBuffer: this._alt }));
  }
  activateAltBuffer(e) {
    this._activeBuffer !== this._alt && (this._alt.fillViewportRows(e), this._alt.x = this._normal.x, this._alt.y = this._normal.y, this._activeBuffer = this._alt, this._onBufferActivate.fire({ activeBuffer: this._alt, inactiveBuffer: this._normal }));
  }
  resize(e, i8) {
    this._normal.resize(e, i8), this._alt.resize(e, i8), this.setupTabStops(e);
  }
  setupTabStops(e) {
    this._normal.setupTabStops(e), this._alt.setupTabStops(e);
  }
};
var ks = 2;
var Cs = 1;
var ni = class extends D {
  constructor(e) {
    super();
    this.isUserScrolling = false;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this.cols = Math.max(e.rawOptions.cols || 0, ks), this.rows = Math.max(e.rawOptions.rows || 0, Cs), this.buffers = this._register(new hn(e, this)), this._register(this.buffers.onBufferActivate((i8) => {
      this._onScroll.fire(i8.activeBuffer.ydisp);
    }));
  }
  get buffer() {
    return this.buffers.active;
  }
  resize(e, i8) {
    let r5 = this.cols !== e, n2 = this.rows !== i8;
    this.cols = e, this.rows = i8, this.buffers.resize(e, i8), this._onResize.fire({ cols: e, rows: i8, colsChanged: r5, rowsChanged: n2 });
  }
  reset() {
    this.buffers.reset(), this.isUserScrolling = false;
  }
  scroll(e, i8 = false) {
    let r5 = this.buffer, n2;
    n2 = this._cachedBlankLine, (!n2 || n2.length !== this.cols || n2.getFg(0) !== e.fg || n2.getBg(0) !== e.bg) && (n2 = r5.getBlankLine(e, i8), this._cachedBlankLine = n2), n2.isWrapped = i8;
    let o = r5.ybase + r5.scrollTop, l2 = r5.ybase + r5.scrollBottom;
    if (r5.scrollTop === 0) {
      let a = r5.lines.isFull;
      l2 === r5.lines.length - 1 ? a ? r5.lines.recycle().copyFrom(n2) : r5.lines.push(n2.clone()) : r5.lines.splice(l2 + 1, 0, n2.clone()), a ? this.isUserScrolling && (r5.ydisp = Math.max(r5.ydisp - 1, 0)) : (r5.ybase++, this.isUserScrolling || r5.ydisp++);
    } else {
      let a = l2 - o + 1;
      r5.lines.shiftElements(o + 1, a - 1, -1), r5.lines.set(l2, n2.clone());
    }
    this.isUserScrolling || (r5.ydisp = r5.ybase), this._onScroll.fire(r5.ydisp);
  }
  scrollLines(e, i8) {
    let r5 = this.buffer;
    if (e < 0) {
      if (r5.ydisp === 0) return;
      this.isUserScrolling = true;
    } else e + r5.ydisp >= r5.ybase && (this.isUserScrolling = false);
    let n2 = r5.ydisp;
    r5.ydisp = Math.max(Math.min(r5.ydisp + e, r5.ybase), 0), n2 !== r5.ydisp && (i8 || this._onScroll.fire(r5.ydisp));
  }
};
ni = M([S(0, H)], ni);
var si = { cols: 80, rows: 24, cursorBlink: false, cursorStyle: "block", cursorWidth: 1, cursorInactiveStyle: "outline", customGlyphs: true, drawBoldTextInBrightColors: true, documentOverride: null, fastScrollModifier: "alt", fastScrollSensitivity: 5, fontFamily: "monospace", fontSize: 15, fontWeight: "normal", fontWeightBold: "bold", ignoreBracketedPasteMode: false, lineHeight: 1, letterSpacing: 0, linkHandler: null, logLevel: "info", logger: null, scrollback: 1e3, scrollOnEraseInDisplay: false, scrollOnUserInput: true, scrollSensitivity: 1, screenReaderMode: false, smoothScrollDuration: 0, macOptionIsMeta: false, macOptionClickForcesSelection: false, minimumContrastRatio: 1, disableStdin: false, allowProposedApi: false, allowTransparency: false, tabStopWidth: 8, theme: {}, reflowCursorLine: false, rescaleOverlappingGlyphs: false, rightClickSelectsWord: Zt, windowOptions: {}, windowsMode: false, windowsPty: {}, wordSeparator: " ()[]{}',\"`", altClickMovesCursor: true, convertEol: false, termName: "xterm", cancelEvents: false, overviewRuler: {} };
var nc = ["normal", "bold", "100", "200", "300", "400", "500", "600", "700", "800", "900"];
var dn = class extends D {
  constructor(e) {
    super();
    this._onOptionChange = this._register(new v());
    this.onOptionChange = this._onOptionChange.event;
    let i8 = { ...si };
    for (let r5 in e) if (r5 in i8) try {
      let n2 = e[r5];
      i8[r5] = this._sanitizeAndValidateOption(r5, n2);
    } catch (n2) {
      console.error(n2);
    }
    this.rawOptions = i8, this.options = { ...i8 }, this._setupOptions(), this._register(C(() => {
      this.rawOptions.linkHandler = null, this.rawOptions.documentOverride = null;
    }));
  }
  onSpecificOptionChange(e, i8) {
    return this.onOptionChange((r5) => {
      r5 === e && i8(this.rawOptions[e]);
    });
  }
  onMultipleOptionChange(e, i8) {
    return this.onOptionChange((r5) => {
      e.indexOf(r5) !== -1 && i8();
    });
  }
  _setupOptions() {
    let e = (r5) => {
      if (!(r5 in si)) throw new Error(`No option with key "${r5}"`);
      return this.rawOptions[r5];
    }, i8 = (r5, n2) => {
      if (!(r5 in si)) throw new Error(`No option with key "${r5}"`);
      n2 = this._sanitizeAndValidateOption(r5, n2), this.rawOptions[r5] !== n2 && (this.rawOptions[r5] = n2, this._onOptionChange.fire(r5));
    };
    for (let r5 in this.rawOptions) {
      let n2 = { get: e.bind(this, r5), set: i8.bind(this, r5) };
      Object.defineProperty(this.options, r5, n2);
    }
  }
  _sanitizeAndValidateOption(e, i8) {
    switch (e) {
      case "cursorStyle":
        if (i8 || (i8 = si[e]), !sc(i8)) throw new Error(`"${i8}" is not a valid value for ${e}`);
        break;
      case "wordSeparator":
        i8 || (i8 = si[e]);
        break;
      case "fontWeight":
      case "fontWeightBold":
        if (typeof i8 == "number" && 1 <= i8 && i8 <= 1e3) break;
        i8 = nc.includes(i8) ? i8 : si[e];
        break;
      case "cursorWidth":
        i8 = Math.floor(i8);
      case "lineHeight":
      case "tabStopWidth":
        if (i8 < 1) throw new Error(`${e} cannot be less than 1, value: ${i8}`);
        break;
      case "minimumContrastRatio":
        i8 = Math.max(1, Math.min(21, Math.round(i8 * 10) / 10));
        break;
      case "scrollback":
        if (i8 = Math.min(i8, 4294967295), i8 < 0) throw new Error(`${e} cannot be less than 0, value: ${i8}`);
        break;
      case "fastScrollSensitivity":
      case "scrollSensitivity":
        if (i8 <= 0) throw new Error(`${e} cannot be less than or equal to 0, value: ${i8}`);
        break;
      case "rows":
      case "cols":
        if (!i8 && i8 !== 0) throw new Error(`${e} must be numeric, value: ${i8}`);
        break;
      case "windowsPty":
        i8 = i8 ?? {};
        break;
    }
    return i8;
  }
};
function sc(s15) {
  return s15 === "block" || s15 === "underline" || s15 === "bar";
}
function oi(s15, t = 5) {
  if (typeof s15 != "object") return s15;
  let e = Array.isArray(s15) ? [] : {};
  for (let i8 in s15) e[i8] = t <= 1 ? s15[i8] : s15[i8] && oi(s15[i8], t - 1);
  return e;
}
var ul = Object.freeze({ insertMode: false });
var hl = Object.freeze({ applicationCursorKeys: false, applicationKeypad: false, bracketedPasteMode: false, cursorBlink: void 0, cursorStyle: void 0, origin: false, reverseWraparound: false, sendFocus: false, synchronizedOutput: false, wraparound: true });
var li = class extends D {
  constructor(e, i8, r5) {
    super();
    this._bufferService = e;
    this._logService = i8;
    this._optionsService = r5;
    this.isCursorInitialized = false;
    this.isCursorHidden = false;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onUserInput = this._register(new v());
    this.onUserInput = this._onUserInput.event;
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onRequestScrollToBottom = this._register(new v());
    this.onRequestScrollToBottom = this._onRequestScrollToBottom.event;
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  reset() {
    this.modes = oi(ul), this.decPrivateModes = oi(hl);
  }
  triggerDataEvent(e, i8 = false) {
    if (this._optionsService.rawOptions.disableStdin) return;
    let r5 = this._bufferService.buffer;
    i8 && this._optionsService.rawOptions.scrollOnUserInput && r5.ybase !== r5.ydisp && this._onRequestScrollToBottom.fire(), i8 && this._onUserInput.fire(), this._logService.debug(`sending data "${e}"`), this._logService.trace("sending data (codes)", () => e.split("").map((n2) => n2.charCodeAt(0))), this._onData.fire(e);
  }
  triggerBinaryEvent(e) {
    this._optionsService.rawOptions.disableStdin || (this._logService.debug(`sending binary "${e}"`), this._logService.trace("sending binary (codes)", () => e.split("").map((i8) => i8.charCodeAt(0))), this._onBinary.fire(e));
  }
};
li = M([S(0, F), S(1, nr), S(2, H)], li);
var dl = { NONE: { events: 0, restrict: () => false }, X10: { events: 1, restrict: (s15) => s15.button === 4 || s15.action !== 1 ? false : (s15.ctrl = false, s15.alt = false, s15.shift = false, true) }, VT200: { events: 19, restrict: (s15) => s15.action !== 32 }, DRAG: { events: 23, restrict: (s15) => !(s15.action === 32 && s15.button === 3) }, ANY: { events: 31, restrict: (s15) => true } };
function Ms(s15, t) {
  let e = (s15.ctrl ? 16 : 0) | (s15.shift ? 4 : 0) | (s15.alt ? 8 : 0);
  return s15.button === 4 ? (e |= 64, e |= s15.action) : (e |= s15.button & 3, s15.button & 4 && (e |= 64), s15.button & 8 && (e |= 128), s15.action === 32 ? e |= 32 : s15.action === 0 && !t && (e |= 3)), e;
}
var Ps = String.fromCharCode;
var fl = { DEFAULT: (s15) => {
  let t = [Ms(s15, false) + 32, s15.col + 32, s15.row + 32];
  return t[0] > 255 || t[1] > 255 || t[2] > 255 ? "" : `\x1B[M${Ps(t[0])}${Ps(t[1])}${Ps(t[2])}`;
}, SGR: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.col};${s15.row}${t}`;
}, SGR_PIXELS: (s15) => {
  let t = s15.action === 0 && s15.button !== 4 ? "m" : "M";
  return `\x1B[<${Ms(s15, true)};${s15.x};${s15.y}${t}`;
} };
var ai = class extends D {
  constructor(e, i8, r5) {
    super();
    this._bufferService = e;
    this._coreService = i8;
    this._optionsService = r5;
    this._protocols = {};
    this._encodings = {};
    this._activeProtocol = "";
    this._activeEncoding = "";
    this._lastEvent = null;
    this._wheelPartialScroll = 0;
    this._onProtocolChange = this._register(new v());
    this.onProtocolChange = this._onProtocolChange.event;
    for (let n2 of Object.keys(dl)) this.addProtocol(n2, dl[n2]);
    for (let n2 of Object.keys(fl)) this.addEncoding(n2, fl[n2]);
    this.reset();
  }
  addProtocol(e, i8) {
    this._protocols[e] = i8;
  }
  addEncoding(e, i8) {
    this._encodings[e] = i8;
  }
  get activeProtocol() {
    return this._activeProtocol;
  }
  get areMouseEventsActive() {
    return this._protocols[this._activeProtocol].events !== 0;
  }
  set activeProtocol(e) {
    if (!this._protocols[e]) throw new Error(`unknown protocol "${e}"`);
    this._activeProtocol = e, this._onProtocolChange.fire(this._protocols[e].events);
  }
  get activeEncoding() {
    return this._activeEncoding;
  }
  set activeEncoding(e) {
    if (!this._encodings[e]) throw new Error(`unknown encoding "${e}"`);
    this._activeEncoding = e;
  }
  reset() {
    this.activeProtocol = "NONE", this.activeEncoding = "DEFAULT", this._lastEvent = null, this._wheelPartialScroll = 0;
  }
  consumeWheelEvent(e, i8, r5) {
    if (e.deltaY === 0 || e.shiftKey || i8 === void 0 || r5 === void 0) return 0;
    let n2 = i8 / r5, o = this._applyScrollModifier(e.deltaY, e);
    return e.deltaMode === WheelEvent.DOM_DELTA_PIXEL ? (o /= n2 + 0, Math.abs(e.deltaY) < 50 && (o *= 0.3), this._wheelPartialScroll += o, o = Math.floor(Math.abs(this._wheelPartialScroll)) * (this._wheelPartialScroll > 0 ? 1 : -1), this._wheelPartialScroll %= 1) : e.deltaMode === WheelEvent.DOM_DELTA_PAGE && (o *= this._bufferService.rows), o;
  }
  _applyScrollModifier(e, i8) {
    return i8.altKey || i8.ctrlKey || i8.shiftKey ? e * this._optionsService.rawOptions.fastScrollSensitivity * this._optionsService.rawOptions.scrollSensitivity : e * this._optionsService.rawOptions.scrollSensitivity;
  }
  triggerMouseEvent(e) {
    if (e.col < 0 || e.col >= this._bufferService.cols || e.row < 0 || e.row >= this._bufferService.rows || e.button === 4 && e.action === 32 || e.button === 3 && e.action !== 32 || e.button !== 4 && (e.action === 2 || e.action === 3) || (e.col++, e.row++, e.action === 32 && this._lastEvent && this._equalEvents(this._lastEvent, e, this._activeEncoding === "SGR_PIXELS")) || !this._protocols[this._activeProtocol].restrict(e)) return false;
    let i8 = this._encodings[this._activeEncoding](e);
    return i8 && (this._activeEncoding === "DEFAULT" ? this._coreService.triggerBinaryEvent(i8) : this._coreService.triggerDataEvent(i8, true)), this._lastEvent = e, true;
  }
  explainEvents(e) {
    return { down: !!(e & 1), up: !!(e & 2), drag: !!(e & 4), move: !!(e & 8), wheel: !!(e & 16) };
  }
  _equalEvents(e, i8, r5) {
    if (r5) {
      if (e.x !== i8.x || e.y !== i8.y) return false;
    } else if (e.col !== i8.col || e.row !== i8.row) return false;
    return !(e.button !== i8.button || e.action !== i8.action || e.ctrl !== i8.ctrl || e.alt !== i8.alt || e.shift !== i8.shift);
  }
};
ai = M([S(0, F), S(1, ge), S(2, H)], ai);
var Os = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
var ac = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
var se;
function cc(s15, t) {
  let e = 0, i8 = t.length - 1, r5;
  if (s15 < t[0][0] || s15 > t[i8][1]) return false;
  for (; i8 >= e; ) if (r5 = e + i8 >> 1, s15 > t[r5][1]) e = r5 + 1;
  else if (s15 < t[r5][0]) i8 = r5 - 1;
  else return true;
  return false;
}
var fn = class {
  constructor() {
    this.version = "6";
    if (!se) {
      se = new Uint8Array(65536), se.fill(1), se[0] = 0, se.fill(0, 1, 32), se.fill(0, 127, 160), se.fill(2, 4352, 4448), se[9001] = 2, se[9002] = 2, se.fill(2, 11904, 42192), se[12351] = 1, se.fill(2, 44032, 55204), se.fill(2, 63744, 64256), se.fill(2, 65040, 65050), se.fill(2, 65072, 65136), se.fill(2, 65280, 65377), se.fill(2, 65504, 65511);
      for (let t = 0; t < Os.length; ++t) se.fill(0, Os[t][0], Os[t][1] + 1);
    }
  }
  wcwidth(t) {
    return t < 32 ? 0 : t < 127 ? 1 : t < 65536 ? se[t] : cc(t, ac) ? 0 : t >= 131072 && t <= 196605 || t >= 196608 && t <= 262141 ? 2 : 1;
  }
  charProperties(t, e) {
    let i8 = this.wcwidth(t), r5 = i8 === 0 && e !== 0;
    if (r5) {
      let n2 = Ae.extractWidth(e);
      n2 === 0 ? r5 = false : n2 > i8 && (i8 = n2);
    }
    return Ae.createPropertyValue(0, i8, r5);
  }
};
var Ae = class s13 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new v();
    this.onChange = this._onChange.event;
    let t = new fn();
    this.register(t), this._active = t.version, this._activeProvider = t;
  }
  static extractShouldJoin(t) {
    return (t & 1) !== 0;
  }
  static extractWidth(t) {
    return t >> 1 & 3;
  }
  static extractCharKind(t) {
    return t >> 3;
  }
  static createPropertyValue(t, e, i8 = false) {
    return (t & 16777215) << 3 | (e & 3) << 1 | (i8 ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(t) {
    if (!this._providers[t]) throw new Error(`unknown Unicode version "${t}"`);
    this._active = t, this._activeProvider = this._providers[t], this._onChange.fire(t);
  }
  register(t) {
    this._providers[t.version] = t;
  }
  wcwidth(t) {
    return this._activeProvider.wcwidth(t);
  }
  getStringCellWidth(t) {
    let e = 0, i8 = 0, r5 = t.length;
    for (let n2 = 0; n2 < r5; ++n2) {
      let o = t.charCodeAt(n2);
      if (55296 <= o && o <= 56319) {
        if (++n2 >= r5) return e + this.wcwidth(o);
        let u2 = t.charCodeAt(n2);
        56320 <= u2 && u2 <= 57343 ? o = (o - 55296) * 1024 + u2 - 56320 + 65536 : e += this.wcwidth(u2);
      }
      let l2 = this.charProperties(o, i8), a = s13.extractWidth(l2);
      s13.extractShouldJoin(l2) && (a -= s13.extractWidth(i8)), e += a, i8 = l2;
    }
    return e;
  }
  charProperties(t, e) {
    return this._activeProvider.charProperties(t, e);
  }
};
var pn = class {
  constructor() {
    this.glevel = 0;
    this._charsets = [];
  }
  reset() {
    this.charset = void 0, this._charsets = [], this.glevel = 0;
  }
  setgLevel(t) {
    this.glevel = t, this.charset = this._charsets[t];
  }
  setgCharset(t, e) {
    this._charsets[t] = e, this.glevel === t && (this.charset = e);
  }
};
function Bs(s15) {
  let e = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y - 1)?.get(s15.cols - 1), i8 = s15.buffer.lines.get(s15.buffer.ybase + s15.buffer.y);
  i8 && e && (i8.isWrapped = e[3] !== 0 && e[3] !== 32);
}
var Vi = 2147483647;
var uc = 256;
var ci = class s14 {
  constructor(t = 32, e = 32) {
    this.maxLength = t;
    this.maxSubParamsLength = e;
    if (e > uc) throw new Error("maxSubParamsLength must not be greater than 256");
    this.params = new Int32Array(t), this.length = 0, this._subParams = new Int32Array(e), this._subParamsLength = 0, this._subParamsIdx = new Uint16Array(t), this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  static fromArray(t) {
    let e = new s14();
    if (!t.length) return e;
    for (let i8 = Array.isArray(t[0]) ? 1 : 0; i8 < t.length; ++i8) {
      let r5 = t[i8];
      if (Array.isArray(r5)) for (let n2 = 0; n2 < r5.length; ++n2) e.addSubParam(r5[n2]);
      else e.addParam(r5);
    }
    return e;
  }
  clone() {
    let t = new s14(this.maxLength, this.maxSubParamsLength);
    return t.params.set(this.params), t.length = this.length, t._subParams.set(this._subParams), t._subParamsLength = this._subParamsLength, t._subParamsIdx.set(this._subParamsIdx), t._rejectDigits = this._rejectDigits, t._rejectSubDigits = this._rejectSubDigits, t._digitIsSub = this._digitIsSub, t;
  }
  toArray() {
    let t = [];
    for (let e = 0; e < this.length; ++e) {
      t.push(this.params[e]);
      let i8 = this._subParamsIdx[e] >> 8, r5 = this._subParamsIdx[e] & 255;
      r5 - i8 > 0 && t.push(Array.prototype.slice.call(this._subParams, i8, r5));
    }
    return t;
  }
  reset() {
    this.length = 0, this._subParamsLength = 0, this._rejectDigits = false, this._rejectSubDigits = false, this._digitIsSub = false;
  }
  addParam(t) {
    if (this._digitIsSub = false, this.length >= this.maxLength) {
      this._rejectDigits = true;
      return;
    }
    if (t < -1) throw new Error("values lesser than -1 are not allowed");
    this._subParamsIdx[this.length] = this._subParamsLength << 8 | this._subParamsLength, this.params[this.length++] = t > Vi ? Vi : t;
  }
  addSubParam(t) {
    if (this._digitIsSub = true, !!this.length) {
      if (this._rejectDigits || this._subParamsLength >= this.maxSubParamsLength) {
        this._rejectSubDigits = true;
        return;
      }
      if (t < -1) throw new Error("values lesser than -1 are not allowed");
      this._subParams[this._subParamsLength++] = t > Vi ? Vi : t, this._subParamsIdx[this.length - 1]++;
    }
  }
  hasSubParams(t) {
    return (this._subParamsIdx[t] & 255) - (this._subParamsIdx[t] >> 8) > 0;
  }
  getSubParams(t) {
    let e = this._subParamsIdx[t] >> 8, i8 = this._subParamsIdx[t] & 255;
    return i8 - e > 0 ? this._subParams.subarray(e, i8) : null;
  }
  getSubParamsAll() {
    let t = {};
    for (let e = 0; e < this.length; ++e) {
      let i8 = this._subParamsIdx[e] >> 8, r5 = this._subParamsIdx[e] & 255;
      r5 - i8 > 0 && (t[e] = this._subParams.slice(i8, r5));
    }
    return t;
  }
  addDigit(t) {
    let e;
    if (this._rejectDigits || !(e = this._digitIsSub ? this._subParamsLength : this.length) || this._digitIsSub && this._rejectSubDigits) return;
    let i8 = this._digitIsSub ? this._subParams : this.params, r5 = i8[e - 1];
    i8[e - 1] = ~r5 ? Math.min(r5 * 10 + t, Vi) : t;
  }
};
var qi = [];
var mn = class {
  constructor() {
    this._state = 0;
    this._active = qi;
    this._id = -1;
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  registerHandler(t, e) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i8 = this._handlers[t];
    return i8.push(e), { dispose: () => {
      let r5 = i8.indexOf(e);
      r5 !== -1 && i8.splice(r5, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = qi;
  }
  reset() {
    if (this._state === 2) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].end(false);
    this._stack.paused = false, this._active = qi, this._id = -1, this._state = 0;
  }
  _start() {
    if (this._active = this._handlers[this._id] || qi, !this._active.length) this._handlerFb(this._id, "START");
    else for (let t = this._active.length - 1; t >= 0; t--) this._active[t].start();
  }
  _put(t, e, i8) {
    if (!this._active.length) this._handlerFb(this._id, "PUT", It(t, e, i8));
    else for (let r5 = this._active.length - 1; r5 >= 0; r5--) this._active[r5].put(t, e, i8);
  }
  start() {
    this.reset(), this._state = 1;
  }
  put(t, e, i8) {
    if (this._state !== 3) {
      if (this._state === 1) for (; e < i8; ) {
        let r5 = t[e++];
        if (r5 === 59) {
          this._state = 2, this._start();
          break;
        }
        if (r5 < 48 || 57 < r5) {
          this._state = 3;
          return;
        }
        this._id === -1 && (this._id = 0), this._id = this._id * 10 + r5 - 48;
      }
      this._state === 2 && i8 - e > 0 && this._put(t, e, i8);
    }
  }
  end(t, e = true) {
    if (this._state !== 0) {
      if (this._state !== 3) if (this._state === 1 && this._start(), !this._active.length) this._handlerFb(this._id, "END", t);
      else {
        let i8 = false, r5 = this._active.length - 1, n2 = false;
        if (this._stack.paused && (r5 = this._stack.loopPosition - 1, i8 = e, n2 = this._stack.fallThrough, this._stack.paused = false), !n2 && i8 === false) {
          for (; r5 >= 0 && (i8 = this._active[r5].end(t), i8 !== true); r5--) if (i8 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = false, i8;
          r5--;
        }
        for (; r5 >= 0; r5--) if (i8 = this._active[r5].end(false), i8 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = true, i8;
      }
      this._active = qi, this._id = -1, this._state = 0;
    }
  }
};
var pe = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._hitLimit = false;
  }
  start() {
    this._data = "", this._hitLimit = false;
  }
  put(t, e, i8) {
    this._hitLimit || (this._data += It(t, e, i8), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  end(t) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t && (e = this._handler(this._data), e instanceof Promise)) return e.then((i8) => (this._data = "", this._hitLimit = false, i8));
    return this._data = "", this._hitLimit = false, e;
  }
};
var Yi = [];
var _n = class {
  constructor() {
    this._handlers = /* @__PURE__ */ Object.create(null);
    this._active = Yi;
    this._ident = 0;
    this._handlerFb = () => {
    };
    this._stack = { paused: false, loopPosition: 0, fallThrough: false };
  }
  dispose() {
    this._handlers = /* @__PURE__ */ Object.create(null), this._handlerFb = () => {
    }, this._active = Yi;
  }
  registerHandler(t, e) {
    this._handlers[t] === void 0 && (this._handlers[t] = []);
    let i8 = this._handlers[t];
    return i8.push(e), { dispose: () => {
      let r5 = i8.indexOf(e);
      r5 !== -1 && i8.splice(r5, 1);
    } };
  }
  clearHandler(t) {
    this._handlers[t] && delete this._handlers[t];
  }
  setHandlerFallback(t) {
    this._handlerFb = t;
  }
  reset() {
    if (this._active.length) for (let t = this._stack.paused ? this._stack.loopPosition - 1 : this._active.length - 1; t >= 0; --t) this._active[t].unhook(false);
    this._stack.paused = false, this._active = Yi, this._ident = 0;
  }
  hook(t, e) {
    if (this.reset(), this._ident = t, this._active = this._handlers[t] || Yi, !this._active.length) this._handlerFb(this._ident, "HOOK", e);
    else for (let i8 = this._active.length - 1; i8 >= 0; i8--) this._active[i8].hook(e);
  }
  put(t, e, i8) {
    if (!this._active.length) this._handlerFb(this._ident, "PUT", It(t, e, i8));
    else for (let r5 = this._active.length - 1; r5 >= 0; r5--) this._active[r5].put(t, e, i8);
  }
  unhook(t, e = true) {
    if (!this._active.length) this._handlerFb(this._ident, "UNHOOK", t);
    else {
      let i8 = false, r5 = this._active.length - 1, n2 = false;
      if (this._stack.paused && (r5 = this._stack.loopPosition - 1, i8 = e, n2 = this._stack.fallThrough, this._stack.paused = false), !n2 && i8 === false) {
        for (; r5 >= 0 && (i8 = this._active[r5].unhook(t), i8 !== true); r5--) if (i8 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = false, i8;
        r5--;
      }
      for (; r5 >= 0; r5--) if (i8 = this._active[r5].unhook(false), i8 instanceof Promise) return this._stack.paused = true, this._stack.loopPosition = r5, this._stack.fallThrough = true, i8;
    }
    this._active = Yi, this._ident = 0;
  }
};
var ji = new ci();
ji.addParam(0);
var Xi = class {
  constructor(t) {
    this._handler = t;
    this._data = "";
    this._params = ji;
    this._hitLimit = false;
  }
  hook(t) {
    this._params = t.length > 1 || t.params[0] ? t.clone() : ji, this._data = "", this._hitLimit = false;
  }
  put(t, e, i8) {
    this._hitLimit || (this._data += It(t, e, i8), this._data.length > 1e7 && (this._data = "", this._hitLimit = true));
  }
  unhook(t) {
    let e = false;
    if (this._hitLimit) e = false;
    else if (t && (e = this._handler(this._data, this._params), e instanceof Promise)) return e.then((i8) => (this._params = ji, this._data = "", this._hitLimit = false, i8));
    return this._params = ji, this._data = "", this._hitLimit = false, e;
  }
};
var Fs = class {
  constructor(t) {
    this.table = new Uint8Array(t);
  }
  setDefault(t, e) {
    this.table.fill(t << 4 | e);
  }
  add(t, e, i8, r5) {
    this.table[e << 8 | t] = i8 << 4 | r5;
  }
  addMany(t, e, i8, r5) {
    for (let n2 = 0; n2 < t.length; n2++) this.table[e << 8 | t[n2]] = i8 << 4 | r5;
  }
};
var ke = 160;
var hc = function() {
  let s15 = new Fs(4095), e = Array.apply(null, Array(256)).map((a, u2) => u2), i8 = (a, u2) => e.slice(a, u2), r5 = i8(32, 127), n2 = i8(0, 24);
  n2.push(25), n2.push.apply(n2, i8(28, 32));
  let o = i8(0, 14), l2;
  s15.setDefault(1, 0), s15.addMany(r5, 0, 2, 0);
  for (l2 in o) s15.addMany([24, 26, 153, 154], l2, 3, 0), s15.addMany(i8(128, 144), l2, 3, 0), s15.addMany(i8(144, 152), l2, 3, 0), s15.add(156, l2, 0, 0), s15.add(27, l2, 11, 1), s15.add(157, l2, 4, 8), s15.addMany([152, 158, 159], l2, 0, 7), s15.add(155, l2, 11, 3), s15.add(144, l2, 11, 9);
  return s15.addMany(n2, 0, 3, 0), s15.addMany(n2, 1, 3, 1), s15.add(127, 1, 0, 1), s15.addMany(n2, 8, 0, 8), s15.addMany(n2, 3, 3, 3), s15.add(127, 3, 0, 3), s15.addMany(n2, 4, 3, 4), s15.add(127, 4, 0, 4), s15.addMany(n2, 6, 3, 6), s15.addMany(n2, 5, 3, 5), s15.add(127, 5, 0, 5), s15.addMany(n2, 2, 3, 2), s15.add(127, 2, 0, 2), s15.add(93, 1, 4, 8), s15.addMany(r5, 8, 5, 8), s15.add(127, 8, 5, 8), s15.addMany([156, 27, 24, 26, 7], 8, 6, 0), s15.addMany(i8(28, 32), 8, 0, 8), s15.addMany([88, 94, 95], 1, 0, 7), s15.addMany(r5, 7, 0, 7), s15.addMany(n2, 7, 0, 7), s15.add(156, 7, 0, 0), s15.add(127, 7, 0, 7), s15.add(91, 1, 11, 3), s15.addMany(i8(64, 127), 3, 7, 0), s15.addMany(i8(48, 60), 3, 8, 4), s15.addMany([60, 61, 62, 63], 3, 9, 4), s15.addMany(i8(48, 60), 4, 8, 4), s15.addMany(i8(64, 127), 4, 7, 0), s15.addMany([60, 61, 62, 63], 4, 0, 6), s15.addMany(i8(32, 64), 6, 0, 6), s15.add(127, 6, 0, 6), s15.addMany(i8(64, 127), 6, 0, 0), s15.addMany(i8(32, 48), 3, 9, 5), s15.addMany(i8(32, 48), 5, 9, 5), s15.addMany(i8(48, 64), 5, 0, 6), s15.addMany(i8(64, 127), 5, 7, 0), s15.addMany(i8(32, 48), 4, 9, 5), s15.addMany(i8(32, 48), 1, 9, 2), s15.addMany(i8(32, 48), 2, 9, 2), s15.addMany(i8(48, 127), 2, 10, 0), s15.addMany(i8(48, 80), 1, 10, 0), s15.addMany(i8(81, 88), 1, 10, 0), s15.addMany([89, 90, 92], 1, 10, 0), s15.addMany(i8(96, 127), 1, 10, 0), s15.add(80, 1, 11, 9), s15.addMany(n2, 9, 0, 9), s15.add(127, 9, 0, 9), s15.addMany(i8(28, 32), 9, 0, 9), s15.addMany(i8(32, 48), 9, 9, 12), s15.addMany(i8(48, 60), 9, 8, 10), s15.addMany([60, 61, 62, 63], 9, 9, 10), s15.addMany(n2, 11, 0, 11), s15.addMany(i8(32, 128), 11, 0, 11), s15.addMany(i8(28, 32), 11, 0, 11), s15.addMany(n2, 10, 0, 10), s15.add(127, 10, 0, 10), s15.addMany(i8(28, 32), 10, 0, 10), s15.addMany(i8(48, 60), 10, 8, 10), s15.addMany([60, 61, 62, 63], 10, 0, 11), s15.addMany(i8(32, 48), 10, 9, 12), s15.addMany(n2, 12, 0, 12), s15.add(127, 12, 0, 12), s15.addMany(i8(28, 32), 12, 0, 12), s15.addMany(i8(32, 48), 12, 9, 12), s15.addMany(i8(48, 64), 12, 0, 11), s15.addMany(i8(64, 127), 12, 12, 13), s15.addMany(i8(64, 127), 10, 12, 13), s15.addMany(i8(64, 127), 9, 12, 13), s15.addMany(n2, 13, 13, 13), s15.addMany(r5, 13, 13, 13), s15.add(127, 13, 0, 13), s15.addMany([27, 156, 24, 26], 13, 14, 0), s15.add(ke, 0, 2, 0), s15.add(ke, 8, 5, 8), s15.add(ke, 6, 0, 6), s15.add(ke, 11, 0, 11), s15.add(ke, 13, 13, 13), s15;
}();
var bn = class extends D {
  constructor(e = hc) {
    super();
    this._transitions = e;
    this._parseStack = { state: 0, handlers: [], handlerPos: 0, transition: 0, chunkPos: 0 };
    this.initialState = 0, this.currentState = this.initialState, this._params = new ci(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._printHandlerFb = (i8, r5, n2) => {
    }, this._executeHandlerFb = (i8) => {
    }, this._csiHandlerFb = (i8, r5) => {
    }, this._escHandlerFb = (i8) => {
    }, this._errorHandlerFb = (i8) => i8, this._printHandler = this._printHandlerFb, this._executeHandlers = /* @__PURE__ */ Object.create(null), this._csiHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null), this._register(C(() => {
      this._csiHandlers = /* @__PURE__ */ Object.create(null), this._executeHandlers = /* @__PURE__ */ Object.create(null), this._escHandlers = /* @__PURE__ */ Object.create(null);
    })), this._oscParser = this._register(new mn()), this._dcsParser = this._register(new _n()), this._errorHandler = this._errorHandlerFb, this.registerEscHandler({ final: "\\" }, () => true);
  }
  _identifier(e, i8 = [64, 126]) {
    let r5 = 0;
    if (e.prefix) {
      if (e.prefix.length > 1) throw new Error("only one byte as prefix supported");
      if (r5 = e.prefix.charCodeAt(0), r5 && 60 > r5 || r5 > 63) throw new Error("prefix must be in range 0x3c .. 0x3f");
    }
    if (e.intermediates) {
      if (e.intermediates.length > 2) throw new Error("only two bytes as intermediates are supported");
      for (let o = 0; o < e.intermediates.length; ++o) {
        let l2 = e.intermediates.charCodeAt(o);
        if (32 > l2 || l2 > 47) throw new Error("intermediate must be in range 0x20 .. 0x2f");
        r5 <<= 8, r5 |= l2;
      }
    }
    if (e.final.length !== 1) throw new Error("final must be a single byte");
    let n2 = e.final.charCodeAt(0);
    if (i8[0] > n2 || n2 > i8[1]) throw new Error(`final must be in range ${i8[0]} .. ${i8[1]}`);
    return r5 <<= 8, r5 |= n2, r5;
  }
  identToString(e) {
    let i8 = [];
    for (; e; ) i8.push(String.fromCharCode(e & 255)), e >>= 8;
    return i8.reverse().join("");
  }
  setPrintHandler(e) {
    this._printHandler = e;
  }
  clearPrintHandler() {
    this._printHandler = this._printHandlerFb;
  }
  registerEscHandler(e, i8) {
    let r5 = this._identifier(e, [48, 126]);
    this._escHandlers[r5] === void 0 && (this._escHandlers[r5] = []);
    let n2 = this._escHandlers[r5];
    return n2.push(i8), { dispose: () => {
      let o = n2.indexOf(i8);
      o !== -1 && n2.splice(o, 1);
    } };
  }
  clearEscHandler(e) {
    this._escHandlers[this._identifier(e, [48, 126])] && delete this._escHandlers[this._identifier(e, [48, 126])];
  }
  setEscHandlerFallback(e) {
    this._escHandlerFb = e;
  }
  setExecuteHandler(e, i8) {
    this._executeHandlers[e.charCodeAt(0)] = i8;
  }
  clearExecuteHandler(e) {
    this._executeHandlers[e.charCodeAt(0)] && delete this._executeHandlers[e.charCodeAt(0)];
  }
  setExecuteHandlerFallback(e) {
    this._executeHandlerFb = e;
  }
  registerCsiHandler(e, i8) {
    let r5 = this._identifier(e);
    this._csiHandlers[r5] === void 0 && (this._csiHandlers[r5] = []);
    let n2 = this._csiHandlers[r5];
    return n2.push(i8), { dispose: () => {
      let o = n2.indexOf(i8);
      o !== -1 && n2.splice(o, 1);
    } };
  }
  clearCsiHandler(e) {
    this._csiHandlers[this._identifier(e)] && delete this._csiHandlers[this._identifier(e)];
  }
  setCsiHandlerFallback(e) {
    this._csiHandlerFb = e;
  }
  registerDcsHandler(e, i8) {
    return this._dcsParser.registerHandler(this._identifier(e), i8);
  }
  clearDcsHandler(e) {
    this._dcsParser.clearHandler(this._identifier(e));
  }
  setDcsHandlerFallback(e) {
    this._dcsParser.setHandlerFallback(e);
  }
  registerOscHandler(e, i8) {
    return this._oscParser.registerHandler(e, i8);
  }
  clearOscHandler(e) {
    this._oscParser.clearHandler(e);
  }
  setOscHandlerFallback(e) {
    this._oscParser.setHandlerFallback(e);
  }
  setErrorHandler(e) {
    this._errorHandler = e;
  }
  clearErrorHandler() {
    this._errorHandler = this._errorHandlerFb;
  }
  reset() {
    this.currentState = this.initialState, this._oscParser.reset(), this._dcsParser.reset(), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0, this._parseStack.state !== 0 && (this._parseStack.state = 2, this._parseStack.handlers = []);
  }
  _preserveStack(e, i8, r5, n2, o) {
    this._parseStack.state = e, this._parseStack.handlers = i8, this._parseStack.handlerPos = r5, this._parseStack.transition = n2, this._parseStack.chunkPos = o;
  }
  parse(e, i8, r5) {
    let n2 = 0, o = 0, l2 = 0, a;
    if (this._parseStack.state) if (this._parseStack.state === 2) this._parseStack.state = 0, l2 = this._parseStack.chunkPos + 1;
    else {
      if (r5 === void 0 || this._parseStack.state === 1) throw this._parseStack.state = 1, new Error("improper continuation due to previous async handler, giving up parsing");
      let u2 = this._parseStack.handlers, h2 = this._parseStack.handlerPos - 1;
      switch (this._parseStack.state) {
        case 3:
          if (r5 === false && h2 > -1) {
            for (; h2 >= 0 && (a = u2[h2](this._params), a !== true); h2--) if (a instanceof Promise) return this._parseStack.handlerPos = h2, a;
          }
          this._parseStack.handlers = [];
          break;
        case 4:
          if (r5 === false && h2 > -1) {
            for (; h2 >= 0 && (a = u2[h2](), a !== true); h2--) if (a instanceof Promise) return this._parseStack.handlerPos = h2, a;
          }
          this._parseStack.handlers = [];
          break;
        case 6:
          if (n2 = e[this._parseStack.chunkPos], a = this._dcsParser.unhook(n2 !== 24 && n2 !== 26, r5), a) return a;
          n2 === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 5:
          if (n2 = e[this._parseStack.chunkPos], a = this._oscParser.end(n2 !== 24 && n2 !== 26, r5), a) return a;
          n2 === 27 && (this._parseStack.transition |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
      }
      this._parseStack.state = 0, l2 = this._parseStack.chunkPos + 1, this.precedingJoinState = 0, this.currentState = this._parseStack.transition & 15;
    }
    for (let u2 = l2; u2 < i8; ++u2) {
      switch (n2 = e[u2], o = this._transitions.table[this.currentState << 8 | (n2 < 160 ? n2 : ke)], o >> 4) {
        case 2:
          for (let m2 = u2 + 1; ; ++m2) {
            if (m2 >= i8 || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
            if (++m2 >= i8 || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
            if (++m2 >= i8 || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
            if (++m2 >= i8 || (n2 = e[m2]) < 32 || n2 > 126 && n2 < ke) {
              this._printHandler(e, u2, m2), u2 = m2 - 1;
              break;
            }
          }
          break;
        case 3:
          this._executeHandlers[n2] ? this._executeHandlers[n2]() : this._executeHandlerFb(n2), this.precedingJoinState = 0;
          break;
        case 0:
          break;
        case 1:
          if (this._errorHandler({ position: u2, code: n2, currentState: this.currentState, collect: this._collect, params: this._params, abort: false }).abort) return;
          break;
        case 7:
          let c2 = this._csiHandlers[this._collect << 8 | n2], d2 = c2 ? c2.length - 1 : -1;
          for (; d2 >= 0 && (a = c2[d2](this._params), a !== true); d2--) if (a instanceof Promise) return this._preserveStack(3, c2, d2, o, u2), a;
          d2 < 0 && this._csiHandlerFb(this._collect << 8 | n2, this._params), this.precedingJoinState = 0;
          break;
        case 8:
          do
            switch (n2) {
              case 59:
                this._params.addParam(0);
                break;
              case 58:
                this._params.addSubParam(-1);
                break;
              default:
                this._params.addDigit(n2 - 48);
            }
          while (++u2 < i8 && (n2 = e[u2]) > 47 && n2 < 60);
          u2--;
          break;
        case 9:
          this._collect <<= 8, this._collect |= n2;
          break;
        case 10:
          let _4 = this._escHandlers[this._collect << 8 | n2], p2 = _4 ? _4.length - 1 : -1;
          for (; p2 >= 0 && (a = _4[p2](), a !== true); p2--) if (a instanceof Promise) return this._preserveStack(4, _4, p2, o, u2), a;
          p2 < 0 && this._escHandlerFb(this._collect << 8 | n2), this.precedingJoinState = 0;
          break;
        case 11:
          this._params.reset(), this._params.addParam(0), this._collect = 0;
          break;
        case 12:
          this._dcsParser.hook(this._collect << 8 | n2, this._params);
          break;
        case 13:
          for (let m2 = u2 + 1; ; ++m2) if (m2 >= i8 || (n2 = e[m2]) === 24 || n2 === 26 || n2 === 27 || n2 > 127 && n2 < ke) {
            this._dcsParser.put(e, u2, m2), u2 = m2 - 1;
            break;
          }
          break;
        case 14:
          if (a = this._dcsParser.unhook(n2 !== 24 && n2 !== 26), a) return this._preserveStack(6, [], 0, o, u2), a;
          n2 === 27 && (o |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
        case 4:
          this._oscParser.start();
          break;
        case 5:
          for (let m2 = u2 + 1; ; m2++) if (m2 >= i8 || (n2 = e[m2]) < 32 || n2 > 127 && n2 < ke) {
            this._oscParser.put(e, u2, m2), u2 = m2 - 1;
            break;
          }
          break;
        case 6:
          if (a = this._oscParser.end(n2 !== 24 && n2 !== 26), a) return this._preserveStack(5, [], 0, o, u2), a;
          n2 === 27 && (o |= 1), this._params.reset(), this._params.addParam(0), this._collect = 0, this.precedingJoinState = 0;
          break;
      }
      this.currentState = o & 15;
    }
  }
};
var dc = /^([\da-f])\/([\da-f])\/([\da-f])$|^([\da-f]{2})\/([\da-f]{2})\/([\da-f]{2})$|^([\da-f]{3})\/([\da-f]{3})\/([\da-f]{3})$|^([\da-f]{4})\/([\da-f]{4})\/([\da-f]{4})$/;
var fc = /^[\da-f]+$/;
function Ws(s15) {
  if (!s15) return;
  let t = s15.toLowerCase();
  if (t.indexOf("rgb:") === 0) {
    t = t.slice(4);
    let e = dc.exec(t);
    if (e) {
      let i8 = e[1] ? 15 : e[4] ? 255 : e[7] ? 4095 : 65535;
      return [Math.round(parseInt(e[1] || e[4] || e[7] || e[10], 16) / i8 * 255), Math.round(parseInt(e[2] || e[5] || e[8] || e[11], 16) / i8 * 255), Math.round(parseInt(e[3] || e[6] || e[9] || e[12], 16) / i8 * 255)];
    }
  } else if (t.indexOf("#") === 0 && (t = t.slice(1), fc.exec(t) && [3, 6, 9, 12].includes(t.length))) {
    let e = t.length / 3, i8 = [0, 0, 0];
    for (let r5 = 0; r5 < 3; ++r5) {
      let n2 = parseInt(t.slice(e * r5, e * r5 + e), 16);
      i8[r5] = e === 1 ? n2 << 4 : e === 2 ? n2 : e === 3 ? n2 >> 4 : n2 >> 8;
    }
    return i8;
  }
}
function Hs(s15, t) {
  let e = s15.toString(16), i8 = e.length < 2 ? "0" + e : e;
  switch (t) {
    case 4:
      return e[0];
    case 8:
      return i8;
    case 12:
      return (i8 + i8).slice(0, 3);
    default:
      return i8 + i8;
  }
}
function ml(s15, t = 16) {
  let [e, i8, r5] = s15;
  return `rgb:${Hs(e, t)}/${Hs(i8, t)}/${Hs(r5, t)}`;
}
var mc = { "(": 0, ")": 1, "*": 2, "+": 3, "-": 1, ".": 2 };
var ut = 131072;
var _l = 10;
function bl(s15, t) {
  if (s15 > 24) return t.setWinLines || false;
  switch (s15) {
    case 1:
      return !!t.restoreWin;
    case 2:
      return !!t.minimizeWin;
    case 3:
      return !!t.setWinPosition;
    case 4:
      return !!t.setWinSizePixels;
    case 5:
      return !!t.raiseWin;
    case 6:
      return !!t.lowerWin;
    case 7:
      return !!t.refreshWin;
    case 8:
      return !!t.setWinSizeChars;
    case 9:
      return !!t.maximizeWin;
    case 10:
      return !!t.fullscreenWin;
    case 11:
      return !!t.getWinState;
    case 13:
      return !!t.getWinPosition;
    case 14:
      return !!t.getWinSizePixels;
    case 15:
      return !!t.getScreenSizePixels;
    case 16:
      return !!t.getCellSizePixels;
    case 18:
      return !!t.getWinSizeChars;
    case 19:
      return !!t.getScreenSizeChars;
    case 20:
      return !!t.getIconTitle;
    case 21:
      return !!t.getWinTitle;
    case 22:
      return !!t.pushTitle;
    case 23:
      return !!t.popTitle;
    case 24:
      return !!t.setWinLines;
  }
  return false;
}
var vl = 5e3;
var gl = 0;
var vn = class extends D {
  constructor(e, i8, r5, n2, o, l2, a, u2, h2 = new bn()) {
    super();
    this._bufferService = e;
    this._charsetService = i8;
    this._coreService = r5;
    this._logService = n2;
    this._optionsService = o;
    this._oscLinkService = l2;
    this._coreMouseService = a;
    this._unicodeService = u2;
    this._parser = h2;
    this._parseBuffer = new Uint32Array(4096);
    this._stringDecoder = new er();
    this._utf8Decoder = new tr();
    this._windowTitle = "";
    this._iconName = "";
    this._windowTitleStack = [];
    this._iconNameStack = [];
    this._curAttrData = X.clone();
    this._eraseAttrDataInternal = X.clone();
    this._onRequestBell = this._register(new v());
    this.onRequestBell = this._onRequestBell.event;
    this._onRequestRefreshRows = this._register(new v());
    this.onRequestRefreshRows = this._onRequestRefreshRows.event;
    this._onRequestReset = this._register(new v());
    this.onRequestReset = this._onRequestReset.event;
    this._onRequestSendFocus = this._register(new v());
    this.onRequestSendFocus = this._onRequestSendFocus.event;
    this._onRequestSyncScrollBar = this._register(new v());
    this.onRequestSyncScrollBar = this._onRequestSyncScrollBar.event;
    this._onRequestWindowsOptionsReport = this._register(new v());
    this.onRequestWindowsOptionsReport = this._onRequestWindowsOptionsReport.event;
    this._onA11yChar = this._register(new v());
    this.onA11yChar = this._onA11yChar.event;
    this._onA11yTab = this._register(new v());
    this.onA11yTab = this._onA11yTab.event;
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onScroll = this._register(new v());
    this.onScroll = this._onScroll.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onColor = this._register(new v());
    this.onColor = this._onColor.event;
    this._parseStack = { paused: false, cursorStartX: 0, cursorStartY: 0, decodedLength: 0, position: 0 };
    this._specialColors = [256, 257, 258];
    this._register(this._parser), this._dirtyRowTracker = new Zi(this._bufferService), this._activeBuffer = this._bufferService.buffer, this._register(this._bufferService.buffers.onBufferActivate((c2) => this._activeBuffer = c2.activeBuffer)), this._parser.setCsiHandlerFallback((c2, d2) => {
      this._logService.debug("Unknown CSI code: ", { identifier: this._parser.identToString(c2), params: d2.toArray() });
    }), this._parser.setEscHandlerFallback((c2) => {
      this._logService.debug("Unknown ESC code: ", { identifier: this._parser.identToString(c2) });
    }), this._parser.setExecuteHandlerFallback((c2) => {
      this._logService.debug("Unknown EXECUTE code: ", { code: c2 });
    }), this._parser.setOscHandlerFallback((c2, d2, _4) => {
      this._logService.debug("Unknown OSC code: ", { identifier: c2, action: d2, data: _4 });
    }), this._parser.setDcsHandlerFallback((c2, d2, _4) => {
      d2 === "HOOK" && (_4 = _4.toArray()), this._logService.debug("Unknown DCS code: ", { identifier: this._parser.identToString(c2), action: d2, payload: _4 });
    }), this._parser.setPrintHandler((c2, d2, _4) => this.print(c2, d2, _4)), this._parser.registerCsiHandler({ final: "@" }, (c2) => this.insertChars(c2)), this._parser.registerCsiHandler({ intermediates: " ", final: "@" }, (c2) => this.scrollLeft(c2)), this._parser.registerCsiHandler({ final: "A" }, (c2) => this.cursorUp(c2)), this._parser.registerCsiHandler({ intermediates: " ", final: "A" }, (c2) => this.scrollRight(c2)), this._parser.registerCsiHandler({ final: "B" }, (c2) => this.cursorDown(c2)), this._parser.registerCsiHandler({ final: "C" }, (c2) => this.cursorForward(c2)), this._parser.registerCsiHandler({ final: "D" }, (c2) => this.cursorBackward(c2)), this._parser.registerCsiHandler({ final: "E" }, (c2) => this.cursorNextLine(c2)), this._parser.registerCsiHandler({ final: "F" }, (c2) => this.cursorPrecedingLine(c2)), this._parser.registerCsiHandler({ final: "G" }, (c2) => this.cursorCharAbsolute(c2)), this._parser.registerCsiHandler({ final: "H" }, (c2) => this.cursorPosition(c2)), this._parser.registerCsiHandler({ final: "I" }, (c2) => this.cursorForwardTab(c2)), this._parser.registerCsiHandler({ final: "J" }, (c2) => this.eraseInDisplay(c2, false)), this._parser.registerCsiHandler({ prefix: "?", final: "J" }, (c2) => this.eraseInDisplay(c2, true)), this._parser.registerCsiHandler({ final: "K" }, (c2) => this.eraseInLine(c2, false)), this._parser.registerCsiHandler({ prefix: "?", final: "K" }, (c2) => this.eraseInLine(c2, true)), this._parser.registerCsiHandler({ final: "L" }, (c2) => this.insertLines(c2)), this._parser.registerCsiHandler({ final: "M" }, (c2) => this.deleteLines(c2)), this._parser.registerCsiHandler({ final: "P" }, (c2) => this.deleteChars(c2)), this._parser.registerCsiHandler({ final: "S" }, (c2) => this.scrollUp(c2)), this._parser.registerCsiHandler({ final: "T" }, (c2) => this.scrollDown(c2)), this._parser.registerCsiHandler({ final: "X" }, (c2) => this.eraseChars(c2)), this._parser.registerCsiHandler({ final: "Z" }, (c2) => this.cursorBackwardTab(c2)), this._parser.registerCsiHandler({ final: "`" }, (c2) => this.charPosAbsolute(c2)), this._parser.registerCsiHandler({ final: "a" }, (c2) => this.hPositionRelative(c2)), this._parser.registerCsiHandler({ final: "b" }, (c2) => this.repeatPrecedingCharacter(c2)), this._parser.registerCsiHandler({ final: "c" }, (c2) => this.sendDeviceAttributesPrimary(c2)), this._parser.registerCsiHandler({ prefix: ">", final: "c" }, (c2) => this.sendDeviceAttributesSecondary(c2)), this._parser.registerCsiHandler({ final: "d" }, (c2) => this.linePosAbsolute(c2)), this._parser.registerCsiHandler({ final: "e" }, (c2) => this.vPositionRelative(c2)), this._parser.registerCsiHandler({ final: "f" }, (c2) => this.hVPosition(c2)), this._parser.registerCsiHandler({ final: "g" }, (c2) => this.tabClear(c2)), this._parser.registerCsiHandler({ final: "h" }, (c2) => this.setMode(c2)), this._parser.registerCsiHandler({ prefix: "?", final: "h" }, (c2) => this.setModePrivate(c2)), this._parser.registerCsiHandler({ final: "l" }, (c2) => this.resetMode(c2)), this._parser.registerCsiHandler({ prefix: "?", final: "l" }, (c2) => this.resetModePrivate(c2)), this._parser.registerCsiHandler({ final: "m" }, (c2) => this.charAttributes(c2)), this._parser.registerCsiHandler({ final: "n" }, (c2) => this.deviceStatus(c2)), this._parser.registerCsiHandler({ prefix: "?", final: "n" }, (c2) => this.deviceStatusPrivate(c2)), this._parser.registerCsiHandler({ intermediates: "!", final: "p" }, (c2) => this.softReset(c2)), this._parser.registerCsiHandler({ intermediates: " ", final: "q" }, (c2) => this.setCursorStyle(c2)), this._parser.registerCsiHandler({ final: "r" }, (c2) => this.setScrollRegion(c2)), this._parser.registerCsiHandler({ final: "s" }, (c2) => this.saveCursor(c2)), this._parser.registerCsiHandler({ final: "t" }, (c2) => this.windowOptions(c2)), this._parser.registerCsiHandler({ final: "u" }, (c2) => this.restoreCursor(c2)), this._parser.registerCsiHandler({ intermediates: "'", final: "}" }, (c2) => this.insertColumns(c2)), this._parser.registerCsiHandler({ intermediates: "'", final: "~" }, (c2) => this.deleteColumns(c2)), this._parser.registerCsiHandler({ intermediates: '"', final: "q" }, (c2) => this.selectProtected(c2)), this._parser.registerCsiHandler({ intermediates: "$", final: "p" }, (c2) => this.requestMode(c2, true)), this._parser.registerCsiHandler({ prefix: "?", intermediates: "$", final: "p" }, (c2) => this.requestMode(c2, false)), this._parser.setExecuteHandler(b.BEL, () => this.bell()), this._parser.setExecuteHandler(b.LF, () => this.lineFeed()), this._parser.setExecuteHandler(b.VT, () => this.lineFeed()), this._parser.setExecuteHandler(b.FF, () => this.lineFeed()), this._parser.setExecuteHandler(b.CR, () => this.carriageReturn()), this._parser.setExecuteHandler(b.BS, () => this.backspace()), this._parser.setExecuteHandler(b.HT, () => this.tab()), this._parser.setExecuteHandler(b.SO, () => this.shiftOut()), this._parser.setExecuteHandler(b.SI, () => this.shiftIn()), this._parser.setExecuteHandler(Ai.IND, () => this.index()), this._parser.setExecuteHandler(Ai.NEL, () => this.nextLine()), this._parser.setExecuteHandler(Ai.HTS, () => this.tabSet()), this._parser.registerOscHandler(0, new pe((c2) => (this.setTitle(c2), this.setIconName(c2), true))), this._parser.registerOscHandler(1, new pe((c2) => this.setIconName(c2))), this._parser.registerOscHandler(2, new pe((c2) => this.setTitle(c2))), this._parser.registerOscHandler(4, new pe((c2) => this.setOrReportIndexedColor(c2))), this._parser.registerOscHandler(8, new pe((c2) => this.setHyperlink(c2))), this._parser.registerOscHandler(10, new pe((c2) => this.setOrReportFgColor(c2))), this._parser.registerOscHandler(11, new pe((c2) => this.setOrReportBgColor(c2))), this._parser.registerOscHandler(12, new pe((c2) => this.setOrReportCursorColor(c2))), this._parser.registerOscHandler(104, new pe((c2) => this.restoreIndexedColor(c2))), this._parser.registerOscHandler(110, new pe((c2) => this.restoreFgColor(c2))), this._parser.registerOscHandler(111, new pe((c2) => this.restoreBgColor(c2))), this._parser.registerOscHandler(112, new pe((c2) => this.restoreCursorColor(c2))), this._parser.registerEscHandler({ final: "7" }, () => this.saveCursor()), this._parser.registerEscHandler({ final: "8" }, () => this.restoreCursor()), this._parser.registerEscHandler({ final: "D" }, () => this.index()), this._parser.registerEscHandler({ final: "E" }, () => this.nextLine()), this._parser.registerEscHandler({ final: "H" }, () => this.tabSet()), this._parser.registerEscHandler({ final: "M" }, () => this.reverseIndex()), this._parser.registerEscHandler({ final: "=" }, () => this.keypadApplicationMode()), this._parser.registerEscHandler({ final: ">" }, () => this.keypadNumericMode()), this._parser.registerEscHandler({ final: "c" }, () => this.fullReset()), this._parser.registerEscHandler({ final: "n" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "o" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "|" }, () => this.setgLevel(3)), this._parser.registerEscHandler({ final: "}" }, () => this.setgLevel(2)), this._parser.registerEscHandler({ final: "~" }, () => this.setgLevel(1)), this._parser.registerEscHandler({ intermediates: "%", final: "@" }, () => this.selectDefaultCharset()), this._parser.registerEscHandler({ intermediates: "%", final: "G" }, () => this.selectDefaultCharset());
    for (let c2 in ne) this._parser.registerEscHandler({ intermediates: "(", final: c2 }, () => this.selectCharset("(" + c2)), this._parser.registerEscHandler({ intermediates: ")", final: c2 }, () => this.selectCharset(")" + c2)), this._parser.registerEscHandler({ intermediates: "*", final: c2 }, () => this.selectCharset("*" + c2)), this._parser.registerEscHandler({ intermediates: "+", final: c2 }, () => this.selectCharset("+" + c2)), this._parser.registerEscHandler({ intermediates: "-", final: c2 }, () => this.selectCharset("-" + c2)), this._parser.registerEscHandler({ intermediates: ".", final: c2 }, () => this.selectCharset("." + c2)), this._parser.registerEscHandler({ intermediates: "/", final: c2 }, () => this.selectCharset("/" + c2));
    this._parser.registerEscHandler({ intermediates: "#", final: "8" }, () => this.screenAlignmentPattern()), this._parser.setErrorHandler((c2) => (this._logService.error("Parsing error: ", c2), c2)), this._parser.registerDcsHandler({ intermediates: "$", final: "q" }, new Xi((c2, d2) => this.requestStatusString(c2, d2)));
  }
  getAttrData() {
    return this._curAttrData;
  }
  _preserveStack(e, i8, r5, n2) {
    this._parseStack.paused = true, this._parseStack.cursorStartX = e, this._parseStack.cursorStartY = i8, this._parseStack.decodedLength = r5, this._parseStack.position = n2;
  }
  _logSlowResolvingAsync(e) {
    this._logService.logLevel <= 3 && Promise.race([e, new Promise((i8, r5) => setTimeout(() => r5("#SLOW_TIMEOUT"), vl))]).catch((i8) => {
      if (i8 !== "#SLOW_TIMEOUT") throw i8;
      console.warn(`async parser handler taking longer than ${vl} ms`);
    });
  }
  _getCurrentLinkId() {
    return this._curAttrData.extended.urlId;
  }
  parse(e, i8) {
    let r5, n2 = this._activeBuffer.x, o = this._activeBuffer.y, l2 = 0, a = this._parseStack.paused;
    if (a) {
      if (r5 = this._parser.parse(this._parseBuffer, this._parseStack.decodedLength, i8)) return this._logSlowResolvingAsync(r5), r5;
      n2 = this._parseStack.cursorStartX, o = this._parseStack.cursorStartY, this._parseStack.paused = false, e.length > ut && (l2 = this._parseStack.position + ut);
    }
    if (this._logService.logLevel <= 1 && this._logService.debug(`parsing data ${typeof e == "string" ? ` "${e}"` : ` "${Array.prototype.map.call(e, (c2) => String.fromCharCode(c2)).join("")}"`}`), this._logService.logLevel === 0 && this._logService.trace("parsing data (codes)", typeof e == "string" ? e.split("").map((c2) => c2.charCodeAt(0)) : e), this._parseBuffer.length < e.length && this._parseBuffer.length < ut && (this._parseBuffer = new Uint32Array(Math.min(e.length, ut))), a || this._dirtyRowTracker.clearRange(), e.length > ut) for (let c2 = l2; c2 < e.length; c2 += ut) {
      let d2 = c2 + ut < e.length ? c2 + ut : e.length, _4 = typeof e == "string" ? this._stringDecoder.decode(e.substring(c2, d2), this._parseBuffer) : this._utf8Decoder.decode(e.subarray(c2, d2), this._parseBuffer);
      if (r5 = this._parser.parse(this._parseBuffer, _4)) return this._preserveStack(n2, o, _4, c2), this._logSlowResolvingAsync(r5), r5;
    }
    else if (!a) {
      let c2 = typeof e == "string" ? this._stringDecoder.decode(e, this._parseBuffer) : this._utf8Decoder.decode(e, this._parseBuffer);
      if (r5 = this._parser.parse(this._parseBuffer, c2)) return this._preserveStack(n2, o, c2, 0), this._logSlowResolvingAsync(r5), r5;
    }
    (this._activeBuffer.x !== n2 || this._activeBuffer.y !== o) && this._onCursorMove.fire();
    let u2 = this._dirtyRowTracker.end + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp), h2 = this._dirtyRowTracker.start + (this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
    h2 < this._bufferService.rows && this._onRequestRefreshRows.fire({ start: Math.min(h2, this._bufferService.rows - 1), end: Math.min(u2, this._bufferService.rows - 1) });
  }
  print(e, i8, r5) {
    let n2, o, l2 = this._charsetService.charset, a = this._optionsService.rawOptions.screenReaderMode, u2 = this._bufferService.cols, h2 = this._coreService.decPrivateModes.wraparound, c2 = this._coreService.modes.insertMode, d2 = this._curAttrData, _4 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._activeBuffer.x && r5 - i8 > 0 && _4.getWidth(this._activeBuffer.x - 1) === 2 && _4.setCellFromCodepoint(this._activeBuffer.x - 1, 0, 1, d2);
    let p2 = this._parser.precedingJoinState;
    for (let m2 = i8; m2 < r5; ++m2) {
      if (n2 = e[m2], n2 < 127 && l2) {
        let O4 = l2[String.fromCharCode(n2)];
        O4 && (n2 = O4.charCodeAt(0));
      }
      let f2 = this._unicodeService.charProperties(n2, p2);
      o = Ae.extractWidth(f2);
      let A3 = Ae.extractShouldJoin(f2), R4 = A3 ? Ae.extractWidth(p2) : 0;
      if (p2 = f2, a && this._onA11yChar.fire(Ce(n2)), this._getCurrentLinkId() && this._oscLinkService.addLineToLink(this._getCurrentLinkId(), this._activeBuffer.ybase + this._activeBuffer.y), this._activeBuffer.x + o - R4 > u2) {
        if (h2) {
          let O4 = _4, I3 = this._activeBuffer.x - R4;
          for (this._activeBuffer.x = R4, this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData(), true)) : (this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = true), _4 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y), R4 > 0 && _4 instanceof Ze && _4.copyCellsFrom(O4, I3, 0, R4, false); I3 < u2; ) O4.setCellFromCodepoint(I3++, 0, 1, d2);
        } else if (this._activeBuffer.x = u2 - 1, o === 2) continue;
      }
      if (A3 && this._activeBuffer.x) {
        let O4 = _4.getWidth(this._activeBuffer.x - 1) ? 1 : 2;
        _4.addCodepointToCell(this._activeBuffer.x - O4, n2, o);
        for (let I3 = o - R4; --I3 >= 0; ) _4.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d2);
        continue;
      }
      if (c2 && (_4.insertCells(this._activeBuffer.x, o - R4, this._activeBuffer.getNullCell(d2)), _4.getWidth(u2 - 1) === 2 && _4.setCellFromCodepoint(u2 - 1, 0, 1, d2)), _4.setCellFromCodepoint(this._activeBuffer.x++, n2, o, d2), o > 0) for (; --o; ) _4.setCellFromCodepoint(this._activeBuffer.x++, 0, 0, d2);
    }
    this._parser.precedingJoinState = p2, this._activeBuffer.x < u2 && r5 - i8 > 0 && _4.getWidth(this._activeBuffer.x) === 0 && !_4.hasContent(this._activeBuffer.x) && _4.setCellFromCodepoint(this._activeBuffer.x, 0, 1, d2), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  registerCsiHandler(e, i8) {
    return e.final === "t" && !e.prefix && !e.intermediates ? this._parser.registerCsiHandler(e, (r5) => bl(r5.params[0], this._optionsService.rawOptions.windowOptions) ? i8(r5) : true) : this._parser.registerCsiHandler(e, i8);
  }
  registerDcsHandler(e, i8) {
    return this._parser.registerDcsHandler(e, new Xi(i8));
  }
  registerEscHandler(e, i8) {
    return this._parser.registerEscHandler(e, i8);
  }
  registerOscHandler(e, i8) {
    return this._parser.registerOscHandler(e, new pe(i8));
  }
  bell() {
    return this._onRequestBell.fire(), true;
  }
  lineFeed() {
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._optionsService.rawOptions.convertEol && (this._activeBuffer.x = 0), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows ? this._activeBuffer.y = this._bufferService.rows - 1 : this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.x >= this._bufferService.cols && this._activeBuffer.x--, this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._onLineFeed.fire(), true;
  }
  carriageReturn() {
    return this._activeBuffer.x = 0, true;
  }
  backspace() {
    if (!this._coreService.decPrivateModes.reverseWraparound) return this._restrictCursor(), this._activeBuffer.x > 0 && this._activeBuffer.x--, true;
    if (this._restrictCursor(this._bufferService.cols), this._activeBuffer.x > 0) this._activeBuffer.x--;
    else if (this._activeBuffer.x === 0 && this._activeBuffer.y > this._activeBuffer.scrollTop && this._activeBuffer.y <= this._activeBuffer.scrollBottom && this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y)?.isWrapped) {
      this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).isWrapped = false, this._activeBuffer.y--, this._activeBuffer.x = this._bufferService.cols - 1;
      let e = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
      e.hasWidth(this._activeBuffer.x) && !e.hasContent(this._activeBuffer.x) && this._activeBuffer.x--;
    }
    return this._restrictCursor(), true;
  }
  tab() {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let e = this._activeBuffer.x;
    return this._activeBuffer.x = this._activeBuffer.nextStop(), this._optionsService.rawOptions.screenReaderMode && this._onA11yTab.fire(this._activeBuffer.x - e), true;
  }
  shiftOut() {
    return this._charsetService.setgLevel(1), true;
  }
  shiftIn() {
    return this._charsetService.setgLevel(0), true;
  }
  _restrictCursor(e = this._bufferService.cols - 1) {
    this._activeBuffer.x = Math.min(e, Math.max(0, this._activeBuffer.x)), this._activeBuffer.y = this._coreService.decPrivateModes.origin ? Math.min(this._activeBuffer.scrollBottom, Math.max(this._activeBuffer.scrollTop, this._activeBuffer.y)) : Math.min(this._bufferService.rows - 1, Math.max(0, this._activeBuffer.y)), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _setCursor(e, i8) {
    this._dirtyRowTracker.markDirty(this._activeBuffer.y), this._coreService.decPrivateModes.origin ? (this._activeBuffer.x = e, this._activeBuffer.y = this._activeBuffer.scrollTop + i8) : (this._activeBuffer.x = e, this._activeBuffer.y = i8), this._restrictCursor(), this._dirtyRowTracker.markDirty(this._activeBuffer.y);
  }
  _moveCursor(e, i8) {
    this._restrictCursor(), this._setCursor(this._activeBuffer.x + e, this._activeBuffer.y + i8);
  }
  cursorUp(e) {
    let i8 = this._activeBuffer.y - this._activeBuffer.scrollTop;
    return i8 >= 0 ? this._moveCursor(0, -Math.min(i8, e.params[0] || 1)) : this._moveCursor(0, -(e.params[0] || 1)), true;
  }
  cursorDown(e) {
    let i8 = this._activeBuffer.scrollBottom - this._activeBuffer.y;
    return i8 >= 0 ? this._moveCursor(0, Math.min(i8, e.params[0] || 1)) : this._moveCursor(0, e.params[0] || 1), true;
  }
  cursorForward(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  cursorBackward(e) {
    return this._moveCursor(-(e.params[0] || 1), 0), true;
  }
  cursorNextLine(e) {
    return this.cursorDown(e), this._activeBuffer.x = 0, true;
  }
  cursorPrecedingLine(e) {
    return this.cursorUp(e), this._activeBuffer.x = 0, true;
  }
  cursorCharAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  cursorPosition(e) {
    return this._setCursor(e.length >= 2 ? (e.params[1] || 1) - 1 : 0, (e.params[0] || 1) - 1), true;
  }
  charPosAbsolute(e) {
    return this._setCursor((e.params[0] || 1) - 1, this._activeBuffer.y), true;
  }
  hPositionRelative(e) {
    return this._moveCursor(e.params[0] || 1, 0), true;
  }
  linePosAbsolute(e) {
    return this._setCursor(this._activeBuffer.x, (e.params[0] || 1) - 1), true;
  }
  vPositionRelative(e) {
    return this._moveCursor(0, e.params[0] || 1), true;
  }
  hVPosition(e) {
    return this.cursorPosition(e), true;
  }
  tabClear(e) {
    let i8 = e.params[0];
    return i8 === 0 ? delete this._activeBuffer.tabs[this._activeBuffer.x] : i8 === 3 && (this._activeBuffer.tabs = {}), true;
  }
  cursorForwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i8 = e.params[0] || 1;
    for (; i8--; ) this._activeBuffer.x = this._activeBuffer.nextStop();
    return true;
  }
  cursorBackwardTab(e) {
    if (this._activeBuffer.x >= this._bufferService.cols) return true;
    let i8 = e.params[0] || 1;
    for (; i8--; ) this._activeBuffer.x = this._activeBuffer.prevStop();
    return true;
  }
  selectProtected(e) {
    let i8 = e.params[0];
    return i8 === 1 && (this._curAttrData.bg |= 536870912), (i8 === 2 || i8 === 0) && (this._curAttrData.bg &= -536870913), true;
  }
  _eraseInBufferLine(e, i8, r5, n2 = false, o = false) {
    let l2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    l2.replaceCells(i8, r5, this._activeBuffer.getNullCell(this._eraseAttrData()), o), n2 && (l2.isWrapped = false);
  }
  _resetBufferLine(e, i8 = false) {
    let r5 = this._activeBuffer.lines.get(this._activeBuffer.ybase + e);
    r5 && (r5.fill(this._activeBuffer.getNullCell(this._eraseAttrData()), i8), this._bufferService.buffer.clearMarkers(this._activeBuffer.ybase + e), r5.isWrapped = false);
  }
  eraseInDisplay(e, i8 = false) {
    this._restrictCursor(this._bufferService.cols);
    let r5;
    switch (e.params[0]) {
      case 0:
        for (r5 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r5), this._eraseInBufferLine(r5++, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i8); r5 < this._bufferService.rows; r5++) this._resetBufferLine(r5, i8);
        this._dirtyRowTracker.markDirty(r5);
        break;
      case 1:
        for (r5 = this._activeBuffer.y, this._dirtyRowTracker.markDirty(r5), this._eraseInBufferLine(r5, 0, this._activeBuffer.x + 1, true, i8), this._activeBuffer.x + 1 >= this._bufferService.cols && (this._activeBuffer.lines.get(r5 + 1).isWrapped = false); r5--; ) this._resetBufferLine(r5, i8);
        this._dirtyRowTracker.markDirty(0);
        break;
      case 2:
        if (this._optionsService.rawOptions.scrollOnEraseInDisplay) {
          for (r5 = this._bufferService.rows, this._dirtyRowTracker.markRangeDirty(0, r5 - 1); r5-- && !this._activeBuffer.lines.get(this._activeBuffer.ybase + r5)?.getTrimmedLength(); ) ;
          for (; r5 >= 0; r5--) this._bufferService.scroll(this._eraseAttrData());
        } else {
          for (r5 = this._bufferService.rows, this._dirtyRowTracker.markDirty(r5 - 1); r5--; ) this._resetBufferLine(r5, i8);
          this._dirtyRowTracker.markDirty(0);
        }
        break;
      case 3:
        let n2 = this._activeBuffer.lines.length - this._bufferService.rows;
        n2 > 0 && (this._activeBuffer.lines.trimStart(n2), this._activeBuffer.ybase = Math.max(this._activeBuffer.ybase - n2, 0), this._activeBuffer.ydisp = Math.max(this._activeBuffer.ydisp - n2, 0), this._onScroll.fire(0));
        break;
    }
    return true;
  }
  eraseInLine(e, i8 = false) {
    switch (this._restrictCursor(this._bufferService.cols), e.params[0]) {
      case 0:
        this._eraseInBufferLine(this._activeBuffer.y, this._activeBuffer.x, this._bufferService.cols, this._activeBuffer.x === 0, i8);
        break;
      case 1:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._activeBuffer.x + 1, false, i8);
        break;
      case 2:
        this._eraseInBufferLine(this._activeBuffer.y, 0, this._bufferService.cols, true, i8);
        break;
    }
    return this._dirtyRowTracker.markDirty(this._activeBuffer.y), true;
  }
  insertLines(e) {
    this._restrictCursor();
    let i8 = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r5 = this._activeBuffer.ybase + this._activeBuffer.y, n2 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, o = this._bufferService.rows - 1 + this._activeBuffer.ybase - n2 + 1;
    for (; i8--; ) this._activeBuffer.lines.splice(o - 1, 1), this._activeBuffer.lines.splice(r5, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  deleteLines(e) {
    this._restrictCursor();
    let i8 = e.params[0] || 1;
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let r5 = this._activeBuffer.ybase + this._activeBuffer.y, n2;
    for (n2 = this._bufferService.rows - 1 - this._activeBuffer.scrollBottom, n2 = this._bufferService.rows - 1 + this._activeBuffer.ybase - n2; i8--; ) this._activeBuffer.lines.splice(r5, 1), this._activeBuffer.lines.splice(n2, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.y, this._activeBuffer.scrollBottom), this._activeBuffer.x = 0, true;
  }
  insertChars(e) {
    this._restrictCursor();
    let i8 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i8 && (i8.insertCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  deleteChars(e) {
    this._restrictCursor();
    let i8 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i8 && (i8.deleteCells(this._activeBuffer.x, e.params[0] || 1, this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  scrollUp(e) {
    let i8 = e.params[0] || 1;
    for (; i8--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 0, this._activeBuffer.getBlankLine(this._eraseAttrData()));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollDown(e) {
    let i8 = e.params[0] || 1;
    for (; i8--; ) this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollBottom, 1), this._activeBuffer.lines.splice(this._activeBuffer.ybase + this._activeBuffer.scrollTop, 0, this._activeBuffer.getBlankLine(X));
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollLeft(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i8 = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n2.deleteCells(0, i8, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  scrollRight(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i8 = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n2.insertCells(0, i8, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  insertColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i8 = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n2.insertCells(this._activeBuffer.x, i8, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  deleteColumns(e) {
    if (this._activeBuffer.y > this._activeBuffer.scrollBottom || this._activeBuffer.y < this._activeBuffer.scrollTop) return true;
    let i8 = e.params[0] || 1;
    for (let r5 = this._activeBuffer.scrollTop; r5 <= this._activeBuffer.scrollBottom; ++r5) {
      let n2 = this._activeBuffer.lines.get(this._activeBuffer.ybase + r5);
      n2.deleteCells(this._activeBuffer.x, i8, this._activeBuffer.getNullCell(this._eraseAttrData())), n2.isWrapped = false;
    }
    return this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom), true;
  }
  eraseChars(e) {
    this._restrictCursor();
    let i8 = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y);
    return i8 && (i8.replaceCells(this._activeBuffer.x, this._activeBuffer.x + (e.params[0] || 1), this._activeBuffer.getNullCell(this._eraseAttrData())), this._dirtyRowTracker.markDirty(this._activeBuffer.y)), true;
  }
  repeatPrecedingCharacter(e) {
    let i8 = this._parser.precedingJoinState;
    if (!i8) return true;
    let r5 = e.params[0] || 1, n2 = Ae.extractWidth(i8), o = this._activeBuffer.x - n2, a = this._activeBuffer.lines.get(this._activeBuffer.ybase + this._activeBuffer.y).getString(o), u2 = new Uint32Array(a.length * r5), h2 = 0;
    for (let d2 = 0; d2 < a.length; ) {
      let _4 = a.codePointAt(d2) || 0;
      u2[h2++] = _4, d2 += _4 > 65535 ? 2 : 1;
    }
    let c2 = h2;
    for (let d2 = 1; d2 < r5; ++d2) u2.copyWithin(c2, 0, h2), c2 += h2;
    return this.print(u2, 0, c2), true;
  }
  sendDeviceAttributesPrimary(e) {
    return e.params[0] > 0 || (this._is("xterm") || this._is("rxvt-unicode") || this._is("screen") ? this._coreService.triggerDataEvent(b.ESC + "[?1;2c") : this._is("linux") && this._coreService.triggerDataEvent(b.ESC + "[?6c")), true;
  }
  sendDeviceAttributesSecondary(e) {
    return e.params[0] > 0 || (this._is("xterm") ? this._coreService.triggerDataEvent(b.ESC + "[>0;276;0c") : this._is("rxvt-unicode") ? this._coreService.triggerDataEvent(b.ESC + "[>85;95;0c") : this._is("linux") ? this._coreService.triggerDataEvent(e.params[0] + "c") : this._is("screen") && this._coreService.triggerDataEvent(b.ESC + "[>83;40003;0c")), true;
  }
  _is(e) {
    return (this._optionsService.rawOptions.termName + "").indexOf(e) === 0;
  }
  setMode(e) {
    for (let i8 = 0; i8 < e.length; i8++) switch (e.params[i8]) {
      case 4:
        this._coreService.modes.insertMode = true;
        break;
      case 20:
        this._optionsService.options.convertEol = true;
        break;
    }
    return true;
  }
  setModePrivate(e) {
    for (let i8 = 0; i8 < e.length; i8++) switch (e.params[i8]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = true;
        break;
      case 2:
        this._charsetService.setgCharset(0, Je), this._charsetService.setgCharset(1, Je), this._charsetService.setgCharset(2, Je), this._charsetService.setgCharset(3, Je);
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(132, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = true, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = true;
        break;
      case 12:
        this._optionsService.options.cursorBlink = true;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = true;
        break;
      case 66:
        this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
        this._coreMouseService.activeProtocol = "X10";
        break;
      case 1e3:
        this._coreMouseService.activeProtocol = "VT200";
        break;
      case 1002:
        this._coreMouseService.activeProtocol = "DRAG";
        break;
      case 1003:
        this._coreMouseService.activeProtocol = "ANY";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = true, this._onRequestSendFocus.fire();
        break;
      case 1005:
        this._logService.debug("DECSET 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "SGR";
        break;
      case 1015:
        this._logService.debug("DECSET 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "SGR_PIXELS";
        break;
      case 25:
        this._coreService.isCursorHidden = false;
        break;
      case 1048:
        this.saveCursor();
        break;
      case 1049:
        this.saveCursor();
      case 47:
      case 1047:
        this._bufferService.buffers.activateAltBuffer(this._eraseAttrData()), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = true;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = true;
        break;
    }
    return true;
  }
  resetMode(e) {
    for (let i8 = 0; i8 < e.length; i8++) switch (e.params[i8]) {
      case 4:
        this._coreService.modes.insertMode = false;
        break;
      case 20:
        this._optionsService.options.convertEol = false;
        break;
    }
    return true;
  }
  resetModePrivate(e) {
    for (let i8 = 0; i8 < e.length; i8++) switch (e.params[i8]) {
      case 1:
        this._coreService.decPrivateModes.applicationCursorKeys = false;
        break;
      case 3:
        this._optionsService.rawOptions.windowOptions.setWinLines && (this._bufferService.resize(80, this._bufferService.rows), this._onRequestReset.fire());
        break;
      case 6:
        this._coreService.decPrivateModes.origin = false, this._setCursor(0, 0);
        break;
      case 7:
        this._coreService.decPrivateModes.wraparound = false;
        break;
      case 12:
        this._optionsService.options.cursorBlink = false;
        break;
      case 45:
        this._coreService.decPrivateModes.reverseWraparound = false;
        break;
      case 66:
        this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire();
        break;
      case 9:
      case 1e3:
      case 1002:
      case 1003:
        this._coreMouseService.activeProtocol = "NONE";
        break;
      case 1004:
        this._coreService.decPrivateModes.sendFocus = false;
        break;
      case 1005:
        this._logService.debug("DECRST 1005 not supported (see #2507)");
        break;
      case 1006:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 1015:
        this._logService.debug("DECRST 1015 not supported (see #2507)");
        break;
      case 1016:
        this._coreMouseService.activeEncoding = "DEFAULT";
        break;
      case 25:
        this._coreService.isCursorHidden = true;
        break;
      case 1048:
        this.restoreCursor();
        break;
      case 1049:
      case 47:
      case 1047:
        this._bufferService.buffers.activateNormalBuffer(), e.params[i8] === 1049 && this.restoreCursor(), this._coreService.isCursorInitialized = true, this._onRequestRefreshRows.fire(void 0), this._onRequestSyncScrollBar.fire();
        break;
      case 2004:
        this._coreService.decPrivateModes.bracketedPasteMode = false;
        break;
      case 2026:
        this._coreService.decPrivateModes.synchronizedOutput = false, this._onRequestRefreshRows.fire(void 0);
        break;
    }
    return true;
  }
  requestMode(e, i8) {
    let r5;
    ((P4) => (P4[P4.NOT_RECOGNIZED = 0] = "NOT_RECOGNIZED", P4[P4.SET = 1] = "SET", P4[P4.RESET = 2] = "RESET", P4[P4.PERMANENTLY_SET = 3] = "PERMANENTLY_SET", P4[P4.PERMANENTLY_RESET = 4] = "PERMANENTLY_RESET"))(r5 ||= {});
    let n2 = this._coreService.decPrivateModes, { activeProtocol: o, activeEncoding: l2 } = this._coreMouseService, a = this._coreService, { buffers: u2, cols: h2 } = this._bufferService, { active: c2, alt: d2 } = u2, _4 = this._optionsService.rawOptions, p2 = (A3, R4) => (a.triggerDataEvent(`${b.ESC}[${i8 ? "" : "?"}${A3};${R4}$y`), true), m2 = (A3) => A3 ? 1 : 2, f2 = e.params[0];
    return i8 ? f2 === 2 ? p2(f2, 4) : f2 === 4 ? p2(f2, m2(a.modes.insertMode)) : f2 === 12 ? p2(f2, 3) : f2 === 20 ? p2(f2, m2(_4.convertEol)) : p2(f2, 0) : f2 === 1 ? p2(f2, m2(n2.applicationCursorKeys)) : f2 === 3 ? p2(f2, _4.windowOptions.setWinLines ? h2 === 80 ? 2 : h2 === 132 ? 1 : 0 : 0) : f2 === 6 ? p2(f2, m2(n2.origin)) : f2 === 7 ? p2(f2, m2(n2.wraparound)) : f2 === 8 ? p2(f2, 3) : f2 === 9 ? p2(f2, m2(o === "X10")) : f2 === 12 ? p2(f2, m2(_4.cursorBlink)) : f2 === 25 ? p2(f2, m2(!a.isCursorHidden)) : f2 === 45 ? p2(f2, m2(n2.reverseWraparound)) : f2 === 66 ? p2(f2, m2(n2.applicationKeypad)) : f2 === 67 ? p2(f2, 4) : f2 === 1e3 ? p2(f2, m2(o === "VT200")) : f2 === 1002 ? p2(f2, m2(o === "DRAG")) : f2 === 1003 ? p2(f2, m2(o === "ANY")) : f2 === 1004 ? p2(f2, m2(n2.sendFocus)) : f2 === 1005 ? p2(f2, 4) : f2 === 1006 ? p2(f2, m2(l2 === "SGR")) : f2 === 1015 ? p2(f2, 4) : f2 === 1016 ? p2(f2, m2(l2 === "SGR_PIXELS")) : f2 === 1048 ? p2(f2, 1) : f2 === 47 || f2 === 1047 || f2 === 1049 ? p2(f2, m2(c2 === d2)) : f2 === 2004 ? p2(f2, m2(n2.bracketedPasteMode)) : f2 === 2026 ? p2(f2, m2(n2.synchronizedOutput)) : p2(f2, 0);
  }
  _updateAttrColor(e, i8, r5, n2, o) {
    return i8 === 2 ? (e |= 50331648, e &= -16777216, e |= De.fromColorRGB([r5, n2, o])) : i8 === 5 && (e &= -50331904, e |= 33554432 | r5 & 255), e;
  }
  _extractColor(e, i8, r5) {
    let n2 = [0, 0, -1, 0, 0, 0], o = 0, l2 = 0;
    do {
      if (n2[l2 + o] = e.params[i8 + l2], e.hasSubParams(i8 + l2)) {
        let a = e.getSubParams(i8 + l2), u2 = 0;
        do
          n2[1] === 5 && (o = 1), n2[l2 + u2 + 1 + o] = a[u2];
        while (++u2 < a.length && u2 + l2 + 1 + o < n2.length);
        break;
      }
      if (n2[1] === 5 && l2 + o >= 2 || n2[1] === 2 && l2 + o >= 5) break;
      n2[1] && (o = 1);
    } while (++l2 + i8 < e.length && l2 + o < n2.length);
    for (let a = 2; a < n2.length; ++a) n2[a] === -1 && (n2[a] = 0);
    switch (n2[0]) {
      case 38:
        r5.fg = this._updateAttrColor(r5.fg, n2[1], n2[3], n2[4], n2[5]);
        break;
      case 48:
        r5.bg = this._updateAttrColor(r5.bg, n2[1], n2[3], n2[4], n2[5]);
        break;
      case 58:
        r5.extended = r5.extended.clone(), r5.extended.underlineColor = this._updateAttrColor(r5.extended.underlineColor, n2[1], n2[3], n2[4], n2[5]);
    }
    return l2;
  }
  _processUnderline(e, i8) {
    i8.extended = i8.extended.clone(), (!~e || e > 5) && (e = 1), i8.extended.underlineStyle = e, i8.fg |= 268435456, e === 0 && (i8.fg &= -268435457), i8.updateExtended();
  }
  _processSGR0(e) {
    e.fg = X.fg, e.bg = X.bg, e.extended = e.extended.clone(), e.extended.underlineStyle = 0, e.extended.underlineColor &= -67108864, e.updateExtended();
  }
  charAttributes(e) {
    if (e.length === 1 && e.params[0] === 0) return this._processSGR0(this._curAttrData), true;
    let i8 = e.length, r5, n2 = this._curAttrData;
    for (let o = 0; o < i8; o++) r5 = e.params[o], r5 >= 30 && r5 <= 37 ? (n2.fg &= -50331904, n2.fg |= 16777216 | r5 - 30) : r5 >= 40 && r5 <= 47 ? (n2.bg &= -50331904, n2.bg |= 16777216 | r5 - 40) : r5 >= 90 && r5 <= 97 ? (n2.fg &= -50331904, n2.fg |= 16777216 | r5 - 90 | 8) : r5 >= 100 && r5 <= 107 ? (n2.bg &= -50331904, n2.bg |= 16777216 | r5 - 100 | 8) : r5 === 0 ? this._processSGR0(n2) : r5 === 1 ? n2.fg |= 134217728 : r5 === 3 ? n2.bg |= 67108864 : r5 === 4 ? (n2.fg |= 268435456, this._processUnderline(e.hasSubParams(o) ? e.getSubParams(o)[0] : 1, n2)) : r5 === 5 ? n2.fg |= 536870912 : r5 === 7 ? n2.fg |= 67108864 : r5 === 8 ? n2.fg |= 1073741824 : r5 === 9 ? n2.fg |= 2147483648 : r5 === 2 ? n2.bg |= 134217728 : r5 === 21 ? this._processUnderline(2, n2) : r5 === 22 ? (n2.fg &= -134217729, n2.bg &= -134217729) : r5 === 23 ? n2.bg &= -67108865 : r5 === 24 ? (n2.fg &= -268435457, this._processUnderline(0, n2)) : r5 === 25 ? n2.fg &= -536870913 : r5 === 27 ? n2.fg &= -67108865 : r5 === 28 ? n2.fg &= -1073741825 : r5 === 29 ? n2.fg &= 2147483647 : r5 === 39 ? (n2.fg &= -67108864, n2.fg |= X.fg & 16777215) : r5 === 49 ? (n2.bg &= -67108864, n2.bg |= X.bg & 16777215) : r5 === 38 || r5 === 48 || r5 === 58 ? o += this._extractColor(e, o, n2) : r5 === 53 ? n2.bg |= 1073741824 : r5 === 55 ? n2.bg &= -1073741825 : r5 === 59 ? (n2.extended = n2.extended.clone(), n2.extended.underlineColor = -1, n2.updateExtended()) : r5 === 100 ? (n2.fg &= -67108864, n2.fg |= X.fg & 16777215, n2.bg &= -67108864, n2.bg |= X.bg & 16777215) : this._logService.debug("Unknown SGR attribute: %d.", r5);
    return true;
  }
  deviceStatus(e) {
    switch (e.params[0]) {
      case 5:
        this._coreService.triggerDataEvent(`${b.ESC}[0n`);
        break;
      case 6:
        let i8 = this._activeBuffer.y + 1, r5 = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[${i8};${r5}R`);
        break;
    }
    return true;
  }
  deviceStatusPrivate(e) {
    switch (e.params[0]) {
      case 6:
        let i8 = this._activeBuffer.y + 1, r5 = this._activeBuffer.x + 1;
        this._coreService.triggerDataEvent(`${b.ESC}[?${i8};${r5}R`);
        break;
      case 15:
        break;
      case 25:
        break;
      case 26:
        break;
      case 53:
        break;
    }
    return true;
  }
  softReset(e) {
    return this._coreService.isCursorHidden = false, this._onRequestSyncScrollBar.fire(), this._activeBuffer.scrollTop = 0, this._activeBuffer.scrollBottom = this._bufferService.rows - 1, this._curAttrData = X.clone(), this._coreService.reset(), this._charsetService.reset(), this._activeBuffer.savedX = 0, this._activeBuffer.savedY = this._activeBuffer.ybase, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, this._coreService.decPrivateModes.origin = false, true;
  }
  setCursorStyle(e) {
    let i8 = e.length === 0 ? 1 : e.params[0];
    if (i8 === 0) this._coreService.decPrivateModes.cursorStyle = void 0, this._coreService.decPrivateModes.cursorBlink = void 0;
    else {
      switch (i8) {
        case 1:
        case 2:
          this._coreService.decPrivateModes.cursorStyle = "block";
          break;
        case 3:
        case 4:
          this._coreService.decPrivateModes.cursorStyle = "underline";
          break;
        case 5:
        case 6:
          this._coreService.decPrivateModes.cursorStyle = "bar";
          break;
      }
      let r5 = i8 % 2 === 1;
      this._coreService.decPrivateModes.cursorBlink = r5;
    }
    return true;
  }
  setScrollRegion(e) {
    let i8 = e.params[0] || 1, r5;
    return (e.length < 2 || (r5 = e.params[1]) > this._bufferService.rows || r5 === 0) && (r5 = this._bufferService.rows), r5 > i8 && (this._activeBuffer.scrollTop = i8 - 1, this._activeBuffer.scrollBottom = r5 - 1, this._setCursor(0, 0)), true;
  }
  windowOptions(e) {
    if (!bl(e.params[0], this._optionsService.rawOptions.windowOptions)) return true;
    let i8 = e.length > 1 ? e.params[1] : 0;
    switch (e.params[0]) {
      case 14:
        i8 !== 2 && this._onRequestWindowsOptionsReport.fire(0);
        break;
      case 16:
        this._onRequestWindowsOptionsReport.fire(1);
        break;
      case 18:
        this._bufferService && this._coreService.triggerDataEvent(`${b.ESC}[8;${this._bufferService.rows};${this._bufferService.cols}t`);
        break;
      case 22:
        (i8 === 0 || i8 === 2) && (this._windowTitleStack.push(this._windowTitle), this._windowTitleStack.length > _l && this._windowTitleStack.shift()), (i8 === 0 || i8 === 1) && (this._iconNameStack.push(this._iconName), this._iconNameStack.length > _l && this._iconNameStack.shift());
        break;
      case 23:
        (i8 === 0 || i8 === 2) && this._windowTitleStack.length && this.setTitle(this._windowTitleStack.pop()), (i8 === 0 || i8 === 1) && this._iconNameStack.length && this.setIconName(this._iconNameStack.pop());
        break;
    }
    return true;
  }
  saveCursor(e) {
    return this._activeBuffer.savedX = this._activeBuffer.x, this._activeBuffer.savedY = this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.savedCurAttrData.fg = this._curAttrData.fg, this._activeBuffer.savedCurAttrData.bg = this._curAttrData.bg, this._activeBuffer.savedCharset = this._charsetService.charset, true;
  }
  restoreCursor(e) {
    return this._activeBuffer.x = this._activeBuffer.savedX || 0, this._activeBuffer.y = Math.max(this._activeBuffer.savedY - this._activeBuffer.ybase, 0), this._curAttrData.fg = this._activeBuffer.savedCurAttrData.fg, this._curAttrData.bg = this._activeBuffer.savedCurAttrData.bg, this._charsetService.charset = this._savedCharset, this._activeBuffer.savedCharset && (this._charsetService.charset = this._activeBuffer.savedCharset), this._restrictCursor(), true;
  }
  setTitle(e) {
    return this._windowTitle = e, this._onTitleChange.fire(e), true;
  }
  setIconName(e) {
    return this._iconName = e, true;
  }
  setOrReportIndexedColor(e) {
    let i8 = [], r5 = e.split(";");
    for (; r5.length > 1; ) {
      let n2 = r5.shift(), o = r5.shift();
      if (/^\d+$/.exec(n2)) {
        let l2 = parseInt(n2);
        if (Sl(l2)) if (o === "?") i8.push({ type: 0, index: l2 });
        else {
          let a = Ws(o);
          a && i8.push({ type: 1, index: l2, color: a });
        }
      }
    }
    return i8.length && this._onColor.fire(i8), true;
  }
  setHyperlink(e) {
    let i8 = e.indexOf(";");
    if (i8 === -1) return true;
    let r5 = e.slice(0, i8).trim(), n2 = e.slice(i8 + 1);
    return n2 ? this._createHyperlink(r5, n2) : r5.trim() ? false : this._finishHyperlink();
  }
  _createHyperlink(e, i8) {
    this._getCurrentLinkId() && this._finishHyperlink();
    let r5 = e.split(":"), n2, o = r5.findIndex((l2) => l2.startsWith("id="));
    return o !== -1 && (n2 = r5[o].slice(3) || void 0), this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = this._oscLinkService.registerLink({ id: n2, uri: i8 }), this._curAttrData.updateExtended(), true;
  }
  _finishHyperlink() {
    return this._curAttrData.extended = this._curAttrData.extended.clone(), this._curAttrData.extended.urlId = 0, this._curAttrData.updateExtended(), true;
  }
  _setOrReportSpecialColor(e, i8) {
    let r5 = e.split(";");
    for (let n2 = 0; n2 < r5.length && !(i8 >= this._specialColors.length); ++n2, ++i8) if (r5[n2] === "?") this._onColor.fire([{ type: 0, index: this._specialColors[i8] }]);
    else {
      let o = Ws(r5[n2]);
      o && this._onColor.fire([{ type: 1, index: this._specialColors[i8], color: o }]);
    }
    return true;
  }
  setOrReportFgColor(e) {
    return this._setOrReportSpecialColor(e, 0);
  }
  setOrReportBgColor(e) {
    return this._setOrReportSpecialColor(e, 1);
  }
  setOrReportCursorColor(e) {
    return this._setOrReportSpecialColor(e, 2);
  }
  restoreIndexedColor(e) {
    if (!e) return this._onColor.fire([{ type: 2 }]), true;
    let i8 = [], r5 = e.split(";");
    for (let n2 = 0; n2 < r5.length; ++n2) if (/^\d+$/.exec(r5[n2])) {
      let o = parseInt(r5[n2]);
      Sl(o) && i8.push({ type: 2, index: o });
    }
    return i8.length && this._onColor.fire(i8), true;
  }
  restoreFgColor(e) {
    return this._onColor.fire([{ type: 2, index: 256 }]), true;
  }
  restoreBgColor(e) {
    return this._onColor.fire([{ type: 2, index: 257 }]), true;
  }
  restoreCursorColor(e) {
    return this._onColor.fire([{ type: 2, index: 258 }]), true;
  }
  nextLine() {
    return this._activeBuffer.x = 0, this.index(), true;
  }
  keypadApplicationMode() {
    return this._logService.debug("Serial port requested application keypad."), this._coreService.decPrivateModes.applicationKeypad = true, this._onRequestSyncScrollBar.fire(), true;
  }
  keypadNumericMode() {
    return this._logService.debug("Switching back to normal keypad."), this._coreService.decPrivateModes.applicationKeypad = false, this._onRequestSyncScrollBar.fire(), true;
  }
  selectDefaultCharset() {
    return this._charsetService.setgLevel(0), this._charsetService.setgCharset(0, Je), true;
  }
  selectCharset(e) {
    return e.length !== 2 ? (this.selectDefaultCharset(), true) : (e[0] === "/" || this._charsetService.setgCharset(mc[e[0]], ne[e[1]] || Je), true);
  }
  index() {
    return this._restrictCursor(), this._activeBuffer.y++, this._activeBuffer.y === this._activeBuffer.scrollBottom + 1 ? (this._activeBuffer.y--, this._bufferService.scroll(this._eraseAttrData())) : this._activeBuffer.y >= this._bufferService.rows && (this._activeBuffer.y = this._bufferService.rows - 1), this._restrictCursor(), true;
  }
  tabSet() {
    return this._activeBuffer.tabs[this._activeBuffer.x] = true, true;
  }
  reverseIndex() {
    if (this._restrictCursor(), this._activeBuffer.y === this._activeBuffer.scrollTop) {
      let e = this._activeBuffer.scrollBottom - this._activeBuffer.scrollTop;
      this._activeBuffer.lines.shiftElements(this._activeBuffer.ybase + this._activeBuffer.y, e, 1), this._activeBuffer.lines.set(this._activeBuffer.ybase + this._activeBuffer.y, this._activeBuffer.getBlankLine(this._eraseAttrData())), this._dirtyRowTracker.markRangeDirty(this._activeBuffer.scrollTop, this._activeBuffer.scrollBottom);
    } else this._activeBuffer.y--, this._restrictCursor();
    return true;
  }
  fullReset() {
    return this._parser.reset(), this._onRequestReset.fire(), true;
  }
  reset() {
    this._curAttrData = X.clone(), this._eraseAttrDataInternal = X.clone();
  }
  _eraseAttrData() {
    return this._eraseAttrDataInternal.bg &= -67108864, this._eraseAttrDataInternal.bg |= this._curAttrData.bg & 67108863, this._eraseAttrDataInternal;
  }
  setgLevel(e) {
    return this._charsetService.setgLevel(e), true;
  }
  screenAlignmentPattern() {
    let e = new q();
    e.content = 1 << 22 | 69, e.fg = this._curAttrData.fg, e.bg = this._curAttrData.bg, this._setCursor(0, 0);
    for (let i8 = 0; i8 < this._bufferService.rows; ++i8) {
      let r5 = this._activeBuffer.ybase + this._activeBuffer.y + i8, n2 = this._activeBuffer.lines.get(r5);
      n2 && (n2.fill(e), n2.isWrapped = false);
    }
    return this._dirtyRowTracker.markAllDirty(), this._setCursor(0, 0), true;
  }
  requestStatusString(e, i8) {
    let r5 = (a) => (this._coreService.triggerDataEvent(`${b.ESC}${a}${b.ESC}\\`), true), n2 = this._bufferService.buffer, o = this._optionsService.rawOptions, l2 = { block: 2, underline: 4, bar: 6 };
    return r5(e === '"q' ? `P1$r${this._curAttrData.isProtected() ? 1 : 0}"q` : e === '"p' ? 'P1$r61;1"p' : e === "r" ? `P1$r${n2.scrollTop + 1};${n2.scrollBottom + 1}r` : e === "m" ? "P1$r0m" : e === " q" ? `P1$r${l2[o.cursorStyle] - (o.cursorBlink ? 1 : 0)} q` : "P0$r");
  }
  markRangeDirty(e, i8) {
    this._dirtyRowTracker.markRangeDirty(e, i8);
  }
};
var Zi = class {
  constructor(t) {
    this._bufferService = t;
    this.clearRange();
  }
  clearRange() {
    this.start = this._bufferService.buffer.y, this.end = this._bufferService.buffer.y;
  }
  markDirty(t) {
    t < this.start ? this.start = t : t > this.end && (this.end = t);
  }
  markRangeDirty(t, e) {
    t > e && (gl = t, t = e, e = gl), t < this.start && (this.start = t), e > this.end && (this.end = e);
  }
  markAllDirty() {
    this.markRangeDirty(0, this._bufferService.rows - 1);
  }
};
Zi = M([S(0, F)], Zi);
function Sl(s15) {
  return 0 <= s15 && s15 < 256;
}
var _c = 5e7;
var El = 12;
var bc = 50;
var gn = class extends D {
  constructor(e) {
    super();
    this._action = e;
    this._writeBuffer = [];
    this._callbacks = [];
    this._pendingData = 0;
    this._bufferOffset = 0;
    this._isSyncWriting = false;
    this._syncCalls = 0;
    this._didUserInput = false;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
  }
  handleUserInput() {
    this._didUserInput = true;
  }
  writeSync(e, i8) {
    if (i8 !== void 0 && this._syncCalls > i8) {
      this._syncCalls = 0;
      return;
    }
    if (this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(void 0), this._syncCalls++, this._isSyncWriting) return;
    this._isSyncWriting = true;
    let r5;
    for (; r5 = this._writeBuffer.shift(); ) {
      this._action(r5);
      let n2 = this._callbacks.shift();
      n2 && n2();
    }
    this._pendingData = 0, this._bufferOffset = 2147483647, this._isSyncWriting = false, this._syncCalls = 0;
  }
  write(e, i8) {
    if (this._pendingData > _c) throw new Error("write data discarded, use flow control to avoid losing data");
    if (!this._writeBuffer.length) {
      if (this._bufferOffset = 0, this._didUserInput) {
        this._didUserInput = false, this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i8), this._innerWrite();
        return;
      }
      setTimeout(() => this._innerWrite());
    }
    this._pendingData += e.length, this._writeBuffer.push(e), this._callbacks.push(i8);
  }
  _innerWrite(e = 0, i8 = true) {
    let r5 = e || performance.now();
    for (; this._writeBuffer.length > this._bufferOffset; ) {
      let n2 = this._writeBuffer[this._bufferOffset], o = this._action(n2, i8);
      if (o) {
        let a = (u2) => performance.now() - r5 >= El ? setTimeout(() => this._innerWrite(0, u2)) : this._innerWrite(r5, u2);
        o.catch((u2) => (queueMicrotask(() => {
          throw u2;
        }), Promise.resolve(false))).then(a);
        return;
      }
      let l2 = this._callbacks[this._bufferOffset];
      if (l2 && l2(), this._bufferOffset++, this._pendingData -= n2.length, performance.now() - r5 >= El) break;
    }
    this._writeBuffer.length > this._bufferOffset ? (this._bufferOffset > bc && (this._writeBuffer = this._writeBuffer.slice(this._bufferOffset), this._callbacks = this._callbacks.slice(this._bufferOffset), this._bufferOffset = 0), setTimeout(() => this._innerWrite())) : (this._writeBuffer.length = 0, this._callbacks.length = 0, this._pendingData = 0, this._bufferOffset = 0), this._onWriteParsed.fire();
  }
};
var ui = class {
  constructor(t) {
    this._bufferService = t;
    this._nextId = 1;
    this._entriesWithId = /* @__PURE__ */ new Map();
    this._dataByLinkId = /* @__PURE__ */ new Map();
  }
  registerLink(t) {
    let e = this._bufferService.buffer;
    if (t.id === void 0) {
      let a = e.addMarker(e.ybase + e.y), u2 = { data: t, id: this._nextId++, lines: [a] };
      return a.onDispose(() => this._removeMarkerFromLink(u2, a)), this._dataByLinkId.set(u2.id, u2), u2.id;
    }
    let i8 = t, r5 = this._getEntryIdKey(i8), n2 = this._entriesWithId.get(r5);
    if (n2) return this.addLineToLink(n2.id, e.ybase + e.y), n2.id;
    let o = e.addMarker(e.ybase + e.y), l2 = { id: this._nextId++, key: this._getEntryIdKey(i8), data: i8, lines: [o] };
    return o.onDispose(() => this._removeMarkerFromLink(l2, o)), this._entriesWithId.set(l2.key, l2), this._dataByLinkId.set(l2.id, l2), l2.id;
  }
  addLineToLink(t, e) {
    let i8 = this._dataByLinkId.get(t);
    if (i8 && i8.lines.every((r5) => r5.line !== e)) {
      let r5 = this._bufferService.buffer.addMarker(e);
      i8.lines.push(r5), r5.onDispose(() => this._removeMarkerFromLink(i8, r5));
    }
  }
  getLinkData(t) {
    return this._dataByLinkId.get(t)?.data;
  }
  _getEntryIdKey(t) {
    return `${t.id};;${t.uri}`;
  }
  _removeMarkerFromLink(t, e) {
    let i8 = t.lines.indexOf(e);
    i8 !== -1 && (t.lines.splice(i8, 1), t.lines.length === 0 && (t.data.id !== void 0 && this._entriesWithId.delete(t.key), this._dataByLinkId.delete(t.id)));
  }
};
ui = M([S(0, F)], ui);
var Tl = false;
var Sn = class extends D {
  constructor(e) {
    super();
    this._windowsWrappingHeuristics = this._register(new ye());
    this._onBinary = this._register(new v());
    this.onBinary = this._onBinary.event;
    this._onData = this._register(new v());
    this.onData = this._onData.event;
    this._onLineFeed = this._register(new v());
    this.onLineFeed = this._onLineFeed.event;
    this._onResize = this._register(new v());
    this.onResize = this._onResize.event;
    this._onWriteParsed = this._register(new v());
    this.onWriteParsed = this._onWriteParsed.event;
    this._onScroll = this._register(new v());
    this._instantiationService = new ln(), this.optionsService = this._register(new dn(e)), this._instantiationService.setService(H, this.optionsService), this._bufferService = this._register(this._instantiationService.createInstance(ni)), this._instantiationService.setService(F, this._bufferService), this._logService = this._register(this._instantiationService.createInstance(ii)), this._instantiationService.setService(nr, this._logService), this.coreService = this._register(this._instantiationService.createInstance(li)), this._instantiationService.setService(ge, this.coreService), this.coreMouseService = this._register(this._instantiationService.createInstance(ai)), this._instantiationService.setService(rr, this.coreMouseService), this.unicodeService = this._register(this._instantiationService.createInstance(Ae)), this._instantiationService.setService(Js, this.unicodeService), this._charsetService = this._instantiationService.createInstance(pn), this._instantiationService.setService(Zs, this._charsetService), this._oscLinkService = this._instantiationService.createInstance(ui), this._instantiationService.setService(sr, this._oscLinkService), this._inputHandler = this._register(new vn(this._bufferService, this._charsetService, this.coreService, this._logService, this.optionsService, this._oscLinkService, this.coreMouseService, this.unicodeService)), this._register($.forward(this._inputHandler.onLineFeed, this._onLineFeed)), this._register(this._inputHandler), this._register($.forward(this._bufferService.onResize, this._onResize)), this._register($.forward(this.coreService.onData, this._onData)), this._register($.forward(this.coreService.onBinary, this._onBinary)), this._register(this.coreService.onRequestScrollToBottom(() => this.scrollToBottom(true))), this._register(this.coreService.onUserInput(() => this._writeBuffer.handleUserInput())), this._register(this.optionsService.onMultipleOptionChange(["windowsMode", "windowsPty"], () => this._handleWindowsPtyOptionChange())), this._register(this._bufferService.onScroll(() => {
      this._onScroll.fire({ position: this._bufferService.buffer.ydisp }), this._inputHandler.markRangeDirty(this._bufferService.buffer.scrollTop, this._bufferService.buffer.scrollBottom);
    })), this._writeBuffer = this._register(new gn((i8, r5) => this._inputHandler.parse(i8, r5))), this._register($.forward(this._writeBuffer.onWriteParsed, this._onWriteParsed));
  }
  get onScroll() {
    return this._onScrollApi || (this._onScrollApi = this._register(new v()), this._onScroll.event((e) => {
      this._onScrollApi?.fire(e.position);
    })), this._onScrollApi.event;
  }
  get cols() {
    return this._bufferService.cols;
  }
  get rows() {
    return this._bufferService.rows;
  }
  get buffers() {
    return this._bufferService.buffers;
  }
  get options() {
    return this.optionsService.options;
  }
  set options(e) {
    for (let i8 in e) this.optionsService.options[i8] = e[i8];
  }
  write(e, i8) {
    this._writeBuffer.write(e, i8);
  }
  writeSync(e, i8) {
    this._logService.logLevel <= 3 && !Tl && (this._logService.warn("writeSync is unreliable and will be removed soon."), Tl = true), this._writeBuffer.writeSync(e, i8);
  }
  input(e, i8 = true) {
    this.coreService.triggerDataEvent(e, i8);
  }
  resize(e, i8) {
    isNaN(e) || isNaN(i8) || (e = Math.max(e, ks), i8 = Math.max(i8, Cs), this._bufferService.resize(e, i8));
  }
  scroll(e, i8 = false) {
    this._bufferService.scroll(e, i8);
  }
  scrollLines(e, i8) {
    this._bufferService.scrollLines(e, i8);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i8 = e - this._bufferService.buffer.ydisp;
    i8 !== 0 && this.scrollLines(i8);
  }
  registerEscHandler(e, i8) {
    return this._inputHandler.registerEscHandler(e, i8);
  }
  registerDcsHandler(e, i8) {
    return this._inputHandler.registerDcsHandler(e, i8);
  }
  registerCsiHandler(e, i8) {
    return this._inputHandler.registerCsiHandler(e, i8);
  }
  registerOscHandler(e, i8) {
    return this._inputHandler.registerOscHandler(e, i8);
  }
  _setup() {
    this._handleWindowsPtyOptionChange();
  }
  reset() {
    this._inputHandler.reset(), this._bufferService.reset(), this._charsetService.reset(), this.coreService.reset(), this.coreMouseService.reset();
  }
  _handleWindowsPtyOptionChange() {
    let e = false, i8 = this.optionsService.rawOptions.windowsPty;
    i8 && i8.buildNumber !== void 0 && i8.buildNumber !== void 0 ? e = i8.backend === "conpty" && i8.buildNumber < 21376 : this.optionsService.rawOptions.windowsMode && (e = true), e ? this._enableWindowsWrappingHeuristics() : this._windowsWrappingHeuristics.clear();
  }
  _enableWindowsWrappingHeuristics() {
    if (!this._windowsWrappingHeuristics.value) {
      let e = [];
      e.push(this.onLineFeed(Bs.bind(null, this._bufferService))), e.push(this.registerCsiHandler({ final: "H" }, () => (Bs(this._bufferService), false))), this._windowsWrappingHeuristics.value = C(() => {
        for (let i8 of e) i8.dispose();
      });
    }
  }
};
var gc = { 48: ["0", ")"], 49: ["1", "!"], 50: ["2", "@"], 51: ["3", "#"], 52: ["4", "$"], 53: ["5", "%"], 54: ["6", "^"], 55: ["7", "&"], 56: ["8", "*"], 57: ["9", "("], 186: [";", ":"], 187: ["=", "+"], 188: [",", "<"], 189: ["-", "_"], 190: [".", ">"], 191: ["/", "?"], 192: ["`", "~"], 219: ["[", "{"], 220: ["\\", "|"], 221: ["]", "}"], 222: ["'", '"'] };
function Il(s15, t, e, i8) {
  let r5 = { type: 0, cancel: false, key: void 0 }, n2 = (s15.shiftKey ? 1 : 0) | (s15.altKey ? 2 : 0) | (s15.ctrlKey ? 4 : 0) | (s15.metaKey ? 8 : 0);
  switch (s15.keyCode) {
    case 0:
      s15.key === "UIKeyInputUpArrow" ? t ? r5.key = b.ESC + "OA" : r5.key = b.ESC + "[A" : s15.key === "UIKeyInputLeftArrow" ? t ? r5.key = b.ESC + "OD" : r5.key = b.ESC + "[D" : s15.key === "UIKeyInputRightArrow" ? t ? r5.key = b.ESC + "OC" : r5.key = b.ESC + "[C" : s15.key === "UIKeyInputDownArrow" && (t ? r5.key = b.ESC + "OB" : r5.key = b.ESC + "[B");
      break;
    case 8:
      r5.key = s15.ctrlKey ? "\b" : b.DEL, s15.altKey && (r5.key = b.ESC + r5.key);
      break;
    case 9:
      if (s15.shiftKey) {
        r5.key = b.ESC + "[Z";
        break;
      }
      r5.key = b.HT, r5.cancel = true;
      break;
    case 13:
      r5.key = s15.altKey ? b.ESC + b.CR : b.CR, r5.cancel = true;
      break;
    case 27:
      r5.key = b.ESC, s15.altKey && (r5.key = b.ESC + b.ESC), r5.cancel = true;
      break;
    case 37:
      if (s15.metaKey) break;
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "D" : t ? r5.key = b.ESC + "OD" : r5.key = b.ESC + "[D";
      break;
    case 39:
      if (s15.metaKey) break;
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "C" : t ? r5.key = b.ESC + "OC" : r5.key = b.ESC + "[C";
      break;
    case 38:
      if (s15.metaKey) break;
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "A" : t ? r5.key = b.ESC + "OA" : r5.key = b.ESC + "[A";
      break;
    case 40:
      if (s15.metaKey) break;
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "B" : t ? r5.key = b.ESC + "OB" : r5.key = b.ESC + "[B";
      break;
    case 45:
      !s15.shiftKey && !s15.ctrlKey && (r5.key = b.ESC + "[2~");
      break;
    case 46:
      n2 ? r5.key = b.ESC + "[3;" + (n2 + 1) + "~" : r5.key = b.ESC + "[3~";
      break;
    case 36:
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "H" : t ? r5.key = b.ESC + "OH" : r5.key = b.ESC + "[H";
      break;
    case 35:
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "F" : t ? r5.key = b.ESC + "OF" : r5.key = b.ESC + "[F";
      break;
    case 33:
      s15.shiftKey ? r5.type = 2 : s15.ctrlKey ? r5.key = b.ESC + "[5;" + (n2 + 1) + "~" : r5.key = b.ESC + "[5~";
      break;
    case 34:
      s15.shiftKey ? r5.type = 3 : s15.ctrlKey ? r5.key = b.ESC + "[6;" + (n2 + 1) + "~" : r5.key = b.ESC + "[6~";
      break;
    case 112:
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "P" : r5.key = b.ESC + "OP";
      break;
    case 113:
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "Q" : r5.key = b.ESC + "OQ";
      break;
    case 114:
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "R" : r5.key = b.ESC + "OR";
      break;
    case 115:
      n2 ? r5.key = b.ESC + "[1;" + (n2 + 1) + "S" : r5.key = b.ESC + "OS";
      break;
    case 116:
      n2 ? r5.key = b.ESC + "[15;" + (n2 + 1) + "~" : r5.key = b.ESC + "[15~";
      break;
    case 117:
      n2 ? r5.key = b.ESC + "[17;" + (n2 + 1) + "~" : r5.key = b.ESC + "[17~";
      break;
    case 118:
      n2 ? r5.key = b.ESC + "[18;" + (n2 + 1) + "~" : r5.key = b.ESC + "[18~";
      break;
    case 119:
      n2 ? r5.key = b.ESC + "[19;" + (n2 + 1) + "~" : r5.key = b.ESC + "[19~";
      break;
    case 120:
      n2 ? r5.key = b.ESC + "[20;" + (n2 + 1) + "~" : r5.key = b.ESC + "[20~";
      break;
    case 121:
      n2 ? r5.key = b.ESC + "[21;" + (n2 + 1) + "~" : r5.key = b.ESC + "[21~";
      break;
    case 122:
      n2 ? r5.key = b.ESC + "[23;" + (n2 + 1) + "~" : r5.key = b.ESC + "[23~";
      break;
    case 123:
      n2 ? r5.key = b.ESC + "[24;" + (n2 + 1) + "~" : r5.key = b.ESC + "[24~";
      break;
    default:
      if (s15.ctrlKey && !s15.shiftKey && !s15.altKey && !s15.metaKey) s15.keyCode >= 65 && s15.keyCode <= 90 ? r5.key = String.fromCharCode(s15.keyCode - 64) : s15.keyCode === 32 ? r5.key = b.NUL : s15.keyCode >= 51 && s15.keyCode <= 55 ? r5.key = String.fromCharCode(s15.keyCode - 51 + 27) : s15.keyCode === 56 ? r5.key = b.DEL : s15.keyCode === 219 ? r5.key = b.ESC : s15.keyCode === 220 ? r5.key = b.FS : s15.keyCode === 221 && (r5.key = b.GS);
      else if ((!e || i8) && s15.altKey && !s15.metaKey) {
        let l2 = gc[s15.keyCode]?.[s15.shiftKey ? 1 : 0];
        if (l2) r5.key = b.ESC + l2;
        else if (s15.keyCode >= 65 && s15.keyCode <= 90) {
          let a = s15.ctrlKey ? s15.keyCode - 64 : s15.keyCode + 32, u2 = String.fromCharCode(a);
          s15.shiftKey && (u2 = u2.toUpperCase()), r5.key = b.ESC + u2;
        } else if (s15.keyCode === 32) r5.key = b.ESC + (s15.ctrlKey ? b.NUL : " ");
        else if (s15.key === "Dead" && s15.code.startsWith("Key")) {
          let a = s15.code.slice(3, 4);
          s15.shiftKey || (a = a.toLowerCase()), r5.key = b.ESC + a, r5.cancel = true;
        }
      } else e && !s15.altKey && !s15.ctrlKey && !s15.shiftKey && s15.metaKey ? s15.keyCode === 65 && (r5.type = 1) : s15.key && !s15.ctrlKey && !s15.altKey && !s15.metaKey && s15.keyCode >= 48 && s15.key.length === 1 ? r5.key = s15.key : s15.key && s15.ctrlKey && (s15.key === "_" && (r5.key = b.US), s15.key === "@" && (r5.key = b.NUL));
      break;
  }
  return r5;
}
var ee = 0;
var En = class {
  constructor(t) {
    this._getKey = t;
    this._array = [];
    this._insertedValues = [];
    this._flushInsertedTask = new Jt();
    this._isFlushingInserted = false;
    this._deletedIndices = [];
    this._flushDeletedTask = new Jt();
    this._isFlushingDeleted = false;
  }
  clear() {
    this._array.length = 0, this._insertedValues.length = 0, this._flushInsertedTask.clear(), this._isFlushingInserted = false, this._deletedIndices.length = 0, this._flushDeletedTask.clear(), this._isFlushingDeleted = false;
  }
  insert(t) {
    this._flushCleanupDeleted(), this._insertedValues.length === 0 && this._flushInsertedTask.enqueue(() => this._flushInserted()), this._insertedValues.push(t);
  }
  _flushInserted() {
    let t = this._insertedValues.sort((n2, o) => this._getKey(n2) - this._getKey(o)), e = 0, i8 = 0, r5 = new Array(this._array.length + this._insertedValues.length);
    for (let n2 = 0; n2 < r5.length; n2++) i8 >= this._array.length || this._getKey(t[e]) <= this._getKey(this._array[i8]) ? (r5[n2] = t[e], e++) : r5[n2] = this._array[i8++];
    this._array = r5, this._insertedValues.length = 0;
  }
  _flushCleanupInserted() {
    !this._isFlushingInserted && this._insertedValues.length > 0 && this._flushInsertedTask.flush();
  }
  delete(t) {
    if (this._flushCleanupInserted(), this._array.length === 0) return false;
    let e = this._getKey(t);
    if (e === void 0 || (ee = this._search(e), ee === -1) || this._getKey(this._array[ee]) !== e) return false;
    do
      if (this._array[ee] === t) return this._deletedIndices.length === 0 && this._flushDeletedTask.enqueue(() => this._flushDeleted()), this._deletedIndices.push(ee), true;
    while (++ee < this._array.length && this._getKey(this._array[ee]) === e);
    return false;
  }
  _flushDeleted() {
    this._isFlushingDeleted = true;
    let t = this._deletedIndices.sort((n2, o) => n2 - o), e = 0, i8 = new Array(this._array.length - t.length), r5 = 0;
    for (let n2 = 0; n2 < this._array.length; n2++) t[e] === n2 ? e++ : i8[r5++] = this._array[n2];
    this._array = i8, this._deletedIndices.length = 0, this._isFlushingDeleted = false;
  }
  _flushCleanupDeleted() {
    !this._isFlushingDeleted && this._deletedIndices.length > 0 && this._flushDeletedTask.flush();
  }
  *getKeyIterator(t) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      yield this._array[ee];
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  forEachByKey(t, e) {
    if (this._flushCleanupInserted(), this._flushCleanupDeleted(), this._array.length !== 0 && (ee = this._search(t), !(ee < 0 || ee >= this._array.length) && this._getKey(this._array[ee]) === t)) do
      e(this._array[ee]);
    while (++ee < this._array.length && this._getKey(this._array[ee]) === t);
  }
  values() {
    return this._flushCleanupInserted(), this._flushCleanupDeleted(), [...this._array].values();
  }
  _search(t) {
    let e = 0, i8 = this._array.length - 1;
    for (; i8 >= e; ) {
      let r5 = e + i8 >> 1, n2 = this._getKey(this._array[r5]);
      if (n2 > t) i8 = r5 - 1;
      else if (n2 < t) e = r5 + 1;
      else {
        for (; r5 > 0 && this._getKey(this._array[r5 - 1]) === t; ) r5--;
        return r5;
      }
    }
    return e;
  }
};
var Us = 0;
var yl = 0;
var Tn = class extends D {
  constructor() {
    super();
    this._decorations = new En((e) => e?.marker.line);
    this._onDecorationRegistered = this._register(new v());
    this.onDecorationRegistered = this._onDecorationRegistered.event;
    this._onDecorationRemoved = this._register(new v());
    this.onDecorationRemoved = this._onDecorationRemoved.event;
    this._register(C(() => this.reset()));
  }
  get decorations() {
    return this._decorations.values();
  }
  registerDecoration(e) {
    if (e.marker.isDisposed) return;
    let i8 = new Ks(e);
    if (i8) {
      let r5 = i8.marker.onDispose(() => i8.dispose()), n2 = i8.onDispose(() => {
        n2.dispose(), i8 && (this._decorations.delete(i8) && this._onDecorationRemoved.fire(i8), r5.dispose());
      });
      this._decorations.insert(i8), this._onDecorationRegistered.fire(i8);
    }
    return i8;
  }
  reset() {
    for (let e of this._decorations.values()) e.dispose();
    this._decorations.clear();
  }
  *getDecorationsAtCell(e, i8, r5) {
    let n2 = 0, o = 0;
    for (let l2 of this._decorations.getKeyIterator(i8)) n2 = l2.options.x ?? 0, o = n2 + (l2.options.width ?? 1), e >= n2 && e < o && (!r5 || (l2.options.layer ?? "bottom") === r5) && (yield l2);
  }
  forEachDecorationAtCell(e, i8, r5, n2) {
    this._decorations.forEachByKey(i8, (o) => {
      Us = o.options.x ?? 0, yl = Us + (o.options.width ?? 1), e >= Us && e < yl && (!r5 || (o.options.layer ?? "bottom") === r5) && n2(o);
    });
  }
};
var Ks = class extends Ee {
  constructor(e) {
    super();
    this.options = e;
    this.onRenderEmitter = this.add(new v());
    this.onRender = this.onRenderEmitter.event;
    this._onDispose = this.add(new v());
    this.onDispose = this._onDispose.event;
    this._cachedBg = null;
    this._cachedFg = null;
    this.marker = e.marker, this.options.overviewRulerOptions && !this.options.overviewRulerOptions.position && (this.options.overviewRulerOptions.position = "full");
  }
  get backgroundColorRGB() {
    return this._cachedBg === null && (this.options.backgroundColor ? this._cachedBg = z.toColor(this.options.backgroundColor) : this._cachedBg = void 0), this._cachedBg;
  }
  get foregroundColorRGB() {
    return this._cachedFg === null && (this.options.foregroundColor ? this._cachedFg = z.toColor(this.options.foregroundColor) : this._cachedFg = void 0), this._cachedFg;
  }
  dispose() {
    this._onDispose.fire(), super.dispose();
  }
};
var Sc = 1e3;
var In = class {
  constructor(t, e = Sc) {
    this._renderCallback = t;
    this._debounceThresholdMS = e;
    this._lastRefreshMs = 0;
    this._additionalRefreshRequested = false;
  }
  dispose() {
    this._refreshTimeoutID && clearTimeout(this._refreshTimeoutID);
  }
  refresh(t, e, i8) {
    this._rowCount = i8, t = t !== void 0 ? t : 0, e = e !== void 0 ? e : this._rowCount - 1, this._rowStart = this._rowStart !== void 0 ? Math.min(this._rowStart, t) : t, this._rowEnd = this._rowEnd !== void 0 ? Math.max(this._rowEnd, e) : e;
    let r5 = performance.now();
    if (r5 - this._lastRefreshMs >= this._debounceThresholdMS) this._lastRefreshMs = r5, this._innerRefresh();
    else if (!this._additionalRefreshRequested) {
      let n2 = r5 - this._lastRefreshMs, o = this._debounceThresholdMS - n2;
      this._additionalRefreshRequested = true, this._refreshTimeoutID = window.setTimeout(() => {
        this._lastRefreshMs = performance.now(), this._innerRefresh(), this._additionalRefreshRequested = false, this._refreshTimeoutID = void 0;
      }, o);
    }
  }
  _innerRefresh() {
    if (this._rowStart === void 0 || this._rowEnd === void 0 || this._rowCount === void 0) return;
    let t = Math.max(this._rowStart, 0), e = Math.min(this._rowEnd, this._rowCount - 1);
    this._rowStart = void 0, this._rowEnd = void 0, this._renderCallback(t, e);
  }
};
var xl = 20;
var wl = false;
var Tt = class extends D {
  constructor(e, i8, r5, n2) {
    super();
    this._terminal = e;
    this._coreBrowserService = r5;
    this._renderService = n2;
    this._rowColumns = /* @__PURE__ */ new WeakMap();
    this._liveRegionLineCount = 0;
    this._charsToConsume = [];
    this._charsToAnnounce = "";
    let o = this._coreBrowserService.mainDocument;
    this._accessibilityContainer = o.createElement("div"), this._accessibilityContainer.classList.add("xterm-accessibility"), this._rowContainer = o.createElement("div"), this._rowContainer.setAttribute("role", "list"), this._rowContainer.classList.add("xterm-accessibility-tree"), this._rowElements = [];
    for (let l2 = 0; l2 < this._terminal.rows; l2++) this._rowElements[l2] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[l2]);
    if (this._topBoundaryFocusListener = (l2) => this._handleBoundaryFocus(l2, 0), this._bottomBoundaryFocusListener = (l2) => this._handleBoundaryFocus(l2, 1), this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._accessibilityContainer.appendChild(this._rowContainer), this._liveRegion = o.createElement("div"), this._liveRegion.classList.add("live-region"), this._liveRegion.setAttribute("aria-live", "assertive"), this._accessibilityContainer.appendChild(this._liveRegion), this._liveRegionDebouncer = this._register(new In(this._renderRows.bind(this))), !this._terminal.element) throw new Error("Cannot enable accessibility before Terminal.open");
    wl ? (this._accessibilityContainer.classList.add("debug"), this._rowContainer.classList.add("debug"), this._debugRootContainer = o.createElement("div"), this._debugRootContainer.classList.add("xterm"), this._debugRootContainer.appendChild(o.createTextNode("------start a11y------")), this._debugRootContainer.appendChild(this._accessibilityContainer), this._debugRootContainer.appendChild(o.createTextNode("------end a11y------")), this._terminal.element.insertAdjacentElement("afterend", this._debugRootContainer)) : this._terminal.element.insertAdjacentElement("afterbegin", this._accessibilityContainer), this._register(this._terminal.onResize((l2) => this._handleResize(l2.rows))), this._register(this._terminal.onRender((l2) => this._refreshRows(l2.start, l2.end))), this._register(this._terminal.onScroll(() => this._refreshRows())), this._register(this._terminal.onA11yChar((l2) => this._handleChar(l2))), this._register(this._terminal.onLineFeed(() => this._handleChar(`
`))), this._register(this._terminal.onA11yTab((l2) => this._handleTab(l2))), this._register(this._terminal.onKey((l2) => this._handleKey(l2.key))), this._register(this._terminal.onBlur(() => this._clearLiveRegion())), this._register(this._renderService.onDimensionsChange(() => this._refreshRowsDimensions())), this._register(L(o, "selectionchange", () => this._handleSelectionChange())), this._register(this._coreBrowserService.onDprChange(() => this._refreshRowsDimensions())), this._refreshRowsDimensions(), this._refreshRows(), this._register(C(() => {
      wl ? this._debugRootContainer.remove() : this._accessibilityContainer.remove(), this._rowElements.length = 0;
    }));
  }
  _handleTab(e) {
    for (let i8 = 0; i8 < e; i8++) this._handleChar(" ");
  }
  _handleChar(e) {
    this._liveRegionLineCount < xl + 1 && (this._charsToConsume.length > 0 ? this._charsToConsume.shift() !== e && (this._charsToAnnounce += e) : this._charsToAnnounce += e, e === `
` && (this._liveRegionLineCount++, this._liveRegionLineCount === xl + 1 && (this._liveRegion.textContent += _i.get())));
  }
  _clearLiveRegion() {
    this._liveRegion.textContent = "", this._liveRegionLineCount = 0;
  }
  _handleKey(e) {
    this._clearLiveRegion(), /\p{Control}/u.test(e) || this._charsToConsume.push(e);
  }
  _refreshRows(e, i8) {
    this._liveRegionDebouncer.refresh(e, i8, this._terminal.rows);
  }
  _renderRows(e, i8) {
    let r5 = this._terminal.buffer, n2 = r5.lines.length.toString();
    for (let o = e; o <= i8; o++) {
      let l2 = r5.lines.get(r5.ydisp + o), a = [], u2 = l2?.translateToString(true, void 0, void 0, a) || "", h2 = (r5.ydisp + o + 1).toString(), c2 = this._rowElements[o];
      c2 && (u2.length === 0 ? (c2.textContent = "\xA0", this._rowColumns.set(c2, [0, 1])) : (c2.textContent = u2, this._rowColumns.set(c2, a)), c2.setAttribute("aria-posinset", h2), c2.setAttribute("aria-setsize", n2), this._alignRowWidth(c2));
    }
    this._announceCharacters();
  }
  _announceCharacters() {
    this._charsToAnnounce.length !== 0 && (this._liveRegion.textContent += this._charsToAnnounce, this._charsToAnnounce = "");
  }
  _handleBoundaryFocus(e, i8) {
    let r5 = e.target, n2 = this._rowElements[i8 === 0 ? 1 : this._rowElements.length - 2], o = r5.getAttribute("aria-posinset"), l2 = i8 === 0 ? "1" : `${this._terminal.buffer.lines.length}`;
    if (o === l2 || e.relatedTarget !== n2) return;
    let a, u2;
    if (i8 === 0 ? (a = r5, u2 = this._rowElements.pop(), this._rowContainer.removeChild(u2)) : (a = this._rowElements.shift(), u2 = r5, this._rowContainer.removeChild(a)), a.removeEventListener("focus", this._topBoundaryFocusListener), u2.removeEventListener("focus", this._bottomBoundaryFocusListener), i8 === 0) {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.unshift(h2), this._rowContainer.insertAdjacentElement("afterbegin", h2);
    } else {
      let h2 = this._createAccessibilityTreeNode();
      this._rowElements.push(h2), this._rowContainer.appendChild(h2);
    }
    this._rowElements[0].addEventListener("focus", this._topBoundaryFocusListener), this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._terminal.scrollLines(i8 === 0 ? -1 : 1), this._rowElements[i8 === 0 ? 1 : this._rowElements.length - 2].focus(), e.preventDefault(), e.stopImmediatePropagation();
  }
  _handleSelectionChange() {
    if (this._rowElements.length === 0) return;
    let e = this._coreBrowserService.mainDocument.getSelection();
    if (!e) return;
    if (e.isCollapsed) {
      this._rowContainer.contains(e.anchorNode) && this._terminal.clearSelection();
      return;
    }
    if (!e.anchorNode || !e.focusNode) {
      console.error("anchorNode and/or focusNode are null");
      return;
    }
    let i8 = { node: e.anchorNode, offset: e.anchorOffset }, r5 = { node: e.focusNode, offset: e.focusOffset };
    if ((i8.node.compareDocumentPosition(r5.node) & Node.DOCUMENT_POSITION_PRECEDING || i8.node === r5.node && i8.offset > r5.offset) && ([i8, r5] = [r5, i8]), i8.node.compareDocumentPosition(this._rowElements[0]) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_FOLLOWING) && (i8 = { node: this._rowElements[0].childNodes[0], offset: 0 }), !this._rowContainer.contains(i8.node)) return;
    let n2 = this._rowElements.slice(-1)[0];
    if (r5.node.compareDocumentPosition(n2) & (Node.DOCUMENT_POSITION_CONTAINED_BY | Node.DOCUMENT_POSITION_PRECEDING) && (r5 = { node: n2, offset: n2.textContent?.length ?? 0 }), !this._rowContainer.contains(r5.node)) return;
    let o = ({ node: u2, offset: h2 }) => {
      let c2 = u2 instanceof Text ? u2.parentNode : u2, d2 = parseInt(c2?.getAttribute("aria-posinset"), 10) - 1;
      if (isNaN(d2)) return console.warn("row is invalid. Race condition?"), null;
      let _4 = this._rowColumns.get(c2);
      if (!_4) return console.warn("columns is null. Race condition?"), null;
      let p2 = h2 < _4.length ? _4[h2] : _4.slice(-1)[0] + 1;
      return p2 >= this._terminal.cols && (++d2, p2 = 0), { row: d2, column: p2 };
    }, l2 = o(i8), a = o(r5);
    if (!(!l2 || !a)) {
      if (l2.row > a.row || l2.row === a.row && l2.column >= a.column) throw new Error("invalid range");
      this._terminal.select(l2.column, l2.row, (a.row - l2.row) * this._terminal.cols - l2.column + a.column);
    }
  }
  _handleResize(e) {
    this._rowElements[this._rowElements.length - 1].removeEventListener("focus", this._bottomBoundaryFocusListener);
    for (let i8 = this._rowContainer.children.length; i8 < this._terminal.rows; i8++) this._rowElements[i8] = this._createAccessibilityTreeNode(), this._rowContainer.appendChild(this._rowElements[i8]);
    for (; this._rowElements.length > e; ) this._rowContainer.removeChild(this._rowElements.pop());
    this._rowElements[this._rowElements.length - 1].addEventListener("focus", this._bottomBoundaryFocusListener), this._refreshRowsDimensions();
  }
  _createAccessibilityTreeNode() {
    let e = this._coreBrowserService.mainDocument.createElement("div");
    return e.setAttribute("role", "listitem"), e.tabIndex = -1, this._refreshRowDimensions(e), e;
  }
  _refreshRowsDimensions() {
    if (this._renderService.dimensions.css.cell.height) {
      Object.assign(this._accessibilityContainer.style, { width: `${this._renderService.dimensions.css.canvas.width}px`, fontSize: `${this._terminal.options.fontSize}px` }), this._rowElements.length !== this._terminal.rows && this._handleResize(this._terminal.rows);
      for (let e = 0; e < this._terminal.rows; e++) this._refreshRowDimensions(this._rowElements[e]), this._alignRowWidth(this._rowElements[e]);
    }
  }
  _refreshRowDimensions(e) {
    e.style.height = `${this._renderService.dimensions.css.cell.height}px`;
  }
  _alignRowWidth(e) {
    e.style.transform = "";
    let i8 = e.getBoundingClientRect().width, r5 = this._rowColumns.get(e)?.slice(-1)?.[0];
    if (!r5) return;
    let n2 = r5 * this._renderService.dimensions.css.cell.width;
    e.style.transform = `scaleX(${n2 / i8})`;
  }
};
Tt = M([S(1, xt), S(2, ae), S(3, ce)], Tt);
var hi = class extends D {
  constructor(e, i8, r5, n2, o) {
    super();
    this._element = e;
    this._mouseService = i8;
    this._renderService = r5;
    this._bufferService = n2;
    this._linkProviderService = o;
    this._linkCacheDisposables = [];
    this._isMouseOut = true;
    this._wasResized = false;
    this._activeLine = -1;
    this._onShowLinkUnderline = this._register(new v());
    this.onShowLinkUnderline = this._onShowLinkUnderline.event;
    this._onHideLinkUnderline = this._register(new v());
    this.onHideLinkUnderline = this._onHideLinkUnderline.event;
    this._register(C(() => {
      Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0, this._lastMouseEvent = void 0, this._activeProviderReplies?.clear();
    })), this._register(this._bufferService.onResize(() => {
      this._clearCurrentLink(), this._wasResized = true;
    })), this._register(L(this._element, "mouseleave", () => {
      this._isMouseOut = true, this._clearCurrentLink();
    })), this._register(L(this._element, "mousemove", this._handleMouseMove.bind(this))), this._register(L(this._element, "mousedown", this._handleMouseDown.bind(this))), this._register(L(this._element, "mouseup", this._handleMouseUp.bind(this)));
  }
  get currentLink() {
    return this._currentLink;
  }
  _handleMouseMove(e) {
    this._lastMouseEvent = e;
    let i8 = this._positionFromMouseEvent(e, this._element, this._mouseService);
    if (!i8) return;
    this._isMouseOut = false;
    let r5 = e.composedPath();
    for (let n2 = 0; n2 < r5.length; n2++) {
      let o = r5[n2];
      if (o.classList.contains("xterm")) break;
      if (o.classList.contains("xterm-hover")) return;
    }
    (!this._lastBufferCell || i8.x !== this._lastBufferCell.x || i8.y !== this._lastBufferCell.y) && (this._handleHover(i8), this._lastBufferCell = i8);
  }
  _handleHover(e) {
    if (this._activeLine !== e.y || this._wasResized) {
      this._clearCurrentLink(), this._askForLink(e, false), this._wasResized = false;
      return;
    }
    this._currentLink && this._linkAtPosition(this._currentLink.link, e) || (this._clearCurrentLink(), this._askForLink(e, true));
  }
  _askForLink(e, i8) {
    (!this._activeProviderReplies || !i8) && (this._activeProviderReplies?.forEach((n2) => {
      n2?.forEach((o) => {
        o.link.dispose && o.link.dispose();
      });
    }), this._activeProviderReplies = /* @__PURE__ */ new Map(), this._activeLine = e.y);
    let r5 = false;
    for (let [n2, o] of this._linkProviderService.linkProviders.entries()) i8 ? this._activeProviderReplies?.get(n2) && (r5 = this._checkLinkProviderResult(n2, e, r5)) : o.provideLinks(e.y, (l2) => {
      if (this._isMouseOut) return;
      let a = l2?.map((u2) => ({ link: u2 }));
      this._activeProviderReplies?.set(n2, a), r5 = this._checkLinkProviderResult(n2, e, r5), this._activeProviderReplies?.size === this._linkProviderService.linkProviders.length && this._removeIntersectingLinks(e.y, this._activeProviderReplies);
    });
  }
  _removeIntersectingLinks(e, i8) {
    let r5 = /* @__PURE__ */ new Set();
    for (let n2 = 0; n2 < i8.size; n2++) {
      let o = i8.get(n2);
      if (o) for (let l2 = 0; l2 < o.length; l2++) {
        let a = o[l2], u2 = a.link.range.start.y < e ? 0 : a.link.range.start.x, h2 = a.link.range.end.y > e ? this._bufferService.cols : a.link.range.end.x;
        for (let c2 = u2; c2 <= h2; c2++) {
          if (r5.has(c2)) {
            o.splice(l2--, 1);
            break;
          }
          r5.add(c2);
        }
      }
    }
  }
  _checkLinkProviderResult(e, i8, r5) {
    if (!this._activeProviderReplies) return r5;
    let n2 = this._activeProviderReplies.get(e), o = false;
    for (let l2 = 0; l2 < e; l2++) (!this._activeProviderReplies.has(l2) || this._activeProviderReplies.get(l2)) && (o = true);
    if (!o && n2) {
      let l2 = n2.find((a) => this._linkAtPosition(a.link, i8));
      l2 && (r5 = true, this._handleNewLink(l2));
    }
    if (this._activeProviderReplies.size === this._linkProviderService.linkProviders.length && !r5) for (let l2 = 0; l2 < this._activeProviderReplies.size; l2++) {
      let a = this._activeProviderReplies.get(l2)?.find((u2) => this._linkAtPosition(u2.link, i8));
      if (a) {
        r5 = true, this._handleNewLink(a);
        break;
      }
    }
    return r5;
  }
  _handleMouseDown() {
    this._mouseDownLink = this._currentLink;
  }
  _handleMouseUp(e) {
    if (!this._currentLink) return;
    let i8 = this._positionFromMouseEvent(e, this._element, this._mouseService);
    i8 && this._mouseDownLink && Ec(this._mouseDownLink.link, this._currentLink.link) && this._linkAtPosition(this._currentLink.link, i8) && this._currentLink.link.activate(e, this._currentLink.link.text);
  }
  _clearCurrentLink(e, i8) {
    !this._currentLink || !this._lastMouseEvent || (!e || !i8 || this._currentLink.link.range.start.y >= e && this._currentLink.link.range.end.y <= i8) && (this._linkLeave(this._element, this._currentLink.link, this._lastMouseEvent), this._currentLink = void 0, Ne(this._linkCacheDisposables), this._linkCacheDisposables.length = 0);
  }
  _handleNewLink(e) {
    if (!this._lastMouseEvent) return;
    let i8 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
    i8 && this._linkAtPosition(e.link, i8) && (this._currentLink = e, this._currentLink.state = { decorations: { underline: e.link.decorations === void 0 ? true : e.link.decorations.underline, pointerCursor: e.link.decorations === void 0 ? true : e.link.decorations.pointerCursor }, isHovered: true }, this._linkHover(this._element, e.link, this._lastMouseEvent), e.link.decorations = {}, Object.defineProperties(e.link.decorations, { pointerCursor: { get: () => this._currentLink?.state?.decorations.pointerCursor, set: (r5) => {
      this._currentLink?.state && this._currentLink.state.decorations.pointerCursor !== r5 && (this._currentLink.state.decorations.pointerCursor = r5, this._currentLink.state.isHovered && this._element.classList.toggle("xterm-cursor-pointer", r5));
    } }, underline: { get: () => this._currentLink?.state?.decorations.underline, set: (r5) => {
      this._currentLink?.state && this._currentLink?.state?.decorations.underline !== r5 && (this._currentLink.state.decorations.underline = r5, this._currentLink.state.isHovered && this._fireUnderlineEvent(e.link, r5));
    } } }), this._linkCacheDisposables.push(this._renderService.onRenderedViewportChange((r5) => {
      if (!this._currentLink) return;
      let n2 = r5.start === 0 ? 0 : r5.start + 1 + this._bufferService.buffer.ydisp, o = this._bufferService.buffer.ydisp + 1 + r5.end;
      if (this._currentLink.link.range.start.y >= n2 && this._currentLink.link.range.end.y <= o && (this._clearCurrentLink(n2, o), this._lastMouseEvent)) {
        let l2 = this._positionFromMouseEvent(this._lastMouseEvent, this._element, this._mouseService);
        l2 && this._askForLink(l2, false);
      }
    })));
  }
  _linkHover(e, i8, r5) {
    this._currentLink?.state && (this._currentLink.state.isHovered = true, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i8, true), this._currentLink.state.decorations.pointerCursor && e.classList.add("xterm-cursor-pointer")), i8.hover && i8.hover(r5, i8.text);
  }
  _fireUnderlineEvent(e, i8) {
    let r5 = e.range, n2 = this._bufferService.buffer.ydisp, o = this._createLinkUnderlineEvent(r5.start.x - 1, r5.start.y - n2 - 1, r5.end.x, r5.end.y - n2 - 1, void 0);
    (i8 ? this._onShowLinkUnderline : this._onHideLinkUnderline).fire(o);
  }
  _linkLeave(e, i8, r5) {
    this._currentLink?.state && (this._currentLink.state.isHovered = false, this._currentLink.state.decorations.underline && this._fireUnderlineEvent(i8, false), this._currentLink.state.decorations.pointerCursor && e.classList.remove("xterm-cursor-pointer")), i8.leave && i8.leave(r5, i8.text);
  }
  _linkAtPosition(e, i8) {
    let r5 = e.range.start.y * this._bufferService.cols + e.range.start.x, n2 = e.range.end.y * this._bufferService.cols + e.range.end.x, o = i8.y * this._bufferService.cols + i8.x;
    return r5 <= o && o <= n2;
  }
  _positionFromMouseEvent(e, i8, r5) {
    let n2 = r5.getCoords(e, i8, this._bufferService.cols, this._bufferService.rows);
    if (n2) return { x: n2[0], y: n2[1] + this._bufferService.buffer.ydisp };
  }
  _createLinkUnderlineEvent(e, i8, r5, n2, o) {
    return { x1: e, y1: i8, x2: r5, y2: n2, cols: this._bufferService.cols, fg: o };
  }
};
hi = M([S(1, Dt), S(2, ce), S(3, F), S(4, lr)], hi);
function Ec(s15, t) {
  return s15.text === t.text && s15.range.start.x === t.range.start.x && s15.range.start.y === t.range.start.y && s15.range.end.x === t.range.end.x && s15.range.end.y === t.range.end.y;
}
var yn = class extends Sn {
  constructor(e = {}) {
    super(e);
    this._linkifier = this._register(new ye());
    this.browser = tn;
    this._keyDownHandled = false;
    this._keyDownSeen = false;
    this._keyPressHandled = false;
    this._unprocessedDeadKey = false;
    this._accessibilityManager = this._register(new ye());
    this._onCursorMove = this._register(new v());
    this.onCursorMove = this._onCursorMove.event;
    this._onKey = this._register(new v());
    this.onKey = this._onKey.event;
    this._onRender = this._register(new v());
    this.onRender = this._onRender.event;
    this._onSelectionChange = this._register(new v());
    this.onSelectionChange = this._onSelectionChange.event;
    this._onTitleChange = this._register(new v());
    this.onTitleChange = this._onTitleChange.event;
    this._onBell = this._register(new v());
    this.onBell = this._onBell.event;
    this._onFocus = this._register(new v());
    this._onBlur = this._register(new v());
    this._onA11yCharEmitter = this._register(new v());
    this._onA11yTabEmitter = this._register(new v());
    this._onWillOpen = this._register(new v());
    this._setup(), this._decorationService = this._instantiationService.createInstance(Tn), this._instantiationService.setService(Be, this._decorationService), this._linkProviderService = this._instantiationService.createInstance(Qr), this._instantiationService.setService(lr, this._linkProviderService), this._linkProviderService.registerLinkProvider(this._instantiationService.createInstance(wt)), this._register(this._inputHandler.onRequestBell(() => this._onBell.fire())), this._register(this._inputHandler.onRequestRefreshRows((i8) => this.refresh(i8?.start ?? 0, i8?.end ?? this.rows - 1))), this._register(this._inputHandler.onRequestSendFocus(() => this._reportFocus())), this._register(this._inputHandler.onRequestReset(() => this.reset())), this._register(this._inputHandler.onRequestWindowsOptionsReport((i8) => this._reportWindowsOptions(i8))), this._register(this._inputHandler.onColor((i8) => this._handleColorEvent(i8))), this._register($.forward(this._inputHandler.onCursorMove, this._onCursorMove)), this._register($.forward(this._inputHandler.onTitleChange, this._onTitleChange)), this._register($.forward(this._inputHandler.onA11yChar, this._onA11yCharEmitter)), this._register($.forward(this._inputHandler.onA11yTab, this._onA11yTabEmitter)), this._register(this._bufferService.onResize((i8) => this._afterResize(i8.cols, i8.rows))), this._register(C(() => {
      this._customKeyEventHandler = void 0, this.element?.parentNode?.removeChild(this.element);
    }));
  }
  get linkifier() {
    return this._linkifier.value;
  }
  get onFocus() {
    return this._onFocus.event;
  }
  get onBlur() {
    return this._onBlur.event;
  }
  get onA11yChar() {
    return this._onA11yCharEmitter.event;
  }
  get onA11yTab() {
    return this._onA11yTabEmitter.event;
  }
  get onWillOpen() {
    return this._onWillOpen.event;
  }
  _handleColorEvent(e) {
    if (this._themeService) for (let i8 of e) {
      let r5, n2 = "";
      switch (i8.index) {
        case 256:
          r5 = "foreground", n2 = "10";
          break;
        case 257:
          r5 = "background", n2 = "11";
          break;
        case 258:
          r5 = "cursor", n2 = "12";
          break;
        default:
          r5 = "ansi", n2 = "4;" + i8.index;
      }
      switch (i8.type) {
        case 0:
          let o = U.toColorRGB(r5 === "ansi" ? this._themeService.colors.ansi[i8.index] : this._themeService.colors[r5]);
          this.coreService.triggerDataEvent(`${b.ESC}]${n2};${ml(o)}${fs.ST}`);
          break;
        case 1:
          if (r5 === "ansi") this._themeService.modifyColors((l2) => l2.ansi[i8.index] = j.toColor(...i8.color));
          else {
            let l2 = r5;
            this._themeService.modifyColors((a) => a[l2] = j.toColor(...i8.color));
          }
          break;
        case 2:
          this._themeService.restoreColor(i8.index);
          break;
      }
    }
  }
  _setup() {
    super._setup(), this._customKeyEventHandler = void 0;
  }
  get buffer() {
    return this.buffers.active;
  }
  focus() {
    this.textarea && this.textarea.focus({ preventScroll: true });
  }
  _handleScreenReaderModeOptionChange(e) {
    e ? !this._accessibilityManager.value && this._renderService && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)) : this._accessibilityManager.clear();
  }
  _handleTextAreaFocus(e) {
    this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[I"), this.element.classList.add("focus"), this._showCursor(), this._onFocus.fire();
  }
  blur() {
    return this.textarea?.blur();
  }
  _handleTextAreaBlur() {
    this.textarea.value = "", this.refresh(this.buffer.y, this.buffer.y), this.coreService.decPrivateModes.sendFocus && this.coreService.triggerDataEvent(b.ESC + "[O"), this.element.classList.remove("focus"), this._onBlur.fire();
  }
  _syncTextArea() {
    if (!this.textarea || !this.buffer.isCursorInViewport || this._compositionHelper.isComposing || !this._renderService) return;
    let e = this.buffer.ybase + this.buffer.y, i8 = this.buffer.lines.get(e);
    if (!i8) return;
    let r5 = Math.min(this.buffer.x, this.cols - 1), n2 = this._renderService.dimensions.css.cell.height, o = i8.getWidth(r5), l2 = this._renderService.dimensions.css.cell.width * o, a = this.buffer.y * this._renderService.dimensions.css.cell.height, u2 = r5 * this._renderService.dimensions.css.cell.width;
    this.textarea.style.left = u2 + "px", this.textarea.style.top = a + "px", this.textarea.style.width = l2 + "px", this.textarea.style.height = n2 + "px", this.textarea.style.lineHeight = n2 + "px", this.textarea.style.zIndex = "-5";
  }
  _initGlobal() {
    this._bindKeys(), this._register(L(this.element, "copy", (i8) => {
      this.hasSelection() && Vs(i8, this._selectionService);
    }));
    let e = (i8) => qs(i8, this.textarea, this.coreService, this.optionsService);
    this._register(L(this.textarea, "paste", e)), this._register(L(this.element, "paste", e)), Ss ? this._register(L(this.element, "mousedown", (i8) => {
      i8.button === 2 && Pn(i8, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })) : this._register(L(this.element, "contextmenu", (i8) => {
      Pn(i8, this.textarea, this.screenElement, this._selectionService, this.options.rightClickSelectsWord);
    })), Bi && this._register(L(this.element, "auxclick", (i8) => {
      i8.button === 1 && Mn(i8, this.textarea, this.screenElement);
    }));
  }
  _bindKeys() {
    this._register(L(this.textarea, "keyup", (e) => this._keyUp(e), true)), this._register(L(this.textarea, "keydown", (e) => this._keyDown(e), true)), this._register(L(this.textarea, "keypress", (e) => this._keyPress(e), true)), this._register(L(this.textarea, "compositionstart", () => this._compositionHelper.compositionstart())), this._register(L(this.textarea, "compositionupdate", (e) => this._compositionHelper.compositionupdate(e))), this._register(L(this.textarea, "compositionend", () => this._compositionHelper.compositionend())), this._register(L(this.textarea, "input", (e) => this._inputEvent(e), true)), this._register(this.onRender(() => this._compositionHelper.updateCompositionElements()));
  }
  open(e) {
    if (!e) throw new Error("Terminal requires a parent element.");
    if (e.isConnected || this._logService.debug("Terminal.open was called on an element that was not attached to the DOM"), this.element?.ownerDocument.defaultView && this._coreBrowserService) {
      this.element.ownerDocument.defaultView !== this._coreBrowserService.window && (this._coreBrowserService.window = this.element.ownerDocument.defaultView);
      return;
    }
    this._document = e.ownerDocument, this.options.documentOverride && this.options.documentOverride instanceof Document && (this._document = this.optionsService.rawOptions.documentOverride), this.element = this._document.createElement("div"), this.element.dir = "ltr", this.element.classList.add("terminal"), this.element.classList.add("xterm"), e.appendChild(this.element);
    let i8 = this._document.createDocumentFragment();
    this._viewportElement = this._document.createElement("div"), this._viewportElement.classList.add("xterm-viewport"), i8.appendChild(this._viewportElement), this.screenElement = this._document.createElement("div"), this.screenElement.classList.add("xterm-screen"), this._register(L(this.screenElement, "mousemove", (o) => this.updateCursorStyle(o))), this._helperContainer = this._document.createElement("div"), this._helperContainer.classList.add("xterm-helpers"), this.screenElement.appendChild(this._helperContainer), i8.appendChild(this.screenElement);
    let r5 = this.textarea = this._document.createElement("textarea");
    this.textarea.classList.add("xterm-helper-textarea"), this.textarea.setAttribute("aria-label", mi.get()), Ts || this.textarea.setAttribute("aria-multiline", "false"), this.textarea.setAttribute("autocorrect", "off"), this.textarea.setAttribute("autocapitalize", "off"), this.textarea.setAttribute("spellcheck", "false"), this.textarea.tabIndex = 0, this._register(this.optionsService.onSpecificOptionChange("disableStdin", () => r5.readOnly = this.optionsService.rawOptions.disableStdin)), this.textarea.readOnly = this.optionsService.rawOptions.disableStdin, this._coreBrowserService = this._register(this._instantiationService.createInstance(Jr, this.textarea, e.ownerDocument.defaultView ?? window, this._document ?? typeof window < "u" ? window.document : null)), this._instantiationService.setService(ae, this._coreBrowserService), this._register(L(this.textarea, "focus", (o) => this._handleTextAreaFocus(o))), this._register(L(this.textarea, "blur", () => this._handleTextAreaBlur())), this._helperContainer.appendChild(this.textarea), this._charSizeService = this._instantiationService.createInstance(jt, this._document, this._helperContainer), this._instantiationService.setService(nt, this._charSizeService), this._themeService = this._instantiationService.createInstance(ti), this._instantiationService.setService(Re, this._themeService), this._characterJoinerService = this._instantiationService.createInstance(ct), this._instantiationService.setService(or, this._characterJoinerService), this._renderService = this._register(this._instantiationService.createInstance(Qt, this.rows, this.screenElement)), this._instantiationService.setService(ce, this._renderService), this._register(this._renderService.onRenderedViewportChange((o) => this._onRender.fire(o))), this.onResize((o) => this._renderService.resize(o.cols, o.rows)), this._compositionView = this._document.createElement("div"), this._compositionView.classList.add("composition-view"), this._compositionHelper = this._instantiationService.createInstance($t, this.textarea, this._compositionView), this._helperContainer.appendChild(this._compositionView), this._mouseService = this._instantiationService.createInstance(Xt), this._instantiationService.setService(Dt, this._mouseService);
    let n2 = this._linkifier.value = this._register(this._instantiationService.createInstance(hi, this.screenElement));
    this.element.appendChild(i8);
    try {
      this._onWillOpen.fire(this.element);
    } catch {
    }
    this._renderService.hasRenderer() || this._renderService.setRenderer(this._createRenderer()), this._register(this.onCursorMove(() => {
      this._renderService.handleCursorMove(), this._syncTextArea();
    })), this._register(this.onResize(() => this._renderService.handleResize(this.cols, this.rows))), this._register(this.onBlur(() => this._renderService.handleBlur())), this._register(this.onFocus(() => this._renderService.handleFocus())), this._viewport = this._register(this._instantiationService.createInstance(zt, this.element, this.screenElement)), this._register(this._viewport.onRequestScrollLines((o) => {
      super.scrollLines(o, false), this.refresh(0, this.rows - 1);
    })), this._selectionService = this._register(this._instantiationService.createInstance(ei, this.element, this.screenElement, n2)), this._instantiationService.setService(Qs, this._selectionService), this._register(this._selectionService.onRequestScrollLines((o) => this.scrollLines(o.amount, o.suppressScrollEvent))), this._register(this._selectionService.onSelectionChange(() => this._onSelectionChange.fire())), this._register(this._selectionService.onRequestRedraw((o) => this._renderService.handleSelectionChanged(o.start, o.end, o.columnSelectMode))), this._register(this._selectionService.onLinuxMouseSelection((o) => {
      this.textarea.value = o, this.textarea.focus(), this.textarea.select();
    })), this._register($.any(this._onScroll.event, this._inputHandler.onScroll)(() => {
      this._selectionService.refresh(), this._viewport?.queueSync();
    })), this._register(this._instantiationService.createInstance(Gt, this.screenElement)), this._register(L(this.element, "mousedown", (o) => this._selectionService.handleMouseDown(o))), this.coreMouseService.areMouseEventsActive ? (this._selectionService.disable(), this.element.classList.add("enable-mouse-events")) : this._selectionService.enable(), this.options.screenReaderMode && (this._accessibilityManager.value = this._instantiationService.createInstance(Tt, this)), this._register(this.optionsService.onSpecificOptionChange("screenReaderMode", (o) => this._handleScreenReaderModeOptionChange(o))), this.options.overviewRuler.width && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement))), this.optionsService.onSpecificOptionChange("overviewRuler", (o) => {
      !this._overviewRulerRenderer && o && this._viewportElement && this.screenElement && (this._overviewRulerRenderer = this._register(this._instantiationService.createInstance(bt, this._viewportElement, this.screenElement)));
    }), this._charSizeService.measure(), this.refresh(0, this.rows - 1), this._initGlobal(), this.bindMouse();
  }
  _createRenderer() {
    return this._instantiationService.createInstance(Yt, this, this._document, this.element, this.screenElement, this._viewportElement, this._helperContainer, this.linkifier);
  }
  bindMouse() {
    let e = this, i8 = this.element;
    function r5(l2) {
      let a = e._mouseService.getMouseReportCoords(l2, e.screenElement);
      if (!a) return false;
      let u2, h2;
      switch (l2.overrideType || l2.type) {
        case "mousemove":
          h2 = 32, l2.buttons === void 0 ? (u2 = 3, l2.button !== void 0 && (u2 = l2.button < 3 ? l2.button : 3)) : u2 = l2.buttons & 1 ? 0 : l2.buttons & 4 ? 1 : l2.buttons & 2 ? 2 : 3;
          break;
        case "mouseup":
          h2 = 0, u2 = l2.button < 3 ? l2.button : 3;
          break;
        case "mousedown":
          h2 = 1, u2 = l2.button < 3 ? l2.button : 3;
          break;
        case "wheel":
          if (e._customWheelEventHandler && e._customWheelEventHandler(l2) === false) return false;
          let c2 = l2.deltaY;
          if (c2 === 0 || e.coreMouseService.consumeWheelEvent(l2, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return false;
          h2 = c2 < 0 ? 0 : 1, u2 = 4;
          break;
        default:
          return false;
      }
      return h2 === void 0 || u2 === void 0 || u2 > 4 ? false : e.coreMouseService.triggerMouseEvent({ col: a.col, row: a.row, x: a.x, y: a.y, button: u2, action: h2, ctrl: l2.ctrlKey, alt: l2.altKey, shift: l2.shiftKey });
    }
    let n2 = { mouseup: null, wheel: null, mousedrag: null, mousemove: null }, o = { mouseup: (l2) => (r5(l2), l2.buttons || (this._document.removeEventListener("mouseup", n2.mouseup), n2.mousedrag && this._document.removeEventListener("mousemove", n2.mousedrag)), this.cancel(l2)), wheel: (l2) => (r5(l2), this.cancel(l2, true)), mousedrag: (l2) => {
      l2.buttons && r5(l2);
    }, mousemove: (l2) => {
      l2.buttons || r5(l2);
    } };
    this._register(this.coreMouseService.onProtocolChange((l2) => {
      l2 ? (this.optionsService.rawOptions.logLevel === "debug" && this._logService.debug("Binding to mouse events:", this.coreMouseService.explainEvents(l2)), this.element.classList.add("enable-mouse-events"), this._selectionService.disable()) : (this._logService.debug("Unbinding from mouse events."), this.element.classList.remove("enable-mouse-events"), this._selectionService.enable()), l2 & 8 ? n2.mousemove || (i8.addEventListener("mousemove", o.mousemove), n2.mousemove = o.mousemove) : (i8.removeEventListener("mousemove", n2.mousemove), n2.mousemove = null), l2 & 16 ? n2.wheel || (i8.addEventListener("wheel", o.wheel, { passive: false }), n2.wheel = o.wheel) : (i8.removeEventListener("wheel", n2.wheel), n2.wheel = null), l2 & 2 ? n2.mouseup || (n2.mouseup = o.mouseup) : (this._document.removeEventListener("mouseup", n2.mouseup), n2.mouseup = null), l2 & 4 ? n2.mousedrag || (n2.mousedrag = o.mousedrag) : (this._document.removeEventListener("mousemove", n2.mousedrag), n2.mousedrag = null);
    })), this.coreMouseService.activeProtocol = this.coreMouseService.activeProtocol, this._register(L(i8, "mousedown", (l2) => {
      if (l2.preventDefault(), this.focus(), !(!this.coreMouseService.areMouseEventsActive || this._selectionService.shouldForceSelection(l2))) return r5(l2), n2.mouseup && this._document.addEventListener("mouseup", n2.mouseup), n2.mousedrag && this._document.addEventListener("mousemove", n2.mousedrag), this.cancel(l2);
    })), this._register(L(i8, "wheel", (l2) => {
      if (!n2.wheel) {
        if (this._customWheelEventHandler && this._customWheelEventHandler(l2) === false) return false;
        if (!this.buffer.hasScrollback) {
          if (l2.deltaY === 0) return false;
          if (e.coreMouseService.consumeWheelEvent(l2, e._renderService?.dimensions?.device?.cell?.height, e._coreBrowserService?.dpr) === 0) return this.cancel(l2, true);
          let h2 = b.ESC + (this.coreService.decPrivateModes.applicationCursorKeys ? "O" : "[") + (l2.deltaY < 0 ? "A" : "B");
          return this.coreService.triggerDataEvent(h2, true), this.cancel(l2, true);
        }
      }
    }, { passive: false }));
  }
  refresh(e, i8) {
    this._renderService?.refreshRows(e, i8);
  }
  updateCursorStyle(e) {
    this._selectionService?.shouldColumnSelect(e) ? this.element.classList.add("column-select") : this.element.classList.remove("column-select");
  }
  _showCursor() {
    this.coreService.isCursorInitialized || (this.coreService.isCursorInitialized = true, this.refresh(this.buffer.y, this.buffer.y));
  }
  scrollLines(e, i8) {
    this._viewport ? this._viewport.scrollLines(e) : super.scrollLines(e, i8), this.refresh(0, this.rows - 1);
  }
  scrollPages(e) {
    this.scrollLines(e * (this.rows - 1));
  }
  scrollToTop() {
    this.scrollLines(-this._bufferService.buffer.ydisp);
  }
  scrollToBottom(e) {
    e && this._viewport ? this._viewport.scrollToLine(this.buffer.ybase, true) : this.scrollLines(this._bufferService.buffer.ybase - this._bufferService.buffer.ydisp);
  }
  scrollToLine(e) {
    let i8 = e - this._bufferService.buffer.ydisp;
    i8 !== 0 && this.scrollLines(i8);
  }
  paste(e) {
    Cn(e, this.textarea, this.coreService, this.optionsService);
  }
  attachCustomKeyEventHandler(e) {
    this._customKeyEventHandler = e;
  }
  attachCustomWheelEventHandler(e) {
    this._customWheelEventHandler = e;
  }
  registerLinkProvider(e) {
    return this._linkProviderService.registerLinkProvider(e);
  }
  registerCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    let i8 = this._characterJoinerService.register(e);
    return this.refresh(0, this.rows - 1), i8;
  }
  deregisterCharacterJoiner(e) {
    if (!this._characterJoinerService) throw new Error("Terminal must be opened first");
    this._characterJoinerService.deregister(e) && this.refresh(0, this.rows - 1);
  }
  get markers() {
    return this.buffer.markers;
  }
  registerMarker(e) {
    return this.buffer.addMarker(this.buffer.ybase + this.buffer.y + e);
  }
  registerDecoration(e) {
    return this._decorationService.registerDecoration(e);
  }
  hasSelection() {
    return this._selectionService ? this._selectionService.hasSelection : false;
  }
  select(e, i8, r5) {
    this._selectionService.setSelection(e, i8, r5);
  }
  getSelection() {
    return this._selectionService ? this._selectionService.selectionText : "";
  }
  getSelectionPosition() {
    if (!(!this._selectionService || !this._selectionService.hasSelection)) return { start: { x: this._selectionService.selectionStart[0], y: this._selectionService.selectionStart[1] }, end: { x: this._selectionService.selectionEnd[0], y: this._selectionService.selectionEnd[1] } };
  }
  clearSelection() {
    this._selectionService?.clearSelection();
  }
  selectAll() {
    this._selectionService?.selectAll();
  }
  selectLines(e, i8) {
    this._selectionService?.selectLines(e, i8);
  }
  _keyDown(e) {
    if (this._keyDownHandled = false, this._keyDownSeen = true, this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    let i8 = this.browser.isMac && this.options.macOptionIsMeta && e.altKey;
    if (!i8 && !this._compositionHelper.keydown(e)) return this.options.scrollOnUserInput && this.buffer.ybase !== this.buffer.ydisp && this.scrollToBottom(true), false;
    !i8 && (e.key === "Dead" || e.key === "AltGraph") && (this._unprocessedDeadKey = true);
    let r5 = Il(e, this.coreService.decPrivateModes.applicationCursorKeys, this.browser.isMac, this.options.macOptionIsMeta);
    if (this.updateCursorStyle(e), r5.type === 3 || r5.type === 2) {
      let n2 = this.rows - 1;
      return this.scrollLines(r5.type === 2 ? -n2 : n2), this.cancel(e, true);
    }
    if (r5.type === 1 && this.selectAll(), this._isThirdLevelShift(this.browser, e) || (r5.cancel && this.cancel(e, true), !r5.key) || e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90) return true;
    if (this._unprocessedDeadKey) return this._unprocessedDeadKey = false, true;
    if ((r5.key === b.ETX || r5.key === b.CR) && (this.textarea.value = ""), this._onKey.fire({ key: r5.key, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(r5.key, true), !this.optionsService.rawOptions.screenReaderMode || e.altKey || e.ctrlKey) return this.cancel(e, true);
    this._keyDownHandled = true;
  }
  _isThirdLevelShift(e, i8) {
    let r5 = e.isMac && !this.options.macOptionIsMeta && i8.altKey && !i8.ctrlKey && !i8.metaKey || e.isWindows && i8.altKey && i8.ctrlKey && !i8.metaKey || e.isWindows && i8.getModifierState("AltGraph");
    return i8.type === "keypress" ? r5 : r5 && (!i8.keyCode || i8.keyCode > 47);
  }
  _keyUp(e) {
    this._keyDownSeen = false, !(this._customKeyEventHandler && this._customKeyEventHandler(e) === false) && (Tc(e) || this.focus(), this.updateCursorStyle(e), this._keyPressHandled = false);
  }
  _keyPress(e) {
    let i8;
    if (this._keyPressHandled = false, this._keyDownHandled || this._customKeyEventHandler && this._customKeyEventHandler(e) === false) return false;
    if (this.cancel(e), e.charCode) i8 = e.charCode;
    else if (e.which === null || e.which === void 0) i8 = e.keyCode;
    else if (e.which !== 0 && e.charCode !== 0) i8 = e.which;
    else return false;
    return !i8 || (e.altKey || e.ctrlKey || e.metaKey) && !this._isThirdLevelShift(this.browser, e) ? false : (i8 = String.fromCharCode(i8), this._onKey.fire({ key: i8, domEvent: e }), this._showCursor(), this.coreService.triggerDataEvent(i8, true), this._keyPressHandled = true, this._unprocessedDeadKey = false, true);
  }
  _inputEvent(e) {
    if (e.data && e.inputType === "insertText" && (!e.composed || !this._keyDownSeen) && !this.optionsService.rawOptions.screenReaderMode) {
      if (this._keyPressHandled) return false;
      this._unprocessedDeadKey = false;
      let i8 = e.data;
      return this.coreService.triggerDataEvent(i8, true), this.cancel(e), true;
    }
    return false;
  }
  resize(e, i8) {
    if (e === this.cols && i8 === this.rows) {
      this._charSizeService && !this._charSizeService.hasValidSize && this._charSizeService.measure();
      return;
    }
    super.resize(e, i8);
  }
  _afterResize(e, i8) {
    this._charSizeService?.measure();
  }
  clear() {
    if (!(this.buffer.ybase === 0 && this.buffer.y === 0)) {
      this.buffer.clearAllMarkers(), this.buffer.lines.set(0, this.buffer.lines.get(this.buffer.ybase + this.buffer.y)), this.buffer.lines.length = 1, this.buffer.ydisp = 0, this.buffer.ybase = 0, this.buffer.y = 0;
      for (let e = 1; e < this.rows; e++) this.buffer.lines.push(this.buffer.getBlankLine(X));
      this._onScroll.fire({ position: this.buffer.ydisp }), this.refresh(0, this.rows - 1);
    }
  }
  reset() {
    this.options.rows = this.rows, this.options.cols = this.cols;
    let e = this._customKeyEventHandler;
    this._setup(), super.reset(), this._selectionService?.reset(), this._decorationService.reset(), this._customKeyEventHandler = e, this.refresh(0, this.rows - 1);
  }
  clearTextureAtlas() {
    this._renderService?.clearTextureAtlas();
  }
  _reportFocus() {
    this.element?.classList.contains("focus") ? this.coreService.triggerDataEvent(b.ESC + "[I") : this.coreService.triggerDataEvent(b.ESC + "[O");
  }
  _reportWindowsOptions(e) {
    if (this._renderService) switch (e) {
      case 0:
        let i8 = this._renderService.dimensions.css.canvas.width.toFixed(0), r5 = this._renderService.dimensions.css.canvas.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[4;${r5};${i8}t`);
        break;
      case 1:
        let n2 = this._renderService.dimensions.css.cell.width.toFixed(0), o = this._renderService.dimensions.css.cell.height.toFixed(0);
        this.coreService.triggerDataEvent(`${b.ESC}[6;${o};${n2}t`);
        break;
    }
  }
  cancel(e, i8) {
    if (!(!this.options.cancelEvents && !i8)) return e.preventDefault(), e.stopPropagation(), false;
  }
};
function Tc(s15) {
  return s15.keyCode === 16 || s15.keyCode === 17 || s15.keyCode === 18;
}
var xn = class {
  constructor() {
    this._addons = [];
  }
  dispose() {
    for (let t = this._addons.length - 1; t >= 0; t--) this._addons[t].instance.dispose();
  }
  loadAddon(t, e) {
    let i8 = { instance: e, dispose: e.dispose, isDisposed: false };
    this._addons.push(i8), e.dispose = () => this._wrappedAddonDispose(i8), e.activate(t);
  }
  _wrappedAddonDispose(t) {
    if (t.isDisposed) return;
    let e = -1;
    for (let i8 = 0; i8 < this._addons.length; i8++) if (this._addons[i8] === t) {
      e = i8;
      break;
    }
    if (e === -1) throw new Error("Could not dispose an addon that has not been loaded");
    t.isDisposed = true, t.dispose.apply(t.instance), this._addons.splice(e, 1);
  }
};
var wn = class {
  constructor(t) {
    this._line = t;
  }
  get isWrapped() {
    return this._line.isWrapped;
  }
  get length() {
    return this._line.length;
  }
  getCell(t, e) {
    if (!(t < 0 || t >= this._line.length)) return e ? (this._line.loadCell(t, e), e) : this._line.loadCell(t, new q());
  }
  translateToString(t, e, i8) {
    return this._line.translateToString(t, e, i8);
  }
};
var Ji = class {
  constructor(t, e) {
    this._buffer = t;
    this.type = e;
  }
  init(t) {
    return this._buffer = t, this;
  }
  get cursorY() {
    return this._buffer.y;
  }
  get cursorX() {
    return this._buffer.x;
  }
  get viewportY() {
    return this._buffer.ydisp;
  }
  get baseY() {
    return this._buffer.ybase;
  }
  get length() {
    return this._buffer.lines.length;
  }
  getLine(t) {
    let e = this._buffer.lines.get(t);
    if (e) return new wn(e);
  }
  getNullCell() {
    return new q();
  }
};
var Dn = class extends D {
  constructor(e) {
    super();
    this._core = e;
    this._onBufferChange = this._register(new v());
    this.onBufferChange = this._onBufferChange.event;
    this._normal = new Ji(this._core.buffers.normal, "normal"), this._alternate = new Ji(this._core.buffers.alt, "alternate"), this._core.buffers.onBufferActivate(() => this._onBufferChange.fire(this.active));
  }
  get active() {
    if (this._core.buffers.active === this._core.buffers.normal) return this.normal;
    if (this._core.buffers.active === this._core.buffers.alt) return this.alternate;
    throw new Error("Active buffer is neither normal nor alternate");
  }
  get normal() {
    return this._normal.init(this._core.buffers.normal);
  }
  get alternate() {
    return this._alternate.init(this._core.buffers.alt);
  }
};
var Rn = class {
  constructor(t) {
    this._core = t;
  }
  registerCsiHandler(t, e) {
    return this._core.registerCsiHandler(t, (i8) => e(i8.toArray()));
  }
  addCsiHandler(t, e) {
    return this.registerCsiHandler(t, e);
  }
  registerDcsHandler(t, e) {
    return this._core.registerDcsHandler(t, (i8, r5) => e(i8, r5.toArray()));
  }
  addDcsHandler(t, e) {
    return this.registerDcsHandler(t, e);
  }
  registerEscHandler(t, e) {
    return this._core.registerEscHandler(t, e);
  }
  addEscHandler(t, e) {
    return this.registerEscHandler(t, e);
  }
  registerOscHandler(t, e) {
    return this._core.registerOscHandler(t, e);
  }
  addOscHandler(t, e) {
    return this.registerOscHandler(t, e);
  }
};
var Ln = class {
  constructor(t) {
    this._core = t;
  }
  register(t) {
    this._core.unicodeService.register(t);
  }
  get versions() {
    return this._core.unicodeService.versions;
  }
  get activeVersion() {
    return this._core.unicodeService.activeVersion;
  }
  set activeVersion(t) {
    this._core.unicodeService.activeVersion = t;
  }
};
var Ic = ["cols", "rows"];
var Ue = 0;
var Dl = class extends D {
  constructor(t) {
    super(), this._core = this._register(new yn(t)), this._addonManager = this._register(new xn()), this._publicOptions = { ...this._core.options };
    let e = (r5) => this._core.options[r5], i8 = (r5, n2) => {
      this._checkReadonlyOptions(r5), this._core.options[r5] = n2;
    };
    for (let r5 in this._core.options) {
      let n2 = { get: e.bind(this, r5), set: i8.bind(this, r5) };
      Object.defineProperty(this._publicOptions, r5, n2);
    }
  }
  _checkReadonlyOptions(t) {
    if (Ic.includes(t)) throw new Error(`Option "${t}" can only be set in the constructor`);
  }
  _checkProposedApi() {
    if (!this._core.optionsService.rawOptions.allowProposedApi) throw new Error("You must set the allowProposedApi option to true to use proposed API");
  }
  get onBell() {
    return this._core.onBell;
  }
  get onBinary() {
    return this._core.onBinary;
  }
  get onCursorMove() {
    return this._core.onCursorMove;
  }
  get onData() {
    return this._core.onData;
  }
  get onKey() {
    return this._core.onKey;
  }
  get onLineFeed() {
    return this._core.onLineFeed;
  }
  get onRender() {
    return this._core.onRender;
  }
  get onResize() {
    return this._core.onResize;
  }
  get onScroll() {
    return this._core.onScroll;
  }
  get onSelectionChange() {
    return this._core.onSelectionChange;
  }
  get onTitleChange() {
    return this._core.onTitleChange;
  }
  get onWriteParsed() {
    return this._core.onWriteParsed;
  }
  get element() {
    return this._core.element;
  }
  get parser() {
    return this._parser || (this._parser = new Rn(this._core)), this._parser;
  }
  get unicode() {
    return this._checkProposedApi(), new Ln(this._core);
  }
  get textarea() {
    return this._core.textarea;
  }
  get rows() {
    return this._core.rows;
  }
  get cols() {
    return this._core.cols;
  }
  get buffer() {
    return this._buffer || (this._buffer = this._register(new Dn(this._core))), this._buffer;
  }
  get markers() {
    return this._checkProposedApi(), this._core.markers;
  }
  get modes() {
    let t = this._core.coreService.decPrivateModes, e = "none";
    switch (this._core.coreMouseService.activeProtocol) {
      case "X10":
        e = "x10";
        break;
      case "VT200":
        e = "vt200";
        break;
      case "DRAG":
        e = "drag";
        break;
      case "ANY":
        e = "any";
        break;
    }
    return { applicationCursorKeysMode: t.applicationCursorKeys, applicationKeypadMode: t.applicationKeypad, bracketedPasteMode: t.bracketedPasteMode, insertMode: this._core.coreService.modes.insertMode, mouseTrackingMode: e, originMode: t.origin, reverseWraparoundMode: t.reverseWraparound, sendFocusMode: t.sendFocus, synchronizedOutputMode: t.synchronizedOutput, wraparoundMode: t.wraparound };
  }
  get options() {
    return this._publicOptions;
  }
  set options(t) {
    for (let e in t) this._publicOptions[e] = t[e];
  }
  blur() {
    this._core.blur();
  }
  focus() {
    this._core.focus();
  }
  input(t, e = true) {
    this._core.input(t, e);
  }
  resize(t, e) {
    this._verifyIntegers(t, e), this._core.resize(t, e);
  }
  open(t) {
    this._core.open(t);
  }
  attachCustomKeyEventHandler(t) {
    this._core.attachCustomKeyEventHandler(t);
  }
  attachCustomWheelEventHandler(t) {
    this._core.attachCustomWheelEventHandler(t);
  }
  registerLinkProvider(t) {
    return this._core.registerLinkProvider(t);
  }
  registerCharacterJoiner(t) {
    return this._checkProposedApi(), this._core.registerCharacterJoiner(t);
  }
  deregisterCharacterJoiner(t) {
    this._checkProposedApi(), this._core.deregisterCharacterJoiner(t);
  }
  registerMarker(t = 0) {
    return this._verifyIntegers(t), this._core.registerMarker(t);
  }
  registerDecoration(t) {
    return this._checkProposedApi(), this._verifyPositiveIntegers(t.x ?? 0, t.width ?? 0, t.height ?? 0), this._core.registerDecoration(t);
  }
  hasSelection() {
    return this._core.hasSelection();
  }
  select(t, e, i8) {
    this._verifyIntegers(t, e, i8), this._core.select(t, e, i8);
  }
  getSelection() {
    return this._core.getSelection();
  }
  getSelectionPosition() {
    return this._core.getSelectionPosition();
  }
  clearSelection() {
    this._core.clearSelection();
  }
  selectAll() {
    this._core.selectAll();
  }
  selectLines(t, e) {
    this._verifyIntegers(t, e), this._core.selectLines(t, e);
  }
  dispose() {
    super.dispose();
  }
  scrollLines(t) {
    this._verifyIntegers(t), this._core.scrollLines(t);
  }
  scrollPages(t) {
    this._verifyIntegers(t), this._core.scrollPages(t);
  }
  scrollToTop() {
    this._core.scrollToTop();
  }
  scrollToBottom() {
    this._core.scrollToBottom();
  }
  scrollToLine(t) {
    this._verifyIntegers(t), this._core.scrollToLine(t);
  }
  clear() {
    this._core.clear();
  }
  write(t, e) {
    this._core.write(t, e);
  }
  writeln(t, e) {
    this._core.write(t), this._core.write(`\r
`, e);
  }
  paste(t) {
    this._core.paste(t);
  }
  refresh(t, e) {
    this._verifyIntegers(t, e), this._core.refresh(t, e);
  }
  reset() {
    this._core.reset();
  }
  clearTextureAtlas() {
    this._core.clearTextureAtlas();
  }
  loadAddon(t) {
    this._addonManager.loadAddon(this, t);
  }
  static get strings() {
    return { get promptLabel() {
      return mi.get();
    }, set promptLabel(t) {
      mi.set(t);
    }, get tooMuchOutput() {
      return _i.get();
    }, set tooMuchOutput(t) {
      _i.set(t);
    } };
  }
  _verifyIntegers(...t) {
    for (Ue of t) if (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0) throw new Error("This API only accepts integers");
  }
  _verifyPositiveIntegers(...t) {
    for (Ue of t) if (Ue && (Ue === 1 / 0 || isNaN(Ue) || Ue % 1 !== 0 || Ue < 0)) throw new Error("This API only accepts positive integers");
  }
};

// node_modules/@xterm/addon-unicode11/lib/addon-unicode11.mjs
var ue2 = [[768, 879], [1155, 1158], [1160, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1539], [1552, 1557], [1611, 1630], [1648, 1648], [1750, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2305, 2306], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2388], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2672, 2673], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2883], [2893, 2893], [2902, 2902], [2946, 2946], [3008, 3008], [3021, 3021], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3393, 3395], [3405, 3405], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3769], [3771, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3984, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4146], [4150, 4151], [4153, 4153], [4184, 4185], [4448, 4607], [4959, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6157], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7616, 7626], [7678, 7679], [8203, 8207], [8234, 8238], [8288, 8291], [8298, 8303], [8400, 8431], [12330, 12335], [12441, 12442], [43014, 43014], [43019, 43019], [43045, 43046], [64286, 64286], [65024, 65039], [65056, 65059], [65279, 65279], [65529, 65531]];
var qe2 = [[68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [917505, 917505], [917536, 917631], [917760, 917999]];
var A;
function He2(r5, e) {
  let t = 0, n2 = e.length - 1, o;
  if (r5 < e[0][0] || r5 > e[n2][1]) return false;
  for (; n2 >= t; ) if (o = t + n2 >> 1, r5 > e[o][1]) t = o + 1;
  else if (r5 < e[o][0]) n2 = o - 1;
  else return true;
  return false;
}
var H2 = class {
  constructor() {
    this.version = "6";
    if (!A) {
      A = new Uint8Array(65536), A.fill(1), A[0] = 0, A.fill(0, 1, 32), A.fill(0, 127, 160), A.fill(2, 4352, 4448), A[9001] = 2, A[9002] = 2, A.fill(2, 11904, 42192), A[12351] = 1, A.fill(2, 44032, 55204), A.fill(2, 63744, 64256), A.fill(2, 65040, 65050), A.fill(2, 65072, 65136), A.fill(2, 65280, 65377), A.fill(2, 65504, 65511);
      for (let e = 0; e < ue2.length; ++e) A.fill(0, ue2[e][0], ue2[e][1] + 1);
    }
  }
  wcwidth(e) {
    return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? A[e] : He2(e, qe2) ? 0 : e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141 ? 2 : 1;
  }
  charProperties(e, t) {
    let n2 = this.wcwidth(e), o = n2 === 0 && t !== 0;
    if (o) {
      let d2 = w.extractWidth(t);
      d2 === 0 ? o = false : d2 > n2 && (n2 = d2);
    }
    return w.createPropertyValue(0, n2, o);
  }
};
var de2 = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(e) {
      setTimeout(() => {
        throw e.stack ? J2.isErrorNoTelemetry(e) ? new J2(e.message + `

` + e.stack) : new Error(e.message + `

` + e.stack) : e;
      }, 0);
    };
  }
  addListener(e) {
    return this.listeners.push(e), () => {
      this._removeListener(e);
    };
  }
  emit(e) {
    this.listeners.forEach((t) => {
      t(e);
    });
  }
  _removeListener(e) {
    this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  setUnexpectedErrorHandler(e) {
    this.unexpectedErrorHandler = e;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(e) {
    this.unexpectedErrorHandler(e), this.emit(e);
  }
  onUnexpectedExternalError(e) {
    this.unexpectedErrorHandler(e);
  }
};
var Ge = new de2();
function Y2(r5) {
  Je2(r5) || Ge.onUnexpectedError(r5);
}
var ce2 = "Canceled";
function Je2(r5) {
  return r5 instanceof G2 ? true : r5 instanceof Error && r5.name === ce2 && r5.message === ce2;
}
var G2 = class extends Error {
  constructor() {
    super(ce2), this.name = this.message;
  }
};
var J2 = class r extends Error {
  constructor(e) {
    super(e), this.name = "CodeExpectedError";
  }
  static fromError(e) {
    if (e instanceof r) return e;
    let t = new r();
    return t.message = e.message, t.stack = e.stack, t;
  }
  static isErrorNoTelemetry(e) {
    return e.name === "CodeExpectedError";
  }
};
function pe2(r5, e) {
  let t = this, n2 = false, o;
  return function() {
    if (n2) return o;
    if (n2 = true, e) try {
      o = r5.apply(t, arguments);
    } finally {
      e();
    }
    else o = r5.apply(t, arguments);
    return o;
  };
}
function Ye2(r5, e, t = 0, n2 = r5.length) {
  let o = t, d2 = n2;
  for (; o < d2; ) {
    let v4 = Math.floor((o + d2) / 2);
    e(r5[v4]) ? o = v4 + 1 : d2 = v4;
  }
  return o - 1;
}
var X2 = class X3 {
  constructor(e) {
    this._array = e;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(e) {
    if (X3.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let n2 of this._array) if (this._prevFindLastPredicate(n2) && !e(n2)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = e;
    }
    let t = Ye2(this._array, e, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = t + 1, t === -1 ? void 0 : this._array[t];
  }
};
X2.assertInvariants = false;
var Be2;
((E2) => {
  function r5(p2) {
    return p2 < 0;
  }
  E2.isLessThan = r5;
  function e(p2) {
    return p2 <= 0;
  }
  E2.isLessThanOrEqual = e;
  function t(p2) {
    return p2 > 0;
  }
  E2.isGreaterThan = t;
  function n2(p2) {
    return p2 === 0;
  }
  E2.isNeitherLessOrGreaterThan = n2, E2.greaterThan = 1, E2.lessThan = -1, E2.neitherLessOrGreaterThan = 0;
})(Be2 ||= {});
function we2(r5, e) {
  return (t, n2) => e(r5(t), r5(n2));
}
var ke2 = (r5, e) => r5 - e;
var R = class R2 {
  constructor(e) {
    this.iterate = e;
  }
  forEach(e) {
    this.iterate((t) => (e(t), true));
  }
  toArray() {
    let e = [];
    return this.iterate((t) => (e.push(t), true)), e;
  }
  filter(e) {
    return new R2((t) => this.iterate((n2) => e(n2) ? t(n2) : true));
  }
  map(e) {
    return new R2((t) => this.iterate((n2) => t(e(n2))));
  }
  some(e) {
    let t = false;
    return this.iterate((n2) => (t = e(n2), !t)), t;
  }
  findFirst(e) {
    let t;
    return this.iterate((n2) => e(n2) ? (t = n2, false) : true), t;
  }
  findLast(e) {
    let t;
    return this.iterate((n2) => (e(n2) && (t = n2), true)), t;
  }
  findLastMaxBy(e) {
    let t, n2 = true;
    return this.iterate((o) => ((n2 || Be2.isGreaterThan(e(o, t))) && (n2 = false, t = o), true)), t;
  }
};
R.empty = new R((e) => {
});
function Oe(r5, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n2 of r5) {
    let o = e(n2), d2 = t[o];
    d2 || (d2 = t[o] = []), d2.push(n2);
  }
  return t;
}
var Se2;
var Re2;
var Le2 = class {
  constructor(e, t) {
    this.toKey = t;
    this._map = /* @__PURE__ */ new Map();
    this[Se2] = "SetWithKey";
    for (let n2 of e) this.add(n2);
  }
  get size() {
    return this._map.size;
  }
  add(e) {
    let t = this.toKey(e);
    return this._map.set(t, e), this;
  }
  delete(e) {
    return this._map.delete(this.toKey(e));
  }
  has(e) {
    return this._map.has(this.toKey(e));
  }
  *entries() {
    for (let e of this._map.values()) yield [e, e];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let e of this._map.values()) yield e;
  }
  clear() {
    this._map.clear();
  }
  forEach(e, t) {
    this._map.forEach((n2) => e.call(t, n2, n2, this));
  }
  [(Re2 = Symbol.iterator, Se2 = Symbol.toStringTag, Re2)]() {
    return this.values();
  }
};
var Z = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(e, t) {
    let n2 = this.map.get(e);
    n2 || (n2 = /* @__PURE__ */ new Set(), this.map.set(e, n2)), n2.add(t);
  }
  delete(e, t) {
    let n2 = this.map.get(e);
    n2 && (n2.delete(t), n2.size === 0 && this.map.delete(e));
  }
  forEach(e, t) {
    let n2 = this.map.get(e);
    n2 && n2.forEach(t);
  }
  get(e) {
    let t = this.map.get(e);
    return t || /* @__PURE__ */ new Set();
  }
};
var fe2;
((le2) => {
  function r5(u2) {
    return u2 && typeof u2 == "object" && typeof u2[Symbol.iterator] == "function";
  }
  le2.is = r5;
  let e = Object.freeze([]);
  function t() {
    return e;
  }
  le2.empty = t;
  function* n2(u2) {
    yield u2;
  }
  le2.single = n2;
  function o(u2) {
    return r5(u2) ? u2 : n2(u2);
  }
  le2.wrap = o;
  function d2(u2) {
    return u2 || e;
  }
  le2.from = d2;
  function* v4(u2) {
    for (let f2 = u2.length - 1; f2 >= 0; f2--) yield u2[f2];
  }
  le2.reverse = v4;
  function E2(u2) {
    return !u2 || u2[Symbol.iterator]().next().done === true;
  }
  le2.isEmpty = E2;
  function p2(u2) {
    return u2[Symbol.iterator]().next().value;
  }
  le2.first = p2;
  function b3(u2, f2) {
    let m2 = 0;
    for (let g3 of u2) if (f2(g3, m2++)) return true;
    return false;
  }
  le2.some = b3;
  function D4(u2, f2) {
    for (let m2 of u2) if (f2(m2)) return m2;
  }
  le2.find = D4;
  function* T2(u2, f2) {
    for (let m2 of u2) f2(m2) && (yield m2);
  }
  le2.filter = T2;
  function* B4(u2, f2) {
    let m2 = 0;
    for (let g3 of u2) yield f2(g3, m2++);
  }
  le2.map = B4;
  function* L3(u2, f2) {
    let m2 = 0;
    for (let g3 of u2) yield* f2(g3, m2++);
  }
  le2.flatMap = L3;
  function* oe(...u2) {
    for (let f2 of u2) yield* f2;
  }
  le2.concat = oe;
  function z4(u2, f2, m2) {
    let g3 = m2;
    for (let W of u2) g3 = f2(g3, W);
    return g3;
  }
  le2.reduce = z4;
  function* k4(u2, f2, m2 = u2.length) {
    for (f2 < 0 && (f2 += u2.length), m2 < 0 ? m2 += u2.length : m2 > u2.length && (m2 = u2.length); f2 < m2; f2++) yield u2[f2];
  }
  le2.slice = k4;
  function ae3(u2, f2 = Number.POSITIVE_INFINITY) {
    let m2 = [];
    if (f2 === 0) return [m2, u2];
    let g3 = u2[Symbol.iterator]();
    for (let W = 0; W < f2; W++) {
      let xe3 = g3.next();
      if (xe3.done) return [m2, le2.empty()];
      m2.push(xe3.value);
    }
    return [m2, { [Symbol.iterator]() {
      return g3;
    } }];
  }
  le2.consume = ae3;
  async function V3(u2) {
    let f2 = [];
    for await (let m2 of u2) f2.push(m2);
    return Promise.resolve(f2);
  }
  le2.asyncToArray = V3;
})(fe2 ||= {});
var Xe2 = false;
var O = null;
var ee2 = class ee3 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(e) {
    let t = this.livingDisposables.get(e);
    return t || (t = { parent: null, source: null, isSingleton: false, value: e, idx: ee3.idx++ }, this.livingDisposables.set(e, t)), t;
  }
  trackDisposable(e) {
    let t = this.getDisposableData(e);
    t.source || (t.source = new Error().stack);
  }
  setParent(e, t) {
    let n2 = this.getDisposableData(e);
    n2.parent = t;
  }
  markAsDisposed(e) {
    this.livingDisposables.delete(e);
  }
  markAsSingleton(e) {
    this.getDisposableData(e).isSingleton = true;
  }
  getRootParent(e, t) {
    let n2 = t.get(e);
    if (n2) return n2;
    let o = e.parent ? this.getRootParent(this.getDisposableData(e.parent), t) : e;
    return t.set(e, o), o;
  }
  getTrackedDisposables() {
    let e = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, n2]) => n2.source !== null && !this.getRootParent(n2, e).isSingleton).flatMap(([n2]) => n2);
  }
  computeLeakingDisposables(e = 10, t) {
    let n2;
    if (t) n2 = t;
    else {
      let p2 = /* @__PURE__ */ new Map(), b3 = [...this.livingDisposables.values()].filter((T2) => T2.source !== null && !this.getRootParent(T2, p2).isSingleton);
      if (b3.length === 0) return;
      let D4 = new Set(b3.map((T2) => T2.value));
      if (n2 = b3.filter((T2) => !(T2.parent && D4.has(T2.parent))), n2.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!n2) return;
    function o(p2) {
      function b3(T2, B4) {
        for (; T2.length > 0 && B4.some((L3) => typeof L3 == "string" ? L3 === T2[0] : T2[0].match(L3)); ) T2.shift();
      }
      let D4 = p2.source.split(`
`).map((T2) => T2.trim().replace("at ", "")).filter((T2) => T2 !== "");
      return b3(D4, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), D4.reverse();
    }
    let d2 = new Z();
    for (let p2 of n2) {
      let b3 = o(p2);
      for (let D4 = 0; D4 <= b3.length; D4++) d2.add(b3.slice(0, D4).join(`
`), p2);
    }
    n2.sort(we2((p2) => p2.idx, ke2));
    let v4 = "", E2 = 0;
    for (let p2 of n2.slice(0, e)) {
      E2++;
      let b3 = o(p2), D4 = [];
      for (let T2 = 0; T2 < b3.length; T2++) {
        let B4 = b3[T2];
        B4 = `(shared with ${d2.get(b3.slice(0, T2 + 1).join(`
`)).size}/${n2.length} leaks) at ${B4}`;
        let oe = d2.get(b3.slice(0, T2).join(`
`)), z4 = Oe([...oe].map((k4) => o(k4)[T2]), (k4) => k4);
        delete z4[b3[T2]];
        for (let [k4, ae3] of Object.entries(z4)) D4.unshift(`    - stacktraces of ${ae3.length} other leaks continue with ${k4}`);
        D4.unshift(B4);
      }
      v4 += `


==================== Leaking disposable ${E2}/${n2.length}: ${p2.value.constructor.name} ====================
${D4.join(`
`)}
============================================================

`;
    }
    return n2.length > e && (v4 += `


... and ${n2.length - e} more leaking disposables

`), { leaks: n2, details: v4 };
  }
};
ee2.idx = 0;
function Ze2(r5) {
  O = r5;
}
if (Xe2) {
  let r5 = "__is_disposable_tracked__";
  Ze2(new class {
    trackDisposable(e) {
      let t = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        e[r5] || console.log(t);
      }, 3e3);
    }
    setParent(e, t) {
      if (e && e !== _.None) try {
        e[r5] = true;
      } catch {
      }
    }
    markAsDisposed(e) {
      if (e && e !== _.None) try {
        e[r5] = true;
      } catch {
      }
    }
    markAsSingleton(e) {
    }
  }());
}
function Te2(r5) {
  return O?.trackDisposable(r5), r5;
}
function ve2(r5) {
  O?.markAsDisposed(r5);
}
function he2(r5, e) {
  O?.setParent(r5, e);
}
function et(r5, e) {
  if (O) for (let t of r5) O.setParent(t, e);
}
function Pe(r5) {
  if (fe2.is(r5)) {
    let e = [];
    for (let t of r5) if (t) try {
      t.dispose();
    } catch (n2) {
      e.push(n2);
    }
    if (e.length === 1) throw e[0];
    if (e.length > 1) throw new AggregateError(e, "Encountered errors while disposing of store");
    return Array.isArray(r5) ? [] : r5;
  } else if (r5) return r5.dispose(), r5;
}
function Me(...r5) {
  let e = me(() => Pe(r5));
  return et(r5, e), e;
}
function me(r5) {
  let e = Te2({ dispose: pe2(() => {
    ve2(e), r5();
  }) });
  return e;
}
var te = class te2 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    Te2(this);
  }
  dispose() {
    this._isDisposed || (ve2(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      Pe(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(e) {
    if (!e) return e;
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return he2(e, this), this._isDisposed ? te2.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(e), e;
  }
  delete(e) {
    if (e) {
      if (e === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(e), e.dispose();
    }
  }
  deleteAndLeak(e) {
    e && this._toDispose.has(e) && (this._toDispose.delete(e), he2(e, null));
  }
};
te.DISABLE_DISPOSED_WARNING = false;
var U2 = te;
var _ = class {
  constructor() {
    this._store = new U2();
    Te2(this), he2(this._store, this);
  }
  dispose() {
    ve2(this), this._store.dispose();
  }
  _register(e) {
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(e);
  }
};
_.None = Object.freeze({ dispose() {
} });
var P = class P2 {
  constructor(e) {
    this.element = e, this.next = P2.Undefined, this.prev = P2.Undefined;
  }
};
P.Undefined = new P(void 0);
var tt = globalThis.performance && typeof globalThis.performance.now == "function";
var ne2 = class r2 {
  static create(e) {
    return new r2(e);
  }
  constructor(e) {
    this._now = tt && e === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var nt2 = false;
var Ve2 = false;
var rt2 = false;
var it;
((Q6) => {
  Q6.None = () => _.None;
  function e(l2) {
    if (rt2) {
      let { onDidAddListener: i8 } = l2, a = K2.create(), s15 = 0;
      l2.onDidAddListener = () => {
        ++s15 === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), a.print()), i8?.();
      };
    }
  }
  function t(l2, i8) {
    return B4(l2, () => {
    }, 0, void 0, true, void 0, i8);
  }
  Q6.defer = t;
  function n2(l2) {
    return (i8, a = null, s15) => {
      let x2 = false, c2;
      return c2 = l2((h2) => {
        if (!x2) return c2 ? c2.dispose() : x2 = true, i8.call(a, h2);
      }, null, s15), x2 && c2.dispose(), c2;
    };
  }
  Q6.once = n2;
  function o(l2, i8, a) {
    return D4((s15, x2 = null, c2) => l2((h2) => s15.call(x2, i8(h2)), null, c2), a);
  }
  Q6.map = o;
  function d2(l2, i8, a) {
    return D4((s15, x2 = null, c2) => l2((h2) => {
      i8(h2), s15.call(x2, h2);
    }, null, c2), a);
  }
  Q6.forEach = d2;
  function v4(l2, i8, a) {
    return D4((s15, x2 = null, c2) => l2((h2) => i8(h2) && s15.call(x2, h2), null, c2), a);
  }
  Q6.filter = v4;
  function E2(l2) {
    return l2;
  }
  Q6.signal = E2;
  function p2(...l2) {
    return (i8, a = null, s15) => {
      let x2 = Me(...l2.map((c2) => c2((h2) => i8.call(a, h2))));
      return T2(x2, s15);
    };
  }
  Q6.any = p2;
  function b3(l2, i8, a, s15) {
    let x2 = a;
    return o(l2, (c2) => (x2 = i8(x2, c2), x2), s15);
  }
  Q6.reduce = b3;
  function D4(l2, i8) {
    let a, s15 = { onWillAddFirstListener() {
      a = l2(x2.fire, x2);
    }, onDidRemoveLastListener() {
      a?.dispose();
    } };
    i8 || e(s15);
    let x2 = new C2(s15);
    return i8?.add(x2), x2.event;
  }
  function T2(l2, i8) {
    return i8 instanceof Array ? i8.push(l2) : i8 && i8.add(l2), l2;
  }
  function B4(l2, i8, a = 100, s15 = false, x2 = false, c2, h2) {
    let F4, y2, S3, $3 = 0, j4, Ce3 = { leakWarningThreshold: c2, onWillAddFirstListener() {
      F4 = l2((Qe2) => {
        $3++, y2 = i8(y2, Qe2), s15 && !S3 && (q3.fire(y2), y2 = void 0), j4 = () => {
          let $e2 = y2;
          y2 = void 0, S3 = void 0, (!s15 || $3 > 1) && q3.fire($e2), $3 = 0;
        }, typeof a == "number" ? (clearTimeout(S3), S3 = setTimeout(j4, a)) : S3 === void 0 && (S3 = 0, queueMicrotask(j4));
      });
    }, onWillRemoveListener() {
      x2 && $3 > 0 && j4?.();
    }, onDidRemoveLastListener() {
      j4 = void 0, F4.dispose();
    } };
    h2 || e(Ce3);
    let q3 = new C2(Ce3);
    return h2?.add(q3), q3.event;
  }
  Q6.debounce = B4;
  function L3(l2, i8 = 0, a) {
    return Q6.debounce(l2, (s15, x2) => s15 ? (s15.push(x2), s15) : [x2], i8, void 0, true, void 0, a);
  }
  Q6.accumulate = L3;
  function oe(l2, i8 = (s15, x2) => s15 === x2, a) {
    let s15 = true, x2;
    return v4(l2, (c2) => {
      let h2 = s15 || !i8(c2, x2);
      return s15 = false, x2 = c2, h2;
    }, a);
  }
  Q6.latch = oe;
  function z4(l2, i8, a) {
    return [Q6.filter(l2, i8, a), Q6.filter(l2, (s15) => !i8(s15), a)];
  }
  Q6.split = z4;
  function k4(l2, i8 = false, a = [], s15) {
    let x2 = a.slice(), c2 = l2((y2) => {
      x2 ? x2.push(y2) : F4.fire(y2);
    });
    s15 && s15.add(c2);
    let h2 = () => {
      x2?.forEach((y2) => F4.fire(y2)), x2 = null;
    }, F4 = new C2({ onWillAddFirstListener() {
      c2 || (c2 = l2((y2) => F4.fire(y2)), s15 && s15.add(c2));
    }, onDidAddFirstListener() {
      x2 && (i8 ? setTimeout(h2) : h2());
    }, onDidRemoveLastListener() {
      c2 && c2.dispose(), c2 = null;
    } });
    return s15 && s15.add(F4), F4.event;
  }
  Q6.buffer = k4;
  function ae3(l2, i8) {
    return (s15, x2, c2) => {
      let h2 = i8(new le2());
      return l2(function(F4) {
        let y2 = h2.evaluate(F4);
        y2 !== V3 && s15.call(x2, y2);
      }, void 0, c2);
    };
  }
  Q6.chain = ae3;
  let V3 = Symbol("HaltChainable");
  class le2 {
    constructor() {
      this.steps = [];
    }
    map(i8) {
      return this.steps.push(i8), this;
    }
    forEach(i8) {
      return this.steps.push((a) => (i8(a), a)), this;
    }
    filter(i8) {
      return this.steps.push((a) => i8(a) ? a : V3), this;
    }
    reduce(i8, a) {
      let s15 = a;
      return this.steps.push((x2) => (s15 = i8(s15, x2), s15)), this;
    }
    latch(i8 = (a, s15) => a === s15) {
      let a = true, s15;
      return this.steps.push((x2) => {
        let c2 = a || !i8(x2, s15);
        return a = false, s15 = x2, c2 ? x2 : V3;
      }), this;
    }
    evaluate(i8) {
      for (let a of this.steps) if (i8 = a(i8), i8 === V3) break;
      return i8;
    }
  }
  function u2(l2, i8, a = (s15) => s15) {
    let s15 = (...F4) => h2.fire(a(...F4)), x2 = () => l2.on(i8, s15), c2 = () => l2.removeListener(i8, s15), h2 = new C2({ onWillAddFirstListener: x2, onDidRemoveLastListener: c2 });
    return h2.event;
  }
  Q6.fromNodeEventEmitter = u2;
  function f2(l2, i8, a = (s15) => s15) {
    let s15 = (...F4) => h2.fire(a(...F4)), x2 = () => l2.addEventListener(i8, s15), c2 = () => l2.removeEventListener(i8, s15), h2 = new C2({ onWillAddFirstListener: x2, onDidRemoveLastListener: c2 });
    return h2.event;
  }
  Q6.fromDOMEventEmitter = f2;
  function m2(l2) {
    return new Promise((i8) => n2(l2)(i8));
  }
  Q6.toPromise = m2;
  function g3(l2) {
    let i8 = new C2();
    return l2.then((a) => {
      i8.fire(a);
    }, () => {
      i8.fire(void 0);
    }).finally(() => {
      i8.dispose();
    }), i8.event;
  }
  Q6.fromPromise = g3;
  function W(l2, i8) {
    return l2((a) => i8.fire(a));
  }
  Q6.forward = W;
  function xe3(l2, i8, a) {
    return i8(a), l2((s15) => i8(s15));
  }
  Q6.runAndSubscribe = xe3;
  class ze2 {
    constructor(i8, a) {
      this._observable = i8;
      this._counter = 0;
      this._hasChanged = false;
      let s15 = { onWillAddFirstListener: () => {
        i8.addObserver(this);
      }, onDidRemoveLastListener: () => {
        i8.removeObserver(this);
      } };
      a || e(s15), this.emitter = new C2(s15), a && a.add(this.emitter);
    }
    beginUpdate(i8) {
      this._counter++;
    }
    handlePossibleChange(i8) {
    }
    handleChange(i8, a) {
      this._hasChanged = true;
    }
    endUpdate(i8) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function ut3(l2, i8) {
    return new ze2(l2, i8).emitter.event;
  }
  Q6.fromObservable = ut3;
  function dt3(l2) {
    return (i8, a, s15) => {
      let x2 = 0, c2 = false, h2 = { beginUpdate() {
        x2++;
      }, endUpdate() {
        x2--, x2 === 0 && (l2.reportChanges(), c2 && (c2 = false, i8.call(a)));
      }, handlePossibleChange() {
      }, handleChange() {
        c2 = true;
      } };
      l2.addObserver(h2), l2.reportChanges();
      let F4 = { dispose() {
        l2.removeObserver(h2);
      } };
      return s15 instanceof U2 ? s15.add(F4) : Array.isArray(s15) && s15.push(F4), F4;
    };
  }
  Q6.fromObservableLight = dt3;
})(it ||= {});
var M2 = class M3 {
  constructor(e) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${e}_${M3._idPool++}`, M3.all.add(this);
  }
  start(e) {
    this._stopWatch = new ne2(), this.listenerCount = e;
  }
  stop() {
    if (this._stopWatch) {
      let e = this._stopWatch.elapsed();
      this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
M2.all = /* @__PURE__ */ new Set(), M2._idPool = 0;
var be2 = M2;
var We2 = -1;
var ie2 = class ie3 {
  constructor(e, t, n2 = (ie3._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = e;
    this.threshold = t;
    this.name = n2;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(e, t) {
    let n2 = this.threshold;
    if (n2 <= 0 || t < n2) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let o = this._stacks.get(e.value) || 0;
    if (this._stacks.set(e.value, o + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = n2 * 0.5;
      let [d2, v4] = this.getMostFrequentStack(), E2 = `[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${v4}):`;
      console.warn(E2), console.warn(d2);
      let p2 = new De2(E2, d2);
      this._errorHandler(p2);
    }
    return () => {
      let d2 = this._stacks.get(e.value) || 0;
      this._stacks.set(e.value, d2 - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let e, t = 0;
    for (let [n2, o] of this._stacks) (!e || t < o) && (e = [n2, o], t = o);
    return e;
  }
};
ie2._idPool = 1;
var Ee2 = ie2;
var K2 = class r3 {
  constructor(e) {
    this.value = e;
  }
  static create() {
    let e = new Error();
    return new r3(e.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var De2 = class extends Error {
  constructor(e, t) {
    super(e), this.name = "ListenerLeakError", this.stack = t;
  }
};
var Ae2 = class extends Error {
  constructor(e, t) {
    super(e), this.name = "ListenerRefusalError", this.stack = t;
  }
};
var st2 = 0;
var N = class {
  constructor(e) {
    this.value = e;
    this.id = st2++;
  }
};
var ot2 = 2;
var at2 = (r5, e) => {
  if (r5 instanceof N) e(r5);
  else for (let t = 0; t < r5.length; t++) {
    let n2 = r5[t];
    n2 && e(n2);
  }
};
var re2;
if (nt2) {
  let r5 = [];
  setInterval(() => {
    r5.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(r5.join(`
`)), r5.length = 0);
  }, 3e3), re2 = new FinalizationRegistry((e) => {
    typeof e == "string" && r5.push(e);
  });
}
var C2 = class {
  constructor(e) {
    this._size = 0;
    this._options = e, this._leakageMon = We2 > 0 || this._options?.leakWarningThreshold ? new Ee2(e?.onListenerError ?? Y2, this._options?.leakWarningThreshold ?? We2) : void 0, this._perfMon = this._options?._profName ? new be2(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (Ve2) {
          let e = this._listeners;
          queueMicrotask(() => {
            at2(e, (t) => t.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (e, t, n2) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let p2 = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(p2);
        let b3 = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], D4 = new Ae2(`${p2}. HINT: Stack shows most frequent listener (${b3[1]}-times)`, b3[0]);
        return (this._options?.onListenerError || Y2)(D4), _.None;
      }
      if (this._disposed) return _.None;
      t && (e = e.bind(t));
      let o = new N(e), d2, v4;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (o.stack = K2.create(), d2 = this._leakageMon.check(o.stack, this._size + 1)), Ve2 && (o.stack = v4 ?? K2.create()), this._listeners ? this._listeners instanceof N ? (this._deliveryQueue ??= new Fe2(), this._listeners = [this._listeners, o]) : this._listeners.push(o) : (this._options?.onWillAddFirstListener?.(this), this._listeners = o, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let E2 = me(() => {
        re2?.unregister(E2), d2?.(), this._removeListener(o);
      });
      if (n2 instanceof U2 ? n2.add(E2) : Array.isArray(n2) && n2.push(E2), re2) {
        let p2 = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), b3 = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(p2);
        re2.register(E2, b3?.[2] ?? p2, E2);
      }
      return E2;
    }, this._event;
  }
  _removeListener(e) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let t = this._listeners, n2 = t.indexOf(e);
    if (n2 === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, t[n2] = void 0;
    let o = this._deliveryQueue.current === this;
    if (this._size * ot2 <= t.length) {
      let d2 = 0;
      for (let v4 = 0; v4 < t.length; v4++) t[v4] ? t[d2++] = t[v4] : o && (this._deliveryQueue.end--, d2 < this._deliveryQueue.i && this._deliveryQueue.i--);
      t.length = d2;
    }
  }
  _deliver(e, t) {
    if (!e) return;
    let n2 = this._options?.onListenerError || Y2;
    if (!n2) {
      e.value(t);
      return;
    }
    try {
      e.value(t);
    } catch (o) {
      n2(o);
    }
  }
  _deliverQueue(e) {
    let t = e.current._listeners;
    for (; e.i < e.end; ) this._deliver(t[e.i++], e.value);
    e.reset();
  }
  fire(e) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof N) this._deliver(this._listeners, e);
    else {
      let t = this._deliveryQueue;
      t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var Fe2 = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(e, t, n2) {
    this.i = 0, this.end = n2, this.current = e, this.value = t;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var w = class r4 {
  constructor() {
    this._providers = /* @__PURE__ */ Object.create(null);
    this._active = "";
    this._onChange = new C2();
    this.onChange = this._onChange.event;
    let e = new H2();
    this.register(e), this._active = e.version, this._activeProvider = e;
  }
  static extractShouldJoin(e) {
    return (e & 1) !== 0;
  }
  static extractWidth(e) {
    return e >> 1 & 3;
  }
  static extractCharKind(e) {
    return e >> 3;
  }
  static createPropertyValue(e, t, n2 = false) {
    return (e & 16777215) << 3 | (t & 3) << 1 | (n2 ? 1 : 0);
  }
  dispose() {
    this._onChange.dispose();
  }
  get versions() {
    return Object.keys(this._providers);
  }
  get activeVersion() {
    return this._active;
  }
  set activeVersion(e) {
    if (!this._providers[e]) throw new Error(`unknown Unicode version "${e}"`);
    this._active = e, this._activeProvider = this._providers[e], this._onChange.fire(e);
  }
  register(e) {
    this._providers[e.version] = e;
  }
  wcwidth(e) {
    return this._activeProvider.wcwidth(e);
  }
  getStringCellWidth(e) {
    let t = 0, n2 = 0, o = e.length;
    for (let d2 = 0; d2 < o; ++d2) {
      let v4 = e.charCodeAt(d2);
      if (55296 <= v4 && v4 <= 56319) {
        if (++d2 >= o) return t + this.wcwidth(v4);
        let b3 = e.charCodeAt(d2);
        56320 <= b3 && b3 <= 57343 ? v4 = (v4 - 55296) * 1024 + b3 - 56320 + 65536 : t += this.wcwidth(b3);
      }
      let E2 = this.charProperties(v4, n2), p2 = r4.extractWidth(E2);
      r4.extractShouldJoin(E2) && (p2 -= r4.extractWidth(n2)), t += p2, n2 = E2;
    }
    return t;
  }
  charProperties(e, t) {
    return this._activeProvider.charProperties(e, t);
  }
};
var ye2 = [[768, 879], [1155, 1161], [1425, 1469], [1471, 1471], [1473, 1474], [1476, 1477], [1479, 1479], [1536, 1541], [1552, 1562], [1564, 1564], [1611, 1631], [1648, 1648], [1750, 1757], [1759, 1764], [1767, 1768], [1770, 1773], [1807, 1807], [1809, 1809], [1840, 1866], [1958, 1968], [2027, 2035], [2045, 2045], [2070, 2073], [2075, 2083], [2085, 2087], [2089, 2093], [2137, 2139], [2259, 2306], [2362, 2362], [2364, 2364], [2369, 2376], [2381, 2381], [2385, 2391], [2402, 2403], [2433, 2433], [2492, 2492], [2497, 2500], [2509, 2509], [2530, 2531], [2558, 2558], [2561, 2562], [2620, 2620], [2625, 2626], [2631, 2632], [2635, 2637], [2641, 2641], [2672, 2673], [2677, 2677], [2689, 2690], [2748, 2748], [2753, 2757], [2759, 2760], [2765, 2765], [2786, 2787], [2810, 2815], [2817, 2817], [2876, 2876], [2879, 2879], [2881, 2884], [2893, 2893], [2902, 2902], [2914, 2915], [2946, 2946], [3008, 3008], [3021, 3021], [3072, 3072], [3076, 3076], [3134, 3136], [3142, 3144], [3146, 3149], [3157, 3158], [3170, 3171], [3201, 3201], [3260, 3260], [3263, 3263], [3270, 3270], [3276, 3277], [3298, 3299], [3328, 3329], [3387, 3388], [3393, 3396], [3405, 3405], [3426, 3427], [3530, 3530], [3538, 3540], [3542, 3542], [3633, 3633], [3636, 3642], [3655, 3662], [3761, 3761], [3764, 3772], [3784, 3789], [3864, 3865], [3893, 3893], [3895, 3895], [3897, 3897], [3953, 3966], [3968, 3972], [3974, 3975], [3981, 3991], [3993, 4028], [4038, 4038], [4141, 4144], [4146, 4151], [4153, 4154], [4157, 4158], [4184, 4185], [4190, 4192], [4209, 4212], [4226, 4226], [4229, 4230], [4237, 4237], [4253, 4253], [4448, 4607], [4957, 4959], [5906, 5908], [5938, 5940], [5970, 5971], [6002, 6003], [6068, 6069], [6071, 6077], [6086, 6086], [6089, 6099], [6109, 6109], [6155, 6158], [6277, 6278], [6313, 6313], [6432, 6434], [6439, 6440], [6450, 6450], [6457, 6459], [6679, 6680], [6683, 6683], [6742, 6742], [6744, 6750], [6752, 6752], [6754, 6754], [6757, 6764], [6771, 6780], [6783, 6783], [6832, 6846], [6912, 6915], [6964, 6964], [6966, 6970], [6972, 6972], [6978, 6978], [7019, 7027], [7040, 7041], [7074, 7077], [7080, 7081], [7083, 7085], [7142, 7142], [7144, 7145], [7149, 7149], [7151, 7153], [7212, 7219], [7222, 7223], [7376, 7378], [7380, 7392], [7394, 7400], [7405, 7405], [7412, 7412], [7416, 7417], [7616, 7673], [7675, 7679], [8203, 8207], [8234, 8238], [8288, 8292], [8294, 8303], [8400, 8432], [11503, 11505], [11647, 11647], [11744, 11775], [12330, 12333], [12441, 12442], [42607, 42610], [42612, 42621], [42654, 42655], [42736, 42737], [43010, 43010], [43014, 43014], [43019, 43019], [43045, 43046], [43204, 43205], [43232, 43249], [43263, 43263], [43302, 43309], [43335, 43345], [43392, 43394], [43443, 43443], [43446, 43449], [43452, 43453], [43493, 43493], [43561, 43566], [43569, 43570], [43573, 43574], [43587, 43587], [43596, 43596], [43644, 43644], [43696, 43696], [43698, 43700], [43703, 43704], [43710, 43711], [43713, 43713], [43756, 43757], [43766, 43766], [44005, 44005], [44008, 44008], [44013, 44013], [64286, 64286], [65024, 65039], [65056, 65071], [65279, 65279], [65529, 65531]];
var lt2 = [[66045, 66045], [66272, 66272], [66422, 66426], [68097, 68099], [68101, 68102], [68108, 68111], [68152, 68154], [68159, 68159], [68325, 68326], [68900, 68903], [69446, 69456], [69633, 69633], [69688, 69702], [69759, 69761], [69811, 69814], [69817, 69818], [69821, 69821], [69837, 69837], [69888, 69890], [69927, 69931], [69933, 69940], [70003, 70003], [70016, 70017], [70070, 70078], [70089, 70092], [70191, 70193], [70196, 70196], [70198, 70199], [70206, 70206], [70367, 70367], [70371, 70378], [70400, 70401], [70459, 70460], [70464, 70464], [70502, 70508], [70512, 70516], [70712, 70719], [70722, 70724], [70726, 70726], [70750, 70750], [70835, 70840], [70842, 70842], [70847, 70848], [70850, 70851], [71090, 71093], [71100, 71101], [71103, 71104], [71132, 71133], [71219, 71226], [71229, 71229], [71231, 71232], [71339, 71339], [71341, 71341], [71344, 71349], [71351, 71351], [71453, 71455], [71458, 71461], [71463, 71467], [71727, 71735], [71737, 71738], [72148, 72151], [72154, 72155], [72160, 72160], [72193, 72202], [72243, 72248], [72251, 72254], [72263, 72263], [72273, 72278], [72281, 72283], [72330, 72342], [72344, 72345], [72752, 72758], [72760, 72765], [72767, 72767], [72850, 72871], [72874, 72880], [72882, 72883], [72885, 72886], [73009, 73014], [73018, 73018], [73020, 73021], [73023, 73029], [73031, 73031], [73104, 73105], [73109, 73109], [73111, 73111], [73459, 73460], [78896, 78904], [92912, 92916], [92976, 92982], [94031, 94031], [94095, 94098], [113821, 113822], [113824, 113827], [119143, 119145], [119155, 119170], [119173, 119179], [119210, 119213], [119362, 119364], [121344, 121398], [121403, 121452], [121461, 121461], [121476, 121476], [121499, 121503], [121505, 121519], [122880, 122886], [122888, 122904], [122907, 122913], [122915, 122916], [122918, 122922], [123184, 123190], [123628, 123631], [125136, 125142], [125252, 125258], [917505, 917505], [917536, 917631], [917760, 917999]];
var ge2 = [[4352, 4447], [8986, 8987], [9001, 9002], [9193, 9196], [9200, 9200], [9203, 9203], [9725, 9726], [9748, 9749], [9800, 9811], [9855, 9855], [9875, 9875], [9889, 9889], [9898, 9899], [9917, 9918], [9924, 9925], [9934, 9934], [9940, 9940], [9962, 9962], [9970, 9971], [9973, 9973], [9978, 9978], [9981, 9981], [9989, 9989], [9994, 9995], [10024, 10024], [10060, 10060], [10062, 10062], [10067, 10069], [10071, 10071], [10133, 10135], [10160, 10160], [10175, 10175], [11035, 11036], [11088, 11088], [11093, 11093], [11904, 11929], [11931, 12019], [12032, 12245], [12272, 12283], [12288, 12329], [12334, 12350], [12353, 12438], [12443, 12543], [12549, 12591], [12593, 12686], [12688, 12730], [12736, 12771], [12784, 12830], [12832, 12871], [12880, 19903], [19968, 42124], [42128, 42182], [43360, 43388], [44032, 55203], [63744, 64255], [65040, 65049], [65072, 65106], [65108, 65126], [65128, 65131], [65281, 65376], [65504, 65510]];
var xt2 = [[94176, 94179], [94208, 100343], [100352, 101106], [110592, 110878], [110928, 110930], [110948, 110951], [110960, 111355], [126980, 126980], [127183, 127183], [127374, 127374], [127377, 127386], [127488, 127490], [127504, 127547], [127552, 127560], [127568, 127569], [127584, 127589], [127744, 127776], [127789, 127797], [127799, 127868], [127870, 127891], [127904, 127946], [127951, 127955], [127968, 127984], [127988, 127988], [127992, 128062], [128064, 128064], [128066, 128252], [128255, 128317], [128331, 128334], [128336, 128359], [128378, 128378], [128405, 128406], [128420, 128420], [128507, 128591], [128640, 128709], [128716, 128716], [128720, 128722], [128725, 128725], [128747, 128748], [128756, 128762], [128992, 129003], [129293, 129393], [129395, 129398], [129402, 129442], [129445, 129450], [129454, 129482], [129485, 129535], [129648, 129651], [129656, 129658], [129664, 129666], [129680, 129685], [131072, 196605], [196608, 262141]];
var I;
function je2(r5, e) {
  let t = 0, n2 = e.length - 1, o;
  if (r5 < e[0][0] || r5 > e[n2][1]) return false;
  for (; n2 >= t; ) if (o = t + n2 >> 1, r5 > e[o][1]) t = o + 1;
  else if (r5 < e[o][0]) n2 = o - 1;
  else return true;
  return false;
}
var se2 = class {
  constructor() {
    this.version = "11";
    if (!I) {
      I = new Uint8Array(65536), I.fill(1), I[0] = 0, I.fill(0, 1, 32), I.fill(0, 127, 160);
      for (let e = 0; e < ye2.length; ++e) I.fill(0, ye2[e][0], ye2[e][1] + 1);
      for (let e = 0; e < ge2.length; ++e) I.fill(2, ge2[e][0], ge2[e][1] + 1);
    }
  }
  wcwidth(e) {
    return e < 32 ? 0 : e < 127 ? 1 : e < 65536 ? I[e] : je2(e, lt2) ? 0 : je2(e, xt2) ? 2 : 1;
  }
  charProperties(e, t) {
    let n2 = this.wcwidth(e), o = n2 === 0 && t !== 0;
    if (o) {
      let d2 = w.extractWidth(t);
      d2 === 0 ? o = false : d2 > n2 && (n2 = d2);
    }
    return w.createPropertyValue(0, n2, o);
  }
};
var Ke = class {
  activate(e) {
    e.unicode.register(new se2());
  }
  dispose() {
  }
};

// node_modules/@xterm/addon-web-links/lib/addon-web-links.mjs
var v2 = class {
  constructor(e, t, n2, o = {}) {
    this._terminal = e;
    this._regex = t;
    this._handler = n2;
    this._options = o;
  }
  provideLinks(e, t) {
    let n2 = g.computeLink(e, this._regex, this._terminal, this._handler);
    t(this._addCallbacks(n2));
  }
  _addCallbacks(e) {
    return e.map((t) => (t.leave = this._options.leave, t.hover = (n2, o) => {
      if (this._options.hover) {
        let { range: p2 } = t;
        this._options.hover(n2, o, p2);
      }
    }, t));
  }
};
function k(l2) {
  try {
    let e = new URL(l2), t = e.password && e.username ? `${e.protocol}//${e.username}:${e.password}@${e.host}` : e.username ? `${e.protocol}//${e.username}@${e.host}` : `${e.protocol}//${e.host}`;
    return l2.toLocaleLowerCase().startsWith(t.toLocaleLowerCase());
  } catch {
    return false;
  }
}
var g = class l {
  static computeLink(e, t, n2, o) {
    let p2 = new RegExp(t.source, (t.flags || "") + "g"), [i8, r5] = l._getWindowedLineStrings(e - 1, n2), s15 = i8.join(""), a, d2 = [];
    for (; a = p2.exec(s15); ) {
      let u2 = a[0];
      if (!k(u2)) continue;
      let [c2, h2] = l._mapStrIdx(n2, r5, 0, a.index), [m2, f2] = l._mapStrIdx(n2, c2, h2, u2.length);
      if (c2 === -1 || h2 === -1 || m2 === -1 || f2 === -1) continue;
      let b3 = { start: { x: h2 + 1, y: c2 + 1 }, end: { x: f2, y: m2 + 1 } };
      d2.push({ range: b3, text: u2, activate: o });
    }
    return d2;
  }
  static _getWindowedLineStrings(e, t) {
    let n2, o = e, p2 = e, i8 = 0, r5 = "", s15 = [];
    if (n2 = t.buffer.active.getLine(e)) {
      let a = n2.translateToString(true);
      if (n2.isWrapped && a[0] !== " ") {
        for (i8 = 0; (n2 = t.buffer.active.getLine(--o)) && i8 < 2048 && (r5 = n2.translateToString(true), i8 += r5.length, s15.push(r5), !(!n2.isWrapped || r5.indexOf(" ") !== -1)); ) ;
        s15.reverse();
      }
      for (s15.push(a), i8 = 0; (n2 = t.buffer.active.getLine(++p2)) && n2.isWrapped && i8 < 2048 && (r5 = n2.translateToString(true), i8 += r5.length, s15.push(r5), r5.indexOf(" ") === -1); ) ;
    }
    return [s15, o];
  }
  static _mapStrIdx(e, t, n2, o) {
    let p2 = e.buffer.active, i8 = p2.getNullCell(), r5 = n2;
    for (; o; ) {
      let s15 = p2.getLine(t);
      if (!s15) return [-1, -1];
      for (let a = r5; a < s15.length; ++a) {
        s15.getCell(a, i8);
        let d2 = i8.getChars();
        if (i8.getWidth() && (o -= d2.length || 1, a === s15.length - 1 && d2 === "")) {
          let c2 = p2.getLine(t + 1);
          c2 && c2.isWrapped && (c2.getCell(0, i8), i8.getWidth() === 2 && (o += 1));
        }
        if (o < 0) return [t, a];
      }
      t++, r5 = 0;
    }
    return [t, r5];
  }
};
var _2 = /(https?|HTTPS?):[/]{2}[^\s"'!*(){}|\\\^<>`]*[^\s"':,.!?{}|\\\^~\[\]`()<>]/;
function w2(l2, e) {
  let t = window.open();
  if (t) {
    try {
      t.opener = null;
    } catch {
    }
    t.location.href = e;
  } else console.warn("Opening link blocked as opener could not be cleared");
}
var L2 = class {
  constructor(e = w2, t = {}) {
    this._handler = e;
    this._options = t;
  }
  activate(e) {
    this._terminal = e;
    let t = this._options, n2 = t.urlRegex || _2;
    this._linkProvider = this._terminal.registerLinkProvider(new v2(this._terminal, n2, this._handler, t));
  }
  dispose() {
    this._linkProvider?.dispose();
  }
};

// node_modules/@xterm/addon-clipboard/lib/addon-clipboard.mjs
var U3 = "3.7.8";
var $2 = U3;
var f = typeof Buffer == "function";
var _3 = typeof TextDecoder == "function" ? new TextDecoder() : void 0;
var C3 = typeof TextEncoder == "function" ? new TextEncoder() : void 0;
var N2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var c = Array.prototype.slice.call(N2);
var d = ((e) => {
  let t = {};
  return e.forEach((r5, o) => t[r5] = o), t;
})(c);
var k2 = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/;
var n = String.fromCharCode.bind(String);
var B2 = typeof Uint8Array.from == "function" ? Uint8Array.from.bind(Uint8Array) : (e) => new Uint8Array(Array.prototype.slice.call(e, 0));
var S2 = (e) => e.replace(/=/g, "").replace(/[+\/]/g, (t) => t == "+" ? "-" : "_");
var I2 = (e) => e.replace(/[^A-Za-z0-9\+\/]/g, "");
var F2 = (e) => {
  let t, r5, o, i8, s15 = "", l2 = e.length % 3;
  for (let a = 0; a < e.length; ) {
    if ((r5 = e.charCodeAt(a++)) > 255 || (o = e.charCodeAt(a++)) > 255 || (i8 = e.charCodeAt(a++)) > 255) throw new TypeError("invalid character found");
    t = r5 << 16 | o << 8 | i8, s15 += c[t >> 18 & 63] + c[t >> 12 & 63] + c[t >> 6 & 63] + c[t & 63];
  }
  return l2 ? s15.slice(0, l2 - 3) + "===".substring(l2) : s15;
};
var m = typeof btoa == "function" ? (e) => btoa(e) : f ? (e) => Buffer.from(e, "binary").toString("base64") : F2;
var b2 = f ? (e) => Buffer.from(e).toString("base64") : (e) => {
  let r5 = [];
  for (let o = 0, i8 = e.length; o < i8; o += 4096) r5.push(n.apply(null, e.subarray(o, o + 4096)));
  return m(r5.join(""));
};
var x = (e, t = false) => t ? S2(b2(e)) : b2(e);
var H3 = (e) => {
  if (e.length < 2) {
    var t = e.charCodeAt(0);
    return t < 128 ? e : t < 2048 ? n(192 | t >>> 6) + n(128 | t & 63) : n(224 | t >>> 12 & 15) + n(128 | t >>> 6 & 63) + n(128 | t & 63);
  } else {
    var t = 65536 + (e.charCodeAt(0) - 55296) * 1024 + (e.charCodeAt(1) - 56320);
    return n(240 | t >>> 18 & 7) + n(128 | t >>> 12 & 63) + n(128 | t >>> 6 & 63) + n(128 | t & 63);
  }
};
var J3 = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
var P3 = (e) => e.replace(J3, H3);
var T = f ? (e) => Buffer.from(e, "utf8").toString("base64") : C3 ? (e) => b2(C3.encode(e)) : (e) => m(P3(e));
var p = (e, t = false) => t ? S2(T(e)) : T(e);
var v3 = (e) => p(e, true);
var q2 = /[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g;
var G3 = (e) => {
  switch (e.length) {
    case 4:
      var t = (7 & e.charCodeAt(0)) << 18 | (63 & e.charCodeAt(1)) << 12 | (63 & e.charCodeAt(2)) << 6 | 63 & e.charCodeAt(3), r5 = t - 65536;
      return n((r5 >>> 10) + 55296) + n((r5 & 1023) + 56320);
    case 3:
      return n((15 & e.charCodeAt(0)) << 12 | (63 & e.charCodeAt(1)) << 6 | 63 & e.charCodeAt(2));
    default:
      return n((31 & e.charCodeAt(0)) << 6 | 63 & e.charCodeAt(1));
  }
};
var D2 = (e) => e.replace(q2, G3);
var w3 = (e) => {
  if (e = e.replace(/\s+/g, ""), !k2.test(e)) throw new TypeError("malformed base64.");
  e += "==".slice(2 - (e.length & 3));
  let t, r5, o, i8 = [];
  for (let s15 = 0; s15 < e.length; ) t = d[e.charAt(s15++)] << 18 | d[e.charAt(s15++)] << 12 | (r5 = d[e.charAt(s15++)]) << 6 | (o = d[e.charAt(s15++)]), r5 === 64 ? i8.push(n(t >> 16 & 255)) : o === 64 ? i8.push(n(t >> 16 & 255, t >> 8 & 255)) : i8.push(n(t >> 16 & 255, t >> 8 & 255, t & 255));
  return i8.join("");
};
var y = typeof atob == "function" ? (e) => atob(I2(e)) : f ? (e) => Buffer.from(e, "base64").toString("binary") : w3;
var R3 = f ? (e) => B2(Buffer.from(e, "base64")) : (e) => B2(y(e).split("").map((t) => t.charCodeAt(0)));
var E = (e) => R3(O2(e));
var K3 = f ? (e) => Buffer.from(e, "base64").toString("utf8") : _3 ? (e) => _3.decode(R3(e)) : (e) => D2(y(e));
var O2 = (e) => I2(e.replace(/[-_]/g, (t) => t == "-" ? "+" : "/"));
var h = (e) => K3(O2(e));
var M4 = (e) => {
  if (typeof e != "string") return false;
  let t = e.replace(/\s+/g, "").replace(/={0,2}$/, "");
  return !/[^\s0-9a-zA-Z\+/]/.test(t) || !/[^\s0-9a-zA-Z\-_]/.test(t);
};
var z2 = (e) => ({ value: e, enumerable: false, writable: true, configurable: true });
var Z2 = function() {
  let e = (t, r5) => Object.defineProperty(String.prototype, t, z2(r5));
  e("fromBase64", function() {
    return h(this);
  }), e("toBase64", function(t) {
    return p(this, t);
  }), e("toBase64URI", function() {
    return p(this, true);
  }), e("toBase64URL", function() {
    return p(this, true);
  }), e("toUint8Array", function() {
    return E(this);
  });
};
var V = function() {
  let e = (t, r5) => Object.defineProperty(Uint8Array.prototype, t, z2(r5));
  e("toBase64", function(t) {
    return x(this, t);
  }), e("toBase64URI", function() {
    return x(this, true);
  }), e("toBase64URL", function() {
    return x(this, true);
  });
};
var Q3 = () => {
  Z2(), V();
};
var u = { version: U3, VERSION: $2, atob: y, atobPolyfill: w3, btoa: m, btoaPolyfill: F2, fromBase64: h, toBase64: p, encode: p, encodeURI: v3, encodeURL: v3, utob: P3, btou: D2, decode: h, isValid: M4, fromUint8Array: x, toUint8Array: E, extendString: Z2, extendUint8Array: V, extendBuiltins: Q3 };
var j2 = class {
  constructor(t = new A2(), r5 = new g2()) {
    this._base64 = t;
    this._provider = r5;
  }
  activate(t) {
    this._terminal = t, this._disposable = t.parser.registerOscHandler(52, (r5) => this._setOrReportClipboard(r5));
  }
  dispose() {
    return this._disposable?.dispose();
  }
  _readText(t, r5) {
    let o = this._base64.encodeText(r5);
    this._terminal?.input(`\x1B]52;${t};${o}\x07`, false);
  }
  _setOrReportClipboard(t) {
    let r5 = t.split(";");
    if (r5.length < 2) return true;
    let o = r5[0], i8 = r5[1];
    if (i8 === "?") {
      let a = this._provider.readText(o);
      return a instanceof Promise ? a.then((L3) => (this._readText(o, L3), true)) : (this._readText(o, a), true);
    }
    let s15 = "";
    try {
      s15 = this._base64.decodeText(i8);
    } catch {
    }
    let l2 = this._provider.writeText(o, s15);
    return l2 instanceof Promise ? l2.then(() => true) : true;
  }
};
var g2 = class {
  async readText(t) {
    return t !== "c" ? Promise.resolve("") : navigator.clipboard.readText();
  }
  async writeText(t, r5) {
    return t !== "c" ? Promise.resolve() : navigator.clipboard.writeText(r5);
  }
};
var A2 = class {
  encodeText(t) {
    return u.encode(t);
  }
  decodeText(t) {
    let r5 = u.decode(t);
    return !u.isValid(t) || u.encode(r5) !== t ? "" : r5;
  }
};

// node_modules/@xterm/addon-webgl/lib/addon-webgl.mjs
var Lr2 = Object.defineProperty;
var wr2 = Object.getOwnPropertyDescriptor;
var Yi2 = (i8, e, t, n2) => {
  for (var s15 = n2 > 1 ? void 0 : n2 ? wr2(e, t) : e, o = i8.length - 1, r5; o >= 0; o--) (r5 = i8[o]) && (s15 = (n2 ? r5(e, t, s15) : r5(s15)) || s15);
  return n2 && s15 && Lr2(e, t, s15), s15;
};
var Qi = (i8, e) => (t, n2) => e(t, n2, i8);
var pi = class {
  constructor() {
    this.listeners = [], this.unexpectedErrorHandler = function(e) {
      setTimeout(() => {
        throw e.stack ? bt2.isErrorNoTelemetry(e) ? new bt2(e.message + `

` + e.stack) : new Error(e.message + `

` + e.stack) : e;
      }, 0);
    };
  }
  addListener(e) {
    return this.listeners.push(e), () => {
      this._removeListener(e);
    };
  }
  emit(e) {
    this.listeners.forEach((t) => {
      t(e);
    });
  }
  _removeListener(e) {
    this.listeners.splice(this.listeners.indexOf(e), 1);
  }
  setUnexpectedErrorHandler(e) {
    this.unexpectedErrorHandler = e;
  }
  getUnexpectedErrorHandler() {
    return this.unexpectedErrorHandler;
  }
  onUnexpectedError(e) {
    this.unexpectedErrorHandler(e), this.emit(e);
  }
  onUnexpectedExternalError(e) {
    this.unexpectedErrorHandler(e);
  }
};
var Rr2 = new pi();
function Pe2(i8) {
  Dr2(i8) || Rr2.onUnexpectedError(i8);
}
var fi = "Canceled";
function Dr2(i8) {
  return i8 instanceof Ye3 ? true : i8 instanceof Error && i8.name === fi && i8.message === fi;
}
var Ye3 = class extends Error {
  constructor() {
    super(fi), this.name = this.message;
  }
};
var bt2 = class i extends Error {
  constructor(e) {
    super(e), this.name = "CodeExpectedError";
  }
  static fromError(e) {
    if (e instanceof i) return e;
    let t = new i();
    return t.message = e.message, t.stack = e.stack, t;
  }
  static isErrorNoTelemetry(e) {
    return e.name === "CodeExpectedError";
  }
};
function Mr2(i8, e, t = 0, n2 = i8.length) {
  let s15 = t, o = n2;
  for (; s15 < o; ) {
    let r5 = Math.floor((s15 + o) / 2);
    e(i8[r5]) ? s15 = r5 + 1 : o = r5;
  }
  return s15 - 1;
}
var vt2 = class vt3 {
  constructor(e) {
    this._array = e;
    this._findLastMonotonousLastIdx = 0;
  }
  findLastMonotonous(e) {
    if (vt3.assertInvariants) {
      if (this._prevFindLastPredicate) {
        for (let n2 of this._array) if (this._prevFindLastPredicate(n2) && !e(n2)) throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");
      }
      this._prevFindLastPredicate = e;
    }
    let t = Mr2(this._array, e, this._findLastMonotonousLastIdx);
    return this._findLastMonotonousLastIdx = t + 1, t === -1 ? void 0 : this._array[t];
  }
};
vt2.assertInvariants = false;
var en2;
((a) => {
  function i8(l2) {
    return l2 < 0;
  }
  a.isLessThan = i8;
  function e(l2) {
    return l2 <= 0;
  }
  a.isLessThanOrEqual = e;
  function t(l2) {
    return l2 > 0;
  }
  a.isGreaterThan = t;
  function n2(l2) {
    return l2 === 0;
  }
  a.isNeitherLessOrGreaterThan = n2, a.greaterThan = 1, a.lessThan = -1, a.neitherLessOrGreaterThan = 0;
})(en2 ||= {});
function tn2(i8, e) {
  return (t, n2) => e(i8(t), i8(n2));
}
var nn2 = (i8, e) => i8 - e;
var Be3 = class Be4 {
  constructor(e) {
    this.iterate = e;
  }
  forEach(e) {
    this.iterate((t) => (e(t), true));
  }
  toArray() {
    let e = [];
    return this.iterate((t) => (e.push(t), true)), e;
  }
  filter(e) {
    return new Be4((t) => this.iterate((n2) => e(n2) ? t(n2) : true));
  }
  map(e) {
    return new Be4((t) => this.iterate((n2) => t(e(n2))));
  }
  some(e) {
    let t = false;
    return this.iterate((n2) => (t = e(n2), !t)), t;
  }
  findFirst(e) {
    let t;
    return this.iterate((n2) => e(n2) ? (t = n2, false) : true), t;
  }
  findLast(e) {
    let t;
    return this.iterate((n2) => (e(n2) && (t = n2), true)), t;
  }
  findLastMaxBy(e) {
    let t, n2 = true;
    return this.iterate((s15) => ((n2 || en2.isGreaterThan(e(s15, t))) && (n2 = false, t = s15), true)), t;
  }
};
Be3.empty = new Be3((e) => {
});
function an2(i8, e) {
  let t = /* @__PURE__ */ Object.create(null);
  for (let n2 of i8) {
    let s15 = e(n2), o = t[s15];
    o || (o = t[s15] = []), o.push(n2);
  }
  return t;
}
var sn2;
var on2;
var rn2 = class {
  constructor(e, t) {
    this.toKey = t;
    this._map = /* @__PURE__ */ new Map();
    this[sn2] = "SetWithKey";
    for (let n2 of e) this.add(n2);
  }
  get size() {
    return this._map.size;
  }
  add(e) {
    let t = this.toKey(e);
    return this._map.set(t, e), this;
  }
  delete(e) {
    return this._map.delete(this.toKey(e));
  }
  has(e) {
    return this._map.has(this.toKey(e));
  }
  *entries() {
    for (let e of this._map.values()) yield [e, e];
  }
  keys() {
    return this.values();
  }
  *values() {
    for (let e of this._map.values()) yield e;
  }
  clear() {
    this._map.clear();
  }
  forEach(e, t) {
    this._map.forEach((n2) => e.call(t, n2, n2, this));
  }
  [(on2 = Symbol.iterator, sn2 = Symbol.toStringTag, on2)]() {
    return this.values();
  }
};
var Tt2 = class {
  constructor() {
    this.map = /* @__PURE__ */ new Map();
  }
  add(e, t) {
    let n2 = this.map.get(e);
    n2 || (n2 = /* @__PURE__ */ new Set(), this.map.set(e, n2)), n2.add(t);
  }
  delete(e, t) {
    let n2 = this.map.get(e);
    n2 && (n2.delete(t), n2.size === 0 && this.map.delete(e));
  }
  forEach(e, t) {
    let n2 = this.map.get(e);
    n2 && n2.forEach(t);
  }
  get(e) {
    let t = this.map.get(e);
    return t || /* @__PURE__ */ new Set();
  }
};
function mi2(i8, e) {
  let t = this, n2 = false, s15;
  return function() {
    if (n2) return s15;
    if (n2 = true, e) try {
      s15 = i8.apply(t, arguments);
    } finally {
      e();
    }
    else s15 = i8.apply(t, arguments);
    return s15;
  };
}
var _i2;
((W) => {
  function i8(E2) {
    return E2 && typeof E2 == "object" && typeof E2[Symbol.iterator] == "function";
  }
  W.is = i8;
  let e = Object.freeze([]);
  function t() {
    return e;
  }
  W.empty = t;
  function* n2(E2) {
    yield E2;
  }
  W.single = n2;
  function s15(E2) {
    return i8(E2) ? E2 : n2(E2);
  }
  W.wrap = s15;
  function o(E2) {
    return E2 || e;
  }
  W.from = o;
  function* r5(E2) {
    for (let y2 = E2.length - 1; y2 >= 0; y2--) yield E2[y2];
  }
  W.reverse = r5;
  function a(E2) {
    return !E2 || E2[Symbol.iterator]().next().done === true;
  }
  W.isEmpty = a;
  function l2(E2) {
    return E2[Symbol.iterator]().next().value;
  }
  W.first = l2;
  function u2(E2, y2) {
    let w4 = 0;
    for (let G4 of E2) if (y2(G4, w4++)) return true;
    return false;
  }
  W.some = u2;
  function c2(E2, y2) {
    for (let w4 of E2) if (y2(w4)) return w4;
  }
  W.find = c2;
  function* d2(E2, y2) {
    for (let w4 of E2) y2(w4) && (yield w4);
  }
  W.filter = d2;
  function* h2(E2, y2) {
    let w4 = 0;
    for (let G4 of E2) yield y2(G4, w4++);
  }
  W.map = h2;
  function* f2(E2, y2) {
    let w4 = 0;
    for (let G4 of E2) yield* y2(G4, w4++);
  }
  W.flatMap = f2;
  function* I3(...E2) {
    for (let y2 of E2) yield* y2;
  }
  W.concat = I3;
  function L3(E2, y2, w4) {
    let G4 = w4;
    for (let ue3 of E2) G4 = y2(G4, ue3);
    return G4;
  }
  W.reduce = L3;
  function* M5(E2, y2, w4 = E2.length) {
    for (y2 < 0 && (y2 += E2.length), w4 < 0 ? w4 += E2.length : w4 > E2.length && (w4 = E2.length); y2 < w4; y2++) yield E2[y2];
  }
  W.slice = M5;
  function q3(E2, y2 = Number.POSITIVE_INFINITY) {
    let w4 = [];
    if (y2 === 0) return [w4, E2];
    let G4 = E2[Symbol.iterator]();
    for (let ue3 = 0; ue3 < y2; ue3++) {
      let Se3 = G4.next();
      if (Se3.done) return [w4, W.empty()];
      w4.push(Se3.value);
    }
    return [w4, { [Symbol.iterator]() {
      return G4;
    } }];
  }
  W.consume = q3;
  async function S3(E2) {
    let y2 = [];
    for await (let w4 of E2) y2.push(w4);
    return Promise.resolve(y2);
  }
  W.asyncToArray = S3;
})(_i2 ||= {});
var Ar2 = false;
var Ne2 = null;
var gt2 = class gt3 {
  constructor() {
    this.livingDisposables = /* @__PURE__ */ new Map();
  }
  getDisposableData(e) {
    let t = this.livingDisposables.get(e);
    return t || (t = { parent: null, source: null, isSingleton: false, value: e, idx: gt3.idx++ }, this.livingDisposables.set(e, t)), t;
  }
  trackDisposable(e) {
    let t = this.getDisposableData(e);
    t.source || (t.source = new Error().stack);
  }
  setParent(e, t) {
    let n2 = this.getDisposableData(e);
    n2.parent = t;
  }
  markAsDisposed(e) {
    this.livingDisposables.delete(e);
  }
  markAsSingleton(e) {
    this.getDisposableData(e).isSingleton = true;
  }
  getRootParent(e, t) {
    let n2 = t.get(e);
    if (n2) return n2;
    let s15 = e.parent ? this.getRootParent(this.getDisposableData(e.parent), t) : e;
    return t.set(e, s15), s15;
  }
  getTrackedDisposables() {
    let e = /* @__PURE__ */ new Map();
    return [...this.livingDisposables.entries()].filter(([, n2]) => n2.source !== null && !this.getRootParent(n2, e).isSingleton).flatMap(([n2]) => n2);
  }
  computeLeakingDisposables(e = 10, t) {
    let n2;
    if (t) n2 = t;
    else {
      let l2 = /* @__PURE__ */ new Map(), u2 = [...this.livingDisposables.values()].filter((d2) => d2.source !== null && !this.getRootParent(d2, l2).isSingleton);
      if (u2.length === 0) return;
      let c2 = new Set(u2.map((d2) => d2.value));
      if (n2 = u2.filter((d2) => !(d2.parent && c2.has(d2.parent))), n2.length === 0) throw new Error("There are cyclic diposable chains!");
    }
    if (!n2) return;
    function s15(l2) {
      function u2(d2, h2) {
        for (; d2.length > 0 && h2.some((f2) => typeof f2 == "string" ? f2 === d2[0] : d2[0].match(f2)); ) d2.shift();
      }
      let c2 = l2.source.split(`
`).map((d2) => d2.trim().replace("at ", "")).filter((d2) => d2 !== "");
      return u2(c2, ["Error", /^trackDisposable \(.*\)$/, /^DisposableTracker.trackDisposable \(.*\)$/]), c2.reverse();
    }
    let o = new Tt2();
    for (let l2 of n2) {
      let u2 = s15(l2);
      for (let c2 = 0; c2 <= u2.length; c2++) o.add(u2.slice(0, c2).join(`
`), l2);
    }
    n2.sort(tn2((l2) => l2.idx, nn2));
    let r5 = "", a = 0;
    for (let l2 of n2.slice(0, e)) {
      a++;
      let u2 = s15(l2), c2 = [];
      for (let d2 = 0; d2 < u2.length; d2++) {
        let h2 = u2[d2];
        h2 = `(shared with ${o.get(u2.slice(0, d2 + 1).join(`
`)).size}/${n2.length} leaks) at ${h2}`;
        let I3 = o.get(u2.slice(0, d2).join(`
`)), L3 = an2([...I3].map((M5) => s15(M5)[d2]), (M5) => M5);
        delete L3[u2[d2]];
        for (let [M5, q3] of Object.entries(L3)) c2.unshift(`    - stacktraces of ${q3.length} other leaks continue with ${M5}`);
        c2.unshift(h2);
      }
      r5 += `


==================== Leaking disposable ${a}/${n2.length}: ${l2.value.constructor.name} ====================
${c2.join(`
`)}
============================================================

`;
    }
    return n2.length > e && (r5 += `


... and ${n2.length - e} more leaking disposables

`), { leaks: n2, details: r5 };
  }
};
gt2.idx = 0;
function Sr2(i8) {
  Ne2 = i8;
}
if (Ar2) {
  let i8 = "__is_disposable_tracked__";
  Sr2(new class {
    trackDisposable(e) {
      let t = new Error("Potentially leaked disposable").stack;
      setTimeout(() => {
        e[i8] || console.log(t);
      }, 3e3);
    }
    setParent(e, t) {
      if (e && e !== B3.None) try {
        e[i8] = true;
      } catch {
      }
    }
    markAsDisposed(e) {
      if (e && e !== B3.None) try {
        e[i8] = true;
      } catch {
      }
    }
    markAsSingleton(e) {
    }
  }());
}
function Et(i8) {
  return Ne2?.trackDisposable(i8), i8;
}
function yt(i8) {
  Ne2?.markAsDisposed(i8);
}
function Qe(i8, e) {
  Ne2?.setParent(i8, e);
}
function Or2(i8, e) {
  if (Ne2) for (let t of i8) Ne2.setParent(t, e);
}
function un3(i8) {
  if (_i2.is(i8)) {
    let e = [];
    for (let t of i8) if (t) try {
      t.dispose();
    } catch (n2) {
      e.push(n2);
    }
    if (e.length === 1) throw e[0];
    if (e.length > 1) throw new AggregateError(e, "Encountered errors while disposing of store");
    return Array.isArray(i8) ? [] : i8;
  } else if (i8) return i8.dispose(), i8;
}
function It2(...i8) {
  let e = O3(() => un3(i8));
  return Or2(i8, e), e;
}
function O3(i8) {
  let e = Et({ dispose: mi2(() => {
    yt(e), i8();
  }) });
  return e;
}
var xt3 = class xt4 {
  constructor() {
    this._toDispose = /* @__PURE__ */ new Set();
    this._isDisposed = false;
    Et(this);
  }
  dispose() {
    this._isDisposed || (yt(this), this._isDisposed = true, this.clear());
  }
  get isDisposed() {
    return this._isDisposed;
  }
  clear() {
    if (this._toDispose.size !== 0) try {
      un3(this._toDispose);
    } finally {
      this._toDispose.clear();
    }
  }
  add(e) {
    if (!e) return e;
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return Qe(e, this), this._isDisposed ? xt4.DISABLE_DISPOSED_WARNING || console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack) : this._toDispose.add(e), e;
  }
  delete(e) {
    if (e) {
      if (e === this) throw new Error("Cannot dispose a disposable on itself!");
      this._toDispose.delete(e), e.dispose();
    }
  }
  deleteAndLeak(e) {
    e && this._toDispose.has(e) && (this._toDispose.delete(e), Qe(e, null));
  }
};
xt3.DISABLE_DISPOSED_WARNING = false;
var fe3 = xt3;
var B3 = class {
  constructor() {
    this._store = new fe3();
    Et(this), Qe(this._store, this);
  }
  dispose() {
    yt(this), this._store.dispose();
  }
  _register(e) {
    if (e === this) throw new Error("Cannot register a disposable on itself!");
    return this._store.add(e);
  }
};
B3.None = Object.freeze({ dispose() {
} });
var be3 = class {
  constructor() {
    this._isDisposed = false;
    Et(this);
  }
  get value() {
    return this._isDisposed ? void 0 : this._value;
  }
  set value(e) {
    this._isDisposed || e === this._value || (this._value?.dispose(), e && Qe(e, this), this._value = e);
  }
  clear() {
    this.value = void 0;
  }
  dispose() {
    this._isDisposed = true, yt(this), this._value?.dispose(), this._value = void 0;
  }
  clearAndLeak() {
    let e = this._value;
    return this._value = void 0, e && Qe(e, null), e;
  }
};
var Lt2 = typeof process < "u" && "title" in process;
var Ze3 = Lt2 ? "node" : navigator.userAgent;
var bi2 = Lt2 ? "node" : navigator.platform;
var cn2 = Ze3.includes("Firefox");
var dn2 = Ze3.includes("Edge");
var vi2 = /^((?!chrome|android).)*safari/i.test(Ze3);
function hn2() {
  if (!vi2) return 0;
  let i8 = Ze3.match(/Version\/(\d+)/);
  return i8 === null || i8.length < 2 ? 0 : parseInt(i8[1]);
}
var oo2 = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"].includes(bi2);
var ao2 = ["Windows", "Win16", "Win32", "WinCE"].includes(bi2);
var lo2 = bi2.indexOf("Linux") >= 0;
var uo = /\bCrOS\b/.test(Ze3);
var pn2 = "";
var K4 = 0;
var V2 = 0;
var C4 = 0;
var U4 = 0;
var Z3 = { css: "#00000000", rgba: 0 };
var X4;
((n2) => {
  function i8(s15, o, r5, a) {
    return a !== void 0 ? `#${Oe2(s15)}${Oe2(o)}${Oe2(r5)}${Oe2(a)}` : `#${Oe2(s15)}${Oe2(o)}${Oe2(r5)}`;
  }
  n2.toCss = i8;
  function e(s15, o, r5, a = 255) {
    return (s15 << 24 | o << 16 | r5 << 8 | a) >>> 0;
  }
  n2.toRgba = e;
  function t(s15, o, r5, a) {
    return { css: n2.toCss(s15, o, r5, a), rgba: n2.toRgba(s15, o, r5, a) };
  }
  n2.toColor = t;
})(X4 ||= {});
var Ue2;
((a) => {
  function i8(l2, u2) {
    if (U4 = (u2.rgba & 255) / 255, U4 === 1) return { css: u2.css, rgba: u2.rgba };
    let c2 = u2.rgba >> 24 & 255, d2 = u2.rgba >> 16 & 255, h2 = u2.rgba >> 8 & 255, f2 = l2.rgba >> 24 & 255, I3 = l2.rgba >> 16 & 255, L3 = l2.rgba >> 8 & 255;
    K4 = f2 + Math.round((c2 - f2) * U4), V2 = I3 + Math.round((d2 - I3) * U4), C4 = L3 + Math.round((h2 - L3) * U4);
    let M5 = X4.toCss(K4, V2, C4), q3 = X4.toRgba(K4, V2, C4);
    return { css: M5, rgba: q3 };
  }
  a.blend = i8;
  function e(l2) {
    return (l2.rgba & 255) === 255;
  }
  a.isOpaque = e;
  function t(l2, u2, c2) {
    let d2 = Te3.ensureContrastRatio(l2.rgba, u2.rgba, c2);
    if (d2) return X4.toColor(d2 >> 24 & 255, d2 >> 16 & 255, d2 >> 8 & 255);
  }
  a.ensureContrastRatio = t;
  function n2(l2) {
    let u2 = (l2.rgba | 255) >>> 0;
    return [K4, V2, C4] = Te3.toChannels(u2), { css: X4.toCss(K4, V2, C4), rgba: u2 };
  }
  a.opaque = n2;
  function s15(l2, u2) {
    return U4 = Math.round(u2 * 255), [K4, V2, C4] = Te3.toChannels(l2.rgba), { css: X4.toCss(K4, V2, C4, U4), rgba: X4.toRgba(K4, V2, C4, U4) };
  }
  a.opacity = s15;
  function o(l2, u2) {
    return U4 = l2.rgba & 255, s15(l2, U4 * u2 / 255);
  }
  a.multiplyOpacity = o;
  function r5(l2) {
    return [l2.rgba >> 24 & 255, l2.rgba >> 16 & 255, l2.rgba >> 8 & 255];
  }
  a.toColorRGB = r5;
})(Ue2 ||= {});
var Fr2;
((n2) => {
  let i8, e;
  try {
    let s15 = document.createElement("canvas");
    s15.width = 1, s15.height = 1;
    let o = s15.getContext("2d", { willReadFrequently: true });
    o && (i8 = o, i8.globalCompositeOperation = "copy", e = i8.createLinearGradient(0, 0, 1, 1));
  } catch {
  }
  function t(s15) {
    if (s15.match(/#[\da-f]{3,8}/i)) switch (s15.length) {
      case 4:
        return K4 = parseInt(s15.slice(1, 2).repeat(2), 16), V2 = parseInt(s15.slice(2, 3).repeat(2), 16), C4 = parseInt(s15.slice(3, 4).repeat(2), 16), X4.toColor(K4, V2, C4);
      case 5:
        return K4 = parseInt(s15.slice(1, 2).repeat(2), 16), V2 = parseInt(s15.slice(2, 3).repeat(2), 16), C4 = parseInt(s15.slice(3, 4).repeat(2), 16), U4 = parseInt(s15.slice(4, 5).repeat(2), 16), X4.toColor(K4, V2, C4, U4);
      case 7:
        return { css: s15, rgba: (parseInt(s15.slice(1), 16) << 8 | 255) >>> 0 };
      case 9:
        return { css: s15, rgba: parseInt(s15.slice(1), 16) >>> 0 };
    }
    let o = s15.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(0|1|\d?\.(\d+))\s*)?\)/);
    if (o) return K4 = parseInt(o[1]), V2 = parseInt(o[2]), C4 = parseInt(o[3]), U4 = Math.round((o[5] === void 0 ? 1 : parseFloat(o[5])) * 255), X4.toColor(K4, V2, C4, U4);
    if (!i8 || !e) throw new Error("css.toColor: Unsupported css format");
    if (i8.fillStyle = e, i8.fillStyle = s15, typeof i8.fillStyle != "string") throw new Error("css.toColor: Unsupported css format");
    if (i8.fillRect(0, 0, 1, 1), [K4, V2, C4, U4] = i8.getImageData(0, 0, 1, 1).data, U4 !== 255) throw new Error("css.toColor: Unsupported css format");
    return { rgba: X4.toRgba(K4, V2, C4, U4), css: s15 };
  }
  n2.toColor = t;
})(Fr2 ||= {});
var Y3;
((t) => {
  function i8(n2) {
    return e(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255);
  }
  t.relativeLuminance = i8;
  function e(n2, s15, o) {
    let r5 = n2 / 255, a = s15 / 255, l2 = o / 255, u2 = r5 <= 0.03928 ? r5 / 12.92 : Math.pow((r5 + 0.055) / 1.055, 2.4), c2 = a <= 0.03928 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4), d2 = l2 <= 0.03928 ? l2 / 12.92 : Math.pow((l2 + 0.055) / 1.055, 2.4);
    return u2 * 0.2126 + c2 * 0.7152 + d2 * 0.0722;
  }
  t.relativeLuminance2 = e;
})(Y3 ||= {});
var Te3;
((o) => {
  function i8(r5, a) {
    if (U4 = (a & 255) / 255, U4 === 1) return a;
    let l2 = a >> 24 & 255, u2 = a >> 16 & 255, c2 = a >> 8 & 255, d2 = r5 >> 24 & 255, h2 = r5 >> 16 & 255, f2 = r5 >> 8 & 255;
    return K4 = d2 + Math.round((l2 - d2) * U4), V2 = h2 + Math.round((u2 - h2) * U4), C4 = f2 + Math.round((c2 - f2) * U4), X4.toRgba(K4, V2, C4);
  }
  o.blend = i8;
  function e(r5, a, l2) {
    let u2 = Y3.relativeLuminance(r5 >> 8), c2 = Y3.relativeLuminance(a >> 8);
    if (ve3(u2, c2) < l2) {
      if (c2 < u2) {
        let I3 = t(r5, a, l2), L3 = ve3(u2, Y3.relativeLuminance(I3 >> 8));
        if (L3 < l2) {
          let M5 = n2(r5, a, l2), q3 = ve3(u2, Y3.relativeLuminance(M5 >> 8));
          return L3 > q3 ? I3 : M5;
        }
        return I3;
      }
      let h2 = n2(r5, a, l2), f2 = ve3(u2, Y3.relativeLuminance(h2 >> 8));
      if (f2 < l2) {
        let I3 = t(r5, a, l2), L3 = ve3(u2, Y3.relativeLuminance(I3 >> 8));
        return f2 > L3 ? h2 : I3;
      }
      return h2;
    }
  }
  o.ensureContrastRatio = e;
  function t(r5, a, l2) {
    let u2 = r5 >> 24 & 255, c2 = r5 >> 16 & 255, d2 = r5 >> 8 & 255, h2 = a >> 24 & 255, f2 = a >> 16 & 255, I3 = a >> 8 & 255, L3 = ve3(Y3.relativeLuminance2(h2, f2, I3), Y3.relativeLuminance2(u2, c2, d2));
    for (; L3 < l2 && (h2 > 0 || f2 > 0 || I3 > 0); ) h2 -= Math.max(0, Math.ceil(h2 * 0.1)), f2 -= Math.max(0, Math.ceil(f2 * 0.1)), I3 -= Math.max(0, Math.ceil(I3 * 0.1)), L3 = ve3(Y3.relativeLuminance2(h2, f2, I3), Y3.relativeLuminance2(u2, c2, d2));
    return (h2 << 24 | f2 << 16 | I3 << 8 | 255) >>> 0;
  }
  o.reduceLuminance = t;
  function n2(r5, a, l2) {
    let u2 = r5 >> 24 & 255, c2 = r5 >> 16 & 255, d2 = r5 >> 8 & 255, h2 = a >> 24 & 255, f2 = a >> 16 & 255, I3 = a >> 8 & 255, L3 = ve3(Y3.relativeLuminance2(h2, f2, I3), Y3.relativeLuminance2(u2, c2, d2));
    for (; L3 < l2 && (h2 < 255 || f2 < 255 || I3 < 255); ) h2 = Math.min(255, h2 + Math.ceil((255 - h2) * 0.1)), f2 = Math.min(255, f2 + Math.ceil((255 - f2) * 0.1)), I3 = Math.min(255, I3 + Math.ceil((255 - I3) * 0.1)), L3 = ve3(Y3.relativeLuminance2(h2, f2, I3), Y3.relativeLuminance2(u2, c2, d2));
    return (h2 << 24 | f2 << 16 | I3 << 8 | 255) >>> 0;
  }
  o.increaseLuminance = n2;
  function s15(r5) {
    return [r5 >> 24 & 255, r5 >> 16 & 255, r5 >> 8 & 255, r5 & 255];
  }
  o.toChannels = s15;
})(Te3 ||= {});
function Oe2(i8) {
  let e = i8.toString(16);
  return e.length < 2 ? "0" + e : e;
}
function ve3(i8, e) {
  return i8 < e ? (e + 0.05) / (i8 + 0.05) : (i8 + 0.05) / (e + 0.05);
}
function F3(i8) {
  if (!i8) throw new Error("value must not be falsy");
  return i8;
}
function Rt2(i8) {
  return 57508 <= i8 && i8 <= 57558;
}
function fn2(i8) {
  return 57520 <= i8 && i8 <= 57527;
}
function kr2(i8) {
  return 57344 <= i8 && i8 <= 63743;
}
function Pr2(i8) {
  return 9472 <= i8 && i8 <= 9631;
}
function Br2(i8) {
  return i8 >= 128512 && i8 <= 128591 || i8 >= 127744 && i8 <= 128511 || i8 >= 128640 && i8 <= 128767 || i8 >= 9728 && i8 <= 9983 || i8 >= 9984 && i8 <= 10175 || i8 >= 65024 && i8 <= 65039 || i8 >= 129280 && i8 <= 129535 || i8 >= 127462 && i8 <= 127487;
}
function mn2(i8, e, t, n2) {
  return e === 1 && t > Math.ceil(n2 * 1.5) && i8 !== void 0 && i8 > 255 && !Br2(i8) && !Rt2(i8) && !kr2(i8);
}
function Dt2(i8) {
  return Rt2(i8) || Pr2(i8);
}
function _n2() {
  return { css: { canvas: wt2(), cell: wt2() }, device: { canvas: wt2(), cell: wt2(), char: { width: 0, height: 0, left: 0, top: 0 } } };
}
function wt2() {
  return { width: 0, height: 0 };
}
function bn2(i8, e, t = 0) {
  return (i8 - (Math.round(e) * 2 - t)) % (Math.round(e) * 2);
}
var j3 = 0;
var z3 = 0;
var me2 = false;
var ge3 = false;
var Mt3 = false;
var J4;
var Ti2 = 0;
var At3 = class {
  constructor(e, t, n2, s15, o, r5) {
    this._terminal = e;
    this._optionService = t;
    this._selectionRenderModel = n2;
    this._decorationService = s15;
    this._coreBrowserService = o;
    this._themeService = r5;
    this.result = { fg: 0, bg: 0, ext: 0 };
  }
  resolve(e, t, n2, s15) {
    if (this.result.bg = e.bg, this.result.fg = e.fg, this.result.ext = e.bg & 268435456 ? e.extended.ext : 0, z3 = 0, j3 = 0, ge3 = false, me2 = false, Mt3 = false, J4 = this._themeService.colors, Ti2 = 0, e.getCode() !== 0 && e.extended.underlineStyle === 4) {
      let r5 = Math.max(1, Math.floor(this._optionService.rawOptions.fontSize * this._coreBrowserService.dpr / 15));
      Ti2 = t * s15 % (Math.round(r5) * 2);
    }
    if (this._decorationService.forEachDecorationAtCell(t, n2, "bottom", (r5) => {
      r5.backgroundColorRGB && (z3 = r5.backgroundColorRGB.rgba >> 8 & 16777215, ge3 = true), r5.foregroundColorRGB && (j3 = r5.foregroundColorRGB.rgba >> 8 & 16777215, me2 = true);
    }), Mt3 = this._selectionRenderModel.isCellSelected(this._terminal, t, n2), Mt3) {
      if (this.result.fg & 67108864 || (this.result.bg & 50331648) !== 0) {
        if (this.result.fg & 67108864) switch (this.result.fg & 50331648) {
          case 16777216:
          case 33554432:
            z3 = this._themeService.colors.ansi[this.result.fg & 255].rgba;
            break;
          case 50331648:
            z3 = (this.result.fg & 16777215) << 8 | 255;
            break;
          case 0:
          default:
            z3 = this._themeService.colors.foreground.rgba;
        }
        else switch (this.result.bg & 50331648) {
          case 16777216:
          case 33554432:
            z3 = this._themeService.colors.ansi[this.result.bg & 255].rgba;
            break;
          case 50331648:
            z3 = (this.result.bg & 16777215) << 8 | 255;
            break;
        }
        z3 = Te3.blend(z3, (this._coreBrowserService.isFocused ? J4.selectionBackgroundOpaque : J4.selectionInactiveBackgroundOpaque).rgba & 4294967040 | 128) >> 8 & 16777215;
      } else z3 = (this._coreBrowserService.isFocused ? J4.selectionBackgroundOpaque : J4.selectionInactiveBackgroundOpaque).rgba >> 8 & 16777215;
      if (ge3 = true, J4.selectionForeground && (j3 = J4.selectionForeground.rgba >> 8 & 16777215, me2 = true), Dt2(e.getCode())) {
        if (this.result.fg & 67108864 && (this.result.bg & 50331648) === 0) j3 = (this._coreBrowserService.isFocused ? J4.selectionBackgroundOpaque : J4.selectionInactiveBackgroundOpaque).rgba >> 8 & 16777215;
        else {
          if (this.result.fg & 67108864) switch (this.result.bg & 50331648) {
            case 16777216:
            case 33554432:
              j3 = this._themeService.colors.ansi[this.result.bg & 255].rgba;
              break;
            case 50331648:
              j3 = (this.result.bg & 16777215) << 8 | 255;
              break;
          }
          else switch (this.result.fg & 50331648) {
            case 16777216:
            case 33554432:
              j3 = this._themeService.colors.ansi[this.result.fg & 255].rgba;
              break;
            case 50331648:
              j3 = (this.result.fg & 16777215) << 8 | 255;
              break;
            case 0:
            default:
              j3 = this._themeService.colors.foreground.rgba;
          }
          j3 = Te3.blend(j3, (this._coreBrowserService.isFocused ? J4.selectionBackgroundOpaque : J4.selectionInactiveBackgroundOpaque).rgba & 4294967040 | 128) >> 8 & 16777215;
        }
        me2 = true;
      }
    }
    this._decorationService.forEachDecorationAtCell(t, n2, "top", (r5) => {
      r5.backgroundColorRGB && (z3 = r5.backgroundColorRGB.rgba >> 8 & 16777215, ge3 = true), r5.foregroundColorRGB && (j3 = r5.foregroundColorRGB.rgba >> 8 & 16777215, me2 = true);
    }), ge3 && (Mt3 ? z3 = e.bg & -16777216 & -134217729 | z3 | 50331648 : z3 = e.bg & -16777216 | z3 | 50331648), me2 && (j3 = e.fg & -16777216 & -67108865 | j3 | 50331648), this.result.fg & 67108864 && (ge3 && !me2 && ((this.result.bg & 50331648) === 0 ? j3 = this.result.fg & -134217728 | J4.background.rgba >> 8 & 16777215 & 16777215 | 50331648 : j3 = this.result.fg & -134217728 | this.result.bg & 67108863, me2 = true), !ge3 && me2 && ((this.result.fg & 50331648) === 0 ? z3 = this.result.bg & -67108864 | J4.foreground.rgba >> 8 & 16777215 & 16777215 | 50331648 : z3 = this.result.bg & -67108864 | this.result.fg & 67108863, ge3 = true)), J4 = void 0, this.result.bg = ge3 ? z3 : this.result.bg, this.result.fg = me2 ? j3 : this.result.fg, this.result.ext &= 536870911, this.result.ext |= Ti2 << 29 & 3758096384;
  }
};
var gn2 = 0.5;
var St2 = cn2 || dn2 ? "bottom" : "ideographic";
var Hr = { "\u2580": [{ x: 0, y: 0, w: 8, h: 4 }], "\u2581": [{ x: 0, y: 7, w: 8, h: 1 }], "\u2582": [{ x: 0, y: 6, w: 8, h: 2 }], "\u2583": [{ x: 0, y: 5, w: 8, h: 3 }], "\u2584": [{ x: 0, y: 4, w: 8, h: 4 }], "\u2585": [{ x: 0, y: 3, w: 8, h: 5 }], "\u2586": [{ x: 0, y: 2, w: 8, h: 6 }], "\u2587": [{ x: 0, y: 1, w: 8, h: 7 }], "\u2588": [{ x: 0, y: 0, w: 8, h: 8 }], "\u2589": [{ x: 0, y: 0, w: 7, h: 8 }], "\u258A": [{ x: 0, y: 0, w: 6, h: 8 }], "\u258B": [{ x: 0, y: 0, w: 5, h: 8 }], "\u258C": [{ x: 0, y: 0, w: 4, h: 8 }], "\u258D": [{ x: 0, y: 0, w: 3, h: 8 }], "\u258E": [{ x: 0, y: 0, w: 2, h: 8 }], "\u258F": [{ x: 0, y: 0, w: 1, h: 8 }], "\u2590": [{ x: 4, y: 0, w: 4, h: 8 }], "\u2594": [{ x: 0, y: 0, w: 8, h: 1 }], "\u2595": [{ x: 7, y: 0, w: 1, h: 8 }], "\u2596": [{ x: 0, y: 4, w: 4, h: 4 }], "\u2597": [{ x: 4, y: 4, w: 4, h: 4 }], "\u2598": [{ x: 0, y: 0, w: 4, h: 4 }], "\u2599": [{ x: 0, y: 0, w: 4, h: 8 }, { x: 0, y: 4, w: 8, h: 4 }], "\u259A": [{ x: 0, y: 0, w: 4, h: 4 }, { x: 4, y: 4, w: 4, h: 4 }], "\u259B": [{ x: 0, y: 0, w: 4, h: 8 }, { x: 4, y: 0, w: 4, h: 4 }], "\u259C": [{ x: 0, y: 0, w: 8, h: 4 }, { x: 4, y: 0, w: 4, h: 8 }], "\u259D": [{ x: 4, y: 0, w: 4, h: 4 }], "\u259E": [{ x: 4, y: 0, w: 4, h: 4 }, { x: 0, y: 4, w: 4, h: 4 }], "\u259F": [{ x: 4, y: 0, w: 4, h: 8 }, { x: 0, y: 4, w: 8, h: 4 }], "\u{1FB70}": [{ x: 1, y: 0, w: 1, h: 8 }], "\u{1FB71}": [{ x: 2, y: 0, w: 1, h: 8 }], "\u{1FB72}": [{ x: 3, y: 0, w: 1, h: 8 }], "\u{1FB73}": [{ x: 4, y: 0, w: 1, h: 8 }], "\u{1FB74}": [{ x: 5, y: 0, w: 1, h: 8 }], "\u{1FB75}": [{ x: 6, y: 0, w: 1, h: 8 }], "\u{1FB76}": [{ x: 0, y: 1, w: 8, h: 1 }], "\u{1FB77}": [{ x: 0, y: 2, w: 8, h: 1 }], "\u{1FB78}": [{ x: 0, y: 3, w: 8, h: 1 }], "\u{1FB79}": [{ x: 0, y: 4, w: 8, h: 1 }], "\u{1FB7A}": [{ x: 0, y: 5, w: 8, h: 1 }], "\u{1FB7B}": [{ x: 0, y: 6, w: 8, h: 1 }], "\u{1FB7C}": [{ x: 0, y: 0, w: 1, h: 8 }, { x: 0, y: 7, w: 8, h: 1 }], "\u{1FB7D}": [{ x: 0, y: 0, w: 1, h: 8 }, { x: 0, y: 0, w: 8, h: 1 }], "\u{1FB7E}": [{ x: 7, y: 0, w: 1, h: 8 }, { x: 0, y: 0, w: 8, h: 1 }], "\u{1FB7F}": [{ x: 7, y: 0, w: 1, h: 8 }, { x: 0, y: 7, w: 8, h: 1 }], "\u{1FB80}": [{ x: 0, y: 0, w: 8, h: 1 }, { x: 0, y: 7, w: 8, h: 1 }], "\u{1FB81}": [{ x: 0, y: 0, w: 8, h: 1 }, { x: 0, y: 2, w: 8, h: 1 }, { x: 0, y: 4, w: 8, h: 1 }, { x: 0, y: 7, w: 8, h: 1 }], "\u{1FB82}": [{ x: 0, y: 0, w: 8, h: 2 }], "\u{1FB83}": [{ x: 0, y: 0, w: 8, h: 3 }], "\u{1FB84}": [{ x: 0, y: 0, w: 8, h: 5 }], "\u{1FB85}": [{ x: 0, y: 0, w: 8, h: 6 }], "\u{1FB86}": [{ x: 0, y: 0, w: 8, h: 7 }], "\u{1FB87}": [{ x: 6, y: 0, w: 2, h: 8 }], "\u{1FB88}": [{ x: 5, y: 0, w: 3, h: 8 }], "\u{1FB89}": [{ x: 3, y: 0, w: 5, h: 8 }], "\u{1FB8A}": [{ x: 2, y: 0, w: 6, h: 8 }], "\u{1FB8B}": [{ x: 1, y: 0, w: 7, h: 8 }], "\u{1FB95}": [{ x: 0, y: 0, w: 2, h: 2 }, { x: 4, y: 0, w: 2, h: 2 }, { x: 2, y: 2, w: 2, h: 2 }, { x: 6, y: 2, w: 2, h: 2 }, { x: 0, y: 4, w: 2, h: 2 }, { x: 4, y: 4, w: 2, h: 2 }, { x: 2, y: 6, w: 2, h: 2 }, { x: 6, y: 6, w: 2, h: 2 }], "\u{1FB96}": [{ x: 2, y: 0, w: 2, h: 2 }, { x: 6, y: 0, w: 2, h: 2 }, { x: 0, y: 2, w: 2, h: 2 }, { x: 4, y: 2, w: 2, h: 2 }, { x: 2, y: 4, w: 2, h: 2 }, { x: 6, y: 4, w: 2, h: 2 }, { x: 0, y: 6, w: 2, h: 2 }, { x: 4, y: 6, w: 2, h: 2 }], "\u{1FB97}": [{ x: 0, y: 2, w: 8, h: 2 }, { x: 0, y: 6, w: 8, h: 2 }] };
var Wr2 = { "\u2591": [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0]], "\u2592": [[1, 0], [0, 0], [0, 1], [0, 0]], "\u2593": [[0, 1], [1, 1], [1, 0], [1, 1]] };
var Gr2 = { "\u2500": { 1: "M0,.5 L1,.5" }, "\u2501": { 3: "M0,.5 L1,.5" }, "\u2502": { 1: "M.5,0 L.5,1" }, "\u2503": { 3: "M.5,0 L.5,1" }, "\u250C": { 1: "M0.5,1 L.5,.5 L1,.5" }, "\u250F": { 3: "M0.5,1 L.5,.5 L1,.5" }, "\u2510": { 1: "M0,.5 L.5,.5 L.5,1" }, "\u2513": { 3: "M0,.5 L.5,.5 L.5,1" }, "\u2514": { 1: "M.5,0 L.5,.5 L1,.5" }, "\u2517": { 3: "M.5,0 L.5,.5 L1,.5" }, "\u2518": { 1: "M.5,0 L.5,.5 L0,.5" }, "\u251B": { 3: "M.5,0 L.5,.5 L0,.5" }, "\u251C": { 1: "M.5,0 L.5,1 M.5,.5 L1,.5" }, "\u2523": { 3: "M.5,0 L.5,1 M.5,.5 L1,.5" }, "\u2524": { 1: "M.5,0 L.5,1 M.5,.5 L0,.5" }, "\u252B": { 3: "M.5,0 L.5,1 M.5,.5 L0,.5" }, "\u252C": { 1: "M0,.5 L1,.5 M.5,.5 L.5,1" }, "\u2533": { 3: "M0,.5 L1,.5 M.5,.5 L.5,1" }, "\u2534": { 1: "M0,.5 L1,.5 M.5,.5 L.5,0" }, "\u253B": { 3: "M0,.5 L1,.5 M.5,.5 L.5,0" }, "\u253C": { 1: "M0,.5 L1,.5 M.5,0 L.5,1" }, "\u254B": { 3: "M0,.5 L1,.5 M.5,0 L.5,1" }, "\u2574": { 1: "M.5,.5 L0,.5" }, "\u2578": { 3: "M.5,.5 L0,.5" }, "\u2575": { 1: "M.5,.5 L.5,0" }, "\u2579": { 3: "M.5,.5 L.5,0" }, "\u2576": { 1: "M.5,.5 L1,.5" }, "\u257A": { 3: "M.5,.5 L1,.5" }, "\u2577": { 1: "M.5,.5 L.5,1" }, "\u257B": { 3: "M.5,.5 L.5,1" }, "\u2550": { 1: (i8, e) => `M0,${0.5 - e} L1,${0.5 - e} M0,${0.5 + e} L1,${0.5 + e}` }, "\u2551": { 1: (i8, e) => `M${0.5 - i8},0 L${0.5 - i8},1 M${0.5 + i8},0 L${0.5 + i8},1` }, "\u2552": { 1: (i8, e) => `M.5,1 L.5,${0.5 - e} L1,${0.5 - e} M.5,${0.5 + e} L1,${0.5 + e}` }, "\u2553": { 1: (i8, e) => `M${0.5 - i8},1 L${0.5 - i8},.5 L1,.5 M${0.5 + i8},.5 L${0.5 + i8},1` }, "\u2554": { 1: (i8, e) => `M1,${0.5 - e} L${0.5 - i8},${0.5 - e} L${0.5 - i8},1 M1,${0.5 + e} L${0.5 + i8},${0.5 + e} L${0.5 + i8},1` }, "\u2555": { 1: (i8, e) => `M0,${0.5 - e} L.5,${0.5 - e} L.5,1 M0,${0.5 + e} L.5,${0.5 + e}` }, "\u2556": { 1: (i8, e) => `M${0.5 + i8},1 L${0.5 + i8},.5 L0,.5 M${0.5 - i8},.5 L${0.5 - i8},1` }, "\u2557": { 1: (i8, e) => `M0,${0.5 + e} L${0.5 - i8},${0.5 + e} L${0.5 - i8},1 M0,${0.5 - e} L${0.5 + i8},${0.5 - e} L${0.5 + i8},1` }, "\u2558": { 1: (i8, e) => `M.5,0 L.5,${0.5 + e} L1,${0.5 + e} M.5,${0.5 - e} L1,${0.5 - e}` }, "\u2559": { 1: (i8, e) => `M1,.5 L${0.5 - i8},.5 L${0.5 - i8},0 M${0.5 + i8},.5 L${0.5 + i8},0` }, "\u255A": { 1: (i8, e) => `M1,${0.5 - e} L${0.5 + i8},${0.5 - e} L${0.5 + i8},0 M1,${0.5 + e} L${0.5 - i8},${0.5 + e} L${0.5 - i8},0` }, "\u255B": { 1: (i8, e) => `M0,${0.5 + e} L.5,${0.5 + e} L.5,0 M0,${0.5 - e} L.5,${0.5 - e}` }, "\u255C": { 1: (i8, e) => `M0,.5 L${0.5 + i8},.5 L${0.5 + i8},0 M${0.5 - i8},.5 L${0.5 - i8},0` }, "\u255D": { 1: (i8, e) => `M0,${0.5 - e} L${0.5 - i8},${0.5 - e} L${0.5 - i8},0 M0,${0.5 + e} L${0.5 + i8},${0.5 + e} L${0.5 + i8},0` }, "\u255E": { 1: (i8, e) => `M.5,0 L.5,1 M.5,${0.5 - e} L1,${0.5 - e} M.5,${0.5 + e} L1,${0.5 + e}` }, "\u255F": { 1: (i8, e) => `M${0.5 - i8},0 L${0.5 - i8},1 M${0.5 + i8},0 L${0.5 + i8},1 M${0.5 + i8},.5 L1,.5` }, "\u2560": { 1: (i8, e) => `M${0.5 - i8},0 L${0.5 - i8},1 M1,${0.5 + e} L${0.5 + i8},${0.5 + e} L${0.5 + i8},1 M1,${0.5 - e} L${0.5 + i8},${0.5 - e} L${0.5 + i8},0` }, "\u2561": { 1: (i8, e) => `M.5,0 L.5,1 M0,${0.5 - e} L.5,${0.5 - e} M0,${0.5 + e} L.5,${0.5 + e}` }, "\u2562": { 1: (i8, e) => `M0,.5 L${0.5 - i8},.5 M${0.5 - i8},0 L${0.5 - i8},1 M${0.5 + i8},0 L${0.5 + i8},1` }, "\u2563": { 1: (i8, e) => `M${0.5 + i8},0 L${0.5 + i8},1 M0,${0.5 + e} L${0.5 - i8},${0.5 + e} L${0.5 - i8},1 M0,${0.5 - e} L${0.5 - i8},${0.5 - e} L${0.5 - i8},0` }, "\u2564": { 1: (i8, e) => `M0,${0.5 - e} L1,${0.5 - e} M0,${0.5 + e} L1,${0.5 + e} M.5,${0.5 + e} L.5,1` }, "\u2565": { 1: (i8, e) => `M0,.5 L1,.5 M${0.5 - i8},.5 L${0.5 - i8},1 M${0.5 + i8},.5 L${0.5 + i8},1` }, "\u2566": { 1: (i8, e) => `M0,${0.5 - e} L1,${0.5 - e} M0,${0.5 + e} L${0.5 - i8},${0.5 + e} L${0.5 - i8},1 M1,${0.5 + e} L${0.5 + i8},${0.5 + e} L${0.5 + i8},1` }, "\u2567": { 1: (i8, e) => `M.5,0 L.5,${0.5 - e} M0,${0.5 - e} L1,${0.5 - e} M0,${0.5 + e} L1,${0.5 + e}` }, "\u2568": { 1: (i8, e) => `M0,.5 L1,.5 M${0.5 - i8},.5 L${0.5 - i8},0 M${0.5 + i8},.5 L${0.5 + i8},0` }, "\u2569": { 1: (i8, e) => `M0,${0.5 + e} L1,${0.5 + e} M0,${0.5 - e} L${0.5 - i8},${0.5 - e} L${0.5 - i8},0 M1,${0.5 - e} L${0.5 + i8},${0.5 - e} L${0.5 + i8},0` }, "\u256A": { 1: (i8, e) => `M.5,0 L.5,1 M0,${0.5 - e} L1,${0.5 - e} M0,${0.5 + e} L1,${0.5 + e}` }, "\u256B": { 1: (i8, e) => `M0,.5 L1,.5 M${0.5 - i8},0 L${0.5 - i8},1 M${0.5 + i8},0 L${0.5 + i8},1` }, "\u256C": { 1: (i8, e) => `M0,${0.5 + e} L${0.5 - i8},${0.5 + e} L${0.5 - i8},1 M1,${0.5 + e} L${0.5 + i8},${0.5 + e} L${0.5 + i8},1 M0,${0.5 - e} L${0.5 - i8},${0.5 - e} L${0.5 - i8},0 M1,${0.5 - e} L${0.5 + i8},${0.5 - e} L${0.5 + i8},0` }, "\u2571": { 1: "M1,0 L0,1" }, "\u2572": { 1: "M0,0 L1,1" }, "\u2573": { 1: "M1,0 L0,1 M0,0 L1,1" }, "\u257C": { 1: "M.5,.5 L0,.5", 3: "M.5,.5 L1,.5" }, "\u257D": { 1: "M.5,.5 L.5,0", 3: "M.5,.5 L.5,1" }, "\u257E": { 1: "M.5,.5 L1,.5", 3: "M.5,.5 L0,.5" }, "\u257F": { 1: "M.5,.5 L.5,1", 3: "M.5,.5 L.5,0" }, "\u250D": { 1: "M.5,.5 L.5,1", 3: "M.5,.5 L1,.5" }, "\u250E": { 1: "M.5,.5 L1,.5", 3: "M.5,.5 L.5,1" }, "\u2511": { 1: "M.5,.5 L.5,1", 3: "M.5,.5 L0,.5" }, "\u2512": { 1: "M.5,.5 L0,.5", 3: "M.5,.5 L.5,1" }, "\u2515": { 1: "M.5,.5 L.5,0", 3: "M.5,.5 L1,.5" }, "\u2516": { 1: "M.5,.5 L1,.5", 3: "M.5,.5 L.5,0" }, "\u2519": { 1: "M.5,.5 L.5,0", 3: "M.5,.5 L0,.5" }, "\u251A": { 1: "M.5,.5 L0,.5", 3: "M.5,.5 L.5,0" }, "\u251D": { 1: "M.5,0 L.5,1", 3: "M.5,.5 L1,.5" }, "\u251E": { 1: "M0.5,1 L.5,.5 L1,.5", 3: "M.5,.5 L.5,0" }, "\u251F": { 1: "M.5,0 L.5,.5 L1,.5", 3: "M.5,.5 L.5,1" }, "\u2520": { 1: "M.5,.5 L1,.5", 3: "M.5,0 L.5,1" }, "\u2521": { 1: "M.5,.5 L.5,1", 3: "M.5,0 L.5,.5 L1,.5" }, "\u2522": { 1: "M.5,.5 L.5,0", 3: "M0.5,1 L.5,.5 L1,.5" }, "\u2525": { 1: "M.5,0 L.5,1", 3: "M.5,.5 L0,.5" }, "\u2526": { 1: "M0,.5 L.5,.5 L.5,1", 3: "M.5,.5 L.5,0" }, "\u2527": { 1: "M.5,0 L.5,.5 L0,.5", 3: "M.5,.5 L.5,1" }, "\u2528": { 1: "M.5,.5 L0,.5", 3: "M.5,0 L.5,1" }, "\u2529": { 1: "M.5,.5 L.5,1", 3: "M.5,0 L.5,.5 L0,.5" }, "\u252A": { 1: "M.5,.5 L.5,0", 3: "M0,.5 L.5,.5 L.5,1" }, "\u252D": { 1: "M0.5,1 L.5,.5 L1,.5", 3: "M.5,.5 L0,.5" }, "\u252E": { 1: "M0,.5 L.5,.5 L.5,1", 3: "M.5,.5 L1,.5" }, "\u252F": { 1: "M.5,.5 L.5,1", 3: "M0,.5 L1,.5" }, "\u2530": { 1: "M0,.5 L1,.5", 3: "M.5,.5 L.5,1" }, "\u2531": { 1: "M.5,.5 L1,.5", 3: "M0,.5 L.5,.5 L.5,1" }, "\u2532": { 1: "M.5,.5 L0,.5", 3: "M0.5,1 L.5,.5 L1,.5" }, "\u2535": { 1: "M.5,0 L.5,.5 L1,.5", 3: "M.5,.5 L0,.5" }, "\u2536": { 1: "M.5,0 L.5,.5 L0,.5", 3: "M.5,.5 L1,.5" }, "\u2537": { 1: "M.5,.5 L.5,0", 3: "M0,.5 L1,.5" }, "\u2538": { 1: "M0,.5 L1,.5", 3: "M.5,.5 L.5,0" }, "\u2539": { 1: "M.5,.5 L1,.5", 3: "M.5,0 L.5,.5 L0,.5" }, "\u253A": { 1: "M.5,.5 L0,.5", 3: "M.5,0 L.5,.5 L1,.5" }, "\u253D": { 1: "M.5,0 L.5,1 M.5,.5 L1,.5", 3: "M.5,.5 L0,.5" }, "\u253E": { 1: "M.5,0 L.5,1 M.5,.5 L0,.5", 3: "M.5,.5 L1,.5" }, "\u253F": { 1: "M.5,0 L.5,1", 3: "M0,.5 L1,.5" }, "\u2540": { 1: "M0,.5 L1,.5 M.5,.5 L.5,1", 3: "M.5,.5 L.5,0" }, "\u2541": { 1: "M.5,.5 L.5,0 M0,.5 L1,.5", 3: "M.5,.5 L.5,1" }, "\u2542": { 1: "M0,.5 L1,.5", 3: "M.5,0 L.5,1" }, "\u2543": { 1: "M0.5,1 L.5,.5 L1,.5", 3: "M.5,0 L.5,.5 L0,.5" }, "\u2544": { 1: "M0,.5 L.5,.5 L.5,1", 3: "M.5,0 L.5,.5 L1,.5" }, "\u2545": { 1: "M.5,0 L.5,.5 L1,.5", 3: "M0,.5 L.5,.5 L.5,1" }, "\u2546": { 1: "M.5,0 L.5,.5 L0,.5", 3: "M0.5,1 L.5,.5 L1,.5" }, "\u2547": { 1: "M.5,.5 L.5,1", 3: "M.5,.5 L.5,0 M0,.5 L1,.5" }, "\u2548": { 1: "M.5,.5 L.5,0", 3: "M0,.5 L1,.5 M.5,.5 L.5,1" }, "\u2549": { 1: "M.5,.5 L1,.5", 3: "M.5,0 L.5,1 M.5,.5 L0,.5" }, "\u254A": { 1: "M.5,.5 L0,.5", 3: "M.5,0 L.5,1 M.5,.5 L1,.5" }, "\u254C": { 1: "M.1,.5 L.4,.5 M.6,.5 L.9,.5" }, "\u254D": { 3: "M.1,.5 L.4,.5 M.6,.5 L.9,.5" }, "\u2504": { 1: "M.0667,.5 L.2667,.5 M.4,.5 L.6,.5 M.7333,.5 L.9333,.5" }, "\u2505": { 3: "M.0667,.5 L.2667,.5 M.4,.5 L.6,.5 M.7333,.5 L.9333,.5" }, "\u2508": { 1: "M.05,.5 L.2,.5 M.3,.5 L.45,.5 M.55,.5 L.7,.5 M.8,.5 L.95,.5" }, "\u2509": { 3: "M.05,.5 L.2,.5 M.3,.5 L.45,.5 M.55,.5 L.7,.5 M.8,.5 L.95,.5" }, "\u254E": { 1: "M.5,.1 L.5,.4 M.5,.6 L.5,.9" }, "\u254F": { 3: "M.5,.1 L.5,.4 M.5,.6 L.5,.9" }, "\u2506": { 1: "M.5,.0667 L.5,.2667 M.5,.4 L.5,.6 M.5,.7333 L.5,.9333" }, "\u2507": { 3: "M.5,.0667 L.5,.2667 M.5,.4 L.5,.6 M.5,.7333 L.5,.9333" }, "\u250A": { 1: "M.5,.05 L.5,.2 M.5,.3 L.5,.45 L.5,.55 M.5,.7 L.5,.95" }, "\u250B": { 3: "M.5,.05 L.5,.2 M.5,.3 L.5,.45 L.5,.55 M.5,.7 L.5,.95" }, "\u256D": { 1: (i8, e) => `M.5,1 L.5,${0.5 + e / 0.15 * 0.5} C.5,${0.5 + e / 0.15 * 0.5},.5,.5,1,.5` }, "\u256E": { 1: (i8, e) => `M.5,1 L.5,${0.5 + e / 0.15 * 0.5} C.5,${0.5 + e / 0.15 * 0.5},.5,.5,0,.5` }, "\u256F": { 1: (i8, e) => `M.5,0 L.5,${0.5 - e / 0.15 * 0.5} C.5,${0.5 - e / 0.15 * 0.5},.5,.5,0,.5` }, "\u2570": { 1: (i8, e) => `M.5,0 L.5,${0.5 - e / 0.15 * 0.5} C.5,${0.5 - e / 0.15 * 0.5},.5,.5,1,.5` } };
var et2 = { "\uE0A0": { d: "M.3,1 L.03,1 L.03,.88 C.03,.82,.06,.78,.11,.73 C.15,.7,.2,.68,.28,.65 L.43,.6 C.49,.58,.53,.56,.56,.53 C.59,.5,.6,.47,.6,.43 L.6,.27 L.4,.27 L.69,.1 L.98,.27 L.78,.27 L.78,.46 C.78,.52,.76,.56,.72,.61 C.68,.66,.63,.67,.56,.7 L.48,.72 C.42,.74,.38,.76,.35,.78 C.32,.8,.31,.84,.31,.88 L.31,1 M.3,.5 L.03,.59 L.03,.09 L.3,.09 L.3,.655", type: 0 }, "\uE0A1": { d: "M.7,.4 L.7,.47 L.2,.47 L.2,.03 L.355,.03 L.355,.4 L.705,.4 M.7,.5 L.86,.5 L.86,.95 L.69,.95 L.44,.66 L.46,.86 L.46,.95 L.3,.95 L.3,.49 L.46,.49 L.71,.78 L.69,.565 L.69,.5", type: 0 }, "\uE0A2": { d: "M.25,.94 C.16,.94,.11,.92,.11,.87 L.11,.53 C.11,.48,.15,.455,.23,.45 L.23,.3 C.23,.25,.26,.22,.31,.19 C.36,.16,.43,.15,.51,.15 C.59,.15,.66,.16,.71,.19 C.77,.22,.79,.26,.79,.3 L.79,.45 C.87,.45,.91,.48,.91,.53 L.91,.87 C.91,.92,.86,.94,.77,.94 L.24,.94 M.53,.2 C.49,.2,.45,.21,.42,.23 C.39,.25,.38,.27,.38,.3 L.38,.45 L.68,.45 L.68,.3 C.68,.27,.67,.25,.64,.23 C.61,.21,.58,.2,.53,.2 M.58,.82 L.58,.66 C.63,.65,.65,.63,.65,.6 C.65,.58,.64,.57,.61,.56 C.58,.55,.56,.54,.52,.54 C.48,.54,.46,.55,.43,.56 C.4,.57,.39,.59,.39,.6 C.39,.63,.41,.64,.46,.66 L.46,.82 L.57,.82", type: 0 }, "\uE0B0": { d: "M0,0 L1,.5 L0,1", type: 0, rightPadding: 2 }, "\uE0B1": { d: "M-1,-.5 L1,.5 L-1,1.5", type: 1, leftPadding: 1, rightPadding: 1 }, "\uE0B2": { d: "M1,0 L0,.5 L1,1", type: 0, leftPadding: 2 }, "\uE0B3": { d: "M2,-.5 L0,.5 L2,1.5", type: 1, leftPadding: 1, rightPadding: 1 }, "\uE0B4": { d: "M0,0 L0,1 C0.552,1,1,0.776,1,.5 C1,0.224,0.552,0,0,0", type: 0, rightPadding: 1 }, "\uE0B5": { d: "M.2,1 C.422,1,.8,.826,.78,.5 C.8,.174,0.422,0,.2,0", type: 1, rightPadding: 1 }, "\uE0B6": { d: "M1,0 L1,1 C0.448,1,0,0.776,0,.5 C0,0.224,0.448,0,1,0", type: 0, leftPadding: 1 }, "\uE0B7": { d: "M.8,1 C0.578,1,0.2,.826,.22,.5 C0.2,0.174,0.578,0,0.8,0", type: 1, leftPadding: 1 }, "\uE0B8": { d: "M-.5,-.5 L1.5,1.5 L-.5,1.5", type: 0 }, "\uE0B9": { d: "M-.5,-.5 L1.5,1.5", type: 1, leftPadding: 1, rightPadding: 1 }, "\uE0BA": { d: "M1.5,-.5 L-.5,1.5 L1.5,1.5", type: 0 }, "\uE0BC": { d: "M1.5,-.5 L-.5,1.5 L-.5,-.5", type: 0 }, "\uE0BD": { d: "M1.5,-.5 L-.5,1.5", type: 1, leftPadding: 1, rightPadding: 1 }, "\uE0BE": { d: "M-.5,-.5 L1.5,1.5 L1.5,-.5", type: 0 } };
et2["\uE0BB"] = et2["\uE0BD"];
et2["\uE0BF"] = et2["\uE0B9"];
function yn2(i8, e, t, n2, s15, o, r5, a) {
  let l2 = Hr[e];
  if (l2) return $r2(i8, l2, t, n2, s15, o), true;
  let u2 = Wr2[e];
  if (u2) return Kr2(i8, u2, t, n2, s15, o), true;
  let c2 = Gr2[e];
  if (c2) return Vr2(i8, c2, t, n2, s15, o, a), true;
  let d2 = et2[e];
  return d2 ? (Cr3(i8, d2, t, n2, s15, o, r5, a), true) : false;
}
function $r2(i8, e, t, n2, s15, o) {
  for (let r5 = 0; r5 < e.length; r5++) {
    let a = e[r5], l2 = s15 / 8, u2 = o / 8;
    i8.fillRect(t + a.x * l2, n2 + a.y * u2, a.w * l2, a.h * u2);
  }
}
var xn2 = /* @__PURE__ */ new Map();
function Kr2(i8, e, t, n2, s15, o) {
  let r5 = xn2.get(e);
  r5 || (r5 = /* @__PURE__ */ new Map(), xn2.set(e, r5));
  let a = i8.fillStyle;
  if (typeof a != "string") throw new Error(`Unexpected fillStyle type "${a}"`);
  let l2 = r5.get(a);
  if (!l2) {
    let u2 = e[0].length, c2 = e.length, d2 = i8.canvas.ownerDocument.createElement("canvas");
    d2.width = u2, d2.height = c2;
    let h2 = F3(d2.getContext("2d")), f2 = new ImageData(u2, c2), I3, L3, M5, q3;
    if (a.startsWith("#")) I3 = parseInt(a.slice(1, 3), 16), L3 = parseInt(a.slice(3, 5), 16), M5 = parseInt(a.slice(5, 7), 16), q3 = a.length > 7 && parseInt(a.slice(7, 9), 16) || 1;
    else if (a.startsWith("rgba")) [I3, L3, M5, q3] = a.substring(5, a.length - 1).split(",").map((S3) => parseFloat(S3));
    else throw new Error(`Unexpected fillStyle color format "${a}" when drawing pattern glyph`);
    for (let S3 = 0; S3 < c2; S3++) for (let W = 0; W < u2; W++) f2.data[(S3 * u2 + W) * 4] = I3, f2.data[(S3 * u2 + W) * 4 + 1] = L3, f2.data[(S3 * u2 + W) * 4 + 2] = M5, f2.data[(S3 * u2 + W) * 4 + 3] = e[S3][W] * (q3 * 255);
    h2.putImageData(f2, 0, 0), l2 = F3(i8.createPattern(d2, null)), r5.set(a, l2);
  }
  i8.fillStyle = l2, i8.fillRect(t, n2, s15, o);
}
function Vr2(i8, e, t, n2, s15, o, r5) {
  i8.strokeStyle = i8.fillStyle;
  for (let [a, l2] of Object.entries(e)) {
    i8.beginPath(), i8.lineWidth = r5 * Number.parseInt(a);
    let u2;
    if (typeof l2 == "function") {
      let d2 = 0.15 / o * s15;
      u2 = l2(0.15, d2);
    } else u2 = l2;
    for (let c2 of u2.split(" ")) {
      let d2 = c2[0], h2 = In2[d2];
      if (!h2) {
        console.error(`Could not find drawing instructions for "${d2}"`);
        continue;
      }
      let f2 = c2.substring(1).split(",");
      !f2[0] || !f2[1] || h2(i8, Ln2(f2, s15, o, t, n2, true, r5));
    }
    i8.stroke(), i8.closePath();
  }
}
function Cr3(i8, e, t, n2, s15, o, r5, a) {
  let l2 = new Path2D();
  l2.rect(t, n2, s15, o), i8.clip(l2), i8.beginPath();
  let u2 = r5 / 12;
  i8.lineWidth = a * u2;
  for (let c2 of e.d.split(" ")) {
    let d2 = c2[0], h2 = In2[d2];
    if (!h2) {
      console.error(`Could not find drawing instructions for "${d2}"`);
      continue;
    }
    let f2 = c2.substring(1).split(",");
    !f2[0] || !f2[1] || h2(i8, Ln2(f2, s15, o, t, n2, false, a, (e.leftPadding ?? 0) * (u2 / 2), (e.rightPadding ?? 0) * (u2 / 2)));
  }
  e.type === 1 ? (i8.strokeStyle = i8.fillStyle, i8.stroke()) : i8.fill(), i8.closePath();
}
function En2(i8, e, t = 0) {
  return Math.max(Math.min(i8, e), t);
}
var In2 = { C: (i8, e) => i8.bezierCurveTo(e[0], e[1], e[2], e[3], e[4], e[5]), L: (i8, e) => i8.lineTo(e[0], e[1]), M: (i8, e) => i8.moveTo(e[0], e[1]) };
function Ln2(i8, e, t, n2, s15, o, r5, a = 0, l2 = 0) {
  let u2 = i8.map((c2) => parseFloat(c2) || parseInt(c2));
  if (u2.length < 2) throw new Error("Too few arguments for instruction");
  for (let c2 = 0; c2 < u2.length; c2 += 2) u2[c2] *= e - a * r5 - l2 * r5, o && u2[c2] !== 0 && (u2[c2] = En2(Math.round(u2[c2] + 0.5) - 0.5, e, 0)), u2[c2] += n2 + a * r5;
  for (let c2 = 1; c2 < u2.length; c2 += 2) u2[c2] *= t, o && u2[c2] !== 0 && (u2[c2] = En2(Math.round(u2[c2] + 0.5) - 0.5, t, 0)), u2[c2] += s15;
  return u2;
}
var Ot2 = class {
  constructor() {
    this._data = {};
  }
  set(e, t, n2) {
    this._data[e] || (this._data[e] = {}), this._data[e][t] = n2;
  }
  get(e, t) {
    return this._data[e] ? this._data[e][t] : void 0;
  }
  clear() {
    this._data = {};
  }
};
var tt2 = class {
  constructor() {
    this._data = new Ot2();
  }
  set(e, t, n2, s15, o) {
    this._data.get(e, t) || this._data.set(e, t, new Ot2()), this._data.get(e, t).set(n2, s15, o);
  }
  get(e, t, n2, s15) {
    return this._data.get(e, t)?.get(n2, s15);
  }
  clear() {
    this._data.clear();
  }
};
var Ft = class {
  constructor() {
    this._tasks = [];
    this._i = 0;
  }
  enqueue(e) {
    this._tasks.push(e), this._start();
  }
  flush() {
    for (; this._i < this._tasks.length; ) this._tasks[this._i]() || this._i++;
    this.clear();
  }
  clear() {
    this._idleCallback && (this._cancelCallback(this._idleCallback), this._idleCallback = void 0), this._i = 0, this._tasks.length = 0;
  }
  _start() {
    this._idleCallback || (this._idleCallback = this._requestCallback(this._process.bind(this)));
  }
  _process(e) {
    this._idleCallback = void 0;
    let t = 0, n2 = 0, s15 = e.timeRemaining(), o = 0;
    for (; this._i < this._tasks.length; ) {
      if (t = performance.now(), this._tasks[this._i]() || this._i++, t = Math.max(1, performance.now() - t), n2 = Math.max(t, n2), o = e.timeRemaining(), n2 * 1.5 > o) {
        s15 - t < -20 && console.warn(`task queue exceeded allotted deadline by ${Math.abs(Math.round(s15 - t))}ms`), this._start();
        return;
      }
      s15 = o;
    }
    this.clear();
  }
};
var gi2 = class extends Ft {
  _requestCallback(e) {
    return setTimeout(() => e(this._createDeadline(16)));
  }
  _cancelCallback(e) {
    clearTimeout(e);
  }
  _createDeadline(e) {
    let t = performance.now() + e;
    return { timeRemaining: () => Math.max(0, t - performance.now()) };
  }
};
var xi2 = class extends Ft {
  _requestCallback(e) {
    return requestIdleCallback(e);
  }
  _cancelCallback(e) {
    cancelIdleCallback(e);
  }
};
var wn2 = !Lt2 && "requestIdleCallback" in window ? xi2 : gi2;
var he3 = class i2 {
  constructor() {
    this.fg = 0;
    this.bg = 0;
    this.extended = new it2();
  }
  static toColorRGB(e) {
    return [e >>> 16 & 255, e >>> 8 & 255, e & 255];
  }
  static fromColorRGB(e) {
    return (e[0] & 255) << 16 | (e[1] & 255) << 8 | e[2] & 255;
  }
  clone() {
    let e = new i2();
    return e.fg = this.fg, e.bg = this.bg, e.extended = this.extended.clone(), e;
  }
  isInverse() {
    return this.fg & 67108864;
  }
  isBold() {
    return this.fg & 134217728;
  }
  isUnderline() {
    return this.hasExtendedAttrs() && this.extended.underlineStyle !== 0 ? 1 : this.fg & 268435456;
  }
  isBlink() {
    return this.fg & 536870912;
  }
  isInvisible() {
    return this.fg & 1073741824;
  }
  isItalic() {
    return this.bg & 67108864;
  }
  isDim() {
    return this.bg & 134217728;
  }
  isStrikethrough() {
    return this.fg & 2147483648;
  }
  isProtected() {
    return this.bg & 536870912;
  }
  isOverline() {
    return this.bg & 1073741824;
  }
  getFgColorMode() {
    return this.fg & 50331648;
  }
  getBgColorMode() {
    return this.bg & 50331648;
  }
  isFgRGB() {
    return (this.fg & 50331648) === 50331648;
  }
  isBgRGB() {
    return (this.bg & 50331648) === 50331648;
  }
  isFgPalette() {
    return (this.fg & 50331648) === 16777216 || (this.fg & 50331648) === 33554432;
  }
  isBgPalette() {
    return (this.bg & 50331648) === 16777216 || (this.bg & 50331648) === 33554432;
  }
  isFgDefault() {
    return (this.fg & 50331648) === 0;
  }
  isBgDefault() {
    return (this.bg & 50331648) === 0;
  }
  isAttributeDefault() {
    return this.fg === 0 && this.bg === 0;
  }
  getFgColor() {
    switch (this.fg & 50331648) {
      case 16777216:
      case 33554432:
        return this.fg & 255;
      case 50331648:
        return this.fg & 16777215;
      default:
        return -1;
    }
  }
  getBgColor() {
    switch (this.bg & 50331648) {
      case 16777216:
      case 33554432:
        return this.bg & 255;
      case 50331648:
        return this.bg & 16777215;
      default:
        return -1;
    }
  }
  hasExtendedAttrs() {
    return this.bg & 268435456;
  }
  updateExtended() {
    this.extended.isEmpty() ? this.bg &= -268435457 : this.bg |= 268435456;
  }
  getUnderlineColor() {
    if (this.bg & 268435456 && ~this.extended.underlineColor) switch (this.extended.underlineColor & 50331648) {
      case 16777216:
      case 33554432:
        return this.extended.underlineColor & 255;
      case 50331648:
        return this.extended.underlineColor & 16777215;
      default:
        return this.getFgColor();
    }
    return this.getFgColor();
  }
  getUnderlineColorMode() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? this.extended.underlineColor & 50331648 : this.getFgColorMode();
  }
  isUnderlineColorRGB() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 50331648 : this.isFgRGB();
  }
  isUnderlineColorPalette() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 16777216 || (this.extended.underlineColor & 50331648) === 33554432 : this.isFgPalette();
  }
  isUnderlineColorDefault() {
    return this.bg & 268435456 && ~this.extended.underlineColor ? (this.extended.underlineColor & 50331648) === 0 : this.isFgDefault();
  }
  getUnderlineStyle() {
    return this.fg & 268435456 ? this.bg & 268435456 ? this.extended.underlineStyle : 1 : 0;
  }
  getUnderlineVariantOffset() {
    return this.extended.underlineVariantOffset;
  }
};
var it2 = class i3 {
  constructor(e = 0, t = 0) {
    this._ext = 0;
    this._urlId = 0;
    this._ext = e, this._urlId = t;
  }
  get ext() {
    return this._urlId ? this._ext & -469762049 | this.underlineStyle << 26 : this._ext;
  }
  set ext(e) {
    this._ext = e;
  }
  get underlineStyle() {
    return this._urlId ? 5 : (this._ext & 469762048) >> 26;
  }
  set underlineStyle(e) {
    this._ext &= -469762049, this._ext |= e << 26 & 469762048;
  }
  get underlineColor() {
    return this._ext & 67108863;
  }
  set underlineColor(e) {
    this._ext &= -67108864, this._ext |= e & 67108863;
  }
  get urlId() {
    return this._urlId;
  }
  set urlId(e) {
    this._urlId = e;
  }
  get underlineVariantOffset() {
    let e = (this._ext & 3758096384) >> 29;
    return e < 0 ? e ^ 4294967288 : e;
  }
  set underlineVariantOffset(e) {
    this._ext &= 536870911, this._ext |= e << 29 & 3758096384;
  }
  clone() {
    return new i3(this._ext, this._urlId);
  }
  isEmpty() {
    return this.underlineStyle === 0 && this._urlId === 0;
  }
};
var He3 = class He4 {
  constructor(e) {
    this.element = e, this.next = He4.Undefined, this.prev = He4.Undefined;
  }
};
He3.Undefined = new He3(void 0);
var zr3 = globalThis.performance && typeof globalThis.performance.now == "function";
var kt3 = class i4 {
  static create(e) {
    return new i4(e);
  }
  constructor(e) {
    this._now = zr3 && e === false ? Date.now : globalThis.performance.now.bind(globalThis.performance), this._startTime = this._now(), this._stopTime = -1;
  }
  stop() {
    this._stopTime = this._now();
  }
  reset() {
    this._startTime = this._now(), this._stopTime = -1;
  }
  elapsed() {
    return this._stopTime !== -1 ? this._stopTime - this._startTime : this._now() - this._startTime;
  }
};
var qr2 = false;
var Dn2 = false;
var jr2 = false;
var ee4;
((se3) => {
  se3.None = () => B3.None;
  function e(v4) {
    if (jr2) {
      let { onDidAddListener: p2 } = v4, g3 = nt3.create(), b3 = 0;
      v4.onDidAddListener = () => {
        ++b3 === 2 && (console.warn("snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here"), g3.print()), p2?.();
      };
    }
  }
  function t(v4, p2) {
    return h2(v4, () => {
    }, 0, void 0, true, void 0, p2);
  }
  se3.defer = t;
  function n2(v4) {
    return (p2, g3 = null, b3) => {
      let m2 = false, _4;
      return _4 = v4((T2) => {
        if (!m2) return _4 ? _4.dispose() : m2 = true, p2.call(g3, T2);
      }, null, b3), m2 && _4.dispose(), _4;
    };
  }
  se3.once = n2;
  function s15(v4, p2, g3) {
    return c2((b3, m2 = null, _4) => v4((T2) => b3.call(m2, p2(T2)), null, _4), g3);
  }
  se3.map = s15;
  function o(v4, p2, g3) {
    return c2((b3, m2 = null, _4) => v4((T2) => {
      p2(T2), b3.call(m2, T2);
    }, null, _4), g3);
  }
  se3.forEach = o;
  function r5(v4, p2, g3) {
    return c2((b3, m2 = null, _4) => v4((T2) => p2(T2) && b3.call(m2, T2), null, _4), g3);
  }
  se3.filter = r5;
  function a(v4) {
    return v4;
  }
  se3.signal = a;
  function l2(...v4) {
    return (p2, g3 = null, b3) => {
      let m2 = It2(...v4.map((_4) => _4((T2) => p2.call(g3, T2))));
      return d2(m2, b3);
    };
  }
  se3.any = l2;
  function u2(v4, p2, g3, b3) {
    let m2 = g3;
    return s15(v4, (_4) => (m2 = p2(m2, _4), m2), b3);
  }
  se3.reduce = u2;
  function c2(v4, p2) {
    let g3, b3 = { onWillAddFirstListener() {
      g3 = v4(m2.fire, m2);
    }, onDidRemoveLastListener() {
      g3?.dispose();
    } };
    p2 || e(b3);
    let m2 = new D3(b3);
    return p2?.add(m2), m2.event;
  }
  function d2(v4, p2) {
    return p2 instanceof Array ? p2.push(v4) : p2 && p2.add(v4), v4;
  }
  function h2(v4, p2, g3 = 100, b3 = false, m2 = false, _4, T2) {
    let x2, R4, $3, P4 = 0, de3, Re3 = { leakWarningThreshold: _4, onWillAddFirstListener() {
      x2 = v4((ie4) => {
        P4++, R4 = p2(R4, ie4), b3 && !$3 && (oe.fire(R4), R4 = void 0), de3 = () => {
          let N3 = R4;
          R4 = void 0, $3 = void 0, (!b3 || P4 > 1) && oe.fire(N3), P4 = 0;
        }, typeof g3 == "number" ? (clearTimeout($3), $3 = setTimeout(de3, g3)) : $3 === void 0 && ($3 = 0, queueMicrotask(de3));
      });
    }, onWillRemoveListener() {
      m2 && P4 > 0 && de3?.();
    }, onDidRemoveLastListener() {
      de3 = void 0, x2.dispose();
    } };
    T2 || e(Re3);
    let oe = new D3(Re3);
    return T2?.add(oe), oe.event;
  }
  se3.debounce = h2;
  function f2(v4, p2 = 0, g3) {
    return se3.debounce(v4, (b3, m2) => b3 ? (b3.push(m2), b3) : [m2], p2, void 0, true, void 0, g3);
  }
  se3.accumulate = f2;
  function I3(v4, p2 = (b3, m2) => b3 === m2, g3) {
    let b3 = true, m2;
    return r5(v4, (_4) => {
      let T2 = b3 || !p2(_4, m2);
      return b3 = false, m2 = _4, T2;
    }, g3);
  }
  se3.latch = I3;
  function L3(v4, p2, g3) {
    return [se3.filter(v4, p2, g3), se3.filter(v4, (b3) => !p2(b3), g3)];
  }
  se3.split = L3;
  function M5(v4, p2 = false, g3 = [], b3) {
    let m2 = g3.slice(), _4 = v4((R4) => {
      m2 ? m2.push(R4) : x2.fire(R4);
    });
    b3 && b3.add(_4);
    let T2 = () => {
      m2?.forEach((R4) => x2.fire(R4)), m2 = null;
    }, x2 = new D3({ onWillAddFirstListener() {
      _4 || (_4 = v4((R4) => x2.fire(R4)), b3 && b3.add(_4));
    }, onDidAddFirstListener() {
      m2 && (p2 ? setTimeout(T2) : T2());
    }, onDidRemoveLastListener() {
      _4 && _4.dispose(), _4 = null;
    } });
    return b3 && b3.add(x2), x2.event;
  }
  se3.buffer = M5;
  function q3(v4, p2) {
    return (b3, m2, _4) => {
      let T2 = p2(new W());
      return v4(function(x2) {
        let R4 = T2.evaluate(x2);
        R4 !== S3 && b3.call(m2, R4);
      }, void 0, _4);
    };
  }
  se3.chain = q3;
  let S3 = Symbol("HaltChainable");
  class W {
    constructor() {
      this.steps = [];
    }
    map(p2) {
      return this.steps.push(p2), this;
    }
    forEach(p2) {
      return this.steps.push((g3) => (p2(g3), g3)), this;
    }
    filter(p2) {
      return this.steps.push((g3) => p2(g3) ? g3 : S3), this;
    }
    reduce(p2, g3) {
      let b3 = g3;
      return this.steps.push((m2) => (b3 = p2(b3, m2), b3)), this;
    }
    latch(p2 = (g3, b3) => g3 === b3) {
      let g3 = true, b3;
      return this.steps.push((m2) => {
        let _4 = g3 || !p2(m2, b3);
        return g3 = false, b3 = m2, _4 ? m2 : S3;
      }), this;
    }
    evaluate(p2) {
      for (let g3 of this.steps) if (p2 = g3(p2), p2 === S3) break;
      return p2;
    }
  }
  function E2(v4, p2, g3 = (b3) => b3) {
    let b3 = (...x2) => T2.fire(g3(...x2)), m2 = () => v4.on(p2, b3), _4 = () => v4.removeListener(p2, b3), T2 = new D3({ onWillAddFirstListener: m2, onDidRemoveLastListener: _4 });
    return T2.event;
  }
  se3.fromNodeEventEmitter = E2;
  function y2(v4, p2, g3 = (b3) => b3) {
    let b3 = (...x2) => T2.fire(g3(...x2)), m2 = () => v4.addEventListener(p2, b3), _4 = () => v4.removeEventListener(p2, b3), T2 = new D3({ onWillAddFirstListener: m2, onDidRemoveLastListener: _4 });
    return T2.event;
  }
  se3.fromDOMEventEmitter = y2;
  function w4(v4) {
    return new Promise((p2) => n2(v4)(p2));
  }
  se3.toPromise = w4;
  function G4(v4) {
    let p2 = new D3();
    return v4.then((g3) => {
      p2.fire(g3);
    }, () => {
      p2.fire(void 0);
    }).finally(() => {
      p2.dispose();
    }), p2.event;
  }
  se3.fromPromise = G4;
  function ue3(v4, p2) {
    return v4((g3) => p2.fire(g3));
  }
  se3.forward = ue3;
  function Se3(v4, p2, g3) {
    return p2(g3), v4((b3) => p2(b3));
  }
  se3.runAndSubscribe = Se3;
  class ce3 {
    constructor(p2, g3) {
      this._observable = p2;
      this._counter = 0;
      this._hasChanged = false;
      let b3 = { onWillAddFirstListener: () => {
        p2.addObserver(this);
      }, onDidRemoveLastListener: () => {
        p2.removeObserver(this);
      } };
      g3 || e(b3), this.emitter = new D3(b3), g3 && g3.add(this.emitter);
    }
    beginUpdate(p2) {
      this._counter++;
    }
    handlePossibleChange(p2) {
    }
    handleChange(p2, g3) {
      this._hasChanged = true;
    }
    endUpdate(p2) {
      this._counter--, this._counter === 0 && (this._observable.reportChanges(), this._hasChanged && (this._hasChanged = false, this.emitter.fire(this._observable.get())));
    }
  }
  function we3(v4, p2) {
    return new ce3(v4, p2).emitter.event;
  }
  se3.fromObservable = we3;
  function A3(v4) {
    return (p2, g3, b3) => {
      let m2 = 0, _4 = false, T2 = { beginUpdate() {
        m2++;
      }, endUpdate() {
        m2--, m2 === 0 && (v4.reportChanges(), _4 && (_4 = false, p2.call(g3)));
      }, handlePossibleChange() {
      }, handleChange() {
        _4 = true;
      } };
      v4.addObserver(T2), v4.reportChanges();
      let x2 = { dispose() {
        v4.removeObserver(T2);
      } };
      return b3 instanceof fe3 ? b3.add(x2) : Array.isArray(b3) && b3.push(x2), x2;
    };
  }
  se3.fromObservableLight = A3;
})(ee4 ||= {});
var We3 = class We4 {
  constructor(e) {
    this.listenerCount = 0;
    this.invocationCount = 0;
    this.elapsedOverall = 0;
    this.durations = [];
    this.name = `${e}_${We4._idPool++}`, We4.all.add(this);
  }
  start(e) {
    this._stopWatch = new kt3(), this.listenerCount = e;
  }
  stop() {
    if (this._stopWatch) {
      let e = this._stopWatch.elapsed();
      this.durations.push(e), this.elapsedOverall += e, this.invocationCount += 1, this._stopWatch = void 0;
    }
  }
};
We3.all = /* @__PURE__ */ new Set(), We3._idPool = 0;
var Ei2 = We3;
var Mn2 = -1;
var Bt2 = class Bt3 {
  constructor(e, t, n2 = (Bt3._idPool++).toString(16).padStart(3, "0")) {
    this._errorHandler = e;
    this.threshold = t;
    this.name = n2;
    this._warnCountdown = 0;
  }
  dispose() {
    this._stacks?.clear();
  }
  check(e, t) {
    let n2 = this.threshold;
    if (n2 <= 0 || t < n2) return;
    this._stacks || (this._stacks = /* @__PURE__ */ new Map());
    let s15 = this._stacks.get(e.value) || 0;
    if (this._stacks.set(e.value, s15 + 1), this._warnCountdown -= 1, this._warnCountdown <= 0) {
      this._warnCountdown = n2 * 0.5;
      let [o, r5] = this.getMostFrequentStack(), a = `[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${r5}):`;
      console.warn(a), console.warn(o);
      let l2 = new Ii2(a, o);
      this._errorHandler(l2);
    }
    return () => {
      let o = this._stacks.get(e.value) || 0;
      this._stacks.set(e.value, o - 1);
    };
  }
  getMostFrequentStack() {
    if (!this._stacks) return;
    let e, t = 0;
    for (let [n2, s15] of this._stacks) (!e || t < s15) && (e = [n2, s15], t = s15);
    return e;
  }
};
Bt2._idPool = 1;
var yi2 = Bt2;
var nt3 = class i5 {
  constructor(e) {
    this.value = e;
  }
  static create() {
    let e = new Error();
    return new i5(e.stack ?? "");
  }
  print() {
    console.warn(this.value.split(`
`).slice(2).join(`
`));
  }
};
var Ii2 = class extends Error {
  constructor(e, t) {
    super(e), this.name = "ListenerLeakError", this.stack = t;
  }
};
var Li2 = class extends Error {
  constructor(e, t) {
    super(e), this.name = "ListenerRefusalError", this.stack = t;
  }
};
var Xr2 = 0;
var Ge2 = class {
  constructor(e) {
    this.value = e;
    this.id = Xr2++;
  }
};
var Yr2 = 2;
var Qr2 = (i8, e) => {
  if (i8 instanceof Ge2) e(i8);
  else for (let t = 0; t < i8.length; t++) {
    let n2 = i8[t];
    n2 && e(n2);
  }
};
var Pt2;
if (qr2) {
  let i8 = [];
  setInterval(() => {
    i8.length !== 0 && (console.warn("[LEAKING LISTENERS] GC'ed these listeners that were NOT yet disposed:"), console.warn(i8.join(`
`)), i8.length = 0);
  }, 3e3), Pt2 = new FinalizationRegistry((e) => {
    typeof e == "string" && i8.push(e);
  });
}
var D3 = class {
  constructor(e) {
    this._size = 0;
    this._options = e, this._leakageMon = Mn2 > 0 || this._options?.leakWarningThreshold ? new yi2(e?.onListenerError ?? Pe2, this._options?.leakWarningThreshold ?? Mn2) : void 0, this._perfMon = this._options?._profName ? new Ei2(this._options._profName) : void 0, this._deliveryQueue = this._options?.deliveryQueue;
  }
  dispose() {
    if (!this._disposed) {
      if (this._disposed = true, this._deliveryQueue?.current === this && this._deliveryQueue.reset(), this._listeners) {
        if (Dn2) {
          let e = this._listeners;
          queueMicrotask(() => {
            Qr2(e, (t) => t.stack?.print());
          });
        }
        this._listeners = void 0, this._size = 0;
      }
      this._options?.onDidRemoveLastListener?.(), this._leakageMon?.dispose();
    }
  }
  get event() {
    return this._event ??= (e, t, n2) => {
      if (this._leakageMon && this._size > this._leakageMon.threshold ** 2) {
        let l2 = `[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far (${this._size} vs ${this._leakageMon.threshold})`;
        console.warn(l2);
        let u2 = this._leakageMon.getMostFrequentStack() ?? ["UNKNOWN stack", -1], c2 = new Li2(`${l2}. HINT: Stack shows most frequent listener (${u2[1]}-times)`, u2[0]);
        return (this._options?.onListenerError || Pe2)(c2), B3.None;
      }
      if (this._disposed) return B3.None;
      t && (e = e.bind(t));
      let s15 = new Ge2(e), o, r5;
      this._leakageMon && this._size >= Math.ceil(this._leakageMon.threshold * 0.2) && (s15.stack = nt3.create(), o = this._leakageMon.check(s15.stack, this._size + 1)), Dn2 && (s15.stack = r5 ?? nt3.create()), this._listeners ? this._listeners instanceof Ge2 ? (this._deliveryQueue ??= new wi2(), this._listeners = [this._listeners, s15]) : this._listeners.push(s15) : (this._options?.onWillAddFirstListener?.(this), this._listeners = s15, this._options?.onDidAddFirstListener?.(this)), this._size++;
      let a = O3(() => {
        Pt2?.unregister(a), o?.(), this._removeListener(s15);
      });
      if (n2 instanceof fe3 ? n2.add(a) : Array.isArray(n2) && n2.push(a), Pt2) {
        let l2 = new Error().stack.split(`
`).slice(2, 3).join(`
`).trim(), u2 = /(file:|vscode-file:\/\/vscode-app)?(\/[^:]*:\d+:\d+)/.exec(l2);
        Pt2.register(a, u2?.[2] ?? l2, a);
      }
      return a;
    }, this._event;
  }
  _removeListener(e) {
    if (this._options?.onWillRemoveListener?.(this), !this._listeners) return;
    if (this._size === 1) {
      this._listeners = void 0, this._options?.onDidRemoveLastListener?.(this), this._size = 0;
      return;
    }
    let t = this._listeners, n2 = t.indexOf(e);
    if (n2 === -1) throw console.log("disposed?", this._disposed), console.log("size?", this._size), console.log("arr?", JSON.stringify(this._listeners)), new Error("Attempted to dispose unknown listener");
    this._size--, t[n2] = void 0;
    let s15 = this._deliveryQueue.current === this;
    if (this._size * Yr2 <= t.length) {
      let o = 0;
      for (let r5 = 0; r5 < t.length; r5++) t[r5] ? t[o++] = t[r5] : s15 && (this._deliveryQueue.end--, o < this._deliveryQueue.i && this._deliveryQueue.i--);
      t.length = o;
    }
  }
  _deliver(e, t) {
    if (!e) return;
    let n2 = this._options?.onListenerError || Pe2;
    if (!n2) {
      e.value(t);
      return;
    }
    try {
      e.value(t);
    } catch (s15) {
      n2(s15);
    }
  }
  _deliverQueue(e) {
    let t = e.current._listeners;
    for (; e.i < e.end; ) this._deliver(t[e.i++], e.value);
    e.reset();
  }
  fire(e) {
    if (this._deliveryQueue?.current && (this._deliverQueue(this._deliveryQueue), this._perfMon?.stop()), this._perfMon?.start(this._size), this._listeners) if (this._listeners instanceof Ge2) this._deliver(this._listeners, e);
    else {
      let t = this._deliveryQueue;
      t.enqueue(this, e, this._listeners.length), this._deliverQueue(t);
    }
    this._perfMon?.stop();
  }
  hasListeners() {
    return this._size > 0;
  }
};
var wi2 = class {
  constructor() {
    this.i = -1;
    this.end = 0;
  }
  enqueue(e, t, n2) {
    this.i = 0, this.end = n2, this.current = e, this.value = t;
  }
  reset() {
    this.i = this.end, this.current = void 0, this.value = void 0;
  }
};
var An = { texturePage: 0, texturePosition: { x: 0, y: 0 }, texturePositionClipSpace: { x: 0, y: 0 }, offset: { x: 0, y: 0 }, size: { x: 0, y: 0 }, sizeClipSpace: { x: 0, y: 0 } };
var rt3 = 2;
var st3;
var ae2 = class i6 {
  constructor(e, t, n2) {
    this._document = e;
    this._config = t;
    this._unicodeService = n2;
    this._didWarmUp = false;
    this._cacheMap = new tt2();
    this._cacheMapCombined = new tt2();
    this._pages = [];
    this._activePages = [];
    this._workBoundingBox = { top: 0, left: 0, bottom: 0, right: 0 };
    this._workAttributeData = new he3();
    this._textureSize = 512;
    this._onAddTextureAtlasCanvas = new D3();
    this.onAddTextureAtlasCanvas = this._onAddTextureAtlasCanvas.event;
    this._onRemoveTextureAtlasCanvas = new D3();
    this.onRemoveTextureAtlasCanvas = this._onRemoveTextureAtlasCanvas.event;
    this._requestClearModel = false;
    this._createNewPage(), this._tmpCanvas = Sn2(e, this._config.deviceCellWidth * 4 + rt3 * 2, this._config.deviceCellHeight + rt3 * 2), this._tmpCtx = F3(this._tmpCanvas.getContext("2d", { alpha: this._config.allowTransparency, willReadFrequently: true }));
  }
  get pages() {
    return this._pages;
  }
  dispose() {
    this._tmpCanvas.remove();
    for (let e of this.pages) e.canvas.remove();
    this._onAddTextureAtlasCanvas.dispose();
  }
  warmUp() {
    this._didWarmUp || (this._doWarmUp(), this._didWarmUp = true);
  }
  _doWarmUp() {
    let e = new wn2();
    for (let t = 33; t < 126; t++) e.enqueue(() => {
      if (!this._cacheMap.get(t, 0, 0, 0)) {
        let n2 = this._drawToCache(t, 0, 0, 0, false, void 0);
        this._cacheMap.set(t, 0, 0, 0, n2);
      }
    });
  }
  beginFrame() {
    return this._requestClearModel;
  }
  clearTexture() {
    if (!(this._pages[0].currentRow.x === 0 && this._pages[0].currentRow.y === 0)) {
      for (let e of this._pages) e.clear();
      this._cacheMap.clear(), this._cacheMapCombined.clear(), this._didWarmUp = false;
    }
  }
  _createNewPage() {
    if (i6.maxAtlasPages && this._pages.length >= Math.max(4, i6.maxAtlasPages)) {
      let t = this._pages.filter((u2) => u2.canvas.width * 2 <= (i6.maxTextureSize || 4096)).sort((u2, c2) => c2.canvas.width !== u2.canvas.width ? c2.canvas.width - u2.canvas.width : c2.percentageUsed - u2.percentageUsed), n2 = -1, s15 = 0;
      for (let u2 = 0; u2 < t.length; u2++) if (t[u2].canvas.width !== s15) n2 = u2, s15 = t[u2].canvas.width;
      else if (u2 - n2 === 3) break;
      let o = t.slice(n2, n2 + 4), r5 = o.map((u2) => u2.glyphs[0].texturePage).sort((u2, c2) => u2 > c2 ? 1 : -1), a = this.pages.length - o.length, l2 = this._mergePages(o, a);
      l2.version++;
      for (let u2 = r5.length - 1; u2 >= 0; u2--) this._deletePage(r5[u2]);
      this.pages.push(l2), this._requestClearModel = true, this._onAddTextureAtlasCanvas.fire(l2.canvas);
    }
    let e = new ot3(this._document, this._textureSize);
    return this._pages.push(e), this._activePages.push(e), this._onAddTextureAtlasCanvas.fire(e.canvas), e;
  }
  _mergePages(e, t) {
    let n2 = e[0].canvas.width * 2, s15 = new ot3(this._document, n2, e);
    for (let [o, r5] of e.entries()) {
      let a = o * r5.canvas.width % n2, l2 = Math.floor(o / 2) * r5.canvas.height;
      s15.ctx.drawImage(r5.canvas, a, l2);
      for (let c2 of r5.glyphs) c2.texturePage = t, c2.sizeClipSpace.x = c2.size.x / n2, c2.sizeClipSpace.y = c2.size.y / n2, c2.texturePosition.x += a, c2.texturePosition.y += l2, c2.texturePositionClipSpace.x = c2.texturePosition.x / n2, c2.texturePositionClipSpace.y = c2.texturePosition.y / n2;
      this._onRemoveTextureAtlasCanvas.fire(r5.canvas);
      let u2 = this._activePages.indexOf(r5);
      u2 !== -1 && this._activePages.splice(u2, 1);
    }
    return s15;
  }
  _deletePage(e) {
    this._pages.splice(e, 1);
    for (let t = e; t < this._pages.length; t++) {
      let n2 = this._pages[t];
      for (let s15 of n2.glyphs) s15.texturePage--;
      n2.version++;
    }
  }
  getRasterizedGlyphCombinedChar(e, t, n2, s15, o, r5) {
    return this._getFromCacheMap(this._cacheMapCombined, e, t, n2, s15, o, r5);
  }
  getRasterizedGlyph(e, t, n2, s15, o, r5) {
    return this._getFromCacheMap(this._cacheMap, e, t, n2, s15, o, r5);
  }
  _getFromCacheMap(e, t, n2, s15, o, r5, a) {
    return st3 = e.get(t, n2, s15, o), st3 || (st3 = this._drawToCache(t, n2, s15, o, r5, a), e.set(t, n2, s15, o, st3)), st3;
  }
  _getColorFromAnsiIndex(e) {
    if (e >= this._config.colors.ansi.length) throw new Error("No color found for idx " + e);
    return this._config.colors.ansi[e];
  }
  _getBackgroundColor(e, t, n2, s15) {
    if (this._config.allowTransparency) return Z3;
    let o;
    switch (e) {
      case 16777216:
      case 33554432:
        o = this._getColorFromAnsiIndex(t);
        break;
      case 50331648:
        let r5 = he3.toColorRGB(t);
        o = X4.toColor(r5[0], r5[1], r5[2]);
        break;
      case 0:
      default:
        n2 ? o = Ue2.opaque(this._config.colors.foreground) : o = this._config.colors.background;
        break;
    }
    return this._config.allowTransparency || (o = Ue2.opaque(o)), o;
  }
  _getForegroundColor(e, t, n2, s15, o, r5, a, l2, u2, c2) {
    let d2 = this._getMinimumContrastColor(e, t, n2, s15, o, r5, a, u2, l2, c2);
    if (d2) return d2;
    let h2;
    switch (o) {
      case 16777216:
      case 33554432:
        this._config.drawBoldTextInBrightColors && u2 && r5 < 8 && (r5 += 8), h2 = this._getColorFromAnsiIndex(r5);
        break;
      case 50331648:
        let f2 = he3.toColorRGB(r5);
        h2 = X4.toColor(f2[0], f2[1], f2[2]);
        break;
      case 0:
      default:
        a ? h2 = this._config.colors.background : h2 = this._config.colors.foreground;
    }
    return this._config.allowTransparency && (h2 = Ue2.opaque(h2)), l2 && (h2 = Ue2.multiplyOpacity(h2, gn2)), h2;
  }
  _resolveBackgroundRgba(e, t, n2) {
    switch (e) {
      case 16777216:
      case 33554432:
        return this._getColorFromAnsiIndex(t).rgba;
      case 50331648:
        return t << 8;
      case 0:
      default:
        return n2 ? this._config.colors.foreground.rgba : this._config.colors.background.rgba;
    }
  }
  _resolveForegroundRgba(e, t, n2, s15) {
    switch (e) {
      case 16777216:
      case 33554432:
        return this._config.drawBoldTextInBrightColors && s15 && t < 8 && (t += 8), this._getColorFromAnsiIndex(t).rgba;
      case 50331648:
        return t << 8;
      case 0:
      default:
        return n2 ? this._config.colors.background.rgba : this._config.colors.foreground.rgba;
    }
  }
  _getMinimumContrastColor(e, t, n2, s15, o, r5, a, l2, u2, c2) {
    if (this._config.minimumContrastRatio === 1 || c2) return;
    let d2 = this._getContrastCache(u2), h2 = d2.getColor(e, s15);
    if (h2 !== void 0) return h2 || void 0;
    let f2 = this._resolveBackgroundRgba(t, n2, a), I3 = this._resolveForegroundRgba(o, r5, a, l2), L3 = Te3.ensureContrastRatio(f2, I3, this._config.minimumContrastRatio / (u2 ? 2 : 1));
    if (!L3) {
      d2.setColor(e, s15, null);
      return;
    }
    let M5 = X4.toColor(L3 >> 24 & 255, L3 >> 16 & 255, L3 >> 8 & 255);
    return d2.setColor(e, s15, M5), M5;
  }
  _getContrastCache(e) {
    return e ? this._config.colors.halfContrastCache : this._config.colors.contrastCache;
  }
  _drawToCache(e, t, n2, s15, o, r5) {
    let a = typeof e == "number" ? String.fromCharCode(e) : e;
    r5 && this._tmpCanvas.parentElement !== r5 && (this._tmpCanvas.style.display = "none", r5.append(this._tmpCanvas));
    let l2 = Math.min(this._config.deviceCellWidth * Math.max(a.length, 2) + rt3 * 2, this._config.deviceMaxTextureSize);
    this._tmpCanvas.width < l2 && (this._tmpCanvas.width = l2);
    let u2 = Math.min(this._config.deviceCellHeight + rt3 * 4, this._textureSize);
    if (this._tmpCanvas.height < u2 && (this._tmpCanvas.height = u2), this._tmpCtx.save(), this._workAttributeData.fg = n2, this._workAttributeData.bg = t, this._workAttributeData.extended.ext = s15, !!this._workAttributeData.isInvisible()) return An;
    let d2 = !!this._workAttributeData.isBold(), h2 = !!this._workAttributeData.isInverse(), f2 = !!this._workAttributeData.isDim(), I3 = !!this._workAttributeData.isItalic(), L3 = !!this._workAttributeData.isUnderline(), M5 = !!this._workAttributeData.isStrikethrough(), q3 = !!this._workAttributeData.isOverline(), S3 = this._workAttributeData.getFgColor(), W = this._workAttributeData.getFgColorMode(), E2 = this._workAttributeData.getBgColor(), y2 = this._workAttributeData.getBgColorMode();
    if (h2) {
      let x2 = S3;
      S3 = E2, E2 = x2;
      let R4 = W;
      W = y2, y2 = R4;
    }
    let w4 = this._getBackgroundColor(y2, E2, h2, f2);
    this._tmpCtx.globalCompositeOperation = "copy", this._tmpCtx.fillStyle = w4.css, this._tmpCtx.fillRect(0, 0, this._tmpCanvas.width, this._tmpCanvas.height), this._tmpCtx.globalCompositeOperation = "source-over";
    let G4 = d2 ? this._config.fontWeightBold : this._config.fontWeight, ue3 = I3 ? "italic" : "";
    this._tmpCtx.font = `${ue3} ${G4} ${this._config.fontSize * this._config.devicePixelRatio}px ${this._config.fontFamily}`, this._tmpCtx.textBaseline = St2;
    let Se3 = a.length === 1 && Rt2(a.charCodeAt(0)), ce3 = a.length === 1 && fn2(a.charCodeAt(0)), we3 = this._getForegroundColor(t, y2, E2, n2, W, S3, h2, f2, d2, Dt2(a.charCodeAt(0)));
    this._tmpCtx.fillStyle = we3.css;
    let A3 = ce3 ? 0 : rt3 * 2, se3 = false;
    this._config.customGlyphs !== false && (se3 = yn2(this._tmpCtx, a, A3, A3, this._config.deviceCellWidth, this._config.deviceCellHeight, this._config.fontSize, this._config.devicePixelRatio));
    let v4 = !Se3, p2;
    if (typeof e == "number" ? p2 = this._unicodeService.wcwidth(e) : p2 = this._unicodeService.getStringCellWidth(e), L3) {
      this._tmpCtx.save();
      let x2 = Math.max(1, Math.floor(this._config.fontSize * this._config.devicePixelRatio / 15)), R4 = x2 % 2 === 1 ? 0.5 : 0;
      if (this._tmpCtx.lineWidth = x2, this._workAttributeData.isUnderlineColorDefault()) this._tmpCtx.strokeStyle = this._tmpCtx.fillStyle;
      else if (this._workAttributeData.isUnderlineColorRGB()) v4 = false, this._tmpCtx.strokeStyle = `rgb(${he3.toColorRGB(this._workAttributeData.getUnderlineColor()).join(",")})`;
      else {
        v4 = false;
        let ie4 = this._workAttributeData.getUnderlineColor();
        this._config.drawBoldTextInBrightColors && this._workAttributeData.isBold() && ie4 < 8 && (ie4 += 8), this._tmpCtx.strokeStyle = this._getColorFromAnsiIndex(ie4).css;
      }
      this._tmpCtx.beginPath();
      let $3 = A3, P4 = Math.ceil(A3 + this._config.deviceCharHeight) - R4 - (o ? x2 * 2 : 0), de3 = P4 + x2, Re3 = P4 + x2 * 2, oe = this._workAttributeData.getUnderlineVariantOffset();
      for (let ie4 = 0; ie4 < p2; ie4++) {
        this._tmpCtx.save();
        let N3 = $3 + ie4 * this._config.deviceCellWidth, ne3 = $3 + (ie4 + 1) * this._config.deviceCellWidth, di = N3 + this._config.deviceCellWidth / 2;
        switch (this._workAttributeData.extended.underlineStyle) {
          case 2:
            this._tmpCtx.moveTo(N3, P4), this._tmpCtx.lineTo(ne3, P4), this._tmpCtx.moveTo(N3, Re3), this._tmpCtx.lineTo(ne3, Re3);
            break;
          case 3:
            let ft2 = x2 <= 1 ? Re3 : Math.ceil(A3 + this._config.deviceCharHeight - x2 / 2) - R4, mt2 = x2 <= 1 ? P4 : Math.ceil(A3 + this._config.deviceCharHeight + x2 / 2) - R4, qi2 = new Path2D();
            qi2.rect(N3, P4, this._config.deviceCellWidth, Re3 - P4), this._tmpCtx.clip(qi2), this._tmpCtx.moveTo(N3 - this._config.deviceCellWidth / 2, de3), this._tmpCtx.bezierCurveTo(N3 - this._config.deviceCellWidth / 2, mt2, N3, mt2, N3, de3), this._tmpCtx.bezierCurveTo(N3, ft2, di, ft2, di, de3), this._tmpCtx.bezierCurveTo(di, mt2, ne3, mt2, ne3, de3), this._tmpCtx.bezierCurveTo(ne3, ft2, ne3 + this._config.deviceCellWidth / 2, ft2, ne3 + this._config.deviceCellWidth / 2, de3);
            break;
          case 4:
            let _t2 = oe === 0 ? 0 : oe >= x2 ? x2 * 2 - oe : x2 - oe;
            !(oe >= x2) === false || _t2 === 0 ? (this._tmpCtx.setLineDash([Math.round(x2), Math.round(x2)]), this._tmpCtx.moveTo(N3 + _t2, P4), this._tmpCtx.lineTo(ne3, P4)) : (this._tmpCtx.setLineDash([Math.round(x2), Math.round(x2)]), this._tmpCtx.moveTo(N3, P4), this._tmpCtx.lineTo(N3 + _t2, P4), this._tmpCtx.moveTo(N3 + _t2 + x2, P4), this._tmpCtx.lineTo(ne3, P4)), oe = bn2(ne3 - N3, x2, oe);
            break;
          case 5:
            let Er = 0.6, yr2 = 0.3, hi2 = ne3 - N3, ji2 = Math.floor(Er * hi2), Xi2 = Math.floor(yr2 * hi2), Ir2 = hi2 - ji2 - Xi2;
            this._tmpCtx.setLineDash([ji2, Xi2, Ir2]), this._tmpCtx.moveTo(N3, P4), this._tmpCtx.lineTo(ne3, P4);
            break;
          case 1:
          default:
            this._tmpCtx.moveTo(N3, P4), this._tmpCtx.lineTo(ne3, P4);
            break;
        }
        this._tmpCtx.stroke(), this._tmpCtx.restore();
      }
      if (this._tmpCtx.restore(), !se3 && this._config.fontSize >= 12 && !this._config.allowTransparency && a !== " ") {
        this._tmpCtx.save(), this._tmpCtx.textBaseline = "alphabetic";
        let ie4 = this._tmpCtx.measureText(a);
        if (this._tmpCtx.restore(), "actualBoundingBoxDescent" in ie4 && ie4.actualBoundingBoxDescent > 0) {
          this._tmpCtx.save();
          let N3 = new Path2D();
          N3.rect($3, P4 - Math.ceil(x2 / 2), this._config.deviceCellWidth * p2, Re3 - P4 + Math.ceil(x2 / 2)), this._tmpCtx.clip(N3), this._tmpCtx.lineWidth = this._config.devicePixelRatio * 3, this._tmpCtx.strokeStyle = w4.css, this._tmpCtx.strokeText(a, A3, A3 + this._config.deviceCharHeight), this._tmpCtx.restore();
        }
      }
    }
    if (q3) {
      let x2 = Math.max(1, Math.floor(this._config.fontSize * this._config.devicePixelRatio / 15)), R4 = x2 % 2 === 1 ? 0.5 : 0;
      this._tmpCtx.lineWidth = x2, this._tmpCtx.strokeStyle = this._tmpCtx.fillStyle, this._tmpCtx.beginPath(), this._tmpCtx.moveTo(A3, A3 + R4), this._tmpCtx.lineTo(A3 + this._config.deviceCharWidth * p2, A3 + R4), this._tmpCtx.stroke();
    }
    if (se3 || this._tmpCtx.fillText(a, A3, A3 + this._config.deviceCharHeight), a === "_" && !this._config.allowTransparency) {
      let x2 = Di2(this._tmpCtx.getImageData(A3, A3, this._config.deviceCellWidth, this._config.deviceCellHeight), w4, we3, v4);
      if (x2) for (let R4 = 1; R4 <= 5 && (this._tmpCtx.save(), this._tmpCtx.fillStyle = w4.css, this._tmpCtx.fillRect(0, 0, this._tmpCanvas.width, this._tmpCanvas.height), this._tmpCtx.restore(), this._tmpCtx.fillText(a, A3, A3 + this._config.deviceCharHeight - R4), x2 = Di2(this._tmpCtx.getImageData(A3, A3, this._config.deviceCellWidth, this._config.deviceCellHeight), w4, we3, v4), !!x2); R4++) ;
    }
    if (M5) {
      let x2 = Math.max(1, Math.floor(this._config.fontSize * this._config.devicePixelRatio / 10)), R4 = this._tmpCtx.lineWidth % 2 === 1 ? 0.5 : 0;
      this._tmpCtx.lineWidth = x2, this._tmpCtx.strokeStyle = this._tmpCtx.fillStyle, this._tmpCtx.beginPath(), this._tmpCtx.moveTo(A3, A3 + Math.floor(this._config.deviceCharHeight / 2) - R4), this._tmpCtx.lineTo(A3 + this._config.deviceCharWidth * p2, A3 + Math.floor(this._config.deviceCharHeight / 2) - R4), this._tmpCtx.stroke();
    }
    this._tmpCtx.restore();
    let g3 = this._tmpCtx.getImageData(0, 0, this._tmpCanvas.width, this._tmpCanvas.height), b3;
    if (this._config.allowTransparency ? b3 = Jr2(g3) : b3 = Di2(g3, w4, we3, v4), b3) return An;
    let m2 = this._findGlyphBoundingBox(g3, this._workBoundingBox, l2, ce3, se3, A3), _4, T2;
    for (; ; ) {
      if (this._activePages.length === 0) {
        let x2 = this._createNewPage();
        _4 = x2, T2 = x2.currentRow, T2.height = m2.size.y;
        break;
      }
      _4 = this._activePages[this._activePages.length - 1], T2 = _4.currentRow;
      for (let x2 of this._activePages) m2.size.y <= x2.currentRow.height && (_4 = x2, T2 = x2.currentRow);
      for (let x2 = this._activePages.length - 1; x2 >= 0; x2--) for (let R4 of this._activePages[x2].fixedRows) R4.height <= T2.height && m2.size.y <= R4.height && (_4 = this._activePages[x2], T2 = R4);
      if (m2.size.x > this._textureSize) {
        this._overflowSizePage || (this._overflowSizePage = new ot3(this._document, this._config.deviceMaxTextureSize), this.pages.push(this._overflowSizePage), this._requestClearModel = true, this._onAddTextureAtlasCanvas.fire(this._overflowSizePage.canvas)), _4 = this._overflowSizePage, T2 = this._overflowSizePage.currentRow, T2.x + m2.size.x >= _4.canvas.width && (T2.x = 0, T2.y += T2.height, T2.height = 0);
        break;
      }
      if (T2.y + m2.size.y >= _4.canvas.height || T2.height > m2.size.y + 2) {
        let x2 = false;
        if (_4.currentRow.y + _4.currentRow.height + m2.size.y >= _4.canvas.height) {
          let R4;
          for (let $3 of this._activePages) if ($3.currentRow.y + $3.currentRow.height + m2.size.y < $3.canvas.height) {
            R4 = $3;
            break;
          }
          if (R4) _4 = R4;
          else if (i6.maxAtlasPages && this._pages.length >= i6.maxAtlasPages && T2.y + m2.size.y <= _4.canvas.height && T2.height >= m2.size.y && T2.x + m2.size.x <= _4.canvas.width) x2 = true;
          else {
            let $3 = this._createNewPage();
            _4 = $3, T2 = $3.currentRow, T2.height = m2.size.y, x2 = true;
          }
        }
        x2 || (_4.currentRow.height > 0 && _4.fixedRows.push(_4.currentRow), T2 = { x: 0, y: _4.currentRow.y + _4.currentRow.height, height: m2.size.y }, _4.fixedRows.push(T2), _4.currentRow = { x: 0, y: T2.y + T2.height, height: 0 });
      }
      if (T2.x + m2.size.x <= _4.canvas.width) break;
      T2 === _4.currentRow ? (T2.x = 0, T2.y += T2.height, T2.height = 0) : _4.fixedRows.splice(_4.fixedRows.indexOf(T2), 1);
    }
    return m2.texturePage = this._pages.indexOf(_4), m2.texturePosition.x = T2.x, m2.texturePosition.y = T2.y, m2.texturePositionClipSpace.x = T2.x / _4.canvas.width, m2.texturePositionClipSpace.y = T2.y / _4.canvas.height, m2.sizeClipSpace.x /= _4.canvas.width, m2.sizeClipSpace.y /= _4.canvas.height, T2.height = Math.max(T2.height, m2.size.y), T2.x += m2.size.x, _4.ctx.putImageData(g3, m2.texturePosition.x - this._workBoundingBox.left, m2.texturePosition.y - this._workBoundingBox.top, this._workBoundingBox.left, this._workBoundingBox.top, m2.size.x, m2.size.y), _4.addGlyph(m2), _4.version++, m2;
  }
  _findGlyphBoundingBox(e, t, n2, s15, o, r5) {
    t.top = 0;
    let a = s15 ? this._config.deviceCellHeight : this._tmpCanvas.height, l2 = s15 ? this._config.deviceCellWidth : n2, u2 = false;
    for (let c2 = 0; c2 < a; c2++) {
      for (let d2 = 0; d2 < l2; d2++) {
        let h2 = c2 * this._tmpCanvas.width * 4 + d2 * 4 + 3;
        if (e.data[h2] !== 0) {
          t.top = c2, u2 = true;
          break;
        }
      }
      if (u2) break;
    }
    t.left = 0, u2 = false;
    for (let c2 = 0; c2 < r5 + l2; c2++) {
      for (let d2 = 0; d2 < a; d2++) {
        let h2 = d2 * this._tmpCanvas.width * 4 + c2 * 4 + 3;
        if (e.data[h2] !== 0) {
          t.left = c2, u2 = true;
          break;
        }
      }
      if (u2) break;
    }
    t.right = l2, u2 = false;
    for (let c2 = r5 + l2 - 1; c2 >= r5; c2--) {
      for (let d2 = 0; d2 < a; d2++) {
        let h2 = d2 * this._tmpCanvas.width * 4 + c2 * 4 + 3;
        if (e.data[h2] !== 0) {
          t.right = c2, u2 = true;
          break;
        }
      }
      if (u2) break;
    }
    t.bottom = a, u2 = false;
    for (let c2 = a - 1; c2 >= 0; c2--) {
      for (let d2 = 0; d2 < l2; d2++) {
        let h2 = c2 * this._tmpCanvas.width * 4 + d2 * 4 + 3;
        if (e.data[h2] !== 0) {
          t.bottom = c2, u2 = true;
          break;
        }
      }
      if (u2) break;
    }
    return { texturePage: 0, texturePosition: { x: 0, y: 0 }, texturePositionClipSpace: { x: 0, y: 0 }, size: { x: t.right - t.left + 1, y: t.bottom - t.top + 1 }, sizeClipSpace: { x: t.right - t.left + 1, y: t.bottom - t.top + 1 }, offset: { x: -t.left + r5 + (s15 || o ? Math.floor((this._config.deviceCellWidth - this._config.deviceCharWidth) / 2) : 0), y: -t.top + r5 + (s15 || o ? this._config.lineHeight === 1 ? 0 : Math.round((this._config.deviceCellHeight - this._config.deviceCharHeight) / 2) : 0) } };
  }
};
var ot3 = class {
  constructor(e, t, n2) {
    this._usedPixels = 0;
    this._glyphs = [];
    this.version = 0;
    this.currentRow = { x: 0, y: 0, height: 0 };
    this.fixedRows = [];
    if (n2) for (let s15 of n2) this._glyphs.push(...s15.glyphs), this._usedPixels += s15._usedPixels;
    this.canvas = Sn2(e, t, t), this.ctx = F3(this.canvas.getContext("2d", { alpha: true }));
  }
  get percentageUsed() {
    return this._usedPixels / (this.canvas.width * this.canvas.height);
  }
  get glyphs() {
    return this._glyphs;
  }
  addGlyph(e) {
    this._glyphs.push(e), this._usedPixels += e.size.x * e.size.y;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), this.currentRow.x = 0, this.currentRow.y = 0, this.currentRow.height = 0, this.fixedRows.length = 0, this.version++;
  }
};
function Di2(i8, e, t, n2) {
  let s15 = e.rgba >>> 24, o = e.rgba >>> 16 & 255, r5 = e.rgba >>> 8 & 255, a = t.rgba >>> 24, l2 = t.rgba >>> 16 & 255, u2 = t.rgba >>> 8 & 255, c2 = Math.floor((Math.abs(s15 - a) + Math.abs(o - l2) + Math.abs(r5 - u2)) / 12), d2 = true;
  for (let h2 = 0; h2 < i8.data.length; h2 += 4) i8.data[h2] === s15 && i8.data[h2 + 1] === o && i8.data[h2 + 2] === r5 || n2 && Math.abs(i8.data[h2] - s15) + Math.abs(i8.data[h2 + 1] - o) + Math.abs(i8.data[h2 + 2] - r5) < c2 ? i8.data[h2 + 3] = 0 : d2 = false;
  return d2;
}
function Jr2(i8) {
  for (let e = 0; e < i8.data.length; e += 4) if (i8.data[e + 3] > 0) return false;
  return true;
}
function Sn2(i8, e, t) {
  let n2 = i8.createElement("canvas");
  return n2.width = e, n2.height = t, n2;
}
function On(i8, e, t, n2, s15, o, r5, a) {
  let l2 = { foreground: o.foreground, background: o.background, cursor: Z3, cursorAccent: Z3, selectionForeground: Z3, selectionBackgroundTransparent: Z3, selectionBackgroundOpaque: Z3, selectionInactiveBackgroundTransparent: Z3, selectionInactiveBackgroundOpaque: Z3, overviewRulerBorder: Z3, scrollbarSliderBackground: Z3, scrollbarSliderHoverBackground: Z3, scrollbarSliderActiveBackground: Z3, ansi: o.ansi.slice(), contrastCache: o.contrastCache, halfContrastCache: o.halfContrastCache };
  return { customGlyphs: s15.customGlyphs, devicePixelRatio: r5, deviceMaxTextureSize: a, letterSpacing: s15.letterSpacing, lineHeight: s15.lineHeight, deviceCellWidth: i8, deviceCellHeight: e, deviceCharWidth: t, deviceCharHeight: n2, fontFamily: s15.fontFamily, fontSize: s15.fontSize, fontWeight: s15.fontWeight, fontWeightBold: s15.fontWeightBold, allowTransparency: s15.allowTransparency, drawBoldTextInBrightColors: s15.drawBoldTextInBrightColors, minimumContrastRatio: s15.minimumContrastRatio, colors: l2 };
}
function Mi2(i8, e) {
  for (let t = 0; t < i8.colors.ansi.length; t++) if (i8.colors.ansi[t].rgba !== e.colors.ansi[t].rgba) return false;
  return i8.devicePixelRatio === e.devicePixelRatio && i8.customGlyphs === e.customGlyphs && i8.lineHeight === e.lineHeight && i8.letterSpacing === e.letterSpacing && i8.fontFamily === e.fontFamily && i8.fontSize === e.fontSize && i8.fontWeight === e.fontWeight && i8.fontWeightBold === e.fontWeightBold && i8.allowTransparency === e.allowTransparency && i8.deviceCharWidth === e.deviceCharWidth && i8.deviceCharHeight === e.deviceCharHeight && i8.drawBoldTextInBrightColors === e.drawBoldTextInBrightColors && i8.minimumContrastRatio === e.minimumContrastRatio && i8.colors.foreground.rgba === e.colors.foreground.rgba && i8.colors.background.rgba === e.colors.background.rgba;
}
function Fn2(i8) {
  return (i8 & 50331648) === 16777216 || (i8 & 50331648) === 33554432;
}
var le = [];
function Nt2(i8, e, t, n2, s15, o, r5, a, l2) {
  let u2 = On(n2, s15, o, r5, e, t, a, l2);
  for (let h2 = 0; h2 < le.length; h2++) {
    let f2 = le[h2], I3 = f2.ownedBy.indexOf(i8);
    if (I3 >= 0) {
      if (Mi2(f2.config, u2)) return f2.atlas;
      f2.ownedBy.length === 1 ? (f2.atlas.dispose(), le.splice(h2, 1)) : f2.ownedBy.splice(I3, 1);
      break;
    }
  }
  for (let h2 = 0; h2 < le.length; h2++) {
    let f2 = le[h2];
    if (Mi2(f2.config, u2)) return f2.ownedBy.push(i8), f2.atlas;
  }
  let c2 = i8._core, d2 = { atlas: new ae2(document, u2, c2.unicodeService), config: u2, ownedBy: [i8] };
  return le.push(d2), d2.atlas;
}
function Ai2(i8) {
  for (let e = 0; e < le.length; e++) {
    let t = le[e].ownedBy.indexOf(i8);
    if (t !== -1) {
      le[e].ownedBy.length === 1 ? (le[e].atlas.dispose(), le.splice(e, 1)) : le[e].ownedBy.splice(t, 1);
      break;
    }
  }
}
var Ut2 = 600;
var Ht = class {
  constructor(e, t) {
    this._renderCallback = e;
    this._coreBrowserService = t;
    this.isCursorVisible = true, this._coreBrowserService.isFocused && this._restartInterval();
  }
  get isPaused() {
    return !(this._blinkStartTimeout || this._blinkInterval);
  }
  dispose() {
    this._blinkInterval && (this._coreBrowserService.window.clearInterval(this._blinkInterval), this._blinkInterval = void 0), this._blinkStartTimeout && (this._coreBrowserService.window.clearTimeout(this._blinkStartTimeout), this._blinkStartTimeout = void 0), this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  restartBlinkAnimation() {
    this.isPaused || (this._animationTimeRestarted = Date.now(), this.isCursorVisible = true, this._animationFrame || (this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
      this._renderCallback(), this._animationFrame = void 0;
    })));
  }
  _restartInterval(e = Ut2) {
    this._blinkInterval && (this._coreBrowserService.window.clearInterval(this._blinkInterval), this._blinkInterval = void 0), this._blinkStartTimeout = this._coreBrowserService.window.setTimeout(() => {
      if (this._animationTimeRestarted) {
        let t = Ut2 - (Date.now() - this._animationTimeRestarted);
        if (this._animationTimeRestarted = void 0, t > 0) {
          this._restartInterval(t);
          return;
        }
      }
      this.isCursorVisible = false, this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
        this._renderCallback(), this._animationFrame = void 0;
      }), this._blinkInterval = this._coreBrowserService.window.setInterval(() => {
        if (this._animationTimeRestarted) {
          let t = Ut2 - (Date.now() - this._animationTimeRestarted);
          this._animationTimeRestarted = void 0, this._restartInterval(t);
          return;
        }
        this.isCursorVisible = !this.isCursorVisible, this._animationFrame = this._coreBrowserService.window.requestAnimationFrame(() => {
          this._renderCallback(), this._animationFrame = void 0;
        });
      }, Ut2);
    }, e);
  }
  pause() {
    this.isCursorVisible = true, this._blinkInterval && (this._coreBrowserService.window.clearInterval(this._blinkInterval), this._blinkInterval = void 0), this._blinkStartTimeout && (this._coreBrowserService.window.clearTimeout(this._blinkStartTimeout), this._blinkStartTimeout = void 0), this._animationFrame && (this._coreBrowserService.window.cancelAnimationFrame(this._animationFrame), this._animationFrame = void 0);
  }
  resume() {
    this.pause(), this._animationTimeRestarted = void 0, this._restartInterval(), this.restartBlinkAnimation();
  }
};
function Si2(i8, e, t) {
  let n2 = new e.ResizeObserver((s15) => {
    let o = s15.find((l2) => l2.target === i8);
    if (!o) return;
    if (!("devicePixelContentBoxSize" in o)) {
      n2?.disconnect(), n2 = void 0;
      return;
    }
    let r5 = o.devicePixelContentBoxSize[0].inlineSize, a = o.devicePixelContentBoxSize[0].blockSize;
    r5 > 0 && a > 0 && t(r5, a);
  });
  try {
    n2.observe(i8, { box: ["device-pixel-content-box"] });
  } catch {
    n2.disconnect(), n2 = void 0;
  }
  return O3(() => n2?.disconnect());
}
function kn(i8) {
  return i8 > 65535 ? (i8 -= 65536, String.fromCharCode((i8 >> 10) + 55296) + String.fromCharCode(i8 % 1024 + 56320)) : String.fromCharCode(i8);
}
var at3 = class i7 extends he3 {
  constructor() {
    super(...arguments);
    this.content = 0;
    this.fg = 0;
    this.bg = 0;
    this.extended = new it2();
    this.combinedData = "";
  }
  static fromCharData(t) {
    let n2 = new i7();
    return n2.setFromCharData(t), n2;
  }
  isCombined() {
    return this.content & 2097152;
  }
  getWidth() {
    return this.content >> 22;
  }
  getChars() {
    return this.content & 2097152 ? this.combinedData : this.content & 2097151 ? kn(this.content & 2097151) : "";
  }
  getCode() {
    return this.isCombined() ? this.combinedData.charCodeAt(this.combinedData.length - 1) : this.content & 2097151;
  }
  setFromCharData(t) {
    this.fg = t[0], this.bg = 0;
    let n2 = false;
    if (t[1].length > 2) n2 = true;
    else if (t[1].length === 2) {
      let s15 = t[1].charCodeAt(0);
      if (55296 <= s15 && s15 <= 56319) {
        let o = t[1].charCodeAt(1);
        56320 <= o && o <= 57343 ? this.content = (s15 - 55296) * 1024 + o - 56320 + 65536 | t[2] << 22 : n2 = true;
      } else n2 = true;
    } else this.content = t[1].charCodeAt(0) | t[2] << 22;
    n2 && (this.combinedData = t[1], this.content = 2097152 | t[2] << 22);
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
var Gt2 = new Float32Array([2, 0, 0, 0, 0, -2, 0, 0, 0, 0, 1, 0, -1, 1, 0, 1]);
function $t2(i8, e, t) {
  let n2 = F3(i8.createProgram());
  if (i8.attachShader(n2, F3(Pn2(i8, i8.VERTEX_SHADER, e))), i8.attachShader(n2, F3(Pn2(i8, i8.FRAGMENT_SHADER, t))), i8.linkProgram(n2), i8.getProgramParameter(n2, i8.LINK_STATUS)) return n2;
  console.error(i8.getProgramInfoLog(n2)), i8.deleteProgram(n2);
}
function Pn2(i8, e, t) {
  let n2 = F3(i8.createShader(e));
  if (i8.shaderSource(n2, t), i8.compileShader(n2), i8.getShaderParameter(n2, i8.COMPILE_STATUS)) return n2;
  console.error(i8.getShaderInfoLog(n2)), i8.deleteShader(n2);
}
function Bn(i8, e) {
  let t = Math.min(i8.length * 2, e), n2 = new Float32Array(t);
  for (let s15 = 0; s15 < i8.length; s15++) n2[s15] = i8[s15];
  return n2;
}
var Wt2 = class {
  constructor(e) {
    this.texture = e, this.version = -1;
  }
};
var is2 = `#version 300 es
layout (location = 0) in vec2 a_unitquad;
layout (location = 1) in vec2 a_cellpos;
layout (location = 2) in vec2 a_offset;
layout (location = 3) in vec2 a_size;
layout (location = 4) in float a_texpage;
layout (location = 5) in vec2 a_texcoord;
layout (location = 6) in vec2 a_texsize;

uniform mat4 u_projection;
uniform vec2 u_resolution;

out vec2 v_texcoord;
flat out int v_texpage;

void main() {
  vec2 zeroToOne = (a_offset / u_resolution) + a_cellpos + (a_unitquad * a_size);
  gl_Position = u_projection * vec4(zeroToOne, 0.0, 1.0);
  v_texpage = int(a_texpage);
  v_texcoord = a_texcoord + a_unitquad * a_texsize;
}`;
function ns2(i8) {
  let e = "";
  for (let t = 1; t < i8; t++) e += ` else if (v_texpage == ${t}) { outColor = texture(u_texture[${t}], v_texcoord); }`;
  return `#version 300 es
precision lowp float;

in vec2 v_texcoord;
flat in int v_texpage;

uniform sampler2D u_texture[${i8}];

out vec4 outColor;

void main() {
  if (v_texpage == 0) {
    outColor = texture(u_texture[0], v_texcoord);
  } ${e}
}`;
}
var De3 = 11;
var Ve3 = De3 * Float32Array.BYTES_PER_ELEMENT;
var rs2 = 2;
var H4 = 0;
var k3;
var Fi2 = 0;
var lt3 = 0;
var Kt2 = class extends B3 {
  constructor(t, n2, s15, o) {
    super();
    this._terminal = t;
    this._gl = n2;
    this._dimensions = s15;
    this._optionsService = o;
    this._activeBuffer = 0;
    this._vertices = { count: 0, attributes: new Float32Array(0), attributesBuffers: [new Float32Array(0), new Float32Array(0)] };
    let r5 = this._gl;
    ae2.maxAtlasPages === void 0 && (ae2.maxAtlasPages = Math.min(32, F3(r5.getParameter(r5.MAX_TEXTURE_IMAGE_UNITS))), ae2.maxTextureSize = F3(r5.getParameter(r5.MAX_TEXTURE_SIZE))), this._program = F3($t2(r5, is2, ns2(ae2.maxAtlasPages))), this._register(O3(() => r5.deleteProgram(this._program))), this._projectionLocation = F3(r5.getUniformLocation(this._program, "u_projection")), this._resolutionLocation = F3(r5.getUniformLocation(this._program, "u_resolution")), this._textureLocation = F3(r5.getUniformLocation(this._program, "u_texture")), this._vertexArrayObject = r5.createVertexArray(), r5.bindVertexArray(this._vertexArrayObject);
    let a = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), l2 = r5.createBuffer();
    this._register(O3(() => r5.deleteBuffer(l2))), r5.bindBuffer(r5.ARRAY_BUFFER, l2), r5.bufferData(r5.ARRAY_BUFFER, a, r5.STATIC_DRAW), r5.enableVertexAttribArray(0), r5.vertexAttribPointer(0, 2, this._gl.FLOAT, false, 0, 0);
    let u2 = new Uint8Array([0, 1, 2, 3]), c2 = r5.createBuffer();
    this._register(O3(() => r5.deleteBuffer(c2))), r5.bindBuffer(r5.ELEMENT_ARRAY_BUFFER, c2), r5.bufferData(r5.ELEMENT_ARRAY_BUFFER, u2, r5.STATIC_DRAW), this._attributesBuffer = F3(r5.createBuffer()), this._register(O3(() => r5.deleteBuffer(this._attributesBuffer))), r5.bindBuffer(r5.ARRAY_BUFFER, this._attributesBuffer), r5.enableVertexAttribArray(2), r5.vertexAttribPointer(2, 2, r5.FLOAT, false, Ve3, 0), r5.vertexAttribDivisor(2, 1), r5.enableVertexAttribArray(3), r5.vertexAttribPointer(3, 2, r5.FLOAT, false, Ve3, 2 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(3, 1), r5.enableVertexAttribArray(4), r5.vertexAttribPointer(4, 1, r5.FLOAT, false, Ve3, 4 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(4, 1), r5.enableVertexAttribArray(5), r5.vertexAttribPointer(5, 2, r5.FLOAT, false, Ve3, 5 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(5, 1), r5.enableVertexAttribArray(6), r5.vertexAttribPointer(6, 2, r5.FLOAT, false, Ve3, 7 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(6, 1), r5.enableVertexAttribArray(1), r5.vertexAttribPointer(1, 2, r5.FLOAT, false, Ve3, 9 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(1, 1), r5.useProgram(this._program);
    let d2 = new Int32Array(ae2.maxAtlasPages);
    for (let h2 = 0; h2 < ae2.maxAtlasPages; h2++) d2[h2] = h2;
    r5.uniform1iv(this._textureLocation, d2), r5.uniformMatrix4fv(this._projectionLocation, false, Gt2), this._atlasTextures = [];
    for (let h2 = 0; h2 < ae2.maxAtlasPages; h2++) {
      let f2 = new Wt2(F3(r5.createTexture()));
      this._register(O3(() => r5.deleteTexture(f2.texture))), r5.activeTexture(r5.TEXTURE0 + h2), r5.bindTexture(r5.TEXTURE_2D, f2.texture), r5.texParameteri(r5.TEXTURE_2D, r5.TEXTURE_WRAP_S, r5.CLAMP_TO_EDGE), r5.texParameteri(r5.TEXTURE_2D, r5.TEXTURE_WRAP_T, r5.CLAMP_TO_EDGE), r5.texImage2D(r5.TEXTURE_2D, 0, r5.RGBA, 1, 1, 0, r5.RGBA, r5.UNSIGNED_BYTE, new Uint8Array([255, 0, 0, 255])), this._atlasTextures[h2] = f2;
    }
    r5.enable(r5.BLEND), r5.blendFunc(r5.SRC_ALPHA, r5.ONE_MINUS_SRC_ALPHA), this.handleResize();
  }
  beginFrame() {
    return this._atlas ? this._atlas.beginFrame() : true;
  }
  updateCell(t, n2, s15, o, r5, a, l2, u2, c2) {
    this._updateCell(this._vertices.attributes, t, n2, s15, o, r5, a, l2, u2, c2);
  }
  _updateCell(t, n2, s15, o, r5, a, l2, u2, c2, d2) {
    if (H4 = (s15 * this._terminal.cols + n2) * De3, o === 0 || o === void 0) {
      t.fill(0, H4, H4 + De3 - 1 - rs2);
      return;
    }
    this._atlas && (u2 && u2.length > 1 ? k3 = this._atlas.getRasterizedGlyphCombinedChar(u2, r5, a, l2, false, this._terminal.element) : k3 = this._atlas.getRasterizedGlyph(o, r5, a, l2, false, this._terminal.element), Fi2 = Math.floor((this._dimensions.device.cell.width - this._dimensions.device.char.width) / 2), r5 !== d2 && k3.offset.x > Fi2 ? (lt3 = k3.offset.x - Fi2, t[H4] = -(k3.offset.x - lt3) + this._dimensions.device.char.left, t[H4 + 1] = -k3.offset.y + this._dimensions.device.char.top, t[H4 + 2] = (k3.size.x - lt3) / this._dimensions.device.canvas.width, t[H4 + 3] = k3.size.y / this._dimensions.device.canvas.height, t[H4 + 4] = k3.texturePage, t[H4 + 5] = k3.texturePositionClipSpace.x + lt3 / this._atlas.pages[k3.texturePage].canvas.width, t[H4 + 6] = k3.texturePositionClipSpace.y, t[H4 + 7] = k3.sizeClipSpace.x - lt3 / this._atlas.pages[k3.texturePage].canvas.width, t[H4 + 8] = k3.sizeClipSpace.y) : (t[H4] = -k3.offset.x + this._dimensions.device.char.left, t[H4 + 1] = -k3.offset.y + this._dimensions.device.char.top, t[H4 + 2] = k3.size.x / this._dimensions.device.canvas.width, t[H4 + 3] = k3.size.y / this._dimensions.device.canvas.height, t[H4 + 4] = k3.texturePage, t[H4 + 5] = k3.texturePositionClipSpace.x, t[H4 + 6] = k3.texturePositionClipSpace.y, t[H4 + 7] = k3.sizeClipSpace.x, t[H4 + 8] = k3.sizeClipSpace.y), this._optionsService.rawOptions.rescaleOverlappingGlyphs && mn2(o, c2, k3.size.x, this._dimensions.device.cell.width) && (t[H4 + 2] = (this._dimensions.device.cell.width - 1) / this._dimensions.device.canvas.width));
  }
  clear() {
    let t = this._terminal, n2 = t.cols * t.rows * De3;
    this._vertices.count !== n2 ? this._vertices.attributes = new Float32Array(n2) : this._vertices.attributes.fill(0);
    let s15 = 0;
    for (; s15 < this._vertices.attributesBuffers.length; s15++) this._vertices.count !== n2 ? this._vertices.attributesBuffers[s15] = new Float32Array(n2) : this._vertices.attributesBuffers[s15].fill(0);
    this._vertices.count = n2, s15 = 0;
    for (let o = 0; o < t.rows; o++) for (let r5 = 0; r5 < t.cols; r5++) this._vertices.attributes[s15 + 9] = r5 / t.cols, this._vertices.attributes[s15 + 10] = o / t.rows, s15 += De3;
  }
  handleResize() {
    let t = this._gl;
    t.useProgram(this._program), t.viewport(0, 0, t.canvas.width, t.canvas.height), t.uniform2f(this._resolutionLocation, t.canvas.width, t.canvas.height), this.clear();
  }
  render(t) {
    if (!this._atlas) return;
    let n2 = this._gl;
    n2.useProgram(this._program), n2.bindVertexArray(this._vertexArrayObject), this._activeBuffer = (this._activeBuffer + 1) % 2;
    let s15 = this._vertices.attributesBuffers[this._activeBuffer], o = 0;
    for (let r5 = 0; r5 < t.lineLengths.length; r5++) {
      let a = r5 * this._terminal.cols * De3, l2 = this._vertices.attributes.subarray(a, a + t.lineLengths[r5] * De3);
      s15.set(l2, o), o += l2.length;
    }
    n2.bindBuffer(n2.ARRAY_BUFFER, this._attributesBuffer), n2.bufferData(n2.ARRAY_BUFFER, s15.subarray(0, o), n2.STREAM_DRAW);
    for (let r5 = 0; r5 < this._atlas.pages.length; r5++) this._atlas.pages[r5].version !== this._atlasTextures[r5].version && this._bindAtlasPageTexture(n2, this._atlas, r5);
    n2.drawElementsInstanced(n2.TRIANGLE_STRIP, 4, n2.UNSIGNED_BYTE, 0, o / De3);
  }
  setAtlas(t) {
    this._atlas = t;
    for (let n2 of this._atlasTextures) n2.version = -1;
  }
  _bindAtlasPageTexture(t, n2, s15) {
    t.activeTexture(t.TEXTURE0 + s15), t.bindTexture(t.TEXTURE_2D, this._atlasTextures[s15].texture), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, n2.pages[s15].canvas), t.generateMipmap(t.TEXTURE_2D), this._atlasTextures[s15].version = n2.pages[s15].version;
  }
  setDimensions(t) {
    this._dimensions = t;
  }
};
var ki2 = class {
  constructor() {
    this.clear();
  }
  clear() {
    this.hasSelection = false, this.columnSelectMode = false, this.viewportStartRow = 0, this.viewportEndRow = 0, this.viewportCappedStartRow = 0, this.viewportCappedEndRow = 0, this.startCol = 0, this.endCol = 0, this.selectionStart = void 0, this.selectionEnd = void 0;
  }
  update(e, t, n2, s15 = false) {
    if (this.selectionStart = t, this.selectionEnd = n2, !t || !n2 || t[0] === n2[0] && t[1] === n2[1]) {
      this.clear();
      return;
    }
    let o = e.buffers.active.ydisp, r5 = t[1] - o, a = n2[1] - o, l2 = Math.max(r5, 0), u2 = Math.min(a, e.rows - 1);
    if (l2 >= e.rows || u2 < 0) {
      this.clear();
      return;
    }
    this.hasSelection = true, this.columnSelectMode = s15, this.viewportStartRow = r5, this.viewportEndRow = a, this.viewportCappedStartRow = l2, this.viewportCappedEndRow = u2, this.startCol = t[0], this.endCol = n2[0];
  }
  isCellSelected(e, t, n2) {
    return this.hasSelection ? (n2 -= e.buffer.active.viewportY, this.columnSelectMode ? this.startCol <= this.endCol ? t >= this.startCol && n2 >= this.viewportCappedStartRow && t < this.endCol && n2 <= this.viewportCappedEndRow : t < this.startCol && n2 >= this.viewportCappedStartRow && t >= this.endCol && n2 <= this.viewportCappedEndRow : n2 > this.viewportStartRow && n2 < this.viewportEndRow || this.viewportStartRow === this.viewportEndRow && n2 === this.viewportStartRow && t >= this.startCol && t < this.endCol || this.viewportStartRow < this.viewportEndRow && n2 === this.viewportEndRow && t < this.endCol || this.viewportStartRow < this.viewportEndRow && n2 === this.viewportStartRow && t >= this.startCol) : false;
  }
};
function Nn() {
  return new ki2();
}
var Ce2 = 4;
var ze = 1;
var qe3 = 2;
var Ct2 = 3;
var Un2 = 2147483648;
var Vt2 = class {
  constructor() {
    this.cells = new Uint32Array(0), this.lineLengths = new Uint32Array(0), this.selection = Nn();
  }
  resize(e, t) {
    let n2 = e * t * Ce2;
    n2 !== this.cells.length && (this.cells = new Uint32Array(n2), this.lineLengths = new Uint32Array(t));
  }
  clear() {
    this.cells.fill(0, 0), this.lineLengths.fill(0, 0);
  }
};
var ss2 = `#version 300 es
layout (location = 0) in vec2 a_position;
layout (location = 1) in vec2 a_size;
layout (location = 2) in vec4 a_color;
layout (location = 3) in vec2 a_unitquad;

uniform mat4 u_projection;

out vec4 v_color;

void main() {
  vec2 zeroToOne = a_position + (a_unitquad * a_size);
  gl_Position = u_projection * vec4(zeroToOne, 0.0, 1.0);
  v_color = a_color;
}`;
var os2 = `#version 300 es
precision lowp float;

in vec4 v_color;

out vec4 outColor;

void main() {
  outColor = v_color;
}`;
var Ee3 = 8;
var Pi2 = Ee3 * Float32Array.BYTES_PER_ELEMENT;
var as2 = 20 * Ee3;
var zt2 = class {
  constructor() {
    this.attributes = new Float32Array(as2), this.count = 0;
  }
};
var xe2 = 0;
var Hn2 = 0;
var Wn2 = 0;
var Gn2 = 0;
var $n2 = 0;
var Kn2 = 0;
var Vn2 = 0;
var qt = class extends B3 {
  constructor(t, n2, s15, o) {
    super();
    this._terminal = t;
    this._gl = n2;
    this._dimensions = s15;
    this._themeService = o;
    this._vertices = new zt2();
    this._verticesCursor = new zt2();
    let r5 = this._gl;
    this._program = F3($t2(r5, ss2, os2)), this._register(O3(() => r5.deleteProgram(this._program))), this._projectionLocation = F3(r5.getUniformLocation(this._program, "u_projection")), this._vertexArrayObject = r5.createVertexArray(), r5.bindVertexArray(this._vertexArrayObject);
    let a = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]), l2 = r5.createBuffer();
    this._register(O3(() => r5.deleteBuffer(l2))), r5.bindBuffer(r5.ARRAY_BUFFER, l2), r5.bufferData(r5.ARRAY_BUFFER, a, r5.STATIC_DRAW), r5.enableVertexAttribArray(3), r5.vertexAttribPointer(3, 2, this._gl.FLOAT, false, 0, 0);
    let u2 = new Uint8Array([0, 1, 2, 3]), c2 = r5.createBuffer();
    this._register(O3(() => r5.deleteBuffer(c2))), r5.bindBuffer(r5.ELEMENT_ARRAY_BUFFER, c2), r5.bufferData(r5.ELEMENT_ARRAY_BUFFER, u2, r5.STATIC_DRAW), this._attributesBuffer = F3(r5.createBuffer()), this._register(O3(() => r5.deleteBuffer(this._attributesBuffer))), r5.bindBuffer(r5.ARRAY_BUFFER, this._attributesBuffer), r5.enableVertexAttribArray(0), r5.vertexAttribPointer(0, 2, r5.FLOAT, false, Pi2, 0), r5.vertexAttribDivisor(0, 1), r5.enableVertexAttribArray(1), r5.vertexAttribPointer(1, 2, r5.FLOAT, false, Pi2, 2 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(1, 1), r5.enableVertexAttribArray(2), r5.vertexAttribPointer(2, 4, r5.FLOAT, false, Pi2, 4 * Float32Array.BYTES_PER_ELEMENT), r5.vertexAttribDivisor(2, 1), this._updateCachedColors(o.colors), this._register(this._themeService.onChangeColors((d2) => {
      this._updateCachedColors(d2), this._updateViewportRectangle();
    }));
  }
  renderBackgrounds() {
    this._renderVertices(this._vertices);
  }
  renderCursor() {
    this._renderVertices(this._verticesCursor);
  }
  _renderVertices(t) {
    let n2 = this._gl;
    n2.useProgram(this._program), n2.bindVertexArray(this._vertexArrayObject), n2.uniformMatrix4fv(this._projectionLocation, false, Gt2), n2.bindBuffer(n2.ARRAY_BUFFER, this._attributesBuffer), n2.bufferData(n2.ARRAY_BUFFER, t.attributes, n2.DYNAMIC_DRAW), n2.drawElementsInstanced(this._gl.TRIANGLE_STRIP, 4, n2.UNSIGNED_BYTE, 0, t.count);
  }
  handleResize() {
    this._updateViewportRectangle();
  }
  setDimensions(t) {
    this._dimensions = t;
  }
  _updateCachedColors(t) {
    this._bgFloat = this._colorToFloat32Array(t.background), this._cursorFloat = this._colorToFloat32Array(t.cursor);
  }
  _updateViewportRectangle() {
    this._addRectangleFloat(this._vertices.attributes, 0, 0, 0, this._terminal.cols * this._dimensions.device.cell.width, this._terminal.rows * this._dimensions.device.cell.height, this._bgFloat);
  }
  updateBackgrounds(t) {
    let n2 = this._terminal, s15 = this._vertices, o = 1, r5, a, l2, u2, c2, d2, h2, f2, I3, L3, M5;
    for (r5 = 0; r5 < n2.rows; r5++) {
      for (l2 = -1, u2 = 0, c2 = 0, d2 = false, a = 0; a < n2.cols; a++) h2 = (r5 * n2.cols + a) * Ce2, f2 = t.cells[h2 + ze], I3 = t.cells[h2 + qe3], L3 = !!(I3 & 67108864), (f2 !== u2 || I3 !== c2 && (d2 || L3)) && ((u2 !== 0 || d2 && c2 !== 0) && (M5 = o++ * Ee3, this._updateRectangle(s15, M5, c2, u2, l2, a, r5)), l2 = a, u2 = f2, c2 = I3, d2 = L3);
      (u2 !== 0 || d2 && c2 !== 0) && (M5 = o++ * Ee3, this._updateRectangle(s15, M5, c2, u2, l2, n2.cols, r5));
    }
    s15.count = o;
  }
  updateCursor(t) {
    let n2 = this._verticesCursor, s15 = t.cursor;
    if (!s15 || s15.style === "block") {
      n2.count = 0;
      return;
    }
    let o, r5 = 0;
    (s15.style === "bar" || s15.style === "outline") && (o = r5++ * Ee3, this._addRectangleFloat(n2.attributes, o, s15.x * this._dimensions.device.cell.width, s15.y * this._dimensions.device.cell.height, s15.style === "bar" ? s15.dpr * s15.cursorWidth : s15.dpr, this._dimensions.device.cell.height, this._cursorFloat)), (s15.style === "underline" || s15.style === "outline") && (o = r5++ * Ee3, this._addRectangleFloat(n2.attributes, o, s15.x * this._dimensions.device.cell.width, (s15.y + 1) * this._dimensions.device.cell.height - s15.dpr, s15.width * this._dimensions.device.cell.width, s15.dpr, this._cursorFloat)), s15.style === "outline" && (o = r5++ * Ee3, this._addRectangleFloat(n2.attributes, o, s15.x * this._dimensions.device.cell.width, s15.y * this._dimensions.device.cell.height, s15.width * this._dimensions.device.cell.width, s15.dpr, this._cursorFloat), o = r5++ * Ee3, this._addRectangleFloat(n2.attributes, o, (s15.x + s15.width) * this._dimensions.device.cell.width - s15.dpr, s15.y * this._dimensions.device.cell.height, s15.dpr, this._dimensions.device.cell.height, this._cursorFloat)), n2.count = r5;
  }
  _updateRectangle(t, n2, s15, o, r5, a, l2) {
    if (s15 & 67108864) switch (s15 & 50331648) {
      case 16777216:
      case 33554432:
        xe2 = this._themeService.colors.ansi[s15 & 255].rgba;
        break;
      case 50331648:
        xe2 = (s15 & 16777215) << 8;
        break;
      case 0:
      default:
        xe2 = this._themeService.colors.foreground.rgba;
    }
    else switch (o & 50331648) {
      case 16777216:
      case 33554432:
        xe2 = this._themeService.colors.ansi[o & 255].rgba;
        break;
      case 50331648:
        xe2 = (o & 16777215) << 8;
        break;
      case 0:
      default:
        xe2 = this._themeService.colors.background.rgba;
    }
    t.attributes.length < n2 + 4 && (t.attributes = Bn(t.attributes, this._terminal.rows * this._terminal.cols * Ee3)), Hn2 = r5 * this._dimensions.device.cell.width, Wn2 = l2 * this._dimensions.device.cell.height, Gn2 = (xe2 >> 24 & 255) / 255, $n2 = (xe2 >> 16 & 255) / 255, Kn2 = (xe2 >> 8 & 255) / 255, Vn2 = 1, this._addRectangle(t.attributes, n2, Hn2, Wn2, (a - r5) * this._dimensions.device.cell.width, this._dimensions.device.cell.height, Gn2, $n2, Kn2, Vn2);
  }
  _addRectangle(t, n2, s15, o, r5, a, l2, u2, c2, d2) {
    t[n2] = s15 / this._dimensions.device.canvas.width, t[n2 + 1] = o / this._dimensions.device.canvas.height, t[n2 + 2] = r5 / this._dimensions.device.canvas.width, t[n2 + 3] = a / this._dimensions.device.canvas.height, t[n2 + 4] = l2, t[n2 + 5] = u2, t[n2 + 6] = c2, t[n2 + 7] = d2;
  }
  _addRectangleFloat(t, n2, s15, o, r5, a, l2) {
    t[n2] = s15 / this._dimensions.device.canvas.width, t[n2 + 1] = o / this._dimensions.device.canvas.height, t[n2 + 2] = r5 / this._dimensions.device.canvas.width, t[n2 + 3] = a / this._dimensions.device.canvas.height, t[n2 + 4] = l2[0], t[n2 + 5] = l2[1], t[n2 + 6] = l2[2], t[n2 + 7] = l2[3];
  }
  _colorToFloat32Array(t) {
    return new Float32Array([(t.rgba >> 24 & 255) / 255, (t.rgba >> 16 & 255) / 255, (t.rgba >> 8 & 255) / 255, (t.rgba & 255) / 255]);
  }
};
var jt2 = class extends B3 {
  constructor(t, n2, s15, o, r5, a, l2, u2) {
    super();
    this._container = n2;
    this._alpha = r5;
    this._coreBrowserService = a;
    this._optionsService = l2;
    this._themeService = u2;
    this._deviceCharWidth = 0;
    this._deviceCharHeight = 0;
    this._deviceCellWidth = 0;
    this._deviceCellHeight = 0;
    this._deviceCharLeft = 0;
    this._deviceCharTop = 0;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas"), this._canvas.classList.add(`xterm-${s15}-layer`), this._canvas.style.zIndex = o.toString(), this._initCanvas(), this._container.appendChild(this._canvas), this._register(this._themeService.onChangeColors((c2) => {
      this._refreshCharAtlas(t, c2), this.reset(t);
    })), this._register(O3(() => {
      this._canvas.remove();
    }));
  }
  _initCanvas() {
    this._ctx = F3(this._canvas.getContext("2d", { alpha: this._alpha })), this._alpha || this._clearAll();
  }
  handleBlur(t) {
  }
  handleFocus(t) {
  }
  handleCursorMove(t) {
  }
  handleGridChanged(t, n2, s15) {
  }
  handleSelectionChanged(t, n2, s15, o = false) {
  }
  _setTransparency(t, n2) {
    if (n2 === this._alpha) return;
    let s15 = this._canvas;
    this._alpha = n2, this._canvas = this._canvas.cloneNode(), this._initCanvas(), this._container.replaceChild(this._canvas, s15), this._refreshCharAtlas(t, this._themeService.colors), this.handleGridChanged(t, 0, t.rows - 1);
  }
  _refreshCharAtlas(t, n2) {
    this._deviceCharWidth <= 0 && this._deviceCharHeight <= 0 || (this._charAtlas = Nt2(t, this._optionsService.rawOptions, n2, this._deviceCellWidth, this._deviceCellHeight, this._deviceCharWidth, this._deviceCharHeight, this._coreBrowserService.dpr, 2048), this._charAtlas.warmUp());
  }
  resize(t, n2) {
    this._deviceCellWidth = n2.device.cell.width, this._deviceCellHeight = n2.device.cell.height, this._deviceCharWidth = n2.device.char.width, this._deviceCharHeight = n2.device.char.height, this._deviceCharLeft = n2.device.char.left, this._deviceCharTop = n2.device.char.top, this._canvas.width = n2.device.canvas.width, this._canvas.height = n2.device.canvas.height, this._canvas.style.width = `${n2.css.canvas.width}px`, this._canvas.style.height = `${n2.css.canvas.height}px`, this._alpha || this._clearAll(), this._refreshCharAtlas(t, this._themeService.colors);
  }
  _fillBottomLineAtCells(t, n2, s15 = 1) {
    this._ctx.fillRect(t * this._deviceCellWidth, (n2 + 1) * this._deviceCellHeight - this._coreBrowserService.dpr - 1, s15 * this._deviceCellWidth, this._coreBrowserService.dpr);
  }
  _clearAll() {
    this._alpha ? this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height) : (this._ctx.fillStyle = this._themeService.colors.background.css, this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height));
  }
  _clearCells(t, n2, s15, o) {
    this._alpha ? this._ctx.clearRect(t * this._deviceCellWidth, n2 * this._deviceCellHeight, s15 * this._deviceCellWidth, o * this._deviceCellHeight) : (this._ctx.fillStyle = this._themeService.colors.background.css, this._ctx.fillRect(t * this._deviceCellWidth, n2 * this._deviceCellHeight, s15 * this._deviceCellWidth, o * this._deviceCellHeight));
  }
  _fillCharTrueColor(t, n2, s15, o) {
    this._ctx.font = this._getFont(t, false, false), this._ctx.textBaseline = St2, this._clipCell(s15, o, n2.getWidth()), this._ctx.fillText(n2.getChars(), s15 * this._deviceCellWidth + this._deviceCharLeft, o * this._deviceCellHeight + this._deviceCharTop + this._deviceCharHeight);
  }
  _clipCell(t, n2, s15) {
    this._ctx.beginPath(), this._ctx.rect(t * this._deviceCellWidth, n2 * this._deviceCellHeight, s15 * this._deviceCellWidth, this._deviceCellHeight), this._ctx.clip();
  }
  _getFont(t, n2, s15) {
    let o = n2 ? t.options.fontWeightBold : t.options.fontWeight;
    return `${s15 ? "italic" : ""} ${o} ${t.options.fontSize * this._coreBrowserService.dpr}px ${t.options.fontFamily}`;
  }
};
var Xt2 = class extends jt2 {
  constructor(e, t, n2, s15, o, r5, a) {
    super(n2, e, "link", t, true, o, r5, a), this._register(s15.onShowLinkUnderline((l2) => this._handleShowLinkUnderline(l2))), this._register(s15.onHideLinkUnderline((l2) => this._handleHideLinkUnderline(l2)));
  }
  resize(e, t) {
    super.resize(e, t), this._state = void 0;
  }
  reset(e) {
    this._clearCurrentLink();
  }
  _clearCurrentLink() {
    if (this._state) {
      this._clearCells(this._state.x1, this._state.y1, this._state.cols - this._state.x1, 1);
      let e = this._state.y2 - this._state.y1 - 1;
      e > 0 && this._clearCells(0, this._state.y1 + 1, this._state.cols, e), this._clearCells(0, this._state.y2, this._state.x2, 1), this._state = void 0;
    }
  }
  _handleShowLinkUnderline(e) {
    if (e.fg === 257 ? this._ctx.fillStyle = this._themeService.colors.background.css : e.fg !== void 0 && Fn2(e.fg) ? this._ctx.fillStyle = this._themeService.colors.ansi[e.fg].css : this._ctx.fillStyle = this._themeService.colors.foreground.css, e.y1 === e.y2) this._fillBottomLineAtCells(e.x1, e.y1, e.x2 - e.x1);
    else {
      this._fillBottomLineAtCells(e.x1, e.y1, e.cols - e.x1);
      for (let t = e.y1 + 1; t < e.y2; t++) this._fillBottomLineAtCells(0, t, e.cols);
      this._fillBottomLineAtCells(0, e.y2, e.x2);
    }
    this._state = e;
  }
  _handleHideLinkUnderline(e) {
    this._clearCurrentLink();
  }
};
var te3 = typeof window == "object" ? window : globalThis;
var Zt2 = class Zt3 {
  constructor() {
    this.mapWindowIdToZoomLevel = /* @__PURE__ */ new Map();
    this._onDidChangeZoomLevel = new D3();
    this.onDidChangeZoomLevel = this._onDidChangeZoomLevel.event;
    this.mapWindowIdToZoomFactor = /* @__PURE__ */ new Map();
    this._onDidChangeFullscreen = new D3();
    this.onDidChangeFullscreen = this._onDidChangeFullscreen.event;
    this.mapWindowIdToFullScreen = /* @__PURE__ */ new Map();
  }
  getZoomLevel(e) {
    return this.mapWindowIdToZoomLevel.get(this.getWindowId(e)) ?? 0;
  }
  setZoomLevel(e, t) {
    if (this.getZoomLevel(t) === e) return;
    let n2 = this.getWindowId(t);
    this.mapWindowIdToZoomLevel.set(n2, e), this._onDidChangeZoomLevel.fire(n2);
  }
  getZoomFactor(e) {
    return this.mapWindowIdToZoomFactor.get(this.getWindowId(e)) ?? 1;
  }
  setZoomFactor(e, t) {
    this.mapWindowIdToZoomFactor.set(this.getWindowId(t), e);
  }
  setFullscreen(e, t) {
    if (this.isFullscreen(t) === e) return;
    let n2 = this.getWindowId(t);
    this.mapWindowIdToFullScreen.set(n2, e), this._onDidChangeFullscreen.fire(n2);
  }
  isFullscreen(e) {
    return !!this.mapWindowIdToFullScreen.get(this.getWindowId(e));
  }
  getWindowId(e) {
    return e.vscodeWindowId;
  }
};
Zt2.INSTANCE = new Zt2();
var Qt2 = Zt2;
function us2(i8, e, t) {
  typeof e == "string" && (e = i8.matchMedia(e)), e.addEventListener("change", t);
}
var Wa2 = Qt2.INSTANCE.onDidChangeZoomLevel;
var Ga2 = Qt2.INSTANCE.onDidChangeFullscreen;
var je3 = typeof navigator == "object" ? navigator.userAgent : "";
var Cn2 = je3.indexOf("Firefox") >= 0;
var ut2 = je3.indexOf("AppleWebKit") >= 0;
var zn2 = je3.indexOf("Chrome") >= 0;
var Bi2 = !zn2 && je3.indexOf("Safari") >= 0;
var $a2 = je3.indexOf("Electron/") >= 0;
var Ka2 = je3.indexOf("Android") >= 0;
var Yt2 = false;
if (typeof te3.matchMedia == "function") {
  let i8 = te3.matchMedia("(display-mode: standalone) or (display-mode: window-controls-overlay)"), e = te3.matchMedia("(display-mode: fullscreen)");
  Yt2 = i8.matches, us2(te3, i8, ({ matches: t }) => {
    Yt2 && e.matches || (Yt2 = t);
  });
}
function qn2() {
  return Yt2;
}
var Xe3 = "en";
var Ui2 = false;
var ni2 = false;
var ti2 = false;
var cs2 = false;
var Xn2 = false;
var Yn2 = false;
var ds2 = false;
var hs2 = false;
var ps2 = false;
var fs2 = false;
var ei2;
var ii2 = Xe3;
var jn2 = Xe3;
var ms2;
var ye3;
var Ie2 = globalThis;
var re3;
typeof Ie2.vscode < "u" && typeof Ie2.vscode.process < "u" ? re3 = Ie2.vscode.process : typeof process < "u" && typeof process?.versions?.node == "string" && (re3 = process);
var Qn2 = typeof re3?.versions?.electron == "string";
var _s2 = Qn2 && re3?.type === "renderer";
if (typeof re3 == "object") {
  Ui2 = re3.platform === "win32", ni2 = re3.platform === "darwin", ti2 = re3.platform === "linux", cs2 = ti2 && !!re3.env.SNAP && !!re3.env.SNAP_REVISION, ds2 = Qn2, ps2 = !!re3.env.CI || !!re3.env.BUILD_ARTIFACTSTAGINGDIRECTORY, ei2 = Xe3, ii2 = Xe3;
  let i8 = re3.env.VSCODE_NLS_CONFIG;
  if (i8) try {
    let e = JSON.parse(i8);
    ei2 = e.userLocale, jn2 = e.osLocale, ii2 = e.resolvedLanguage || Xe3, ms2 = e.languagePack?.translationsConfigFile;
  } catch {
  }
  Xn2 = true;
} else typeof navigator == "object" && !_s2 ? (ye3 = navigator.userAgent, Ui2 = ye3.indexOf("Windows") >= 0, ni2 = ye3.indexOf("Macintosh") >= 0, hs2 = (ye3.indexOf("Macintosh") >= 0 || ye3.indexOf("iPad") >= 0 || ye3.indexOf("iPhone") >= 0) && !!navigator.maxTouchPoints && navigator.maxTouchPoints > 0, ti2 = ye3.indexOf("Linux") >= 0, fs2 = ye3?.indexOf("Mobi") >= 0, Yn2 = true, ii2 = globalThis._VSCODE_NLS_LANGUAGE || Xe3, ei2 = navigator.language.toLowerCase(), jn2 = ei2) : console.error("Unable to resolve platform.");
var Ni2 = 0;
ni2 ? Ni2 = 1 : Ui2 ? Ni2 = 3 : ti2 && (Ni2 = 2);
var ri2 = Xn2;
var bs2 = Yn2 && typeof Ie2.importScripts == "function";
var Va2 = bs2 ? Ie2.origin : void 0;
var _e3 = ye3;
var Me2 = ii2;
var vs2;
((n2) => {
  function i8() {
    return Me2;
  }
  n2.value = i8;
  function e() {
    return Me2.length === 2 ? Me2 === "en" : Me2.length >= 3 ? Me2[0] === "e" && Me2[1] === "n" && Me2[2] === "-" : false;
  }
  n2.isDefaultVariant = e;
  function t() {
    return Me2 === "en";
  }
  n2.isDefault = t;
})(vs2 ||= {});
var Ts2 = typeof Ie2.postMessage == "function" && !Ie2.importScripts;
var Zn2 = (() => {
  if (Ts2) {
    let i8 = [];
    Ie2.addEventListener("message", (t) => {
      if (t.data && t.data.vscodeScheduleAsyncWork) for (let n2 = 0, s15 = i8.length; n2 < s15; n2++) {
        let o = i8[n2];
        if (o.id === t.data.vscodeScheduleAsyncWork) {
          i8.splice(n2, 1), o.callback();
          return;
        }
      }
    });
    let e = 0;
    return (t) => {
      let n2 = ++e;
      i8.push({ id: n2, callback: t }), Ie2.postMessage({ vscodeScheduleAsyncWork: n2 }, "*");
    };
  }
  return (i8) => setTimeout(i8);
})();
var gs2 = !!(_e3 && _e3.indexOf("Chrome") >= 0);
var Ca2 = !!(_e3 && _e3.indexOf("Firefox") >= 0);
var za2 = !!(!gs2 && _e3 && _e3.indexOf("Safari") >= 0);
var qa2 = !!(_e3 && _e3.indexOf("Edg/") >= 0);
var ja2 = !!(_e3 && _e3.indexOf("Android") >= 0);
var Ae3 = typeof navigator == "object" ? navigator : {};
var xs2 = { clipboard: { writeText: ri2 || document.queryCommandSupported && document.queryCommandSupported("copy") || !!(Ae3 && Ae3.clipboard && Ae3.clipboard.writeText), readText: ri2 || !!(Ae3 && Ae3.clipboard && Ae3.clipboard.readText) }, keyboard: ri2 || qn2() ? 0 : Ae3.keyboard || Bi2 ? 1 : 2, touch: "ontouchstart" in te3 || Ae3.maxTouchPoints > 0, pointerEvents: te3.PointerEvent && ("ontouchstart" in te3 || navigator.maxTouchPoints > 0) };
var dt2 = class {
  constructor() {
    this._keyCodeToStr = [], this._strToKeyCode = /* @__PURE__ */ Object.create(null);
  }
  define(e, t) {
    this._keyCodeToStr[e] = t, this._strToKeyCode[t.toLowerCase()] = e;
  }
  keyCodeToStr(e) {
    return this._keyCodeToStr[e];
  }
  strToKeyCode(e) {
    return this._strToKeyCode[e.toLowerCase()] || 0;
  }
};
var Hi2 = new dt2();
var Jn2 = new dt2();
var er2 = new dt2();
var Es2 = new Array(230);
var tr2;
((r5) => {
  function i8(a) {
    return Hi2.keyCodeToStr(a);
  }
  r5.toString = i8;
  function e(a) {
    return Hi2.strToKeyCode(a);
  }
  r5.fromString = e;
  function t(a) {
    return Jn2.keyCodeToStr(a);
  }
  r5.toUserSettingsUS = t;
  function n2(a) {
    return er2.keyCodeToStr(a);
  }
  r5.toUserSettingsGeneral = n2;
  function s15(a) {
    return Jn2.strToKeyCode(a) || er2.strToKeyCode(a);
  }
  r5.fromUserSettings = s15;
  function o(a) {
    if (a >= 98 && a <= 113) return null;
    switch (a) {
      case 16:
        return "Up";
      case 18:
        return "Down";
      case 15:
        return "Left";
      case 17:
        return "Right";
    }
    return Hi2.keyCodeToStr(a);
  }
  r5.toElectronAccelerator = o;
})(tr2 ||= {});
var nr2 = Object.freeze(function(i8, e) {
  let t = setTimeout(i8.bind(e), 0);
  return { dispose() {
    clearTimeout(t);
  } };
});
var Is2;
((n2) => {
  function i8(s15) {
    return s15 === n2.None || s15 === n2.Cancelled || s15 instanceof Wi2 ? true : !s15 || typeof s15 != "object" ? false : typeof s15.isCancellationRequested == "boolean" && typeof s15.onCancellationRequested == "function";
  }
  n2.isCancellationToken = i8, n2.None = Object.freeze({ isCancellationRequested: false, onCancellationRequested: ee4.None }), n2.Cancelled = Object.freeze({ isCancellationRequested: true, onCancellationRequested: nr2 });
})(Is2 ||= {});
var Wi2 = class {
  constructor() {
    this._isCancelled = false;
    this._emitter = null;
  }
  cancel() {
    this._isCancelled || (this._isCancelled = true, this._emitter && (this._emitter.fire(void 0), this.dispose()));
  }
  get isCancellationRequested() {
    return this._isCancelled;
  }
  get onCancellationRequested() {
    return this._isCancelled ? nr2 : (this._emitter || (this._emitter = new D3()), this._emitter.event);
  }
  dispose() {
    this._emitter && (this._emitter.dispose(), this._emitter = null);
  }
};
var Ls2 = Symbol("MicrotaskDelay");
var ws2;
var oi2;
(function() {
  typeof globalThis.requestIdleCallback != "function" || typeof globalThis.cancelIdleCallback != "function" ? oi2 = (i8, e) => {
    Zn2(() => {
      if (t) return;
      let n2 = Date.now() + 15;
      e(Object.freeze({ didTimeout: true, timeRemaining() {
        return Math.max(0, n2 - Date.now());
      } }));
    });
    let t = false;
    return { dispose() {
      t || (t = true);
    } };
  } : oi2 = (i8, e, t) => {
    let n2 = i8.requestIdleCallback(e, typeof t == "number" ? { timeout: t } : void 0), s15 = false;
    return { dispose() {
      s15 || (s15 = true, i8.cancelIdleCallback(n2));
    } };
  }, ws2 = (i8) => oi2(globalThis, i8);
})();
var Rs2;
((t) => {
  async function i8(n2) {
    let s15, o = await Promise.all(n2.map((r5) => r5.then((a) => a, (a) => {
      s15 || (s15 = a);
    })));
    if (typeof s15 < "u") throw s15;
    return o;
  }
  t.settled = i8;
  function e(n2) {
    return new Promise(async (s15, o) => {
      try {
        await n2(s15, o);
      } catch (r5) {
        o(r5);
      }
    });
  }
  t.withAsyncBody = e;
})(Rs2 ||= {});
var Q4 = class Q5 {
  static fromArray(e) {
    return new Q5((t) => {
      t.emitMany(e);
    });
  }
  static fromPromise(e) {
    return new Q5(async (t) => {
      t.emitMany(await e);
    });
  }
  static fromPromises(e) {
    return new Q5(async (t) => {
      await Promise.all(e.map(async (n2) => t.emitOne(await n2)));
    });
  }
  static merge(e) {
    return new Q5(async (t) => {
      await Promise.all(e.map(async (n2) => {
        for await (let s15 of n2) t.emitOne(s15);
      }));
    });
  }
  constructor(e, t) {
    this._state = 0, this._results = [], this._error = null, this._onReturn = t, this._onStateChanged = new D3(), queueMicrotask(async () => {
      let n2 = { emitOne: (s15) => this.emitOne(s15), emitMany: (s15) => this.emitMany(s15), reject: (s15) => this.reject(s15) };
      try {
        await Promise.resolve(e(n2)), this.resolve();
      } catch (s15) {
        this.reject(s15);
      } finally {
        n2.emitOne = void 0, n2.emitMany = void 0, n2.reject = void 0;
      }
    });
  }
  [Symbol.asyncIterator]() {
    let e = 0;
    return { next: async () => {
      do {
        if (this._state === 2) throw this._error;
        if (e < this._results.length) return { done: false, value: this._results[e++] };
        if (this._state === 1) return { done: true, value: void 0 };
        await ee4.toPromise(this._onStateChanged.event);
      } while (true);
    }, return: async () => (this._onReturn?.(), { done: true, value: void 0 }) };
  }
  static map(e, t) {
    return new Q5(async (n2) => {
      for await (let s15 of e) n2.emitOne(t(s15));
    });
  }
  map(e) {
    return Q5.map(this, e);
  }
  static filter(e, t) {
    return new Q5(async (n2) => {
      for await (let s15 of e) t(s15) && n2.emitOne(s15);
    });
  }
  filter(e) {
    return Q5.filter(this, e);
  }
  static coalesce(e) {
    return Q5.filter(e, (t) => !!t);
  }
  coalesce() {
    return Q5.coalesce(this);
  }
  static async toPromise(e) {
    let t = [];
    for await (let n2 of e) t.push(n2);
    return t;
  }
  toPromise() {
    return Q5.toPromise(this);
  }
  emitOne(e) {
    this._state === 0 && (this._results.push(e), this._onStateChanged.fire());
  }
  emitMany(e) {
    this._state === 0 && (this._results = this._results.concat(e), this._onStateChanged.fire());
  }
  resolve() {
    this._state === 0 && (this._state = 1, this._onStateChanged.fire());
  }
  reject(e) {
    this._state === 0 && (this._state = 2, this._error = e, this._onStateChanged.fire());
  }
};
Q4.EMPTY = Q4.fromArray([]);
function sr2(i8) {
  return 55296 <= i8 && i8 <= 56319;
}
function Gi(i8) {
  return 56320 <= i8 && i8 <= 57343;
}
function or2(i8, e) {
  return (i8 - 55296 << 10) + (e - 56320) + 65536;
}
function ur2(i8) {
  return Ki2(i8, 0);
}
function Ki2(i8, e) {
  switch (typeof i8) {
    case "object":
      return i8 === null ? Le3(349, e) : Array.isArray(i8) ? As(i8, e) : Ss2(i8, e);
    case "string":
      return cr3(i8, e);
    case "boolean":
      return Ms2(i8, e);
    case "number":
      return Le3(i8, e);
    case "undefined":
      return Le3(937, e);
    default:
      return Le3(617, e);
  }
}
function Le3(i8, e) {
  return (e << 5) - e + i8 | 0;
}
function Ms2(i8, e) {
  return Le3(i8 ? 433 : 863, e);
}
function cr3(i8, e) {
  e = Le3(149417, e);
  for (let t = 0, n2 = i8.length; t < n2; t++) e = Le3(i8.charCodeAt(t), e);
  return e;
}
function As(i8, e) {
  return e = Le3(104579, e), i8.reduce((t, n2) => Ki2(n2, t), e);
}
function Ss2(i8, e) {
  return e = Le3(181387, e), Object.keys(i8).sort().reduce((t, n2) => (t = cr3(n2, t), Ki2(i8[n2], t)), e);
}
function $i2(i8, e, t = 32) {
  let n2 = t - e, s15 = ~((1 << n2) - 1);
  return (i8 << e | (s15 & i8) >>> n2) >>> 0;
}
function ar2(i8, e = 0, t = i8.byteLength, n2 = 0) {
  for (let s15 = 0; s15 < t; s15++) i8[e + s15] = n2;
}
function Os2(i8, e, t = "0") {
  for (; i8.length < e; ) i8 = t + i8;
  return i8;
}
function ht(i8, e = 32) {
  return i8 instanceof ArrayBuffer ? Array.from(new Uint8Array(i8)).map((t) => t.toString(16).padStart(2, "0")).join("") : Os2((i8 >>> 0).toString(16), e / 4);
}
var ai2 = class ai3 {
  constructor() {
    this._h0 = 1732584193;
    this._h1 = 4023233417;
    this._h2 = 2562383102;
    this._h3 = 271733878;
    this._h4 = 3285377520;
    this._buff = new Uint8Array(67), this._buffDV = new DataView(this._buff.buffer), this._buffLen = 0, this._totalLen = 0, this._leftoverHighSurrogate = 0, this._finished = false;
  }
  update(e) {
    let t = e.length;
    if (t === 0) return;
    let n2 = this._buff, s15 = this._buffLen, o = this._leftoverHighSurrogate, r5, a;
    for (o !== 0 ? (r5 = o, a = -1, o = 0) : (r5 = e.charCodeAt(0), a = 0); ; ) {
      let l2 = r5;
      if (sr2(r5)) if (a + 1 < t) {
        let u2 = e.charCodeAt(a + 1);
        Gi(u2) ? (a++, l2 = or2(r5, u2)) : l2 = 65533;
      } else {
        o = r5;
        break;
      }
      else Gi(r5) && (l2 = 65533);
      if (s15 = this._push(n2, s15, l2), a++, a < t) r5 = e.charCodeAt(a);
      else break;
    }
    this._buffLen = s15, this._leftoverHighSurrogate = o;
  }
  _push(e, t, n2) {
    return n2 < 128 ? e[t++] = n2 : n2 < 2048 ? (e[t++] = 192 | (n2 & 1984) >>> 6, e[t++] = 128 | (n2 & 63) >>> 0) : n2 < 65536 ? (e[t++] = 224 | (n2 & 61440) >>> 12, e[t++] = 128 | (n2 & 4032) >>> 6, e[t++] = 128 | (n2 & 63) >>> 0) : (e[t++] = 240 | (n2 & 1835008) >>> 18, e[t++] = 128 | (n2 & 258048) >>> 12, e[t++] = 128 | (n2 & 4032) >>> 6, e[t++] = 128 | (n2 & 63) >>> 0), t >= 64 && (this._step(), t -= 64, this._totalLen += 64, e[0] = e[64], e[1] = e[65], e[2] = e[66]), t;
  }
  digest() {
    return this._finished || (this._finished = true, this._leftoverHighSurrogate && (this._leftoverHighSurrogate = 0, this._buffLen = this._push(this._buff, this._buffLen, 65533)), this._totalLen += this._buffLen, this._wrapUp()), ht(this._h0) + ht(this._h1) + ht(this._h2) + ht(this._h3) + ht(this._h4);
  }
  _wrapUp() {
    this._buff[this._buffLen++] = 128, ar2(this._buff, this._buffLen), this._buffLen > 56 && (this._step(), ar2(this._buff));
    let e = 8 * this._totalLen;
    this._buffDV.setUint32(56, Math.floor(e / 4294967296), false), this._buffDV.setUint32(60, e % 4294967296, false), this._step();
  }
  _step() {
    let e = ai3._bigBlock32, t = this._buffDV;
    for (let d2 = 0; d2 < 64; d2 += 4) e.setUint32(d2, t.getUint32(d2, false), false);
    for (let d2 = 64; d2 < 320; d2 += 4) e.setUint32(d2, $i2(e.getUint32(d2 - 12, false) ^ e.getUint32(d2 - 32, false) ^ e.getUint32(d2 - 56, false) ^ e.getUint32(d2 - 64, false), 1), false);
    let n2 = this._h0, s15 = this._h1, o = this._h2, r5 = this._h3, a = this._h4, l2, u2, c2;
    for (let d2 = 0; d2 < 80; d2++) d2 < 20 ? (l2 = s15 & o | ~s15 & r5, u2 = 1518500249) : d2 < 40 ? (l2 = s15 ^ o ^ r5, u2 = 1859775393) : d2 < 60 ? (l2 = s15 & o | s15 & r5 | o & r5, u2 = 2400959708) : (l2 = s15 ^ o ^ r5, u2 = 3395469782), c2 = $i2(n2, 5) + l2 + a + u2 + e.getUint32(d2 * 4, false) & 4294967295, a = r5, r5 = o, o = $i2(s15, 30), s15 = n2, n2 = c2;
    this._h0 = this._h0 + n2 & 4294967295, this._h1 = this._h1 + s15 & 4294967295, this._h2 = this._h2 + o & 4294967295, this._h3 = this._h3 + r5 & 4294967295, this._h4 = this._h4 + a & 4294967295;
  }
};
ai2._bigBlock32 = new DataView(new ArrayBuffer(320));
var { registerWindow: fu, getWindow: Fs2, getDocument: mu, getWindows: _u, getWindowsCount: bu, getWindowId: dr3, getWindowById: vu, hasWindow: Tu2, onDidRegisterWindow: gu, onWillUnregisterWindow: xu2, onDidUnregisterWindow: Eu2 } = function() {
  let i8 = /* @__PURE__ */ new Map();
  te3;
  let e = { window: te3, disposables: new fe3() };
  i8.set(te3.vscodeWindowId, e);
  let t = new D3(), n2 = new D3(), s15 = new D3();
  function o(r5, a) {
    return (typeof r5 == "number" ? i8.get(r5) : void 0) ?? (a ? e : void 0);
  }
  return { onDidRegisterWindow: t.event, onWillUnregisterWindow: s15.event, onDidUnregisterWindow: n2.event, registerWindow(r5) {
    if (i8.has(r5.vscodeWindowId)) return B3.None;
    let a = new fe3(), l2 = { window: r5, disposables: a.add(new fe3()) };
    return i8.set(r5.vscodeWindowId, l2), a.add(O3(() => {
      i8.delete(r5.vscodeWindowId), n2.fire(r5);
    })), a.add(li2(r5, Ps2.BEFORE_UNLOAD, () => {
      s15.fire(r5);
    })), t.fire(l2), a;
  }, getWindows() {
    return i8.values();
  }, getWindowsCount() {
    return i8.size;
  }, getWindowId(r5) {
    return r5.vscodeWindowId;
  }, hasWindow(r5) {
    return i8.has(r5);
  }, getWindowById: o, getWindow(r5) {
    let a = r5;
    if (a?.ownerDocument?.defaultView) return a.ownerDocument.defaultView.window;
    let l2 = r5;
    return l2?.view ? l2.view.window : te3;
  }, getDocument(r5) {
    return Fs2(r5).document;
  } };
}();
var Vi2 = class {
  constructor(e, t, n2, s15) {
    this._node = e, this._type = t, this._handler = n2, this._options = s15 || false, this._node.addEventListener(this._type, this._handler, this._options);
  }
  dispose() {
    this._handler && (this._node.removeEventListener(this._type, this._handler, this._options), this._node = null, this._handler = null);
  }
};
function li2(i8, e, t, n2) {
  return new Vi2(i8, e, t, n2);
}
var ks2;
var hr3;
var pt3 = class {
  constructor(e, t = 0) {
    this._runner = e, this.priority = t, this._canceled = false;
  }
  dispose() {
    this._canceled = true;
  }
  execute() {
    if (!this._canceled) try {
      this._runner();
    } catch (e) {
      Pe2(e);
    }
  }
  static sort(e, t) {
    return t.priority - e.priority;
  }
};
(function() {
  let i8 = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Map(), s15 = (o) => {
    t.set(o, false);
    let r5 = i8.get(o) ?? [];
    for (e.set(o, r5), i8.set(o, []), n2.set(o, true); r5.length > 0; ) r5.sort(pt3.sort), r5.shift().execute();
    n2.set(o, false);
  };
  hr3 = (o, r5, a = 0) => {
    let l2 = dr3(o), u2 = new pt3(r5, a), c2 = i8.get(l2);
    return c2 || (c2 = [], i8.set(l2, c2)), c2.push(u2), t.get(l2) || (t.set(l2, true), o.requestAnimationFrame(() => s15(l2))), u2;
  }, ks2 = (o, r5, a) => {
    let l2 = dr3(o);
    if (n2.get(l2)) {
      let u2 = new pt3(r5, a), c2 = e.get(l2);
      return c2 || (c2 = [], e.set(l2, c2)), c2.push(u2), u2;
    } else return hr3(o, r5, a);
  };
})();
var ke3 = class ke4 {
  constructor(e, t) {
    this.width = e;
    this.height = t;
  }
  with(e = this.width, t = this.height) {
    return e !== this.width || t !== this.height ? new ke4(e, t) : this;
  }
  static is(e) {
    return typeof e == "object" && typeof e.height == "number" && typeof e.width == "number";
  }
  static lift(e) {
    return e instanceof ke4 ? e : new ke4(e.width, e.height);
  }
  static equals(e, t) {
    return e === t ? true : !e || !t ? false : e.width === t.width && e.height === t.height;
  }
};
ke3.None = new ke3(0, 0);
var yu2 = new class {
  constructor() {
    this.mutationObservers = /* @__PURE__ */ new Map();
  }
  observe(i8, e, t) {
    let n2 = this.mutationObservers.get(i8);
    n2 || (n2 = /* @__PURE__ */ new Map(), this.mutationObservers.set(i8, n2));
    let s15 = ur2(t), o = n2.get(s15);
    if (o) o.users += 1;
    else {
      let r5 = new D3(), a = new MutationObserver((u2) => r5.fire(u2));
      a.observe(i8, t);
      let l2 = o = { users: 1, observer: a, onDidMutate: r5.event };
      e.add(O3(() => {
        l2.users -= 1, l2.users === 0 && (r5.dispose(), a.disconnect(), n2?.delete(s15), n2?.size === 0 && this.mutationObservers.delete(i8));
      })), n2.set(s15, o);
    }
    return o.onDidMutate;
  }
}();
var Ps2 = { CLICK: "click", AUXCLICK: "auxclick", DBLCLICK: "dblclick", MOUSE_UP: "mouseup", MOUSE_DOWN: "mousedown", MOUSE_OVER: "mouseover", MOUSE_MOVE: "mousemove", MOUSE_OUT: "mouseout", MOUSE_ENTER: "mouseenter", MOUSE_LEAVE: "mouseleave", MOUSE_WHEEL: "wheel", POINTER_UP: "pointerup", POINTER_DOWN: "pointerdown", POINTER_MOVE: "pointermove", POINTER_LEAVE: "pointerleave", CONTEXT_MENU: "contextmenu", WHEEL: "wheel", KEY_DOWN: "keydown", KEY_PRESS: "keypress", KEY_UP: "keyup", LOAD: "load", BEFORE_UNLOAD: "beforeunload", UNLOAD: "unload", PAGE_SHOW: "pageshow", PAGE_HIDE: "pagehide", PASTE: "paste", ABORT: "abort", ERROR: "error", RESIZE: "resize", SCROLL: "scroll", FULLSCREEN_CHANGE: "fullscreenchange", WK_FULLSCREEN_CHANGE: "webkitfullscreenchange", SELECT: "select", CHANGE: "change", SUBMIT: "submit", RESET: "reset", FOCUS: "focus", FOCUS_IN: "focusin", FOCUS_OUT: "focusout", BLUR: "blur", INPUT: "input", STORAGE: "storage", DRAG_START: "dragstart", DRAG: "drag", DRAG_ENTER: "dragenter", DRAG_LEAVE: "dragleave", DRAG_OVER: "dragover", DROP: "drop", DRAG_END: "dragend", ANIMATION_START: ut2 ? "webkitAnimationStart" : "animationstart", ANIMATION_END: ut2 ? "webkitAnimationEnd" : "animationend", ANIMATION_ITERATION: ut2 ? "webkitAnimationIteration" : "animationiteration" };
var Bs2 = /([\w\-]+)?(#([\w\-]+))?((\.([\w\-]+))*)/;
function fr2(i8, e, t, ...n2) {
  let s15 = Bs2.exec(e);
  if (!s15) throw new Error("Bad use of emmet");
  let o = s15[1] || "div", r5;
  return i8 !== "http://www.w3.org/1999/xhtml" ? r5 = document.createElementNS(i8, o) : r5 = document.createElement(o), s15[3] && (r5.id = s15[3]), s15[4] && (r5.className = s15[4].replace(/\./g, " ").trim()), t && Object.entries(t).forEach(([a, l2]) => {
    typeof l2 > "u" || (/^on\w+$/.test(a) ? r5[a] = l2 : a === "selected" ? l2 && r5.setAttribute(a, "true") : r5.setAttribute(a, l2));
  }), r5.append(...n2), r5;
}
function Ns(i8, e, ...t) {
  return fr2("http://www.w3.org/1999/xhtml", i8, e, ...t);
}
Ns.SVG = function(i8, e, ...t) {
  return fr2("http://www.w3.org/2000/svg", i8, e, ...t);
};
var ui2 = class extends B3 {
  constructor(t, n2, s15, o, r5, a, l2, u2, c2) {
    super();
    this._terminal = t;
    this._characterJoinerService = n2;
    this._charSizeService = s15;
    this._coreBrowserService = o;
    this._coreService = r5;
    this._decorationService = a;
    this._optionsService = l2;
    this._themeService = u2;
    this._cursorBlinkStateManager = new be3();
    this._charAtlasDisposable = this._register(new be3());
    this._observerDisposable = this._register(new be3());
    this._model = new Vt2();
    this._workCell = new at3();
    this._workCell2 = new at3();
    this._rectangleRenderer = this._register(new be3());
    this._glyphRenderer = this._register(new be3());
    this._onChangeTextureAtlas = this._register(new D3());
    this.onChangeTextureAtlas = this._onChangeTextureAtlas.event;
    this._onAddTextureAtlasCanvas = this._register(new D3());
    this.onAddTextureAtlasCanvas = this._onAddTextureAtlasCanvas.event;
    this._onRemoveTextureAtlasCanvas = this._register(new D3());
    this.onRemoveTextureAtlasCanvas = this._onRemoveTextureAtlasCanvas.event;
    this._onRequestRedraw = this._register(new D3());
    this.onRequestRedraw = this._onRequestRedraw.event;
    this._onContextLoss = this._register(new D3());
    this.onContextLoss = this._onContextLoss.event;
    this._canvas = this._coreBrowserService.mainDocument.createElement("canvas");
    let d2 = { antialias: false, depth: false, preserveDrawingBuffer: c2 };
    if (this._gl = this._canvas.getContext("webgl2", d2), !this._gl) throw new Error("WebGL2 not supported " + this._gl);
    this._register(this._themeService.onChangeColors(() => this._handleColorChange())), this._cellColorResolver = new At3(this._terminal, this._optionsService, this._model.selection, this._decorationService, this._coreBrowserService, this._themeService), this._core = this._terminal._core, this._renderLayers = [new Xt2(this._core.screenElement, 2, this._terminal, this._core.linkifier, this._coreBrowserService, l2, this._themeService)], this.dimensions = _n2(), this._devicePixelRatio = this._coreBrowserService.dpr, this._updateDimensions(), this._updateCursorBlink(), this._register(l2.onOptionChange(() => this._handleOptionsChanged())), this._deviceMaxTextureSize = this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE), this._register(li2(this._canvas, "webglcontextlost", (h2) => {
      console.log("webglcontextlost event received"), h2.preventDefault(), this._contextRestorationTimeout = setTimeout(() => {
        this._contextRestorationTimeout = void 0, console.warn("webgl context not restored; firing onContextLoss"), this._onContextLoss.fire(h2);
      }, 3e3);
    })), this._register(li2(this._canvas, "webglcontextrestored", (h2) => {
      console.warn("webglcontextrestored event received"), clearTimeout(this._contextRestorationTimeout), this._contextRestorationTimeout = void 0, Ai2(this._terminal), this._initializeWebGLState(), this._requestRedrawViewport();
    })), this._observerDisposable.value = Si2(this._canvas, this._coreBrowserService.window, (h2, f2) => this._setCanvasDevicePixelDimensions(h2, f2)), this._register(this._coreBrowserService.onWindowChange((h2) => {
      this._observerDisposable.value = Si2(this._canvas, h2, (f2, I3) => this._setCanvasDevicePixelDimensions(f2, I3));
    })), this._core.screenElement.appendChild(this._canvas), [this._rectangleRenderer.value, this._glyphRenderer.value] = this._initializeWebGLState(), this._isAttached = this._core.screenElement.isConnected, this._register(O3(() => {
      for (let h2 of this._renderLayers) h2.dispose();
      this._canvas.parentElement?.removeChild(this._canvas), Ai2(this._terminal);
    }));
  }
  get textureAtlas() {
    return this._charAtlas?.pages[0].canvas;
  }
  _handleColorChange() {
    this._refreshCharAtlas(), this._clearModel(true);
  }
  handleDevicePixelRatioChange() {
    this._devicePixelRatio !== this._coreBrowserService.dpr && (this._devicePixelRatio = this._coreBrowserService.dpr, this.handleResize(this._terminal.cols, this._terminal.rows));
  }
  handleResize(t, n2) {
    this._updateDimensions(), this._model.resize(this._terminal.cols, this._terminal.rows);
    for (let s15 of this._renderLayers) s15.resize(this._terminal, this.dimensions);
    this._canvas.width = this.dimensions.device.canvas.width, this._canvas.height = this.dimensions.device.canvas.height, this._canvas.style.width = `${this.dimensions.css.canvas.width}px`, this._canvas.style.height = `${this.dimensions.css.canvas.height}px`, this._core.screenElement.style.width = `${this.dimensions.css.canvas.width}px`, this._core.screenElement.style.height = `${this.dimensions.css.canvas.height}px`, this._rectangleRenderer.value?.setDimensions(this.dimensions), this._rectangleRenderer.value?.handleResize(), this._glyphRenderer.value?.setDimensions(this.dimensions), this._glyphRenderer.value?.handleResize(), this._refreshCharAtlas(), this._clearModel(false);
  }
  handleCharSizeChanged() {
    this.handleResize(this._terminal.cols, this._terminal.rows);
  }
  handleBlur() {
    for (let t of this._renderLayers) t.handleBlur(this._terminal);
    this._cursorBlinkStateManager.value?.pause(), this._requestRedrawViewport();
  }
  handleFocus() {
    for (let t of this._renderLayers) t.handleFocus(this._terminal);
    this._cursorBlinkStateManager.value?.resume(), this._requestRedrawViewport();
  }
  handleSelectionChanged(t, n2, s15) {
    for (let o of this._renderLayers) o.handleSelectionChanged(this._terminal, t, n2, s15);
    this._model.selection.update(this._core, t, n2, s15), this._requestRedrawViewport();
  }
  handleCursorMove() {
    for (let t of this._renderLayers) t.handleCursorMove(this._terminal);
    this._cursorBlinkStateManager.value?.restartBlinkAnimation();
  }
  _handleOptionsChanged() {
    this._updateDimensions(), this._refreshCharAtlas(), this._updateCursorBlink();
  }
  _initializeWebGLState() {
    return this._rectangleRenderer.value = new qt(this._terminal, this._gl, this.dimensions, this._themeService), this._glyphRenderer.value = new Kt2(this._terminal, this._gl, this.dimensions, this._optionsService), this.handleCharSizeChanged(), [this._rectangleRenderer.value, this._glyphRenderer.value];
  }
  _refreshCharAtlas() {
    if (this.dimensions.device.char.width <= 0 && this.dimensions.device.char.height <= 0) {
      this._isAttached = false;
      return;
    }
    let t = Nt2(this._terminal, this._optionsService.rawOptions, this._themeService.colors, this.dimensions.device.cell.width, this.dimensions.device.cell.height, this.dimensions.device.char.width, this.dimensions.device.char.height, this._coreBrowserService.dpr, this._deviceMaxTextureSize);
    this._charAtlas !== t && (this._onChangeTextureAtlas.fire(t.pages[0].canvas), this._charAtlasDisposable.value = It2(ee4.forward(t.onAddTextureAtlasCanvas, this._onAddTextureAtlasCanvas), ee4.forward(t.onRemoveTextureAtlasCanvas, this._onRemoveTextureAtlasCanvas))), this._charAtlas = t, this._charAtlas.warmUp(), this._glyphRenderer.value?.setAtlas(this._charAtlas);
  }
  _clearModel(t) {
    this._model.clear(), t && this._glyphRenderer.value?.clear();
  }
  clearTextureAtlas() {
    this._charAtlas?.clearTexture(), this._clearModel(true), this._requestRedrawViewport();
  }
  clear() {
    this._clearModel(true);
    for (let t of this._renderLayers) t.reset(this._terminal);
    this._cursorBlinkStateManager.value?.restartBlinkAnimation(), this._updateCursorBlink();
  }
  renderRows(t, n2) {
    if (!this._isAttached) if (this._core.screenElement?.isConnected && this._charSizeService.width && this._charSizeService.height) this._updateDimensions(), this._refreshCharAtlas(), this._isAttached = true;
    else return;
    for (let s15 of this._renderLayers) s15.handleGridChanged(this._terminal, t, n2);
    !this._glyphRenderer.value || !this._rectangleRenderer.value || (this._glyphRenderer.value.beginFrame() ? (this._clearModel(true), this._updateModel(0, this._terminal.rows - 1)) : this._updateModel(t, n2), this._rectangleRenderer.value.renderBackgrounds(), this._glyphRenderer.value.render(this._model), (!this._cursorBlinkStateManager.value || this._cursorBlinkStateManager.value.isCursorVisible) && this._rectangleRenderer.value.renderCursor());
  }
  _updateCursorBlink() {
    this._coreService.decPrivateModes.cursorBlink ?? this._terminal.options.cursorBlink ? this._cursorBlinkStateManager.value = new Ht(() => {
      this._requestRedrawCursor();
    }, this._coreBrowserService) : this._cursorBlinkStateManager.clear(), this._requestRedrawCursor();
  }
  _updateModel(t, n2) {
    let s15 = this._core, o = this._workCell, r5, a, l2, u2, c2, d2, h2 = 0, f2 = true, I3, L3, M5, q3, S3, W, E2, y2, w4;
    t = mr2(t, s15.rows - 1, 0), n2 = mr2(n2, s15.rows - 1, 0);
    let G4 = this._coreService.decPrivateModes.cursorStyle ?? s15.options.cursorStyle ?? "block", ue3 = this._terminal.buffer.active.baseY + this._terminal.buffer.active.cursorY, Se3 = ue3 - s15.buffer.ydisp, ce3 = Math.min(this._terminal.buffer.active.cursorX, s15.cols - 1), we3 = -1, A3 = this._coreService.isCursorInitialized && !this._coreService.isCursorHidden && (!this._cursorBlinkStateManager.value || this._cursorBlinkStateManager.value.isCursorVisible);
    this._model.cursor = void 0;
    let se3 = false;
    for (a = t; a <= n2; a++) for (l2 = a + s15.buffer.ydisp, u2 = s15.buffer.lines.get(l2), this._model.lineLengths[a] = 0, M5 = ue3 === l2, h2 = 0, c2 = this._characterJoinerService.getJoinedCharacters(l2), y2 = 0; y2 < s15.cols; y2++) {
      if (r5 = this._cellColorResolver.result.bg, u2.loadCell(y2, o), y2 === 0 && (r5 = this._cellColorResolver.result.bg), d2 = false, f2 = y2 >= h2, I3 = y2, c2.length > 0 && y2 === c2[0][0] && f2) {
        L3 = c2.shift();
        let v4 = this._model.selection.isCellSelected(this._terminal, L3[0], l2);
        for (E2 = L3[0] + 1; E2 < L3[1]; E2++) f2 &&= v4 === this._model.selection.isCellSelected(this._terminal, E2, l2);
        f2 &&= !M5 || ce3 < L3[0] || ce3 >= L3[1], f2 ? (d2 = true, o = new Ci2(o, u2.translateToString(true, L3[0], L3[1]), L3[1] - L3[0]), I3 = L3[1] - 1) : h2 = L3[1];
      }
      if (q3 = o.getChars(), S3 = o.getCode(), E2 = (a * s15.cols + y2) * Ce2, this._cellColorResolver.resolve(o, y2, l2, this.dimensions.device.cell.width), A3 && l2 === ue3 && (y2 === ce3 && (this._model.cursor = { x: ce3, y: Se3, width: o.getWidth(), style: this._coreBrowserService.isFocused ? G4 : s15.options.cursorInactiveStyle, cursorWidth: s15.options.cursorWidth, dpr: this._devicePixelRatio }, we3 = ce3 + o.getWidth() - 1), y2 >= ce3 && y2 <= we3 && (this._coreBrowserService.isFocused && G4 === "block" || this._coreBrowserService.isFocused === false && s15.options.cursorInactiveStyle === "block") && (this._cellColorResolver.result.fg = 50331648 | this._themeService.colors.cursorAccent.rgba >> 8 & 16777215, this._cellColorResolver.result.bg = 50331648 | this._themeService.colors.cursor.rgba >> 8 & 16777215)), S3 !== 0 && (this._model.lineLengths[a] = y2 + 1), !(this._model.cells[E2] === S3 && this._model.cells[E2 + ze] === this._cellColorResolver.result.bg && this._model.cells[E2 + qe3] === this._cellColorResolver.result.fg && this._model.cells[E2 + Ct2] === this._cellColorResolver.result.ext) && (se3 = true, q3.length > 1 && (S3 |= Un2), this._model.cells[E2] = S3, this._model.cells[E2 + ze] = this._cellColorResolver.result.bg, this._model.cells[E2 + qe3] = this._cellColorResolver.result.fg, this._model.cells[E2 + Ct2] = this._cellColorResolver.result.ext, W = o.getWidth(), this._glyphRenderer.value.updateCell(y2, a, S3, this._cellColorResolver.result.bg, this._cellColorResolver.result.fg, this._cellColorResolver.result.ext, q3, W, r5), d2)) {
        for (o = this._workCell, y2++; y2 <= I3; y2++) w4 = (a * s15.cols + y2) * Ce2, this._glyphRenderer.value.updateCell(y2, a, 0, 0, 0, 0, pn2, 0, 0), this._model.cells[w4] = 0, this._model.cells[w4 + ze] = this._cellColorResolver.result.bg, this._model.cells[w4 + qe3] = this._cellColorResolver.result.fg, this._model.cells[w4 + Ct2] = this._cellColorResolver.result.ext;
        y2--;
      }
    }
    se3 && this._rectangleRenderer.value.updateBackgrounds(this._model), this._rectangleRenderer.value.updateCursor(this._model);
  }
  _updateDimensions() {
    !this._charSizeService.width || !this._charSizeService.height || (this.dimensions.device.char.width = Math.floor(this._charSizeService.width * this._devicePixelRatio), this.dimensions.device.char.height = Math.ceil(this._charSizeService.height * this._devicePixelRatio), this.dimensions.device.cell.height = Math.floor(this.dimensions.device.char.height * this._optionsService.rawOptions.lineHeight), this.dimensions.device.char.top = this._optionsService.rawOptions.lineHeight === 1 ? 0 : Math.round((this.dimensions.device.cell.height - this.dimensions.device.char.height) / 2), this.dimensions.device.cell.width = this.dimensions.device.char.width + Math.round(this._optionsService.rawOptions.letterSpacing), this.dimensions.device.char.left = Math.floor(this._optionsService.rawOptions.letterSpacing / 2), this.dimensions.device.canvas.height = this._terminal.rows * this.dimensions.device.cell.height, this.dimensions.device.canvas.width = this._terminal.cols * this.dimensions.device.cell.width, this.dimensions.css.canvas.height = Math.round(this.dimensions.device.canvas.height / this._devicePixelRatio), this.dimensions.css.canvas.width = Math.round(this.dimensions.device.canvas.width / this._devicePixelRatio), this.dimensions.css.cell.height = this.dimensions.device.cell.height / this._devicePixelRatio, this.dimensions.css.cell.width = this.dimensions.device.cell.width / this._devicePixelRatio);
  }
  _setCanvasDevicePixelDimensions(t, n2) {
    this._canvas.width === t && this._canvas.height === n2 || (this._canvas.width = t, this._canvas.height = n2, this._requestRedrawViewport());
  }
  _requestRedrawViewport() {
    this._onRequestRedraw.fire({ start: 0, end: this._terminal.rows - 1 });
  }
  _requestRedrawCursor() {
    let t = this._terminal.buffer.active.cursorY;
    this._onRequestRedraw.fire({ start: t, end: t });
  }
};
var Ci2 = class extends he3 {
  constructor(t, n2, s15) {
    super();
    this.content = 0;
    this.combinedData = "";
    this.fg = t.fg, this.bg = t.bg, this.combinedData = n2, this._width = s15;
  }
  isCombined() {
    return 2097152;
  }
  getWidth() {
    return this._width;
  }
  getChars() {
    return this.combinedData;
  }
  getCode() {
    return 2097151;
  }
  setFromCharData(t) {
    throw new Error("not implemented");
  }
  getAsCharData() {
    return [this.fg, this.getChars(), this.getWidth(), this.getCode()];
  }
};
function mr2(i8, e, t = 0) {
  return Math.max(Math.min(i8, e), t);
}
var _r2 = "di$target";
var br3 = "di$dependencies";
var zi2 = /* @__PURE__ */ new Map();
function pe3(i8) {
  if (zi2.has(i8)) return zi2.get(i8);
  let e = function(t, n2, s15) {
    if (arguments.length !== 3) throw new Error("@IServiceName-decorator can only be used to decorate a parameter");
    Us2(e, t, s15);
  };
  return e._id = i8, zi2.set(i8, e), e;
}
function Us2(i8, e, t) {
  e[_r2] === e ? e[br3].push({ id: i8, index: t }) : (e[br3] = [{ id: i8, index: t }], e[_r2] = e);
}
var Vu = pe3("BufferService");
var Cu = pe3("CoreMouseService");
var zu = pe3("CoreService");
var qu = pe3("CharsetService");
var ju = pe3("InstantiationService");
var Xu = pe3("LogService");
var vr2 = pe3("OptionsService");
var Yu = pe3("OscLinkService");
var Qu = pe3("UnicodeService");
var Zu = pe3("DecorationService");
var Hs2 = { trace: 0, debug: 1, info: 2, warn: 3, error: 4, off: 5 };
var Ws2 = "xterm.js: ";
var ci2 = class extends B3 {
  constructor(t) {
    super();
    this._optionsService = t;
    this._logLevel = 5;
    this._updateLogLevel(), this._register(this._optionsService.onSpecificOptionChange("logLevel", () => this._updateLogLevel())), Tr2 = this;
  }
  get logLevel() {
    return this._logLevel;
  }
  _updateLogLevel() {
    this._logLevel = Hs2[this._optionsService.rawOptions.logLevel];
  }
  _evalLazyOptionalParams(t) {
    for (let n2 = 0; n2 < t.length; n2++) typeof t[n2] == "function" && (t[n2] = t[n2]());
  }
  _log(t, n2, s15) {
    this._evalLazyOptionalParams(s15), t.call(console, (this._optionsService.options.logger ? "" : Ws2) + n2, ...s15);
  }
  trace(t, ...n2) {
    this._logLevel <= 0 && this._log(this._optionsService.options.logger?.trace.bind(this._optionsService.options.logger) ?? console.log, t, n2);
  }
  debug(t, ...n2) {
    this._logLevel <= 1 && this._log(this._optionsService.options.logger?.debug.bind(this._optionsService.options.logger) ?? console.log, t, n2);
  }
  info(t, ...n2) {
    this._logLevel <= 2 && this._log(this._optionsService.options.logger?.info.bind(this._optionsService.options.logger) ?? console.info, t, n2);
  }
  warn(t, ...n2) {
    this._logLevel <= 3 && this._log(this._optionsService.options.logger?.warn.bind(this._optionsService.options.logger) ?? console.warn, t, n2);
  }
  error(t, ...n2) {
    this._logLevel <= 4 && this._log(this._optionsService.options.logger?.error.bind(this._optionsService.options.logger) ?? console.error, t, n2);
  }
};
ci2 = Yi2([Qi(0, vr2)], ci2);
var Tr2;
function gr3(i8) {
  Tr2 = i8;
}
var xr2 = class extends B3 {
  constructor(t) {
    if (vi2 && hn2() < 16) {
      let n2 = { antialias: false, depth: false, preserveDrawingBuffer: true };
      if (!document.createElement("canvas").getContext("webgl2", n2)) throw new Error("Webgl2 is only supported on Safari 16 and above");
    }
    super();
    this._preserveDrawingBuffer = t;
    this._onChangeTextureAtlas = this._register(new D3());
    this.onChangeTextureAtlas = this._onChangeTextureAtlas.event;
    this._onAddTextureAtlasCanvas = this._register(new D3());
    this.onAddTextureAtlasCanvas = this._onAddTextureAtlasCanvas.event;
    this._onRemoveTextureAtlasCanvas = this._register(new D3());
    this.onRemoveTextureAtlasCanvas = this._onRemoveTextureAtlasCanvas.event;
    this._onContextLoss = this._register(new D3());
    this.onContextLoss = this._onContextLoss.event;
  }
  activate(t) {
    let n2 = t._core;
    if (!t.element) {
      this._register(n2.onWillOpen(() => this.activate(t)));
      return;
    }
    this._terminal = t;
    let s15 = n2.coreService, o = n2.optionsService, r5 = n2, a = r5._renderService, l2 = r5._characterJoinerService, u2 = r5._charSizeService, c2 = r5._coreBrowserService, d2 = r5._decorationService, h2 = r5._logService, f2 = r5._themeService;
    gr3(h2), this._renderer = this._register(new ui2(t, l2, u2, c2, s15, d2, o, f2, this._preserveDrawingBuffer)), this._register(ee4.forward(this._renderer.onContextLoss, this._onContextLoss)), this._register(ee4.forward(this._renderer.onChangeTextureAtlas, this._onChangeTextureAtlas)), this._register(ee4.forward(this._renderer.onAddTextureAtlasCanvas, this._onAddTextureAtlasCanvas)), this._register(ee4.forward(this._renderer.onRemoveTextureAtlasCanvas, this._onRemoveTextureAtlasCanvas)), a.setRenderer(this._renderer), this._register(O3(() => {
      if (this._terminal._core._store._isDisposed) return;
      let I3 = this._terminal._core._renderService;
      I3.setRenderer(this._terminal._core._createRenderer()), I3.handleResize(t.cols, t.rows);
    }));
  }
  get textureAtlas() {
    return this._renderer?.textureAtlas;
  }
  clearTextureAtlas() {
    this._renderer?.clearTextureAtlas();
  }
};

// src/terminal.ts
var FLOW_ACK_SIZE = 5e3;
var DARK_THEME = {
  foreground: "#cccccc",
  background: "#1e1e1e",
  cursor: "#ffffff",
  cursorAccent: "#1e1e1e",
  selectionBackground: "#264f78",
  selectionInactiveBackground: "#3a3d41",
  black: "#000000",
  red: "#cd3131",
  green: "#0dbc79",
  yellow: "#e5e510",
  blue: "#2472c8",
  magenta: "#bc3fbc",
  cyan: "#11a8cd",
  white: "#e5e5e5",
  brightBlack: "#666666",
  brightRed: "#f14c4c",
  brightGreen: "#23d18b",
  brightYellow: "#f5f543",
  brightBlue: "#3b8eea",
  brightMagenta: "#d670d6",
  brightCyan: "#29b8db",
  brightWhite: "#ffffff"
};
async function createTerminalInstance(opts) {
  const { pty, cwd, shell, paneId } = opts;
  if (document.fonts?.ready) {
    try {
      await document.fonts.ready;
    } catch {
    }
  }
  const term = new Dl({
    allowProposedApi: true,
    fontFamily: '"JetBrains Mono", "SF Mono", "Cascadia Code", Menlo, Consolas, "Courier New", monospace',
    fontSize: 13,
    lineHeight: 1,
    letterSpacing: 0,
    scrollback: 1e4,
    cursorBlink: true,
    cursorStyle: "block",
    drawBoldTextInBrightColors: true,
    minimumContrastRatio: 1,
    theme: DARK_THEME
  });
  term.loadAddon(new Ke());
  term.unicode.activeVersion = "11";
  term.loadAddon(
    new L2((_event, uri) => {
      window.open(uri, "_blank");
    })
  );
  term.loadAddon(new j2());
  const container = document.createElement("div");
  container.className = "sk-term-xterm";
  container.setAttribute("data-node", "terminal");
  container.style.cssText = "width:100%;height:100%;overflow:hidden;";
  term.open(container);
  let webgl;
  try {
    const addon = new xr2();
    addon.onContextLoss(() => {
      addon.dispose();
      if (webgl === addon) webgl = void 0;
    });
    term.loadAddon(addon);
    webgl = addon;
  } catch (e) {
    console.warn("[sk-terminal] WebGL \uB80C\uB354\uB7EC \uC0AC\uC6A9 \uBD88\uAC00 \u2014 DOM \uD3F4\uBC31:", e);
    webgl = void 0;
  }
  const fitTerminal = () => {
    if (container.clientWidth === 0 || container.clientHeight === 0) return;
    const core = term._core;
    const cell = core?._renderService?.dimensions?.css?.cell;
    if (!cell?.width || !cell?.height) return;
    const cols = Math.max(2, Math.floor(container.clientWidth / cell.width));
    const rows = Math.max(1, Math.floor(container.clientHeight / cell.height));
    if (cols !== term.cols || rows !== term.rows) {
      term.resize(cols, rows);
    }
  };
  fitTerminal();
  requestAnimationFrame(() => {
    try {
      fitTerminal();
    } catch {
    }
  });
  let disposed = false;
  let ptyId = 0;
  let ackPending = 0;
  const spawnPromise = pty.spawn({
    cols: term.cols,
    rows: term.rows,
    cwd: cwd ?? void 0,
    shell: shell ?? void 0,
    paneId: typeof paneId === "number" ? paneId : void 0
  });
  let dataSub = null;
  ptyId = await spawnPromise;
  if (disposed) {
    pty.close(ptyId).catch(() => {
    });
    term.dispose();
    webgl?.dispose();
    return {
      element: container,
      dispose: async () => {
      },
      focus: () => {
      },
      sendInput: () => {
      },
      readBuffer: () => "",
      clear: () => {
      }
    };
  }
  dataSub = pty.onData(ptyId, (bytes) => {
    term.write(bytes, () => {
      ackPending += bytes.length;
      if (ackPending >= FLOW_ACK_SIZE) {
        pty.ack(ptyId, ackPending).catch(() => {
        });
        ackPending = 0;
      }
    });
  });
  const inputDisp = term.onData((data) => {
    if (ptyId !== 0) {
      pty.write(ptyId, data).catch(() => {
      });
    }
  });
  const FIT_THROTTLE_MS = 50;
  let lastFitAt = 0;
  let fitTimer;
  const safeFit = () => {
    try {
      lastFitAt = performance.now();
      const before = `${term.cols}x${term.rows}`;
      fitTerminal();
      if (`${term.cols}x${term.rows}` !== before && ptyId !== 0) {
        term.refresh(0, term.rows - 1);
        pty.resize(ptyId, term.cols, term.rows).catch(() => {
        });
      }
    } catch {
    }
  };
  const scheduleFit = () => {
    const since = performance.now() - lastFitAt;
    if (since >= FIT_THROTTLE_MS) {
      if (fitTimer !== void 0) {
        clearTimeout(fitTimer);
        fitTimer = void 0;
      }
      safeFit();
    } else if (fitTimer === void 0) {
      fitTimer = setTimeout(() => {
        fitTimer = void 0;
        safeFit();
      }, FIT_THROTTLE_MS - since);
    }
  };
  const resizeObserver = new ResizeObserver(() => scheduleFit());
  resizeObserver.observe(container);
  const dispose = async () => {
    disposed = true;
    clearTimeout(fitTimer);
    resizeObserver.disconnect();
    inputDisp.dispose();
    dataSub?.dispose();
    if (ptyId !== 0) {
      await pty.close(ptyId).catch(() => {
      });
    }
    webgl?.dispose();
    term.dispose();
  };
  return {
    element: container,
    dispose,
    focus: () => term.focus(),
    sendInput: (data) => {
      if (ptyId !== 0) pty.write(ptyId, data).catch(() => {
      });
    },
    readBuffer: (lines) => {
      const buf = term.buffer.active;
      const line = (i8) => buf.getLine(i8)?.translateToString(true) ?? "";
      let end = buf.length - 1;
      while (end >= 0 && line(end) === "") end--;
      if (end < 0) return "";
      const want = lines && lines > 0 ? Math.min(lines, end + 1) : end + 1;
      const out = [];
      for (let i8 = end + 1 - want; i8 <= end; i8++) out.push(line(i8));
      return out.join("\n");
    },
    clear: () => term.clear()
  };
}

// src/commands.ts
var activeTerminals = /* @__PURE__ */ new Map();
function registerTerminal(viewId, inst) {
  activeTerminals.set(viewId, inst);
}
function unregisterTerminal(viewId) {
  activeTerminals.delete(viewId);
}
function firstTerminal() {
  const iter = activeTerminals.values().next();
  return iter.done ? null : iter.value;
}
function registerCommands(ctx) {
  const app = ctx.app;
  if (!app.commands) return;
  const sub = (d2) => ctx.subscriptions.push(d2);
  sub(
    app.commands.register("ping", {
      description: "Terminal plugin load/version check (E2E).",
      triggers: { ko: "\uD130\uBBF8\uB110 \uD551 \uC801\uC7AC\uD655\uC778 \uBC84\uC804" },
      returns: "{ ok, version }",
      handler: () => ({ ok: true, version: "0.1.0" })
    })
  );
  sub(
    app.commands.register("send", {
      description: "Send text to the active terminal PTY.",
      triggers: { ko: "\uD130\uBBF8\uB110 \uD14D\uC2A4\uD2B8 \uC804\uC1A1 \uC785\uB825" },
      params: {
        text: { type: "string", description: "Text to send to the terminal", required: true }
      },
      returns: "{ ok }",
      handler: (p2) => {
        const inst = firstTerminal();
        if (!inst) return { ok: false, error: "no active terminal" };
        inst.sendInput(String(p2.text ?? ""));
        return { ok: true };
      }
    })
  );
  sub(
    app.commands.register("clear", {
      description: "Clear the active terminal screen.",
      triggers: { ko: "\uD130\uBBF8\uB110 \uC9C0\uC6B0\uAE30 \uD074\uB9AC\uC5B4" },
      returns: "{ ok }",
      handler: () => {
        const inst = firstTerminal();
        if (!inst) return { ok: false, error: "no active terminal" };
        inst.clear();
        return { ok: true };
      }
    })
  );
}

// src/plugin-entry.ts
var plugin_entry_default = {
  activate(ctx) {
    const app = ctx.app;
    injectStyles();
    if (app.ui?.registerView) {
      ctx.subscriptions.push(
        app.ui.registerView("content", {
          mount(container, vctx) {
            container.style.position = "relative";
            container.style.overflow = "hidden";
            const wrap = document.createElement("div");
            wrap.className = "sk-term-wrap";
            wrap.style.cssText = "position:absolute;inset:0;";
            container.appendChild(wrap);
            const viewId = vctx.viewId ?? `term-${Date.now()}`;
            vctx.setTitle("Terminal");
            vctx.setStatus({ code: "connecting", message: "Starting\u2026" });
            if (!app.pty) {
              vctx.setStatus({ code: "error", message: "pty permission not granted" });
              return;
            }
            let disposed = false;
            let termInst = null;
            createTerminalInstance({
              pty: app.pty,
              cwd: vctx.root ?? void 0,
              paneId: typeof vctx.paneId === "string" ? parseInt(vctx.paneId, 10) || void 0 : vctx.paneId ?? void 0
            }).then((inst) => {
              if (disposed) {
                inst.dispose().catch(() => {
                });
                return;
              }
              termInst = inst;
              wrap.appendChild(inst.element);
              inst.focus();
              registerTerminal(viewId, inst);
              vctx.setStatus(null);
              vctx.setTitle("Terminal");
            }).catch((err) => {
              if (!disposed) {
                vctx.setStatus({ code: "error", message: String(err) });
              }
            });
            wrap.__skTermDispose = async () => {
              disposed = true;
              unregisterTerminal(viewId);
              if (termInst) {
                await termInst.dispose().catch(() => {
                });
                termInst = null;
              }
            };
            container.__skTermWrap = wrap;
          },
          unmount(container) {
            const wrap = container.__skTermWrap;
            if (wrap) {
              const fn3 = wrap.__skTermDispose;
              fn3?.().catch(() => {
              });
              container.replaceChildren();
              delete container.__skTermWrap;
            }
          }
        })
      );
    }
    registerCommands(ctx);
  },
  deactivate() {
    const s15 = document.getElementById("sk-terminal-style");
    if (s15) s15.remove();
  }
};
export {
  plugin_entry_default as default
};
