## Always Welcome Page

A tiny Acode plugin that re-opens the **Welcome** page automatically when the editor is effectively empty (single `default-session` file) — unless the user turns that behavior off. Lightweight, zero-dependency, and configurable.

When **Acode** starts (or when files are switched), if there is only the default session open and Acode's `"rememberFiles"` option is off, the plugin triggers the **Welcome** page.

---

### Features

- Auto-show **Welcome** page when there are no user files opened.

- Option to show the **Welcome** page only when the app is opened (disable on `file-switching`).

- Option to auto close the **Welcome** page when switching to another file `(enabled by default)`.

---

### Note

This plugin is intentionally focused on showing the **Welcome** page when the editor is empty (the single `default-session` state).

If your goal is to open a new **untitled** file (create an empty editor tab instead of showing Welcome), that is different behavior and is provided by this [plugin](https://acode.app/plugin/x.util.o.u.t.f).

---

### API `(v0.0.5)`
New API introduced starting from version `v0.0.5`.

#### Accessing the API

```js
const WelcomePage = acode.require("AlwaysWelcomePage");
```

#### Properties

| Property | Type | Description |
|---|---|---|
| `WELCOME_TAB_ID` | `string` | The file ID of the welcome tab (`"welcome-tab"`). |
| `isOnlyWhenOpenApp` | `boolean` | Whether the welcome page is set to show on app start only. |
| `isAutoClose` | `boolean` | Whether the welcome page auto-closes when switching to another file. |

---

#### Methods

##### `canShow` → `boolean`

Returns `true` if the welcome page is eligible to be shown right now.

```js
if (WelcomePage.canShow) {
  WelcomePage.show();
}
```

---

##### `show()` → `void`

Shows the welcome page by executing the `welcome` command.

```js
WelcomePage.show();
```

---

##### `canClose` → `boolean`

Returns `true` if the welcome page is currently open and can be closed.

```js
if (WelcomePage.canClose) {
  WelcomePage.close();
}
```

---

##### `close()` → `void`

Removes the welcome page tab from the editor.

```js
WelcomePage.close();
```

---

#### Example

```js
const WelcomePage = acode.require("AlwaysWelcomePage");

// Show the welcome page if conditions are met
if (WelcomePage.canShow) {
  WelcomePage.show();
}

// Close it programmatically
if (WelcomePage.canClose) {
  WelcomePage.close();
}

// Read current settings
console.log(WelcomePage.isAutoClose);        // true/false
console.log(WelcomePage.isOnlyWhenOpenApp);  // true/false
```

---

### License

- This project under **MIT** license.