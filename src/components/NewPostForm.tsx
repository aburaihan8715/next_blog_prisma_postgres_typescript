"use client";
import { FormData } from "@/types/blog";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
const inputClass = `w-full py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300`;

function NewPostForm() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
  });
  const { data } = useSession();
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("api/posts", formData);
      if (response.status === 200) {
        router.push(`/blogs/${response.data.newPost.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <input onChange={handleChange} className={inputClass} type="text" name="title" id="title" placeholder="Enter title" value={formData.title} />
      </div>

      <div className="mb-4">
        <TextareaAutosize
          onChange={handleChange}
          minRows={5}
          name="content"
          className={inputClass}
          placeholder="Enter content"
          value={formData.content}
        />
      </div>

      <button
        type="submit"
        disabled={!data?.user?.email}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 w-full disabled:bg-gray-400"
      >
        Submit
      </button>
    </form>
  );
}

export default NewPostForm;
