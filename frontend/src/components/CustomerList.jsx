import { Users } from "lucide-react";
import CustomerItem from "./CustomerItem";

const CustomerList = ({ customers, onStatusUpdate, onRemove }) => {
  if (customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 py-16 text-center">
        <div className="rounded-full bg-slate-200 p-4">
          <Users className="h-10 w-10 text-slate-500" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-700">
          No Customers Yet
        </h3>

        <p className="mt-2 text-slate-500">
          Add a customer to start managing your queue.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {customers.map((customer) => (
        <CustomerItem
          key={customer._id}
          customer={customer}
          onStatusUpdate={onStatusUpdate}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
};

export default CustomerList;