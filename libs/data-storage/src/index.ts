export { DomainObjectStorage } from './abstractions/DomainObjectStorage';
export { NotesStorage } from './abstractions/NotesStorage';

export { NaiveGroupsStorage } from './implementations/naive/NaiveGroupsStorage';
export { NaiveNotesStorage } from './implementations/naive/NaiveNotesStorage';

export { KyselyGroupsStorage } from './implementations/sql/kysely/KyselyGroupsStorage';
export { KyselyNotesStorage } from './implementations/sql/kysely/KyselyNotesStorage';

export { SupabaseGroupsStorage } from './implementations/sql/supabase/groups/SupabaseGroupsStorage';
export { SupabaseNotesStorage } from './implementations/sql/supabase/notes/SupabaseNotesStorage';
export { supabase, setSupabase } from './implementations/sql/supabase/db';
