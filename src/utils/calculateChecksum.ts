/**
 * Calculates the checksum of provided segments
 */
export = (d: string, m: string, å: string, i: string): string => {
  const [d1, d2] = d;
  const [m1, m2] = m;
  const [å1, å2] = å;
  const [i1, i2, i3] = i;

  let k1 = String(
    11 -
      ((3 * +d1 +
        7 * +d2 +
        6 * +m1 +
        1 * +m2 +
        8 * +å1 +
        9 * +å2 +
        4 * +i1 +
        5 * +i2 +
        2 * +i3) %
        11)
  );

  let k2 = String(
    11 -
      ((5 * +d1 +
        4 * +d2 +
        3 * +m1 +
        2 * +m2 +
        7 * +å1 +
        6 * +å2 +
        5 * +i1 +
        4 * +i2 +
        3 * +i3 +
        2 * +k1) %
        11)
  );

  if (k1 === "11") k1 = "0";
  if (k2 === "11") k2 = "0";

  return k1 + k2;
};
