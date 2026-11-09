/**
 * Pre-hydration bootstrap: sets the theme (stored choice, otherwise the
 * system preference) and the lang/dir attributes before first paint, so
 * there is no light/dark or layout flash. Served as an external file from
 * public/ so the Content-Security-Policy can avoid inline app scripts.
 * Mirrors lib/theme.ts and lib/locale.ts; it cannot import them because it
 * runs before hydration.
 */
(function () {
  try {
    var root = document.documentElement;
    var storedTheme = localStorage.getItem('theme');
    var theme = storedTheme;
    if (theme !== 'light' && theme !== 'dark') {
      theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    root.classList.remove('dark', 'light');
    root.classList.add(theme);

    var storedLocale = localStorage.getItem('mzilab_locale');
    if (storedLocale) {
      root.lang = storedLocale;
      root.dir = storedLocale === 'ar' ? 'rtl' : 'ltr';
    } else {
      root.dir = 'ltr';
    }
  } catch (e) {}
})();
