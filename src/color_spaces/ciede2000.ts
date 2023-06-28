import { lab as d3Lab } from "d3-color";

const KL = 1;
const KC = 1;
const KH = 1;

/**
 * Copied from d3-color-difference, I didn't double check if this is correct or
 * not.
 *
 * @see https://github.com/Evercoder/d3-color-difference/blob/master/src/ciede2000.js
 */
export function ciede2000(pivot: string) {
  const std = d3Lab(pivot);
  const cStd = Math.pow(Math.pow(std.a, 2) + Math.pow(std.b, 2), 0.5);

  return (target: string) => {
    const smp = d3Lab(target);
    const cSmp = Math.pow(Math.pow(smp.a, 2) + Math.pow(smp.b, 2), 0.5);

    const cAvg = (cStd + cSmp) / 2;

    const G =
      0.5 *
      (1 -
        Math.pow(
          Math.pow(cAvg, 7) / (Math.pow(cAvg, 7) + Math.pow(25, 7)),
          0.5,
        ));

    const apStd = std.a * (1 + G);
    const apSmp = smp.a * (1 + G);

    const cpStd = Math.pow(Math.pow(apStd, 2) + Math.pow(std.b, 2), 0.5);
    const cpSmp = Math.pow(Math.pow(apSmp, 2) + Math.pow(smp.b, 2), 0.5);

    let hpStd =
      Math.abs(apStd) + Math.abs(std.b) === 0 ? 0 : Math.atan2(std.b, apStd);
    hpStd += hpStd < 0 ? 2 * Math.PI : 0;

    let hpSmp =
      Math.abs(apSmp) + Math.abs(smp.b) === 0 ? 0 : Math.atan2(smp.b, apSmp);
    hpSmp += hpSmp < 0 ? 2 * Math.PI : 0;

    const dL = smp.l - std.l;
    const dC = cpSmp - cpStd;

    let dhp = cpStd * cpSmp === 0 ? 0 : hpSmp - hpStd;
    dhp -= dhp > Math.PI ? 2 * Math.PI : 0;
    dhp += dhp < -Math.PI ? 2 * Math.PI : 0;

    const dH = 2 * Math.pow(cpStd * cpSmp, 0.5) * Math.sin(dhp / 2);

    const Lp = (std.l + smp.l) / 2;
    const Cp = (cpStd + cpSmp) / 2;

    let hp = hpStd + hpSmp;
    if (cpStd * cpSmp !== 0) {
      hp = hp / 2 - (Math.abs(hpStd - hpSmp) > Math.PI ? Math.PI : 0);
      hp += hp < 0 ? 2 * Math.PI : 0;
    }

    const Lpm50 = Math.pow(Lp - 50, 2);
    const T =
      1 -
      0.17 * Math.cos(hp - Math.PI / 6) +
      0.24 * Math.cos(2 * hp) +
      0.32 * Math.cos(3 * hp + Math.PI / 30) -
      0.2 * Math.cos(4 * hp - (63 * Math.PI) / 180);

    const Sl = 1 + (0.015 * Lpm50) / Math.pow(20 + Lpm50, 0.5);
    const Sc = 1 + 0.045 * Cp;
    const Sh = 1 + 0.015 * Cp * T;

    const deltaTheta =
      ((30 * Math.PI) / 180) *
      Math.exp(-1 * Math.pow(((180 / Math.PI) * hp - 275) / 25, 2));
    const Rc =
      2 * Math.pow(Math.pow(Cp, 7) / (Math.pow(Cp, 7) + Math.pow(25, 7)), 0.5);

    const Rt = -1 * Math.sin(2 * deltaTheta) * Rc;

    return Math.sqrt(
      Math.pow(dL / (KL * Sl), 2) +
        Math.pow(dC / (KC * Sc), 2) +
        Math.pow(dH / (KH * Sh), 2) +
        (((Rt * dC) / (KC * Sc)) * dH) / (KH * Sh),
    );
  };
}
