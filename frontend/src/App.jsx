import { useState, useEffect } from 'react';
import { fetchCustomers, addCustomer, updateCustomerStatus, removeCustomer } from './services/api';
import AddCustomerForm from './components/AddCustomerForm';
import CustomerList from './components/CustomerList';
import './index.css';
import { Users, Clock3, Filter, LayoutDashboard} from "lucide-react";
function App() {
  const [customers, setCustomers] = useState([]);
  const [showWaitingOnly, setShowWaitingOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load all customers
  const loadAllCustomers = async () => {
    try {
      setLoading(true);
      const data = await fetchCustomers(); // no status param -> all
      setCustomers(data);
      setError('');
    } catch (err) {
      setError('Failed to load customers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllCustomers();
  }, []);

  const handleAdd = async (name) => {
    try {
      await addCustomer(name);
      await loadAllCustomers();
    } catch (err) {
      setError('Failed to add customer');
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateCustomerStatus(id, status);
      await loadAllCustomers();
    } catch (err) {
      setError('Failed to update status');
    }
  };

  const handleRemove = async (id) => {
    try {
      await removeCustomer(id);
      await loadAllCustomers();
    } catch (err) {
      setError('Failed to remove customer');
    }
  };

  // Filter customers based on toggle
  const displayedCustomers = showWaitingOnly
    ? customers.filter(c => c.status === 'waiting')
    : customers;

  if (loading) return <div>Loading...</div>;

  return (
  <div className="min-h-screen bg-slate-100">
    {/* Header */}
    <header className="bg-blue-500 shadow-lg">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-white">
              QueueMaster
            </h1>
            <p className="text-blue-100 mt-1">
              Customer Queue Management
            </p>
          </div>
        </div>
      </div>
    </header>

    <main className="max-w-5xl mx-auto px-6 py-8">

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
          {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-5 mb-8">

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Total Customers
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {customers.length}
            </h2>
          </div>

          <div className="bg-indigo-100 p-3 rounded-xl">
            <Users className="text-blue-600 w-7 h-7" />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Waiting Customers
            </p>

            <h2 className="text-3xl font-bold mt-1">
              {customers.filter(c => c.status === "waiting").length}
            </h2>
          </div>

          <div className="bg-yellow-100 p-3 rounded-xl">
            <Clock3 className="text-yellow-600 w-7 h-7" />
          </div>
        </div>

      </div>

      {/* Add Customer */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
        <h2 className="text-lg font-semibold mb-5">
          Add Customer
        </h2>

        <AddCustomerForm onAdd={handleAdd} />
      </section>

      {/* Filter */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">

        <button
          onClick={() => setShowWaitingOnly(!showWaitingOnly)}
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg transition-all"
        >
          <Filter size={18} />

          {showWaitingOnly
            ? "Show All Customers"
            : "Show Waiting Only"}
        </button>

        <div className="text-slate-600 font-medium">
          {showWaitingOnly
            ? `Having ${displayedCustomers.length} waiting customers`
            : `Total ${customers.length} customers`}
        </div>

      </div>

      {/* Customer List */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <CustomerList
          customers={displayedCustomers}
          onStatusUpdate={handleStatusUpdate}
          onRemove={handleRemove}
        />
      </section>

    </main>
  </div>
 );
}

export default App;