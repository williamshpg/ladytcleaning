# Plan 006: FAQ Accordion Smooth Expansion

- **Category**: Missed Opportunity (State Indication & Jarring Change)
- **Severity**: MEDIUM
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css:1803-1840`

---

## 1. Problem Statement
Clicking an FAQ `<details>` item abruptly pops the answer open at 0ms. When collapsed, it cuts off instantly without transition.

---

## 2. Target Specification

Implement a CSS grid height transition on the answer container:

```css
.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 200ms ease-out, padding 200ms ease-out;
  padding-top: 0;
  overflow: hidden;
}

.faq-answer > p {
  min-height: 0;
  opacity: 0;
  transition: opacity 160ms ease-out;
}

.faq-item[open] .faq-answer {
  grid-template-rows: 1fr;
  padding-top: 14px;
}

.faq-item[open] .faq-answer > p {
  opacity: 1;
}

.faq-chevron {
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

---

## 3. Step-by-Step Execution
1. Open `style.css` at line 1803.
2. Update `.faq-answer` and `.faq-item[open] .faq-answer` with grid row expansion.
3. Verify clicking `<summary>` smoothly expands and collapses FAQ items.

---

## 4. Verification Checklist
- [ ] Answer content expands without layout jumping.
- [ ] Chevron rotates smoothly 180 degrees.
