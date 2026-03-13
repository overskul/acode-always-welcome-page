const appSettings = acode.require("settings");

export default class AlwaysWelcomePage {
  onSwitchFile = this.handleSwitchFile.bind(this);

  constructor() {
    appSettings.value[__PLUGIN__.id] = {
      showOnlyWhenOpenApp: false,
      ...(appSettings.value[__PLUGIN__.id] ?? {})
    };
    appSettings.update(false);
  }

  get settings() {
    return appSettings.value[__PLUGIN__.id];
  }

  async init(baseUrl, $page, { cacheFileUrl, cacheFile, firstInit }) {
    this.handleWelcomePageShowing();
    if (this.settings.showOnlyWhenOpenApp) return;
    editorManager.on("switch-file", this.onSwitchFile);
  }

  async destroy() {
    delete appSettings.value[__PLUGIN__.id];
    if (!this.settings.showOnlyWhenOpenApp) {
      editorManager.off("switch-file", this.onSwitchFile);
    }
  }

  get canShowWelcomePage() {
    const { files } = editorManager;
    const isRememberFiles = appSettings.get("rememberFiles");
    return !isRememberFiles && files.length === 1 && files[0]?.id === "default-session";
  }

  async handleWelcomePageShowing() {
    const { files } = editorManager;
    if (!this.canShowWelcomePage) return;
    setTimeout(() => acode.exec("welcome"), 0);
  }

  async handleSwitchFile() {
    await this.handleWelcomePageShowing();
  }

  get pSettings() {
    return {
      list: [
        {
          key: "ONLY-WHEN-OPEN-APP",
          text: "Show Welcome Page When Open App Only",
          checkbox: this.settings.showOnlyWhenOpenApp
        }
      ],
      cb: (key, value) => {
        this.settings.showOnlyWhenOpenApp = !this.settings.showOnlyWhenOpenApp;
        appSettings.update(false);
      }
    };
  }
}
