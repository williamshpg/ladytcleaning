# Plan 004: Restrain WhatsApp Floating Pulse

- **Category**: Purpose & Frequency
- **Severity**: MEDIUM
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css:2700-2720`

---

## 1. Problem Statement
The floating WhatsApp button features a pseudo-element running `@keyframes whatsappPulse` infinitely every 2 seconds. Infinite pulsing creates visual distraction, drains device battery, and violates the animation restraint principle.

---

## 2. Target Specification

Remove the continuous infinite pulse ring and replace with a subtle hover expansion and press state:

```css
/* Remove continuous keyframe animation */
.floating-whatsapp-ring {
  display: none;
}

.floating-whatsapp-btn {
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.floating-whatsapp-btn:hover {
  transform: translateY(-3px) scale(1.03);
  box-shadow: 0 12px 30px rgba(37, 211, 102, 0.5), 0 6px 18px rgba(0, 0, 0, 0.2);
}

.floating-whatsapp-btn:active {
  transform: translateY(0) scale(0.97);
}
```

---

## 3. Step-by-Step Execution
1. Open `style.css` at line 2700.
2. Remove or disable `.floating-whatsapp-ring` animation rule and `@keyframes whatsappPulse`.
3. Add `:active` tactile press feedback.

---

## 4. Verification Checklist
- [ ] Floating WhatsApp button rests quietly without infinite glowing rings.
- [ ] Hover and press interactions feel tactile and responsive.
