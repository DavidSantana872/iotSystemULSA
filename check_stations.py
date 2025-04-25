import pyodbc
import time
import datetime
import pytz
ONLINE = "ONLINE"
OFFLINE = "OFFLINE"
# Constante para definir el intervalo de verificación en segundos (1.5 minutos) valor en segundos
INTERVALO_VERIFICACION = 10

# Configuración de SQL Server
sql_config = {
    'server': '127.0.0.0',
    'database': 'iot_ulsa',
    'username': 'SA',
    'password': 'IotULSA2025'
}

# Cadena de conexión
conn_str = (
    'DRIVER={ODBC Driver 18 for SQL Server};'
    f'SERVER={sql_config["server"]};'
    f'DATABASE={sql_config["database"]};'
    f'UID={sql_config["username"]};'
    f'PWD={sql_config["password"]};'
    'Encrypt=yes;TrustServerCertificate=yes;'
)
nicaragua_tz = pytz.timezone('America/Managua')

      
def connect_db():
    """Establece una conexión simple a la base de datos."""
    return pyodbc.connect(conn_str)


def verificar_metrics(stations_id):
    """Obtiene el último registro de métricas para una estación específica."""
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT TOP 1 * 
            FROM iot_ulsa.dbo.MetricData 
            WHERE StationsId = ? 
            ORDER BY RegistrationDate DESC
        """, stations_id)
        row = cursor.fetchone()

        if row:
            columns = [column[0] for column in cursor.description]
            resultado = dict(zip(columns, row))
            cursor.close()
            conn.close()
            return resultado
        else:
            print(f"No se encontraron métricas para la estación {stations_id}")
            return None

    except Exception as e:
        print(f"Error en verificar_metrics: {e}")
        return None


def change_status_stations(status, idStations):
    """Cambia el estado de todas las estaciones."""
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("UPDATE iot_ulsa.dbo.MonitoringStations SET Status = ? WHERE Id = ?", status, idStations)
        conn.commit()
        cursor.close()
        conn.close()
        print(f"Estado actualizado a '{status}' en todas las estaciones.")
    except Exception as e:
        print(f"Error en change_status_stations: {e}")


def obtener_estaciones():
    """Obtiene todos los registros de la tabla MonitoringStations como una lista de diccionarios."""
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM iot_ulsa.dbo.MonitoringStations")
        columns = [column[0] for column in cursor.description]  # Nombres de columnas
        rows = cursor.fetchall()

        resultados = [dict(zip(columns, row)) for row in rows]

        cursor.close()
        conn.close()
        return resultados
    except Exception as e:
        print(f"Error en obtener_estaciones: {e}")
        return []

# Ejecución cíclica de verificar_metrics cada INTERVALO_VERIFICACION segundos
if __name__ == "__main__":
    while True:
        # obtener las estaciones 
        estaciones = obtener_estaciones()
        print(estaciones)
        # verificar las métricas
        for estacion in estaciones:
            stations_id = estacion['Id']
            last_metric = verificar_metrics(stations_id)
            if last_metric:
                # si la fecha de registro es mayor a 2 minutos
                tiempo_registro = last_metric['RegistrationDate']
                tiempo_actual = datetime.datetime.now(nicaragua_tz)
                print("Tiempo actual:", tiempo_actual)

                tiempo_diferencia = tiempo_actual.replace(tzinfo=None) - tiempo_registro.replace(tzinfo=None)

                minutos = tiempo_diferencia.total_seconds() / 60
                print("Tiempo actual:", tiempo_actual)
                print("Ultima fecha de registro:", tiempo_registro) 
                print("Diferencia", minutos)
                if minutos > 2:
                    print(f"La estación {stations_id} no ha enviado datos en más de 2 minutos.")
                    # Cambiar el estado de la estación a 'offline'
                    change_status_stations(OFFLINE, stations_id)
                else:
                    print(f"La estación {stations_id} está activa.")
                    # Cambiar el estado de la estación a 'online'
                    change_status_stations(ONLINE, stations_id)
            else:
                print(f"No se encontraron métricas para la estación {stations_id}")
        time.sleep(INTERVALO_VERIFICACION)
