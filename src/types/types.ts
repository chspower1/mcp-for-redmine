export interface RedmineReference {
  id: number;
  name: string;
}

export interface RedmineUser {
  id: number;
  login: string;
  admin?: boolean;
  firstname: string;
  lastname: string;
  mail?: string;
  created_on: string;
  updated_on?: string;
  last_login_on?: string;
  passwd_changed_on?: string;
  twofa_scheme?: string | null;
  api_key?: string;
  status?: number;
  memberships?: RedmineMembership[];
  groups?: RedmineReference[];
  name?: string;
}

export interface RedmineRole {
  id: number;
  name: string;
  inherited?: boolean;
  assignable?: boolean;
  permissions?: string[];
}

export interface RedmineMembership {
  id: number;
  project: RedmineReference;
  user?: RedmineUser;
  group?: RedmineReference;
  roles: RedmineRole[];
}

export interface RedmineProject {
  id: number;
  name: string;
  identifier: string;
  description: string;
  status: number;
  is_public: boolean;
  created_on: string;
  updated_on: string;
  parent?: { id: number; identifier: string; name: string };
  children?: RedmineProject[];
  memberships?: RedmineMembership[];
}

export interface RedmineTracker {
  id: number;
  name: string;
}

export interface RedmineStatus {
  id: number;
  name: string;
  is_closed?: boolean;
}

export interface RedminePriority {
  id: number;
  name: string;
  is_default?: boolean;
}

export interface RedmineCustomField {
  id: number;
  name: string;
  customized_type: string;
  field_format: string;
  regexp?: string;
  min_length?: number;
  max_length?: number;
  is_required?: boolean;
  is_filter?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  default_value?: any;
  visible?: boolean;
  trackers?: RedmineReference[];
  roles?: RedmineReference[];
  possible_values?: Array<{ value: string; label: string }>;
}

export interface RedmineJournalDetail {
  property: string;
  name: string;
  old_value: any;
  new_value: any;
}

export interface RedmineJournal {
  id: number;
  user: RedmineUser;
  notes: string;
  created_on: string;
  private_notes: boolean;
  details: RedmineJournalDetail[];
}

export interface RedmineAttachment {
  id: number;
  filename: string;
  filesize: number;
  content_type: string;
  description: string;
  author: RedmineUser;
  created_on: string;
  content_url: string;
}

export interface RedmineRelation {
  id: number;
  issue_id: number;
  issue_to_id: number;
  relation_type: string;
  delay?: number;
}

export interface RedmineIssue {
  id: number;
  project: RedmineReference;
  tracker: RedmineReference;
  status: RedmineReference;
  priority: RedmineReference;
  author: RedmineReference;
  assigned_to?: RedmineReference;
  category?: RedmineReference;
  subject: string;
  description: string;
  start_date?: string;
  due_date?: string;
  done_ratio: number;
  is_private: boolean;
  estimated_hours?: number;
  total_estimated_hours?: number;
  spent_hours: number;
  total_spent_hours: number;
  custom_fields?: Array<{ id: number; name: string; value: any; multiple?: boolean }>;
  created_on: string;
  updated_on: string;
  closed_on?: string;
  journals?: RedmineJournal[];
  attachments?: RedmineAttachment[];
  relations?: RedmineRelation[];
  children?: RedmineIssue[];
  watchers?: RedmineUser[];
}

export interface RedmineActivity {
  id: number;
  name: string;
  is_default?: boolean;
}

export interface RedmineTimeEntry {
  id: number;
  project: RedmineReference;
  issue?: { id: number };
  user: RedmineReference;
  activity: RedmineReference;
  hours: number;
  comments?: string;
  spent_on: string;
  created_on: string;
  updated_on: string;
}

export interface RedmineGroup {
  id: number;
  name: string;
  users?: RedmineUser[];
  memberships?: RedmineMembership[];
}

export interface RedmineIssueCategory {
  id: number;
  project: RedmineReference;
  name: string;
  assigned_to?: RedmineReference;
}

export interface RedmineVersion {
  id: number;
  project: RedmineReference;
  name: string;
  description: string;
  status: "open" | "locked" | "closed";
  due_date?: string;
  sharing: "none" | "descendants" | "hierarchy" | "tree" | "system";
  wiki_page_title?: string;
  created_on: string;
  updated_on: string;
}

export interface RedmineNews {
  id: number;
  project: RedmineReference;
  author: RedmineUser;
  title: string;
  summary: string;
  description: string;
  created_on: string;
}

export interface RedmineWikiPage {
  title: string;
  text: string;
  version: number;
  author: RedmineUser;
  comments?: string;
  created_on: string;
  updated_on: string;
  attachments?: RedmineAttachment[];
}

export interface RedmineQuery {
  id: number;
  name: string;
  is_public: boolean;
  project_id?: number | null;
  user_id?: number;
}
