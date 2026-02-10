import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form"; 
import Button from "./Button";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const noteSchema = z.object({
    title: z.string().trim(),
    description: z.string().trim(),
    status: z.string(),
    priority: z.string()
})

const CreateNoteModal = ({ mode = "create", initialData, onConfirm }) => {
    const dialogRef = useRef(null);
    
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: "",
            description: "",
            priority: "Low",
            status: "Pending"
        },
        resolver: zodResolver(noteSchema)
    });
    console.log("initial value in create note is : ", initialData)

    // Sync form with initialData when in 'edit' mode
    useEffect(() => {
        if (mode === "edit" && initialData) {
            // Automatically open the native dialog when editing starts
            dialogRef.current?.showModal();
            reset({
                title: "",
                description: ""
            }); 
        }
    }, [mode, initialData, reset]);

    const openModal = () => dialogRef.current?.showModal();
    const closeModal = () => {
        dialogRef.current?.close();
        if (mode === "edit") {
            onConfirm(null); // This can be used to signal the parent to setEditingNote(null)
        }
    };

    const onSubmit = (data) => {
        onConfirm(data);
        closeModal();
    };

    return (
        <div>
            {mode === "create" && (
                <Button 
                    name='Create Note' 
                    bgColor='#2A6E8C' 
                    btnSize='16px' 
                    onClick={openModal}
                />
            )}

            <dialog 
                ref={dialogRef} 
                className='open:flex flex-col gap-8 w-90 px-4 py-5 rounded-sm bg-[#F8FAFC] border-t-4 border-t-[#2A6E8C] shadow-xl m-auto backdrop:bg-black/60'
            >
                <div className='w-full flex items-center justify-center'>
                    <h1 className='text-2xl font-bold'>
                        {mode === "create" ? "Create Note" : "Edit Note"}
                    </h1>
                </div>

                <form className='flex flex-col gap-3' onSubmit={handleSubmit(onSubmit)}>
                    {/* Title Input */}
                    <label className='flex flex-col text-sm font-medium'>
                        Title
                        <input 
                            {...register("title", { required: "Title is required" })}
                            type="text" 
                            className={`border-2 rounded-xs px-1 h-10 ${errors.title ? 'border-red-500' : 'border-[#CBD5E1]'} focus:outline-[#2A6E8C]`}
                            placeholder="Note Title" 
                        />
                        {errors.title && <span className="text-red-500 text-xs mt-1">{errors.title.message}</span>}
                    </label>
                    
                    {/* Description Input */}
                    <label className='flex flex-col text-sm font-medium'>
                        Description
                        <textarea 
                            {...register("description", { required: "Description is required" })}
                            className={`border-2 rounded-xs px-1 h-20 py-1 ${errors.description ? 'border-red-500' : 'border-[#CBD5E1]'} focus:outline-[#2A6E8C]`}
                            placeholder="Note Description" 
                        />
                        {errors.description && <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>}
                    </label>

                    <div className="grid grid-cols-2 gap-2">
                        {/* Priority Selector */}
                        <label className='flex flex-col text-sm font-medium'>
                            Priority
                            <select 
                                {...register("priority")}
                                className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10'
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </label>

                        {/* Status Selector */}
                        <label className='flex flex-col text-sm font-medium'>
                            Status
                            <select 
                                {...register("status")}
                                className='border-2 border-[#CBD5E1] focus:outline-[#2A6E8C] rounded-xs px-1 h-10'    
                            >
                                <option value="Pending">Pending</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Done">Done</option>
                            </select>
                        </label>
                    </div>

                    <div className='flex gap-2 justify-center items-center w-full mt-5'>
                        <Button 
                            name='Cancel' 
                            txtColor='#64748B' 
                            bgColor={'transparent'}
                            btnSize='16px' 
                            type="button" 
                            onClick={closeModal} 
                        />
                        <Button 
                            name={mode === "create" ? 'Create' : 'Save Changes'} 
                            bgColor='#2A6E8C' 
                            btnSize='16px' 
                            type="submit" 
                        />
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default CreateNoteModal;