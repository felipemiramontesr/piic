import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import Header from '../sections/Header';
import Footer from '../sections/Footer';
import './OilSkimmersForm.css';

const MEXICAN_STATES = [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
    "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato",
    "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca",
    "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco",
    "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"
];

interface FormData {
    company_name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    contact_name: string;
    email: string;
    phone: string;
    mobile_phone: string;
    oil_floats: string;
    viscosity: string;
    viscosity_other: string;
    oil_amount: string;
    voltage: string;
    location: string;
    container_type: string[];
    container_other: string;
}

const initialFormState: FormData = {
    company_name: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    contact_name: '',
    email: '',
    phone: '',
    mobile_phone: '',
    oil_floats: '',
    viscosity: '',
    viscosity_other: '',
    oil_amount: '',
    voltage: '',
    location: '',
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

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (validTypes.includes(droppedFile.type)) {
                setFile(droppedFile);
            } else {
                alert('Solo se permiten archivos JPG, PNG o PDF.');
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // Custom validation: At least one container type
        if (formData.container_type.length === 0) {
            alert('Por favor seleccione al menos un tipo de contenedor.');
            return;
        }

        setIsSubmitting(true);
        setStatus('idle');

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach(v => data.append(`${key}[]`, v));
            } else {
                data.append(key, value);
            }
        });

        if (file) {
            data.append('attachment', file);
        }

        try {
            const response = await fetch('/oil_mail.php', {
                method: 'POST',
                body: data
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
        <div className="oil-form-page">
            <Header simpleMode={true} />

            <div className="oil-form-container">
                <div className="oil-form-header">
                    <h1>Cuestionario Técnico: Oil Skimmers</h1>
                    <p>Recolección de datos para aplicaciones de desgrasadores industriales</p>
                </div>

                {status === 'success' ? (
                    <div className="success-message">
                        <div className="success-icon"><i className="fa-solid fa-circle-check"></i></div>
                        <h2>¡Información Enviada!</h2>
                        <p>Gracias. La información técnica fue enviada correctamente. Un asesor se pondrá en contacto pronto.</p>
                        <button onClick={() => setStatus('idle')} className="btn-submit" style={{ maxWidth: '200px' }}>
                            Enviar otro
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="oil-form-body">
                        <p className="form-disclaimer">* Campos obligatorios</p>

                        {/* 1. Datos de la Empresa */}
                        <section className="form-section">
                            <h3><i className="fa-solid fa-building section-icon"></i>1. Datos de la Empresa</h3>
                            <div className="form-grid">
                                <div className="form-group col-span-2">
                                    <label>Nombre de la Compañía *</label>
                                    <input required name="company_name" value={formData.company_name} onChange={handleChange} type="text" className="form-input" />
                                </div>
                                <div className="form-group col-span-2">
                                    <label>Dirección *</label>
                                    <input required name="address" value={formData.address} onChange={handleChange} type="text" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Estado *</label>
                                    <select required name="state" value={formData.state} onChange={handleChange} className="form-input">
                                        <option value="">Seleccione un estado</option>
                                        {MEXICAN_STATES.map(state => (
                                            <option key={state} value={state}>{state}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Ciudad *</label>
                                    <input required name="city" value={formData.city} onChange={handleChange} type="text" className="form-input" placeholder="Ej. Guadalupe" />
                                </div>
                                <div className="form-group col-span-2">
                                    <label>Código Postal *</label>
                                    <input required name="zip_code" value={formData.zip_code} onChange={handleChange} type="text" className="form-input" />
                                </div>
                            </div>
                        </section>

                        {/* 2. Datos de Contacto */}
                        <section className="form-section">
                            <h3><i className="fa-solid fa-user-tie section-icon"></i>2. Datos de Contacto</h3>
                            <div className="form-grid">
                                <div className="form-group col-span-2">
                                    <label>Nombre del Contacto *</label>
                                    <input required name="contact_name" value={formData.contact_name} onChange={handleChange} type="text" className="form-input" />
                                </div>
                                <div className="form-group col-span-2">
                                    <label>Email *</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="tel" className="form-input" />
                                </div>
                                <div className="form-group">
                                    <label>Teléfono Móvil *</label>
                                    <input required name="mobile_phone" value={formData.mobile_phone} onChange={handleChange} type="tel" className="form-input" />
                                </div>
                            </div>
                        </section>

                        {/* 3. Información del Aceite */}
                        <section className="form-section">
                            <h3><i className="fa-solid fa-droplet section-icon"></i>3. Información del Aceite</h3>
                            <div className="form-grid">
                                <div className="form-group col-span-2">
                                    <label>¿El aceite flota? *</label>
                                    <div className="form-radio-group">
                                        <label className="radio-label">
                                            <input required type="radio" name="oil_floats" value="yes" checked={formData.oil_floats === 'yes'} onChange={handleChange} />
                                            Sí
                                        </label>
                                        <label className="radio-label">
                                            <input required type="radio" name="oil_floats" value="no" checked={formData.oil_floats === 'no'} onChange={handleChange} />
                                            No
                                        </label>
                                    </div>
                                    <div className="form-note">
                                        Nota: El aceite debe poder flotar para que el equipo funcione correctamente; se requiere un espacio sin turbulencia.
                                    </div>
                                </div>

                                <div className="form-group col-span-2">
                                    <label>Nivel de viscosidad *</label>
                                    <div className="form-radio-group">
                                        {['light', 'medium', 'heavy', 'other'].map((v) => (
                                            <label key={v} className="radio-label">
                                                <input required type="radio" name="viscosity" value={v} checked={formData.viscosity === v} onChange={handleChange} />
                                                {v === 'other' ? 'Otro' : v === 'light' ? 'Ligero' : v === 'medium' ? 'Medio' : 'Pesado'}
                                            </label>
                                        ))}
                                    </div>
                                    {formData.viscosity === 'other' && (
                                        <input required type="text" name="viscosity_other" placeholder="Especifique..." value={formData.viscosity_other} onChange={handleChange} className="form-input" style={{ marginTop: '10px' }} />
                                    )}
                                </div>

                                <div className="form-group col-span-2">
                                    <label>Cantidad estimada de aceite a remover (litros/día) *</label>
                                    <input required name="oil_amount" value={formData.oil_amount} onChange={handleChange} type="number" step="0.1" className="form-input" style={{ maxWidth: '50%' }} />
                                </div>
                            </div>
                        </section>

                        {/* 4. Información Eléctrica y 5. Ubicación */}
                        <div className="form-grid">
                            <section className="form-section">
                                <h3><i className="fa-solid fa-plug-circle-bolt section-icon"></i>4. Información Eléctrica</h3>
                                <div className="form-group">
                                    <label>Voltaje disponible *</label>
                                    <div className="form-radio-group">
                                        <label className="radio-label">
                                            <input required type="radio" name="voltage" value="120" checked={formData.voltage === '120'} onChange={handleChange} />
                                            120 V
                                        </label>
                                        <label className="radio-label">
                                            <input required type="radio" name="voltage" value="240" checked={formData.voltage === '240'} onChange={handleChange} />
                                            240 V
                                        </label>
                                    </div>
                                </div>
                            </section>

                            <section className="form-section">
                                <h3><i className="fa-solid fa-map-location-dot section-icon"></i>5. Ubicación</h3>
                                <div className="form-group">
                                    <label>Entorno *</label>
                                    <div className="form-radio-group">
                                        <label className="radio-label">
                                            <input required type="radio" name="location" value="interior" checked={formData.location === 'interior'} onChange={handleChange} />
                                            Interior
                                        </label>
                                        <label className="radio-label">
                                            <input required type="radio" name="location" value="exterior" checked={formData.location === 'exterior'} onChange={handleChange} />
                                            Exterior
                                        </label>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* 6. Tipo de Contenedor */}
                        <section className="form-section">
                            <h3><i className="fa-solid fa-industry section-icon"></i>6. Tipo de Contenedor *</h3>
                            <div className="form-radio-group">
                                {['Laguna', 'Tanque', 'Acequia', 'Cisterna'].map((type) => (
                                    <label key={type} className="radio-label">
                                        <input type="checkbox" name="container_type" value={type} checked={formData.container_type.includes(type)} onChange={handleCheckboxChange} />
                                        {type}
                                    </label>
                                ))}
                                <label className="radio-label">
                                    <input type="checkbox" name="container_type" value="Other" checked={formData.container_type.includes('Other')} onChange={handleCheckboxChange} />
                                    Otro:
                                    <input type="text" name="container_other" value={formData.container_other} onChange={handleChange} disabled={!formData.container_type.includes('Other')} className="form-input" style={{ marginLeft: '10px', padding: '4px', width: '150px' }} />
                                </label>
                            </div>
                        </section>

                        {/* 7. Archivos */}
                        <section className="form-section">
                            <h3><i className="fa-solid fa-file-lines section-icon"></i>7. Archivos de Apoyo</h3>
                            <p className="form-section-description">
                                Adjuntar planos, dibujos o fotografías de su proyecto actual nos ayudará a comprender mejor sus necesidades y agilizar el proceso de cotización.
                            </p>
                            <div
                                className={`file-upload-box ${isDragging ? 'drag-active' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                            >
                                <div className="file-upload-icon">
                                    <i className="fa-solid fa-cloud-arrow-up"></i>
                                </div>
                                <div className="file-upload-text">Arrastra tus archivos aquí</div>
                                <div className="file-upload-divider">o</div>
                                <label className="btn-upload">
                                    SELECCIONAR ARCHIVO
                                    <input type="file" name="attachment" onChange={handleFileChange} className="hidden" accept=".jpg,.jpeg,.png,.pdf" style={{ display: 'none' }} />
                                </label>
                                <div className="file-upload-hint">Máx. 5MB (JPG, PNG, PDF)</div>
                                {file && (
                                    <div className="selected-file">
                                        <i className="fa-solid fa-circle-check"></i> {file.name}
                                    </div>
                                )}
                            </div>
                        </section>

                        <button type="submit" disabled={isSubmitting} className="btn-submit">
                            {isSubmitting ? 'Enviando...' : 'ENVIAR INFORMACIÓN'}
                        </button>
                    </form>
                )}
            </div>
            <Footer />
        </div>
    );
}
