/**
 * Landing copy + screenshots. To swap a screenshot: drop the PNG in
 * public/img/screens/ and change its `screen` value (filename noted on each).
 */
import { Ruler, Target, CalendarDays, Heart, type LucideIcon } from 'lucide-react'

// ponytail: single placeholder until real captures exist
const PH = '/img/screens/placeholder.svg'

export interface Step {
  title: string
  text: string
  screen: string
}

export const TOUR: Step[] = [
  { title: 'Elige o crea tu rutina', text: 'Parte de una rutina lista por grupo muscular, explora las de la comunidad o arma la tuya desde cero.', screen: PH /* rutinas.png */ },
  { title: 'Entrena con guía', text: 'Cada ejercicio con su animación, temporizador de descanso y sonidos que te marcan el ritmo.', screen: PH /* sesion.png */ },
  { title: 'Registra cada serie', text: 'Peso y repeticiones en segundos. G-Pulse detecta tus récords personales automáticamente.', screen: PH /* series.png */ },
  { title: 'Mira cómo avanzas', text: 'Volumen, historial y evolución por ejercicio. Datos claros para saber si estás progresando.', screen: PH /* progreso.png */ },
]

export interface Highlight extends Step {
  eyebrow: string
}

export const HIGHLIGHTS: Highlight[] = [
  { eyebrow: 'Coach con IA', title: 'Rutinas creadas para ti en segundos', text: 'Dile a la IA qué músculo quieres trabajar, tu nivel y el equipo que tienes. G-Pulse genera una rutina completa lista para entrenar.', screen: PH /* ia.png */ },
  { eyebrow: 'Biblioteca', title: '1360 ejercicios con animación', text: 'Cada ejercicio con músculos trabajados, equipamiento e instrucciones paso a paso. Busca, filtra y guarda tus favoritos.', screen: PH /* biblioteca.png */ },
  { eyebrow: 'Comunidad', title: 'Entrena acompañado', text: 'Sigue a otros atletas, descubre sus rutinas públicas, dales like y cópialas a tu biblioteca con un toque.', screen: PH /* explorar.png */ },
]

export const EXTRAS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Ruler, title: 'Medidas corporales', text: 'Peso y medidas en el tiempo.' },
  { icon: Target, title: 'Metas', text: 'Objetivos claros y su avance.' },
  { icon: CalendarDays, title: 'Agenda semanal', text: 'Qué entrenas cada día.' },
  { icon: Heart, title: 'Favoritos', text: 'Tus ejercicios y rutinas a mano.' },
]

// TODO(precios): confirmar precios y periodo de la cuota IA antes de publicar
export const PLANS = [
  { name: 'Basic', price: 'Gratis', ai: '1 rutina con IA', featured: false },
  { name: 'Pro', price: 'Próximamente', ai: '3 rutinas con IA', featured: true },
  { name: 'Expert', price: 'Próximamente', ai: '5 rutinas con IA', featured: false },
]
export const PLAN_COMMON = ['Biblioteca de 1360 ejercicios', 'Rutinas personalizadas', 'Progreso y récords', 'Comunidad']

export const FAQ = [
  { q: '¿G-Pulse es gratis?', a: 'Sí. El plan Basic es gratuito e incluye la biblioteca completa, rutinas, progreso y comunidad. Los planes Pro y Expert amplían el uso del coach con IA.' },
  { q: '¿En qué dispositivos funciona?', a: 'Por ahora en Android a través de Google Play.' },
  { q: '¿Necesito ir a un gimnasio?', a: 'No. Puedes filtrar ejercicios por el equipo que tengas, incluso solo con tu peso corporal.' },
  { q: '¿Mis datos están seguros?', a: 'Sí. Tu cuenta está protegida con inicio de sesión seguro y en la comunidad solo aparece lo que tú decides publicar.' },
  { q: '¿Sirve si soy principiante?', a: 'Sí. Cada ejercicio trae animación e instrucciones, y la IA adapta la rutina a tu nivel.' },
]
