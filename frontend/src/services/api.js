const API_BASE= import.meta.env.VITE_API_URL;


// that for the query, if teh default value is 'waiting'
export const fetchCustomers = async (status) => {
  const url = status ? `${API_BASE}/customers?status=${status}` : `${API_BASE}/customers`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch customers');
  return res.json();
};


// to add the customer
export const addCustomer=async(name)=>{
    const res=await fetch(`${API_BASE}/customers`,{
         method:'POST',
         headers:{'Content-Type':'application/json'},
         body:JSON.stringify({name}),
    });

    if(!res.ok) throw new Error('Failed to add customer');
    return res.json();
};

// for the updation
export const updateCustomerStatus=async(id,status)=>{
    const res = await fetch(`${API_BASE}/customers/${id}/status`,{
    method:'PATCH',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({status}),
    });
    if(!res.ok) throw new Error('Failed to update  the status');
    return res.json();
};

// for the deletion
export const removeCustomer=async(id)=>{
    const res=await fetch(`${API_BASE}/customers/${id}`,{
        method:'Delete',
    });
    if(!res.ok)  throw new Error('Failed to remove the customer');
    return res.json();
};

