(function (global) {
  const STORAGE_KEY = "uchinokoDiarySiteLanguage";
  const SUPPORTED_LANGUAGES = [
    { code: "ja", label: "日本語" },
    { code: "en", label: "English" },
    { code: "es", label: "Español" },
    { code: "pt", label: "Português" },
    { code: "zh", label: "中文" },
    { code: "ko", label: "한국어" },
    { code: "th", label: "ไทย" },
    { code: "id", label: "Bahasa Indonesia" },
  ];
  const SELECTOR_LABELS = {
    ja: "表示言語",
    en: "Language",
    es: "Idioma",
    pt: "Idioma",
    zh: "语言",
    ko: "언어",
    th: "ภาษา",
    id: "Bahasa",
  };

  function normalizeLanguage(value) {
    if (value == null) return null;
    const normalized = String(value).trim().toLowerCase().replace(/_/g, "-");
    if (!normalized) return null;
    const baseCode = normalized.split("-")[0];
    return SUPPORTED_LANGUAGES.some((language) => language.code === baseCode)
      ? baseCode
      : null;
  }

  function format(template, values) {
    return String(template ?? "").replace(/\{(\w+)\}/g, (_, key) => {
      if (values && Object.prototype.hasOwnProperty.call(values, key)) {
        return values[key];
      }
      return `{${key}}`;
    });
  }

  function readStoredLanguage() {
    try {
      return normalizeLanguage(global.localStorage.getItem(STORAGE_KEY));
    } catch (_) {
      return null;
    }
  }

  function writeStoredLanguage(language) {
    try {
      global.localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {}
  }

  function readQueryLanguage() {
    try {
      const url = new URL(global.location.href);
      return normalizeLanguage(url.searchParams.get("lang"));
    } catch (_) {
      return null;
    }
  }

  function resolveInitialLanguage() {
    return (
      readQueryLanguage() ||
      readStoredLanguage() ||
      normalizeLanguage(global.navigator.language) ||
      "en"
    );
  }

  function updateCurrentUrl(language) {
    try {
      const url = new URL(global.location.href);
      url.searchParams.set("lang", language);
      global.history.replaceState({}, "", url);
    } catch (_) {}
  }

  function updateLocalLinks(language) {
    const anchors = global.document.querySelectorAll("a[href]");
    anchors.forEach((anchor) => {
      const rawHref = anchor.dataset.baseHref || anchor.getAttribute("href");
      if (!rawHref) return;
      if (!anchor.dataset.baseHref) {
        anchor.dataset.baseHref = rawHref;
      }
      if (/^(mailto:|tel:|https?:\/\/|#)/i.test(rawHref)) return;

      const [pathAndQuery, hashFragment = ""] = rawHref.split("#");
      const [path, queryString = ""] = pathAndQuery.split("?");
      if (!path.endsWith(".html")) return;

      const params = new URLSearchParams(queryString);
      params.set("lang", language);
      const nextHref = `${path}?${params.toString()}${
        hashFragment ? `#${hashFragment}` : ""
      }`;
      anchor.setAttribute("href", nextHref);
    });
  }

  function renderLanguageControls(language, onChange) {
    const wrapper = global.document.createElement("div");
    wrapper.className = "site-language";

    const icon = global.document.createElement("span");
    icon.className = "site-language-icon";
    icon.textContent = "🌐";
    wrapper.appendChild(icon);

    const label = global.document.createElement("span");
    label.className = "site-language-label";
    label.textContent = SELECTOR_LABELS[language] || SELECTOR_LABELS.en;
    wrapper.appendChild(label);

    const select = global.document.createElement("select");
    select.className = "site-language-select";
    select.setAttribute(
      "aria-label",
      SELECTOR_LABELS[language] || SELECTOR_LABELS.en,
    );

    SUPPORTED_LANGUAGES.forEach((optionLanguage) => {
      const option = global.document.createElement("option");
      option.value = optionLanguage.code;
      option.textContent = optionLanguage.label;
      option.selected = optionLanguage.code === language;
      select.appendChild(option);
    });

    select.addEventListener("change", (event) => {
      onChange(event.target.value);
    });
    wrapper.appendChild(select);

    return wrapper;
  }

  function applyTranslations(translations, language) {
    const fallback =
      translations[language] || translations.en || translations.ja || {};
    const japaneseFallback = translations.ja || {};
    const resolvedBundle = new Proxy(fallback, {
      get(target, prop) {
        if (Reflect.has(target, prop)) {
          return Reflect.get(target, prop);
        }
        return japaneseFallback[prop];
      },
    });

    global.document.documentElement.lang = language;

    if (resolvedBundle.metaTitle) {
      global.document.title = resolvedBundle.metaTitle;
    }

    const textNodes = global.document.querySelectorAll("[data-i18n]");
    textNodes.forEach((node) => {
      const key = node.dataset.i18n;
      const value = resolvedBundle[key];
      if (value == null) return;
      node.textContent = value;
    });

    const htmlNodes = global.document.querySelectorAll("[data-i18n-html]");
    htmlNodes.forEach((node) => {
      const key = node.dataset.i18nHtml;
      const value = resolvedBundle[key];
      if (value == null) return;
      node.innerHTML = value;
    });

    return resolvedBundle;
  }

  function applyPage(options) {
    let currentLanguage =
      normalizeLanguage(options.initialLanguage) || resolveInitialLanguage();
    let currentBundle = null;

    function rerender() {
      currentBundle = applyTranslations(options.translations, currentLanguage);
      updateCurrentUrl(currentLanguage);
      writeStoredLanguage(currentLanguage);
      updateLocalLinks(currentLanguage);

      const mounts = global.document.querySelectorAll("[data-site-controls]");
      mounts.forEach((mount) => {
        mount.replaceChildren(
          renderLanguageControls(currentLanguage, changeLanguage),
        );
      });

      if (typeof options.onRender === "function") {
        options.onRender({
          language: currentLanguage,
          bundle: currentBundle,
          t(key, values) {
            return format(currentBundle[key], values);
          },
        });
      }
    }

    function changeLanguage(nextLanguage) {
      const normalized = normalizeLanguage(nextLanguage);
      if (!normalized || normalized === currentLanguage) return;
      currentLanguage = normalized;
      rerender();
    }

    rerender();

    return {
      get language() {
        return currentLanguage;
      },
      get bundle() {
        return currentBundle;
      },
      t(key, values) {
        return format(currentBundle[key], values);
      },
      setLanguage: changeLanguage,
    };
  }

  global.UchinokoSiteLanguage = {
    applyPage,
    format,
    normalizeLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
})(window);
