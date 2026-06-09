const appSettings      = acode.require("settings");
const WELCOME_PAGE_ID  = "welcome-tab";
const PLUGIN_DEFINE_ID = "AlwaysWelcomePage"

export default class AlwaysWelcomePage {
  firstInit = false;

  constructor() {
    appSettings.value[__PLUGIN__.id] = {
      showOnlyWhenOpenApp: false,
      autoclose:           true,
      ...(appSettings.value[__PLUGIN__.id] ?? {})
    };
    appSettings.update(false);
  }

  get settings() {
    return appSettings.value[__PLUGIN__.id];
  }

  async init() {
    this.showWelcomePage();
    this.firstInit = true;

    editorManager.on("switch-file", this.onSwitchFile);

    const settings = this.settings;
    acode.define(
      PLUGIN_DEFINE_ID,
      {
        WELCOME_TAB_ID: WELCOME_PAGE_ID,
        canShow: this.canShowWelcomePage,
        show: this.showWelcomePage.bind(this),
        canClose: this.canCloseWelcomePage,
        close: this.closeWelcomePage.bind(this),
        get isOnlyWhenOpenApp() { return settings.showOnlyWhenOpenApp },
        get isAutoClose()       { return settings.autoclose }
      }
    );
  }

  async destroy() {
    if (!appSettings.value.pluginsDisabled[__PLUGIN__.id]) {
      delete appSettings.value[__PLUGIN__.id];
    }
    editorManager.off("switch-file", this.onSwitchFile);
    acode.define(PLUGIN_DEFINE_ID, void 0);
  }

  get canShowWelcomePage() {
    const { files } = editorManager;
    return !this.settings.showOnlyWhenOpenApp
      && files.length === 1
      && files[0]?.id === "default-session";
  }

  showWelcomePage() {
    setTimeout(() => acode.exec("welcome"), 0);
  }

  get canCloseWelcomePage() {
    const { files } = editorManager;
    return this.firstInit && (files.findIndex(f => f.id === WELCOME_PAGE_ID)) !== -1;
  }

  closeWelcomePage() {
    const { files } = editorManager;
    files
      .find(f => f.id === WELCOME_PAGE_ID)
      .remove();
  }

  onSwitchFile = this.handleSwitchFile.bind(this);
  async handleSwitchFile(file) {
    const isWelcomePageActive = file.id === WELCOME_PAGE_ID;

    if (this.canShowWelcomePage) {
      this.showWelcomePage();
    } else if (
      this.canCloseWelcomePage &&
      this.settings.autoclose  &&
      !isWelcomePageActive
    ) {
      this.closeWelcomePage();
    }
  }

  get pSettings() {
    const ONLY_WHEN_OPEN_APP = "ONLY-WHEN-OPEN-APP";
    const AUTO_CLOSE         = "AUTO-CLOSE";

    return {
      list: [
        {
          key: ONLY_WHEN_OPEN_APP,
          text: "Show Welcome-Page on app start only",
          checkbox: this.settings.showOnlyWhenOpenApp
        },
        {
          key: AUTO_CLOSE,
          text: "Auto close Welcome-Page when switch to another file",
          checkbox: this.settings.autoclose
        }
      ],
      cb: (key, value) => {
        if (key === ONLY_WHEN_OPEN_APP)
          this.settings.showOnlyWhenOpenApp = !this.settings.showOnlyWhenOpenApp;
        if (key === AUTO_CLOSE)
          this.settings.autoclose           = !this.settings.autoclose;

        appSettings.update();
      }
    };
  }
}
