# Third-Party Notices

## Hyperspeed / React Bits

- Author: David Haz / React Bits.
- Source: https://github.com/DavidHDev/react-bits
- Component: https://reactbits.dev/backgrounds/hyperspeed
- Upstream commit: `4dc7b5b7772e1217c8fb8d2a7aa074302180e5b4`.
- Original files: `src/ts-default/Backgrounds/Hyperspeed/Hyperspeed.tsx` and `Hyperspeed.css`.
- Local adaptation: `src/components/visuals/Hyperspeed/`.
- License: MIT + Commons Clause License Condition v1.0, reproduced in [licenses/React-Bits.md](licenses/React-Bits.md).

The component's procedural highway, instanced trails, poles, curve functions, shaders and rendering implementation originate in React Bits. They are not presented as original portfolio artwork. Local changes add blue/green palettes, bounded acceleration, lower tube tessellation, a capped DPR, application-wide motion controls, visibility-aware cancellation, real first-frame readiness, context-loss/error handling, GPU cleanup, reusable camera vectors and diagnostic counters. Bloom is disabled in this integration; its render targets are not resized or rendered when disabled. No external model, texture, video, iframe or second renderer is used.

The surrounding portfolio composition, branded 2D entrance, HTML area controls, 2D fallback and transition to the professional timeline are local integration work. The bundled source remains part of this application, not a standalone component distribution or component marketplace.

## Three.js

Three.js 0.180.0, MIT license, reproduced in [licenses/Three.js.txt](licenses/Three.js.txt). Copyright and license remain in the installed package. Source: https://github.com/mrdoob/three. This version matches the dependency declared by the pinned React Bits source; TypeScript declarations use `@types/three` 0.180.0 during development.
