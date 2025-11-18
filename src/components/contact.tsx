import * as React from "react"

export default function ContactComponent() {
  const inputType = ["text", "email", "number", "textarea"]
  return (
    <div className="flex flex-col gap-2 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>
      {inputType?.map((type, index) => (
        <input
          key={index}
          type={type}
          placeholder={type}
          className={`border border-gray-300 rounded-md p-2 w-full mb-2 ${
            index === 3 ? "h-32" : ""
          }`}
        />
      ))}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Submit
      </button>
    </div>
  )
}
