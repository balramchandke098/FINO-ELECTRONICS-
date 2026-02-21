
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Product } from '../../types';
import { XMarkIcon, PencilSquareIcon, TrashIcon, PlusIcon } from '../../components/Icons';

const AdminProductForm: React.FC<{ product?: Product; onSave: (product: any) => void; onCancel: () => void; }> = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Partial<Product>>(
        product || {
            name: '', category: '', price: 0, stock: 0, sku: '',
            shortDescription: '', fullDescription: '', specifications: {}, images: [], status: 'In Stock'
        }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'stock' || name === 'discountPrice' ? parseFloat(value) : value }));
    };

    const handleSpecChange = (key: string, value: string) => {
        setFormData(prev => ({...prev, specifications: {...prev.specifications, [key]: value}}))
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center">
            <div className="bg-admin-card rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-admin-card z-10">
                    <h2 className="text-xl font-bold text-white">{product ? 'Edit Product' : 'Add New Product'}</h2>
                    <button onClick={onCancel} className="text-cool-gray hover:text-white"><XMarkIcon className="w-6 h-6" /></button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Fields like name, category, sku */}
                        <div>
                            <label className="block text-sm font-medium text-cool-gray">Product Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-cool-gray">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} required className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                         <div>
                            <label className="block text-sm font-medium text-cool-gray">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-cool-gray">Discount Price</label>
                            <input type="number" name="discountPrice" value={formData.discountPrice || ''} onChange={handleChange} className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-cool-gray">Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} required className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-cool-gray">Status</label>
                            <select name="status" value={formData.status} onChange={handleChange} className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white">
                                <option>In Stock</option>
                                <option>Out of Stock</option>
                            </select>
                        </div>
                    </div>
                    {/* Descriptions */}
                     <div>
                        <label className="block text-sm font-medium text-cool-gray">Short Description</label>
                        <textarea name="shortDescription" value={formData.shortDescription} onChange={handleChange} rows={2} className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white"></textarea>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-cool-gray">Full Description</label>
                        <textarea name="fullDescription" value={formData.fullDescription} onChange={handleChange} rows={4} className="mt-1 w-full bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white"></textarea>
                    </div>
                    {/* Specs */}
                     <div>
                         <h3 className="text-lg font-semibold text-white mb-2">Specifications</h3>
                         {Object.entries(formData.specifications || {}).map(([key, value]) => (
                             <div key={key} className="flex gap-2 mb-2">
                                <input type="text" value={key} readOnly className="w-1/3 bg-[#3a3e47] border-gray-600 rounded-md p-2 text-cool-gray" />
                                <input type="text" value={value} onChange={(e) => handleSpecChange(key, e.target.value)} className="w-2/3 bg-[#2a2e37] border-gray-600 rounded-md p-2 text-white" />
                             </div>
                         ))}
                          {/* A simple way to add new specs */}
                         <button type="button" onClick={() => handleSpecChange(`New Spec ${Object.keys(formData.specifications || {}).length + 1}`, '')} className="text-sm text-royal-purple hover:underline">Add Specification</button>
                    </div>
                    <div className="p-6 border-t border-gray-700 flex justify-end gap-4 sticky bottom-0 bg-admin-card z-10">
                        <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Cancel</button>
                        <button type="submit" className="bg-royal-purple hover:opacity-90 text-white font-bold py-2 px-4 rounded">Save Product</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminProductsPage: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useData();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);

    const handleSave = (productData: Omit<Product, 'id' | 'popularity'> | Product) => {
        if ('id' in productData) {
            updateProduct(productData as Product);
        } else {
            addProduct(productData);
        }
        setIsFormOpen(false);
        setEditingProduct(undefined);
    };

    const openAddForm = () => {
        setEditingProduct(undefined);
        setIsFormOpen(true);
    };

    const openEditForm = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Products</h1>
                <button onClick={openAddForm} className="bg-royal-purple text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2">
                    <PlusIcon className="w-5 h-5"/> Add Product
                </button>
            </div>

            {isFormOpen && <AdminProductForm product={editingProduct} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />}
            
            <div className="bg-admin-card rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                     <table className="w-full text-sm text-left text-cool-gray">
                        <thead className="text-xs text-gray-400 uppercase bg-[#111318]">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Category</th>
                                <th className="px-6 py-3">Price</th>
                                <th className="px-6 py-3">Stock</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.id} className="bg-admin-card border-b border-gray-800 hover:bg-[#2a2e37]">
                                    <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                                    <td className="px-6 py-4">{product.category}</td>
                                    <td className="px-6 py-4">${(product.discountPrice || product.price).toLocaleString()}</td>
                                    <td className="px-6 py-4">{product.stock}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.status === 'In Stock' ? 'bg-success-green/20 text-success-green' : 'bg-error-red/20 text-error-red'}`}>
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex justify-end gap-4">
                                        <button onClick={() => openEditForm(product)} className="text-electric-blue hover:text-white"><PencilSquareIcon className="w-5 h-5"/></button>
                                        <button onClick={() => deleteProduct(product.id)} className="text-error-red hover:text-white"><TrashIcon className="w-5 h-5" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                     </table>
                </div>
            </div>
        </div>
    );
};

export default AdminProductsPage;
