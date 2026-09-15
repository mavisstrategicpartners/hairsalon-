"""Crop the hair-portrait mark off a flat black field. Used as the site logo."""

from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-hairsalon\assets"
    r"\c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"97fd651f696bd5d418cb76fa0cf44acc_images_"
    r"ChatGPT_Image_Sep_11__2026__10_46_07_AM-89efa0d6-c463-447b-ace5-fe2f94d82e29.png"
)
OUT = Path(r"C:\Users\User\hairsalon-\public\images\logo-biana-hair.png")


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


def flood_from_border(blocked: np.ndarray) -> np.ndarray:
    h, w = blocked.shape
    reach = np.zeros((h, w), dtype=bool)
    stack: list[tuple[int, int]] = []
    for x in range(w):
        if not blocked[0, x]:
            stack.append((0, x))
        if not blocked[h - 1, x]:
            stack.append((h - 1, x))
    for y in range(h):
        if not blocked[y, 0]:
            stack.append((y, 0))
        if not blocked[y, w - 1]:
            stack.append((y, w - 1))
    seen = np.zeros((h, w), dtype=bool)
    while stack:
        y, x = stack.pop()
        if y < 0 or y >= h or x < 0 or x >= w or seen[y, x] or blocked[y, x]:
            continue
        seen[y, x] = True
        reach[y, x] = True
        stack.extend(((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)))
    return reach


def main() -> None:
    rgb = np.array(Image.open(SRC).convert("RGB")).astype(np.float32)
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    luma = 0.299 * r + 0.587 * g + 0.114 * b
    chroma = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)

    # Orange, skin, and highlights — not the flat black paper.
    ink = (luma > 18) | (chroma > 14) | ((r > 36) & (r > b + 6))
    closed = box_blur(ink.astype(np.float32), 17) > 0.12
    # Walk the black paper from the frame; keep everything it cannot reach (hair + face).
    paper = flood_from_border(closed)
    mark = ~paper
    soft = box_blur(mark.astype(np.float32), 7)
    alpha = np.clip((soft - 0.10) / 0.50, 0, 1)

    ys, xs = np.where(alpha > 0.12)
    pad = 10
    y0, y1 = max(int(ys.min()) - pad, 0), min(int(ys.max()) + pad + 1, alpha.shape[0])
    x0, x1 = max(int(xs.min()) - pad, 0), min(int(xs.max()) + pad + 1, alpha.shape[1])

    out = np.zeros((y1 - y0, x1 - x0, 4), dtype=np.uint8)
    out[:, :, :3] = rgb[y0:y1, x0:x1].astype(np.uint8)
    out[:, :, 3] = (alpha[y0:y1, x0:x1] * 255).astype(np.uint8)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out, "RGBA").save(OUT, optimize=True)
    print(f"Wrote {OUT} {out.shape[1]}x{out.shape[0]} alpha={out[:,:,3].min()}-{out[:,:,3].max()}")


if __name__ == "__main__":
    main()
