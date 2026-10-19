# scroll-top-fab

A framework-free `<scroll-top-fab>` web component: a floating button that
appears in the bottom-right corner after the page is scrolled down, and smoothly
scrolls back to the top when clicked.

- No dependencies: plain JavaScript and CSS (no Bootstrap or Font Awesome
  needed), with styles isolated in a shadow root.
- Picks up Bootstrap's `--bs-primary` color automatically when the page uses
  Bootstrap 5, and falls back to blue otherwise.
- Accessible: labelled button, keyboard focus ring, and an instant jump instead
  of the smooth scroll for users who prefer reduced motion.

Open `demo.html` in a browser to try it.

## Installation

### From a CDN (no install)

jsDelivr serves files straight from a GitHub tag:

```html
<scroll-top-fab></scroll-top-fab>

<script src="https://cdn.jsdelivr.net/gh/RaphaPetrereEtapa/scroll-top-fab@1.0.0/scroll-top-fab.js"></script>
```

### From npm/GitHub

```sh
npm install github:RaphaPetrereEtapa/scroll-top-fab#v1.0.0
```

Then serve `node_modules/@raphapetrereetapa/scroll-top-fab/scroll-top-fab.js`
like any other asset, e.g. in a Laravel view that has a `module()` helper for
`node_modules`:

```blade
<scroll-top-fab></scroll-top-fab>

@push('scripts')
  <script src="{{ module('@raphapetrereetapa/scroll-top-fab/scroll-top-fab.js') }}"></script>
@endpush
```

The script can be loaded with or without `type="module"`, and loading it twice
is harmless.

## Attributes

| Attribute   | Default          | Description                                             |
| ----------- | ---------------- | ------------------------------------------------------- |
| `threshold` | `400`            | Scroll distance, in px, after which the button appears. |
| `label`     | `Voltar ao topo` | Accessible name and tooltip of the button.              |

```html
<scroll-top-fab threshold="600" label="Back to top"></scroll-top-fab>
```

## Styling

Set these CSS custom properties on the element (or any ancestor):

| Property                        | Default                              |
| ------------------------------- | ------------------------------------ |
| `--scroll-top-fab-bg`           | `var(--bs-primary, #0d6efd)`         |
| `--scroll-top-fab-color`        | `#fff`                               |
| `--scroll-top-fab-hover-bg`     | same as `--scroll-top-fab-bg`        |
| `--scroll-top-fab-hover-filter` | `brightness(0.9)` (darkens on hover) |
| `--scroll-top-fab-offset`       | `1rem` (distance from the corner)    |
| `--scroll-top-fab-radius`       | `0.375rem`                           |
| `--scroll-top-fab-z-index`      | `1030`                               |

For deeper changes, the button is exposed as a shadow part:

```css
scroll-top-fab::part(button) {
  border-radius: 50%;
}
```

### Custom icon

The default icon is an inline SVG chevron. Put your own icon inside the element
to replace it, e.g. Font Awesome:

```html
<scroll-top-fab>
  <i class="fa-solid fa-chevron-up"></i>
</scroll-top-fab>
```

## Example: Portal do Professor

Replacing `resources/views/components/fab.blade.php` and
`public/assets/js/components/fab.js` while keeping the `.btn-blue` colors:

```blade
<scroll-top-fab
  style="
    --scroll-top-fab-bg: #14346b;
    --scroll-top-fab-hover-bg: #0b5ed7;
    --scroll-top-fab-hover-filter: none;
  "
></scroll-top-fab>

@push('scripts')
  <script src="{{ module('@raphapetrereetapa/scroll-top-fab/scroll-top-fab.js') }}"></script>
@endpush
```

## Releasing a new version

1. Bump `version` in `package.json` and in the banner at the top of
   `scroll-top-fab.js`, then commit.
2. Tag the commit and push the tag:
   ```sh
   git tag v1.1.0
   git push origin main --tags
   ```
3. Update the CDN URL (`@1.1.0`) or reinstall `#v1.1.0` where it is used.

## License

MIT
