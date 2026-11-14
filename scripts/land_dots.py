"""The career map's land, as a dot matrix: Natural Earth's 1:110m land (public domain) sampled every STEP degrees on an
equirectangular grid, each row stored as runs of land so the page draws a row of dots with one dashed line.

    curl -sSL -o /tmp/ne/ne_110m_land.geojson \
      https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson
    python3 -I scripts/land_dots.py /tmp/ne/ne_110m_land.geojson      # → content/land.json
"""
import json
import os
import sys

LON0, LON1, LAT0, LAT1, STEP = -130.0, 180.0, 72.0, -56.0, 2.0
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "content", "land.json")


def rings(geo):
    for f in geo["features"]:
        g = f["geometry"]
        polys = [g["coordinates"]] if g["type"] == "Polygon" else g["coordinates"]
        for poly in polys:
            for ring in poly:
                xs = [p[0] for p in ring]
                ys = [p[1] for p in ring]
                yield (min(xs), max(xs), min(ys), max(ys)), ring


def inside(lon, lat, rs):
    """Even-odd over every ring, so holes stay water."""
    hit = False
    for (x0, x1, y0, y1), ring in rs:
        if not (x0 <= lon <= x1 and y0 <= lat <= y1):
            continue
        j = len(ring) - 1
        for i in range(len(ring)):
            xi, yi = ring[i][0], ring[i][1]
            xj, yj = ring[j][0], ring[j][1]
            if (yi > lat) != (yj > lat) and lon < (xj - xi) * (lat - yi) / (yj - yi) + xi:
                hit = not hit
            j = i
    return hit


def main():
    rs = list(rings(json.load(open(sys.argv[1]))))
    cols = int(round((LON1 - LON0) / STEP)) + 1
    rows = []
    r = 0
    lat = LAT0
    while lat >= LAT1 - 1e-9:
        runs, start = [], None
        for c in range(cols):
            land = inside(LON0 + c * STEP, lat, rs)
            if land and start is None:
                start = c
            if not land and start is not None:
                runs.append([start, c - 1])
                start = None
        if start is not None:
            runs.append([start, cols - 1])
        if runs:
            rows.append([r, runs])
        r += 1
        lat -= STEP
    out = {"source": "Natural Earth 1:110m land (public domain)", "lon0": LON0, "lon1": LON1, "lat0": LAT0, "lat1": LAT1,
           "step": STEP, "rows": rows}
    with open(OUT, "w") as fh:
        json.dump(out, fh, separators=(",", ":"))
        fh.write("\n")
    print(f"{sum(b - a + 1 for _, rr in rows for a, b in rr)} dots in {sum(len(rr) for _, rr in rows)} runs → {OUT}")


if __name__ == "__main__":
    main()
