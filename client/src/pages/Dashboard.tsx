import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { AppDispatch, RootState } from '@/store';
import {
  createNote as createNoteThunk,
  deleteNote as deleteNoteThunk,
  fetchNotes,
  updateNote as updateNoteThunk,
} from '@/store/slices/note-slice';
import { AnimatePresence, motion } from 'framer-motion';
import { Edit2, Plus, Save, Trash, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { notes, loading: notesLoading } = useSelector((state: RootState) => state.notes);
  const { user, token, loading: userLoading } = useSelector((state: RootState) => state.auth);

  if (!user || !token) {
    navigate('/signin');
  }

  const [newNote, setNewNote] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editedNote, setEditedNote] = useState('');

  useEffect(() => {
    dispatch(fetchNotes(token!));
  }, [dispatch, token, user]);

  const handleAddNote = () => {
    if (newNote.trim()) {
      dispatch(createNoteThunk({ token: token!, note: { content: newNote } }));
      setNewNote('');
    }
  };

  const handleUpdateNote = (id: string) => {
    if (editedNote.trim() && editingNoteId === id) {
      dispatch(updateNoteThunk({ token: token!, id, data: { content: editedNote } }))
        .unwrap()
        .then(() => {
          setEditingNoteId(null);
          setEditedNote('');
        });
    }
  };

  const handleDeleteNote = (id: string) => {
    dispatch(deleteNoteThunk({ token: token!, id }));
  };

  return (
    <div className="min-h-screen w-full bg-background flex flex-col mt-5">
      <div className="flex-1 p-4 pt-6 md:p-8 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <CardTitle className="text-3xl font-bold tracking-tight">Dashboard</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Welcome back, {userLoading ? '...' : user?.name || 'Guest'}!
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-background p-3 rounded-lg">
                  <User className="text-primary" />
                  <div className="text-right">
                    <p className="font-medium">{user?.name || 'Guest'}</p>
                    <p className="text-xs text-muted-foreground">{user?.email || ''}</p>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter new note..."
                  className="flex-1 shadow-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                />
                <Button onClick={handleAddNote} className="gap-1 shadow">
                  <Plus size={16} />
                  Create Note
                </Button>
              </div>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h2 className="text-xl font-semibold">Your Notes</h2>
                <AnimatePresence>
                  {notesLoading ? (
                    <p>Loading notes...</p>
                  ) : notes.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-muted-foreground"
                    >
                      No notes yet. Create your first note!
                    </motion.div>
                  ) : (
                    <div className="grid gap-3">
                      <AnimatePresence>
                        {notes.map((note) => (
                          <motion.div
                            key={note.id}
                            layout
                            initial={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            animate={{
                              opacity: 1,
                              scale: 1,
                            }}
                            exit={{
                              opacity: 0,
                              scale: 0.9,
                            }}
                            transition={{ duration: 0.2 }}
                            className="bg-card border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between p-4">
                              <div className="flex-1 pr-4">
                                {editingNoteId === note.id ? (
                                  <Input
                                    value={editedNote}
                                    onChange={(e) => setEditedNote(e.target.value)}
                                    autoFocus
                                    className="w-full"
                                  />
                                ) : (
                                  <p className="text-foreground">{note.content}</p>
                                )}
                              </div>
                              <div className="flex gap-1">
                                {editingNoteId === note.id ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        size="icon"
                                        onClick={() => handleUpdateNote(note.id)}
                                        className="h-8 w-8"
                                      >
                                        <Save size={16} />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Save changes</TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="icon"
                                          variant="outline"
                                          className="h-8 w-8"
                                          onClick={() => {
                                            setEditingNoteId(note.id);
                                            setEditedNote(note.content);
                                          }}
                                        >
                                          <Edit2 size={16} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Edit note</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                      <TooltipTrigger asChild>
                                        <Button
                                          size="icon"
                                          variant="destructive"
                                          className="h-8 w-8"
                                          onClick={() => handleDeleteNote(note.id)}
                                        >
                                          <Trash size={16} />
                                        </Button>
                                      </TooltipTrigger>
                                      <TooltipContent>Delete note</TooltipContent>
                                    </Tooltip>
                                  </>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <footer className="py-4 px-4 text-center text-xs text-muted-foreground border-t">
        <p>© 2025 HD - All rights reserved</p>
      </footer>
    </div>
  );
}
