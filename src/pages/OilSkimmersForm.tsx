import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';

interface FormData {
    company_name: string;
    address: string;
    city_state: string;
    zip_code: string;
    contact_name: string;
    email: string;
    phone: string;
    mobile_phone: string;
    oil_floats: string; // 'yes' | 'no'
    viscosity: string; // 'light' | 'medium' | 'heavy' | 'other'
    viscosity_other: string;
    oil_amount: string;
    voltage: string; // '120' | '240'
    location: string; // 'interior' | 'exterior'
    container_type: string[]; // checkboxes
    container_other: string;
}

const initialFormState: FormData = {
    company_name: '',
    address: '',
    city_state: '',
    zip_code: '',
    contact_name: '',
    email: '',
    phone: '',
    mobile_phone: '',
    oil_floats: 'yes',
    viscosity: 'medium',
    viscosity_other: '',
    oil_amount: '',
    voltage: '120',
    location: 'interior',
    container_type: [],
    container_other: ''
};

export default function OilSkimmersForm() {
    const [formData, setFormData] = useState<FormData>(initialFormState);
    const [file, setFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        if (name === 'container_type') {
            setFormData(prev => {
                const current = prev.container_type;
                if (checked) return { ...prev, container_type: [...current, value] };
                return { ...prev, container_type: current.filter(item => item !== value) };
            });
        }
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const data = new FormData();
        // Append all text fields
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => data.append(`${key}[]`, v));
            } else {
                data.append(key, value);
            }
        });

        // Append file
        if (file) {
            data.append('attachment', file);
        }

        try {
            const response = await fetch('/oil_mail.php', {
                method: 'POST',
                body: data // Sending FormData handles multipart/form-data automatically
            });

            if (response.ok) {
                setStatus('success');
                setFormData(initialFormState);
                setFile(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F2F4F7]">
            <Header />

            <main className="flex-grow pt-28 pb-16 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                    <div className="bg-[#0F2A44] py-8 px-8 text-center">
                        <h1 className="text-3xl font-bold text-white mb-2">Cuestionario Técnico: Oil Skimmers</h1>
                        <p className="text-gray-300">Recolección de datos para aplicaciones de desgrasadores industriales.</p>
                    </div>

                    {status === 'success' ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h2 className="text-2xl font-bold text-[#0F2A44] mb-2">¡Información Enviada!</h2>
                            <p className="text-gray-600">Gracias. La información fue enviada correctamente. Un asesor técnico se pondrá en contacto pronto.</p>
                            <button onClick={() => setStatus('idle')} className="mt-6 text-[#00C2CB] font-medium hover:underline">Enviar otro formulario</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-8 space-y-8">

                            {/* 1. Datos de la Empresa */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">1. Datos de la Empresa</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la Compañía</label>
                                        <input required name="company_name" value={formData.company_name} onChange={handleChange} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] focus:border-transparent outline-none" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                                        <input required name="address" value={formData.address} onChange={handleChange} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] output-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ciudad y Estado</label>
                                        <input required name="city_state" value={formData.city_state} onChange={handleChange} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Código Postal</label>
                                        <input required name="zip_code" value={formData.zip_code} onChange={handleChange} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                </div>
                            </section>

                            {/* 2. Datos de Contacto */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">2. Datos de Contacto</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Contacto</label>
                                        <input required name="contact_name" value={formData.contact_name} onChange={handleChange} type="text" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                        <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono Móvil</label>
                                        <input name="mobile_phone" value={formData.mobile_phone} onChange={handleChange} type="tel" className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                </div>
                            </section>

                            {/* 3. Información del Aceite */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">3. Información del Aceite</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">¿El aceite flota?</label>
                                        <div className="flex space-x-6">
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="oil_floats" value="yes" checked={formData.oil_floats === 'yes'} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                <span className="ml-2">Sí</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="oil_floats" value="no" checked={formData.oil_floats === 'no'} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                <span className="ml-2">No</span>
                                            </label>
                                        </div>
                                        <p className="text-xs text-amber-600 mt-1 bg-amber-50 p-2 rounded inline-block">
                                            Nota: El aceite debe poder flotar para que el equipo funcione correctamente; se requiere un espacio sin turbulencia.
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Nivel de viscosidad</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            {['light', 'medium', 'heavy', 'other'].map((v) => (
                                                <label key={v} className="inline-flex items-center border p-3 rounded cursor-pointer hover:bg-gray-50">
                                                    <input type="radio" name="viscosity" value={v} checked={formData.viscosity === v} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                    <span className="ml-2 capitalize">{v === 'other' ? 'Otro' : v === 'light' ? 'Ligero' : v === 'medium' ? 'Medio' : 'Pesado'}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {formData.viscosity === 'other' && (
                                            <input type="text" name="viscosity_other" placeholder="Especifique..." value={formData.viscosity_other} onChange={handleChange} className="mt-2 w-full p-2 border border-gray-300 rounded" />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Cantidad estimada de aceite a remover (litros/día)</label>
                                        <input required name="oil_amount" value={formData.oil_amount} onChange={handleChange} type="number" step="0.1" className="w-full md:w-1/2 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00C2CB] outline-none" />
                                    </div>
                                </div>
                            </section>

                            {/* 4. Eléctrica y 5. Ubicación */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <section>
                                    <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">4. Información Eléctrica</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Voltaje disponible</label>
                                        <div className="flex space-x-6">
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="voltage" value="120" checked={formData.voltage === '120'} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                <span className="ml-2">120 V</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="voltage" value="240" checked={formData.voltage === '240'} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                <span className="ml-2">240 V</span>
                                            </label>
                                        </div>
                                    </div>
                                </section>

                                <section>
                                    <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">5. Ubicación</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Entorno</label>
                                        <div className="flex space-x-6">
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="location" value="interior" checked={formData.location === 'interior'} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                <span className="ml-2">Interior</span>
                                            </label>
                                            <label className="inline-flex items-center">
                                                <input type="radio" name="location" value="exterior" checked={formData.location === 'exterior'} onChange={handleChange} className="form-radio text-[#00C2CB]" />
                                                <span className="ml-2">Exterior</span>
                                            </label>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* 6. Tipo de Contenedor */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">6. Tipo de Contenedor</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {['Laguna', 'Tanque', 'Acequia', 'Cisterna'].map((type) => (
                                        <label key={type} className="inline-flex items-center">
                                            <input type="checkbox" name="container_type" value={type} checked={formData.container_type.includes(type)} onChange={handleCheckboxChange} className="form-checkbox text-[#00C2CB]" />
                                            <span className="ml-2">{type}</span>
                                        </label>
                                    ))}
                                    <label className="inline-flex items-center col-span-2">
                                        <input type="checkbox" name="container_type" value="Other" checked={formData.container_type.includes('Other')} onChange={handleCheckboxChange} className="form-checkbox text-[#00C2CB]" />
                                        <span className="ml-2">Otro:</span>
                                        <input type="text" name="container_other" value={formData.container_other} onChange={handleChange} disabled={!formData.container_type.includes('Other')} className="ml-2 p-1 border-b border-gray-300 focus:border-[#00C2CB] outline-none flex-grow" />
                                    </label>
                                </div>
                            </section>

                            {/* 7. Archivos */}
                            <section>
                                <h3 className="text-xl font-bold text-[#0F2A44] border-b pb-2 mb-4">7. Archivos de Apoyo</h3>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                                    <label className="cursor-pointer">
                                        <span className="block text-sm font-medium text-gray-600">Subir fotos, croquis o plano (Opcional)</span>
                                        <span className="block text-xs text-gray-400 mt-1">Máx. 5MB (JPG, PNG, PDF)</span>
                                        <input type="file" name="attachment" onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.pdf" />
                                        <div className="mt-4 inline-block bg-white border border-gray-300 px-4 py-2 rounded shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                                            {file ? file.name : 'Seleccionar Archivo'}
                                        </div>
                                    </label>
                                </div>
                            </section>

                            <div className="pt-6">
                                <button type="submit" disabled={isSubmitting} className="w-full bg-[#00C2CB] hover:bg-[#009FA7] text-white font-bold py-4 px-8 rounded shadow-lg transition-transform transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                                    {isSubmitting ? 'Enviando...' : 'ENVIAR INFORMACIÓN'}
                                </button>
                                {status === 'error' && (
                                    <p className="text-red-600 text-center mt-4">Hubo un error al enviar. Por favor intente de nuevo.</p>
                                )}
                            </div>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
