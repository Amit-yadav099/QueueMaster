import { User, Play, CheckCircle, Trash2, Clock3,} from "lucide-react";

const CustomerItem = ({ customer, onStatusUpdate, onRemove }) => {
  const { _id, name, status } = customer;

  const handleServe = () => onStatusUpdate(_id, "being-served");
  const handleComplete = () => onStatusUpdate(_id, "completed");
  const handleRemove = () => onRemove(_id);

  const statusStyles = {
    waiting:
      "bg-yellow-100 text-yellow-700 border border-yellow-200",
    "being-served":
      "bg-blue-100 text-blue-700 border border-blue-200",
    completed:
      "bg-green-100 text-green-700 border border-green-200",
  };

  return (
    <li className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md">

      {/* Customer Info */}
      <div className="flex items-center gap-4">
        <div className="rounded-full bg-indigo-100 p-3">
          <User className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            {name}
          </h3>

          <span
            className={`mt-1 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[status]}`}
          >
            <Clock3 size={14} />
            {status.replace("-", " ")}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">

        {status === "waiting" && (
          <>
            <button
              onClick={handleServe}
              className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600 cursor-pointer"
            >
              <Play size={16} />
              Serve
            </button>

            <button
              onClick={handleRemove}
              className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 cursor-pointer"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </>
        )}

        {status === "being-served" && (
          <>
            <button
              onClick={handleComplete}
              className="flex items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-600 cursor-pointer"
            >
              <CheckCircle size={16} />
              Complete
            </button>

            <button
              onClick={handleRemove}
              className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
            >
              <Trash2 size={16} />
              Remove
            </button>
          </>
        )}

        {status === "completed" && (
          <button
            onClick={handleRemove}
            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 cursor-pointer"
          >
            <Trash2 size={16} />
            Remove
          </button>
        )}
      </div>
    </li>
  );
};

export default CustomerItem;