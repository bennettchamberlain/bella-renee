# Get Sanity Write Token

The script needs a token with **Editor** or **Administrator** permissions to create products.

## Steps:

1. **Go to Sanity Manage:** https://www.sanity.io/manage/project/5yhn9pbe

2. **Navigate to:** API → Tokens

3. **Click:** "Add API token"

4. **Settings:**
   - **Name:** `Product Import Script`
   - **Permissions:** `Editor` (or `Administrator`)
   - **Click:** "Add token"

5. **Copy the token** (it will only show once!)

6. **Add to .env.local:**
   ```bash
   cd /home/bennett/Development/bellarenee/bella-renee/frontend
   echo 'SANITY_API_WRITE_TOKEN="your-token-here"' >> .env.local
   ```

7. **Update the import script:**
   ```bash
   # Edit scripts/import-products.mjs
   # Replace the token line with:
   token: process.env.SANITY_API_WRITE_TOKEN || 'paste-token-here',
   ```

8. **Run the script:**
   ```bash
   cd /home/bennett/Development/bellarenee/bella-renee
   node scripts/import-products.mjs
   ```

---

## Alternative: I can do it manually via Sanity Studio

If you want to skip the script and just use the Studio UI:
1. Open http://localhost:3333
2. I'll guide you through creating products manually
3. Or give me the write token and I'll run the script!

What would you prefer?
