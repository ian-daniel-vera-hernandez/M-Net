(() => {
  'use strict'

  // Función para obtener el tema guardado o el preferido del sistema
  const getStoredTheme = () => localStorage.getItem('theme')
  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme()
    if (storedTheme) {
      return storedTheme
    }
    // Si no hay guardado, usa la preferencia del sistema operativo
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // Función para aplicar el tema en el HTML
  const setTheme = theme => {
    if (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  // Aplicar el tema inmediatamente al cargar
  setTheme(getPreferredTheme())

  // Función para actualizar el icono del botón en la Navbar
  const showActiveTheme = (theme) => {
    const themeSwitcher = document.querySelector('#bd-theme-toggle')
    if (!themeSwitcher) {
      return
    }

    const iconoLuna = themeSwitcher.querySelector('.icono-luna')
    const iconoSol = themeSwitcher.querySelector('.icono-sol')

    if (theme === 'dark') {
      iconoLuna.classList.add('d-none')
      iconoSol.classList.remove('d-none')
      themeSwitcher.setAttribute('aria-label', 'Cambiar a modo claro')
    } else {
      iconoSol.classList.add('d-none')
      iconoLuna.classList.remove('d-none')
      themeSwitcher.setAttribute('aria-label', 'Cambiar a modo oscuro')
    }
  }

  // Al cargar el DOM, configuramos el evento del botón
  window.addEventListener('DOMContentLoaded', () => {
    const theme = getPreferredTheme()
    showActiveTheme(theme)
    
    const themeSwitcher = document.querySelector('#bd-theme-toggle')
    if(themeSwitcher) {
        themeSwitcher.addEventListener('click', () => {
          // Si es light, cambia a dark, y viceversa
          const currentTheme = document.documentElement.getAttribute('data-bs-theme')
          const newTheme = currentTheme === 'light' ? 'dark' : 'light'
          
          localStorage.setItem('theme', newTheme) // Guardamos la preferencia
          setTheme(newTheme)
          showActiveTheme(newTheme)
        })
    }
  })
})()