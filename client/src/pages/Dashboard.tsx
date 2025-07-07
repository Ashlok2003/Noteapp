import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { AppDispatch, RootState } from '@/store';
import { addNote, deleteNote, updateNote } from '@/store/slices/note-slice';
import { motion } from 'framer-motion';
import { Edit2, Save, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state: RootState) => state.notes.notes);
  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedNote, setEditedNote] = useState('');

  const user = { name: 'Jonas Kahnwald', email: 'xxxxxx@xxxx.com' };

  const handleAddNote = () => {
    if (newNote.trim()) {
      dispatch(addNote({ id: Date.now().toString(), text: newNote, shared: false, access: 'private' }));
      setNewNote('');
    }
  };

  const handleUpdateNote = (id: string) => {
    if (editedNote.trim() && editingNoteId === id) {
      dispatch(updateNote({ id, text: editedNote }));
      setEditingNoteId(null);
      setEditedNote('');
    }
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  useEffect(() => {
    if (notes.length === 0) {
      dispatch(addNote({ id: '1', text: 'Note 1', shared: false, access: 'private' }));
      dispatch(addNote({ id: '2', text: 'Note 2', shared: true, access: 'public' }));
    }
  }, [dispatch, notes.length]);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col p-4 mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto"
      >
        <div className="rounded-xl">
          <div className="p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <div className="text-center bg-card border p-8">
                <h2 className="text-4xl font-bold">Dashboard</h2>
                <p className="text-lg text-muted-foreground">
                  Welcome, {user.name}!
                </p>
                <span>Email: {user.email}</span>
              </div>
              <div className="space-y-6 mt-8">
                <div className="flex">
                  <Input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Enter new note"
                    className="flex-1 rounded-none"
                  />
                  <Button
                    onClick={handleAddNote}
                    className="bg-blue-600 font-medium text-white hover:bg-blue-700 rounded-none"
                  >
                    Create Note
                  </Button>
                </div>
                <div className="grid gap-4">
                  {notes.map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-secondary rounded-none border border-border"
                    >
                      <div className="flex-1">
                        {editingNoteId === note.id ? (
                          <Input
                            value={editedNote}
                            onChange={(e) => setEditedNote(e.target.value)}
                            defaultValue={note.text}
                            className="w-full rounded-none"
                          />
                        ) : (
                          <span className="text-foreground">{note.text}</span>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {editingNoteId === note.id ? (
                          <Button
                            onClick={() => handleUpdateNote(note.id)}
                            className="bg-green-600 text-white hover:bg-green-700 rounded-none"
                          >
                            <Save className='size-4' />
                          </Button>
                        ) : (
                          <>
                            <Button
                              onClick={() => {
                                setEditingNoteId(note.id);
                                setEditedNote(note.text);
                              }}
                              variant="outline"
                              className="rounded-none"
                            >
                              <Edit2 className="size-4" />
                            </Button>

                            <Button
                              onClick={() => handleDeleteNote(note.id)}
                              variant="destructive"
                              className="rounded-none"
                            >
                              <Trash className="size-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="p-6 text-xs border-t bottom-0 text-center font-bold text-muted-foreground">
            © 2025 HD - All rights reserved
      </div>
    </div>
  );
}
