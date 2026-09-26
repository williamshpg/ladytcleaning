# Plan 005: Toast Notification Motion Cohesion

- **Category**: Cohesion & Tokens
- **Severity**: LOW
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css:2235-2245`

---

## 1. Problem Statement
Toast notifications use a hardcoded generic curve `0.3s ease` in `@keyframes toastSlide`, which clashes with the site's standard `--transition-fast` (`0.2s cubic-bezier(0.16, 1, 0.3, 1)`) and lacks a clean exit animation.

---

## 2. Target Specification

Update toast notification keyframes and transitions:

```css
.toast-notification {
  transform: translateX(100%);
  opacity: 0;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 160ms ease-out;
}

.toast-notification.is-visible {
  transform: translateX(0);
  opacity: 1;
}

.toast-notification.is-hiding {
  transform: translateX(100%);
  opacity: 0;
}
```

---

## 3. Step-by-Step Execution
1. Open `style.css` at line 2235.
2. Replace `@keyframes toastSlide` with class-based transitions matching the design token easing.
3. Test toast triggering and dismissal in `main.js`.

---

## 4. Verification Checklist
- [ ] Toast enters smoothly along the right edge in 200ms.
- [ ] Toast exits smoothly back to the same right edge.
