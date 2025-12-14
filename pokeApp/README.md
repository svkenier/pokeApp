# PokeApp

Una aplicación de Pokedex moderna y responsiva construida con React, diseñada para explorar información detallada de Pokémons, incluyendo estadísticas, evoluciones y tipos.

## Tecnologías Utilizadas

Este proyecto ha sido desarrollado utilizando las siguientes tecnologías y librerías clave:

### Core

- **[React](https://react.dev/) (v19)**: Biblioteca principal para la construcción de la interfaz de usuario.
- **[Vite](https://vitejs.dev/)**: Herramienta de compilación y entorno de desarrollo rápido.

### Estilos y UI

- **[Material UI (MUI)](https://mui.com/)**: Biblioteca de componentes de React para un diseño moderno y responsivo.
  - `@mui/material`: Componentes base.
  - `@mui/icons-material`: Iconografía.
- **CSS / Responsive Design**: Diseño adaptativo con breakpoints personalizados para móviles, tablets y diversos tamaños de escritorio.
- **Emotion / Styled Components**: Utilizados por MUI para el sistema de estilos.

### Gestión de Estado y Datos

- **Context API**: Manejo del estado global de la aplicación (selección de Pokemon, paginación, filtros).
- **[Axios](https://axios-http.com/)**: Cliente HTTP para realizar peticiones a la [PokéAPI](https://pokeapi.co/).

## Características

- **Listado de Pokémons**: Visualización de cartas con imágenes y tipos.
- **Detalle de Pokemon**: Vista detallada con estadísticas base, medidas (altura/peso), habilidades y debilidades.
- **Cadena Evolutiva**: Visualización interactiva de las evoluciones.
- **Navegación**: Scroll infinito simulado y controles de navegación estilo cruceta.
- **Filtros**: Filtrado de Pokémons por tipo.
- **Búsqueda**: Buscador de Pokémons por nombre o ID.
- **Modo Oscuro**: Soporte para cambio de tema (Dark/Light mode).

## Instalación y Ejecución

1.  Instalar dependencias:

    ```bash
    pnpm install
    ```

2.  Ejecutar servidor de desarrollo:
    ```bash
    pnpm dev
    ```
