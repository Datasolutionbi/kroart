# Auditoría de Directrices de Interfaz Web (Vercel)

## src/app/page.tsx

src/app/page.tsx:86 - <img> missing explicit width/height (CLS prevention)
src/app/page.tsx:139 - <img> missing explicit width/height
src/app/page.tsx:146 - <button> lacks focus-visible ring
src/app/page.tsx:194 - <img> missing explicit width/height
src/app/page.tsx:197 - icon-only <button> missing aria-label and focus state
src/app/page.tsx:237 - button lacks focus-visible ring
src/app/page.tsx:315 - button lacks focus-visible ring
src/app/page.tsx:96 - <h1> could benefit from text-wrap: balance
src/app/page.tsx:208 - <h2> could benefit from text-wrap: balance

## src/app/globals.css

src/app/globals.css:68 - transition: all → list properties explicitly
src/app/globals.css:87 - transition: all → list properties explicitly
src/app/globals.css:19 - Ensure cursor-none is managed for accessibility

## src/app/layout.tsx

src/app/layout.tsx:30 - missing color-scheme: dark on <html> for dark theme consistency

## src/components/Navbar.tsx

src/components/Navbar.tsx:43 - logo <img> missing dimensions
src/components/Navbar.tsx:77 - shopping bag <button> missing aria-label
src/components/Navbar.tsx:82 - menu <button> missing aria-label and aria-expanded
src/components/Navbar.tsx:56 - nav links lack focus-visible states
