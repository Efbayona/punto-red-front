// import {type ChangeEvent, type ReactNode, useState} from "react";
// import {
//     CreditCard,
//     Download,
//     Filter,
//     History,
//     LayoutDashboard,
//     Plus,
//     Search,
//     Settings,
//     Smartphone,
//     Users
// } from "lucide-react";
//
// interface Recarga {
//     id: string;
//     numero: string;
//     operador: string;
//     monto: string;
//     estado: "completada" | "pendiente" | "fallida";
//     fecha: string;
//     hora: string;
// }
//
// const operadores = [
//     { value: "Movistar", label: "Movistar" },
//     { value: "Claro", label: "Claro" },
//     { value: "Tigo", label: "Tigo" },
//     { value: "Personal", label: "Personal" },
// ]
//
// type ButtonSize = "md" | "sm" | "icon";
// type ButtonVariant = "default" | "outline" | "ghost";
//
// interface ButtonProps {
//     children: ReactNode;
//     onClick?: () => void;
//     variant?: ButtonVariant;
//     size?: ButtonSize;
//     className?: string;
//     type?: "button" | "submit" | "reset";
// }
//
// interface InputProps {
//     value: string;
//     onChange: (e: ChangeEvent<HTMLInputElement>) => void;
//     placeholder?: string;
//     className?: string;
// }
//
// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     children: ReactNode;
// }
//
// // Componente Button
// const Button = ({
//                     children,
//                     onClick,
//                     variant = "default",
//                     size = "md",
//                     className = "",
//                     type = "button",
//                 }: ButtonProps) => {
//     const base =
//         "inline-flex items-center justify-center font-medium transition-colors focus:outline-none";
//
//     const sizes: Record<ButtonSize, string> = {
//         md: "px-4 py-2 text-sm rounded-lg",
//         sm: "px-3 py-1 text-sm rounded-md",
//         icon: "p-2 rounded-lg",
//     };
//
//     const variants: Record<ButtonVariant, string> = {
//         default: "bg-blue-500 hover:bg-blue-600 text-white",
//         outline: "border border-gray-300 hover:bg-gray-100 text-gray-700",
//         ghost: "hover:bg-gray-100 text-gray-700",
//     };
//
//     return (
//         <button
//             type={type}
//             onClick={onClick}
//             className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
//         >
//             {children}
//         </button>
//     );
// };
//
// // Componente Input
// const Input = ({value, onChange, placeholder, className = ""}: InputProps) => (
//     <input
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={`border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
//     />
// );
//
// // Componente Modal
// const Modal = ({isOpen, onClose, children}: ModalProps) => {
//     if (!isOpen) return null;
//
//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center">
//             {/* Fondo */}
//             <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>
//
//             {/* Contenido */}
//             <div className="relative bg-white rounded-xl p-6 shadow-lg w-full max-w-md z-10">
//                 {children}
//                 <button
//                     onClick={onClose}
//                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//                 >
//                     ✕
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// // Componente Principal
// export default function Component() {
//     const [modalOpen, setModalOpen] = useState(false);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [formData, setFormData] = useState({operador: "", numero: "", monto: ""});
//
//     const [recargas, setRecargas] = useState<Recarga[]>([
//         {
//             id: "RC001",
//             numero: "0987654321",
//             operador: "Movistar",
//             monto: "50.00",
//             estado: "completada",
//             fecha: "2024-01-15",
//             hora: "14:30",
//         },
//         {
//             id: "RC002",
//             numero: "0976543210",
//             operador: "Claro",
//             monto: "30.00",
//             estado: "completada",
//             fecha: "2024-01-15",
//             hora: "13:15",
//         },
//         {
//             id: "RC003",
//             numero: "0965432109",
//             operador: "Tigo",
//             monto: "100.00",
//             estado: "pendiente",
//             fecha: "2024-01-15",
//             hora: "12:45",
//         },
//         {
//             id: "RC004",
//             numero: "0954321098",
//             operador: "Personal",
//             monto: "25.00",
//             estado: "fallida",
//             fecha: "2024-01-15",
//             hora: "11:20",
//         },
//         {
//             id: "RC005",
//             numero: "0943210987",
//             operador: "Movistar",
//             monto: "75.00",
//             estado: "completada",
//             fecha: "2024-01-14",
//             hora: "16:10",
//         },
//     ]);
//
//     const operadorColors = {
//         Movistar: "bg-red-500",
//         Claro: "bg-red-600",
//         Tigo: "bg-blue-600",
//         Personal: "bg-yellow-500",
//     };
//
//     const handleNuevaRecarga = (nuevaRecarga: { operador: string; numero: string; monto: string }) => {
//         const recarga: Recarga = {
//             id: `RC${String(recargas.length + 1).padStart(3, "0")}`,
//             numero: nuevaRecarga.numero,
//             operador: nuevaRecarga.operador.charAt(0).toUpperCase() + nuevaRecarga.operador.slice(1),
//             monto: nuevaRecarga.monto,
//             estado: "completada",
//             fecha: new Date().toISOString().split("T")[0],
//             hora: new Date().toLocaleTimeString("es-ES", {hour: "2-digit", minute: "2-digit"}),
//         };
//         setRecargas([recarga, ...recargas]);
//     };
//
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!formData.operador || !formData.numero || !formData.monto) return;
//         handleNuevaRecarga(formData);
//         setFormData({operador: "", numero: "", monto: ""});
//         setModalOpen(false);
//     };
//
//     const filteredRecargas = recargas.filter(
//         (recarga) =>
//             recarga.numero.includes(searchTerm) ||
//             recarga.operador.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             recarga.id.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     const sidebarItems = [
//         {icon: LayoutDashboard, label: "Dashboard", active: true},
//         {icon: Smartphone, label: "Recargas", active: false},
//         {icon: History, label: "Historial", active: false},
//         {icon: Users, label: "Usuarios", active: false},
//         {icon: Settings, label: "Configuración", active: false},
//     ];
//
//     return (
//         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//             <div className="flex h-screen relative z-10">
//                 {/* Sidebar */}
//                 <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 p-6">
//                     <div className="flex items-center gap-3 mb-8">
//                         <div
//                             className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
//                             <Smartphone className="w-6 h-6 text-white"/>
//                         </div>
//                         <div>
//                             <h1 className="font-bold text-lg text-gray-800">RecargaApp</h1>
//                             <p className="text-sm text-gray-500">Admin Panel</p>
//                         </div>
//                     </div>
//
//                     <nav className="space-y-2">
//                         {sidebarItems.map((item, index) => (
//                             <button
//                                 key={index}
//                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
//                                     item.active
//                                         ? "bg-blue-50 text-blue-600 font-medium"
//                                         : "text-gray-600 hover:bg-gray-50"
//                                 }`}
//                             >
//                                 <item.icon className="w-5 h-5"/>
//                                 {item.label}
//                             </button>
//                         ))}
//                     </nav>
//                 </div>
//
//                 {/* Main */}
//                 <div className="flex-1 flex flex-col">
//                     {/* Header */}
//                     <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-4">
//                         <div className="flex items-center justify-between">
//                             <div>
//                                 <h1 className="text-2xl font-bold text-gray-800">Historial de Recargas</h1>
//                                 <p className="text-gray-500">Gestiona y monitorea todas las recargas</p>
//                             </div>
//
//                             <div className="flex items-center gap-4">
//                                 <div className="relative">
//                                     <Search
//                                         className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
//                                     <Input
//                                         placeholder="Buscar recargas..."
//                                         value={searchTerm}
//                                         onChange={(e) => setSearchTerm(e.target.value)}
//                                         className="pl-10 w-80 bg-white/50 border-gray-200 rounded-xl"
//                                     />
//                                 </div>
//
//                                 <Button onClick={() => setModalOpen(true)}
//                                         className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6">
//                                     <Plus className="w-4 h-4 mr-2"/>Nueva Recarga
//                                 </Button>
//                             </div>
//                         </div>
//                     </header>
//
//                     {/* Tabla */}
//                     <main className="flex-1 p-8">
//                         <div
//                             className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden">
//                             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                                 <h2 className="text-lg font-semibold text-gray-800">
//                                     Recargas Recientes ({filteredRecargas.length})
//                                 </h2>
//                                 <div className="flex gap-2">
//                                     <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
//                                         <Filter className="w-4 h-4 mr-2"/>
//                                         Filtrar
//                                     </Button>
//                                     <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
//                                         <Download className="w-4 h-4 mr-2"/>
//                                         Exportar
//                                     </Button>
//                                 </div>
//                             </div>
//
//                             <table className="w-full border-collapse">
//                                 <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">ID</th>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Número</th>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Operador</th>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Monto</th>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Estado</th>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Fecha</th>
//                                     <th className="px-6 py-3 text-left font-semibold text-gray-700">Hora</th>
//                                 </tr>
//                                 </thead>
//                                 <tbody>
//                                 {filteredRecargas.map((recarga) => (
//                                     <tr key={recarga.id} className="border-t border-gray-100 hover:bg-gray-50/50">
//                                         <td className="px-6 py-3 font-medium text-gray-800">{recarga.id}</td>
//                                         <td className="px-6 py-3 font-mono text-gray-700">{recarga.numero}</td>
//                                         <td className="px-6 py-3">
//                                             <div className="flex items-center gap-2">
//                                                 <div
//                                                     className={`w-3 h-3 rounded-full ${
//                                                         operadorColors[recarga.operador as keyof typeof operadorColors]
//                                                     }`}
//                                                 />
//                                                 <span className="font-medium text-gray-700">{recarga.operador}</span>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-3 font-bold text-gray-800">${recarga.monto}</td>
//                                         <td className="px-6 py-3">{recarga.estado}</td>
//                                         <td className="px-6 py-3 text-gray-600">{recarga.fecha}</td>
//                                         <td className="px-6 py-3 text-gray-600">{recarga.hora}</td>
//                                     </tr>
//                                 ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </main>
//                 </div>
//             </div>
//
//             {/* Modal con formulario */}
//             <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
//                 <h2 className="text-xl font-bold mb-4">Nueva Recarga</h2>
//
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Operador */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Operador</label>
//                         <select
//                             value={formData.operador}
//                             onChange={(e) => setFormData({...formData, operador: e.target.value})}
//                             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
//                         >
//                             <option value="">Seleccione un operador</option>
//                             {operadores.map((op) => (
//                                 <option key={op.value} value={op.value}>
//                                     {op.label}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//
//                     {/* Número */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Número</label>
//                         <input
//                             type="text"
//                             value={formData.numero}
//                             onChange={(e) => setFormData({...formData, numero: e.target.value})}
//                             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
//                             placeholder="Ingrese el número"
//                         />
//                     </div>
//
//                     {/* Monto */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Monto</label>
//                         <input
//                             type="number"
//                             value={formData.monto}
//                             onChange={(e) => setFormData({...formData, monto: e.target.value})}
//                             className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
//                             placeholder="Ingrese el monto"
//                         />
//                     </div>
//
//                     {/* Botones */}
//                     <div className="flex justify-end gap-2">
//                         <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
//                             Cancelar
//                         </Button>
//                         <Button
//                             type="submit"
//                             className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
//                         >
//                             <CreditCard className="w-5 h-5"/>
//                             Guardar
//                         </Button>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// }
