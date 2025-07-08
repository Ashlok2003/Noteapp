import axios from './axios-instance';

export const fetchNotes = async (token: string) => {
  const res = await axios.get('/notes', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.notes as Array<{
    id: string;
    content: string;
  }>;
};

export const createNote = async (token: string, note: { content: string }) => {
  const res = await axios.post('/notes', note, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.note;
};

export const updateNote = async (token: string, id: string, data: { content?: string }) => {
  const res = await axios.put(`/notes/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.note;
};

export const deleteNote = async (token: string, id: string) => {
  await axios.delete(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
