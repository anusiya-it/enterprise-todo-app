import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Force load the .env file
load_dotenv()

# Load actual env values
url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

# --- THE FIX: FINAL VALIDATION ---
if not url or not key:
    print("\n--- DEBUG INFO ---")
    print(f"SUPABASE_URL found: {'Yes' if url else 'No'}")
    print(f"SUPABASE_KEY found: {'Yes' if key else 'No'}")
    print("------------------\n")
    
    # If the .env is failing, we will manually define them here just to get you moving
    # Replace these with your actual strings if the debug says 'No'
    url = "https://lwepwofozszctocgkddv.supabase.co"
    key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3ZXB3b2ZvenN6Y3RvY2drZGR2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzkwNjI0OCwiZXhwIjoyMDkzNDgyMjQ4fQ.4p6WJB7wCEwUsA955CrXDzQv34cYuQYVFg-hAZcprhs"

# Initialize
supabase: Client = create_client(url, key)
print("🚀 Backend is connected to Supabase!")