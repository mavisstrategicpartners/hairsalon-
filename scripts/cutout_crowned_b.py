"""Positive-select the crowned-B metal and ivory. Not wired into the site."""

from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-hairsalon\assets"
    r"\c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"97fd651f696bd5d418cb76fa0cf44acc_images_image-3401f1de-faf3-4967-99ad-685273b2289c.png"
)
OUT = Path(r"C:\Users\User\hairsalon-\tmp\logo-crowned-b-cutout.png")
PREVIEW = Path(r"C:\Users\User\hairsalon-\tmp\logo-crowned-b-cutout-preview.png")


def box_blur(ch: np.ndarray, k: int) -> np.ndarray:
    pad = k // 2
    padded = np.pad(ch, pad, mode="edge")
    integral = np.pad(padded.cumsum(0).cumsum(1), ((1, 0), (1, 0)), mode="constant")
    out = (
        integral[k:, k:]
        - integral[k:, :-k]
        - integral[:-k, k:]
        + integral[:-k, :-k]
    )
    return out / float(k * k)


def flood_bg(rgb: np.ndarray, step: float) -> np.ndarray:
    h, w, _ = rgb.shape
    bg = np.zeros((h, w), dtype=bool)
    seen = np.zeros((h, w), dtype=np.uint8)
    q: deque[tuple[int, int]] = deque()

    def push(y: int, x: int) -> None:
        if seen[y, x]:
            return
        seen[y, x] = 1
        bg[y, x] = True
        q.append((y, x))

    for x in range(w):
        push(0, x)
        push(h - 1, x)
    for y in range(h):
        push(y, 0)
        push(y, w - 1)

    while q:
        y, x = q.popleft()
        pix = rgb[y, x]
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if ny < 0 or ny >= h or nx < 0 or nx >= w or seen[ny, nx]:
                continue
            d = rgb[ny, nx] - pix
            if max(abs(float(d[0])), abs(float(d[1])), abs(float(d[2]))) <= step:
                push(ny, nx)
    return bg


def keep_large(mask: np.ndarray, min_px: int) -> np.ndarray:
    h, w = mask.shape
    labels = np.zeros((h, w), dtype=np.int32)
    keep = np.zeros((h, w), dtype=bool)
    current = 0
    for y in range(h):
        for x in range(w):
            if not mask[y, x] or labels[y, x]:
                continue
            current += 1
            stack = [(y, x)]
            coords: list[tuple[int, int]] = []
            while stack:
                cy, cx = stack.pop()
                if (
                    cy < 0
                    or cy >= h
                    or cx < 0
                    or cx >= w
                    or labels[cy, cx]
                    or not mask[cy, cx]
                ):
                    continue
                labels[cy, cx] = current
                coords.append((cy, cx))
                stack.extend(
                    ((cy - 1, cx), (cy + 1, cx), (cy, cx - 1), (cy, cx + 1))
                )
            if len(coords) >= min_px:
                for cy, cx in coords:
                    keep[cy, cx] = True
    return keep


