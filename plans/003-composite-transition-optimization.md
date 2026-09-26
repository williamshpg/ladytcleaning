# Plan 003: Composite Transition Optimization

- **Category**: Performance
- **Severity**: MEDIUM
- **Target File**: `C:\Users\Dell Xps\Documents\Lady T Cleaning\style.css`

---

## 1. Problem Statement
`transition: all` is used on multiple high-frequency interactive elements (`.btn`, `.nav-link`, `.service-card`, `.glass-card`). `all` forces the browser to evaluate every CSS property during transition frames, causing unnecessary paint and style recalculations.

---

## 2. Target Specification

Replace broad `transition: all` with targeted composite properties (`transform`, `opacity`, `box-shadow`, `background-color`, `border-color`):

```css
/* Example for buttons and interactive cards */
.btn-primary-gradient {
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
}

.service-card,
.glass-card {
  transition: transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.nav-link {
  transition: color var(--transition-fast), background-color var(--transition-fast);
}
```

---

## 3. Step-by-Step Execution
1. Search `style.css` for `transition: all`.
2. Replace each occurrence with explicitly specified properties.
3. Verify hover states across navigation links, buttons, and service cards.

---

## 4. Verification Checklist
- [ ] Hover states remain visually identical.
- [ ] No dropped frames during rapid hovering on cards and buttons.
