# jocarsa|seashell v1.2.1

**jocarsa|seashell** is a lightweight JavaScript library for enhancing `<select>` elements with a custom, interactive dropdown interface. It simplifies user interactions with select menus and allows for a searchable dropdown.

---

## Features
- **Custom Dropdown Interface**: Transforms standard `<select>` elements into styled, interactive dropdowns.
- **Searchable Dropdown**: Users can filter options dynamically by typing.
- **Responsive Design**: Adapts to any container width.
- **Lightweight**: Minimal performance overhead.

---

## Installation

You can use **jocarsa|seashell** by either downloading the files or linking them directly from GitHub Pages.

### Option 1: Download the Files

1. Download the latest version of the library from the [GitHub Releases](https://github.com/yourusername/jocarsa-seashell/releases).
2. Include the **CSS** and **JavaScript** files in your project:

   ```html
   <link rel="stylesheet" href="path/to/seashell.css">
   <script src="path/to/seashell.js"></script>
   ```

### Option 2: Link from GitHub Pages

You can directly link the hosted files from GitHub Pages (replace `yourusername` and `repository` with the actual details):

1. Add the **CSS**:

   ```html
   <link rel="stylesheet" href="https://yourusername.github.io/repository/seashell.css">
   ```

2. Add the **JavaScript**:

   ```html
   <script src="https://yourusername.github.io/repository/seashell.js"></script>
   ```

---

## Usage

Simply add a `<select>` element to your HTML, and the library will automatically enhance it once the DOM is loaded.

```html
<select data-placeholder="Select an option...">
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

The library will transform the `<select>` into a styled, interactive dropdown with a searchable interface.

---

## Example

Here is a basic example of how to use **jocarsa|seashell**:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>jocarsa|seashell Demo</title>
  <link rel="stylesheet" href="https://jocarsa.github.io/jocarsa-seashell/jocarsa | seashell.css">
</head>
<body>
  <select data-placeholder="Select an option...">
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </select>
  <script src="https://yourusername.github.io/jocarsa-seashell/jocarsa | seashell.js"></script>
</body>
</html>
```

---

## Customization

### Placeholder Text
Customize the placeholder text using the `data-placeholder` attribute:

```html
<select data-placeholder="Choose your option...">
  <!-- Options here -->
</select>
```

### CSS Styling
Update the provided `seashell.css` file to match your design requirements. For example, you can modify the `.seashell-display` class to adjust the input box appearance.

---

## Browser Compatibility

- Modern browsers (Chrome, Edge, Firefox, Safari)
- Internet Explorer is not supported.

---

## Changelog

### v1.2.1
- Fixed structured wrapper insertion logic.

### v1.2.0
- Updated CSS for structured wrapper with dropdown.

---

## License

This project is licensed under the GPVv3 License - see the file for details.

---

## Contribution

We welcome contributions! Feel free to submit a pull request or open an issue.

---

## Author

Developed by **jocarsa**.
