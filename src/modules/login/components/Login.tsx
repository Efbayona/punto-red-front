import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {loginService, registerService} from "@/modules/login/services/AuthService.ts";
import type {LoginData, RegisterUserData} from "@/modules/login/interfaces/Auth.interfaces.ts";
import {Eye, EyeOff, MapPin} from "lucide-react";
import {toast} from "react-toastify";

export default function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [isLogin, setIsLogin] = useState(true);
	const [loginUsername, setLoginUsername] = useState("");
	const [loginPassword, setLoginPassword] = useState("");
	const [registerUsername, setRegisterUsername] = useState("");
	const [registerPassword, setRegisterPassword] = useState("");
	const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
	
	const navigate = useNavigate();
	
	const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		try {
			if (!loginUsername || !loginPassword) {
				alert("Por favor ingresa usuario y contraseña");
				return;
			}
			
			const dataUserLogin: LoginData = {
				user: loginUsername.toLowerCase(),
				password: loginPassword,
			};
			
			const result = await loginService(dataUserLogin, navigate);
			console.log("Login exitoso", result);
		} catch (error) {
			alert("Ocurrió un error: " + error);
		}
	};
	
	const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		
		try {
			if (!registerUsername || !registerPassword || !registerConfirmPassword) {
				alert("Por favor completa todos los campos");
				return;
			}
			if (registerPassword !== registerConfirmPassword) {
				alert("Las contraseñas no coinciden");
				return;
			}
			
			const dataUserRegister: RegisterUserData = {
				user_name: registerUsername.toLowerCase(),
				password: registerPassword,
				confirm_password: registerConfirmPassword
			};
			
			try {
				await registerService(dataUserRegister);
				toast.success("Usuario creado exitosamente, ¡bienvenido!");
			} catch (error) {
				console.log(error)
				toast.error("Error al registrar usuario");
			}
			
			setRegisterUsername("");
			setRegisterPassword("");
			setRegisterConfirmPassword("");
			
			setIsLogin(true);
		} catch (error) {
			alert("Ocurrió un error: " + error);
		}
	};
	
	return (
		<div
			className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
			{/* Fondos animados */}
			<div className="absolute inset-0 overflow-hidden">
				<div
					className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
				<div
					className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-200"></div>
				<div
					className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-500"></div>
			</div>
			
			{/* Contenido */}
			<div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md rounded-lg shadow-2xl p-8">
				{/* Icono */}
				<div
					className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
					<MapPin size={24} color="white"/>
				</div>
				
				{/* Pestañas */}
				<div className="flex bg-gray-100 rounded-lg p-1 mb-4">
					<button
						type="button"
						onClick={() => setIsLogin(true)}
						className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
							isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
						}`}
					>
						Iniciar sesión
					</button>
					<button
						type="button"
						onClick={() => setIsLogin(false)}
						className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
							!isLogin ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
						}`}
					>
						Registrarse
					</button>
				</div>
				
				{/* Formularios separados */}
				{isLogin ? (
					// Formulario Iniciar sesión
					<form onSubmit={handleLoginSubmit}>
						<div className="mb-4">
							<label htmlFor="username-login" className="text-sm font-medium text-gray-700 block mb-1">
								Usuario
							</label>
							<input
								id="username-login"
								type="text"
								placeholder="Nombre de usuario"
								value={loginUsername}
								onChange={(e) => setLoginUsername(e.target.value)}
								className="h-11 border border-gray-200 rounded px-3 focus:border-pink-600 focus:ring focus:ring-purple-300 w-full"
								required
							/>
						</div>
						
						<div className="mb-4">
							<label htmlFor="password-login" className="text-sm font-medium text-gray-700 block mb-1">
								Contraseña
							</label>
							<div className="relative">
								<input
									id="password-login"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={loginPassword}
									onChange={(e) => setLoginPassword(e.target.value)}
									className="h-11 border border-gray-200 rounded px-3 pr-10 focus:border-pink-600 focus:ring focus:ring-purple-300 w-full"
									required
								/>
								<button
									type="button"
									className="absolute right-3 top-3 text-gray-400 hover:text-pink-600"
									onClick={() => setShowPassword(!showPassword)}
									aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
								>
									{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
								</button>
							</div>
						</div>
						
						<div className="flex items-center justify-between mb-4">
							<label className="flex items-center space-x-2 text-sm text-gray-600">
								<input type="checkbox" className="w-4 h-4"/>
								<span>Recuérdame</span>
							</label>
							<a href="#" className="text-pink-600 hover:text-purple-700 text-sm">
								¿Olvidaste tu contraseña?
							</a>
						</div>
						
						<button
							className="w-full h-11 bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-700 text-white font-medium shadow-lg rounded-lg transition-colors duration-300"
							type="submit"
						>
							Iniciar sesión
						</button>
						
						<div className="text-center text-sm text-gray-600 mt-4">
							¿No tienes una cuenta?{" "}
							<button
								type="button"
								className="text-pink-600 hover:text-purple-700 font-medium"
								onClick={() => setIsLogin(false)}
							>
								Regístrate aquí
							</button>
						</div>
					</form>
				) : (
					// Formulario Registrarse
					<form onSubmit={handleRegisterSubmit}>
						<div className="mb-4">
							<label htmlFor="username-register" className="text-sm font-medium text-gray-700 block mb-1">
								Usuario
							</label>
							<input
								id="username-register"
								type="text"
								placeholder="Nombre de usuario"
								value={registerUsername}
								onChange={(e) => setRegisterUsername(e.target.value)}
								className="h-11 border border-gray-200 rounded px-3 focus:border-pink-600 focus:ring focus:ring-purple-300 w-full"
								required
							/>
						</div>
						
						<div className="mb-4">
							<label htmlFor="password-register" className="text-sm font-medium text-gray-700 block mb-1">
								Contraseña
							</label>
							<div className="relative">
								<input
									id="password-register"
									type={showPassword ? "text" : "password"}
									placeholder="••••••••"
									value={registerPassword}
									onChange={(e) => setRegisterPassword(e.target.value)}
									className="h-11 border border-gray-200 rounded px-3 pr-10 focus:border-pink-600 focus:ring focus:ring-purple-300 w-full"
									required
								/>
								<button
									type="button"
									className="absolute right-3 top-3 text-gray-400 hover:text-pink-600"
									onClick={() => setShowPassword(!showPassword)}
									aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
									{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
								</button>
							</div>
						</div>
						
						<div className="mb-4">
							<label htmlFor="password-register-confirm"
							       className="text-sm font-medium text-gray-700 block mb-1">
								Confirmar contraseña
							</label>
							<div className="relative">
								<input
									id="password-register-confirm"
									type={showPasswordConfirm ? "text" : "password"}
									placeholder="••••••••"
									value={registerConfirmPassword}
									onChange={(e) => setRegisterConfirmPassword(e.target.value)}
									className="h-11 border border-gray-200 rounded px-3 pr-10 focus:border-pink-600 focus:ring focus:ring-purple-300 w-full"
									required
								/>
								<button
									type="button"
									className="absolute right-3 top-3 text-gray-400 hover:text-pink-600"
									onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
									aria-label={showPasswordConfirm ? "Ocultar contraseña" : "Mostrar contraseña"}>
									{showPasswordConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
								</button>
							</div>
						</div>
						
						<button
							className="w-full h-11 bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-700 hover:to-purple-700 text-white font-medium shadow-lg rounded-lg transition-colors duration-300"
							type="submit">
							Registrarse
						</button>
						
						<div className="text-center text-sm text-gray-600 mt-4">
							¿Ya tienes una cuenta?{" "}
							<button
								type="button"
								className="text-pink-600 hover:text-purple-700 font-medium"
								onClick={() => setIsLogin(true)}>
								Inicia sesión
							</button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
