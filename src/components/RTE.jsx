import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name = "content", control, label }) {
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            value={value || ""}
            onEditorChange={onChange}
            apiKey="yss39q3052o593xyi179tyft09oe3jsysitl1b463qfhqqcq"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "preview",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | code | preview",
              content_style:
                "body { font-family: Helvetica, Arial, sans-serif; font-size:14px }",
            }}
          />
        )}
      />
    </div>
  );
}
