/** Clerk UI themed to CodeManta tokens (foam / ink / coral / sea). */
export const clerkAppearance = {
  variables: {
    colorPrimary: "#ff6a4d",
    colorDanger: "#c44536",
    colorSuccess: "#1aa38c",
    colorWarning: "#ffc857",
    colorNeutral: "#063540",
    colorText: "#063540",
    colorTextSecondary: "rgba(6, 53, 64, 0.62)",
    colorBackground: "#f4faf7",
    colorInputBackground: "#ffffff",
    colorInputText: "#063540",
    borderRadius: "0.85rem",
    fontFamily: '"Manrope", system-ui, sans-serif',
    fontFamilyButtons: '"Manrope", system-ui, sans-serif',
  },
  elements: {
    card: {
      background: "#ffffff",
      border: "1px solid rgba(6, 53, 64, 0.1)",
      boxShadow: "0 18px 48px rgba(6, 53, 64, 0.1)",
    },
    headerTitle: {
      fontFamily: '"Fraunces", Georgia, serif',
      color: "#063540",
    },
    headerSubtitle: {
      color: "rgba(6, 53, 64, 0.62)",
    },
    formButtonPrimary: {
      background: "#ff6a4d",
      color: "#fff8f5",
      boxShadow: "none",
      "&:hover": {
        background: "#e85a3f",
      },
    },
    footerActionLink: {
      color: "#1aa38c",
    },
    identityPreviewEditButton: {
      color: "#1aa38c",
    },
    formFieldInput: {
      borderColor: "rgba(6, 53, 64, 0.14)",
    },
    socialButtonsBlockButton: {
      borderColor: "rgba(6, 53, 64, 0.14)",
    },
    userButtonPopoverCard: {
      background: "#ffffff",
      border: "1px solid rgba(6, 53, 64, 0.1)",
    },
    userButtonPopoverActionButton: {
      color: "#063540",
    },
    badge: {
      background: "rgba(26, 163, 140, 0.12)",
      color: "#063540",
    },
  },
};
