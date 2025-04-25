export function formatearFecha(fechaISO) {
    try {
      const fecha = new Date(fechaISO);
      const dia = fecha.getDate();
      const mes = fecha.toLocaleString('default', { month: 'long' });
      const anio = fecha.getFullYear();
      let horas = fecha.getHours();
      const minutos = fecha.getMinutes();
      const ampm = horas >= 12 ? 'pm' : 'am';
      horas = horas % 12;
      horas = horas ? horas : 12; // La hora '0' debe ser '12'
    
      return ` ${dia} de ${mes} del ${anio} a las ${horas}:${minutos.toString().padStart(2, '0')} ${ampm}`;

    }catch{
      return "Error!"
    }
}
  