# Plan 002: Modal Dialog Transition & Discrete Display

- **Category**: Physicality & Origin
- **Severity**: HIGH
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css:2081-2130`

---

## 1. Problem Statement
The booking modal backdrop and dialog toggle `display: none` → `display: flex`. Because `display` is not animated by default, the modal abruptly appears and snaps off on close with zero exit transition.

---

## 2. Target Specification

Refactor `.modal-backdrop` and `.modal-dialog` in `style.css`:

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(3, 47, 51, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 200ms ease-out, visibility 200ms ease-out;
}

.modal-backdrop.active {
  opacity: 1;
  visibility: visible;
}

.modal-dialog {
  position: relative;
  width: 100%;
  max-width: 620px;
  max-height: 90vh;
  overflow-y: auto;
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 36px;
  box-shadow: var(--shadow-lg);
  transform: translateY(16px) scale(0.97);
  opacity: 0;
  transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease-out;
}

.modal-backdrop.active .modal-dialog {
  transform: translateY(0) scale(1);
  opacity: 1;
}
```

---

## 3. Step-by-Step Execution
1. Open `style.css` at line 2081.
2. Replace `.modal-backdrop` and `.modal-dialog` definitions with the opacity/visibility transition model.
3. Remove redundant `display: none` and `display: flex` switches.
4. Test modal opening and closing by clicking "Book a Clean" buttons.

---

## 4. Verification Checklist
- [ ] Modal fades in smoothly when opened.
- [ ] Modal dialogue scales gently from `0.97` to `1.0`.
- [ ] Modal fades out smoothly on backdrop click or close button press without snapping.
