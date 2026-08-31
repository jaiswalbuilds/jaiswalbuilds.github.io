import asyncio
import os
from playwright.async_api import async_playwright

async def run():
    print("Launching headless Chromium via Playwright...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Emulate desktop high-res screen
        context = await browser.new_context(viewport={'width': 1280, 'height': 900})
        page = await context.new_page()

        print("Navigating to https://my-portfolio-b7oo.vercel.app/ ...")
        await page.goto("https://my-portfolio-b7oo.vercel.app/", wait_until="load", timeout=45000)

        # Let the page render
        await asyncio.sleep(2)
        
        # Take a top-fold snapshot
        output_dir = r"C:\Users\jaisw\.gemini\antigravity\brain\7fe8bd21-5f48-4bfd-8dd8-2edef4d983cd"
        os.makedirs(output_dir, exist_ok=True)
        
        snap1 = os.path.join(output_dir, "sufal_top.png")
        await page.screenshot(path=snap1)
        print(f"Saved top fold to: {snap1}")

        # Scroll slowly down to trigger scroll animations
        print("Scrolling page to trigger animation layouts...")
        for i in range(1, 6):
            scroll_y = i * 600
            await page.evaluate(f"window.scrollTo(0, {scroll_y})")
            await asyncio.sleep(1.2)
            
            snap_scroll = os.path.join(output_dir, f"sufal_scroll_{i}.png")
            await page.screenshot(path=snap_scroll)
            print(f"Saved scroll frame {i} to: {snap_scroll}")

        await browser.close()
        print("Scrape complete!")

if __name__ == "__main__":
    asyncio.run(run())
