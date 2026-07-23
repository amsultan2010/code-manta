# Clerk ↔ Supabase (Development)

Domain saved in the repo:

`perfect-shrew-33.clerk.accounts.dev`

## Do these two clicks (cannot be fully automated)

1. **Clerk (Development instance)**  
   Open [Clerk Connect with Supabase](https://dashboard.clerk.com/setup/supabase) and finish the setup for this instance.  
   That adds the `role: "authenticated"` claim to session tokens.

2. **Supabase**  
   Project **CodeManta** → **Authentication** → **Sign In / Third-party** → add **Clerk**  
   Use domain: `perfect-shrew-33.clerk.accounts.dev`

Local reference config is in `supabase/config.toml`.
