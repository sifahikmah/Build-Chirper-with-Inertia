import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Chirp from '@/Components/Chirp';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Tambahkan CSS bawaan Quill

export default function Index({ auth, chirps }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        message: '',
        photo: null,
    });

    const [photoPreview, setPhotoPreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) { // Validasi ukuran file (2MB)
            alert('File size should not exceed 2MB');
            return;
        }

        setData('photo', file); // Simpan file foto ke state
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleEditorChange = (content) => {
        setData('message', content); // Simpan isi editor ke state
    };

    const submit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('message', data.message);
        if (data.photo) formData.append('photo', data.photo);
        post(route('chirps.store'), {
            data: formData,
            onSuccess: () => {
                reset();
                setPhotoPreview(null);
            },
        });
    };

    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="Chirps" />
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    {/* Container utama untuk WYSIWYG editor dan foto */}
                    <div className="relative border border-gray-300 rounded-lg p-4 bg-white">
                        {/* WYSIWYG Editor */}
                        <ReactQuill
                            value={data.message}
                            onChange={handleEditorChange}
                            placeholder="What's on your mind?"
                            theme="snow"
                            className="mb-2"
                        />
                        {/* Preview gambar */}
                        {photoPreview && (
                            <div className="relative w-full h-64 overflow-hidden border border-gray-300 rounded-lg mt-2">
                                <img
                                    src={photoPreview}
                                    alt="Preview Image"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}

                        {/* Tombol Upload Gambar */}
                        <label htmlFor="photo" className="mt-4 flex items-center justify-start cursor-pointer">
                            <div className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 bg-gray-100">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 text-gray-600"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <span className="text-sm text-gray-600">Upload Image</span>
                            </div>
                        </label>
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>

                    {/* Error Message */}
                    <InputError message={errors.message} className="mt-2" />
                    {errors.photo && (
                        <div className="text-red-500 text-sm mt-2">{errors.photo}</div>
                    )}

                    {/* Tombol Submit */}
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Chirp
                    </PrimaryButton>
                </form>

                {/* Daftar Chirps */}
                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {chirps.map((chirp) => (
                        <Chirp key={chirp.id} chirp={chirp} />
                    ))}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
