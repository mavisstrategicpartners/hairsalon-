"""GrabCut cutout of the crowned B. Does not wire the asset into the site."""

from pathlib import Path

import cv2
import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-hairsalon\assets"
    r"\c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"97fd651f696bd5d418cb76fa0cf44acc_images_image-3401f1de-faf3-4967-99ad-685273b2289c.png"
)
OUT = Path(r"C:\Users\User\hairsalon-\tmp\logo-crowned-b-cutout.png")
PREVIEW = Path(r"C:\Users\User\hairsalon-\tmp\logo-crowned-b-cutout-preview.png")
ASSET = Path(r"C:\Users\User\hairsalon-\assets\logo-crowned-b-transparent.png")


def checkerboard(h: int, w: int, cell: int = 14) -> np.ndarray:
    yy, xx = np.indices((h, w))
    dark = ((yy // cell) + (xx // cell)) % 2 == 0
    board = np.empty((h, w, 3), dtype=np.uint8)
    board[dark] = (210, 210, 210)
    board[~dark] = (255, 255, 255)
    return board


def main() -> None:
    bgr = cv2.imread(str(SRC), cv2.IMREAD_COLOR)
    if bgr is None:
        raise SystemExit(f"could not read {SRC}")
    h, w = bgr.shape[:2]
    mask = np.zeros((h, w), np.uint8)
    # Inner rect is likely foreground; a thick outer band is background.
    rect = (18, 8, w - 36, h - 16)
    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(bgr, mask, rect, bgd, fgd, 6, cv2.GC_INIT_WITH_RECT)

    # Corners are definitely background.
    mask[:8, :] = cv2.GC_BGD
    mask[-8:, :] = cv2.GC_BGD
    mask[:, :10] = cv2.GC_BGD
    mask[:, -10:] = cv2.GC_BGD
    cv2.grabCut(bgr, mask, None, bgd, fgd, 4, cv2.GC_INIT_WITH_MASK)

    sure_fg = (mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD)
    alpha = (sure_fg.astype(np.uint8) * 255)
    alpha = cv2.GaussianBlur(alpha, (5, 5), 0)

    rgb = cv2.cvtColor(bgr, cv2.COLOR_BGR2RGB)
    ys, xs = np.where(alpha > 24)
    pad = 8
    y0, y1 = max(int(ys.min()) - pad, 0), min(int(ys.max()) + pad + 1, h)
    x0, x1 = max(int(xs.min()) - pad, 0), min(int(xs.max()) + pad + 1, w)
    out = np.dstack([rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1]])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    ASSET.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out, "RGBA").save(OUT)
    Image.fromarray(out, "RGBA").save(ASSET)

    crop_a = (out[:, :, 3:4].astype(np.float32) / 255.0)
    board = checkerboard(out.shape[0], out.shape[1]).astype(np.float32)
    preview = (out[:, :, :3].astype(np.float32) * crop_a + board * (1.0 - crop_a)).astype(np.uint8)
    Image.fromarray(preview, "RGB").save(PREVIEW)
    print(f"Wrote {OUT} {out.shape[1]}x{out.shape[0]} opaque={(out[:,:,3]>127).sum()}")


if __name__ == "__main__":
    main()
