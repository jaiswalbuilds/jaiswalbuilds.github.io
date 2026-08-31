import asyncio
from playwright.async_api import async_playwright

async def run():
    print("Launching Playwright to inspect iframe target...")
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        await page.goto("https://sufalbala.vercel.app/", wait_until="load")
        
        # Give it a second to render
        await asyncio.sleep(2)
        
        # Get all iframe src attributes
        iframe_srcs = await page.evaluate("""() => {
            const iframes = Array.from(document.querySelectorAll('iframe'));
            return iframes.map(f => f.src);
        }""")
        
        print("\nFound Iframe Sources:")
        for src in iframe_srcs:
            print("-", src)
            
        # Also print the DOM HTML wrapper body
        body_html = await page.evaluate("() => document.body.innerHTML")
        print("\nBody HTML:")
        print(body_html)
        
        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
