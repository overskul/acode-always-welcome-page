## Acode — Always Welcome Page

A tiny Acode plugin that re-opens the **Welcome** page automatically when the editor is effectively empty (single `default-session` file) — unless the user turns that behavior off. Lightweight, zero-dependency, and configurable.

When **Acode** starts (or when files are switched), if there is only the default session open and Acode's `"rememberFiles"` option is off, the plugin triggers the **Welcome** page.

---

### Features

- Auto-show **Welcome** page when there are no user files opened.

- Option to show the **Welcome** page only when the app is opened (disable on `file-switching`).

---

### Note

This plugin is intentionally focused on showing the **Welcome** page when the editor is empty (the single `default-session` state).

If your goal is to open a new **untitled** file (create an empty editor tab instead of showing Welcome), that is different behavior and is provided by this [plugin](https://acode.app/plugin/x.util.o.u.t.f).

---

### License

- This project under **MIT** license.