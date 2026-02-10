import { useEffect, useState } from "react";
import { useNoteStore } from "../store/useNoteStore";
import { useAuthStore } from "../store/useAuthStore";
import NoteCard from "../components/NoteCard";
import CreateNoteModal from "../components/CreateNoteModal";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import Button from "../components/Button";

const Dashboard = () => {
    const { notes, getAllNotes, createNote, editNote, deleteNote, loading } = useNoteStore();
    const { user, logout } = useAuthStore();
    
    const [searchQuery, setSearchQuery] = useState("");
    const [editingNote, setEditingNote] = useState(null);

    // Fetch notes on load
    useEffect(() => {
        getAllNotes();
        toast.success("Notes fetched")
    }, [getAllNotes]);

    // Functional Search
    const filteredNotes = notes.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreate = async (data) => {
        const success = await createNote(data);
        if (success) {
            toast.success("Notes Created")
            getAllNotes();
        }
    };

    const handleUpdate = async (data) => {
        // If data is null, the user just closed the modal
        if (!data) {
            setEditingNote(null);
            return;
        }
        
        const success = await editNote(editingNote._id, data);
        if (success) {
            toast.success("Note updated")
            getAllNotes();
            setEditingNote(null);
        }
    };

    return (
        <div className='py-2 px-5 flex flex-col gap-10'>
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className='flex flex-col'>
                    <h1 className='text-2xl font-bold'>My Dashboard</h1>
                    <span className='text-gray-500'>Manage your tasks and personal notes</span>
                </div>

                <Button bgColor={'#dc143c'} btnSize={'16px'} name={"Logout"} onClick={() => logout()} />
            </div>

            {/* Profile Info Section */}
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div className='p-5 bg-cyan-800 text-white font-bold rounded-sm'>
                        {user?.name?.substring(0, 2).toUpperCase() || "US"}
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-xl font-bold'>{user?.name || "Loading..."}</h1>
                        <span className='text-gray-400 text-[14px]'>@{user?.username}</span>
                        <span className='text-gray-400 text-[13px]'>{user?.email}</span>
                    </div>
                </div>
                <CreateNoteModal mode="create" onConfirm={handleCreate} />
            </div>

            {/* Search Bar Functionality */}
            <div className='flex flex-col gap-4 px-4 py-5 rounded-xs shadow bg-white border-l-4 border-l-[#2A6E8C]'>
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" aria-label="search" />
                    <input 
                        type="text" 
                        placeholder="Search notes..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-[#2A6E8C]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Grid of Notes */}
            <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-bold'>Your Notes</h1>
                
                {loading && notes.length === 0 ? (
                    <p className="text-gray-500">Refreshing notes...</p>
                ) : (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                        {filteredNotes.map(note => (
                            <NoteCard 
                                key={note._id} 
                                note={note} 
                                onEdit={(n) => setEditingNote(n)} 
                                onDelete={(id) => deleteNote(id).then(getAllNotes)} 
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Edit Modal Logic */}
            {editingNote && (
                <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="relative">
                        <CreateNoteModal 
                            mode="edit" 
                            initialData={editingNote} 
                            onConfirm={handleUpdate} 
                        />
                        <button 
                            className="absolute top-2 right-4 text-gray-500 hover:text-black font-bold"
                            onClick={() => setEditingNote(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;