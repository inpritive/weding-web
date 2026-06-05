import shutil
import glob
import os

src_dir = r"C:\Users\prity\.gemini\antigravity-ide\brain\a2b337e3-e85e-4372-8bab-dcca284e177f"
dst_dir = r"E:\web\weding-web\assets"

if not os.path.exists(dst_dir):
    os.makedirs(dst_dir)

files = glob.glob(os.path.join(src_dir, "media__*"))
print("Found files:", files)
for f in files:
    try:
        shutil.copy(f, dst_dir)
        print(f"Copied {f}")
    except Exception as e:
        print(f"Failed to copy {f}: {e}")
