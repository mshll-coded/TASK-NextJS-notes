'use server';

import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';

import { baseUrl, getHeaders } from './config';

export async function fetchNotes() {
  const response = await fetch(`${baseUrl}/notes`);
  const notes = await response.json();
  return notes;
}

export async function fetchNoteById(noteId) {
  const response = await fetch(`${baseUrl}/notes/${noteId}`);

  if (!response.ok) notFound();

  const note = await response.json();
  return note;
}

export async function createNote(formData) {
  const note = Object.fromEntries(formData);

  const response = await fetch(`${baseUrl}/notes`, {
    method: 'POST',
    headers: await getHeaders(),
    body: JSON.stringify(note),
  });

  const newNote = await response.json();
  revalidatePath('/notes');
  revalidatePath(`/notes/[noteId]`, 'page');
  redirect(`/notes/${newNote._id}`);
}
