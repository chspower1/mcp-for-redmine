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
  groups?: Array<{ id: number; name: string }>;
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
  project: { id: number; name: string };
  user?: RedmineUser;
  group?: { id: number; name: string };
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
  trackers?: Array<{ id: number; name: string }>;
  roles?: Array<{ id: number; name: string }>;
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
  project: { id: number; name: string };
  tracker: RedmineTracker;
  status: RedmineStatus;
  priority: RedminePriority;
  author: RedmineUser;
  assigned_to?: RedmineUser;
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
}

export interface RedmineTimeEntry {
  id: number;
  project: { id: number; name: string };
  issue?: { id: number };
  user: RedmineUser;
  activity: RedmineActivity;
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
