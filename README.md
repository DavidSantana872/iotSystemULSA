# Monitoreo Ambiental Inteligente para Áreas Verdes de ULSA

<img src="https://github.com/user-attachments/assets/5de5b9be-5f25-4d71-9de2-ea5b7750608d" alt="Plugin icon" width="100">

Este proyecto implementa un sistema de **Monitoreo Ambiental Inteligente** para las áreas verdes de la **Universidad Tecnológica La Salle (ULSA)**. El objetivo es recopilar y visualizar en tiempo real datos sobre ruido, temperatura y calidad del aire para mejorar la experiencia de los estudiantes y optimizar la gestión de estos espacios por parte de la universidad.

## Problemática

La falta de información en tiempo real sobre las condiciones ambientales en las áreas verdes de ULSA dificulta la toma de decisiones informadas y la implementación de mejoras.

## Solución

Se desarrolló una plataforma IoT que utiliza sensores para monitorear las condiciones ambientales y una interfaz web para visualizar los datos en tiempo real.

## Beneficios

* **Estudiantes:** Identificación de los espacios más confortables para sus actividades.
* **Universidad:** Toma de decisiones basada en datos para la mejora y gestión de las áreas verdes.

## Componentes del Sistema

* **Hardware:**
    * Servidor Linux
    * ESP32
    * Sensores: DHT11 (temperatura/humedad), detección de sonido, MQ135 (calidad del aire)
<img src="https://github.com/user-attachments/assets/c4032859-e02b-4924-af34-244f6c5d5a51" alt="Captura de pantalla de la plataforma" width="300">

* **Software:**
    * **Backend:** ASP.NET Core (C#) + Python (cryptography, pyodbc)
    * **Base de Datos:** SQL Server Express
    * **Comunicación:** MQTT
    * **Frontend:** React + JavaScript, HTML, CSS

<p>
  <img src="https://github.com/user-attachments/assets/f25efcc9-d223-464c-b473-1c6d4540005f" alt="Captura de pantalla de la plataforma" >
</p>
## Funcionalidades de la Plataforma Web

* Mapa interactivo de ULSA con marcadores para las áreas verdes.
* Visualización de datos ambientales en tiempo real al hacer clic en un área verde.
* Generación de informes globales con las últimas métricas.

<h2>Demo</h2>

<p>
  Puedes ver el funcionamiento en [www.iotulsa.duckdns.org](https://www.iotulsa.duckdns.org).
</p>
<img src="https://github.com/DavidSantana872/iotSystemULSA/blob/frontend/src/resources/gif/Recording%202025-05-08%20at%2010.27.59.gif" alt="GIF de la plataforma" width="300">
