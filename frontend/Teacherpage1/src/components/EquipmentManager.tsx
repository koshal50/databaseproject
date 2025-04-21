import React, { useState } from 'react';
import { ShoppingBag, Clock, Check, RotateCcw, Edit2, Plus, Trash2 } from 'lucide-react';

interface Equipment {
  id: number;
  name: string;
  category: string;
  totalQuantity: number;
  availableQuantity: number;
  checkouts: Checkout[];
}

interface Checkout {
  id: number;
  studentName: string;
  studentYear: string;
  startTime: string;
  endTime: string;
  checkoutDate: string;
  dueDate: string;
  returned: boolean;
  lostResponsibility: boolean;
}

const EquipmentManager: React.FC = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([
    {
      id: 1,
      name: 'Basketball',
      category: 'Ball Sports',
      totalQuantity: 20,
      availableQuantity: 15,
      checkouts: [
        { 
          id: 1, 
          studentName: 'Alex Johnson', 
          studentYear: '2nd',
          startTime: '14:00',
          endTime: '15:00',
          checkoutDate: '2025-04-10', 
          dueDate: '2025-04-17', 
          returned: false,
          lostResponsibility: true
        },
        { 
          id: 2, 
          studentName: 'Sarah Williams', 
          studentYear: '1st',
          startTime: '15:30',
          endTime: '16:30',
          checkoutDate: '2025-04-11', 
          dueDate: '2025-04-18', 
          returned: false,
          lostResponsibility: true
        },
      ]
    },
    {
      id: 2,
      name: 'Football',
      category: 'Ball Sports',
      totalQuantity: 15,
      availableQuantity: 10,
      checkouts: [
        { 
          id: 3, 
          studentName: 'James Wilson', 
          studentYear: '3rd',
          startTime: '13:00',
          endTime: '14:00',
          checkoutDate: '2025-04-09', 
          dueDate: '2025-04-16', 
          returned: false,
          lostResponsibility: true
        },
        { 
          id: 4, 
          studentName: 'Emma Davis', 
          studentYear: '4th',
          startTime: '16:00',
          endTime: '17:00',
          checkoutDate: '2025-04-12', 
          dueDate: '2025-04-19', 
          returned: true,
          lostResponsibility: true
        },
      ]
    },
    {
      id: 3,
      name: 'Swimming Goggles',
      category: 'Swimming',
      totalQuantity: 30,
      availableQuantity: 22,
      checkouts: [
        { 
          id: 5, 
          studentName: 'Michael Brown', 
          studentYear: '2nd',
          startTime: '09:00',
          endTime: '10:00',
          checkoutDate: '2025-04-08', 
          dueDate: '2025-04-15', 
          returned: false,
          lostResponsibility: true
        },
        { 
          id: 6, 
          studentName: 'Olivia Martinez', 
          studentYear: '1st',
          startTime: '11:00',
          endTime: '12:00',
          checkoutDate: '2025-04-10', 
          dueDate: '2025-04-17', 
          returned: true,
          lostResponsibility: false
        },
      ]
    },
    {
      id: 4,
      name: 'Tennis Racket',
      category: 'Racket Sports',
      totalQuantity: 12,
      availableQuantity: 8,
      checkouts: [
        { 
          id: 7, 
          studentName: 'Daniel Anderson', 
          studentYear: '3rd',
          startTime: '14:30',
          endTime: '15:30',
          checkoutDate: '2025-04-11', 
          dueDate: '2025-04-18', 
          returned: false,
          lostResponsibility: true
        },
        { 
          id: 8, 
          studentName: 'Sophia Thompson', 
          studentYear: '4th',
          startTime: '16:30',
          endTime: '17:30',
          checkoutDate: '2025-04-09', 
          dueDate: '2025-04-16', 
          returned: false,
          lostResponsibility: true
        },
      ]
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showReturned, setShowReturned] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [editingCheckout, setEditingCheckout] = useState<Checkout | null>(null);

  const [newCheckout, setNewCheckout] = useState<Omit<Checkout, 'id'>>({
    studentName: '',
    studentYear: '1st',
    startTime: '',
    endTime: '',
    checkoutDate: '',
    dueDate: '',
    returned: false,
    lostResponsibility: true
  });

  const categories = ['all', ...new Set(equipments.map(eq => eq.category))];
  
  const filteredEquipments = selectedCategory === 'all' 
    ? equipments 
    : equipments.filter(eq => eq.category === selectedCategory);

  const handleMarkAsReturned = (equipmentId: number, checkoutId: number) => {
    setEquipments(equipments.map(equipment => {
      if (equipment.id === equipmentId) {
        const updatedCheckouts = equipment.checkouts.map(checkout => {
          if (checkout.id === checkoutId) {
            return { ...checkout, returned: true };
          }
          return checkout;
        });
        return {
          ...equipment,
          checkouts: updatedCheckouts,
          availableQuantity: equipment.availableQuantity + 1
        };
      }
      return equipment;
    }));
  };

  const handleAddCheckout = (equipmentId: number) => {
    setEditingEquipment(equipments.find(eq => eq.id === equipmentId) || null);
    setEditingCheckout(null);
    setNewCheckout({
      studentName: '',
      studentYear: '1st',
      startTime: '',
      endTime: '',
      checkoutDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      returned: false,
      lostResponsibility: true
    });
    setShowModal(true);
  };

  const handleEditCheckout = (equipmentId: number, checkout: Checkout) => {
    setEditingEquipment(equipments.find(eq => eq.id === equipmentId) || null);
    setEditingCheckout(checkout);
    setNewCheckout({
      studentName: checkout.studentName,
      studentYear: checkout.studentYear,
      startTime: checkout.startTime,
      endTime: checkout.endTime,
      checkoutDate: checkout.checkoutDate,
      dueDate: checkout.dueDate,
      returned: checkout.returned,
      lostResponsibility: checkout.lostResponsibility
    });
    setShowModal(true);
  };

  const handleSubmitCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEquipment) return;

    setEquipments(equipments.map(equipment => {
      if (equipment.id === editingEquipment.id) {
        let updatedCheckouts;
        if (editingCheckout) {
          // Edit existing checkout
          updatedCheckouts = equipment.checkouts.map(checkout =>
            checkout.id === editingCheckout.id ? { ...newCheckout, id: checkout.id } : checkout
          );
        } else {
          // Add new checkout
          const maxId = Math.max(0, ...equipment.checkouts.map(c => c.id));
          updatedCheckouts = [
            ...equipment.checkouts,
            { ...newCheckout, id: maxId + 1 }
          ];
        }
        return {
          ...equipment,
          checkouts: updatedCheckouts,
          availableQuantity: equipment.availableQuantity - (!editingCheckout ? 1 : 0)
        };
      }
      return equipment;
    }));

    setShowModal(false);
  };

  const handleDeleteCheckout = (equipmentId: number, checkoutId: number) => {
    setEquipments(equipments.map(equipment => {
      if (equipment.id === equipmentId) {
        const checkout = equipment.checkouts.find(c => c.id === checkoutId);
        return {
          ...equipment,
          checkouts: equipment.checkouts.filter(c => c.id !== checkoutId),
          availableQuantity: equipment.availableQuantity + (checkout && !checkout.returned ? 1 : 0)
        };
      }
      return equipment;
    }));
  };

  // Calculate total available and checked out
  const totalAvailable = equipments.reduce((sum, eq) => sum + eq.availableQuantity, 0);
  const totalCheckedOut = equipments.reduce((sum, eq) => sum + (eq.totalQuantity - eq.availableQuantity), 0);

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md" data-aos="fade-up" data-aos-delay="200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white mb-3 md:mb-0">Equipment Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showReturned"
              checked={showReturned}
              onChange={() => setShowReturned(!showReturned)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="showReturned" className="text-gray-700 dark:text-gray-300">
              Show returned items
            </label>
          </div>
        </div>
      </div>

      {/* Equipment Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-2">Total Equipment Items</h3>
          <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
            {equipments.reduce((sum, eq) => sum + eq.totalQuantity, 0)}
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <h3 className="font-medium text-green-700 dark:text-green-300 mb-2">Available for Checkout</h3>
          <p className="text-2xl font-bold text-green-800 dark:text-green-200">{totalAvailable}</p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
          <h3 className="font-medium text-orange-700 dark:text-orange-300 mb-2">Currently Checked Out</h3>
          <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">{totalCheckedOut}</p>
        </div>
      </div>

      {/* Equipment List */}
      <div className="space-y-6">
        {filteredEquipments.map(equipment => (
          <div key={equipment.id} className="border dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg dark:text-white">{equipment.name}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{equipment.category}</span>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-3 mb-2">
                  <button
                    onClick={() => handleAddCheckout(equipment.id)}
                    className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 transition-colors duration-200 flex items-center"
                    disabled={equipment.availableQuantity === 0}
                  >
                    <Plus size={14} className="mr-1" />
                    New Checkout
                  </button>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Available: <span className="font-medium text-green-600 dark:text-green-400">{equipment.availableQuantity}</span> / {equipment.totalQuantity}
                </p>
                <div className="w-32 h-2 bg-gray-200 dark:bg-gray-600 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(equipment.availableQuantity / equipment.totalQuantity) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Checkout List */}
            {equipment.checkouts.length > 0 && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {equipment.checkouts
                  .filter(checkout => showReturned || !checkout.returned)
                  .map(checkout => (
                    <div 
                      key={checkout.id} 
                      className={`p-3 flex flex-col sm:flex-row justify-between items-start sm:items-center ${
                        checkout.returned ? 'bg-green-50 dark:bg-green-900/10' : ''
                      }`}
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium dark:text-white">{checkout.studentName}</p>
                        <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400 space-x-4">
                          <span>{checkout.studentYear} Year</span>
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{checkout.startTime} - {checkout.endTime}</span>
                          </div>
                          <div className="flex items-center">
                            <ShoppingBag size={14} className="mr-1" />
                            <span>Date: {checkout.checkoutDate}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center text-sm">
                          <Clock size={14} className="mr-1 text-orange-500" />
                          <span>Due: {checkout.dueDate}</span>
                        </div>
                        
                        {checkout.returned ? (
                          <span className="flex items-center text-green-600 text-sm">
                            <Check size={16} className="mr-1" />
                            Returned
                          </span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => handleEditCheckout(equipment.id, checkout)}
                              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              aria-label="Edit checkout"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => handleMarkAsReturned(equipment.id, checkout.id)}
                              className="flex items-center text-sm px-2 py-1 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/40 transition-colors duration-200"
                            >
                              <RotateCcw size={14} className="mr-1" />
                              Mark Returned
                            </button>
                            <button 
                              onClick={() => handleDeleteCheckout(equipment.id, checkout.id)}
                              className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              aria-label="Delete checkout"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
            
            {equipment.checkouts.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No checkouts for this equipment
              </div>
            )}
          </div>
        ))}
        
        {filteredEquipments.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No equipment found in this category
          </div>
        )}
      </div>

      {/* Add/Edit Checkout Modal */}
      {showModal && editingEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 dark:text-white">
              {editingCheckout ? 'Edit Checkout' : 'New Checkout'}
            </h3>
            <form onSubmit={handleSubmitCheckout}>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="studentName">
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  value={newCheckout.studentName}
                  onChange={(e) => setNewCheckout({ ...newCheckout, studentName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="studentYear">
                  Year
                </label>
                <select
                  id="studentYear"
                  value={newCheckout.studentYear}
                  onChange={(e) => setNewCheckout({ ...newCheckout, studentYear: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="startTime">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    value={newCheckout.startTime}
                    onChange={(e) => setNewCheckout({ ...newCheckout, startTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="endTime">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    value={newCheckout.endTime}
                    onChange={(e) => setNewCheckout({ ...newCheckout, endTime: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="checkoutDate">
                    Checkout Date
                  </label>
                  <input
                    type="date"
                    id="checkoutDate"
                    value={newCheckout.checkoutDate}
                    onChange={(e) => setNewCheckout({ ...newCheckout, checkoutDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="dueDate">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    value={newCheckout.dueDate}
                    onChange={(e) => setNewCheckout({ ...newCheckout, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newCheckout.lostResponsibility}
                    onChange={(e) => setNewCheckout({ ...newCheckout, lostResponsibility: e.target.checked })}
                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    Student accepts responsibility if item is lost
                  </span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 dark:text-white transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  {editingCheckout ? 'Update' : 'Add'} Checkout
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentManager;