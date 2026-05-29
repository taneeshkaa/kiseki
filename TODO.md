# TODO — Dev-Profile Dashboard Command Palette


## Step 0 — Gather & confirm
- [x] Reviewed existing `src/components/CommandPalette.jsx` and `src/components/CommandPalette.css`
- [x] Reviewed `src/components/MatrixRain.jsx` and `src/App.jsx` (command palette wiring + theme)

## Step 1 — Implement split-screen layout
- [ ] Widen modal container (`max-width`)
- [ ] Convert to 2-column flex layout
- [ ] Add 1px vertical divider between left/right
- [ ] Hide right panel on small screens

## Step 2 — Implement Dev-Profile Dashboard modules (right panel)


- [ ] Add GitHub Contribution Matrix grid module (deterministic squares)
- [ ] Add Algorithmic Status block module (monospace uppercase, exact lines)
- [ ] Add System Descriptors module (monospace flat text, exact line)

## Step 3 — Focus transitions
- [ ] Add `rightView` state that updates based on focused command item
- [ ] Use `framer-motion` crossfade/slide transitions for right panel

## Step 4 — Ensure compatibility & performance
- [ ] Use CSS variables for light/dark
- [ ] Avoid heavy re-renders; memoize matrix generation
- [ ] Keep existing keyboard navigation + actions intact

## Step 5 — Validate
- [ ] Run `npm run dev` and verify CMD+K opens new layout
- [ ] Keyboard navigation changes right panel views
- [ ] Mobile layout hides right panel

