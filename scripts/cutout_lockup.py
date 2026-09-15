"""Knock white paper out of the Canva lockup. Used as the site logo file."""

from pathlib import Path

import numpy as np
from PIL import Image

SRC = Path(
    r"C:\Users\User\.cursor\projects\c-Users-User-hairsalon\assets"
    r"\c__Users_User_AppData_Roaming_Cursor_User_workspaceStorage_"
    r"97fd651f696bd5d418cb76fa0cf44acc_images_"
    r"Canva_AI_Image_Sep_10__2026__8_44_37_PM-51aa16fc-219b-45c9-9bd9-266b9f50db0d.jpg"
)
OUT = Path(r"C:\Users\User\hairsalon-\public\images\logo-biana-hair.png")


def main() -> None:
    rgb = np.array(Image.open(SRC).convert("RGB")).astype(np.float32)
    r, g, b = rgb[:, :, 0], rgb[:, :, 1], rgb[:, :, 2]
    # Paper is near-white and nearly neutral. Gold and cream are warmer.
    dist_white = np.sqrt((255 - r) ** 2 + (255 - g) ** 2 + (255 - b) ** 2)
    chroma = np.maximum(np.maximum(r, g), b) - np.minimum(np.minimum(r, g), b)
    # Fade the paper out; keep metal, cream inlays, and the wordmark.
    alpha = np.clip((dist_white - 10.0) / 28.0, 0, 1)
    alpha = np.where(chroma > 18, np.maximum(alpha, np.clip(chroma / 40.0, 0, 1)), alpha)
    alpha = np.clip(alpha, 0, 1)

    ys, xs = np.where(alpha > 0.08)
    pad = 6
    y0, y1 = max(int(ys.min()) - pad, 0), min(int(ys.max()) + pad + 1, alpha.shape[0])
    x0, x1 = max(int(xs.min()) - pad, 0), min(int(xs.max()) + pad + 1, alpha.shape[1])

    out = np.zeros((y1 - y0, x1 - x0, 4), dtype=np.uint8)
    out[:, :, :3] = rgb[y0:y1, x0:x1].astype(np.uint8)
    out[:, :, 3] = (alpha[y0:y1, x0:x1] * 255).astype(np.uint8)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    Image.fromarray(out, "RGBA").save(OUT, optimize=True)
    print(f"Wrote {OUT} {out.shape[1]}x{out.shape[0]}")


if __name__ == "__main__":
    main()
