import { useState } from "react";
import { UserPlus, User } from "lucide-react";

const AddCustomerForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setError("");
    onAdd(name.trim());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <User
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Enter customer name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-4 text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-medium text-white transition-all hover:bg-blue-600 active:scale-95"
        >
          <UserPlus size={18} />
          Add to Queue
        </button>
      </div>

      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-500">
          {error}
        </p>
      )}
    </form>
  );
};

export default AddCustomerForm;