def checkerboard(h: int, w: int, cell: int = 14) -> np.ndarray:
    yy, xx = np.indices((h, w))
    dark = ((yy // cell) + (xx // cell)) % 2 == 0
    board = np.empty((h, w, 3), dtype=np.uint8)
    board[dark] = (210, 210, 210)
    board[~dark] = (255, 255, 255)
    return board


def main() -> None:
    rgba = np.array(Image.open(SRC).convert("RGBA")).astype(np.float32)
    rgb = rgba[:, :, :3]
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    gray = 0.299 * r + 0.587 * g + 0.114 * b
    mx = np.maximum(np.maximum(r, g), b)
    mn = np.minimum(np.minimum(r, g), b)
    sat = (mx - mn) / np.maximum(mx, 1.0)
    val = mx / 255.0
    local = np.abs(gray - box_blur(gray, 7))
    warm = r - b

    # Smooth studio wash reachable from the frame.
    wash = flood_bg(rgb, step=8.0)

    # The mark itself: 3D metal, cream inlay, shaded bronze, and diamond sparks.
    metal = (warm > 28) & (r > 55) & (sat > 0.14) & (local > 1.6)
    bronze = (r > 32) & (r >= g - 4) & (warm > 10) & (val < 0.55) & (local > 1.2)
    cream = (r > 185) & (g > 155) & (warm > 36) & (sat > 0.14) & ~wash
    spark = (r > 225) & (g > 205) & (val > 0.86)
    muted_beige = (
        (np.abs(r - 196) < 40)
        & (np.abs(g - 181) < 40)
        & (np.abs(b - 162) < 40)
        & (local < 6.5)
        & (sat < 0.28)
    )
    letter = (metal | bronze | cream | spark | ((local > 6.5) & (warm > 14))) & ~wash & ~muted_beige
    strong = local > 7.0
    near_edge = box_blur(strong.astype(np.float32), 9) > 0.14
    bulky_beige = (
        (sat < 0.30)
        & (warm < 55)
        & (r > 95)
        & (r < 220)
        & (val > 0.38)
        & (val < 0.86)
        & ~cream
        & ~spark
        & ~near_edge
    )
    letter = letter & ~bulky_beige
    letter = keep_large(box_blur(letter.astype(np.float32), 3) > 0.22, min_px=40)

    # Grow onto adjacent bronze rims, then close hairlines without filling the bowl.
    near = box_blur(letter.astype(np.float32), 9) > 0.08
    letter = letter | (bronze & near & ~wash)
    dilated = box_blur(letter.astype(np.float32), 7) > 0.12
    closed = box_blur(dilated.astype(np.float32), 5) > 0.42
    closed = keep_large(closed, min_px=200)

    hole_color = (np.abs(r - 196) < 36) & (np.abs(g - 181) < 36) & (np.abs(b - 162) < 36)
    wash_like = ((local < 4.0) & (r < 225) & (warm < 56) & (sat < 0.30) & (val < 0.86)) | hole_color
    # Do not let closing grow across the open bowl or the outer glow.
    closed = closed & ~wash & ~wash_like

    # Punch any remaining enclosed beige by walking from the lower bowl.
    ys, xs = np.where(closed)
    y_seed = int(ys.min() + 0.70 * (ys.max() - ys.min()))
    x_seed = int(np.median(xs))
    punch_ok = (local < 5.5) & (sat < 0.32) & (r < 230) & (warm < 58)
    hy, wx = closed.shape
    if 0 <= y_seed < hy and 0 <= x_seed < wx:
        q = deque()
        seen = np.zeros((hy, wx), dtype=np.uint8)
        for dy in range(-12, 13):
            for dx in range(-12, 13):
                yy, xx = y_seed + dy, x_seed + dx
                if 0 <= yy < hy and 0 <= xx < wx and punch_ok[yy, xx]:
                    q.append((yy, xx))
                    seen[yy, xx] = 1
        while q:
            y, x = q.popleft()
            closed[y, x] = False
            for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
                if ny < 0 or ny >= hy or nx < 0 or nx >= wx or seen[ny, nx]:
                    continue
                if punch_ok[ny, nx]:
                    seen[ny, nx] = 1
                    q.append((ny, nx))
    closed = keep_large(closed, min_px=200)

    protected = cream | spark | ((local > 11) & (warm > 50)) | ((r < 90) & (warm > 18) & (local > 3))
    beige_walk = (r > 100) & (r < 228) & (warm < 62) & (sat < 0.34) & (g > 85) & (val < 0.90)
    hy, wx = closed.shape
    q = deque()
    seen = np.zeros((hy, wx), dtype=np.uint8)
    trans = ~closed
    # Seed from transparent pixels that already border beige.
    ys_t, xs_t = np.where(trans)
    for y, x in zip(ys_t, xs_t):
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if 0 <= ny < hy and 0 <= nx < wx and closed[ny, nx] and beige_walk[ny, nx] and not protected[ny, nx]:
                q.append((ny, nx))
                seen[ny, nx] = 1
    while q:
        y, x = q.popleft()
        closed[y, x] = False
        for ny, nx in ((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)):
            if ny < 0 or ny >= hy or nx < 0 or nx >= wx or seen[ny, nx]:
                continue
            if closed[ny, nx] and beige_walk[ny, nx] and not protected[ny, nx]:
                seen[ny, nx] = 1
                q.append((ny, nx))

    inv = ~closed
    large_holes = keep_large(inv, min_px=90)
    pinholes = inv & ~large_holes
    pinholes[0, :] = False
    pinholes[-1, :] = False
    pinholes[:, 0] = False
    pinholes[:, -1] = False
    closed = keep_large(closed | pinholes, min_px=200)
    closed = closed & ~bulky_beige

    core = box_blur(closed.astype(np.float32), 5) > 0.48
    rim = box_blur(closed.astype(np.float32), 5)
    alpha = np.where(core, 1.0, np.clip((rim - 0.15) / 0.5, 0, 1))
    alpha = np.where(wash, np.minimum(alpha, 0.04), alpha)
    alpha = np.clip(alpha, 0, 1)

    ys, xs = np.where(alpha > 0.15)
    pad = 12
    y0, y1 = max(int(ys.min()) - pad, 0), min(int(ys.max()) + pad + 1, alpha.shape[0])
    x0, x1 = max(int(xs.min()) - pad, 0), min(int(xs.max()) + pad + 1, alpha.shape[1])

    out = np.zeros((y1 - y0, x1 - x0, 4), dtype=np.uint8)
    out[:, :, :3] = rgb[y0:y1, x0:x1].astype(np.uint8)
    out[:, :, 3] = (alpha[y0:y1, x0:x1] * 255).astype(np.uint8)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out, "RGBA").save(OUT)

    crop_rgb = rgb[y0:y1, x0:x1]
    crop_a = alpha[y0:y1, x0:x1][..., None]
    board = checkerboard(out.shape[0], out.shape[1]).astype(np.float32)
    preview = (crop_rgb * crop_a + board * (1 - crop_a)).astype(np.uint8)
    Image.fromarray(preview, "RGB").save(PREVIEW)
    asset = Path(r"C:\Users\User\hairsalon-\assets\logo-crowned-b-transparent.png")
    Image.fromarray(out, "RGBA").save(asset)
    print(
        f"Wrote {OUT} {out.shape[1]}x{out.shape[0]} "
        f"letter={(letter).sum()} opaque={(alpha>0.5).sum()} also {asset}"
    )


if __name__ == "__main__":
    main()
