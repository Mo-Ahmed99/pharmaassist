import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getInventoryApi,
  addMedicineApi,
  addToInventoryApi,
  updateInventoryApi,
  deductStockApi,
} from '../services/api';
import './PharmacyDashboard.css';

export default function PharmacyDashboard() {
  const { user, token, isPharmacy } = useAuth();
  const navigate = useNavigate();

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('inventory');
  const [feedback, setFeedback] = useState({ type: '', msg: '' });

  // Form states
  const [newMedicine, setNewMedicine] = useState({
    id: '', trade_name: '', scientific_name: '', description: '',
    active_ingredient: '', side_effects: '', active_ingredient_concentration: '',
    category: '', dosage_form: '', manufacturer: '', requires_prescription: false,
  });

  const [addInventoryForm, setAddInventoryForm] = useState({
    medicineId: '', quantity: '', price: '',
  });

  useEffect(() => {
    if (!isPharmacy) { navigate('/homepage'); return; }
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await getInventoryApi(token);
      setInventory(res.data || []);
    } catch { setFeedback({ type: 'error', msg: 'Failed to load inventory' }); }
    finally { setLoading(false); }
  };

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    try {
      const res = await addMedicineApi({ ...newMedicine, id: Number(newMedicine.id) }, token);
      if (res.data) {
        setFeedback({ type: 'success', msg: `Medicine "${res.data.trade_name}" added to database!` });
        setNewMedicine({
          id: '', trade_name: '', scientific_name: '', description: '',
          active_ingredient: '', side_effects: '', active_ingredient_concentration: '',
          category: '', dosage_form: '', manufacturer: '', requires_prescription: false,
        });
      } else {
        setFeedback({ type: 'error', msg: res.message });
      }
    } catch { setFeedback({ type: 'error', msg: 'Failed to add medicine' }); }
  };

  const handleAddToInventory = async (e) => {
    e.preventDefault();
    try {
      const res = await addToInventoryApi(
        { medicineId: addInventoryForm.medicineId, quantity: Number(addInventoryForm.quantity), price: Number(addInventoryForm.price) },
        token
      );
      if (res.data) {
        setFeedback({ type: 'success', msg: 'Medicine added to your inventory!' });
        setAddInventoryForm({ medicineId: '', quantity: '', price: '' });
        fetchInventory();
      } else {
        setFeedback({ type: 'error', msg: res.message });
      }
    } catch { setFeedback({ type: 'error', msg: 'Failed to add to inventory' }); }
  };

  const handleDeduct = async (inventoryId, currentQty) => {
    const amount = window.prompt(`Deduct how many? (Available: ${currentQty})`);
    if (!amount || isNaN(amount)) return;
    const res = await deductStockApi(inventoryId, Number(amount), token);
    if (res.data) {
      setFeedback({ type: 'success', msg: `Stock updated. Remaining: ${res.data.remainingQuantity}` });
      fetchInventory();
    } else {
      setFeedback({ type: 'error', msg: res.message });
    }
  };

  const handleUpdateQuantity = async (inventoryId) => {
    const qty = window.prompt('Set new quantity:');
    if (!qty || isNaN(qty)) return;
    const res = await updateInventoryApi(inventoryId, { quantity: Number(qty) }, token);
    if (res.data) {
      setFeedback({ type: 'success', msg: 'Quantity updated!' });
      fetchInventory();
    } else {
      setFeedback({ type: 'error', msg: res.message });
    }
  };

  return (
    <div className="pharmacy-dashboard">
      <div className="container py-5">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Pharmacy Dashboard</h1>
            <p className="dashboard-sub">Welcome, {user?.fullName}</p>
          </div>
        </div>

        {/* Feedback */}
        {feedback.msg && (
          <div className={`dashboard-feedback dashboard-feedback--${feedback.type}`}>
            {feedback.msg}
            <button onClick={() => setFeedback({ type: '', msg: '' })}>✕</button>
          </div>
        )}

        {/* Tabs */}
        <div className="dashboard-tabs">
          {['inventory', 'add-medicine', 'add-to-inventory'].map((tab) => (
            <button
              key={tab}
              className={`dashboard-tab ${activeTab === tab ? 'dashboard-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'inventory' && ' My Inventory'}
              {tab === 'add-medicine' && ' Add New Medicine'}
              {tab === 'add-to-inventory' && ' Add to Inventory'}
            </button>
          ))}
        </div>

        {/* ── Inventory Tab ── */}
        {activeTab === 'inventory' && (
          <div className="dashboard-panel">
            {loading ? (
              <p className="text-center" style={{ color: 'rgba(255,255,255,0.6)' }}>Loading...</p>
            ) : inventory.length === 0 ? (
              <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                No medicines in your inventory yet.
              </p>
            ) : (
              <div className="inventory-table-wrap">
                <table className="inventory-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventory.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <strong>{item.medicine?.trade_name}</strong>
                          <br />
                          <small style={{ color: '#00d2b3' }}>{item.medicine?.scientific_name}</small>
                        </td>
                        <td>{item.medicine?.category || '—'}</td>
                        <td>{item.price ? `${item.price} EGP` : '—'}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <span className={`inv-badge ${item.isAvailable ? 'inv-badge--in' : 'inv-badge--out'}`}>
                            {item.isAvailable ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td>
                          <div className="inv-actions">
                            <button className="inv-btn inv-btn--edit" onClick={() => handleUpdateQuantity(item._id)}>
                              Edit Qty
                            </button>
                            <button className="inv-btn inv-btn--deduct" onClick={() => handleDeduct(item._id, item.quantity)}>
                              Deduct
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── Add Medicine Tab ── */}
        {activeTab === 'add-medicine' && (
          <div className="dashboard-panel">
            <h4 className="panel-title">Add New Medicine to Database</h4>
            <form onSubmit={handleAddMedicine} className="dashboard-form">
              <div className="form-row">
                <DashInput label="Medicine ID *" name="id" type="number" value={newMedicine.id}
                  onChange={(e) => setNewMedicine(p => ({ ...p, id: e.target.value }))} />
                <DashInput label="Trade Name *" name="trade_name" value={newMedicine.trade_name}
                  onChange={(e) => setNewMedicine(p => ({ ...p, trade_name: e.target.value }))} />
              </div>
              <div className="form-row">
                <DashInput label="Scientific Name" name="scientific_name" value={newMedicine.scientific_name}
                  onChange={(e) => setNewMedicine(p => ({ ...p, scientific_name: e.target.value }))} />
                <DashInput label="Active Ingredient" name="active_ingredient" value={newMedicine.active_ingredient}
                  onChange={(e) => setNewMedicine(p => ({ ...p, active_ingredient: e.target.value }))} />
              </div>
              <div className="form-row">
                <DashInput label="Category" name="category" value={newMedicine.category}
                  onChange={(e) => setNewMedicine(p => ({ ...p, category: e.target.value }))} />
                <DashInput label="Dosage Form" name="dosage_form" value={newMedicine.dosage_form}
                  onChange={(e) => setNewMedicine(p => ({ ...p, dosage_form: e.target.value }))} />
              </div>
              <DashInput label="Concentration" name="active_ingredient_concentration"
                value={newMedicine.active_ingredient_concentration}
                onChange={(e) => setNewMedicine(p => ({ ...p, active_ingredient_concentration: e.target.value }))} />
              <DashTextarea label="Description" value={newMedicine.description}
                onChange={(e) => setNewMedicine(p => ({ ...p, description: e.target.value }))} />
              <DashTextarea label="Side Effects" value={newMedicine.side_effects}
                onChange={(e) => setNewMedicine(p => ({ ...p, side_effects: e.target.value }))} />
              <DashInput label="Manufacturer" name="manufacturer" value={newMedicine.manufacturer}
                onChange={(e) => setNewMedicine(p => ({ ...p, manufacturer: e.target.value }))} />
              <label className="dash-checkbox">
                <input type="checkbox" checked={newMedicine.requires_prescription}
                  onChange={(e) => setNewMedicine(p => ({ ...p, requires_prescription: e.target.checked }))} />
                Requires Prescription
              </label>
              <button type="submit" className="dash-submit-btn">Add Medicine</button>
            </form>
          </div>
        )}

        {/* ── Add to Inventory Tab ── */}
        {activeTab === 'add-to-inventory' && (
          <div className="dashboar-panel">
            <h4 className="panel-title">Add Existing Medicine to Your Inventory</h4>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Enter the  <code style={{ color: '#00d2b3' }}> Medicine id</code>
            </p>
            <form onSubmit={handleAddToInventory} className="dashboard-form">
              <DashInput label="Medicine ID " name="medicineId"
                value={addInventoryForm.medicineId}
                onChange={(e) => setAddInventoryForm(p => ({ ...p, medicineId: e.target.value }))} />
              <div className="form-row">
                <DashInput label="Quantity *" name="quantity" type="number"
                  value={addInventoryForm.quantity}
                  onChange={(e) => setAddInventoryForm(p => ({ ...p, quantity: e.target.value }))} />
                <DashInput label="Price (EGP)" name="price" type="number"
                  value={addInventoryForm.price}
                  onChange={(e) => setAddInventoryForm(p => ({ ...p, price: e.target.value }))} />
              </div>
              <button type="submit" className="dash-submit-btn">Add to Inventory</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Small helper components
function DashInput({ label, name, type = 'text', value, onChange }) {
  return (
    <div className="dash-field">
      <label className="dash-label">{label}</label>
      <input className="dash-input" type={type} name={name} value={value} onChange={onChange} />
    </div>
  );
}
function DashTextarea({ label, value, onChange }) {
  return (
    <div className="dash-field">
      <label className="dash-label">{label}</label>
      <textarea className="dash-input dash-textarea" value={value} onChange={onChange} rows={3} />
    </div>
  );
}
