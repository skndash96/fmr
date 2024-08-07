import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
    'https://ylbypbeyprbfulineext.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsYnlwYmV5cHJiZnVsaW5lZXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5NTE3MzYsImV4cCI6MjAzODUyNzczNn0.t7Sew3w0QY8KoO73Jbslxtoco2HGKqrSuLLQt5XpPDE'
);

export default supabase;