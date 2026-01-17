export const themeColors = {
  // --- Main Brand Colors ---
  primary: "#1D546D", // Deep Petrol - Use this for the CHARTS (Bars/Lines) and primary buttons
  secondary: "#5F9598", // Muted Sage - Use for secondary data series
  accent: "#0F2854", // Deep Navy - A dark accent for active states or emphasis

  // --- Layout Colors (The Fix) ---
  sidebarBg: "#0F2854", // Midnight Green - DARK SIDEBAR (Crucial for contrast)
  sidebarText: "#FFFFFF", // White text on the dark sidebar
  headerBg: "#FFFFFF", // Keep header white, but the dark sidebar will balance it

  // --- Surface & Background ---
  surface: "#FFFFFF", // Cards remain white
  background: "#E8ECEF", // Darker Grey - Made this darker than before to contrast with cards
  border: "#CFD8DC", // Blue-grey border for subtle definition
  success: "#2E7D32", // Forest Green - Standard accessible success color (Preserved)

  // --- Text ---
  textPrimary: "#061E29", // Midnight Green
  textSecondary: "#0F2854", // Blue Grey
};

export const initializeTheme = () => {
  const root = document.documentElement;
  // Set CSS Variables from the single source of truth
  root.style.setProperty("--primary-color", themeColors.primary);
  root.style.setProperty("--secondary-color", themeColors.secondary);
  root.style.setProperty("--accent-color", themeColors.accent);
  root.style.setProperty("--sidebar-bg", themeColors.sidebarBg);
  root.style.setProperty("--sidebar-text", themeColors.sidebarText);
  root.style.setProperty("--header-bg", themeColors.headerBg);
  root.style.setProperty("--surface-color", themeColors.surface);
  root.style.setProperty("--background-color", themeColors.background);
  root.style.setProperty("--border-color", themeColors.border);
  root.style.setProperty("--success-color", themeColors.success);
  root.style.setProperty("--text-primary", themeColors.textPrimary);
  root.style.setProperty("--text-secondary", themeColors.textSecondary);
};
