# 🐉 Esferas del Dragón — Lista de Tareas

Una app de lista de tareas (To-Do List) con temática de **Dragon Ball**: añadí tareas, marcalas como completadas para subir tu poder de pelea y destruí las que ya no necesitás. Si te pasás de los 9.000... Shenron te lo va a agradecer. 🟠

## ✨ Funcionalidades

- ➕ **Añadir tareas** — invocá una esfera escribiendo tu deseo y presionando **⚡ ¡Invocar!** o Enter
- ☑️ **Marcar como completadas** — cada tarea tiene su propia esfera del dragón; al marcarla se ilumina con glow dorado
- 🗑️ **Eliminar tareas** — botón 💥 para destruir cualquier tarea con un puñetazo
- 🔍 **Filtros** — *Todas*, *Por reunir* (pendientes) y *Conseguidas* (completadas)
- 💾 **Persistencia** — las tareas se guardan en `localStorage`, sobreviven al cerrar el navegador

## ⚡ Poder de pelea

Cada tarea tiene un nivel de poder que elegís al crearla:

| Nivel | Poder |
|---|---|
| 🧑 Saiyajin | 500 |
| 🟡 Super Saiyajin | 2.000 |
| 🔵 SSJ Blue | 8.000 |
| ⚪ Migatte no Gokui | 25.000 |

El medidor de abajo de la app suma el poder de todas las tareas **completadas**:

- Crear tareas no sube el poder: hay que *ganar la pelea* completándolas 💪
- Al superar los **9.000**, aparece el grito épico: **"¡¡ESTÁ SUPERA LOS 9000!!"**
- El medidor baja si desmarcás o eliminás tareas completadas

## 💥 Kamehameha

El botón **KAMEHAMEHA** borra todas las tareas completadas de una sola vez, con un haz de energía animado y el grito "KA・ME・HA・ME・HA!" en pantalla.

## 🚀 Cómo usarla

No necesita instalación ni servidor. Solo abrí `index.html` con doble clic en tu navegador.

```bash
# opcional: servirla con un servidor local
npx serve .
```

## 🛠️ Tecnologías

- **HTML5** — estructura de la app
- **CSS3** — tema oscuro estilo anime, animaciones y glow
- **JavaScript (vanilla)** — lógica completa, sin frameworks ni dependencias

## 📁 Estructura del proyecto

```
to_do_list/
├── index.html   # Estructura de la app
├── styles.css   # Estilos y animaciones
├── app.js       # Lógica (tareas, niveles, medidor, efectos)
└── README.md
```

## 🔮 Ideas futuras

- 📅 Fechas límite (¡el deseo vence!)
- 🔀 Arrastrar y soltar para reordenar tareas
- 📤 Exportar / importar la lista
- 🌗 Modo claro (¿teletransportación al Templo de Kami?)
