import { z } from 'zod';
import {
  listTimeEntries,
  getTimeEntry,
  createTimeEntry,
  updateTimeEntry,
  deleteTimeEntry,
} from '../api/time-entries.api';
import { Tool } from '../types/types';

export const listTimeEntriesTool: Tool = {
  name: 'redmine_list-time-entries',
  description: 'Retrieves a list of time entries, with optional filters.',
  parameters: z.object({
    user_id: z.number().optional().describe('Filter by user ID.'),
    project_id: z.number().optional().describe('Filter by project ID.'),
    issue_id: z.number().optional().describe('Filter by issue ID.'),
  }),
  execute: async (params) => {
    try {
      return await listTimeEntries(params);
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(', ') || error.message;
      throw new Error(`Failed to list time entries: ${errorMessage}`);
    }
  },
};

export const getTimeEntryTool: Tool = {
  name: 'redmine_get-time-entry',
  description: 'Retrieves a single time entry by its ID.',
  parameters: z.object({
    id: z.number().describe('The ID of the time entry.'),
  }),
  execute: async ({ id }) => {
    try {
      const result = await getTimeEntry(id);
      return result.time_entry;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(', ') || error.message;
      throw new Error(`Failed to retrieve time entry ${id}: ${errorMessage}`);
    }
  },
};

export const createTimeEntryTool: Tool = {
  name: 'redmine_create-time-entry',
  description: 'Creates a new time entry.',
  parameters: z.object({
    hours: z.number().describe('The number of hours spent.'),
    issue_id: z.number().optional().describe('The ID of the issue to log time for.'),
    project_id: z.number().optional().describe('The ID of the project to log time for (if no issue_id).'),
    spent_on: z.string().optional().describe('The date the time was spent (YYYY-MM-DD). Defaults to today.'),
    activity_id: z.number().optional().describe('The ID of the activity.'),
    comments: z.string().optional().describe('Comments for the time entry.'),
  }).refine(data => data.issue_id || data.project_id, {
    message: 'Either issue_id or project_id must be provided.',
  }),
  execute: async (timeEntryData) => {
    try {
      const result = await createTimeEntry({ time_entry: timeEntryData });
      return result.time_entry;
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(', ') || error.message;
      throw new Error(`Failed to create time entry: ${errorMessage}`);
    }
  },
};

export const updateTimeEntryTool: Tool = {
  name: 'redmine_update-time-entry',
  description: 'Updates a time entry.',
  parameters: z.object({
    id: z.number().describe('The ID of the time entry to update.'),
    hours: z.number().optional().describe('The new number of hours.'),
    spent_on: z.string().optional().describe('The new date (YYYY-MM-DD).'),
    comments: z.string().optional().describe('New comments.'),
  }),
  execute: async ({ id, ...updateData }) => {
    try {
      await updateTimeEntry(id, { time_entry: updateData });
      return { success: true, message: `Time entry ${id} updated successfully.` };
    } catch (error: any) {
      const errorMessage = error.response?.data?.errors?.join(', ') || error.message;
      throw new Error(`Failed to update time entry ${id}: ${errorMessage}`);
    }
  },
};

export const deleteTimeEntryTool: Tool = {
    name: 'redmine_delete-time-entry',
    description: 'Deletes a time entry.',
    parameters: z.object({
        id: z.number().describe('The ID of the time entry to delete.'),
    }),
    execute: async ({ id }) => {
        try {
            await deleteTimeEntry(id);
            return { success: true, message: `Time entry ${id} deleted successfully.` };
        } catch (error: any) {
            const errorMessage = error.response?.data?.errors?.join(', ') || error.message;
            throw new Error(`Failed to delete time entry ${id}: ${errorMessage}`);
        }
    }
}; 