# Gold Coast Surf Forecast PWA

A surf conditions dashboard for the Gold Coast, Queensland, Australia.

## Surf location / s

- Greenmount / Rainbow Bay
- Kirra
- Currumbin Alley

## Features

- AI-generated surf assessments
- GO / MARGINAL / NO GO decisions
- Surf quality scores and confidence levels
- Wind speed and gust information
- Dynamic wind-direction compass for each surf location
- Wind compass legend:
  - Orange: direction the wind comes from
  - Blue: direction the wind blows towards
- Refresh Forecast button using a Netlify Function and Make.com webhook

## Forecast pipeline

Make.com collects weather and ocean data, generates surf assessments using Gemini, and updates `public/data.json` in GitHub.

Netlify hosts the dashboard.

## Key files

- `index.html` — dashboard interface
- `public/data.json` — forecast data
- `public/wind-compass.js` — dynamic wind compass
- `functions/` — serverless function files

## Disclaimer

Forecasts are estimates, not live beach observations or water-safety advice.

## Deployment

Production site is deployed through Netlify from the GitHub `main` branch.

The wind compass and shared legend have been added to the dashboard.# gold-coast-surf-pwa
