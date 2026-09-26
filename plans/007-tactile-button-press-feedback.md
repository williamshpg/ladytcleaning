# Plan 007: Tactile Button Press Feedback

- **Category**: Missed Opportunity (Feedback)
- **Severity**: LOW
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css:160-190`

---

## 1. Problem Statement
Primary and secondary buttons currently reset `translateY(0)` on `:active`, giving minimal physical tactile response to user click/tap interactions.

---

## 2. Target Specification

Add subtle scale compression (`scale(0.97)`) on `:active` with fast recovery:

```css
@media (hover: hover) and (pointer: fine) {
  .btn:active,
  .btn-primary-gradient:active,
  .btn-outline-teal:active,
  .btn-whatsapp-hero:active,
  .detail-whatsapp-btn:active {
    transform: scale(0.97) !important;
    transition: transform 120ms cubic-bezier(0.2, 0.8, 0.4, 1) !important;
  }
}
```

---

## 3. Step-by-Step Execution
1. Open `style.css` at line 160.
2. Add the `:active` scale compression rule.
3. Test clicking primary CTA buttons, WhatsApp buttons, and modal trigger buttons.

---

## 4. Verification Checklist
- [ ] Clicking any button provides immediate, subtle tactile compression.
- [ ] Button smoothly springs back to rest state on release.
