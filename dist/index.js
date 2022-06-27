// src/scraper.ts
var import_promises = require("fs/promises");
var { parse } = require("himalaya");
var scrape = async (filePath) => {
  const dom = (await (0, import_promises.readFile)(filePath)).toString();
  return parse(dom);
};

// src/occupations.ts
var nonNumbers = /[^0-9\.\-]/g;
function getCode(code) {
  return code.replace("/profile/", "");
}
function getGeo(str) {
  const code = str.replace("/profile/geo/", "");
}
function getNumber(str) {
  const last = str[str.length - 1];
  switch (last) {
    case "K":
    case "k":
      return parseFloat(str.substring(0, str.length - 1)) * 1e3;
    case "M":
    case "m":
      return parseFloat(str.substring(0, str.length - 1)) * 1e6;
    case "%":
      return parseFloat(str.replace("\u2212", "-").substring(0, str.length - 1)) / 100;
    default:
      return parseFloat(str.replace("\u2212", "-").replace(nonNumbers, ""));
  }
}
var getOccupationData = async (fileName) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya, _Za, __a, _$a, _ab, _bb, _cb, _db, _eb, _fb, _gb, _hb, _ib, _jb, _kb, _lb, _mb, _nb, _ob, _pb, _qb, _rb, _sb, _tb, _ub, _vb, _wb, _xb, _yb, _zb, _Ab, _Bb, _Cb, _Db, _Eb, _Fb, _Gb, _Hb, _Ib, _Jb, _Kb, _Lb, _Mb, _Nb, _Ob, _Pb, _Qb, _Rb, _Sb, _Tb, _Ub, _Vb, _Wb, _Xb, _Yb, _Zb, __b, _$b, _ac, _bc, _cc, _dc, _ec, _fc, _gc, _hc, _ic, _jc, _kc, _lc, _mc, _nc, _oc, _pc, _qc, _rc, _sc, _tc, _uc, _vc, _wc, _xc, _yc, _zc, _Ac, _Bc, _Cc, _Dc, _Ec, _Fc, _Gc, _Hc, _Ic, _Jc, _Kc, _Lc, _Mc, _Nc, _Oc, _Pc, _Qc, _Rc, _Sc, _Tc, _Uc, _Vc, _Wc, _Xc, _Yc, _Zc, __c, _$c, _ad, _bd, _cd, _dd, _ed, _fd, _gd, _hd, _id, _jd, _kd, _ld, _md, _nd, _od, _pd, _qd, _rd, _sd, _td, _ud, _vd, _wd, _xd, _yd, _zd, _Ad, _Bd, _Cd, _Dd, _Ed, _Fd, _Gd, _Hd, _Id, _Jd, _Kd, _Ld, _Md, _Nd, _Od, _Pd, _Qd, _Rd, _Sd, _Td, _Ud, _Vd, _Wd, _Xd, _Yd, _Zd, __d, _$d, _ae, _be, _ce, _de, _ee, _fe, _ge, _he, _ie, _je, _ke, _le, _me, _ne, _oe, _pe, _qe, _re, _se, _te, _ue, _ve, _we, _xe, _ye, _ze, _Ae, _Be, _Ce, _De, _Ee, _Fe, _Ge, _He, _Ie, _Je, _Ke, _Le, _Me, _Ne, _Oe, _Pe, _Qe, _Re, _Se, _Te, _Ue, _Ve, _We, _Xe, _Ye, _Ze, __e, _$e, _af, _bf, _cf, _df, _ef, _ff, _gf, _hf, _if, _jf, _kf, _lf, _mf, _nf, _of, _pf, _qf, _rf, _sf, _tf, _uf, _vf, _wf, _xf, _yf, _zf, _Af, _Bf, _Cf, _Df, _Ef, _Ff, _Gf, _Hf, _If, _Jf, _Kf, _Lf, _Mf, _Nf, _Of, _Pf, _Qf, _Rf, _Sf, _Tf, _Uf, _Vf, _Wf, _Xf, _Yf, _Zf, __f, _$f, _ag, _bg, _cg, _dg, _eg, _fg, _gg, _hg, _ig, _jg, _kg, _lg, _mg, _ng, _og, _pg, _qg, _rg, _sg, _tg, _ug, _vg, _wg, _xg, _yg, _zg, _Ag, _Bg, _Cg, _Dg, _Eg, _Fg, _Gg, _Hg, _Ig, _Jg, _Kg, _Lg, _Mg, _Ng, _Og, _Pg, _Qg, _Rg, _Sg, _Tg, _Ug, _Vg, _Wg, _Xg, _Yg, _Zg, __g, _$g, _ah, _bh, _ch, _dh, _eh, _fh, _gh, _hh, _ih, _jh, _kh, _lh, _mh, _nh, _oh, _ph, _qh, _rh, _sh, _th, _uh, _vh, _wh, _xh, _yh, _zh, _Ah, _Bh, _Ch, _Dh, _Eh, _Fh, _Gh, _Hh, _Ih, _Jh, _Kh, _Lh, _Mh, _Nh, _Oh, _Ph, _Qh, _Rh, _Sh, _Th, _Uh, _Vh, _Wh, _Xh, _Yh, _Zh, __h, _$h, _ai, _bi, _ci, _di, _ei, _fi, _gi, _hi, _ii, _ji, _ki, _li, _mi, _ni, _oi, _pi, _qi, _ri, _si, _ti, _ui, _vi, _wi, _xi, _yi, _zi, _Ai, _Bi, _Ci, _Di, _Ei, _Fi, _Gi, _Hi, _Ii, _Ji, _Ki, _Li, _Mi, _Ni, _Oi, _Pi, _Qi, _Ri, _Si, _Ti, _Ui, _Vi, _Wi, _Xi, _Yi, _Zi, __i, _$i, _aj, _bj, _cj, _dj, _ej, _fj, _gj, _hj, _ij, _jj, _kj, _lj, _mj, _nj, _oj, _pj, _qj, _rj, _sj;
  const json = await scrape(fileName);
  const contents = json[2].children[3].children[1].children[0].children[0].children[0].children[1].children;
  const result = {
    workforce: {
      size: getNumber((_e = (_d = (_c = (_b = (_a = contents[0]) == null ? void 0 : _a.children[4]) == null ? void 0 : _b.children[0]) == null ? void 0 : _c.children[0]) == null ? void 0 : _d.children[1]) == null ? void 0 : _e.children[0].content.trim()),
      oneYearGrowth: {
        value: getNumber((_m = (_l = (_k = (_j = (_i = (_h = (_g = (_f = contents[2]) == null ? void 0 : _f.children[2]) == null ? void 0 : _g.children[8]) == null ? void 0 : _h.children[0]) == null ? void 0 : _i.children[1]) == null ? void 0 : _j.children[1]) == null ? void 0 : _k.children[0]) == null ? void 0 : _l.children[0]) == null ? void 0 : _m.content.trim()),
        errorRate: getNumber((_u = (_t = (_s = (_r = (_q = (_p = (_o = (_n = contents[2]) == null ? void 0 : _n.children[2]) == null ? void 0 : _o.children[8]) == null ? void 0 : _p.children[0]) == null ? void 0 : _q.children[1]) == null ? void 0 : _r.children[1]) == null ? void 0 : _s.children[2]) == null ? void 0 : _t.children[1]) == null ? void 0 : _u.content.trim())
      },
      mostlyEmployedBy: [
        {
          name: (_C = (_B = (_A = (_z = (_y = (_x = (_w = (_v = contents[1]) == null ? void 0 : _v.children[1]) == null ? void 0 : _w.children[0]) == null ? void 0 : _x.children[0]) == null ? void 0 : _y.children[0]) == null ? void 0 : _z.children[0]) == null ? void 0 : _A.children[1]) == null ? void 0 : _B.children[0]) == null ? void 0 : _C.content.trim(),
          code: getCode((_K = (_J = (_I = (_H = (_G = (_F = (_E = (_D = contents[1]) == null ? void 0 : _D.children[1]) == null ? void 0 : _E.children[0]) == null ? void 0 : _F.children[0]) == null ? void 0 : _G.children[0]) == null ? void 0 : _H.children[0]) == null ? void 0 : _I.children[1]) == null ? void 0 : _J.attributes[0]) == null ? void 0 : _K.value.trim())
        },
        {
          name: (_S = (_R = (_Q = (_P = (_O = (_N = (_M = (_L = contents[1]) == null ? void 0 : _L.children[1]) == null ? void 0 : _M.children[0]) == null ? void 0 : _N.children[0]) == null ? void 0 : _O.children[0]) == null ? void 0 : _P.children[0]) == null ? void 0 : _Q.children[3]) == null ? void 0 : _R.children[0]) == null ? void 0 : _S.content.trim(),
          code: getCode((__ = (_Z = (_Y = (_X = (_W = (_V = (_U = (_T = contents[1]) == null ? void 0 : _T.children[1]) == null ? void 0 : _U.children[0]) == null ? void 0 : _V.children[0]) == null ? void 0 : _W.children[0]) == null ? void 0 : _X.children[0]) == null ? void 0 : _Y.children[3]) == null ? void 0 : _Z.attributes[0]) == null ? void 0 : __.value.trim())
        },
        {
          name: (_ga = (_fa = (_ea = (_da = (_ca = (_ba = (_aa = (_$ = contents[1]) == null ? void 0 : _$.children[1]) == null ? void 0 : _aa.children[0]) == null ? void 0 : _ba.children[0]) == null ? void 0 : _ca.children[0]) == null ? void 0 : _da.children[0]) == null ? void 0 : _ea.children[5]) == null ? void 0 : _fa.children[0]) == null ? void 0 : _ga.content.trim(),
          code: getCode((_oa = (_na = (_ma = (_la = (_ka = (_ja = (_ia = (_ha = contents[1]) == null ? void 0 : _ha.children[1]) == null ? void 0 : _ia.children[0]) == null ? void 0 : _ja.children[0]) == null ? void 0 : _ka.children[0]) == null ? void 0 : _la.children[0]) == null ? void 0 : _ma.children[5]) == null ? void 0 : _na.attributes[0]) == null ? void 0 : _oa.value.trim())
        }
      ],
      highestPayingIndustries: [
        {
          name: (_wa = (_va = (_ua = (_ta = (_sa = (_ra = (_qa = (_pa = contents[2]) == null ? void 0 : _pa.children[2]) == null ? void 0 : _qa.children[7]) == null ? void 0 : _ra.children[0]) == null ? void 0 : _sa.children[1]) == null ? void 0 : _ta.children[0]) == null ? void 0 : _ua.children[1]) == null ? void 0 : _va.children[0]) == null ? void 0 : _wa.content.trim(),
          code: getCode((_Ea = (_Da = (_Ca = (_Ba = (_Aa = (_za = (_ya = (_xa = contents[2]) == null ? void 0 : _xa.children[2]) == null ? void 0 : _ya.children[7]) == null ? void 0 : _za.children[0]) == null ? void 0 : _Aa.children[1]) == null ? void 0 : _Ba.children[0]) == null ? void 0 : _Ca.children[1]) == null ? void 0 : _Da.attributes[0]) == null ? void 0 : _Ea.value.trim())
        },
        {
          name: (_Ma = (_La = (_Ka = (_Ja = (_Ia = (_Ha = (_Ga = (_Fa = contents[2]) == null ? void 0 : _Fa.children[2]) == null ? void 0 : _Ga.children[7]) == null ? void 0 : _Ha.children[0]) == null ? void 0 : _Ia.children[1]) == null ? void 0 : _Ja.children[0]) == null ? void 0 : _Ka.children[3]) == null ? void 0 : _La.children[0]) == null ? void 0 : _Ma.content.trim(),
          code: getCode((_Ua = (_Ta = (_Sa = (_Ra = (_Qa = (_Pa = (_Oa = (_Na = contents[2]) == null ? void 0 : _Na.children[2]) == null ? void 0 : _Oa.children[7]) == null ? void 0 : _Pa.children[0]) == null ? void 0 : _Qa.children[1]) == null ? void 0 : _Ra.children[0]) == null ? void 0 : _Sa.children[3]) == null ? void 0 : _Ta.attributes[0]) == null ? void 0 : _Ua.value.trim())
        },
        {
          name: (_ab = (_$a = (__a = (_Za = (_Ya = (_Xa = (_Wa = (_Va = contents[2]) == null ? void 0 : _Va.children[2]) == null ? void 0 : _Wa.children[7]) == null ? void 0 : _Xa.children[0]) == null ? void 0 : _Ya.children[1]) == null ? void 0 : _Za.children[0]) == null ? void 0 : __a.children[5]) == null ? void 0 : _$a.children[0]) == null ? void 0 : _ab.content.trim(),
          code: getCode((_ib = (_hb = (_gb = (_fb = (_eb = (_db = (_cb = (_bb = contents[2]) == null ? void 0 : _bb.children[2]) == null ? void 0 : _cb.children[7]) == null ? void 0 : _db.children[0]) == null ? void 0 : _eb.children[1]) == null ? void 0 : _fb.children[0]) == null ? void 0 : _gb.children[5]) == null ? void 0 : _hb.attributes[0]) == null ? void 0 : _ib.value.trim())
        }
      ],
      averageSalary: getNumber((_nb = (_mb = (_lb = (_kb = (_jb = contents[0]) == null ? void 0 : _jb.children[4]) == null ? void 0 : _kb.children[0]) == null ? void 0 : _lb.children[2]) == null ? void 0 : _mb.children[1]) == null ? void 0 : _nb.children[0].content.trim()),
      averageAge: getNumber((_sb = (_rb = (_qb = (_pb = (_ob = contents[0]) == null ? void 0 : _ob.children[4]) == null ? void 0 : _pb.children[0]) == null ? void 0 : _qb.children[1]) == null ? void 0 : _rb.children[1]) == null ? void 0 : _sb.children[0].content.trim())
    },
    gender: {
      count: {
        male: getNumber((_Ab = (_zb = (_yb = (_xb = (_wb = (_vb = (_ub = (_tb = contents[3]) == null ? void 0 : _tb.children[2]) == null ? void 0 : _ub.children[0]) == null ? void 0 : _vb.children[0]) == null ? void 0 : _wb.children[1]) == null ? void 0 : _xb.children[0]) == null ? void 0 : _yb.children[0]) == null ? void 0 : _zb.children[0]) == null ? void 0 : _Ab.content.trim()),
        female: getNumber((_Ib = (_Hb = (_Gb = (_Fb = (_Eb = (_Db = (_Cb = (_Bb = contents[3]) == null ? void 0 : _Bb.children[2]) == null ? void 0 : _Cb.children[0]) == null ? void 0 : _Db.children[0]) == null ? void 0 : _Eb.children[1]) == null ? void 0 : _Fb.children[1]) == null ? void 0 : _Gb.children[0]) == null ? void 0 : _Hb.children[0]) == null ? void 0 : _Ib.content.trim())
      },
      averageSalary: {
        male: getNumber((_Nb = (_Mb = (_Lb = (_Kb = (_Jb = contents[0]) == null ? void 0 : _Jb.children[4]) == null ? void 0 : _Kb.children[0]) == null ? void 0 : _Lb.children[3]) == null ? void 0 : _Mb.children[1]) == null ? void 0 : _Nb.children[0].content.trim()),
        female: getNumber((_Sb = (_Rb = (_Qb = (_Pb = (_Ob = contents[0]) == null ? void 0 : _Ob.children[4]) == null ? void 0 : _Pb.children[0]) == null ? void 0 : _Qb.children[4]) == null ? void 0 : _Rb.children[1]) == null ? void 0 : _Sb.children[0].content.trim())
      },
      averageAge: {
        male: getNumber((__b = (_Zb = (_Yb = (_Xb = (_Wb = (_Vb = (_Ub = (_Tb = contents[3]) == null ? void 0 : _Tb.children[2]) == null ? void 0 : _Ub.children[2]) == null ? void 0 : _Vb.children[0]) == null ? void 0 : _Wb.children[1]) == null ? void 0 : _Xb.children[0]) == null ? void 0 : _Yb.children[0]) == null ? void 0 : _Zb.children[0]) == null ? void 0 : __b.content.trim()),
        female: getNumber((_gc = (_fc = (_ec = (_dc = (_cc = (_bc = (_ac = (_$b = contents[3]) == null ? void 0 : _$b.children[2]) == null ? void 0 : _ac.children[2]) == null ? void 0 : _bc.children[0]) == null ? void 0 : _cc.children[1]) == null ? void 0 : _dc.children[1]) == null ? void 0 : _ec.children[0]) == null ? void 0 : _fc.children[0]) == null ? void 0 : _gc.content.trim())
      }
    },
    locations: {
      highestEmployment: [
        {
          name: (_oc = (_nc = (_mc = (_lc = (_kc = (_jc = (_ic = (_hc = contents[1]) == null ? void 0 : _hc.children[1]) == null ? void 0 : _ic.children[0]) == null ? void 0 : _jc.children[0]) == null ? void 0 : _kc.children[2]) == null ? void 0 : _lc.children[0]) == null ? void 0 : _mc.children[1]) == null ? void 0 : _nc.children[0]) == null ? void 0 : _oc.content.trim(),
          geo: getGeo((_wc = (_vc = (_uc = (_tc = (_sc = (_rc = (_qc = (_pc = contents[1]) == null ? void 0 : _pc.children[1]) == null ? void 0 : _qc.children[0]) == null ? void 0 : _rc.children[0]) == null ? void 0 : _sc.children[2]) == null ? void 0 : _tc.children[0]) == null ? void 0 : _uc.children[1]) == null ? void 0 : _vc.attributes[0]) == null ? void 0 : _wc.value.trim())
        },
        {
          name: (_Ec = (_Dc = (_Cc = (_Bc = (_Ac = (_zc = (_yc = (_xc = contents[1]) == null ? void 0 : _xc.children[1]) == null ? void 0 : _yc.children[0]) == null ? void 0 : _zc.children[0]) == null ? void 0 : _Ac.children[2]) == null ? void 0 : _Bc.children[0]) == null ? void 0 : _Cc.children[3]) == null ? void 0 : _Dc.children[0]) == null ? void 0 : _Ec.content.trim(),
          geo: getGeo((_Mc = (_Lc = (_Kc = (_Jc = (_Ic = (_Hc = (_Gc = (_Fc = contents[1]) == null ? void 0 : _Fc.children[1]) == null ? void 0 : _Gc.children[0]) == null ? void 0 : _Hc.children[0]) == null ? void 0 : _Ic.children[2]) == null ? void 0 : _Jc.children[0]) == null ? void 0 : _Kc.children[3]) == null ? void 0 : _Lc.attributes[0]) == null ? void 0 : _Mc.value.trim())
        },
        {
          name: (_Uc = (_Tc = (_Sc = (_Rc = (_Qc = (_Pc = (_Oc = (_Nc = contents[1]) == null ? void 0 : _Nc.children[1]) == null ? void 0 : _Oc.children[0]) == null ? void 0 : _Pc.children[0]) == null ? void 0 : _Qc.children[2]) == null ? void 0 : _Rc.children[0]) == null ? void 0 : _Sc.children[5]) == null ? void 0 : _Tc.children[0]) == null ? void 0 : _Uc.content.trim(),
          geo: getGeo((_ad = (_$c = (__c = (_Zc = (_Yc = (_Xc = (_Wc = (_Vc = contents[1]) == null ? void 0 : _Vc.children[1]) == null ? void 0 : _Wc.children[0]) == null ? void 0 : _Xc.children[0]) == null ? void 0 : _Yc.children[2]) == null ? void 0 : _Zc.children[0]) == null ? void 0 : __c.children[5]) == null ? void 0 : _$c.attributes[0]) == null ? void 0 : _ad.value.trim())
        }
      ],
      highestConcentrations: [
        {
          name: (_id = (_hd = (_gd = (_fd = (_ed = (_dd = (_cd = (_bd = contents[1]) == null ? void 0 : _bd.children[1]) == null ? void 0 : _cd.children[0]) == null ? void 0 : _dd.children[0]) == null ? void 0 : _ed.children[2]) == null ? void 0 : _fd.children[0]) == null ? void 0 : _gd.children[7]) == null ? void 0 : _hd.children[0]) == null ? void 0 : _id.content.trim(),
          geo: getGeo((_qd = (_pd = (_od = (_nd = (_md = (_ld = (_kd = (_jd = contents[1]) == null ? void 0 : _jd.children[1]) == null ? void 0 : _kd.children[0]) == null ? void 0 : _ld.children[0]) == null ? void 0 : _md.children[2]) == null ? void 0 : _nd.children[0]) == null ? void 0 : _od.children[7]) == null ? void 0 : _pd.attributes[0]) == null ? void 0 : _qd.value.trim())
        },
        {
          name: (_yd = (_xd = (_wd = (_vd = (_ud = (_td = (_sd = (_rd = contents[1]) == null ? void 0 : _rd.children[1]) == null ? void 0 : _sd.children[0]) == null ? void 0 : _td.children[0]) == null ? void 0 : _ud.children[2]) == null ? void 0 : _vd.children[0]) == null ? void 0 : _wd.children[9]) == null ? void 0 : _xd.children[0]) == null ? void 0 : _yd.content.trim(),
          geo: getGeo((_Gd = (_Fd = (_Ed = (_Dd = (_Cd = (_Bd = (_Ad = (_zd = contents[1]) == null ? void 0 : _zd.children[1]) == null ? void 0 : _Ad.children[0]) == null ? void 0 : _Bd.children[0]) == null ? void 0 : _Cd.children[2]) == null ? void 0 : _Dd.children[0]) == null ? void 0 : _Ed.children[9]) == null ? void 0 : _Fd.attributes[0]) == null ? void 0 : _Gd.value.trim())
        },
        {
          name: (_Od = (_Nd = (_Md = (_Ld = (_Kd = (_Jd = (_Id = (_Hd = contents[1]) == null ? void 0 : _Hd.children[1]) == null ? void 0 : _Id.children[0]) == null ? void 0 : _Jd.children[0]) == null ? void 0 : _Kd.children[2]) == null ? void 0 : _Ld.children[0]) == null ? void 0 : _Md.children[11]) == null ? void 0 : _Nd.children[0]) == null ? void 0 : _Od.content.trim(),
          geo: getGeo((_Wd = (_Vd = (_Ud = (_Td = (_Sd = (_Rd = (_Qd = (_Pd = contents[1]) == null ? void 0 : _Pd.children[1]) == null ? void 0 : _Qd.children[0]) == null ? void 0 : _Rd.children[0]) == null ? void 0 : _Sd.children[2]) == null ? void 0 : _Td.children[0]) == null ? void 0 : _Ud.children[11]) == null ? void 0 : _Vd.attributes[0]) == null ? void 0 : _Wd.value.trim())
        }
      ],
      highestPaying: [
        {
          name: (_fe = (_ee = (_de = (_ce = (_be = (_ae = (_$d = (__d = (_Zd = (_Yd = (_Xd = contents[2]) == null ? void 0 : _Xd.children[2]) == null ? void 0 : _Yd.children[3]) == null ? void 0 : _Zd.children[0]) == null ? void 0 : __d.children[1]) == null ? void 0 : _$d.children[0]) == null ? void 0 : _ae.children[1]) == null ? void 0 : _be.children[0]) == null ? void 0 : _ce.children[0]) == null ? void 0 : _de.children[0]) == null ? void 0 : _ee.children[0]) == null ? void 0 : _fe.content.trim(),
          geo: getGeo((_qe = (_pe = (_oe = (_ne = (_me = (_le = (_ke = (_je = (_ie = (_he = (_ge = contents[2]) == null ? void 0 : _ge.children[2]) == null ? void 0 : _he.children[3]) == null ? void 0 : _ie.children[0]) == null ? void 0 : _je.children[1]) == null ? void 0 : _ke.children[0]) == null ? void 0 : _le.children[1]) == null ? void 0 : _me.children[0]) == null ? void 0 : _ne.children[0]) == null ? void 0 : _oe.children[0]) == null ? void 0 : _pe.attributes[0]) == null ? void 0 : _qe.value.trim())
        },
        {
          name: (_Be = (_Ae = (_ze = (_ye = (_xe = (_we = (_ve = (_ue = (_te = (_se = (_re = contents[2]) == null ? void 0 : _re.children[2]) == null ? void 0 : _se.children[3]) == null ? void 0 : _te.children[0]) == null ? void 0 : _ue.children[1]) == null ? void 0 : _ve.children[0]) == null ? void 0 : _we.children[1]) == null ? void 0 : _xe.children[1]) == null ? void 0 : _ye.children[0]) == null ? void 0 : _ze.children[0]) == null ? void 0 : _Ae.children[0]) == null ? void 0 : _Be.content.trim(),
          geo: getGeo((_Me = (_Le = (_Ke = (_Je = (_Ie = (_He = (_Ge = (_Fe = (_Ee = (_De = (_Ce = contents[2]) == null ? void 0 : _Ce.children[2]) == null ? void 0 : _De.children[3]) == null ? void 0 : _Ee.children[0]) == null ? void 0 : _Fe.children[1]) == null ? void 0 : _Ge.children[0]) == null ? void 0 : _He.children[1]) == null ? void 0 : _Ie.children[1]) == null ? void 0 : _Je.children[0]) == null ? void 0 : _Ke.children[0]) == null ? void 0 : _Le.attributes[0]) == null ? void 0 : _Me.value.trim())
        },
        {
          name: (_Xe = (_We = (_Ve = (_Ue = (_Te = (_Se = (_Re = (_Qe = (_Pe = (_Oe = (_Ne = contents[2]) == null ? void 0 : _Ne.children[2]) == null ? void 0 : _Oe.children[3]) == null ? void 0 : _Pe.children[0]) == null ? void 0 : _Qe.children[1]) == null ? void 0 : _Re.children[0]) == null ? void 0 : _Se.children[1]) == null ? void 0 : _Te.children[2]) == null ? void 0 : _Ue.children[0]) == null ? void 0 : _Ve.children[0]) == null ? void 0 : _We.children[0]) == null ? void 0 : _Xe.content.trim(),
          geo: getGeo((_gf = (_ff = (_ef = (_df = (_cf = (_bf = (_af = (_$e = (__e = (_Ze = (_Ye = contents[2]) == null ? void 0 : _Ye.children[2]) == null ? void 0 : _Ze.children[3]) == null ? void 0 : __e.children[0]) == null ? void 0 : _$e.children[1]) == null ? void 0 : _af.children[0]) == null ? void 0 : _bf.children[1]) == null ? void 0 : _cf.children[2]) == null ? void 0 : _df.children[0]) == null ? void 0 : _ef.children[0]) == null ? void 0 : _ff.attributes[0]) == null ? void 0 : _gf.value.trim())
        }
      ],
      relativelyHighConcentration: [
        {
          name: (_rf = (_qf = (_pf = (_of = (_nf = (_mf = (_lf = (_kf = (_jf = (_if = (_hf = contents[2]) == null ? void 0 : _hf.children[2]) == null ? void 0 : _if.children[4]) == null ? void 0 : _jf.children[0]) == null ? void 0 : _kf.children[1]) == null ? void 0 : _lf.children[0]) == null ? void 0 : _mf.children[1]) == null ? void 0 : _nf.children[0]) == null ? void 0 : _of.children[0]) == null ? void 0 : _pf.children[0]) == null ? void 0 : _qf.children[0]) == null ? void 0 : _rf.content.trim(),
          geo: getGeo((_Cf = (_Bf = (_Af = (_zf = (_yf = (_xf = (_wf = (_vf = (_uf = (_tf = (_sf = contents[2]) == null ? void 0 : _sf.children[2]) == null ? void 0 : _tf.children[4]) == null ? void 0 : _uf.children[0]) == null ? void 0 : _vf.children[1]) == null ? void 0 : _wf.children[0]) == null ? void 0 : _xf.children[1]) == null ? void 0 : _yf.children[0]) == null ? void 0 : _zf.children[0]) == null ? void 0 : _Af.children[0]) == null ? void 0 : _Bf.attributes[0]) == null ? void 0 : _Cf.value.trim())
        },
        {
          name: (_Nf = (_Mf = (_Lf = (_Kf = (_Jf = (_If = (_Hf = (_Gf = (_Ff = (_Ef = (_Df = contents[2]) == null ? void 0 : _Df.children[2]) == null ? void 0 : _Ef.children[4]) == null ? void 0 : _Ff.children[0]) == null ? void 0 : _Gf.children[1]) == null ? void 0 : _Hf.children[0]) == null ? void 0 : _If.children[1]) == null ? void 0 : _Jf.children[1]) == null ? void 0 : _Kf.children[0]) == null ? void 0 : _Lf.children[0]) == null ? void 0 : _Mf.children[0]) == null ? void 0 : _Nf.content.trim(),
          geo: getGeo((_Yf = (_Xf = (_Wf = (_Vf = (_Uf = (_Tf = (_Sf = (_Rf = (_Qf = (_Pf = (_Of = contents[2]) == null ? void 0 : _Of.children[2]) == null ? void 0 : _Pf.children[4]) == null ? void 0 : _Qf.children[0]) == null ? void 0 : _Rf.children[1]) == null ? void 0 : _Sf.children[0]) == null ? void 0 : _Tf.children[1]) == null ? void 0 : _Uf.children[1]) == null ? void 0 : _Vf.children[0]) == null ? void 0 : _Wf.children[0]) == null ? void 0 : _Xf.attributes[0]) == null ? void 0 : _Yf.value.trim())
        },
        {
          name: (_hg = (_gg = (_fg = (_eg = (_dg = (_cg = (_bg = (_ag = (_$f = (__f = (_Zf = contents[2]) == null ? void 0 : _Zf.children[2]) == null ? void 0 : __f.children[4]) == null ? void 0 : _$f.children[0]) == null ? void 0 : _ag.children[1]) == null ? void 0 : _bg.children[0]) == null ? void 0 : _cg.children[1]) == null ? void 0 : _dg.children[2]) == null ? void 0 : _eg.children[0]) == null ? void 0 : _fg.children[0]) == null ? void 0 : _gg.children[0]) == null ? void 0 : _hg.content.trim(),
          geo: getGeo((_sg = (_rg = (_qg = (_pg = (_og = (_ng = (_mg = (_lg = (_kg = (_jg = (_ig = contents[2]) == null ? void 0 : _ig.children[2]) == null ? void 0 : _jg.children[4]) == null ? void 0 : _kg.children[0]) == null ? void 0 : _lg.children[1]) == null ? void 0 : _mg.children[0]) == null ? void 0 : _ng.children[1]) == null ? void 0 : _og.children[2]) == null ? void 0 : _pg.children[0]) == null ? void 0 : _qg.children[0]) == null ? void 0 : _rg.attributes[0]) == null ? void 0 : _sg.value.trim())
        }
      ]
    },
    ethnicity: {
      mostCommon: [
        (_Cg = (_Bg = (_Ag = (_zg = (_yg = (_xg = (_wg = (_vg = (_ug = (_tg = contents[3]) == null ? void 0 : _tg.children[2]) == null ? void 0 : _ug.children[1]) == null ? void 0 : _vg.children[0]) == null ? void 0 : _wg.children[1]) == null ? void 0 : _xg.children[0]) == null ? void 0 : _yg.children[1]) == null ? void 0 : _zg.children[0]) == null ? void 0 : _Ag.children[0]) == null ? void 0 : _Bg.children[0]) == null ? void 0 : _Cg.content.trim(),
        (_Mg = (_Lg = (_Kg = (_Jg = (_Ig = (_Hg = (_Gg = (_Fg = (_Eg = (_Dg = contents[3]) == null ? void 0 : _Dg.children[2]) == null ? void 0 : _Eg.children[1]) == null ? void 0 : _Fg.children[0]) == null ? void 0 : _Gg.children[1]) == null ? void 0 : _Hg.children[0]) == null ? void 0 : _Ig.children[1]) == null ? void 0 : _Jg.children[1]) == null ? void 0 : _Kg.children[0]) == null ? void 0 : _Lg.children[0]) == null ? void 0 : _Mg.content.trim(),
        (_Wg = (_Vg = (_Ug = (_Tg = (_Sg = (_Rg = (_Qg = (_Pg = (_Og = (_Ng = contents[3]) == null ? void 0 : _Ng.children[2]) == null ? void 0 : _Og.children[1]) == null ? void 0 : _Pg.children[0]) == null ? void 0 : _Qg.children[1]) == null ? void 0 : _Rg.children[0]) == null ? void 0 : _Sg.children[1]) == null ? void 0 : _Tg.children[2]) == null ? void 0 : _Ug.children[0]) == null ? void 0 : _Vg.children[0]) == null ? void 0 : _Wg.content.trim()
      ]
    },
    skills: {
      mostCommonMajors: [
        {
          name: (_fh = (_eh = (_dh = (_ch = (_bh = (_ah = (_$g = (__g = (_Zg = (_Yg = (_Xg = contents[4]) == null ? void 0 : _Xg.children[2]) == null ? void 0 : _Yg.children[0]) == null ? void 0 : _Zg.children[0]) == null ? void 0 : __g.children[3]) == null ? void 0 : _$g.children[0]) == null ? void 0 : _ah.children[1]) == null ? void 0 : _bh.children[0]) == null ? void 0 : _ch.children[0]) == null ? void 0 : _dh.children[0]) == null ? void 0 : _eh.children[0]) == null ? void 0 : _fh.content.trim(),
          code: getCode((_qh = (_ph = (_oh = (_nh = (_mh = (_lh = (_kh = (_jh = (_ih = (_hh = (_gh = contents[4]) == null ? void 0 : _gh.children[2]) == null ? void 0 : _hh.children[0]) == null ? void 0 : _ih.children[0]) == null ? void 0 : _jh.children[3]) == null ? void 0 : _kh.children[0]) == null ? void 0 : _lh.children[1]) == null ? void 0 : _mh.children[0]) == null ? void 0 : _nh.children[0]) == null ? void 0 : _oh.children[0]) == null ? void 0 : _ph.attributes[0]) == null ? void 0 : _qh.value.trim())
        },
        {
          name: (_Bh = (_Ah = (_zh = (_yh = (_xh = (_wh = (_vh = (_uh = (_th = (_sh = (_rh = contents[4]) == null ? void 0 : _rh.children[2]) == null ? void 0 : _sh.children[0]) == null ? void 0 : _th.children[0]) == null ? void 0 : _uh.children[3]) == null ? void 0 : _vh.children[0]) == null ? void 0 : _wh.children[1]) == null ? void 0 : _xh.children[1]) == null ? void 0 : _yh.children[0]) == null ? void 0 : _zh.children[0]) == null ? void 0 : _Ah.children[0]) == null ? void 0 : _Bh.content.trim(),
          code: getCode((_Mh = (_Lh = (_Kh = (_Jh = (_Ih = (_Hh = (_Gh = (_Fh = (_Eh = (_Dh = (_Ch = contents[4]) == null ? void 0 : _Ch.children[2]) == null ? void 0 : _Dh.children[0]) == null ? void 0 : _Eh.children[0]) == null ? void 0 : _Fh.children[3]) == null ? void 0 : _Gh.children[0]) == null ? void 0 : _Hh.children[1]) == null ? void 0 : _Ih.children[1]) == null ? void 0 : _Jh.children[0]) == null ? void 0 : _Kh.children[0]) == null ? void 0 : _Lh.attributes[0]) == null ? void 0 : _Mh.value.trim())
        },
        {
          name: (_Xh = (_Wh = (_Vh = (_Uh = (_Th = (_Sh = (_Rh = (_Qh = (_Ph = (_Oh = (_Nh = contents[4]) == null ? void 0 : _Nh.children[2]) == null ? void 0 : _Oh.children[0]) == null ? void 0 : _Ph.children[0]) == null ? void 0 : _Qh.children[3]) == null ? void 0 : _Rh.children[0]) == null ? void 0 : _Sh.children[1]) == null ? void 0 : _Th.children[2]) == null ? void 0 : _Uh.children[0]) == null ? void 0 : _Vh.children[0]) == null ? void 0 : _Wh.children[0]) == null ? void 0 : _Xh.content.trim(),
          code: getCode((_gi = (_fi = (_ei = (_di = (_ci = (_bi = (_ai = (_$h = (__h = (_Zh = (_Yh = contents[4]) == null ? void 0 : _Yh.children[2]) == null ? void 0 : _Zh.children[0]) == null ? void 0 : __h.children[0]) == null ? void 0 : _$h.children[3]) == null ? void 0 : _ai.children[0]) == null ? void 0 : _bi.children[1]) == null ? void 0 : _ci.children[2]) == null ? void 0 : _di.children[0]) == null ? void 0 : _ei.children[0]) == null ? void 0 : _fi.attributes[0]) == null ? void 0 : _gi.value.trim())
        }
      ],
      mostSpecializedMajors: [
        {
          name: (_ri = (_qi = (_pi = (_oi = (_ni = (_mi = (_li = (_ki = (_ji = (_ii = (_hi = contents[4]) == null ? void 0 : _hi.children[2]) == null ? void 0 : _ii.children[0]) == null ? void 0 : _ji.children[0]) == null ? void 0 : _ki.children[3]) == null ? void 0 : _li.children[1]) == null ? void 0 : _mi.children[1]) == null ? void 0 : _ni.children[0]) == null ? void 0 : _oi.children[0]) == null ? void 0 : _pi.children[0]) == null ? void 0 : _qi.children[0]) == null ? void 0 : _ri.content.trim(),
          code: getCode((_Ci = (_Bi = (_Ai = (_zi = (_yi = (_xi = (_wi = (_vi = (_ui = (_ti = (_si = contents[4]) == null ? void 0 : _si.children[2]) == null ? void 0 : _ti.children[0]) == null ? void 0 : _ui.children[0]) == null ? void 0 : _vi.children[3]) == null ? void 0 : _wi.children[1]) == null ? void 0 : _xi.children[1]) == null ? void 0 : _yi.children[0]) == null ? void 0 : _zi.children[0]) == null ? void 0 : _Ai.children[0]) == null ? void 0 : _Bi.attributes[0]) == null ? void 0 : _Ci.value.trim())
        },
        {
          name: (_Ni = (_Mi = (_Li = (_Ki = (_Ji = (_Ii = (_Hi = (_Gi = (_Fi = (_Ei = (_Di = contents[4]) == null ? void 0 : _Di.children[2]) == null ? void 0 : _Ei.children[0]) == null ? void 0 : _Fi.children[0]) == null ? void 0 : _Gi.children[3]) == null ? void 0 : _Hi.children[1]) == null ? void 0 : _Ii.children[1]) == null ? void 0 : _Ji.children[1]) == null ? void 0 : _Ki.children[0]) == null ? void 0 : _Li.children[0]) == null ? void 0 : _Mi.children[0]) == null ? void 0 : _Ni.content.trim(),
          code: getCode((_Yi = (_Xi = (_Wi = (_Vi = (_Ui = (_Ti = (_Si = (_Ri = (_Qi = (_Pi = (_Oi = contents[4]) == null ? void 0 : _Oi.children[2]) == null ? void 0 : _Pi.children[0]) == null ? void 0 : _Qi.children[0]) == null ? void 0 : _Ri.children[3]) == null ? void 0 : _Si.children[1]) == null ? void 0 : _Ti.children[1]) == null ? void 0 : _Ui.children[1]) == null ? void 0 : _Vi.children[0]) == null ? void 0 : _Wi.children[0]) == null ? void 0 : _Xi.attributes[0]) == null ? void 0 : _Yi.value.trim())
        },
        {
          name: (_hj = (_gj = (_fj = (_ej = (_dj = (_cj = (_bj = (_aj = (_$i = (__i = (_Zi = contents[4]) == null ? void 0 : _Zi.children[2]) == null ? void 0 : __i.children[0]) == null ? void 0 : _$i.children[0]) == null ? void 0 : _aj.children[3]) == null ? void 0 : _bj.children[1]) == null ? void 0 : _cj.children[1]) == null ? void 0 : _dj.children[2]) == null ? void 0 : _ej.children[0]) == null ? void 0 : _fj.children[0]) == null ? void 0 : _gj.children[0]) == null ? void 0 : _hj.content.trim(),
          code: getCode((_sj = (_rj = (_qj = (_pj = (_oj = (_nj = (_mj = (_lj = (_kj = (_jj = (_ij = contents[4]) == null ? void 0 : _ij.children[2]) == null ? void 0 : _jj.children[0]) == null ? void 0 : _kj.children[0]) == null ? void 0 : _lj.children[3]) == null ? void 0 : _mj.children[1]) == null ? void 0 : _nj.children[1]) == null ? void 0 : _oj.children[2]) == null ? void 0 : _pj.children[0]) == null ? void 0 : _qj.children[0]) == null ? void 0 : _rj.attributes[0]) == null ? void 0 : _sj.value.trim())
        }
      ]
    }
  };
  console.log(JSON.stringify(result, null, 2));
  return contents;
};

// src/index.ts
async function main() {
  const occupations = {
    cashiers: await getOccupationData("pages/occupations/cashiers.html")
  };
}
main();
//# sourceMappingURL=index.js.map