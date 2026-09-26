# Plan 001: Prefers-Reduced-Motion Accessibility

- **Category**: Accessibility
- **Severity**: HIGH
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css`

---

## 1. Problem Statement
The application contains multiple continuous `@keyframes` animations (`whatsappPulse`, `sparkleTwinkle`, `livePulse`, `mouseWheel`, `toastSlide`) and transitions with no `@media (prefers-reduced-motion: reduce)` rules. Users with vestibular disorders or motion sensitivity experience uncontrolled motion.

---

## 2. Target Specification

Add a dedicated reduced-motion override block at the bottom of `style.css`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .floating-whatsapp-ring,
  .hero-sparkle-field,
  .hero-video-scrim {
    animation: none !important;
  }
}
```

---

## 3. Step-by-Step Execution
1. Open `style.css`.
2. Navigate to the end of the file.
3. Append the `@media (prefers-reduced-motion: reduce)` block.
4. Verify using browser DevTools Rendering tab (`Emulate CSS media feature prefers-reduced-motion: reduce`).

---

## 4. Verification Checklist
- [ ] In DevTools Rendering with `prefers-reduced-motion: reduce` enabled, all pulsing and sliding animations stop immediately.
- [ ] UI remains completely functional and accessible.
