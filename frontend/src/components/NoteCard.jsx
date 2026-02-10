import { EllipsisVertical, Pencil, Trash, Flag, Circle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const NoteCard = ({ note, onEdit, onDelete }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getPriorityStyle = (p) => {
        switch (p?.toLowerCase()) {
            case 'high': return 'text-red-600 bg-red-100 border-red-200';
            case 'medium': return 'text-amber-600 bg-amber-100 border-amber-200';
            case 'low': return 'text-emerald-600 bg-emerald-100 border-emerald-200';
            default: return 'text-slate-600 bg-slate-100 border-slate-200';
        }
    };

    return (
        <div className="border-2 flex flex-col gap-3 px-4 py-3 w-64 min-h-48 rounded-2xl shadow-sm bg-white relative">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <span className="font-bold text-lg text-slate-800 leading-tight">{note.title}</span>
                </div>

                <div className="relative" ref={menuRef}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-1 hover:bg-slate-100 rounded-full cursor-pointer">
                        <EllipsisVertical className="w-5 text-slate-500" />
                    </button>

                    {isMenuOpen && (
                        <div className="absolute top-10 right-0 z-50 bg-white rounded-xl shadow-xl border p-2 flex flex-col gap-1 min-w-28">
                            <button onClick={() => { onEdit(note); setIsMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 rounded-lg text-sm w-full text-left">
                                <Pencil className="w-4" /> Edit
                            </button>
                            <button onClick={() => { onDelete(note._id); setIsMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2 hover:bg-red-50 text-red-600 rounded-lg text-sm w-full text-left">
                                <Trash className="w-4" /> Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <p className="text-slate-600 text-sm grow">{note.description}</p>
            <div className={`mt-2 self-start flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${getPriorityStyle(note.priority)}`}>
                <Flag className="w-3 h-3" /> {note.priority}
            </div>
        </div>
    );
};

export default NoteCard;